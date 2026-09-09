import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutMe from './components/AboutMe';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';
import Certificates from './components/Certificates';

export default function App() {
  return (
    <div className="bg-[var(--bg-main)] text-[var(--text-main)] min-h-screen font-sans transition-colors duration-300 relative overflow-x-hidden">
      
      {/* CAPA DE LUCES AMBIENTALES CONTINUAS */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Luz Naranja / Roja a la izquierda recorriendo toda la pantalla */}
        <div className="absolute top-[10vh] -left-[15vw] w-[60vw] h-[90vh] max-w-[850px] bg-[#D03B13]/20 dark:bg-[#D03B13]/30 rounded-full blur-[150px]" />

        {/* Luz Cian / Azul a la derecha recorriendo toda la pantalla */}
        <div className="absolute top-[10vh] -right-[15vw] w-[60vw] h-[90vh] max-w-[850px] bg-cyan-500/18 dark:bg-cyan-500/25 rounded-full blur-[150px]" />
      </div>

      <Navbar />

      <main className="relative z-10">
        <Hero />
        <AboutMe />
        <Projects />
        <About />
        <Certificates />
        <Contact />
      </main>
    </div>
  );
}