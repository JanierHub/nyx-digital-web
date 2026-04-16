import Hero from "../components/Hero";
import Services from "../components/Services";
import Projects from "../components/Projects";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import SEO from "../components/SEO";

function Home() {
  return (
    <>
      <SEO
        title="Nyx Digital - Desarrollo Web y Soluciones Digitales"
        description="Agencia digital especializada en desarrollo web, aplicaciones móviles y diseño UI/UX. Transformamos tus ideas en realidad con tecnología de vanguardia."
        keywords="desarrollo web, aplicaciones móviles, diseño UI/UX, agencia digital, React, Node.js, SEO, marketing digital"
        image="/og-home.jpg"
        url="/"
      />
      <Hero />
      <Services />
      <Projects />
      <Testimonials />
      <Footer />
    </>
  );
}

export default Home;