const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    reviewType: {
        type: String,
        required: true,
        enum: ['dish', 'destination' , 'agent' ], 
    },
    content: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    agent_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agent',
        required: true,
    },
    dish_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dish',

    },
    destination_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Destination', 
    }
}, {
    timestamps: true
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review; 