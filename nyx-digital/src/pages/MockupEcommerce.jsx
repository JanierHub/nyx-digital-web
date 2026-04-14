import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function MockupEcommerce() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `¡Hola! Estoy interesado en un proyecto de E-Commerce como el ejemplo que vi en tu portafolio.\n\n` +
      `Tipo de proyecto: Plataforma E-Commerce\n` +
      `Características deseadas: Dashboard administrativo, gestión de inventario, pasarela de pago\n` +
      `¿Podrían darme más información y una cotización?\n\n` +
      `Gracias, 🛒`
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
        }}>🛒 Plataforma E-Commerce</h1>
        <p style={{
          fontSize: '1.2rem',
          color: '#8892B0'
        }}>Ejemplo hipotético de tienda online moderna</p>
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
              Plataforma de comercio electrónico completa con dashboard administrativo avanzado. 
              Sistema moderno diseñado para gestionar inventario, procesar pagos y analizar 
              métricas de ventas en tiempo real.
            </p>
            <p style={{ lineHeight: '1.8', marginBottom: '20px' }}>
              Este ejemplo hipotético muestra cómo podríamos construir tu tienda online con 
              todas las funcionalidades que necesitas para vender tus productos de manera 
              profesional y segura.
            </p>
            <div style={{
              background: 'rgba(100,255,218,0.1)',
              padding: '20px',
              borderRadius: '10px',
              border: '1px solid rgba(100,255,218,0.3)'
            }}>
              <h3 style={{ color: '#64FFDA', marginBottom: '10px' }}>💡 Ideal para:</h3>
              <ul style={{ color: '#8892B0', lineHeight: '1.6' }}>
                <li>Tiendas de ropa y accesorios</li>
                <li>Productos electrónicos</li>
                <li>Artesanías y productos locales</li>
                <li>Suscripciones y servicios digitales</li>
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
                { icon: '🛍️', title: 'Catálogo de Productos', desc: 'Gestión completa de productos con imágenes, descripciones y variantes' },
                { icon: '🛒', title: 'Carrito de Compras', desc: 'Carrito intuitivo con cálculo automático de envíos y descuentos' },
                { icon: '💳', title: 'Pasarela de Pago', desc: 'Integración con múltiples métodos de pago seguros' },
                { icon: '📊', title: 'Dashboard Admin', desc: 'Panel de control con estadísticas en tiempo real' },
                { icon: '📦', title: 'Gestión de Inventario', desc: 'Control de stock, notificaciones y reabastecimiento' },
                { icon: '👥', title: 'Gestión de Usuarios', desc: 'Perfiles de cliente, historial de compras y programas de lealtad' }
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
                { name: 'React', type: 'Frontend', desc: 'Interfaz de usuario moderna y reactiva' },
                { name: 'Node.js', type: 'Backend', desc: 'Servidor escalable y de alto rendimiento' },
                { name: 'MongoDB', type: 'Database', desc: 'Base de datos NoSQL flexible' },
                { name: 'Stripe', type: 'Payments', desc: 'Procesamiento seguro de pagos' },
                { name: 'AWS', type: 'Hosting', desc: 'Infraestructura en la nube confiable' },
                { name: 'Docker', type: 'DevOps', desc: 'Contenedores para despliegue fácil' }
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
              {/* Mockup Header */}
              <div style={{
                background: 'rgba(100,255,218,0.1)',
                padding: '20px',
                borderRadius: '10px',
                marginBottom: '30px',
                border: '1px solid rgba(100,255,218,0.3)'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '20px'
                }}>
                  <h3 style={{ color: '#64FFDA', margin: 0 }}>MiTienda Online</h3>
                  <div style={{ display: 'flex', gap: '15px' }}>
                    <span>🛒 Carrito (3)</span>
                    <span>👤 Perfil</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                  <button style={{ padding: '8px 16px', background: '#64FFDA', color: '#0A192F', border: 'none', borderRadius: '5px' }}>Inicio</button>
                  <button style={{ padding: '8px 16px', background: 'transparent', color: '#64FFDA', border: '1px solid #64FFDA', borderRadius: '5px' }}>Productos</button>
                  <button style={{ padding: '8px 16px', background: 'transparent', color: '#64FFDA', border: '1px solid #64FFDA', borderRadius: '5px' }}>Ofertas</button>
                </div>
              </div>

              {/* Mockup Products Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px',
                marginBottom: '30px'
              }}>
                {[1, 2, 3, 4].map((product) => (
                  <div key={product} style={{
                    background: 'rgba(10,25,47,0.5)',
                    padding: '20px',
                    borderRadius: '10px',
                    border: '1px solid #1f1f2e'
                  }}>
                    <div style={{
                      height: '150px',
                      background: 'rgba(100,255,218,0.1)',
                      borderRadius: '8px',
                      marginBottom: '15px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '3rem'
                    }}>📦</div>
                    <h4 style={{ color: '#CCD6F6', margin: '0 0 10px 0' }}>Producto #{product}</h4>
                    <p style={{ color: '#64FFDA', fontSize: '1.2rem', margin: '0 0 10px 0' }}>$299.900</p>
                    <button style={{
                      width: '100%',
                      padding: '10px',
                      background: '#64FFDA',
                      color: '#0A192F',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer'
                    }}>Agregar al carrito</button>
                  </div>
                ))}
              </div>

              <p style={{ color: '#8892B0', fontStyle: 'italic' }}>
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
        <h2 style={{ color: '#64FFDA', marginBottom: '20px' }}>¿Te gusta este tipo de proyecto?</h2>
        <p style={{ color: '#CCD6F6', marginBottom: '30px', fontSize: '1.1rem' }}>
          Podemos crear una plataforma E-Commerce personalizada para tu negocio
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

export default MockupEcommerce;
