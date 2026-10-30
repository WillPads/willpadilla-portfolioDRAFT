// The section title ("Projects", "Skills"): a proper headline, a real h2 so screen reader users can jump
// between sections. Sub-labels inside a section ("Certifications", "More projects") are h3s in subHeadingClass.
export default function SectionHeading({ id, title }: { id?: string; title: string }) {
  return (
    <h2 id={id} className="mb-6 text-3xl font-medium leading-tight tracking-tight text-foreground md:mb-8 md:text-4xl">
      {title}
    </h2>
  );
}
