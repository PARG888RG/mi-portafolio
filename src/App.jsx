import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import ThemeToggle from './components/themeToggle';

export default function App() {
  return (
    <div className="bg-[var(--bg-main)] text-[var(--text-main)] min-h-screen font-sans transition-colors duration-300 relative">
      <header className="fixed top-4 right-6 z-50">
        <ThemeToggle />
      </header>

      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}