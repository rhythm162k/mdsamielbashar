# Portfolio

Minimal, Apple-style personal portfolio built with React and Vite. Fully responsive (phone, tablet, desktop), with scroll and hover animations, light/dark mode that follows the system, and reduced-motion support.

## Run it

```bash
npm install
npm run dev        # local dev server
npm run build      # production build into /dist
npm run preview    # preview the production build
```

Requires Node 18 or newer.

## Where to edit things

| I want to change...                      | Edit this file                  |
| ---------------------------------------- | ------------------------------- |
| Name, email, links, hero text, projects, education, skills | `src/data/content.js` |
| Logo, portrait, project screenshots      | `src/data/images.js`            |
| Colors, light/dark theme                 | `src/styles/tokens.css`         |
| A section's layout or breakpoints        | that section's `.css` file      |

### Adding your images

1. Put the files in `public/images/` (for example `portrait.jpg`).
2. In `src/data/images.js`, replace `null` with `img('portrait.jpg')`.

Until an image is set, a quiet placeholder is shown in its place. Suggested sizes are in the comments of that file.

### Project links

Both projects have `live: '#'` and `repo: '#'` in `src/data/content.js`. Replace them with your real URLs.

## Structure

```
portfolio/
├── index.html
├── vite.config.js
├── package.json
├── public/
│   ├── favicon.svg            replace with your own
│   └── images/                your logo, portrait and screenshots go here
└── src/
    ├── main.jsx               entry point
    ├── App.jsx                page composition
    ├── data/
    │   ├── content.js         all text and project data
    │   └── images.js          image paths
    ├── styles/
    │   ├── tokens.css         colors, spacing, safe-area variables
    │   └── base.css           reset, typography, layout, reveal animation
    ├── hooks/
    │   ├── useInView.js       fires once when an element scrolls into view
    │   └── useScrollFrame.js  scroll listener throttled to animation frames
    ├── utils/
    │   └── motion.js          reduced-motion check
    └── components/
        ├── layout/
        │   └── Nav.jsx        translucent nav and mobile menu
        ├── sections/
        │   ├── Hero/
        │   ├── Statement/     words brighten as you scroll
        │   ├── Work/          Work.jsx and Project.jsx
        │   ├── About/
        │   ├── Skills/
        │   └── Contact/
        └── ui/                Reveal, CountUp, Media, Button, ArrowLink
```

Each component sits next to its own stylesheet.

## Responsive behavior

- **Phones (up to 560px):** the project stats become stacked rows, the About section stacks with a smaller portrait, and the nav becomes a full-screen menu.
- **Small tablets (up to 760px):** nav uses the full-screen menu.
- **Tablets and up:** the full nav bar is shown; About and project layouts use multiple columns.
- **Touch devices:** hover effects are limited to devices that actually have a pointer.
- **Notched phones:** safe-area insets are respected.

## Deploying

The build uses relative paths, so it works anywhere.

- **Netlify / Vercel:** import the repo. Build command `npm run build`, output directory `dist`.
- **GitHub Pages:** build, then publish the `dist` folder (for example with the `gh-pages` package or a GitHub Action).
