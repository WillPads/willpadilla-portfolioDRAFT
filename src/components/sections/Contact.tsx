"use client";

import { Mail } from "lucide-react";
import { useState } from "react";
import { site } from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import ExternalLink from "@/components/ui/ExternalLink";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { buttonClass, containerClass, copiedNoticeClass, pillWrapClass, proseClass, sectionGapClass } from "@/components/ui/styles";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(site.email);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1200);
      }
    } catch {
      // Ignore clipboard errors: the button remains safe and non-breaking in unsupported browsers.
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className={`${containerClass} ${sectionGapClass}`}>
      <Reveal>
        <SectionHeading id="contact-title" title="Contact" />
      </Reveal>
      <Reveal delay={90}>
        <p className={`text-pretty text-base leading-relaxed text-foreground/80 ${proseClass}`}>
          {site.contactNote}
        </p>
        <div className="mt-6 flex flex-col items-start gap-4">
          <div className="group relative">
            <button type="button" onClick={handleCopyEmail} className={pillWrapClass} aria-label="Copy email address">
              <Mail aria-hidden="true" className="size-4 shrink-0" />
              <span className="min-w-0">{site.email}</span>
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
          <div className="flex flex-wrap gap-3">
            <ExternalLink href={site.social.github} arrow={false} className={buttonClass}>
              <GithubIcon />
              GitHub
            </ExternalLink>
            <ExternalLink href={site.social.linkedin} arrow={false} className={buttonClass}>
              <LinkedinIcon />
              LinkedIn
            </ExternalLink>
            <ExternalLink href={site.resume} className={buttonClass}>
              Resume
            </ExternalLink>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
