const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/', async (req, res) => {
  const { email, phone, address, query } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      }
    });

    const mailOptions = {
      from: email,
      to: 'amareshkoneti@gmail.com',
      subject: 'New User Query',
      html: `
        <h3>User Query</h3>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Address:</strong> ${address}</p>
        <p><strong>Query:</strong><br/>${query}</p>
      `
    };

    await transporter.sendMail(mailOptions);
    res.status(200).send('Query sent successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to send query');
  }
});

module.exports = router;
