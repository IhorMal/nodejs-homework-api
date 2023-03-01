const Users = require("../service/usersSchema")
const gravatar = require('gravatar');
const path = require('path');
const { HOST } = require("../service/serverConfiguration");

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

const avatarsUser = async (_id, name) => {
  const fileName = `/avatars/${name}`;  
  const {avatarURL} = await Users.findByIdAndUpdate(_id, {avatarURL: fileName}, { new: true })
  
  return HOST+avatarURL
}



module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    avatarsUser
}