
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
        avatarURL: String,
        subscription: {
          type: String,
          enum: ["starter", "pro", "business"],
          default: "starter"
        },
        token: String,
        verify: {
           type: Boolean,
           default: false,
        },
        verificationToken: {
           type: String,
           required: [true, 'Verify token is required'],
        }
        
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