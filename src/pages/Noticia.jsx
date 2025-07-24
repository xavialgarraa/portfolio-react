// src/pages/NoticiaDetalle.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export function Noticia() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [noticia, setNoticia] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <p className="text-center text-white p-10">Cargando...</p>;
  if (noticia?.error) return <p className="text-center text-red-400 p-10">Noticia no encontrada</p>;

  return (
    <main className="bg-[#0f0f0f] text-white min-h-screen px-4 py-12">
      <motion.div
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center text-lime-300 hover:text-white gap-2 transition"
        >
          <ArrowLeft size={18} />
          Volver
        </button>

        {noticia.img && (
          <img
            src={noticia.img}
            alt="Imagen destacada"
            className="rounded-xl border border-lime-400 shadow-lg mb-6 w-full object-cover max-h-96"
          />
        )}

        <h1 className="text-4xl font-extrabold text-lime-300 mb-3">{noticia.titulo}</h1>
        <p className="text-sm text-lime-400 mb-6">
          {noticia.fecha?.toDate?.().toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </p>

        <article className="prose prose-invert prose-sm sm:prose-base lg:prose-lg max-w-none text-gray-200 leading-relaxed">
          {noticia.completo?.split("\n").map((parr, i) => (
            <p key={i}>{parr}</p>
          ))}
        </article>
      </motion.div>
    </main>
  );
}
