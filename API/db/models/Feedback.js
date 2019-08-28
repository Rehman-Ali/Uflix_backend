const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const FeedbackSchema = new Schema({
    _movieId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'movies'
    },
    title: {
        type: String,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    ratings: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
module.exports = Feedback = mongoose.model("feedback", FeedbackSchema);