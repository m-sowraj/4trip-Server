const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discounted_price: {
        type: Number,
    },
    image: {
        type: Buffer,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    category: {
        type: String,
        enum: ['veg', 'non-veg', 'spicy', 'no garlic or onion', 'best seller', 'dish of the day'],
        required: true,
    },
    availability: {
        type: Boolean,
        default: true, 
    },
    partner_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'registrationType', 
    required: true,
  },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    is_deleted: {
        type: Boolean,
        default: false
    },
    available: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const Dish = mongoose.model('Dish', dishSchema);
module.exports = Dish; 


