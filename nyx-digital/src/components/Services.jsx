import { useState, useEffect } from "react";
import { useAuthContext } from "../components/AuthProvider";

function Services() {
  const { user } = useAuthContext();
  const [active, setActive] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState('frontend');
  const [selectedDomain, setSelectedDomain] = useState('free');
  const [selectedMaintenance, setSelectedMaintenance] = useState(0);

  // Reset scroll al cambiar de servicio
  const handleServiceClick = (service) => {
    setActive(service);
    // Resetear scroll al inicio del modal
    setTimeout(() => {
      const modalContent = document.querySelector('[data-modal-content="true"]');
      if (modalContent) {
        modalContent.scrollTop = 0;
      }
    }, 100);
  };

  // Servicios configurables por admin
  const defaultServices = [
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
      isPopular: true,
      visible: true
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
      isPopular: true,
      visible: true
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
      isPopular: true,
      visible: true
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
      isPopular: false,
      visible: true
    }
  ];

  // Cargar servicios configurados por admin o usar los por defecto
  const [services, setServices] = useState(() => {
    const savedServices = localStorage.getItem('adminServices');
    if (savedServices) {
      return JSON.parse(savedServices);
    }
    return defaultServices;
  });

  // Escuchar cambios en localStorage para actualización en tiempo real
  useEffect(() => {
    const handleStorageChange = () => {
      const savedServices = localStorage.getItem('adminServices');
      if (savedServices) {
        setServices(JSON.parse(savedServices));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('customStorageUpdate', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('customStorageUpdate', handleStorageChange);
    };
  }, []);

  // Filtrar solo servicios visibles
  const visibleServices = services.filter(service => service.visible !== false);

  // Precios configurables por admin
  const defaultPrices = {
    plans: {
      frontend: 150000,
      backend: 200000,
      fullstack: 300000
    },
    domains: {
      free: 0,
      custom: 50000
    },
    maintenance: 30000 // por mes
  };

  // Cargar precios configurados por admin o usar los por defecto
  const [prices, setPrices] = useState(() => {
    const savedPrices = localStorage.getItem('adminPrices');
    if (savedPrices) {
      return JSON.parse(savedPrices);
    }
    return defaultPrices;
  });

  // Escuchar cambios en precios
  useEffect(() => {
    const handlePriceChange = () => {
      const savedPrices = localStorage.getItem('adminPrices');
      if (savedPrices) {
        setPrices(JSON.parse(savedPrices));
      }
    };

    window.addEventListener('storage', handlePriceChange);
    window.addEventListener('customPriceUpdate', handlePriceChange);
    
    return () => {
      window.removeEventListener('storage', handlePriceChange);
      window.removeEventListener('customPriceUpdate', handlePriceChange);
    };
  }, []);

  // Calcular total
  const calculateTotal = () => {
    const planPrice = prices.plans[selectedPlan];
    const domainPrice = prices.domains[selectedDomain];
    const maintenancePrice = selectedMaintenance * prices.maintenance;
    return planPrice + domainPrice + maintenancePrice;
  };

  // Formatear precio en pesos colombianos
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <section id="servicios" style={{
      padding: "120px 40px",
      background: "linear-gradient(135deg, #112240, #0A192F)",
      textAlign: "center",
      position: "relative"
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto"
      }}>
        <h2 style={{
          fontSize: "clamp(2rem, 5vw, 3rem)",
          marginBottom: "20px",
          color: "#CCD6F6",
          fontWeight: "700",
          background: "linear-gradient(135deg, #CCD6F6, #64FFDA)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text"
        }}>Nuestros servicios</h2>
        <p style={{
          fontSize: "1.2rem",
          color: "#8892B0",
          marginBottom: "50px",
          maxWidth: "600px",
          margin: "0 auto 50px auto",
          lineHeight: "1.6"
        }}>Soluciones de desarrollo web profesionales para impulsar tu negocio</p>

        {/* Services Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "30px"
        }}>
          {visibleServices.map((service) => (
            <div 
              key={service._id} 
              style={{
                position: "relative",
                borderRadius: "20px",
                overflow: "hidden",
                cursor: "pointer",
                boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                transition: "all 0.3s ease",
                backgroundColor: "rgba(10,25,47,0.7)",
                backdropFilter: "blur(10px)",
                border: "1px solid #1f1f2e"
              }} 
              onClick={() => handleServiceClick(service)}
              className="fade-in"
            >
              {service.isPopular && (
                <div style={{
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
                }}>
                  Popular
                </div>
              )}
              
              <div style={{
                position: "relative",
                height: "200px",
                overflow: "hidden"
              }}>
                <img 
                  src={service.images?.[0]?.url} 
                  alt={service.images?.[0]?.alt}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.3s ease"
                  }}
                />
              </div>

              <div style={{
                padding: "20px"
              }}>
                <h3 style={{
                  fontSize: "1.3rem",
                  fontWeight: "600",
                  color: "#CCD6F6",
                  marginBottom: "10px"
                }}>{service.title}</h3>
                <p style={{
                  color: "#8892B0",
                  fontSize: "14px",
                  lineHeight: "1.5",
                  marginBottom: "15px"
                }}>{service.description}</p>
                
                <div style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                  marginBottom: "15px"
                }}>
                  {service.technologies?.map((tech, index) => (
                    <span key={index} style={{
                      background: "rgba(100,255,218,0.1)",
                      color: "#64FFDA",
                      padding: "4px 8px",
                      borderRadius: "12px",
                      fontSize: "11px",
                      fontWeight: "500"
                    }}>{tech}</span>
                  ))}
                </div>

                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                  <span style={{
                    fontSize: "12px",
                    color: "#8892B0"
                  }}>{service.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Modal */}
        {active && (
          <div style={{
            position: "fixed",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "1000",
            padding: "20px"
          }} onClick={() => setActive(null)}>
            <div style={{
              background: "rgba(10,25,47,0.95)",
              backdropFilter: "blur(10px)",
              borderRadius: "20px",
              maxWidth: "900px",
              width: "100%",
              height: "75vh",
              display: "flex",
              flexDirection: "column",
              border: "1px solid #1f1f2e",
              position: "relative"
            }} onClick={(e) => e.stopPropagation()}>
              
              {/* Botón de cerrar flotante */}
              <button 
                style={{
                  position: "absolute",
                  top: "15px",
                  right: "15px",
                  background: "rgba(10,25,47,0.9)",
                  border: "1px solid rgba(100,255,218,0.3)",
                  borderRadius: "50%",
                  width: "45px",
                  height: "45px",
                  cursor: "pointer",
                  fontSize: "24px",
                  color: "#64FFDA",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.3s ease",
                  zIndex: "200",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.3)"
                }} 
                onClick={() => setActive(null)}
                onMouseOver={(e) => {
                  e.target.style.background = "rgba(231, 76, 60, 0.9)";
                  e.target.style.borderColor = "#e74c3c";
                  e.target.style.color = "#ffffff";
                  e.target.style.transform = "scale(1.1)";
                }}
                onMouseOut={(e) => {
                  e.target.style.background = "rgba(10,25,47,0.9)";
                  e.target.style.borderColor = "rgba(100,255,218,0.3)";
                  e.target.style.color = "#64FFDA";
                  e.target.style.transform = "scale(1)";
                }}
              >
                ×
              </button>

              {/* Header simplificado sin botón */}
              <div style={{
                position: "absolute",
                top: "0",
                left: "0",
                right: "0",
                background: "rgba(10,25,47,0.98)",
                backdropFilter: "blur(10px)",
                padding: "15px 25px",
                borderBottom: "1px solid #1f1f2e",
                zIndex: "50",
                borderRadius: "20px 20px 0 0"
              }}>
                <h2 style={{
                  fontSize: "1.8rem",
                  color: "#CCD6F6",
                  fontWeight: "600",
                  margin: "0",
                  textAlign: "center"
                }}>{active.title}</h2>
              </div>
              
              {/* Contenido scrollable */}
              <div style={{
                flex: 1,
                overflowY: "auto",
                padding: "15px",
                paddingTop: "70px", // Espacio para el header absoluto
                paddingBottom: "80px" // Espacio para el footer absoluto
              }} data-modal-content="true">
                <div style={{
                  display: "flex",
                  gap: "30px",
                  marginBottom: "30px"
                }}>
                  <div style={{
                    flex: "1",
                    minWidth: "300px"
                  }}>
                    <img 
                      src={active.images?.[0]?.url} 
                      alt={active.images?.[0]?.alt}
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                        borderRadius: "15px"
                      }}
                    />
                  </div>
                  
                  <div style={{
                    flex: "2"
                  }}>
                    <p style={{
                      fontSize: "1.1rem",
                      color: "#8892B0",
                      lineHeight: "1.6",
                      marginBottom: "25px"
                    }}>{active.longDescription}</p>
                    
                    <div style={{
                      marginBottom: "25px"
                    }}>
                      <h4 style={{
                        fontSize: "1.2rem",
                        color: "#64FFDA",
                        fontWeight: "600",
                        marginBottom: "15px"
                      }}>Características</h4>
                      <ul style={{
                        listStyle: "none",
                        padding: "0",
                        margin: "0"
                      }}>
                        {active.features.map((feature, index) => (
                          <li key={index} style={{
                            fontSize: "1rem",
                            color: "#CCD6F6",
                            marginBottom: "12px",
                            paddingLeft: "20px",
                            position: "relative"
                          }}>
                            <span style={{
                              position: "absolute",
                              left: "0",
                              color: "#64FFDA"
                            }}></span>
                            <strong>{feature.title}:</strong> {feature.description}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div style={{
                      marginBottom: "25px"
                    }}>
                      <h4 style={{
                        fontSize: "1.1rem",
                        color: "#8892B0",
                        marginBottom: "10px"
                      }}>Tecnologías:</h4>
                      <div style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "8px"
                      }}>
                        {active.technologies?.map((tech, index) => (
                          <span key={index} style={{
                            background: "rgba(100,255,218,0.1)",
                            color: "#64FFDA",
                            padding: "6px 12px",
                            borderRadius: "12px",
                            fontSize: "12px",
                            fontWeight: "500"
                          }}>{tech}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Opciones de configuración */}
                <div style={{
                  background: "rgba(17,34,64,0.5)",
                  borderRadius: "15px",
                  padding: "25px",
                  marginBottom: "30px",
                  border: "1px solid #1f1f2e"
                }}>
                  <h3 style={{
                    color: "#CCD6F6",
                    fontSize: "1.3rem",
                    marginBottom: "20px",
                    textAlign: "center"
                  }}>Configura tu proyecto</h3>
                  
                  {/* Plan */}
                  <div style={{ marginBottom: "25px" }}>
                    <label style={{
                      display: "block",
                      color: "#8892B0",
                      marginBottom: "10px",
                      fontSize: "1rem"
                    }}>Selecciona un plan:</label>
                    <div style={{
                      display: "flex",
                      gap: "15px",
                      flexWrap: "wrap"
                    }}>
                      {[
                        { value: 'frontend', label: 'Frontend', price: user ? formatPrice(prices.plans.frontend) : 'Iniciar sesión' },
                        { value: 'backend', label: 'Backend', price: user ? formatPrice(prices.plans.backend) : 'Iniciar sesión' },
                        { value: 'fullstack', label: 'Frontend + Backend', price: user ? formatPrice(prices.plans.fullstack) : 'Iniciar sesión' }
                      ].map((plan) => (
                        <button
                          key={plan.value}
                          onClick={() => setSelectedPlan(plan.value)}
                          style={{
                            padding: "12px 20px",
                            border: selectedPlan === plan.value ? "2px solid #64FFDA" : "1px solid #1f1f2e",
                            borderRadius: "10px",
                            background: selectedPlan === plan.value ? "rgba(100,255,218,0.1)" : "rgba(17,34,64,0.5)",
                            color: selectedPlan === plan.value ? "#64FFDA" : "#CCD6F6",
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                            fontSize: "14px"
                          }}
                        >
                          <div>{plan.label}</div>
                          <div style={{ fontSize: "12px", opacity: 0.8 }}>{plan.price}</div>
                        </button>
                      ))}
                    </div>
                    <p style={{
                      color: "#8892B0",
                      fontSize: "0.9rem",
                      marginTop: "8px",
                      fontStyle: "italic"
                    }}>
                      Incluye desarrollo completo, documentación y despliegue.
                    </p>
                  </div>
                  
                  {/* Dominio */}
                  <div style={{ marginBottom: "25px" }}>
                    <label style={{
                      display: "block",
                      color: "#8892B0",
                      marginBottom: "10px",
                      fontSize: "1rem"
                    }}>Tipo de dominio:</label>
                    <div style={{
                      display: "flex",
                      gap: "15px"
                    }}>
                      {[
                        { value: 'free', label: 'Dominio gratis', price: user ? formatPrice(prices.domains.free) : 'Iniciar sesión' },
                        { value: 'custom', label: 'Dominio personalizado', price: user ? formatPrice(prices.domains.custom) : 'Iniciar sesión' }
                      ].map((domain) => (
                        <button
                          key={domain.value}
                          onClick={() => setSelectedDomain(domain.value)}
                          style={{
                            padding: "12px 20px",
                            border: selectedDomain === domain.value ? "2px solid #64FFDA" : "1px solid #1f1f2e",
                            borderRadius: "10px",
                            background: selectedDomain === domain.value ? "rgba(100,255,218,0.1)" : "rgba(17,34,64,0.5)",
                            color: selectedDomain === domain.value ? "#64FFDA" : "#CCD6F6",
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                            fontSize: "14px"
                          }}
                        >
                          <div>{domain.label}</div>
                          <div style={{ fontSize: "12px", opacity: 0.8 }}>{domain.price}</div>
                        </button>
                      ))}
                    </div>
                    <p style={{
                      color: "#8892B0",
                      fontSize: "0.9rem",
                      marginTop: "8px",
                      fontStyle: "italic"
                    }}>
                      Publicación sin costo con plataformas modernas.
                    </p>
                  </div>
                  
                  {/* Mantenimiento */}
                  <div style={{ marginBottom: "25px" }}>
                    <label style={{
                      display: "block",
                      color: "#8892B0",
                      marginBottom: "10px",
                      fontSize: "1rem"
                    }}>Mantenimiento (opcional):</label>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "15px"
                    }}>
                      <button
                        onClick={() => setSelectedMaintenance(Math.max(0, selectedMaintenance - 1))}
                        style={{
                          width: "35px",
                          height: "35px",
                          border: "1px solid #1f1f2e",
                          borderRadius: "50%",
                          background: "rgba(17,34,64,0.5)",
                          color: "#CCD6F6",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "18px",
                          transition: "all 0.3s ease"
                        }}
                      >
                        -
                      </button>
                      <div style={{
                        color: "#CCD6F6",
                        fontSize: "16px",
                        minWidth: "100px",
                        textAlign: "center"
                      }}>
                        {selectedMaintenance} {selectedMaintenance === 1 ? 'mes' : 'meses'}
                        <div style={{ fontSize: "12px", opacity: 0.8 }}>
                          {selectedMaintenance > 0 ? (user ? formatPrice(selectedMaintenance * prices.maintenance) : 'Iniciar sesión') : 'Gratis'}
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedMaintenance(selectedMaintenance + 1)}
                        style={{
                          width: "35px",
                          height: "35px",
                          border: "1px solid #1f1f2e",
                          borderRadius: "50%",
                          background: "rgba(17,34,64,0.5)",
                          color: "#CCD6F6",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "18px",
                          transition: "all 0.3s ease"
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Footer sticky con total y botón */}
              <div style={{
                position: "absolute",
                bottom: "0",
                left: "0",
                right: "0",
                background: "rgba(10,25,47,0.98)",
                backdropFilter: "blur(10px)",
                padding: "12px 20px",
                borderTop: "1px solid #1f1f2e",
                zIndex: "100",
                borderRadius: "0 0 20px 20px"
              }}>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                  <div>
                    <div style={{
                      color: "#8892B0",
                      fontSize: "0.9rem"
                    }}>Total estimado:</div>
                    <div style={{
                      color: "#64FFDA",
                      fontSize: "1.5rem",
                      fontWeight: "600"
                    }}>{user ? formatPrice(calculateTotal()) : 'Iniciar sesión para ver precio'}</div>
                  </div>
                  <button 
                    style={{
                      background: "linear-gradient(135deg, #64FFDA, #00E5FF)",
                      color: "#0A192F",
                      padding: "15px 40px",
                      borderRadius: "10px",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "1.1rem",
                      fontWeight: "600",
                      transition: "all 0.3s ease",
                      boxShadow: "0 4px 15px rgba(100,255,218,0.3)"
                    }} 
                    onClick={() => {
                      const message = `Hola%20Nyx%20Digital,%20estoy%20interesado%20en%20${encodeURIComponent(active.title)}.%0A%0ADetalles%20de%20mi%20cotización:%0A- Plan:%20${selectedPlan}%0A- Dominio:%20${selectedDomain}%0A- Mantenimiento:%20${selectedMaintenance}%20mes(es)%0A- Total:%20${formatPrice(calculateTotal())}%0A%0A¿Podemos%20hablar%20ahora?`;
                      window.location.href = `https://wa.me/573028359211?text=${message}`;
                      setActive(null);
                    }}
                    onMouseOver={(e) => {
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow = "0 6px 20px rgba(100,255,218,0.4)";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow = "0 4px 15px rgba(100,255,218,0.3)";
                    }}
                  >
                    Contactar por WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

//////////////////////////////////////////////////////////////
// 🎨 ESTILOS MEJORADOS
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
  marginBottom: "50px",
  maxWidth: "600px",
  margin: "0 auto 50px auto",
  lineHeight: "1.6"
};

// Filter styles
const filterContainer = {
  marginBottom: "50px",
  display: "flex",
  flexDirection: "column",
  gap: "20px"
};

const searchContainer = {
  maxWidth: "400px",
  margin: "0 auto"
};

const searchInput = {
  width: "100%",
  padding: "12px 20px",
  borderRadius: "25px",
  border: "1px solid #1f1f2e",
  backgroundColor: "rgba(17,34,64,0.5)",
  color: "#CCD6F6",
  fontSize: "14px",
  outline: "none",
  transition: "all 0.3s ease"
};

const categoryFilters = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  gap: "10px"
};

const filterBtn = {
  padding: "8px 16px",
  borderRadius: "20px",
  border: "1px solid #1f1f2e",
  backgroundColor: "rgba(17,34,64,0.5)",
  color: "#8892B0",
  fontSize: "14px",
  cursor: "pointer",
  transition: "all 0.3s ease"
};

const filterBtnActive = {
  backgroundColor: "linear-gradient(135deg, #64FFDA, #00E5FF)",
  color: "#0A192F",
  borderColor: "#64FFDA"
};

// Grid and card styles
const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
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
  borderColor: "#64FFDA",
  boxShadow: "0 10px 40px rgba(100,255,218,0.2)"
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

const priceOverlay = {
  position: "absolute",
  bottom: "0",
  left: "0",
  right: "0",
  background: "linear-gradient(transparent, rgba(10,25,47,0.9))",
  padding: "15px"
};

const priceText = {
  color: "#64FFDA",
  fontSize: "14px",
  fontWeight: "600"
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

const timeline = {
  color: "#8892B0",
  fontSize: "12px"
};

const category = {
  background: "rgba(204,214,246,0.1)",
  color: "#CCD6F6",
  padding: "4px 8px",
  borderRadius: "12px",
  fontSize: "11px",
  textTransform: "capitalize"
};

// Enhanced modal styles
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
  marginBottom: "30px",
  borderRadius: "15px",
  overflow: "hidden"
};

const modalImage = {
  width: "100%",
  height: "300px",
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

const featuresSection = {
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
  borderBottom: "1px solid rgba(31,31,46,0.5)",
  fontSize: "14px"
};

const modalMeta = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
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
  width: "100%"
};

const errorContainer = {
  textAlign: "center",
  padding: "60px 20px",
  color: "#e74c3c"
};

// Hover effects
const hoverStyles = `
  .${card}:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(100,255,218,0.3);
  }
  
  .${card}:hover .${img} {
    transform: scale(1.05);
  }
  
  .${filterBtn}:hover {
    background: rgba(100,255,218,0.1);
    color: #64FFDA;
  }
  
  .${closeBtn}:hover {
    background: rgba(100,255,218,0.1);
    color: #64FFDA;
  }
  
  .${ctaBtn}:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(100,255,218,0.4);
  }
  
  .${searchInput}:focus {
    border-color: #64FFDA;
    box-shadow: 0 0 0 2px rgba(100,255,218,0.2);
  }
`;

// Responsive styles
const responsiveStyles = `
  @media (max-width: 768px) {
    .${grid} {
      grid-template-columns: 1fr !important;
      gap: 20px;
    }
    
    .${filterContainer} {
      gap: 15px;
    }
    
    .${categoryFilters} {
      justify-content: center;
    }
    
    .${modal} {
      margin: 10px;
      max-height: 95vh;
    }
    
    .${modalContent} {
      padding: 20px;
    }
    
    .${modalImage} {
      height: 200px;
    }
    
    .${modalMeta} {
      grid-template-columns: 1fr;
    }
  }
  
  @media (max-width: 480px) {
    .${section} {
      padding: 80px 20px;
    }
    
    .${title} {
      font-size: 2rem;
    }
    
    .${subtitle} {
      font-size: 1rem;
    }
  }
`;

export default Services;
