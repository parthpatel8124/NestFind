// server/routes/users.js
// SETUP in server.js:
//   const userRoutes = require('./routes/users');
//   app.use('/api/users', userRoutes);

const express    = require('express');
const router     = express.Router();
const bcrypt     = require('bcryptjs');
const multer     = require('multer');
const cloudinary = require('cloudinary').v2;
const auth       = require('../middleware/auth');
const User       = require('../models/User');

cloudinary.config({ cloud_name: process.env.CLOUD_NAME, api_key: process.env.CLOUD_API_KEY, api_secret: process.env.CLOUD_API_SECRET });

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) return cb(new Error('Only image files allowed'));
    cb(null, true);
  },
});

const uploadToCloudinary = (buffer) => new Promise((resolve, reject) => {
  const stream = cloudinary.uploader.upload_stream(
    { folder: 'nestfind/avatars', transformation: [{ width: 400, height: 400, crop: 'fill' }] },
    (err, result) => err ? reject(err) : resolve(result.secure_url)
  );
  stream.end(buffer);
});

// PUT /api/users/profile
router.put('/profile', auth, upload.single('avatar'), async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const { fullName, phone } = req.body;
    if (fullName?.trim()) user.fullName = fullName.trim();
    if (phone !== undefined) user.phone = phone.trim();

    if (req.file) {
      try { user.avatar = await uploadToCloudinary(req.file.buffer); }
      catch (e) { return res.status(500).json({ message: 'Avatar upload failed.' }); }
    }

    await user.save();
    res.json({ id: user._id, fullName: user.fullName, email: user.email, phone: user.phone, role: user.role, avatar: user.avatar || null });
  } catch (err) {
    console.error('[Profile PUT]', err.message);
    res.status(500).json({ message: err.message || 'Failed to update profile' });
  }
});

// PUT /api/users/change-password
router.put('/change-password', auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) return res.status(400).json({ message: 'Both passwords required' });
    if (newPassword.length < 6) return res.status(400).json({ message: 'New password must be at least 6 characters' });

    const userId = req.user.id || req.user._id;
    const user = await User.findById(userId).select('+password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Current password is incorrect' });

    const isSame = await bcrypt.compare(newPassword, user.password);
    if (isSame) return res.status(400).json({ message: 'New password must be different from current password' });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ message: 'Password changed successfully' });
  } catch (err) {
    console.error('[Change Password]', err.message);
    res.status(500).json({ message: err.message || 'Failed to change password' });
  }
});

module.exports = router;