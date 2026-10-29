// All the content the site shows lives in this one file.
// To update the portfolio, edit the values below; components only read from here.

/* ----------------------------------------------------------------------------
 * Profile & links
 * ------------------------------------------------------------------------- */

export const site = {
  name: "Will Padilla",
  role: "Software Engineer & Computer Science Student at FEU Tech",
  tagline: "To develop with purpose, pushed by passion",
  intro:
    "I'm a Computer Science student at FEU Tech who strives toward great software developed with purpose, pushed by passion.",
  resume: "/resume.pdf", // file goes in public/resume.pdf
  email: "wgabriel.padilla@gmail.com",
  location: "España, Manila",
  social: {
    github: "https://github.com/WillPads/WPadilla",
    linkedin: "https://www.linkedin.com/in/will-padilla/",
  },
};

// Header links; each href points at a section id on the page.
export const nav = [
  { label: "Work", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

/* ----------------------------------------------------------------------------
 * Skills, grouped by category
 * ------------------------------------------------------------------------- */

export type SkillGroup = {
  category: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  { category: "Languages", items: ["TypeScript", "Java", "Python", "C++"] },
  { category: "Frontend", items: ["React", "Next.js", "Tailwind CSS"] },
  { category: "Backend", items: ["Node.js", "Express", "WebSockets"] },
  { category: "Databases & Tools", items: ["SQLite", "Prisma", "Android"] },
];

/* ----------------------------------------------------------------------------
 * Projects (shown in this order; the first two are the priority projects)
 * ------------------------------------------------------------------------- */

export type ProjectStatus = "completed" | "in-development";
// "mono" = black hover border; "blue-purple" = blue top border, purple bottom border.
export type ProjectAccent = "mono" | "blue-purple";
export type DeviceFrame = "mobile" | "desktop";

export type ProjectScreenshot = {
  src: string; // path inside public/, e.g. "/projects/pixelderm-2.jpg"
  alt: string;
};

export type Project = {
  title: string;
  role: string;
  tagline: string;
  description: string;
  stack: string[];
  status: ProjectStatus;
  accent: ProjectAccent;
  device: DeviceFrame;
  screenshotCount: number; // empty placeholder frames drawn when there are no screenshots
  screenshots?: ProjectScreenshot[];
  liveUrl?: string;
  span: "wide" | "normal"; // "wide" takes two columns on large screens
};

export const projects: Project[] = [
  {
    title: "PixelDerm",
    role: "Project Manager & Developer",
    tagline:
      "Android-based Mobile Platform for Longitudinal Skin Damage Analysis & Monitoring",
    description:
      "An algorithmic image-processing pipeline isolates and tracks UV-induced skin damage over time. Data is persisted locally via SQLite for private, on-device longitudinal tracking, and the platform was evaluated under ISO/IEC 25010 software quality standards.",
    stack: ["Android", "Java", "Image Processing", "SQLite", "ISO/IEC 25010"],
    status: "completed",
    accent: "mono",
    device: "mobile",
    screenshotCount: 5,
    screenshots: [
      { src: "/projects/pixelderm logo.png", alt: "PixelDerm Logo" },
      { src: "/projects/pixelderm-1.JPG", alt: "PixelDerm Homepage" },
      { src: "/projects/pixelderm-2.jpg", alt: "PixelDerm Pre-Capture screen" },
      { src: "/projects/pixelderm-3.jpg", alt: "PixelDerm Analysis - Image Analysis" },
      { src: "/projects/pixelderm-4.jpg", alt: "PixelDerm Analysis -Results" },
    ],
    liveUrl: "https://github.com/WillPads/pixelderm",
    span: "wide",
  },
  {
    title: "SyncSpace",
    role: "Full-stack Developer",
    tagline: "Synchronous Co-Working & Pomodoro Room App",
    description:
      "Shared real-time rooms with synced Pomodoro timers, tasks and notes, so study groups and remote teams can focus together instead of alone. Includes role-based access, a WebSocket sync engine and a quiz pipeline built from uploaded documents. Currently being prepared for deployment.",
    stack: ["Next.js", "Express", "Prisma", "SQLite", "WebSockets"],
    status: "in-development",
    accent: "blue-purple",
    device: "desktop",
    screenshotCount: 2,
    span: "normal",
  },
];

/* ----------------------------------------------------------------------------
 * Certifications (the section stays hidden while this list is empty)
 * ------------------------------------------------------------------------- */

export type Certification = {
  name: string;
  issuer: string;
  issued: string; // year-month, e.g. "2026-09"
  credentialUrl?: string; // verification link recruiters can click
  credentialId?: string;
};

export const certifications: Certification[] = [];
