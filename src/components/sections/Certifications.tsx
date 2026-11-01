"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { certifications, type Certification } from "@/data/portfolio";
import { iconButtonClass, subHeadingClass } from "@/components/ui/styles";

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

function loopOffset(index: number, from: number, count: number) {
  const distance = (((index - from) % count) + count) % count;
  return distance > Math.floor(count / 2) ? distance - count : distance;
}

function CertificationCarousel() {
  const count = certifications.length;
  const loops = count >= 3;
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
    const next = loops
      ? ((index % count) + count) % count
      : Math.min(Math.max(index, 0), count - 1);
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

  const center = count === 2 ? (active === 0 ? 0.5 : -0.5) : 0;

  return (
    <div className="mt-14 border-t border-foreground/10 pt-8">
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
          className="-mx-4 touch-pan-y select-none overflow-x-clip py-3 md:mx-0"
        >
          <div className="turntable grid grid-cols-[minmax(0,1fr)]">
            {certifications.map((certification, index) => {
              const offset = loops ? loopOffset(index, active, count) : index - active;
              const position = offset === 0 ? "active" : Math.abs(offset) === 1 ? "near" : "far";
              const jumped = loops && Math.abs(offset - loopOffset(index, previous, count)) > 1;
              const meta = [formatIssued(certification.issued), certification.credentialId]
                .filter(Boolean)
                .join(" / ");

              return (
                <div
                  key={certification.name}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${count}: ${certification.name}`}
                  data-pos={position}
                  data-wrap={jumped ? (turn % 2 ? "a" : "b") : undefined}
                  inert={position === "far"}
                  style={{ "--d": offset, "--c": center } as CSSProperties}
                  className="turntable-slide group relative flex flex-col gap-3 rounded-lg border border-foreground/15 bg-background p-4 hover:-translate-y-1 hover:border-foreground focus-within:-translate-y-1 focus-within:border-foreground data-[pos=active]:border-foreground motion-reduce:hover:translate-y-0 motion-reduce:focus-within:translate-y-0 sm:p-5"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-foreground/10 bg-background">
                    {position !== "far" && (
                      <Image
                        src={certification.image}
                        alt={certification.alt}
                        fill
                        loading="lazy"
                        sizes="(min-width: 1280px) 448px, (min-width: 768px) 36vw, 80vw"
                        className="object-contain"
                      />
                    )}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute bottom-2 right-2 z-20 inline-flex items-center gap-1 rounded-lg border border-foreground/15 bg-background/95 px-2 py-1 font-mono text-[10px] text-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100 motion-reduce:transition-none"
                    >
                      <ZoomIn aria-hidden="true" className="size-3" />
                      Enlarge
                    </span>
                  </div>
                  <div className="flex min-w-0 flex-col gap-1">
                    <h4 className="text-lg font-medium leading-tight text-foreground">{certification.name}</h4>
                    <p className="text-[15px] leading-relaxed text-foreground/65">{certification.issuer}</p>
                    <p className="font-mono text-xs text-foreground/65">{meta}</p>
                  </div>
                  <button
                    type="button"
                    aria-label={position === "active" ? `${certification.name}, current certification` : `Show ${certification.name}`}
                    aria-current={position === "active" ? "true" : undefined}
                    onClick={() => {
                      if (!swiped.current) setZoomedCertification(certification);
                    }}
                    title={`Enlarge ${certification.name}`}
                    className="absolute inset-0 z-10 cursor-pointer rounded-lg focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-foreground"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {count > 1 && (
          <div className="mt-4 flex items-center justify-center gap-4">
            <button
              type="button"
              aria-label="Previous certification"
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
              aria-label="Next certification"
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
