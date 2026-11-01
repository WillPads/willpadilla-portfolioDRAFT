import { Mail } from "lucide-react";
import { site } from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import ExternalLink from "@/components/ui/ExternalLink";
import CopyEmailButton from "@/components/ui/CopyEmailButton";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { buttonClass, containerClass, pillWrapClass, proseClass, resumeLinkClass, sectionGapClass } from "@/components/ui/styles";

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className={`${containerClass} ${sectionGapClass}`}>
      <Reveal>
        <SectionHeading id="contact-title" title="Contact" />
      </Reveal>
      <Reveal delay={90}>
        <p className={`whitespace-pre-line text-pretty text-base leading-relaxed text-foreground/80 ${proseClass}`}>
          {site.contactNote}
        </p>
        <div className="mt-6 flex flex-col items-start gap-4">
          <CopyEmailButton className={pillWrapClass}>
            <Mail aria-hidden="true" className="size-4 shrink-0" />
            <span className="min-w-0">{site.email}</span>
          </CopyEmailButton>
          <div className="flex flex-wrap gap-3">
            <ExternalLink href={site.social.github} arrow={false} className={buttonClass}>
              <GithubIcon />
              GitHub
            </ExternalLink>
            <ExternalLink href={site.social.linkedin} arrow={false} className={buttonClass}>
              <LinkedinIcon />
              LinkedIn
            </ExternalLink>
            <ExternalLink href={site.resume} className={resumeLinkClass}>
              Resume
            </ExternalLink>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
