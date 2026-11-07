import { site } from "@/data/portfolio";
import { getVisibleNav } from "@/lib/nav";
import MobileMenu from "@/components/layout/MobileMenu";
import NavLinks from "@/components/layout/NavLinks";
import Logo from "@/components/ui/Logo";
import { containerClass } from "@/components/ui/styles";

// Section links on the left (the menu button on phones), the logo on the right (a link to the top of
// the home page).
// `onHome` is false on sub-pages such as a case study: section links then point at "/#section"
// and the logo goes to the home page.
export default function Header({ onHome = true }: { onHome?: boolean }) {
  const prefix = onHome ? "" : "/";
  const items = getVisibleNav().map((item) => ({ ...item, href: `${prefix}${item.href}` }));

  return (
    <header className="sticky top-0 z-50 border-b border-foreground/10 bg-background">
      <div className={`${containerClass} flex min-h-14 items-center justify-between gap-3`}>
        <MobileMenu items={items} resume={site.resume} />

        <nav aria-label="Main" className="hidden shrink-0 items-center gap-0.5 md:-ml-3 md:flex">
          <NavLinks items={items} />
        </nav>

        <a
          href={onHome ? "#top" : "/"}
          aria-label={`${site.name}, home`}
          className="-mr-2 inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg px-2 text-foreground transition-colors duration-300 hover:bg-foreground/5 focus-visible:bg-foreground/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground motion-reduce:transition-none"
        >
          <Logo className="h-[22px] w-auto" />
        </a>
      </div>
    </header>
  );
}
