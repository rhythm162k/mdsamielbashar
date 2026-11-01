# Rhythm: portfolio

A personal portfolio with a **React (Vite)** front end and a small **Node/Express** back end that powers the contact form.

It mixes two designs:

| From your Apple-style portfolio                           | From the HE portfolio                                       |
| --------------------------------------------------------- | ----------------------------------------------------------- |
| Clean layout, light and dark mode that follows the system | Cyan and navy colours, soft drifting colour blobs           |
| Hero that rises in, words that brighten as you scroll     | Serif italic display headings (Cormorant Garamond)          |
| Project stats that count up, nav with mobile menu         | Name preloader, scrolling ticker band                       |
| Plain CSS next to each component, no animation library    | Image wipe-in reveal and mouse tilt, big name at the bottom |

New in this version: the contact form (React form, Express route, email via Nodemailer), and smaller images (the portrait went from 19 MB to about 170 KB).

---

## Run it

You need Node **20.19 or newer** (22 is the safest choice; Vite 8 needs it). Check with `node -v`. On a Mac, the easiest way to get it is `brew install node` or `nvm install 22`.

```bash
npm install        # installs the client AND the server (npm workspaces)
npm run dev        # starts both: site on http://localhost:5173, API on :8787
```

Open **http://localhost:5173**. (Stop the servers any time with `Ctrl + C` in the terminal.) The contact form already works in development: with no email settings it prints the message in the terminal instead of sending it.

Other commands:

```bash
npm run build      # builds the site into client/dist
npm start          # production mode: Express serves the built site AND the API on :8787
npm test           # server tests (Vitest + Supertest)
```

**If `npm install` ever goes wrong** (it works the same on Mac and Linux), do a clean reinstall:

```bash
rm -rf node_modules client/node_modules server/node_modules package-lock.json
npm install
```

Don't run `npm audit fix`. On Mac it can fail with `EBADPLATFORM`, because the lock file lists esbuild binaries for other systems (like AIX). That error is harmless and the project doesn't need it; a plain `npm install` is all you need.

## Where to edit things

| I want to change...                                                                                | Edit this                                                                    |
| -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Name, links, hero text, projects, education, skills, ticker words, the "open to internships" badge | `client/src/data/content.js`                                                 |
| Pictures (portrait, logo, screenshots)                                                             | put files in `client/public/images/`, names in `client/src/data/images.js`   |
| Colours, light/dark theme, fonts                                                                   | `client/src/styles/tokens.css`                                               |
| One section's layout                                                                               | that section's `.css` file                                                   |
| The order of sections, or removing one                                                             | `client/src/App.jsx`                                                         |
| Resume PDF                                                                                         | replace `client/public/MD_Sami_El_Bashar_Rhythm_Resume.pdf` (same file name) |
| Contact form rules (lengths, rate limit)                                                           | `server/lib/validate.js`, `server/routes/contact.js`                         |

Quick tweaks:

- **No preloader:** delete `<Preloader />` in `App.jsx`.
- **No blobs:** delete `<Blobs />` in `Hero.jsx` and `Work.jsx`.
- **No "open to internships" badge:** set `AVAILABLE.open` to `false` in `content.js`.
- **Different accent colour:** change `--accent`, `--accent-fill`, `--grad-a/b` and the `--blob-*` colours in `tokens.css`.
- **Slower or faster ticker:** the `40s` in `client/src/components/ui/Ticker.css`.

## How the pieces fit

```
Browser
  |  GET /            -> the React site
  |  POST /api/contact -> the Express server -> validates -> sends email with Nodemailer
```

- **While developing** there are two servers. Vite serves the site; any request starting with `/api` is forwarded to Express (see `proxy` in `client/vite.config.js`). So the browser thinks everything is one site and you don't need CORS.
- **In production** there is one server. Express serves the built files from `client/dist` and also answers `/api`.

```
client/src
  main.jsx            entry: loads fonts + styles
  App.jsx             the page, top to bottom
  data/               ALL the text and image paths
  styles/             tokens.css (colours/fonts), base.css (reset, type, reveal)
  hooks/              useInView (fire once on scroll), useScrollFrame, useTilt (mouse tilt)
  utils/              motion.js (reduced-motion check), contact.js (form check + fetch)
  components/
    layout/           Nav, Preloader
    sections/         Hero, Statement, Work, About, Skills, Resume, Contact
    ui/               Reveal, Media, Button, ArrowLink, CountUp, Blobs, Ticker, PulseDot

server
  index.js            starts the server
  app.js              Express app: security headers, JSON parsing, routes, serves the site
  routes/contact.js   POST /api/contact (rate limit, validation, honeypot, send)
  lib/validate.js     the form rules (server is the source of truth)
  lib/mailer.js       Nodemailer
  test/               Vitest + Supertest tests
```

## Making the contact form send real email

1. In `server/`, copy `.env.example` to `.env`.
2. Fill in the SMTP values. With Gmail: turn on 2-step verification, create an **App password** (Google Account, Security, App passwords) and paste it as `SMTP_PASS`. Never use your normal Gmail password.
3. Restart `npm run dev` and send a test message.

What the route does for each message: rate limit (5 per 15 minutes per visitor), size limit (10 KB), validation, a hidden "honeypot" field that bots fill in, and a `Reply-To` header so pressing Reply in your inbox answers the visitor. If anything fails, the form shows a mailto link as a fallback.

## Deploying

**GitHub Pages (this repo).** Pushing to `main` runs `.github/workflows/deploy.yml`, which builds `client/` and publishes `client/dist`. One-time setup: repo **Settings > Pages > Source: GitHub Actions**. GitHub Pages only hosts the static site, so the contact form needs the API hosted elsewhere (see the Render section below). Until then the form shows the mailto fallback.

**One service on Render (simplest).** New > Web Service, connect the repo, then:

- Build command: `npm install --include=dev && npm run build`
- Start command: `npm start`
- Environment variables: the ones from `.env.example` (`CONTACT_TO`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`)

**Site on one host, API on another** (for example the site stays on GitHub Pages). Deploy only the server on Render, set `CLIENT_ORIGIN=https://your-site-address` on it, and build the client with `VITE_API_URL=https://your-api.onrender.com`. Free Render services sleep when idle, so the first message after a quiet period can be slow; the mailto fallback covers failures.

## Things to know

- **I could not run `npm install` or a build while writing this** (no network in my sandbox), so the first run is the real test. If something errors, paste the message back and it should be a quick fix. The server's validation logic and syntax were checked; the Vitest tests were written but not run.
- **Project screenshots are small** (770 px wide). They look soft on high-density screens. Re-capturing them at about 1600 px wide would help.
- **Link-preview image:** add a 1200 x 630 `og.png` after deploying; the exact tags to add are in a comment in `client/index.html`.
- Fonts are bundled through `@fontsource` packages, so the site no longer calls Google Fonts.
