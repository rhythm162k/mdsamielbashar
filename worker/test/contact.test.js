import { describe, it, expect, vi } from 'vitest';
import { createHandler } from '../index.js';
import { sendContactMail } from '../lib/mailer.js';
import { validateContact } from '../lib/validate.js';

const valid = { name: 'Ada Lovelace', email: 'ada@example.com', message: 'Hello, I would like to talk.' };

// A new handler per test = a new rate-limit counter per test.
const setup = (sendMail = vi.fn(async () => {})) => ({ sendMail, handle: createHandler({ sendMail }) });

const post = (body, { raw = false, ip = '1.2.3.4' } = {}) =>
  new Request('https://site.test/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'CF-Connecting-IP': ip },
    body: raw ? body : JSON.stringify(body),
  });

describe('GET /api/health', () => {
  it('says ok', async () => {
    const { handle } = setup();
    const res = await handle(new Request('https://site.test/api/health'));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
  });
});

describe('POST /api/contact', () => {
  it('sends a valid message with trimmed values', async () => {
    const { handle, sendMail } = setup();
    const res = await handle(post({ ...valid, name: '  Ada Lovelace  ' }), {});
    expect(res.status).toBe(200);
    expect(sendMail).toHaveBeenCalledTimes(1);
    expect(sendMail.mock.calls[0][0]).toEqual(valid);
  });

  it('rejects bad input with per-field errors', async () => {
    const { handle, sendMail } = setup();
    const res = await handle(post({ name: '', email: 'nope', message: 'short' }));
    expect(res.status).toBe(400);
    expect(Object.keys((await res.json()).fields).sort()).toEqual(['email', 'message', 'name']);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it('silently ignores the honeypot field', async () => {
    const { handle, sendMail } = setup();
    const res = await handle(post({ ...valid, website: 'http://spam.example' }));
    expect(res.status).toBe(200);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it('returns 502 when the email service fails', async () => {
    const { handle } = setup(vi.fn(async () => { throw new Error('Resend down'); }));
    const res = await handle(post(valid));
    expect(res.status).toBe(502);
  });

  it('returns 400 for malformed JSON', async () => {
    const { handle } = setup();
    const res = await handle(post('{oops', { raw: true }));
    expect(res.status).toBe(400);
  });

  it('returns 413 for a huge body', async () => {
    const { handle } = setup();
    const res = await handle(post({ ...valid, message: 'x'.repeat(20000) }));
    expect(res.status).toBe(413);
  });

  it('answers 405 to GET', async () => {
    const { handle } = setup();
    const res = await handle(new Request('https://site.test/api/contact'));
    expect(res.status).toBe(405);
  });

  it('rate limits after 5 messages, per visitor', async () => {
    const { handle } = setup();
    for (let i = 0; i < 5; i += 1) {
      expect((await handle(post(valid))).status).toBe(200);
    }
    expect((await handle(post(valid))).status).toBe(429);
    expect((await handle(post(valid, { ip: '9.9.9.9' }))).status).toBe(200); // someone else is fine
  });
});

describe('unknown routes', () => {
  it('return 404 JSON under /api', async () => {
    const { handle } = setup();
    const res = await handle(new Request('https://site.test/api/nope'));
    expect(res.status).toBe(404);
    expect((await res.json()).error).toBeTruthy();
  });
});

describe('sendContactMail (Resend)', () => {
  const env = { RESEND_API_KEY: 're_test', CONTACT_TO: 'me@example.com', MAIL_FROM: 'Site <hi@example.com>' };

  it('calls the Resend API with the right shape', async () => {
    const realFetch = globalThis.fetch;
    const fake = vi.fn(async () => new Response('{}', { status: 200 }));
    globalThis.fetch = fake;
    try {
      await sendContactMail(valid, env);
    } finally {
      globalThis.fetch = realFetch;
    }
    const [url, init] = fake.mock.calls[0];
    expect(url).toBe('https://api.resend.com/emails');
    expect(init.headers.Authorization).toBe('Bearer re_test');
    const sent = JSON.parse(init.body);
    expect(sent.to).toEqual(['me@example.com']);
    expect(sent.reply_to).toBe('ada@example.com');
    expect(sent.from).toBe('Site <hi@example.com>');
    expect(sent.text.includes('Ada Lovelace')).toBe(true);
  });

  it('throws when Resend refuses', async () => {
    const realFetch = globalThis.fetch;
    globalThis.fetch = vi.fn(async () => new Response('bad key', { status: 401 }));
    let error;
    try {
      await sendContactMail(valid, env);
    } catch (e) {
      error = e;
    } finally {
      globalThis.fetch = realFetch;
    }
    expect(error.message.includes('401')).toBe(true);
  });

  it('throws on the live site without a key, but only prints locally', async () => {
    let error;
    try {
      await sendContactMail(valid, {}, { local: false });
    } catch (e) {
      error = e;
    }
    expect(Boolean(error)).toBe(true);
    await sendContactMail(valid, {}, { local: true }); // must not throw
  });
});

describe('validateContact', () => {
  it('rejects a name with a line break (email header injection)', () => {
    expect(Boolean(validateContact({ ...valid, name: 'Ada\nBcc: evil@example.com' }).errors.name)).toBe(true);
  });

  it('copes with a missing body', () => {
    expect(validateContact(undefined).ok).toBe(false);
  });
});
