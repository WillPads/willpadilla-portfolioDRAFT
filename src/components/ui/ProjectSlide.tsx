import type { CSSProperties } from "react";
import Image from "next/image";
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
      className="turntable-slide group relative flex cursor-pointer flex-col gap-3 rounded-lg border border-foreground/15 bg-background p-5 pb-16 hover:-translate-y-1 hover:border-foreground focus-within:-translate-y-1 focus-within:border-foreground data-[pos=active]:border-foreground motion-reduce:hover:translate-y-0 motion-reduce:focus-within:translate-y-0 md:p-6 md:pb-[4.5rem]"
    >
      {project.cardImage && (
        // Decorative logo, faint behind the text; it dissolves while the card is hovered or focused.
        // Touch screens can't hover, so there it dissolves once the card settles in the centre and
        // comes back when the card moves aside.
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-lg opacity-[0.12] transition-opacity duration-300 group-hover:opacity-0 group-focus-within:opacity-0 pointer-coarse:duration-700 pointer-coarse:group-data-[pos=active]:opacity-0 pointer-coarse:group-data-[pos=active]:delay-500 motion-reduce:transition-none"
        >
          <Image
            src={project.cardImage.src}
            alt=""
            fill
            sizes="(min-width: 1024px) 28rem, (min-width: 768px) 46vw, 80vw"
            className="object-cover"
          />
        </div>
      )}

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

      <p className="text-base leading-relaxed text-foreground/80">{project.tagline}</p>

      <TagList items={project.stack} label={`${project.title} tech stack`} className="mt-1" />

      <div className="mt-1 border-t border-foreground/15 pt-3">
        <p className="text-[15px] font-medium leading-snug text-foreground">{project.role}</p>
        {project.contribution && (
          <p className="mt-1 text-[15px] leading-relaxed text-foreground/80">{project.contribution}</p>
        )}
      </div>

      <Link
        href={caseStudyPath(project)}
        onClick={onNavigate}
        aria-label={`View ${project.title} project details`}
        className="absolute inset-0 z-10 cursor-pointer rounded-lg focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-foreground"
      >
        {/* Always visible, in the space the card reserves at its bottom; floats up when the cursor is on it. */}
        <span
          aria-hidden="true"
          className="absolute bottom-4 left-5 md:bottom-5 md:left-6"
        >
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-foreground px-2.5 py-1.5 font-mono text-[11px] font-medium text-background transition-[translate] duration-200 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
            View Project Details
            <ArrowUpRight aria-hidden="true" className="size-3.5" />
          </span>
        </span>
      </Link>
    </div>
  );
}
