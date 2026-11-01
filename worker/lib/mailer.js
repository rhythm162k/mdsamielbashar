// Sends the contact message to your inbox using the Resend email API.
// (Nodemailer + Gmail SMTP can't run on Cloudflare Workers, so we call Resend over plain HTTPS.)

export async function sendContactMail({ name, email, message }, env = {}, { local = false } = {}) {
  const key = env.RESEND_API_KEY;

  if (!key) {
    // No key yet. While developing on your own computer, just print the message so you can
    // test the form. On the live site this is a real error.
    if (local) {
      console.log('[contact] RESEND_API_KEY not set, printing instead of sending:');
      console.log({ name, email, message });
      return;
    }
    throw new Error('RESEND_API_KEY is not configured.');
  }
  if (!env.CONTACT_TO) throw new Error('CONTACT_TO is not configured.');

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: env.MAIL_FROM || 'Portfolio contact form <onboarding@resend.dev>',
      to: [env.CONTACT_TO],
      reply_to: email, // hit "Reply" and it goes to the visitor
      subject: `Portfolio message from ${name}`,
      text: `${message}\n\n-- ${name} <${email}>`,
    }),
  });

  if (!res.ok) {
    const detail = (await res.text()).slice(0, 200);
    throw new Error(`Resend answered ${res.status}: ${detail}`);
  }
}
