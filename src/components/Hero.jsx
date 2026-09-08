import { personalInfo } from '../data/portfolioData';

export default function Hero() {
  return (
    <section className="min-h-[85vh] flex flex-col justify-center items-center text-center px-6 bg-[var(--bg-main)] text-[var(--text-main)] transition-colors duration-300">
      {/* Insignia / Badge */}
      <span className="text-xs font-semibold tracking-wider uppercase px-3.5 py-1 rounded-full bg-[#2BCFCE]/10 text-[#00A3A2] dark:text-[#2BCFCE] border border-[#2BCFCE]/30 mb-4 inline-block">
        ¡Bienvenido a mi portafolio!
      </span>

      {/* Nombre principal */}
      <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight text-[var(--text-main)]">
        {personalInfo.name}
      </h1>

      {/* Subtítulo / Rol */}
      <p className="text-lg md:text-2xl text-[var(--text-muted)] max-w-2xl mb-8 font-medium">
        {personalInfo.role}
      </p>

      {/* Botones de Acción */}
      <div className="flex flex-wrap gap-4 justify-center">
        <a 
          href="#projects" 
          className="px-6 py-3 bg-[#EC4D25] hover:bg-[#d43d17] text-white rounded-lg font-semibold shadow-md transition-all duration-200"
        >
          Ver Proyectos
        </a>
        <a 
          href="#contact" 
          className="px-6 py-3 border border-[var(--border-color)] text-[var(--text-main)] hover:bg-[#2BCFCE]/10 rounded-lg font-semibold transition-all duration-200"
        >
          Contacto
        </a>
      </div>
    </section>
  );
}