import { projects } from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "@/components/ui/ProjectCard";
import Reveal from "@/components/ui/Reveal";

export default function ProjectsSection() {
  return (
    <section id="projects" className="border-b border-black/10">
      <div className="mx-auto w-full max-w-5xl px-6 pt-20 pb-28">
        <SectionHeading eyebrow="Projects" title="Selected work" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Reveal
              key={project.title}
              className={project.span === "wide" ? "lg:col-span-2" : "lg:col-span-1"}
            >
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
