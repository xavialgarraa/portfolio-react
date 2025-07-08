import { useState, useRef } from "react";
import { Maximize2 } from "lucide-react";

export const PackCard = ({ title, price, description, images }) => {
  const [current, setCurrent] = useState(0);
  const mediaRef = useRef(null);

  const prev = () =>
    setCurrent((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );

  const next = () =>
    setCurrent((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );

  const handleFullscreen = () => {
    if (mediaRef.current) {
      if (mediaRef.current.requestFullscreen) {
        mediaRef.current.requestFullscreen();
      } else if (mediaRef.current.webkitRequestFullscreen) {
        mediaRef.current.webkitRequestFullscreen();
      } else if (mediaRef.current.mozRequestFullScreen) {
        mediaRef.current.mozRequestFullScreen();
      } else if (mediaRef.current.msRequestFullscreen) {
        mediaRef.current.msRequestFullscreen();
      }
    }
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-md space-y-4 max-w-lg w-full mx-auto">
      {/* Carrusel amb botons + fullscreen */}
      <div className="relative">
        {images[current].endsWith(".mp4") ? (
          <video
            ref={mediaRef}
            key={current}
            src={images[current]}
            muted
            loop
            autoPlay
            playsInline
            className="aspect-video w-full object-cover rounded-md"
          />
        ) : (
          <img
            ref={mediaRef}
            src={images[current]}
            alt={`Preview ${current + 1}`}
            className="aspect-video w-full object-cover rounded-md"
          />
        )}

        {/* Botons carrusel */}
        {images.length > 1 && (
          <>
           <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-background/45 text-xl flex items-center justify-center shadow-md hover:scale-110 transition"
            >
            ‹
            </button>

            <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-background/45 text-xl flex items-center justify-center shadow-md hover:scale-110 transition"
            >
            ›
            </button>

          </>
        )}

        {/* Botó fullscreen */}
        <button
          onClick={handleFullscreen}
          className="absolute top-2 right-2 bg-background/70 p-1 rounded-full hover:scale-110 transition"
          title="Pantalla completa"
        >
          <Maximize2 className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      {/* Contingut */}
      <h4 className="font-semibold text-lg">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
      <p className="font-bold text-primary">{price}</p>

      <a
        href="#contact"
        className="mt-2 inline-block cosmic-button text-sm text-center"
      >
        Demana aquest pack →
      </a>
    </div>
  );
};
