"use client";

import { useEffect, useRef, type CSSProperties } from "react";

// Slides a block up a few pixels and fades it in, once, the first time it scrolls into view.
// `delay` (milliseconds) staggers blocks that appear together, e.g. a label then its content.
//
// The block is visible by default: in the server HTML, before JavaScript loads, and for anyone
// who prefers reduced motion. Only after mount does it hide the blocks that sit below the fold
// (data-reveal="hidden"), then show each one a single time (data-reveal="shown"). It never
// fades back out. The state lives in a data attribute instead of React state, so the first
// render is identical on the server and in the browser.
export default function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return; // already on screen or above it

    el.setAttribute("data-reveal", "hidden");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.setAttribute("data-reveal", "shown");
        observer.disconnect();
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // The delay only applies on the way in ("shown"), so hiding a block on mount is never delayed.
  return (
    <div
      ref={ref}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
      className={`transition-[opacity,translate] duration-700 ease-out data-[reveal=hidden]:translate-y-3 data-[reveal=hidden]:opacity-0 data-[reveal=shown]:[transition-delay:var(--reveal-delay)] motion-reduce:transition-none motion-reduce:data-[reveal=hidden]:translate-y-0 motion-reduce:data-[reveal=hidden]:opacity-100 ${className}`}
    >
      {children}
    </div>
  );
}
