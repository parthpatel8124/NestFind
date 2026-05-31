const express = require('express');
const router = express.Router();
const Roommate = require('../models/Roommate');
const auth = require('../middleware/auth');


// CREATE ROOMMATE REQUEST
router.post('/', auth, async (req, res) => {

  try {

    const data = req.body || {};

    if (req.user && req.user.id) {
      data.ownerId = req.user.id;
    }

    // keep verification system
    data.verified = false;

    const roommate = new Roommate(data);

    await roommate.save();

    res.status(201).json(roommate);

  } catch (err) {

    res.status(500).json({
      message: 'Server error',
      error: err.message
    });

  }

});


// GET ROOMMATE LIST
router.get('/', async (req, res) => {

  try {

    const { city, preferredGender, mine } = req.query;

    const query = {};

    if (city) query.city = city;

    if (preferredGender) query.preferredGender = preferredGender;

    let isAuthed = false;

    if (req.headers.authorization) {

      try {

        await new Promise((resolve, reject) =>
          auth(req, res, err => err ? reject(err) : resolve())
        );

        isAuthed = true;

      } catch {

        isAuthed = false;

      }

    }

    // my posts filter
    if (mine === 'true' && isAuthed && req.user?.id) {

      query.ownerId = req.user.id;

    }

    // ADMIN sees everything
    if (isAuthed && req.user?.role === 'admin') {

      // no verification filter

    }

    // USER sees verified + their own
    else if (isAuthed && req.user?.id) {

      query.$or = [
        { verified: true },
        { ownerId: req.user.id }
      ];

    }

    // GUEST sees only verified
    else {

      query.verified = true;

    }

    const results = await Roommate
      .find(query)
      .sort({ createdAt: -1 })
      .populate('ownerId', 'fullName email');

    res.json(results);

  } catch (err) {

    res.status(500).json({
      message: 'Server error',
      error: err.message
    });

  }

});


// GET SINGLE ROOMMATE POST
router.get('/:id', async (req, res) => {

  try {

    let isAuthed = false;

    if (req.headers.authorization) {

      try {

        await new Promise((resolve, reject) =>
          auth(req, res, err => err ? reject(err) : resolve())
        );

        isAuthed = true;

      } catch {

        isAuthed = false;

      }

    }

    const r = await Roommate
      .findById(req.params.id)
      .populate('ownerId', 'fullName email phone');

    if (!r) return res.status(404).json({ message: 'Not found' });

    const response = r.toObject();

    // OWNER VIEW
    if (isAuthed && req.user && r.ownerId &&
        req.user.id === r.ownerId._id.toString()) {

      await r.populate({
        path: 'interestedUsers.userId',
        select: 'fullName email'
      });

      response.interestedUsers = r.interestedUsers;

      response.ownerContact = r.contact || '';

    }

    else {

      delete response.interestedUsers;

      if (isAuthed && req.user) {

        if (r.acceptedUserId &&
            r.acceptedUserId.toString() === req.user.id) {

          response.ownerContact = r.contact || '';

        } else {

          response.ownerContact = '';

        }

      } else {

        response.ownerContact = '';

      }

    }

    res.json(response);

  } catch (err) {

    res.status(500).json({
      message: 'Server error',
      error: err.message
    });

  }

});


// DELETE ROOMMATE POST
router.delete('/:id', auth, async (req, res) => {

  try {

    const r = await Roommate.findById(req.params.id);

    if (!r) return res.status(404).json({ message: 'Not found' });

    const ownerId = r.ownerId.toString();

    if (ownerId !== req.user.id && req.user.role !== 'admin') {

      return res.status(403).json({ message: 'Forbidden' });

    }

    await r.deleteOne();

    res.json({ message: 'Deleted' });

  } catch (err) {

    res.status(500).json({
      message: 'Server error',
      error: err.message
    });

  }

});


// ADMIN VERIFY / UNVERIFY
router.patch('/:id/verify', auth, async (req, res) => {

  try {

    if (req.user.role !== 'admin') {

      return res.status(403).json({ message: 'Forbidden' });

    }

    const r = await Roommate.findById(req.params.id);

    if (!r) return res.status(404).json({ message: 'Not found' });

    r.verified = !!req.body.verified;

    await r.save();

    res.json(r);

  } catch (err) {

    res.status(500).json({
      message: 'Server error',
      error: err.message
    });

  }

});


// EXPRESS INTEREST
router.post('/:id/interested', auth, async (req, res) => {

  try {

    const userId = req.user.id;

    const r = await Roommate.findById(req.params.id);

    if (!r) return res.status(404).json({ message: 'Not found' });

    if (r.ownerId.toString() === userId) {

      return res.status(400).json({
        message: 'Owner cannot express interest'
      });

    }

    const existing = r.interestedUsers.find(
      u => u.userId.toString() === userId
    );

    if (existing) {

      return res.status(400).json({
        message: 'Already requested interest'
      });

    }

    r.interestedUsers.push({
      userId,
      status: 'pending'
    });

    await r.save();

    res.json({ message: 'Interest registered' });

  } catch (err) {

    res.status(500).json({
      message: 'Server error',
      error: err.message
    });

  }

});


// ACCEPT USER
router.post('/:id/accept/:userId', auth, async (req, res) => {

  try {

    const { id, userId } = req.params;

    const r = await Roommate.findById(id);

    if (!r) return res.status(404).json({ message: 'Not found' });

    if (r.ownerId.toString() !== req.user.id) {

      return res.status(403).json({ message: 'Forbidden' });

    }

    const entry = r.interestedUsers.find(
      u => u.userId.toString() === userId
    );

    if (!entry) {

      return res.status(404).json({
        message: 'Interest not found'
      });

    }

    entry.status = 'accepted';

    r.acceptedUserId = userId;

    await r.save();

    res.json({ message: 'Accepted' });

  } catch (err) {

    res.status(500).json({
      message: 'Server error',
      error: err.message
    });

  }

});


// REJECT USER
router.post('/:id/reject/:userId', auth, async (req, res) => {

  try {

    const { id, userId } = req.params;

    const r = await Roommate.findById(id);

    if (!r) return res.status(404).json({ message: 'Not found' });

    if (r.ownerId.toString() !== req.user.id) {

      return res.status(403).json({ message: 'Forbidden' });

    }

    const entry = r.interestedUsers.find(
      u => u.userId.toString() === userId
    );

    if (!entry) {

      return res.status(404).json({
        message: 'Interest not found'
      });

    }

    entry.status = 'rejected';

    await r.save();

    res.json({ message: 'Rejected' });

  } catch (err) {

    res.status(500).json({
      message: 'Server error',
      error: err.message
    });

  }

});

module.exports = router;