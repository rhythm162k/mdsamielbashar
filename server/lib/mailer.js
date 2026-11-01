// Sends the contact message to your inbox with Nodemailer.
import nodemailer from 'nodemailer';

let transporter;

function getTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;

  if (!transporter) {
    const port = Number(SMTP_PORT) || 465;
    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure: port === 465, // 465 = TLS from the start, 587 = upgrade later
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
  }
  return transporter;
}

export async function sendContactMail({ name, email, message }) {
  const mail = getTransporter();

  if (!mail) {
    // No SMTP details yet. While developing, just print the message so you can
    // test the form. In production this is a real error.
    if (process.env.NODE_ENV === 'production') {
      throw new Error('SMTP is not configured on the server.');
    }
    console.log('[contact] SMTP not configured, printing instead of sending:');
    console.log({ name, email, message });
    return;
  }

  await mail.sendMail({
    from: { name: 'Portfolio contact form', address: process.env.SMTP_USER },
    to: process.env.CONTACT_TO || process.env.SMTP_USER,
    replyTo: { name, address: email }, // hit "Reply" and it goes to the visitor
    subject: `Portfolio message from ${name}`,
    text: `${message}\n\n-- ${name} <${email}>`,
  });
}
