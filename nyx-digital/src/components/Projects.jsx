import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Projects() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  
  // Proyectos hipotéticos con mockups
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: 'Plataforma E-Commerce',
      slug: 'ecommerce-platform',
      description: 'Tienda online moderna con dashboard administrativo',
      longDescription: 'Plataforma de comercio electrónico completa con gestión de inventario, pasarela de pago y análisis en tiempo real.',
      category: 'development',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      featured: true,
      visible: true,
      mockupPath: '/mockup-ecommerce',
      icon: '🛒',
      color: '#FF6B6B',
      createdAt: '2024-01-14',
      sortOrder: 1
    },
    {
      id: 2,
      title: 'App de Banca Móvil',
      slug: 'mobile-banking-app',
      description: 'Aplicación bancaria segura y moderna',
      longDescription: 'Aplicación móvil de banca completa con biometría, transferencias instantáneas y gestión financiera.',
      category: 'development',
      technologies: ['React Native', 'Firebase', 'Node.js'],
      featured: true,
      visible: true,
      mockupPath: '/mockup-banking',
      icon: '🏦',
      color: '#4ECDC4',
      createdAt: '2024-02-19',
      sortOrder: 2
    },
    {
      id: 3,
      title: 'App de Fitness Tracking',
      slug: 'fitness-tracker-app',
      description: 'Seguimiento personal de entrenamiento y salud',
      longDescription: 'Aplicación móvil de fitness con planes personalizados, seguimiento de progreso y comunidad integrada.',
      category: 'development',
      technologies: ['Flutter', 'Firebase', 'Node.js'],
      featured: true,
      visible: true,
      mockupPath: '/mockup-fitness',
      icon: '💪',
      color: '#FFD93D',
      createdAt: '2024-05-11',
      sortOrder: 3
    }
  ]);

  // Cargar visibilidad desde localStorage (admin control)
  useEffect(() => {
    const savedProjects = localStorage.getItem('adminProjects');
    if (savedProjects) {
      const adminProjects = JSON.parse(savedProjects);
      setProjects(prev => prev.map(project => {
        const adminProject = adminProjects.find(p => p.id === project.id);
        return adminProject ? { ...project, visible: adminProject.visible } : project;
      }));
    }
  }, []);

  const filteredProjects = projects.filter(project => {
    if (filter === 'all') return project.visible;
    return project.category === filter && project.visible;
  });

  const featuredProjects = projects.filter(p => p.featured && p.visible);

  const container = {
    padding: "60px 20px",
    maxWidth: "1200px",
    margin: "0 auto"
  };

  const header = {
    textAlign: "center",
    marginBottom: "60px"
  };

  const title = {
    fontSize: "3rem",
    fontWeight: "600",
    color: "#CCD6F6",
    marginBottom: "20px",
    background: "linear-gradient(135deg, #64FFDA, #00E5FF)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text"
  };

  const subtitle = {
    fontSize: "1.2rem",
    color: "#8892B0",
    maxWidth: "600px",
    margin: "0 auto",
    lineHeight: "1.6"
  };

  const filters = {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    marginBottom: "50px",
    flexWrap: "wrap"
  };

  const filterBtn = {
    padding: "12px 24px",
    background: "rgba(17,34,64,0.5)",
    border: "1px solid #1f1f2e",
    borderRadius: "25px",
    color: "#8892B0",
    cursor: "pointer",
    transition: "all 0.3s ease",
    fontSize: "0.95rem",
    fontWeight: "500"
  };

  const filterBtnActive = {
    background: "rgba(100,255,218,0.1)",
    borderColor: "#64FFDA",
    color: "#64FFDA"
  };

  const viewToggle = {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "40px"
  };

  const viewBtn = {
    padding: "8px 16px",
    background: "transparent",
    border: "1px solid #1f1f2e",
    color: "#8892B0",
    cursor: "pointer",
    borderRadius: "8px",
    transition: "all 0.3s ease"
  };

  const viewBtnActive = {
    background: "rgba(100,255,218,0.1)",
    borderColor: "#64FFDA",
    color: "#64FFDA"
  };

  const grid = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
    gap: "30px",
    marginBottom: "60px"
  };

  const card = {
    background: "rgba(17,34,64,0.5)",
    borderRadius: "15px",
    overflow: "hidden",
    border: "1px solid #1f1f2e",
    transition: "all 0.3s ease",
    cursor: "pointer",
    height: "100%",
    display: "flex",
    flexDirection: "column"
  };

  const cardHover = {
    transform: "translateY(-5px)",
    boxShadow: "0 10px 30px rgba(100,255,218,0.2)",
    borderColor: "#64FFDA"
  };

  const cardImage = {
    height: "200px",
    background: "linear-gradient(135deg, #1e3c72, #2a5298)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "4rem",
    position: "relative"
  };

  const featuredBadge = {
    position: "absolute",
    top: "15px",
    right: "15px",
    background: "#FFD700",
    color: "#0A192F",
    padding: "5px 12px",
    borderRadius: "20px",
    fontSize: "0.8rem",
    fontWeight: "600"
  };

  const cardContent = {
    padding: "25px",
    flex: 1,
    display: "flex",
    flexDirection: "column"
  };

  const cardTitle = {
    fontSize: "1.4rem",
    fontWeight: "600",
    color: "#CCD6F6",
    marginBottom: "10px",
    display: "flex",
    alignItems: "center",
    gap: "10px"
  };

  const cardDescription = {
    color: "#8892B0",
    fontSize: "1rem",
    lineHeight: "1.6",
    marginBottom: "20px",
    flex: 1
  };

  const techStack = {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginBottom: "20px"
  };

  const techBadge = {
    background: "rgba(100,255,218,0.1)",
    color: "#64FFDA",
    padding: "4px 10px",
    borderRadius: "15px",
    fontSize: "0.8rem",
    fontWeight: "500"
  };

  const cardFooter = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "20px",
    borderTop: "1px solid #1f1f2e"
  };

  const category = {
    color: "#64FFDA",
    fontSize: "0.9rem",
    fontWeight: "500"
  };

  const ctaButton = {
    background: "linear-gradient(135deg, #64FFDA, #00E5FF)",
    color: "#0A192F",
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
    transition: "all 0.3s ease",
    fontSize: "0.9rem"
  };

  const featuredSection = {
    marginBottom: "80px"
  };

  const featuredTitle = {
    fontSize: "2rem",
    fontWeight: "600",
    color: "#CCD6F6",
    textAlign: "center",
    marginBottom: "40px"
  };

  const featuredGrid = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "25px"
  };

  const featuredCard = {
    background: "rgba(17,34,64,0.5)",
    borderRadius: "15px",
    padding: "30px",
    border: "1px solid #1f1f2e",
    textAlign: "center",
    transition: "all 0.3s ease",
    cursor: "pointer"
  };

  const featuredIcon = {
    fontSize: "3rem",
    marginBottom: "20px"
  };

  const featuredProjectTitle = {
    fontSize: "1.3rem",
    fontWeight: "600",
    color: "#CCD6F6",
    marginBottom: "15px"
  };

  const featuredDescription = {
    color: "#8892B0",
    lineHeight: "1.6",
    marginBottom: "25px"
  };

  const handleProjectClick = (project) => {
    navigate(project.mockupPath);
  };

  return (
    <section style={container}>
      {/* Header */}
      <div style={header}>
        <h1 style={title}>Proyectos Hipotéticos</h1>
        <p style={subtitle}>
          Ejemplos de proyectos que podemos desarrollar para ti. 
          Cada proyecto incluye un mockup interactivo que muestra cómo sería el resultado final.
        </p>
      </div>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <div style={featuredSection}>
          <h2 style={featuredTitle}>⭐ Proyectos Destacados</h2>
          <div style={featuredGrid}>
            {featuredProjects.map((project) => (
              <div 
                key={project.id}
                style={featuredCard}
                onClick={() => handleProjectClick(project)}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-5px)';
                  e.target.style.boxShadow = '0 10px 30px rgba(100,255,218,0.2)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <div style={featuredIcon}>{project.icon}</div>
                <h3 style={featuredProjectTitle}>{project.title}</h3>
                <p style={featuredDescription}>{project.description}</p>
                <button style={ctaButton}>
                  Ver Mockup →
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filters */}
      <div style={filters}>
        <button
          style={{...filterBtn, ...(filter === 'all' ? filterBtnActive : {})}}
          onClick={() => setFilter('all')}
        >
          Todos
        </button>
        <button
          style={{...filterBtn, ...(filter === 'development' ? filterBtnActive : {})}}
          onClick={() => setFilter('development')}
        >
          Desarrollo
        </button>
        <button
          style={{...filterBtn, ...(filter === 'design' ? filterBtnActive : {})}}
          onClick={() => setFilter('design')}
        >
          Diseño
        </button>
      </div>

      {/* View Toggle */}
      <div style={viewToggle}>
        <button
          style={{...viewBtn, ...(viewMode === 'grid' ? viewBtnActive : {})}}
          onClick={() => setViewMode('grid')}
        >
          Grid
        </button>
        <button
          style={{...viewBtn, ...(viewMode === 'list' ? viewBtnActive : {})}}
          onClick={() => setViewMode('list')}
        >
          Lista
        </button>
      </div>

      {/* Projects Grid */}
      <div style={grid}>
        {filteredProjects.map((project) => (
          <div 
            key={project.id}
            style={card}
            onClick={() => handleProjectClick(project)}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 10px 30px rgba(100,255,218,0.2)";
              e.currentTarget.style.borderColor = "#64FFDA";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.borderColor = "#1f1f2e";
            }}
          >
            <div style={{...cardImage, background: `linear-gradient(135deg, ${project.color}, #2a5298)`}}>
              {project.icon}
              {project.featured && <span style={featuredBadge}>⭐ Estrella</span>}
            </div>
            <div style={cardContent}>
              <h3 style={cardTitle}>
                {project.icon} {project.title}
              </h3>
              <p style={cardDescription}>{project.description}</p>
              <div style={techStack}>
                {project.technologies.slice(0, 3).map((tech, index) => (
                  <span key={index} style={techBadge}>{tech}</span>
                ))}
              </div>
              <div style={cardFooter}>
                <span style={category}>
                  {project.category === 'development' ? 'Desarrollo' : 
                   project.category === 'design' ? 'Diseño' : project.category}
                </span>
                <button style={ctaButton}>
                  Ver Demo →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <p style={{ color: '#8892B0', fontSize: '1.1rem' }}>
            No hay proyectos disponibles en esta categoría.
          </p>
        </div>
      )}
    </section>
  );
}

export default Projects;
