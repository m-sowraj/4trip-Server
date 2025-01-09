const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  agent_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'registrationType',
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
    ref: 'SuperAdmin' 
  },
 
  "amt_earned": {
    type: Number,
    required: true
  },
  "start_date": {
    type: Date,
    required: true
  },
  "end_date": {
    type: Date,
    required: true
  },
  is_deleted: {
    type: Boolean,
    default: false
}
}, {
  timestamps: true
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking; 