"use client";

import { useEffect, useRef, useState } from "react";
import { linkClass, navUnderlineClass } from "@/components/ui/styles";

type NavItem = { label: string; href: string };

// The desktop nav. The link for the section that occupies the reading area (a line 40% down the
// screen) gets a thick accent underline (and aria-current). At the top of the page, above the first
// section, nothing is marked. A short last section (Contact) can never reach the line, so at the very
// bottom of the page it wins once its top is above 70% of the screen height and About's top is above
// 25%; until then the section crossing the reading line (About) keeps the underline. Nothing is marked on first
// render, so server and browser markup match; the effect sets the active link right after mount.
// The line is checked on scroll (one frame at a time) instead of with an observer band, so the answer
// is always exactly one section and cannot flicker in the gaps between sections.
const READING_LINE = 0.4;
const BOTTOM_LINE = 0.7;
const HANDOFF_LINE = 0.25;
// Keys that scroll the page by hand. Any of them, the wheel, a touch or a press on the scrollbar ends
// the click lock below.
const SCROLL_KEYS = new Set(["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "]);

// Clicking a nav link marks that link and locks it: the smooth scroll the click causes fires scroll
// events that would otherwise walk the underline through every section on the way (or settle on a
// neighbour when the target cannot reach the reading line). The lock ends when the visitor scrolls on
// their own (wheel, touch, scroll keys, scrollbar press) or the hash changes some other way (back or
// forward); scroll events alone never end it. The next scroll or frame then recomputes as usual.

export default function NavLinks({ items }: { items: NavItem[] }) {
  const [active, setActive] = useState<string | null>(null);
  const lockRef = useRef<string | null>(null);

  const lockTo = (id: string) => {
    if (!document.getElementById(id)) return;
    lockRef.current = id;
    setActive(id);
  };

  useEffect(() => {
    const targets = items
      .map((item) => document.getElementById(item.href.slice(item.href.indexOf("#") + 1)))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      if (lockRef.current) return;
      const vh = window.innerHeight;
      const atBottom = vh + window.scrollY >= document.documentElement.scrollHeight - 2;
      const line = vh * READING_LINE;
      let current: HTMLElement | null = null;
      for (const el of targets) if (el.getBoundingClientRect().top <= line) current = el;
      // At the very bottom the last section (Contact) is short and may never reach the line. It wins
      // only when its top is above 70% of the screen and the section before it (About) has moved up
      // past 25%; while About is still being read near the line, About keeps the underline.
      const last = targets[targets.length - 1];
      const before = targets.length > 1 ? targets[targets.length - 2] : null;
      if (
        atBottom &&
        last.getBoundingClientRect().top <= vh * BOTTOM_LINE &&
        (!before || before.getBoundingClientRect().top <= vh * HANDOFF_LINE)
      )
        current = last;
      setActive(current ? current.id : null);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    const unlock = () => {
      if (!lockRef.current) return;
      lockRef.current = null;
      schedule();
    };
    const onKey = (e: KeyboardEvent) => {
      if (!SCROLL_KEYS.has(e.key) || e.altKey || e.ctrlKey || e.metaKey) return;
      const t = e.target;
      if (t instanceof HTMLElement && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      unlock();
    };
    // A press on the page's own scrollbar targets <html> beyond the content width.
    const onPointer = (e: PointerEvent) => {
      const root = document.documentElement;
      if (e.target === root && e.clientX >= root.clientWidth) unlock();
    };
    const onHash = () => {
      if (window.location.hash.slice(1) !== lockRef.current) unlock();
    };

    update();
    const opts = { passive: true } as const;
    window.addEventListener("scroll", schedule, opts);
    window.addEventListener("resize", schedule);
    window.addEventListener("wheel", unlock, opts);
    window.addEventListener("touchstart", unlock, opts);
    window.addEventListener("touchmove", unlock, opts);
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer, opts);
    window.addEventListener("hashchange", onHash);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("wheel", unlock);
      window.removeEventListener("touchstart", unlock);
      window.removeEventListener("touchmove", unlock);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("hashchange", onHash);
      lockRef.current = null;
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [items]);

  return (
    <>
      {items.map((item) => (
        <a
          key={item.href}
          href={item.href}
          onClick={(e) => {
            // Plain left clicks only (not new-tab modifiers) and only when the section is on this page.
            if (e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey)
              lockTo(item.href.slice(item.href.indexOf("#") + 1));
          }}
          aria-current={active === item.href.slice(item.href.indexOf("#") + 1) ? "location" : undefined}
          className={`group aria-[current=location]:text-foreground ${linkClass}`}
        >
          <span className={navUnderlineClass}>{item.label}</span>
        </a>
      ))}
    </>
  );
}
