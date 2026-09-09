import { motion } from 'framer-motion';

export default function AboutMe() {
  const highlights = [
    {
      title: "Diseño UI/UX",
      desc: "Investigación, prototipado y diseño de interfaces enfocadas en crear experiencias claras, intuitivas y fáciles de utilizar.",
      icon: (
        <svg className="w-6 h-6 stroke-[#D03B13]" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="9" y1="21" x2="9" />
        </svg>
      )
    },
    {
      title: "Desarrollo Web",
      desc: "Desarrollo de interfaces web utilizando JavaScript y React, con atención al rendimiento, accesibilidad y experiencia de usuario.",
      icon: (
        <svg className="w-6 h-6 stroke-[var(--cyan-link)]" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      )
    },
    {
      title: "Backend y Seguridad",
      desc: "Desarrollo de lógica de servidor, autenticación y gestión de datos, aplicando buenas prácticas para construir aplicaciones seguras y mantenibles.",
      icon: (
        <svg className="w-6 h-6 stroke-[#D03B13]" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      )
    }
  ];

  return (
    <section id="about-me" className="relative py-18 px-6 max-w-6xl mx-auto">
      
      {/* Encabezado */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mb-16 text-center"
      >
        <span className="text-xs font-bold tracking-wider uppercase px-4 py-1.5 rounded-full bg-[var(--badge-bg)] text-[var(--badge-text)] border border-[var(--badge-border)] mb-3 inline-block shadow-xs backdrop-blur-md">
          Conóceme
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--text-main)] mb-4">
          ¿Quién soy yo?
        </h2>
        <p className="text-[var(--text-muted)] max-w-2xl mx-auto text-base font-normal leading-relaxed">
          Estudiante de tecnología y desarrollador web interesado en convertir ideas en productos digitales funcionales, intuitivos y bien construidos.
        </p>
      </motion.div>

      {/* Tarjetas integradas con la clase global glass-card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Texto Biográfico */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 glass-card glass-card-hover rounded-2xl p-8 flex flex-col justify-between h-full"
        >
          <div>
            <h3 className="text-2xl font-bold text-[var(--text-main)] mb-4">
              Transformo ideas en soluciones digitales funcionales.
            </h3>
            <p className="text-[var(--text-muted)] text-sm md:text-base leading-relaxed mb-4">
              Mi interés por la tecnología nació de la curiosidad por entender cómo funcionan las cosas y evolucionó hacia el desarrollo de proyectos donde programación, diseño y resolución de problemas trabajan juntos.
            </p>
            <p className="text-[var(--text-muted)] text-sm md:text-base leading-relaxed mb-6">
              Me gusta construir aplicaciones web que no solo funcionen, sino que sean claras, intuitivas y agradables de utilizar. He trabajado en proyectos que van desde interfaces y experiencias de usuario hasta sistemas con bases de datos, autenticación y lógica de backend.
            </p>
            <p className="text-[var(--text-muted)] text-sm md:text-base leading-relaxed mb-6">
              Actualmente trabajo en proyectos de desarrollo web, UI/UX y backend, mientras continúo profundizando en arquitectura de software y seguridad.
            </p>
          </div>

          <div className="pt-6 border-t border-[var(--border-color)] flex flex-wrap gap-4 items-center justify-between">
            <span className="text-xs font-mono font-bold text-[#D03B13] uppercase tracking-wider">
              Disponible para proyectos & colaboraciones
            </span>
            <a 
              href="#contact" 
              className="text-xs font-bold uppercase tracking-wider text-[var(--text-main)] hover:text-[#D03B13] transition-colors"
            >
              Hablemos →
            </a>
          </div>
        </motion.div>

        {/* Tarjetas de Pilares */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 flex flex-col gap-4"
        >
          {highlights.map((item, idx) => (
            <div 
              key={idx}
              className="glass-card glass-card-hover rounded-2xl p-6 flex items-start gap-4 group"
            >
              <span className="p-3 rounded-xl bg-[var(--badge-bg)] border border-[var(--badge-border)] shrink-0 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                {item.icon}
              </span>
              <div>
                <h4 className="text-lg font-bold text-[var(--text-main)] mb-1">
                  {item.title}
                </h4>
                <p className="text-[var(--text-muted)] text-xs md:text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}