import type { ProjectStatus } from "@/data/portfolio";

// One status marker for every place a status appears: an accent dot plus an uppercase mono label.
// The label carries the meaning; the dot is solid for Live and Completed and a ring for In Development.
const statuses: Record<ProjectStatus, { label: string; dot: string }> = {
  live: { label: "Live", dot: "bg-accent" },
  completed: { label: "Completed", dot: "bg-accent" },
  "in-development": { label: "In Development", dot: "border-2 border-accent" },
};

export default function StatusBadge({ status }: { status: ProjectStatus }) {
  const { label, dot } = statuses[status];

  return (
    <span className="inline-flex items-center gap-2 whitespace-nowrap font-mono text-[11px] font-medium uppercase tracking-wider text-foreground/65">
      <span aria-hidden="true" className={`size-2 shrink-0 rounded-full ${dot}`} />
      <span className="sr-only">Status: </span>
      {label}
    </span>
  );
}
