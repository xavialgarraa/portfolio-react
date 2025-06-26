import { Send } from "lucide-react";
import { Linkedin, Instagram, Github, MessageCircle } from "lucide-react";


export const Contact = () => {
  return (
    <section id="contact" className="py-24 px-4">
      <div className="container max-w-3xl mx-auto text-center space-y-10">
        {/* Títol */}
        <h2 className="text-3xl sm:text-4xl font-bold animate-fade-in">
          Contacta <span className="text-primary">amb mi</span>
        </h2>

        {/* Intro */}
        <p className="text-muted-foreground max-w-xl mx-auto animate-fade-in-delay-1">
          Si estàs interessat a col·laborar, oferir pràctiques o simplement compartir una idea, estaré encantat de llegir-te.
        </p>

        {/* Formulari */}
        <form
          action="https://formspree.io/f/mrbkovvn" 
          method="POST"
          className="space-y-6 text-left animate-fade-in-delay-2"
        >
          {/* Nom */}
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="font-medium text-foreground">
              Nom
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="El teu nom"
              className="w-full px-4 py-2 rounded-md bg-card border border-border text-foreground placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-medium text-foreground">
              Correu electrònic
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="tu@email.com"
              className="w-full px-4 py-2 rounded-md bg-card border border-border text-foreground placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Missatge */}
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="font-medium text-foreground">
              Missatge
            </label>
            <textarea
              name="message"
              rows={5}
              required
              placeholder="Escriu el teu missatge aquí..."
              className="w-full px-4 py-2 rounded-md bg-card border border-border text-foreground placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>

          {/* Botó */}
          <div className="pt-4 text-center">
            <button type="submit" className="cosmic-button flex items-center gap-2 mx-auto">
              Envia el missatge <Send className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Email directe visible */}
        <div className="pt-6 text-muted-foreground text-sm animate-fade-in-delay-3">
          O escriu-me directament a:{" "}
          <a
            href="mailto:xavialgarraperez@gmail.com"
            className="text-primary underline underline-offset-4"
          >
            xavialgarraperez@gmail.com
          </a>
        </div>
        {/* Xarxes socials */}
        <div className="pt-6 flex justify-center gap-6 animate-fade-in-delay-4">
            <a
                href="https://www.linkedin.com/in/xavialgarra"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-primary hover:text-primary-foreground transition"
            >
                <Linkedin className="w-6 h-6" />
            </a>

            <a
                href="https://www.instagram.com/algarraxavi/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-primary hover:text-primary-foreground transition"
            >
                <Instagram className="w-6 h-6" />
            </a>

            <a
                href="https://github.com/xavialgarraa"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-primary hover:text-primary-foreground transition"
            >
                <Github className="w-6 h-6" />
            </a>

            <a
                href="https://wa.me/34627503320" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="text-primary hover:text-primary-foreground transition"
            >
                <MessageCircle className="w-6 h-6" />
            </a>
        </div>

      </div>
    </section>
  );
};
