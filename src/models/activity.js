const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    registration_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'registrationType',
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    whatsincluded: [{
        type: String,
        required: true
    }],
    additional_info: {
        duration: {
            type: String,
        },
        agerequirement: {
            type: String,
        },
        dresscode: String,
        accessibility: String,
        difficulty: {
            type: String,
            enum: ['Easy', 'Moderate', 'Difficult'],
            default: 'Moderate'
        }
    },
    price: {
        type: Number,
        required: true
    },
    slots: [{
        type: String
    }
    ],
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
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    CreatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    }
}, {
    timestamps: true
});


const Activity = mongoose.model('Activity', activitySchema);
module.exports = Activity;
