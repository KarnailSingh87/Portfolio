import nodemailer from 'nodemailer';

// Send contact message via SMTP. Configure SMTP settings via environment variables:
// EMAIL_HOST, EMAIL_PORT, EMAIL_SECURE (true/false), EMAIL_USER, EMAIL_PASS, ADMIN_EMAIL
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT ? Number(process.env.EMAIL_PORT) : undefined,
  secure: process.env.EMAIL_SECURE === 'true',
  auth: process.env.EMAIL_USER
    ? { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
    : undefined,
});

export const sendContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const receiver = process.env.ADMIN_EMAIL || process.env.RECEIVER_EMAIL;
    if (!receiver) {
      console.error('No receiver email configured (ADMIN_EMAIL)');
      return res.status(500).json({ success: false, message: 'Mail receiver not configured' });
    }

    // Build the email
    const mailOptions = {
      from: `${name} <${email}>`,
      to: receiver,
      subject: `[Portfolio Contact] ${subject}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr />
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `,
    };

    // If transporter has no auth and host, nodemailer will attempt direct delivery which often fails.
    const info = await transporter.sendMail(mailOptions);

    console.log('Contact email sent:', info && info.messageId ? info.messageId : info);
    return res.json({ success: true, message: 'Message sent' });
  } catch (error) {
    console.error('Contact send error:', error);
    return res.status(500).json({ success: false, message: 'Failed to send message' });
  }
};

export default sendContact;
