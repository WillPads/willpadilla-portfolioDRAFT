# Handoff: Where We Stopped and What's Next

For Will and any AI assistant (such as VS Code Copilot) helping while Claude's team is on break.
Last updated: 2026-10-31. Claude resumes after Will's usage limit resets (Sunday 9 PM).

---

## 1. Rules to follow (read first)

1. **Read [CLAUDE.md](../CLAUDE.md) and [AGENTS.md](../AGENTS.md) before changing code.** CLAUDE.md holds every design rule: colours, fonts, spacing, what's banned. This project uses **Next.js 16**, which has breaking changes, so check `node_modules/next/dist/docs/` before using any Next API.
2. **All text and content lives in [src/data/portfolio.ts](../src/data/portfolio.ts)**, never hard-coded in components. [EDITING-CONTENT.md](EDITING-CONTENT.md) explains every field.
3. **Never invent facts.** Every claim about Will's projects must come from Will or from the project's own code and docs. If something is unknown, leave it out and ask Will.
4. **Copy written as Will is first person** ("I built..."). When writing about Will, use he/him.
5. **No gradients, blur, glow or shadows.** The dot grid is the one allowed gradient. WCAG AA contrast, 44px tap targets and visible focus are required.
6. **Git:** work on the `redesign` branch. **Do not push to `main`** until Phase 4 is finished, because `main` deploys the live site (willpadilla-portfolio.vercel.app). Will makes every commit himself, with no AI attribution in commit messages.
7. **Before saying something is done**, run all three and make sure they pass:
   ```
   npx tsc --noEmit
   npm run lint
   npx next build
   ```

---

## 2. Where we are

| Phase | Status |
| --- | --- |
| 1. Setup | Done, committed |
| 2. Components and design | Done, committed (`d9f3c36` and `e14a2f5` on `redesign`) |
| **3. Content** | **Almost done.** 3 of 4 case studies are on the site |
| 4. Polish and SEO | Not started |
| 5. Launch (merge to `main`, deploy) | Not started |

**Latest commit:** `7376371` "Signal No. 5 and Gabay Aralin case studies, nav underline fix" on `redesign`.

**Uncommitted changes nobody on the team has reviewed** (made after the last commit, probably by Will or Copilot):

- `Footer.tsx`, `Header.tsx`, `Contact.tsx` and `Hero.tsx`;
- `portfolio.ts`, where `contactNote` was reworded.

Check them against CLAUDE.md and run the three checks above before committing them.

### What's on the site now

- **Hero:** name, role, the tagline headline, a "Looking for" line, intro and avatar.
- **Projects:** a looping carousel of 4 projects: PixelDerm, SyncSpace, Signal No. 5 and Gabay Aralin.
- **Case study pages:** `/projects/syncspace`, `/projects/signal-no-5` and `/projects/gabay-aralin`.
- **Skills, Certifications (8), Experience (3 organisations), About (Will's own bio), Contact, Footer.**

---

## 3. What's next, in order

### A. PixelDerm case study (the last one; needs Will's answers)

The draft is in [CASE-STUDIES-DRAFT.md](CASE-STUDIES-DRAFT.md), in the PixelDerm section. Will answers these 6 questions:

1. **Your part.** The site will show "Project Manager & Co-Developer". In one line: what did you build, and what did Martonie and Shana own?
2. **Why this topic.** Draft: "UV damage builds up slowly, so it's hard to see changes in your own skin from day to day. We wanted people to track their skin over time instead of guessing." Keep, edit or drop? Who is the app for?
3. **Dermatologists.** In one line, what did they help with?
4. **The analysis.** OK to keep it general ("an image-processing pipeline measures spots, texture and pigmentation")?
5. **ISO/IEC 25010 result.** Who rated it, and the overall result in one line? Skip it if you'd rather not share.
6. **One lesson** from managing the project, plus the hardest moment if you want one in. Skip it and the page ends at Results.

Then add a `caseStudy` to the PixelDerm entry in `portfolio.ts`.

- Copy the shape of the three existing case studies, and follow the `CaseStudy` type.
- Facts that are already settled:
  - Thesis, Sep 2025 – Jul 2026.
  - Stack: React Native, TypeScript, Android, Image Processing, ISO/IEC 25010.
  - Developed **with** dermatologists. Don't say "validated".
  - **Do not claim "local SQLite storage"**: the app sends scans to a backend server.
  - Will's data role was minor: he cleaned datasets with Python.
- Images are `public/projects/pixelderm-1.jpg` to `pixelderm-4.jpg`. PixelDerm has no repo or demo link; that is paused.

### B. Small leftovers in Phase 3

- **Gabay Aralin live link:** the repo lists `https://gabayaralin.vercel.app`, but it returned 404. Leave it off the site until Will redeploys it and approves.
- **Gabay Aralin: Codex or Claude?** The site says the first version was built with the event's Codex credits, which is what Will said. The repo commits list Claude as co-author. Will should confirm.
- **Signal No. 5 "levels":** the repo calls them phases and events. The site uses Will's word, "levels". Will should be ready to explain it.
- **Dev server:** if a case study page shows 404 in `npm run dev`, restart the dev server. New case study pages only appear after a restart.

### C. Parked until Phase 3 is done (Will asked to be reminded then)

These live in [WILL-TODO.md](WILL-TODO.md), sections 4-7.

- **LinkedIn and resume updates:**
  - the new headline and bio;
  - the cut-off SyncSpace description;
  - the Signal No. 5 role, which should now be **"Associate Project Manager & Backend Developer"** (not "Lead Backend Engineer");
  - SyncSpace dates: "Jun 2026 – Present";
  - re-export the resume as `public/resume.pdf`.
- **Featured section:** a swipeable row of event, hackathon and organisation posts. Three photos are already in `public/featured/`. Will collects the rest.
- **Phase 4, polish and SEO:**
  - link preview (Open Graph) image and metadata, favicon, sitemap, image sizes;
  - real-device checks;
  - the Gabay Aralin tech stack and repo links (on hold, so remind Will);
  - optionally shrink the two demo videos (38 MB and 20 MB).
- **Phase 5, launch:**
  - a real README (the current one is a template);
  - merge `redesign` into `main`, which deploys the live site;
  - add the portfolio link to the resume and LinkedIn.

---

## 4. Useful commands

```
npm run dev                  # local site at http://localhost:3000
npx tsc --noEmit             # type check
npm run lint                 # lint (must show 0 errors, 0 warnings)
npx next build               # production build; lists the case study pages
git status                   # docs/review/ and .claude/team/ are ignored on purpose
```

**Preview of the `redesign` branch online:** Vercel dashboard → Deployments → newest `redesign` entry. Open it in Chrome or Edge, because preview links need a Vercel login and VS Code's built-in browser can't do it.

---

## 5. Where to find things

| File | What it is |
| --- | --- |
| [CLAUDE.md](../CLAUDE.md) | Design and code rules |
| [src/data/portfolio.ts](../src/data/portfolio.ts) | Every word on the site |
| [WILL-TODO.md](WILL-TODO.md) | Will's checklist |
| [CASE-STUDIES-DRAFT.md](CASE-STUDIES-DRAFT.md) | Case study drafts (PixelDerm still open) |
| [ROADMAP.md](ROADMAP.md) | Phases, every decision and why |
| [EDITING-CONTENT.md](EDITING-CONTENT.md) | How to edit content safely |
| [progress.md](../progress.md) | Log of what was done |
