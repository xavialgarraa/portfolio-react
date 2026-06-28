import { Github, PlayCircle, ExternalLink } from "lucide-react";
import { translationsProjects } from "../translations/TranslationProjects";
import { useLanguage } from "../context/LanguageContext";

export const Projects = () => {
  const { language } = useLanguage();
  const t = translationsProjects[language];

  const renderLink = (link) => {
    if (!link) return null;
    if (link.includes("github")) {
      return (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-primary hover:underline text-sm"
        >
          <Github className="w-4 h-4" />
          {t.linkGithub}
        </a>
      );
    }
    if (link.includes("youtube") || link.includes("youtu.be")) {
      return (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-primary hover:underline text-sm"
        >
          <PlayCircle className="w-4 h-4" />
          {t.linkDemo}
        </a>
      );
    }
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-primary hover:underline text-sm"
      >
        <ExternalLink className="w-4 h-4" />
        {t.linkWebsite || t.linkDemo}
      </a>
    );
  };

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
            <article
              key={idx}
              className="bg-card border border-border rounded-lg p-6 shadow-md hover:shadow-lg transition-all text-left animate-fade-in flex flex-col"
            >
              <div className="flex items-baseline justify-between gap-2 mb-2">
                <h3 className="text-lg font-semibold">{proj.title}</h3>
                {proj.year && (
                  <span className="text-xs text-muted-foreground font-mono shrink-0">
                    {proj.year}
                  </span>
                )}
              </div>

              {proj.subtitle && (
                <p className="text-sm text-primary/80 mb-3">{proj.subtitle}</p>
              )}

              <p className="text-sm text-muted-foreground mb-4">
                {proj.description}
              </p>

              {proj.tags && proj.tags.length > 0 && (
                <ul className="flex flex-wrap gap-1.5 mb-4">
                  {proj.tags.map((tag) => (
                    <li
                      key={tag}
                      className="text-[10px] uppercase tracking-wider text-muted-foreground border border-border rounded px-2 py-0.5"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-auto flex items-center justify-between gap-3 pt-2">
                <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
                  {proj.type}
                </span>
                {renderLink(proj.link)}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
