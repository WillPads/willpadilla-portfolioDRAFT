"use client";

import { Check, Copy } from "lucide-react";
import { useRef, useState, type ReactNode } from "react";
import { site } from "@/data/portfolio";
import { copiedNoticeClass } from "@/components/ui/styles";

// The email address as two controls: the link opens a new message to Will in the visitor's mail
// app, and the icon beside it copies the address (for anyone without a mail app set up).
export default function EmailActions({
  linkClassName,
  copyClassName,
  iconClassName = "size-4",
  className = "gap-2",
  children,
}: {
  linkClassName: string;
  copyClassName: string;
  iconClassName?: string;
  className?: string;
  children: ReactNode;
}) {
  const [copied, setCopied] = useState(false);
  const hideTimer = useRef<number | undefined>(undefined);

  const copy = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(site.email);
        window.clearTimeout(hideTimer.current);
        setCopied(true);
        hideTimer.current = window.setTimeout(() => setCopied(false), 1200);
      }
    } catch {
      // Ignore clipboard errors: the button stays safe and non-breaking in unsupported browsers.
    }
  };

  const CopyIcon = copied ? Check : Copy;

  return (
    <div className={`flex max-w-full min-w-0 items-center ${className}`}>
      <a href={`mailto:${site.email}`} aria-label={`Send an email to ${site.email}`} className={`min-w-0 ${linkClassName}`}>
        {children}
      </a>
      <div className="group relative shrink-0">
        <button type="button" onClick={copy} aria-label="Copy email address" className={copyClassName}>
          <CopyIcon aria-hidden="true" className={iconClassName} />
        </button>
        <span
          role="status"
          aria-live="polite"
          aria-hidden={!copied}
          className={`${copiedNoticeClass} ${copied ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100"}`}
        >
          {copied ? "Copied" : "Copy Email"}
        </span>
      </div>
    </div>
  );
}
