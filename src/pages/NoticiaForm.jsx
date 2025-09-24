// src/pages/NoticiaForm.jsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addDoc, collection, doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { motion } from "framer-motion";

export function NoticiaForm() {
  const { id } = useParams(); // si hay id → editar, si no → crear
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Titulo: "",
    Resumen: "",
    "1-parrafo": "",
    "2-parrafo": "",
    "3-parrafo": "",
    autor: "",
    "foto-1": "",
    "foto-2": ""
  });

  const [loading, setLoading] = useState(false);

  // Si es edición, cargamos la noticia existente
  useEffect(() => {
    if (!id) return;
    const fetchNoticia = async () => {
      const docRef = doc(db, "noticias", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFormData(docSnap.data());
      }
    };
    fetchNoticia();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id) {
        // Editar noticia existente
        const docRef = doc(db, "noticias", id);
        await updateDoc(docRef, { ...formData });
      } else {
        // Nueva noticia
        await addDoc(collection(db, "noticias"), {
          ...formData,
          fecha: serverTimestamp()
        });
      }
      navigate("/axprod/laresacadeportiva"); // vuelve al listado
    } catch (error) {
      console.error("Error guardando noticia:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-[#0f0f0f] text-white min-h-screen px-4 py-12">
      <motion.div
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-lime-300 mb-6">
          {id ? "Editar Noticia" : "Nueva Noticia"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="Titulo"
            placeholder="Título"
            value={formData.Titulo}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-[#1c1c1e] border border-lime-400"
          />
          <textarea
            name="Resumen"
            placeholder="Resumen breve"
            value={formData.Resumen}
            onChange={handleChange}
            required
            rows="3"
            className="w-full p-3 rounded-lg bg-[#1c1c1e] border border-lime-400"
          />
          <textarea
            name="1-parrafo"
            placeholder="Primer párrafo"
            value={formData["1-parrafo"]}
            onChange={handleChange}
            required
            rows="4"
            className="w-full p-3 rounded-lg bg-[#1c1c1e] border border-lime-400"
          />
          <textarea
            name="2-parrafo"
            placeholder="Segundo párrafo"
            value={formData["2-parrafo"]}
            onChange={handleChange}
            required
            rows="4"
            className="w-full p-3 rounded-lg bg-[#1c1c1e] border border-lime-400"
          />
          <textarea
            name="3-parrafo"
            placeholder="Tercer párrafo"
            value={formData["3-parrafo"]}
            onChange={handleChange}
            required
            rows="4"
            className="w-full p-3 rounded-lg bg-[#1c1c1e] border border-lime-400"
          />
          <input
            type="text"
            name="autor"
            placeholder="Autor"
            value={formData.autor}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-[#1c1c1e] border border-lime-400"
          />
          <input
            type="text"
            name="foto-1"
            placeholder="URL de la primera foto"
            value={formData["foto-1"]}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-[#1c1c1e] border border-lime-400"
          />
          <input
            type="text"
            name="foto-2"
            placeholder="URL de la segunda foto"
            value={formData["foto-2"]}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-[#1c1c1e] border border-lime-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-lime-400 hover:bg-lime-300 text-black font-bold py-3 rounded-lg transition"
          >
            {loading ? "Guardando..." : id ? "Actualizar Noticia" : "Crear Noticia"}
          </button>
        </form>
      </motion.div>
    </main>
  );
}
