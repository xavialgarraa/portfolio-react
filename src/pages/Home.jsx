import { Navbar } from "../components/Navbar";
import { StarBackground } from "../components/StarBackground";
import { HeroSection } from "../components/HeroSection";

// Home.jsx
export function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
    
    {/* Background */}
    <StarBackground />

    {/* Navbar */}
    <Navbar />
    {/* Main Content */}
    <main>
        <HeroSection />
    </main>

    {/* Footer */}

    
    </div>
    );
}
