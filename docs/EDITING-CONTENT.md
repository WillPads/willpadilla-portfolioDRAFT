# How to Edit the Portfolio's Content

Everything the site shows (name, links, skills, projects, certifications) lives in one file:

**`src/data/portfolio.ts`**

You never need to touch the components to change text. Edit the file, save, and the page updates
(run `npm run dev` and open <http://localhost:3000> to see it).

Last updated: 2026-10-30 (Phase 2).

**The golden rule:** if an optional field is left out, the part of the page that uses it simply does not
appear. Nothing says "replace this" on the live site. All the examples below use fake values such as
"Project Name". Replace them with real ones.

---

## The sections of the file

| Section in the file | What it controls |
| --- | --- |
| `site` | Name, role, tagline, intro, email, resume link, location, GitHub and LinkedIn, plus the optional `lookingFor`, `bio` and `avatar` |
| `experience` | Internships, org roles, freelance work (hidden while empty) |
| `nav` | The links in the top bar, in page order: Projects, Skills, Experience, About, Contact (keep this order in step with `src/app/page.tsx`) |
| `skills` | Skill tags, grouped by category |
| `featuredProjects` | The turntable carousel at the top of Work (detailed projects) |
| `moreProjects` | The compact "More projects" list under it |
| `certifications` | The certifications block (hidden while the list is empty) |

---

## Site fields

| Field | Required? | What it does | When it is left unset |
| --- | --- | --- | --- |
| `name` | Yes | Header wordmark, the hero name (the page's h1), footer | n/a |
| `role` | Yes | The line under the name in the hero | n/a |
| `tagline` | Yes | The big headline in the hero, under the name and role | n/a |
| `intro` | Yes | Short paragraph under the role | n/a |
| `email` | Yes | Every "Email" button | n/a |
| `resume` | Yes | Where the Resume buttons point (`/resume.pdf`) | n/a |
| `location` | Yes | Footer and the About facts | n/a |
| `social.github`, `social.linkedin` | Yes | GitHub and LinkedIn buttons (hero, Contact, footer) | n/a |
| `lookingFor` | No | A "Looking for: ..." line in the hero | The line is hidden |
| `avatar` | No | A round photo on the right of the hero, level with the name (176px from 768px, 224px from 1024px, 64px beside the name on phones; use at least 448x448px) | Nothing is shown: no placeholder, no initials |
| `bio` | No | The About section text | The About section **and** its "About" nav link are hidden |

Copy-paste example (add these lines inside `site`):

```ts
lookingFor: "Job Title You Want",
bio: "Two or three short sentences about who you are and what you build.",
```

The About section shows only the bio. `location` appears only in the footer ("Based in ...").

### Add your avatar photo

1. Save a square photo (at least 320x320px) in `public/`, lowercase with no spaces, e.g. `public/avatar.jpg`.
2. Add one line inside `site`:

```ts
avatar: "/avatar.jpg",
```

It shows as a 48px circle in the header. Remove the line and it disappears.

### Change your email, links or intro

Edit the matching line inside `site`:

```ts
email: "name@example.com",
social: {
  github: "https://github.com/your-username",
  linkedin: "https://www.linkedin.com/in/your-name/",
},
```

### Add your resume

Put the PDF at `public/resume.pdf`. The Resume buttons already point there and open it in a new tab.
Until the file exists, the button leads to a "not found" page.

### Add a skill

Add it to the right category inside `skills`, or add a new category:

```ts
{ category: "Category Name", items: ["Skill One", "Skill Two"] },
```

---

## Projects: featured or listed?

Every project goes in exactly one of two lists, so nothing is left off the page.

| List | Where it shows | What it needs |
| --- | --- | --- |
| `featuredProjects` | The turntable carousel. A "View project" button opens a detail panel with the description, screenshots and demo | The basic fields **plus** `description`, `device` and `screenshots` |
| `moreProjects` | A compact list under the carousel | Only the basic fields. The "More projects" heading stays hidden while the list is empty |

The order in the list is the order on the page.

### Basic fields (every project)

| Field | Meaning |
| --- | --- |
| `slug` | Short id: lowercase, no spaces, unique (e.g. `"project-name"`) |
| `title` | Project name |
| `role` | What you did, e.g. "Full-stack Developer" |
| `tagline` | One line on what it is |
| `stack` | Technologies used, shown as tags |
| `status` | One of the three status values below |

### Status values

One scale, used everywhere. The badge looks the same in the carousel, the panel and the list.

| `status` value | Badge label | Use it when |
| --- | --- | --- |
| `"live"` | Live | Deployed with a public URL (also set `liveUrl`) |
| `"prototype"` | Prototype | A working build, but not deployed |
| `"in-development"` | In Development | Still being built |

### Optional fields

| Field | What it shows | When it is left out |
| --- | --- | --- |
| `repoUrl` | A "Source" button to the public code | No Source button |
| `liveUrl` | A "Live site" button to the deployed site | No Live site button |
| `year` | The year, e.g. `"2026"` | Hidden |
| `context` | Where it came from, e.g. `"Thesis"` or `"Course project"` | Hidden |
| `impact` | One measurable result | Hidden |
| `demoVideo` | A video player in the detail panel (featured projects only) | No player |
| `description` | A paragraph in the detail panel (required for featured projects) | Not shown for listed projects |

**The "Links coming soon" rule:** if a project has none of `repoUrl`, `liveUrl` or `demoVideo`, the site shows
"Links coming soon" in its place. Add any one of them and that text goes away.

### Add a featured project (turntable)

Add this block inside `featuredProjects`:

```ts
{
  slug: "project-name",
  title: "Project Name",
  role: "Your Role",
  tagline: "One line about what it is.",
  description: "Two or three sentences: the problem, how you built it, the result.",
  stack: ["Tech One", "Tech Two"],
  status: "in-development", // "live", "prototype" or "in-development"
  year: "2026",
  context: "Course project",
  impact: "One measurable result.",
  repoUrl: "https://github.com/your-username/project-name",
  liveUrl: "https://project-name.example.com",
  device: "desktop", // "mobile" or "desktop": the shape of the screenshot frames
  screenshots: [], // use [] until you have images; see below
},
```

### Add a listed project (More projects)

Add this block inside `moreProjects`:

```ts
{
  slug: "project-name",
  title: "Project Name",
  role: "Your Role",
  tagline: "One line about what it is.",
  stack: ["Tech One", "Tech Two"],
  status: "prototype",
  repoUrl: "https://github.com/your-username/project-name",
},
```

### Move a project between the lists

1. Cut the whole `{ ... },` block from one list and paste it into the other.
2. Moving **up to featured:** add the extra fields `description`, `device` and `screenshots`.
3. Moving **down to More projects:** delete `description`, `device`, `screenshots` and `demoVideo`.
   Extra fields are a type error in the listed projects.
4. Run `npx tsc --noEmit`. It names anything missing or extra.

### Add a screenshot

1. Put the image file in `public/projects/`. Use a **lowercase name with no spaces**, e.g.
   `project-name-home.png`. Windows ignores case, but the live site (Linux) does not, so
   `Project Name.PNG` would break there.
2. Add an entry to the project's `screenshots` list. `alt` describes the screen for people who can't see it.

```ts
screenshots: [
  { src: "/projects/project-name-home.png", alt: "Project Name home screen" },
],
```

Screenshots load only after a visitor clicks "View project".

### Add a demo video

Add `demoVideo` to a featured project. `src` is a file inside `public/` or a full URL. `poster` (a still
image shown before play) and `caption` (one line under the player) are optional. The video **never
autoplays** and loads only after "View project" is clicked.

```ts
demoVideo: {
  src: "/projects/project-name-demo.mp4",
  poster: "/projects/project-name-poster.png",
  caption: "A short caption describing the demo.",
},
```

---

## Add experience

Add an entry inside the `experience` list, newest first. The Experience section and its nav link appear once
the list has one entry. `url` (makes the organisation a link) and `logo` (a square image in `public/`) are optional.

```ts
export const experience: Experience[] = [
  {
    org: "Organisation Name",
    role: "Your Role",
    start: "Jun 2026",
    end: "Present", // or e.g. "Aug 2026"
    url: "https://example.com", // optional
    logo: "/experience/org-name.png", // optional, square
  },
];
```

---

## Add a certification

Add an entry inside the `certifications` list. The block appears once the list has one entry.

```ts
export const certifications: Certification[] = [
  {
    name: "Certification Name",
    issuer: "Issuing Organization",
    issued: "2026-01", // year-month
    credentialId: "ABC-123", // optional
  },
];
```

---

## After editing

Run these to make sure nothing broke:

```bash
npx tsc --noEmit   # checks for typos in field names or values
npm run build      # builds the site the way Vercel will
```

If `tsc` reports an error, it names the file and line. Usually it's a misspelled field or a value
that isn't one of the allowed options (for example `status: "done"` instead of `"prototype"`).

## Case study pages

A featured project can have its own page at `/projects/<slug>` (the `slug` field in `portfolio.ts`, e.g.
`/projects/syncspace`). **The page appears only when `caseStudy` is set on that project.** Without it nothing
changes: no page, no link, and the address returns a 404. When it is set, the project's detail panel shows a
"Read case study" button, and the page links to the previous and next case study (only among projects that
have one).

Add `caseStudy` to the project in `featuredProjects`. The shape (replace every bracketed slot with Will's own
words; leave out any optional field you have nothing for, and the page skips it):

```ts
caseStudy: {
  summary: "[One paragraph: what the project is and what it achieved.]",
  cover: {                                   // optional: wide image under the title
    src: "/projects/project-name/cover.jpg",
    alt: "[Describe the image for people who cannot see it]",
    width: 1600,                             // optional: set width AND height, or neither (16:10 frame)
    height: 1000,
  },
  facts: [                                   // small label/value pairs in a 2-column grid
    { label: "Duration", value: "[e.g. 3 months]" },
    { label: "Role", value: "[Will's role]" },
    { label: "Team", value: "[Who worked on it]" },
  ],
  sections: [                                // shown in this order
    {
      title: "Overview",                     // small uppercase label
      paragraphs: ["[Paragraph one.]", "[Paragraph two.]"],
    },
    {
      title: "The problem",
      paragraphs: ["[What problem did users have?]"],
      images: [{ src: "/projects/project-name/problem.jpg", alt: "[Describe the image]" }],
    },
    {
      title: "The process",
      paragraphs: ["[How did you approach it?]"],
      steps: [                               // sub-steps with an accent-coloured heading
        {
          title: "[Step name]",
          paragraphs: ["[What happened in this step?]"],
          images: [                          // one or two per step
            { src: "/projects/project-name/step-1.jpg", alt: "[Describe the image]" },
          ],
        },
      ],
    },
    {
      title: "Demo",
      paragraphs: ["[Short intro to the video.]"],
      showDemoVideo: true,                   // shows this project's demoVideo; never autoplays
    },
    { title: "Outcome", paragraphs: ["[What was the result?]"] },
  ],
  takeaways: ["[What did you learn?]", "[What would you do differently?]"],   // optional bullet list
},
```

Field reference:

- `summary` (required): the paragraph under the title. It is also the page's description for search results.
- `cover` (optional): one image shown full width under the header.
- `facts` (required, can be `[]`): label and value pairs. Use any labels you like.
- `sections` (required): each has a `title` and `paragraphs` (required), plus optional `images`, `steps` and
  `showDemoVideo`. Use as many or as few sections as the story needs.
- `steps` (optional, inside a section): each has a `title`, `paragraphs` and optional `images`.
- `showDemoVideo` (optional): shows the project's existing `demoVideo` inside that section. It does nothing if
  the project has no `demoVideo`.
- `takeaways` (optional): a short bullet list at the end.
- Every image is `{ src, alt }`. `alt` is required. `width` and `height` are optional.

Where images go: put the files in `public/projects/<slug>/` (the same folder as the screenshots) with lowercase
names and no spaces, then use `/projects/<slug>/file.jpg` as the `src`. Images load lazily, so a long page
stays light. Run `npx tsc --noEmit` afterwards; it names anything missing.
