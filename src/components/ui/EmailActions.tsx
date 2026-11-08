"use client";

import { Check, Copy, Mail } from "lucide-react";
import { siGmail } from "simple-icons";
import { useEffect, useId, useLayoutEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { site } from "@/data/portfolio";

// The email address as one control. Without JavaScript it is a plain mailto: link. With JavaScript a
// click opens a small menu instead, because many visitors have no mail app set for mailto: links
// (the click would do nothing). The menu offers Gmail and Outlook in a new tab, the default mail app
// (the same mailto: link) and a copy button.
// It is a disclosure: the trigger has aria-expanded and aria-controls, Escape, a click outside or
// choosing an item closes it. Opened from the keyboard, focus goes to the first item, and back to
// the trigger on close.
// The menu is rendered at the end of <body> (a portal) with fixed positioning taken from the trigger,
// so no section around the button can cover it or catch its taps. Inside the hero and Contact, the
// slide-up / reveal animations and the moving belt below create layers that phone browsers (Safari
// above all) could paint over an in-place menu, so taps on its options went nowhere. Every email
// button (hero, Contact, footer icon) now uses the exact same top-level menu.
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

const subscribeNothing = () => () => {};

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
  const [position, setPosition] = useState<CSSProperties>({ visibility: "hidden" });
  // True in the browser, false while rendering on the server (the portal needs document.body).
  const mounted = useSyncExternalStore(subscribeNothing, () => true, () => false);
  const openedByKeyboard = useRef(false);
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

  // Place the menu next to the trigger, in viewport coordinates: below it when there is room, else
  // above; lined up with the trigger's start (or end) edge, kept 8px inside the screen. Re-measured
  // while the page scrolls or resizes so the menu stays attached to its button.
  useLayoutEffect(() => {
    if (!open) return;
    function place() {
      const trigger = triggerRef.current?.getBoundingClientRect();
      const menu = menuRef.current;
      if (!trigger || !menu) return;
      const width = menu.offsetWidth;
      const height = menu.offsetHeight;
      const below = window.innerHeight - trigger.bottom >= height + 16 || trigger.top < height + 16;
      const top = below ? trigger.bottom + 8 : trigger.top - height - 8;
      const preferred = align === "end" ? trigger.right - width : trigger.left;
      const left = Math.min(Math.max(preferred, 8), window.innerWidth - width - 8);
      setPosition({ top, left });
    }
    place();
    window.addEventListener("scroll", place, { passive: true });
    window.addEventListener("resize", place);
    return () => {
      window.removeEventListener("scroll", place);
      window.removeEventListener("resize", place);
    };
  }, [open, align]);

  useEffect(() => {
    if (!open) return;
    if (openedByKeyboard.current) menuRef.current?.querySelector<HTMLElement>("a, button")?.focus({ preventScroll: true });

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
      }
    }
    function onPointerDown(event: PointerEvent) {
      const target = event.target as Node;
      if (!rootRef.current?.contains(target) && !menuRef.current?.contains(target)) close(false);
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
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(site.email);
      } else {
        // The Clipboard API only exists on https (and localhost). On plain http, such as a phone
        // testing the dev server over Wi-Fi, fall back to the older selection-based copy.
        const field = document.createElement("textarea");
        field.value = site.email;
        field.setAttribute("readonly", "");
        field.style.position = "fixed";
        field.style.opacity = "0";
        document.body.appendChild(field);
        field.select();
        const ok = document.execCommand("copy");
        field.remove();
        if (!ok) throw new Error("copy failed");
      }
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => close(), 1100);
    } catch {
      close();
    }
  }

  // Focus leaving both the trigger and the menu (Tab past the last item) closes it.
  function onBlur(event: React.FocusEvent) {
    const next = event.relatedTarget as Node | null;
    if (open && next && !rootRef.current?.contains(next) && !menuRef.current?.contains(next)) close(false);
  }

  return (
    <div ref={rootRef} className="relative max-w-full min-w-0" onBlur={onBlur}>
      <a
        ref={triggerRef}
        href={`mailto:${site.email}`}
        aria-label={label}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={(event) => {
          event.preventDefault();
          // detail is 0 for a keyboard "click" (Enter), 1+ for a mouse click or a tap.
          openedByKeyboard.current = event.detail === 0;
          if (open) close();
          else {
            setPosition({ visibility: "hidden" });
            setOpen(true);
          }
        }}
        className={`min-w-0 ${linkClassName}`}
      >
        {children}
      </a>

      {mounted &&
        createPortal(
      <div
        ref={menuRef}
        id={menuId}
        hidden={!open}
        onBlur={onBlur}
        style={position}
        className="fixed z-[100] w-52 max-w-[calc(100vw-2rem)] rounded-lg border border-foreground/15 bg-background p-1.5"
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
      </div>,
          document.body,
        )}
    </div>
  );
}
