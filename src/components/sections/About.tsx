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
        <p className={`text-pretty text-base leading-relaxed text-foreground/80 ${proseClass}`}>{site.bio}</p>
      </Reveal>
    </section>
  );
}
