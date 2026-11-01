import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { FeaturedProject } from "@/data/portfolio";
import { caseStudyPath } from "@/lib/case-studies";
import StatusBadge from "@/components/ui/StatusBadge";
import TagList from "@/components/ui/TagList";

// One card on the turntable: a light preview only (no images or video).
// `jump` is set when the slide wrapped to the other side of the loop (see data-wrap in globals.css).
// `offset` is how far this slide is from the active one (0 = centred); `center` is the middle of
// the visible group in the same units (see --c in globals.css).
export default function ProjectSlide({
  project,
  index,
  count,
  offset,
  jump,
  center,
  onNavigate,
}: {
  project: FeaturedProject;
  index: number;
  count: number;
  offset: number;
  jump?: "a" | "b";
  center: number;
  onNavigate: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  const position = offset === 0 ? "active" : Math.abs(offset) === 1 ? "near" : "far";
  const meta = [project.year, project.context].filter(Boolean).join(" / ");

  return (
    <div
      id={`project-card-${project.slug}`}
      role="group"
      aria-roledescription="slide"
      aria-label={`${index + 1} of ${count}`}
      data-pos={position}
      data-wrap={jump}
      // Slides two or more steps away are invisible, so they are removed from the tab order.
      inert={position === "far"}
      style={{ "--d": offset, "--c": center } as CSSProperties}
      // Asymmetric corners: small on the left, large on the right. One flat 1px border on every
      // card; the active card, hover and keyboard focus all switch it to the solid text colour.
      className="turntable-slide group relative flex cursor-pointer flex-col gap-3 rounded-l-lg rounded-r-[1.75rem] border border-foreground/15 bg-background p-5 hover:-translate-y-1 hover:border-foreground focus-within:-translate-y-1 focus-within:border-foreground data-[pos=active]:border-foreground motion-reduce:hover:translate-y-0 motion-reduce:focus-within:translate-y-0 md:p-6"
    >
      <h3
        id={`card-title-${project.slug}`}
        className="w-fit max-w-full text-xl font-medium leading-tight tracking-tight text-foreground"
      >
        {project.title}
      </h3>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <StatusBadge status={project.status} />
        {meta && <p className="font-mono text-[11px] text-foreground/65">{meta}</p>}
      </div>

      <p className="text-[15px] leading-relaxed text-foreground/65">{project.role}</p>

      <p className="text-base leading-relaxed text-foreground/80">{project.tagline}</p>

      <TagList items={project.stack} label={`${project.title} tech stack`} className="mt-1" />

      <Link
        href={caseStudyPath(project)}
        onClick={onNavigate}
        aria-label={`View ${project.title} case study`}
        className="absolute inset-0 z-10 cursor-pointer rounded-l-lg rounded-r-[1.75rem] focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-foreground"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-4 z-20 inline-flex translate-y-1 items-center gap-1.5 rounded-lg border border-foreground/15 bg-background px-2.5 py-1.5 font-mono text-[11px] text-foreground opacity-0 transition-[opacity,translate] duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 motion-reduce:transition-none"
      >
        View Project
        <ArrowUpRight aria-hidden="true" className="size-3.5" />
      </span>
    </div>
  );
}
