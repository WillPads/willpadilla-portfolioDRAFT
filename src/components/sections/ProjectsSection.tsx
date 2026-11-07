import { featuredProjects } from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import ProjectGrid from "@/components/sections/ProjectGrid";
import MoreProjects from "@/components/sections/MoreProjects";
import { containerClass, sectionGapClass } from "@/components/ui/styles";

export default function ProjectsSection() {
  return (
    <section id="projects" aria-labelledby="projects-title" className={`${containerClass} ${sectionGapClass}`}>
      <Reveal>
        <SectionHeading id="projects-title" title="Projects" />
      </Reveal>
      <Reveal delay={90}>
        {featuredProjects.length > 0 && <ProjectGrid projects={featuredProjects} />}
        <MoreProjects />
      </Reveal>
    </section>
  );
}
