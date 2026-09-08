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
  return (
    <section id="projects" className="py-24 px-6 max-w-6xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mb-16 text-center"
      >
        <span className="text-xs font-bold tracking-wider uppercase px-4 py-1.5 rounded-full bg-[var(--badge-bg)] text-[var(--badge-text)] border border-[var(--badge-border)] mb-3 inline-block">
          Mi Trabajo
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--text-main)] mb-4">
          Proyectos Destacados
        </h2>
        <p className="text-[var(--text-muted)] max-w-xl mx-auto text-base font-normal">
          Una selección de herramientas y plataformas en las que he aplicado buenas prácticas de desarrollo web y arquitectura.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projectsData.map((project, index) => (
          <motion.article 
            key={project.id} 
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
              duration: 0.7, 
              delay: index * 0.12,
              ease: [0.25, 1, 0.5, 1] // Curva de aceleración ultra suave
            }}
            whileHover={{ y: -6, transition: { duration: 0.2, ease: "easeOut" } }}
            /* IMPORTANTE: quitamos transition-all del contenedor principal */
            className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-8 flex flex-col justify-between hover:border-[var(--badge-text)] shadow-sm hover:shadow-md will-change-transform"
          >
            <div>
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-2xl font-bold text-[var(--text-main)]">
                  {project.title}
                </h3>
                {project.featured && (
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 bg-[#D03B13] text-white rounded-md shadow-xs">
                    Destacado
                  </span>
                )}
              </div>

              <p className="text-[var(--text-muted)] text-sm md:text-base mb-6 leading-relaxed font-normal">
                {project.description}
              </p>
            </div>

            <div>
              <div className="flex flex-wrap gap-2.5 mb-6">
                {project.tags.map((tag, idx) => (
                  <span 
                    key={idx} 
                    className="inline-flex items-center text-xs font-semibold px-3 py-1.5 bg-[var(--badge-bg)] text-[var(--badge-text)] rounded-lg border border-[var(--badge-border)]"
                  >
                    <img 
                      src={getTagIconUrl(tag)} 
                      alt={tag} 
                      className="w-3.5 h-3.5 mr-1.5 object-contain" 
                    />
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-5 pt-4 border-t border-[var(--border-color)]">
                {project.githubUrl && (
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm font-bold text-[var(--text-main)] hover:text-[#D03B13] transition-colors duration-200"
                  >
                    GitHub →
                  </a>
                )}
                
                {project.demoUrl && (
                  <a 
                    href={project.demoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm font-bold text-[var(--badge-text)] hover:underline"
                  >
                    Demo En Vivo ↗
                  </a>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}