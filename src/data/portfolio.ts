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
  role: string; // the line under the name in the hero
  tagline: string; // the big headline in the hero
  intro: string; // short paragraph under the headline
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
  name: "Will Padilla",
  role: "Software Engineer & Computer Science Student at FEU Tech",
  tagline: "To develop with purpose, pushed by passion",
  intro:
    "I'm a Computer Science student at FEU Tech who strives toward great software developed with purpose, pushed by passion.",
  resume: "/resume.pdf", // file goes in public/resume.pdf
  lookingFor:
    "A 520-hour internship or entry-level role in any position where I'd be a good fit for your organization. Eagerly available and looking out for opportunities.",
  bio: "Driven by a passion to learn and understand, I'm a lifelong student at heart. That continuous loop—learning, understanding, and building—is what powers everything I do, allowing me to turn my love for learning into purposeful, impactful solutions.",
  contactNote:
    "Made it all the way down here? Let's talk. If your team has an internship opening, I'd like to hear about it. Reach me by email or LinkedIn, or download my resume below.",
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
  { label: "About", href: "#about" },
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
//   "completed"      finished, but not deployed                      -> badge "Completed"
//   "in-development" still being built                               -> badge "In Development"
export type ProjectStatus = "live" | "completed" | "in-development";

export type ProjectScreenshot = {
  src: string; // path inside public/, e.g. "/projects/pixelderm-2.jpg"
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
    role: "Project Manager & Developer",
    tagline:
      "Android-based Mobile Platform for Longitudinal Skin Damage Analysis & Monitoring",
    description:
      "An image-processing pipeline isolates and tracks UV-induced skin damage over time, comparing each new scan with the user's baseline. The app was developed with dermatologists and evaluated under ISO/IEC 25010 software quality standards.",
    stack: ["React Native", "TypeScript", "Android", "Image Processing", "ISO/IEC 25010"],
    status: "completed",
    year: "Sep 2025 - Jul 2026",
    context: "Thesis",
    device: "mobile",
    screenshots: [
      { src: "/projects/pixelderm-1.jpg", alt: "PixelDerm Homepage" },
      { src: "/projects/pixelderm-2.jpg", alt: "PixelDerm Pre-Capture screen" },
      { src: "/projects/pixelderm-3.jpg", alt: "PixelDerm Analysis - Image Analysis" },
      { src: "/projects/pixelderm-4.jpg", alt: "PixelDerm Analysis - Results" },
    ],
  },
  {
    slug: "syncspace",
    title: "SyncSpace",
    role: "Full-stack Developer",
    tagline: "Synchronous Co-Working & Pomodoro Room App",
    description:
      "Shared real-time rooms with synced Pomodoro timers, tasks and notes, so study groups and remote teams can focus together instead of alone. Includes role-based access, a WebSocket sync engine and a quiz pipeline built from uploaded documents. Deployed on Vercel (frontend), Render (API) and Neon (Postgres).",
    stack: ["Next.js", "TypeScript", "Express", "Prisma", "PostgreSQL", "WebSockets"],
    status: "live",
    year: "Jun 2026 - present",
    liveUrl: "https://sync-space-taupe.vercel.app",
    repoUrl: "https://github.com/WillPads/SyncSpace",
    context: "Personal project",
    device: "desktop",
    screenshots: [
      { src: "/projects/syncspace/room.jpg", alt: "A SyncSpace study room: the shared focus timer with host controls, the people in the room, chat, tasks, session notes and ambient sound" },
      { src: "/projects/syncspace/dashboard.png", alt: "The SyncSpace dashboard: create or join a room, room stats, uploading materials and notes" },
      { src: "/projects/syncspace/quiz.jpg", alt: "The quiz phase after a session: multiple-choice questions built from the uploaded photosynthesis notes" },
      { src: "/projects/syncspace/welcome.jpg", alt: "SyncSpace welcome page explaining shared study rooms" },
    ],
    caseStudy: {
      summary:
        "SyncSpace is a study space where a group shares one Pomodoro timer in a room, chats while they work, and gets a quiz built from the notes they uploaded when the session ends. I built it on my own, from the Next.js frontend to the Express and PostgreSQL backend, and deployed it on Vercel, Render and Neon.",
      cover: {
        src: "/projects/syncspace/room.jpg",
        alt: "A SyncSpace study room: the shared focus timer with host controls, the people in the room, chat, tasks, session notes and ambient sound",
        width: 1102,
        height: 714,
      },
      facts: [
        { label: "Duration", value: "Jun 2026 - present" },
        { label: "Context", value: "Personal project" },
        { label: "Role", value: "Full-stack developer (solo)" },
        { label: "Stack", value: "Next.js, TypeScript, Express, Prisma, PostgreSQL, WebSockets" },
        { label: "Hosting", value: "Vercel (web app), Render (API), Neon (database)" },
      ],
      sections: [
        {
          title: "Overview",
          paragraphs: [
            "SyncSpace started during my finals. My friends and I couldn't find a cafe or co-working space that fit our needs, our schedules and our budget. So I asked: why not study together from our own homes, on our own devices?",
            "It was also a chance to show I can build and ship a full-stack product with the tools teams use in industry: a typed frontend, a real database, live updates, tests and a production deployment.",
          ],
        },
        {
          title: "The problem",
          paragraphs: [
            "Platforms like Discord already let a group meet online, but they're general-purpose, not built around focusing. Nothing in them keeps everyone working and resting on the same schedule.",
            "I wanted one place with one goal: everyone in sync, focused on the same session. When the session ends, the group's own notes become a quick review quiz.",
          ],
        },
        {
          title: "The process",
          paragraphs: ["SyncSpace went from a rough prototype to a live site in five steps."],
          steps: [
            {
              title: "Rebuilding the prototype on a real backend",
              paragraphs: [
                "My first version kept rooms in memory inside the Next.js app and polled for updates. After talking it through with peers and mentors, I took their advice and rebuilt it with a separate Express and TypeScript server, Prisma, user accounts, and host and member roles in each room.",
                "I made the architecture and product decisions myself and used AI-assisted development tools to help build it.",
              ],
            },
            {
              title: "Letting the server own the clock",
              paragraphs: [
                "The timer only works if everyone sees the same thing, so only the server changes it. Every room change goes out over a WebSocket as a full snapshot, re-sent every second, and each browser counts down from when it received the last one. A wrong clock on someone's device can't shift their timer.",
                "I chose versioned writes over a CRDT. There's one writer per room, and the timer is a state machine: an illegal move should be rejected, not merged.",
              ],
            },
            {
              title: "Turning uploaded notes into a quiz",
              paragraphs: [
                "Anyone in a room can upload PDF, TXT or Markdown notes, and a background queue extracts the text. When the host ends the session, the room becomes a quiz built from those notes.",
                "Claude writes the questions when an API key is set. Without one, or if the call fails, a built-in generator writes fill-in-the-blank questions from the text, so the feature never depends on a paid API.",
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
              images: [
                {
                  src: "/projects/syncspace/dashboard.png",
                  alt: "The live SyncSpace dashboard: create or join a room, room stats, and uploading PDF, TXT or MD materials up to 4 MB",
                  width: 1840,
                  height: 966,
                },
              ],
            },
            {
              title: "Deploying on free tiers",
              paragraphs: [
                "The web app runs on Vercel, the API on Render and the database on Neon, all on free plans. Vercel can't pass WebSocket connections through, so the browser first gets a single-use ticket that expires in 30 seconds, then connects straight to the server.",
                "All traffic reached the server through Vercel, so every visitor looked like the same IP address. The sign-in limits now count the real visitor from the forwarded headers.",
              ],
              images: [
                {
                  src: "/projects/syncspace/welcome.jpg",
                  alt: "The live SyncSpace welcome page: everyone in a room shares one Pomodoro timer, chats, and takes a quiz built from uploaded notes",
                  width: 800,
                  height: 670,
                },
              ],
            },
          ],
        },
        {
          title: "Struggles",
          paragraphs: [
            "The hardest problem was the feature everything depends on: the shared timer. In the first backend, the once-a-second tick also saved the timer, so if the host pressed reset at the same moment, the tick could overwrite it and the reset was lost. The code that worked out the current phase also replayed phase changes in a capped loop, which could leave a negative timer after about 1,000 of them.",
            "The fix: ticks never write to the database, every timer write carries a version number so two changes can't both apply, and the remaining time is worked out in one step from the last saved snapshot. The once-a-second updates now come from memory, with no database query per tick.",
          ],
        },
        {
          title: "Results",
          paragraphs: [
            "SyncSpace is live at sync-space-taupe.vercel.app. I haven't promoted it yet; for now my friends and I use it during our study sessions.",
            "They've told me it's useful, efficient and does what they need. Behind it, the server has 234 passing tests on a real Postgres database.",
          ],
        },
      ],
      takeaways: [
        "Give shared state one owner. Letting the server own the timer made sync and conflicts much simpler than merging changes from every client.",
        "Plan a fallback for every outside service. The quiz still works with no AI key, and the site tells people to wait and reload while the free server wakes up.",
        "Test against the real database. Some problems, like Postgres returning rows in an unstable order, only show up on the real thing.",
      ],
    },
  },
  {
    slug: "signal-no-5",
    title: "Signal No. 5",
    role: "Associate Project Manager & Backend Developer",
    tagline: "8-bit RPG that teaches typhoon preparedness, with dialogue from an AI model running locally on the laptop",
    description:
      "Players prepare a household for a fictional typhoon: manage limited resources, respond to warnings and evacuation advisories, and get through the storm and its aftermath, ending with a preparedness score, badges and a personal debrief. On the backend, I worked on the game details, levels and badges, game flow and debrief findings. As associate project manager, I helped lead the concept, run the team's plans and progress checkpoints, check documentation and status, and design the pitch. The team built a deterministic simulation engine and ran Qwen3-4B locally through llama.cpp for dialogue and debrief wording, with AI output kept apart from the game logic and checked by validation, grounding checks and fallback text. Built for kids aged 10-16 by a team of four.",
    stack: ["TypeScript", "Electron", "React", "Phaser 3", "llama.cpp", "Qwen3-4B"],
    status: "completed",
    year: "Oct 2026",
    context: "AppBuildersPH Local AI Hackathon 2026",
    impact: "Built and demoed in a 20-hour sprint; the 4B-parameter AI model runs locally, with no cloud API",
    device: "desktop",
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
        src: "/projects/signal-no-5/cover.jpg",
        alt: "Signal No. 5 title art: a pixel-art house at night under a typhoon, with a signal tower and the line \"Storm's coming... ready or not?\"",
        width: 682,
        height: 381,
      },
      facts: [
        { label: "Duration", value: "Oct 9-10, 2026 (about 20 hours plus demo day)" },
        { label: "Context", value: "AppBuildersPH Local AI Hackathon 2026" },
        { label: "Role", value: "Associate Project Manager & Backend Developer" },
        {
          label: "Team",
          value: "4: Karl Stephen Mangahas (lead project manager), Martonie Ayaay, Adrian Louise Sevilla and me",
        },
        { label: "Stack", value: "TypeScript, Phaser 3, React, Electron, llama.cpp, Qwen3-4B" },
      ],
      sections: [
        {
          title: "Overview",
          paragraphs: [
            "The hackathon's theme was local AI: the model had to run on the player's own machine, not in the cloud. Our idea was that every household is different, so players set up their own household and play through a typhoon shaped by it.",
          ],
        },
        {
          title: "The problem",
          paragraphs: [
            "Typhoons hit the Philippines every year, yet most preparedness material is a checklist. It tells you what to do but not why, and it gives every household the same advice.",
            "Kids get the least out of that. A list can't show what happens when you pack too late or ignore an advisory. Signal No. 5 lets them practise those decisions before a real storm: they choose, watch the consequences play out, and finish with a preparedness plan for their own household.",
          ],
        },
        {
          title: "The process",
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
          title: "Struggles",
          paragraphs: [
            "The 4B model wrote better dialogue than the 1.7B, but it also made things up. In our benchmark review it invented facts the game must never state in 4 of 10 samples, and it scored 9 out of 20 on grounding against 19 for the smaller model.",
            "We kept the 4B for its writing and added a grounding guard: a reply that contradicts the game, like the wrong home layout or storm timing, is rejected and replaced with fallback text.",
          ],
        },
        {
          title: "Demo",
          paragraphs: ["Our promotional video for the AppBuildersPH demo day."],
          showDemoVideo: true,
        },
        {
          title: "Results",
          paragraphs: [
            "We built and demoed a working game in about 20 hours. It didn't place. Karl Stephen Mangahas, our lead project manager, is still finalising its development.",
          ],
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
      "A parent snaps a photo of the homework, types it in or picks a topic, and Gabay Aralin builds a step-by-step lesson with practice checks, a printable worksheet with an answer key, and tips for guiding the child. For homework, it gives guiding questions instead of answers. My teammate Shana Anikka Patio came up with the concept and built the first version during a 3-4 hour UX+AI hackathon sprint; I helped with core functions, features, deployment and the pitch. Improvements are in the works.",
    stack: [], // TODO(Will): add the tech stack
    status: "in-development",
    year: "Oct 2026",
    context: "UX+AI Hackathon, 3-4 hour sprint",
    device: "mobile",
    screenshots: [],
    demoVideo: {
      src: "/projects/gabay-aralin/demo.mp4",
      poster: "/projects/gabay-aralin/poster.jpg",
      caption: "App walkthrough",
    },
    caseStudy: {
      summary:
        "Gabay Aralin is a mobile-first home tutor for parents of preschool and elementary kids. A parent snaps a photo of the homework, types it in or picks a topic, and the app builds a short lesson, practice questions, a printable worksheet and tips for guiding their child. My teammate Shana Anikka Patio came up with the idea and built the first version at a UX+AI hackathon; I helped with core functions, features, deployment and the pitch.",
      cover: {
        src: "/projects/gabay-aralin/poster.jpg",
        alt: "Gabay Aralin's family setup screen: \"Your free Home Tutor Center\", with steps to add each child and their grade level, and a parent profile form",
        width: 1280,
        height: 720,
      },
      facts: [
        { label: "Date", value: "Oct 25, 2026 (initial hackathon submission)" },
        { label: "Context", value: "UX+AI Hackathon, Zone Offices BGC, 3-4 hour sprint" },
        { label: "Role", value: "Co-developer" },
        { label: "Team", value: "2: Shana Anikka Patio and me" },
      ],
      sections: [
        {
          title: "Overview",
          paragraphs: [
            "Gabay Aralin started at a UX+AI hackathon at Zone Offices in BGC, a 3-4 hour sprint. Shana came up with the concept and built the first stages, and I helped with the core functions, features, deployment and the pitch. We submitted the first version on Oct 25, 2026, and kept working on it after the event.",
          ],
        },
        {
          title: "The problem",
          paragraphs: [
            "At preschool and elementary age, a child's main teacher at home is usually a parent. Parents are the ones sitting beside their kids at homework time, but they aren't trained tutors.",
            "That's when the hard moments happen: a parent isn't sure how to explain a topic, and the quickest way out is to hand over the answer. Gabay Aralin is built for moments like that. It helps the parent teach, with a lesson to follow, questions that guide the child, and an answer key only for the grown-up.",
          ],
        },
        {
          title: "The process",
          paragraphs: ["We had 3-4 hours to go from an idea to a working app."],
          steps: [
            {
              title: "From homework guide to tutor center",
              paragraphs: [
                "Shana built the first stages using the event's sponsored Codex API credits. The app began as a homework guide for parents, written in Tagalog.",
                "By the end of the day it was in English, had family profiles with each child's grade, sorted saved lessons by child, grade and subject, and had been rebuilt as a home tutor center around four parts: lessons, practice, worksheets and parent tips.",
              ],
            },
            {
              title: "Designing for parents and kids together",
              paragraphs: [
                "Each lesson is 3 to 5 short steps written for the child, with a note for grown-ups and a quick check after every step. Wrong answers get an encouraging hint, then a second one, and the answer only appears after the third try.",
                "The worksheet prints with an answer key that explains each answer for the parent.",
              ],
            },
            {
              title: "Keeping homework unsolved",
              paragraphs: [
                "The parts that write lessons and worksheets never see the homework itself, only the subject, topic, grade and skills. A separate check solves every practice and worksheet question, drops any with a wrong or ambiguous answer key, and makes sure no question copies a homework item.",
              ],
            },
            {
              title: "Features, deployment and the pitch",
              paragraphs: [
                "My part was helping build the core functions and features, deploying the app, and pitching it.",
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
          title: "Results and what's next",
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
  credentialId?: string;
};

// Newest first. Copied from Will's LinkedIn (2026-10-30). No verification links, by Will's choice.
// Long LinkedIn Learning hash IDs are left out; short IDs are shown.
export const certifications: Certification[] = [
  {
    name: "AI Overview for Project Managers",
    issuer: "Project Management Institute",
    issued: "2026-10",
    credentialId: "336510257667",
  },
  { name: "TypeScript Essential Training", issuer: "LinkedIn Learning", issued: "2026-08" },
  { name: "Gemini Certified Student", issuer: "Google for Education", issued: "2026-08" },
  { name: "SAP Certified Associate - SAP Activate Project Manager", issuer: "SAP", issued: "2026-07" },
  {
    name: "PMI Project Management Ready",
    issuer: "Project Management Institute",
    issued: "2026-03",
    credentialId: "4w7W-XMpP",
  },
  {
    name: "Complete Guide to Android Development with Kotlin for Beginners",
    issuer: "LinkedIn Learning",
    issued: "2025-11",
  },
  { name: "CCNA: Introduction to Networks", issuer: "Cisco Networking Academy", issued: "2025-08" },
  {
    name: "Information Technology Specialist Certification",
    issuer: "Credly by Pearson",
    issued: "2025-07",
    credentialId: "wnTGK-48J9",
  },
];
