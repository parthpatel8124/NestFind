// server/models/Message.js
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    // Which property this conversation is about
    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property',
      required: true,
    },
    // The two participants
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // Message content
    text: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },
    // Has the receiver seen this message?
    read: {
      type: Boolean,
      default: false,
    },
    // Snapshot of sender name so it shows even if account deleted
    senderName: {
      type: String,
    },
  },
  { timestamps: true }
);

// Index for fast conversation lookups
messageSchema.index({ propertyId: 1, senderId: 1, receiverId: 1 });
messageSchema.index({ receiverId: 1, read: 1 }); // for unread count

module.exports = mongoose.model('Message', messageSchema);