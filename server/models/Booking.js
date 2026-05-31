const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({

  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
    required: true
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  name: { type: String, required: true },
  phone: { type: String, required: true },

  userType: {
    type: String,
    enum: ['Student', 'Employee'],
    required: true
  },

  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },

  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model('Booking', BookingSchema);