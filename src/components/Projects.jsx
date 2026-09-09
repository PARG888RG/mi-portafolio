import { useState } from 'react';
import { motion } from 'framer-motion';
import { projectsData } from '../data/portfolioData';

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
  return `https://cdn.simpleicons.org/${slug}`;
};

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % projectsData.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + projectsData.length) % projectsData.length);
  };

  return (
    <section id="projects" className="py-24 px-4 max-w-7xl mx-auto overflow-hidden relative">
      
      {/* Encabezado */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mb-14 text-center"
      >
        <span className="text-xs font-bold tracking-wider uppercase px-4 py-1.5 rounded-full bg-[var(--badge-bg)] text-[var(--badge-text)] border border-[var(--badge-border)] mb-3 inline-block backdrop-blur-md">
          Mi Trabajo
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--text-main)] mb-4">
          Proyectos Destacados
        </h2>
        <p className="text-[var(--text-muted)] max-w-xl mx-auto text-base font-normal">
          Una selección de herramientas y plataformas en las que he aplicado buenas prácticas de desarrollo web y arquitectura.
        </p>
      </motion.div>

      {/* Carrusel */}
      <div className="relative flex flex-col items-center">
        <div className="relative w-full h-[450px] sm:h-[430px] flex items-center justify-center">
          {projectsData.map((project, index) => {
            let offset = index - currentIndex;
            const total = projectsData.length;
            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;

            const isCenter = offset === 0;
            const absOffset = Math.abs(offset);

            if (absOffset > 2) return null;

            const scale = isCenter ? 1 : 1 - absOffset * 0.15;
            const opacity = isCenter ? 1 : 0.65 - (absOffset - 1) * 0.25;
            const blur = isCenter ? 'blur(0px)' : `blur(${absOffset * 3}px)`;
            const zIndex = 30 - absOffset * 10;
            const xOffset = offset * 280;

            return (
              <motion.article
                key={project.id}
                initial={false}
                animate={{
                  x: xOffset,
                  scale: scale,
                  opacity: opacity,
                  filter: blur,
                  zIndex: zIndex,
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onClick={() => setCurrentIndex(index)}
                className={`absolute w-[310px] sm:w-[360px] h-[390px] sm:h-[400px] 
                  glass-card rounded-3xl p-6 sm:p-7 
                  flex flex-col justify-between 
                  transition-all duration-300 select-none ${
                  isCenter 
                    ? 'cursor-default border-[var(--badge-border)]' 
                    : 'cursor-pointer hover:border-white/30'
                }`}
              >
                {/* Bloque Superior */}
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-3 gap-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-main)] leading-tight">
                      {project.title}
                    </h3>
                    {project.featured && (
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 bg-[#D03B13]/90 text-white rounded-md shadow-xs shrink-0 backdrop-blur-md">
                        Destacado
                      </span>
                    )}
                  </div>

                  <p className="text-[var(--text-muted)] text-xs sm:text-sm leading-relaxed font-normal">
                    {project.description}
                  </p>
                </div>

                {/* Bloque Inferior */}
                <div className="mt-auto pt-4">
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-5">
                    {project.tags.map((tag, idx) => (
                      <span 
                        key={idx} 
                        className="inline-flex items-center text-[11px] font-semibold px-2.5 py-1 bg-[var(--badge-bg)] text-[var(--badge-text)] rounded-lg border border-[var(--badge-border)] backdrop-blur-md"
                      >
                        <img 
                          src={getTagIconUrl(tag)} 
                          alt={tag} 
                          className="w-3 h-3 mr-1.5 object-contain" 
                        />
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-5 pt-3.5 border-t border-[var(--border-color)]">
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
              </motion.article>
            );
          })}
        </div>

        {/* Controles de Navegación */}
        <div className="flex items-center justify-between w-full max-w-xs mt-6 z-40">
          <button
            onClick={handlePrev}
            aria-label="Proyecto anterior"
            className="w-10 h-10 rounded-full glass-card text-[var(--text-main)] flex items-center justify-center hover:border-[#D03B13] hover:text-[#D03B13] transition-colors shadow-md active:scale-95"
          >
            ←
          </button>

          <div className="flex gap-2">
            {projectsData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Ir al proyecto ${idx + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentIndex === idx 
                    ? 'w-8 bg-[#D03B13]' 
                    : 'w-2.5 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            aria-label="Proyecto siguiente"
            className="w-10 h-10 rounded-full glass-card text-[var(--text-main)] flex items-center justify-center hover:border-[#D03B13] hover:text-[#D03B13] transition-colors shadow-md active:scale-95"
          >
            →
          </button>
        </div>

      </div>
    </section>
  );
}