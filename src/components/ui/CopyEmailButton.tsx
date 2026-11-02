"use client";

import { useRef, useState, type ReactNode } from "react";
import { site } from "@/data/portfolio";
import { copiedNoticeClass } from "@/components/ui/styles";

// Two taps closer together than this count as a double tap.
const DOUBLE_TAP_MS = 400;

type Notice = "idle" | "hint" | "copied";

// Copies the email address. Mouse and keyboard: click to copy ("Click to Copy" shows on
// hover/focus). Touch screens can't hover, so the first tap shows "Double Tap to Copy" and a
// second tap right after it copies. `touch-manipulation` stops the double tap from zooming the page.
export default function CopyEmailButton({ className, children }: { className: string; children: ReactNode }) {
  const [notice, setNotice] = useState<Notice>("idle");
  const [touch, setTouch] = useState(false);
  const lastTouch = useRef<number | null>(null);
  const viaTouch = useRef(false);
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
        className={`${className} touch-manipulation select-none`}
        onPointerDown={(event) => {
          viaTouch.current = event.pointerType !== "mouse";
          setTouch(viaTouch.current);
        }}
        onClick={() => {
          // Keyboard and mouse copy straight away.
          if (!viaTouch.current) {
            void copy();
            return;
          }
          viaTouch.current = false;
          const now = Date.now();
          if (lastTouch.current !== null && now - lastTouch.current < DOUBLE_TAP_MS) {
            lastTouch.current = null;
            void copy();
          } else {
            lastTouch.current = now;
            show("hint", 1800);
          }
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
        {notice === "copied" ? "Copied" : touch ? "Double Tap to Copy" : "Click to Copy"}
      </span>
    </div>
  );
}
