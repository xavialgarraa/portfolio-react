import { Github, PlayCircle, ExternalLink, Radio, Sparkles } from "lucide-react";
import { translationsProjects } from "../translations/TranslationProjects";
import { useLanguage } from "../context/LanguageContext";
import { handleSpotlight } from "../lib/spotlight";

const linkClass =
  "inline-flex items-center gap-1.5 text-sm text-primary hover:underline underline-offset-4 transition-colors";

export const Projects = () => {
  const { language } = useLanguage();
  const t = translationsProjects[language];

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto text-center space-y-12">
        <h2 className="section-title text-4xl md:text-5xl" data-reveal>
          {t.heading} <span className="text-primary">{t.highlight}</span>
        </h2>
        <p
          className="text-muted-foreground max-w-2xl mx-auto"
          data-reveal
          style={{ "--reveal-delay": "0.1s" }}
        >
          {t.description}
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.items.map((proj, idx) => (
            <article
              key={idx}
              data-reveal
              style={{ "--reveal-delay": `${0.1 + idx * 0.12}s` }}
              onMouseMove={handleSpotlight}
              className={`spotlight-card bg-card border rounded-xl p-6 shadow-md text-left flex flex-col ${
                proj.featured ? "border-primary/40" : "border-border"
              }`}
            >
              {proj.featured && (
                <span className="inline-flex items-center gap-1.5 self-start mb-3 text-[10px] uppercase tracking-[0.2em] text-primary bg-primary/10 border border-primary/30 rounded-full px-2.5 py-1">
                  <Sparkles className="w-3 h-3" />
                  {t.featured}
                </span>
              )}

              <div className="flex items-baseline justify-between gap-2 mb-2">
                <h3 className="text-lg font-semibold leading-snug">
                  {proj.title}
                </h3>
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
                      className="text-[10px] uppercase tracking-wider text-muted-foreground border border-border rounded px-2 py-0.5 transition-colors hover:border-primary/50 hover:text-primary"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border/60">
                <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
                  {proj.type}
                </span>

                <div className="flex flex-wrap items-center gap-4">
                  {proj.github && (
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClass}
                    >
                      <Github className="w-4 h-4" />
                      {t.linkGithub}
                    </a>
                  )}
                  {proj.live && (
                    <a
                      href={proj.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClass}
                    >
                      <Radio className="w-4 h-4" />
                      {t.linkLive}
                    </a>
                  )}
                  {proj.website && (
                    <a
                      href={proj.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClass}
                    >
                      <ExternalLink className="w-4 h-4" />
                      {t.linkWebsite}
                    </a>
                  )}
                  {proj.demo && (
                    <a
                      href={proj.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClass}
                    >
                      <PlayCircle className="w-4 h-4" />
                      {t.linkDemo}
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
