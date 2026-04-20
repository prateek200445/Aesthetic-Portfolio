import ScrollyCanvas from "@/components/ScrollyCanvas";
import ProjectsIntro from "@/components/ProjectsIntro";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import { Footer } from "@/components/ui/footer";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main id="top" className="min-h-screen bg-[#121212] font-sans selection:bg-white/20">
      {/* Floating navbar */}
      <Navbar />

      <div className="relative w-full">
        {/* ScrollyCanvas provides the 500vh scroll space + text overlays */}
        <ScrollyCanvas />
      </div>

      {/* Cinematic transition: dramatic "explore my projects" headline */}
      <ProjectsIntro />

      {/* Projects section */}
      <div id="projects">
        <Projects />
      </div>

      {/* About section — already has id="about" internally */}
      <About />

      {/* Testimonials */}
      <div id="testimonials">
        <Testimonials />
      </div>

      {/* Footer — contact anchor */}
      <div id="contact">
        <Footer />
      </div>
    </main>
  );
}
