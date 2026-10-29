# Portfolio Roadmap

The plan for turning this site into a recruiter-ready portfolio for internships and entry-level
software engineering roles. Each phase is finished and approved by Will before the next one starts.

Last updated: 2026-10-30

---

## Where we are

| Phase | What it covers | Status |
| --- | --- | --- |
| 1. Setup & architecture | Audit the repo, add icons, one central content file, remove "AI-looking" effects | **Done, waiting for Will's OK** |
| 2. Components | Hero, Navbar + mobile menu, project cards, skills grid, contact section | Not started |
| 3. Content | Bio, target role, resume, new projects, certification | Waiting on Will's content |
| 4. Polish & SEO | Phone/tablet/desktop checks, link previews (LinkedIn), favicon, image loading | Not started |
| 5. Deploy | Push to GitHub, deploy to Vercel, check the live site | Not started |

---

## Decisions

The reasoning behind how the site looks and is built. Newest first.

| Date | Decision | Why |
| --- | --- | --- |
| 2026-10-30 | Feature 3–4 projects as cards; the rest go in a short "More projects" list | Recruiters skim. A few detailed cards show depth, the list shows range. Final picks once the new projects are in. |
| 2026-10-30 | All content lives in one file: `src/data/portfolio.ts` | One place to edit everything. See [EDITING-CONTENT.md](EDITING-CONTENT.md). |
| 2026-10-30 | No blur, no glow blobs. Project hover accents are solid border and text colour only | Blurred glows and frosted glass are common tells of AI-generated templates. |
| 2026-10-30 | Use Lucide icons, but only functional ones (GitHub, LinkedIn, external link, download, email) | Recruiters find links faster with familiar icons. No decorative or sparkle icons. |
| 2026-10-30 | Keep the existing custom site instead of switching to a template | It already builds and passes checks, and a hand-built site is itself a signal for an engineering role. |
| 2026-10-15 | Flat surfaces, thin borders, black text on off-white, no gradients | A clean, developer-tool look that reads as human-made. |

---

## What Will needs to send

Phase 3 can't be finished without these. Nothing is filled in with placeholder text.

- [ ] Resume PDF (it goes in `public/resume.pdf`; the Resume button currently leads to a missing page)
- [ ] A 2–3 sentence bio for the About section
- [ ] Target role, e.g. "Software Engineering Intern" or "Full-Stack Developer"
- [ ] PixelDerm link: make the GitHub repo public, or send a demo video/APK link (the current link 404s)
- [ ] For each of the 3 new projects: name, one-line pitch, your role, tech stack, year, one result
      (users, accuracy, grade, award), repo link, live link if any, screenshots if it should be a card
- [ ] The certification: name, issuer, month/year, verification link or credential ID
- [ ] Which email to show: the site uses `wgabriel.padilla@gmail.com`, git commits use another one
- [ ] Optional: "Core CS concepts" to list under Skills (e.g. data structures, OOP, networking)

---

## Known issues, and the phase that fixes them

From the senior-engineer and hiring-manager review on 2026-10-29.

| Issue | Phase |
| --- | --- |
| Hero says "What's up, Will?" and never states your role or what you're looking for | 2 + 3 |
| The fade-in effect hides the hero until JavaScript loads | 2 |
| SyncSpace shows empty "Screenshot" boxes and hides its links while in development | 2 |
| Project cards don't show results or impact | 3 |
| Skills are one flat list instead of categories | 2 |
| Header links are about 40px tall (44px is the minimum comfortable tap size) | 2 |
| No keyboard focus styles and no "skip to content" link | 2 |
| Contact email button may be too wide on phones | 2 |
| No link preview when shared on LinkedIn; default Next.js favicon; no sitemap | 4 |
| PixelDerm screenshots are small and some file names have spaces or uppercase extensions | 4 |
| README is still the default Next.js one | 5 |
| GitHub link goes to a repo instead of your profile page | 3 |
