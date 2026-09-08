import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutMe from './components/AboutMe';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';

export default function App() {
  return (
    <div className="bg-[var(--bg-main)] text-[var(--text-main)] min-h-screen font-sans transition-colors duration-300 relative">
      <Navbar />

      <main>
        <Hero />
        <AboutMe />
        <Projects />
        <About />
        <Contact />
      </main>
    </div>
  );
}