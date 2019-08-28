const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Sche
const StaffSchema = new Schema({
    staffID: {
        type: String,
        required: true,
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
module.exports = Staff = mongoose.model("staff", StaffSchema);
