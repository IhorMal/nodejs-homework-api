const jwt = require("jsonwebtoken");
const { SECRET } = require("../service/serverConfiguration");
const Users = require("../service/usersSchema");

const authenticate = async (req, res, next) => {
  try {
    
    if (!req.headers.authorization) {
    return  res.status(400).json({messege: "Signature not exist"})
    }
    const [, token] = req.headers.authorization.split(" ");
    const { id } = jwt.decode(token, SECRET);
    const user = await Users.findById(id);
    
    if (!user) {
    return  res.status(401).json({messege: "Not authorized"})
    }
    req.user = user;
    next();
  } catch (error) {
    return  res.status(404).json(error.messege)
  }
};

module.exports = {
  authenticate,
};