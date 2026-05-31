// availabilityCron.js
// Place this file in: server/cron/availabilityCron.js (or wherever your utils live)
//
// This cron job runs every hour and automatically sets properties to "available"
// when their availableFrom date has been reached.
//
// SETUP — in your main server.js or app.js, add:
//   const startAvailabilityCron = require('./cron/availabilityCron');
//   startAvailabilityCron();

const cron = require('node-cron');
const Property = require('../models/Property'); // adjust path to your Property model

function startAvailabilityCron() {

  // Runs every hour at minute 0 (e.g. 1:00, 2:00, 3:00...)
  // Change '0 * * * *' to '* * * * *' to run every minute during development
  cron.schedule('0 * * * *', async () => {

    try {
      const now = new Date();

      // Find all properties that are:
      //   1. Currently marked as not_available
      //   2. Have an availableFrom date that is today or in the past
      const result = await Property.updateMany(
        {
          availabilityStatus: 'not_available',
          availableFrom: { $lte: now },
          availableFrom: { $ne: null, $exists: true, $ne: '' }
        },
        {
          $set: {
            availabilityStatus: 'available',
            availableFrom: null   // clear the date once triggered
          }
        }
      );

      if (result.modifiedCount > 0) {
        console.log(`[Availability Cron] ✅ Auto-set ${result.modifiedCount} propert${result.modifiedCount === 1 ? 'y' : 'ies'} to available`);
      }

    } catch (err) {
      console.error('[Availability Cron] ❌ Error:', err.message);
    }

  });

  console.log('[Availability Cron] ✅ Scheduler started — checks every hour');
}

module.exports = startAvailabilityCron;