const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  FullName: {
    type: String,
    requied: true,
  },
  userName: {
    type: String,
    requied: true,
  },
  password: {
    type: String,
    requied: true,
  },
  Confirmpassword: {
    type: String,
    requied: true,
  },
  zipCode: {
    type: Number,
    requied: true,
  },
  profileImage: {
    type: mongoose.Schema.ObjectId,
    ref: 'img'
  }
});
module.exports = mongoose.model('userSchemaRegister', userSchema)