// server/routes/messages.js
// Register in server.js: app.use('/api/messages', require('./routes/messages'));

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Message = require('../models/Message');
const auth = require('../middleware/auth');

function toObjId(str) {
  try { return new mongoose.Types.ObjectId(str); } catch { return null; }
}

// ── GET /api/messages/conversations
// All unique conversations for the logged-in user (inbox list)
router.get('/conversations', auth, async (req, res) => {
  try {
    const userId = toObjId(req.user.id || req.user._id);

    // Find the latest message for each unique (propertyId + otherUserId) pair
    const convos = await Message.aggregate([
      {
        $match: {
          $or: [{ senderId: userId }, { receiverId: userId }],
        },
      },
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: {
            propertyId: '$propertyId',
            // The "other" person in the conversation
            otherUser: {
              $cond: [
                { $eq: ['$senderId', userId] },
                '$receiverId',
                '$senderId',
              ],
            },
          },
          lastMessage: { $first: '$$ROOT' },
          unreadCount: {
            $sum: {
              $cond: [
                { $and: [{ $eq: ['$receiverId', userId] }, { $eq: ['$read', false] }] },
                1, 0,
              ],
            },
          },
        },
      },
      { $sort: { 'lastMessage.createdAt': -1 } },
    ]);

    // Populate property and user info
    await Message.populate(convos, [
      { path: '_id.propertyId', select: 'title city images', model: 'Property' },
      { path: '_id.otherUser', select: 'fullName', model: 'User' },
      { path: 'lastMessage.senderId', select: 'fullName', model: 'User' },
    ]);

    res.json(convos);
  } catch (err) {
    console.error('[messages/conversations]', err.message);
    res.status(500).json({ message: 'Failed to load conversations' });
  }
});

// ── GET /api/messages/:propertyId/:otherUserId
// All messages in a specific conversation thread
router.get('/:propertyId/:otherUserId', auth, async (req, res) => {
  try {
    const userId = toObjId(req.user.id || req.user._id);
    const otherId = toObjId(req.params.otherUserId);
    const propertyId = toObjId(req.params.propertyId);

    const messages = await Message.find({
      propertyId,
      $or: [
        { senderId: userId, receiverId: otherId },
        { senderId: otherId, receiverId: userId },
      ],
    }).sort({ createdAt: 1 });

    // Mark all incoming messages as read
    await Message.updateMany(
      { propertyId, senderId: otherId, receiverId: userId, read: false },
      { $set: { read: true } }
    );

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load messages' });
  }
});

// ── GET /api/messages/unread-count
// Total unread messages for the logged-in user (for navbar badge)
router.get('/unread-count', auth, async (req, res) => {
  try {
    const userId = toObjId(req.user.id || req.user._id);
    const count = await Message.countDocuments({ receiverId: userId, read: false });
    res.json({ count });
  } catch {
    res.json({ count: 0 });
  }
});

module.exports = router;