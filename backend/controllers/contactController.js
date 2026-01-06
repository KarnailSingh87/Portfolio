import nodemailer from 'nodemailer';

// Helper to create a transporter from env or fall back to Ethereal test account
async function getTransporter() {
  const hasHost = !!process.env.EMAIL_HOST;
  const hasAuth = !!process.env.EMAIL_USER;

    if (process.env.EMAIL_HOST && process.env.EMAIL_USER) {
      return nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT ? Number(process.env.EMAIL_PORT) : undefined,
        secure: process.env.EMAIL_SECURE === 'true',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
    }

  // No SMTP config — create a test account (Ethereal) so developers can preview the email
    const testAccount = await nodemailer.createTestAccount();
    return nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: { user: testAccount.user, pass: testAccount.pass },
    });
}

export const sendContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Default receiver: environment ADMIN_EMAIL, fallback to provided address
    const DEFAULT_RECEIVER = 'tamanna.shar12@gmail.com';
    const receiver = process.env.ADMIN_EMAIL || process.env.RECEIVER_EMAIL || DEFAULT_RECEIVER;

    // No SendGrid integration present — use SMTP/Ethereal fallback via Nodemailer

    const transporter = await getTransporter();

    // Build the email (SMTP/Ethereal)
    // Use the configured SMTP user as the From address (prevents many providers from rejecting
    // messages where the From differs from authenticated sender). Set Reply-To to the submitter
    // so you can reply directly.
    const mailOptions = {
      from: process.env.EMAIL_USER || `${name} <${email}>`,
      replyTo: `${name} <${email}>`,
      to: receiver || (process.env.EMAIL_USER || 'no-reply@example.com'),
      subject: `[Portfolio Contact] ${subject}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr />
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log('Contact email sent:', info && info.messageId ? info.messageId : info);

    // If using Ethereal test account, return preview URL so developer can view the email
    let previewUrl = null;
    try {
      previewUrl = nodemailer.getTestMessageUrl(info) || null;
    } catch (e) {
      // ignore
    }

    const resp = { success: true, message: 'Message sent' };
    if (previewUrl) resp.previewUrl = previewUrl;

    return res.json(resp);
  } catch (error) {
    console.error('Contact send error:', error);
    return res.status(500).json({ success: false, message: 'Failed to send message', error: error.message });
  }
};

export default sendContact;
