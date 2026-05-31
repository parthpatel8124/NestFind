// server/models/Review.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property',
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    // Snapshot of user's name so it still shows if account is deleted
    userName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// One review per user per property — enforced at DB level
reviewSchema.index({ propertyId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model('Review', reviewSchema);