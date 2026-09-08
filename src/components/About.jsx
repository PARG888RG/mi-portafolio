import { motion } from 'framer-motion';
import { personalInfo, skillsData } from '../data/portfolioData';

// Mapeo preciso de íconos válidos en Simple Icons
const getIconUrl = (skillName) => {
  const map = {
    "React": "react",
    "JavaScript": "javascript",
    "HTML5": "html5",
    "CSS3 / Tailwind": "tailwindcss",
    "Figma": "figma",
    "Design Systems": "storybook",     /* Storybook es el estándar de Design Systems */
    "UI/UX Design": "materialdesign", /* Material Design */
    "Firebase": "firebase",
    "MongoDB": "mongodb",
    "MySQL": "mysql",
    "Git / GitHub": "github",
    "Google Cloud": "googlecloud",
    "n8n": "n8n"
  };
  const slug = map[skillName] || "codeberg";
  return `https://cdn.simpleicons.org/${slug}`;
};

export default function About() {
  return (
    <section id="about" className="py-24 px-6 max-w-6xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-16 text-center"
      >
        <span className="text-xs font-bold tracking-wider uppercase px-4 py-1.5 rounded-full bg-[var(--badge-bg)] text-[var(--badge-text)] border border-[var(--badge-border)] mb-4 inline-block">
          Sobre Mí
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--text-main)] mb-4">
          Perfil y Habilidades
        </h2>
        <p className="text-[var(--text-muted)] max-w-2xl mx-auto text-base md:text-lg font-normal leading-relaxed">
          {personalInfo.about}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
            className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-8 shadow-sm hover:border-[var(--badge-border)] will-change-transform"
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
                  <div className="w-10 h-10 rounded-lg bg-white dark:bg-gray-800 flex items-center justify-center mr-3.5 border border-[var(--border-color)] shadow-xs shrink-0">
                    <img 
                      src={getIconUrl(skill)} 
                      alt={skill} 
                      className="w-6 h-6 object-contain"
                      loading="lazy"
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