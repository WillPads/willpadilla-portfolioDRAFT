import { skills } from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import TagList from "@/components/ui/TagList";
import Certifications from "@/components/sections/Certifications";
import { containerClass, sectionGapClass } from "@/components/ui/styles";

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className={`${containerClass} ${sectionGapClass}`}>
      <Reveal>
        <SectionHeading id="skills-title" title="Skills" />
      </Reveal>
      <Reveal delay={90}>
        <ul className="grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group) => (
            <li key={group.category} className="flex flex-col gap-3 border-t border-foreground/10 pt-4">
              <h3 className="font-mono text-xs leading-6 text-foreground/65">{group.category}</h3>
              <TagList items={group.items} label={`${group.category} skills`} />
            </li>
          ))}
        </ul>
        <Certifications />
      </Reveal>
    </section>
  );
}
