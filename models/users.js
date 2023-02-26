const Users = require("../service/usersSchema")
const gravatar = require('gravatar');

const registerUser = async (body) => {
    const {email, password, subscription} = body
    const avatarURL = gravatar.url(email, {protocol: 'http', s: '100'});
    const newUser = new Users({ email, subscription, avatarURL})
    newUser.setPassword(password)
    return await newUser.save()
}

const loginUser = async (_id,token) => {
  return  await Users.findByIdAndUpdate(_id, {token})
}

const logoutUser = async (_id) => {
  return  await Users.findByIdAndUpdate(_id, {token: undefined})

}

const avatarsUser = async (_id, avatarURL) => {
  return  await Users.findByIdAndUpdate(_id, {avatarURL: avatarURL})
}



module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    avatarsUser
}