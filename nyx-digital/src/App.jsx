import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ServicesPage from "./pages/ServicesPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import TrabajemosPage from "./pages/TrabajemosPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/servicios" element={<ServicesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contacto" element={<ContactPage />} />
        <Route path="/trabajemos" element={<TrabajemosPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;