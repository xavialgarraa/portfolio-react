import { Navbar } from "../components/NavbarAxProd";
import { StarBackground } from "../components/StarBackground";
import { Footer } from "../components/Footer";
import { HeroSection } from "../components/HeroSection";
import { useEffect, useState } from "react";
import Logo from "../assets/axprod.png";
import LogoDark from "../assets/axprod-dark.png";
import Video1 from "../assets/packs/alineacion.mp4";
import Video2 from "../assets/packs/alineacion-estatica.mp4";
import Video3 from "../assets/packs/estadisticas.mp4";
import Marcador2 from "../assets/packs/marcador-2.mp4";
import Marcador from "../assets/packs/marcador.mp4";
import Cambios from "../assets/packs/cambios.mp4";
import Clasificación from "../assets/packs/clasificacion.png";
import Previa from "../assets/packs/previa.png";

import { PackCard } from "../components/PackCard";

const packData = [
  {
    title: "Pack Bàsic",
    price: "15 €",
    description: "Marcador simple, alineacions i rètols estàtics. Ideal per clubs que comencen.",
    images: [
      Marcador,
      Video2,
      Video3, 
    ],
  },
  {
    title: "Pack Avançat",
    price: "30 €",
    description: "Marcador animat, estadístiques i transicions per OBS. Disseny personalitzat.",
    images: [
      Video1,
      Clasificación,
      Cambios,
    ],
  },
  {
    title: "Pack Personalitzat",
    price: "A consultar",
    description: "Gràfics a mida amb integració específica segons necessitats del club o la lliga.",
    images: [
      Marcador2,
      Previa,
    ],
  },
];


export const AxProd = () => {
  
  const [logoSrc, setLogoSrc] = useState(Logo); 

  useEffect(() => {
  // Función para actualizar el logo
  const updateLogo = () => {
    const storedTheme = localStorage.getItem("theme");
    setLogoSrc(storedTheme === "dark" ? Logo : LogoDark);
  };

  updateLogo();

  window.addEventListener('storage', updateLogo);

   return () => window.removeEventListener('storage', updateLogo);
  }, []);

  return (
     <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
    
    {/* Background */}
    <StarBackground />

    {/* Navbar */}
    <Navbar />
    {/* Main Content */}
    <main className="relative z-10 py-24 px-6 space-y-24">

    {/* Introducció AxProd */}
    <section className="max-w-4xl mx-auto text-center space-y-4">
      {/* <img
          src={isDarkMode ? Logo : LogoDark}
          alt="Logo"
          className="w-8 h-8 transition-all duration-300"
      /> */}
      <div className="z-10 relative max-w-4xl mx-auto w-full flex flex-col md:flex-row items-center justify-center gap-10 pt-20 md:py-12">
          {/* Imagen lateral rectangular */}
          <img
            src={logoSrc}
            alt="Xavi"
            className="w-60 h-auto rounded-2xl shadow-lg border border-white/20 object-cover animate-fade-in"
          />
  
          {/* Texto principal */}
          <div className="text-center md:text-left space-y-3">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                  <span className="text-primary opacity-0 animate-fade-in-delay-1">
                  {" "}
                  AX Prod
                  </span>
              </h1>
              <h1 className="text-3xl sm:text-3xl font-bold text-gradient animate-fade-in-delay-1">
                  Producció i comunicació esportiva

              </h1>
  
              <p className="text-base sm:text-lg text-muted-foreground max-w-xl animate-fade-in-delay-2 text-left">
                  Desenvolupo gràfics personalitzats per retransmissions amb OBS i ofereixo serveis de cobertura, locució i assessorament audiovisual per clubs i entitats esportives.
              </p>
  
              {/* <div className="pt-4 opacity-0 animate-fade-in-delay-4">
                  <a
                  href="#projects"
                  className="cosmic-button"
                  >
                  Descobreix els meus projectes
                  </a>
              </div> */}
          </div>
        </div>
      
    </section>

    {/* Projectes / Experiència */}
    <section className="max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Treballs realitzats</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
          <h3 className="font-semibold text-lg">Retransmissions en directe</h3>
          <p className="text-muted-foreground mt-2">Cobertura de partits de Primera Catalana amb càmeres, realització en directe, narració i grafisme integrat amb OBS.</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
          <h3 className="font-semibold text-lg">Narració esportiva</h3>
          <p className="text-muted-foreground mt-2">Experiència en futbol i hoquei patins. Estil àgil i tècnic amb coneixement del joc i passió per comunicar.</p>
        </div>
      </div>
    </section>

    <section className="max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Serveis oferts</h2>
      <ul className="space-y-4 text-muted-foreground list-disc list-inside">
        <li>
          Disseny de plantilles gràfiques personalitzades per a retransmissions esportives (compatible amb OBS, vMix, StreamYard i altres plataformes).
        </li>
        <li>
          Producció completa de partits i esdeveniments esportius: realització tècnica, inserció de gràfics, i suport a la promoció del club.
        </li>
        <li>
          Servei de narració esportiva en català i castellà amb estil dinàmic, rigorós i adaptat a cada disciplina.
        </li>
        <li>
          Assessorament tècnic per a la posada en marxa de sistemes de retransmissió audiovisual amb eines professionals.
        </li>
      </ul>
    </section>


    <section className="max-w-6xl mx-auto px-6 py-16 space-y-6">
    <h2 className="text-2xl font-bold text-center">Packs de gràfics esportius</h2>
    <p className="text-muted-foreground max-w-3xl text-center mx-auto">
      Cada pack inclou plantilles personalitzades amb múltiples formats visuals, adaptats a OBS i altres sistemes de streaming.
    </p>

    <div className="grid 2xl:grid-cols-3 gap-8">
      {packData.map((pack, i) => (
        <PackCard key={i} {...pack} />
      ))}
    </div>
  </section>


  {/* Botó de contacte */}
  <div className="text-center mt-6">
    <a href="#contact" className="cosmic-button">
      Demana pressupost o mostra
    </a>
  </div>



    {/* CTA / Contacte */}
    <section className="text-center">
      <h2 className="text-xl font-semibold mb-2">Vols fer una retransmissió professional?</h2>
      <p className="text-muted-foreground mb-6">Demana un pressupost sense compromís. Treballem amb clubs, escoles i entitats esportives locals.</p>
      <a href="/portfolio-react#contact" className="cosmic-button">Contacta amb AxProd</a>
    </section>


    </main>

    {/* Footer */}

    <Footer />
    {/* Optional: Add a scroll to top button */}
     
    </div>
    );
};
