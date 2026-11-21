const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    old: {
        type: Number
    },
    rating: {
        type: Number,
        default: 0
    },
    image: {
        type: String
    },
    description: {
        type: String
    }
});

module.exports = mongoose.model("Product", productSchema);
