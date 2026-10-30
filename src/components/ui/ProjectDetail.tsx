import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import type { FeaturedProject } from "@/data/portfolio";
import StatusBadge from "@/components/ui/StatusBadge";
import TagList from "@/components/ui/TagList";
import ProjectLinks from "@/components/ui/ProjectLinks";
import { caseStudyPath } from "@/lib/case-studies";
import { iconButtonClass, pillClass } from "@/components/ui/styles";

// The detail panel under the turntable. It is only mounted while open, so the screenshots and
// the demo video are not requested until a visitor asks for them.
export default function ProjectDetail({
  project,
  headingRef,
  onClose,
}: {
  project: FeaturedProject;
  headingRef: React.Ref<HTMLHeadingElement>;
  onClose: () => void;
}) {
  const isMobile = project.device === "mobile";
  const meta = [project.year, project.context].filter(Boolean).join(" / ");

  return (
    <div
      role="region"
      aria-labelledby="project-panel-title"
      onKeyDown={(event) => {
        if (event.key === "Escape") onClose();
      }}
      className="mt-6 grid gap-x-12 gap-y-5 rounded-l-lg rounded-r-[1.75rem] border border-foreground/15 p-5 md:p-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]"
    >
      <div className="flex items-start justify-between gap-4 lg:col-span-2">
        <div className="flex min-w-0 flex-col gap-2">
          <h3
            id="project-panel-title"
            ref={headingRef}
            tabIndex={-1}
            className="w-fit max-w-full text-2xl font-medium leading-tight tracking-tight text-foreground outline-none"
          >
            {project.title}
          </h3>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <StatusBadge status={project.status} />
            {meta && <p className="font-mono text-[11px] text-foreground/65">{meta}</p>}
          </div>
          <p className="text-sm text-foreground/65">{project.role}</p>
        </div>
        <button type="button" onClick={onClose} aria-label={`Close ${project.title} details`} className={iconButtonClass}>
          <X aria-hidden="true" className="size-5" />
        </button>
      </div>

      <div className="flex flex-col gap-5">
      <div className="flex max-w-[65ch] flex-col gap-3">
        <p className="text-[15px] leading-relaxed text-foreground/80">{project.description}</p>
        {project.impact && (
          <p className="text-[15px] leading-relaxed text-foreground">
            <span className="font-mono text-xs text-foreground/65">Impact:</span> {project.impact}
          </p>
        )}
      </div>

      <TagList items={project.stack} label={`${project.title} tech stack`} />

      {project.caseStudy && (
        <Link href={caseStudyPath(project)} className={`${pillClass} self-start`}>
          Read case study
          <span className="sr-only"> for {project.title}</span>
        </Link>
      )}

      <ProjectLinks project={project} />
      </div>

      <div className="flex min-w-0 flex-col gap-5">
      {project.demoVideo && (
        <figure className="flex max-w-2xl flex-col gap-2">
          <video
            controls
            preload="none"
            poster={project.demoVideo.poster}
            className="w-full rounded-lg border border-foreground/10"
          >
            <source src={project.demoVideo.src} />
          </video>
          {project.demoVideo.caption && (
            <figcaption className="text-xs text-foreground/65">{project.demoVideo.caption}</figcaption>
          )}
        </figure>
      )}

      {project.screenshots.length > 0 && (
        <div
          role="region"
          aria-label={`${project.title} screenshots`}
          tabIndex={0}
          className="-mx-1 flex gap-3 overflow-x-auto rounded-lg p-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
        >
          {project.screenshots.map((shot) => (
            <div
              key={shot.src}
              className={`relative shrink-0 overflow-hidden rounded-lg border border-foreground/15 ${
                isMobile ? "aspect-[9/19] w-36 sm:w-40" : "aspect-[16/10] w-72 sm:w-96"
              }`}
            >
              <Image
                src={shot.src}
                alt={shot.alt}
                fill
                loading="lazy"
                sizes={isMobile ? "160px" : "(min-width: 640px) 384px, 288px"}
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
}
