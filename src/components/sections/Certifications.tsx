"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { certifications, type Certification } from "@/data/portfolio";
import { iconButtonClass, subHeadingClass, subSectionGapClass } from "@/components/ui/styles";

// "2026-09" becomes "September 2026". Falls back to the raw text if it is not year-month.
function formatIssued(issued: string) {
  const match = /^(\d{4})-(\d{2})$/.exec(issued);
  if (!match) return issued;
  const date = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, 1));
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });
}

// Hidden (no heading, no list) while the certifications list is empty.
export default function Certifications() {
  if (certifications.length === 0) return null;

  return <CertificationCarousel />;
}

const SWIPE_DISTANCE = 48;

// Signed shortest distance around the loop: 0 is the active slide, 1 the next, -1 the previous.
function loopOffset(index: number, from: number, count: number) {
  const distance = (((index - from) % count) + count) % count;
  return distance > Math.floor(count / 2) ? distance - count : distance;
}

// A coverflow: the active certificate large and centred, its two neighbours angled toward it,
// smaller, dimmed and cut off by the edge of the stage. Nothing moves by itself. It is turned with
// the arrow buttons, the Left/Right keys, a swipe, or by clicking a side certificate; clicking the
// active one opens the enlarged view. It loops, and a slide that wraps around fades in instead of
// flying across the stage (.coverflow-slide in globals.css; reduced motion switches instantly).
function CertificationCarousel() {
  const count = certifications.length;
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState(0);
  const [turn, setTurn] = useState(0);
  const [announcement, setAnnouncement] = useState("");
  const [zoomedCertification, setZoomedCertification] = useState<Certification | null>(null);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const swiped = useRef(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (zoomedCertification && dialog && !dialog.open) dialog.showModal();
  }, [zoomedCertification]);

  function goTo(index: number) {
    const next = ((index % count) + count) % count;
    if (next === active) return;
    setPrevious(active);
    setTurn((value) => value + 1);
    setActive(next);
    setAnnouncement(`Certification ${next + 1} of ${count}: ${certifications[next].name}`);
  }

  function onKeyDown(event: KeyboardEvent<HTMLElement>) {
    let target: number | null = null;
    if (event.key === "ArrowRight") target = active + 1;
    else if (event.key === "ArrowLeft") target = active - 1;
    else if (event.key === "Home") target = 0;
    else if (event.key === "End") target = count - 1;
    if (target === null) return;
    event.preventDefault();
    goTo(target);
  }

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    swiped.current = false;
    pointerStart.current = { x: event.clientX, y: event.clientY };
  }

  function onPointerUp(event: PointerEvent<HTMLDivElement>) {
    const start = pointerStart.current;
    pointerStart.current = null;
    if (!start) return;
    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;
    if (Math.abs(deltaX) < SWIPE_DISTANCE || Math.abs(deltaX) < Math.abs(deltaY) * 1.5) return;
    swiped.current = true;
    window.setTimeout(() => (swiped.current = false), 350);
    goTo(active + (deltaX < 0 ? 1 : -1));
  }

  const current = certifications[active];
  const meta = [current.issuer, formatIssued(current.issued)].filter(Boolean).join(" / ");

  return (
    <div className={`${subSectionGapClass} border-t border-foreground/10 pt-8`}>
      <h3 className={subHeadingClass}>Certifications</h3>
      <section
        aria-roledescription="carousel"
        aria-label="Certifications"
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
      >
        <div
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => (pointerStart.current = null)}
          className="coverflow touch-pan-y select-none overflow-x-clip py-6"
        >
          <div className="grid grid-cols-[minmax(0,1fr)]">
            {certifications.map((certification, index) => {
              const offset = loopOffset(index, active, count);
              const distance = Math.abs(offset);
              const position = offset === 0 ? "active" : distance === 1 ? "near" : "far";
              const jumped = Math.abs(offset - loopOffset(index, previous, count)) > 1;

              return (
                <div
                  key={certification.name}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${count}: ${certification.name}`}
                  data-pos={position}
                  data-wrap={jumped ? (turn % 2 ? "a" : "b") : undefined}
                  inert={position === "far"}
                  style={{ "--d": offset } as CSSProperties}
                  className="coverflow-slide relative"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-foreground/10 bg-background">
                    {distance <= 2 && (
                      <Image
                        src={certification.image}
                        alt={certification.alt}
                        fill
                        loading={distance <= 1 ? "eager" : "lazy"}
                        sizes="(min-width: 768px) 52vw, 84vw"
                        className="object-contain"
                      />
                    )}
                  </div>
                  <button
                    type="button"
                    aria-label={position === "active" ? `Enlarge ${certification.name}` : `Show ${certification.name}`}
                    onClick={() => {
                      if (swiped.current) return;
                      if (position === "active") setZoomedCertification(certification);
                      else goTo(index);
                    }}
                    className={`absolute inset-0 z-10 rounded-lg focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-foreground ${position === "active" ? "cursor-zoom-in" : "cursor-pointer"}`}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div key={active} className="coverflow-caption mx-auto mt-2 flex max-w-2xl flex-col items-center gap-1 text-center">
          <h4 className="text-balance text-lg font-medium leading-tight text-foreground md:text-xl">{current.name}</h4>
          <p className="font-mono text-xs text-foreground/65 md:text-[13px]">{meta}</p>
        </div>

        <div className="mt-6 flex items-center justify-center gap-5">
          <button
            type="button"
            aria-label="Previous certification"
            onClick={() => goTo(active - 1)}
            className={`${iconButtonClass} !size-14 !rounded-full`}
          >
            <ChevronLeft aria-hidden="true" className="size-6" />
          </button>
          <p className="min-w-16 text-center font-mono text-sm tabular-nums text-foreground/65">
            {active + 1} / {count}
          </p>
          <button
            type="button"
            aria-label="Next certification"
            onClick={() => goTo(active + 1)}
            className={`${iconButtonClass} !size-14 !rounded-full`}
          >
            <ChevronRight aria-hidden="true" className="size-6" />
          </button>
        </div>
      </section>

      <p aria-live="polite" className="sr-only">
        {announcement}
      </p>

      {zoomedCertification && (
        <dialog
          ref={dialogRef}
          aria-labelledby="zoomed-certification-title"
          onClose={() => setZoomedCertification(null)}
          onClick={(event) => {
            if (event.target === event.currentTarget) event.currentTarget.close();
          }}
          className="certificate-zoom-dialog m-auto max-h-[92vh] max-w-[96vw] overflow-auto rounded-lg border border-foreground/15 bg-background p-4 text-foreground backdrop:bg-black/75"
        >
          <div className="mb-3 flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h2 id="zoomed-certification-title" className="text-lg font-medium leading-tight">
                {zoomedCertification.name}
              </h2>
              <p className="mt-1 text-sm text-foreground/65">
                {zoomedCertification.issuer} / {formatIssued(zoomedCertification.issued)}
              </p>
            </div>
            <button
              type="button"
              aria-label="Close enlarged certificate"
              onClick={() => dialogRef.current?.close()}
              className={iconButtonClass}
            >
              <X aria-hidden="true" className="size-5" />
            </button>
          </div>
          <div className="relative h-[min(76vh,820px)] w-[min(88vw,1100px)]">
            <Image
              src={zoomedCertification.image}
              alt={zoomedCertification.alt}
              fill
              sizes="(min-width: 1280px) 1100px, 88vw"
              className="object-contain"
            />
          </div>
        </dialog>
      )}
    </div>
  );
}
