// server/cron/bookingCleanupCron.js
//
// What this does:
//   Every day at 2:00 AM, finds bookings where endDate was
//   more than 10 days ago and deletes them permanently.
//
//   Example from screenshot:
//   - "31 Mar → 1 Apr 2026"   endDate = 1 Apr → deletes on 11 Apr 2026
//   - "31 Mar → 2 Apr 2026"   endDate = 2 Apr → deletes on 12 Apr 2026
//   - "26 Mar → 2 Apr 2026"   endDate = 2 Apr → deletes on 12 Apr 2026
//
// SETUP in server.js — call ONCE after mongoose.connect() succeeds:
//   const { startBookingCleanupCron } = require('./cron/bookingCleanupCron');
//   startBookingCleanupCron();

const cron = require('node-cron');
const Booking = require('../models/Booking');

let cronStarted = false; // guard against duplicate registration on reconnect

function startBookingCleanupCron() {
  if (cronStarted) {
    console.log('[BookingCleanup] Already running — skipping duplicate');
    return;
  }
  cronStarted = true;

  // Run at 2:00 AM every day
  cron.schedule('0 2 * * *', async () => {
    try {
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - 10);
      cutoff.setHours(0, 0, 0, 0);

      const result = await Booking.deleteMany({ endDate: { $lt: cutoff } });

      if (result.deletedCount > 0) {
        console.log(`[BookingCleanup] ✅ Deleted ${result.deletedCount} expired booking(s)`);
      } else {
        console.log('[BookingCleanup] No expired bookings today');
      }
    } catch (err) {
      console.error('[BookingCleanup] ❌ Error:', err.message);
    }
  });

  console.log('[BookingCleanup] ✅ Cron scheduled — runs daily at 2:00 AM');

  // Run once on startup to catch any bookings missed while server was offline
  runCleanupNow();
}

async function runCleanupNow() {
  try {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 10);
    cutoff.setHours(0, 0, 0, 0);
    const result = await Booking.deleteMany({ endDate: { $lt: cutoff } });
    if (result.deletedCount > 0) {
      console.log(`[BookingCleanup] Startup cleanup: removed ${result.deletedCount} old booking(s)`);
    }
  } catch (err) {
    console.error('[BookingCleanup] Startup cleanup error:', err.message);
  }
}

module.exports = { startBookingCleanupCron, runCleanupNow };