const mongoose = require("mongoose");
const userschema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  age: Number,
});

const userModel = mongoose.model("Users", userschema);

module.exports = { userModel };
