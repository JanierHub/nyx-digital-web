import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../components/AuthProvider";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: ""
  });
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuthContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateEmail = (email) => {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return gmailRegex.test(email);
  };

  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return {
      valid: minLength && hasUppercase && hasLowercase && hasNumber && hasSymbol,
      errors: {
        minLength: !minLength,
        hasUppercase: !hasUppercase,
        hasLowercase: !hasLowercase,
        hasNumber: !hasNumber,
        hasSymbol: !hasSymbol
      }
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validaciones automáticas específicas
    if (isRegistering) {
      // Validar nombre
      if (!formData.name || formData.name.trim().length < 2) {
        setError("❌ Error: El nombre debe tener al menos 2 caracteres");
        setLoading(false);
        return;
      }
      
      if (formData.name.trim().length > 50) {
        setError("❌ Error: El nombre no puede exceder 50 caracteres");
        setLoading(false);
        return;
      }

      // Validar que sea solo Gmail
      if (!validateEmail(formData.email)) {
        setError("❌ Error: Solo se permiten correos @gmail.com");
        setLoading(false);
        return;
      }

      // Validar que las contraseñas coincidan
      if (formData.password !== formData.confirmPassword) {
        setError("❌ Error: Las contraseñas no coinciden");
        setLoading(false);
        return;
      }

      // Validar contraseña segura
      const passwordCheck = validatePassword(formData.password);
      if (!passwordCheck.valid) {
        let errorMsg = "❌ Error: La contraseña debe contener:\n";
        if (passwordCheck.errors.minLength) errorMsg += "• Mínimo 8 caracteres\n";
        if (passwordCheck.errors.hasUppercase) errorMsg += "• Al menos una MAYÚSCULA\n";
        if (passwordCheck.errors.hasLowercase) errorMsg += "• Al menos una minúscula\n";
        if (passwordCheck.errors.hasNumber) errorMsg += "• Al menos un número (0-9)\n";
        if (passwordCheck.errors.hasSymbol) errorMsg += "• Al menos un símbolo (!@#$%^&*)\n";
        
        setError(errorMsg);
        setLoading(false);
        return;
      }
    } else {
      // Login validations
      if (!formData.email || !formData.password) {
        setError("❌ Error: Por favor ingresa correo y contraseña");
        setLoading(false);
        return;
      }
    }

    // Registro
      const result = await register({
        email: formData.email,
        password: formData.password,
        name: formData.name
      });

      if (result.success) {
        navigate("/");
      } else {
        setError(result.message || "Error al registrarse");
      }
    } else {
      // Login
      const result = await login(formData.email, formData.password);

      if (result.success) {
        if (result.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        setError(result.message || "Credenciales incorrectas");
      }
    }

    setLoading(false);
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
          fontSize: "2rem",
          marginBottom: "10px",
          textAlign: "center",
          fontWeight: "600"
        }}>
          {isRegistering ? "Crear Cuenta" : "Iniciar Sesión"}
        </h1>
        
        <p style={{
          color: "#8892B0",
          textAlign: "center",
          marginBottom: "30px",
          fontSize: "0.9rem"
        }}>
          {isRegistering ? "Regístrate para acceder a todas las funcionalidades" : "Ingresa tus datos para continuar"}
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
          {isRegistering && (
            <div>
              <label style={{
                display: "block",
                color: "#8892B0",
                marginBottom: "8px",
                fontSize: "0.9rem"
              }}>
                Nombre completo <span style={{color: "#64FFDA", fontSize: "0.8rem"}}>(solo letras)</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) => {
                  // Solo permitir letras y espacios
                  const value = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
                  setFormData({...formData, name: value});
                }}
                placeholder="Tu nombre (ej: Juan Pérez)"
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
          )}

          <div>
            <label style={{
              display: "block",
              color: "#8892B0",
              marginBottom: "8px",
              fontSize: "0.9rem"
            }}>
              Correo electrónico <span style={{color: "#64FFDA", fontSize: "0.8rem"}}>(@gmail.com)</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tu@gmail.com"
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

          <div>
            <label style={{
              display: "block",
              color: "#8892B0",
              marginBottom: "8px",
              fontSize: "0.9rem"
            }}>
              Contraseña <span style={{color: "#64FFDA", fontSize: "0.8rem"}}>(8+ caracteres, mayúscula, número, símbolo)</span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Contraseña segura"
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

          {isRegistering && (
            <div>
              <label style={{
                display: "block",
                color: "#8892B0",
                marginBottom: "8px",
                fontSize: "0.9rem"
              }}>
                Confirmar contraseña
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirma tu contraseña"
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
          )}

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
            onMouseOver={(e) => {
              if (!loading) {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 6px 20px rgba(100,255,218,0.4)";
              }
            }}
            onMouseOut={(e) => {
              if (!loading) {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 15px rgba(100,255,218,0.3)";
              }
            }}
          >
            {loading ? "Procesando..." : 
             isRegistering ? "Crear Cuenta" : "Iniciar Sesión"}
          </button>
        </form>

        <div style={{
          marginTop: "30px",
          textAlign: "center",
          paddingTop: "20px",
          borderTop: "1px solid #1f1f2e"
        }}>
          <button
            onClick={() => {
              setIsRegistering(!isRegistering);
              setError("");
              setFormData({ email: "", password: "", name: "", confirmPassword: "" });
            }}
            style={{
              background: "none",
              border: "1px solid #64FFDA",
              color: "#64FFDA",
              padding: "8px 16px",
              borderRadius: "20px",
              fontSize: "0.8rem",
              cursor: "pointer",
              transition: "all 0.3s ease",
              marginBottom: "10px",
              display: "block",
              width: "100%"
            }}
            onMouseOver={(e) => {
              e.target.style.background = "rgba(100,255,218,0.1)";
            }}
            onMouseOut={(e) => {
              e.target.style.background = "none";
            }}
          >
            {isRegistering ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate"}
          </button>
        </div>

              </div>
    </div>
  );
}

export default LoginPage;
