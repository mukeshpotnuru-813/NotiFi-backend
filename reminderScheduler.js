const cron = require('node-cron');
const mongoose = require('mongoose');
const Event = require('./models/Event');
const sendReminderEmail = require('./utils/emailSender');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Reminder DB connected'))
  .catch(err => console.error('❌ DB connection error:', err));

// Run every minute
cron.schedule('* * * * *', async () => {
  const now = new Date();
  const fifteenMinutesFromNow = new Date(now.getTime() + 15 * 60 * 1000);

  console.log(`\n⏰ [${now.toLocaleString()}] Running scheduler tasks...`);

  try {
    // --- Task 1: Send Reminders (Existing Logic) ---
    const eventsToSend = await Event.find({
      date: { $gte: now, $lte: fifteenMinutesFromNow },
      reminderSent: false
    }).populate('user');

    if (eventsToSend.length > 0) {
      console.log(`📋 Found ${eventsToSend.length} event(s) to remind.`);
      for (const event of eventsToSend) {
        if (event.user && event.user.email) {
          await sendReminderEmail(event.user.email, event);
          event.reminderSent = true;
          await event.save();
          console.log(`✅ Reminder sent for "${event.title}".`);
        } else {
            event.reminderSent = true; 
            await event.save();
        }
      }
    }
    
    // --- MODIFICATION: Task 2: Mark Past Events as Completed ---
    const pastEvents = await Event.find({
      date: { $lt: now },      // Find events where the date is in the past
      isCompleted: false       // And the event is not already marked as completed
    });

    if (pastEvents.length > 0) {
      console.log(`📝 Found ${pastEvents.length} past event(s) to mark as completed.`);
      for (const event of pastEvents) {
        event.isCompleted = true;
        await event.save();
        console.log(`✅ Marked event as completed: "${event.title}"`);
      }
    }
    // --- End of New Task ---

  } catch (err) {
    console.error('❌ CRON JOB ERROR:', err);
  }
});