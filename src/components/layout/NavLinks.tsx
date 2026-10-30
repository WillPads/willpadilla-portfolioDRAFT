"use client";

import { useEffect, useState } from "react";
import { linkClass, navUnderlineClass } from "@/components/ui/styles";

type NavItem = { label: string; href: string };

// The desktop nav. The link for the section that occupies the reading area (a line 40% down the
// screen) gets a thick accent underline (and aria-current). At the top of the page, above the first
// section, nothing is marked; at the very bottom the last section is. Nothing is marked on first
// render, so server and browser markup match; the effect sets the active link right after mount.
// The line is checked on scroll (one frame at a time) instead of with an observer band, so the answer
// is always exactly one section and cannot flicker in the gaps between sections.
const READING_LINE = 0.4;

export default function NavLinks({ items }: { items: NavItem[] }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const targets = items
      .map((item) => document.getElementById(item.href.slice(item.href.indexOf("#") + 1)))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * READING_LINE;
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      let current: HTMLElement | null = null;
      if (atBottom) current = targets[targets.length - 1];
      else for (const el of targets) if (el.getBoundingClientRect().top <= line) current = el;
      setActive(current ? current.id : null);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [items]);

  return (
    <>
      {items.map((item) => (
        <a
          key={item.href}
          href={item.href}
          aria-current={active === item.href.slice(item.href.indexOf("#") + 1) ? "location" : undefined}
          className={`group aria-[current=location]:text-foreground ${linkClass}`}
        >
          <span className={navUnderlineClass}>{item.label}</span>
        </a>
      ))}
    </>
  );
}
