const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  agent_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Agent',
    required: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phone_number: {
    type: String,
    required: true,
    trim: true,
  },
  Destination_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Destination' // Assuming you have a Destination model
  }
}, {
  timestamps: true
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking; 