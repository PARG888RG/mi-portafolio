import { motion } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';

export default function Contact() {
  const userEmail = personalInfo.email || "tu-correo@ejemplo.com";
  const githubUser = personalInfo.githubUser || "tu-usuario";

  return (
    <section id="contact" className="py-24 px-6 max-w-5xl mx-auto border-t border-[var(--border-color)]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mb-12"
      >
        <span className="text-xs font-bold tracking-wider uppercase px-4 py-1.5 rounded-full bg-[var(--badge-bg)] text-[var(--badge-text)] border border-[var(--badge-border)] mb-4 inline-block">
          Contacto
        </span>
        <h2 className="text-3xl md:text-5xl font-black text-[var(--text-main)]">
          ¿Tienes un proyecto en mente?
        </h2>
      </motion.div>

      {/* Grid a 2 columnas con glass-card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Columna Correo */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
          whileHover={{ y: -4 }}
          className="glass-card rounded-2xl p-6 flex items-center justify-between hover:border-[var(--badge-border)] will-change-transform"
        >
          <div className="pr-4">
            <span className="text-xs font-bold uppercase text-[var(--badge-text)] tracking-wider">Correo Electrónico</span>
            <p className="text-lg font-extrabold text-[var(--text-main)] mt-1 break-all">
              {userEmail}
            </p>
            <p className="text-xs text-[var(--text-muted)] mt-1">Escríbeme para colaborar o hacer consultas.</p>
          </div>

          <a 
            href={`mailto:${userEmail}`}
            title="Enviar Correo"
            className="w-14 h-14 rounded-full bg-[#D03B13] hover:bg-[#b0300e] text-white flex items-center justify-center shrink-0 shadow-md transition-transform duration-200 hover:scale-105"
          >
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
          </a>
        </motion.div>

        {/* Columna GitHub */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
          whileHover={{ y: -4 }}
          className="glass-card rounded-2xl p-6 flex items-center justify-between hover:border-[var(--badge-border)] will-change-transform"
        >
          <div className="pr-4">
            <span className="text-xs font-bold uppercase text-[var(--badge-text)] tracking-wider">GitHub</span>
            <p className="text-lg font-extrabold text-[var(--text-main)] mt-1">
              @{githubUser}
            </p>
            <p className="text-xs text-[var(--text-muted)] mt-1">Revisa mis repositorios y código fuente.</p>
          </div>

          <a 
            href={`https://github.com/${githubUser}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Ver Perfil de GitHub"
            className="w-14 h-14 rounded-full bg-[var(--bg-main)] border border-[var(--border-color)] hover:border-[#D03B13] flex items-center justify-center shrink-0 shadow-xs transition-transform duration-200 hover:scale-105 group text-[var(--text-main)]"
          >
            <svg 
              className="w-6 h-6 fill-current group-hover:scale-110 transition-transform" 
              viewBox="0 0 24 24"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
          </a>
        </motion.div>

      </div>

      <footer className="mt-20 pt-8 border-t border-[var(--border-color)] text-center text-xs text-[var(--text-muted)] font-medium">
        © {new Date().getFullYear()} {personalInfo.name}. Desarrollado con React & Tailwind CSS.
      </footer>
    </section>
  );
}