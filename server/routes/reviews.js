// // server/routes/reviews.js
// const express = require('express');
// const router = express.Router();
// const Review = require('../models/Review');
// const Property = require('../models/Property');
// const Booking = require('../models/Booking');
// const auth = require('../middleware/auth'); // your existing JWT middleware

// // ── Helper: recalculate and save avgRating on the Property ──
// async function updatePropertyRating(propertyId) {
//   const reviews = await Review.find({ propertyId });
//   const avg = reviews.length
//     ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
//     : 0;
//   await Property.findByIdAndUpdate(propertyId, {
//     avgRating: parseFloat(avg.toFixed(1)),
//     reviewCount: reviews.length,
//   });
// }

// // ── GET /api/reviews/:propertyId ──
// // Fetch all reviews for a property (public)
// router.get('/:propertyId', async (req, res) => {
//   try {
//     const reviews = await Review.find({ propertyId: req.params.propertyId })
//       .sort({ createdAt: -1 });
//     res.json(reviews);
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to load reviews' });
//   }
// });

// // ── POST /api/reviews/:propertyId ──
// // Submit a review — must be logged in and must have a booking for this property
// router.post('/:propertyId', auth, async (req, res) => {
//   try {
//     const { rating, comment } = req.body;
//     const propertyId = req.params.propertyId;
//     const userId = req.user.id;

//     // Validate rating
//     if (!rating || rating < 1 || rating > 5) {
//       return res.status(400).json({ message: 'Rating must be between 1 and 5' });
//     }

//     // Check: user must have at least one booking for this property
//     const booking = await Booking.findOne({ propertyId, userId });
//     if (!booking) {
//       return res.status(403).json({
//         message: 'You can only review properties you have booked',
//       });
//     }

//     // Check: user hasn't already reviewed this property
//     const existing = await Review.findOne({ propertyId, userId });
//     if (existing) {
//       return res.status(400).json({
//         message: 'You have already reviewed this property',
//       });
//     }

//     const review = await Review.create({
//       propertyId,
//       userId,
//       rating: Number(rating),
//       comment: comment?.trim() || '',
//       userName: req.user.fullName,
//     });

//     // Recalculate property's average rating
//     await updatePropertyRating(propertyId);

//     res.status(201).json(review);
//   } catch (err) {
//     if (err.code === 11000) {
//       return res.status(400).json({ message: 'You have already reviewed this property' });
//     }
//     res.status(500).json({ message: 'Failed to submit review' });
//   }
// });

// // ── DELETE /api/reviews/:reviewId ──
// // Admin can delete any review; user can delete their own
// router.delete('/:reviewId', auth, async (req, res) => {
//   try {
//     const review = await Review.findById(req.params.reviewId);
//     if (!review) return res.status(404).json({ message: 'Review not found' });

//     const isOwner = review.userId.toString() === req.user.id;
//     const isAdmin = req.user.role === 'admin';
//     if (!isOwner && !isAdmin) {
//       return res.status(403).json({ message: 'Not authorized' });
//     }

//     const propertyId = review.propertyId;
//     await review.deleteOne();

//     // Recalculate property's average rating after deletion
//     await updatePropertyRating(propertyId);

//     res.json({ message: 'Review deleted' });
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to delete review' });
//   }
// });

// module.exports = router;

// server/routes/reviews.js  — FULL REPLACEMENT
//
// Key fix: the booking check now handles ALL possible field name variants
// (userId, user, createdBy) AND also checks by the user's name as a
// last-resort fallback so existing bookings without userId still work.

// server/routes/reviews.js — FULL REPLACEMENT
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Review = require('../models/Review');
const Property = require('../models/Property');
const Booking = require('../models/Booking');
const auth = require('../middleware/auth');

// ── Helper: safely cast a string to ObjectId ──
function toObjectId(str) {
  try {
    return new mongoose.Types.ObjectId(str);
  } catch {
    return null;
  }
}

// ── Helper: recalculate and save avgRating on the Property ──
async function updatePropertyRating(propertyId) {
  const reviews = await Review.find({ propertyId });
  const avg = reviews.length
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;
  await Property.findByIdAndUpdate(propertyId, {
    avgRating: parseFloat(avg.toFixed(1)),
    reviewCount: reviews.length,
  });
}

// ── GET /api/reviews/:propertyId — public ──
router.get('/:propertyId', async (req, res) => {
  try {
    const reviews = await Review.find({ propertyId: req.params.propertyId })
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load reviews' });
  }
});

// ── POST /api/reviews/:propertyId — logged in users only ──
router.post('/:propertyId', auth, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const propertyId = req.params.propertyId;

    // ── FIX 1: handle both req.user.id and req.user._id ──
    const rawUserId = req.user.id || req.user._id;

    if (!rawUserId) {
      return res.status(401).json({ message: 'Could not identify user from token' });
    }

    // ── FIX 2: cast to ObjectId so Mongoose query works reliably ──
    const userId = toObjectId(rawUserId.toString());
    if (!userId) {
      return res.status(400).json({ message: 'Invalid user ID in token' });
    }

    const propertyObjId = toObjectId(propertyId);
    if (!propertyObjId) {
      return res.status(400).json({ message: 'Invalid property ID' });
    }

    // Validate rating
    if (!rating || Number(rating) < 1 || Number(rating) > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    // ── FIX 3: booking check using ObjectId comparison ──
    // Try all possible field names your Booking model might use
    let booking =
      await Booking.findOne({ propertyId: propertyObjId, userId }) ||
      await Booking.findOne({ propertyId: propertyObjId, user: userId }) ||
      await Booking.findOne({ propertyId: propertyObjId, createdBy: userId });

    // Fallback for old bookings that have no userId — match by name substring
    if (!booking && req.user.fullName) {
      const firstName = req.user.fullName.split(' ')[0];
      booking = await Booking.findOne({
        propertyId: propertyObjId,
        name: { $regex: new RegExp(firstName, 'i') },
      });
    }

    if (!booking) {
      return res.status(403).json({
        message: 'You can only review properties you have booked',
      });
    }

    // ── FIX 4: check for existing review using ObjectId ──
    const existing = await Review.findOne({
      propertyId: propertyObjId,
      userId,
    });
    if (existing) {
      return res.status(400).json({ message: 'You have already reviewed this property' });
    }

    // Create the review
    const review = await Review.create({
      propertyId: propertyObjId,
      userId,
      rating: Number(rating),
      comment: comment?.trim() || '',
      userName: req.user.fullName || req.user.name || 'Anonymous',
    });

    await updatePropertyRating(propertyObjId);

    res.status(201).json(review);

  } catch (err) {
    // ── FIX 5: surface the real error in development ──
    console.error('[Review POST error]', err.message, err.stack);

    if (err.code === 11000) {
      return res.status(400).json({ message: 'You have already reviewed this property' });
    }
    res.status(500).json({
      message: 'Failed to submit review',
      detail: process.env.NODE_ENV !== 'production' ? err.message : undefined,
    });
  }
});

// ── DELETE /api/reviews/:reviewId ──
router.delete('/:reviewId', auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    const rawUserId = req.user.id || req.user._id;
    const isOwner = review.userId.toString() === rawUserId.toString();
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const propertyId = review.propertyId;
    await review.deleteOne();
    await updatePropertyRating(propertyId);

    res.json({ message: 'Review deleted' });
  } catch (err) {
    console.error('[Review DELETE error]', err.message);
    res.status(500).json({ message: 'Failed to delete review' });
  }
});

module.exports = router;