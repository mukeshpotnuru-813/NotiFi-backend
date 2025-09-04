// reminderScheduler.js
const Event = require('./models/Event');
const sendReminderEmail = require('./utils/emailSender');

async function runReminders() {
  try {
    console.log('⏰ Running reminder scheduler...');

    // Example: fetch events happening in the next hour (adjust as needed)
    const now = new Date();
    const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);

    const upcomingEvents = await Event.find({
      reminderTime: { $gte: now, $lte: oneHourLater },
    });

    for (const event of upcomingEvents) {
      await sendReminderEmail(event);
      console.log(`📧 Reminder sent for event: ${event.title}`);
    }
  } catch (err) {
    console.error('❌ Error in reminder scheduler:', err);
    throw err;
  }
}

// Export it so server.js can use it
module.exports = { runReminders };
