# Portfolio Project Context

**Coverage:** 2026-10-31 through 2026-11-02  
**Purpose:** Handoff summary of significant portfolio changes and current state.

## Project and Current Git State

- Stack: Next.js 16 App Router, React, TypeScript, Tailwind CSS.
- Content source: `src/data/portfolio.ts`.
- Current branch: `main`, at `c3be63d` (`Merge branch 'redesign'`), matching `origin/main` at last check.
- `redesign` points to `450004e` (`Update portfolio visuals and certifications`).
- No commit or push was made by the assistant.
- Current uncommitted changes at last check: `CLAUDE.md`, `docs/ROADMAP.md`, `progress.md`, modified `src/app/favicon.ico`, and new `src/app/icon.svg`, `src/app/icon.png`, and `src/app/apple-icon.png`.

## Project Navigation and Case Studies

- All four featured projects now have case studies: PixelDerm, SyncSpace, Signal No. 5, and Gabay Aralin.
- Project cards link directly to their case-study routes. A “View Project” arrow cue appears on hover and keyboard focus.
- Removed the former project overview panel and its “Read case study” button.
- Added a subtle card-exit/case-study-entry View Transition. The selected card fades and moves up slightly; the article fades and moves up slightly. Reduced-motion preference bypasses animation.
- Added “Back to Home Page” after the final case study.
- Case-study copy was updated from `public/Project Section - Answered Template.md`. An editable outline is in `docs/CASE-STUDY-EDITING-TEMPLATE.md`.

### Case-study cover images

- PixelDerm uses `public/projects/PixelDerm/pixelderm poster.png`; cover is capped at 500px wide and keeps its portrait aspect ratio.
- SyncSpace uses `public/projects/syncspace/syncspace sample logo.png`; its case-study cover is cropped to a 500 x 285 frame.
- Signal No. 5 uses `public/projects/signal-no-5/Signal no. 5 logo.png`; its case-study cover is cropped to a 500 x 285 frame. Existing gameplay screenshot and demo-video poster remain unchanged.
- Gabay Aralin uses `public/projects/gabay-aralin/gabay aralin logo.jpg`; its case-study cover is cropped to a 500 x 285 frame. Existing demo poster remains unchanged.
- Cover sizing is implemented in `src/components/sections/CaseStudyArticle.tsx` and `src/components/ui/CaseFigure.tsx`.

## Certifications

- Replaced the compact static list with a carousel using the same general turntable structure as Projects.
- The current carousel contains 10 uploaded certificates/memberships, ordered newest first, with title, issuer, date, and descriptive alt text.
- Image paths and records are in `src/data/portfolio.ts`; source images are in `public/`.
- Removed Gemini Certified Student and PMI Project Management Ready from this display when Will chose to use all 10 uploaded images instead.
- Certification cards have a subtle hover/focus lift. Clicking a certificate opens its full image in an accessible native dialog, with close button, Escape and backdrop dismissal, plus a short fade/scale entrance.
- Carousel supports previous/next buttons, keyboard controls, swiping, and a position counter.

## Visual and Interaction Updates

- Light background changed to cool off-white `#F2F4F7`; text remains black.
- Accent changed to royal blue: `#2563EB` light / `#93C5FD` dark.
- Dot grid opacity is 21% light / 17% dark. Six background outlines are 68-160px, low-opacity and slow-moving; they drift inward behind content. The layer remains fixed, clipped, click-through, and reduced-motion aware.
- Shared section gaps were tightened to 64px mobile / 96px desktop. Descriptive copy and metadata sizing were normalized; certification entries and subheadings were given more space/size.
- Hero heading now reads “What's Up? I'm Will :)”; the role and separate intro were removed. The tagline is “Love for Learning, pushed by purpose.” Bio appears before “Looking for.”
- Added a 640ms site entrance with a small rise-and-settle motion; disabled for reduced-motion users.
- Added a subtle hover/focus lift to project and certificate cards.
- Project/case-study transition uses a restrained selected-card exit and page entrance; latest timings are 260ms exit and 400ms entrance.
- Email copy controls now show “Click to Copy” on hover/focus. Clipboard content changes only after the user clicks; then “Copied” appears with a 700ms ease-out fade.
- Contact copy has a visible line break after `:)`.
- Removed the “Skip to content” link site-wide at Will's request. This removes the keyboard shortcut for bypassing the header.

## Resume and Favicon

- `public/resume 01.pdf` was copied to `public/resume.pdf`; the two files had matching SHA-256 hashes, and `http://localhost:3000/resume.pdf` returned HTTP 200 as a PDF.
- The latest uncommitted favicon work adds a flat white W on a rounded tile through `src/app/icon.svg`, `icon.png`, `apple-icon.png`, and the updated `favicon.ico`. Confirm the tile color and current design notes before committing.

## Verification

Repeated checks after implementation passed:

```text
npx tsc --noEmit
npm run lint
npm run build
```

The production build generated `/`, `/_not-found`, and case-study routes for all four projects. Additional checks confirmed project-card navigation to a case study, HTTP 200 for replacement image assets, and HTTP 200 for `/resume.pdf`. The rendered certification homepage contained all 10 certificate slides.

## Follow-up and Documentation Notes

- Review and commit the pending favicon and documentation changes on `main`; the assistant did not commit or push.
- The existing `CLAUDE.md`, `docs/HANDOFF.md`, and older portions of `progress.md` contain stale project descriptions (for example, old carousel panel behavior and the former purple accent). This file records the current state as of 2026-11-02 but does not replace those docs.
- No live deployment was performed or verified in this work period.
