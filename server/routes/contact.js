import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { validateContact } from '../lib/validate.js';
import { sendContactMail } from '../lib/mailer.js';

// `sendMail` can be swapped out, which is how the tests avoid sending real emails.
export default function contactRouter({ sendMail = sendContactMail } = {}) {
  const router = Router();

  // 5 messages per visitor per 15 minutes is plenty for a human.
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: { error: 'Too many messages. Please try again in a few minutes.' },
  });

  router.post('/', limiter, async (req, res) => {
    const { ok, errors, data, spam } = validateContact(req.body);

    // Pretend it worked so the bot doesn't learn anything, but send nothing.
    if (spam) return res.json({ ok: true });

    if (!ok) return res.status(400).json({ error: 'Please check the form.', fields: errors });

    try {
      await sendMail(data);
      res.json({ ok: true });
    } catch (err) {
      console.error('[contact] failed to send:', err.message);
      res.status(502).json({ error: "Your message couldn't be sent right now." });
    }
  });

  return router;
}
