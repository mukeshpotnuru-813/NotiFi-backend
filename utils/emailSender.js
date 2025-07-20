/*const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // or use your email provider’s SMTP
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendReminderEmail = async (to, event) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: `Reminder: ${event.title} is coming up!`,
    html: `
      <h3>Event Reminder</h3>
      <p><strong>Title:</strong> ${event.title}</p>
      <p><strong>Date:</strong> ${new Date(event.date).toLocaleDateString()}</p>
      <p><strong>Time:</strong> ${event.time}</p>
      <p><strong>Location:</strong> ${event.location}</p>
      <p><strong>Notes:</strong> ${event.notes || 'None'}</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to} for event "${event.title}"`);
  } catch (err) {
    console.error('Error sending email:', err);
  }
};

module.exports = sendReminderEmail;*/
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendReminderEmail = async (to, event) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: `Reminder: ${event.title}`,
    html: `
      <h3>Event Reminder</h3>
      <p><strong>${event.title}</strong> is happening soon.</p>
      <p><strong>Date:</strong> ${new Date(event.date).toLocaleString()}</p>
      <p><strong>Notes:</strong> ${event.notes}</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${to}`);
  } catch (err) {
    console.error(`❌ Email failed to ${to}`, err);
  }
};

module.exports = sendReminderEmail;

