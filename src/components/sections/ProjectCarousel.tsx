"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { FeaturedProject } from "@/data/portfolio";
import ProjectSlide from "@/components/ui/ProjectSlide";
import { caseStudyPath } from "@/lib/case-studies";
import { iconButtonClass } from "@/components/ui/styles";

// Swipe must travel at least this far sideways, and mostly sideways, to count.
const SWIPE_DISTANCE = 48;

// The turntable: featured projects sit on a rotating track with the active one centred.
// - With 3 or more projects it loops: the previous project is always on the left and the next on the
//   right, and prev/next/arrows/swipe wrap. With 2 it is a centred pair, with no loop.
// - Each slide's distance is the signed shortest one modulo the count. A slide that wraps to the other
//   side jumps without a transition and fades in (see data-wrap in globals.css), so it never flies
//   across the centre and every turn moves exactly one step.
// - Every project card links directly to its case study. Carousel controls still let visitors
//   inspect the available projects before choosing one.
// Signed shortest distance from `from` to `index` around a loop of `count`: -floor(n/2)..floor(n/2)
// (for even counts the tie goes to the right side, so it is always the same side).
function loopOffset(index: number, from: number, count: number) {
  const d = (((index - from) % count) + count) % count;
  return d > Math.floor(count / 2) ? d - count : d;
}

export default function ProjectCarousel({
  projects,
}: {
  projects: FeaturedProject[];
}) {
  const count = projects.length;
  const loops = count >= 3;
  const router = useRouter();
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState(0); // the slide that was active before the last turn
  const [turn, setTurn] = useState(0); // counts turns; its parity restarts the fade on wrapped slides
  const [announcement, setAnnouncement] = useState("");

  const regionRef = useRef<HTMLElement>(null);
  const pendingRegionFocus = useRef(false);
  const drag = useRef<{ x: number; y: number } | null>(null);
  const swiped = useRef(false);
  const navigating = useRef(false);

  // Moves keyboard focus once the DOM has updated (the focused button may have been replaced).
  useEffect(() => {
    if (!pendingRegionFocus.current) return;
    pendingRegionFocus.current = false;
    regionRef.current?.focus();
  }, [active]);

  function goTo(index: number, focusRegion = false) {
    const next = loops
      ? ((index % count) + count) % count
      : Math.min(Math.max(index, 0), count - 1);
    if (next === active) return;
    pendingRegionFocus.current = focusRegion;
    setPrevious(active);
    setTurn((t) => t + 1);
    setActive(next);
    setAnnouncement(`Project ${next + 1} of ${count}: ${projects[next].title}`);
  }

  function navigateToCaseStudy(event: React.MouseEvent<HTMLAnchorElement>, project: FeaturedProject) {
    if (swiped.current) {
      event.preventDefault();
      return;
    }
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
    const transition = document.startViewTransition(async () => {
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
      navigating.current = false;
    });
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLElement>) {
    if (count < 2) return;
    const key = event.key;
    let target: number | null = null;
    if (key === "ArrowRight") target = active + 1;
    else if (key === "ArrowLeft") target = active - 1;
    else if (key === "Home") target = 0;
    else if (key === "End") target = count - 1;
    if (target === null) return;
    event.preventDefault();
    // If focus was on a card button that is about to be replaced, park it on the carousel itself.
    const onSlide =
      event.target !== event.currentTarget &&
      (event.target as HTMLElement).closest("[role=group]");
    goTo(target, Boolean(onSlide));
  }

  function onPointerDown(event: React.PointerEvent) {
    swiped.current = false;
    if (count < 2) return;
    if (event.pointerType === "mouse" && event.button !== 0) return;
    drag.current = { x: event.clientX, y: event.clientY };
  }

  function onPointerUp(event: React.PointerEvent) {
    const start = drag.current;
    drag.current = null;
    if (!start) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) < SWIPE_DISTANCE || Math.abs(dx) < Math.abs(dy) * 1.5)
      return;
    swiped.current = true; // so the click that follows a swipe does not open or select a card
    window.setTimeout(() => (swiped.current = false), 350); // keyboard clicks later must still work
    goTo(active + (dx < 0 ? 1 : -1), true);
  }

  const hasMany = count > 1;
  // With exactly two projects, wide screens keep the pair centred instead of leaving one half of
  // the track empty (the active card then only changes emphasis and tilt, see --c in globals.css).
  const center = count === 2 ? (active === 0 ? 0.5 : -0.5) : 0;

  return (
    <div>
      <section
        ref={regionRef}
        aria-roledescription="carousel"
        aria-label="Featured projects"
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
      >
        <div
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => (drag.current = null)}
          // On phones the track runs edge to edge (past the container's px-4), so the neighbouring
          // card peeks in and is cut off by the screen edge. From md up it spans the container.
          className="-mx-4 touch-pan-y select-none overflow-x-clip py-3 md:mx-0"
        >
          <div className="turntable grid grid-cols-[minmax(0,1fr)]">
            {projects.map((project, index) => {
              const offset = loops
                ? loopOffset(index, active, count)
                : index - active;
              // A slide that moved more than one step (it wrapped around) must not slide across.
              const jumped =
                loops &&
                Math.abs(offset - loopOffset(index, previous, count)) > 1;
              return (
                <ProjectSlide
                  key={project.slug}
                  project={project}
                  index={index}
                  count={count}
                  offset={offset}
                  jump={jumped ? (turn % 2 ? "a" : "b") : undefined}
                  center={center}
                  onNavigate={(event) => navigateToCaseStudy(event, project)}
                />
              );
            })}
          </div>
        </div>

        {hasMany && (
          <div className="mt-4 flex items-center justify-center gap-4">
            <button
              type="button"
              aria-label="Previous project"
              aria-disabled={loops ? undefined : active === 0}
              onClick={() => goTo(active - 1)}
              className={iconButtonClass}
            >
              <ChevronLeft aria-hidden="true" className="size-5" />
            </button>
            <p className="min-w-16 text-center font-mono text-[13px] tabular-nums text-foreground/65">
              {active + 1} / {count}
            </p>
            <button
              type="button"
              aria-label="Next project"
              aria-disabled={loops ? undefined : active === count - 1}
              onClick={() => goTo(active + 1)}
              className={iconButtonClass}
            >
              <ChevronRight aria-hidden="true" className="size-5" />
            </button>
          </div>
        )}
      </section>

      <p aria-live="polite" className="sr-only">
        {announcement}
      </p>

    </div>
  );
}
