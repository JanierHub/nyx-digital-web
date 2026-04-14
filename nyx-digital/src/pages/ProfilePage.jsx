import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RoleAvatar from "../components/RoleAvatar";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("dark");
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      navigate('/login');
      return;
    }

    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    if (newTheme === 'light') {
      document.body.style.background = '#ffffff';
      document.body.style.color = '#333333';
    } else {
      document.body.style.background = 'linear-gradient(135deg, #112240, #0A192F)';
      document.body.style.color = '#CCD6F6';
    }
  };


  if (!user) {
    return <div>Cargando...</div>;
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: theme === 'light' ? '#f8f9fa' : 'linear-gradient(135deg, #112240, #0A192F)',
      padding: "100px 20px 40px",
      transition: "all 0.3s ease"
    }}>
      <div style={{
        maxWidth: "800px",
        margin: "0 auto",
        background: theme === 'light' ? '#ffffff' : 'rgba(10,25,47,0.9)',
        backdropFilter: "blur(10px)",
        borderRadius: "20px",
        padding: "40px",
        border: theme === 'light' ? '1px solid #e9ecef' : '1px solid #1f1f2e',
        boxShadow: theme === 'light' ? '0 10px 30px rgba(0,0,0,0.1)' : '0 20px 40px rgba(0,0,0,0.3)'
      }}>
        <h1 style={{
          color: theme === 'light' ? '#333333' : '#CCD6F6',
          fontSize: "2.5rem",
          marginBottom: "10px",
          textAlign: "center",
          fontWeight: "600"
        }}>
          Mi Perfil
        </h1>

        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "30px",
          marginBottom: "40px",
          padding: "30px",
          background: theme === 'light' ? '#f8f9fa' : 'rgba(17,34,64,0.5)',
          borderRadius: "15px",
          border: theme === 'light' ? '1px solid #e9ecef' : '1px solid #1f1f2e'
        }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
            <RoleAvatar 
              size={100} 
              role={user?.role === 'admin' ? 'admin' : 'user'} 
              theme={theme}
            />
          </div>

          <div>
            <h2 style={{
              color: theme === 'light' ? '#333333' : '#CCD6F6',
              fontSize: "1.5rem",
              marginBottom: "5px"
            }}>
              {user.name || 'Usuario'}
            </h2>
            <p style={{
              color: theme === 'light' ? '#6c757d' : '#8892B0',
              fontSize: "1rem",
              marginBottom: "5px"
            }}>
              {user.email}
            </p>
            <p style={{
              color: theme === 'light' ? '#28a745' : '#64FFDA',
              fontSize: "0.9rem",
              fontWeight: "600"
            }}>
              {user.role === "admin" ? "Administrador" : "Usuario"}
            </p>
          </div>
        </div>

        <div style={{
          background: theme === 'light' ? '#f8f9fa' : 'rgba(17,34,64,0.5)',
          borderRadius: "15px",
          padding: "30px",
          marginBottom: "20px"
        }}>
          <h3 style={{
            color: theme === 'light' ? '#333333' : '#CCD6F6',
            fontSize: "1.3rem",
            marginBottom: "20px"
          }}>
            Configuracion
          </h3>

          <div style={{
            marginBottom: "25px"
          }}>
            <label style={{
              display: "block",
              color: theme === 'light' ? '#333333' : '#CCD6F6',
              fontSize: "1rem",
              marginBottom: "10px",
              fontWeight: "500"
            }}>
              Tema de la aplicacion
            </label>
            <div style={{
              display: "flex",
              gap: "15px"
            }}>
              <button
                onClick={() => handleThemeChange('dark')}
                style={{
                  padding: "12px 24px",
                  borderRadius: "8px",
                  border: theme === 'dark' ? '2px solid #64FFDA' : '1px solid #1f1f2e',
                  background: theme === 'dark' ? 'rgba(100,255,218,0.1)' : 'rgba(17,34,64,0.5)',
                  color: theme === 'dark' ? '#64FFDA' : '#CCD6F6',
                  cursor: "pointer",
                  transition: "all 0.3s ease"
                }}
              >
                Oscuro
              </button>
              <button
                onClick={() => handleThemeChange('light')}
                style={{
                  padding: "12px 24px",
                  borderRadius: "8px",
                  border: theme === 'light' ? '2px solid #007bff' : '1px solid #1f1f2e',
                  background: theme === 'light' ? 'rgba(0,123,255,0.1)' : 'rgba(17,34,64,0.5)',
                  color: theme === 'light' ? '#007bff' : '#CCD6F6',
                  cursor: "pointer",
                  transition: "all 0.3s ease"
                }}
              >
                Claro
              </button>
            </div>
          </div>

          <div style={{
            display: "flex",
            gap: "15px",
            flexWrap: "wrap"
          }}>
            {user.role === "admin" && (
              <button
                onClick={() => navigate('/admin')}
                style={{
                  padding: "12px 24px",
                  borderRadius: "8px",
                  border: "1px solid #007bff",
                  background: "rgba(0,123,255,0.1)",
                  color: "#007bff",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  fontSize: "14px",
                  fontWeight: "500"
                }}
              >
                Panel de Administracion
              </button>
            )}
            
            <button
              onClick={handleLogout}
              style={{
                padding: "12px 24px",
                borderRadius: "8px",
                border: "1px solid #e74c3c",
                background: "none",
                color: "#e74c3c",
                cursor: "pointer",
                transition: "all 0.3s ease",
                fontSize: "14px",
                fontWeight: "500"
              }}
            >
              Cerrar Sesion
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
