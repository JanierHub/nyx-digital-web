function Testimonials() {
  return (
    <section style={section}>
      <h2>Resultados reales</h2>

      <div style={grid}>

        <div style={card}>
          <p>"Mi negocio creció gracias a esta web."</p>
          <h4>- Cliente 1</h4>
        </div>

        <div style={card}>
          <p>"Profesional y rápido, recomendado."</p>
          <h4>- Cliente 2</h4>
        </div>

        <div style={card}>
          <p>"Ahora tengo presencia online real."</p>
          <h4>- Cliente 3</h4>
        </div>

      </div>
    </section>
  );
}

const section = {
  padding: "100px 40px",
  textAlign: "center"
};

const grid = {
  display: "flex",
  gap: "20px",
  justifyContent: "center",
  marginTop: "40px"
};

const card = {
  background: "#112240",
  padding: "20px",
  borderRadius: "12px",
  maxWidth: "250px"
};

export default Testimonials;