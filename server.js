// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cron = require('node-cron');

const testEmailRoute = require('./routes/testEmail');
const weatherRoute = require('./routes/weatherRoute');
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const { runReminders } = require('./reminderScheduler'); // ✅ fixed import

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/weather', weatherRoute);
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api', testEmailRoute);

// DB Connection
if (!process.env.MONGO_URI) {
  console.error('❌ MONGO_URI is not set in .env');
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  })
  .catch((err) => console.error('❌ DB connection error:', err));

// Cron job → runs every minute
cron.schedule('* * * * *', () => {
  runReminders().catch((err) =>
    console.error('❌ runReminders error:', err)
  );
});
