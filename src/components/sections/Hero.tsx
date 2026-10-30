import Image from "next/image";
import { Mail } from "lucide-react";
import type { CSSProperties } from "react";
import { site } from "@/data/portfolio";
import ExternalLink from "@/components/ui/ExternalLink";
import { containerClass, pillClass, proseClass, resumeLinkClass } from "@/components/ui/styles";

// Each block slides up a few pixels, one after the other (see .rise in globals.css). They only
// move: opacity stays at 1, so the hero is never blank.
const rise = (step: number) => ({ "--rise-delay": `${step * 90}ms` }) as CSSProperties;

// The hero is never wrapped in <Reveal>: it must be visible the moment the page loads.
// One column. When site.avatar is set, a small round photo (64px, 72px from sm) sits above the headline.
export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className={`${containerClass} pt-14 md:pt-20`}>
      {site.avatar && (
        <Image
          src={site.avatar}
          alt={`Portrait of ${site.name}`}
          width={144}
          height={144}
          preload
          style={rise(0)}
          className="rise mb-6 size-16 rounded-full border border-foreground/15 object-cover sm:size-[72px]"
        />
      )}

      <h1
        id="hero-title"
        style={rise(0)}
        className="rise max-w-[22ch] text-balance text-[1.75rem] font-medium leading-[1.15] tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl lg:leading-[1.1]"
      >
        <span className="sr-only">{site.name}: </span>
        {site.tagline}
      </h1>

      {site.lookingFor && (
        <p style={rise(1)} className="rise mt-5 font-mono text-[13px] text-foreground">
          <span className="text-foreground/65">Looking for:</span> {site.lookingFor}
        </p>
      )}

      <p
        style={rise(2)}
        className={`rise mt-5 text-pretty text-base leading-relaxed text-foreground/65 md:text-[17px] md:leading-relaxed ${proseClass}`}
      >
        {site.intro}
      </p>

      <div style={rise(3)} className="rise mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
        <a href={`mailto:${site.email}`} className={pillClass}>
          <Mail aria-hidden="true" className="size-4 shrink-0" />
          Email me
        </a>
        <ExternalLink href={site.resume} className={resumeLinkClass}>
          Resume
        </ExternalLink>
      </div>
    </section>
  );
}
