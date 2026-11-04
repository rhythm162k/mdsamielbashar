import { IMAGES } from "./images";

export const PROFILE = {
  name: "Md. Sami-El Bashar Rhythm",
  short: "Rhythm",
  email: "mdsamielbashar@gmail.com",
  github: "https://github.com/rhythm162k",
  linkedin: "https://www.linkedin.com/in/md-sami-el-bashar-rhythm-24100b27b",
  location: "Mymensingh, Bangladesh",
};

export const AVAILABLE = {
  open: false,
  label: "Open to internship opportunities",
};

// The scrolling band under the hero.
export const TICKER = [
  "React",
  "TypeScript",
  "Node.js",
  "Express",
  "PostgreSQL",
  "REST APIs",
  "Authentication",
  "Multi-tenancy",
  "Testing",
  "Docker",
];

// Contact form limits. Keep in sync with server/lib/validate.js
export const CONTACT_LIMITS = {
  nameMin: 2,
  nameMax: 80,
  messageMin: 10,
  messageMax: 2000,
};

export const NAV_LINKS = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "resume", label: "Resume" },
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
    name: "Kin CRM",
    date: "Nov 2026",
    tagline:
      "A multi-tenant CRM for managing contacts, companies, sales deals, tasks and activities.",
    image: IMAGES.kinCRM,
    live: "https://kin-crm-ngei.onrender.com",
    repo: "https://github.com/rhythm162k/Kin_CRM",
    stats: [
      { to: 224, label: "Automated tests" },
      { to: 3, label: "Workspace roles" },
      { to: 5, label: "Core CRM modules" },
    ],
    points: [
      "Built a full-stack TypeScript CRM in an npm-workspaces monorepo using React, Express, PostgreSQL and Drizzle ORM.",
      "Implemented multi-tenant isolation with PostgreSQL Row-Level Security and role-based permissions for owners, admins and members.",
      "Added JWT and Google OAuth authentication, shared Zod validation, audit logging, and secure CSV import/export.",
    ],
    tags: [
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Drizzle ORM",
      "Zod",
      "Vitest",
    ],
  },
  {
    name: "My Movie Diary",
    date: "Aug 2026",
    tagline:
      "A multi-user movie diary with a TypeScript React frontend and PostgreSQL-backed REST API.",
    image: IMAGES.movieDiary,
    live: "https://my-movie-diary.onrender.com",
    repo: "https://github.com/rhythm162k/my_movie_diary",
    stats: [
      { to: 11, label: "REST API endpoints" },
      { to: 120, label: "Automated tests" },
      { to: 10, label: "bcrypt salt rounds" },
    ],
    points: [
      "Converted the full-stack application to TypeScript, with a React frontend, Express API and Supabase-hosted PostgreSQL.",
      "Implemented PostgreSQL-backed sessions, secure HTTP-only cookies, bcrypt password hashing and Google OAuth 2.0.",
      "Integrated OMDb poster lookup and user-scoped movie operations, backed by 120 integration tests and Dockerized local development.",
    ],
    tags: [
      "React",
      "TypeScript",
      "Vite",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Supabase",
      "Passport.js",
      "Vitest",
      "Supertest",
      "Docker",
    ],
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
  ["Frontend", ["React", "TypeScript", "JavaScript", "HTML", "CSS", "Vite"]],
  [
    "Backend",
    [
      "Node.js",
      "Express.js",
      "REST API design",
      "JWT",
      "Session auth",
      "OAuth 2.0",
      "bcrypt",
      "Zod",
      "CORS",
    ],
  ],
  [
    "Databases",
    [
      "PostgreSQL",
      "SQL",
      "Drizzle ORM",
      "Relational schema design",
      "Row-Level Security",
    ],
  ],
  [
    "Testing",
    ["Vitest", "Supertest", "React Testing Library", "Integration testing"],
  ],
  [
    "Tools & Platforms",
    ["Git", "GitHub", "Docker", "Postman", "Render", "Supabase"],
  ],
];

export const RESUME = {
  file: `${import.meta.env.BASE_URL}MD_Sami_El_Bashar_Rhythm_Resume.pdf`,
  downloadName: "MD_Sami_El_Bashar_Rhythm_Resume.pdf",
};
