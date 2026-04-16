import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../components/AuthProvider";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validaciones
    if (!formData.email || !formData.password) {
      setError("❌ Error: Por favor ingresa correo y contraseña");
      setLoading(false);
      return;
    }

    try {
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        // Solo admins pueden entrar
        if (result.user?.role === 'admin') {
          navigate("/admin");
        } else {
          setError("❌ Acceso solo para administradores");
          setLoading(false);
        }
      } else {
        setError(result.error || "❌ Error al iniciar sesión");
        setLoading(false);
      }
    } catch (err) {
      setError("❌ Error de conexión");
      setLoading(false);
    }
  };

  // Container styles
  const container = {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    backgroundColor: "#0A192F"
  };

  const formContainer = {
    width: "100%",
    maxWidth: "420px",
    padding: "40px",
    backgroundColor: "#112240",
    borderRadius: "12px",
    border: "1px solid #1f1f2e"
  };

  const title = {
    color: "#CCD6F6",
    fontSize: "1.8rem",
    fontWeight: "700",
    marginBottom: "8px",
    textAlign: "center"
  };

  const subtitle = {
    color: "#8892B0",
    fontSize: "0.9rem",
    textAlign: "center",
    marginBottom: "30px"
  };

  const inputGroup = {
    marginBottom: "20px"
  };

  const label = {
    display: "block",
    color: "#8892B0",
    marginBottom: "8px",
    fontSize: "0.9rem"
  };

  const input = {
    width: "100%",
    padding: "12px 16px",
    backgroundColor: "#0A192F",
    border: "1px solid #1f1f2e",
    borderRadius: "8px",
    color: "#CCD6F6",
    fontSize: "1rem",
    boxSizing: "border-box",
    outline: "none"
  };

  const button = {
    width: "100%",
    padding: "14px",
    backgroundColor: "#64FFDA",
    color: "#0A192F",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "10px"
  };

  const errorStyle = {
    color: "#e74c3c",
    fontSize: "0.9rem",
    marginBottom: "20px",
    textAlign: "center",
    whiteSpace: "pre-line"
  };

  const backButton = {
    marginTop: "20px",
    color: "#64FFDA",
    textDecoration: "none",
    fontSize: "0.9rem",
    textAlign: "center",
    display: "block",
    background: "none",
    border: "none",
    cursor: "pointer",
    width: "100%"
  };

  return (
    <div style={container}>
      <div style={formContainer}>
        <h1 style={title}>Panel Admin</h1>
        <p style={subtitle}>Acceso exclusivo para administradores</p>

        {error && <div style={errorStyle}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={inputGroup}>
            <label style={label}>Correo electrónico</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@ejemplo.com"
              style={input}
              required
            />
          </div>

          <div style={inputGroup}>
            <label style={label}>Contraseña</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              style={input}
              required
            />
          </div>

          <button type="submit" style={button} disabled={loading}>
            {loading ? "Cargando..." : "Iniciar Sesión"}
          </button>
        </form>

        <button onClick={() => navigate("/")} style={backButton}>
          ← Volver al inicio
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
