const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MovieSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    cast: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    },
    video: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        // default: Date.now
    }
})

module.exports = Movie = mongoose.model("movies", MovieSchema);