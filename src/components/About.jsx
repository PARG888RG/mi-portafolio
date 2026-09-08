import { personalInfo, skillsData } from '../data/portfolioData';

// Mapeo de slugs para Simple Icons (CDN SVG)
const getIconUrl = (skillName) => {
  const map = {
    "React": "react",
    "JavaScript": "javascript",
    "HTML5": "html5",
    "CSS3 / Tailwind": "tailwindcss",
    "Figma": "figma",
    "Design Systems": "adobexd",
    "UI/UX Design": "penpot",
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
    <section id="about" className="py-20 px-6 max-w-6xl mx-auto">
      {/* Encabezado */}
      <div className="mb-12 text-center">
        <span className="text-xs font-bold tracking-wider uppercase px-3.5 py-1.5 rounded-full bg-[var(--badge-bg)] text-[var(--badge-text)] border border-[var(--badge-border)] mb-3 inline-block">
          Sobre Mí
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--text-main)] mb-4">
          Perfil y Habilidades
        </h2>
        <p className="text-[var(--text-muted)] max-w-2xl mx-auto text-base font-normal leading-relaxed">
          {personalInfo.about}
        </p>
      </div>

      {/* Rejilla de Tecnologías con Logos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {skillsData.map((group, index) => (
          <div 
            key={index} 
            className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 shadow-sm hover:border-[var(--badge-border)] transition-all"
          >
            <h3 className="text-lg font-bold text-[var(--text-main)] mb-4 border-b border-[var(--border-color)] pb-2">
              {group.category}
            </h3>
            <ul className="space-y-3">
              {group.skills.map((skill, idx) => (
                <li key={idx} className="flex items-center text-sm font-semibold text-[var(--text-main)]">
                  <div className="w-6 h-6 p-1 rounded bg-gray-100 dark:bg-gray-800 flex items-center justify-center mr-3 border border-[var(--border-color)]">
                    <img 
                      src={getIconUrl(skill)} 
                      alt={skill} 
                      className="w-4 h-4 object-contain"
                      loading="lazy"
                    />
                  </div>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}