import { useState } from "react";

function TrabajemosPage() {
  const [open, setOpen] = useState(false);

  return (
    <div style={wrapper}>

      <div style={overlay}>

        <h1 style={title}>Construyamos tu proyecto digital 🚀</h1>

        <p style={subtitle}>
          Desarrollo páginas web personalizadas con acompañamiento constante,
          adaptadas a lo que tu negocio realmente necesita.
        </p>

        {/* PASOS */}
        <div style={steps}>

          <div style={card}>
            <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d" style={img}/>
            <h3>1. Cuéntame tu idea</h3>
            <p>Analizamos tu negocio y objetivos.</p>
          </div>

          <div style={card}>
            <img src="https://images.unsplash.com/photo-1559027615-cd4628902d4a" style={img}/>
            <h3>2. Diseño personalizado</h3>
            <p>Adaptado completamente a tu marca.</p>
          </div>

          <div style={card}>
            <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71" style={img}/>
            <h3>3. Lanzamiento</h3>
            <p>Tu web lista para crecer.</p>
          </div>

        </div>

        <button style={cta} onClick={() => setOpen(true)}>
          Cotizar proyecto
        </button>

      </div>

      {open && <Cotizador onClose={() => setOpen(false)} />}

    </div>
  );
}

//////////////////////////////////////////////////////////////////
// 🔥 COTIZADOR PROFESIONAL POR PLANES
//////////////////////////////////////////////////////////////////

function Cotizador({ onClose }) {

  const [plan, setPlan] = useState(null); // front, back, full
  const [dominio, setDominio] = useState("gratis");

  let precio = 0;

  if (plan === "front") precio = 150000;
  if (plan === "back") precio = 200000;
  if (plan === "full") precio = 300000;

  if (plan === "full" && dominio === "pago") {
    precio += 60000;
  }

  const mensaje = `Hola, quiero cotizar un proyecto web:

Plan: ${plan}
Dominio: ${plan === "full" ? dominio : "No aplica"}

Precio estimado: $${precio}`;

  return (
    <div style={drawer}>

      <h2>Cotización</h2>

      {/* PLANES */}
      <div style={box}>
        <p>Selecciona un plan:</p>

        <button style={planBtn} onClick={() => setPlan("front")}>
          Frontend
        </button>

        <button style={planBtn} onClick={() => setPlan("back")}>
          Backend
        </button>

        <button style={planBtn} onClick={() => setPlan("full")}>
          Frontend + Backend
        </button>

        {/* INFO PLAN */}
        {plan === "front" && (
          <p style={info}>
            Incluye diseño completo de la página, desarrollo visual personalizado,
            documentación del frontend y estructura lista para integrarse con backend.
          </p>
        )}

        {plan === "back" && (
          <p style={info}>
            Incluye lógica del sistema, base de datos, funcionalidades internas
            y documentación completa del backend.
          </p>
        )}

        {plan === "full" && (
          <p style={info}>
            Incluye frontend + backend, desarrollo completo del sistema,
            documentación total, despliegue en internet y acompañamiento continuo.
          </p>
        )}
      </div>

      {/* DOMINIO SOLO SI FULL */}
      {plan === "full" && (
        <div style={box}>
          <p>Tipo de dominio:</p>

          <label>
            <input
              type="radio"
              checked={dominio === "gratis"}
              onChange={() => setDominio("gratis")}
            />
            Dominio gratis
          </label>

          <label>
            <input
              type="radio"
              checked={dominio === "pago"}
              onChange={() => setDominio("pago")}
            />
            Dominio personalizado
          </label>

          {dominio === "gratis" && (
            <p style={info}>
              Tu web estará online sin costo usando plataformas como Vercel.
              Ideal para comenzar rápido.
            </p>
          )}

          {dominio === "pago" && (
            <p style={info}>
              Dominio profesional (ej: tunegocio.com). Mejora la confianza de tus clientes.
              Tiene un costo anual aproximado de $60.000.
            </p>
          )}
        </div>
      )}

      {/* PRECIO */}
      <h3>Total estimado: ${precio}</h3>

      {/* WHATSAPP */}
      <a
        href={`https://wa.me/573028359211?text=${encodeURIComponent(mensaje)}`}
        target="_blank"
        rel="noreferrer"
      >
        <button style={{ width: "100%" }}>
          Contactar por WhatsApp
        </button>
      </a>

      <button onClick={onClose}>Cerrar</button>

    </div>
  );
}

//////////////////////////////////////////////////////////////////
// 🎨 ESTILOS
//////////////////////////////////////////////////////////////////

const wrapper = {
  minHeight: "100vh",
  backgroundImage: "url('https://images.unsplash.com/photo-1518770660439-4636190af475')",
  backgroundSize: "cover",
  backgroundPosition: "center"
};

const overlay = {
  background: "rgba(10,25,47,0.9)",
  minHeight: "100vh",
  padding: "100px 40px",
  textAlign: "center"
};

const title = {
  fontSize: "3rem"
};

const subtitle = {
  maxWidth: "600px",
  margin: "20px auto",
  color: "#8892B0"
};

const steps = {
  display: "flex",
  gap: "30px",
  justifyContent: "center",
  marginTop: "50px",
  flexWrap: "wrap"
};

const card = {
  background: "#112240",
  padding: "20px",
  borderRadius: "15px",
  width: "300px"
};

const img = {
  width: "100%",
  height: "180px",
  objectFit: "cover",
  borderRadius: "10px"
};

const cta = {
  marginTop: "40px",
  padding: "18px 36px",
  background: "linear-gradient(135deg,#64FFDA,#00E5FF)",
  border: "none",
  borderRadius: "12px",
  fontSize: "16px",
  cursor: "pointer"
};

const drawer = {
  position: "fixed",
  right: 0,
  top: 0,
  width: "350px",
  height: "100%",
  background: "#0A192F",
  padding: "30px",
  boxShadow: "-10px 0 30px rgba(0,0,0,0.5)",
  display: "flex",
  flexDirection: "column",
  gap: "15px"
};

const box = {
  background: "#112240",
  padding: "20px",
  borderRadius: "12px",
  display: "flex",
  flexDirection: "column",
  gap: "10px"
};

const info = {
  fontSize: "13px",
  color: "#8892B0",
  marginTop: "10px"
};

const planBtn = {
  padding: "10px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  background: "#1f2a40",
  color: "#CCD6F6"
};

export default TrabajemosPage;