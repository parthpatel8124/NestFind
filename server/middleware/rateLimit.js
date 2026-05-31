// server/middleware/rateLimit.js
// No extra npm package needed — pure Node.js.
// USAGE in server.js (add BEFORE your routes):
//   const { generalLimiter, authLimiter } = require('./middleware/rateLimit');
//   app.use('/api/auth', authLimiter);   // 10 req/min — login/register
//   app.use('/api', generalLimiter);     // 100 req/min — all other routes

const store = new Map();

function createLimiter({ windowMs, max, message }) {
  return (req, res, next) => {
    const ip = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown';
    const now = Date.now();
    if (!store.has(ip)) { store.set(ip, { count: 1, resetAt: now + windowMs }); return next(); }
    const record = store.get(ip);
    if (now > record.resetAt) { store.set(ip, { count: 1, resetAt: now + windowMs }); return next(); }
    if (record.count < max) { record.count++; return next(); }
    const retryAfter = Math.ceil((record.resetAt - now) / 1000);
    res.set('Retry-After', String(retryAfter));
    return res.status(429).json({ message: message || 'Too many requests. Please slow down.', retryAfter });
  };
}

// Cleanup every 10 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, val] of store.entries()) { if (now > val.resetAt) store.delete(key); }
}, 10 * 60 * 1000);

const generalLimiter = createLimiter({ windowMs: 60*1000, max: 100, message: 'Too many requests. Try again in a minute.' });
const authLimiter    = createLimiter({ windowMs: 60*1000, max: 10,  message: 'Too many login attempts. Wait a minute.' });
const writeLimiter   = createLimiter({ windowMs: 60*1000, max: 30,  message: 'Too many requests. Please slow down.' });

module.exports = { generalLimiter, authLimiter, writeLimiter };