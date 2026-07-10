import { Navbar } from "../components/Navbar";
import { StarBackground } from "../components/StarBackground";
import { HeroSection } from "../components/HeroSection";
import { AboutMe } from "../components/AboutMe";
import { Experience } from "../components/Experience";
import { Contact } from "../components/Contact";
import { Projects } from "../components/Projects";
import { Footer } from "../components/Footer";
import { useReveal } from "../lib/useReveal";

// Home.jsx
export function Home() {
  useReveal();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
    
    {/* Background */}
    <StarBackground />

    {/* Navbar */}
    <Navbar />
    {/* Main Content */}
    <main>
        <HeroSection />
        <AboutMe />
        <Experience />
        <Projects />
        <Contact />
    </main>

    {/* Footer */}

    <Footer />
    {/* Optional: Add a scroll to top button */}
     
    </div>
    );
}
