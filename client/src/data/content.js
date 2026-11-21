import { IMAGES } from "./images";

export const PROFILE = {
  name: "Md. Sami-El Bashar Rhythm",
  short: "Rhythm",
  email: "mdsamielbashar@gmail.com",
  github: "https://github.com/rhythm162k",
  linkedin: "https://www.linkedin.com/in/mdsamielbashar/",
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
  sub: "Junior Software Engineer focused on full-stack development with TypeScript, React, Node.js, Express and PostgreSQL.",
};

export const STATEMENT =
  "I build web applications end to end: the interface people use, the API behind it, and the database underneath. I like getting the fundamentals right. Structure, security, and performance I can actually measure.";

export const PROJECTS = [
  {
    name: "Employee Management System",
    date: "Nov 2026",
    status: "Deployed on AWS EC2 · Under review",
    tagline:
      "Built at the request of Payra Port Authority staff to streamline employee records, leave approvals and profile updates.",
    image: IMAGES.payraPortEms,
    live: "https://dumb-ems.459dj2wf82.workers.dev/",
    liveLabel: "Public demo for reviewers",
    stats: [
      { to: 229, label: "Passing API tests" },
      { to: 81.43, decimals: 2, suffix: "%", label: "Line coverage" },
      { to: 78.68, decimals: 2, suffix: "%", label: "Branch coverage" },
    ],
    points: [
      "Added bulk CSV and XLSX imports with validation previews, plus spreadsheet exports.",
      "Enforced department-level access on the server and limited admin assignments to the root administrator. Added bcrypt hashing, PostgreSQL-backed sessions, CSRF protection and audit logging.",
      "Parsing and validating 1,000 XLSX rows averaged 66.64 ms of local CPU time with stubbed database responses.",
    ],
    tags: ["PostgreSQL", "RBAC", "bcrypt", "AWS EC2", "CSV/XLSX"],
  },
  {
    name: "Dumb CRM",
    date: "Nov 2026",
    tagline:
      "A multi-tenant CRM for managing contacts, companies, sales deals, tasks and activities.",
    image: IMAGES.dumb_crm,
    live: "https://dumb-crm-bjby.onrender.com/",
    repo: "https://github.com/rhythm162k/Dumb_CRM",
    stats: [
      { to: 224, label: "Automated API tests" },
      { to: 3, label: "Workspace roles" },
      { to: 5, label: "Core CRM modules" },
    ],
    points: [
      "Built a full-stack TypeScript CRM in an npm-workspaces monorepo using React, Express, PostgreSQL and Drizzle ORM.",
      "Implemented multi-tenant isolation with PostgreSQL Row-Level Security and role-based permissions for owners, admins and members.",
      "Added JWT and Google OAuth 2.0 authentication, shared Zod validation, audit logging and safeguards for CSV imports and exports.",
      "Reached 94.8% statement coverage and 90% branch coverage.",
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
      { to: 175, label: "Integration tests" },
      { to: 99.5, decimals: 1, suffix: "%", label: "API statement coverage" },
    ],
    points: [
      "Converted the full-stack application to TypeScript, with a React frontend, Express API and Supabase-hosted PostgreSQL.",
      "Added Passport.js, Google OAuth 2.0, bcrypt password hashing, PostgreSQL-backed sessions and HTTP-only cookies. Applied rate limits and restricted movie operations to their owners.",
      "Used Vitest and Supertest with an isolated database and reached 97% API branch coverage.",
      "Added OMDb poster lookup and Docker for local development.",
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
      "Data Structures and Algorithms, Object-Oriented Programming, AI and Machine Learning",
    ],
    ["Training", "AWS Cloud Practitioner Essentials (course), September 2026"],
  ],
};

export const SKILLS = [
  ["Languages", ["TypeScript", "JavaScript (ES6+)", "SQL", "C", "HTML5", "CSS3"]],
  ["Frontend", ["React", "Vite", "Responsive design"]],
  [
    "Backend & APIs",
    [
      "Node.js",
      "Express.js",
      "REST API design",
      "JWT",
      "Session-based authentication",
      "Google OAuth 2.0",
      "bcrypt",
      "Role-based access control (RBAC)",
      "MVC architecture",
      "CORS",
    ],
  ],
  [
    "Databases",
    [
      "PostgreSQL",
      "Drizzle ORM",
      "Relational schema design",
      "Row-Level Security (RLS)",
      "Supabase",
    ],
  ],
  [
    "Testing & Validation",
    ["Vitest", "Supertest", "React Testing Library", "Integration testing", "Zod"],
  ],
  [
    "Tools & Deployment",
    [
      "Git",
      "GitHub Actions (CI/CD)",
      "Docker Compose",
      "AWS EC2",
      "Cloudflare Workers",
      "Render",
      "Postman",
    ],
  ],
];

export const RESUME = {
  file: `${import.meta.env.BASE_URL}MD_Sami_El_Bashar_Rhythm_Resume.pdf`,
  downloadName: "MD_Sami_El_Bashar_Rhythm_Resume.pdf",
};
