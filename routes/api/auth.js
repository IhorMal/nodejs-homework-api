const express = require('express');
const { authenticate } = require('../../middlewares/authenticate');
const { validationRagister } = require('../../middlewares/validationAuth');
const { registerUser, loginUser, logoutUser, currentUser } = require('../../models/users');
const creatingToken = require('../../service/creatingToken');
const Users = require('../../service/usersSchema');
const router = express.Router()

router.post('/users/register', validationRagister ,async (req, res, next) => {
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

router.post('/users/login', validationRagister ,async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await Users.findOne({email})

    if (!user || !user.validPassword(password)) {
      return res.status(401).json({"message": "Email or password is wrong"})
    }

    const {_id, subscription} = user;
    const token = creatingToken(_id, email)

    await loginUser(_id, token)

    return res.status(200).json({token, user: {email, subscription}})
    } catch (error) {
        return res.status(400).json(error.message)
    }
})


router.post('/users/logout', authenticate ,async (req, res, next) => {
   try {
    const {_id, token} = req.user
    await logoutUser(_id, token)
    res.status(204)
   } catch (error) {
    res.status(400).json(error.message)
   }
})


router.get('/users/current', authenticate ,async (req, res, next) => {
   try {
    const {_id} = req.user
    const user = await currentUser(_id)
    res.status(200).json(...user)
   } catch (error) {
    res.status(400).json(error.message)
   }
})



module.exports = router;