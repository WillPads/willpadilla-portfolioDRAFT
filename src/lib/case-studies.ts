import { featuredProjects, type FeaturedProject, type CaseStudy } from "@/data/portfolio";

export type CaseStudyProject = FeaturedProject & { caseStudy: CaseStudy };

// The page for a project lives at /projects/<slug>, using the slug from portfolio.ts.
export const caseStudyPath = (project: Pick<FeaturedProject, "slug">) => `/projects/${project.slug}`;

// Only projects with a filled-in caseStudy get a page, in the same order as the turntable.
export function getCaseStudyProjects(): CaseStudyProject[] {
  return featuredProjects.filter((project): project is CaseStudyProject => Boolean(project.caseStudy));
}

export function getCaseStudyProject(slug: string): CaseStudyProject | undefined {
  return getCaseStudyProjects().find((project) => project.slug === slug);
}
