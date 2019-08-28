const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const ProductSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    productImage: {
    type: String,
    required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
module.exports = Product = mongoose.model("products", ProductSchema);