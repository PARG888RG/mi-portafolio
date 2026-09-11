import { motion } from 'framer-motion';
import heroAvatar from '../assets/hero-avatar.webp';
import { personalInfo } from '../data/portfolioData';

export default function Hero() {
  const { github, email, linkedin } = personalInfo;

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 py-12 bg-transparent">
      
      <div className="max-w-6xl w-full min-h-[85vh] relative flex flex-col lg:flex-row items-center justify-between z-10">
        
        {/* LADO IZQUIERDO: Designer */}
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="static lg:absolute lg:left-0 lg:top-1/2 lg:-translate-y-1/2 z-20 max-w-sm w-full text-center lg:text-left mt-6 lg:mt-0 pointer-events-auto"
        >
          <span className="text-xs font-mono font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-full bg-[var(--badge-bg)] text-[var(--badge-text)] border border-[var(--badge-border)] mb-3 inline-block">
            UX/UI & Front-end
          </span>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-[6.75rem] font-black text-[var(--text-main)] tracking-tight leading-none">
            designer<span className="text-[#D03B13]">.</span>
          </h1>
          
          <p className="text-[var(--text-muted)] text-sm font-normal leading-relaxed mt-4 mb-5">
            Diseño interfaces y experiencias digitales en Figma, combinando UI/UX con desarrollo Front-End.
          </p>

          <div className="flex flex-col gap-4 items-center lg:items-start">
            <a 
              href="#projects"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D03B13] hover:text-[#e5481d] transition-colors group"
            >
              <span>Explorar Proyectos</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>

            <div className="flex flex-col gap-3 items-center lg:items-start mt-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[var(--cyan-link)]">
                Iniciar Contacto
              </span>

              <div className="flex items-center gap-3.5">
                {github && (
                  <a
                    href={github} 
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="w-12 h-12 rounded-full glass-card text-[var(--text-main)] flex items-center justify-center hover:border-[#D03B13] hover:text-[#D03B13] hover:scale-105 transition-all duration-300 active:scale-95"
                  >
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                  </a>
                )}

                {email && (
                  <a
                    href={`mailto:${email}`}
                    aria-label="Correo electrónico"
                    className="w-12 h-12 rounded-full glass-card text-[var(--text-main)] flex items-center justify-center hover:border-[#D03B13] hover:text-[#D03B13] hover:scale-105 transition-all duration-300 active:scale-95"
                  >
                    <svg className="w-6 h-6 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </a>
                )}

                {linkedin && (
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="w-12 h-12 rounded-full glass-card text-[var(--text-main)] flex items-center justify-center hover:border-[#D03B13] hover:text-[#D03B13] hover:scale-105 transition-all duration-300 active:scale-95"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* CENTRO: Foto principal */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 h-[70vh] sm:h-[82vh] lg:h-[90vh] flex items-end justify-center shrink-0 pointer-events-none mx-auto w-full max-w-md"
          style={{
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 95%)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 95%)'
          }}
        >
          <img 
            src={heroAvatar} 
            alt="Pablo Rodas" 
            className="h-full w-auto object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_20px_40px_rgba(0,0,0,0.7)] select-none"
          />
        </motion.div>

        {/* LADO DERECHO: Coder */}
        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="static lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 z-20 max-w-sm w-full text-center lg:text-right mt-6 lg:mt-0 pointer-events-auto"
        >
          <span className="text-xs font-mono font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-full bg-[var(--badge-bg)] text-[var(--badge-text)] border border-[var(--badge-border)] mb-3 inline-block">
            &lt;Back-end & Hacker/&gt;
          </span>

          <h2 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-mono font-extrabold text-[var(--text-main)] tracking-tighter leading-none">
            &lt;dev/&gt;
          </h2>

          <p className="text-[var(--text-muted)] text-sm font-normal leading-relaxed mt-5 mb-5">
            Desarrollo aplicaciones Back-End, APIs y sistemas de autenticación con enfoque en seguridad.
          </p>

          {/* Ventana Estilo Terminal adaptable */}
          <div className="glass-card rounded-xl p-4 text-left font-mono text-xs max-w-xs mx-auto lg:ml-auto">
            <div className="flex gap-1.5 mb-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block"></span>
            </div>
            <p className="text-[var(--cyan-link)] font-bold">$ <span className="text-[var(--text-main)]">stack</span> --security</p>
            <p className="text-[var(--text-muted)] mt-1">&gt; ["Python", "Linux", "NetSec", "WebSec"]</p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}