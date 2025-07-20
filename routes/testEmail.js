const express = require('express');
const router = express.Router();
const sendReminderEmail = require('../utils/emailSender');

router.get('/test-email', async (req, res) => {
  try {
    await sendReminderEmail('mukeshpotnuru2005@gmail.com', {
      title: 'Test Event',
      notes: 'This is a test reminder email.',
      date: new Date(),
      location: 'Test Location'
    });
    res.send('Test email sent!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Email sending failed.');
  }
});

module.exports = router;
