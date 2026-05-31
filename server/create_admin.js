/* Usage:
   node create_admin.js --email=admin@example.com --password=secret --fullName="Admin User"
   This will create or update an `admin` user with the given email and hashed password.
*/

const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config();

function parseArgs() {
  const args = process.argv.slice(2);
  const out = {};
  args.forEach(a => {
    const m = a.match(/^--([^=]+)=(.*)$/);
    if (m) out[m[1]] = m[2];
  });
  return out;
}

async function main() {
  const args = parseArgs();
  // ADMIN_CREATION_TOKEN safeguard: if ADMIN_CREATION_TOKEN is set in env,
  // require the caller to pass --token=<value> that matches it.
  const providedToken = args.token;
  const requiredToken = process.env.ADMIN_CREATION_TOKEN;
  if (requiredToken) {
    if (!providedToken || providedToken !== requiredToken) {
      console.error('Admin creation not authorized. Set ADMIN_CREATION_TOKEN in env and pass --token=<value>');
      process.exit(1);
    }
  } else {
    console.warn('Warning: ADMIN_CREATION_TOKEN not set; admin creation will proceed without token. Set ADMIN_CREATION_TOKEN to require a token.');
  }
  const email = args.email;
  const password = args.password;
  const fullName = args.fullName || 'Admin';

  if (!email || !password) {
    console.error('Please provide --email and --password');
    process.exit(1);
  }

  const MONGO = process.env.MONGO_URI;
  if (!MONGO) {
    console.error('MONGO_URI not set in .env');
    process.exit(1);
  }

  await mongoose.connect(MONGO);
  console.log('Connected to MongoDB');

  try {
    // Let User model's pre-save middleware hash the plain password to avoid double-hashing
    let user = await User.findOne({ email });
    if (user) {
      user.fullName = fullName;
      user.password = password; // plain password, will be hashed by pre-save hook
      user.role = 'admin';
      await user.save();
      console.log('Updated existing user to admin (password reset):', email);
    } else {
      user = new User({ fullName, email, password: password, role: 'admin' });
      await user.save();
      console.log('Created admin user:', email);
    }
  } catch (err) {
    console.error('Error:', err.message || err);
  } finally {
    mongoose.disconnect();
  }
}

main();
