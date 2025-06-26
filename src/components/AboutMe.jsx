import { Briefcase, Code, Mic } from "lucide-react";
import CV from "../assets/cv.pdf";


export const AboutMe = () => {
  return (
    <section id="about" className="py-24 px-4 relative">
      {" "}
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          About <span className="text-primary"> Me</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">
                Desenvolupador i creador digital 
            </h3>

            <p className="text-muted-foreground">
              Sóc estudiant d’Enginyeria Informàtica a la UPF i combino el
              desenvolupament de programari amb la comunicació audiovisual
              esportiva. M'interessa especialment la creació d'eines web
              interactives, la intel·ligència artificial aplicada i els projectes
              amb impacte real en comunitats locals.
            </p>

            <p className="text-muted-foreground">
              Actualment estic treballant en el meu TFG i buscant pràctiques per
              continuar aprenent i aportar valor en equips tecnològics. Sempre
              busco combinar creativitat, eficiència i claredat en tot allò que
              construeixo.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <a href="#contact" className="cosmic-button">
                {" "}
                Contacta amb mi
              </a>

              <a
                href={CV}
                className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300"
              >
                Download CV
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg"> Web Development</h4>
                  <p className="text-muted-foreground">
                    Tecnologies com React, Tailwind i Python per construir interfícies modernes.
                  </p>
                </div>
              </div>
            </div>
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Mic className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">Streaming i comunicació</h4>
                  <p className="text-muted-foreground">
                    Experiència audiovisual esportiva, narració i realització en temps real.

                  </p>
                </div>
              </div>
            </div>
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>

                <div className="text-left">
                  <h4 className="font-semibold text-lg">Gestió de projectes</h4>
                  <p className="text-muted-foreground">
                    Coordinació d’equips en casals, produccions en directe i projectes universitaris.

                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};