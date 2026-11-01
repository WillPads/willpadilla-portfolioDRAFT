"use client";

import { useRef, useState, type ReactNode } from "react";
import { site } from "@/data/portfolio";
import { copiedNoticeClass } from "@/components/ui/styles";

// How long a touch must be held to count as a long tap.
const LONG_TAP_MS = 450;

type Notice = "idle" | "hint" | "copied";

// Copies the email address. Mouse and keyboard: click to copy ("Click to Copy" shows on
// hover/focus). Touch screens can't hover, so a short tap shows "Long Tap to Copy" and a
// long tap copies. The copy runs on release, because browsers only allow clipboard writes
// during the release of a touch, not while it is held.
export default function CopyEmailButton({ className, children }: { className: string; children: ReactNode }) {
  const [notice, setNotice] = useState<Notice>("idle");
  const [touch, setTouch] = useState(false);
  const pressStart = useRef<number | null>(null);
  const skipClick = useRef(false);
  const hideTimer = useRef<number | undefined>(undefined);

  const show = (next: Notice, ms: number) => {
    window.clearTimeout(hideTimer.current);
    setNotice(next);
    hideTimer.current = window.setTimeout(() => setNotice("idle"), ms);
  };

  const copy = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(site.email);
        show("copied", 1200);
      }
    } catch {
      // Ignore clipboard errors: the button stays safe and non-breaking in unsupported browsers.
    }
  };

  return (
    <div className="group relative">
      <button
        type="button"
        aria-label="Copy email address"
        className={`${className} select-none [-webkit-touch-callout:none]`}
        onPointerDown={(event) => {
          const isTouch = event.pointerType !== "mouse";
          setTouch(isTouch);
          if (!isTouch) return;
          pressStart.current = Date.now();
          skipClick.current = true;
          show("hint", 1600);
        }}
        onPointerUp={() => {
          if (pressStart.current === null) return;
          const held = Date.now() - pressStart.current;
          pressStart.current = null;
          if (held >= LONG_TAP_MS) void copy();
        }}
        onPointerCancel={() => {
          pressStart.current = null;
        }}
        // Stop the phone's own long-press menu from opening over the button.
        onContextMenu={(event) => {
          if (touch) event.preventDefault();
        }}
        onClick={() => {
          // A touch already ran its tap or long tap above; keyboard and mouse copy here.
          if (skipClick.current) {
            skipClick.current = false;
            return;
          }
          void copy();
        }}
      >
        {children}
      </button>
      <span
        role="status"
        aria-live="polite"
        aria-hidden={notice !== "copied"}
        className={`${copiedNoticeClass} ${notice === "idle" ? "translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100" : "translate-y-0 opacity-100"}`}
      >
        {notice === "copied" ? "Copied" : touch ? "Long Tap to Copy" : "Click to Copy"}
      </span>
    </div>
  );
}
