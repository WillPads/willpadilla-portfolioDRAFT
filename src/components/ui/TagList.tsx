import type { SimpleIcon } from "simple-icons";

// A logo shown before a chip's label. `darkFallback` swaps a near-black brand colour
// for the text colour in dark mode, the way those brands' own dark-mode logos turn white.
export type TagIcon = { icon: SimpleIcon; darkFallback?: boolean };

// A row of small non-interactive chips (tech stack, skills).
export default function TagList({
  items,
  label,
  className = "",
  fontClassByItem = {},
  iconByItem = {},
}: {
  items: string[];
  label: string;
  className?: string;
  fontClassByItem?: Partial<Record<string, string>>;
  iconByItem?: Partial<Record<string, TagIcon>>;
}) {
  if (items.length === 0) return null;

  return (
    <ul aria-label={label} className={`flex flex-wrap gap-1.5 ${className}`}>
      {items.map((item) => {
        const logo = iconByItem[item];
        return (
          <li
            key={item}
            className={`${fontClassByItem[item] ?? "font-mono"} inline-flex items-center gap-1.5 rounded-lg bg-foreground/10 px-2 py-1 text-xs leading-none text-foreground/80`}
          >
            {logo && (
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
                fill={`#${logo.icon.hex}`}
                className={`size-3.5 shrink-0 ${logo.darkFallback ? "dark:fill-foreground" : ""}`}
              >
                <path d={logo.icon.path} />
              </svg>
            )}
            {item}
          </li>
        );
      })}
    </ul>
  );
}
