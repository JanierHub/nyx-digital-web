import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../components/AuthProvider";

function AboutPage() {
  const navigate = useNavigate();
  const { theme } = useAuthContext();

  // Colores dinámicos según el tema
  const getThemeColors = () => {
    if (theme === 'light') {
      return {
        background: '#ffffff',
        color: '#000000',
        cardBg: '#f8f9fa',
        borderColor: '#dee2e6',
        textSecondary: '#6c757d'
      };
    }
    return {
      background: 'linear-gradient(135deg, #112240, #0A192F)',
      color: '#CCD6F6',
      cardBg: 'rgba(10,25,47,0.9)',
      borderColor: 'rgba(100,255,218,0.2)',
      textSecondary: '#8892B0'
    };
  };

  return (
    <div style={{...container, background: getThemeColors().background, color: getThemeColors().color}}>

      {/* HERO */}
      <section style={hero}>
        <h1 style={title}>Sobre Nyx Digital</h1>
        <p style={subtitle}>
          Soluciones digitales enfocadas en resultados reales.
        </p>
      </section>

      {/* PRESENTACIÓN CON FOTO */}
      <section style={section}>

        <div style={profileContainer}>

          {/* FOTO (placeholder) */}
          <img
            src="https://images.unsplash.com/photo-1607746882042-944635dfe10e"
            style={profileImg}
          />

          <div style={profileText}>

            <h2>¿Quién está detrás?</h2>

            <p style={{color: theme === 'light' ? '#000000' : '#8892B0', marginTop: "15px"}}>
              Soy Janier Farid Quiñones, desarrollador web enfocado en crear soluciones digitales modernas, funcionales y orientadas al crecimiento de cada negocio.
            </p>

            <p style={{color: theme === 'light' ? '#000000' : '#8892B0', marginTop: "15px"}}>
              Mi objetivo es ayudarte a construir una presencia digital sólida que realmente genere resultados y haga crecer tu negocio.
            </p>

          </div>

        </div>

      </section>

      {/* PROPUESTA DE VALOR */}
      <section style={sectionAlt}>

        <h2>¿Qué obtienes al trabajar conmigo?</h2>

        <div style={grid}>

          <div style={{
            background: theme === 'light' ? '#f8f9fa' : "rgba(10,25,47,0.9)",
            padding: "20px",
            borderRadius: "12px",
            width: "250px",
            border: theme === 'light' ? '1px solid #dee2e6' : "1px solid rgba(100,255,218,0.2)",
            textAlign: "center",
            color: theme === 'light' ? '#000000' : '#CCD6F6'
          }}>
            <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71" style={img}/>
            <h3>Resultados reales</h3>
            <p>Tu web no es solo diseño, es una herramienta para crecer.</p>
          </div>

          <div style={{
            background: theme === 'light' ? '#f8f9fa' : "rgba(10,25,47,0.9)",
            padding: "20px",
            borderRadius: "12px",
            width: "250px",
            border: theme === 'light' ? '1px solid #dee2e6' : "1px solid rgba(100,255,218,0.2)",
            textAlign: "center",
            color: theme === 'light' ? '#000000' : '#CCD6F6'
          }}>
            <img src="https://images.unsplash.com/photo-1559027615-cd4628902d4a" style={img}/>
            <h3>Diseño personalizado</h3>
            <p>Cada proyecto es único y adaptado a tu negocio.</p>
          </div>

          <div style={{
            background: theme === 'light' ? '#f8f9fa' : "rgba(10,25,47,0.9)",
            padding: "20px",
            borderRadius: "12px",
            width: "250px",
            border: theme === 'light' ? '1px solid #dee2e6' : "1px solid rgba(100,255,218,0.2)",
            textAlign: "center",
            color: theme === 'light' ? '#000000' : '#CCD6F6'
          }}>
            <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d" style={img}/>
            <h3>Acompañamiento</h3>
            <p>Te acompaño durante todo el proceso.</p>
          </div>

        </div>

      </section>

      {/* POR QUÉ ELEGIRME */}
      <section style={section}>

        <h2>¿Por qué elegir Nyx Digital?</h2>

        <div style={grid}>

          <div style={card}>
            <img src="https://images.unsplash.com/photo-1553877522-43269d4ea984" style={img}/>
            <p>✔ Comunicación clara y directa</p>
          </div>

          <div style={card}>
            <img src="https://images.unsplash.com/photo-1518770660439-4636190af475" style={img}/>
            <p>✔ Desarrollo enfocado en calidad</p>
          </div>

          <div style={card}>
            <img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d" style={img}/>
            <p>✔ Pensado para crecimiento real</p>
          </div>

        </div>

      </section>

      {/* CTA */}
      <section style={ctaSection}>

        <h2>¿Listo para llevar tu negocio al siguiente nivel?</h2>

        <button onClick={() => navigate("/trabajemos")} style={cta}>
          Trabajemos juntos
        </button>

      </section>

    </div>
  );
}

//////////////////////////////////////////////////////////////////
// 🎨 ESTILOS
//////////////////////////////////////////////////////////////////

const container = {
  width: "100%",
  color: "white"
};

const hero = {
  padding: "120px 40px",
  textAlign: "center",
  background: "#0A192F"
};

const title = {
  fontSize: "3rem"
};

const subtitle = {
  marginTop: "10px",
  color: "#8892B0"
};

const section = {
  padding: "100px 40px"
};

const sectionAlt = {
  padding: "100px 40px",
  background: "#112240",
  textAlign: "center"
};

const profileContainer = {
  display: "flex",
  gap: "40px",
  alignItems: "center",
  justifyContent: "center",
  flexWrap: "wrap"
};

const profileImg = {
  width: "250px",
  height: "250px",
  borderRadius: "20px",
  objectFit: "cover"
};

const profileText = {
  maxWidth: "500px"
};

const text = {
  color: "#8892B0",
  marginTop: "15px"
};

const grid = {
  display: "flex",
  justifyContent: "center",
  gap: "30px",
  flexWrap: "wrap",
  marginTop: "40px"
};

const card = {
  background: "rgba(10,25,47,0.9)",
  padding: "20px",
  borderRadius: "12px",
  width: "250px",
  border: "1px solid rgba(100,255,218,0.2)",
  textAlign: "center",
  color: "#CCD6F6"
};

const img = {
  width: "100%",
  height: "140px",
  objectFit: "cover",
  borderRadius: "10px",
  marginBottom: "10px"
};

const ctaSection = {
  padding: "100px 40px",
  textAlign: "center"
};

const cta = {
  marginTop: "20px",
  padding: "15px 30px",
  background: "#64FFDA",
  color: "#0A192F",
  border: "none",
  borderRadius: "10px",
  fontWeight: "bold",
  cursor: "pointer"
};

export default AboutPage;