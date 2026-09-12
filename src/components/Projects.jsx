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
  
  const totalOriginal = projectsData.length;
  // Triplicamos el array para el efecto infinito
  const carouselItems = useMemo(() => {
    return [...projectsData, ...projectsData, ...projectsData];
  }, []);

  // Empezamos en el set del medio
  const [currentIndex, setCurrentIndex] = useState(totalOriginal);
  const isAnimatingRef = useRef(false);
  const x = useMotionValue(0);
  const containerRef = useRef(null);

  const allTags = useMemo(() => {
    const tagsSet = new Set();
    projectsData.forEach((project) => project.tags?.forEach((t) => tagsSet.add(t)));
    return ['Todas', ...Array.from(tagsSet)];
  }, []);

  const filteredProjects = useMemo(() => {
    if (selectedTag === 'Todas') return projectsData;
    return projectsData.filter((project) => project.tags?.includes(selectedTag));
  }, [selectedTag]);

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
    if (selectedTag === 'Todas') {
      setCurrentIndex(totalOriginal);
      scrollToDistance(totalOriginal, 0);
    }
    const handleResize = () => {
      if (selectedTag === 'Todas') {
        scrollToDistance(currentIndex, 0);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [selectedTag, totalOriginal]);

  const handleNext = () => {
    if (selectedTag !== 'Todas' || isAnimatingRef.current) return;
    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);
    scrollToDistance(nextIndex, 0.35, () => checkLoopReset(nextIndex));
  };

  const handlePrev = () => {
    if (selectedTag !== 'Todas' || isAnimatingRef.current) return;
    const prevIndex = currentIndex - 1;
    setCurrentIndex(prevIndex);
    scrollToDistance(prevIndex, 0.35, () => checkLoopReset(prevIndex));
  };

  const activeDotIndex = currentIndex % totalOriginal;

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

      {/* Carrusel Infinito */}
      {selectedTag === 'Todas' ? (
        <div className="relative w-full">
          
          <button
            onClick={handlePrev}
            aria-label="Proyecto anterior"
            className="absolute left-1 md:left-2 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full glass-card border border-[var(--border-color)] text-[var(--text-main)] hover:border-[#D03B13] hover:text-[#D03B13] flex items-center justify-center transition-all duration-200 active:scale-95 shadow-lg"
          >
            <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={handleNext}
            aria-label="Proyecto siguiente"
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
              {carouselItems.map((project, index) => {
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
                    className={`w-[82vw] sm:w-[320px] lg:w-[360px] h-[410px] sm:h-[420px] shrink-0
                      glass-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between 
                      transition-all duration-300 transform-gpu ${
                      isCenter 
                        ? 'border-[var(--badge-border)] shadow-2xl cursor-default scale-100 opacity-100' 
                        : 'border-transparent cursor-pointer scale-95 opacity-40 hover:opacity-70'
                    }`}
                  >
                    <ProjectCardContent project={project} isCenter={isCenter} />
                  </article>
                );
              })}
            </motion.div>
          </div>

          {/* Dots */}
          <div className="flex justify-center items-center gap-2 mt-4">
            <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-[var(--badge-bg)] border border-[var(--badge-border)] backdrop-blur-md">
              {projectsData.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (isAnimatingRef.current) return;
                    // Mapeamos el dot al set del medio
                    const target = totalOriginal + idx;
                    setCurrentIndex(target);
                    scrollToDistance(target, 0.35);
                  }}
                  aria-label={`Ir al proyecto ${idx + 1}`}
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

        <div className="overflow-y-auto pr-1 custom-scrollbar flex-1">
          <p className="text-[var(--text-muted)] text-xs sm:text-sm leading-relaxed font-normal">
            {project.description}
          </p>
        </div>
      </div>

      <div className="mt-auto pt-3 shrink-0">
        <div className="flex items-center gap-3 mb-3">
          {project.tags?.map((tag, idx) => (
            <img 
              key={idx}
              src={getTagIconUrl(tag)} 
              alt={tag} 
              title={tag}
              className="w-4 h-4 object-contain dark:invert-0 invert transition-all duration-300 opacity-80 hover:opacity-100" 
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