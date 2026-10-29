import { site } from "@/data/portfolio";
import Reveal from "@/components/ui/Reveal";

export default function Introduction() {
  return (
    <section className="border-b border-black/10">
      <Reveal className="mx-auto flex w-full max-w-5xl flex-col items-start gap-7 px-6 py-28 sm:py-40">
        <span className="border border-black/15 px-4 py-1.5 font-body text-xs uppercase tracking-widest text-black/70 sm:text-sm">
          {site.tagline}
        </span>

        <h1 className="max-w-4xl font-heading text-5xl font-bold uppercase leading-[0.95] tracking-tight text-black sm:text-7xl">
          What&apos;s up, <span className="bg-black px-3 text-white">Will</span>?
        </h1>

        <p className="max-w-2xl font-body text-lg leading-relaxed text-black/70 sm:text-xl">
          {site.intro}
        </p>

        <div className="flex flex-col gap-6 pt-8">
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={site.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-black bg-black px-8 py-4 font-button text-sm font-bold uppercase tracking-widest text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_30px_rgba(0,0,0,0.25)]"
            >
              Resume ↗
            </a>
            <a
              href="#projects"
              className="border border-black/25 px-6 py-4 font-button text-xs font-bold uppercase tracking-widest text-black transition-all duration-300 hover:scale-105 hover:border-black hover:bg-black/5"
            >
              View Projects →
            </a>
            <a
              href={`mailto:${site.email}`}
              className="border border-black/25 px-6 py-4 font-button text-xs font-bold uppercase tracking-widest text-black transition-all duration-300 hover:scale-105 hover:border-black hover:bg-black/5"
            >
              Contact Me
            </a>
          </div>

          <div className="flex items-center gap-2 font-button text-[11px] uppercase tracking-widest text-black/60">
            <a
              href={site.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-black/15 px-4 py-3.5 transition-all duration-300 hover:scale-105 hover:border-black/40 hover:bg-black/5 hover:text-black"
            >
              GitHub ↗
            </a>
            <a
              href={site.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-black/15 px-4 py-3.5 transition-all duration-300 hover:scale-105 hover:border-black/40 hover:bg-black/5 hover:text-black"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
