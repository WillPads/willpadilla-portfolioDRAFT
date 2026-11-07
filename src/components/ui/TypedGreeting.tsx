import type { CSSProperties } from "react";

// Types `text` out once on page load, one character at a time, with a thin cursor that follows
// the last character and blinks a few times at the end (.type-char in globals.css).
// Pure CSS, rendered on the server: every character is in the HTML from the start and only its
// visibility is animated, so the layout never shifts, nothing depends on JavaScript, and reduced
// motion shows the full line at once. Screen readers get the plain sentence (sr-only), not letters.
export default function TypedGreeting({ text, emphasis }: { text: string; emphasis?: string }) {
  const chars = Array.from(text);
  const at = emphasis ? text.indexOf(emphasis) : -1;
  const emStart = at < 0 ? -1 : Array.from(text.slice(0, at)).length;
  const emEnd = at < 0 ? -1 : emStart + Array.from(emphasis ?? "").length;

  // The space after the first comma becomes a line break, so the greeting always reads
  // "Hello World," / "I'm Will!" however wide the screen is.
  const breakAt = text.indexOf(", ") + 1;
  const charSpan = (char: string, i: number) =>
    breakAt > 0 && i === breakAt ? (
      <br key={i} />
    ) : (
    <span
      key={i}
      className="type-char"
      data-last={i === chars.length - 1 ? "" : undefined}
      style={{ "--i": i } as CSSProperties}
    >
      {char}
    </span>
    );

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {chars.slice(0, emStart < 0 ? chars.length : emStart).map((c, i) => charSpan(c, i))}
        {emStart >= 0 && (
          <em className="not-italic text-accent">{chars.slice(emStart, emEnd).map((c, i) => charSpan(c, emStart + i))}</em>
        )}
        {emStart >= 0 && chars.slice(emEnd).map((c, i) => charSpan(c, emEnd + i))}
      </span>
    </>
  );
}
