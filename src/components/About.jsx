import { motion } from 'framer-motion';
import { personalInfo, skillsData } from '../data/portfolioData';

const getIconUrl = (skillName) => {
  // Mapa de slugs y colores hexadecimales (sin el #)
  const map = {
    // Infraestructura & Seguridad
    "Linux / Bash": { slug: "linux", color: "FCC624" },
    "Git / Github": { slug: "github", color: "FFFFFF" }, // Forzado a Blanco
    "Git / GitHub": { slug: "github", color: "FFFFFF" },
    "Redes": { slug: "cisco", color: "1BA0D7" },
    "Redes & DNS": { slug: "cisco", color: "1BA0D7" },
    "WebSec": { slug: "owasp", color: "FFFFFF" },      // OWASP en blanco
    "Ethical Hacking": { slug: "kalilinux", color: "557CDA" },
    "AppSec": { slug: "snyk", color: "4C1D95" },

    // Backend & Cloud
    "Node.js": { slug: "nodedotjs", color: "5FA04E" },
    "MySQL": { slug: "mysql", color: "00758F" },       // Usamos el azul/turquesa brillante de MySQL
    "Firebase": { slug: "firebase", color: "FFCA28" },
    "Python": { slug: "python", color: "3776AB" },
    "MongoDB": { slug: "mongodb", color: "47A248" },
    "Google Cloud": { slug: "googlecloud", color: "4285F4" },
    "n8n": { slug: "n8n", color: "FF6584" },

    // Desarrollo & Lenguajes
    "JavaScript": { slug: "javascript", color: "F7DF1E" },
    "C#": { slug: "csharp", color: "512BD4" },
    "Java": { slug: "oracle", color: "F80000" },       // Cambiado a Oracle / Java Rojo
    "React": { slug: "react", color: "61DAFB" },
    "HTML5 / CSS3": { slug: "html5", color: "E34F26" },

    // Diseño & UX
    "Figma": { slug: "figma", color: "F24E1E" },
    "UI/UX Design": { slug: "materialdesign", color: "757575" },
    "Design Systems": { slug: "storybook", color: "FF4785" }
  };

  const item = map[skillName];

  if (item) {
    return `https://cdn.simpleicons.org/${item.slug}/${item.color}`;
  }

  // Fallback con filtro blanco para cualquier otra herramienta no mapeada
  const cleanSlug = skillName.toLowerCase().replace(/[^a-z0-9]/g, '');
  return `https://cdn.simpleicons.org/${cleanSlug}/FFFFFF`;
};

export default function About() {
  return (
    <section id="about" className="relative py-24 px-6 max-w-6xl mx-auto overflow-hidden">
     

      {/* Encabezado */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative z-10 mb-16 text-center"
      >
        <span className="text-xs font-bold tracking-wider uppercase px-4 py-1.5 rounded-full bg-[var(--badge-bg)] text-[var(--badge-text)] border border-[var(--badge-border)] mb-4 inline-block">
          Sobre Mí
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--text-main)] mb-4">
          Mi stack
        </h2>
        <p className="text-[var(--text-muted)] max-w-2xl mx-auto text-base md:text-lg font-normal leading-relaxed">
          {personalInfo.about}
        </p>
      </motion.div>

      {/* Grid de habilidades */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        {skillsData.map((group, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
              duration: 0.7, 
              delay: index * 0.1,
              ease: [0.25, 1, 0.5, 1] 
            }}
            className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-8 shadow-sm hover:border-[var(--badge-border)] transition-colors will-change-transform"
          >
            <h3 className="text-xl font-bold text-[var(--text-main)] mb-6 border-b border-[var(--border-color)] pb-3 flex items-center justify-between">
              {group.category}
              <span className="text-xs font-semibold text-[var(--text-muted)]">
                {group.skills.length} herramientas
              </span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {group.skills.map((skill, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="flex items-center p-3.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] hover:border-[#D03B13] transition-all group"
                >
                  {/*
                    Usamos bg-white/10 o bg-gray-900/60 para dar soporte dinámico
                    a iconos claros y oscuros por igual
                  */}
                  <div className="w-10 h-10 rounded-lg bg-gray-800/80 dark:bg-gray-900/90 flex items-center justify-center mr-3.5 border border-[var(--border-color)] shadow-xs shrink-0 p-2">
                    <img 
                      src={getIconUrl(skill)} 
                      alt={skill} 
                      className="w-full h-full object-contain filter drop-shadow-xs"
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23D03B13'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'/%3E%3C/svg%3E";
                      }}
                    />
                  </div>
                  <span className="text-sm font-bold text-[var(--text-main)] truncate">
                    {skill}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}