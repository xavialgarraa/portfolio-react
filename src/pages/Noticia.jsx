// src/pages/NoticiaDetalle.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { motion } from "framer-motion";
import { ArrowLeft, Text } from "lucide-react";

export function Noticia() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [noticia, setNoticia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fontSize, setFontSize] = useState("base"); // base | lg | xl

  useEffect(() => {
    const fetchNoticia = async () => {
      try {
        const docRef = doc(db, "noticias", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setNoticia(docSnap.data());
        } else {
          setNoticia({ error: true });
        }
      } catch (error) {
        console.error("Error fetching noticia:", error);
        setNoticia({ error: true });
      } finally {
        setLoading(false);
      }
    };

    fetchNoticia();
  }, [id]);

  useEffect(() => {
    if (noticia?.titulo) {
      document.title = `La Resaca Deportiva - ${noticia.titulo}`;
    }
  }, [noticia]);

  const toggleFontSize = () => {
    setFontSize((prev) =>
      prev === "base" ? "lg" : prev === "lg" ? "xl" : "base"
    );
  };

  if (loading)
    return <p className="text-center text-white p-10">Cargando...</p>;
  if (noticia?.error)
    return (
      <p className="text-center text-red-400 p-10">Noticia no encontrada</p>
    );

  return (
    <main className="bg-[#0f0f0f] text-white min-h-screen px-4 py-12">
      <motion.div
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-lime-300 hover:text-white gap-2 transition"
          >
            <ArrowLeft size={18} />
            Volver
          </button>

          <button
            onClick={toggleFontSize}
            className="text-lime-400 hover:text-white flex items-center gap-1 text-sm transition"
            title="Cambiar tamaño de texto"
          >
            <Text size={18} />
            A+
          </button>
        </div>

        {noticia.img && (
          <img
            src={noticia.img}
            alt="Imagen destacada"
            className="rounded-xl border border-lime-400 shadow-lg mb-6 w-full object-cover max-h-96"
          />
        )}

        <h1 className="text-4xl font-extrabold text-lime-300 mb-2">
          {noticia.titulo}
        </h1>

        <div className="flex flex-col sm:flex-row sm:justify-between text-sm text-lime-400 mb-6 gap-2">
          <p>
            {noticia.fecha?.toDate?.().toLocaleDateString("es-ES", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </p>
          {noticia.autor && <p>Escrita por {noticia.autor}</p>}
        </div>

        <article
            className={`prose prose-invert max-w-none text-gray-200 leading-relaxed ${
            fontSize === "lg"
              ? "text-lg"
              : fontSize === "xl"
              ? "text-xl"
              : "text-base"
          }`}
        >
          {noticia.completo
            ?.replace(/\\n/g, "\n")
            .split("\n")
            .map((parr, i) => (
              <p key={i}>{parr}</p>
            ))}
        </article>

        </motion.div>
    </main>
  );
}
