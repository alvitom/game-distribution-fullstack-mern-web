const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
  },
  full_name: {
    type: String,
  },
  profile_info: {
    type: String,
  },
  registration_date: {
    type: Date,
  },
});

const User = mongoose.model("users", userSchema);

module.exports = User;
