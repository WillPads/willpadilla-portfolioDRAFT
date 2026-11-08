import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { FeaturedProject } from "@/data/portfolio";
import { caseStudyPath } from "@/lib/case-studies";
import ProjectPreview from "@/components/ui/ProjectPreview";
import StatusBadge from "@/components/ui/StatusBadge";
import TagList from "@/components/ui/TagList";

// One featured project, top to bottom: the device preview, then logo + title + meta, status,
// tagline, role, stack, and a "View Project Details" button pinned to the bottom.
// The whole card is one link to the case study (an overlay <Link>, so the tags stay plain text).
// Cards in a row stretch to the same height and the footer is pinned to the bottom, so the
// footers line up across the grid. One flat 1px border that turns solid on hover and focus.
export default function ProjectCard({
  project,
  onNavigate,
}: {
  project: FeaturedProject;
  onNavigate: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  const meta = [project.context, project.year].filter(Boolean).join(" · ");

  return (
    <div
      id={`project-card-${project.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-foreground/15 bg-background transition-colors duration-300 hover:border-foreground focus-within:border-foreground motion-reduce:transition-none"
    >
      <ProjectPreview project={project} />

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div className="flex items-start gap-3">
          {project.cardImage && (
            <Image
              src={project.cardImage.src}
              alt=""
              width={80}
              height={80}
              className="size-10 shrink-0 rounded-lg border border-foreground/10 bg-foreground/5 object-cover"
            />
          )}
          <div className="min-w-0">
            <h3 id={`card-title-${project.slug}`} className="text-xl font-medium leading-tight tracking-tight text-foreground">
              {project.title}
            </h3>
            <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
              <StatusBadge status={project.status} />
              {meta && <p className="font-mono text-[11px] leading-snug text-foreground/65">{meta}</p>}
            </div>
          </div>
        </div>

        <p className="mt-5 text-pretty text-lg font-medium leading-snug text-foreground">{project.tagline}</p>

        <div className="mt-5 border-l-2 border-foreground/20 pl-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-foreground/65">My role</p>
          <p className="mt-1 text-[15px] font-medium leading-snug text-foreground">{project.role}</p>
          {project.contribution && (
            <p className="mt-2 text-pretty text-[15px] leading-relaxed text-foreground/70">{project.contribution}</p>
          )}
        </div>

        {project.stack.length > 0 && (
          <TagList items={project.stack} label={`${project.title} tech stack`} className="mt-5" />
        )}

        <div className="mt-auto pt-6">
          <span
            aria-hidden="true"
            className="flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-foreground px-4 py-2.5 font-mono text-[13px] font-medium text-background transition-[opacity,translate] duration-200 group-hover:opacity-90 group-focus-within:opacity-90 motion-reduce:transition-none"
          >
            View Project Details
            <ArrowUpRight className="size-4 transition-[translate] duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-0" />
          </span>
        </div>
      </div>

      <Link
        href={caseStudyPath(project)}
        onClick={onNavigate}
        aria-label={`View ${project.title} project details`}
        className="absolute inset-0 z-10 rounded-lg focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-foreground"
      />
    </div>
  );
}
