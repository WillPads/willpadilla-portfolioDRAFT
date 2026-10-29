import { site } from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

export default function Contact() {
  return (
    <section id="contact">
      <Reveal className="mx-auto w-full max-w-5xl px-6 py-28">
        <SectionHeading eyebrow="Contact" title="Let's work together" />
        <div className="flex flex-col items-start gap-8 border border-black/10 p-6 sm:p-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md font-body text-lg leading-relaxed text-black/70">
            Have a project in mind or just want to say hi? My inbox is open.
          </p>
          <a
            href={`mailto:${site.email}`}
            className="border border-black bg-black px-8 py-4 font-button text-sm font-bold uppercase tracking-widest text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_30px_rgba(0,0,0,0.25)]"
          >
            {site.email} ↗
          </a>
        </div>
      </Reveal>
    </section>
  );
}
