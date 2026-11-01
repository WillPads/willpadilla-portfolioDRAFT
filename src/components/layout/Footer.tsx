"use client";

import { ArrowUp, Mail } from "lucide-react";
import { useState } from "react";
import { site } from "@/data/portfolio";
import ExternalLink from "@/components/ui/ExternalLink";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { containerClass, copiedNoticeClass, iconLinkClass } from "@/components/ui/styles";

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(site.email);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1200);
      }
    } catch {
      // Ignore clipboard errors: the icon stays safe and non-breaking in unsupported browsers.
    }
  };

  return (
    <footer className={`${containerClass} mt-16 md:mt-24 pb-10`}>
      <div className="flex items-center justify-between gap-4 border-t border-foreground/10 pt-6">
        <div className="min-w-0">
          <p className="text-sm text-foreground">
            &copy; {new Date().getFullYear()} Will Padilla
          </p>
          <p className="mt-0.5 text-sm text-foreground/65">Based in {site.location}</p>
        </div>
        <nav aria-label="Footer" className="-mr-2.5 flex shrink-0 items-center">
          <div className="group relative">
            <button type="button" onClick={handleCopyEmail} aria-label="Copy email address" className={iconLinkClass}>
              <Mail aria-hidden="true" className="size-[18px]" />
            </button>
            <span
              role="status"
              aria-live="polite"
              aria-hidden={!copied}
              className={`${copiedNoticeClass} ${copied ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100"}`}
            >
              {copied ? "Copied" : "Click to Copy"}
            </span>
          </div>
          <ExternalLink href={site.social.github} arrow={false} className={iconLinkClass}>
            <GithubIcon className="size-[18px]" />
            <span className="sr-only">GitHub</span>
          </ExternalLink>
          <ExternalLink href={site.social.linkedin} arrow={false} className={iconLinkClass}>
            <LinkedinIcon className="size-[18px]" />
            <span className="sr-only">LinkedIn</span>
          </ExternalLink>
          <a href="#top" aria-label="Back to top" className={iconLinkClass}>
            <ArrowUp aria-hidden="true" className="size-[18px]" />
          </a>
        </nav>
      </div>
    </footer>
  );
}
