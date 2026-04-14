import { useAuthContext } from '../components/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

// Componente para proteger rutas que requieren autenticación
export function ProtectedRoute({ children, adminOnly = false }) {
  const { isAuthenticated, isAdmin, loading } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        navigate('/login');
      } else if (adminOnly && !isAdmin) {
        navigate('/'); // Redirigir a inicio si no es admin
      }
    }
  }, [isAuthenticated, isAdmin, loading, navigate, adminOnly]);

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #112240, #0A192F)",
        color: "#CCD6F6"
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: "40px",
            height: "40px",
            border: "3px solid #64FFDA",
            borderTop: "3px solid transparent",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            margin: "0 auto 20px"
          }}></div>
          <p>Verificando acceso...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Redirigirá automáticamente
  }

  if (adminOnly && !isAdmin) {
    return null; // Redirigirá automáticamente
  }

  return children;
}

// Componente para mostrar contenido solo si está autenticado
export function AuthenticatedContent({ children, fallback = null }) {
  const { isAuthenticated } = useAuthContext();

  if (isAuthenticated) {
    return children;
  }

  return fallback;
}

// Componente para mostrar contenido solo si es admin
export function AdminContent({ children, fallback = null }) {
  const { isAdmin } = useAuthContext();

  if (isAdmin) {
    return children;
  }

  return fallback;
}

// Componente para mostrar mensaje de login requerido
export function LoginRequired({ message = "Inicia sesión para ver este contenido" }) {
  return (
    <div style={{
      padding: "40px",
      textAlign: "center",
      background: "rgba(10,25,47,0.9)",
      borderRadius: "15px",
      border: "1px solid #1f1f2e",
      margin: "20px auto",
      maxWidth: "500px"
    }}>
      <div style={{
        fontSize: "48px",
        marginBottom: "20px"
      }}>
        ð
      </div>
      <h3 style={{
        color: "#CCD6F6",
        marginBottom: "15px",
        fontSize: "1.3rem"
      }}>
        {message}
      </h3>
      <p style={{
        color: "#8892B0",
        marginBottom: "25px",
        fontSize: "0.9rem"
      }}>
        Crea una cuenta gratuita para acceder a todas las funcionalidades
      </p>
      <a
        href="/login"
        style={{
          display: "inline-block",
          padding: "12px 24px",
          background: "linear-gradient(135deg, #64FFDA, #00E5FF)",
          color: "#0A192F",
          textDecoration: "none",
          borderRadius: "8px",
          fontWeight: "600",
          transition: "all 0.3s ease"
        }}
        onMouseOver={(e) => {
          e.target.style.transform = "translateY(-2px)";
          e.target.style.boxShadow = "0 4px 15px rgba(100,255,218,0.4)";
        }}
        onMouseOut={(e) => {
          e.target.style.transform = "translateY(0)";
          e.target.style.boxShadow = "none";
        }}
      >
        Iniciar Sesión
      </a>
    </div>
  );
}

// Estilos para animación
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);
