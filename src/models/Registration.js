const mongoose = require("mongoose");

const registrationType = new mongoose.Schema(
  {
    business_name: {
      type: String,
      required: true,
      trim: true,
    },
    owner_name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    phone_number: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    select_category: {
      type: String,
      enum: ["restaurant", "shop", "activities"],
      trim: true,
    },
    reg_type: {
      type: String,
      required: true,
      enum: ["agent", "partner"],
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },

    recordDate: {
      type: Date,
      default: Date.now,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    isNew: {
      type: Boolean,
      default: true,
    },
    image: 
    { 
      type: Buffer 
    },
    address: {
      type: String,
      default: '',
    },
    city: {
      type: String,
      default: '',
    },
    pincode: {
      type: String,
      default: '',
    },
    businessHours: {
      days: {
        type: [String], 
        default: [],
      },
      openingTime: {
        type: String,
        default: '',
      },
      closingTime: {
        type: String,
        default: '',
      },
      
  },
  shopType: {
    type: String,
    default: '',
  }},
  {
    timestamps: true,
  }
);

const Agent = mongoose.model("registrationType", registrationType);
module.exports = Agent;
