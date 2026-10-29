import type { Project } from "@/data/portfolio";
import StatusBadge from "@/components/ui/StatusBadge";
import DeviceFrame from "@/components/ui/DeviceFrame";

const accentBorder = {
  mono: "hover:border-black",
  "blue-purple": "hover:border-t-blue-500 hover:border-b-purple-500",
} as const;

const accentTitle = {
  mono: "group-hover:text-black",
  "blue-purple": "group-hover:text-blue-600",
} as const;

const accentCta = {
  mono: "group-hover:text-black",
  "blue-purple": "group-hover:text-purple-600",
} as const;

export default function ProjectCard({ project }: { project: Project }) {
  const isCompleted = project.status === "completed";

  return (
    <div
      className={`group relative flex h-full flex-col gap-6 overflow-hidden border border-black/10 bg-background p-6 transition-all duration-300 hover:-translate-y-2 hover:bg-white hover:shadow-[0_20px_45px_rgba(0,0,0,0.10)] sm:p-8 ${accentBorder[project.accent]}`}
    >
      <div className="relative flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1.5">
          <h3
            className={`font-heading text-2xl font-bold uppercase tracking-tight text-black transition-colors duration-300 ${accentTitle[project.accent]}`}
          >
            {project.title}
          </h3>
          <p className="font-button text-[11px] font-bold uppercase tracking-widest text-black/70">
            {project.role}
          </p>
          <p className="font-body text-[11px] uppercase tracking-widest text-black/60">
            {project.stack.join(" / ")}
          </p>
        </div>
        <StatusBadge status={project.status} />
      </div>

      <p className="relative font-body text-sm leading-relaxed text-black/65">
        {project.description}
      </p>

      <div
        className={
          project.device === "mobile"
            ? "relative flex gap-3 overflow-x-auto pt-2"
            : "relative grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2"
        }
      >
        {project.screenshots
          ? project.screenshots.map((shot) => (
              <DeviceFrame
                key={shot.src}
                variant={project.device}
                src={shot.src}
                alt={shot.alt}
              />
            ))
          : Array.from({ length: project.screenshotCount }).map((_, i) => (
              <DeviceFrame key={i} variant={project.device} />
            ))}
      </div>

      {isCompleted && project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`relative mt-auto inline-flex w-fit items-center gap-1 py-3.5 font-button text-xs font-bold uppercase tracking-widest text-black/60 transition-all duration-300 hover:scale-105 ${accentCta[project.accent]}`}
        >
          View Project ↗
        </a>
      )}
    </div>
  );
}
