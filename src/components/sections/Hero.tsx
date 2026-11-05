import Image from "next/image";
import { Mail } from "lucide-react";
import type { CSSProperties } from "react";
import { site } from "@/data/portfolio";
import ExternalLink from "@/components/ui/ExternalLink";
import EmailActions from "@/components/ui/EmailActions";
import { containerClass, iconButtonClass, pillWrapClass, resumeLinkClass } from "@/components/ui/styles";

// Each block slides up a few pixels, one after the other (see .rise in globals.css). They only
// move: opacity stays at 1, so the hero is never blank.
const rise = (step: number) => ({ "--rise-delay": `${step * 90}ms` }) as CSSProperties;

// The hero is never wrapped in <Reveal>: it must be visible the moment the page loads.
// Reading order and semantics: h1 = the name (what the page is about, and what search results show),
// the role under it, then the tagline as a quiet line under the big heading. The tagline is a <p>, not a heading, so the
// document outline stays h1 (name) then one h2 per section.
// Layout: a two-column grid from md. The text sits in the left column and, when site.avatar is set,
// the round photo sits on the right, top-aligned with the name. On phones the photo is small and sits
// beside the name and role, and everything else runs full width underneath.
export default function Hero() {
  // site.nameEmphasis, when it appears in site.name, is set in italic accent colour.
  const at = site.nameEmphasis ? site.name.indexOf(site.nameEmphasis) : -1;
  const before = at < 0 ? site.name : site.name.slice(0, at);
  const emphasis = at < 0 ? "" : site.nameEmphasis;
  const after = at < 0 ? "" : site.name.slice(at + (site.nameEmphasis?.length ?? 0));

  return (
    <section
      aria-labelledby="hero-title"
      className={`${containerClass} grid grid-cols-[minmax(0,1fr)_auto] gap-x-5 pt-8 md:gap-x-12 md:pt-14 lg:gap-x-20`}
    >
      <div className="col-start-1 row-start-1 min-w-0">
        <h1
          id="hero-title"
          style={rise(0)}
          className="rise text-balance text-[clamp(1.75rem,8.5vw,2.5rem)] font-semibold leading-[1.1] tracking-tight text-foreground md:text-6xl lg:text-7xl"
        >
          {before}
          {emphasis && <em className="text-accent">{emphasis}</em>}
          {after}
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
          className="rise mt-5 text-pretty font-mono text-sm leading-relaxed text-foreground/70 md:mt-7 md:text-base lg:text-lg"
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

        <div style={rise(4)} className="rise mt-12 flex flex-wrap items-center gap-x-5 gap-y-3">
          <EmailActions linkClassName={pillWrapClass} copyClassName={iconButtonClass}>
            <Mail aria-hidden="true" className="size-4 shrink-0" />
            {site.email}
          </EmailActions>
          <ExternalLink href={site.resume} className={resumeLinkClass}>
            Resume
          </ExternalLink>
        </div>
      </div>
    </section>
  );
}
