import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, useMotionValue, animate, AnimatePresence } from 'framer-motion';
import { certificatesData } from '../data/portfolioData';

export default function Certificates() {
  const [selectedCategory, setSelectedCategory] = useState('Todas');

  // 1. Obtener TODAS las categorías únicas iterando sobre los arreglos de cada certificado
  const categories = useMemo(() => {
    const cats = new Set();
    certificatesData.forEach((cert) => {
      // Soporta tanto si es un arreglo como si mantienes alguna como string simple por compatibilidad
      if (Array.isArray(cert.categories)) {
        cert.categories.forEach((cat) => cats.add(cat));
      } else if (cert.category) {
        cats.add(cert.category);
      }
    });
    return ['Todas', ...Array.from(cats)];
  }, []);

  // 2. Filtrar los certificados verificando si contienen la categoría seleccionada
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
        stiffness: 260,
        damping: 28,
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
        <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto px-2">
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
        <>
          <div className="relative w-full overflow-hidden py-4" ref={containerRef}>
            <motion.div style={{ x }} className="flex gap-4 sm:gap-5 lg:gap-6 items-center w-max">
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
                    className={`w-[82vw] sm:w-[320px] lg:w-[360px] h-[400px] shrink-0
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

          <div className="flex items-center justify-between w-full max-w-sm mx-auto mt-8 z-40 px-2">
            <button
              onClick={handlePrev}
              aria-label="Anterior"
              className="w-10 h-10 rounded-full glass-card text-[var(--text-main)] flex items-center justify-center hover:border-[#D03B13] hover:text-[#D03B13] transition-colors shadow-md active:scale-95"
            >
              ←
            </button>

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
                      ? 'w-6 bg-[var(--cyan-link)] shadow-sm' 
                      : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              aria-label="Siguiente"
              className="w-10 h-10 rounded-full glass-card text-[var(--text-main)] flex items-center justify-center hover:border-[#D03B13] hover:text-[#D03B13] transition-colors shadow-md active:scale-95"
            >
              →
            </button>
          </div>
        </>
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
                className="w-full h-[400px] glass-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between border-[var(--badge-border)] shadow-lg hover:border-white/30 transition-all duration-300"
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

// Subcomponente de tarjeta preparado para mostrar múltiples badget/chips
function CertCardContent({ cert, isCenter }) {
  const catList = Array.isArray(cert.categories) 
    ? cert.categories 
    : (cert.category ? [cert.category] : []);

  return (
    <>
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Renderizado de badges para múltiples categorías */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3 shrink-0">
          <div className="flex flex-wrap gap-1">
            {catList.map((cat, idx) => (
              <span 
                key={idx}
                className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[var(--badge-bg)] text-[var(--badge-text)] border border-[var(--badge-border)] backdrop-blur-md"
              >
                {cat}
              </span>
            ))}
          </div>
          <span className="text-xs text-[var(--text-muted)] font-mono shrink-0">
            {cert.date}
          </span>
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-[var(--text-main)] leading-snug mb-1 line-clamp-2 shrink-0">
          {cert.title}
        </h3>

        <p className="text-xs font-semibold text-[var(--cyan-link)] mb-3 shrink-0 truncate">
          {cert.issuer}
        </p>

        <div className="overflow-y-auto pr-1 custom-scrollbar flex-1">
          <p className="text-[var(--text-muted)] text-xs sm:text-sm leading-relaxed font-normal">
            {cert.description}
          </p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-[var(--border-color)] flex items-center justify-end shrink-0">
        <a
          href={cert.link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => !isCenter && e.preventDefault()}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[var(--text-main)] hover:text-[#D03B13] transition-colors duration-200"
        >
          Ver credencial
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </>
  );
}