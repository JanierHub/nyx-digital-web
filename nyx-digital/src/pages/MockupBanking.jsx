import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function MockupBanking() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `¡Hola! Estoy interesado en una app de banca móvil como el ejemplo que vi en tu portafolio.\n\n` +
      `Tipo de proyecto: Aplicación de Banca Móvil\n` +
      `Características deseadas: Transferencias, pagos, seguridad avanzada\n` +
      `¿Podrían darme más información y una cotización?\n\n` +
      `Gracias, 🏦`
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
        }}>🏦 App de Banca Móvil</h1>
        <p style={{
          fontSize: '1.2rem',
          color: '#8892B0'
        }}>Ejemplo hipotético de aplicación bancaria segura</p>
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
              Aplicación móvil de banca completa con seguridad de nivel bancario. 
              Diseñada para ofrecer transacciones financieras seguras, gestión de cuentas 
              y servicios bancarios desde cualquier dispositivo móvil.
            </p>
            <p style={{ lineHeight: '1.8', marginBottom: '20px' }}>
              Este ejemplo hipotético demuestra cómo podríamos construir tu app bancaria 
              con todas las medidas de seguridad necesarias y una experiencia de usuario 
              intuitiva y moderna.
            </p>
            <div style={{
              background: 'rgba(100,255,218,0.1)',
              padding: '20px',
              borderRadius: '10px',
              border: '1px solid rgba(100,255,218,0.3)'
            }}>
              <h3 style={{ color: '#64FFDA', marginBottom: '10px' }}>💡 Ideal para:</h3>
              <ul style={{ color: '#8892B0', lineHeight: '1.6' }}>
                <li>Bancos digitales y neobancos</li>
                <li>Fintechs y servicios financieros</li>
                <li>Cooperativas de crédito</li>
                <li>Aplicaciones de billeteras digitales</li>
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
                { icon: '🔐', title: 'Seguridad Avanzada', desc: 'Biometría, doble autenticación y encriptación de extremo a extremo' },
                { icon: '💸', title: 'Transferencias', desc: 'Transferencias instantáneas entre cuentas y otros bancos' },
                { icon: '📊', title: 'Dashboard Financiero', desc: 'Visualización detallada de gastos y análisis de patrones' },
                { icon: '💳', title: 'Gestión de Tarjetas', desc: 'Activación, bloqueo y control de límites de tarjetas' },
                { icon: '🏧', title: 'Retiros y Depósitos', desc: 'Localización de cajeros y depósitos móviles' },
                { icon: '🔔', title: 'Notificaciones', desc: 'Alertas en tiempo real de transacciones y saldo' }
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
                { name: 'React Native', type: 'Mobile', desc: 'Desarrollo nativo para iOS y Android' },
                { name: 'Firebase', type: 'Backend', desc: 'Base de datos y autenticación en tiempo real' },
                { name: 'Node.js', type: 'API', desc: 'Servidor seguro y escalable' },
                { name: 'Blockchain', type: 'Security', desc: 'Transacciones seguras y verificables' },
                { name: 'AWS', type: 'Cloud', desc: 'Infraestructura segura y compliance' },
                { name: 'Docker', type: 'DevOps', desc: 'Contenedores para despliegue seguro' }
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
                    background: 'linear-gradient(135deg, #1e3c72, #2a5298)',
                    padding: '20px',
                    borderRadius: '15px',
                    marginBottom: '20px',
                    color: 'white'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <h3 style={{ margin: '0', fontSize: '1.2rem' }}>Mi Banco</h3>
                        <p style={{ margin: '0', fontSize: '0.9rem', opacity: 0.8 }}>Buenos días</p>
                      </div>
                      <div style={{ fontSize: '1.5rem' }}>👤</div>
                    </div>
                  </div>

                  {/* Balance Card */}
                  <div style={{
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    padding: '25px',
                    borderRadius: '15px',
                    marginBottom: '20px',
                    color: 'white',
                    textAlign: 'left'
                  }}>
                    <p style={{ margin: '0 0 10px 0', fontSize: '0.9rem', opacity: 0.8 }}>Saldo disponible</p>
                    <h2 style={{ margin: '0', fontSize: '2rem' }}>$5.847.320</h2>
                    <p style={{ margin: '10px 0 0 0', fontSize: '0.8rem', opacity: 0.8 }}>**** **** **** 8274</p>
                  </div>

                  {/* Quick Actions */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '15px',
                    marginBottom: '20px'
                  }}>
                    {[
                      { icon: '💸', label: 'Transferir' },
                      { icon: '💳', label: 'Pagar' },
                      { icon: '📊', label: 'Extractos' },
                      { icon: '🏧', title: 'Retirar' },
                      { icon: '🔔', label: 'Alertas' },
                      { icon: '⚙️', label: 'Config' }
                    ].map((action, index) => (
                      <div key={index} style={{
                        background: '#f8f9fa',
                        padding: '15px',
                        borderRadius: '10px',
                        textAlign: 'center',
                        cursor: 'pointer'
                      }}>
                        <div style={{ fontSize: '1.5rem', marginBottom: '5px' }}>{action.icon}</div>
                        <p style={{ margin: '0', fontSize: '0.8rem', color: '#333' }}>{action.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Recent Transactions */}
                  <div style={{
                    background: '#f8f9fa',
                    padding: '15px',
                    borderRadius: '10px',
                    textAlign: 'left'
                  }}>
                    <h4 style={{ margin: '0 0 15px 0', color: '#333' }}>Transacciones recientes</h4>
                    {[
                      { name: 'Netflix', amount: '-$45.990', date: 'Hoy' },
                      { name: 'Salario', amount: '+$2.500.000', date: 'Ayer' },
                      { name: 'Supermercado', amount: '-$125.750', date: '2 días' }
                    ].map((trans, index) => (
                      <div key={index} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '10px 0',
                        borderBottom: '1px solid #dee2e6'
                      }}>
                        <div>
                          <p style={{ margin: '0', color: '#333', fontWeight: 'bold' }}>{trans.name}</p>
                          <p style={{ margin: '0', color: '#666', fontSize: '0.8rem' }}>{trans.date}</p>
                        </div>
                        <p style={{ 
                          margin: '0', 
                          color: trans.amount.startsWith('+') ? '#28a745' : '#dc3545',
                          fontWeight: 'bold'
                        }}>{trans.amount}</p>
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
        <h2 style={{ color: '#64FFDA', marginBottom: '20px' }}>¿Necesitas una app bancaria?</h2>
        <p style={{ color: '#CCD6F6', marginBottom: '30px', fontSize: '1.1rem' }}>
          Desarrollamos aplicaciones financieras seguras y profesionales
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

export default MockupBanking;
