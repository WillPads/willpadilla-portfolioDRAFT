# Phase 2 Concept: Components

Status 2026-10-30: approved with changes and built. See [PHASE-2-REVIEW.md](PHASE-2-REVIEW.md) for what changed from this concept (turntable carousel instead of the bento grid, light and dark themes, status scale).

This is the plan and a clickable look for Phase 2. Nothing is built until Will approves it.
Open the HTML mockup next to this doc (the Lead will give Will the link). It uses the real text from
`src/data/portfolio.ts`. Dashed boxes mean "Waiting on Will". No copy, numbers or dates were invented.

Last updated: 2026-10-30

How to read the wireframes: `[ ]` is a button or link, `{ }` is a dashed "Waiting on Will" slot, `...` is text.

---

## At a glance

| Decision | Choice | Why |
| --- | --- | --- |
| Page order | Hero, Work, About, Skills (+ Certifications), Contact, Footer | Recruiters see who Will is, then proof (projects), then the details |
| Nav | Work, About, Skills, Contact + a Resume button | Skills gets its own anchor; Resume is the one thing recruiters ask for |
| Hero headline | "Will Padilla" (replaces "What's up, Will?") | A recruiter learns the name and role in one glance |
| Project layout | 3-4 featured cards, then a "More projects" list | Matches the 2026-10-30 roadmap decision |
| Hover | Fill (black at 5%) + scale 1.05; cards lift 8px with a solid accent border | Same as the design system, with no blur and no glow |
| Reveal | Hero never fades; other sections fade in once | Fixes the "blank until JavaScript loads" problem |

---

## Build order

1. Navbar + MobileMenu
2. Hero
3. ProjectsSection (featured cards + "More projects")
4. SkillsSection (About bio + categorised skills grid)
5. Certifications block
6. Contact
7. Footer
8. Reveal fix and skip link (small, touches every section)

Shared rules for every component (written once so they are not repeated):

| Rule | What it means |
| --- | --- |
| Tap targets | Every link and button is at least 44px tall. Phone side gutter is 16px, then 24px from 640px up. |
| Focus | `:focus-visible` shows a 2px outline plus the same fill as hover, so keyboard users see what mouse users see. |
| Reduced motion | With `prefers-reduced-motion: reduce`: no scale, no lift, no fades, no smooth scroll. Colour changes stay. |
| New-tab links | External links get `target="_blank" rel="noopener noreferrer"` and visually hidden text "(opens in a new tab)". |
| Icons | `aria-hidden="true"`; the text label carries the meaning. Icon-only buttons get `aria-label`. |
| Contrast | Body text never drops below black at 62% (about 6:1 on `#FAF9F6`). |

---

## 1. Navbar + MobileMenu

**What it's for:** Move around the page, and put Resume one tap away from anywhere.

Desktop (768px and up):

```
+------------------------------------------------------------------+
| WILL PADILLA              WORK  ABOUT  SKILLS  CONTACT  [Resume v]|
+------------------------------------------------------------------+
```

Phone (375px), closed and open:

```
+-------------------------------+   +-------------------------------+
| WP                       [=]  |   | WP                       [X]  |
+-------------------------------+   +-------------------------------+
                                    | WORK                          |
                                    | ABOUT                         |
                                    | SKILLS                        |
                                    | CONTACT                       |
                                    | [        Resume  v          ] |
                                    +-------------------------------+
```

| Item | Detail |
| --- | --- |
| Reads | `site.name`, `site.resume`, `nav[]` |
| Data changes | `nav` gets a Skills entry that is separate from About. Final list: Work, About, Skills, Contact. Resume is not in `nav`; it reads `site.resume`. |
| Structure | `Header` stays a server component. Only `MobileMenu` (the toggle) is a client component, because it needs state. |
| Fixes | Header links about 40px tall (now 44px; menu rows 48px). No focus styles. |

Accessibility notes for the mobile menu:

- The toggle is a real `<button>` with `aria-expanded="true|false"` and `aria-controls="mobile-menu"`.
  The icon swaps between menu and close. The label stays "Main menu" so it does not change while open.
- It is a disclosure, not a modal. Focus stays on the button when it opens, and the panel comes right
  after it in the DOM, so Tab moves into the links in order. No focus trap is needed.
- Escape closes the menu and puts focus back on the toggle. Choosing a link closes it. Clicking outside
  the header closes it. Growing the window to 768px or wider closes it.
- The desktop nav and the menu are separate `<nav>` landmarks with different labels. Only one is visible
  at a time (`display: none` hides the other from screen readers too).
- Under 380px the brand shortens to "WP" so the toggle never gets squeezed.
- Sticky header + anchor links: sections get `scroll-margin-top` so headings are not hidden under it.

---

## 2. Hero

**What it's for:** In five seconds, a recruiter knows who Will is, what Will does, and what Will wants.

Desktop:

```
 [ TO DEVELOP WITH PURPOSE, PUSHED BY PASSION ]

 WILL [PADILLA]                       (huge, Space Grotesk)
 Software Engineer & Computer Science Student at FEU Tech
 { Waiting on Will: target role }     (shown as "Looking for: ...")

 I'm a Computer Science student at FEU Tech who strives toward
 great software developed with purpose, pushed by passion.

 [Resume v] [View projects] [Email me]
 { Waiting on Will: resume PDF }
 [GitHub] [LinkedIn]
```

Phone (375px):

```
+-------------------------------+
| [ TO DEVELOP WITH PURPOSE,    |
|   PUSHED BY PASSION ]         |
| WILL [PADILLA]                |
| Software Engineer & Computer  |
| Science Student at FEU Tech   |
| { target role }               |
| I'm a Computer Science ...    |
| [Resume v] [View projects]    |
| [Email me]                    |
| [GitHub]  [LinkedIn]          |
+-------------------------------+
```

| Item | Detail |
| --- | --- |
| Reads | `site.tagline`, `site.name`, `site.role`, `site.targetRole` (new), `site.intro`, `site.resume`, `site.email`, `site.social` |
| Data changes | Add `site.targetRole?: string` (Waiting on Will). Nothing renders for it while it is empty. |
| Fixes | Hero never states role or goal. Fade-in hides the hero until JavaScript loads. |

Design notes:

- The headline is the name, not a greeting. The black chip on "Padilla" keeps the current look.
- Resume is the one solid black button. "View projects" and "Email me" are outlined.
  The solid button cannot show a "black at 5%" fill (it is already black), so its hover lightens it
  slightly and scales it.
- The hero is not wrapped in `Reveal` (see the Reveal section).
- Accessibility: the page's only `<h1>` is the name. The section is labelled by it. GitHub and LinkedIn
  logos are inline SVG with visible text next to them.

---

## 3. ProjectsSection

**What it's for:** Show depth with a few detailed cards, and range with a short list.

Desktop (3-column grid; PixelDerm takes two columns):

```
 / WORK
 SELECTED WORK
 +---------------------------------------+ +-------------------+
 | PIXELDERM          [COMPLETED / LIVE] | | SYNCSPACE         |
 | PROJECT MANAGER & DEVELOPER           | | [IN DEVELOPMENT]  |
 | { year, context }                     | | FULL-STACK DEV    |
 | [ANDROID] [JAVA] [IMAGE PROCESSING]   | | { year, context } |
 | Android-based Mobile Platform ...     | | [NEXT.JS] [...]   |
 | An algorithmic image-processing ...   | | Synchronous Co-.. |
 | { one measurable result }             | | Shared real-time..|
 | +------+ +------+ +------+ +------+   | | { result }        |
 | | shot | | shot | | shot | | shot |   | | { repo link }     |
 | +------+ +------+ +------+ +------+   | |                   |
 | { public repo or demo link }          | |                   |
 +---------------------------------------+ +-------------------+
 +-------------------+ +-------------------------------------+
 | { featured 3 }    | | { featured 4, optional }            |
 +-------------------+ +-------------------------------------+

 MORE PROJECTS
 { name, year, pitch, stack }                      [ Source ]
 { name, year, pitch, stack }                      [ Source ]
 { name, year, pitch, stack }                      [ Source ]
```

Phone (375px): one column, cards stacked, screenshots scroll sideways inside the card.

```
+-------------------------------+
| PIXELDERM  [COMPLETED / LIVE] |
| PROJECT MANAGER & DEVELOPER   |
| { year, context }             |
| [ANDROID] [JAVA] [IMAGE ...]  |
| Android-based Mobile ...      |
| An algorithmic ...            |
| { result }                    |
| +-----+ +-----+ +-----+ ->    |
| |shot | |shot | |shot |       |
| +-----+ +-----+ +-----+       |
| { repo or demo link }         |
+-------------------------------+
| SYNCSPACE      [IN DEVELOP.]  |
| (same card, no screenshots)   |
| Shared real-time rooms ...    |
| { result }                    |
| { repo link }                 |
+-------------------------------+
| MORE PROJECTS                 |
| { name, year, pitch, stack }  |
| [ Source ]                    |
+-------------------------------+
```

| Item | Detail |
| --- | --- |
| Reads | All `projects[]` fields; see "Data contract" below |
| Fixes | SyncSpace shows empty "Screenshot" boxes and hides its links. Cards show no results (field added here, filled in Phase 3). |

Design notes:

- **No screenshots, no frames.** A card without screenshots (SyncSpace) simply has no screenshot strip.
  The "Screenshot" placeholder boxes are deleted.
- **Links:** "Source" shows when `repoUrl` exists, "Live" when `liveUrl` exists. In-development projects can
  now show source. PixelDerm's link 404s today, so it shows nothing until Will sends a working link.
- **Hover:** the card lifts 8px. PixelDerm gets a black border. SyncSpace gets a blue top border and a purple
  bottom border (2px, solid). The title turns blue and the source link turns purple. The old hover drop
  shadow and white fill are removed (see Deviations).
- **Keyboard:** the accent and lift also happen on `:focus-within`, so tabbing to a card link looks the same
  as hovering it.
- **Screenshots:** frames get larger (116px wide, up from 96px). The strip is a scrollable region
  (`role="region"`, `aria-label="PixelDerm screenshots"`, `tabindex="0"`) so keyboard users can scroll it.
  Real images keep `next/image` and each keeps its alt text.
- **Bento rule:** featured cards sit in a grid; the first is wide. With one featured card or four, the grid
  still fills its rows (2 columns on tablet, 3 on desktop).
- **More projects:** a plain list, one row each, no images. Each row: name (link to source), year, one-line
  pitch, small stack tags. A row on a phone stacks name, then pitch, then link.
- **Semantics:** each card is an `<article>` labelled by its `<h3>`; stack is a `<ul>` with an
  `aria-label`; "More projects" is a `<ul>` under its own `<h3>`.

---

## 4. SkillsSection (with the About bio)

**What it's for:** Show what Will can do in categories, so a recruiter can match it to a job posting fast.
The About bio sits just above it as its own small section.

Desktop:

```
 / ABOUT
 A BIT ABOUT ME
 { Waiting on Will: 2-3 sentence bio }          BASED IN
                                                 ESPANA, MANILA
                                                STUDYING
                                                 COMPUTER SCIENCE, FEU TECH
 / SKILLS
 WHAT I WORK WITH
 +----------------------+ +----------------------+
 | LANGUAGES            | | FRONTEND             |
 | [TS] [JAVA] [PY] [C++]| | [REACT] [NEXT] [TW]  |
 +----------------------+ +----------------------+
 | BACKEND              | | DATABASES & TOOLS    |
 | [NODE] [EXPRESS] [WS]| | [SQLITE] [PRISMA] [..]|
 +----------------------+ +----------------------+
 { optional: Core CS concepts }
```

Phone (375px): one column.

```
+-------------------------------+
| A BIT ABOUT ME                |
| { 2-3 sentence bio }          |
| BASED IN  ESPANA, MANILA      |
| STUDYING  COMPUTER SCIENCE,.. |
+-------------------------------+
| WHAT I WORK WITH              |
| LANGUAGES                     |
| [TYPESCRIPT] [JAVA] [PYTHON]  |
| [C++]                         |
| FRONTEND                      |
| [REACT] [NEXT.JS] [TAILWIND]  |
| ...                           |
+-------------------------------+
```

| Item | Detail |
| --- | --- |
| Reads | `site.bio` (new), `site.location`, `site.role`, `skills[]` (already grouped: `category` + `items`) |
| Data changes | Add `site.bio?: string` (Waiting on Will). The About block renders only when it exists. Optional extra `skills` group "Core CS concepts" needs no type change. |
| Fixes | Skills are one flat list instead of categories. Nav gets a separate Skills anchor. |

Notes:

- Each group is a bordered box with an `<h3>` and a `<ul>` of tags. Tags are not links, so they get no hover.
- If Will does not add "Core CS concepts", the grid stays 2 by 2 and the dashed slot is simply gone.
- Until the bio exists, the About block is not rendered and "About" is dropped from `nav`.
  Nothing says "replace this paragraph" on the page.

---

## 5. Certifications block

**What it's for:** A small proof point. The block appears only when `certifications` has an entry.

Desktop and phone share one layout (a single column card):

```
 CERTIFICATIONS
 +---------------------------------------+
 | CERTIFICATION NAME                    |
 | Issuer, Month Year                    |
 | [Verify credential ^]   ID: 1234      |
 +---------------------------------------+
```

| Item | Detail |
| --- | --- |
| Reads | `certifications[]`: `name`, `issued`, `issuer`, `credentialUrl`, `credentialId` |
| Data changes | None. The type already exists. Format `issued` ("2026-09") as "September 2026". |
| Fixes | None from the Known issues table; it is part of the Phase 3 content. |

Notes: it lives inside the Skills section, under the grid, as an `<h3>` with a list. With an empty list the
component returns `null`, so no heading and no empty box appear. "Verify credential" is a new-tab link.

---

## 6. Contact

**What it's for:** One obvious way to reach Will, plus the other places Will can be found.

Desktop:

```
 / CONTACT
 LET'S WORK TOGETHER
 +----------------------------------------------------------------+
 | Have a project in mind or just          [ mail wgabriel.padilla@gmail.com ]
 | want to say hi? My inbox is open.       [GitHub] [LinkedIn] [Resume v]     |
 +----------------------------------------------------------------+
```

Phone (375px):

```
+-------------------------------+
| LET'S WORK TOGETHER           |
| +---------------------------+ |
| | Have a project in mind or | |
| | just want to say hi? ...  | |
| | [mail wgabriel.padilla@   | |
| |       gmail.com        ]  | |
| | [GitHub]    [LinkedIn]    | |
| | [Resume v]                | |
| +---------------------------+ |
+-------------------------------+
```

| Item | Detail |
| --- | --- |
| Reads | `site.email`, `site.social`, `site.resume` |
| Data changes | None. |
| Fixes | Email button may be too wide on phones. GitHub link goes to a repo, not a profile (needs Will's profile URL, Phase 3). |

Notes:

- The email is shown in normal case with no letter spacing (uppercase tracked text is what made it wide).
  It may wrap at any character (`overflow-wrap: anywhere`), so it can never push the page sideways.
  Checked at 375px: the button ends 37px before the screen edge.
- The email is a real `mailto:` link. No contact form (it would need a backend and spam handling).

---

## 7. Footer

**What it's for:** A quiet last row with the same links, so nobody has to scroll up.

Desktop:

```
 WILL PADILLA / ESPANA, MANILA            EMAIL  GITHUB  LINKEDIN  BACK TO TOP
```

Phone (375px):

```
 WILL PADILLA / ESPANA, MANILA
 EMAIL  GITHUB  LINKEDIN
 BACK TO TOP
```

| Item | Detail |
| --- | --- |
| Reads | `site.name`, `site.location`, `site.email`, `site.social` |
| Data changes | None. |
| Fixes | Footer links were 44px only by accident of padding; now they are set to a 44px minimum on purpose. |

Notes: no copyright year (it would need `new Date()`, which adds a caching question for no benefit).
"Back to top" is a plain `#top` anchor.

---

## Reveal fix and skip link

Two problems today in `src/components/ui/Reveal.tsx`:

| Problem | Cause |
| --- | --- |
| The hero is invisible until JavaScript loads | The wrapper starts at `opacity-0` and only JavaScript sets it to 1 |
| Server and browser can disagree on first paint (a "hydration mismatch") | `useState(prefersReducedMotion)` is `false` on the server but `true` in the browser for people who reduce motion |

Proposal (all of it is in the mockup; add `?reveal=1` to the URL to see the fade, it is off by default so
screenshots and printing show the whole page):

1. **The hero is never wrapped.** It is always visible.
2. **Everything else is visible by default.** The server HTML has no hidden state.
3. **After the page loads**, a small effect hides only the blocks that are below the fold, then fades each
   one in the first time it scrolls into view. **It never fades back out.**
4. **Reduced motion:** the effect does nothing at all, so nothing is ever hidden.
5. **No JavaScript or a failed script:** everything stays visible, because hiding only happens in the effect.
6. **How to avoid the mismatch:** do not keep the state in `useState`. The effect sets a data attribute on
   the element (`data-reveal="hidden"` then `"shown"`) and CSS does the fade. The first render is identical
   on server and browser.
   Heads-up for the build: React 19's lint rules warn about setting state inside effects, which is another
   reason to use the attribute. This is a plan, not tested code.

**Skip to content link:** the first focusable thing on the page. It is invisible until focused, then shows
as a black bar at the top-left. It points at `<main id="main" tabindex="-1">`, so focus really moves there.
In-page links (`#projects`, and so on) can be plain `<a href="#...">`; `next/link` is not needed because
there is no route change.

| Fixes | Fade-in hides the hero; no focus styles and no skip link |
| --- | --- |

---

## Data contract (proposed, nothing implemented)

```ts
// site: add two fields, both Waiting on Will. Optional until Phase 3, then make them required.
site.targetRole?: string   // e.g. "Software Engineering Intern"
site.bio?: string          // 2-3 sentences

type ProjectBase = {
  slug: string             // React key and a stable id ("pixelderm")
  title: string
  role: string
  tagline: string
  stack: string[]
  status: "completed" | "in-development"
  year: string             // "2026"
  context?: string         // "Thesis", "Course project", "Personal"
  impact?: string          // one measurable result
  repoUrl?: string         // replaces the old liveUrl meaning
  liveUrl?: string
}

type FeaturedProject = ProjectBase & {
  description: string
  accent: "mono" | "blue-purple"
  device: "mobile" | "desktop"
  span: "wide" | "normal"
  screenshots: ProjectScreenshot[]   // required; use [] when there are none (SyncSpace)
}

type ListProject = ProjectBase       // no accent, device, span or screenshots

export const featuredProjects: FeaturedProject[]
export const moreProjects: ListProject[]
```

| Change | Why |
| --- | --- |
| `liveUrl` becomes `repoUrl?` + `liveUrl?` | In-development projects can still show source |
| `featured` flag is replaced by two arrays (recommended) | See below |
| Add `year`, `impact?`, `context?` | Recruiters scan for recency and results |
| Remove `screenshotCount` | It only drew the empty placeholder frames |
| `slug` is the React key | Titles can change or repeat; slugs do not |
| `screenshots` is required on featured, `[]` allowed | A forgotten field is a type error, but SyncSpace still works |
| Skills, certifications | No change |

**A different shape than the brief, and why:** the brief suggested `featured: boolean`, or better a
discriminated union (one type that switches on that flag). Two separate arrays are simpler still.
To move a project from the list to a card, Will cuts and pastes it between arrays and fills in the extra
fields. TypeScript then checks each array on its own, with no flag to forget and no narrowing code.
The union works too if Will prefers one list; the components would not change.

Resume stays at `site.resume`. The Resume buttons point at `/resume.pdf`, which does not exist yet, so do
not deploy until it does.

---

## Deviations from CLAUDE.md and the roadmap

| Where | What the docs say | What this concept does | Why |
| --- | --- | --- | --- |
| Buttons | "Frosted bubble" hover with `backdrop-blur-md` | Black at 5% fill + scale 1.05, no blur | Task brief and 2026-10-30 decision: no blur anywhere |
| Project cards | Hover shadow stays | Lift + solid accent border only, no shadow and no white fill | 2026-10-30: "solid border and text colour only" |
| Solid black button | Fill fades in on hover | Lightens to black at 82% | Black at 5% on black is invisible |
| Intro and headline | Current: "What's up, Will?" | "Will Padilla" | Known issue: the hero never says who or what |

CLAUDE.md should be updated after approval so it matches (the Lead owns that).

---

## Open questions for Will

1. **Headline:** is "Will Padilla" (replacing "What's up, Will?") okay?
2. **Nav:** Work, About, Skills, Contact + Resume button. Good, or drop About and put the bio in the hero?
3. **Project data:** two arrays (recommended) or one list with a `featured` flag?
4. **Badge:** PixelDerm says "Completed / Live" but has no live link. Change it to "Completed" until there is one?
5. **PixelDerm screenshots:** the logo file is in the screenshot list. Keep it out of the strip (a logo is not a
   screen)? Also, one alt text reads "Analysis -Results" (missing a space). Fix it?
6. **Year and context** for PixelDerm and SyncSpace (for example "Thesis"). Not in the data today.
7. **Source links:** a public PixelDerm repo or demo link; and is SyncSpace's repo public?
8. **GitHub link:** send the profile URL (the current one points at a repo, `WillPads/WPadilla`).
9. **Email:** `wgabriel.padilla@gmail.com` is shown. Is that the one for recruiters?
10. **Resume:** should the button open the PDF in a new tab (default here) or download it?
11. **Featured count:** once the 3 new projects arrive, which become cards (up to 2 more) and which go to the list?
12. **Core CS concepts:** add a fifth skills group, or skip it?
13. **Dark mode:** the real site stays light only. (The mockup file has dark colours only for the host that
    publishes it.) Agreed?

---

## Known issues, and which component fixes each

| Known issue (ROADMAP) | Fixed by | Notes |
| --- | --- | --- |
| Hero never states your role or what you're looking for | Hero | Role line now; "Looking for" line when `targetRole` arrives (Phase 3) |
| Fade-in hides the hero until JavaScript loads | Reveal fix + Hero | Hero is never wrapped |
| SyncSpace empty "Screenshot" boxes, links hidden | ProjectsSection | No frames without screenshots; `repoUrl` shown while in development |
| Project cards don't show results or impact | ProjectsSection | Field and slot added now; the numbers come in Phase 3 |
| Skills are one flat list | SkillsSection | Four categories, optional fifth |
| Header links about 40px tall | Navbar + MobileMenu | 44px links, 48px menu rows |
| No focus styles, no skip link | Shared rules + Reveal fix section | Applies to every component |
| Contact email button too wide on phones | Contact | Normal case, wraps, checked at 375px |
| No link preview, default favicon, no sitemap | Not Phase 2 | Phase 4 |
| PixelDerm screenshots small; odd file names | Partly | Frames are larger here; renaming files is Phase 4 |
| README is an unfilled template | Not Phase 2 | Phase 5 (or sooner) |
| GitHub link goes to a repo, not a profile | Hero, Contact, Footer | Needs Will's profile URL (Phase 3) |
