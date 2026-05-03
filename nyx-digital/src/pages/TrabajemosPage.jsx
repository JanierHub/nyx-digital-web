import { useState } from "react";

function TrabajemosPage() {
  const [open, setOpen] = useState(false);

  return (
    <div style={wrapper}>
      <div style={overlay}>

        <div style={iconContainer}>
          <span style={animatedIcon}>💻</span>
          <span style={{...animatedIcon, animationDelay: '0.2s'}}>🎨</span>
          <span style={{...animatedIcon, animationDelay: '0.4s'}}>🚀</span>
          <span style={{...animatedIcon, animationDelay: '0.6s'}}>⚡</span>
          <span style={{...animatedIcon, animationDelay: '0.8s'}}>🌟</span>
        </div>

        <h1 style={title}>Construyamos tu proyecto digital 🚀</h1>

        <p style={subtitle}>
          Desarrollo páginas web personalizadas con acompañamiento constante,
          adaptadas a lo que tu negocio realmente necesita.
        </p>

        {/* PASOS */}
        <div style={steps}>

          <div style={card}>
            <div style={iconWrapper}>
              <span style={stepIcon}>💡</span>
            </div>
            <h3>1. Cuéntame tu idea</h3>
            <p>Analizamos tu negocio y objetivos.</p>
          </div>

          <div style={card}>
            <div style={iconWrapper}>
              <span style={stepIcon}>🎨</span>
            </div>
            <h3>2. Diseño personalizado</h3>
            <p>Adaptado completamente a tu marca.</p>
          </div>

          <div style={card}>
            <div style={iconWrapper}>
              <span style={stepIcon}>🚀</span>
            </div>
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
          {open ? "✕ Cerrar cotización" : "💰 Cotizar proyecto"}
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
  const [mantenimiento, setMantenimiento] = useState(0);
  const [isClosing, setIsClosing] = useState(false);

  let precio = 0;

  if (plan === "front") precio = 150000;
  if (plan === "back") precio = 200000;
  if (plan === "full") precio = 300000;

  // Mantenimiento (cada unidad = 2 meses)
  precio += mantenimiento * 40000;

  const mensaje = `Hola, quiero cotizar un proyecto web:

Plan: ${plan}
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
  background: "linear-gradient(135deg, #0A192F, #112240, #0A192F)",
  backgroundSize: "400% 400%",
  animation: "gradientLoop 15s ease infinite"
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

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
  @keyframes gradientLoop {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.2); opacity: 0.8; }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-5px) rotate(5deg); }
  }
`;
document.head.appendChild(style);

const iconContainer = {
  display: "flex",
  justifyContent: "center",
  gap: "20px",
  marginBottom: "30px"
};

const animatedIcon = {
  fontSize: "3rem",
  animation: "bounce 2s ease-in-out infinite"
};

const iconWrapper = {
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  background: "linear-gradient(135deg, #64FFDA, #00E5FF)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto 20px",
  fontSize: "2.5rem",
  animation: "float 3s ease-in-out infinite"
};

const stepIcon = {
  fontSize: "2.5rem"
};

export default TrabajemosPage;