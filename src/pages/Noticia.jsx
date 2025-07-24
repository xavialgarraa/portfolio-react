// src/pages/NoticiaDetalle.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export function Noticia() {
  const { id } = useParams();
  const [noticia, setNoticia] = useState(null);

  useEffect(() => {
    const fetchNoticia = async () => {
      const docRef = doc(db, "noticias", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setNoticia(docSnap.data());
      } else {
        setNoticia({ error: true });
      }
    };
    fetchNoticia();
  }, [id]);

  if (!noticia) return <p className="text-center text-white p-10">Cargando...</p>;
  if (noticia.error) return <p className="text-center text-red-400 p-10">Noticia no encontrada</p>;

  return (
    <div className="bg-[#0f0f0f] text-white min-h-screen p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-lime-300 mb-2">{noticia.titulo}</h1>
      <p className="text-sm text-lime-500 mb-6">
        {noticia.fecha?.toDate?.().toLocaleDateString("es-ES", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric"
        })}
      </p>
      <div className="text-gray-200 whitespace-pre-line">
        {noticia.completo}
      </div>
    </div>
  );
}
