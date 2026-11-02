import type { ReactNode } from "react";
import type { SimpleIcon } from "simple-icons";

// A logo shown before a chip's label: a Simple Icons logo, or `svg` for a logo drawn by hand.
// `textColour` swaps a near-black brand colour for the text colour so it shows on the dark
// background, the way those brands' own dark-mode logos turn white.
export type TagIcon = { icon: SimpleIcon; textColour?: boolean } | { svg: ReactNode };

// A row of small non-interactive chips (tech stack, skills).
export default function TagList({
  items,
  label,
  className = "",
  fontClassByItem = {},
  iconByItem = {},
  float = false,
}: {
  items: string[];
  label: string;
  className?: string;
  fontClassByItem?: Partial<Record<string, string>>;
  iconByItem?: Partial<Record<string, TagIcon>>;
  float?: boolean; // chips lift a little on hover (the Skills section)
}) {
  if (items.length === 0) return null;

  return (
    <ul aria-label={label} className={`flex flex-wrap gap-1.5 ${className}`}>
      {items.map((item) => {
        const logo = iconByItem[item];
        return (
          <li
            key={item}
            className={`${fontClassByItem[item] ?? "font-mono"} inline-flex items-center gap-1.5 rounded-lg bg-foreground/10 px-2 py-1 text-xs leading-none text-foreground/80 ${float ? "transition-[translate] duration-200 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0" : ""}`}
          >
            {logo && "svg" in logo && logo.svg}
            {logo && "icon" in logo && (
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
                fill={`#${logo.icon.hex}`}
                className={`size-3.5 shrink-0 ${logo.textColour ? "fill-foreground" : ""}`}
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
