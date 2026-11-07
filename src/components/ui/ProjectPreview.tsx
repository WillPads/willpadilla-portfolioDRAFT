import Image from "next/image";
import type { FeaturedProject } from "@/data/portfolio";

// The visual at the top of a project card: a flat device mockup on a dotted panel, so a visitor
// sees what the project looks like before reading. Both frames rise from the bottom edge and are
// cut off by it, so every card's panel has the same 16:9 shape. While the card is hovered or
// focused the device lifts a few pixels (no motion under reduced motion).
// Decorative: the card's text and link label describe the project, so the image has empty alt.
export default function ProjectPreview({ project }: { project: FeaturedProject }) {
  const preview = project.preview;
  const lift =
    "transition-transform duration-500 ease-out group-hover:-translate-y-1.5 group-focus-within:-translate-y-1.5 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0 motion-reduce:group-focus-within:translate-y-0";

  return (
    <div
      aria-hidden="true"
      className="page-dots relative aspect-[16/9] overflow-hidden border-b border-foreground/10 bg-foreground/[0.03]"
    >
      {preview?.frame === "phone" && (
        <div
          className={`absolute left-1/2 top-[9%] w-[28%] -translate-x-1/2 rounded-[1.4rem] border border-foreground/25 bg-background p-[3%] ${lift}`}
        >
          <div className="relative aspect-[9/19] overflow-hidden rounded-[1rem]">
            <Image src={preview.src} alt="" fill sizes="(min-width: 768px) 12rem, 30vw" className="object-cover object-top" />
          </div>
        </div>
      )}

      {preview?.frame === "browser" && (
        <div
          className={`absolute inset-x-[7%] top-[11%] overflow-hidden rounded-lg border border-foreground/25 bg-background ${lift}`}
        >
          <div className="flex h-6 items-center gap-1.5 border-b border-foreground/15 px-2.5 md:h-7">
            <span className="size-2 rounded-full bg-foreground/25" />
            <span className="size-2 rounded-full bg-foreground/25" />
            <span className="size-2 rounded-full bg-foreground/25" />
            <span className="ml-2 h-2.5 w-1/3 rounded-full bg-foreground/10" />
          </div>
          <div className="relative aspect-[16/10]">
            <Image
              src={preview.src}
              alt=""
              fill
              sizes="(min-width: 1280px) 36rem, (min-width: 768px) 42vw, 86vw"
              className="object-cover object-top"
            />
          </div>
        </div>
      )}

      {!preview && project.cardImage && (
        <div className="absolute left-1/2 top-1/2 size-[38%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg border border-foreground/15 bg-background">
          <Image src={project.cardImage.src} alt="" fill sizes="12rem" className="object-contain p-3" />
        </div>
      )}
    </div>
  );
}
