// All the content the site shows lives in this one file.
// To update the portfolio, edit the values below; components only read from here.
//
// Rule of thumb: if a field is optional and left out, the part of the page that
// uses it simply does not appear. Nothing says "replace this" on the live site.

/* ----------------------------------------------------------------------------
 * Profile & links
 * ------------------------------------------------------------------------- */

export type Site = {
  name: string; // the header wordmark, the hero h1 and the footer
  tagline: string; // the big headline in the hero
  resume: string; // path to the PDF; the file goes in public/resume.pdf
  email: string; // used for every "Email" button
  location: string; // shown only in the footer ("Based in ...")
  social: {
    github: string; // profile or repo URL
    linkedin: string;
  };
  // Optional. Leave unset until Will has a target role to show.
  // When set, the hero shows a "Looking for: ..." line (e.g. "Software Engineering Intern").
  lookingFor?: string;
  // Optional. 2-3 sentences. When set, the About section and its nav link appear.
  bio?: string;
  // The short paragraph above the Contact buttons.
  contactNote: string;
  // Optional. Path to a square photo inside public/, e.g. "/avatar.jpg" (at least 192x192px).
  // While unset, the hero shows no image at all (no placeholder, no initials).
  // When set, a round photo sits on the right of the hero (beside the name on phones).
  avatar?: string;
};

export const site: Site = {
  name: "What's Up? I'm Will :)",
  tagline: "Love for Learning, pushed by purpose",
  resume: "/resume.pdf", // file goes in public/resume.pdf
  lookingFor:
    "A 520-hour internship or entry-level role in any position where I'd be a good fit for your organization. Eagerly available and looking out for opportunities.",
  bio: "Driven by curiosity and a love for learning, I'm a lifelong student at heart. I enjoy understanding how things work, building with intention, and turning that learning into thoughtful, useful work.",
  contactNote:
    "Hi there! Still here? Let's Talk!\n\nI'd love to connect regarding internship opportunities! Reach me via email, LinkedIn, or through my resume for more info.",
  
  avatar: "/avatar.jpg",
  email: "wgabriel.padilla@gmail.com",
  location: "Sampaloc, Manila",
  social: {
    github: "https://github.com/WillPads/WPadilla",
    linkedin: "https://www.linkedin.com/in/will-padilla/",
  },
};

// Header links, in the same order as the sections on the page (src/app/page.tsx). Each href points at a section id.
// "About" is hidden automatically while site.bio is unset, and "Experience" while the
// experience list below is empty.
export const nav = [
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

/* ----------------------------------------------------------------------------
 * Experience (the section and its nav link stay hidden while this list is empty)
 *
 * Internships, org roles, freelance work, a thesis team lead role: anything done with a
 * team or a client. Newest first.
 * ------------------------------------------------------------------------- */

export type Experience = {
  org: string; // company, organisation or team
  role: string; // what Will did there
  start: string; // e.g. "2026" or "Jun 2026"
  end: string; // same format, or "Present"
  url?: string; // the org's site; makes the org name a link
  logo?: string; // square image inside public/, e.g. "/experience/org.png"; hidden while unset
};

export const experience: Experience[] = [
  {
    org: "FEU Tech ACM Student Chapter",
    role: "Junior Officer, Externals Committee",
    start: "Sep 2024",
    end: "Jul 2026",
    url: "https://www.linkedin.com/company/33261120/",
  },
  {
    org: "FEU Tech Student Coordinating Council",
    role: "Junior Officer, Publicity Committee",
    start: "Sep 2024",
    end: "Jul 2025",
    url: "https://www.linkedin.com/company/78428830/",
  },
  {
    org: "Junior Philippine Computer Society - FEU Tech",
    role: "Junior Officer, Events Committee",
    start: "Sep 2024",
    end: "Jul 2025",
    url: "https://www.linkedin.com/company/76572156/",
  },
];

/* ----------------------------------------------------------------------------
 * Skills, grouped by category
 * ------------------------------------------------------------------------- */

export type SkillGroup = {
  category: string; // the row label
  items: string[]; // the chips next to it
};

export const skills: SkillGroup[] = [
  { category: "Languages", items: ["TypeScript", "Java", "Python", "C++", "PHP", "HTML"] },
  { category: "Frontend", items: ["React", "Next.js", "Tailwind CSS"] },
  { category: "Backend", items: ["Node.js", "Express", "WebSockets"] },
  { category: "Databases & Tools", items: ["PostgreSQL", "SQLite", "Prisma", "Neon", "Render", "Figma", "Android"] },
];

/* ----------------------------------------------------------------------------
 * Projects
 *
 * Two lists:
 *   featuredProjects  the turntable at the top (needs a description, screenshots, etc.)
 *   moreProjects      a compact list under it (only the basic fields)
 * Every project belongs in exactly one of the two, so nothing is left off the page.
 * To promote a project, move it from moreProjects to featuredProjects and fill in
 * the extra fields the type asks for.
 * ------------------------------------------------------------------------- */

// One status scale used everywhere (turntable, detail panel, "More projects" list):
//   "live"           deployed, with a public URL (set liveUrl too)   -> badge "Live"
//   "prototype"      a working build that is not deployed or finished  -> badge "Prototype"
//   "in-development" still being built                               -> badge "In Development"
export type ProjectStatus = "live" | "prototype" | "in-development";

export type ProjectScreenshot = {
  src: string; // path inside public/, e.g. "/projects/PixelDerm/pixelderm-2.jpg"
  alt: string; // describes the screen for people who cannot see it
};

export type ProjectVideo = {
  src: string; // path inside public/ or a full URL to the video file
  poster?: string; // still image shown before play
  caption?: string; // one line under the player
};

// Case study pages (/projects/<slug>). A project gets a page only when `caseStudy` is set.
// See "Case study pages" in docs/EDITING-CONTENT.md for a filled-in example shape.
export type CaseImage = ProjectScreenshot & {
  width?: number; // pixel size of the file; set both for the exact shape, or leave both off for 16:10
  height?: number;
};

export type CaseStep = {
  title: string; // sub-step heading, shown in the accent colour
  paragraphs: string[];
  images?: CaseImage[]; // one or two per step looks best
};

export type CaseSection = {
  title: string; // small uppercase label, e.g. "The problem"
  paragraphs: string[];
  images?: CaseImage[];
  steps?: CaseStep[]; // sub-steps, for a section like "The process"
  showDemoVideo?: boolean; // show this project's demoVideo inside the section
};

export type CaseStudy = {
  summary: string; // one paragraph under the title; also the page description
  cover?: CaseImage; // wide image under the header
  facts: { label: string; value: string }[]; // e.g. Duration, Role, Team
  sections: CaseSection[];
  takeaways?: string[]; // short list at the end
};

type ProjectBase = {
  slug: string; // short id, lowercase, no spaces (e.g. "pixelderm")
  title: string;
  role: string; // Will's role on the project
  tagline: string; // one-line summary
  stack: string[]; // technologies, shown as tags
  status: ProjectStatus;
  description?: string; // a paragraph for the detail panel
  year?: string; // e.g. "2026"; hidden while unset
  context?: string; // e.g. "Thesis", "Course project"; hidden while unset
  impact?: string; // one measurable result; hidden while unset
  repoUrl?: string; // public source code -> "Source" button
  liveUrl?: string; // deployed site -> "Live site" button
  // With none of repoUrl, liveUrl or demoVideo, the card shows "Links coming soon".
};

export type FeaturedProject = ProjectBase & {
  description: string; // required for featured projects
  device: "mobile" | "desktop"; // shape of the screenshot frames
  cardImage?: { src: string }; // logo shown faintly behind the turntable card (decorative)
  screenshots: ProjectScreenshot[]; // use [] when there are none yet
  demoVideo?: ProjectVideo; // shown in the detail panel; never autoplays
  caseStudy?: CaseStudy; // when set, the project gets a page at /projects/<slug>
};

export type ListProject = ProjectBase;

export const featuredProjects: FeaturedProject[] = [
  // TODO(Will): add repoUrl or a demo link once the public repo/demo is sorted out with PixelDerm's lead dev (paused until Will says otherwise).
  {
    slug: "pixelderm",
    title: "PixelDerm",
    role: "Project Manager & Co-Developer",
    tagline:
      "Android-based Mobile Platform for Longitudinal Skin Damage Analysis & Monitoring",
    description:
      "A mobile Android app for tracking UV-related skin damage over time by comparing new scans with a user's earlier baseline. I led the project as project manager, co-developed backend and database functions, and used Python to filter the datasets behind the image-analysis workflow. We coordinated with dermatologists to verify and validate the clinical-technical trials.",
    stack: ["React Native", "TypeScript", "Android", "Image Processing", "Python"],
    status: "prototype",
    year: "Sep 2025 - Jul 2026",
    context: "Thesis",
    device: "mobile",
    cardImage: { src: "/projects/PixelDerm/pixelderm-logo.png" },
    screenshots: [
      { src: "/projects/PixelDerm/pixelderm-1.jpg", alt: "PixelDerm Homepage" },
      { src: "/projects/PixelDerm/pixelderm-2.jpg", alt: "PixelDerm Pre-Capture screen" },
      { src: "/projects/PixelDerm/pixelderm-3.jpg", alt: "PixelDerm Analysis - Image Analysis" },
      { src: "/projects/PixelDerm/pixelderm-4.jpg", alt: "PixelDerm Analysis - Results" },
    ],
    caseStudy: {
      summary:
        "PixelDerm is an Android app for tracking UV-related skin damage over time by comparing photos of the same skin area across sessions. I managed the project, helped build the app with Ms. Patio, and used Python to clean the datasets behind the image-analysis workflow. We worked with dermatologists to verify and validate the clinical-technical trials.",
      cover: {
        src: "/projects/PixelDerm/pixelderm poster.png",
        alt: "PixelDerm poster showing the project title and a preview of the app on a phone",
        width: 1024,
        height: 768,
      },
      facts: [
        { label: "Duration", value: "Sep 2025 - Jul 2026" },
        { label: "Role", value: "Project Manager, Co-Developer & Data Analyst" },
        { label: "Stack", value: "React Native, TypeScript, Android, Python, Image Processing" },
      ],
      sections: [
        {
          title: "Tech stack",
          paragraphs: [
            "Frontend: React Native 0.85 and TypeScript for the Android app.",
            "Backend: A server receives and analyzes the photos. Its code is not in the local repository, so its technology stack is unconfirmed.",
            "Data: Scan history is kept on the server; the app stores only a user ID on the phone using AsyncStorage.",
            "Hosting or link: The app is not public. The repository and demo link are paused.",
            "Tags shown on the site: React Native, TypeScript, Android, Image Processing, Python.",
          ],
        },
        {
          title: "Overview",
          paragraphs: [
            "In alignment with our course guidelines, PixelDerm was developed to help people track skin damage over time without relying on guesswork. In a tropical country like the Philippines, UV exposure is constant and often easy to overlook until extensive damage is done.",
          ],
        },
        {
          title: "WHY?",
          paragraphs: [
            "UV damage builds up slowly, so it is hard to notice changes from day to day. A person can be exposed to the sun during work, commuting, or everyday activities and still not know how that exposure is affecting their skin.",
            "We wanted to make that process more visible and easier to monitor, especially for the average Filipino citizen who is regularly exposed to strong sunlight.",
          ],
        },
        {
          title: "WHAT?",
          paragraphs: [
            "I was Project Manager, Co-Developer and Data Analyst for our thesis. I planned and ran the project (sprints, timeline, check-ins, and quality checks on deliverables), helped build the app with Shana, and cleaned our datasets with Python.",
          ],
        },
        {
          title: "HOW?",
          paragraphs: [
            "The app and analysis workflow were developed together. We planned the sprint structure, coordinated tasks, tracked deadlines and kept the team aligned on what needed to happen next.",
          ],
          images: [
            {
              src: "/projects/PixelDerm/pixelderm-2.jpg",
              alt: "PixelDerm pre-capture screen for image comparison and skin tracking",
              width: 956,
              height: 2046,
            },
            {
              src: "/projects/PixelDerm/pixelderm-3.jpg",
              alt: "PixelDerm image-analysis screen with an image-processing workflow",
              width: 956,
              height: 2046,
            },
          ],
        },
        {
          title: "Results",
          paragraphs: [
            "PixelDerm was completed as a thesis project and gave the team a working app and research workflow for long-term skin damage analysis.",
            "The project was a valuable experience in product management, app development and research-based design, and it helped sharpen how I think about building tools that combine technical work with real user needs.",
          ],
          images: [
            { src: "/projects/PixelDerm/pixelderm-1.jpg", alt: "PixelDerm Homepage", width: 956, height: 2046 },
            { src: "/projects/PixelDerm/pixelderm-4.jpg", alt: "PixelDerm Analysis - Results", width: 656, height: 2048 },
          ],
        },
      ],
    },
  },
  {
    slug: "syncspace",
    title: "SyncSpace",
    role: "Full-stack Developer",
    tagline: "Synchronous Co-Working Space",
    description:
      "Shared real-time rooms with synced Pomodoro timers, tasks and notes, so study groups and remote teams can focus together instead of alone. Includes role-based access, a WebSocket sync engine and a quiz pipeline built from uploaded documents. Deployed on Vercel (frontend), Render (API) and Neon (Postgres).",
    stack: ["Next.js", "TypeScript", "Express", "Prisma", "PostgreSQL", "WebSockets"],
    status: "live",
    year: "Sep 2026 - Nov 2026",
    liveUrl: "https://sync-space-taupe.vercel.app",
    repoUrl: "https://github.com/WillPads/SyncSpace",
    context: "Personal project",
    device: "desktop",
    cardImage: { src: "/projects/syncspace/syncspace sample logo.png" },
    screenshots: [
      { src: "/projects/syncspace/room.jpg", alt: "A SyncSpace study room: the shared focus timer with host controls, the people in the room, chat, tasks, session notes and ambient sound" },
      { src: "/projects/syncspace/dashboard.png", alt: "The SyncSpace dashboard: create or join a room, room stats, uploading materials and notes" },
      { src: "/projects/syncspace/quiz.jpg", alt: "The quiz phase after a session: multiple-choice questions built from the uploaded photosynthesis notes" },
      { src: "/projects/syncspace/welcome.jpg", alt: "SyncSpace welcome page explaining shared study rooms" },
    ],
    caseStudy: {
      summary:
        "SyncSpace is a study space where a group shares a live-running Pomodoro timer in a room, chats while they work, and can generate a quiz from the notes they uploaded when the session ends. Deployed on Vercel (frontend), Render (API) and Neon (Postgres).",
      cover: {
        src: "/projects/syncspace/syncspace sample logo.png",
        alt: "SyncSpace logo and wordmark on a dark green background",
        width: 3175,
        height: 4490,
      },
      facts: [
        { label: "Duration", value: "Sep 2026 - Nov 2026" },
        { label: "Role", value: "Full-stack developer" },
        { label: "Stack", value: "Next.js, TypeScript, Express, Prisma, PostgreSQL, WebSockets" },
        { label: "Hosting", value: "Vercel (web app), Render (API), Neon (database)" },
      ],
      sections: [
        {
          title: "Tech stack",
          paragraphs: [
            "Frontend: Next.js, TypeScript, and plain CSS.",
            "Backend: Express 5, TypeScript, WebSockets, Prisma, and server-side sessions. Claude generates quiz questions when an API key is configured; otherwise, a built-in generator is used. I plan to integrate a local AI model such as Ollama.",
            "Data: PostgreSQL (Neon).",
            "Hosting or link: Vercel (frontend), Render (API), and Neon (database). Live at https://sync-space-taupe.vercel.app. Repository: https://github.com/WillPads/SyncSpace.",
            "Tags shown on the site: Next.js, TypeScript, Express, Prisma, PostgreSQL, WebSockets.",
          ],
        },
        {
          title: "Overview",
          paragraphs: [
            "SyncSpace started during my finals. My friends and I couldn't find a place, cafe, or co-working space that fit our needs, our schedules and our budget. So I thought: why not study together from our own homes, on our own devices? But still, together.",
            "With my experience, eagerness, and love for learning, it was my chance to experiment, develop and grow as a software engineer. It enabled me to build and deploy a full-stack product with modern industry tools and systems, while learning about AI-assisted development and making the architecture and production decisions myself.",
          ],
          images: [
            {
              src: "/projects/syncspace/welcome.jpg",
              alt: "The SyncSpace welcome page: everyone in a room shares one Pomodoro timer, chats, and takes a quiz built from uploaded notes",
              width: 800,
              height: 670,
            },
          ],
        },
        {
          title: "WHY?",
          paragraphs: [
            "Platforms like Discord already let groups meet online, but they're multi-purpose and not built around focusing. They aren't tailored to keep everyone on the same page at the same time.",
            "I wanted one place with one goal: everyone in sync and focused on the same session and lesson.",
          ],
        },
        {
          title: "WHAT?",
          paragraphs: [
            "This project pushed me to develop as a solo full-stack developer across product, frontend, backend, database, testing and deployment.",
          ],
        },
        {
          title: "HOW?",
          paragraphs: ["SyncSpace went from a rough prototype to a live site in five steps."],
          steps: [
            {
              title: "Rebuilding the Prototype on a Real Backend",
              paragraphs: [
                "My first version was highly conceptual, not functional. It kept rooms in memory inside the Next.js app and polled for updates. After talking it through with peers and mentors, I took their advice and rebuilt it with a separate Express and TypeScript server, Prisma, user accounts, and host and member roles in each room.",
                "I made the architecture and product decisions myself and used AI-assisted development tools to help build it.",
              ],
            },
            {
              title: "Letting the Server Own the Clock",
              paragraphs: [
                "The timer only works if everyone sees the same thing, so only the server changes it. Every room change goes out over a WebSocket as a full snapshot, re-sent every second, and each browser counts down from when it received the last one. A wrong clock on someone's device can't shift their timer.",
                "I chose versioned writes over a CRDT. There's one writer per room, and the timer is a state machine: an illegal move should be rejected, not merged.",
              ],
              images: [
                {
                  src: "/projects/syncspace/room.jpg",
                  alt: "A SyncSpace study room: the shared focus timer with Pause for all, Skip to break and End session host controls, a Synced status, the people in the room, chat, tasks and session notes",
                  width: 1102,
                  height: 714,
                },
              ],
            },
            {
              title: "Turning Uploaded Notes into a Quiz",
              paragraphs: [
                "Anyone in a room can upload PDF, TXT or Markdown notes, and a background queue extracts the text. When the host ends the session, the room becomes a quiz built from those notes.",
                "Claude writes the questions when an API key is set. Without one, or if the call fails, a built-in generator writes fill-in-the-blank questions from the text, so the feature never depends on a paid API. I plan to integrate a local AI model such as Ollama.",
              ],
              images: [
                {
                  src: "/projects/syncspace/upload.jpg",
                  alt: "The Session notes panel in a room, with an uploaded notes file marked Ready and the Upload notes button",
                  width: 1102,
                  height: 714,
                },
                {
                  src: "/projects/syncspace/quiz.jpg",
                  alt: "The quiz phase after the session: multiple-choice questions built from the uploaded notes",
                  width: 1102,
                  height: 714,
                },
              ],
            },
            {
              title: "Hardening the backend before launch",
              paragraphs: [
                "A backend audit on Oct 22, 2026 listed what had to change before launch, and every finding was fixed and covered by tests the same day. The server moved to Express 5 so async errors can't crash it, JWTs were replaced with server-side sessions that can be revoked, and sign-in, joins and uploads got rate limits.",
                "A row lock keeps the 10-person room cap from breaking when people join at the same time. The server now has 234 tests, all running against a real Postgres database instead of mocks.",
              ],
            },
            {
              title: "Deploying on free tiers",
              paragraphs: [
                "The web app runs on Vercel, the API on Render and the database on Neon, all on free plans. Vercel can't pass WebSocket connections through, so the browser first gets a single-use ticket that expires in 30 seconds, then connects straight to the server.",
                "All traffic reached the server through Vercel, so every visitor looked like the same IP address. The sign-in limits now count the real visitor from the forwarded headers.",
              ],
            },
          ],
        },
        {
          title: "Puzzled? Me too.",
          paragraphs: [
            "The hardest problem was the feature everything depends on: the shared timer. In the first backend, the once-a-second tick also saved the timer, so if the host pressed reset at the same moment, the tick could overwrite it and the reset was lost. The code that worked out the current phase also replayed phase changes in a capped loop, which could leave a negative timer after about 1,000 of them.",
          ],
        },
        {
          title: "The Missing Piece",
          paragraphs: [
            "The ticks never write to the database, every timer write carries a version number so two changes can't both apply, and the remaining time is worked out in one step from the last saved snapshot. The once-a-second updates now come from memory, with no database query per tick.",
          ],
        },
        {
          title: "The BIG Picture",
          paragraphs: [
            "SyncSpace is live at sync-space-taupe.vercel.app. I haven't promoted it yet; for now my friends and I use it during our study sessions.",
            "They've told me it's useful, efficient and does what they need. Behind it, the server has 234 passing tests on a real Postgres database.",
          ],
          images: [
            {
              src: "/projects/syncspace/dashboard.png",
              alt: "The live SyncSpace dashboard: create or join a room, room stats, and uploading PDF, TXT or MD materials up to 4 MB",
              width: 1840,
              height: 966,
            },
          ],
        },
      ],
    },
  },
  {
    slug: "signal-no-5",
    title: "Signal No. 5",
    role: "Associate Project Manager, Backend Developer & Project Pitcher",
    tagline: "8-bit RPG that teaches typhoon preparedness, with dialogue from an AI model running locally on the laptop",
    description:
      "Players prepare a household for a fictional typhoon: manage limited resources, respond to warnings and evacuation advisories, and get through the storm and its aftermath, ending with a preparedness score, badges and a personal debrief. On the backend, I worked on the game details, levels and badges, game flow and debrief findings. As associate project manager, I helped lead the concept, run the team's plans and progress checkpoints, check documentation and status, and design the pitch. The team built a deterministic simulation engine and ran Qwen3-4B locally through llama.cpp for dialogue and debrief wording, with AI output kept apart from the game logic and checked by validation, grounding checks and fallback text. Built for kids aged 10-16 by a team of four.",
    stack: ["TypeScript", "Electron", "React", "Phaser 3", "llama.cpp", "Qwen3-4B"],
    status: "prototype",
    year: "Oct 2026",
    context: "AppBuildersPH Local AI Hackathon 2026",
    impact: "Built and demoed in a 20-hour sprint; the 4B-parameter AI model runs locally, with no cloud API",
    device: "desktop",
    cardImage: { src: "/projects/signal-no-5/Signal no. 5 logo.png" },
    screenshots: [
      { src: "/projects/signal-no-5/gameplay.jpg", alt: "Signal No. 5 gameplay: a pixel-art family preparing their home before the storm" },
      { src: "/projects/signal-no-5/cover.jpg", alt: "Signal No. 5 title art: Storm's coming, ready or not?" },
    ],
    demoVideo: {
      src: "/projects/signal-no-5/promo.mp4",
      poster: "/projects/signal-no-5/cover.jpg",
      caption: "Promotional video for the AppBuildersPH demo day",
    },
    caseStudy: {
      summary:
        "Signal No. 5 is an 8-bit typhoon preparedness RPG for Windows, built for kids aged 10 to 16. Players prepare a Filipino home for a storm, live through it and its aftermath, and get a score, badges and a personal debrief, with dialogue written by a small AI model running on the same laptop. My team of four built it in about 20 hours for the AppBuildersPH Local AI Hackathon 2026, where I worked on the backend and was associate project manager.",
      cover: {
        src: "/projects/signal-no-5/Signal no. 5 logo.png",
        alt: "Signal No. 5 logo on its storm-themed background",
        width: 2972,
        height: 1737,
      },
      facts: [
        { label: "Duration", value: "Oct 9-10, 2026 (about 20 hours plus demo day)" },
        { label: "Role", value: "Associate Project Manager, Backend Developer & Project Pitcher" },
        { label: "Stack", value: "TypeScript, Phaser 3, React, Electron, llama.cpp, Qwen3-4B" },
      ],
      sections: [
        {
          title: "Tech stack",
          paragraphs: [
            "Frontend: Phaser 3, React and TypeScript, packaged as an Electron desktop app for Windows.",
            "Backend: A deterministic TypeScript simulation engine for game rules, events, badges and debrief; Qwen3-4B runs locally through llama.cpp for dialogue and debrief wording.",
            "Data: None; the game runs on the player's laptop.",
            "Hosting or link: Desktop app, with no hosting. There is no public repository link yet; the lead project manager is still finalizing it.",
            "Tags shown on the site: TypeScript, Electron, React, Phaser 3, llama.cpp, Qwen3-4B.",
          ],
        },
        {
          title: "Overview",
          paragraphs: [
            "The hackathon's theme was Local AI: the model had to run on the player's own machine, not in the cloud. Our idea was that every household is different, so players set up their own household and play through a typhoon shaped by it.",
          ],
        },
        {
          title: "WHY?",
          paragraphs: [
            "Typhoons hit the Philippines every year, yet most preparedness material is a checklist. It tells you what to do but not why, and it gives every household the same advice.",
            "Kids get the least out of that. A list can't show what happens when you pack too late or ignore an advisory. Signal No. 5 lets them practise those decisions before a real storm: they choose, watch the consequences play out, and finish with a preparedness plan for their own household.",
          ],
        },
        {
          title: "WHAT?",
          paragraphs: [
            "I was Associate Project Manager and Backend Developer. On the backend I worked on the game details, levels and badges, game flow and debrief findings. As co-project manager, I helped lead the concept, ran the team's plans and progress checkpoints, checked documentation and status, and designed the presentation and pitch. Karl Stephen Mangahas was the lead project manager.",
          ],
        },
        {
          title: "HOW?",
          paragraphs: ["We had about 20 hours to go from an idea to a playable game."],
          steps: [
            {
              title: "Picking tools the team already knew",
              paragraphs: [
                "We built the game with Phaser 3, React and TypeScript, packaged as an Electron app for Windows. Godot scored well in our comparison, but nobody on the team knew it, and switching languages would have meant rewriting our shared contracts.",
              ],
            },
            {
              title: "Designing the game flow, levels and badges",
              paragraphs: [
                "A deterministic simulation engine owns every rule, resource, consequence and score, so the same choices always give the same result. My part of the backend was what runs on it: the game details, levels and badges, the game flow, and the debrief findings that tell players what they did well and what they missed.",
                "Players work through a 48-hour countdown with 19 preparation actions and 16 typhoon events, then evacuation and a three-day aftermath.",
              ],
              images: [
                {
                  src: "/projects/signal-no-5/gameplay.jpg",
                  alt: "Signal No. 5 gameplay: a top-down pixel-art house where the family prepares, with the phase, go-bag status and checklist at the top",
                  width: 1280,
                  height: 713,
                },
              ],
            },
            {
              title: "Fitting a model on a 4 GB laptop GPU",
              paragraphs: [
                "We benchmarked Qwen3-1.7B and Qwen3-4B on a laptop with a 4 GB GTX 1650 Ti. Both returned valid JSON in all 30 test runs. The 4B was slower (about 5 seconds per reply against 2.4) but wrote better dialogue, so it's the one the game ships with.",
                "We ran it with llama.cpp instead of Ollama: it's a smaller install and gives direct control over GPU memory.",
              ],
            },
            {
              title: "Keeping the AI out of the rules",
              paragraphs: [
                "The model only writes NPC dialogue and debrief wording. Every reply goes through constrained JSON decoding, validation and a grounding guard that rejects anything contradicting the game, such as the home's layout or the storm's timing.",
                "If a reply fails, the game uses fallback text written in advance, so it stays playable even without the model.",
              ],
            },
            {
              title: "Build day and demo day",
              paragraphs: [
                "We built the game remotely on Oct 9 and demoed it on Oct 10 at SM Makati CyberZone. Alongside the build, I helped run our plans and progress checkpoints, checked the documentation and status, and designed the presentation and the reasoning behind our pitch.",
              ],
            },
          ],
        },
        {
          title: "Puzzled? Me too.",
          paragraphs: [
            "The 4B model wrote better dialogue than the 1.7B, but it also made things up. In our benchmark review it invented facts the game must never state in 4 of 10 samples, and it scored 9 out of 20 on grounding against 19 for the smaller model.",
          ],
        },
        {
          title: "The Missing Piece",
          paragraphs: [
            "We kept the 4B for its writing and added a grounding guard: a reply that contradicts the game, like the wrong home layout or storm timing, is rejected and replaced with fallback text.",
          ],
        },
        {
          title: "The BIG Picture",
          paragraphs: [
            "We built and demoed a working game in about 20 hours. It didn't place. Karl Stephen Mangahas, our lead project manager, is still finalising its development.",
          ],
        },
        {
          title: "Demo",
          paragraphs: ["Our promotional video for the AppBuildersPH demo day."],
          showDemoVideo: true,
        },
      ],
    },
  },
  {
    slug: "gabay-aralin",
    title: "Gabay Aralin",
    role: "Co-developer",
    tagline: "Mobile-first home tutor that helps parents teach their preschool and elementary kids",
    description:
      "A parent snaps a photo of the homework, types it in or picks a topic, and Gabay Aralin builds a step-by-step lesson with practice checks, a printable worksheet with an answer key, and tips for guiding the child. For homework, it gives guiding questions instead of answers.",
    stack: [], // TODO(Will): add the tech stack
    status: "in-development",
    year: "Oct 2026",
    context: "UX+AI Hackathon, 3-4 hour sprint",
    device: "mobile",
    cardImage: { src: "/projects/gabay-aralin/gabay aralin logo.jpg" },
    screenshots: [],
    demoVideo: {
      src: "/projects/gabay-aralin/demo.mp4",
      poster: "/projects/gabay-aralin/poster.jpg",
      caption: "App walkthrough",
    },
    caseStudy: {
      summary:
        "Gabay Aralin is a mobile-first home tutor for parents of preschool and elementary kids. A parent snaps a photo of the homework, types it in or picks a topic, and the app builds a short lesson, practice questions, a printable worksheet and tips for guiding their child. My co-developer Ms. Patio came up with the concept and built the initial version during a 4-hour UX+AI hackathon sprint; I assisted with core functions, features, deployment and the pitch. Improvements are in the works.",
      cover: {
        src: "/projects/gabay-aralin/gabay aralin logo.jpg",
        alt: "Gabay Aralin wordmark with a notebook and pencil illustration",
        width: 1000,
        height: 1000,
      },
      facts: [
        { label: "Date", value: "Oct 25, 2026 (initial hackathon submission)" },
        { label: "Role", value: "Co-developer" },
      ],
      sections: [
        {
          title: "Overview",
          paragraphs: [
            "Gabay Aralin started at a UX+AI hackathon at Zone Offices in BGC, a 3-4 hour sprint. My partner, Ms. Patio, came up with the concept and built the first stages, and I helped with the core functions, features and deployment.",
          ],
        },
        {
          title: "WHY?",
          paragraphs: [
            "At preschool and elementary age, a child's secondary teacher is at home. Usually their parents. Parents sit through hours of teaching, practice and homework alongside their kids at home. These are good qualities for parents, but being a good parent does not automatically make someone a good teacher.",
            "We've all been there: a parent struggles to explain a concept, loses patience, gets frustrated, and ultimately hits a wall. Gabay Aralin was built for these moments. It provides a map with the right steps and direction. Instead of just giving answers, it equips parents to lead with easy-to-follow lessons, child-guided questions and a parent-only answer key.",
          ],
        },
        {
          title: "WHAT?",
          paragraphs: [
            "I was a co-developer. Ms. Patio came up with the concept and built the first version with the event's sponsored Codex credits. I helped with core functions, features, deployment and the pitch.",
          ],
        },
        {
          title: "HOW?",
          paragraphs: ["We had 3-4 hours to go from an idea to a working solution."],
          steps: [
            {
              title: "From homework guide to tutor center",
              paragraphs: [
                "My partner, Ms. Patio, built the first stages using the event's sponsored Codex API credits. The app began as a homework guide for parents, written in Tagalog.",
                "By the end of the day it was in English, had family profiles with each child's grade, sorted saved lessons by child, grade and subject, and had been rebuilt as a home tutor center around four parts: lessons, practice, worksheets and parent tips.",
              ],
            },
          ],
        },
        {
          title: "Demo",
          paragraphs: ["A walkthrough of the app."],
          showDemoVideo: true,
        },
        {
          title: "The BIG Picture",
          paragraphs: ["We didn't make the top contenders. Improvements are in the works."],
        },
      ],
    },
  },
];

// The "More projects" list and its heading stay hidden while this is empty.
export const moreProjects: ListProject[] = [];

/* ----------------------------------------------------------------------------
 * Certifications (the block stays hidden while this list is empty)
 * ------------------------------------------------------------------------- */

export type Certification = {
  name: string;
  issuer: string;
  issued: string; // year-month, e.g. "2026-09"
  image: string; // path inside public/
  alt: string;
  credentialId?: string;
};

// Newest first. This list reflects the certificates and memberships Will supplied on 2026-11-01.
export const certifications: Certification[] = [
  {
    name: "Generative AI Overview for Project Managers",
    issuer: "Project Management Institute",
    issued: "2026-10",
    credentialId: "336510257667",
    image: "/Generative AI Overview for Project Managers Padilla_page-0001.jpg",
    alt: "Project Management Institute certificate for Generative AI Overview for Project Managers, awarded to Will Padilla in October 2026",
  },
  {
    name: "AppBuildersPH Hackathon 2026 Certificate of Participation",
    issuer: "AppBuildersPH",
    issued: "Oct 9-10, 2026",
    image: "/AppBuildersPH_page-0001.jpg",
    alt: "AppBuildersPH certificate of participation for Will Padilla as a member of team Kram, October 9-10, 2026",
  },
  {
    name: "TypeScript Essential Training",
    issuer: "LinkedIn Learning",
    issued: "2026-08",
    image: "/Typescipt Essential Training_page-0001.jpg",
    alt: "LinkedIn Learning certificate for TypeScript Essential Training completed by Will Padilla in August 2026",
  },
  {
    name: "SAP Certified Associate - SAP Activate Project Manager",
    issuer: "SAP",
    issued: "2026-07",
    image: "/SAP Certification_page-0001.jpg",
    alt: "SAP certificate recognizing Will Padilla as an SAP Activate Project Manager",
  },
  {
    name: "ACM Student Chapter Membership 2025-2026",
    issuer: "FEU Tech ACM Student Chapter",
    issued: "2025-2026",
    image: "/ACM Membership 2025-2026.png",
    alt: "Certificate of membership for Will Padilla in the FEU Institute of Technology ACM Student Chapter for academic year 2025-2026",
  },
  {
    name: "Learning MATLAB",
    issuer: "LinkedIn Learning",
    issued: "2025-11",
    image: "/Learning MatLab Certification_page-0001.jpg",
    alt: "LinkedIn Learning certificate for Learning MATLAB completed by Will Padilla in November 2025",
  },
  {
    name: "Complete Guide to Android Development with Kotlin for Beginners",
    issuer: "LinkedIn Learning",
    issued: "2025-11",
    image: "/Android Development Certification_page-0001.jpg",
    alt: "LinkedIn Learning certificate for the Complete Guide to Android Development with Kotlin for Beginners, completed by Will Padilla in November 2025",
  },
  {
    name: "CCNA: Introduction to Networks",
    issuer: "Cisco Networking Academy",
    issued: "2025-08",
    image: "/CCNA Introduction to Networking_page-0001.jpg",
    alt: "Cisco Networking Academy certificate for CCNA: Introduction to Networks awarded to Will Padilla in August 2025",
  },
  {
    name: "Information Technology Specialist Certification - Python",
    issuer: "Credly by Pearson",
    issued: "2025-07",
    credentialId: "wnTGK-48J9",
    image: "/Python Certification_page-0001.jpg",
    alt: "Information Technology Specialist certification for Python awarded to Will Padilla in July 2025",
  },
  {
    name: "JPCS Student Chapter Membership 2024-2025",
    issuer: "Junior Philippine Computer Society - FEU Tech",
    issued: "2024-2025",
    image: "/JPCS Membership 2024-2025_page-0001.jpg",
    alt: "Certificate of membership for Will Padilla in the Junior Philippine Computer Society FEU Tech chapter for academic year 2024-2025",
  },
];
