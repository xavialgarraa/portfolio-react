import { Github, PlayCircle } from "lucide-react";
import { translationsProjects } from "../translations/TranslationProjects";
import { useLanguage } from "../context/LanguageContext";


export const Projects = () => {
  const { language } = useLanguage();
  const t = translationsProjects[language];

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto text-center space-y-12">
        <h2 className="text-4xl font-bold">
          {t.heading} <span className="text-primary">{t.highlight}</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {t.description}
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.items.map((proj, idx) => (
            <div
              key={idx}
              className="bg-card border border-border rounded-lg p-6 shadow-md hover:shadow-lg transition-all text-left animate-fade-in"
            >
              <h3 className="text-lg font-semibold mb-2">{proj.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {proj.description}
              </p>
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
                      {t.linkGithub}
                    </a>
                  ) : (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-primary hover:underline text-sm"
                    >
                      <PlayCircle className="w-4 h-4" />
                      {t.linkDemo}
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