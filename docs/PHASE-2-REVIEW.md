# Phase 2 Review Guide

For Will. About a 5-minute read. Phase 2 is built and checked. It needs your review before it is committed.

Date: 2026-10-30 (final polish and QA pass done). Plan and decisions: [ROADMAP.md](ROADMAP.md). Original plan: [PHASE-2-CONCEPT.md](PHASE-2-CONCEPT.md).

---

## 0. The restyle, round 1 (added 2026-10-30; superseded in parts by round 2 below)

Before review, the whole front end was restyled to feel closer to kirpenalber.com: *inspired by*, not a copy. Will
keeps their own identity, both themes and the turntable.

| Area | What changed |
| --- | --- |
| Fonts | Two instead of three. **Hanken Grotesk** (clean grotesk sans, for everything) and **JetBrains Mono** (nav, dates, tags, labels, buttons). Both are free (OFL). Hanken is close in feel to the reference's Switzer without being it. JetBrains Mono was already on the site, so the mono stays familiar. Space Grotesk and Space Mono are gone. |
| Hero | The tagline is the headline (the name is read out for screen readers), the intro in muted text, an accent pill ("Email me") and a small tinted "Resume" link. GitHub and LinkedIn left the hero; they are in Contact and the footer. |
| Experience | New section with compact rows (logo, org, role, dates on the right). Hidden, with its nav link, until `experience` has an entry. |
| Skills, Certifications, About, Contact, Footer | Rows with rounded chips, a pill email button, and a footer with the copyright, a muted location line and small icons. |
| Motion | Reveal now slides up a few pixels as it fades, staggered per block. The hero only slides (never fades), so it is never blank. All of it is off for reduced motion. |

---

## 0a. Round 2 (added 2026-10-30, after Will's answers)

Will felt the round 1 layout was still too close to Kir's site, so round 2 changes the accent, the width and the
background, and removes the per-project accents.

| Area | What changed |
| --- | --- |
| Accent | Ube purple instead of vermilion. Light `#702BA6`, dark `#C9A7F0` (a lavender ube). Hues about 275 and 270 degrees, so clearly purple, not the reference's indigo (`#131394`). `--accent` and `--accent-foreground` are the only accent tokens. |
| Layout | Wide: `max-w-[1280px]`, 90% of the viewport from 768px up, `px-4` full width on phones. The header, every section and the footer share one container (`containerClass` in `styles.ts`). Long paragraphs stop at 65 characters. The hero headline is larger (up to 60px). |
| Using the width | Skills is a 3-column grid (2 on small tablets). More projects and Certifications are 2-column grids. About puts the bio (65ch) beside the facts. The project panel is two columns at 1024px and up (text left, screenshots and video right). Experience rows run the full width with dates on the right. The hero turns into two columns (text, then a rounded photo) once `site.avatar` is set; while unset it stays one column. |
| Turntable | From 768px up the track spans the whole container. With exactly 2 projects the pair stays centred side by side (see below). With 3 or more projects the active card is centred with neighbours on both sides. On phones nothing changed: the next card peeks in from the edge. |
| Background | A dot grid (28px pitch, dots at 13% of the text colour) with four small outlined shapes (2 circles, a square, a plus) drifting 90 to 120 seconds per loop at 15% opacity. Flat 1.5px strokes, `transform` only, in one fixed, clipped, click-through layer. Fully still under reduced motion. The dot gradient is the one allowed gradient exception. |
| Project accents | Removed: the `accent` field, the blue/purple tokens and the blue SyncSpace title are gone. Every project card uses the same flat 1px border, which turns solid text colour when the card is active, hovered or focused. The hover lift (a few pixels of movement) was also removed. |
| Header | The small round avatar is no longer in the header (it would duplicate the hero photo). `site.avatar` now drives the hero. |

**How the turntable fills the width with 2 projects.** A centred active card would leave half of the wide track
empty at the first or last project. Instead, from 768px up the two cards always sit side by side, centred as a pair.
Turning the carousel changes which one is full size and solid-bordered and which one is smaller, dimmed and tilted.
Buttons, arrow keys, swipe and clicking the side card all still work. With 3 or more projects the active card is
centred again. Phones keep the original behaviour.

**What was flattened for the "glow".** The most likely cause was SyncSpace's blue top border meeting its purple
bottom border (2px, on rounded corners): that blends into a gradient look at the corners. Both are gone. Also
removed: the SyncSpace blue title colour, the thicker top and bottom border on all cards, and the hover lift. Nothing
now combines a scale with a border-colour change on a card (only buttons scale, with a flat fill).

**Contrast** (AA needs 4.5:1 for text, 3:1 for lines and dots):

| Item | Light | Dark |
| --- | --- | --- |
| Accent | `#702BA6` | `#C9A7F0` |
| Pill text on accent (`#FAF9F6` / `#131312`) | 7.7:1 | 9.1:1 |
| Accent as underline, border or dot against the page | 7.7:1 | 9.1:1 |
| Resume text on its 10% accent tint | 17.0:1 | 14.9:1 |
| Muted text (65%) on the 15% hover tint | 6.2:1 | 6.6:1 |
| Muted text on the page | 6.9:1 | 7.9:1 |
| Lowest text on the page with the panel open, scanned in a browser (dimmed neighbour card, text under a shape stroke) | 4.8:1 | 5.1:1 |

The scan covered all 67 visible text blocks at 1280px and 64 at 375px, with each project's panel open, and also
tested every block as if a shape stroke sat directly behind it.

**Round 2 answers from Will:** accent is ube purple; the tagline stays the headline; "Projects", GitHub and LinkedIn
out of the hero, and "Resume" are all approved. The four restyle questions from round 1 are therefore settled.

**New open questions (round 2):**
1. Should the 2-project turntable stay side by side, or would you prefer the old centred card with an empty side?
2. Is the dot grid and the drifting shapes the right amount of background, or should the shapes go (or the dots get fainter)?
3. **Answered** (the main session's recommendation): the header avatar is gone and the hero now has a small round avatar above the headline. Will can veto it.

---

## 1. What changed

All of it happened on 2026-10-30, in rounds. The page is now fully built with real content.

| Round | What changed |
| --- | --- |
| Base Phase 2 build | Hero, navbar with mobile menu and Resume button, the turntable project carousel with a click-to-open detail panel (media loads only then), skills, certifications, contact, footer. Light and dark themes with no flash. One status scale (Live, Completed, In Development). Skip link, visible focus, 44px tap targets, reduced motion respected. Content moved to `src/data/portfolio.ts`. |
| Restyle (section 0) | Two fonts (Hanken Grotesk and JetBrains Mono), tagline as the headline, accent pill and Resume link, Experience section, rounded chips, slide-up Reveal that never hides the hero. |
| Round 2 (section 0a) | Ube purple accent, wide 1280px layout, dot-grid background with slow drifting shapes, per-project accents removed, 2-project pair centred. |
| Real content | Avatar, Experience (3), 8 certifications, resume PDF, four featured projects (PixelDerm, SyncSpace, Signal No. 5, Gabay Aralin) with screenshots and demo videos. |
| Looping turntable | With 3 or more projects the carousel loops in both directions; a card that wraps fades in instead of crossing the centre. Phones show the neighbour peeking from the edge. |
| Case study pages | Optional `caseStudy` on a project gives it a page at `/projects/<slug>`. No project has one yet, so none are built. |
| Final polish (this pass) | Left neighbour title fixed (see below), nav underline follows the section in view, Gabay Aralin video poster, full QA, refreshed screenshots and docs. |

**What the polish fixed.**

- **Neighbour titles.** At 1024 to 1440px the left neighbour card used to run past the left edge of the track, and
  since card text is left-aligned its title was the part that got cut off (the right neighbour's title sits on its
  visible inner side, so it looked fine). From 1024px up the cards are now 33% of the track wide with a 100% step,
  so both neighbours sit fully inside it. Measured gap between each neighbour card and the track edge (same on both sides): 19px at
  1024, 23px at 1280 and 24px at 1440.
- **Nav underline.** It now follows the section at 40% of the screen height. The last section (Contact) is active
  when you reach the page bottom, and nothing is active at the very top.
- **Gabay Aralin poster.** The video now shows an app screen (the video at 6.8 seconds) before play. Signal No. 5's
  existing cover image looked right and was kept.

**What is on the page now.**

| Component | What it does |
| --- | --- |
| Navbar | Experience, Projects, About (only when `site.bio` is set), Skills, Contact, a Resume link and a sun/moon toggle. Sticky. |
| Mobile menu | Under 768px the links move into a menu button with the same links, Resume and the theme toggle. |
| Hero | Round avatar, the tagline as the headline, the intro, Email and Resume buttons. |
| Experience | Compact rows with the organisation, role and dates. |
| Projects (turntable) | One card centred, neighbours smaller and dimmed. Arrows, swipe, keys or a click on a side card turn it. |
| Project detail panel | "View project" opens a panel with the description, links, screenshots and video. |
| Skills, Certifications, Contact, Footer | Category grid, 8 certifications, email and link buttons, footer links. |
| Themes | Light and dark. Follows the system by default; the toggle remembers the choice. |

---

## 2. How to view it

```bash
npm run dev
```

Then open <http://localhost:3000>.

If a dev server is already running on port 3000, use that one, or stop it first. Two servers on one
port will fight.

---

## 3. Try this

- [ ] Turn the turntable with the arrow buttons.
- [ ] Turn it with a swipe (use DevTools device mode, or a phone on the same network).
- [ ] Turn it with the left and right arrow keys (click the carousel first so it has focus).
- [ ] Click a side card. It should move to the centre.
- [ ] Click "View project". The panel opens below, and the screenshots load only now (check the Network tab if you like).
- [ ] Press Escape. The panel closes.
- [ ] Click the sun/moon toggle. Reload the page. The theme should stay as you left it, with no flash.
- [ ] Open DevTools device mode at 375px and try the mobile menu: open it, pick a link, press Escape.
- [ ] Press Tab through the whole page. Check that focus is always visible, and that the first Tab stop is the
      "skip to content" link.
- [ ] Click Resume. It opens `public/resume.pdf` in a new tab.

---

## 4. Screenshots

Taken in headless Chrome with the real content, full page. They are for review only, not part of the commit. You can delete the
`docs/review/` folder when you are done.

| Screenshot | Shows |
| --- | --- |
| [light-375.png](review/light-375.png) | Light theme, phone width |
| [dark-375.png](review/dark-375.png) | Dark theme, phone width |
| [light-1280.png](review/light-1280.png) | Light theme, desktop |
| [dark-1280.png](review/dark-1280.png) | Dark theme, desktop |
| [light-1280-panel.png](review/light-1280-panel.png) | Light theme, desktop, project panel open |
| [dark-375-panel.png](review/dark-375-panel.png) | Dark theme, phone, project panel open |

### Case study pages (added 2026-10-30)

Each featured project can have a page at `/projects/<slug>`, shown only when `caseStudy` is set in
`portfolio.ts` (see "Case study pages" in EDITING-CONTENT.md). No project has one yet, so the build makes zero
of these pages (`next build` still lists the `/projects/[slug]` route, with no pages under it) and nothing on the site changes. The screenshots below came from a temporary test on SyncSpace
that used only its existing text and screenshots, and was removed afterwards.

| Screenshot | Shows |
| --- | --- |
| [case-study-light-1280.png](review/case-study-light-1280.png) | Case study page, light, desktop |
| [case-study-dark-1280.png](review/case-study-dark-1280.png) | Case study page, dark, desktop |
| [case-study-light-375.png](review/case-study-light-375.png) | Case study page, light, phone |
| [case-study-dark-375.png](review/case-study-dark-375.png) | Case study page, dark, phone |

---

## 5. Choices made for you

Will can change any of these.

| Choice | Detail |
| --- | --- |
| The carousel loops with 3 or more projects | The previous project is on the left and the next on the right, so no side is ever empty. Prev, next, arrow keys and swipe wrap, and nothing is disabled. A card that wraps to the other side fades in instead of sliding across the centre, so each turn moves one step. With 2 projects it stays a side-by-side pair with no loop. |
| The panel stays open and swaps | If the panel is open and you turn the carousel, the panel shows the new project. |
| Neighbour cards: 0.9 opacity, 0.88 scale, a slight turn | Kept this bright on purpose so their text still passes contrast (checked in both themes). Dimmer looks more "3D" but fails accessibility. From 1024px up the cards are narrower so both neighbours show their title. |
| Resume also appears in Contact | And there is a "Back to top" link in the footer. |
| About stays hidden until the bio is set | Its nav link hides too, so no link leads nowhere. |
| About facts show "Based in" and "Role" | Taken from `location` and `role`. |
| "Links coming soon" shows on PixelDerm | PixelDerm's link is paused until Will says otherwise. |

---

## 6. Open questions for Will

Still open:

1. **Panel swap or collapse?** When the panel is open and you turn the carousel, should it swap to the new
   project (today) or close?
2. **Keep the Contact Resume button and "Back to top"?** Both were added by us. Keep or remove?
3. **Are "Based in" and "Role" the right About facts?** (Only matters once `site.bio` is set and About shows.)
4. **Is the dot grid and the drifting shapes the right amount of background,** or should the shapes go (or the dots get fainter)?
5. **Narrower cards on desktop.** To show both neighbour titles, the active card is about 375px wide at 1280px
   (it was 480px). Is that fine, or would you rather have bigger cards with a neighbour title partly hidden?

Answered (nothing to do): loop or not (it loops with 3 or more projects), 2-project layout, header avatar (moved to
the hero), accent colour, tagline as headline, Resume and "Projects" wording.

The content still needed is in [ROADMAP.md, "What Will needs to send"](ROADMAP.md#what-will-needs-to-send).

---

## 7. CLAUDE.md updated

`CLAUDE.md` now describes the Phase 2 design: both themes, the turntable carousel, the status scale, the
"Links coming soon" rule and the paused PixelDerm link. The old "Bento Box", light-only and hover-shadow
wording is gone. These are all decisions Will made on 2026-10-30. Check the diff with `git diff CLAUDE.md`.

---

## 8. Not checked yet

Checked in headless Chrome at 375, 390, 414, 768, 1024, 1280 and 1440px in both themes: no horizontal scroll,
tap targets, focus rings, carousel in both directions across a full loop (buttons, keys, swipe, side-card click),
all 4 detail panels, text contrast, no shadows or filters, reduced motion, no console warnings.

Not checked:

- A real phone, Safari and Firefox.
- A screen reader (NVDA, VoiceOver).
- 768px to 1023px: the neighbour cards there are cut off by the track edge on purpose (they peek in), so the
  left one shows only its inner part.
- The About section (hidden until `site.bio` is set) and the More projects list (hidden while empty).

---

## 9. How to commit

Run these from `C:\Dev\Portfolio`. The first two lines handle a rename that only changes upper and lower
case (`pixelderm-1.JPG` to `pixelderm-1.jpg`). Windows Git can't see a case-only change by itself. Without these
lines, the deployed site on Vercel (Linux, where file names are case-sensitive) would return 404 for that screenshot.

```
git rm --cached "public/projects/pixelderm-1.JPG"
git add public/projects/pixelderm-1.jpg
git add -A src public eslint.config.mjs CLAUDE.md docs/ROADMAP.md docs/PHASE-2-CONCEPT.md docs/PHASE-2-REVIEW.md docs/EDITING-CONTENT.md progress.md
git status
git commit -m "Phase 2: turntable carousel, light/dark theme, purple accent, wide layout, dot grid" -m "Hero with tagline headline and intro, navbar with mobile menu and Resume button, turntable carousel with click-to-open project details, Experience, skills grid, certifications, contact and footer. Light and dark themes with no flash, ube purple accent, wide layout, dot-grid background with slow drifting shapes in the side margins, two fonts (Hanken Grotesk and JetBrains Mono). 44px tap targets, focus styles, skip link, slide-up reveal that never hides the hero. Content split into featuredProjects and moreProjects with one status scale; experience and certifications filled in from LinkedIn; resume PDF added."
```

Before you commit, read the `git status` output and check two things:

- It shows `renamed: public/projects/pixelderm-1.JPG -> public/projects/pixelderm-1.jpg` (or a delete plus an add).
- `docs/review/` is **not** staged.

The commit message has no AI attribution. Keep it that way.
