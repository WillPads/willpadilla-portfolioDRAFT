import type { CSSProperties } from "react";

// The page background: a dot grid (see .page-dots in globals.css) with four outlined
// shapes drifting very slowly over it. One fixed, clipped, click-through layer behind the
// content. Flat 1.5px strokes at low opacity (20% in light, 15% in dark), moved with `transform` only (see .drift), and
// fully still under prefers-reduced-motion. Decorative, so hidden from assistive tech.
//
// The shapes live only in the side margins outside the content container (90% wide, max
// 1280px), so they never pass behind text. They drift up and down, not sideways, and are
// hidden below lg, where the margins are too narrow to hold them. Sizes are 29-42px (the square only turns 30 degrees): even rotated, the
// biggest fits the 51px margin at 1024px wide.
const shapes = [
  { kind: "circle", side: "left", size: 42, top: 14, time: 90, delay: 0, y: 30, rot: 0 },
  { kind: "square", side: "right", size: 36, top: 10, time: 110, delay: -30, y: 35, rot: 30 },
  { kind: "plus", side: "right", size: 36, top: 62, time: 100, delay: -50, y: -30, rot: 90 },
  { kind: "circle", side: "left", size: 29, top: 72, time: 120, delay: -70, y: -35, rot: 0 },
] as const;

// Centre of a side margin: half of (viewport - container) / 2, minus half the shape.
const marginCentre = (size: number) => `calc((100vw - min(90vw, 1280px)) / 4 - ${size / 2}px)`;

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
          className="drift absolute hidden text-foreground/20 dark:text-foreground/15 lg:block"
          style={
            {
              [shape.side]: marginCentre(shape.size),
              top: `${shape.top}%`,
              "--drift-time": `${shape.time}s`,
              "--drift-delay": `${shape.delay}s`,
              "--drift-x": "0px",
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
