import { Briefcase } from "lucide-react";
import { translationsExperience } from "../translations/TranslationExperience";
import { useLanguage } from "../context/LanguageContext";

export const Experience = () => {
  const { language } = useLanguage();
  const t = translationsExperience[language];

  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-5xl mx-auto text-center space-y-12">
        <h2 className="text-4xl font-bold">
          {t.heading} <span className="text-primary">{t.highlight}</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {t.description}
        </p>

        <ol className="relative border-l border-border ml-3 sm:ml-6 text-left space-y-10">
          {t.items.map((item, idx) => (
            <li key={idx} className="pl-6 sm:pl-8 relative">
              <span className="absolute -left-[11px] top-1 flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 border border-primary/40">
                <Briefcase className="w-3 h-3 text-primary" />
              </span>

              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
                <h3 className="text-lg font-semibold leading-tight">
                  {item.role}
                  <span className="text-muted-foreground font-normal">
                    {" "}
                    — {item.company}
                  </span>
                </h3>
                <span className="text-xs font-mono text-muted-foreground shrink-0">
                  {item.period}
                </span>
              </div>

              <p className="text-sm text-muted-foreground mb-3">
                {item.description}
              </p>

              {item.tags && item.tags.length > 0 && (
                <ul className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <li
                      key={tag}
                      className="text-[10px] uppercase tracking-wider text-muted-foreground border border-border rounded px-2 py-0.5"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
