import { motion } from 'framer-motion';

export default function AboutMe() {
  const highlights = [
    {
      title: "Diseño UI/UX",
      desc: "Investigación, prototipado y diseño de interfaces enfocadas en crear experiencias claras, intuitivas y fáciles de utilizar.",
      icon: "🎨"
    },
    {
      title: "Desarrollo Web",
      desc: "Desarrollo de interfaces web utilizando JavaScript y React, con atención al rendimiento, accesibilidad y experiencia de usuario.",
      icon: "⚡"
    },
    {
      title: "Backend y Seguridad",
      desc: "Desarrollo de lógica de servidor, autenticación y gestión de datos, aplicando buenas prácticas para construir aplicaciones seguras y mantenibles.",
      icon: "🛡️"
    }
  ];

  return (
    <section id="about-me" className="py-24 px-6 max-w-6xl mx-auto">
        {/* Fondo con efecto de luz alargada y transición estilizada entre secciones */}
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none overflow-hidden">
        
        {/* Óvalo vertical central (Luz principal de arriba a abajo) */}
        <div className="w-[380px] sm:w-[500px] h-[110%] bg-gradient-to-b from-[#D03B13]/25 via-[var(--badge-text)]/20 to-[#D03B13]/25 dark:from-[#D03B13]/30 dark:via-cyan-500/20 dark:to-[#D03B13]/30 rounded-[50%] blur-[100px] transform scale-y-110" />

        {/* Anillo de constricción / curva de reloj de arena en los extremos */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-transparent via-transparent to-[var(--bg-main)] opacity-80" />
        </div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mb-16 text-center"
      >
        <span className="text-xs font-bold tracking-wider uppercase px-4 py-1.5 rounded-full bg-[var(--badge-bg)] text-[var(--badge-text)] border border-[var(--badge-border)] mb-3 inline-block">
          Conóceme
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--text-main)] mb-4">
          ¿Quién soy yo?
        </h2>
        <p className="text-[var(--text-muted)] max-w-2xl mx-auto text-base font-normal leading-relaxed">
            Estudiante de tecnología y desarrollador web interesado en convertir ideas en productos digitales funcionales, intuitivos y bien construidos.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Texto Biográfico */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-8 shadow-sm flex flex-col justify-between h-full"
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

        {/* Tarjetas de Pilares/Aptitudes */}
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
              className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 hover:border-[var(--badge-text)] transition-colors duration-200 shadow-xs flex items-start gap-4"
            >
              <span className="text-2xl p-2.5 rounded-xl bg-[var(--badge-bg)] border border-[var(--badge-border)] shrink-0">
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