const mongoose = require('mongoose');
const SuperAdminSchema = new mongoose.Schema({
  place_name: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  longitude: {
    type: mongoose.Schema.Types.Decimal128,
    trim: true,
  },
  latitude: {
    type: mongoose.Schema.Types.Decimal128,
    trim: true,
  },
  near_by_attractions: {
    type: String,
    required: true,
    trim: true,
  },
  best_time_to_visit: {
    type: String,
    required: true,
    trim: true,
  },
  short_summary: {
    type: String,
    required: true,
    trim: true,
  },
  media: {
    images: [
      {
        data: Buffer, 
        mimeType: String, 
        originalName: String,
      },
    ],
    videos: [
      {
        data: Buffer, 
        mimeType: String, 
        originalName: String, 
      },
    ],
  },

});

module.exports = mongoose.model('SuperAdmin', SuperAdminSchema);
