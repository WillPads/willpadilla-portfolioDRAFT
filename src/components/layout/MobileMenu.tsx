"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import ExternalLink from "@/components/ui/ExternalLink";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { containerClass, iconButtonClass, resumeLinkClass } from "@/components/ui/styles";

type NavItem = { label: string; href: string };

// Phone navigation: a disclosure (not a modal). The panel follows the button in the DOM, so Tab
// walks into it in order. Escape, a link tap or a click outside closes it.
export default function MobileMenu({ items, resume }: { items: NavItem[]; resume: string }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    }

    function onPointerDown(event: PointerEvent) {
      const root = rootRef.current;
      if (!root || root.contains(event.target as Node)) return;
      setOpen(false);
    }

    // The menu is hidden from 768px up, so close it if the window grows past that.
    const wide = window.matchMedia("(min-width: 768px)");
    function onWide() {
      if (wide.matches) setOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    wide.addEventListener("change", onWide);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      wide.removeEventListener("change", onWide);
    };
  }, [open]);

  function onLinkClick() {
    setOpen(false);
    // The browser's jump to the section clears focus, so hand it back to the menu button afterwards.
    setTimeout(() => buttonRef.current?.focus({ preventScroll: true }), 0);
  }

  return (
    <div ref={rootRef} className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label="Main menu"
        onClick={() => setOpen((value) => !value)}
        className={iconButtonClass}
      >
        {open ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
      </button>

      <div
        id="mobile-menu"
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-foreground/10 bg-background"
      >
        <nav aria-label="Main (mobile)" className={`${containerClass} flex flex-col pt-2 pb-4`}>
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={onLinkClick}
              className="flex min-h-12 items-center rounded-lg px-3 font-mono text-sm text-foreground/80 hover:bg-foreground/5 hover:text-foreground focus-visible:bg-foreground/5 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-foreground"
            >
              {item.label}
            </a>
          ))}
          <div className="mt-2 flex items-center justify-between gap-3 px-3">
            <ExternalLink href={resume} className={resumeLinkClass}>
              Resume
            </ExternalLink>
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </div>
  );
}
