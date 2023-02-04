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



module.exports = {
    registerUser,
    loginUser,
    logoutUser,
}