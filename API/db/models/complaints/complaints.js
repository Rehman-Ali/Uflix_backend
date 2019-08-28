const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const ComplaintSchema = new Schema({
    _userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    status: {
        type: String,
        default: 'New'
    },
    subject: {
        type: String,
        required: true
    },
    complaint: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
module.exports = Complaint = mongoose.model("complaints", ComplaintSchema);