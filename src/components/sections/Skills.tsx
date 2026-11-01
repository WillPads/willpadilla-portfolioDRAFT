import {
  siAndroid,
  siCplusplus,
  siExpress,
  siFigma,
  siHtml5,
  siNeon,
  siNextdotjs,
  siNodedotjs,
  siOpenjdk,
  siPhp,
  siPostgresql,
  siPrisma,
  siPython,
  siReact,
  siRender,
  siSqlite,
  siTailwindcss,
  siTypescript,
} from "simple-icons";
import { skills } from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import TagList, { type TagIcon } from "@/components/ui/TagList";
import Certifications from "@/components/sections/Certifications";
import { containerClass, sectionGapClass } from "@/components/ui/styles";

const skillFontClassByItem = {
  "Next.js": "skill-font-nextjs",
  Android: "skill-font-android",
  "Node.js": "skill-font-nodejs",
  Prisma: "skill-font-prisma",
};

// Official logos in brand colours (Simple Icons). Java's logo was removed from Simple Icons
// at Oracle's request, so it uses OpenJDK's cup; WebSockets has no logo and stays text only.
const skillIconByItem: Record<string, TagIcon> = {
  TypeScript: { icon: siTypescript },
  Java: { icon: siOpenjdk, darkFallback: true },
  Python: { icon: siPython },
  "C++": { icon: siCplusplus, darkFallback: true },
  PHP: { icon: siPhp },
  HTML: { icon: siHtml5 },
  React: { icon: siReact },
  "Next.js": { icon: siNextdotjs, darkFallback: true },
  "Tailwind CSS": { icon: siTailwindcss },
  "Node.js": { icon: siNodedotjs },
  Express: { icon: siExpress, darkFallback: true },
  PostgreSQL: { icon: siPostgresql },
  SQLite: { icon: siSqlite, darkFallback: true },
  Prisma: { icon: siPrisma, darkFallback: true },
  Neon: { icon: siNeon },
  Render: { icon: siRender, darkFallback: true },
  Figma: { icon: siFigma },
  Android: { icon: siAndroid },
};

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
              <TagList
                items={group.items}
                label={`${group.category} skills`}
                fontClassByItem={skillFontClassByItem}
                iconByItem={skillIconByItem}
              />
            </li>
          ))}
        </ul>
        <Certifications />
      </Reveal>
    </section>
  );
}
