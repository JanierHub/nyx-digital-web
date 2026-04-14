function Footer() {
  return (
    <footer style={footer}>

      <div style={container}>

        {/* MARCA */}
        <div>
          <h2>Nyx Digital</h2>
          <p style={text}>
            Soluciones digitales modernas para impulsar negocios en internet.
          </p>
        </div>

        {/* SERVICIOS */}
        <div>
          <h4>Servicios</h4>
          <p>Desarrollo Web</p>
          <p>Frontend</p>
          <p>Backend</p>
        </div>

        {/* CONTACTO */}
        <div>
          <h4>Contacto</h4>
          <p>📱 302 835 9211</p>

          <a
            href="https://wa.me/573028359211?text=Hola%20Nyx%20Digital,%20vi%20su%20p%C3%A1gina%20web%20y%20me%20gustar%C3%ADa%20cotizar%20un%20proyecto%20para%20mi%20negocio.%20%C2%BFPodemos%20hablar%20ahora?"
            target="_blank"
            style={link}
          >
            WhatsApp
          </a>
        </div>

        {/* INFO */}
        <div>
          <h4>Información</h4>
          <p>Sobre mí</p>
          <p>Servicios</p>
          <p>Contacto</p>
        </div>

      </div>

      <p style={copy}>
        © 2026 Nyx Digital - Todos los derechos reservados
      </p>

    </footer>
  );
}

//////////////////////////////////////////////////////////////////
// 🎨 ESTILOS
//////////////////////////////////////////////////////////////////

const footer = {
  background: "#020617",
  padding: "60px 40px",
  marginTop: "80px"
};

const container = {
  display: "flex",
  justifyContent: "space-between",
  flexWrap: "wrap",
  gap: "40px"
};

const text = {
  color: "#8892B0",
  maxWidth: "250px"
};

const link = {
  color: "#64FFDA",
  textDecoration: "none"
};

const copy = {
  marginTop: "40px",
  textAlign: "center",
  color: "#555"
};

export default Footer;