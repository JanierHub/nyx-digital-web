import { useState, useEffect } from "react";
import { quoteDB } from "../utils/database";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('contacts');
  const [selectedContact, setSelectedContact] = useState(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [noteContent, setNoteContent] = useState('');

  // Estados para administración de precios y servicios
  const [prices, setPrices] = useState({
    plans: {
      frontend: 150000,
      backend: 200000,
      fullstack: 300000
    },
    domains: {
      free: 0,
      custom: 50000
    },
    maintenance: 30000
  });
  
  const [services, setServices] = useState([
    { id: 1, title: "Desarrollo Frontend", slug: "desarrollo-frontend", visible: true },
    { id: 2, title: "Desarrollo Backend", slug: "desarrollo-backend", visible: true },
    { id: 3, title: "Desarrollo Full-Stack", slug: "desarrollo-fullstack", visible: true },
    { id: 4, title: "Servicio de Despliegue", slug: "servicio-despliegue", visible: true }
  ]);
  
  const [projects, setProjects] = useState([
    { 
      id: 1, 
      title: "Plataforma E-Commerce", 
      slug: "ecommerce-platform",
      description: "Tienda online moderna con dashboard administrativo",
      longDescription: "Plataforma de comercio electrónico completa con gestión de inventario, pasarela de pago y análisis en tiempo real.",
      category: "development",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      featured: true,
      visible: true,
      mockupPath: "/mockup-ecommerce",
      icon: "ð",
      color: "#FF6B6B"
    },
    { 
      id: 2, 
      title: "App de Banca Móvil", 
      slug: "mobile-banking-app",
      description: "Aplicación bancaria segura y moderna",
      longDescription: "Aplicación móvil de banca completa con biometría, transferencias instantáneas y gestión financiera.",
      category: "development",
      technologies: ["React Native", "Firebase", "Node.js"],
      featured: true,
      visible: true,
      mockupPath: "/mockup-banking",
      icon: "ð",
      color: "#4ECDC4"
    },
    { 
      id: 3, 
      title: "App de Fitness Tracking", 
      slug: "fitness-tracker-app",
      description: "Seguimiento personal de entrenamiento y salud",
      longDescription: "Aplicación móvil de fitness con planes personalizados, seguimiento de progreso y comunidad integrada.",
      category: "development",
      technologies: ["Flutter", "Firebase", "Node.js"],
      featured: true,
      visible: true,
      mockupPath: "/mockup-fitness",
      icon: "ð",
      color: "#FFD93D"
    }
  ]);
  
  const [newProject, setNewProject] = useState({ 
    title: "", 
    slug: "", 
    description: "",
    longDescription: "",
    category: "development",
    technologies: [],
    featured: false,
    visible: true,
    icon: "ð",
    color: "#64FFDA"
  });
  const [editingProject, setEditingProject] = useState(null);
  
  const [newService, setNewService] = useState({ title: "", slug: "", visible: true });
  const [editingPrice, setEditingPrice] = useState(null);

  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar cotizaciones al montar
  useEffect(() => {
    loadQuotes();
  }, []);

  const loadQuotes = () => {
    setLoading(true);
    try {
      const allQuotes = quoteDB.getAll();
      setQuotes(allQuotes);
      setError(null);
    } catch (err) {
      setError('Error al cargar cotizaciones');
      console.error('Error loading quotes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleContactClick = (quote) => {
    setSelectedContact(quote);
    setShowContactModal(true);
  };

  const handleStatusUpdate = async (quoteId, newStatus) => {
    try {
      await quoteDB.updateStatus(quoteId, newStatus);
      loadQuotes(); // Refresh list
    } catch (error) {
      console.error('Error updating quote status:', error);
    }
  };

  const handleAddNote = async () => {
    if (!selectedContact || !noteContent.trim()) return;

    // En una implementación real, esto añadiría notas a las cotizaciones
    setNoteContent('');
    loadQuotes(); // Refresh
  };

  // Funciones para administración de precios
  const handlePriceUpdate = (priceType, newPrice) => {
    const updatedPrices = { ...prices };
    
    // Manejar actualización anidada para propiedades como 'plans.frontend'
    const keys = priceType.split('.');
    let current = updatedPrices;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current[keys[i]] = { ...current[keys[i]] };
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = parseInt(newPrice) || 0;
    
    setPrices(updatedPrices);
    // Guardar en localStorage para persistencia
    localStorage.setItem('adminPrices', JSON.stringify(updatedPrices));
    // Disparar evento para actualizar el frontend
    window.dispatchEvent(new CustomEvent('customPriceUpdate'));
  };

  // Funciones para administración de servicios
  const toggleServiceVisibility = (serviceId) => {
    const updatedServices = services.map(service => 
      service.id === serviceId ? { ...service, visible: !service.visible } : service
    );
    setServices(updatedServices);
    localStorage.setItem('adminServices', JSON.stringify(updatedServices));
    // Disparar evento para actualizar el frontend
    window.dispatchEvent(new CustomEvent('customStorageUpdate'));
  };

  const addNewService = () => {
    if (newService.title && newService.slug) {
      const updatedServices = [...services, {
        id: Date.now(),
        title: newService.title,
        slug: newService.slug,
        visible: newService.visible
      }];
      setServices(updatedServices);
      localStorage.setItem('adminServices', JSON.stringify(updatedServices));
      setNewService({ title: "", slug: "", visible: true });
      // Disparar evento para actualizar el frontend
      window.dispatchEvent(new CustomEvent('customStorageUpdate'));
    }
  };

  const removeService = (serviceId) => {
    const updatedServices = services.filter(service => service.id !== serviceId);
    setServices(updatedServices);
    localStorage.setItem('adminServices', JSON.stringify(updatedServices));
    // Disparar evento para actualizar el frontend
    window.dispatchEvent(new CustomEvent('customStorageUpdate'));
  };

  // Funciones para administración de proyectos
  const toggleProjectVisibility = (projectId) => {
    const updatedProjects = projects.map(project => 
      project.id === projectId ? { ...project, visible: !project.visible } : project
    );
    setProjects(updatedProjects);
    localStorage.setItem('adminProjects', JSON.stringify(updatedProjects));
    // Disparar evento para actualizar el frontend
    window.dispatchEvent(new CustomEvent('customProjectUpdate'));
  };

  const addNewProject = () => {
    if (newProject.title && newProject.slug) {
      const updatedProjects = [...projects, {
        id: Date.now(),
        ...newProject,
        mockupPath: `/mockup-${newProject.slug}`,
        sortOrder: projects.length + 1
      }];
      setProjects(updatedProjects);
      localStorage.setItem('adminProjects', JSON.stringify(updatedProjects));
      setNewProject({ 
        title: "", 
        slug: "", 
        description: "",
        longDescription: "",
        category: "development",
        technologies: [],
        featured: false,
        visible: true,
        icon: "ð",
        color: "#64FFDA"
      });
      // Disparar evento para actualizar el frontend
      window.dispatchEvent(new CustomEvent('customProjectUpdate'));
    }
  };

  const editProject = (project) => {
    setEditingProject(project);
  };

  const updateProject = () => {
    if (editingProject) {
      const updatedProjects = projects.map(project => 
        project.id === editingProject.id ? editingProject : project
      );
      setProjects(updatedProjects);
      localStorage.setItem('adminProjects', JSON.stringify(updatedProjects));
      setEditingProject(null);
      // Disparar evento para actualizar el frontend
      window.dispatchEvent(new CustomEvent('customProjectUpdate'));
    }
  };

  const deleteProject = (projectId) => {
    const updatedProjects = projects.filter(project => project.id !== projectId);
    setProjects(updatedProjects);
    localStorage.setItem('adminProjects', JSON.stringify(updatedProjects));
    // Disparar evento para actualizar el frontend
    window.dispatchEvent(new CustomEvent('customProjectUpdate'));
  };

  // Cargar datos guardados al montar
  useEffect(() => {
    const savedPrices = localStorage.getItem('adminPrices');
    if (savedPrices) {
      setPrices(JSON.parse(savedPrices));
    }

    const savedServices = localStorage.getItem('adminServices');
    if (savedServices) {
      setServices(JSON.parse(savedServices));
    }

    const savedProjects = localStorage.getItem('adminProjects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    }
  }, []);

  const getStatusColor = (status) => {
    const colors = {
      'new': '#64FFDA',
      'pending': '#FFD93D',
      'contacted': '#00E5FF',
      'in-progress': '#FFD93D',
      'completed': '#6BCF7F',
      'cancelled': '#E74C3C'
    };
    return colors[status] || '#8892B0';
  };

  return (
    <div style={{
      padding: "20px",
      maxWidth: "1200px",
      margin: "0 auto"
    }}>
      {/* Header */}
      <div style={{
        marginBottom: "30px"
      }}>
        <h1 style={{
          color: "#CCD6F6",
          fontSize: "2rem",
          marginBottom: "10px"
        }}>Panel de Administración</h1>
        <p style={{
          color: "#8892B0",
          fontSize: "1rem"
        }}>Gestiona cotizaciones y configura tu negocio</p>
      </div>

      {/* Tabs */}
      <div style={{
        display: "flex",
        gap: "10px",
        marginBottom: "30px",
        borderBottom: "1px solid #1f1f2e",
        paddingBottom: "10px"
      }}>
        <button
          style={{
            padding: "10px 20px",
            background: "none",
            border: "none",
            color: activeTab === 'contacts' ? "#64FFDA" : "#8892B0",
            cursor: "pointer",
            borderRadius: "8px 8px 0 0",
            transition: "all 0.3s ease",
            ...(activeTab === 'contacts' ? {
              background: "rgba(100,255,218,0.1)",
              border: "1px solid rgba(100,255,218,0.3)"
            } : {})
          }}
          onClick={() => setActiveTab('contacts')}
        >
          Cotizaciones ({quotes.length})
        </button>
        <button
          style={{
            padding: "10px 20px",
            background: "none",
            border: "none",
            color: activeTab === 'prices' ? "#64FFDA" : "#8892B0",
            cursor: "pointer",
            borderRadius: "8px 8px 0 0",
            transition: "all 0.3s ease",
            ...(activeTab === 'prices' ? {
              background: "rgba(100,255,218,0.1)",
              border: "1px solid rgba(100,255,218,0.3)"
            } : {})
          }}
          onClick={() => setActiveTab('prices')}
        >
          Precios
        </button>
        <button
          style={{
            padding: "10px 20px",
            background: "none",
            border: "none",
            color: activeTab === 'services' ? "#64FFDA" : "#8892B0",
            cursor: "pointer",
            borderRadius: "8px 8px 0 0",
            transition: "all 0.3s ease",
            ...(activeTab === 'services' ? {
              background: "rgba(100,255,218,0.1)",
              border: "1px solid rgba(100,255,218,0.3)"
            } : {})
          }}
          onClick={() => setActiveTab('services')}
        >
          Servicios
        </button>
        <button
          style={{
            padding: "10px 20px",
            background: "none",
            border: "none",
            color: activeTab === 'projects' ? "#64FFDA" : "#8892B0",
            cursor: "pointer",
            borderRadius: "8px 8px 0 0",
            transition: "all 0.3s ease",
            ...(activeTab === 'projects' ? {
              background: "rgba(100,255,218,0.1)",
              border: "1px solid rgba(100,255,218,0.3)"
            } : {})
          }}
          onClick={() => setActiveTab('projects')}
        >
          Proyectos
        </button>
      </div>

      {/* Contacts Tab - Cotizaciones */}
      {activeTab === 'contacts' && (
        <div style={{
          background: "rgba(10,25,47,0.5)",
          borderRadius: "10px",
          padding: "20px"
        }}>
          {/* Stats Cards */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            marginBottom: "30px"
          }}>
            <div style={{
              background: "rgba(17,34,64,0.5)",
              padding: "20px",
              borderRadius: "10px",
              textAlign: "center",
              border: "1px solid #1f1f2e"
            }}>
              <h3 style={{
                color: "#64FFDA",
                fontSize: "2rem",
                marginBottom: "5px"
              }}>{quotes.length}</h3>
              <p style={{
                color: "#8892B0",
                fontSize: "0.9rem"
              }}>Total Cotizaciones</p>
            </div>
            <div style={{
              background: "rgba(17,34,64,0.5)",
              padding: "20px",
              borderRadius: "10px",
              textAlign: "center",
              border: "1px solid #1f1f2e"
            }}>
              <h3 style={{
                color: "#64FFDA",
                fontSize: "2rem",
                marginBottom: "5px"
              }}>
                {quotes?.filter(q => q.status === 'pending').length || 0}
              </h3>
              <p style={{
                color: "#8892B0",
                fontSize: "0.9rem"
              }}>Pendientes</p>
            </div>
            <div style={{
              background: "rgba(17,34,64,0.5)",
              padding: "20px",
              borderRadius: "10px",
              textAlign: "center",
              border: "1px solid #1f1f2e"
            }}>
              <h3 style={{
                color: "#64FFDA",
                fontSize: "2rem",
                marginBottom: "5px"
              }}>
                {quotes?.filter(q => q.status === 'contacted').length || 0}
              </h3>
              <p style={{
                color: "#8892B0",
                fontSize: "0.9rem"
              }}>Contactados</p>
            </div>
            <div style={{
              background: "rgba(17,34,64,0.5)",
              padding: "20px",
              borderRadius: "10px",
              textAlign: "center",
              border: "1px solid #1f1f2e"
            }}>
              <h3 style={{
                color: "#64FFDA",
                fontSize: "2rem",
                marginBottom: "5px"
              }}>
                {quotes?.filter(q => q.status === 'completed').length || 0}
              </h3>
              <p style={{
                color: "#8892B0",
                fontSize: "0.9rem"
              }}>Completados</p>
            </div>
          </div>

          {/* Quotes List */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px"
          }}>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <div className="spinner" style={{ margin: '0 auto' }}></div>
                <p style={{ color: '#8892B0', marginTop: '20px' }}>Cargando cotizaciones...</p>
              </div>
            ) : error ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <p style={{ color: '#e74c3c' }}>{error}</p>
                <button 
                  onClick={loadQuotes}
                  style={{
                    background: '#64FFDA',
                    color: '#0A192F',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    marginTop: '20px'
                  }}
                >
                  Reintentar
                </button>
              </div>
            ) : quotes?.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <p style={{ color: '#8892B0' }}>No hay cotizaciones registradas</p>
                <p style={{ color: '#64FFDA', fontSize: '0.9rem', marginTop: '10px' }}>
                  Las cotizaciones aparecerán aquí cuando los usuarios las generen
                </p>
              </div>
            ) : (
              quotes.map((quote) => (
                <div key={quote.id} style={{
                  background: "rgba(17,34,64,0.5)",
                  padding: "20px",
                  borderRadius: "10px",
                  border: "1px solid #1f1f2e",
                  cursor: "pointer",
                  transition: "all 0.3s ease"
                }} onClick={() => handleContactClick(quote)}>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "10px"
                  }}>
                    <h4 style={{
                      color: "#CCD6F6",
                      fontSize: "1.1rem",
                      margin: "0"
                    }}>Cotización #{quote.id}</h4>
                    <span style={{
                      padding: "4px 12px",
                      borderRadius: "20px",
                      fontSize: "0.8rem",
                      color: "#fff",
                      backgroundColor: getStatusColor(quote.status)
                    }}>
                      {quote.status === 'pending' ? 'Pendiente' : 
                       quote.status === 'contacted' ? 'Contactado' : 
                       quote.status === 'completed' ? 'Completado' : quote.status}
                    </span>
                  </div>
                  <div style={{
                    color: "#8892B0",
                    fontSize: "0.9rem"
                  }}>
                    <p>📋 Plan: {quote.plan}</p>
                    <p>🌐 Dominio: {quote.domain}</p>
                    <p>🔧 Mantenimiento: {quote.maintenance} meses</p>
                    <p>💰 Total: ${quote.totalPrice.toLocaleString('es-CO')}</p>
                  </div>
                  <div style={{
                    marginTop: "10px",
                    paddingTop: "10px",
                    borderTop: "1px solid #1f1f2e"
                  }}>
                    <span style={{
                      color: "#64FFDA",
                      fontSize: "0.8rem"
                    }}>
                      {new Date(quote.createdAt).toLocaleDateString('es-CO')}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Prices Tab */}
      {activeTab === 'prices' && (
        <div style={{
          background: "rgba(10,25,47,0.5)",
          borderRadius: "10px",
          padding: "20px"
        }}>
          <h2 style={{
            color: "#CCD6F6",
            fontSize: "1.5rem",
            marginBottom: "20px"
          }}>Configuración de Precios</h2>
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "30px"
          }}>
            <div style={{
              background: "rgba(17,34,64,0.5)",
              padding: "20px",
              borderRadius: "10px",
              border: "1px solid #1f1f2e"
            }}>
              <h3 style={{
                color: "#CCD6F6",
                fontSize: "1.2rem",
                marginBottom: "15px"
              }}>Planes de Desarrollo</h3>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "15px"
              }}>
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px"
                }}>
                  <label>Frontend ($):</label>
                  <input
                    type="number"
                    value={prices.plans.frontend}
                    onChange={(e) => handlePriceUpdate('plans.frontend', e.target.value)}
                    style={{
                      padding: "10px",
                      borderRadius: "6px",
                      border: "1px solid #1f1f2e",
                      background: "rgba(10,25,47,0.5)",
                      color: "#CCD6F6",
                      fontSize: "1rem"
                    }}
                  />
                </div>
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px"
                }}>
                  <label>Backend ($):</label>
                  <input
                    type="number"
                    value={prices.plans.backend}
                    onChange={(e) => handlePriceUpdate('plans.backend', e.target.value)}
                    style={{
                      padding: "10px",
                      borderRadius: "6px",
                      border: "1px solid #1f1f2e",
                      background: "rgba(10,25,47,0.5)",
                      color: "#CCD6F6",
                      fontSize: "1rem"
                    }}
                  />
                </div>
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px"
                }}>
                  <label>Full-Stack ($):</label>
                  <input
                    type="number"
                    value={prices.plans.fullstack}
                    onChange={(e) => handlePriceUpdate('plans.fullstack', e.target.value)}
                    style={{
                      padding: "10px",
                      borderRadius: "6px",
                      border: "1px solid #1f1f2e",
                      background: "rgba(10,25,47,0.5)",
                      color: "#CCD6F6",
                      fontSize: "1rem"
                    }}
                  />
                </div>
              </div>
            </div>

            <div style={{
              background: "rgba(17,34,64,0.5)",
              padding: "20px",
              borderRadius: "10px",
              border: "1px solid #1f1f2e"
            }}>
              <h3 style={{
                color: "#CCD6F6",
                fontSize: "1.2rem",
                marginBottom: "15px"
              }}>Servicios Adicionales</h3>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "15px"
              }}>
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px"
                }}>
                  <label>Dominio Gratuito ($):</label>
                  <input
                    type="number"
                    value={prices.domains.free}
                    onChange={(e) => handlePriceUpdate('domains.free', e.target.value)}
                    style={{
                      padding: "10px",
                      borderRadius: "6px",
                      border: "1px solid #1f1f2e",
                      background: "rgba(10,25,47,0.5)",
                      color: "#CCD6F6",
                      fontSize: "1rem"
                    }}
                  />
                </div>
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px"
                }}>
                  <label>Dominio Personalizado ($):</label>
                  <input
                    type="number"
                    value={prices.domains.custom}
                    onChange={(e) => handlePriceUpdate('domains.custom', e.target.value)}
                    style={{
                      padding: "10px",
                      borderRadius: "6px",
                      border: "1px solid #1f1f2e",
                      background: "rgba(10,25,47,0.5)",
                      color: "#CCD6F6",
                      fontSize: "1rem"
                    }}
                  />
                </div>
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px"
                }}>
                  <label>Mantenimiento mensual ($):</label>
                  <input
                    type="number"
                    value={prices.maintenance}
                    onChange={(e) => handlePriceUpdate('maintenance', e.target.value)}
                    style={{
                      padding: "10px",
                      borderRadius: "6px",
                      border: "1px solid #1f1f2e",
                      background: "rgba(10,25,47,0.5)",
                      color: "#CCD6F6",
                      fontSize: "1rem"
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Services Tab */}
      {activeTab === 'services' && (
        <div style={{
          background: "rgba(10,25,47,0.5)",
          borderRadius: "10px",
          padding: "20px"
        }}>
          <h2 style={{
            color: "#CCD6F6",
            fontSize: "1.5rem",
            marginBottom: "20px"
          }}>Gestión de Servicios</h2>
          
          {/* Add New Service */}
          <div style={{
            background: "rgba(17,34,64,0.5)",
            padding: "20px",
            borderRadius: "10px",
            border: "1px solid #1f1f2e",
            marginBottom: "30px"
          }}>
            <h3 style={{
              color: "#CCD6F6",
              fontSize: "1.2rem",
              marginBottom: "15px"
            }}>Agregar Nuevo Servicio</h3>
            <div style={{
              display: "flex",
              gap: "15px",
              flexWrap: "wrap"
            }}>
              <input
                type="text"
                placeholder="Nombre del servicio"
                value={newService.title}
                onChange={(e) => setNewService({...newService, title: e.target.value})}
                style={{
                  padding: "10px",
                  borderRadius: "6px",
                  border: "1px solid #1f1f2e",
                  background: "rgba(10,25,47,0.5)",
                  color: "#CCD6F6",
                  fontSize: "1rem"
                }}
              />
              <input
                type="text"
                placeholder="Slug (URL amigable)"
                value={newService.slug}
                onChange={(e) => setNewService({...newService, slug: e.target.value})}
                style={{
                  padding: "10px",
                  borderRadius: "6px",
                  border: "1px solid #1f1f2e",
                  background: "rgba(10,25,47,0.5)",
                  color: "#CCD6F6",
                  fontSize: "1rem"
                }}
              />
              <button onClick={addNewService} style={{
                padding: "10px 20px",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
                fontSize: "0.9rem",
                fontWeight: "500",
                transition: "all 0.3s ease",
                background: "#64FFDA",
                color: "#0A192F"
              }}>
                Agregar Servicio
              </button>
            </div>
          </div>

          {/* Services List */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px"
          }}>
            {services.map((service) => (
              <div key={service.id} style={{
                background: "rgba(17,34,64,0.5)",
                padding: "20px",
                borderRadius: "10px",
                border: "1px solid #1f1f2e",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <div style={{ flex: 1 }}>
                  <h4 style={{
                    color: "#CCD6F6",
                    fontSize: "1.1rem",
                    margin: "0 0 5px 0"
                  }}>{service.title}</h4>
                  <p style={{
                    color: "#8892B0",
                    fontSize: "0.9rem",
                    margin: "0"
                  }}>Slug: {service.slug}</p>
                  <span style={{
                    padding: "4px 12px",
                    borderRadius: "20px",
                    fontSize: "0.8rem",
                    color: "#fff",
                    backgroundColor: service.visible ? '#6BCF7F' : '#E74C3C'
                  }}>
                    {service.visible ? 'Visible' : 'Oculto'}
                  </span>
                </div>
                <div style={{
                  display: "flex",
                  gap: "10px"
                }}>
                  <button
                    onClick={() => toggleServiceVisibility(service.id)}
                    style={{
                      padding: "10px 20px",
                      borderRadius: "6px",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "0.9rem",
                      fontWeight: "500",
                      transition: "all 0.3s ease",
                      backgroundColor: service.visible ? '#E74C3C' : '#6BCF7F',
                      color: "#fff"
                    }}
                  >
                    {service.visible ? 'Ocultar' : 'Mostrar'}
                  </button>
                  <button
                    onClick={() => removeService(service.id)}
                    style={{
                      padding: "10px 20px",
                      borderRadius: "6px",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "0.9rem",
                      fontWeight: "500",
                      transition: "all 0.3s ease",
                      backgroundColor: '#E74C3C',
                      color: "#fff"
                    }}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects Tab */}
      {activeTab === 'projects' && (
        <div style={{
          background: "rgba(10,25,47,0.5)",
          borderRadius: "10px",
          padding: "20px"
        }}>
          <h2 style={{
            color: "#CCD6F6",
            fontSize: "1.5rem",
            marginBottom: "20px"
          }}>Gestión de Proyectos Hipotéticos</h2>
          
          {/* Add New Project */}
          <div style={{
            background: "rgba(17,34,64,0.5)",
            padding: "20px",
            borderRadius: "10px",
            border: "1px solid #1f1f2e",
            marginBottom: "30px"
          }}>
            <h3 style={{
              color: "#CCD6F6",
              fontSize: "1.2rem",
              marginBottom: "15px"
            }}>Agregar Nuevo Proyecto</h3>
            <div style={{
              display: "flex",
              gap: "15px",
              flexWrap: "wrap",
              marginBottom: "15px"
            }}>
              <input
                type="text"
                placeholder="Título del proyecto"
                value={newProject.title}
                onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                style={{
                  padding: "10px",
                  borderRadius: "6px",
                  border: "1px solid #1f1f2e",
                  background: "rgba(10,25,47,0.5)",
                  color: "#CCD6F6",
                  fontSize: "1rem",
                  minWidth: "200px"
                }}
              />
              <input
                type="text"
                placeholder="Slug (URL amigable)"
                value={newProject.slug}
                onChange={(e) => setNewProject({...newProject, slug: e.target.value})}
                style={{
                  padding: "10px",
                  borderRadius: "6px",
                  border: "1px solid #1f1f2e",
                  background: "rgba(10,25,47,0.5)",
                  color: "#CCD6F6",
                  fontSize: "1rem",
                  minWidth: "200px"
                }}
              />
              <input
                type="text"
                placeholder="Descripción corta"
                value={newProject.description}
                onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                style={{
                  padding: "10px",
                  borderRadius: "6px",
                  border: "1px solid #1f1f2e",
                  background: "rgba(10,25,47,0.5)",
                  color: "#CCD6F6",
                  fontSize: "1rem",
                  minWidth: "250px"
                }}
              />
            </div>
            <div style={{
              display: "flex",
              gap: "15px",
              flexWrap: "wrap",
              marginBottom: "15px"
            }}>
              <select
                value={newProject.category}
                onChange={(e) => setNewProject({...newProject, category: e.target.value})}
                style={{
                  padding: "10px",
                  borderRadius: "6px",
                  border: "1px solid #1f1f2e",
                  background: "rgba(10,25,47,0.5)",
                  color: "#CCD6F6",
                  fontSize: "1rem"
                }}
              >
                <option value="development">Desarrollo</option>
                <option value="design">Diseño</option>
                <option value="marketing">Marketing</option>
              </select>
              <input
                type="text"
                placeholder="Icono (emoji)"
                value={newProject.icon}
                onChange={(e) => setNewProject({...newProject, icon: e.target.value})}
                style={{
                  padding: "10px",
                  borderRadius: "6px",
                  border: "1px solid #1f1f2e",
                  background: "rgba(10,25,47,0.5)",
                  color: "#CCD6F6",
                  fontSize: "1rem",
                  width: "100px"
                }}
              />
              <input
                type="color"
                value={newProject.color}
                onChange={(e) => setNewProject({...newProject, color: e.target.value})}
                style={{
                  padding: "5px",
                  borderRadius: "6px",
                  border: "1px solid #1f1f2e",
                  background: "rgba(10,25,47,0.5)",
                  width: "50px"
                }}
              />
              <label style={{ color: "#8892B0", display: "flex", alignItems: "center", gap: "5px" }}>
                <input
                  type="checkbox"
                  checked={newProject.featured}
                  onChange={(e) => setNewProject({...newProject, featured: e.target.checked})}
                />
                Destacado
              </label>
            </div>
            <button onClick={addNewProject} style={{
              padding: "10px 20px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
              fontSize: "0.9rem",
              fontWeight: "500",
              transition: "all 0.3s ease",
              background: "#64FFDA",
              color: "#0A192F"
            }}>
              + Agregar Proyecto
            </button>
          </div>

          {/* Projects List */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px"
          }}>
            {projects.map((project) => (
              <div key={project.id} style={{
                background: "rgba(17,34,64,0.5)",
                padding: "20px",
                borderRadius: "10px",
                border: "1px solid #1f1f2e"
              }}>
                {editingProject?.id === project.id ? (
                  // Edit Mode
                  <div>
                    <div style={{
                      display: "flex",
                      gap: "15px",
                      flexWrap: "wrap",
                      marginBottom: "15px"
                    }}>
                      <input
                        type="text"
                        value={editingProject.title}
                        onChange={(e) => setEditingProject({...editingProject, title: e.target.value})}
                        style={{
                          padding: "10px",
                          borderRadius: "6px",
                          border: "1px solid #1f1f2e",
                          background: "rgba(10,25,47,0.5)",
                          color: "#CCD6F6",
                          fontSize: "1rem",
                          minWidth: "200px"
                        }}
                      />
                      <input
                        type="text"
                        value={editingProject.slug}
                        onChange={(e) => setEditingProject({...editingProject, slug: e.target.value})}
                        style={{
                          padding: "10px",
                          borderRadius: "6px",
                          border: "1px solid #1f1f2e",
                          background: "rgba(10,25,47,0.5)",
                          color: "#CCD6F6",
                          fontSize: "1rem",
                          minWidth: "200px"
                        }}
                      />
                      <input
                        type="text"
                        value={editingProject.description}
                        onChange={(e) => setEditingProject({...editingProject, description: e.target.value})}
                        style={{
                          padding: "10px",
                          borderRadius: "6px",
                          border: "1px solid #1f1f2e",
                          background: "rgba(10,25,47,0.5)",
                          color: "#CCD6F6",
                          fontSize: "1rem",
                          minWidth: "250px"
                        }}
                      />
                    </div>
                    <div style={{
                      display: "flex",
                      gap: "15px",
                      flexWrap: "wrap",
                      marginBottom: "15px"
                    }}>
                      <select
                        value={editingProject.category}
                        onChange={(e) => setEditingProject({...editingProject, category: e.target.value})}
                        style={{
                          padding: "10px",
                          borderRadius: "6px",
                          border: "1px solid #1f1f2e",
                          background: "rgba(10,25,47,0.5)",
                          color: "#CCD6F6",
                          fontSize: "1rem"
                        }}
                      >
                        <option value="development">Desarrollo</option>
                        <option value="design">Diseño</option>
                        <option value="marketing">Marketing</option>
                      </select>
                      <input
                        type="text"
                        value={editingProject.icon}
                        onChange={(e) => setEditingProject({...editingProject, icon: e.target.value})}
                        style={{
                          padding: "10px",
                          borderRadius: "6px",
                          border: "1px solid #1f1f2e",
                          background: "rgba(10,25,47,0.5)",
                          color: "#CCD6F6",
                          fontSize: "1rem",
                          width: "100px"
                        }}
                      />
                      <input
                        type="color"
                        value={editingProject.color}
                        onChange={(e) => setEditingProject({...editingProject, color: e.target.value})}
                        style={{
                          padding: "5px",
                          borderRadius: "6px",
                          border: "1px solid #1f1f2e",
                          background: "rgba(10,25,47,0.5)",
                          width: "50px"
                        }}
                      />
                      <label style={{ color: "#8892B0", display: "flex", alignItems: "center", gap: "5px" }}>
                        <input
                          type="checkbox"
                          checked={editingProject.featured}
                          onChange={(e) => setEditingProject({...editingProject, featured: e.target.checked})}
                        />
                        Destacado
                      </label>
                    </div>
                    <div style={{
                      display: "flex",
                      gap: "10px"
                    }}>
                      <button
                        onClick={updateProject}
                        style={{
                          padding: "10px 20px",
                          borderRadius: "6px",
                          border: "none",
                          cursor: "pointer",
                          fontSize: "0.9rem",
                          fontWeight: "500",
                          transition: "all 0.3s ease",
                          background: "#64FFDA",
                          color: "#0A192F"
                        }}
                      >
                        ð Guardar
                      </button>
                      <button
                        onClick={() => setEditingProject(null)}
                        style={{
                          padding: "10px 20px",
                          borderRadius: "6px",
                          border: "none",
                          cursor: "pointer",
                          fontSize: "0.9rem",
                          fontWeight: "500",
                          transition: "all 0.3s ease",
                          background: "#8892B0",
                          color: "#0A192F"
                        }}
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <div>
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "15px"
                    }}>
                      <div style={{ flex: 1 }}>
                        <h4 style={{
                          color: "#CCD6F6",
                          fontSize: "1.1rem",
                          margin: "0 0 5px 0",
                          display: "flex",
                          alignItems: "center",
                          gap: "10px"
                        }}>
                          {project.icon} {project.title}
                          {project.featured && <span style={{
                            background: "#FFD700",
                            color: "#0A192F",
                            padding: "2px 8px",
                            borderRadius: "12px",
                            fontSize: "0.7rem",
                            fontWeight: "600"
                          }}> Estrella</span>}
                        </h4>
                        <p style={{
                          color: "#8892B0",
                          fontSize: "0.9rem",
                          margin: "0 0 10px 0"
                        }}>{project.description}</p>
                        <div style={{
                          display: "flex",
                          gap: "10px",
                          alignItems: "center",
                          flexWrap: "wrap"
                        }}>
                          <span style={{
                            padding: "4px 12px",
                            borderRadius: "20px",
                            fontSize: "0.8rem",
                            color: "#fff",
                            backgroundColor: project.visible ? '#6BCF7F' : '#E74C3C'
                          }}>
                            {project.visible ? 'Visible' : 'Oculto'}
                          </span>
                          <span style={{
                            padding: "4px 12px",
                            borderRadius: "20px",
                            fontSize: "0.8rem",
                            color: "#fff",
                            backgroundColor: project.color
                          }}>
                            {project.category === 'development' ? 'Desarrollo' : 
                             project.category === 'design' ? 'Diseño' : 'Marketing'}
                          </span>
                          <span style={{
                            color: "#8892B0",
                            fontSize: "0.8rem"
                          }}>
                            Slug: {project.slug}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div style={{
                      display: "flex",
                      gap: "10px",
                      justifyContent: "flex-end"
                    }}>
                      <button
                        onClick={() => editProject(project)}
                        style={{
                          padding: "10px 20px",
                          borderRadius: "6px",
                          border: "none",
                          cursor: "pointer",
                          fontSize: "0.9rem",
                          fontWeight: "500",
                          transition: "all 0.3s ease",
                          background: "#00E5FF",
                          color: "#0A192F"
                        }}
                      >
                         Editar
                      </button>
                      <button
                        onClick={() => toggleProjectVisibility(project.id)}
                        style={{
                          padding: "10px 20px",
                          borderRadius: "6px",
                          border: "none",
                          cursor: "pointer",
                          fontSize: "0.9rem",
                          fontWeight: "500",
                          transition: "all 0.3s ease",
                          backgroundColor: project.visible ? '#E74C3C' : '#6BCF7F',
                          color: "#fff"
                        }}
                      >
                        {project.visible ? 'Ocultar' : 'Mostrar'}
                      </button>
                      <button
                        onClick={() => deleteProject(project.id)}
                        style={{
                          padding: "10px 20px",
                          borderRadius: "6px",
                          border: "none",
                          cursor: "pointer",
                          fontSize: "0.9rem",
                          fontWeight: "500",
                          transition: "all 0.3s ease",
                          backgroundColor: '#E74C3C',
                          color: "#fff"
                        }}
                      >
                         Eliminar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contact Modal */}
      {showContactModal && selectedContact && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.8)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000
        }} onClick={() => setShowContactModal(false)}>
          <div style={{
            background: "rgba(10,25,47,0.95)",
            borderRadius: "15px",
            padding: "30px",
            maxWidth: "600px",
            width: "90%",
            border: "1px solid #1f1f2e"
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px"
            }}>
              <h3 style={{
                color: "#CCD6F6",
                fontSize: "1.3rem",
                margin: 0
              }}>Detalles de Cotización</h3>
              <button
                onClick={() => setShowContactModal(false)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#8892B0",
                  fontSize: "24px",
                  cursor: "pointer"
                }}
              >
                ×
              </button>
            </div>
            
            <div style={{
              color: "#CCD6F6",
              marginBottom: "20px"
            }}>
              <p><strong>ID:</strong> {selectedContact.id}</p>
              <p><strong>Plan:</strong> {selectedContact.plan}</p>
              <p><strong>Dominio:</strong> {selectedContact.domain}</p>
              <p><strong>Mantenimiento:</strong> {selectedContact.maintenance} meses</p>
              <p><strong>Total:</strong> ${selectedContact.totalPrice?.toLocaleString('es-CO')}</p>
              <p><strong>Estado:</strong> {selectedContact.status}</p>
              <p><strong>Fecha:</strong> {new Date(selectedContact.createdAt).toLocaleDateString('es-CO')}</p>
            </div>

            <div style={{
              marginBottom: "20px"
            }}>
              <label style={{
                display: "block",
                color: "#8892B0",
                marginBottom: "8px",
                fontSize: "0.9rem"
              }}>Agregar nota:</label>
              <textarea
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                placeholder="Añadir notas sobre esta cotización..."
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "6px",
                  border: "1px solid #1f1f2e",
                  background: "rgba(17,34,64,0.5)",
                  color: "#CCD6F6",
                  fontSize: "1rem",
                  minHeight: "80px",
                  resize: "vertical"
                }}
              />
            </div>

            <div style={{
              display: "flex",
              gap: "10px",
              justifyContent: "flex-end"
            }}>
              <button
                onClick={handleAddNote}
                style={{
                  padding: "10px 20px",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  fontWeight: "500",
                  transition: "all 0.3s ease",
                  background: "#64FFDA",
                  color: "#0A192F"
                }}
              >
                Agregar Nota
              </button>
              <button
                onClick={() => {
                  handleStatusUpdate(selectedContact.id, 'contacted');
                  setShowContactModal(false);
                }}
                style={{
                  padding: "10px 20px",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  fontWeight: "500",
                  transition: "all 0.3s ease",
                  background: "#00E5FF",
                  color: "#0A192F"
                }}
              >
                Marcar como Contactado
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
