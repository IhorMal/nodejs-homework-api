const express = require('express');
const { authenticate } = require('../../middlewares/authenticate');
const { validationRagister, validationLogin } = require('../../middlewares/validationAuth');
const { registerUser, loginUser, logoutUser } = require('../../models/users');
const generateUserToken = require('../../service/generateUserToken');
const Users = require('../../service/usersSchema');
const router = express.Router()

router.post('/register', validationRagister ,async (req, res, next) => {
try {   
    const {email, subscription} = await registerUser(req.body)
    res.json({email, subscription})

} catch (error) {
    if (error.code === 11000) {
        res.status(409).json({"message": `${error.message.replace(/[^a-zа-яё0-9\s]/gi, '')}`})
        return
    }
    res.status(400).json({"message": `${error.message.replace(/[^a-zа-яё0-9\s]/gi, '')}`})
}
})

router.post('/login', validationLogin ,async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await Users.findOne({email})
        
    if (!user || !user.validPassword(password)) {
      return res.status(401).json({"message": "Email or password is wrong"})
    }

    const {_id, subscription} = user;
    const token = generateUserToken(_id, email)

    await loginUser(_id, token)

    return res.status(200).json({token, user: {_id, subscription}})
    } catch (error) {
        return res.status(400).json(error.message)
    }
})

router.post('/logout', authenticate ,async (req, res, next) => {
   try {
    const {_id} = req.user
    await logoutUser(_id)
    return res.status(204)
   } catch (error) {
   return res.status(400).json(error.message)
   }
})


router.get('/current', authenticate ,async (req, res, next) => {
   try {
    const {email, subscription} = req.user
    res.status(200).json({email,subscription})
   } catch (error) {
    res.status(400).json(error.message)
   }
})



module.exports = router;