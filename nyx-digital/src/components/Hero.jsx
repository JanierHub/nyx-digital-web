import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  return (
    <section style={section}>

      <div style={container}>

        {/* TEXTO */}
        <div style={{ flex: 1 }}>
          <h1 style={title}>
            Impulsa tu negocio en el mundo digital y destaca frente a tu competencia.
          </h1>

          <p style={text}>
            Desarrollo páginas web modernas, optimizadas y orientadas a resultados,
            diseñadas para atraer clientes y potenciar tu crecimiento.
          </p>

          <div style={buttons}>

            <button 
              onClick={() => navigate("/trabajemos")}
              style={primaryBtn}
            >
              🚀 Trabajemos juntos
            </button>

            <button 
  style={secondaryBtn}
  onClick={() => {
    document.getElementById("servicios").scrollIntoView({ behavior: "smooth" });
  }}
>
  Ver servicios
</button>

          </div>
        </div>

        {/* IMAGEN */}
        <div style={{ flex: 1 }}>
          <img
            src="https://images.unsplash.com/photo-1555066931-4365d14bab8c"
            style={img}
          />
        </div>

      </div>

    </section>
  );
}

const section = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center"
};

const container = {
  maxWidth: "1200px",
  margin: "0 auto",
  display: "flex",
  gap: "60px",
  padding: "0 40px"
};

const title = {
  fontSize: "3.2rem",
  fontWeight: "700",
  lineHeight: "1.2"
};

const text = {
  marginTop: "25px",
  fontSize: "1.2rem",
  color: "#8892B0",
  maxWidth: "600px"
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
  fontSize: "16px",
  fontWeight: "600",
  cursor: "pointer",
  boxShadow: "0 10px 30px rgba(100,255,218,0.3)"
};

const secondaryBtn = {
  background: "transparent",
  border: "1px solid #64FFDA",
  color: "#64FFDA",
  padding: "18px 36px",
  borderRadius: "14px",
  fontSize: "16px",
  cursor: "pointer"
};

const img = {
  width: "100%",
  borderRadius: "15px",
  boxShadow: "0 20px 40px rgba(0,0,0,0.6)"
};

export default Hero;