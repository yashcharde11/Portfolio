import { AmbientBackground } from "@/components/ambient-background";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { TechMarquee } from "@/components/tech-marquee";
import { About } from "@/components/about";
import { Experience } from "@/components/experience";
import { ProjectsCTA } from "@/components/projects-cta";
import { Skills } from "@/components/skills";
import { ResumeSection } from "@/components/resume-section";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <AmbientBackground />
      <Navbar />
      <main>
        <Hero />
        <TechMarquee />
        <About />
        <Experience />
        <ProjectsCTA />
        <Skills />
        <ResumeSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
