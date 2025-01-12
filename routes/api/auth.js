const express = require("express");
const { authenticate } = require("../../middlewares/authenticate");
const {
  validationRagister,
  validationLogin,
  validationVerify,
} = require("../../middlewares/validationAuth");
const {
  registerUser,
  loginUser,
  logoutUser,
  avatarsUser,
  verificationUser,
  verificationUserEmail,
} = require("../../models/users");
const generateUserToken = require("../../service/generateUserToken");
const Users = require("../../service/usersSchema");
const path = require("path");
const fs = require("fs").promises;
const Jimp = require("jimp");
const upload = require("../../middlewares/storage");
const nanoid = require('nanoid')
const router = express.Router();
const sgMail = require('@sendgrid/mail');
const { SENDGRID_API_KEY } = require("../../service/serverConfiguration");
const { sendingMail } = require("../../verify/sendingLetter");

sgMail.setApiKey(SENDGRID_API_KEY)


const storeImage = path.join(process.cwd(), "public", "avatars");

router.post("/register", validationRagister, async (req, res, next) => {
  try {
    const verificationToken = nanoid();

    const { email, subscription } = await registerUser(req.body, verificationToken);
    await sendingMail(email, verificationToken)

    res.json({ email, subscription });
  } catch (error) {
    if (error.code === 11000) {
      res
        .status(409)
        .json({ message: `${error.message.replace(/[^a-zа-яё0-9\s]/gi, "")}` });
      return;
    }
    res
      .status(400)
      .json({ message: `${error.message.replace(/[^a-zа-яё0-9\s]/gi, "")}` });
  }
});

router.get("/verify/:verificationToken",  async (req, res, next) => {
  try {
    const {verificationToken} = req.params
    const user = await verificationUser(verificationToken)
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.json({ message: "Verification success" }).status(200);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.post("/verify", validationVerify, async (req, res, next) => {
try {
  const verificationToken = nanoid();
  const {email} = req.body
  const user = await verificationUserEmail(email, verificationToken)
  
    if (!user) {
      return res.status(404).json({ message: "Verification has already been passed" });
    }
    await sendingMail(email, verificationToken)
    
    res.json({ message: "Verification email sent" }).status(200);
} catch (error) {
  res.status(400).json({ message: error.message });
}
});

router.post("/login", validationLogin, async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email, verify:true});

    if (!user || !user.validPassword(password)) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    const { _id, subscription } = user;
    const token = generateUserToken(_id, email);

    await loginUser(_id, token);

    return res.status(200).json({ token, user: { _id, subscription } });
  } catch (error) {
    return res.status(400).json(error.message);
  }
});

router.post("/logout", authenticate, async (req, res, next) => {
  try {
    const { _id } = req.user;
    await logoutUser(_id);
    return res.status(204);
  } catch (error) {
    return res.status(400).json(error.message);
  }
});

router.get("/current", authenticate, async (req, res, next) => {
  try {
    const { email, subscription } = req.user;
    res.status(200).json({ email, subscription });
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatars"),
  
  async (req, res, next) => {
    try {
      const { file, user } = req;

      const img = await Jimp.read(file.path);
      await img.resize(250, 250);
      await img.writeAsync(file.path);

      const fileName = path.join(storeImage, file.filename);

      try {
        await fs.rename(file.path, fileName);
      } catch (err) {
        await fs.unlink(file.path);
        return res.status(400).json(err.message);
      }
      const avatarURL = await avatarsUser(user._id, file.filename);

      res.status(200).json({ avatarURL });
    } catch (error) {
      res.status(401).json(error.message);
    }
  }
);

module.exports = router;
