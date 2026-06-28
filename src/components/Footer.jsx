import { Linkedin, Github, Instagram, MessageCircle } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { translationsFooter } from "../translations/TranslationFooter";
import { useLanguage } from "../context/LanguageContext";

export const Footer = () => {
  const { language } = useLanguage();
  const t = translationsFooter[language];
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-border bg-background px-6 py-8 text-sm text-muted-foreground">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">

        {/* Credit */}
        <div className="text-center sm:text-left">
          © Xavi Algarra {year} · {t.credit}
        </div>

        {/* Socials */}
        <div className="flex items-center gap-4">
          <a
            href="https://www.linkedin.com/in/xavialgarra/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-primary transition"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="https://github.com/xavialgarraa"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-primary transition"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://www.instagram.com/algarraxavi/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:text-primary transition"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a
            href="https://wa.me/34627503320"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="hover:text-primary transition"
          >
            <MessageCircle className="w-5 h-5" />
          </a>
        </div>

        {/* Theme toggle */}
        <div className="hidden sm:block">
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
};
