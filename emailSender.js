const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, contact, comment } = req.body;

    // Configure nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER, // Use environment variables
        pass: process.env.GMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: 'isikoemanuel.ie@gmail.com,isabiryeelijah15@gmail.com',
      subject: `New Order from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nContact: ${contact}\nComment: ${comment}`
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Error sending email', error: error.toString() });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
