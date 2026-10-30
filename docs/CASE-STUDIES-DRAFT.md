# Case Studies: Draft

Drafted by Winston on 2026-10-30 from `docs/CASE-STUDIES-TO-FILL.md` (the template stays as it is), Will's
confirmed facts, the project folders on this machine and the projects' public GitHub repos. SyncSpace is on
the site. The other three are drafts waiting for Will.

How to read this draft:

- Each project starts with a short **Questions for Will** box (at most 6). Most questions come with a draft
  answer, so a reply can be just "keep", "drop" or a quick edit.
- `[Q1]`, `[Q2]` and so on in the text point to the question that settles that sentence.
- `[CHECK]` marks something inferred, or read from a source that may not match the final version.
- The prose is in first person, as Will. Numbers appear only where a source states them.

**Readiness:** SyncSpace is done. **Signal No. 5 is closest** (its repo documents most of the story), then
Gabay Aralin, then PixelDerm (it needs the most from Will).

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
  Images: `upload.jpg` (session notes panel with an uploaded file), `quiz.jpg` (the quiz phase)

- **Step 4: Hardening the backend before launch**
  A backend audit on Oct 22, 2026 listed what had to change before launch, and every finding was fixed and
  covered by tests the same day. The server moved to Express 5 so async errors can't crash it, JWTs were
  replaced with server-side sessions that can be revoked, and sign-in, joins and uploads got rate limits.
  A row lock keeps the 10-person room cap from breaking when people join at the same time. The server now has
  234 tests, all running against a real Postgres database instead of mocks.
  Image: `dashboard.png` (the live dashboard)

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

**Images used (all real screenshots of the live app):** `room.jpg` (cover, 1102x714), `upload.jpg` and
`quiz.jpg` (step 3, 1102x714), `dashboard.png` (step 4, 1840x966), `welcome.jpg` (step 5).

**Optional extra screenshot:** two browsers side by side showing the same timer.

---

## 2. PixelDerm (`public/projects/`, files `pixelderm-1.jpg` to `pixelderm-4.jpg`)

> **Questions for Will (6)**
>
> 1. **Your part and the site role.** The site will show "Project Manager & Co-Developer". In one line, what
>    did you build, and what did Martonie and Shana own? Draft: "I managed the project and built ___;
>    Martonie led ___ and Shana led ___."
> 2. **Why this topic.** Draft: "UV damage builds up slowly, so it's hard to see changes in your own skin from
>    day to day. We wanted people to track their skin over time instead of guessing." Keep, edit or drop? Who
>    is the app for?
> 3. **Dermatologists.** In one line, what did they help with (for example: what to measure, how the advice is
>    worded, testing the results)? No draft here, because the sources don't say.
> 4. **The analysis.** OK to keep it general ("an image-processing pipeline measures spots, texture and
>    pigmentation")? Or one line on how it works.
> 5. **ISO/IEC 25010 result.** Who rated it, and the overall result in one line (for example "rated ___ by ___
>    IT experts and users")? Leave it out if you'd rather not share.
> 6. **One lesson from managing the project**, in a sentence or two, plus the hardest moment if you want one
>    in. No draft here: it has to be your experience. If you skip it, the page ends at Results.

**Facts**

- Context: Thesis. Dates: Sep 2025 to Jul 2026. Status: Completed.
- Role on the site: Project Manager & Co-Developer [Q1]. Will also did a small data role: cleaning datasets
  with Python.
- Team of three: Will, Martonie Ayaay and Shana Anikka Patio.
- Stack (as on the site): React Native, TypeScript, Android, Image Processing, ISO/IEC 25010.
- Repo/demo link: still paused.

**Summary**

PixelDerm is an Android app that tracks UV-related skin damage over time by comparing photos of the same area
of skin. It was our thesis project. I was the project manager and a co-developer, and I also cleaned datasets
in Python for the analysis.

**Overview**

UV damage builds up slowly, so it's hard to see changes in your own skin from day to day. We wanted people to
track their skin over time instead of guessing. [Q2] [CHECK: inferred from the app's purpose]

**The process**

- **Step 1: Working with dermatologists**
  We developed PixelDerm with clinical consultation and validation from dermatologists. [Q3]
  Image: none

- **Step 2: From photo to measurements**
  A user picks a body area to monitor, then takes a photo or chooses one from the gallery, with tips on
  lighting and keeping the camera steady. An image-processing pipeline measures visible spots, texture and
  pigmentation [Q4], and the app tells users with vitiligo that their results may be inaccurate.
  Image: `pixelderm-2.jpg` (capture screen)

- **Step 3: Tracking change over time**
  The app keeps each user's scan history and compares every new scan with their baseline for that body area,
  so the result shows how the skin has changed, not just a single score. The results screen gives a risk
  level, a skin score and a recommendation, and suggests seeing a dermatologist when it finds a high density
  of spots. [CHECK: read from the app's code and screens; the app sends photos to a backend server, so don't
  say more about where scans are stored]
  Image: `pixelderm-4.jpg`

- **Step 4: Evaluating with ISO/IEC 25010**
  We evaluated PixelDerm against the ISO/IEC 25010 software quality model. [Q5]
  Image: none

**Results**

PixelDerm was completed as our thesis and evaluated with ISO/IEC 25010. [Q5]

**Takeaways**

[Q6: Will's lesson from managing the project goes here, or the section is left out]

**Cover image:** `pixelderm-4.jpg` (the results screen shows what the app does at a glance)

**Images used:** `pixelderm-2.jpg`, `pixelderm-4.jpg`. `pixelderm-1.jpg` (home) and `pixelderm-3.jpg`
(processing) are spare.
**Optional extra screenshots:** the "vs Baseline" tab and the History screen.

---

## 3. Signal No. 5 (`public/projects/signal-no-5/`)

> **Questions for Will (5)**
>
> 1. **Your part.** The team's architecture doc splits the backend in two. Backend A owned the events, action
>    effects, badges, debrief findings and shared contracts; Backend B owned the prompts and prompt tests. Were
>    you A, B, or something else? As PM, what did you run (the plan, the checkpoints, the pitch)?
>    Draft: "I owned ___ and ran the team's plan and merge checkpoints."
> 2. **Audience.** The site says "kids aged 10-16", but the repo docs don't name an age. Keep "kids aged 10 to
>    16"?
> 3. **The problem.** Draft (from the team's pitch): "Most preparedness material tells you what to do but not
>    why it matters, and it gives every household the same advice." Keep, edit or drop? Anything from your own
>    experience of typhoons you'd add?
> 4. **Result.** It didn't place. Did the judges say anything worth quoting? And who is still developing it,
>    and what are they adding? (Skip either if there's nothing to say.)
> 5. **Takeaways.** Keep the 3 drafts below? Edit or drop any.

**Facts**

- Event: AppBuildersPH Local AI Hackathon 2026, theme "Localized A.I.". Built remotely on Oct 9 (about 20
  hours), demoed Oct 10 at SM Makati CyberZone. Did not place.
- Role: Lead Backend Engineer & Project Manager.
- Team of four: Will, Karl Stephen Mangahas, Martonie Ayaay and Adrian Louise Sevilla.
- Stack: TypeScript, Phaser 3, React, Electron (Windows app), Zod, Vitest, llama.cpp running
  Qwen3-4B-Instruct-2507.
- Repo: github.com/stfnnnnnnn/signal-no.5 (public; the visible commits are all dated Oct 9-10, 2026). The site
  link is on hold.

**Summary**

Signal No. 5 is an 8-bit typhoon preparedness RPG for Windows. Players prepare a Filipino home for a storm,
live through it and its aftermath, and get a score, badges and a personal debrief, with dialogue written by a
small language model running on the same laptop. My team of four built it in about 20 hours for the
AppBuildersPH Local AI Hackathon 2026, where I was lead backend engineer and project manager.

**Overview**

The hackathon's theme was local AI: the model had to run on the player's own machine, not in the cloud. Our
idea was that every household is different, so players set up their own household and play through a typhoon
shaped by it. We made it for kids aged 10 to 16. [Q2]

**The problem**

Most preparedness material tells you what to do but not why it matters, and it gives every household the same
advice. In Signal No. 5, players make the decisions themselves, see what happens, and get a checklist based on
their own household. [Q3]

**The process**

- **Step 1: Picking tools the team already knew**
  We built the game with Phaser 3, React and TypeScript, packaged as an Electron app for Windows. Godot scored
  well in our comparison, but nobody on the team knew it, and switching languages would have meant rewriting
  our shared contracts.
  Image: none

- **Step 2: A deterministic engine owns the rules**
  A simulation engine owns every rule, resource, consequence and score, so the same choices always give the
  same result. Players work through a 48-hour countdown with 19 preparation actions and 16 typhoon events,
  then evacuation and a three-day aftermath. [Q1: if this was your part, it becomes "I built..."]
  Image: `gameplay.jpg`

- **Step 3: Fitting a model on a 4 GB laptop GPU**
  We benchmarked Qwen3-1.7B and Qwen3-4B on a laptop with a 4 GB GTX 1650 Ti. Both returned valid JSON in all
  30 test runs. The 4B was slower (about 5 seconds per reply against 2.4) but wrote better dialogue, so it's the
  one the game ships with. We ran it with llama.cpp instead of Ollama: it's a smaller install and gives direct
  control over GPU memory.
  Image: none

- **Step 4: Keeping the AI out of the rules**
  The model only writes NPC dialogue and debrief wording. Every reply goes through constrained JSON decoding,
  validation and a grounding guard that rejects anything contradicting the game, such as the home's layout or
  the storm's timing. If a reply fails, the game uses fallback text written in advance, so it stays playable
  even without the model.
  Image: none

- **Step 5: Build day and demo day**
  We built the game remotely on Oct 9 and demoed it on Oct 10 at SM Makati CyberZone. [Q1: one line on how you
  kept four people in sync, if you want it]
  Image: `promo.mp4` (video; plays only when clicked)

**Struggles**

The 4B model wrote better dialogue than the 1.7B, but it also made things up. In our benchmark review it invented facts
the game must never state in 4 of 10 samples, and it scored 9 out of 20 on grounding against 19 for the smaller
model.

We kept the 4B for its writing and added a grounding guard: a reply that contradicts the game, like the wrong
home layout or storm timing, is rejected and replaced with fallback text.

**Results**

We built and demoed a working game in about 20 hours. It didn't place. [Q4]

What's still open: the Windows build isn't code-signed, the packaged app's fully offline run hasn't been
tested yet, and the lesson and checklist text is placeholder wording waiting for review. [CHECK: from the
repo's "Known limitations"; keep this paragraph or drop it]

**Takeaways** [Q5]

- Keep the AI out of the rules. Because the engine owns every score and consequence, a bad model reply can't
  break the game.
- Benchmark on the real hardware. The bigger model was only worth it once we'd measured it on the 4 GB laptop
  we'd demo on.
- Pick tools the team already knows. In a 20-hour build, a familiar stack beat a better-scoring one.

**Cover image:** `cover.jpg`

**Images used:** `gameplay.jpg`, `promo.mp4`, `cover.jpg`.
**Optional extra screenshots:** the household setup screen and the debrief with badges.

---

## 4. Gabay Aralin (`public/projects/gabay-aralin/`)

> **Questions for Will (5)**
>
> 1. **Who did what.** Draft: "Shana and I split the work: I ___, Shana ___." (The commits on Shana's repo
>    are co-authored with an AI coding tool; your copy is a single "post-hackathon push".)
> 2. **AI tools.** Your notes say the organizers gave you Codex, but the commits list Claude as co-author. OK
>    to say "AI coding tools the organizers provided" without naming one?
> 3. **Date.** The commits are all dated Oct 25, 2026. Use Oct 25?
> 4. **Why parents.** Draft: "Many parents want to help with homework but aren't sure how to teach a topic,
>    and the easy shortcut is giving the child the answer." Keep, edit or drop?
> 5. **What's next.** What are you improving now? Draft: "I'm now refining ___." And keep the 2 takeaway
>    drafts below?

**Facts**

- Event: UX+AI Hackathon at Zone Offices, BGC, Oct 25, 2026 [Q3]. A 3-4 hour sprint.
- Built with Shana Patio, using AI coding tools the organizers provided [Q2].
- Did not make the top contenders. Still being refined.
- Tech stack: on hold until Will confirms. The prose doesn't name it.

**Summary**

Gabay Aralin is a mobile-first tutoring helper for parents of preschool and elementary kids. A parent snaps a
photo of the homework, types it in, or picks a topic, and the app builds a short lesson, practice questions, a
printable worksheet and tips for guiding their child. Shana Patio and I built it in a 3-4 hour sprint at a
UX+AI hackathon.

**The problem**

Many parents want to help with homework but aren't sure how to teach a topic, and the easy shortcut is giving
the child the answer. Gabay Aralin gives parents guiding questions for each homework item instead. [Q4]

**The process**

- **Step 1: From homework guide to tutor center**
  We started with a homework guide for parents, written in Tagalog. Within the sprint we switched the app to
  English, added family profiles with each child's grade, and sorted saved lessons by child, grade and
  subject. Then we rebuilt it as a home tutor center around four parts: lessons, practice, worksheets and
  parent tips. [Q1]
  Image: none

- **Step 2: Designing for parents and kids together**
  Each lesson is 3 to 5 short steps written for the child, with a note for grown-ups and a quick check after
  every step. Wrong answers get an encouraging hint, then a second one, and the answer only appears after the
  third try. The worksheet prints with an answer key that explains each answer for the parent.
  Image: `poster.jpg`

- **Step 3: Keeping homework unsolved**
  The parts that write lessons and worksheets never see the homework itself, only the subject, topic, grade
  and skills. A separate check solves every practice and worksheet question, drops any with a wrong or
  ambiguous answer key, and makes sure no question copies a homework item.
  Image: `demo.mp4` (video; plays only when clicked)

**Results and what's next**

We didn't make the top contenders, and I'm still refining the app. [Q5]

**Takeaways** [Q5]

- Change direction early. We turned a homework guide into a full tutor center within the same day.
- Check the AI's output, not just its prompt. A second pass that solves every question catches wrong answer
  keys before a parent sees them.

**Cover image:** `poster.jpg`

**Images used:** `poster.jpg`, `demo.mp4`.
**Optional extra screenshots:** the lesson with a practice check, and the printable worksheet.
