const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MovieSchema = new Schema({
    movies: {
        type: Array,
    }
})

module.exports = Movie = mongoose.model("movies", MovieSchema);