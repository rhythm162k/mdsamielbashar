import { describe, it, expect, vi } from 'vitest';
import request from 'supertest';
import { createApp } from '../app.js';
import { validateContact } from '../lib/validate.js';

const valid = { name: 'Ada Lovelace', email: 'ada@example.com', message: 'Hello, I would like to talk.' };

// A new app per test = a new rate-limit counter per test.
const setup = (sendMail = vi.fn().mockResolvedValue()) => ({ sendMail, app: createApp({ sendMail }) });

describe('GET /api/health', () => {
  it('says ok', async () => {
    const { app } = setup();
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: true });
  });
});

describe('POST /api/contact', () => {
  it('sends a valid message with trimmed values', async () => {
    const { app, sendMail } = setup();
    const res = await request(app)
      .post('/api/contact')
      .send({ ...valid, name: '  Ada Lovelace  ' });
    expect(res.status).toBe(200);
    expect(sendMail).toHaveBeenCalledTimes(1);
    expect(sendMail).toHaveBeenCalledWith(valid);
  });

  it('rejects bad input with per-field errors', async () => {
    const { app, sendMail } = setup();
    const res = await request(app).post('/api/contact').send({ name: '', email: 'nope', message: 'short' });
    expect(res.status).toBe(400);
    expect(Object.keys(res.body.fields).sort()).toEqual(['email', 'message', 'name']);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it('silently ignores the honeypot field', async () => {
    const { app, sendMail } = setup();
    const res = await request(app).post('/api/contact').send({ ...valid, website: 'http://spam.example' });
    expect(res.status).toBe(200);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it('returns 502 when the mail server fails', async () => {
    const { app } = setup(vi.fn().mockRejectedValue(new Error('SMTP down')));
    const res = await request(app).post('/api/contact').send(valid);
    expect(res.status).toBe(502);
  });

  it('returns 400 for malformed JSON', async () => {
    const { app } = setup();
    const res = await request(app).post('/api/contact').set('Content-Type', 'application/json').send('{oops');
    expect(res.status).toBe(400);
  });

  it('rate limits after 5 messages', async () => {
    const { app } = setup();
    for (let i = 0; i < 5; i += 1) {
      const ok = await request(app).post('/api/contact').send(valid);
      expect(ok.status).toBe(200);
    }
    const blocked = await request(app).post('/api/contact').send(valid);
    expect(blocked.status).toBe(429);
  });
});

describe('unknown API routes', () => {
  it('return 404 JSON', async () => {
    const { app } = setup();
    const res = await request(app).get('/api/nope');
    expect(res.status).toBe(404);
    expect(res.body.error).toBeTruthy();
  });
});

describe('validateContact', () => {
  it('rejects a name with a line break (email header injection)', () => {
    expect(validateContact({ ...valid, name: 'Ada\nBcc: evil@example.com' }).errors.name).toBeTruthy();
  });

  it('copes with a missing body', () => {
    expect(validateContact(undefined).ok).toBe(false);
  });
});
