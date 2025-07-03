import { Github, PlayCircle } from "lucide-react";

const projects = [
  {
    title: "Retransmissió en directe (futbol)",
    description:
      "Realització tècnica de partits amb càmeres, gràfics, àudio i narració. Experiència amb OBS i gestió de directes de la Primera Catalana.",
    type: "Producció esportiva",
    link: "https://www.youtube.com/watch?v=demo", 
  },
  {
    title: "Projectes UPF (C++, Java, Python)",
    description:
      "Desenvolupament de projectes universitaris com simuladors, aplicacions CLI i treballs de programació estructurada.",
    type: "Acadèmic",
    link: "https://github.com/xavialgarraa", 
  },
  {
    title: "Gràfics i marcador en directe",
    description:
      "Desenvolupament i ús de gràfics personalitzats per a OBS Studio. Marcador esportiu connectat a temps real per a retransmissions.",
    type: "Projecte tècnic + audiovisual",
  },
  {
    title: "Inici de pràctiques TIC al CPNL",
    description:
      "Pràctiques a l'àrea de sistemes i suport TIC dins d'una entitat pública. Tasques relacionades amb Microsoft 365, servidors, gestió d’usuaris i processos de transformació digital.",
    type: "Pràctiques tècniques",
  },
  {
    title: "Narració esportiva",
    description:
      "Narrador de partits de futbol i hoquei patins. Experiència a nivell local i comarcal, tant en directe com en resums post-partit.",
    type: "Comunicació esportiva",
  },
  {
    title: "TFG en procés: Clipatge automàtic amb IA",
    description:
      "Projecte de visió per computador per detectar jugades clau, generar clips i estadístiques automàticament en partits de futbol amateur.",
    type: "TFG / Visió per computador",
  },
];

export const Projects = () => {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto text-center space-y-12">
        <h2 className="text-4xl font-bold">
          Projectes <span className="text-primary">realitzats</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Una selecció de projectes reals que combinen desenvolupament
          tècnic, producció esportiva i comunicació audiovisual.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((proj, idx) => (
            <div
              key={idx}
              className="bg-card border border-border rounded-lg p-6 shadow-md hover:shadow-lg transition-all text-left animate-fade-in"
            >
              <h3 className="text-lg font-semibold mb-2">{proj.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{proj.description}</p>
              <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
                {proj.type}
              </span>

              {proj.link && (
                <div className="mt-4 flex gap-4">
                  {proj.link.includes("github") ? (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-primary hover:underline text-sm"
                    >
                      <Github className="w-4 h-4" />
                      Veure al GitHub
                    </a>
                  ) : (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-primary hover:underline text-sm"
                    >
                      <PlayCircle className="w-4 h-4" />
                      Veure demostració
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
