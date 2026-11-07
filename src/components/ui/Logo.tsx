// The "W_" mark: a sharp geometric W followed by a terminal cursor in the accent colour, like a
// prompt waiting for input. The same drawing is used for the favicons in src/app (icon.svg and
// the PNG/ICO files rendered from it). In the header the cursor blinks three times on load, then
// stays solid (.logo-cursor in globals.css); reduced motion keeps it still.
export default function Logo({ className = "h-6 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 32" aria-hidden="true" focusable="false" className={className}>
      <path
        d="M3 5 10.5 27 18 11.5 25.5 27 33 5"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinejoin="miter"
        strokeMiterlimit="10"
      />
      <rect className="logo-cursor" x="37" y="25.5" width="10" height="5" fill="var(--accent)" />
    </svg>
  );
}
