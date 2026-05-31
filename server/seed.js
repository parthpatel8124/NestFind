const mongoose = require('mongoose');
const Property = require('./models/Property');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/real-estate-db';

const sampleProperties = [
  {
    title: 'Modern Downtown Apartment',
    description: 'Beautiful 2-bedroom apartment in the heart of downtown with stunning city views, modern amenities, and excellent location near public transport.',
    price: 450000,
    location: 'New York, NY',
    size: '1200 sq ft',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a9f6fef4d?w=500&h=400&fit=crop',
    contact: '(555) 123-4567'
  },
  {
    title: 'Luxury Villa with Pool',
    description: 'Spacious 4-bedroom villa with private pool, garden, and panoramic views. Perfect for families looking for comfort and luxury.',
    price: 850000,
    location: 'Los Angeles, CA',
    size: '3500 sq ft',
    image: 'https://images.unsplash.com/photo-1570129477492-45a003537e1f?w=500&h=400&fit=crop',
    contact: '(555) 234-5678'
  },
  {
    title: 'Cozy Studio Near Park',
    description: 'Charming studio apartment with modern design, perfect for young professionals. Walking distance to parks and restaurants.',
    price: 320000,
    location: 'San Francisco, CA',
    size: '600 sq ft',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&h=400&fit=crop',
    contact: '(555) 345-6789'
  },
  {
    title: 'Executive Penthouse',
    description: 'Ultra-luxury penthouse with floor-to-ceiling windows, premium finishes, and exclusive building amenities.',
    price: 1500000,
    location: 'Chicago, IL',
    size: '2800 sq ft',
    image: 'https://images.unsplash.com/photo-1512917774080-9264f475c67d?w=500&h=400&fit=crop',
    contact: '(555) 456-7890'
  },
  {
    title: 'Family House with Garage',
    description: '3-bedroom house with 2-car garage, backyard, and modern kitchen. Great neighborhood with good schools nearby.',
    price: 550000,
    location: 'Austin, TX',
    size: '2000 sq ft',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&h=400&fit=crop',
    contact: '(555) 567-8901'
  },
  {
    title: 'Waterfront Condo',
    description: 'Stunning waterfront property with marina access, modern finishes, and breathtaking water views.',
    price: 725000,
    location: 'Miami, FL',
    size: '1800 sq ft',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&h=400&fit=crop',
    contact: '(555) 678-9012'
  },
  {
    title: 'Historic Home Renovation',
    description: 'Beautifully restored historic home with character, large lot, and updated systems. Perfect for those who appreciate classic architecture.',
    price: 625000,
    location: 'Boston, MA',
    size: '2200 sq ft',
    image: 'https://images.unsplash.com/photo-1570129477492-45a003537e1f?w=500&h=400&fit=crop',
    contact: '(555) 789-0123'
  },
  {
    title: 'Investment Opportunity',
    description: 'Multi-unit apartment building with steady rental income. Great investment property in high-demand area.',
    price: 950000,
    location: 'Seattle, WA',
    size: '4500 sq ft',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a9f6fef4d?w=500&h=400&fit=crop',
    contact: '(555) 890-1234'
  }
];

const sampleRoommates = [
  {
    title: 'Looking for a roommate near campus',
    description: 'Third year student looking for a calm roommate near the university. Prefer non-smoker.',
    city: 'Bengaluru',
    area: 'Koramangala',
    preferredGender: 'Any',
    budgetMin: 5000,
    budgetMax: 10000,
    amenitiesNeeded: ['WiFi', 'Attached Bathroom'],
  },
  {
    title: 'Roommate needed for 2BHK',
    description: 'Looking for a working professional to share a 2BHK in a quiet neighborhood.',
    city: 'Pune',
    area: 'Kharadi',
    preferredGender: 'Boys',
    budgetMin: 8000,
    budgetMax: 15000,
    amenitiesNeeded: ['Parking', 'Power Backup'],
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB Connected');

    // Clear existing properties
    await Property.deleteMany({});
    console.log('Cleared existing properties');

    // Insert sample properties
    const result = await Property.insertMany(sampleProperties);
    console.log(`✅ Added ${result.length} sample properties to database`);

    // Insert roommate requests
    const Roommate = require('./models/Roommate');
    const User = require('./models/User');

    // create a sample user to own roommate posts
    const sampleUser = new User({ fullName: 'Sunil Kumar', email: 'sunil@example.com', password: 'password123', role: 'user' });
    await sampleUser.save();

    // attach ownerId to roommate samples
    const roommatesWithOwner = sampleRoommates.map(r => ({ ...r, ownerId: sampleUser._id }));
    const rr = await Roommate.insertMany(roommatesWithOwner);
    console.log(`✅ Added ${rr.length} sample roommate requests to database`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
}

seedDatabase();
