const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const testEmailRoute = require('./routes/testEmail');

require('./reminderScheduler');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/weather', require('./routes/weatherRoute'));


app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));

app.use('/api', testEmailRoute); //to test email functionality


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`));
  })
  .catch(err => console.error(err));

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});



