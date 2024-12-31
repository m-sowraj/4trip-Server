const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    registrationId: { type: mongoose.Schema.Types.ObjectId, required: true , ref: 'registrationType'},
    totalMembers: { type: Number, required: true },
    bookedTime: { type: Date, required: true },
    status: { type: Boolean, default: true },
    type: { type: String, enum: ['Restaurant', 'Activity'], required: true },
    activityId: { type: mongoose.Schema.Types.ObjectId, required: false , ref: 'Activity'},
    createdBy: { type: mongoose.Schema.Types.ObjectId, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ManageBooking', bookingSchema);
