const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const DemandedSchema = new Schema({
    _userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    title1: {
        type: String,
        required: true
    },
    title2: {
        type: String,
        required: true
    },
    title3: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
module.exports = Demand = mongoose.model("demandMovies", DemandedSchema);