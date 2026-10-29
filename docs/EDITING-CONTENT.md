# How to Edit the Portfolio's Content

Everything the site shows (your name, links, skills, projects, certifications) lives in one file:

**`src/data/portfolio.ts`**

You never need to touch the components to change text. Edit the file, save, and the page updates
(run `npm run dev` and open <http://localhost:3000> to see it).

---

## The sections of the file

| Section in the file | What it controls |
| --- | --- |
| `site` | Your name, role, tagline, intro line, email, resume link, GitHub and LinkedIn |
| `nav` | The links in the top header |
| `skills` | Skill tags, grouped by category |
| `projects` | The project cards, in the order they appear |
| `certifications` | Certifications (the section that shows them is built in Phase 2; it stays hidden while the list is empty) |

---

## Common changes

### Change your email, links or intro

Edit the matching line inside `site`:

```ts
email: "your.email@gmail.com",
social: {
  github: "https://github.com/WillPads",
  linkedin: "https://www.linkedin.com/in/will-padilla/",
},
```

### Add your resume

Put the PDF at `public/resume.pdf`. The Resume button already points there.

### Add a skill

Add it to the right category inside `skills`, or add a new category:

```ts
{ category: "Backend", items: ["Node.js", "Express", "WebSockets", "PostgreSQL"] },
```

### Add a certification

Add an entry inside the `certifications` list:

```ts
export const certifications: Certification[] = [
  {
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    issued: "2026-09",
    credentialUrl: "https://www.credly.com/badges/...",
  },
];
```

### Add or change a project

Copy an existing project block inside `projects` and change the values. What each field means:

| Field | Meaning |
| --- | --- |
| `title` | Project name |
| `role` | What you did, e.g. "Full-stack Developer" |
| `tagline` | One line on what it is |
| `description` | 2–3 sentences: the problem, how you built it, the result |
| `stack` | Technologies used |
| `status` | `"completed"` or `"in-development"` |
| `accent` | Hover colour: `"mono"` (black) or `"blue-purple"` |
| `device` | Screenshot frame shape: `"mobile"` or `"desktop"` |
| `screenshots` | Images in `public/projects/`, each with a short description (`alt`) |
| `liveUrl` | Link the card's button opens |
| `span` | `"wide"` (two columns on big screens) or `"normal"` |

Screenshot tip: use lowercase file names without spaces, e.g. `syncspace-dashboard.png`.

---

## After editing

Run these to make sure nothing broke:

```bash
npx tsc --noEmit   # checks for typos in field names or values
npm run build      # builds the site the way Vercel will
```

If `tsc` reports an error, it names the file and line. Usually it's a misspelled field or a value
that isn't one of the allowed options (for example `status: "done"` instead of `"completed"`).

> Note: some fields will change in Phase 2–3 (for example, separate GitHub and live-demo links on
> project cards). This guide gets updated when they do.
