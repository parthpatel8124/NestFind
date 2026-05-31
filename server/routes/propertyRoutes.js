// const express = require('express');
// const router = express.Router();
// const Property = require('../models/Property');
// const auth = require('../middleware/auth');

// const multer = require('multer');
// const cloudinary = require('cloudinary').v2;

// // CLOUDINARY CONFIG
// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_API_SECRET,
// });

// // MULTER
// const storage = multer.memoryStorage();

// const upload = multer({
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 }
// });


// // ================= GET ALL =================
// router.get('/', async (req, res) => {
//   try {

//     const { city, priceMin, priceMax, propertyType, genderPreference } = req.query;

//     const query = {};

//     if (city) query.city = city;
//     if (propertyType) query.propertyType = propertyType;
//     if (genderPreference) query.genderPreference = genderPreference;

//     if (priceMin || priceMax) query.price = {};
//     if (priceMin) query.price.$gte = Number(priceMin);
//     if (priceMax) query.price.$lte = Number(priceMax);

//     let isAuthed = false;

//     if (req.headers.authorization) {
//       try {
//         await new Promise((resolve, reject) =>
//           auth(req, res, err => err ? reject(err) : resolve())
//         );
//         isAuthed = true;
//       } catch {}
//     }

//     if (isAuthed && req.user?.role === 'admin') {
//       // admin sees all
//     } else if (isAuthed && req.user?.id) {
//       query.$or = [{ verified: true }, { ownerId: req.user.id }];
//     } else {
//       query.verified = true;
//     }

//     const properties = await Property.find(query).sort({ createdAt: -1 });

//     res.json(properties);

//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });


// // ================= ADD PROPERTY =================
// router.post('/', auth, upload.array('images', 10), async (req, res) => {
//   try {

//     const payload = req.body || {};

//     if (req.user?.id) payload.ownerId = req.user.id;

//     payload.verified = false;

//     let imageUrls = [];

//     // MULTIPLE IMAGE UPLOAD
//     if (req.files && req.files.length > 0) {

//       imageUrls = await Promise.all(
//         req.files.map(file => {
//           return new Promise((resolve, reject) => {

//             const stream = cloudinary.uploader.upload_stream(
//               { folder: 'campusstay' },
//               (error, result) => {
//                 if (error) return reject(error);
//                 resolve(result.secure_url);
//               }
//             );

//             stream.end(file.buffer);

//           });
//         })
//       );
//     }

//     // ✅ ONLY STORE ARRAY
//     payload.images = imageUrls;

//     // REMOVE SINGLE IMAGE FIELD (IMPORTANT)
//     // ❌ payload.image = imageUrls[0];

//     // amenities fix
//     if (payload.amenities && typeof payload.amenities === 'string') {
//       payload.amenities = JSON.parse(payload.amenities);
//     }

//     const property = new Property(payload);

//     const newProperty = await property.save();

//     res.status(201).json(newProperty);

//   } catch (err) {
//     console.error("UPLOAD ERROR:", err);
//     res.status(500).json({ message: err.message });
//   }
// });


// // ================= GET BY ID =================
// router.get('/:id', async (req, res) => {
//   try {

//     const property = await Property.findById(req.params.id);

//     if (!property) return res.status(404).json({ error: 'Property not found' });

//     res.json(property);

//   } catch {
//     res.status(500).json({ error: 'Server error' });
//   }
// });


// // ================= DELETE =================
// router.delete('/:id', auth, async (req, res) => {
//   try {

//     const prop = await Property.findById(req.params.id);

//     if (!prop) return res.status(404).json({ error: 'Property not found' });

//     if (prop.ownerId.toString() !== req.user.id && req.user.role !== 'admin') {
//       return res.status(403).json({ error: 'Forbidden' });
//     }

//     await prop.deleteOne();

//     res.json({ message: 'Property deleted' });

//   } catch {
//     res.status(500).json({ error: 'Server error' });
//   }
// });


// // ================= VERIFY =================
// router.patch('/:id/verify', auth, async (req, res) => {
//   try {

//     if (req.user.role !== 'admin') {
//       return res.status(403).json({ message: 'Forbidden' });
//     }

//     const updated = await Property.findByIdAndUpdate(
//       req.params.id,
//       { verified: req.body.verified },
//       { new: true }
//     );

//     res.json(updated);

//   } catch {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const Property = require('../models/Property');
const auth = require('../middleware/auth');

const multer = require('multer');
const cloudinary = require('cloudinary').v2;

// CLOUDINARY CONFIG
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// MULTER
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }
});


// ================= GET ALL (FIXED FILTER) =================
// router.get('/', async (req, res) => {
//   try {

//     const { city, priceMin, priceMax, propertyType, genderPreference } = req.query;

//     const query = {};

//     if (city) query.city = { $regex: city, $options: 'i' }; // FIXED
//     if (propertyType) query.propertyType = propertyType;
//     if (genderPreference) query.genderPreference = genderPreference;

//     if (priceMin || priceMax) {
//       query.price = {};
//       if (priceMin) query.price.$gte = Number(priceMin);
//       if (priceMax) query.price.$lte = Number(priceMax);
//     }

//     let isAuthed = false;

//     if (req.headers.authorization) {
//       try {
//         await new Promise((resolve, reject) =>
//           auth(req, res, err => err ? reject(err) : resolve())
//         );
//         isAuthed = true;
//       } catch {}
//     }

//     if (isAuthed && req.user?.role === 'admin') {
//       // admin sees all
//     } else if (isAuthed && req.user?.id) {
//       query.$or = [{ verified: true }, { ownerId: req.user.id }];
//     } else {
//       query.verified = true;
//     }

//     const properties = await Property.find(query).sort({ createdAt: -1 });

//     res.json(properties);

//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });
 
router.get('/', async (req, res) => {
  try {
    const { city, priceMin, priceMax, propertyType, genderPreference } = req.query;
    const query = {};
 
    if (city) query.city = { $regex: city, $options: 'i' };
    if (propertyType) query.propertyType = propertyType;
    if (genderPreference) query.genderPreference = genderPreference;
    if (priceMin || priceMax) {
      query.price = {};
      if (priceMin) query.price.$gte = Number(priceMin);
      if (priceMax) query.price.$lte = Number(priceMax);
    }
 
    // Try to decode JWT from Authorization header without hard-failing
    let userId = null;
    let userRole = null;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      try {
        const jwt = require('jsonwebtoken');
        const decoded = jwt.verify(authHeader.split(' ')[1], process.env.JWT_SECRET);
        userId   = decoded.id || decoded._id;
        userRole = decoded.role;
      } catch {}
    }
 
    if (userRole === 'admin') {
      // Admin sees everything — no filter
    } else if (userId) {
      // Logged-in user: sees verified properties + their own unverified
      query.$or = [
        { verified: true },
        { ownerId: userId }
      ];
    } else {
      // Guest: verified only
      query.verified = true;
    }
 
    const properties = await Property.find(query).sort({ createdAt: -1 });
    res.json(properties);
 
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ================= ADD PROPERTY =================
router.post('/', auth, upload.array('images', 10), async (req, res) => {
  try {

    const payload = req.body || {};

    if (req.user?.id) payload.ownerId = req.user.id;

    payload.verified = false;

    let imageUrls = [];

    if (req.files && req.files.length > 0) {

      imageUrls = await Promise.all(
        req.files.map(file => {
          return new Promise((resolve, reject) => {

            const stream = cloudinary.uploader.upload_stream(
              { folder: 'campusstay' },
              (error, result) => {
                if (error) return reject(error);
                resolve(result.secure_url);
              }
            );

            stream.end(file.buffer);

          });
        })
      );
    }

    payload.images = imageUrls;

    if (payload.amenities && typeof payload.amenities === 'string') {
      payload.amenities = JSON.parse(payload.amenities);
    }

    const property = new Property(payload);

    const newProperty = await property.save();

    res.status(201).json(newProperty);

  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});


// ================= UPDATE PROPERTY (NEW 🔥) =================
router.put('/:id', auth, upload.array('images', 10), async (req, res) => {
  try {

    const property = await Property.findById(req.params.id);

    if (!property) return res.status(404).json({ error: 'Not found' });

    // ✅ OWNER OR ADMIN ONLY
    if (
      property.ownerId.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const updates = req.body;

    // amenities fix
    if (updates.amenities && typeof updates.amenities === 'string') {
      updates.amenities = JSON.parse(updates.amenities);
    }

    // image upload (optional)
    if (req.files && req.files.length > 0) {

      const imageUrls = await Promise.all(
        req.files.map(file => {
          return new Promise((resolve, reject) => {

            const stream = cloudinary.uploader.upload_stream(
              { folder: 'campusstay' },
              (error, result) => {
                if (error) return reject(error);
                resolve(result.secure_url);
              }
            );

            stream.end(file.buffer);

          });
        })
      );

      updates.images = imageUrls;
    }

    const updated = await Property.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );

    res.json(updated);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ================= UPDATE AVAILABILITY (NEW 🔥) =================
router.patch('/:id/availability', auth, async (req, res) => {
  try {

    const property = await Property.findById(req.params.id);

    if (!property) return res.status(404).json({ error: 'Not found' });

    if (
      property.ownerId.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    property.availabilityStatus = req.body.availabilityStatus;

    property.availableFrom =
      req.body.availabilityStatus === 'not_available'
        ? req.body.availableFrom
        : null;

    await property.save();

    res.json(property);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ================= GET BY ID =================
router.get('/:id', async (req, res) => {
  try {

    const property = await Property.findById(req.params.id);

    if (!property) return res.status(404).json({ error: 'Property not found' });

    res.json(property);

  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});


// ================= DELETE (ADMIN ONLY 🔥) =================
router.delete('/:id', auth, async (req, res) => {
  try {

    const prop = await Property.findById(req.params.id);

    if (!prop) return res.status(404).json({ error: 'Property not found' });

    // ✅ ONLY ADMIN CAN DELETE
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Only admin can delete' });
    }

    await prop.deleteOne();

    res.json({ message: 'Property deleted' });

  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});


// ================= VERIFY =================
router.patch('/:id/verify', auth, async (req, res) => {
  try {

    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const updated = await Property.findByIdAndUpdate(
      req.params.id,
      { verified: req.body.verified },
      { new: true }
    );

    res.json(updated);

  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;