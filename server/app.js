// The Express app. It is built by a function (not started here) so the tests
// can create a fresh copy and pass in a fake email sender.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import contactRouter from './routes/contact.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, '../client/dist');

export function createApp({ sendMail } = {}) {
  const app = express();

  // We sit behind Render's proxy in production. Without this, every visitor
  // would look like the same IP and the rate limiter would punish everyone.
  app.set('trust proxy', 1);

  // Sensible security headers (also hides "X-Powered-By"). We switch off one default,
  // "upgrade-insecure-requests", because it makes some browsers fail to load the site when
  // you test the production build on plain http://localhost. Hosts like Render use https anyway.
  app.use(
    helmet({
      contentSecurityPolicy: { useDefaults: true, directives: { 'upgrade-insecure-requests': null } },
    }),
  );
  app.use(express.json({ limit: '10kb' })); // tiny bodies only: it's a contact form

  // CORS is only needed when the React site lives on a different domain.
  // Set CLIENT_ORIGIN in .env to switch it on. Same-domain setups skip it.
  if (process.env.CLIENT_ORIGIN) {
    const origins = process.env.CLIENT_ORIGIN.split(',').map((o) => o.trim());
    app.use('/api', cors({ origin: origins }));
  }

  app.get('/api/health', (_req, res) => res.json({ ok: true }));
  app.use('/api/contact', contactRouter({ sendMail }));
  app.use('/api', (_req, res) => res.status(404).json({ error: 'Not found' }));

  // In production the same server also serves the built React site.
  if (process.env.NODE_ENV === 'production') {
    app.use(
      express.static(DIST, {
        setHeaders(res, filePath) {
          // Vite puts a hash in the names of files inside /assets, so they can be cached "forever".
          if (filePath.includes(`${path.sep}assets${path.sep}`)) {
            res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
          }
        },
      }),
    );
    // It is a one-page site (sections use #anchors), so any other address is a plain 404.
    app.use((_req, res) => res.status(404).type('text').send('Not found'));
  }

  // Last stop for errors (bad JSON, body too large, anything unexpected).
  // eslint-disable-next-line no-unused-vars
  app.use((err, _req, res, _next) => {
    if (err.type === 'entity.parse.failed') return res.status(400).json({ error: 'Invalid JSON.' });
    if (err.type === 'entity.too.large') return res.status(413).json({ error: 'Message is too large.' });
    console.error(err);
    res.status(500).json({ error: 'Something went wrong.' });
  });

  return app;
}
