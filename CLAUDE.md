@AGENTS.md

# Portfolio — Will Padilla

- Developer: Will Padilla — Software Engineer & CS Student at FEU Institute of Technology
- Tagline: "Driven by curiosity | Pushed by passion | Developing with purpose"

## Tech Stack

React, Next.js (App Router), Tailwind CSS, TypeScript, next/font (Hanken Grotesk + JetBrains Mono),
`lucide-react` for functional icons only (GitHub,
LinkedIn, external link, download, email). No decorative icons, no sparkle/magic icons. Lucide 1.x has no
brand logos, so GitHub/LinkedIn are small inline SVGs (decided 2026-10-30).

## Style

Inspired by (not a copy of) kirpenalber.com (decided 2026-10-30): no pixel font, no royal/indigo blue, no navy
background, and no text, image, icon, logo or code from that site.

Two themes, light and dark. The default follows the system setting; a sun/moon toggle in the navbar and mobile
menu remembers the choice (`data-theme` on `<html>`, set by an inline head script so there is no flash). Light:
background `#FAF9F6`, text black. Dark: background `#131312`, text `#FAF9F6`. All text uses the foreground
colour with opacity variants for hierarchy (muted text is `text-foreground/65`, never lower: /50 fails AA in
light), never a different hue/gray palette, and both themes must pass WCAG AA. Use the theme tokens
(`text-foreground`, `bg-background`, `border-foreground/10`), never hard-coded black/white classes.

One accent, ube purple: `--accent` is `#702BA6` (light) / `#C9A7F0` (dark), with `--accent-foreground`
(`#FAF9F6` / `#131312`) for text on a solid accent fill. Use it only for the primary pill button, the active-nav
underline, the resume link's bottom border and 10% tint, and the status dots.

Layout is wide: header, sections and footer share `containerClass` in `src/components/ui/styles.ts`
(`max-w-[1280px]`, 90% of the viewport from 768px, `px-4` full width on phones). Long paragraphs stop at 65ch
(`proseClass`). Use the width: grids for skills, certifications and more projects, two columns for the project
panel and About. When `site.avatar` is set, the hero shows a small round photo (64px, 72px from `sm`) above
the headline. Section labels are small and plain.

Background (`src/components/ui/Background.tsx`, `.page-dots` and `.drift` in `globals.css`): a fixed,
click-through dot grid plus four slow outlined shapes that drift up and down in the side margins only, never
behind text, hidden below `lg`. The dots use a radial-gradient purely to draw dots: the only gradient allowed.
Shapes are flat 1.5px strokes at low opacity, moved with `transform` only, still under `prefers-reduced-motion`.

Otherwise zero gradients, blur, glow, noise or shadows (box-shadow, drop-shadow, text-shadow). Surfaces are flat:
thin `border-foreground/10` borders on `bg-background`. Two fonts: `font-sans` (Hanken Grotesk) for headings
and body text, `font-mono` (JetBrains Mono) for nav, dates, tags, labels and buttons. Buttons/links get a flat
hover: a `bg-foreground/5` fill plus `scale-105` (note: Tailwind v4's `scale-*` sets the native CSS `scale`
property, not `transform` — check `getComputedStyle(el).scale` when debugging, not `.transform`). Every tap
target is at least 44px, focus is always visible (`focus-visible:`), and there is a skip link to `#main`.

Sections wrap their content in `src/components/ui/Reveal.tsx`: content is visible by default (server HTML,
no JS, reduced motion) and blocks below the fold slide up a few pixels and fade in once, staggered with the
`delay` prop, never back out. The hero is never wrapped in Reveal; it only slides up (translate only, opacity
stays 1) via `.rise`. The hero headline is `site.tagline`.

Optional content hides itself when unset: `site.avatar` (path under `public/`, shown in the hero; no placeholder
or initials), `experience`, `site.bio` (About) and `certifications`.

## Projects

Projects live in `src/data/portfolio.ts` as two arrays. `featuredProjects` feeds the turntable carousel, in
order: PixelDerm, SyncSpace, Signal No. 5, Gabay Aralin. `moreProjects` is a compact list under it. Every project goes in
exactly one of them, so nothing is left off the page.

The turntable centres the active project and shows its neighbours smaller and dimmed (opacity and scale, never
blur). With three or more projects the turntable loops (previous on the left, next on the right; wrapping animates
one step); with exactly two, screens from 768px keep the pair side by side, no loop. Visitors turn it with
buttons, swipe, arrow keys or by clicking a side card. Cards show text only; screenshots and demo videos load only
after a visitor clicks "View project", which opens a detail panel below. Demo videos never preload or autoplay.
Reduced motion makes turning instant.

One status scale everywhere: `live` (deployed with a public URL), `completed` (finished, not deployed),
`in-development`. PixelDerm and Signal No. 5 are Completed; Gabay Aralin is In Development. SyncSpace is Live
(https://sync-space-taupe.vercel.app). A project with no `repoUrl`, `liveUrl` or `demoVideo` shows "Links
coming soon". The PixelDerm repo/demo link is paused until Will says otherwise.

No per-project accent colours (removed 2026-10-30). Every project card has the same flat 1px border that turns
solid `border-foreground` when active, hovered or focused. No glow, gradient or hover lift.

Case studies: a featured project can have a page at `/projects/<slug>` (the project's `slug`) by setting the
optional `caseStudy` field in `src/data/portfolio.ts` (summary, cover, facts, sections with optional steps,
images and the project's demo video, takeaways). The page is built only for projects that have it; every other
slug returns a 404 (`dynamicParams = false`), and with no case studies the build creates none. The detail panel
then shows a "Read case study" button, and the page links to the previous/next case study among those that
have one. Header links on sub-pages point to `/#section`. Never add placeholder case study text; see "Case
study pages" in `docs/EDITING-CONTENT.md`.

## Code Guidelines

- Clean, modular, functional React components.
- Standard Tailwind utility classes — avoid custom CSS unless Tailwind can't express it.
- Keep all content (profile, links, skills, projects, certifications) in `src/data/portfolio.ts`, not
  hardcoded in components.
- The build follows a 5-phase plan; see `docs/ROADMAP.md` for the phases, decisions and open items.

## Git

Never run `git commit` or `git push`. Will commits every phase manually, so Will is the only contributor
on GitHub. When work is ready, say so and give the commands plus a commit message with no AI attribution.
