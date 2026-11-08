import type { CSSProperties } from "react";

// The page background: a dot grid (see .page-dots in globals.css) with six outlined
// shapes drifting slowly over it. One fixed, clipped, click-through layer behind the
// content. Flat 1.5px strokes at low opacity (24% in light, 19% in dark), moved with `transform` only (see .drift), and
// fully still under prefers-reduced-motion. Decorative, so hidden from assistive tech.
//
// The shapes begin in the side margins outside the content container (90% wide, max 1280px).
// Smaller shapes appear from md; the 160px circle waits until lg. Phones get their own small set. Their slow inward drift passes
// behind content, while this fixed click-through layer stays behind all text and controls.
const shapes = [
  { kind: "circle", side: "left", size: 160, top: 12, time: 50, delay: 0, y: 24, rot: 0 },
  { kind: "square", side: "right", size: 112, top: 10, time: 61, delay: -30, y: 28, rot: 30 },
  { kind: "plus", side: "right", size: 112, top: 62, time: 56, delay: -50, y: -24, rot: 90 },
  { kind: "circle", side: "left", size: 96, top: 74, time: 67, delay: -70, y: -28, rot: 0 },
  { kind: "plus", side: "left", size: 68, top: 42, time: 78, delay: -15, y: 6, rot: 0 },
  { kind: "circle", side: "right", size: 72, top: 34, time: 86, delay: -40, y: -8, rot: 0 },
] as const;

// Phones have no side margins (the content is full width), so a few smaller shapes sit half off the
// screen edges and drift a little inward at low opacity, mostly behind the gutters. They are hidden
// from md, where the margin shapes above take over.
const phoneShapes = [
  { kind: "circle", side: "right", size: 84, top: 11, time: 40, delay: 0, y: 14, rot: 0 },
  { kind: "plus", side: "left", size: 64, top: 34, time: 46, delay: -18, y: -10, rot: 90 },
  { kind: "square", side: "right", size: 72, top: 58, time: 52, delay: -30, y: 12, rot: 30 },
  { kind: "circle", side: "left", size: 56, top: 80, time: 44, delay: -9, y: -12, rot: 0 },
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
      {phoneShapes.map((shape) => (
        <div
          key={`m-${shape.kind}-${shape.side}-${shape.top}`}
          className="drift absolute text-foreground/25 md:hidden"
          style={
            {
              [shape.side]: `${-shape.size * 0.45}px`,
              top: `${shape.top}%`,
              "--drift-time": `${shape.time}s`,
              "--drift-delay": `${shape.delay}s`,
              "--drift-x": `${(shape.side === "left" ? 1 : -1) * Math.round(shape.size * 0.7)}px`,
              "--drift-y": `${shape.y}vh`,
              "--drift-rot": `${shape.rot + 40}deg`,
            } as CSSProperties
          }
        >
          <Shape kind={shape.kind} size={shape.size} />
        </div>
      ))}
      {shapes.map((shape) => (
        <div
          key={`${shape.kind}-${shape.side}-${shape.top}`}
          className={`drift absolute hidden text-foreground/19 ${
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
