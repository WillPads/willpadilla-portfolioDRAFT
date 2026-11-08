"use client";

import { Check, Copy, Mail } from "lucide-react";
import { siGmail } from "simple-icons";
import { useEffect, useId, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { site } from "@/data/portfolio";

// The email address as one control. Without JavaScript it is a plain mailto: link. With JavaScript a
// click opens a small menu instead, because many visitors have no mail app set for mailto: links
// (the click would do nothing). The menu offers Gmail and Outlook in a new tab, the default mail app
// (the same mailto: link) and a copy button.
// It is a disclosure: the trigger has aria-expanded and aria-controls, Escape, a click outside or
// choosing an item closes it, and focus goes to the first item on open and back to the trigger on close.
const itemClass =
  "flex min-h-11 w-full items-center gap-2.5 rounded-lg bg-foreground/10 px-3 text-left font-mono text-[13px] text-foreground/80 hover:bg-foreground/15 hover:text-foreground focus-visible:bg-foreground/15 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-foreground";

// Simple Icons has no Outlook (Microsoft marks were removed), so this is a small hand-drawn
// approximation of the Outlook mark: a blue envelope sheet with a darker "O" tile on the left.
function OutlookMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="size-4 shrink-0">
      <rect x="8" y="4" width="15" height="16" rx="2" fill="#28A8EA" />
      <path d="M8.5 6.5 15.5 12l7-5.5" fill="none" stroke="#fff" strokeWidth="1.4" strokeLinejoin="round" />
      <rect x="1" y="6.5" width="13" height="11" rx="2" fill="#0364B8" />
      <circle cx="7.5" cy="12" r="2.9" fill="none" stroke="#fff" strokeWidth="1.8" />
    </svg>
  );
}

export default function EmailActions({
  linkClassName,
  align = "start",
  label = `Send an email to ${site.email}`,
  children,
}: {
  linkClassName: string;
  align?: "start" | "end"; // which edge of the trigger the menu lines up with by default
  label?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [up, setUp] = useState(false);
  const [flip, setFlip] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLAnchorElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const timer = useRef<number | undefined>(undefined);
  const menuId = useId();
  const to = encodeURIComponent(site.email);

  function close(returnFocus = true) {
    setOpen(false);
    window.clearTimeout(timer.current);
    setCopied(false);
    if (returnFocus) triggerRef.current?.focus({ preventScroll: true });
  }

  // Pick the side with room: open upward near the bottom of the screen, and line up with the
  // other edge when the menu would run off the side.
  useLayoutEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current?.getBoundingClientRect();
    const menu = menuRef.current?.getBoundingClientRect();
    if (!trigger || !menu) return;
    setUp(window.innerHeight - trigger.bottom < menu.height + 16 && trigger.top > menu.height + 16);
    const startFits = trigger.left + menu.width <= window.innerWidth - 8;
    const endFits = trigger.right - menu.width >= 8;
    setFlip(align === "start" ? !startFits && endFits : !endFits && startFits);
  }, [open, align]);

  useEffect(() => {
    if (!open) return;
    menuRef.current?.querySelector<HTMLElement>("a, button")?.focus({ preventScroll: true });

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
      }
    }
    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) close(false);
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => close(), 1100);
    } catch {
      close();
    }
  }

  const rightEdge = (align === "end") !== flip;

  return (
    <div
      ref={rootRef}
      className="relative max-w-full min-w-0"
      onBlur={(event) => {
        if (open && !rootRef.current?.contains(event.relatedTarget as Node | null) && event.relatedTarget) close(false);
      }}
    >
      <a
        ref={triggerRef}
        href={`mailto:${site.email}`}
        aria-label={label}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={(event) => {
          event.preventDefault();
          if (open) close();
          else setOpen(true);
        }}
        className={`min-w-0 ${linkClassName}`}
      >
        {children}
      </a>

      <div
        ref={menuRef}
        id={menuId}
        hidden={!open}
        className={`absolute z-50 w-52 max-w-[calc(100vw-2rem)] rounded-lg border border-foreground/15 bg-background p-1.5 ${up ? "bottom-full mb-2" : "top-full mt-2"} ${rightEdge ? "right-0" : "left-0"}`}
      >
        <ul className="flex flex-col gap-1.5">
          <li>
            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${to}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => close(false)}
              className={itemClass}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill={`#${siGmail.hex}`} className="size-4 shrink-0">
                <path d={siGmail.path} />
              </svg>
              Gmail
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </li>
          <li>
            <a
              href={`https://outlook.live.com/mail/0/deeplink/compose?to=${to}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => close(false)}
              className={itemClass}
            >
              <OutlookMark />
              Outlook
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </li>
          <li>
            <a href={`mailto:${site.email}`} onClick={() => close(false)} className={itemClass}>
              <Mail aria-hidden="true" className="size-4 shrink-0" />
              Default mail app
            </a>
          </li>
          <li>
            <button type="button" onClick={copy} className={itemClass}>
              {copied ? <Check aria-hidden="true" className="size-4 shrink-0" /> : <Copy aria-hidden="true" className="size-4 shrink-0" />}
              <span role="status" aria-live="polite">
                {copied ? "Copied" : "Copy address"}
              </span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
