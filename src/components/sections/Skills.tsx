import {
  siAndroid,
  siCplusplus,
  siExpress,
  siFigma,
  siHtml5,
  siNeon,
  siNextdotjs,
  siNodedotjs,
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

// The official Java cup logo (Devicon, MIT). Java's logo is not in Simple Icons: Oracle had it removed.
const javaLogo = (
  <svg viewBox="0 0 128 128" aria-hidden="true" focusable="false" className="size-3.5 shrink-0">
    <path fill="#0074BD" d="M47.617 98.12s-4.767 2.774 3.397 3.71c9.892 1.13 14.947.968 25.845-1.092 0 0 2.871 1.795 6.873 3.351-24.439 10.47-55.308-.607-36.115-5.969zm-2.988-13.665s-5.348 3.959 2.823 4.805c10.567 1.091 18.91 1.18 33.354-1.6 0 0 1.993 2.025 5.132 3.131-29.542 8.64-62.446.68-41.309-6.336z" />
    <path fill="#EA2D2E" d="M69.802 61.271c6.025 6.935-1.58 13.17-1.58 13.17s15.289-7.891 8.269-17.777c-6.559-9.215-11.587-13.792 15.635-29.58 0 .001-42.731 10.67-22.324 34.187z" />
    <path fill="#0074BD" d="M102.123 108.229s3.529 2.91-3.888 5.159c-14.102 4.272-58.706 5.56-71.094.171-4.451-1.938 3.899-4.625 6.526-5.192 2.739-.593 4.303-.485 4.303-.485-4.953-3.487-32.013 6.85-13.743 9.815 49.821 8.076 90.817-3.637 77.896-9.468zM49.912 70.294s-22.686 5.389-8.033 7.348c6.188.828 18.518.638 30.011-.326 9.39-.789 18.813-2.474 18.813-2.474s-3.308 1.419-5.704 3.053c-23.042 6.061-67.544 3.238-54.731-2.958 10.832-5.239 19.644-4.643 19.644-4.643zm40.697 22.747c23.421-12.167 12.591-23.86 5.032-22.285-1.848.385-2.677.72-2.677.72s.688-1.079 2-1.543c14.953-5.255 26.451 15.503-4.823 23.725 0-.002.359-.327.468-.617z" />
    <path fill="#EA2D2E" d="M76.491 1.587S89.459 14.563 64.188 34.51c-20.266 16.006-4.621 25.13-.007 35.559-11.831-10.673-20.509-20.07-14.688-28.815C58.041 28.42 81.722 22.195 76.491 1.587z" />
    <path fill="#0074BD" d="M52.214 126.021c22.476 1.437 57-.8 57.817-11.436 0 0-1.571 4.032-18.577 7.231-19.186 3.612-42.854 3.191-56.887.874 0 .001 2.875 2.381 17.647 3.331z" />
  </svg>
);

// Official logos in brand colours (Simple Icons, plus the Java cup above). WebSockets has no
// logo and stays text only.
const skillIconByItem: Record<string, TagIcon> = {
  TypeScript: { icon: siTypescript },
  Java: { svg: javaLogo },
  Python: { icon: siPython },
  "C++": { icon: siCplusplus, textColour: true },
  PHP: { icon: siPhp },
  HTML: { icon: siHtml5 },
  React: { icon: siReact },
  "Next.js": { icon: siNextdotjs, textColour: true },
  "Tailwind CSS": { icon: siTailwindcss },
  "Node.js": { icon: siNodedotjs },
  Express: { icon: siExpress, textColour: true },
  PostgreSQL: { icon: siPostgresql },
  SQLite: { icon: siSqlite, textColour: true },
  Prisma: { icon: siPrisma, textColour: true },
  Neon: { icon: siNeon },
  Render: { icon: siRender, textColour: true },
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
                float
              />
            </li>
          ))}
        </ul>
        <Certifications />
      </Reveal>
    </section>
  );
}
