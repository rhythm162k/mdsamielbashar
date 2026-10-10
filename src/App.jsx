import Nav from "./components/layout/Nav";
import Hero from "./components/sections/Hero/Hero";
import Statement from "./components/sections/Statement/Statement";
import Work from "./components/sections/Work/Work";
import About from "./components/sections/About/About";
import Skills from "./components/sections/Skills/Skills";
import Contact from "./components/sections/Contact/Contact";
import Resume from "./components/sections/Resume/Resume";

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
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
