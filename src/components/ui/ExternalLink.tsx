import { ArrowUpRight } from "lucide-react";

// A link that opens in a new tab. The hidden text tells screen reader users that it does.
// Set `arrow={false}` for links that carry their own icon (GitHub, LinkedIn).
export default function ExternalLink({
  href,
  className,
  children,
  arrow = true,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
  arrow?: boolean;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      {arrow && <ArrowUpRight aria-hidden="true" className="size-4 shrink-0" />}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
