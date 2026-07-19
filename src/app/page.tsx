import Hero from "@/components/sections/Hero";
import Work from "@/components/sections/Work";
import PersonalProjects from "@/components/sections/PersonalProjects";
import Path from "@/components/sections/Path";
import Certifications from "@/components/sections/Certifications";
import About from "@/components/sections/About";
import TechStack from "@/components/sections/TechStack";
import Services from "@/components/sections/Services";
import Contact from "@/components/sections/Contact";
import { showFreelance } from "@/lib/content";

/**
 * Editorial flow: cinematic hero → product work → personal builds → About →
 * stack → (optional Services) → career path → certifications → contact.
 * Product proof leads; CV-style Path/Certs close before the ask.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Work />
      <PersonalProjects />
      <About />
      <TechStack />
      {showFreelance && <Services />}
      <Path />
      <Certifications />
      <Contact />
    </>
  );
}
