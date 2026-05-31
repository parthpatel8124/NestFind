const mongoose = require('mongoose');

const RoommateSchema = new mongoose.Schema({
  title: { type: String, required: true },

  description: { type: String, default: '' },

  city: { type: String, required: true },

  area: { type: String, default: '' },

  preferredGender: {
    type: String,
    enum: ['Boys', 'Girls', 'Any'],
    default: 'Any'
  },

  budgetMin: { type: Number },

  budgetMax: { type: Number },

  amenitiesNeeded: {
    type: [String],
    default: []
  },

  contact: {
    type: String,
    default: ''
  },

  verified: {
    type: Boolean,
    default: false
  },

  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  interestedUsers: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },

      status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
      }
    }
  ],

  // store the final accepted roommate
  acceptedUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model('Roommate', RoommateSchema);