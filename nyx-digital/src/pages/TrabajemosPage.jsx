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

        <button 
          style={cta} 
          onClick={() => {
            if (open) {
              setOpen(false);
            } else {
              setOpen(true);
            }
          }}
        >
          {open ? "Cerrar cotización" : "Cotizar proyecto"}
        </button>

      </div>

      {open && <Cotizador onClose={() => setOpen(false)} />}
    </div>
  );
}

//////////////////////////////////////////////////////////////////
// 🔥 COTIZADOR
//////////////////////////////////////////////////////////////////

function Cotizador({ onClose }) {

  const [plan, setPlan] = useState(null);
  const [dominio, setDominio] = useState("gratis");
  const [mantenimiento, setMantenimiento] = useState(0); // 🔥 nuevo
  const [isClosing, setIsClosing] = useState(false); // para controlar el texto del botón

  let precio = 0;

  if (plan === "front") precio = 150000;
  if (plan === "back") precio = 200000;
  if (plan === "full") precio = 300000;

  if (plan === "full" && dominio === "pago") {
    precio += 60000;
  }

  // 🔥 mantenimiento (cada unidad = 2 meses)
  precio += mantenimiento * 40000;

  const mensaje = `Hola, quiero cotizar un proyecto web:

Plan: ${plan}
Dominio: ${plan === "full" ? dominio : "No aplica"}
Mantenimiento: ${mantenimiento > 0 ? `${mantenimiento * 2} meses` : "No incluido"}

Precio estimado: $${precio}`;

  // Reset scroll al cambiar de plan
  const handlePlanChange = (newPlan) => {
    setPlan(newPlan);
    // Resetear scroll al inicio del cotizador
    const cotizadorElement = document.querySelector('[data-cotizador="true"]');
    if (cotizadorElement) {
      cotizadorElement.scrollTop = 0;
    }
  };

  return (
    <div style={drawer} data-cotizador="true">

      {/* Botón de cerrar flotante */}
      <button 
        style={{
          position: "absolute",
          top: "15px",
          right: "15px",
          background: "rgba(10,25,47,0.9)",
          border: "1px solid rgba(100,255,218,0.3)",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          cursor: "pointer",
          fontSize: "20px",
          color: "#64FFDA",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.3s ease",
          zIndex: "200",
          boxShadow: "0 4px 15px rgba(0,0,0,0.3)"
        }} 
        onClick={onClose}
        onMouseOver={(e) => {
          e.target.style.background = "rgba(231, 76, 60, 0.9)";
          e.target.style.borderColor = "#e74c3c";
          e.target.style.color = "#ffffff";
          e.target.style.transform = "scale(1.1)";
        }}
        onMouseOut={(e) => {
          e.target.style.background = "rgba(10,25,47,0.9)";
          e.target.style.borderColor = "rgba(100,255,218,0.3)";
          e.target.style.color = "#64FFDA";
          e.target.style.transform = "scale(1)";
        }}
      >
        ×
      </button>

      <h2 style={{ marginTop: "10px" }}>Cotización</h2>

      {/* PLANES */}
      <div style={box}>
        <p>Selecciona un plan:</p>

        <button style={planBtn} onClick={() => handlePlanChange("front")}>
          Frontend
        </button>

        <button style={planBtn} onClick={() => handlePlanChange("back")}>
          Backend
        </button>

        <button style={planBtn} onClick={() => handlePlanChange("full")}>
          Frontend + Backend
        </button>

        {plan === "front" && (
          <p style={info}>
            Incluye diseño completo, desarrollo visual, documentación y estructura lista.
          </p>
        )}

        {plan === "back" && (
          <p style={info}>
            Incluye lógica, base de datos y funcionalidades internas.
          </p>
        )}

        {plan === "full" && (
          <p style={info}>
            Incluye desarrollo completo, documentación y despliegue.
          </p>
        )}
      </div>

      {/* DOMINIO */}
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
              Publicación sin costo con plataformas modernas.
            </p>
          )}

          {dominio === "pago" && (
            <p style={info}>
              Dominio profesional con costo anual aproximado de $60.000.
            </p>
          )}
        </div>
      )}

      {/* 🔥 MANTENIMIENTO */}
      <div style={box}>
        <p>Mantenimiento (opcional):</p>

        <div style={contadorBox}>

          <button
            style={planBtn}
            onClick={() => setMantenimiento(Math.max(0, mantenimiento - 1))}
          >
            -
          </button>

          <span>
            {mantenimiento} → {mantenimiento * 2} meses
          </span>

          <button
            style={planBtn}
            onClick={() => setMantenimiento(mantenimiento + 1)}
          >
            +
          </button>

        </div>

        {mantenimiento > 0 && (
          <p style={info}>
            Incluye soporte y actualizaciones durante {mantenimiento * 2} meses.
          </p>
        )}
      </div>

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

    </div>
  );
}

//////////////////////////////////////////////////////////////////
// 🎨 ESTILOS (NO TOCADOS + SOLO UNO NUEVO)
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
  top: "80px", // Espacio para el navbar
  width: "350px",
  height: "calc(100% - 80px)", // Ajustar altura para no ser tapado
  background: "#0A192F",
  padding: "30px",
  boxShadow: "-10px 0 30px rgba(0,0,0,0.5)",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  overflowY: "auto"
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

// 🔥 NUEVO (único añadido)
const contadorBox = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "10px"
};

export default TrabajemosPage;