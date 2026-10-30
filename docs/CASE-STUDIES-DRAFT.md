# Case Studies: Draft

Drafted by Winston on 2026-10-30 from `docs/CASE-STUDIES-TO-FILL.md` (the template stays as it is), Will's
confirmed facts and the project files on this machine. Nothing here is on the site yet.

How to read this draft:

- `[ASK WILL: ...]` marks something the sources don't cover. Answer it, or delete the sentence.
- `[CHECK]` marks something inferred or taken from a planning document rather than stated as final. Confirm
  it or correct it.
- The prose is in first person, as Will. Numbers appear only where a source states them.
- Image files named below already exist in `public/projects/`. Suggested extra screenshots are listed at the
  end of each project.

---

## 1. SyncSpace (`public/projects/syncspace/`)

**Facts**

Status: FINAL. Will answered the questions on 2026-10-30. This text is now in `src/data/portfolio.ts`
(`caseStudy` on the SyncSpace entry).

- Duration: Jun 2026 - present
- Context: Personal project
- Role: Full-stack developer (solo)
- Stack: Next.js, TypeScript, Express, Prisma, PostgreSQL, WebSockets
- Hosting: Vercel (web app), Render (API), Neon (database)

**Summary**

SyncSpace is a study space where a group shares one Pomodoro timer in a room, chats while they work, and gets
a quiz built from the notes they uploaded when the session ends. I built it on my own, from the Next.js
frontend to the Express and PostgreSQL backend, and deployed it on Vercel, Render and Neon.

**Overview**

SyncSpace started during my finals. My friends and I couldn't find a cafe or co-working space that fit our
needs, our schedules and our budget. So I asked: why not study together from our own homes, on our own
devices?

It was also a chance to show I can build and ship a full-stack product with the tools teams use in industry:
a typed frontend, a real database, live updates, tests and a production deployment.

**The problem**

Platforms like Discord already let a group meet online, but they're general-purpose, not built around
focusing. Nothing in them keeps everyone working and resting on the same schedule.

I wanted one place with one goal: everyone in sync, focused on the same session. When the session ends, the
group's own notes become a quick review quiz.

**The process**

SyncSpace went from a rough prototype to a live site in five steps.

- **Step 1: Rebuilding the prototype on a real backend**
  My first version kept rooms in memory inside the Next.js app and polled for updates. After talking it
  through with peers and mentors, I took their advice and rebuilt it with a separate Express and TypeScript
  server, Prisma, user accounts, and host and member roles in each room.
  I made the architecture and product decisions myself and used AI-assisted development tools to help build it.
  Image: none

- **Step 2: Letting the server own the clock**
  The timer only works if everyone sees the same thing, so only the server changes it. Every room change goes
  out over a WebSocket as a full snapshot, re-sent every second, and each browser counts down from when it
  received the last one. A wrong clock on someone's device can't shift their timer.
  I chose versioned writes over a CRDT. There's one writer per room, and the timer is a state machine: an
  illegal move should be rejected, not merged.
  Image: none (`room.jpg` is the cover)

- **Step 3: Turning uploaded notes into a quiz**
  Anyone in a room can upload PDF, TXT or Markdown notes, and a background queue extracts the text. When the
  host ends the session, the room becomes a quiz built from those notes.
  Claude writes the questions when an API key is set. Without one, or if the call fails, a built-in generator
  writes fill-in-the-blank questions from the text, so the feature never depends on a paid API.
  Image: none (`dashboard.jpg` left out, see the note below)

- **Step 4: Hardening the backend before launch**
  A backend audit on Oct 22, 2026 listed what had to change before launch, and every finding was fixed and
  covered by tests the same day. The server moved to Express 5 so async errors can't crash it, JWTs were
  replaced with server-side sessions that can be revoked, and sign-in, joins and uploads got rate limits.
  A row lock keeps the 10-person room cap from breaking when people join at the same time. The server now has
  234 tests, all running against a real Postgres database instead of mocks.
  Image: none

- **Step 5: Deploying on free tiers**
  The web app runs on Vercel, the API on Render and the database on Neon, all on free plans. Vercel can't pass
  WebSocket connections through, so the browser first gets a single-use ticket that expires in 30 seconds,
  then connects straight to the server.
  All traffic reached the server through Vercel, so every visitor looked like the same IP address. The
  sign-in limits now count the real visitor from the forwarded headers.
  Image: `welcome.jpg`

**Struggles**

The hardest problem was the feature everything depends on: the shared timer. In the first backend, the
once-a-second tick also saved the timer, so if the host pressed reset at the same moment, the tick could
overwrite it and the reset was lost. The code that worked out the current phase also replayed phase changes in
a capped loop, which could leave a negative timer after about 1,000 of them.

The fix: ticks never write to the database, every timer write carries a version number so two changes can't
both apply, and the remaining time is worked out in one step from the last saved snapshot. The
once-a-second updates now come from memory, with no database query per tick.

**Results**

SyncSpace is live at sync-space-taupe.vercel.app. I haven't promoted it yet; for now my friends and I use it
during our study sessions.

They've told me it's useful, efficient and does what they need. Behind it, the server has 234 passing tests
on a real Postgres database.

**Takeaways**

- Give shared state one owner. Letting the server own the timer made sync and conflicts much simpler than
  merging changes from every client.
- Plan a fallback for every outside service. The quiz still works with no AI key, and the site tells people
  to wait and reload while the free server wakes up.
- Test against the real database. Some problems, like Postgres returning rows in an unstable order, only show
  up on the real thing.

**Cover image:** `room.jpg`

**Images used:** `room.jpg` (cover), `welcome.jpg` (step 5).

[CHECK: `room.jpg` and `dashboard.jpg` look like the design mockup, not the live app. `room.jpg` shows a
"Long break" tab, a "Temporary room" label, video controls and sample people. `dashboard.jpg` shows
"Temporary/Permanent" room types and "PDF, DOC, DOCX or images, up to 20 MB". The README lists long break,
room types, video and DOC/DOCX/image uploads as not built, and caps uploads at 4 MB. `room.jpg` is the cover
because it was requested, but swap it for a real screenshot of the live room. `dashboard.jpg` isn't used.]

**Suggested extra screenshots (from the live site):** a real room with the timer and chat, the quiz phase
after a session ends, and two browsers side by side showing the same timer.

---

## 2. PixelDerm (`public/projects/`, files `pixelderm-1.jpg` to `pixelderm-4.jpg`)

**Facts**

- Context: Thesis project (confirmed by Will 2026-10-30).
- Dates: Sep 2025 to Jul 2026. Status: Completed.
- Stack (as on the site): React Native, TypeScript, Android, Image Processing, ISO/IEC 25010. The site no longer
  says "local SQLite storage".
- Team: three people: Will, Martonie Ayaay and Shana Anikka Patio. [CHECK: team of three, from earlier notes]
- Will's role: Project Manager and Co-Developer, plus a minor data analyst role (cleaning datasets with
  Python).
- [ASK WILL: Who did what? In particular, which parts of the app did you build as co-developer, and what did
  Martonie and Shana own?]
- Which role should the site show? Suggestion: "Project Manager & Co-Developer". It matches the resume without
  giving the data analyst work more weight than it had. [ASK WILL: OK to use this?]
- Repo/demo link: still paused.

**Summary**

PixelDerm is an Android app that tracks UV-related skin damage over time by comparing photos of the same area
of skin. It was our thesis project. I was the project manager and a co-developer, and I also cleaned datasets
in Python for the analysis.

**Overview**

[ASK WILL: Who is PixelDerm for (for example, people with a lot of sun exposure, or anyone who wants to track
their skin), and why did your team choose UV skin damage as a thesis topic?]

**The problem**

UV damage builds up slowly, so it's hard to notice changes in your own skin from day to day. [CHECK: inferred
from the app's purpose] [ASK WILL: What gap did your research point to, for example how people check sun
damage today, or why tracking over time matters more than a single check?]

**The process**

- **Step 1: Working with dermatologists**
  We developed PixelDerm with clinical consultation from dermatologists. [ASK WILL:
  What did the dermatologists help decide (what to measure, how to word advice, the limits the app should
  state)? How many did you consult, if you're allowed to say?]
  Image: none

- **Step 2: From photo to measurements**
  A user picks a body area to monitor, then takes a photo or chooses one from the gallery, with tips on
  lighting and keeping the camera steady. The app measures the photo for visible spots, texture and
  pigmentation. It also tells users with vitiligo that their results may be inaccurate. [CHECK: read from the
  app's code and screens] [ASK WILL: How does the image-processing pipeline work, and why did your team choose
  that approach?]
  Image: `pixelderm-2.jpg` (capture screen), with `pixelderm-3.jpg` (processing) as an option

- **Step 3: Tracking change over time**
  Each new scan is compared with the user's baseline for that body area, so the result shows how the skin has
  changed, not just a single score. The results screen gives a risk level, a skin score and a recommendation,
  and suggests seeing a dermatologist when it finds a high density of spots. [CHECK: read from the code] The
  app keeps each user's scan history, so every new scan can be compared with their baseline. [CHECK: the app
  code on this machine sends photos to a backend server; confirm where scans are stored and processed before
  saying more]
  Image: `pixelderm-4.jpg`

- **Step 4: Preparing the data**
  My part on the data side was small: I cleaned datasets in Python before they were used. [ASK WILL: Which
  datasets, what did cleaning involve, and what were they used for (tuning, testing, validation)?]
  Image: none

- **Step 5: Evaluating with ISO/IEC 25010**
  We evaluated PixelDerm against the ISO/IEC 25010 software quality model. [ASK WILL: Who evaluated it (users,
  IT experts, dermatologists), which quality characteristics did you measure, and what were the results?]
  Image: none

**Struggles**

[ASK WILL: What was the hardest problem, either technical (for example, photos taken in different lighting)
or as project manager (deadlines, splitting work in a team of three, feedback from your panel), and how did
you get past it?]

**Results**

- Completed and evaluated with ISO/IEC 25010. [ASK WILL: Scores or ratings?]
- [ASK WILL: The dermatologists' feedback, the defense result or grade, and any awards. Leave out anything you
  don't want public.]

**Takeaways**

[ASK WILL: 2-4 lessons, especially from managing the project: planning, keeping a team on schedule, working
with clinical experts.]

**Cover image:** `pixelderm-4.jpg` (the results screen shows what the app does at a glance)

**Images used:** `pixelderm-2.jpg`, `pixelderm-3.jpg`, `pixelderm-4.jpg`. `pixelderm-1.jpg` (home screen
with no scans) isn't used in a step; it could go in a gallery.
**Suggested extra screenshots:** the "vs Baseline" tab, the History screen, and the Profile screen with skin
type.

---

## 3. Signal No. 5 (`public/projects/signal-no-5/`)

**Facts**

- Event: AppBuildersPH Local AI Hackathon 2026, theme "Localized A.I.". Remote build day Oct 9 (about 20
  hours), demo day Oct 10 at SM Makati CyberZone.
- Role: Lead Backend Engineer & Project Manager.
- Team of four: Will, Karl Stephen Mangahas, Martonie Ayaay and Adrian Louise Sevilla.
- Stack: TypeScript, Electron, React, Phaser 3, Qwen3-4B through llama.cpp.
- Result: did not place. [CHECK: from earlier notes] The lead developer is still developing it.
- [ASK WILL: The team plan split the work into two frontend and two backend/AI roles: one backend person on
  the simulation engine, one on the local AI. Which did you do, and who did the rest?]

**Summary**

Signal No. 5 is an 8-bit typhoon preparedness RPG for kids aged 10 to 16 that runs fully offline, with a small
language model running locally. My team of four built it in about 20 hours for the AppBuildersPH Local AI
Hackathon 2026, where I was lead backend engineer and project manager.

**Overview**

The hackathon's theme was local AI, meaning the AI has to run on the user's own device. Our pitch was that
every household is different, so disaster preparedness training shouldn't be the same for everyone: players
answer a few questions about their home and then play through a typhoon shaped by those answers. [CHECK: from
the team's planning document] [ASK WILL: Why typhoons, and why kids aged 10 to 16? The planning document aims
at "Filipino students, young adults, and households", so confirm which audience the final game targets.]

**The problem**

Most preparedness material tells you what to do but not why it matters, and it gives every household the same
advice. Signal No. 5 lets players make the decisions, see the consequences, and get a checklist based on their
own answers. [CHECK: from the planning document] [ASK WILL: Anything from your own experience of typhoons or
school preparedness drills you'd add here?]

**The process**

- **Step 1: Scoping for 20 hours**
  We limited the game to one hazard, typhoons, and one map, a single house, and reused fixed room layouts
  instead of generating maps. The rule was a finished playable loop over a bigger unfinished game: survey,
  storm events, choices, then a debrief with badges. [CHECK: from the planning document; confirm what made it
  into the final build]
  Image: none

- **Step 2: Building a deterministic simulation engine**
  The game engine, not the AI, decides what happens. Each choice changes time, supplies and household
  readiness, later events check those changes, and badges and scores come only from fixed rules. Events were
  written as data files, so teammates could write content while the engine was being built. [CHECK: from the
  planning document] [ASK WILL: Was this engine your part?]
  Image: `gameplay.jpg`

- **Step 3: Running a 4B model offline**
  The game runs Qwen3-4B through llama.cpp inside an Electron app, so it works with no internet connection.
  [ASK WILL: Why Qwen3-4B and llama.cpp? The plan started with smaller models (Qwen3 1.7B) and Ollama. How fast
  did it respond on the demo laptop?]
  Image: none

- **Step 4: Keeping the AI from making things up**
  The model only writes dialogue and scene descriptions, and it can only choose from the event variants,
  speakers and actions the engine sends it. Every reply is checked against a schema and the allowed lists,
  then screened for things like hotline numbers, invented warnings or medical advice. If a reply fails or takes
  too long, the game retries once and then uses text we wrote and reviewed in advance, so the player never sees
  unchecked safety advice. [CHECK: from the planning document; confirm the final build matches] [ASK WILL: How
  did the grounding checks work in the final version?]
  Image: none

- **Step 5: Build day and demo day**
  We built the game remotely on Oct 9 and demoed it on Oct 10 at SM Makati CyberZone. [ASK WILL: As project
  manager, how did you keep four people in sync over 20 hours? The plan had merge checkpoints and a feature
  freeze; did you use them?]
  Image: `promo.mp4` (video; plays only when clicked)

**Struggles**

[ASK WILL: The hardest part: time pressure, model speed, hardware, or team coordination? What happened and
how did you handle it?]

**Results**

- Built and demoed at the AppBuildersPH Local AI Hackathon 2026. Did not place. [CHECK]
- [ASK WILL: What did the judges say?]
- The lead developer is still developing the game. [ASK WILL: Their name, and what's being added?]

**Takeaways**

[ASK WILL: 2-4 lessons, for example on keeping AI output away from game rules, or on leading a team under a
20-hour limit.]

**Cover image:** `cover.jpg`

**Images used:** `gameplay.jpg`, `promo.mp4`, `cover.jpg`.
**Suggested extra screenshots:** the household survey, the debrief screen with the checklist and badges, and
two runs with different survey answers side by side.

---

## 4. Gabay Aralin (`public/projects/gabay-aralin/`)

**Facts**

- Event: UX+AI Hackathon at Zone Offices, BGC, around Oct 26, 2026. A 3-4 hour sprint. [ASK WILL: Exact date?]
- Built with Shana Patio, using AI coding tools (Codex) provided by the organizers.
- Did not make the top contenders. Still being refined.
- Tech stack: on hold until Will confirms (see the report).
- [ASK WILL: What did you handle, and what did Shana handle?]

**Summary**

Gabay Aralin is a mobile-first tutoring helper for parents of preschool and elementary kids. A parent snaps a
photo of the homework, types it in, or picks a topic, and the app builds a short lesson, practice questions, a
printable worksheet and tips for guiding their child. Shana Patio and I built the first version in a 3-4 hour
sprint at a UX+AI hackathon.

**Overview**

[ASK WILL: Why parents as home tutors? Was it something you've seen at home or in your community, or a
challenge set by the hackathon?]

**The problem**

Many parents want to help with homework but aren't sure how to teach a topic, and the easy shortcut is giving
the child the answer. Gabay Aralin gives parents guiding questions for each homework item instead of answers.
[CHECK: inferred from the app's design] [ASK WILL: Is this the problem you were solving, in your words?]

**The process**

- **Step 1: Framing the problem in 3-4 hours**
  [ASK WILL: How did you and Shana pick the problem and cut the scope to fit 3-4 hours? What did you decide to
  leave out?]
  Image: none

- **Step 2: Designing for parents and kids together**
  Every topic becomes four parts: a step-by-step lesson written for the child with a note for grown-ups,
  practice checks after each step, an end-of-module worksheet with an answer key for parents, and tips on how
  to guide without doing the work. Wrong answers get an encouraging hint, then a second hint, and the answer
  only appears after the third try. [CHECK: from the current README; confirm what existed at the hackathon and
  what came after] [ASK WILL: Which UX decisions were yours?]
  Image: `poster.jpg`

- **Step 3: Keeping homework unsolved**
  The parts of the app that write lessons and worksheets never see the homework itself, only the subject,
  topic, grade and skills. A separate check solves every practice and worksheet question, drops any with a
  wrong or ambiguous answer key, and makes sure no question copies a homework item. [CHECK: from the current
  README; this may be refinement work done after the hackathon] [ASK WILL: How did using the organizers' AI
  tools change how you built it?]
  Image: `demo.mp4` (video; plays only when clicked)

**Struggles**

[ASK WILL: What was hardest in 3-4 hours: scoping, getting the AI output reliable, or presenting?]

**Results and what's next**

We didn't make the top contenders, and I'm still refining the app. [ASK WILL: What feedback did you get, and
what are you improving now? The README describes saved lessons per child, resumable progress, read-aloud and
answer-key checks; were these added after the hackathon?]

**Takeaways**

[ASK WILL: 2-4 lessons, for example on building fast with AI tools or scoping under a hard time limit.]

**Cover image:** `poster.jpg` [CHECK: or a screenshot of the lesson screen if you add one]

**Images used:** `poster.jpg`, `demo.mp4`.
**Suggested extra screenshots:** the lesson stepper with a practice check, the printable worksheet with the
answer key, and the parent tips screen.
