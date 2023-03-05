const Users = require("../service/usersSchema")
const gravatar = require('gravatar');
const { HOST } = require("../service/serverConfiguration");

const registerUser = async (body, verificationToken) => {
    const {email, password, subscription} = body
    const avatarURL = gravatar.url(email, {protocol: 'http', s: '100'});
    const newUser = new Users({ email, subscription, avatarURL,verificationToken})
    newUser.setPassword(password)
    return await newUser.save()
}

const loginUser = async (_id,token) => {
  return  await Users.findByIdAndUpdate(_id, {token})
}

const logoutUser = async (_id) => {
  return  await Users.findByIdAndUpdate(_id, {token: undefined})

}

const verificationUser = async (verificationToken) => {
  return await Users.findOneAndUpdate(
    {
      verificationToken: verificationToken,
    },
    {
      verify: true,
      verificationToken: null,
    }
  );
}

const verificationUserEmail = async (email, verificationToken) => {
  return await Users.findOneAndUpdate({ email, verify:false}, {verificationToken});
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
    avatarsUser,
    verificationUser,
    verificationUserEmail
}