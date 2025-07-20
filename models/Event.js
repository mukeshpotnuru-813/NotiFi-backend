const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: String,
  notes: String,
  location: String,
  date: Date,
  time: String,
  category: String,           // Added for category/tag

  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  reminderSent: { type: Boolean, default: false },
  isCompleted: { type: Boolean, default: false }
});

module.exports = mongoose.model('Event', eventSchema);
