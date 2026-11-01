"use client";

import Image from "next/image";
import { Mail } from "lucide-react";
import { useState, type CSSProperties } from "react";
import { site } from "@/data/portfolio";
import ExternalLink from "@/components/ui/ExternalLink";
import { containerClass, copiedNoticeClass, pillClass, resumeLinkClass } from "@/components/ui/styles";

// Each block slides up a few pixels, one after the other (see .rise in globals.css). They only
// move: opacity stays at 1, so the hero is never blank.
const rise = (step: number) => ({ "--rise-delay": `${step * 90}ms` }) as CSSProperties;

// The hero is never wrapped in <Reveal>: it must be visible the moment the page loads.
// Reading order and semantics: h1 = the name (what the page is about, and what search results show),
// the role under it, then the tagline as the big headline. The tagline is a <p>, not a heading, so the
// document outline stays h1 (name) then one h2 per section.
// Layout: a two-column grid from md. The text sits in the left column and, when site.avatar is set,
// the round photo sits on the right, top-aligned with the name. On phones the photo is small and sits
// beside the name and role, and everything else runs full width underneath.
export default function Hero() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(site.email);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1200);
      }
    } catch {
      // Ignore clipboard errors: the button still acts as a safe no-op in unsupported browsers.
    }
  };

  return (
    <section
      aria-labelledby="hero-title"
      className={`${containerClass} grid grid-cols-[minmax(0,1fr)_auto] gap-x-5 pt-8 md:gap-x-12 md:pt-14 lg:gap-x-20`}
    >
      <div style={rise(0)} className="rise col-start-1 row-start-1 min-w-0">
        <h1
          id="hero-title"
          className="text-balance text-4xl font-medium leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {site.name}
        </h1>
      </div>

      {site.avatar && (
        <Image
          src={site.avatar}
          alt={`Portrait of ${site.name}`}
          width={448}
          height={448}
          sizes="(min-width: 1024px) 224px, (min-width: 768px) 176px, 64px"
          preload
          style={rise(0)}
          className="rise col-start-2 row-start-1 size-16 self-start rounded-full border border-foreground/15 object-cover md:row-span-2 md:size-44 lg:size-56"
        />
      )}

      <div className="col-span-2 col-start-1 row-start-2 min-w-0 md:col-span-1">
        <p
          style={rise(1)}
          className="rise mt-8 max-w-[22ch] text-balance text-[1.75rem] font-medium leading-[1.15] tracking-tight text-foreground sm:text-4xl md:mt-10 md:text-5xl lg:text-6xl lg:leading-[1.1]"
        >
          {site.tagline}
        </p>

        {site.bio && (
          <p style={rise(2)} className="rise mt-4 max-w-[65ch] text-pretty text-[17px] leading-relaxed text-foreground/75">
            {site.bio}
          </p>
        )}

        {site.lookingFor && (
          <p style={rise(2.5)} className="rise mt-5 text-base leading-relaxed text-foreground/80">
            <span className="font-mono text-xs font-medium text-foreground/65">Looking for:</span> {site.lookingFor}
          </p>
        )}

        <div style={rise(4)} className="rise mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
          <div className="group relative">
            <button type="button" onClick={handleCopyEmail} className={pillClass} aria-label="Copy email address">
              <Mail aria-hidden="true" className="size-4 shrink-0" />
              {site.email}
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
          <ExternalLink href={site.resume} className={resumeLinkClass}>
            Resume
          </ExternalLink>
        </div>
      </div>
    </section>
  );
}
