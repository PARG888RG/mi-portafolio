import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, useMotionValue, animate, AnimatePresence } from 'framer-motion';
import { certificatesData } from '../data/portfolioData';

// Mapeo de etiquetas a iconos
const getTagIconUrl = (tag) => {
  const map = {
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
  const slug = map[key] || "codefactor";
  return `https://cdn.simpleicons.org/${slug}/white`;
};

export default function Certificates() {
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [selectedImage, setSelectedImage] = useState(null);

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

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedImage(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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

      {/* Carrusel / Grid */}
      {selectedCategory === 'Todas' ? (
        <div className="relative w-full">
          
          <button
            onClick={handlePrev}
            aria-label="Certificado anterior"
            className="absolute -left-2 md:left-2 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full glass-card border border-[var(--border-color)] text-[var(--text-main)] hover:border-[#D03B13] hover:text-[#D03B13] flex items-center justify-center transition-all duration-200 active:scale-95 shadow-lg"
          >
            <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={handleNext}
            aria-label="Certificado siguiente"
            className="absolute -right-2 md:right-2 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full glass-card border border-[var(--border-color)] text-[var(--text-main)] hover:border-[#D03B13] hover:text-[#D03B13] flex items-center justify-center transition-all duration-200 active:scale-95 shadow-lg"
          >
            <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

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
                    className={`w-[82vw] sm:w-[320px] lg:w-[360px] h-[520px] shrink-0
                      glass-card rounded-3xl p-5 sm:p-6 flex flex-col justify-between 
                      transition-all duration-300 overflow-hidden ${
                      isCenter 
                        ? 'border-[var(--badge-border)] shadow-2xl opacity-100 scale-100 cursor-default' 
                        : 'border-transparent opacity-40 scale-95 hover:opacity-75 cursor-pointer'
                    }`}
                  >
                    <CertCardContent 
                      cert={cert} 
                      isCenter={isCenter} 
                      onImageClick={(imgData) => setSelectedImage(imgData)}
                    />
                  </article>
                );
              })}
            </motion.div>
          </div>

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
                className="w-full h-[520px] glass-card rounded-3xl p-5 sm:p-6 flex flex-col justify-between border-[var(--badge-border)] shadow-lg hover:border-white/30 transition-all duration-300"
              >
                <CertCardContent 
                  cert={cert} 
                  isCenter={true} 
                  onImageClick={(imgData) => setSelectedImage(imgData)}
                />
              </article>
            ))}
          </motion.div>
        </AnimatePresence>
      )}

      {/* Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[9999] flex items-start justify-center p-4 sm:p-6 pt-24 sm:pt-28 bg-black/60 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full rounded-3xl p-3 overflow-hidden glass-card border border-white/20 bg-black/40 backdrop-blur-xl shadow-2xl flex flex-col items-center justify-center"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/50 hover:bg-black/75 text-white backdrop-blur-md flex items-center justify-center border border-white/20 transition-transform active:scale-90"
                aria-label="Cerrar vista previa"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="w-full flex items-center justify-center p-2">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title || "Certificado"}
                  className="w-auto h-auto max-w-full max-h-[60vh] object-contain rounded-xl select-none"
                />
              </div>

              {selectedImage.title && (
                <div className="w-full py-2 px-4 text-center border-t border-white/10 bg-black/30 rounded-b-2xl">
                  <p className="text-sm font-semibold text-[var(--text-main)] truncate">
                    {selectedImage.title}
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}

function CertCardContent({ cert, isCenter, onImageClick }) {
  const catList = Array.isArray(cert.categories) 
    ? cert.categories 
    : (cert.category ? [cert.category] : []);

  const imageSrc = cert.image || cert.imageUrl || cert.img || cert.src || "";

  return (
    <div className="h-full flex flex-col justify-between overflow-hidden">
      
      {/* 1. Encabezado y Descripción */}
      <div className="shrink-0 space-y-1">
        <div className="flex justify-between items-start gap-2">
          <h3 className="text-base sm:text-lg font-bold text-[var(--text-main)] leading-tight line-clamp-1">
            {cert.title}
          </h3>
          <span className="text-[11px] text-[var(--text-muted)] font-mono shrink-0 pt-0.5">
            {cert.date}
          </span>
        </div>
        
        <p className="text-[11px] font-semibold text-[var(--cyan-link)] truncate">
          {cert.issuer}
        </p>

        <p className="text-[var(--text-muted)] text-[11px] leading-snug font-normal line-clamp-2">
          {cert.description}
        </p>
      </div>

      {/* 2. Área Central de la Imagen */}
      <div className="flex-1 my-2 flex items-center justify-center min-h-0">
        {imageSrc ? (
          <div 
            onClick={(e) => {
              e.stopPropagation();
              if (isCenter) {
                onImageClick({ src: imageSrc, title: cert.title });
              }
            }}
            className={`relative w-full h-full max-h-[210px] rounded-xl overflow-hidden group border border-[var(--border-color)] bg-black/40 backdrop-blur-sm shadow-md flex items-center justify-center ${
              isCenter ? 'cursor-pointer' : ''
            }`}
          >
            <img 
              src={imageSrc} 
              alt={cert.title} 
              loading="lazy"
              decoding="async"
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = 'none';
              }}
              className="w-full h-full object-contain p-1.5 transition-all duration-300 group-hover:scale-[1.02] select-none"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="p-2 rounded-full bg-black/60 text-white border border-white/20 backdrop-blur-md">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                </svg>
              </span>
            </div>
          </div>
        ) : (
          <div className="w-full h-full max-h-[210px] rounded-xl border border-dashed border-white/20 bg-white/5 flex items-center justify-center text-xs text-[var(--text-muted)]">
            Sin imagen disponible
          </div>
        )}
      </div>

      {/* 3. Badges e Iconos */}
      <div className="shrink-0 space-y-2">
        <div className="flex flex-wrap gap-1">
          {catList.map((cat, idx) => {
            const iconUrl = typeof getTagIconUrl === 'function' ? getTagIconUrl(cat) : null;
            return (
              <span 
                key={idx} 
                className="inline-flex items-center text-[10px] font-semibold px-2 py-0.5 bg-[var(--badge-bg)] text-[var(--badge-text)] rounded-lg border border-[var(--badge-border)] backdrop-blur-md"
              >
                {iconUrl && (
                  <img 
                    src={iconUrl} 
                    alt="" 
                    onError={(e) => { e.target.style.display = 'none'; }}
                    className="w-3 h-3 mr-1 object-contain opacity-90 shrink-0"
                  />
                )}
                {cat}
              </span>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-[var(--border-color)]">
          {cert.link ? (
            <a 
              href={cert.link} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={(e) => !isCenter && e.preventDefault()}
              className="text-xs font-bold text-[var(--text-main)] hover:text-[#D03B13] transition-colors duration-200 inline-flex items-center gap-1"
            >
              Ver credencial
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          ) : <span />}

          <button
            onClick={() => isCenter && imageSrc && onImageClick({ src: imageSrc, title: cert.title })}
            className="text-xs text-[var(--text-muted)] hover:text-[var(--text-main)] flex items-center gap-1 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Vista previa
          </button>
        </div>
      </div>

    </div>
  );
}