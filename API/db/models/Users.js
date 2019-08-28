
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
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
  cardNumber: {
    type: String,
    required: true,
    unique: true
  },
  cardExpirationDate: {
    type: Date,
    required: true,
    default: Date.now()
  },
  cardCVV: {
    type: String,
    required: true,
  },
  willPay: {
    type: Boolean,
    // required: true,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
});
module.exports = User = mongoose.model("users", UserSchema);