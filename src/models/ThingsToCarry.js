const mongoose = require('mongoose');

const ThingsToCarrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  location_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SuperAdmin',
    required: true
  },
  is_deleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('ThingsToCarry', ThingsToCarrySchema); 