import Image from "next/image";
import { Mail } from "lucide-react";
import type { CSSProperties } from "react";
import { site } from "@/data/portfolio";
import ExternalLink from "@/components/ui/ExternalLink";
import EmailActions from "@/components/ui/EmailActions";
import TypedGreeting from "@/components/ui/TypedGreeting";
import { containerClass, heroMeasureClass, pillWrapClass, resumeLinkClass } from "@/components/ui/styles";

// Each zone slides up a few pixels, one after the other (see .rise in globals.css). They only
// move: opacity stays at 1, so the hero is never blank.
const rise = (step: number) => ({ "--rise-delay": `${step * 90}ms` }) as CSSProperties;

// The hero is never wrapped in <Reveal>: it must be visible the moment the page loads.
// Three zones, top to bottom, all on one shared text width (heroMeasureClass) so nothing runs past
// the heading's edge:
//   1. Name header: the greeting as the page's h1 (typed out on load, in the mono font).
//   2. Core tagline: the tagline, then a 3-sentence intro on Will's strengths.
//   3. "Looking for" callout: a bordered panel with an underlined label, the target role and the
//      contact actions.
// When site.avatar is set, the round photo sits in a second column from md, top-aligned with zone 1;
// on phones it is small and sits beside zone 1.
export default function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className={`${containerClass} grid grid-cols-[minmax(0,1fr)_auto] gap-x-5 pt-10 md:gap-x-12 md:pt-16 lg:gap-x-20`}
    >
      {/* Zone 1: name header */}
      <header style={rise(0)} className={`rise col-start-1 row-start-1 min-w-0 ${heroMeasureClass}`}>
        <h1
          id="hero-title"
          className="font-mono text-[clamp(1.75rem,8.6vw,2.5rem)] font-bold leading-[1.1] tracking-tighter text-foreground md:text-6xl lg:text-7xl"
        >
          <TypedGreeting text={site.greeting} emphasis={site.greetingEmphasis} />
        </h1>
      </header>

      {site.avatar && (
        <Image
          src={site.avatar}
          alt={`Portrait of ${site.name}`}
          width={448}
          height={448}
          sizes="(min-width: 1024px) 224px, (min-width: 768px) 176px, 64px"
          preload
          style={rise(0)}
          className="rise col-start-2 row-start-1 size-16 self-start rounded-full border border-foreground/15 object-cover md:row-span-3 md:size-44 lg:size-56"
        />
      )}

      {/* Zone 2: core tagline and strengths */}
      <div
        style={rise(1)}
        className={`rise col-span-2 col-start-1 row-start-2 mt-8 min-w-0 border-t border-foreground/10 pt-8 md:col-span-1 md:mt-10 ${heroMeasureClass}`}
      >
        <p className="text-pretty font-mono text-lg font-medium leading-snug tracking-tight text-foreground md:text-2xl">
          {site.tagline}
        </p>
        <p className="mt-4 text-pretty text-[17px] leading-relaxed text-foreground/75">{site.intro}</p>
      </div>

      {/* Zone 3: what Will is looking for, with the ways to get in touch */}
      <div
        style={rise(2)}
        className={`rise col-span-2 col-start-1 row-start-3 mt-8 min-w-0 rounded-lg border border-foreground/15 p-5 md:col-span-1 md:mt-10 md:p-6 ${heroMeasureClass}`}
      >
        {site.lookingFor && (
          <>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-foreground">
              <span className="inline-block border-b-2 border-accent pb-1">Looking for</span>
            </p>
            <p className="mt-3 text-pretty text-base leading-relaxed text-foreground/85">{site.lookingFor}</p>
          </>
        )}
        <div className={`flex flex-wrap items-center gap-x-4 gap-y-3 ${site.lookingFor ? "mt-5 border-t border-foreground/10 pt-5" : ""}`}>
          <EmailActions linkClassName={pillWrapClass}>
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
