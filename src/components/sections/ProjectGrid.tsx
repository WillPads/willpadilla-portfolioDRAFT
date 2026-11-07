"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import type { FeaturedProject } from "@/data/portfolio";
import ProjectCard from "@/components/ui/ProjectCard";
import { caseStudyPath } from "@/lib/case-studies";

// Featured projects as a card grid: one column on phones, two from md, in portfolio.ts order.
// Opening a card runs a view transition into its case study page (the card fades up while the
// article rises in, styled in globals.css). Reduced motion, modifier clicks and browsers without the
// View Transitions API just follow the link.
export default function ProjectGrid({ projects }: { projects: FeaturedProject[] }) {
  const router = useRouter();
  const navigating = useRef(false);

  function navigateToCaseStudy(event: React.MouseEvent<HTMLAnchorElement>, project: FeaturedProject) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }
    if (navigating.current) {
      event.preventDefault();
      return;
    }

    const canTransition =
      typeof document.startViewTransition === "function" &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canTransition) return;

    event.preventDefault();
    navigating.current = true;
    const card = document.getElementById(`project-card-${project.slug}`);
    if (card) card.style.viewTransitionName = "project-card";
    const transition = document.startViewTransition(async () => {
      if (card) card.style.viewTransitionName = "";
      // Wait until the case study article is in the DOM (or give up after 4s).
      await new Promise<void>((resolve) => {
        const observer = new MutationObserver(() => {
          if (!document.querySelector(`[data-case-study="${project.slug}"]`)) return;
          observer.disconnect();
          window.clearTimeout(timeout);
          resolve();
        });
        observer.observe(document.body, { childList: true, subtree: true });
        const timeout = window.setTimeout(() => {
          observer.disconnect();
          resolve();
        }, 4000);
        router.push(caseStudyPath(project));
      });
    });
    transition.finished.finally(() => {
      if (card) card.style.viewTransitionName = "";
      navigating.current = false;
    });
  }

  return (
    <ul className="grid gap-5 md:grid-cols-2 md:gap-6">
      {projects.map((project) => (
        <li key={project.slug}>
          <ProjectCard
            project={project}
            onNavigate={(event) => navigateToCaseStudy(event, project)}
          />
        </li>
      ))}
    </ul>
  );
}
