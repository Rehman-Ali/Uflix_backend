
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
    type: Number,
    required: true,
    unique: true
  },
  cardExpirationDate: {
    type: Date,
    required: true,
    default: Date.now()
  },
  cardCVV: {
    type: Number,
    required: true,
  },
  willPay: {
    type: Boolean,
    required: true,
    default: false
  },
  complaints: {
    type: Array,
  },
  onDemandMovies:{
    type: Array
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});
module.exports = User = mongoose.model("users", UserSchema);