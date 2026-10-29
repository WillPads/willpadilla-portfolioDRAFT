# Progress Log

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
