import { IMAGES } from "./images";

export const PROFILE = {
  name: "Md. Sami-El Bashar Rhythm",
  short: "Rhythm",
  email: "mdsamielbashar@gmail.com",
  github: "https://github.com/rhythm162k",
  linkedin: "https://www.linkedin.com/in/md-sami-el-bashar-rhythm-24100b27b",
  location: "Mymensingh, Bangladesh",
};

export const NAV_LINKS = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export const HERO = {
  line1: "I build web apps,",
  line2: "front to back.",
  sub: "Computer science graduate working with React, Node.js and PostgreSQL.",
};

export const STATEMENT =
  "I build web applications end to end: the interface people use, the API behind it, and the database underneath. I like getting the fundamentals right. Structure, security, and performance I can actually measure.";

export const PROJECTS = [
  {
    name: "My Movie Diary",
    date: "Aug 2026",
    tagline:
      "A multi-user movie diary with a React frontend and a REST API on PostgreSQL.",
    image: IMAGES.movieDiary,
    live: "#", // TODO: live demo URL
    repo: "#", // TODO: GitHub repo URL
    stats: [
      { to: 10, label: "REST API endpoints" },
      {
        to: 99,
        prefix: "~",
        suffix: " ms",
        label: "Warm response on the movie-list endpoint",
      },
      { to: 15, label: "bcrypt salt rounds" },
    ],
    points: [
      "React and Vite on the front, a Node.js and Express API behind it, with Supabase-hosted PostgreSQL underneath.",
      "Sessions are stored in PostgreSQL and sent as httpOnly, secure, sameSite cookies. Google sign-in runs through Passport.js.",
      "Every query is parameterized and scoped to the signed-in user. Unauthenticated requests to movie routes get a 401.",
      "Posters come from the OMDb API with a fallback image. Duplicate entries are rejected case-insensitively with a 409.",
      "Deployed on Render with production CORS, environment-based configuration and SPA routing.",
    ],
    tags: [
      "React",
      "Vite",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Supabase",
      "Passport.js",
    ],
  },
  {
    name: "First Cost",
    date: "Jun 2026",
    tagline:
      "A personal finance tracker that runs entirely in the browser, built with MVC.",
    image: IMAGES.firstCost,
    live: "#",
    repo: "#",
    stats: [
      { to: 10, label: "View classes on a shared base" },
      { to: 3, label: "Transaction types" },
      { to: 4, label: "Metrics on the dashboard" },
    ],
    points: [
      "Written in plain JavaScript with a model layer, a controller and ten view classes extending one base Views class.",
      "Tracks multiple accounts, filters by three criteria, and charts spending with two Chart.js charts.",
      "Data lives in localStorage. Deployed to GitHub Pages with a single Parcel build command.",
    ],
    tags: ["JavaScript", "OOP", "MVC", "Chart.js", "Parcel"],
  },
];

export const EDUCATION = {
  degree: "B.Sc. in Computer Science & Engineering",
  school: "Daffodil International University, Dhaka",
  facts: [
    ["Graduated", "January 2026"],
    ["GPA", "3.72 / 4.0"],
    [
      "Coursework",
      "Data Structures & Algorithms, Object Oriented Programming, AI/ML",
    ],
    ["Also", "AWS Cloud Practitioner Essentials, September 2026"],
  ],
};

export const SKILLS = [
  [
    "Backend",
    [
      "Node.js",
      "Express.js",
      "REST API design",
      "OOP",
      "Session auth",
      "OAuth 2.0",
      "bcrypt",
      "CORS",
    ],
  ],
  ["Databases", ["PostgreSQL", "SQL", "Relational schema design"]],
  ["Frontend", ["React", "JavaScript", "HTML", "CSS"]],
  ["Testing", ["Vitest", "Supertest", "React Testing Library"]],
  ["Tools", ["Git", "GitHub", "Render", "Environment-based config"]],
];

export const RESUME = {
  file: `${import.meta.env.BASE_URL}MD_Sami_El_Bashar_Rhythm_Resume.pdf`,
  downloadName: "MD_Sami_El_Bashar_Rhythm_Resume.pdf",
};
