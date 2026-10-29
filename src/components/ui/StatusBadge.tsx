import type { ProjectStatus } from "@/data/portfolio";

export default function StatusBadge({ status }: { status: ProjectStatus }) {
  const isCompleted = status === "completed";

  return (
    <span
      className={`inline-block whitespace-nowrap border px-2.5 py-1 font-button text-[10px] font-bold uppercase tracking-widest ${
        isCompleted ? "border-black bg-black text-white" : "border-black/25 text-black/60"
      }`}
    >
      {isCompleted ? "Completed / Live" : "In Development"}
    </span>
  );
}
