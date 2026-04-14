import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function SimpleNavbar() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("dark");
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const getUserAvatar = () => {
    return user?.role === 'admin' ? 'A' : 'U';
  };

  return (
    <nav style={{
      background: theme === 'light' ? '#ffffff' : '#0A192F',
      padding: '15px 30px',
      boxShadow: theme === 'light' ? '0 2px 10px rgba(0,0,0,0.1)' : '0 2px 10px rgba(0,0,0,0.3)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <Link to="/" style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: theme === 'light' ? '#333333' : '#CCD6F6',
          textDecoration: 'none'
        }}>
          Nyx Digital
        </Link>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px'
        }}>
          {user ? (
            <>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: theme === 'light' ? '#f0f0f0' : 'rgba(100,255,218,0.1)',
                border: `2px solid ${theme === 'light' ? '#ddd' : 'rgba(100,255,218,0.3)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: theme === 'light' ? '#333' : '#64FFDA',
                fontWeight: '600'
              }}>
                {getUserAvatar()}
              </div>
              <button
                onClick={handleLogout}
                style={{
                  padding: '8px 16px',
                  background: 'none',
                  border: `1px solid ${theme === 'light' ? '#333' : '#CCD6F6'}`,
                  color: theme === 'light' ? '#333' : '#CCD6F6',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <Link
              to="/login"
              style={{
                padding: '8px 16px',
                background: theme === 'light' ? '#333' : '#64FFDA',
                color: theme === 'light' ? '#fff' : '#0A192F',
                textDecoration: 'none',
                borderRadius: '5px'
              }}
            >
              Iniciar Sesión
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default SimpleNavbar;
