import { ArrowDown } from "lucide-react";
import Icono from "../assets/xavi.jpg";

export const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4"
    >
      
      {/* Contenido principal */}
      <div className="z-10 relative max-w-4xl mx-auto w-full flex flex-col md:flex-row items-center justify-center gap-10 pt-20 md:py-12">
        {/* Imagen lateral rectangular */}
        <img
          src={Icono}
          alt="Xavi"
          className="w-60 h-auto rounded-2xl shadow-lg border border-white/20 object-cover animate-fade-in"
        />

        {/* Texto principal */}
        <div className="text-center md:text-left space-y-3">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                <span className="text-primary opacity-0 animate-fade-in-delay-1">
                {" "}
                Xavi Algarra
                </span>
            </h1>
            <h1 className="text-3xl sm:text-3xl font-bold text-gradient animate-fade-in-delay-1">
                Estudiant d'Enginyeria Informàtica a la UPF
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground max-w-xl animate-fade-in-delay-2 text-left">
                Desenvolupo eines digitals que combinen tecnologia, comunicació i esport. 
                Especial interès en el desenvolupament web, la intel·ligència artificial aplicada i l’audiovisual esportiu.
            </p>

            <div className="pt-4 opacity-0 animate-fade-in-delay-4">
                <a
                href="#projects"
                className="cosmic-button"
                >
                Descobreix els meus projectes
                </a>
            </div>
        </div>
      </div>

      {/* Icono scroll */}
      <div className="hidden sm:flex absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-10 animate-bounce">
        <span className="text-sm text-muted-foreground mb-2">Scroll</span>
        <ArrowDown className="h-5 w-5 text-primary" />
      </div>
    </section>
  );
};
