"use client";

import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { FeaturedProject } from "@/data/portfolio";
import ProjectSlide from "@/components/ui/ProjectSlide";
import ProjectDetail from "@/components/ui/ProjectDetail";
import { iconButtonClass } from "@/components/ui/styles";

// The two view-transition names (see globals.css). They are only set while a transition runs, one element
// at a time, so no name is ever on the page twice (a duplicate would abort the transition).
const TITLE_VT = "project-title";
const PANEL_VT = "project-panel-card";
// Where the panel's top edge lands after opening, in px from the top of the viewport (below the 56px header).
const PANEL_TOP = 88;

// Swipe must travel at least this far sideways, and mostly sideways, to count.
const SWIPE_DISTANCE = 48;

type FocusTarget = "panel" | "view" | "region";

// The turntable: featured projects sit on a rotating track with the active one centred.
// - With 3 or more projects it loops: the previous project is always on the left and the next on the
//   right, and prev/next/arrows/swipe wrap. With 2 it is a centred pair, with no loop.
// - Each slide's distance is the signed shortest one modulo the count. A slide that wraps to the other
//   side jumps without a transition and fades in (see data-wrap in globals.css), so it never flies
//   across the centre and every turn moves exactly one step.
// - Opening a project shows a detail panel below the track. Turning to another project while the
//   panel is open swaps the panel to that project. It stays open until closed.
// - Media (screenshots, video) lives only in the panel, so nothing loads until a project is opened.
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
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState(0); // the slide that was active before the last turn
  const [turn, setTurn] = useState(0); // counts turns; its parity restarts the fade on wrapped slides
  const [open, setOpen] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  const regionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const pendingFocus = useRef<FocusTarget | null>(null);
  const drag = useRef<{ x: number; y: number } | null>(null);
  const swiped = useRef(false);
  const opening = useRef(false);

  // Moves keyboard focus once the DOM has updated (the focused button may have been replaced).
  useEffect(() => {
    const target = pendingFocus.current;
    pendingFocus.current = null;
    if (target === "panel") {
      headingRef.current?.focus({ preventScroll: true });
      placePanel();
    }
    else if (target === "view")
      document.getElementById(`view-${projects[active].slug}`)?.focus();
    else if (target === "region") regionRef.current?.focus();
  }, [active, open, projects]);

  function goTo(index: number, focusAfter: FocusTarget | null = null) {
    const next = loops
      ? ((index % count) + count) % count
      : Math.min(Math.max(index, 0), count - 1);
    if (next === active) return;
    pendingFocus.current = focusAfter;
    setPrevious(active);
    setTurn((t) => t + 1);
    setActive(next);
    setAnnouncement(`Project ${next + 1} of ${count}: ${projects[next].title}`);
  }

  // Brings the panel's top edge near the top of the screen (smooth, or instant for reduced motion).
  function placePanel() {
    const panel = document.getElementById("project-panel");
    if (!panel) return;
    const delta = panel.getBoundingClientRect().top - PANEL_TOP;
    if (Math.abs(delta) < 8) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: window.scrollY + delta, behavior: reduce ? "instant" : "smooth" });
  }

  // Opening: the card's title morphs into the panel's heading and the panel rises in (browser View
  // Transitions API, transform and opacity only, see globals.css); then the page glides so the panel sits
  // near the top. Without the API, or under reduced motion, the panel simply opens (and the effect above
  // focuses the heading and scrolls).
  function openPanel() {
    if (swiped.current || opening.current) return;
    const card = document.getElementById(`card-title-${projects[active].slug}`);
    const canMorph =
      typeof document.startViewTransition === "function" &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canMorph || !card) {
      pendingFocus.current = "panel";
      setOpen(true);
      return;
    }

    opening.current = true;
    card.style.viewTransitionName = TITLE_VT; // the "before" picture is taken now
    const transition = document.startViewTransition(() => {
      card.style.viewTransitionName = "";
      flushSync(() => setOpen(true));
      const heading = headingRef.current;
      const region = document.querySelector<HTMLElement>("#project-panel > [role=region]");
      if (heading) {
        heading.style.viewTransitionName = TITLE_VT;
        heading.focus({ preventScroll: true });
      }
      if (region) region.style.viewTransitionName = PANEL_VT;
    });
    transition.finished.finally(() => {
      card.style.viewTransitionName = "";
      if (headingRef.current) headingRef.current.style.viewTransitionName = "";
      const region = document.querySelector<HTMLElement>("#project-panel > [role=region]");
      if (region) region.style.viewTransitionName = "";
      opening.current = false;
      placePanel();
    });
  }

  function togglePanel() {
    if (open) {
      pendingFocus.current = "view";
      setOpen(false);
    } else {
      openPanel();
    }
  }

  function closePanel() {
    pendingFocus.current = "view";
    setOpen(false);
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
    goTo(target, onSlide ? "region" : null);
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
    goTo(active + (dx < 0 ? 1 : -1), "region");
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
                  isOpen={open && index === active}
                  onSelect={() => !swiped.current && goTo(index, "view")}
                  onToggle={togglePanel}
                  onOpen={openPanel}
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

      <div id="project-panel">
        {open && (
          <ProjectDetail
            key={projects[active].slug}
            project={projects[active]}
            headingRef={headingRef}
            onClose={closePanel}
          />
        )}
      </div>
    </div>
  );
}
