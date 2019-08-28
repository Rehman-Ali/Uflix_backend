const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MovieSchema = new Schema({
    id: {
        type: Number,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true
    }
})

module.exports = Movie = mongoose.model("movies", MovieSchema);