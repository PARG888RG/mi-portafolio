import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, useMotionValue, animate, AnimatePresence } from 'framer-motion';
import { certificatesData } from '../data/portfolioData';

// Mapeo completo de etiquetas a slugs reales de Simple Icons
const getTagIconUrl = (tag) => {
  const map = {
    // Categorías visualizadas en tu interfaz
    "inteligencia artificial": "openai",
    "ia": "openai",
    "ux / ui": "figma",
    "ux design": "figma",
    "diseño web": "html5",
    "web development": "html5",
    "linux": "linux",
    "sistemas": "archlinux",
    "cloud": "googlecloud",
    "productividad": "notion",
    "redes": "cisco",
    "hardware": "intel",
    "ciberseguridad": "kalilinux",
    "cybersecurity": "kalilinux",

    // Marcas, Proveedores y Tecnologías
    "cisco": "cisco",
    "google": "google",
    "coursera": "coursera",
    "hack the box": "hackthebox",
    "microsoft": "microsoft",
    "javascript": "javascript",
    "react": "react",
    "html": "html5",
    "css": "css3",
    "python": "python",
    "node.js": "nodedotjs",
    "node": "nodedotjs"
  };

  const key = (tag || '').toLowerCase().trim();
  // Usa "codefactor" como icono por defecto en vez de codeberg cuando no hay coincidencia
  const slug = map[key] || "codefactor";
  
  return `https://cdn.simpleicons.org/${slug}/white`;
};

export default function Certificates() {
  const [selectedCategory, setSelectedCategory] = useState('Todas');

  const categories = useMemo(() => {
    const cats = new Set();
    certificatesData.forEach((cert) => {
      if (Array.isArray(cert.categories)) {
        cert.categories.forEach((cat) => cats.add(cat));
      } else if (cert.category) {
        cats.add(cert.category);
      }
    });
    return ['Todas', ...Array.from(cats)];
  }, []);

  const filteredCertificates = useMemo(() => {
    if (selectedCategory === 'Todas') return certificatesData;
    return certificatesData.filter((cert) => {
      if (Array.isArray(cert.categories)) {
        return cert.categories.includes(selectedCategory);
      }
      return cert.category === selectedCategory;
    });
  }, [selectedCategory]);

  const totalOriginal = certificatesData.length;

  const extendedData = useMemo(() => [
    ...certificatesData,
    ...certificatesData,
    ...certificatesData,
    ...certificatesData,
    ...certificatesData
  ], [totalOriginal]);

  const [currentIndex, setCurrentIndex] = useState(totalOriginal * 2);
  const isAnimatingRef = useRef(false);
  const x = useMotionValue(0);
  const containerRef = useRef(null);

  const getCardWidth = () => {
    if (typeof window === 'undefined') return 360;
    const width = window.innerWidth;
    if (width < 640) return width * 0.82;
    if (width < 1024) return 320;
    return 360;
  };

  const getGap = () => {
    if (typeof window === 'undefined') return 24;
    const width = window.innerWidth;
    if (width < 640) return 16;
    if (width < 1024) return 20;
    return 24;
  };

  const getTargetX = (index) => {
    if (!containerRef.current) return 0;
    const containerWidth = containerRef.current.offsetWidth;
    const cardWidth = getCardWidth();
    const gap = getGap();
    const cardCenter = index * (cardWidth + gap) + cardWidth / 2;
    return containerWidth / 2 - cardCenter;
  };

  const scrollToDistance = (index, duration = 0.45, onCompleteCallback) => {
    if (!containerRef.current) return;
    const targetX = getTargetX(index);

    if (duration === 0) {
      x.set(targetX);
      if (onCompleteCallback) onCompleteCallback();
    } else {
      isAnimatingRef.current = true;
      animate(x, targetX, {
        type: 'spring',
        stiffness: 400,
        damping: 32,
        onComplete: () => {
          isAnimatingRef.current = false;
          if (onCompleteCallback) onCompleteCallback();
        }
      });
    }
  };

  useEffect(() => {
    if (selectedCategory === 'Todas') {
      scrollToDistance(currentIndex, 0);
    }
    const handleResize = () => {
      if (selectedCategory === 'Todas') scrollToDistance(currentIndex, 0);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [selectedCategory, currentIndex]);

  const handleNext = () => {
    if (isAnimatingRef.current || selectedCategory !== 'Todas') return;

    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);

    scrollToDistance(nextIndex, 0.45, () => {
      if (nextIndex >= totalOriginal * 3.5) {
        const resetIndex = nextIndex - totalOriginal;
        setCurrentIndex(resetIndex);
        x.set(getTargetX(resetIndex));
      }
    });
  };

  const handlePrev = () => {
    if (isAnimatingRef.current || selectedCategory !== 'Todas') return;

    const prevIndex = currentIndex - 1;
    setCurrentIndex(prevIndex);

    scrollToDistance(prevIndex, 0.45, () => {
      if (prevIndex <= totalOriginal * 1.5) {
        const resetIndex = prevIndex + totalOriginal;
        setCurrentIndex(resetIndex);
        x.set(getTargetX(resetIndex));
      }
    });
  };

  const handleDragEnd = (event, info) => {
    const swipeThreshold = 40;
    if (info.offset.x < -swipeThreshold) {
      handleNext();
    } else if (info.offset.x > swipeThreshold) {
      handlePrev();
    }
  };

  const activeDotIndex = ((currentIndex % totalOriginal) + totalOriginal) % totalOriginal;

  return (
    <section id="certificados" className="py-18 px-4 max-w-7xl mx-auto overflow-hidden relative scroll-mt-16 select-none">
      
      {/* Encabezado */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="mb-10 text-center"
      >
        <span className="text-xs font-bold tracking-wider uppercase px-4 py-1.5 rounded-full bg-[var(--badge-bg)] text-[var(--badge-text)] border border-[var(--badge-border)] mb-3 inline-block backdrop-blur-md">
          Formación Continua
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--text-main)] mb-4">
          Certificaciones & Logros
        </h2>
        <p className="text-[var(--text-muted)] max-w-xl mx-auto text-base font-normal mb-8">
          Credenciales obtenidas en áreas de desarrollo web, experiencia de usuario y seguridad informática.
        </p>

        {/* Filtros */}
        <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto px-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border ${
                selectedCategory === cat
                  ? 'bg-[#D03B13] text-white border-[#D03B13] shadow-md scale-105'
                  : 'bg-white/5 text-[var(--text-muted)] border-white/10 hover:border-white/20 hover:text-[var(--text-main)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </motion.div>

      {/* VISTA 1: Carrusel Infinito ('Todas') */}
      {selectedCategory === 'Todas' ? (
        <div className="relative w-full">
          
          {/* Botón Izquierda Flotante */}
          <button
            onClick={handlePrev}
            aria-label="Certificado anterior"
            className="absolute -left-2 md:left-2 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full glass-card border border-[var(--border-color)] text-[var(--text-main)] hover:border-[#D03B13] hover:text-[#D03B13] flex items-center justify-center transition-all duration-200 active:scale-95 shadow-lg"
          >
            <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Botón Derecha Flotante */}
          <button
            onClick={handleNext}
            aria-label="Certificado siguiente"
            className="absolute -right-2 md:right-2 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full glass-card border border-[var(--border-color)] text-[var(--text-main)] hover:border-[#D03B13] hover:text-[#D03B13] flex items-center justify-center transition-all duration-200 active:scale-95 shadow-lg"
          >
            <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Slider Arrastrable */}
          <div className="relative w-full overflow-hidden py-4 touch-pan-y" ref={containerRef}>
            <motion.div 
              style={{ x }} 
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
              onDragEnd={handleDragEnd}
              className="flex gap-4 sm:gap-5 lg:gap-6 items-center w-max cursor-grab active:cursor-grabbing"
            >
              {extendedData.map((cert, index) => {
                const isCenter = index === currentIndex;
                return (
                  <article
                    key={`${cert.id || index}-${index}`}
                    onClick={() => {
                      if (!isCenter && !isAnimatingRef.current) {
                        setCurrentIndex(index);
                        scrollToDistance(index);
                      }
                    }}
                    className={`w-[82vw] sm:w-[320px] lg:w-[360px] h-[410px] sm:h-[420px] shrink-0
                      glass-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between 
                      transition-all duration-300 overflow-hidden ${
                      isCenter 
                        ? 'border-[var(--badge-border)] shadow-2xl opacity-100 scale-100 cursor-default' 
                        : 'border-transparent opacity-40 scale-95 hover:opacity-75 cursor-pointer'
                    }`}
                  >
                    <CertCardContent cert={cert} isCenter={isCenter} />
                  </article>
                );
              })}
            </motion.div>
          </div>

          {/* Indicadores en Puntos (Dots) */}
          <div className="flex justify-center items-center gap-2 mt-6">
            <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              {certificatesData.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (isAnimatingRef.current) return;
                    const diff = idx - activeDotIndex;
                    const target = currentIndex + diff;
                    setCurrentIndex(target);
                    scrollToDistance(target);
                  }}
                  aria-label={`Ir al certificado ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeDotIndex === idx 
                      ? 'w-6 bg-[#D03B13] shadow-sm' 
                      : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>

        </div>
      ) : (
        /* VISTA 2: Data Grid (Filtro Activo) */
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto py-4"
          >
            {filteredCertificates.map((cert) => (
              <article
                key={cert.id}
                className="w-full h-[410px] sm:h-[420px] glass-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between border-[var(--badge-border)] shadow-lg hover:border-white/30 transition-all duration-300"
              >
                <CertCardContent cert={cert} isCenter={true} />
              </article>
            ))}
          </motion.div>
        </AnimatePresence>
      )}

    </section>
  );
}

function CertCardContent({ cert, isCenter }) {
  const catList = Array.isArray(cert.categories) 
    ? cert.categories 
    : (cert.category ? [cert.category] : []);

  return (
    <>
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex justify-between items-start mb-2 gap-2 shrink-0">
          <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-main)] leading-tight line-clamp-2">
            {cert.title}
          </h3>
          <span className="text-xs text-[var(--text-muted)] font-mono shrink-0 pt-1">
            {cert.date}
          </span>
        </div>

        <p className="text-xs font-semibold text-[var(--cyan-link)] mb-3 shrink-0 truncate">
          {cert.issuer}
        </p>

        <div className="overflow-y-auto pr-1 custom-scrollbar flex-1">
          <p className="text-[var(--text-muted)] text-xs sm:text-sm leading-relaxed font-normal">
            {cert.description}
          </p>
        </div>
      </div>

      <div className="mt-auto pt-4 shrink-0">
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
          {catList.map((cat, idx) => (
            <span 
              key={idx} 
              className="inline-flex items-center text-[11px] font-semibold px-2.5 py-1 bg-[var(--badge-bg)] text-[var(--badge-text)] rounded-lg border border-[var(--badge-border)] backdrop-blur-md"
            >
              <img 
                src={getTagIconUrl(cat)} 
                alt="" 
                className="w-3.5 h-3.5 mr-1.5 object-contain opacity-90 shrink-0"
                onError={(e) => {
                  // Muestra un SVG de código estándar en color blanco si falla la red
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' /%3E%3C/svg%3E";
                }}
              />
              {cat}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-5 pt-3.5 border-t border-[var(--border-color)]">
          {cert.link && (
            <a 
              href={cert.link} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={(e) => !isCenter && e.preventDefault()}
              className="text-xs sm:text-sm font-bold text-[var(--text-main)] hover:text-[#D03B13] transition-colors duration-200 inline-flex items-center gap-1.5"
            >
              Ver credencial
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </>
  );
}