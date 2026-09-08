import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(() => {
    // Verificar si el usuario guardó una preferencia anteriormente
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    // Si no hay preferencia guardada, verificar el sistema
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2.5 rounded-full border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-main)] hover:border-[#2BCFCE] transition-all shadow-sm focus:outline-none"
      title={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      aria-label="Toggle Theme"
    >
      {darkMode ? (
        /* Icono de Sol (para cambiar a modo claro) */
        <svg className="w-5 h-5 text-[#2BCFCE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        /* Icono de Luna (para cambiar a modo oscuro) */
        <svg className="w-5 h-5 text-[#5F6368]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  );
}