// Shared class strings so every button and link behaves the same way.
// Hover and keyboard focus look alike: a 5% fill (or a darker solid) plus, for focus, an outline.
// Every control is at least 44px tall (min-h-11). Motion is switched off for reduced-motion users.
// Muted text is always text-foreground/65 (6.9:1 in light, 7.9:1 in dark), never a lower opacity.

// The one wide container the header, every section and the footer share: full width with px-4
// on phones, 90% of the viewport (up to 1280px) from md up.
export const containerClass = "mx-auto w-full max-w-[1280px] px-4 md:w-[90%] md:px-0";

// Readable line length for long paragraphs.
export const proseClass = "max-w-[65ch]";

// Vertical rhythm between sections.
export const sectionGapClass = "mt-16 md:mt-24";

const motion =
  "transition-[background-color,border-color,color,scale] duration-300 hover:scale-105 motion-reduce:transition-none motion-reduce:hover:scale-100";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground";

// Small mono link row for the header nav and the footer.
export const linkClass = `inline-flex min-h-11 items-center rounded-lg px-3 font-mono text-[13px] text-foreground/65 hover:bg-foreground/5 hover:text-foreground focus-visible:bg-foreground/5 focus-visible:text-foreground ${motion} ${focusRing}`;

// Header nav link that marks the section currently in view with a thick accent underline.
export const navLinkClass = `${linkClass} aria-[current=location]:text-foreground`;
export const navUnderlineClass =
  "underline decoration-transparent decoration-[3px] underline-offset-[6px] group-aria-[current=location]:decoration-accent";

const pillBase =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-2.5 text-center text-sm font-medium leading-tight";

// The one primary action: a solid accent pill (text on it is 7.7:1 light, 9.1:1 dark).
export const pillClass = `${pillBase} bg-accent text-accent-foreground ${motion} ${focusRing}`;

// Same pill with long text such as the email address (wraps instead of overflowing).
export const pillWrapClass = `${pillClass} [overflow-wrap:anywhere]`;

// Secondary pill: an outline.
export const pillQuietClass = `${pillBase} border border-foreground/25 text-foreground hover:bg-foreground/5 focus-visible:bg-foreground/5 ${motion} ${focusRing}`;

// "Download Resume": small mono link, tinted accent fill, 2px accent bottom border.
export const resumeLinkClass = `inline-flex min-h-11 items-center gap-2 rounded-t-md border-b-2 border-accent bg-accent/10 px-3.5 font-mono text-[13px] text-foreground hover:bg-accent/15 focus-visible:bg-accent/15 ${motion} ${focusRing}`;

// Small outlined mono button for secondary links (Source, Live site).
export const buttonClass = `inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-foreground/20 px-4 py-2 text-center font-mono text-[13px] leading-tight text-foreground hover:bg-foreground/5 focus-visible:bg-foreground/5 ${motion} ${focusRing}`;

// Round icon-only button (theme toggle, menu, carousel arrows, social icons).
export const iconButtonClass = `inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-foreground/20 text-foreground hover:bg-foreground/5 focus-visible:bg-foreground/5 aria-disabled:cursor-default aria-disabled:opacity-40 aria-disabled:hover:scale-100 aria-disabled:hover:bg-transparent ${motion} ${focusRing}`;

// Same, without the border, for the quiet footer icons.
export const iconLinkClass = `inline-flex size-11 shrink-0 items-center justify-center rounded-full text-foreground/65 hover:bg-foreground/5 hover:text-foreground focus-visible:bg-foreground/5 focus-visible:text-foreground ${motion} ${focusRing}`;

export const copiedNoticeClass =
  "pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-foreground/10 bg-background px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-foreground transition-[opacity,translate] duration-700 ease-out motion-reduce:transition-none";

// Sub-heading inside a section (an h3 such as "Certifications" or "More projects"): one step below the
// section title (text-3xl / md:text-4xl, see SectionHeading).
export const subHeadingClass = "mb-4 text-[22px] font-medium leading-tight tracking-tight text-foreground md:text-[26px]";

// Row that picks up a faint fill on hover (experience, certifications, skills).
export const rowClass = "-mx-3 rounded-lg px-3 py-5 hover:bg-foreground/5 transition-colors duration-300 motion-reduce:transition-none";
