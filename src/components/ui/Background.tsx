import type { CSSProperties } from "react";

// The page background: a dot grid (see .page-dots in globals.css) with six outlined
// shapes drifting very slowly over it. One fixed, clipped, click-through layer behind the
// content. Flat 1.5px strokes at low opacity (24% in light, 19% in dark), moved with `transform` only (see .drift), and
// fully still under prefers-reduced-motion. Decorative, so hidden from assistive tech.
//
// The shapes begin in the side margins outside the content container (90% wide, max 1280px).
// Smaller shapes appear from md; the 160px circle waits until lg. Their slow inward drift passes
// behind content, while this fixed click-through layer stays behind all text and controls.
const shapes = [
  { kind: "circle", side: "left", size: 160, top: 12, time: 90, delay: 0, y: 24, rot: 0 },
  { kind: "square", side: "right", size: 112, top: 10, time: 110, delay: -30, y: 28, rot: 30 },
  { kind: "plus", side: "right", size: 112, top: 62, time: 100, delay: -50, y: -24, rot: 90 },
  { kind: "circle", side: "left", size: 96, top: 74, time: 120, delay: -70, y: -28, rot: 0 },
  { kind: "plus", side: "left", size: 68, top: 42, time: 140, delay: -15, y: 6, rot: 0 },
  { kind: "circle", side: "right", size: 72, top: 34, time: 155, delay: -40, y: -8, rot: 0 },
] as const;

// Centre of a side margin: half of (viewport - container) / 2, minus half the shape.
const marginCentre = (size: number) => `calc((100vw - min(90vw, 1280px)) / 4 - ${size / 2}px)`;
const inwardDrift = (side: (typeof shapes)[number]["side"], size: number) =>
  side === "left"
    ? `calc((100vw - min(90vw, 1280px)) / 4 - ${size / 2}px + 5vw)`
    : `calc(${size / 2}px - (100vw - min(90vw, 1280px)) / 4 - 5vw)`;

function Shape({ kind, size }: { kind: (typeof shapes)[number]["kind"]; size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      {kind === "circle" && <circle cx="20" cy="20" r="18" />}
      {kind === "square" && <rect x="3" y="3" width="34" height="34" rx="2" />}
      {kind === "plus" && <path d="M20 4v32M4 20h32" />}
    </svg>
  );
}

export default function Background() {
  return (
    <div aria-hidden="true" className="page-dots pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {shapes.map((shape) => (
        <div
          key={`${shape.kind}-${shape.side}-${shape.top}`}
          className={`drift absolute hidden text-foreground/24 dark:text-foreground/19 ${
            shape.size === 160 ? "lg:block" : "md:block"
          } ${shape.size === 112 ? "md:max-lg:scale-[0.65]" : ""}`}
          style={
            {
              [shape.side]: marginCentre(shape.size),
              top: `${shape.top}%`,
              "--drift-time": `${shape.time}s`,
              "--drift-delay": `${shape.delay}s`,
              "--drift-x": inwardDrift(shape.side, shape.size),
              "--drift-y": `${shape.y}vh`,
              "--drift-rot": `${shape.rot}deg`,
            } as CSSProperties
          }
        >
          <Shape kind={shape.kind} size={shape.size} />
        </div>
      ))}
    </div>
  );
}
