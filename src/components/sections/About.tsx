import { skills } from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

export default function About() {
  return (
    <section id="about" className="border-b border-black/10">
      <Reveal className="mx-auto w-full max-w-5xl px-6 py-24">
        <SectionHeading eyebrow="About" title="A bit about me" />
        <div className="grid gap-12 sm:grid-cols-2">
          <p className="font-body text-lg leading-relaxed text-black/70">
            Replace this paragraph with a short bio: your background, what you focus
            on, and what kind of work you&apos;re looking for. Keep it to two or three
            sentences — visitors will read the projects below for the details.
          </p>
          <div id="skills" className="flex scroll-mt-24 flex-wrap content-start gap-1.5">
            {skills.flatMap((group) => group.items).map((skill) => (
              <span
                key={skill}
                className="border border-black/15 px-3 py-1 font-button text-xs uppercase tracking-wider text-black/70"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
