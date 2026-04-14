import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function MockupFitness() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `¡Hola! Estoy interesado en una app de fitness como el ejemplo que vi en tu portafolio.\n\n` +
      `Tipo de proyecto: Aplicación de Fitness Tracking\n` +
      `Características deseadas: Seguimiento de ejercicios, planes personalizados, progreso\n` +
      `¿Podrían darme más información y una cotización?\n\n` +
      `Gracias, 💪`
    );
    window.open(`https://wa.me/573001234567?text=${message}`, '_blank');
  };

  return (
    <div style={{
      padding: '20px',
      maxWidth: '1200px',
      margin: '0 auto',
      color: '#CCD6F6'
    }}>
      {/* Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '40px'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          color: '#64FFDA',
          marginBottom: '10px'
        }}>💪 App de Fitness Tracking</h1>
        <p style={{
          fontSize: '1.2rem',
          color: '#8892B0'
        }}>Ejemplo hipotético de aplicación personal de entrenamiento</p>
      </div>

      {/* Navigation */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        marginBottom: '40px',
        flexWrap: 'wrap'
      }}>
        {['overview', 'features', 'tech', 'mockup'].map((section) => (
          <button
            key={section}
            onClick={() => setActiveSection(section)}
            style={{
              padding: '10px 20px',
              background: activeSection === section ? 'rgba(100,255,218,0.2)' : 'rgba(17,34,64,0.5)',
              border: `1px solid ${activeSection === section ? '#64FFDA' : '#1f1f2e'}`,
              color: activeSection === section ? '#64FFDA' : '#8892B0',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            {section === 'overview' && 'Descripción'}
            {section === 'features' && 'Características'}
            {section === 'tech' && 'Tecnología'}
            {section === 'mockup' && 'Mockup Visual'}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{
        background: 'rgba(10,25,47,0.5)',
        borderRadius: '15px',
        padding: '40px',
        border: '1px solid #1f1f2e'
      }}>
        {activeSection === 'overview' && (
          <div>
            <h2 style={{ color: '#64FFDA', marginBottom: '20px' }}>Descripción del Proyecto</h2>
            <p style={{ lineHeight: '1.8', marginBottom: '20px' }}>
              Aplicación móvil completa de seguimiento fitness con planes de entrenamiento 
              personalizados y análisis de progreso. Diseñada para ayudar a usuarios a 
              alcanzar sus metas de salud y bienestar.
            </p>
            <p style={{ lineHeight: '1.8', marginBottom: '20px' }}>
              Este ejemplo hipotético muestra cómo podríamos construir tu app de fitness 
              con seguimiento avanzado, gamificación y comunidad integrada.
            </p>
            <div style={{
              background: 'rgba(100,255,218,0.1)',
              padding: '20px',
              borderRadius: '10px',
              border: '1px solid rgba(100,255,218,0.3)'
            }}>
              <h3 style={{ color: '#64FFDA', marginBottom: '10px' }}>💡 Ideal para:</h3>
              <ul style={{ color: '#8892B0', lineHeight: '1.6' }}>
                <li>Gimnasios y centros de entrenamiento</li>
                <li>Entrenadores personales</li>
                <li>Apps de salud corporativas</li>
                <li>Comunidades de fitness online</li>
              </ul>
            </div>
          </div>
        )}

        {activeSection === 'features' && (
          <div>
            <h2 style={{ color: '#64FFDA', marginBottom: '20px' }}>Características Principales</h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '20px'
            }}>
              {[
                { icon: '🏃‍♂️', title: 'Seguimiento de Ejercicios', desc: 'Registro detallado de rutinas y repeticiones' },
                { icon: '📊', title: 'Análisis de Progreso', desc: 'Gráficos y estadísticas de evolución' },
                { icon: '🎯', title: 'Planes Personalizados', desc: 'Rutinas adaptadas a objetivos y nivel' },
                { icon: '🏆', title: 'Gamificación', desc: 'Logros, retos y sistema de puntos' },
                { icon: '👥', title: 'Comunidad', desc: 'Compartir progreso y desafíos con amigos' },
                { icon: '🍎', title: 'Nutrición', desc: 'Seguimiento de calorías y meal plans' }
              ].map((feature, index) => (
                <div key={index} style={{
                  background: 'rgba(17,34,64,0.5)',
                  padding: '20px',
                  borderRadius: '10px',
                  border: '1px solid #1f1f2e'
                }}>
                  <div style={{ fontSize: '2rem', marginBottom: '10px' }}>{feature.icon}</div>
                  <h3 style={{ color: '#CCD6F6', marginBottom: '10px' }}>{feature.title}</h3>
                  <p style={{ color: '#8892B0', lineHeight: '1.6' }}>{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'tech' && (
          <div>
            <h2 style={{ color: '#64FFDA', marginBottom: '20px' }}>Stack Tecnológico</h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '20px'
            }}>
              {[
                { name: 'Flutter', type: 'Mobile', desc: 'Desarrollo multiplataforma nativo' },
                { name: 'Firebase', type: 'Backend', desc: 'Base de datos y autenticación en tiempo real' },
                { name: 'Node.js', type: 'API', desc: 'Servidor escalable para procesamiento de datos' },
                { name: 'TensorFlow', type: 'AI/ML', desc: 'Análisis de ejercicios con IA' },
                { name: 'Google Fit', type: 'Integration', desc: 'Sincronización con wearables y sensores' },
                { name: 'AWS', type: 'Cloud', desc: 'Infraestructura escalable y segura' }
              ].map((tech, index) => (
                <div key={index} style={{
                  background: 'rgba(17,34,64,0.5)',
                  padding: '20px',
                  borderRadius: '10px',
                  border: '1px solid #1f1f2e'
                }}>
                  <h3 style={{ color: '#64FFDA', marginBottom: '5px' }}>{tech.name}</h3>
                  <p style={{ color: '#8892B0', fontSize: '0.9rem', marginBottom: '5px' }}>{tech.type}</p>
                  <p style={{ color: '#CCD6F6', fontSize: '0.9rem' }}>{tech.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'mockup' && (
          <div>
            <h2 style={{ color: '#64FFDA', marginBottom: '20px' }}>Mockup Visual</h2>
            <div style={{
              background: 'rgba(17,34,64,0.5)',
              padding: '40px',
              borderRadius: '10px',
              border: '1px solid #1f1f2e',
              textAlign: 'center'
            }}>
              {/* Mockup Phone Frame */}
              <div style={{
                maxWidth: '350px',
                margin: '0 auto',
                background: '#1a1a1a',
                borderRadius: '30px',
                padding: '20px',
                border: '2px solid #333'
              }}>
                {/* Phone Screen */}
                <div style={{
                  background: 'white',
                  borderRadius: '20px',
                  padding: '20px',
                  minHeight: '500px'
                }}>
                  {/* App Header */}
                  <div style={{
                    background: 'linear-gradient(135deg, #FF6B6B, #4ECDC4)',
                    padding: '20px',
                    borderRadius: '15px',
                    marginBottom: '20px',
                    color: 'white'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <h3 style={{ margin: '0', fontSize: '1.2rem' }}>FitTracker</h3>
                        <p style={{ margin: '0', fontSize: '0.9rem', opacity: 0.8 }}>¡Vamos a entrenar!</p>
                      </div>
                      <div style={{ fontSize: '1.5rem' }}>👤</div>
                    </div>
                  </div>

                  {/* Today's Goal */}
                  <div style={{
                    background: '#f8f9fa',
                    padding: '20px',
                    borderRadius: '15px',
                    marginBottom: '20px',
                    textAlign: 'left'
                  }}>
                    <h4 style={{ margin: '0 0 15px 0', color: '#333' }}>Objetivo de hoy</h4>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <p style={{ margin: '0', color: '#666', fontSize: '0.9rem' }}>Pasos</p>
                        <p style={{ margin: '0', color: '#FF6B6B', fontSize: '1.5rem', fontWeight: 'bold' }}>8,432</p>
                      </div>
                      <div style={{ fontSize: '2rem' }}>🚶‍♂️</div>
                      <div>
                        <p style={{ margin: '0', color: '#666', fontSize: '0.9rem' }}>Meta</p>
                        <p style={{ margin: '0', color: '#4ECDC4', fontSize: '1.5rem', fontWeight: 'bold' }}>10,000</p>
                      </div>
                    </div>
                    <div style={{
                      background: '#e9ecef',
                      height: '8px',
                      borderRadius: '4px',
                      marginTop: '15px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        background: 'linear-gradient(90deg, #FF6B6B, #4ECDC4)',
                        height: '100%',
                        width: '84%',
                        borderRadius: '4px'
                      }}></div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '15px',
                    marginBottom: '20px'
                  }}>
                    {[
                      { icon: '🏃‍♂️', label: 'Correr', color: '#FF6B6B' },
                      { icon: '🧘‍♀️', label: 'Yoga', color: '#4ECDC4' },
                      { icon: '💪', label: 'Fuerza', color: '#FFD93D' },
                      { icon: '🚴‍♂️', label: 'Ciclismo', color: '#6BCF7F' }
                    ].map((action, index) => (
                      <div key={index} style={{
                        background: action.color + '20',
                        padding: '15px',
                        borderRadius: '10px',
                        textAlign: 'center',
                        cursor: 'pointer',
                        border: `1px solid ${action.color}`
                      }}>
                        <div style={{ fontSize: '1.5rem', marginBottom: '5px' }}>{action.icon}</div>
                        <p style={{ margin: '0', fontSize: '0.9rem', color: '#333' }}>{action.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Recent Activities */}
                  <div style={{
                    background: '#f8f9fa',
                    padding: '15px',
                    borderRadius: '10px',
                    textAlign: 'left'
                  }}>
                    <h4 style={{ margin: '0 0 15px 0', color: '#333' }}>Actividades recientes</h4>
                    {[
                      { activity: 'Correr en el parque', duration: '45 min', calories: '320 cal' },
                      { activity: 'Rutina de fuerza', duration: '30 min', calories: '180 cal' },
                      { activity: 'Sesión de yoga', duration: '20 min', calories: '80 cal' }
                    ].map((activity, index) => (
                      <div key={index} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '10px 0',
                        borderBottom: '1px solid #dee2e6'
                      }}>
                        <div>
                          <p style={{ margin: '0', color: '#333', fontWeight: 'bold' }}>{activity.activity}</p>
                          <p style={{ margin: '0', color: '#666', fontSize: '0.8rem' }}>{activity.duration}</p>
                        </div>
                        <p style={{ 
                          margin: '0', 
                          color: '#4ECDC4',
                          fontWeight: 'bold'
                        }}>{activity.calories}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <p style={{ color: '#8892B0', fontStyle: 'italic', marginTop: '30px' }}>
                *Este es un mockup visual demostrativo. El diseño final se adaptará a tus necesidades específicas.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div style={{
        textAlign: 'center',
        marginTop: '40px',
        padding: '40px',
        background: 'rgba(100,255,218,0.1)',
        borderRadius: '15px',
        border: '1px solid rgba(100,255,218,0.3)'
      }}>
        <h2 style={{ color: '#64FFDA', marginBottom: '20px' }}>¿Quieres una app de fitness?</h2>
        <p style={{ color: '#CCD6F6', marginBottom: '30px', fontSize: '1.1rem' }}>
          Creamos aplicaciones de entrenamiento personalizadas y motivadoras
        </p>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={handleWhatsApp}
            style={{
              padding: '15px 30px',
              background: '#25D366',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1.1rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            💬 Cotizar por WhatsApp
          </button>
          <button
            onClick={() => navigate('/trabajemos')}
            style={{
              padding: '15px 30px',
              background: '#64FFDA',
              color: '#0A192F',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1.1rem',
              cursor: 'pointer'
            }}
          >
            📋 Solicitar Cotización
          </button>
        </div>
      </div>

      {/* Back Button */}
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <button
          onClick={() => navigate('/')}
          style={{
            padding: '10px 20px',
            background: 'transparent',
            color: '#8892B0',
            border: '1px solid #8892B0',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          ← Volver al Inicio
        </button>
      </div>
    </div>
  );
}

export default MockupFitness;
