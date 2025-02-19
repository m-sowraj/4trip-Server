const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    latitude: {
        type: mongoose.Schema.Types.Decimal128,
        required: true
    },
    longitude: {
        type: mongoose.Schema.Types.Decimal128,
        required: true
    },
    is_deleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Location = mongoose.model('Location', locationSchema);
module.exports = Location; 