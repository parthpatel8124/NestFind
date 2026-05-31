// server/socket.js
// Call this from server.js after creating the HTTP server:
//
//   const http = require('http');
//   const { Server } = require('socket.io');
//   const setupSocket = require('./socket');
//
//   const httpServer = http.createServer(app);
//   setupSocket(httpServer);
//   httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Message = require('./models/Message');

// Map userId → socket.id so we can send to specific users
const onlineUsers = new Map();

function toObjId(str) {
  try { return new mongoose.Types.ObjectId(str); } catch { return null; }
}

function setupSocket(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:5173',
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  // ── Authenticate every socket connection via JWT ──
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error('No token'));
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = decoded.id || decoded._id;
      socket.userName = decoded.fullName || decoded.name || 'User';
      next();
    } catch {
      next(new Error('Invalid token'));
    }
  });

  io.on('connection', (socket) => {
    const userId = socket.userId;
    onlineUsers.set(userId, socket.id);
    console.log(`[Socket] User connected: ${userId}`);

    // ── Join a conversation room ──
    // Room name = "propertyId_smallerId_largerId" (always same regardless of who joins)
    socket.on('join_conversation', ({ propertyId, otherUserId }) => {
      const ids = [userId, otherUserId].sort();
      const room = `${propertyId}_${ids[0]}_${ids[1]}`;
      socket.join(room);
    });

    // ── Send a message ──
    socket.on('send_message', async ({ propertyId, receiverId, text }) => {
      if (!text?.trim()) return;

      try {
        const senderObjId = toObjId(userId);
        const receiverObjId = toObjId(receiverId);
        const propertyObjId = toObjId(propertyId);

        // Save to database
        const message = await Message.create({
          propertyId: propertyObjId,
          senderId: senderObjId,
          receiverId: receiverObjId,
          text: text.trim(),
          senderName: socket.userName,
        });

        const messageData = {
          _id: message._id,
          propertyId,
          senderId: userId,
          receiverId,
          text: message.text,
          senderName: socket.userName,
          read: false,
          createdAt: message.createdAt,
        };

        // Emit to the conversation room (both participants see it)
        const ids = [userId, receiverId].sort();
        const room = `${propertyId}_${ids[0]}_${ids[1]}`;
        io.to(room).emit('receive_message', messageData);

        // Also ping the receiver if they're online but not in this room
        // (e.g. they're on a different page — triggers navbar badge update)
        const receiverSocketId = onlineUsers.get(receiverId);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit('new_message_notification', {
            propertyId,
            senderId: userId,
            senderName: socket.userName,
          });
        }

      } catch (err) {
        console.error('[Socket] send_message error:', err.message);
        socket.emit('message_error', { message: 'Failed to send message' });
      }
    });

    // ── Mark messages as read ──
    socket.on('mark_read', async ({ propertyId, otherUserId }) => {
      try {
        await Message.updateMany(
          {
            propertyId: toObjId(propertyId),
            senderId: toObjId(otherUserId),
            receiverId: toObjId(userId),
            read: false,
          },
          { $set: { read: true } }
        );
      } catch (err) {
        console.error('[Socket] mark_read error:', err.message);
      }
    });

    socket.on('disconnect', () => {
      onlineUsers.delete(userId);
      console.log(`[Socket] User disconnected: ${userId}`);
    });
  });

  return io;
}

module.exports = setupSocket;