import type { FeaturedProject, ListProject } from "@/data/portfolio";
import ExternalLink from "@/components/ui/ExternalLink";
import { buttonClass } from "@/components/ui/styles";

// "Source" and "Live site" buttons. With no repoUrl, liveUrl or demo video, shows a quiet
// "Links coming soon" label instead, so no project ever has a dead or missing link.
export default function ProjectLinks({ project }: { project: FeaturedProject | ListProject }) {
  const hasDemo = "demoVideo" in project && Boolean(project.demoVideo);

  if (!project.repoUrl && !project.liveUrl) {
    if (hasDemo) return null;
    return <p className="font-mono text-xs text-foreground/65">Links coming soon</p>;
  }

  return (
    <div className="flex flex-wrap gap-3">
      {project.repoUrl && (
        <ExternalLink href={project.repoUrl} className={buttonClass}>
          Source
        </ExternalLink>
      )}
      {project.liveUrl && (
        <ExternalLink href={project.liveUrl} className={buttonClass}>
          Live site
        </ExternalLink>
      )}
    </div>
  );
}
