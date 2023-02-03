const Users = require("../service/usersSchema")


const registerUser = async (body) => {
    const {email, password, subscription} = body
    const newUser = new Users({ email, subscription })
    newUser.setPassword(password)
    return await newUser.save()
}

const loginUser = async (_id,token) => {
  return  await Users.findByIdAndUpdate(_id, {token})
}

const logoutUser = async (_id) => {
  return  await Users.findByIdAndUpdate(_id, {token: undefined})

}

const currentUser = async (_id) => {
  return  await Users.find(_id, {email: 1, subscription: 1, _id: 0})
}



module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    currentUser
}