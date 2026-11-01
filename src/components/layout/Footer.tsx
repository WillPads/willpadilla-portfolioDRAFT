import { ArrowUp, Mail } from "lucide-react";
import { site } from "@/data/portfolio";
import ExternalLink from "@/components/ui/ExternalLink";
import CopyEmailButton from "@/components/ui/CopyEmailButton";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { containerClass, iconLinkClass } from "@/components/ui/styles";

export default function Footer() {
  return (
    <footer className={`${containerClass} mt-16 md:mt-24 pb-10`}>
      <div className="flex items-center justify-between gap-4 border-t border-foreground/10 pt-6">
        <div className="min-w-0">
          <p className="text-sm text-foreground">
            &copy; {new Date().getFullYear()} Will Padilla
          </p>
          <p className="mt-0.5 text-sm text-foreground/65">Based in {site.location}</p>
        </div>
        <nav aria-label="Footer" className="-mr-2.5 flex shrink-0 items-center">
          <CopyEmailButton className={iconLinkClass}>
            <Mail aria-hidden="true" className="size-[18px]" />
          </CopyEmailButton>
          <ExternalLink href={site.social.github} arrow={false} className={iconLinkClass}>
            <GithubIcon className="size-[18px]" />
            <span className="sr-only">GitHub</span>
          </ExternalLink>
          <ExternalLink href={site.social.linkedin} arrow={false} className={iconLinkClass}>
            <LinkedinIcon className="size-[18px]" />
            <span className="sr-only">LinkedIn</span>
          </ExternalLink>
          <a href="#top" aria-label="Back to top" className={iconLinkClass}>
            <ArrowUp aria-hidden="true" className="size-[18px]" />
          </a>
        </nav>
      </div>
    </footer>
  );
}
