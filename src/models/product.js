const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    registration_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'registrationType',
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    location_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Location'
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    discount_percentage: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    images: [{
        type: String
    }],
    status: {
        type: Boolean,
        default: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
