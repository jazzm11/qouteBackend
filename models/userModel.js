const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  brukernavn: {
    type: String,
    required: true,
    unique: true,
  },
  passord: {
    type: String,
    required: true,
  }
});

const User = model("User", userSchema);

module.exports = User;
