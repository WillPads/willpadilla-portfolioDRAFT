import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CaseStudyArticle from "@/components/sections/CaseStudyArticle";
import { caseStudyPath, getCaseStudyProject, getCaseStudyProjects } from "@/lib/case-studies";
import { containerClass, buttonClass } from "@/components/ui/styles";

// Only projects with a caseStudy are built; every other slug is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return getCaseStudyProjects().map((project) => ({ slug: project.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getCaseStudyProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} case study | Will Padilla`,
    description: project.caseStudy.summary,
  };
}

const neighbourClass =
  "flex min-h-11 flex-col gap-1 rounded-l-lg rounded-r-[1.75rem] border border-foreground/15 p-5 text-foreground transition-[background-color,scale] duration-300 hover:scale-[1.02] hover:bg-foreground/5 focus-visible:bg-foreground/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground motion-reduce:transition-none motion-reduce:hover:scale-100";

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getCaseStudyProject(slug);
  if (!project) notFound();

  // Previous and next only among projects that have a case study; no wrap-around.
  const all = getCaseStudyProjects();
  const index = all.findIndex((item) => item.slug === slug);
  const previous = index > 0 ? all[index - 1] : undefined;
  const next = index < all.length - 1 ? all[index + 1] : undefined;

  return (
    <>
      <Header onHome={false} />
      <main id="main" tabIndex={-1} className="flex-1 pb-6 outline-none">
        <div className={`${containerClass} pt-6 md:pt-10`}>
          <Link href="/#projects" className={`${buttonClass} mb-8`}>
            <ArrowLeft aria-hidden="true" className="size-4 shrink-0" />
            All projects
          </Link>

          <CaseStudyArticle project={project} />

          {(previous || next) && (
            <nav aria-label="More case studies" className="mt-16 grid gap-4 border-t border-foreground/10 pt-8 sm:grid-cols-2">
              {previous ? (
                <Link href={caseStudyPath(previous)} rel="prev" className={neighbourClass}>
                  <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-foreground/65">
                    <ArrowLeft aria-hidden="true" className="size-4" />
                    Previous
                  </span>
                  <span className="text-lg font-medium">{previous.title}</span>
                </Link>
              ) : (
                <span className="hidden sm:block" />
              )}
              {next && (
                <Link href={caseStudyPath(next)} rel="next" className={`${neighbourClass} sm:items-end sm:text-right`}>
                  <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-foreground/65">
                    Next
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </span>
                  <span className="text-lg font-medium">{next.title}</span>
                </Link>
              )}
            </nav>
          )}

          {slug === "signal-no-5" && (
            <div className="mt-8 flex justify-center">
              <Link href="/#projects" className={buttonClass}>
                <ArrowLeft aria-hidden="true" className="size-4 shrink-0" />
                Back to Projects
              </Link>
            </div>
          )}

          {!next && (
            <div className="mt-8 flex justify-center">
              <Link href="/" className={buttonClass}>
                <ArrowLeft aria-hidden="true" className="size-4 shrink-0" />
                Back to Home Page
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
