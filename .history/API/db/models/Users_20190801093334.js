const mongoose = require("mongoose");
const min = Math.ceil(123);
const max = Math.floor(456);
const result = Math.floor(Math.random() * (max - min + 1)) + min;
const Schema = mongoose.Schema;
// Create Schema
const UserSchema = new Schema({
  staffID: {
    type: String,
    required: true,
    default: "U" + result
  },
  fname: {
    type: String,
    required: true
  },
  lname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  confPassword: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});
module.exports = User = mongoose.model("users", UserSchema);