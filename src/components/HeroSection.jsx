import { ArrowDown } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";
import Icono from "../assets/xavi.jpg";
import { translationshero } from "../translations/TranslationHero";
import { useLanguage } from "../context/LanguageContext";

/* ─────────────────────────────────────────────────────────────
   PARTICLE CANVAS — usa var(--primary) del tema Tailwind
───────────────────────────────────────────────────────────── */
/* ─────────────────────────────────────────────────────────────
   PARTICLE CANVAS — Adaptativo y con menos densidad de líneas
───────────────────────────────────────────────────────────── */
function ParticleField() {
  const ref = useRef(null);
  
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let W, H, pts = [], raf;

    // Leer el color primario del tema al momento de montar
    const primaryRaw = getComputedStyle(document.documentElement)
      .getPropertyValue("--primary").trim() || "262 83% 67%";
    const toRgba = (hsl, a) => `hsla(${hsl}, ${a})`;

    let connectionDistance = 90; // Distancia base reducida (antes 105)

    // Función para crear las partículas según el tamaño de la pantalla
    const initParticles = () => {
      pts = [];
      let numParticles = 50; // Escritorio: reducidas de 70 a 50

      if (W < 768) {
        // Modo Móvil
        numParticles = 18;
        connectionDistance = 65; 
      } else if (W < 1024) {
        // Modo Tablet
        numParticles = 30;
        connectionDistance = 80;
      } else {
        // Modo Escritorio
        numParticles = 50;
        connectionDistance = 95;
      }

      for (let i = 0; i < numParticles; i++) {
        pts.push({
          x: Math.random() * W, y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          r: Math.random() * 1.4 + 0.3,
        });
      }
    };

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      initParticles(); // Reiniciamos las partículas al cambiar el tamaño
    };
    
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      
      // Dibujar puntos
      pts.forEach(p => {
        p.x = (p.x + p.vx + W) % W;
        p.y = (p.y + p.vy + H) % H;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = toRgba(primaryRaw, 0.5);
        ctx.fill();
      });
      
      // Dibujar líneas
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          
          if (d < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            // La opacidad de la línea ahora se calcula en base a la distancia dinámica
            ctx.strokeStyle = toRgba(primaryRaw, 0.08 * (1 - d / connectionDistance));
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    
    draw();
    return () => { 
      cancelAnimationFrame(raf); 
      window.removeEventListener("resize", resize); 
    };
  }, []);

  return (
    <canvas ref={ref} style={{ position:"absolute", inset:0, width:"100%", height:"100%", zIndex:1 }} />
  );
}

/* ─────────────────────────────────────────────────────────────
   TYPEWRITER
───────────────────────────────────────────────────────────── */
function Typewriter({ text, delay = 700, speed = 65 }) {
  const [out, setOut] = useState("");
  useEffect(() => {
    let i = 0;
    const t = setTimeout(() => {
      const id = setInterval(() => { setOut(text.slice(0, ++i)); if (i >= text.length) clearInterval(id); }, speed);
      return () => clearInterval(id);
    }, delay);
    return () => clearTimeout(t);
  }, [text]);
  return <>{out}<span className="tw-cursor">|</span></>;
}

/* ─────────────────────────────────────────────────────────────
   SCRAMBLE TEXT — efecto matrix al hacer hover
───────────────────────────────────────────────────────────── */
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";
function ScrambleText({ text, trigger }) {
  const [display, setDisplay] = useState(text);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!trigger) { setDisplay(text); return; }
    let frame = 0;
    const total = 12;
    const run = () => {
      setDisplay(
        text.split("").map((ch, i) =>
          ch === " " ? " " : frame / total > i / text.length
            ? ch
            : CHARS[Math.floor(Math.random() * CHARS.length)]
        ).join("")
      );
      if (frame < total) { frame++; rafRef.current = requestAnimationFrame(run); }
      else setDisplay(text);
    };
    rafRef.current = requestAnimationFrame(run);
    return () => cancelAnimationFrame(rafRef.current);
  }, [trigger, text]);

  return <>{display}</>;
}

/* ─────────────────────────────────────────────────────────────
   HERO SECTION
───────────────────────────────────────────────────────────── */
export const HeroSection = () => {
  const { language } = useLanguage();
  const t = translationshero[language];

  const [glitching, setGlitching]   = useState(false);
  const [scanY, setScanY]           = useState(-10);
  const [hoverImg, setHoverImg]     = useState(false);
  const [scramble, setScramble]     = useState(false);

  // Glitch aleatorio
  useEffect(() => {
    const loop = () => {
      const wait = 3200 + Math.random() * 4500;
      setTimeout(() => {
        setGlitching(true);
        setScramble(true);
        setTimeout(() => { setGlitching(false); setScramble(false); }, 260);
        loop();
      }, wait);
    };
    loop();
  }, []);

  // Scan line continua
  useEffect(() => {
    let y = -10, raf;
    const tick = () => { y = (y + 0.36) % 110; setScanY(y); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      {/* ── ESTILOS GLOBALES del componente ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Mono:ital,wght@0,400;0,500;1,400&display=swap');

        /* ── Cursor typewriter ── */
        .tw-cursor {
          color: hsl(var(--primary));
          animation: twBlink 1s step-start infinite;
        }
        @keyframes twBlink { 0%,100%{opacity:1} 50%{opacity:0} }

        /* ── Entry ── */
        @keyframes wUp    { from{opacity:0;transform:translateY(26px)} to{opacity:1;transform:translateY(0)} }
        @keyframes wLeft  { from{opacity:0;transform:translateX(34px)} to{opacity:1;transform:translateX(0)} }
        @keyframes wFadeIn{ from{opacity:0} to{opacity:1} }

        /* ── Imagen flotando ── */
        @keyframes imgFloat {
          0%,100%{ transform:translateY(0) rotate(-0.6deg); }
          50%    { transform:translateY(-15px) rotate(0.6deg); }
        }
        /* ── Glow de la imagen con color del tema ── */
        @keyframes imgGlow {
          0%,100%{ box-shadow: 0 0 0 0 hsl(var(--primary)/0), 0 24px 60px hsl(var(--background)); }
          50%    { box-shadow: 0 0 0 16px hsl(var(--primary)/0.1), 0 24px 80px hsl(var(--primary)/0.2); }
        }

        /* ── Glitch del nombre ── */
        @keyframes gClip {
          0%  { clip-path:polygon(0 0,100% 0,100% 100%,0 100%); transform:translate(0); }
          20% { clip-path:polygon(0 15%,100% 15%,100% 38%,0 38%); transform:translate(-5px,0); }
          40% { clip-path:polygon(0 55%,100% 55%,100% 75%,0 75%); transform:translate(5px,0); }
          60% { clip-path:polygon(0 25%,100% 25%,100% 45%,0 45%); transform:translate(-3px,0); }
          80% { clip-path:polygon(0 65%,100% 65%,100% 88%,0 88%); transform:translate(3px,0); }
          100%{ clip-path:polygon(0 0,100% 0,100% 100%,0 100%); transform:translate(0); }
        }
        @keyframes gR {
          0%,100%{ transform:translate(0); opacity:0; }
          25%    { transform:translate(-6px,1px); opacity:0.8; }
          55%    { transform:translate(4px,0); opacity:0.5; }
          80%    { transform:translate(0); opacity:0; }
        }
        @keyframes gG {
          0%,100%{ transform:translate(0); opacity:0; }
          30%    { transform:translate(6px,-1px); opacity:0.7; }
          60%    { transform:translate(-3px,0); opacity:0.4; }
          90%    { transform:translate(0); opacity:0; }
        }

        /* ── Fondo texto fantasma ── */
        @keyframes ghostBg { from{transform:translateX(0)} to{transform:translateX(-50%)} }

        /* ── Puntos de estado ── */
        @keyframes dotPulse {
          0%,100%{ box-shadow:0 0 0 0 hsl(var(--primary)/0.6); }
          50%    { box-shadow:0 0 0 8px hsl(var(--primary)/0); }
        }
        @keyframes greenPulse {
          0%,100%{ box-shadow:0 0 0 0 rgba(34,197,94,0.6); }
          50%    { box-shadow:0 0 0 7px rgba(34,197,94,0); }
        }

        /* ── Flecha scroll ── */
        @keyframes arrowBounce {
          0%,100%{ transform:translateY(0); opacity:0.4; }
          50%    { transform:translateY(9px); opacity:1; }
        }

        /* ── Noise estático ── */
        @keyframes nMove {
          0%  { background-position:0 0; }
          25% { background-position:-50px 25px; }
          50% { background-position:25px -55px; }
          75% { background-position:-65px -15px; }
          100%{ background-position:35px 45px; }
        }

        /* ── Línea vertical decorativa ── */
        @keyframes vlineAnim {
          0%,100%{ opacity:0.18; transform:scaleY(1); }
          50%    { opacity:0.38; transform:scaleY(0.92); }
        }

        /* ── Badge shimmer ── */
        @keyframes shimmer {
          0%  { background-position: -200% center; }
          100%{ background-position: 200% center; }
        }

        /* ══════════════════════════════════════
           CLASES COMPONENTE
        ══════════════════════════════════════ */

        /* Nombre con glitch */
        .hnw {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(2.8rem, 7.5vw, 5.8rem);
          line-height: 1;
          color: hsl(var(--foreground));
          position: relative;
          display: inline-block;
          letter-spacing: -0.02em;
        }
        .hnw.glitch { animation: gClip 0.26s steps(1) both; }
        .hnw .gr, .hnw .gg {
          position: absolute; inset: 0;
          font: inherit; color: inherit;
          pointer-events: none; user-select: none;
        }
        .glitch .gr { animation: gR 0.26s steps(1) both; color: hsl(var(--primary)); filter: hue-rotate(140deg); }
        .glitch .gg { animation: gG 0.26s steps(1) both; color: hsl(var(--primary)); filter: hue-rotate(280deg); }

        /* Título gradiente */
        .htitle {
          font-family: 'DM Mono', monospace;
          font-size: clamp(0.8rem, 1.8vw, 1.25rem);
          font-weight: 500;
          letter-spacing: 0.07em;
          background: linear-gradient(
            120deg,
            hsl(var(--primary)) 0%,
            hsl(var(--primary) / 0.7) 50%,
            hsl(var(--primary) / 0.4) 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Descripción */
        .hdesc {
          font-family: 'DM Mono', monospace;
          font-size: 0.8rem;
          line-height: 1.9;
          color: hsl(var(--muted-foreground));
        }

        /* Label mono top */
        .hlabel {
          font-family: 'DM Mono', monospace;
          font-size: 0.58rem;
          letter-spacing: 0.38em;
          color: hsl(var(--primary)) ;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .hlabel::before {
          content: '';
          display: inline-block;
          width: 22px; height: 1px;
          background: hsl(var(--primary) / 0.5);
        }

        /* Botón CTA */
        .hbtn {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          padding: 0.7rem 1.9rem;
          font-family: 'DM Mono', monospace;
          font-size: 0.72rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: hsl(var(--foreground));
          background: transparent;
          border: 1px solid hsl(var(--primary) / 0.45);
          overflow: hidden;
          transition: color 0.35s, border-color 0.35s;
          text-decoration: none;
          cursor: pointer;
        }
        .hbtn::before {
          content: '';
          position: absolute; inset: 0;
          background: hsl(var(--primary));
          transform: translateX(-102%);
          transition: transform 0.4s cubic-bezier(0.77,0,0.18,1);
          z-index: 0;
        }
        .hbtn:hover::before  { transform: translateX(0); }
        .hbtn:hover          { border-color: transparent; color: hsl(var(--primary-foreground, 0 0% 100%)); }
        .hbtn > *            { position: relative; z-index: 1; }

        /* Contadores */
        .hctr {
          display: flex;
          flex-direction: column;
          padding: 0.6rem 1rem;
          border: 1px solid hsl(var(--border));
          background: hsl(var(--primary) / 0.04);
          gap: 0.05rem;
        }
        .hctr-n {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.45rem;
          color: hsl(var(--foreground));
          line-height: 1;
        }
        .hctr-n sup { font-size: 0.8rem; color: hsl(var(--primary)); }
        .hctr-l {
          font-family: 'DM Mono', monospace;
          font-size: 0.5rem;
          letter-spacing: 0.2em;
          color: hsl(var(--muted-foreground) / 0.6);
          text-transform: uppercase;
        }

        /* Badge "Available" */
        .havail {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.28rem 0.9rem;
          border: 1px solid rgba(34,197,94,0.3);
          background: rgba(34,197,94,0.06);
          font-family: 'DM Mono', monospace;
          font-size: 0.56rem;
          letter-spacing: 0.28em;
          color: rgba(34,197,94,0.85);
          text-transform: uppercase;
          animation: wFadeIn 0.8s 1.4s both;
          margin-top: 2.5rem;
        }
        .havail-dot {
          width: 6px; height: 6px;
          background: #22c55e;
          border-radius: 50%;
          animation: greenPulse 2s ease-in-out infinite;
        }

        /* Badge "Estudiante" */
        .hstudent {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.25rem 0.8rem;
          font-family: 'DM Mono', monospace;
          font-size: 0.54rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          border: 1px solid hsl(var(--primary) / 0.35);
          background: hsl(var(--primary) / 0.06);
          color: hsl(var(--primary) / 0.8);
          position: relative;
          overflow: hidden;
          animation: wFadeIn 0.8s 1.6s both;
          margin-top: 2.5rem;
        }
        .hstudent::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(
            90deg,
            transparent 0%,
            hsl(var(--primary)/0.15) 50%,
            transparent 100%
          );
          background-size: 200% auto;
          animation: shimmer 3s linear infinite;
        }
        .hstudent-dot {
          width: 5px; height: 5px;
          background: hsl(var(--primary));
          border-radius: 50%;
          animation: dotPulse 1.8s ease-in-out infinite;
        }

        /* Imagen contenedor */
        .himg-wrap {
          flex-shrink: 0;
          animation:
            wLeft 1s 0.4s both,
            imgFloat 5.5s 1.4s ease-in-out infinite,
            imgGlow 3s 1.4s ease-in-out infinite;
        }
        .himg-inner {
          position: relative;
          overflow: hidden;
          border-radius: 1rem;
          width: clamp(185px, 20vw, 265px);
          aspect-ratio: 3/4;
        }
        .himg-inner img { width:100%; height:100%; object-fit:cover; display:block; }

        /* Corner brackets */
        .hc { position:absolute; width:20px; height:20px; border-color:hsl(var(--primary)); border-style:solid; z-index:4; }
        .hc.tl { top:-7px; left:-7px;  border-width:2px 0 0 2px; }
        .hc.tr { top:-7px; right:-7px; border-width:2px 2px 0 0; }
        .hc.bl { bottom:-7px; left:-7px;  border-width:0 0 2px 2px; }
        .hc.br { bottom:-7px; right:-7px; border-width:0 2px 2px 0; }

        /* Scanlines encima de imagen */
        .himg-scan {
          position: absolute; inset: 0; pointer-events: none; z-index: 3;
          background: repeating-linear-gradient(
            0deg, transparent, transparent 3px,
            rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px
          );
        }
        /* Borde glow imagen */
        .himg-border {
          position: absolute; inset: -1px; border-radius: inherit;
          border: 1px solid hsl(var(--primary) / 0.35);
          z-index: 5; pointer-events: none;
        }

        /* Ghost texto fondo */
        .hghost {
          position: absolute; bottom: 0; left: 0;
          white-space: nowrap; pointer-events: none; z-index: 0; user-select: none;
          font-family: 'Syne', sans-serif; font-weight: 800;
          font-size: clamp(6rem, 20vw, 20rem);
          color: transparent;
          -webkit-text-stroke: 1px hsl(var(--primary) / 0.055);
          letter-spacing: 0.03em;
          animation: ghostBg 30s linear infinite;
        }

        /* Scan line sweep */
        .hscan {
          position: absolute; left: 0; right: 0; height: 2px;
          background: linear-gradient(
            90deg,
            transparent,
            hsl(var(--primary) / 0.25),
            hsl(var(--primary) / 0.12),
            transparent
          );
          pointer-events: none; z-index: 5; mix-blend-mode: screen;
        }

        /* Noise */
        .hnoise {
          position: absolute; inset: 0; pointer-events: none; z-index: 4; opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 175px;
          animation: nMove 0.12s steps(1) infinite;
        }

        /* Línea deco vertical */
        .hvline {
          position: absolute; left: 5vw; top: 18%; bottom: 18%;
          width: 1px;
          background: linear-gradient(180deg, transparent, hsl(var(--primary)/0.3), transparent);
          z-index: 2;
          animation: vlineAnim 4s ease-in-out infinite;
        }
        /* Por defecto: ocultos */
        .havail,
        .hstudent {
          display: none;
        }

        /* Solo escritorio */
        @media (min-width: 1024px) {
          .havail,
          .hstudent {
            display: inline-flex;
          }
        }

      `}</style>

      <section
        id="hero"
        className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
      >
        {/* ── FONDOS ── */}
        <ParticleField />
        <div className="hnoise" />
        <div className="hscan" style={{ top: `${scanY}%` }} />
        <div className="hvline hidden md:block" />

        {/* ── Texto fantasma de fondo ── */}
        <div className="hghost" aria-hidden>
          {t.name}&nbsp;&nbsp;{t.name}&nbsp;&nbsp;{t.name}&nbsp;&nbsp;
          {t.name}&nbsp;&nbsp;{t.name}&nbsp;&nbsp;{t.name}&nbsp;&nbsp;
        </div>

        {/* ── Badges top center ── */}
        <div
          className="absolute top-5 left-1/2 z-20 flex items-center gap-3"
          style={{ transform: "translateX(-50%)" }}
        >
          <div className="havail">
            <span className="havail-dot" />
            AVAILABLE
          </div>
          <div className="hstudent">
            <span className="hstudent-dot" />
            STUDENT DEV
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════
            CONTENIDO PRINCIPAL — misma estructura que el original
        ═══════════════════════════════════════════════════════ */}
        <div className="z-10 relative max-w-5xl mx-auto w-full flex flex-col md:flex-row items-center justify-center gap-12 pt-24 md:py-12">

          {/* ── IMAGEN — mismo slot que el original ── */}
          <div
            className="himg-wrap"
            onMouseEnter={() => setHoverImg(true)}
            onMouseLeave={() => setHoverImg(false)}
          >
            <div className="himg-inner">
              {/* Corner brackets del tema */}
              <div className="hc tl" /><div className="hc tr" />
              <div className="hc bl" /><div className="hc br" />

              {/* Imagen real de Xavi */}
              <img
                src={Icono}
                alt="Xavi"
                style={{
                  filter: hoverImg
                    ? "grayscale(0%) contrast(1) brightness(1)"
                    : "grayscale(30%) contrast(1.1) brightness(0.95)",
                  transition: "filter 0.5s ease",
                }}
              />

              {/* Clones RGB durante glitch */}
              {glitching && (
                <>
                  <img src={Icono} alt="" style={{
                    position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover",
                    opacity:0.5, mixBlendMode:"screen",
                    filter:"hue-rotate(155deg) saturate(5)",
                    transform:"translateX(-5px)", pointerEvents:"none",
                  }} />
                  <img src={Icono} alt="" style={{
                    position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover",
                    opacity:0.4, mixBlendMode:"screen",
                    filter:"hue-rotate(295deg) saturate(5)",
                    transform:"translateX(5px)", pointerEvents:"none",
                  }} />
                </>
              )}

              <div className="himg-scan" />
              <div className="himg-border" />

              {/* Caption inferior */}
              <div style={{
                position:"absolute", bottom:0, left:0, right:0, zIndex:10,
                padding:"0.5rem 0.75rem",
                background:"linear-gradient(transparent, rgba(0,0,0,0.7))",
                fontFamily:"'DM Mono',monospace", fontSize:"0.5rem",
                letterSpacing:"0.26em", color:"rgba(255,255,255,0.3)", textTransform:"uppercase",
              }}>
                BCN — ES / FULL STACK DEV
              </div>
            </div>
          </div>

          {/* ── BLOQUE DE TEXTO — mismo slot que el original ── */}
          <div className="text-center md:text-left space-y-4">

            {/* Label mono + typewriter */}
            <div
              className="hlabel justify-center md:justify-start"
              style={{ animation: "wUp 0.8s 0.3s both" }}
            >
              <Typewriter text="PORTFOLIO — 2026" delay={650} />
            </div>

            {/* NOMBRE con glitch + scramble */}
            <h1
              className={`hnw${glitching ? " glitch" : ""}`}
              style={{ animation: "wUp 0.9s 0.5s both" }}
            >
              <span className="gr" aria-hidden>{t.name}</span>
              <span className="gg" aria-hidden>{t.name}</span>
              <ScrambleText text={t.name} trigger={glitching} />
            </h1>

            {/* TÍTULO gradiente — mismo slot que original */}
            <div className="htitle" style={{ animation: "wUp 0.8s 0.7s both" }}>
              {t.title}
            </div>

            {/* DESCRIPCIÓN — mismo slot que original */}
            <p
              className="hdesc text-center md:text-left max-w-xl"
              style={{ animation: "wUp 0.8s 0.85s both" }}
            >
              {t.description}
            </p>

            {/* Contadores */}
            <div
              className="flex gap-3 justify-center md:justify-start"
              style={{ animation: "wUp 0.8s 0.95s both" }}
            >
              <div className="hctr">
                <span className="hctr-n">10<sup>+</sup></span>
                <span className="hctr-l">Projects</span>
              </div>
              <div className="hctr">
                <span className="hctr-n">1<sup>yr</sup></span>
                <span className="hctr-l">Experience</span>
              </div>
              <div className="hctr">
                <span className="hctr-n">∞</span>
                <span className="hctr-l">Learning</span>
              </div>
            </div>

            {/* BOTÓN CTA — mismo slot que original */}
            <div
              className="pt-2"
              style={{ animation: "wUp 0.8s 1.1s both" }}
            >
              <a href="#projects" className="hbtn">
                <span>{t.button}</span>
                <span style={{ fontSize:"0.62rem", opacity:0.55 }}>↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* ── SCROLL HINT — mismo slot que original ── */}
        <div
          className="hidden sm:flex absolute bottom-6 left-1/2 transform -translate-x-1/2 flex-col items-center z-10"
          style={{ animation: "wUp 0.8s 1.5s both" }}
        >
          <span style={{
            fontFamily: "'DM Mono',monospace",
            fontSize: "0.5rem",
            letterSpacing: "0.38em",
            color: "hsl(var(--muted-foreground) / 0.5)",
            textTransform: "uppercase",
            marginBottom: "0.4rem",
          }}>
            Scroll
          </span>
          <ArrowDown
            className="h-5 w-5 text-primary"
            style={{ animation: "arrowBounce 2s ease-in-out infinite" }}
          />
        </div>
      </section>
    </>
  );
};