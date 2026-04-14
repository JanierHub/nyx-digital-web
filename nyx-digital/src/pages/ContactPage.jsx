import { useState } from "react";
import { useFormApi } from "../hooks/useApi";
import { contactAPI } from "../services/api";

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "paginas-web",
    message: "",
    timeline: ""
  });

  const [errors, setErrors] = useState({});

  const { data, loading, error, success, submit, reset } = useFormApi(contactAPI.submit);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido";
    } else if (formData.name.length < 2) {
      newErrors.name = "El nombre debe tener al menos 2 caracteres";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Por favor ingresa un email válido";
    }

    if (!formData.message.trim()) {
      newErrors.message = "El mensaje es requerido";
    } else if (formData.message.length < 10) {
      newErrors.message = "El mensaje debe tener al menos 10 caracteres";
    } else if (formData.message.length > 1000) {
      newErrors.message = "El mensaje no puede exceder 1000 caracteres";
    }

    if (formData.phone && !/^\+?[\d\s\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = "Por favor ingresa un número de teléfono válido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await submit(formData);
      // Reset form on success
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "paginas-web",
        message: "",
        timeline: ""
      });
      setErrors({});
    } catch (err) {
      // Error is handled by the hook
      console.error('Form submission error:', err);
    }
  };

  return (
    <div style={{
      width: "100%",
      color: "white"
    }}>
      <div style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "60px 20px",
        minHeight: "100vh",
      }}>
        <h1 style={{
          fontSize: "2.5rem",
          fontWeight: "700",
          marginBottom: "20px",
          background: "linear-gradient(135deg, #CCD6F6, #64FFDA)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}>Contacto</h1>
        <p style={{
          fontSize: "1.1rem",
          color: "#8892B0",
          marginBottom: "40px",
          lineHeight: "1.6",
        }}>
          ¿Tienes un proyecto en mente? Nos encantaría saber de ti. Envíanos un mensaje y te responderemos lo antes posible.
        </p>

        {success && (
          <div style={{
            background: "rgba(46, 204, 113, 0.1)",
            border: "1px solid #2ecc71",
            color: "#2ecc71",
            padding: "16px",
            borderRadius: "8px",
            marginBottom: "20px",
            textAlign: "center",
          }}>
            ¡Gracias por contactarnos! Te responderemos dentro de 24-48 horas.
          </div>
        )}

        {error && (
          <div style={{
            background: "rgba(231, 76, 60, 0.1)",
            border: "1px solid #e74c3c",
            color: "#e74c3c",
            padding: "16px",
            borderRadius: "8px",
            marginBottom: "20px",
            textAlign: "center",
          }}>
            {error.message || 'Hubo un error al enviar el formulario. Por favor intenta de nuevo.'}
          </div>
        )}

        <form style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }} onSubmit={handleSubmit}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}>
            <div style={{
              display: "flex",
              flexDirection: "column",
            }}>
              <label style={{
                marginBottom: "8px",
                fontSize: "14px",
                fontWeight: "500",
                color: "#CCD6F6",
              }}>Nombre *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{
                  padding: "12px 16px",
                  borderRadius: "8px",
                  border: "1px solid #1f1f2e",
                  backgroundColor: "rgba(17,34,64,0.5)",
                  color: "#CCD6F6",
                  fontSize: "14px",
                  transition: "all 0.3s ease",
                  ...(errors.name ? {
                    borderColor: "#e74c3c",
                    backgroundColor: "rgba(231, 76, 60, 0.1)",
                  } : {})
                }}
                disabled={loading}
              />
              {errors.name && <span style={{
                color: "#e74c3c",
                fontSize: "12px",
                marginTop: "4px",
              }}>{errors.name}</span>}
            </div>

            <div style={{
              display: "flex",
              flexDirection: "column",
            }}>
              <label style={{
                marginBottom: "8px",
                fontSize: "14px",
                fontWeight: "500",
                color: "#CCD6F6",
              }}>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  padding: "12px 16px",
                  borderRadius: "8px",
                  border: "1px solid #1f1f2e",
                  backgroundColor: "rgba(17,34,64,0.5)",
                  color: "#CCD6F6",
                  fontSize: "14px",
                  transition: "all 0.3s ease",
                  ...(errors.email ? {
                    borderColor: "#e74c3c",
                    backgroundColor: "rgba(231, 76, 60, 0.1)",
                  } : {})
                }}
                disabled={loading}
              />
              {errors.email && <span style={{
                color: "#e74c3c",
                fontSize: "12px",
                marginTop: "4px",
              }}>{errors.email}</span>}
            </div>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}>
            <div style={{
              display: "flex",
              flexDirection: "column",
            }}>
              <label style={{
                marginBottom: "8px",
                fontSize: "14px",
                fontWeight: "500",
                color: "#CCD6F6",
              }}>Teléfono</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 234 567 8900"
                style={{
                  padding: "12px 16px",
                  borderRadius: "8px",
                  border: "1px solid #1f1f2e",
                  backgroundColor: "rgba(17,34,64,0.5)",
                  color: "#CCD6F6",
                  fontSize: "14px",
                  transition: "all 0.3s ease",
                  ...(errors.phone ? {
                    borderColor: "#e74c3c",
                    backgroundColor: "rgba(231, 76, 60, 0.1)",
                  } : {})
                }}
                disabled={loading}
              />
              {errors.phone && <span style={{
                color: "#e74c3c",
                fontSize: "12px",
                marginTop: "4px",
              }}>{errors.phone}</span>}
            </div>

            <div style={{
              display: "flex",
              flexDirection: "column",
            }}>
              <label style={{
                marginBottom: "8px",
                fontSize: "14px",
                fontWeight: "500",
                color: "#CCD6F6",
              }}>Empresa</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Nombre de tu empresa"
                style={{
                  padding: "12px 16px",
                  borderRadius: "8px",
                  border: "1px solid #1f1f2e",
                  backgroundColor: "rgba(17,34,64,0.5)",
                  color: "#CCD6F6",
                  fontSize: "14px",
                  transition: "all 0.3s ease",
                }}
                disabled={loading}
              />
            </div>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}>
            <div style={{
              display: "flex",
              flexDirection: "column",
            }}>
              <label style={{
                marginBottom: "8px",
                fontSize: "14px",
                fontWeight: "500",
                color: "#CCD6F6",
              }}>Servicio *</label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                style={{
                  padding: "12px 16px",
                  borderRadius: "8px",
                  border: "1px solid #1f1f2e",
                  backgroundColor: "rgba(17,34,64,0.5)",
                  color: "#CCD6F6",
                  fontSize: "14px",
                  transition: "all 0.3s ease",
                  ...(errors.service ? {
                    borderColor: "#e74c3c",
                    backgroundColor: "rgba(231, 76, 60, 0.1)",
                  } : {})
                }}
                disabled={loading}
              >
                <option value="desarrollo-frontend">Desarrollo Frontend</option>
                <option value="desarrollo-backend">Desarrollo Backend</option>
                <option value="desarrollo-fullstack">Desarrollo Full-Stack</option>
                <option value="servicio-despliegue">Servicio de Despliegue</option>
                <option value="otro">Otro Servicio</option>
              </select>
            </div>

                      </div>

          <div style={{
            display: "flex",
            flexDirection: "column",
          }}>
            <label style={{
              marginBottom: "8px",
              fontSize: "14px",
              fontWeight: "500",
              color: "#CCD6F6",
            }}>Plazo</label>
            <select
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
              style={{
                padding: "12px 16px",
                borderRadius: "8px",
                border: "1px solid #1f1f2e",
                backgroundColor: "rgba(17,34,64,0.5)",
                color: "#CCD6F6",
                fontSize: "14px",
                transition: "all 0.3s ease",
              }}
              disabled={loading}
            >
              <option value="">¿Cuándo necesitas tu proyecto?</option>
              <option value="urgente">¡Lo más pronto posible!</option>
              <option value="2-4-semanas">En 2-4 semanas</option>
              <option value="1-mes">En 1 mes</option>
              <option value="2-meses">En 2 meses</option>
              <option value="3-meses">En 3 meses o más</option>
            </select>
          </div>

          <div style={{
            display: "flex",
            flexDirection: "column",
          }}>
            <label style={{
              marginBottom: "8px",
              fontSize: "14px",
              fontWeight: "500",
              color: "#CCD6F6",
            }}>Mensaje *</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              placeholder="Cuéntanos sobre tu proyecto..."
              style={{
                padding: "12px 16px",
                borderRadius: "8px",
                border: "1px solid #1f1f2e",
                backgroundColor: "rgba(17,34,64,0.5)",
                color: "#CCD6F6",
                fontSize: "14px",
                transition: "all 0.3s ease",
                minHeight: "120px",
                ...(errors.message ? {
                  borderColor: "#e74c3c",
                  backgroundColor: "rgba(231, 76, 60, 0.1)",
                } : {})
              }}
              disabled={loading}
            />
            {errors.message && <span style={{
              color: "#e74c3c",
              fontSize: "12px",
              marginTop: "4px",
            }}>{errors.message}</span>}
          </div>

          <button 
            type="submit" 
            style={{
              background: "linear-gradient(135deg, #64FFDA, #00E5FF)",
              color: "#0A192F",
              border: "none",
              padding: "14px 28px",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
              alignSelf: "flex-start",
              ...(loading ? {
                opacity: 0.7,
                cursor: 'not-allowed',
              } : {})
            }}
            disabled={loading}
          >
            {loading ? 'Enviando...' : 'Enviar mensaje'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactPage;