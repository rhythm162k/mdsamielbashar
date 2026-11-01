// The API. Cloudflare runs this for every request that starts with /api (see wrangler.jsonc).
// Everything else (the React site) is served straight from client/dist.
//
// It is built by a function so the tests can create a fresh copy with a fake email sender.
import { validateContact } from './lib/validate.js';
import { sendContactMail } from './lib/mailer.js';

const WINDOW_MS = 15 * 60 * 1000; // 5 messages per visitor per 15 minutes is plenty for a human
const LIMIT = 5;
const MAX_BODY = 10 * 1024; // tiny bodies only: it's a contact form

const json = (data, status = 200, headers = {}) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
      ...headers,
    },
  });

export function createHandler({ sendMail = sendContactMail } = {}) {
  // Best-effort limiter. It lives in memory, so it resets when Cloudflare recycles the worker.
  // The honeypot, validation and your email provider's own limits are the other safety nets.
  const hits = new Map();
  function overLimit(ip) {
    const now = Date.now();
    for (const [key, entry] of hits) if (entry.reset <= now) hits.delete(key);
    const entry = hits.get(ip) ?? { count: 0, reset: now + WINDOW_MS };
    entry.count += 1;
    hits.set(ip, entry);
    return entry.count > LIMIT;
  }

  return async function handle(request, env = {}) {
    const url = new URL(request.url);

    if (url.pathname === '/api/health') return json({ ok: true });

    if (url.pathname === '/api/contact') {
      if (request.method !== 'POST') return json({ error: 'Method not allowed.' }, 405, { Allow: 'POST' });

      const ip = request.headers.get('CF-Connecting-IP') || 'local';
      if (overLimit(ip)) return json({ error: 'Too many messages. Please try again in a few minutes.' }, 429);

      if (Number(request.headers.get('content-length')) > MAX_BODY) {
        return json({ error: 'Message is too large.' }, 413);
      }
      const raw = await request.text();
      if (raw.length > MAX_BODY) return json({ error: 'Message is too large.' }, 413);

      let body;
      try {
        body = JSON.parse(raw);
      } catch {
        return json({ error: 'Invalid JSON.' }, 400);
      }

      const { ok, errors, data, spam } = validateContact(body);

      // Pretend it worked so the bot doesn't learn anything, but send nothing.
      if (spam) return json({ ok: true });
      if (!ok) return json({ error: 'Please check the form.', fields: errors }, 400);

      const local = ['localhost', '127.0.0.1'].includes(url.hostname);
      try {
        await sendMail(data, env, { local });
        return json({ ok: true });
      } catch (err) {
        console.error('[contact] failed to send:', err.message);
        return json({ error: "Your message couldn't be sent right now." }, 502);
      }
    }

    if (url.pathname === '/api' || url.pathname.startsWith('/api/')) return json({ error: 'Not found' }, 404);
    return new Response('Not found', { status: 404 });
  };
}

export default { fetch: createHandler() };
