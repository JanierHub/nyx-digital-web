function TestPage() {
  return (
    <div style={{ padding: "20px", background: "white", color: "black" }}>
      <h1>Página de Prueba</h1>
      <p>Si ves esto, la página funciona correctamente.</p>
      <p>La fecha actual es: {new Date().toLocaleString()}</p>
    </div>
  );
}

export default TestPage;
