import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Experience from "@/components/sections/Experience";
import ProjectsSection from "@/components/sections/ProjectsSection";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <Hero />
        <ProjectsSection />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
