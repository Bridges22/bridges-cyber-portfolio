const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setup Nodemailer
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'bridges.cybersec@gmail.com',
    pass: 'rbmu rvkn eqpl fzcg',
  },
});

// API to handle form submissions
app.post('/submit-form', (req, res) => {
  const { name, email, subject, message } = req.body;

  // Validate input data
  if (!name || !email || !subject || !message) {
    return res.status(400).send('All fields are required.');
  }

  // Setup email data
  const mailOptions = {
    from: 'bridges.cybersec@gmail.com',
    replyTo: email,
    to: 'bridges.cybersec@gmail.com',
    subject: `Contact Form Submission: ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error while sending email:', error);
      return res.status(500).send('Error while sending email.');
    }
    res.status(200).send('Email sent successfully!');
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
