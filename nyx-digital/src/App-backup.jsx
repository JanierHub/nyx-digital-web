import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ServicesPage from "./pages/ServicesPage";
import ProjectsPage from "./pages/ProjectsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import TrabajemosPage from "./pages/TrabajemosPage";
import AdminDashboard from "./pages/AdminDashboard";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import MockupEcommerce from "./pages/MockupEcommerce";
import MockupBanking from "./pages/MockupBanking";
import MockupFitness from "./pages/MockupFitness";
import TestPage from "./pages/TestPage";
import { AuthProvider } from "./components/AuthProvider";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servicios" element={<ServicesPage />} />
          <Route path="/proyectos" element={<ProjectsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="/trabajemos" element={
            <ProtectedRoute>
              <TrabajemosPage />
            </ProtectedRoute>
          } />
          <Route path="/login" element={<LoginPage />} />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute adminOnly>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="/test" element={<TestPage />} />
          <Route path="/mockup-ecommerce" element={<MockupEcommerce />} />
          <Route path="/mockup-banking" element={<MockupBanking />} />
          <Route path="/mockup-fitness" element={<MockupFitness />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;