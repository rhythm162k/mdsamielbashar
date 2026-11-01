import Preloader from './components/layout/Preloader';
import Nav from './components/layout/Nav';
import Hero from './components/sections/Hero/Hero';
import Ticker from './components/ui/Ticker';
import Statement from './components/sections/Statement/Statement';
import Work from './components/sections/Work/Work';
import About from './components/sections/About/About';
import Skills from './components/sections/Skills/Skills';
import Resume from './components/sections/Resume/Resume';
import Contact from './components/sections/Contact/Contact';

// The whole page, top to bottom. Reorder or remove a line to change the page.
export default function App() {
  return (
    <>
      <Preloader />
      <Nav />
      <main>
        <Hero />
        <Ticker />
        <Statement />
        <Work />
        <About />
        <Skills />
        <Resume />
      </main>
      <Contact />
    </>
  );
}
