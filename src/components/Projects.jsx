import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, useMotionValue, animate, AnimatePresence } from 'framer-motion';
import { projectsData } from '../data/portfolioData';
import { getLocalIconUrl } from '../utils/iconUrl';

const getTagIconUrl = (tag) => {
  const map = {
    "JavaScript": "javascript",
    "Firebase": "firebase",
    "UX Design": "figma",
    "HTML": "html5",
    "CSS": "tailwindcss",
    "MongoDB Atlas": "mongodb",
    "MySQL": "mysql",
    "React": "react"
  };
  const slug = map[tag] || "codeberg";
  return getLocalIconUrl(slug);
};

export default function Projects() {
  const [selectedTag, setSelectedTag] = useState('Todas');

  const allTags = useMemo(() => {
    const tagsSet = new Set();
    projectsData.forEach((project) => project.tags?.forEach((t) => tagsSet.add(t)));
    return ['Todas', ...Array.from(tagsSet)];
  }, []);

  const filteredProjects = useMemo(() => {
    if (selectedTag === 'Todas') return projectsData;
    return projectsData.filter((project) => project.tags?.includes(selectedTag));
  }, [selectedTag]);

  const totalOriginal = projectsData.length;

  const extendedData = useMemo(() => [
    ...projectsData,
    ...projectsData,
    ...projectsData,
    ...projectsData,
    ...projectsData
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

  const scrollToDistance = (index, duration = 0.25, onCompleteCallback) => {
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
    if (selectedTag === 'Todas') {
      scrollToDistance(currentIndex, 0);
    }
    const handleResize = () => {
      if (selectedTag === 'Todas') scrollToDistance(currentIndex, 0);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [selectedTag, currentIndex]);

  const handleNext = () => {
    if (isAnimatingRef.current || selectedTag !== 'Todas') return;

    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);

    scrollToDistance(nextIndex, 0.25, () => {
      if (nextIndex >= totalOriginal * 3.5) {
        const resetIndex = nextIndex - totalOriginal;
        setCurrentIndex(resetIndex);
        x.set(getTargetX(resetIndex));
      }
    });
  };

  const handlePrev = () => {
    if (isAnimatingRef.current || selectedTag !== 'Todas') return;

    const prevIndex = currentIndex - 1;
    setCurrentIndex(prevIndex);

    scrollToDistance(prevIndex, 0.25, () => {
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
    <section id="projects" className="py-18 px-4 max-w-7xl mx-auto overflow-hidden relative select-none">
      
      {/* Encabezado */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="mb-10 text-center"
      >
        <span className="text-xs font-bold tracking-wider uppercase px-4 py-1.5 rounded-full bg-[var(--badge-bg)] text-[var(--badge-text)] border border-[var(--badge-border)] mb-3 inline-block backdrop-blur-md">
          Mi Trabajo
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--text-main)] mb-4">
          Proyectos Destacados
        </h2>
        <p className="text-[var(--text-muted)] max-w-xl mx-auto text-base font-normal mb-8">
          Una selección de herramientas y plataformas en las que he aplicado buenas prácticas de desarrollo web y arquitectura.
        </p>

        {/* Filtros */}
        <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto px-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border ${
                selectedTag === tag
                  ? 'bg-[#D03B13] text-white border-[#D03B13] shadow-md scale-105'
                  : 'bg-white/5 text-[var(--text-muted)] border-white/10 hover:border-white/20 hover:text-[var(--text-main)]'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </motion.div>

      {/* VISTA 1: Carrusel Infinito Real ('Todas') */}
      {selectedTag === 'Todas' ? (
        <div className="relative w-full">
          
          {/* Botón Izquierda Flotante */}
          <button
            onClick={handlePrev}
            aria-label="Proyecto anterior"
            className="absolute -left-2 md:left-2 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full glass-card border border-[var(--border-color)] text-[var(--text-main)] hover:border-[#D03B13] hover:text-[#D03B13] flex items-center justify-center transition-all duration-200 active:scale-95 shadow-lg"
          >
            <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Botón Derecha Flotante */}
          <button
            onClick={handleNext}
            aria-label="Proyecto siguiente"
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
              {extendedData.map((project, index) => {
                const isCenter = index === currentIndex;
                return (
                  <article
                    key={`${project.id || index}-${index}`}
                    onClick={() => {
                      if (!isCenter && !isAnimatingRef.current) {
                        setCurrentIndex(index);
                        scrollToDistance(index, 0.25);
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
                    <ProjectCardContent project={project} isCenter={isCenter} />
                  </article>
                );
              })}
            </motion.div>
          </div>

          {/* Indicadores en Puntos (Dots) */}
          <div className="flex justify-center items-center gap-2 mt-6">
            <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              {projectsData.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (isAnimatingRef.current) return;
                    const diff = idx - activeDotIndex;
                    const target = currentIndex + diff;
                    setCurrentIndex(target);
                    scrollToDistance(target, 0.25);
                  }}
                  aria-label={`Ir al proyecto ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeDotIndex === idx ? 'w-6 bg-[#D03B13] shadow-sm' : 'w-2 bg-white/20 hover:bg-white/40'
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
            key={selectedTag}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto py-4"
          >
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                className="w-full h-[410px] sm:h-[420px] glass-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between border-[var(--badge-border)] shadow-lg hover:border-white/30 transition-all duration-300"
              >
                <ProjectCardContent project={project} isCenter={true} />
              </article>
            ))}
          </motion.div>
        </AnimatePresence>
      )}

    </section>
  );
}

function ProjectCardContent({ project, isCenter }) {
  return (
    <>
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex justify-between items-start mb-3 gap-2 shrink-0">
          <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-main)] leading-tight">
            {project.title}
          </h3>
          {project.featured && (
            <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 bg-[#D03B13]/90 text-white rounded-md shadow-xs shrink-0 backdrop-blur-md">
              Destacado
            </span>
          )}
        </div>

        {/* Espacio reservado donde puedes incluir tu contenido extra (imagen, video o texto adicional) */}
        <div className="overflow-y-auto pr-1 custom-scrollbar flex-1">
          <p className="text-[var(--text-muted)] text-xs sm:text-sm leading-relaxed font-normal">
            {project.description}
          </p>
        </div>
      </div>

      <div className="mt-auto pt-3 shrink-0">
        {/* Iconos limpios sin contenedor ni bordes */}
        <div className="flex items-center gap-3 mb-3">
          {project.tags?.map((tag, idx) => (
            <img 
              key={idx}
              src={getTagIconUrl(tag)} 
              alt={tag} 
              title={tag}
              className="w-4 h-4 object-contain opacity-80 hover:opacity-100 transition-opacity duration-200" 
            />
          ))}
        </div>

        <div className="flex items-center gap-5 pt-3 border-t border-[var(--border-color)]">
          {project.githubUrl && (
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={(e) => !isCenter && e.preventDefault()}
              className="text-xs sm:text-sm font-bold text-[var(--text-main)] hover:text-[#D03B13] transition-colors duration-200"
            >
              GitHub →
            </a>
          )}
          {project.demoUrl && (
            <a 
              href={project.demoUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={(e) => !isCenter && e.preventDefault()}
              className="text-xs sm:text-sm font-bold text-[var(--badge-text)] hover:underline"
            >
              Demo En Vivo ↗
            </a>
          )}
        </div>
      </div>
    </>
  );
}