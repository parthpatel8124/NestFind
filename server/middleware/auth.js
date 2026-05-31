// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkeythatshouldbeinenv';

// module.exports = function (req, res, next) {
//   const authHeader = req.headers.authorization || req.headers.Authorization;
//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     return res.status(401).json({ message: 'Unauthorized: missing token' });
//   }

//   const token = authHeader.split(' ')[1];
//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     req.user = decoded; // contains id and email (from login)
//     return next();
//   } catch (err) {
//     return res.status(401).json({ message: 'Unauthorized: invalid token' });
//   }
// };

const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkeythatshouldbeinenv';

module.exports = function (req, res, next) {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: missing token' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    // ✅ SAFE USER OBJECT (IMPORTANT FOR YOUR NEW FEATURES)
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role || 'user' // fallback if role not present
    };

    return next();

  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized: invalid token' });
  }
};