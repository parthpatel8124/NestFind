// const mongoose = require('mongoose');

// const PropertySchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String, default: '' },
//   city: { type: String, required: true },
//   area: { type: String, default: '' },
//   price: { type: Number, required: true },
//   propertyType: { type: String, enum: ['PG', 'Flat', 'Apartment'], required: true },
//   genderPreference: { type: String, enum: ['Boys', 'Girls', 'Any'], default: 'Any' },
//   size: { type: String },
//   amenities: { type: [String], default: [] },

//   image: { type: String, default: '' },
//   images: { type: [String], default: [] },

//   contact: { type: String, default: '' },
//   verified: { type: Boolean, default: false },
//   ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

//   // ✅ NEW (MAP)
//   latitude: { type: Number },
//   longitude: { type: Number },

//   createdAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model('Property', PropertySchema);

const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  city: { type: String, required: true },
  area: { type: String, default: '' },
  price: { type: Number, required: true },
  propertyType: { type: String, enum: ['PG', 'Flat', 'Apartment'], required: true },
  genderPreference: { type: String, enum: ['Boys', 'Girls', 'Any'], default: 'Any' },
  size: { type: String },
  amenities: { type: [String], default: [] },

  image: { type: String, default: '' },
  images: { type: [String], default: [] },

  contact: { type: String, default: '' },
  verified: { type: Boolean, default: false },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

  // ✅ MAP
  // ── THE TWO FIELDS CAUSING THE MAP BUG ──
    lat:                { type: Number, default: null },      
    lng:                { type: Number, default: null }, 


  // ✅ NEW AVAILABILITY SYSTEM
  availabilityStatus: {
    type: String,
    enum: ['available', 'not_available'],
    default: 'available'
  },

  availableFrom: {
    type: Date,
    default: null
  },
   avgRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  reviewCount: {
    type: Number,
    default: 0,
  },

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Property', PropertySchema);