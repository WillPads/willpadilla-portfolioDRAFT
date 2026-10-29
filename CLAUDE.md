@AGENTS.md

# Portfolio — Will Padilla

- Developer: Will Padilla — Software Engineer & CS Student at FEU Institute of Technology
- Tagline: "Driven by curiosity | Pushed by passion | Developing with purpose"

## Tech Stack

React, Next.js (App Router), Tailwind CSS, TypeScript, `lucide-react` for functional icons only (GitHub,
LinkedIn, external link, download, email). No decorative icons, no sparkle/magic icons. Lucide 1.x has no
brand logos, so GitHub/LinkedIn are small inline SVGs (decided 2026-10-30).

## Style

Light theme: background is soft off-white (`#FAF9F6`), all text solid black (opacity variants for
hierarchy, never a different hue/gray palette) — zero gradients anywhere. Three-way typography split:
`font-heading` (Space Grotesk) for h1/h2/h3, `font-body` (JetBrains Mono, the body default) for
paragraphs/descriptions/taglines, `font-button` (Space Mono) for nav, buttons, badges, tags, and contact
links. Surfaces are flat: thin `border-black/10` borders on `bg-background`, no persistent blur or translucency
(decided 2026-10-15). Hover effects (lift, shadow, per-project accent) stay — never via gradients. Project cards additionally lift on hover (`-translate-y-2`)
and pick up their per-project accent border (see below). No blurred glow blobs, glowing borders or
backdrop blur anywhere (decided 2026-10-30). Buttons/links get a hover where a
`bg-black/5` fill fades in plus `scale-105` (note: Tailwind v4's
`scale-*` sets the native CSS `scale` property, not `transform` — check `getComputedStyle(el).scale`
when debugging, not `.transform`). Sections wrap their content in `src/components/ui/Reveal.tsx`, a
client component that fades content in/out via `IntersectionObserver` as it crosses the (margin-shrunk)
viewport edges — respects `prefers-reduced-motion`.

## Priority Projects

Feature these in the Projects "Bento Box" grid, in this order: PixelDerm, SyncSpace. PixelDerm is
"Completed / Live"; SyncSpace is "In Development" until it is deployed (then flip its status and add `liveUrl`). Each project card gets a distinct hover accent (defined per-project in
`src/data/portfolio.ts`) that breaks the monochrome theme only on hover, as solid border/text colour
(never a glow): PixelDerm stays black/white, SyncSpace splits blue (top border)/purple (bottom border).

## Code Guidelines

- Clean, modular, functional React components.
- Standard Tailwind utility classes — avoid custom CSS unless Tailwind can't express it.
- Keep all content (profile, links, skills, projects, certifications) in `src/data/portfolio.ts`, not
  hardcoded in components.
- The build follows a 5-phase plan; see `docs/ROADMAP.md` for the phases, decisions and open items.

## Git

Never run `git commit` or `git push`. Will commits every phase manually, so Will is the only contributor
on GitHub. When work is ready, say so and give the commands plus a commit message with no AI attribution.
