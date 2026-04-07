import { useNavigate } from "react-router-dom";

import img1 from "../assets/1.png";
import img2 from "../assets/2.jpg";
import img3 from "../assets/3.webp";
import img5 from "../assets/5.jpg";
import img6 from "../assets/6.webp";

function ServicesPage() {
  const navigate = useNavigate();

  return (
    <div style={container}>

      {/* HERO */}
      <section
        style={{
          ...hero,
          backgroundImage: `
            linear-gradient(rgba(10,25,47,0.9), rgba(10,25,47,0.95)),
            url(${img6})
          `
        }}
      >
        <h1>Soluciones digitales para impulsar tu negocio 🚀</h1>
        <p>Desarrollo páginas web modernas, personalizadas y enfocadas en resultados.</p>

        <button onClick={() => navigate("/trabajemos")}>
          Cotizar proyecto
        </button>
      </section>

      {/* SERVICIOS */}
      <section
        style={{
          ...servicesSection,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.95), rgba(255,255,255,0.95)),
            url(${img2})
          `,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >

        <h2 style={sectionTitle}>Servicios</h2>

        {/* FILA SUPERIOR */}
        <div style={topGrid}>

          <div style={card} className="card-hover">
            <img src={img1} style={img} />
            <h2>Frontend</h2>
            <p style={text}>Diseño moderno, adaptable y enfocado en experiencia.</p>
            <p><strong>Desde $150.000</strong></p>
          </div>

          <div style={card} className="card-hover">
            <img src={img2} style={img} />
            <h2>Backend</h2>
            <p style={text}>Lógica del sistema, base de datos y funcionalidades.</p>
            <p><strong>Desde $200.000</strong></p>
          </div>

          <div style={card} className="card-hover">
            <img src={img3} style={img} />
            <h2>Proyecto completo</h2>
            <p style={text}>Desarrollo completo listo para producción.</p>
            <p><strong>Desde $300.000</strong></p>
          </div>

        </div>

        {/* FILA INFERIOR (DOMINIO) */}
        <div style={bottomGrid}>

          <div style={card} className="card-hover">
            <h2>Dominio Gratis</h2>
            <p style={text}>
              Publicación gratuita con plataformas como Vercel.
            </p>
          </div>

          <div style={card} className="card-hover">
            <h2>Dominio Profesional</h2>
            <p style={text}>
              Dominio personalizado con costo anual de $60.000.
            </p>
          </div>

        </div>

      </section>

      {/* MANTENIMIENTO */}
      <section
        style={{
          ...maintenanceSection,
          backgroundImage: `
            linear-gradient(rgba(10,25,47,0.9), rgba(10,25,47,0.95)),
            url(${img5})
          `
        }}
      >
        <div style={maintenanceContent}>
          <h2>Mantenimiento y soporte</h2>

          <p>
            Incluyo <strong>2 meses GRATIS</strong>.
          </p>

          <p>
            Luego mantenimiento por <strong>$40.000 cada 2 meses (opcional) </strong>.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section style={ctaSection}>
        <h2>¿Listo para comenzar?</h2>

        <button onClick={() => navigate("/trabajemos")}>
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
  width: "100%"
};

const hero = {
  padding: "120px 40px",
  textAlign: "center",
  color: "white",
  backgroundSize: "cover"
};

const servicesSection = {
  padding: "100px 40px",
  textAlign: "center"
};

const sectionTitle = {
  fontSize: "2.5rem",
  marginBottom: "50px",
  color: "#0A192F"
};

const topGrid = {
  display: "flex",
  justifyContent: "center",
  gap: "30px",
  flexWrap: "wrap",
  marginBottom: "40px"
};

const bottomGrid = {
  display: "flex",
  justifyContent: "center",
  gap: "30px"
};

const card = {
  background: "rgba(10, 25, 47, 0.9)",
  padding: "20px",
  borderRadius: "15px",
  width: "280px",
  textAlign: "center",
  color: "#CCD6F6",
  border: "1px solid rgba(100,255,218,0.2)"
};

const img = {
  width: "100%",
  height: "160px",
  objectFit: "cover",
  borderRadius: "10px",
  marginBottom: "10px"
};

const text = {
  color: "#8892B0"
};

const maintenanceSection = {
  padding: "100px 40px",
  textAlign: "center",
  color: "white"
};

const maintenanceContent = {
  maxWidth: "600px",
  margin: "0 auto"
};

const ctaSection = {
  padding: "100px 40px",
  textAlign: "center"
};

export default ServicesPage;