const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
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
  fname: {
    type: String,
    required: true
  },
  lname: {
    type: String,
    required: true
  },
  cardNumber: {
    type: Number,
    required: true,
    unique: true
  },
  cardExpirationDate: {
    type: Date,
    required: true
  },
  cardCVV: {
    type: Number,
    required: true,
    unique: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
});
module.exports = User = mongoose.model("users", UserSchema);