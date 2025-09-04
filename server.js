const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const testEmailRoute = require('./routes/testEmail');
const weatherRoute = require('./routes/weatherRoute');
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const { runReminders } = require('./reminderScheduler'); // make sure you export this
const cron = require('node-cron');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/weather', weatherRoute);
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api', testEmailRoute); // to test email functionality

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
    console.log('✅ MongoDB connected');
  })
  .catch(err => console.error('❌ DB connection error:', err));

// Cron job (runs every minute)
cron.schedule('* * * * *', () => {
  runReminders();
});
