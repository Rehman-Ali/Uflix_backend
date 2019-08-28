const mongoose = require("mongoose");
const min = Math.ceil(123);
const max = Math.floor(456);
const result = Math.floor(Math.random() * (max - min + 1)) + min;
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    userID: {
        type: String,
        required: true,
        default: "S" + result
    },
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
        required: true,
        default: Date.now()
    },
    cardCVV: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now()
    }
});
module.exports = User = mongoose.model("users", UserSchema);