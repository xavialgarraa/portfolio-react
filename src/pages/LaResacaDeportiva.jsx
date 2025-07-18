import { useEffect, useRef, useState } from "react";
import { Linkedin, Instagram, Github, MessageCircle, Youtube, ArrowUpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import preguntas from "../js/preguntas.js";
import { ArrowLeftCircle } from "lucide-react";
import LogoLight from "../assets/logo.png";
import LogoDark from "../assets/logo-blanco.png";

/* ---------------- Episodios Data ---------------- */
const episodes = [
  { id: "xQpzsf3CK4Q", title: "Episodio 5 – Semana 22-23 Feb", date: "23/02/2025" },
  { id: "AV9PfkUjIqM", title: "Episodio 4 – Semana 15-16 Feb", date: "16/02/2025" },
  { id: "WxB9f5Fi_-w", title: "Episodio 3 – Semana 15-16 Feb", date: "09/02/2025" },
];

/* ---------------- Noticias Data ---------------- */
const noticias = [
  {
    titulo: "Lloret, Destino Deportivo",
    fecha: "10 julio 2025",
    resumen: "Lloret de Mar ha sido reconocido como destino deportivo oficial. Con instalaciones de alto nivel, es epicentro del deporte catalán.",
  },
  {
    titulo: "CF Lloret arranca pretemporada",
    fecha: "8 julio 2025",
    resumen: "El Club de Futbol Lloret inicia entrenamientos para la temporada 25/26 con refuerzos clave y mucha ambición.",
  },
  {
    titulo: "El Club de Hockey U16 gana torneo",
    fecha: "5 julio 2025",
    resumen: "Los jóvenes del Club Hoquei Lloret se coronan campeones del torneo regional celebrado en Blanes.",
  },
];

/* ---------------- Episodios Component ---------------- */
function Episodios({ episodes }) {
  return (
    <section className="px-4 py-12 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 border-b-4 border-lime-500 pb-2 tracking-wide uppercase">
        Último Episodio
      </h2>
      <div className="aspect-w-16 aspect-h-9 mb-10">
        <iframe
          className="w-full h-96 rounded-xl border-4 border-lime-500 shadow-2xl"
          src={`https://www.youtube.com/embed/${episodes[0].id}`}
          title={episodes[0].title}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>

      <h2 className="text-2xl font-semibold mb-4 border-b-2 border-lime-400 pb-1 uppercase">
        Episodios Anteriores
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {episodes.slice(1).map((ep) => (
          <div key={ep.id} className="bg-lime-950 border-2 border-lime-600 p-4 rounded-xl shadow-lg hover:scale-105 transition">
            <h3 className="text-lg font-bold">{ep.title}</h3>
            <p className="text-lime-300 text-sm mb-2">{ep.date}</p>
            <iframe
              className="w-full h-48 rounded"
              src={`https://www.youtube.com/embed/${ep.id}`}
              title={ep.title}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Noticias Component ---------------- */
function Noticias({ noticias }) {
  return (
    <section className="bg-lime-950 px-4 py-12">
      <h2 className="text-3xl font-bold mb-6 text-center tracking-wide uppercase">Noticias Deportivas</h2>
      <ul className="space-y-6 max-w-5xl mx-auto">
        {noticias.map((n, i) => (
          <li
            key={i}
            className="bg-black border border-lime-600 p-6 rounded-xl hover:bg-lime-900 transition shadow-md"
          >
            <h3 className="text-xl font-bold">{n.titulo}</h3>
            <p className="text-sm text-lime-300">{n.fecha}</p>
            <p className="text-lime-100 mt-2">{n.resumen}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------------- Trivia Utils ---------------- */
const obtenerPreguntasAleatorias = (preguntas, cantidad = 10) => {
  return preguntas
    .sort(() => 0.5 - Math.random())
    .slice(0, cantidad);
};


/* ---------------- Trivia Component ---------------- */
function Trivia({ preguntas }) {
  const [preguntasAleatorias, setPreguntasAleatorias] = useState(obtenerPreguntasAleatorias(preguntas));
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [respuesta, setRespuesta] = useState(null);
  const [puntuacion, setPuntuacion] = useState(0);
  const [temporizador, setTemporizador] = useState(15);
  const [respondido, setRespondido] = useState(false);

  const respondidoRef = useRef(false); 

  const pregunta = preguntasAleatorias[preguntaActual];
  const finalizado = preguntaActual >= preguntasAleatorias.length;

  useEffect(() => {
    if (finalizado || respondidoRef.current) return;

    const countdown = setInterval(() => {
      setTemporizador((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          handleRespuesta(null); 
          return 15;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [finalizado, preguntaActual]);

  const handleRespuesta = (opcion) => {
    if (respondidoRef.current || respuesta !== null) return;

    respondidoRef.current = true;
    setRespondido(true);
    setRespuesta(opcion);
    setTemporizador(15);

    if (opcion === pregunta.correcta) {
      setPuntuacion((prev) => prev + 1);
    }

    setTimeout(() => {
      setRespuesta(null);
      setPreguntaActual((prev) => prev + 1);
      setRespondido(false);
      respondidoRef.current = false;
    }, 1200);
  };

  const reiniciarTrivia = () => {
    setPreguntasAleatorias(obtenerPreguntasAleatorias(preguntas));
    setPreguntaActual(0);
    setRespuesta(null);
    setPuntuacion(0);
    setTemporizador(15);
    setRespondido(false);
    respondidoRef.current = false;
  };

  return (
    <section className="px-4 py-12 max-w-3xl mx-auto text-white">
      <h2 className="text-3xl font-bold mb-6 text-lime-400 uppercase text-center">
        Trivial Lloretenc
      </h2>

      {finalizado ? (
        <div className="bg-black border border-lime-600 p-8 rounded-2xl text-center shadow-xl">
          <p className="text-xl text-lime-300 mb-2">🎉 ¡Has completado el trivial!</p>
          <p className="text-lg">
            Puntuación final:{" "}
            <span className="text-lime-400 font-semibold">
              {puntuacion} / {preguntasAleatorias.length}
            </span>
          </p>
          <button
            onClick={reiniciarTrivia}
            className="mt-4 bg-lime-600 hover:bg-lime-500 text-black font-bold py-2 px-6 rounded-lg"
          >
            Reiniciar Trivial
          </button>
        </div>
      ) : (
        <>
          <div className="flex justify-between text-sm text-lime-200 mb-3">
            <p>Puntuación: {puntuacion}</p>
            <p>
              Pregunta {preguntaActual + 1} / {preguntasAleatorias.length}
            </p>
            <p className={`font-mono ${temporizador <= 5 ? "text-red-400" : "text-lime-300"}`}>
              ⏱️ {temporizador}s
            </p>
          </div>

          <div className="bg-black border-2 border-lime-600 p-6 rounded-2xl shadow-lg">
            <AnimatePresence mode="wait">
              <motion.div
                key={preguntaActual}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-sm text-lime-400 mb-2">Equipo: {pregunta.equipo}</p>
                <p className="text-xl font-medium mb-4">{pregunta.pregunta}</p>
                <ul className="space-y-3">
                  {pregunta.opciones.map((op, i) => (
                    <li
                      key={i}
                      onClick={() => !respuesta && handleRespuesta(op)}
                      className={`cursor-pointer p-3 rounded-lg text-sm border border-lime-600 ${
                        respuesta
                          ? op === pregunta.correcta
                            ? "bg-green-500 text-black font-bold"
                            : op === respuesta
                            ? "bg-red-600 text-white"
                            : "bg-lime-900 text-white"
                          : "bg-lime-950 hover:bg-lime-700"
                      }`}
                    >
                      {op}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </>
      )}
    </section>
  );
}



/* ---------------- Footer Component ---------------- */
function Footer() {
  return (
    <footer className="text-center text-sm text-lime-500 py-8 border-t border-lime-700 relative">
      <p>&copy; 2025 La Resaca Deportiva · Jorge & Xavi Algarra · Lloret de Mar</p>
      <div className="mt-3 flex justify-center gap-4">
        <a href="https://www.youtube.com/@laresacadeportiva" target="_blank"><Youtube className="w-5 h-5" /></a>
        <a href="https://www.instagram.com/laresacadeportiva_" target="_blank"><Instagram className="w-5 h-5" /></a>
      </div>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="absolute right-4 bottom-4 bg-lime-600 hover:bg-lime-500 text-black p-2 rounded-full shadow-lg"
        title="Volver arriba"
      >
        <ArrowUpCircle className="w-5 h-5" />
      </button>
    </footer>
  );
}

/* ---------------- Main Page Component ---------------- */
export function LaResacaDeportiva() {
  return (
    <div className="bg-black text-lime-400 min-h-screen font-sans leading-relaxed">
        

      <header className="text-center py-10 border-b-4 border-lime-600 bg-gradient-to-b from-black to-lime-950">
        <div className="flex items-center space-x-2 px-4 ">
        <a
            href="/portfolio-react/axprod" 
            className="flex items-center space-x-2 text-lime-300 hover:text-lime-100 transition"
        >
            <ArrowLeftCircle className="w-6 h-6" />
            <img
            src={LogoDark} // Replace with actual path to AxProd logo
            alt="AxProd Logo"
            className="w-8 h-8 rounded-full  shadow-sm"
            />
            
        </a>
        </div>
        <h1 className="text-5xl font-extrabold uppercase tracking-wider">La Resaca Deportiva</h1>
        <p className="text-lime-300 text-lg mt-2">Resumen semanal del deporte en Lloret de Mar</p>
      </header>

      <Episodios episodes={episodes} />
      <Noticias noticias={noticias} />
      <Trivia preguntas={preguntas} />
      <Footer />
    </div>
  );
}
