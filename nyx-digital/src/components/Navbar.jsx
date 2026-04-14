import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../components/AuthProvider";
import RoleAvatar from "./RoleAvatar";
import logo from "../assets/logo.svg";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoHover, setLogoHover] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { user, logout, isAuthenticated, isAdmin } = useAuthContext();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    logout();
    setShowProfileMenu(false);
    navigate('/');
    window.scrollTo(0, 0);
  };

  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  const getUserRole = () => {
    return user?.role === 'admin' ? 'admin' : 'user';
  };

  return (
    <nav style={nav} className="fade-in">
      <Link to="/" style={logoContainer} onMouseEnter={() => setLogoHover(true)} onMouseLeave={() => setLogoHover(false)}>
        <img src={logo} style={{...logoStyle, transform: logoHover ? "scale(1.1)" : "scale(1)"}} alt="Nyx Digital" />
      </Link>

      {/* Desktop Menu */}
      <div style={menu} className="desktop-menu">
        <Link to="/" style={link} className="nav-link" onClick={(e) => { e.preventDefault(); handleNavigation('/'); }}>Inicio</Link>
        <Link to="/proyectos" style={link} className="nav-link" onClick={(e) => { e.preventDefault(); handleNavigation('/proyectos'); }}>Proyectos</Link>
        <Link to="/nosotros" style={link} className="nav-link" onClick={(e) => { e.preventDefault(); handleNavigation('/nosotros'); }}>Quiénes somos</Link>
        <Link to="/contacto" style={link} className="nav-link" onClick={(e) => { e.preventDefault(); handleNavigation('/contacto'); }}>Contacto</Link>
        
        {/* Perfil/Login */}
        {isAuthenticated ? (
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              style={{
                background: "rgba(100,255,218,0.1)",
                border: "1px solid rgba(100,255,218,0.3)",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                color: "#64FFDA",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s ease",
                padding: "4px"
              }}
              onMouseOver={(e) => {
                e.target.style.background = "rgba(100,255,218,0.2)";
                e.target.style.transform = "translateY(-1px)";
              }}
              onMouseOut={(e) => {
                e.target.style.background = "rgba(100,255,218,0.1)";
                e.target.style.transform = "translateY(0)";
              }}
            >
              <RoleAvatar size={36} role={getUserRole()} theme="dark" />
            </button>
            
            {showProfileMenu && (
              <div style={{
                position: "absolute",
                top: "50px",
                right: "0",
                background: "rgba(10,25,47,0.95)",
                backdropFilter: "blur(10px)",
                border: "1px solid #1f1f2e",
                borderRadius: "10px",
                padding: "10px",
                minWidth: "200px",
                zIndex: "1000"
              }}>
                <div style={{ padding: "10px", borderBottom: "1px solid #1f1f2e" }}>
                  <div style={{ color: "#CCD6F6", fontSize: "14px", fontWeight: "600" }}>
                    {user.name || user.email}
                  </div>
                  <div style={{ color: "#8892B0", fontSize: "12px" }}>
                    {isAdmin ? "Administrador" : "Usuario"}
                  </div>
                </div>
                
                <Link
                  to="/profile"
                  style={{
                    display: "block",
                    padding: "10px",
                    color: "#CCD6F6",
                    textDecoration: "none",
                    fontSize: "14px",
                    transition: "background 0.3s ease"
                  }}
                  onClick={(e) => { e.preventDefault(); setShowProfileMenu(false); handleNavigation('/profile'); }}
                  onMouseOver={(e) => {
                    e.target.style.background = "rgba(100,255,218,0.1)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = "none";
                  }}
                >
                  Mi Perfil
                </Link>
                
                {isAdmin && (
                  <Link
                    to="/admin"
                    style={{
                      display: "block",
                      padding: "10px",
                      color: "#CCD6F6",
                      textDecoration: "none",
                      fontSize: "14px",
                      transition: "background 0.3s ease"
                    }}
                    onClick={(e) => { e.preventDefault(); setShowProfileMenu(false); handleNavigation('/admin'); }}
                    onMouseOver={(e) => {
                      e.target.style.background = "rgba(100,255,218,0.1)";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.background = "none";
                    }}
                  >
                    Panel Admin
                  </Link>
                )}
                
                <button
                  onClick={handleLogout}
                  style={{
                    width: "100%",
                    padding: "10px",
                    background: "none",
                    border: "none",
                    color: "#e74c3c",
                    fontSize: "14px",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "background 0.3s ease"
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = "rgba(231, 76, 60, 0.1)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = "none";
                  }}
                >
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        ) : (
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              style={{
                background: "rgba(100,255,218,0.1)",
                border: "1px solid rgba(100,255,218,0.3)",
                borderRadius: "20px",
                color: "#64FFDA",
                padding: "8px 16px",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}
              onMouseOver={(e) => {
                e.target.style.background = "rgba(100,255,218,0.2)";
                e.target.style.transform = "translateY(-1px)";
              }}
              onMouseOut={(e) => {
                e.target.style.background = "rgba(100,255,218,0.1)";
                e.target.style.transform = "translateY(0)";
              }}
            >
                <RoleAvatar size={24} role="user" theme="dark" />
              Iniciar Sesión
            </button>
            
            {showProfileMenu && (
              <div style={{
                position: "absolute",
                top: "45px",
                right: "0",
                background: "rgba(10,25,47,0.95)",
                backdropFilter: "blur(10px)",
                border: "1px solid #1f1f2e",
                borderRadius: "10px",
                padding: "10px",
                minWidth: "200px",
                zIndex: "1000"
              }}>
                <Link
                  to="/login"
                  style={{
                    display: "block",
                    padding: "10px",
                    color: "#CCD6F6",
                    textDecoration: "none",
                    fontSize: "14px",
                    transition: "background 0.3s ease"
                  }}
                  onClick={(e) => { e.preventDefault(); setShowProfileMenu(false); handleNavigation('/login'); }}
                  onMouseOver={(e) => {
                    e.target.style.background = "rgba(100,255,218,0.1)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = "none";
                  }}
                >
                  Iniciar Sesión
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button 
        style={mobileMenuBtn} 
        onClick={toggleMenu}
        className="mobile-menu-btn"
        aria-label="Toggle menu"
      >
        <div style={hamburgerLine}></div>
        <div style={hamburgerLine}></div>
        <div style={hamburgerLine}></div>
      </button>

      {/* Mobile Menu */}
      <div style={{...mobileMenu, ...(isMenuOpen ? mobileMenuOpen : {})}} className="mobile-menu">
        <Link to="/" style={mobileLink} onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); handleNavigation('/'); }}>Inicio</Link>
        <Link to="/proyectos" style={mobileLink} onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); handleNavigation('/proyectos'); }}>Proyectos</Link>
        <Link to="/nosotros" style={mobileLink} onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); handleNavigation('/nosotros'); }}>Quiénes somos</Link>
        <Link to="/contacto" style={mobileLink} onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); handleNavigation('/contacto'); }}>Contacto</Link>
        
        {isAuthenticated ? (
          <>
            <div style={{ padding: "10px", borderBottom: "1px solid #1f1f2e" }}>
              <div style={{ color: "#CCD6F6", fontSize: "14px", fontWeight: "600" }}>
                {user.name || user.email}
              </div>
              <div style={{ color: "#8892B0", fontSize: "12px" }}>
                {isAdmin ? "Administrador" : "Usuario"}
              </div>
            </div>
            <Link to="/profile" style={mobileLink} onClick={() => setIsMenuOpen(false)}>Mi Perfil</Link>
            {isAdmin && (
              <Link to="/admin" style={mobileLink} onClick={() => setIsMenuOpen(false)}>Panel Admin</Link>
            )}
            <button 
              style={{...mobileLink, color: "#e74c3c", textAlign: "left"}} 
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
            >
              Cerrar Sesión
            </button>
          </>
        ) : (
          <Link to="/login" style={mobileLink} onClick={() => setIsMenuOpen(false)}>Iniciar Sesión</Link>
        )}
        
        <button style={mobileCta} onClick={() => {
          window.location.href = "/contacto";
          setIsMenuOpen(false);
        }}>Contáctanos</button>
      </div>

      
    </nav>
  );
}

const nav = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "20px 60px",
  borderBottom: "1px solid #1f1f2e",
  backgroundColor: "rgba(10,25,47,0.8)",
  backdropFilter: "blur(10px)",
  position: "sticky",
  top: 0,
  zIndex: 1000,
  boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
};

const logoContainer = {
  display: "flex",
  alignItems: "center"
};

const logoStyle = {
  height: "45px",
  transition: "transform 0.3s ease"
};

const menu = {
  display: "flex",
  gap: "25px"
};

const mobileMenuBtn = {
  display: "none",
  flexDirection: "column",
  justifyContent: "space-between",
  width: "30px",
  height: "21px",
  background: "none",
  border: "none",
  cursor: "pointer",
  padding: 0
};

const hamburgerLine = {
  width: "100%",
  height: "3px",
  backgroundColor: "#64FFDA",
  borderRadius: "2px",
  transition: "all 0.3s ease"
};

const mobileMenu = {
  position: "fixed",
  top: "85px",
  right: "-100%",
  width: "80%",
  maxWidth: "300px",
  height: "calc(100vh - 85px)",
  backgroundColor: "rgba(10,25,47,0.95)",
  backdropFilter: "blur(10px)",
  flexDirection: "column",
  padding: "30px",
  gap: "20px",
  transition: "right 0.3s ease",
  borderLeft: "1px solid #1f1f2e",
  zIndex: 999
};

const mobileMenuOpen = {
  right: "0"
};

const mobileLink = {
  color: "#CCD6F6",
  textDecoration: "none",
  padding: "12px 16px",
  borderRadius: "8px",
  transition: "all 0.3s ease",
  fontSize: "16px",
  textAlign: "center"
};

const mobileCta = {
  background: "linear-gradient(135deg, #64FFDA, #00E5FF)",
  color: "#0A192F",
  border: "none",
  padding: "14px 20px",
  borderRadius: "10px",
  fontWeight: "600",
  cursor: "pointer",
  fontSize: "14px",
  marginTop: "10px"
};

const link = {
  color: "#CCD6F6",
  textDecoration: "none",
  padding: "8px 14px",
  borderRadius: "8px",
  transition: "all 0.3s ease",
  position: "relative",
  fontSize: "15px"
};

const cta = {
  background: "linear-gradient(135deg, #64FFDA, #00E5FF)",
  color: "#0A192F",
  border: "none",
  padding: "12px 22px",
  borderRadius: "10px",
  fontWeight: "600",
  cursor: "pointer",
  fontSize: "14px",
  transition: "all 0.3s ease",
  boxShadow: "0 4px 15px rgba(100,255,218,0.2)"
};

/* Responsive styles */
const responsiveStyles = `
  @media (max-width: 768px) {
    .desktop-menu {
      display: none !important;
    }
    
    .mobile-menu-btn {
      display: flex !important;
    }
    
    .desktop-cta {
      display: none !important;
    }
    
    nav {
      padding: 15px 20px;
    }
  }
  
  @media (min-width: 769px) {
    .mobile-menu {
      display: none !important;
    }
  }
`;

export default Navbar;