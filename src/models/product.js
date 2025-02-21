const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
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
        required: true,
        ref: 'registrationType'
    },
    is_deleted: {
        type: Boolean,
        default: false
    },
    location_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location'
    }
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
