// A small plain section label ("Projects", "Skills"), not a big headline. Still a real h2 so
// screen reader users can jump between sections.
export default function SectionHeading({ id, title }: { id?: string; title: string }) {
  return (
    <h2 id={id} className="mb-4 text-sm font-medium text-foreground/65">
      {title}
    </h2>
  );
}
