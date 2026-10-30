import Image from "next/image";
import type { CaseImage } from "@/data/portfolio";

// One image on a case study page. With width and height set the image keeps its own shape;
// without them it sits in a 16:10 frame. Always lazy unless `eager` (the cover) is set.
export default function CaseFigure({
  image,
  sizes,
  eager = false,
  className = "rounded-lg",
}: {
  image: CaseImage;
  sizes: string;
  eager?: boolean;
  className?: string;
}) {
  const frame = `overflow-hidden border border-foreground/15 ${className}`;
  const loading = eager ? { preload: true } : { loading: "lazy" as const };

  if (image.width && image.height) {
    return (
      <div className={frame}>
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes={sizes}
          {...loading}
          className="h-auto w-full"
        />
      </div>
    );
  }

  return (
    <div className={`relative aspect-[16/10] ${frame}`}>
      <Image src={image.src} alt={image.alt} fill sizes={sizes} {...loading} className="object-cover" />
    </div>
  );
}
