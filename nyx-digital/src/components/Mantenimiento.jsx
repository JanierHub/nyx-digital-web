import { useState } from "react";

function Mantenimiento() {
  const [meses, setMeses] = useState(1);

  const precio = meses * 40000;

  return (
    <div style={container}>

      <h2 style={title}>Mantenimiento y soporte</h2>

      <p style={text}>
        Incluyo <strong>2 meses GRATIS</strong> después de entregar tu proyecto.
      </p>

      <p style={text}>
        Luego puedes continuar con mantenimiento opcional para mantener tu web actualizada y funcionando correctamente.
      </p>

      {/* SELECTOR */}
      <div style={selector}>

        <button style={btn} onClick={() => setMeses(Math.max(1, meses - 1))}>
          -
        </button>

        <span style={mesesText}>{meses} mes(es)</span>

        <button style={btn} onClick={() => setMeses(meses + 1)}>
          +
        </button>

      </div>

      {/* PRECIO */}
      <h3 style={precioStyle}>
        Total: ${precio.toLocaleString()}
      </h3>

    </div>
  );
}

//////////////////////////////////////////////////////////////////
// 🎨 ESTILOS
//////////////////////////////////////////////////////////////////

const container = {
  background: "rgba(10,25,47,0.9)",
  padding: "40px",
  borderRadius: "15px",
  textAlign: "center",
  color: "#CCD6F6",
  maxWidth: "500px",
  margin: "40px auto",
  border: "1px solid rgba(100,255,218,0.2)"
};

const title = {
  marginBottom: "15px"
};

const text = {
  color: "#8892B0",
  marginBottom: "10px"
};

const selector = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "20px",
  marginTop: "20px"
};

const btn = {
  background: "#64FFDA",
  color: "#0A192F",
  border: "none",
  padding: "10px 15px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold"
};

const mesesText = {
  fontSize: "1.2rem"
};

const precioStyle = {
  marginTop: "20px",
  fontSize: "1.5rem",
  color: "#64FFDA"
};

export default Mantenimiento;