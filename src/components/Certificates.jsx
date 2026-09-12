import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, useMotionValue, animate, AnimatePresence } from 'framer-motion';
import { certificatesData } from '../data/portfolioData';
import { getLocalIconUrl } from '../utils/iconUrl';

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
  return getLocalIconUrl(slug, 'FFFFFF');
};

export default function Certificates() {
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [selectedImage, setSelectedImage] = useState(null);

  const totalOriginal = certificatesData.length;
  // Triplicamos el array para el efecto infinito
  const carouselItems = useMemo(() => {
    return [...certificatesData, ...certificatesData, ...certificatesData];
  }, []);

  // Empezamos en el set del medio
  const [currentIndex, setCurrentIndex] = useState(totalOriginal);
  const isAnimatingRef = useRef(false);
  const x = useMotionValue(0);
  const containerRef = useRef(null);

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

  // AQUÍ ESTÁ LA MAGIA CORREGIDA
  const scrollToDistance = (index, duration = 0.35, onCompleteCallback) => {
    if (!containerRef.current) return;
    const targetX = getTargetX(index);

    if (duration === 0) {
      x.stop();
      x.set(targetX);
      isAnimatingRef.current = false;
      if (onCompleteCallback) onCompleteCallback();
    } else {
      isAnimatingRef.current = true;
      animate(x, targetX, {
        duration,
        ease: [0.25, 1, 0.5, 1], // easeOutQuart sin rebote
        onComplete: () => {
          isAnimatingRef.current = false;
          if (onCompleteCallback) onCompleteCallback();
        }
      });
    }
  };

  const checkLoopReset = (index) => {
    if (index >= totalOriginal * 2) {
      const resetIndex = index - totalOriginal;
      setCurrentIndex(resetIndex);
      scrollToDistance(resetIndex, 0);
    } else if (index < totalOriginal) {
      const resetIndex = index + totalOriginal;
      setCurrentIndex(resetIndex);
      scrollToDistance(resetIndex, 0);
    }
  };

  useEffect(() => {
    if (selectedCategory === 'Todas') {
      setCurrentIndex(totalOriginal);
      scrollToDistance(totalOriginal, 0);
    }
    const handleResize = () => {
      if (selectedCategory === 'Todas') {
        scrollToDistance(currentIndex, 0);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [selectedCategory, totalOriginal]);

  const handleNext = () => {
    if (selectedCategory !== 'Todas' || isAnimatingRef.current) return;
    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);
    scrollToDistance(nextIndex, 0.35, () => checkLoopReset(nextIndex));
  };

  const handlePrev = () => {
    if (selectedCategory !== 'Todas' || isAnimatingRef.current) return;
    const prevIndex = currentIndex - 1;
    setCurrentIndex(prevIndex);
    scrollToDistance(prevIndex, 0.35, () => checkLoopReset(prevIndex));
  };

  const activeDotIndex = currentIndex % totalOriginal;

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

      {/* Carrusel Infinito */}
      {selectedCategory === 'Todas' ? (
        <div className="relative w-full">
          
          <button
            onClick={handlePrev}
            aria-label="Certificado anterior"
            className="absolute left-1 md:left-2 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full glass-card border border-[var(--border-color)] text-[var(--text-main)] hover:border-[#D03B13] hover:text-[#D03B13] flex items-center justify-center transition-all duration-200 active:scale-95 shadow-lg"
          >
            <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={handleNext}
            aria-label="Certificado siguiente"
            className="absolute right-1 md:right-2 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full glass-card border border-[var(--border-color)] text-[var(--text-main)] hover:border-[#D03B13] hover:text-[#D03B13] flex items-center justify-center transition-all duration-200 active:scale-95 shadow-lg"
          >
            <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="relative w-full overflow-hidden py-8" ref={containerRef}>
            <motion.div 
              style={{ x }} 
              className="flex gap-4 sm:gap-5 lg:gap-6 items-center w-max"
            >
              {carouselItems.map((cert, index) => {
                const isCenter = index === currentIndex;
                
                return (
                  <article
                    key={index}
                    onClick={() => {
                      if (!isCenter && !isAnimatingRef.current) {
                        setCurrentIndex(index);
                        scrollToDistance(index, 0.35, () => checkLoopReset(index));
                      }
                    }}
                    className={`w-[82vw] sm:w-[320px] lg:w-[360px] h-[520px] shrink-0
                      glass-card rounded-3xl p-5 sm:p-6 flex flex-col justify-between 
                      transition-all duration-300 transform-gpu ${
                      isCenter 
                        ? 'border-[var(--badge-border)] shadow-2xl cursor-default scale-100 opacity-100' 
                        : 'border-transparent cursor-pointer scale-95 opacity-40 hover:opacity-70'
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

          {/* Dots */}
          <div className="flex justify-center items-center gap-2 mt-4">
            <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-[var(--badge-bg)] border border-[var(--badge-border)] backdrop-blur-md">
              {certificatesData.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (isAnimatingRef.current) return;
                    // Mapeamos el dot al set del medio
                    const target = totalOriginal + idx;
                    setCurrentIndex(target);
                    scrollToDistance(target, 0.35);
                  }}
                  aria-label={`Ir al certificado ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeDotIndex === idx 
                      ? 'w-6 bg-[#D03B13] shadow-sm' 
                      : 'w-2 bg-[var(--text-main)] opacity-25 hover:opacity-50'
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
          </div>
        ) : (
          <div className="w-full h-full max-h-[210px] rounded-xl border border-dashed border-white/20 bg-white/5 flex items-center justify-center text-xs text-[var(--text-muted)]">
            Sin imagen disponible
          </div>
        )}
      </div>

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
                    className="w-3 h-3 mr-1 object-contain dark:invert-0 invert transition-all duration-300 shrink-0 opacity-80"
                  />
                )}
                {cat}
              </span>
            );
          })}
        </div>

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