# Portfolio Roadmap

The plan for turning this site into a recruiter-ready portfolio for internships and entry-level
software engineering roles. Each phase is finished and approved by Will before the next one starts.

Last updated: 2026-10-30 (Phase 2 polish and Will's layout notes done)

How we work: Claude and the agents never commit. At the end of each phase Will gets the commands and a
commit message, and commits it manually.

---

## Where we are

| Phase | What it covers | Status |
| --- | --- | --- |
| 1. Setup & architecture | Audit the repo, add icons, one central content file, remove "AI-looking" effects | **Done, committed** |
| 2. Components | Hero, Navbar + mobile menu, turntable project carousel, skills grid, certifications, contact, light and dark themes | **Built and polished (2026-10-30), waiting for Will's review and commit** |
| 3. Content | Bio, target role, resume, new projects, certification | Waiting on Will's content |
| 4. Polish & SEO | Phone/tablet/desktop checks, link previews (LinkedIn), favicon, image loading | Not started |
| 5. Deploy | Push to GitHub, deploy to Vercel, check the live site | Not started |

Phase 2 concept (layout, wireframes, data changes and open questions, written before any code):
[PHASE-2-CONCEPT.md](PHASE-2-CONCEPT.md)

Phase 2 review guide (what changed, how to try it, open questions, how to commit):
[PHASE-2-REVIEW.md](PHASE-2-REVIEW.md)

---

## Decisions

The reasoning behind how the site looks and is built. Newest first.

| Date | Decision | Why |
| --- | --- | --- |
| 2026-10-30 | Per-project case study pages at `/projects/<slug>`, shown only when `caseStudy` is filled in on a featured project | Recruiters who like a project want the story behind it: problem, process, struggles, outcome. The page needs real write-ups, so nothing is generated and no placeholder text is shown. Projects without one are unchanged and their address returns a 404. Structure is inspired by kirpenalber.com; layout, text and code are Will's own. |
| 2026-10-30 | Turntable loops with 3+ featured projects (prev on left, next on right); 2 projects stay a side-by-side pair | With 3 projects the first card had an empty left side and looked lopsided. Looping always puts a neighbour on both sides. |
| 2026-10-30 | Will's own bio ("Driven by a passion to learn and understand, I'm a lifelong student at heart...") and a broader "Looking for" line: a 520-hour internship or entry-level role in any position that fits, "eagerly available and looking out for opportunities", no "hybrid preferred". Location is Sampaloc, Manila, footer only. Skills add PHP, HTML, Neon, Render and Figma | Will wrote and chose these after the preview. |
| 2026-10-30 | Site text approved by Will: the shorter bio with "Driven by curiosity and pushed by passion, I develop with purpose"; "Looking for: Software engineering or computing internship, 520 hours, available now, hybrid preferred"; Contact text with a "Made it all the way down here? Let's talk." hook (now `site.contactNote` in portfolio.ts). PixelDerm is described as "developed with dermatologists", not "validated" | Winston drafted the text and Will picked and adjusted it. "Paid" stays out of public copy. "Developed with" is the safer claim. |
| 2026-10-30 | Certifications show no "Verify credential" links at all (the `credentialUrl` field is removed); short credential IDs stay | Will's call: linking every certificate is a hassle, and several are older. |
| 2026-10-30 | Bio states BS Computer Science, specializing in software engineering (confirmed by Will). "Looking for" is a plain "A software engineering internship" until Will gives real hours and a start date (the 520-hour / December 7 text was a friend's sample letter, not Will's) | Only Will's own facts go on the site. |
| 2026-10-30 | All 4 projects are in the turntable (PixelDerm, SyncSpace, Signal No. 5, Gabay Aralin); More projects is empty for now. Media lives in `public/projects/<slug>/`; event and team photos are kept in `public/featured/` for the planned Featured section. SyncSpace links to its public repo. Gabay Aralin is In Development (still being refined after the hackathon) | Gabay Aralin now has a demo video, so it earns a turntable card. Hackathon photos are not app screens, so they wait for Featured. |
| 2026-10-30 | The photo is a small round avatar (64px on phones, 72px from 640px) above the headline, not a large picture beside it | Will found the large photo too big and wanted it subtle, like the reference site but slightly bigger. |
| 2026-10-30 | The resume PDF in `public/resume.pdf` keeps Will's phone number | Will's choice: it makes it easier for recruiters to reach Will. The risk (the number is public on the site and on GitHub) was explained. |
| 2026-11-02 | Favicon is a flat white "W" (two V strokes, mitred points) on an ube purple `#702BA6` rounded tile: `src/app/icon.svg`, `icon.png` (32px), `favicon.ico` (16/32/48) and `apple-icon.png` (180px, full-bleed square) | Will asked for a simple tab logo. Three options were compared at 16, 32 and 180px on light and dark tab bars; the plain W on a solid tile stayed the clearest at 16px and works on both because the tile carries its own colour. A WP monogram turned to mush at 16px, and a bare purple W vanished on dark tabs. Preview: `docs/review/favicon-preview.png`. |
| 2026-10-30 | Experience (3 student organisations) and 8 certifications filled in from Will's resume and LinkedIn. Org names link to their LinkedIn pages. Long LinkedIn Learning hash IDs are left out; short IDs are shown; SAP has a "Verify credential" link | Real data from Will's own profiles. A long hash with no link does not help a recruiter. |
| 2026-10-30 | The drifting shapes stay in the side margins outside the content (hidden below 1024px, where there is no margin) and drift up and down only | Will agreed they should never pass behind text. |
| 2026-10-30 | Accent is ube purple: light `#702BA6`, dark `#C9A7F0` (`--accent` and `--accent-foreground` only). Replaces the round 1 vermilion | Will likes ube. A deep purple in light and a lavender in dark keep the pill text at 7.7:1 and 9.1:1 and the accent lines above 3:1. It is purple, not indigo or royal blue, so it stays apart from Kir's blue. |
| 2026-10-30 | The hero headline stays the tagline ("To develop with purpose, pushed by passion"). "Projects", "Resume" and GitHub/LinkedIn out of the hero stay as they are | Will approved all of these in round 2. |
| 2026-10-30 | Wide layout: one container of up to 1280px, 90% of the viewport from 768px, `px-4` on phones, shared by header, sections and footer. Paragraphs stop at 65ch. Skills, More projects and Certifications are grids, the project panel and About use two columns, the hero shows a small round photo above the headline once `site.avatar` is set. With 2 featured projects the turntable keeps the pair centred side by side | Will felt the 564px column was too close to kirpenalber.com. The width makes it a different layout, while the 65ch cap keeps reading comfortable. |
| 2026-10-30 | Background is a dot grid (radial-gradient, the one allowed gradient exception) with four slow drifting outlined shapes (90 to 120 seconds per loop, 15% opacity, `transform` only). Replaces the line grid. Fully still under reduced motion | Will asked for a dotted-journal feel. Shapes are flat strokes, so there is still no blur, glow, shadow or colour gradient. |
| 2026-10-30 | Section order is Hero, Projects, Skills (with Certifications), Experience, About, Contact; the nav array follows it | Will's notes: projects and skills are what a recruiter wants first. Sections that are empty still hide with their nav link; the scroll-spy needs the nav order to match the page order. |
| 2026-10-30 | The hero now carries the name (the h1) and the role, directly above the tagline headline, with the round avatar on the right (176px from 768px, 224px from 1024px; 64px beside the name on phones). The header drops the name and role block and keeps a small mono wordmark, the nav, the theme toggle and the mobile menu (56px tall). Location shows only in the footer; About is just the bio | Will's notes. The wordmark keeps the bar from being empty on the left and is the way home from case study pages. The tagline is a styled paragraph, so the page has one h1 (the name) and one h2 per section. Supersedes the "small round photo above the headline" row. |
| 2026-10-30 | Section titles are real headlines: text-3xl, md:text-4xl, medium weight, tight tracking, full text colour; sub-labels (Certifications, More projects) are text-xl, md:text-2xl. Section gaps grow to match | Will's notes: the small grey labels were too quiet. Supersedes "small plain section labels". |
| 2026-10-30 | Background shapes are about 30% bigger (29 to 42px) and, in light mode only, shapes are 20% (was 15%) and dots 17% (was 13%); dark mode is unchanged. The square turns 30 degrees instead of 60 so the bigger shapes still clear the 51px margin at 1024px | Will's notes: the light background was hard to see. |
| 2026-10-30 | "View project" uses the browser View Transitions API: the card title glides into the panel heading, the panel rises in (transform and opacity, 380ms), then the page glides so the panel sits near the top; focus goes to the panel heading. Instant under reduced motion, and browsers without the API just open the panel. No Next.js flag or new package is needed. React's experimental `<ViewTransition>` was not used | Will asked for a fluid hand-off from card to panel. The panel is mounted on click, which keeps media lazy, and the names are set on one element at a time so they are never duplicated. |
| 2026-10-30 | Per-project accents are removed (the `accent` field, blue/purple tokens, the SyncSpace blue title and the hover lift). Every project card has the same flat 1px border that turns solid text colour when active, hovered or focused | Will saw a glow on project hover, most likely the blue top meeting the purple bottom border on rounded corners. One neutral border for all projects cannot read as a gradient. Supersedes the "hover accents" row below. |
| 2026-10-30 | (Round 1, superseded in parts by the five rows above it) Restyle: inspired by (not a copy of) kirpenalber.com. One narrow centred column, small section labels, compact rows, pill button. Two fonts (Hanken Grotesk + JetBrains Mono) replace three. One vermilion accent (light `#B93C10`, dark `#FF8A5C`). A faint fixed line grid is the one allowed gradient exception, drawing 1px lines only. Reveal now also slides up. Turntable stays in the column. Nav label "Work" is now "Projects" | Will wants the feel without a clone that peers could recognise. No pixel font, royal blue, navy background or copied assets. Still no blur, glow, shadows or colour gradients. |
| 2026-10-30 | (Superseded the same day by the approved Contact text above) The Contact copy ("Have a project in mind...") stays as it is until Phase 3 | Phase 3 is the content phase. Rewriting copy now would be guessing. |
| 2026-10-30 | The email shown on the site is `wgabriel.padilla@gmail.com`. Will confirmed it ("wgbabriel" in Will's message was a typo) | It is the address Will wants recruiters to use. This is settled, not an open question. |
| 2026-10-30 | GitHub stays `https://github.com/WillPads/WPadilla`. LinkedIn stays `https://www.linkedin.com/in/will-padilla/` and shows in the hero, Contact and the footer | Will confirmed both are correct. Recruiters look for LinkedIn first, so it is in three places. |
| 2026-10-30 | The PixelDerm link is removed. Projects with no links show "Links coming soon". The PixelDerm repo/demo is **paused** until Will says otherwise. A `TODO(Will)` comment in `portfolio.ts` marks the spot | The old GitHub URL returned 404. Will is sorting out the public repo/demo with PixelDerm's lead dev. A broken link looks worse than an honest "coming soon". |
| 2026-10-30 | Projects show as a "turntable" carousel, not the bento grid. The active card is centred and its neighbours are dimmed and turned. Screenshots and demos load only after a visitor clicks "View project", which opens a detail panel below | A turntable shows one project at a time, so it works with 2 projects or 8. Loading media only on click keeps the first page load light. |
| 2026-10-30 | Light and dark themes. The default follows the system setting. A sun/moon toggle in the navbar and the mobile menu remembers the choice. No flash of the wrong theme. Both pass WCAG AA contrast. Still no gradients, blur, glow or shadows | Visitors expect dark mode. A tiny script sets the theme before the page paints, so there is no flash. The flat style stays in both themes. |
| 2026-10-30 | Resume opens the PDF in a new tab (`/resume.pdf`). The file is still missing, which is expected | Recruiters want the PDF in one click and should keep the portfolio open. The PDF itself arrives in Phase 3. |
| 2026-10-30 | One status scale everywhere: **Live** (deployed with a public URL), **Completed** (finished, not deployed), **In Development**. The badge looks the same everywhere. PixelDerm is now Completed | Before, the card and the list could say different things. PixelDerm has no public URL, so "Live" would be wrong. |
| 2026-10-30 | Projects use two arrays in `portfolio.ts`: `featuredProjects` (the turntable) and `moreProjects` (a compact list). Every project that is not featured goes in More projects, so nothing is left off the page. Will has 4 projects that are live, deployed or demoable; only PixelDerm and SyncSpace have details so far | Recruiters skim. A few detailed cards show depth, a list shows range. This refines the earlier "3-4 cards" decision below. |
| 2026-10-30 | The hero headline is "Will Padilla". A "Looking for: ..." line shows only when the optional `site.lookingFor` is set (unset for now) | A recruiter learns the name in one glance. The target role is Will's call, so the line stays hidden until it is set. |
| 2026-10-30 | Feature 3-4 projects as cards; the rest go in a short "More projects" list | Recruiters skim. A few detailed cards show depth, the list shows range. Final picks once the new projects are in. |
| 2026-10-30 | All content lives in one file: `src/data/portfolio.ts` | One place to edit everything. See [EDITING-CONTENT.md](EDITING-CONTENT.md). |
| 2026-10-30 | No blur, no glow blobs. Hover borders are solid colour only (round 2 removed the per-project accents) | Blurred glows and frosted glass are common tells of AI-generated templates. |
| 2026-10-30 | Use Lucide icons, but only functional ones (GitHub, LinkedIn, external link, download, email) | Recruiters find links faster with familiar icons. No decorative or sparkle icons. |
| 2026-10-30 | Keep the existing custom site instead of switching to a template | It already builds and passes checks, and a hand-built site is itself a signal for an engineering role. |
| 2026-10-15 | Flat surfaces, thin borders, black text on off-white, no gradients | A clean, developer-tool look that reads as human-made. |

---

## What Will needs to send

Case study write-ups: fill in [CASE-STUDIES-TO-FILL.md](CASE-STUDIES-TO-FILL.md), one project at a time.

Phase 3 can't be finished without these. Nothing is filled in with placeholder text.
The field names below are the ones in `src/data/portfolio.ts`; see [EDITING-CONTENT.md](EDITING-CONTENT.md)
for where each one goes.

- [x] ~~Avatar photo~~ Added 2026-10-30 (`public/avatar.jpg`, 2048px square). Was: An avatar photo: a square image (at least 192x192px) saved as `public/avatar.jpg`, then set `site.avatar: "/avatar.jpg"`. Until it is set the hero stays one column with no image
- [x] ~~Experience entries~~ Done 2026-10-30 (3 organisations, from LinkedIn). Add internships or other roles later. Was: Experience entries for `experience` in `portfolio.ts`: internships, org roles, freelance work, the thesis team lead role. Each needs org, role, start, end (or "Present"), and optionally a link and a square logo in `public/`. Until there is one, the Experience section and its nav link stay hidden
- [x] ~~Resume PDF~~ Added 2026-10-30. Was: Resume PDF (it goes in `public/resume.pdf`; the Resume button currently leads to a missing page)
- [ ] (Drafted 2026-10-30, needs Will's OK) `lookingFor`: one line for the hero, e.g. "Software Engineering Intern". Until it is set, the hero line stays hidden
- [ ] (Drafted 2026-10-30, needs Will's OK) The bio (`site.bio`): 2-3 sentences. Until it is set, the About section and its nav link stay hidden
- [ ] PixelDerm and SyncSpace: the year, the context (e.g. thesis or course project) and one result for each
- [ ] **On hold until the Phase 4 polish (remind Will then):** Gabay Aralin tech stack; repo links for Gabay Aralin and Signal No. 5 once public; a poster image for the Gabay Aralin video. Was: Signal No. 5 and Gabay Aralin (on the resume, not on the site yet). Signal No. 5: confirm Will's role (resume and LinkedIn differ) and featured or listed. Gabay Aralin: tech stack, status, context. Both: links and screenshots
- [ ] The other 2 live/demoable projects, and any other projects Will wants listed: name, one-line pitch, role,
      tech stack, year, one result (users, accuracy, grade, award), links (repo, live site), screenshots or a demo
      video, and whether each should be **featured** (turntable) or **listed** (More projects)
- [ ] The SyncSpace repo link, if the repo is public
- [x] ~~Certifications~~ 8 added 2026-10-30 from LinkedIn. Adding Credly links on LinkedIn would allow more "Verify" buttons. Was: The certification: name, issuer, month/year, verification link or credential ID
- [ ] Optional: "Core CS concepts" to list under Skills (e.g. data structures, OOP, networking)
- [ ] Case study write-ups for whichever projects Will wants a page for: the problem, the process steps, struggles, the outcome, takeaways, a cover image and any step images (see "Case study pages" in [EDITING-CONTENT.md](EDITING-CONTENT.md)). Until a project has one, it has no page
- [ ] **Paused (Will is sorting it out with PixelDerm's lead dev):** the PixelDerm repo or demo link. Nothing to do
      until Will says otherwise

---

## Planned later (Will's ideas, not scheduled yet)

- **A "Featured" section** (name not final; options: Highlights, Moments, Community, Beyond Code). A slide-able
  row of posts about past, current and upcoming events: hackathons, talks, organisation events, teams Will has
  worked with and CS opportunities. Each post would have an image, title, date, event or organisation name, a
  short caption and a link to the original post (LinkedIn, Facebook, event page). Requested 2026-10-30, to be
  built after Phase 2 is committed. Content needed from Will: the posts to include (images, dates, links).

---

## Known issues, and the phase that fixes them

From the senior-engineer and hiring-manager review on 2026-10-29.

| Issue | Phase | Status |
| --- | --- | --- |
| Hero says "What's up, Will?" and never states your role or what you're looking for | 2 + 3 | Headline and role fixed 2026-10-30. The "Looking for" line waits on `site.lookingFor` (Phase 3) |
| The fade-in effect hides the hero until JavaScript loads | 2 | Fixed 2026-10-30 |
| SyncSpace shows empty "Screenshot" boxes and hides its links while in development | 2 | Fixed 2026-10-30 (no empty boxes; "Links coming soon" shows instead) |
| Project cards don't show results or impact | 3 | Open. The `impact` field exists and shows once filled in |
| Skills are one flat list instead of categories | 2 | Fixed 2026-10-30 |
| Header links are about 40px tall (44px is the minimum comfortable tap size) | 2 | Fixed 2026-10-30 |
| No keyboard focus styles and no "skip to content" link | 2 | Fixed 2026-10-30 |
| Contact email button may be too wide on phones | 2 | Fixed 2026-10-30 (no horizontal scroll at 375, 390 and 414px) |
| No link preview when shared on LinkedIn; default Next.js favicon; no sitemap | 4 | Partly fixed 2026-11-02: favicon replaced with Will's W mark. Link preview and sitemap still open |
| PixelDerm screenshots are small and some file names have spaces or uppercase extensions | 4 | Partly fixed 2026-10-30: the files are renamed in Phase 2 (see the commit commands in [PHASE-2-REVIEW.md](PHASE-2-REVIEW.md)). Image size and loading are still Phase 4 |
| Turntable neighbour card on the left lost its title at 1024 to 1440px (the left card's text starts at its clipped outer edge) | 2 | Fixed 2026-10-30 (Phase 2 polish): narrower cards from 1024px up, both neighbours fully inside the track |
| Nav underline stayed on "Experience" while Projects filled the screen | 2 | Fixed 2026-10-30 (Phase 2 polish): the active link follows the section at 40% of the screen height |
| Gabay Aralin demo video had no poster frame | 2 | Fixed 2026-10-30: `poster.jpg` taken from the video at 6.8 seconds |
| The two demo videos are large (Signal No. 5 38 MB, Gabay Aralin 20 MB). They only download when a visitor presses play, but should be compressed (about 5 MB each) or moved to YouTube | 4 | Open |
| README is an unfilled generic template: placeholder text, a stack this site doesn't use, an invented "78%" metric, emoji. Recruiters may open it, so replace it with a real one | 5 (or sooner) | Open. Will is handling it |
| GitHub link goes to a repo instead of your profile page | 3 | Closed 2026-10-30: Will confirmed `https://github.com/WillPads/WPadilla` is the right link |
