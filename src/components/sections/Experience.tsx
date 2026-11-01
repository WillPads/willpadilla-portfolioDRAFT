import Image from "next/image";
import { experience } from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { containerClass, rowClass, sectionGapClass } from "@/components/ui/styles";

// Compact rows: logo, organisation and role on the left, dates on the right.
// Hidden, with its nav link, while the experience list is empty.
export default function Experience() {
  if (experience.length === 0) return null;

  return (
    <section id="experience" aria-labelledby="experience-title" className={`${containerClass} ${sectionGapClass}`}>
      <Reveal>
        <SectionHeading id="experience-title" title="Experience" />
      </Reveal>
      <Reveal delay={90}>
        <ul>
          {experience.map((item) => (
            <li
              key={`${item.org}-${item.start}`}
              className={`${rowClass} relative flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6`}
            >
              <div className="flex min-w-0 items-center gap-3">
                {item.logo && (
                  <Image
                    src={item.logo}
                    alt=""
                    width={30}
                    height={30}
                    className="size-[30px] shrink-0 rounded-lg object-cover"
                  />
                )}
                <div className="min-w-0">
                  <p className="text-base font-medium leading-tight text-foreground">
                    {item.url ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg underline decoration-foreground/30 after:absolute after:inset-0 after:content-[''] underline-offset-4 hover:decoration-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
                      >
                        {item.org}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    ) : (
                      item.org
                    )}
                  </p>
                  <p className="mt-1 text-[15px] leading-relaxed text-foreground/65">{item.role}</p>
                </div>
              </div>
              <p className="shrink-0 font-mono text-[13px] text-foreground/65 sm:text-right">
                {item.start}
                <span aria-hidden="true"> - </span>
                <span className="sr-only"> to </span>
                {item.end}
              </p>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
