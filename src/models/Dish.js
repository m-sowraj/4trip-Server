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
    image_url: {
        type: String,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    category: {
        type: String,
        enum: ['veg', 'non-veg'],
        required: true,
    },
  is_active: {
    type: Boolean,
    default: true
  },
  is_deleted: {
    type: Boolean,
    default: false
  },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'registrationType',
        required: true
    },
}, {
    timestamps: true
});

const Dish = mongoose.model('Dish', dishSchema);
module.exports = Dish; 


