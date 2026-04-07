import { useState } from "react";

function Services() {
  const [active, setActive] = useState(null);

  const data = [
    {
      id: 1,
      title: "Frontend",
      desc: "Diseño visual moderno, páginas atractivas, personalización completa y estructura lista para conectar con backend.",
      img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c"
    },
    {
      id: 2,
      title: "Backend",
      desc: "Desarrollo de lógica, base de datos, funcionalidades internas y estructura sólida para tu negocio.",
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71"
    },
    {
      id: 3,
      title: "Dominio Gratis",
      desc: "Tu web estará online sin costo usando plataformas modernas. Ideal para empezar rápido.",
      img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
    },
    {
      id: 4,
      title: "Dominio Pago",
      desc: "Dominio profesional (tunegocio.com). Mayor confianza y branding. Costo anual aproximado de $60.000.",
      img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
    }
  ];

  return (
    <section id="servicios" style={section}>

      <h2 style={title}>Nuestros servicios</h2>

      <div style={grid}>

        {data.map((item) => (
          <div key={item.id} style={card} onClick={() => setActive(item)}>

            <img src={item.img} style={img} />

            <div style={overlay}>
              <h3>{item.title}</h3>
            </div>

          </div>
        ))}

      </div>

      {/* MODAL */}
      {active && (
        <div style={modalBg} onClick={() => setActive(null)}>

          <div style={modal} onClick={(e) => e.stopPropagation()}>
            <h2>{active.title}</h2>
            <p>{active.desc}</p>

            <button onClick={() => setActive(null)}>
              Cerrar
            </button>
          </div>

        </div>
      )}

    </section>
  );
}

//////////////////////////////////////////////////////////////
// 🎨 ESTILOS
//////////////////////////////////////////////////////////////

const section = {
  padding: "120px 40px",
  background: "#F8FAFC",
  textAlign: "center"
};

const title = {
  fontSize: "2.5rem",
  marginBottom: "50px",
  color: "#0A192F"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "30px"
};

const card = {
  position: "relative",
  borderRadius: "20px",
  overflow: "hidden",
  cursor: "pointer",
  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  transition: "0.3s"
};

const img = {
  width: "100%",
  height: "250px",
  objectFit: "cover"
};

const overlay = {
  position: "absolute",
  bottom: 0,
  width: "100%",
  padding: "20px",
  background: "linear-gradient(transparent, rgba(0,0,0,0.8))",
  color: "white"
};

const modalBg = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.7)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const modal = {
  background: "#0A192F",
  padding: "30px",
  borderRadius: "15px",
  maxWidth: "400px",
  textAlign: "center"
};

export default Services;