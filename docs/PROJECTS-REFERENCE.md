# Project Reference: All 4 Featured Projects

Reference sheet for Will's portfolio projects: descriptions, tech stacks split by frontend and backend, and full case study text.
Made 2026-11-01 from the Fill In Template (`public/Project Section - Fill In Template.md`).

- **SyncSpace, Signal No. 5 and Gabay Aralin** are copied from the live case studies in `src/data/portfolio.ts`, so they match the site word for word.
- **PixelDerm** is copied from the case study now in `portfolio.ts`. It was added outside the Claude team and hasn't been reviewed yet.
- Template headings with no matching content say so instead of being filled with guesses. The site's own process steps are kept under "The process", because they are what the pages show.

---

## PixelDerm

**Status:** Prototype  
**Tagline:** Android-based Mobile Platform for Longitudinal Skin Damage Analysis & Monitoring  
**Short description (carousel panel):** A mobile app for tracking UV-related skin damage over time by comparing new scans with a user's earlier baseline. I led the project as project manager, built parts of the app with Shana, and used Python to clean the datasets behind the image-analysis workflow. We worked with dermatologists to verify and validate the clinical-technical trials.

### Summary
PixelDerm is an Android app for tracking UV-related skin damage over time by comparing photos of the same skin area across sessions. I managed the project, helped build the app with Shana, and used Python to clean the datasets behind the image-analysis workflow. We worked with dermatologists to verify and validate the clinical-technical trials.

### Cover
- Image path: /projects/PixelDerm/pixelderm poster.png
- Alt text: PixelDerm poster showing the project title and a preview of the app on a phone

### Facts
- Duration: Sep 2025 - Jul 2026
- Context: Thesis
- Role: Project Manager, Co-Developer & Data Analyst
- Team: Will Padilla, Martonie Ayaay and Shana Anikka Patio
- Stack: React Native, TypeScript, Android, Python, Image Processing

### Tech stack
- **Frontend:** React Native 0.85, TypeScript (Android app)
- **Backend:** A backend server that receives and analyses the photos. Its code isn't in the local repo, so its stack is not confirmed.
- **Data:** Scan history kept on that server; the app keeps only a user ID on the phone (AsyncStorage)
- **Hosting or link:** Not public. The repo and demo link are paused.
- **Tags shown on the site:** React Native, TypeScript, Android, Image Processing, Python

### Overview
PixelDerm was built to help people track skin damage over time without relying on guesswork. In a tropical country like the Philippines, UV exposure is constant and often easy to overlook until the damage shows up later.

The app was designed to help people compare scans of the same skin area over time and see whether the skin is changing in ways they might otherwise miss.

### The problem
UV damage builds up slowly, so it is hard to notice changes from day to day. A person can be exposed to the sun during work, commuting, or everyday activities and still not know how that exposure is affecting their skin.

We wanted to make that process more visible and easier to monitor, especially for the average Filipino citizen who is regularly exposed to strong sunlight.

### My role
Project Manager, Co-Developer and Data Analyst for our thesis. I planned and ran the project (sprints, timeline, check-ins, quality checks on deliverables), helped build the app with Shana, and cleaned our datasets with Python.

### The process
The app and the analysis workflow were developed together. We planned the sprint structure, coordinated tasks, tracked deadlines and kept the team aligned on what needed to happen next.

My work included the project plan, execution monitoring, quality checks on the deliverables, and helping with the app's development. I also used Python to clean the image and clinical datasets used in the analysis pipeline.

#### Planning and coordination
I set the sprint structure, tracked the timeline, and kept the team aligned on deadlines, responsibilities and priorities. That structure helped us keep the project moving without losing momentum or quality.

The team used Git, scheduled check-ins and a shared roadmap so every part of the project stayed connected.

#### Building the app and analysis workflow
The app captures skin-area scans, compares them to earlier references, and surfaces the changes in a way that is meant to be readable to a user with little technical background.

On the analysis side, the app uses image-processing logic to compare texture, pigmentation and visible skin changes over time. A large part of my data work was cleaning the datasets that fed that part of the project.

Images: `/projects/pixelderm-2.jpg` (PixelDerm pre-capture screen for image comparison and skin tracking); `/projects/pixelderm-3.jpg` (PixelDerm image-analysis screen with an image-processing workflow)

#### Checking the clinical side
We worked with dermatologists to verify and validate our clinical-technical trials. Their input helped us align the app's workflow and analysis with the way dermatological monitoring is actually done in practice.

That gave the project more credibility and helped us keep the technical work grounded in real clinical needs.

### Challenges
[Open: needs Will's answer before it goes on the site.]

### Results
PixelDerm was completed as a thesis project and gave the team a working app and research workflow for long-term skin damage analysis.

The project was a valuable experience in product management, app development and research-based design, and it helped sharpen how I think about building tools that combine technical work with real user needs.

### Takeaways
- Good product work depends on keeping the technical flow and the user experience aligned from the start.
- Structured project planning matters just as much as building the feature itself.
- Data quality is a real part of product delivery, especially in research-driven tools.

### Demo
No demo video.

---

## SyncSpace

**Status:** Live  
**Tagline:** Synchronous Co-Working & Pomodoro Room App  
**Short description (carousel panel):** Shared real-time rooms with synced Pomodoro timers, tasks and notes, so study groups and remote teams can focus together instead of alone. Includes role-based access, a WebSocket sync engine and a quiz pipeline built from uploaded documents. Deployed on Vercel (frontend), Render (API) and Neon (Postgres).

### Summary
SyncSpace is a study space where a group shares one Pomodoro timer in a room, chats while they work, and gets a quiz built from the notes they uploaded when the session ends. I built it on my own, from the Next.js frontend to the Express and PostgreSQL backend, and deployed it on Vercel, Render and Neon.

### Cover
- Image path: /projects/syncspace/syncspace sample logo.png
- Alt text: SyncSpace logo and wordmark on a dark green background

### Facts
- Duration: Jun 2026 - present
- Context: Personal project
- Role: Full-stack developer (solo)
- Stack: Next.js, TypeScript, Express, Prisma, PostgreSQL, WebSockets
- Hosting: Vercel (web app), Render (API), Neon (database)

### Tech stack
- **Frontend:** Next.js, TypeScript, plain CSS
- **Backend:** Express 5, TypeScript, WebSockets, Prisma, server-side sessions; quiz questions by Claude when an API key is set, otherwise a built-in generator
- **Data:** PostgreSQL (Neon)
- **Hosting or link:** Vercel (web app), Render (API), Neon (database). Live at https://sync-space-taupe.vercel.app. Repo: https://github.com/WillPads/SyncSpace
- **Tags shown on the site:** Next.js, TypeScript, Express, Prisma, PostgreSQL, WebSockets

### Overview
SyncSpace started during my finals. My friends and I couldn't find a cafe or co-working space that fit our needs, our schedules and our budget. So I asked: why not study together from our own homes, on our own devices?

It was also a chance to show I can build and ship a full-stack product with the tools teams use in industry: a typed frontend, a real database, live updates, tests and a production deployment.

### The problem
Platforms like Discord already let a group meet online, but they're general-purpose, not built around focusing. Nothing in them keeps everyone working and resting on the same schedule.

I wanted one place with one goal: everyone in sync, focused on the same session. When the session ends, the group's own notes become a quick review quiz.

### My role
Solo full-stack developer: product, frontend, backend, database, tests and deployment. I used AI-assisted development tools while making the architecture and product decisions myself.

### The process
SyncSpace went from a rough prototype to a live site in five steps.

#### Rebuilding the prototype on a real backend
My first version kept rooms in memory inside the Next.js app and polled for updates. After talking it through with peers and mentors, I took their advice and rebuilt it with a separate Express and TypeScript server, Prisma, user accounts, and host and member roles in each room.

I made the architecture and product decisions myself and used AI-assisted development tools to help build it.

#### Letting the server own the clock
The timer only works if everyone sees the same thing, so only the server changes it. Every room change goes out over a WebSocket as a full snapshot, re-sent every second, and each browser counts down from when it received the last one. A wrong clock on someone's device can't shift their timer.

I chose versioned writes over a CRDT. There's one writer per room, and the timer is a state machine: an illegal move should be rejected, not merged.

#### Turning uploaded notes into a quiz
Anyone in a room can upload PDF, TXT or Markdown notes, and a background queue extracts the text. When the host ends the session, the room becomes a quiz built from those notes.

Claude writes the questions when an API key is set. Without one, or if the call fails, a built-in generator writes fill-in-the-blank questions from the text, so the feature never depends on a paid API.

Images: `/projects/syncspace/upload.jpg` (The Session notes panel in a room, with an uploaded notes file marked Ready and the Upload notes button); `/projects/syncspace/quiz.jpg` (The quiz phase after the session: multiple-choice questions built from the uploaded notes)

#### Hardening the backend before launch
A backend audit on Oct 22, 2026 listed what had to change before launch, and every finding was fixed and covered by tests the same day. The server moved to Express 5 so async errors can't crash it, JWTs were replaced with server-side sessions that can be revoked, and sign-in, joins and uploads got rate limits.

A row lock keeps the 10-person room cap from breaking when people join at the same time. The server now has 234 tests, all running against a real Postgres database instead of mocks.

Images: `/projects/syncspace/dashboard.png` (The live SyncSpace dashboard: create or join a room, room stats, and uploading PDF, TXT or MD materials up to 4 MB)

#### Deploying on free tiers
The web app runs on Vercel, the API on Render and the database on Neon, all on free plans. Vercel can't pass WebSocket connections through, so the browser first gets a single-use ticket that expires in 30 seconds, then connects straight to the server.

All traffic reached the server through Vercel, so every visitor looked like the same IP address. The sign-in limits now count the real visitor from the forwarded headers.

Images: `/projects/syncspace/welcome.jpg` (The live SyncSpace welcome page: everyone in a room shares one Pomodoro timer, chats, and takes a quiz built from uploaded notes)

### Challenges
The hardest problem was the feature everything depends on: the shared timer. In the first backend, the once-a-second tick also saved the timer, so if the host pressed reset at the same moment, the tick could overwrite it and the reset was lost. The code that worked out the current phase also replayed phase changes in a capped loop, which could leave a negative timer after about 1,000 of them.

The fix: ticks never write to the database, every timer write carries a version number so two changes can't both apply, and the remaining time is worked out in one step from the last saved snapshot. The once-a-second updates now come from memory, with no database query per tick.

### Results
SyncSpace is live at sync-space-taupe.vercel.app. I haven't promoted it yet; for now my friends and I use it during our study sessions.

They've told me it's useful, efficient and does what they need. Behind it, the server has 234 passing tests on a real Postgres database.

### Takeaways
- Give shared state one owner. Letting the server own the timer made sync and conflicts much simpler than merging changes from every client.
- Plan a fallback for every outside service. The quiz still works with no AI key, and the site tells people to wait and reload while the free server wakes up.
- Test against the real database. Some problems, like Postgres returning rows in an unstable order, only show up on the real thing.

### Demo
No demo video.

---

## Signal No. 5

**Status:** Prototype  
**Tagline:** 8-bit RPG that teaches typhoon preparedness, with dialogue from an AI model running locally on the laptop  
**Short description (carousel panel):** Players prepare a household for a fictional typhoon: manage limited resources, respond to warnings and evacuation advisories, and get through the storm and its aftermath, ending with a preparedness score, badges and a personal debrief. On the backend, I worked on the game details, levels and badges, game flow and debrief findings. As associate project manager, I helped lead the concept, run the team's plans and progress checkpoints, check documentation and status, and design the pitch. The team built a deterministic simulation engine and ran Qwen3-4B locally through llama.cpp for dialogue and debrief wording, with AI output kept apart from the game logic and checked by validation, grounding checks and fallback text. Built for kids aged 10-16 by a team of four.

### Summary
Signal No. 5 is an 8-bit typhoon preparedness RPG for Windows, built for kids aged 10 to 16. Players prepare a Filipino home for a storm, live through it and its aftermath, and get a score, badges and a personal debrief, with dialogue written by a small AI model running on the same laptop. My team of four built it in about 20 hours for the AppBuildersPH Local AI Hackathon 2026, where I worked on the backend and was associate project manager.

### Cover
- Image path: /projects/signal-no-5/Signal no. 5 logo.png
- Alt text: Signal No. 5 logo on its storm-themed background

### Facts
- Duration: Oct 9-10, 2026 (about 20 hours plus demo day)
- Context: AppBuildersPH Local AI Hackathon 2026
- Role: Associate Project Manager & Backend Developer
- Team: 4: Karl Stephen Mangahas (lead project manager), Martonie Ayaay, Adrian Louise Sevilla and me
- Stack: TypeScript, Phaser 3, React, Electron, llama.cpp, Qwen3-4B

### Tech stack
- **Frontend:** Phaser 3, React, TypeScript, packaged as an Electron desktop app for Windows
- **Backend:** Deterministic simulation engine in TypeScript (game rules, events, badges, debrief); Qwen3-4B run locally through llama.cpp for dialogue and debrief wording
- **Data:** None. Runs on the player's laptop.
- **Hosting or link:** Desktop app, no hosting. No public repo link yet (the lead PM is still finalising it).
- **Tags shown on the site:** TypeScript, Electron, React, Phaser 3, llama.cpp, Qwen3-4B

### Overview
The hackathon's theme was local AI: the model had to run on the player's own machine, not in the cloud. Our idea was that every household is different, so players set up their own household and play through a typhoon shaped by it.

### The problem
Typhoons hit the Philippines every year, yet most preparedness material is a checklist. It tells you what to do but not why, and it gives every household the same advice.

Kids get the least out of that. A list can't show what happens when you pack too late or ignore an advisory. Signal No. 5 lets them practise those decisions before a real storm: they choose, watch the consequences play out, and finish with a preparedness plan for their own household.

### My role
Associate Project Manager and Backend Developer. On the backend I worked on the game details, levels and badges, game flow and debrief findings. As co-PM I helped lead the concept, ran the team's plans and progress checkpoints, checked documentation and status, and designed the presentation and pitch. Karl Stephen Mangahas was the lead project manager.

### The process
We had about 20 hours to go from an idea to a playable game.

#### Picking tools the team already knew
We built the game with Phaser 3, React and TypeScript, packaged as an Electron app for Windows. Godot scored well in our comparison, but nobody on the team knew it, and switching languages would have meant rewriting our shared contracts.

#### Designing the game flow, levels and badges
A deterministic simulation engine owns every rule, resource, consequence and score, so the same choices always give the same result. My part of the backend was what runs on it: the game details, levels and badges, the game flow, and the debrief findings that tell players what they did well and what they missed.

Players work through a 48-hour countdown with 19 preparation actions and 16 typhoon events, then evacuation and a three-day aftermath.

Images: `/projects/signal-no-5/gameplay.jpg` (Signal No. 5 gameplay: a top-down pixel-art house where the family prepares, with the phase, go-bag status and checklist at the top)

#### Fitting a model on a 4 GB laptop GPU
We benchmarked Qwen3-1.7B and Qwen3-4B on a laptop with a 4 GB GTX 1650 Ti. Both returned valid JSON in all 30 test runs. The 4B was slower (about 5 seconds per reply against 2.4) but wrote better dialogue, so it's the one the game ships with.

We ran it with llama.cpp instead of Ollama: it's a smaller install and gives direct control over GPU memory.

#### Keeping the AI out of the rules
The model only writes NPC dialogue and debrief wording. Every reply goes through constrained JSON decoding, validation and a grounding guard that rejects anything contradicting the game, such as the home's layout or the storm's timing.

If a reply fails, the game uses fallback text written in advance, so it stays playable even without the model.

#### Build day and demo day
We built the game remotely on Oct 9 and demoed it on Oct 10 at SM Makati CyberZone. Alongside the build, I helped run our plans and progress checkpoints, checked the documentation and status, and designed the presentation and the reasoning behind our pitch.

### Challenges
The 4B model wrote better dialogue than the 1.7B, but it also made things up. In our benchmark review it invented facts the game must never state in 4 of 10 samples, and it scored 9 out of 20 on grounding against 19 for the smaller model.

We kept the 4B for its writing and added a grounding guard: a reply that contradicts the game, like the wrong home layout or storm timing, is rejected and replaced with fallback text.

### Results
We built and demoed a working game in about 20 hours. It didn't place. Karl Stephen Mangahas, our lead project manager, is still finalising its development.

### Takeaways
None (Will chose to skip takeaways for this project).

### Demo
`/projects/signal-no-5/promo.mp4` (Promotional video for the AppBuildersPH demo day). Our promotional video for the AppBuildersPH demo day.

---

## Gabay Aralin

**Status:** In Development  
**Tagline:** Mobile-first home tutor that helps parents teach their preschool and elementary kids  
**Short description (carousel panel):** A parent snaps a photo of the homework, types it in or picks a topic, and Gabay Aralin builds a step-by-step lesson with practice checks, a printable worksheet with an answer key, and tips for guiding the child. For homework, it gives guiding questions instead of answers. My teammate Shana Anikka Patio came up with the concept and built the first version during a 3-4 hour UX+AI hackathon sprint; I helped with core functions, features, deployment and the pitch. Improvements are in the works.

### Summary
Gabay Aralin is a mobile-first home tutor for parents of preschool and elementary kids. A parent snaps a photo of the homework, types it in or picks a topic, and the app builds a short lesson, practice questions, a printable worksheet and tips for guiding their child. My teammate Shana Anikka Patio came up with the idea and built the first version at a UX+AI hackathon; I helped with core functions, features, deployment and the pitch.

### Cover
- Image path: /projects/gabay-aralin/gabay aralin logo.jpg
- Alt text: Gabay Aralin wordmark with a notebook and pencil illustration

### Facts
- Date: Oct 25, 2026 (initial hackathon submission)
- Context: UX+AI Hackathon, Zone Offices BGC, 3-4 hour sprint
- Role: Co-developer
- Team: 2: Shana Anikka Patio and me

### Tech stack
- **Frontend:** One mobile-first HTML/JavaScript page (not confirmed by Will)
- **Backend:** Node.js 20 + Express 4, OpenAI API (gpt-4.1 / gpt-4.1-mini) with Structured Outputs (not confirmed by Will)
- **Data:** The browser's localStorage (not confirmed by Will)
- **Hosting or link:** https://gabayaralin.vercel.app was listed in the repo but returned 404 (2026-10-30). Not on the site.
- **Tags shown on the site:** none (stack on hold)

### Overview
Gabay Aralin started at a UX+AI hackathon at Zone Offices in BGC, a 3-4 hour sprint. Shana came up with the concept and built the first stages, and I helped with the core functions, features, deployment and the pitch. We submitted the first version on Oct 25, 2026, and kept working on it after the event.

### The problem
At preschool and elementary age, a child's main teacher at home is usually a parent. Parents are the ones sitting beside their kids at homework time, but they aren't trained tutors.

That's when the hard moments happen: a parent isn't sure how to explain a topic, and the quickest way out is to hand over the answer. Gabay Aralin is built for moments like that. It helps the parent teach, with a lesson to follow, questions that guide the child, and an answer key only for the grown-up.

### My role
Co-developer. Shana Anikka Patio came up with the concept and built the first version with the event's sponsored Codex credits. I helped with core functions, features, deployment and the pitch.

### The process
We had 3-4 hours to go from an idea to a working app.

#### From homework guide to tutor center
Shana built the first stages using the event's sponsored Codex API credits. The app began as a homework guide for parents, written in Tagalog.

By the end of the day it was in English, had family profiles with each child's grade, sorted saved lessons by child, grade and subject, and had been rebuilt as a home tutor center around four parts: lessons, practice, worksheets and parent tips.

#### Designing for parents and kids together
Each lesson is 3 to 5 short steps written for the child, with a note for grown-ups and a quick check after every step. Wrong answers get an encouraging hint, then a second one, and the answer only appears after the third try.

The worksheet prints with an answer key that explains each answer for the parent.

#### Keeping homework unsolved
The parts that write lessons and worksheets never see the homework itself, only the subject, topic, grade and skills. A separate check solves every practice and worksheet question, drops any with a wrong or ambiguous answer key, and makes sure no question copies a homework item.

#### Features, deployment and the pitch
My part was helping build the core functions and features, deploying the app, and pitching it.

### Challenges
[Open: needs Will's answer before it goes on the site.]

### Results
We didn't make the top contenders. Improvements are in the works.

### Takeaways
None (Will chose to skip takeaways for this project).

### Demo
`/projects/gabay-aralin/demo.mp4` (App walkthrough). A walkthrough of the app.

