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
  is_deleted: {
    type: Boolean,
    default: false
},
image_urls:[
  {
    type: String,
    trim: true,
  }
 ],
}, {
  timestamps: true
});

module.exports = mongoose.model('SuperAdmin', SuperAdminSchema);
