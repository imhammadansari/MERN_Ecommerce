const mongoose = require('mongoose')


const productSchema = mongoose.Schema({
    image: Buffer,
    name: String,
    price: Number,
    description: String,
    brand: String,
    material: String,
    color: String,
    unitcount: String,
    dimensions: String,
    weight: String,
    size: String,
    reviews: [{
        name: String,
        comments: String,
        rating: {
            type: Number,
            min: 1,
            max: 5,
            required: true
        }
    }],
    discount: {
        type: Number,
        default: 0
    },
    category: String,
    bestseller: Boolean
});

module.exports = mongoose.model("products", productSchema);

