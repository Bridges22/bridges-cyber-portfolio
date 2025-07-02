const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve frontend files
app.use(express.static(path.join(__dirname, '../frontend')));

// Setup Nodemailer
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'bridges.cybersec@gmail.com',
    pass: 'rbmu rvkn eqpl fzcg',
  }
});

// API to handle form submissions
app.post('/submit-form', (req, res) => {
  const { name, email, subject, message, type } = req.body;

  if (!email) {
    return res.status(400).send('Email is required.');
  }

  const mailOptions = {
    from: 'bridges.cybersec@gmail.com',
    replyTo: email,
    to: 'bridges.cybersec@gmail.com',
    subject: `Contact Form Submission: ${subject || 'No subject'} (${type || 'contact'})`,
    text: `Name: ${name || 'N/A'}\nEmail: ${email}\nMessage: ${message || 'N/A'}`
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.error('Error while sending email:', error);
      return res.status(500).send('Error while sending email.');
    }
    res.status(200).send('Email sent successfully!');
  });
});

// Fallback route for SPA
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
