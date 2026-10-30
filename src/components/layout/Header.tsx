import { site } from "@/data/portfolio";
import { getVisibleNav } from "@/lib/nav";
import ThemeToggle from "@/components/ui/ThemeToggle";
import MobileMenu from "@/components/layout/MobileMenu";
import NavLinks from "@/components/layout/NavLinks";
import { containerClass } from "@/components/ui/styles";

// `onHome` is false on sub-pages such as a case study: section links then point at "/#section"
// and the logo goes to the top of the home page.
export default function Header({ onHome = true }: { onHome?: boolean }) {
  const prefix = onHome ? "" : "/";
  const items = getVisibleNav().map((item) => ({ ...item, href: `${prefix}${item.href}` }));

  return (
    <header className="sticky top-0 z-50 border-b border-foreground/10 bg-background">
      <div className={`${containerClass} flex min-h-16 items-center justify-between gap-3`}>
        <a
          href={`${prefix}#top`}
          aria-label={`${site.name}, back to top`}
          className="@container flex min-h-11 min-w-0 flex-1 items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
        >
          <span className="flex min-w-0 flex-col">
            <span className="text-[15px] font-medium leading-tight text-foreground">{site.name}</span>
            <span className="mt-0.5 hidden text-xs leading-snug text-foreground/65 @[15rem]:block">
              {site.role}
            </span>
          </span>
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
