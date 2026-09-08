import { projectsData } from '../data/portfolioData';

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-6 max-w-6xl mx-auto">
      <div className="mb-12 text-center">
        <span className="text-xs font-bold tracking-wider uppercase px-3.5 py-1.5 rounded-full bg-[var(--badge-bg)] text-[var(--badge-text)] border border-[var(--badge-border)] mb-3 inline-block">
          Mi Trabajo
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--text-main)] mb-4">
          Proyectos Destacados
        </h2>
        <p className="text-[var(--text-muted)] max-w-xl mx-auto text-base font-medium">
          Una selección de herramientas y plataformas en las que he aplicado buenas prácticas de desarrollo web y arquitectura.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projectsData.map((project) => (
          <article 
            key={project.id} 
            className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-7 flex flex-col justify-between hover:border-[var(--badge-text)] transition-all shadow-sm hover:shadow-md"
          >
            <div>
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-[var(--text-main)]">
                  {project.title}
                </h3>
                {project.featured && (
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 bg-[#D03B13] text-white rounded-md shadow-sm">
                    Destacado
                  </span>
                )}
              </div>

              <p className="text-[var(--text-muted)] text-sm mb-6 leading-relaxed font-normal">
                {project.description}
              </p>
            </div>

            <div>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="text-xs font-semibold px-3 py-1 bg-[var(--badge-bg)] text-[var(--badge-text)] rounded-md border border-[var(--badge-border)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-[var(--border-color)]">
                {project.githubUrl && (
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm font-bold text-[var(--text-main)] hover:text-[#D03B13] transition-colors"
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
          </article>
        ))}
      </div>
    </section>
  );
}