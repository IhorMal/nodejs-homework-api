
const { Schema, model } = require('mongoose');
const bCrypt = require("bcryptjs");

const usersSchema = new Schema(
    {
        password: {
          type: String,
          required: [true, 'Set password for user'],
        },
        email: {
          type: String,
          required: [true, 'Email is required'],
          unique: true,
        },
        subscription: {
          type: String,
          enum: ["starter", "pro", "business"],
          default: "starter"
        },
        token: String
      }
);

usersSchema.methods.setPassword = function(password) {
  this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(10));
};

usersSchema.methods.validPassword = function(password) {
  return bCrypt.compareSync(password, this.password);
};


const Users = model("user", usersSchema);


module.exports = Users;