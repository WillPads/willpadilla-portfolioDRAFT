import { site } from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { containerClass, proseClass, sectionGapClass } from "@/components/ui/styles";

// Renders only when site.bio is set; until then there is no About section and no nav link.
export default function About() {
  if (!site.bio) return null;

  return (
    <section id="about" aria-labelledby="about-title" className={`${containerClass} ${sectionGapClass}`}>
      <Reveal>
        <SectionHeading id="about-title" title="About" />
      </Reveal>
      <Reveal delay={90}>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,65ch)_minmax(0,1fr)] lg:gap-16">
        <p className={`text-pretty text-base leading-relaxed text-foreground/80 ${proseClass}`}>{site.bio}</p>
        <dl className="flex flex-col gap-3 self-start border-foreground/10 font-mono text-xs lg:border-l lg:pl-8">
          <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-4">
            <dt className="w-24 shrink-0 text-foreground/65">Based in</dt>
            <dd className="text-foreground">{site.location}</dd>
          </div>
          <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-4">
            <dt className="w-24 shrink-0 text-foreground/65">Role</dt>
            <dd className="text-foreground">{site.role}</dd>
          </div>
        </dl>
        </div>
      </Reveal>
    </section>
  );
}
