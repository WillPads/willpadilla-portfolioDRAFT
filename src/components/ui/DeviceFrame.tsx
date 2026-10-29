import Image from "next/image";
import type { DeviceFrame as DeviceFrameVariant } from "@/data/portfolio";

export default function DeviceFrame({
  variant,
  src,
  alt,
}: {
  variant: DeviceFrameVariant;
  src?: string;
  alt?: string;
}) {
  const isMobile = variant === "mobile";
  const frameClasses = `relative flex shrink-0 items-center justify-center overflow-hidden border border-dashed border-black/20 ${
    isMobile ? "aspect-[9/19] w-24" : "aspect-[16/10] w-full"
  }`;

  if (src) {
    return (
      <div className={frameClasses}>
        <Image
          src={src}
          alt={alt ?? "Project screenshot"}
          fill
          sizes={isMobile ? "96px" : "50vw"}
          className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
        />
      </div>
    );
  }

  return (
    <div className={frameClasses}>
      <span className="px-2 text-center font-body text-[10px] uppercase tracking-widest text-black/60">
        Screenshot
      </span>
    </div>
  );
}
