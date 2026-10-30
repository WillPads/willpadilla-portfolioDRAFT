import { site } from "@/data/portfolio";
import { getVisibleNav } from "@/lib/nav";
import ThemeToggle from "@/components/ui/ThemeToggle";
import MobileMenu from "@/components/layout/MobileMenu";
import NavLinks from "@/components/layout/NavLinks";
import { containerClass } from "@/components/ui/styles";

// `onHome` is false on sub-pages such as a case study: section links then point at "/#section"
// and the wordmark goes to the top of the home page.
export default function Header({ onHome = true }: { onHome?: boolean }) {
  const prefix = onHome ? "" : "/";
  const items = getVisibleNav().map((item) => ({ ...item, href: `${prefix}${item.href}` }));

  return (
    <header className="sticky top-0 z-50 border-b border-foreground/10 bg-background">
      <div className={`${containerClass} flex min-h-14 items-center justify-between gap-3`}>
        {/* A small text-only wordmark so the bar is not empty on the left; the name and role live in the hero. */}
        <a
          href={`${prefix}#top`}
          aria-label={`${site.name}, back to top`}
          className="inline-flex min-h-11 shrink-0 items-center rounded-lg px-1 font-mono text-[13px] font-medium text-foreground hover:bg-foreground/5 focus-visible:bg-foreground/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
        >
          {site.name}
        </a>

        <nav aria-label="Main" className="hidden shrink-0 items-center gap-0.5 md:flex">
          <NavLinks items={items} />
          <ThemeToggle className="ml-2" />
        </nav>

        <MobileMenu items={items} resume={site.resume} />
      </div>
    </header>
  );
}
