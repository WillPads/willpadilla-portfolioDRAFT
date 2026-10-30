import { featuredProjects } from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import ProjectCarousel from "@/components/sections/ProjectCarousel";
import MoreProjects from "@/components/sections/MoreProjects";
import { containerClass, sectionGapClass } from "@/components/ui/styles";

// overflow-x-clip: on phones the turntable track runs edge to edge, so this stops it from
// ever adding a sideways scrollbar.
export default function ProjectsSection() {
  return (
    <section id="projects" aria-labelledby="projects-title" className={`${containerClass} ${sectionGapClass} overflow-x-clip`}>
      <Reveal>
        <SectionHeading id="projects-title" title="Projects" />
      </Reveal>
      <Reveal delay={90}>
        {featuredProjects.length > 0 && <ProjectCarousel projects={featuredProjects} />}
        <MoreProjects />
      </Reveal>
    </section>
  );
}
