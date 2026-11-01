import { moreProjects } from "@/data/portfolio";
import StatusBadge from "@/components/ui/StatusBadge";
import TagList from "@/components/ui/TagList";
import ProjectLinks from "@/components/ui/ProjectLinks";
import { proseClass, subHeadingClass } from "@/components/ui/styles";

// A compact list under the turntable. Hidden, heading included, while moreProjects is empty.
export default function MoreProjects() {
  if (moreProjects.length === 0) return null;

  return (
    <div className="mt-14">
      <h3 className={subHeadingClass}>More projects</h3>
      <ul className="grid gap-4 md:grid-cols-2">
        {moreProjects.map((project) => {
          const meta = [project.year, project.context].filter(Boolean).join(" / ");
          return (
            <li
              key={project.slug}
              className="flex flex-col gap-3 rounded-lg border border-foreground/15 p-5"
            >
              <div className="flex flex-col gap-2">
                <h4 className="text-lg font-medium leading-tight tracking-tight text-foreground">
                  {project.title}
                </h4>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <StatusBadge status={project.status} />
                  {meta && <p className="font-mono text-[11px] text-foreground/65">{meta}</p>}
                </div>
              </div>
              <p className={`text-base leading-relaxed text-foreground/80 ${proseClass}`}>{project.tagline}</p>
              {project.impact && (
                <p className="text-base leading-relaxed text-foreground">
                  <span className="font-mono text-xs text-foreground/65">Impact:</span> {project.impact}
                </p>
              )}
              <TagList items={project.stack} label={`${project.title} tech stack`} />
              <ProjectLinks project={project} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
