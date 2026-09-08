import { personalInfo } from '../data/portfolioData';

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-6 max-w-4xl mx-auto text-center border-t border-[var(--border-color)]">
      <span className="text-xs font-bold tracking-wider uppercase px-3.5 py-1.5 rounded-full bg-[var(--badge-bg)] text-[var(--badge-text)] border border-[var(--badge-border)] mb-4 inline-block">
        Contacto
      </span>
      
      <h2 className="text-3xl md:text-5xl font-black text-[var(--text-main)] mb-4">
        ¿Tienes un proyecto en mente?
      </h2>
      
      <p className="text-[var(--text-muted)] text-base md:text-lg max-w-xl mx-auto mb-8 font-normal">
        Estoy disponible para colaboraciones, desarrollo web o consultas sobre diseño UX y frontend.
      </p>

      <div className="flex flex-wrap justify-center gap-4 mb-16">
        <a 
          href="mailto:tuemail@ejemplo.com" 
          className="px-8 py-3.5 bg-[#D03B13] hover:bg-[#b0300e] text-white rounded-xl font-bold shadow-sm transition-all duration-200"
        >
          Enviar Correo Directo
        </a>
        <a 
          href="https://github.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="px-8 py-3.5 border border-[var(--border-color)] text-[var(--text-main)] hover:border-[var(--badge-text)] bg-[var(--bg-card)] rounded-xl font-bold transition-all duration-200"
        >
          GitHub ↗
        </a>
      </div>

      {/* Footer integrado */}
      <footer className="pt-8 border-t border-[var(--border-color)] text-xs text-[var(--text-muted)] font-medium">
        © {new Date().getFullYear()} {personalInfo.name}. Desarrollado con React & Tailwind CSS.
      </footer>
    </section>
  );
}