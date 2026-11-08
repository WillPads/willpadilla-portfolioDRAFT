import { belt } from "@/data/portfolio";
import { sectionGapClass } from "@/components/ui/styles";

// "At a glance": a quiet, full-bleed strip of short facts that slowly scrolls, level with the page,
// one row per entry in `belt` (portfolio.ts), alternating direction. Row one is roles and
// availability; row two is certifications, so it adds information the sections around it only show
// in full. Each row is a track of four copies of its list that slides by exactly half its width
// (CSS translate, see .belt-track), so the loop is seamless. Only the first copy is exposed to
// screen readers; the rest are aria-hidden. It keeps moving under the cursor and on tap; only
// keyboard focus (focus-visible) pauses it. Under reduced motion it is a static wrapped row.
// Hidden while `belt` is empty.
function Separator() {
  return <span aria-hidden="true" className="size-1.5 shrink-0 rotate-45 border border-foreground/40" />;
}

function Sequence({ row, hidden }: { row: (typeof belt)[number]; hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      className={`flex shrink-0 items-center gap-8 pr-8 ${hidden ? "belt-dup" : ""}`}
    >
      {row.map((item) => (
        <li key={item.text} className="flex shrink-0 items-center gap-8 whitespace-nowrap">
          <span className="inline-flex items-center gap-2">
            {item.open && <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-accent" />}
            {item.text}
          </span>
          <Separator />
        </li>
      ))}
    </ul>
  );
}

export default function Belt() {
  const rows = belt.filter((row) => row.length > 0);
  if (rows.length === 0) return null;

  return (
    <section aria-label="At a glance" className={`${sectionGapClass} overflow-x-clip py-8`}>
      <div
        tabIndex={0}
        className="belt w-full border-y border-foreground/10 bg-background focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-foreground"
      >
        {rows.map((row, index) => (
          <div
            key={index}
            className={`overflow-hidden py-3.5 font-mono text-xs uppercase tracking-[0.14em] text-foreground/65 ${index > 0 ? "border-t border-foreground/10" : ""}`}
          >
            <div
              className="belt-track flex w-max"
              style={{ "--belt-time": `${index === 0 ? 140 : 170}s`, "--belt-dir": index % 2 ? "reverse" : "normal" } as React.CSSProperties}
            >
              <Sequence row={row} />
              <Sequence row={row} hidden />
              <Sequence row={row} hidden />
              <Sequence row={row} hidden />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
