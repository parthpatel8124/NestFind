const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const auth = require('../middleware/auth');


// ================= CHECK DATE CONFLICT =================
router.post('/check', async (req, res) => {
  try {
    const { propertyId, startDate, endDate } = req.body;

    const conflict = await Booking.findOne({
      propertyId,
      startDate: { $lte: new Date(endDate) },
      endDate: { $gte: new Date(startDate) },
      status: { $ne: 'rejected' }
    });

    res.json({ conflict: !!conflict });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ================= CREATE BOOKING =================
router.post('/', auth, async (req, res) => {
  try {
    const payload = req.body;

    // ✅ FIX: attach logged-in user
    payload.userId = req.user.id;

    const booking = new Booking(payload);
    const saved = await booking.save();

    res.status(201).json(saved);

  } catch (err) {
    console.error("BOOKING ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});


// ================= GET MY BOOKINGS =================
router.get('/my', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id })
    .populate('propertyId', 'title city propertyType price')  // ← add this
      // .populate('propertyId');

    res.json(bookings);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


// ================= OWNER BOOKINGS =================
router.get('/owner', auth, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate({
        path: 'propertyId',
        match: { ownerId: req.user.id }
      });

    res.json(bookings.filter(b => b.propertyId));

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


// ================= BOOKINGS BY PROPERTY =================
router.get('/property/:id', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ propertyId: req.params.id });
    res.json(bookings);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});


// ================= UPDATE STATUS =================
router.patch('/:id', auth, async (req, res) => {
  try {
    const updated = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.json(updated);

  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;