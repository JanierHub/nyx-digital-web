function About() {
  return (
    <section id="about" style={section}>
      <h2>Quiénes somos</h2>

      <p style={{ maxWidth: "600px", marginTop: "20px" }}>
        Soy Janier Farid Quiñones, desarrollador web enfocado en crear soluciones digitales
        modernas, funcionales y orientadas al crecimiento de cada negocio.
      </p>
    </section>
  );
}

const section = {
  padding: "100px 40px",
  textAlign: "center"
};

export default About;