import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import AuditTracker from "./components/AuditTracker";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SecretAdminLogin from "./pages/SecretAdminLogin";
import ProfilePage from "./pages/ProfilePage";
import ServicesPage from "./pages/ServicesPage";
import ProjectsPage from "./pages/ProjectsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import TrabajemosPage from "./pages/TrabajemosPage";
import AdminDashboard from "./pages/AdminDashboard";
import MockupEcommerce from "./pages/MockupEcommerce";
import MockupBanking from "./pages/MockupBanking";
import MockupFitness from "./pages/MockupFitness";
import { AuthProvider } from "./components/AuthProvider";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  // Add pulse animation keyframes
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.1); opacity: 0.8; }
      }
    `;
    document.head.appendChild(style);
  }, []);
  return (
    <BrowserRouter>
      <AuthProvider>
        <AuditTracker />
        <Navbar />
        
        {/* WhatsApp Floating Button */}
        <a
          href="https://wa.me/573028359211"
          target="_blank"
          rel="noreferrer"
          style={{
            position: "fixed",
            bottom: "30px",
            right: "30px",
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #25D366, #128C7E)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "30px",
            boxShadow: "0 4px 20px rgba(37, 211, 102, 0.4)",
            zIndex: 1000,
            textDecoration: "none",
            animation: "pulse 2s ease-in-out infinite"
          }}
        >
          💬
        </a>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nyx-admin-portal-2024" element={<SecretAdminLogin />} />
          <Route path="/servicios" element={<ServicesPage />} />
          <Route path="/proyectos" element={<ProjectsPage />} />
          <Route path="/nosotros" element={<AboutPage />} />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="/trabajemos" element={<TrabajemosPage />} />
          
          <Route path="/profile" element={
            <ProtectedRoute adminOnly>
              <ProfilePage />
            </ProtectedRoute>
          } />
          
          <Route path="/admin" element={
            <ProtectedRoute adminOnly>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          
          {/* Mockup Pages */}
          <Route path="/mockup-ecommerce" element={<MockupEcommerce />} />
          <Route path="/mockup-banking" element={<MockupBanking />} />
          <Route path="/mockup-fitness" element={<MockupFitness />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
