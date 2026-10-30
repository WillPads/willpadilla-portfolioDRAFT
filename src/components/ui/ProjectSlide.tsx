import type { CSSProperties } from "react";
import type { FeaturedProject } from "@/data/portfolio";
import StatusBadge from "@/components/ui/StatusBadge";
import TagList from "@/components/ui/TagList";
import { buttonClass } from "@/components/ui/styles";

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
  isOpen,
  onSelect,
  onToggle,
  onOpen,
}: {
  project: FeaturedProject;
  index: number;
  count: number;
  offset: number;
  jump?: "a" | "b";
  center: number;
  isOpen: boolean;
  onSelect: () => void;
  onToggle: () => void;
  onOpen: () => void;
}) {
  const isActive = offset === 0;
  const position = isActive ? "active" : Math.abs(offset) === 1 ? "near" : "far";
  const meta = [project.year, project.context].filter(Boolean).join(" / ");

  return (
    <div
      role="group"
      aria-roledescription="slide"
      aria-label={`${index + 1} of ${count}`}
      data-pos={position}
      data-wrap={jump}
      // Slides two or more steps away are invisible, so they are removed from the tab order.
      inert={position === "far"}
      onClick={isActive ? onOpen : undefined}
      style={{ "--d": offset, "--c": center } as CSSProperties}
      // Asymmetric corners: small on the left, large on the right. One flat 1px border on every
      // card; the active card, hover and keyboard focus all switch it to the solid text colour.
      className={`turntable-slide group relative flex flex-col gap-3 rounded-l-lg rounded-r-[1.75rem] border border-foreground/15 bg-background p-5 hover:border-foreground focus-within:border-foreground data-[pos=active]:border-foreground md:p-6 ${
        isActive ? "cursor-pointer" : ""
      }`}
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

      <p className="text-sm leading-snug text-foreground/65">{project.role}</p>

      <p className="text-sm leading-relaxed text-foreground/80">{project.tagline}</p>

      <TagList items={project.stack} label={`${project.title} tech stack`} className="mt-1" />

      {isActive ? (
        <button
          type="button"
          id={`view-${project.slug}`}
          aria-expanded={isOpen}
          aria-controls="project-panel"
          onClick={(event) => {
            event.stopPropagation();
            onToggle();
          }}
          className={`${buttonClass} mt-auto self-start`}
        >
          {isOpen ? "Hide project" : "View project"}
        </button>
      ) : (
        // Side cards are not read as a second copy of the content: one button turns the table to them.
        <button
          type="button"
          onClick={onSelect}
          aria-label={`Show ${project.title}, project ${index + 1} of ${count}`}
          className="absolute inset-0 z-10 cursor-pointer rounded-l-lg rounded-r-[1.75rem] focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-foreground"
        />
      )}
    </div>
  );
}
