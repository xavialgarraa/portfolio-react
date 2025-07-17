import { Briefcase, Code, Mic } from "lucide-react";
import CV from "../assets/cv.pdf";
import { translationsAboutMe } from "../translations/TranslationAboutMe";
import { useLanguage } from "../context/LanguageContext";

export const AboutMe = () => {
  const { language } = useLanguage();
  const t = translationsAboutMe[language];

  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          {t.heading}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">{t.subtitle}</h3>

            <p className="text-muted-foreground">{t.paragraph1}</p>
            <p className="text-muted-foreground">{t.paragraph2}</p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <a href="#contact" className="cosmic-button">
                {t.contact}
              </a>

              <a
                href={CV}
                className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300"
              >
                {t.downloadCV}
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
                  <h4 className="font-semibold text-lg">{t.skills.web.title}</h4>
                  <p className="text-muted-foreground">{t.skills.web.description}</p>
                </div>
              </div>
            </div>

            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Mic className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">{t.skills.streaming.title}</h4>
                  <p className="text-muted-foreground">{t.skills.streaming.description}</p>
                </div>
              </div>
            </div>

            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">{t.skills.project.title}</h4>
                  <p className="text-muted-foreground">{t.skills.project.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
