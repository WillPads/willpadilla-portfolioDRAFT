import Header from "@/components/layout/Header";
import SkipLink from "@/components/layout/SkipLink";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Experience from "@/components/sections/Experience";
import ProjectsSection from "@/components/sections/ProjectsSection";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <SkipLink />
      <Header />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <Hero />
        <Experience />
        <ProjectsSection />
        <About />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
