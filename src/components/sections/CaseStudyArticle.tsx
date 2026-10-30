import type { CaseSection } from "@/data/portfolio";
import type { CaseStudyProject } from "@/lib/case-studies";
import StatusBadge from "@/components/ui/StatusBadge";
import Reveal from "@/components/ui/Reveal";
import CaseFigure from "@/components/ui/CaseFigure";
import { proseClass } from "@/components/ui/styles";

const labelClass = "font-mono text-xs font-medium uppercase tracking-wider text-foreground/65";
const paragraphClass = "text-[15px] leading-relaxed text-foreground/80";

// Image grid: one image is capped at 768px wide, two or more sit side by side from 640px up.
function ImageGrid({ images, title }: { images: NonNullable<CaseSection["images"]>; title: string }) {
  const many = images.length > 1;
  return (
    <ul aria-label={`${title} images`} className={`mt-6 grid gap-4 ${many ? "sm:grid-cols-2" : "max-w-3xl"}`}>
      {images.map((image) => (
        <li key={image.src}>
          <CaseFigure
            image={image}
            sizes={many ? "(min-width: 1280px) 560px, (min-width: 640px) 45vw, 100vw" : "(min-width: 1280px) 1152px, 90vw"}
          />
        </li>
      ))}
    </ul>
  );
}

function Prose({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className={`${proseClass} flex flex-col gap-4`}>
      {paragraphs.map((text) => (
        <p key={text} className={paragraphClass}>
          {text}
        </p>
      ))}
    </div>
  );
}

// The case study article: header, cover, facts, then each section in a Reveal.
export default function CaseStudyArticle({ project }: { project: CaseStudyProject }) {
  const { caseStudy } = project;
  const video = project.demoVideo;

  return (
    <article aria-labelledby="case-title">
      <header className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <p className="font-mono text-xs font-medium uppercase tracking-wider text-accent">Case study</p>
          <StatusBadge status={project.status} />
        </div>
        <h1 id="case-title" className="text-4xl font-medium leading-[1.1] tracking-tight text-foreground md:text-6xl">
          {project.title}
        </h1>
        <p className={`${proseClass} text-lg leading-relaxed text-foreground/80`}>{caseStudy.summary}</p>
      </header>

      {caseStudy.cover && (
        <div className="mt-10">
          <CaseFigure
            image={caseStudy.cover}
            eager
            sizes="(min-width: 1280px) 1152px, 90vw"
            className="rounded-l-lg rounded-r-[1.75rem]"
          />
        </div>
      )}

      {caseStudy.facts.length > 0 && (
        <dl className="mt-10 grid gap-x-12 gap-y-6 border-y border-foreground/10 py-6 sm:grid-cols-2">
          {caseStudy.facts.map((fact) => (
            <div key={fact.label} className="flex flex-col gap-1">
              <dt className={labelClass}>{fact.label}</dt>
              <dd className="text-[15px] text-foreground">{fact.value}</dd>
            </div>
          ))}
        </dl>
      )}

      {caseStudy.sections.map((section, index) => {
        const headingId = `case-section-${index}`;
        return (
          <section key={section.title} aria-labelledby={headingId} className="mt-14">
            <Reveal>
              <h2 id={headingId} className={`${labelClass} mb-4`}>
                {section.title}
              </h2>
              <Prose paragraphs={section.paragraphs} />
              {section.images && section.images.length > 0 && <ImageGrid images={section.images} title={section.title} />}

              {section.showDemoVideo && video && (
                <figure className="mt-6 flex max-w-3xl flex-col gap-2">
                  <video controls preload="none" poster={video.poster} className="w-full rounded-lg border border-foreground/10">
                    <source src={video.src} />
                  </video>
                  {video.caption && <figcaption className="text-xs text-foreground/65">{video.caption}</figcaption>}
                </figure>
              )}

              {section.steps && section.steps.length > 0 && (
                <ol className="mt-8 flex flex-col gap-10">
                  {section.steps.map((step) => (
                    <li key={step.title}>
                      <h3 className="mb-3 font-mono text-sm font-medium text-accent">{step.title}</h3>
                      <Prose paragraphs={step.paragraphs} />
                      {step.images && step.images.length > 0 && <ImageGrid images={step.images} title={step.title} />}
                    </li>
                  ))}
                </ol>
              )}
            </Reveal>
          </section>
        );
      })}

      {caseStudy.takeaways && caseStudy.takeaways.length > 0 && (
        <section aria-labelledby="case-takeaways" className="mt-14">
          <Reveal>
            <h2 id="case-takeaways" className={`${labelClass} mb-4`}>
              Takeaways
            </h2>
            <ul className={`${proseClass} flex list-disc flex-col gap-3 pl-5 marker:text-accent`}>
              {caseStudy.takeaways.map((item) => (
                <li key={item} className={paragraphClass}>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </section>
      )}
    </article>
  );
}
