import Link from "next/link";
import { nav, site } from "@/data/portfolio";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-background">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        <Link
          href="#"
          className="py-3 font-button text-sm font-bold uppercase tracking-widest text-black"
        >
          <span className="sm:hidden">WP</span>
          <span className="hidden sm:inline">{site.name}</span>
        </Link>
        <nav className="flex items-center gap-0 font-button text-[11px] uppercase tracking-wider text-black/70 sm:gap-1 sm:text-xs sm:tracking-widest">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-2.5 py-3 sm:px-3 transition-all duration-300 hover:scale-105 hover:bg-black/5 hover:text-black"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
