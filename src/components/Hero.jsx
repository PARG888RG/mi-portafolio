import { motion } from 'framer-motion';
import heroAvatar from '../assets/hero-avatar.png';

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center justify-center px-6 py-12 overflow-hidden bg-[var(--bg-main)]">
      
      {/* Resplandores ambientales */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[550px] h-[550px] bg-[#D03B13]/10 dark:bg-[#D03B13]/15 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/3 -translate-y-1/2 w-[550px] h-[550px] bg-[var(--badge-text)]/10 dark:bg-cyan-500/15 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-6xl w-full min-h-[85vh] relative flex flex-col lg:flex-row items-center justify-between">
        
        {/* LADO IZQUIERDO: Designer */}
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="static lg:absolute lg:left-0 lg:top-1/2 lg:-translate-y-1/2 z-20 max-w-sm w-full text-center lg:text-left mt-6 lg:mt-0 pointer-events-auto"
        >
          <span className="text-xs font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-full bg-[#D03B13]/10 dark:bg-[#D03B13]/15 text-[#D03B13] border border-[#D03B13]/30 mb-3 inline-block">
            Creative & UX
          </span>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-[6.75rem] font-black text-[var(--text-main)] tracking-tight leading-none">
            designer<span className="text-[#D03B13]">.</span>
          </h1>
          
          <p className="text-[var(--text-muted)] text-sm font-normal leading-relaxed mt-4 mb-5">
            Interfaces intuitivas, prototipado en Figma y sistemas de diseño centrados en el usuario.
          </p>

          <div className="flex flex-col gap-2.5 items-center lg:items-start">
            <a 
              href="#projects"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D03B13] hover:text-[#e5481d] transition-colors group"
            >
              <span>Explorar Proyectos</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>

            {/* Iniciar Contacto con variable adaptable */}
            <a 
              href="#contact"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--cyan-link)] hover:opacity-80 transition-opacity group"
            >
              <span>Iniciar Contacto</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>
        </motion.div>

        {/* CENTRO: Foto principal */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 h-[65vh] sm:h-[80vh] lg:h-[88vh] flex items-end justify-center shrink-0 pointer-events-none mx-auto"
        >
          <img 
            src={heroAvatar} 
            alt="Pablo Rodas" 
            className="h-full w-auto object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_20px_40px_rgba(0,0,0,0.7)] select-none"
          />
        </motion.div>

        {/* LADO DERECHO: Coder */}
        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="static lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 z-20 max-w-sm w-full text-center lg:text-right mt-6 lg:mt-0 pointer-events-auto"
        >
          {/* Badge adaptable usando variables dinámicas de index.css */}
          <span 
            className="text-xs font-mono font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-full border mb-3 inline-block shadow-xs transition-colors"
            style={{
              backgroundColor: 'var(--badge-bg)',
              color: 'var(--badge-text)',
              borderColor: 'var(--badge-border)'
            }}
          >
            &lt;Front-End /&gt;
          </span>

          <h2 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-mono font-extrabold text-[var(--text-main)] tracking-tighter leading-none">
            &lt;coder&gt;
          </h2>

          <p className="text-[var(--text-muted)] text-sm font-normal leading-relaxed mt-5 mb-5">
            Código limpio, modular y eficiente en React, Tailwind CSS, JavaScript y la nube.
          </p>

          {/* Terminal Widget */}
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-3.5 text-left font-mono text-xs max-w-xs mx-auto lg:ml-auto shadow-md backdrop-blur-xs">
            <div className="flex gap-1.5 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block"></span>
            </div>
            <p className="text-[var(--cyan-link)] font-bold">$ <span className="text-[var(--text-main)]">stack</span> --primary</p>
            <p className="text-[var(--text-muted)] mt-1">&gt; ["React", "JavaScript", "Tailwind"]</p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}