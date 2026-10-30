# Progress Log

## 2026-10-30 - Restyle (round 1 inspired by kirpenalber.com, round 2 after Will's answers)

Phase 2 is restyled before review. Details and open questions: [docs/PHASE-2-REVIEW.md](docs/PHASE-2-REVIEW.md).

- **Look.** Wide layout (round 2): one container up to 1280px and 90% of the viewport, `px-4` on phones, paragraphs
  capped at 65ch, small plain section labels, rounded chips, a pill primary button, asymmetric-corner project cards.
  Skills, More projects and Certifications are grids; the project panel and About use two columns; the hero goes
  two-column once `site.avatar` is set. Light and dark themes kept.
- **Fonts.** Two instead of three: Hanken Grotesk (sans) and JetBrains Mono (mono). Space Grotesk and Space Mono are gone.
- **Accent.** Ube purple (round 2): light `#702BA6`, dark `#C9A7F0`. Used for the pill, the active-nav underline,
  the resume link border and the status dots. `--accent` and `--accent-foreground` are the only accent tokens.
- **Background.** A dot grid (the only gradient function on the site, drawing dots) plus four slow drifting outlined
  shapes at low opacity, `transform` only, still under reduced motion.
- **Project accents removed.** No `accent` field, no blue/purple tokens. Every card has the same flat border; the hover
  lift is gone. With 2 projects the turntable keeps the pair centred side by side on wide screens.
- **Reveal.** Slide-up plus fade, staggered. The hero only slides (it never fades), so it is never blank.
- **New optional content.** `site.avatar` (hero photo, hidden while unset) and `experience` (new Experience
  section and nav link, hidden while empty). See [docs/EDITING-CONTENT.md](docs/EDITING-CONTENT.md).
- **Verified.** `tsc`, lint (0 errors, 0 warnings) and `next build` pass; headless Chrome at 375, 390, 414, 768 and
  1280px in both themes: no horizontal scroll, 44px tap targets, carousel by buttons, keys, swipe and side-card click,
  no media requests before "View project", no console warnings, no shadow or filter anywhere. Screenshots in `docs/review/` replaced.

## 2026-10-30 — Phase 2: components

Waiting on Will's review. Start with [docs/PHASE-2-REVIEW.md](docs/PHASE-2-REVIEW.md): what changed, how to
try it, the open questions and the commit commands. Plan and decisions: [docs/ROADMAP.md](docs/ROADMAP.md).
How to edit content: [docs/EDITING-CONTENT.md](docs/EDITING-CONTENT.md).

What was built:

- **Navbar and mobile menu.** Work / About / Skills / Contact, a Resume button (opens `/resume.pdf` in a new tab)
  and a sun/moon theme toggle. Below 768px the links move into a menu button. About hides while `site.bio` is unset.
- **Hero.** Headline is "Will Padilla". A "Looking for: ..." line shows only when `site.lookingFor` is set.
  Resume, View projects, Email, GitHub and LinkedIn buttons. The hero no longer fades in, so it never starts blank.
- **Turntable project carousel** replaces the bento grid. The active card is centred, neighbours are dimmed and
  turned. Arrow buttons, swipe, arrow keys and a click on a side card all turn it. "View project" opens a detail
  panel below; screenshots and demo video load only then. Escape closes it.
- **Content split** into `featuredProjects` and `moreProjects`, with one status scale (Live, Completed,
  In Development). PixelDerm is now Completed. Projects without links show "Links coming soon".
  The PixelDerm link was removed (404) and the repo/demo is paused (`TODO(Will)` in `portfolio.ts`).
- **Skills grid** by category, a **certifications** block (hidden while empty), Contact with LinkedIn and Resume,
  and a footer with "Back to top".
- **Light and dark themes.** Follows the system by default, remembers the toggle, no flash of the wrong theme.
  Still flat: no gradients, blur, glow or shadows.
- **Accessibility.** Skip link, visible focus styles, 44px tap targets, `prefers-reduced-motion` respected.
- Screenshot files renamed to lowercase (`pixelderm-1.jpg`, `pixelderm-logo.png`).
- Removed `Introduction`, `DeviceFrame` and `ProjectCard` (replaced by the new components).

Verified:

- `npx tsc --noEmit` passes, `npm run lint` is 0 errors and 0 warnings, `next build` is fully static.
- Headless Chrome at 375, 390, 414, 768 and 1280px, in both themes: no horizontal scroll, 44px tap targets,
  carousel works by keyboard and touch, no screenshots or video load before "View project", no hydration
  warnings, no theme flash, WCAG AA contrast.
- Screenshots are in `docs/review/` (not part of the commit; delete after review).

Not checked yet: a real phone, Safari and Firefox, a screen reader, and the filled-in content paths
(`bio`, `lookingFor`, `moreProjects`, certifications). They are type-checked but have not been seen populated.

Next:

1. Will reviews, answers the open questions in the review guide, and commits.
2. Phase 3 (content): resume PDF, `lookingFor`, bio, details for PixelDerm and SyncSpace, the other 2
   live/demoable projects, a certification. The full list is in the ROADMAP under "What Will needs to send".
3. Will decides on the paused PixelDerm repo/demo link once it is sorted out with PixelDerm's lead dev.

## 2026-10-30 — Phase 1: setup & architecture

Plan, decisions and open items now live in [docs/ROADMAP.md](docs/ROADMAP.md). How to edit content:
[docs/EDITING-CONTENT.md](docs/EDITING-CONTENT.md).

What changed:

- **One content file.** Merged `src/data/site.ts` and `src/data/projects.ts` into
  [src/data/portfolio.ts](src/data/portfolio.ts) and deleted the old two. Every component now imports from it.
- **Skills are grouped** into Languages / Frontend / Backend / Databases & Tools. Express, Prisma,
  WebSockets and Android were added from the PixelDerm and SyncSpace stacks. About still shows them as one
  tag list until the Phase 2 skills grid.
- **Certifications** have a type and an empty list, ready for Will's certification.
- **Removed "AI-template" effects:** the blurred glow blobs on project cards and every `hover:backdrop-blur`.
  Hover accents are now solid border and text colour only. Removed the unused `green` accent.
- **Installed `lucide-react`** (v1.64) for functional icons. It has no GitHub/LinkedIn logos, so those will
  be inline SVGs in Phase 2.
- **CLAUDE.md** updated to match (icons allowed, no blur/glow, single content file, link to the roadmap).

Checked: `npx tsc --noEmit` passes, `npm run lint` has 0 errors (1 warning from the `.remember/` tool file),
`next build` passes. Not yet viewed in a browser; nothing visible changed except hover effects.

## 2026-08-30 — Trim Projects to PixelDerm & SyncSpace

- Removed "SkillPort" and "EcoLog" entries from [src/data/projects.ts](src/data/projects.ts), leaving
  only "PixelDerm" and "SyncSpace".
- No changes needed to [src/components/sections/ProjectsSection.tsx](src/components/sections/ProjectsSection.tsx)
  or [src/components/ui/ProjectCard.tsx](src/components/ui/ProjectCard.tsx) — the bento grid
  (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`) renders two cards cleanly since PixelDerm keeps its
  `span: "wide"` (`lg:col-span-2`) and SyncSpace stays `span: "normal"` (`lg:col-span-1`), filling one
  row at the `lg` breakpoint with no leftover gaps.
- Updated the "Priority Projects" section in [CLAUDE.md](CLAUDE.md) to drop references to SkillPort and
  EcoLog so project docs match the live data.
- Verified with `npx tsc --noEmit` — no type errors, no broken imports.

## 2026-10-15 — Handoff session (changes NOT yet type-checked or viewed in a browser)

Context: 2-week plan (see handoff-portfolio-syncspace.md in the Claude Project "Will's Projects"). Goal: publish portfolio, share on LinkedIn.
Target roles: Full-stack / Software Engineer.

Done:
- Fixed `site.name` missing (Header rendered undefined); fixed "strivestoward" typo; fixed PixelDerm logo path (.jpg -> .png).
- SyncSpace set to `in-development`, removed `liveUrl: "#"`, real stack/description. Flip to completed + add `liveUrl` once deployed.
- Added `role` to projects: PixelDerm = "Project Manager & Developer" (primary PM, secondary dev); SyncSpace = "Full-stack Developer" (assumed, confirm).
- Decision: flat surfaces + thin borders, no persistent glassmorphism (CLAUDE.md updated). Hover lift/accents kept.
- Nav now Work / About / Skills / Contact, compact on mobile (brand shows "WP" under sm). Skills anchor is on the skills tag list in About.
- Resume is the primary hero CTA -> `/resume.pdf` (file does not exist yet). "Contact Me" is a mailto.

Next:
1. Run `npx tsc --noEmit`, `npm run dev`; check 375/390/414px nav.
2. Add `public/resume.pdf`; confirm PixelDerm repo URL (`github.com/WillPads/pixelderm` is unverified).
3. Write real About bio (currently placeholder) from Will's notes.
4. Get one teammate testimonial (permission for name/photo).
5. Optional: `local_time: PH` readout, typed hero reveal (respect reduced motion).
6. Deploy to Vercel; later update SyncSpace card with live link + screenshots.
7. Run contrast + responsive checks before posting.

## 2026-10-30, Phase 2 round 3 (content and carousel)
- Photo added as a small round avatar above the hero headline.
- Experience (3 organisations) and 8 certifications filled in from Will's resume and LinkedIn.
- SyncSpace set Live (https://sync-space-taupe.vercel.app), stack corrected to PostgreSQL.
- Signal No. 5 added to the turntable; Gabay Aralin added to More projects (stack still to come).
- Turntable loops with 3 or more projects; drifting shapes kept to the side margins.

## 2026-10-30, case study pages
- Added optional `caseStudy` on featured projects and the route `/projects/<slug>` (static, 404 for anything without one). No project has one yet, so no page is built.
- Header links point to `/#section` on sub-pages; the detail panel shows "Read case study" when a project has one.

## 2026-10-30, Phase 2 polish and QA
- Turntable: from 1024px up the cards are narrower (33% of the track, step 100%) so both neighbours show their full title and status. They sit 19 to 29px inside the track on both sides at 1024, 1280 and 1440px.
- Nav scroll-spy now follows the section at 40% of the screen height; the last section is active at the page bottom and nothing is active at the top.
- Gabay Aralin demo video got `poster.jpg` (frame at 6.8 seconds). Signal No. 5's `cover.jpg` poster was kept.
- QA across 375 to 1440px in both themes: no horizontal scroll, tap targets, focus, carousel wraps, all 4 panels, contrast, no shadows or filters, reduced motion. Review screenshots refreshed.
