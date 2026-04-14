import { useState } from "react";

function Services() {
  const [active, setActive] = useState(null);

  // Servicios reales de desarrollo web
  const services = [
    {
      _id: '1',
      title: "Desarrollo Frontend",
      slug: "desarrollo-frontend",
      description: "Interfaces modernas, rápidas y responsivas que encantan a los usuarios",
      longDescription: "Desarrollo la parte visual de tu aplicación web con las tecnologías más modernas. Me aseguro que se vea perfecta en todos los dispositivos, cargue rápido y ofrezca una experiencia increíble para tus usuarios.",
      category: "development",
      technologies: ["React", "Vue.js", "Next.js", "TailwindCSS"],
      images: [{ url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c", alt: "Desarrollo Frontend", isMain: true }],
      features: [
        { title: "Diseño 100% Responsivo", description: "Funciona perfecto en celulares, tablets y computadoras" },
        { title: "Rendimiento Optimizado", description: "Carga rápida para mejor experiencia y SEO" },
        { title: "UX/UX Moderno", description: "Interfaces intuitivas y atractivas" }
      ],
      isPopular: true
    },
    {
      _id: '2',
      title: "Desarrollo Backend",
      slug: "desarrollo-backend",
      description: "Sistemas robustos, seguros y escalables que hacen funcionar tu negocio",
      longDescription: "Construyo la estructura detrás de tu aplicación web. APIs, bases de datos, autenticación y toda la lógica que necesita tu sistema para funcionar de manera segura y eficiente.",
      category: "development",
      technologies: ["Node.js", "Express", "MongoDB", "PostgreSQL"],
      images: [{ url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71", alt: "Desarrollo Backend", isMain: true }],
      features: [
        { title: "APIs RESTful", description: "Conexiones seguras y eficientes entre sistemas" },
        { title: "Base de Datos Optimizada", description: "Información organizada y accesible rápidamente" },
        { title: "Seguridad Garantizada", description: "Protección de datos y usuarios" }
      ],
      isPopular: true
    },
    {
      _id: '3',
      title: "Desarrollo Full-Stack",
      slug: "desarrollo-fullstack",
      description: "Aplicaciones completas desde el diseño hasta el despliegue",
      longDescription: "Te entrego una solución completa: desarrollo frontend, backend, integración de bases de datos y despliegue. Una aplicación web lista para usar y funcionando en producción.",
      category: "development",
      technologies: ["React", "Node.js", "MongoDB", "Docker"],
      images: [{ url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085", alt: "Desarrollo Full-Stack", isMain: true }],
      features: [
        { title: "Solución Completa", description: "Todo lo que necesitas en un solo proyecto" },
        { title: "Integración Perfecta", description: "Frontend y backend trabajando juntos" },
        { title: "Listo para Producción", description: "Desplegado y funcionando desde el primer día" }
      ],
      isPopular: true
    },
    {
      _id: '4',
      title: "Servicio de Despliegue",
      slug: "servicio-despliegue",
      description: "Tu aplicación web funcionando en internet, sin complicaciones técnicas",
      longDescription: "Me encargo de poner tu aplicación web en internet. Configuro hosting, dominios, certificados SSL y todo lo necesario para que tu sitio esté accesible para todo el mundo. Incluyo opciones gratuitas y de pago según tus necesidades.",
      category: "deployment",
      technologies: ["Vercel", "Netlify", "AWS", "DigitalOcean"],
      images: [{ url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6", alt: "Servicio de Despliegue", isMain: true }],
      features: [
        { title: "Opciones Gratuitas", description: "Despliegue sin costo mensual usando plataformas gratuitas" },
        { title: "Configuración Profesional", description: "Dominio, SSL y optimización incluidos" },
        { title: "Mantenimiento", description: "Soporte continuo para que todo funcione perfecto" }
      ],
      isPopular: false
    }
  ];

  return (
    <section id="servicios" style={section}>
      <div style={container}>
        <h2 style={title}>Nuestros servicios</h2>
        <p style={subtitle}>
          Soluciones de desarrollo web profesionales para impulsar tu negocio
        </p>

        {/* Services Grid */}
        <div style={grid}>
          {services.map((service) => (
            <div 
              key={service._id} 
              style={{...card, ...(service.isPopular ? cardPopular : {})}} 
              onClick={() => setActive(service)}
              className="fade-in"
            >
              {service.isPopular && (
                <div style={popularBadge}>
                  Popular
                </div>
              )}
              
              <div style={imageContainer}>
                <img 
                  src={service.images?.[0]?.url || service.img} 
                  alt={service.images?.[0]?.alt || service.title}
                  style={img} 
                />
              </div>

              <div style={content}>
                <h3 style={serviceTitle}>{service.title}</h3>
                <p style={serviceDesc}>{service.description}</p>
                
                <div style={techStack}>
                  {service.technologies?.slice(0, 3).map((tech, index) => (
                    <span key={index} style={techBadge}>{tech}</span>
                  ))}
                </div>

                <div style={metaInfo}>
                  <span style={category}>{service.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Modal */}
      {active && (
        <div style={modalBg} onClick={() => setActive(null)}>
          <div style={modal} onClick={(e) => e.stopPropagation()}>
            <div style={modalHeader}>
              <h2 style={modalTitle}>{active.title}</h2>
              <button 
                style={closeBtn} 
                onClick={() => setActive(null)}
              >
                ×
              </button>
            </div>
            
            <div style={modalContent}>
              <div style={modalImageContainer}>
                <img 
                  src={active.images?.[0]?.url} 
                  alt={active.images?.[0]?.alt}
                  style={modalImage}
                />
              </div>
              
              <div style={modalInfo}>
                <p style={modalDesc}>{active.longDescription}</p>
                
                {active.features && active.features.length > 0 && (
                  <div style={featuresContainer}>
                    <h4 style={featuresTitle}>Características</h4>
                    <ul style={featuresList}>
                      {active.features.map((feature, index) => (
                        <li key={index} style={featureItem}>
                          <strong>{feature.title}:</strong> {feature.description}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div style={modalMeta}>
                  <div style={metaItem}>
                    <span style={metaLabel}>Tecnologías:</span>
                    <div style={modalTechStack}>
                      {active.technologies?.map((tech, index) => (
                        <span key={index} style={modalTechBadge}>{tech}</span>
                      ))}
                    </div>
                  </div>
                  <div style={metaItem}>
                    <span style={metaLabel}>Categoría:</span>
                    <span style={metaValue}>{active.category}</span>
                  </div>
                </div>
                
                <button 
                  style={ctaBtn}
                  onClick={() => {
                    window.location.href = "https://wa.me/573028359211?text=Hola%20Nyx%20Digital,%20estoy%20interesado%20en%20el%20servicio%20de%20" + encodeURIComponent(active.title);
                    setActive(null);
                  }}
                >
                  ð Cotizar este servicio
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

//////////////////////////////////////////////////////////////
// ð ESTILOS
//////////////////////////////////////////////////////////////

const section = {
  padding: "120px 40px",
  background: "linear-gradient(135deg, #112240, #0A192F)",
  textAlign: "center",
  position: "relative"
};

const container = {
  maxWidth: "1200px",
  margin: "0 auto"
};

const title = {
  fontSize: "clamp(2rem, 5vw, 3rem)",
  marginBottom: "20px",
  color: "#CCD6F6",
  fontWeight: "700",
  background: "linear-gradient(135deg, #CCD6F6, #64FFDA)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text"
};

const subtitle = {
  fontSize: "1.2rem",
  color: "#8892B0",
  marginBottom: "60px",
  maxWidth: "700px",
  margin: "0 auto 60px auto",
  lineHeight: "1.6"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
  gap: "30px"
};

const card = {
  position: "relative",
  borderRadius: "20px",
  overflow: "hidden",
  cursor: "pointer",
  boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
  transition: "all 0.3s ease",
  backgroundColor: "rgba(10,25,47,0.7)",
  backdropFilter: "blur(10px)",
  border: "1px solid #1f1f2e"
};

const cardPopular = {
  border: "2px solid #64FFDA",
  boxShadow: "0 15px 40px rgba(100,255,218,0.3)"
};

const popularBadge = {
  position: "absolute",
  top: "15px",
  right: "15px",
  background: "linear-gradient(135deg, #64FFDA, #00E5FF)",
  color: "#0A192F",
  padding: "5px 12px",
  borderRadius: "15px",
  fontSize: "12px",
  fontWeight: "600",
  zIndex: "2"
};

const imageContainer = {
  position: "relative",
  height: "200px",
  overflow: "hidden"
};

const img = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transition: "transform 0.3s ease"
};

const content = {
  padding: "20px"
};

const serviceTitle = {
  fontSize: "1.3rem",
  fontWeight: "600",
  color: "#CCD6F6",
  marginBottom: "10px"
};

const serviceDesc = {
  color: "#8892B0",
  fontSize: "14px",
  lineHeight: "1.5",
  marginBottom: "15px"
};

const techStack = {
  display: "flex",
  flexWrap: "wrap",
  gap: "8px",
  marginBottom: "15px"
};

const techBadge = {
  background: "rgba(100,255,218,0.1)",
  color: "#64FFDA",
  padding: "4px 8px",
  borderRadius: "12px",
  fontSize: "11px",
  fontWeight: "500"
};

const metaInfo = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
};

const category = {
  background: "rgba(204,214,246,0.1)",
  color: "#CCD6F6",
  padding: "4px 8px",
  borderRadius: "12px",
  fontSize: "11px",
  textTransform: "capitalize"
};

// Modal styles
const modalBg = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.8)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: "1000",
  padding: "20px"
};

const modal = {
  background: "rgba(10,25,47,0.95)",
  backdropFilter: "blur(10px)",
  borderRadius: "20px",
  maxWidth: "800px",
  width: "100%",
  maxHeight: "90vh",
  overflow: "auto",
  border: "1px solid #1f1f2e"
};

const modalHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "30px 30px 0",
  borderBottom: "1px solid #1f1f2e",
  paddingBottom: "20px"
};

const modalTitle = {
  fontSize: "1.8rem",
  color: "#CCD6F6",
  fontWeight: "600",
  margin: "0"
};

const closeBtn = {
  background: "none",
  border: "none",
  color: "#8892B0",
  fontSize: "24px",
  cursor: "pointer",
  padding: "5px",
  borderRadius: "50%",
  transition: "all 0.3s ease"
};

const modalContent = {
  padding: "30px"
};

const modalImageContainer = {
  position: "relative",
  marginBottom: "30px",
  borderRadius: "15px",
  overflow: "hidden"
};

const modalImage = {
  width: "100%",
  height: "400px",
  objectFit: "cover"
};

const modalInfo = {
  color: "#CCD6F6"
};

const modalDesc = {
  fontSize: "16px",
  lineHeight: "1.6",
  marginBottom: "30px",
  color: "#8892B0"
};

const featuresContainer = {
  marginBottom: "30px"
};

const featuresTitle = {
  fontSize: "1.2rem",
  color: "#64FFDA",
  marginBottom: "15px"
};

const featuresList = {
  listStyle: "none",
  padding: "0",
  margin: "0"
};

const featureItem = {
  padding: "8px 0",
  borderBottom: "1px solid rgba(100,255,218,0.2)",
  color: "#CCD6F6",
  fontSize: "14px"
};

const modalMeta = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "20px",
  marginBottom: "30px"
};

const metaItem = {
  padding: "15px",
  background: "rgba(17,34,64,0.5)",
  borderRadius: "10px",
  border: "1px solid #1f1f2e"
};

const metaLabel = {
  display: "block",
  fontSize: "12px",
  color: "#8892B0",
  marginBottom: "5px"
};

const metaValue = {
  fontSize: "16px",
  color: "#CCD6F6",
  fontWeight: "600"
};

const modalTechStack = {
  display: "flex",
  flexWrap: "wrap",
  gap: "8px"
};

const modalTechBadge = {
  background: "rgba(100,255,218,0.1)",
  color: "#64FFDA",
  padding: "6px 12px",
  borderRadius: "12px",
  fontSize: "12px",
  fontWeight: "500"
};

const ctaBtn = {
  background: "linear-gradient(135deg, #64FFDA, #00E5FF)",
  color: "#0A192F",
  border: "none",
  padding: "14px 28px",
  borderRadius: "10px",
  fontSize: "16px",
  fontWeight: "600",
  cursor: "pointer",
  transition: "all 0.3s ease",
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  gap: "8px"
};

export default Services;
