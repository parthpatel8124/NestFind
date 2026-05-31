const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkeythatshouldbeinenv';

// Register
router.post('/register', async (req, res) => {
  try {
    const { fullName, email, phone, password, role } = req.body;

    // Validation
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Disallow creating admin accounts via public registration
    if (role && role === 'admin') {
      return res.status(403).json({ message: 'Cannot register with role admin' });
    }

    const allowedRolesOnRegister = ['user', 'owner'];
    const chosenRole = allowedRolesOnRegister.includes(role) ? role : 'user';

    // Create user
    const user = new User({
      fullName,
      email,
      phone,
      password,
      role: chosenRole,
    });

    await user.save();

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('[auth] login attempt for:', email);

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // Find user and select password field
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      console.warn('[auth] login failed - user not found:', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatchPassword = await user.comparePassword(password);
    if (!isMatchPassword) {
      console.warn('[auth] login failed - wrong password for:', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('[auth] login error:', error && error.stack ? error.stack : error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

module.exports = router;
