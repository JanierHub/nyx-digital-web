import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../components/AuthProvider";

function Hero() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const { theme } = useAuthContext();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Colores dinámicos según el tema
  const getTitleColors = () => {
    if (theme === 'light') {
      return {
        color: "#2c3e50",
        fontWeight: "700",
        textShadow: "none",
        filter: "none"
      };
    }
    return {
      color: "#CCD6F6",
      fontWeight: "700",
      textShadow: "none",
      filter: "none"
    };
  };

  const getHighlightColors = () => {
    if (theme === 'light') {
      return {
        color: "#e74c3c",
        fontWeight: "800",
        position: "relative",
        textShadow: "0 2px 4px rgba(0,0,0,0.2)",
        filter: "none"
      };
    }
    return {
      color: "#64FFDA",
      fontWeight: "800",
      position: "relative",
      textShadow: "0 2px 4px rgba(0,0,0,0.3)",
      filter: "none"
    };
  };

  const getTextColors = () => {
    if (theme === 'light') {
      return {
        marginTop: "25px",
        fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
        color: "#000000",
        maxWidth: "600px",
        lineHeight: "1.7"
      };
    }
    return {
      marginTop: "25px",
      fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
      color: "#8892B0",
      maxWidth: "600px",
      lineHeight: "1.7"
    };
  };

  return (
    <section style={section}>
      <div style={container} className="hero-container">
        {/* TEXTO */}
        <div style={isVisible ? {...textContent, ...textContentVisible} : textContent} className="slide-in-left">
          <h1 style={{
            fontSize: "clamp(2rem, 5vw, 3.2rem)",
            fontWeight: "700",
            lineHeight: "1.2",
            marginBottom: "20px",
            ...getTitleColors()
          }}>
            Impulsa tu negocio en el <span style={getHighlightColors()}>mundo digital</span> y destaca frente a tu competencia.
          </h1>

          <p style={getTextColors()}>
            Desarrollo páginas web modernas, optimizadas y orientadas a resultados,
            diseñadas para atraer clientes y potenciar tu crecimiento.
          </p>

          <div style={buttons} className="hero-buttons">
            <button 
              onClick={() => navigate("/trabajemos")}
              style={primaryBtn}
              className="pulse"
            >
              🚀 Trabajemos juntos
            </button>

            <button 
              style={secondaryBtn}
              onClick={() => {
                const serviciosSection = document.getElementById("servicios");
                if (serviciosSection) {
                  serviciosSection.scrollIntoView({ behavior: "smooth", block: "start" });
                } else {
                  // Si no encuentra la sección, navega a la página de servicios
                  navigate("/servicios");
                }
              }}
            >
              Ver servicios
            </button>
          </div>
        </div>

        {/* IMAGEN */}
        <div style={isVisible ? {...imageContent, ...imageContentVisible} : imageContent} className="slide-in-right">
          <div style={imageWrapper}>
            <img
              src="https://images.unsplash.com/photo-1555066931-4365d14bab8c"
              style={img}
              alt="Desarrollo web digital"
            />
            <div style={imageOverlay}></div>
          </div>
        </div>
      </div>
    </section>
  );
}

const section = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  position: "relative",
  overflow: "hidden"
};

const textContent = {
  flex: 1,
  opacity: 0,
  transform: "translateX(-50px)",
  transition: "all 0.8s ease-out"
};

const textContentVisible = {
  opacity: 1,
  transform: "translateX(0)"
};

const imageContent = {
  flex: 1,
  opacity: 0,
  transform: "translateX(50px)",
  transition: "all 0.8s ease-out 0.2s"
};

const imageContentVisible = {
  opacity: 1,
  transform: "translateX(0)"
};

const imageWrapper = {
  position: "relative",
  borderRadius: "15px",
  overflow: "hidden"
};

const imageOverlay = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "linear-gradient(135deg, rgba(100,255,218,0.1), rgba(0,229,255,0.1))",
  borderRadius: "15px"
};

const container = {
  maxWidth: "1200px",
  margin: "0 auto",
  display: "flex",
  gap: "60px",
  padding: "0 40px",
  alignItems: "center"
};

const title = {
  fontSize: "clamp(2rem, 5vw, 3.2rem)",
  fontWeight: "700",
  lineHeight: "1.2",
  marginBottom: "20px",
  background: "linear-gradient(135deg, #CCD6F6, #64FFDA)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text"
};

const highlight = {
  color: "#64FFDA",
  fontWeight: "800",
  position: "relative",
  textShadow: "0 2px 4px rgba(0,0,0,0.3)",
  filter: "none"
};

const text = {
  marginTop: "25px",
  fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
  color: "#8892B0",
  maxWidth: "600px",
  lineHeight: "1.7"
};

const buttons = {
  marginTop: "40px",
  display: "flex",
  gap: "20px",
  flexWrap: "wrap"
};

const primaryBtn = {
  background: "linear-gradient(135deg, #64FFDA, #00E5FF)",
  color: "#0A192F",
  border: "none",
  padding: "18px 36px",
  borderRadius: "14px",
  fontSize: "clamp(14px, 2vw, 16px)",
  fontWeight: "600",
  cursor: "pointer",
  boxShadow: "0 10px 30px rgba(100,255,218,0.3)",
  transition: "all 0.3s ease",
  position: "relative",
  overflow: "hidden"
};

const secondaryBtn = {
  background: "transparent",
  border: "2px solid #64FFDA",
  color: "#64FFDA",
  padding: "18px 36px",
  borderRadius: "14px",
  fontSize: "clamp(14px, 2vw, 16px)",
  cursor: "pointer",
  transition: "all 0.3s ease",
  fontWeight: "500"
};

const img = {
  width: "100%",
  height: "auto",
  borderRadius: "15px",
  boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
  transition: "transform 0.3s ease"
};

const imgHover = {
  transform: "scale(1.02)"
};

export default Hero;