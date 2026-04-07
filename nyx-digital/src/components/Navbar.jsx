import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

function Navbar() {
  return (
    <nav style={nav}>
      
      <Link to="/">
        <img src={logo} style={{ height: "45px" }} />
      </Link>

      <div style={menu}>
        <Link to="/" style={link}>Inicio</Link>
        <Link to="/servicios" style={link}>Servicios</Link>
        <Link to="/about" style={link}>Quiénes somos</Link>
        <Link to="/contacto" style={link}>Contacto</Link>
      </div>

      <button style={cta}>Contáctanos</button>

    </nav>
  );
}

const nav = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "20px 60px",
  borderBottom: "1px solid #1f1f2e",
  backgroundColor: "rgba(10,25,47,0.7)",
  backdropFilter: "blur(10px)"
};

const menu = {
  display: "flex",
  gap: "25px"
};

const link = {
  color: "#CCD6F6",
  textDecoration: "none",
  padding: "8px 14px",
  borderRadius: "8px",
  transition: "0.3s"
};

const cta = {
  background: "linear-gradient(135deg, #64FFDA, #00E5FF)",
  color: "#0A192F",
  border: "none",
  padding: "12px 22px",
  borderRadius: "10px",
  fontWeight: "600",
  cursor: "pointer"
};

export default Navbar;