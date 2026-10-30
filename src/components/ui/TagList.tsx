// A row of small non-interactive chips (tech stack, skills).
export default function TagList({
  items,
  label,
  className = "",
}: {
  items: string[];
  label: string;
  className?: string;
}) {
  if (items.length === 0) return null;

  return (
    <ul aria-label={label} className={`flex flex-wrap gap-1.5 ${className}`}>
      {items.map((item) => (
        <li
          key={item}
          className="rounded-md bg-foreground/10 px-2 py-1 font-mono text-[11px] leading-none text-foreground/80"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
