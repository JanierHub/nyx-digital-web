import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SimpleLoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Login simple - admin hardcoded
    if (isLogin) {
      if (formData.email === "janierfarid@gmail.com" && formData.password === "Janier07200601") {
        const user = {
          id: 1,
          name: "Janier Farid",
          email: formData.email,
          role: "admin"
        };
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/');
      } else if (formData.email && formData.password) {
        const user = {
          id: 2,
          name: formData.email.split('@')[0],
          email: formData.email,
          role: "user"
        };
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/');
      }
    } else {
      // Registro simple
      if (formData.name && formData.email && formData.password) {
        const user = {
          id: Date.now(),
          name: formData.name,
          email: formData.email,
          role: "user"
        };
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/');
      }
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
        border: "1px solid #1f1f2e",
        boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
        maxWidth: "400px",
        width: "100%"
      }}>
        <h2 style={{
          color: "#CCD6F6",
          fontSize: "2rem",
          marginBottom: "30px",
          textAlign: "center",
          fontWeight: "600"
        }}>
          {isLogin ? "Iniciar Sesión" : "Registrarse"}
        </h2>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Nombre completo"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                padding: "15px",
                background: "rgba(17,34,64,0.5)",
                border: "1px solid #1f1f2e",
                borderRadius: "8px",
                color: "#CCD6F6",
                fontSize: "16px"
              }}
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              padding: "15px",
              background: "rgba(17,34,64,0.5)",
              border: "1px solid #1f1f2e",
              borderRadius: "8px",
              color: "#CCD6F6",
              fontSize: "16px"
            }}
          />

          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            required
            style={{
              padding: "15px",
              background: "rgba(17,34,64,0.5)",
              border: "1px solid #1f1f2e",
              borderRadius: "8px",
              color: "#CCD6F6",
              fontSize: "16px"
            }}
          />

          <button
            type="submit"
            style={{
              padding: "15px",
              background: "#64FFDA",
              color: "#0A192F",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease"
            }}
          >
            {isLogin ? "Iniciar Sesión" : "Registrarse"}
          </button>
        </form>

        <div style={{
          marginTop: "20px",
          textAlign: "center",
          color: "#8892B0"
        }}>
          <span style={{ marginRight: "5px" }}>
            {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}
          </span>
          <button
            onClick={() => setIsLogin(!isLogin)}
            style={{
              background: "none",
              border: "none",
              color: "#64FFDA",
              cursor: "pointer",
              textDecoration: "underline"
            }}
          >
            {isLogin ? "Regístrate" : "Inicia sesión"}
          </button>
        </div>

        <div style={{
          marginTop: "20px",
          padding: "15px",
          background: "rgba(100,255,218,0.1)",
          border: "1px solid rgba(100,255,218,0.3)",
          borderRadius: "8px",
          color: "#8892B0",
          fontSize: "14px"
        }}>
          <strong>Admin:</strong> janierfarid@gmail.com / Janier07200601
        </div>
      </div>
    </div>
  );
}

export default SimpleLoginPage;
