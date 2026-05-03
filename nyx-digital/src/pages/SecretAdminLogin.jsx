import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api.js";

function SecretAdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!password) {
      setError("Ingresa la contraseña de admin");
      return;
    }

    setLoading(true);
    
    try {
      // Usar email de admin hardcoded
      const result = await login("janierfarid@gmail.com", password);
      
      if (result.success && result.user?.role === 'admin') {
        navigate("/admin");
      } else {
        setError("Contraseña incorrecta");
      }
    } catch (err) {
      setError("Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #112240, #0A192F)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px"
    }}>
      <div style={{
        background: "rgba(10,25,47,0.9)",
        backdropFilter: "blur(10px)",
        borderRadius: "20px",
        padding: "40px",
        width: "100%",
        maxWidth: "400px",
        border: "1px solid #1f1f2e",
        boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
      }}>
        <h1 style={{
          color: "#CCD6F6",
          fontSize: "1.5rem",
          marginBottom: "10px",
          textAlign: "center",
          fontWeight: "600"
        }}>
          🔐 Acceso Admin
        </h1>
        
        <p style={{
          color: "#8892B0",
          textAlign: "center",
          marginBottom: "30px",
          fontSize: "0.9rem"
        }}>
          Ingresa tu contraseña de administrador
        </p>

        {error && (
          <div style={{
            background: "rgba(231, 76, 60, 0.1)",
            border: "1px solid #e74c3c",
            color: "#e74c3c",
            padding: "12px",
            borderRadius: "8px",
            marginBottom: "20px",
            fontSize: "0.9rem",
            textAlign: "center"
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px"
        }}>
          <div>
            <label style={{
              display: "block",
              color: "#8892B0",
              marginBottom: "8px",
              fontSize: "0.9rem"
            }}>
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #1f1f2e",
                background: "rgba(17,34,64,0.5)",
                color: "#CCD6F6",
                fontSize: "1rem",
                outline: "none",
                transition: "all 0.3s ease"
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#64FFDA";
                e.target.style.boxShadow = "0 0 0 2px rgba(100,255,218,0.2)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#1f1f2e";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              background: loading ? "rgba(100,255,218,0.3)" : "linear-gradient(135deg, #64FFDA, #00E5FF)",
              color: "#0A192F",
              padding: "14px",
              borderRadius: "8px",
              border: "none",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 15px rgba(100,255,218,0.3)",
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? "Verificando..." : "Ingresar"}
          </button>
        </form>

        <button 
          onClick={() => navigate("/")}
          style={{
            marginTop: "20px",
            background: "transparent",
            border: "none",
            color: "#8892B0",
            fontSize: "0.9rem",
            cursor: "pointer",
            width: "100%"
          }}
        >
          ← Volver al inicio
        </button>
      </div>
    </div>
  );
}

export default SecretAdminLogin;
