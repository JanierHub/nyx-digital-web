import { useState, useEffect } from "react";
import { useAuthContext } from "./AuthProvider";

// Lista de palabras prohibidas para filtrar
const BAD_WORDS = [
  'puta', 'puto', 'mierda', 'carajo', 'chingar', 'chingada', 'verga', 'pendejo', 'pendeja',
  'cabrón', 'cabron', 'joder', 'hostia', 'coño', 'gilipollas', 'maricón', 'maricon',
  'zorra', 'zorr', 'perra', 'puñeta', 'culo', 'pene', 'vagina', 'pito', 'teta', 'tetas',
  'mastur', 'sexo', 'porn', 'xxx', 'cp', 'pedof', 'violad', 'violaci', 'abus',
  'estupido', 'estúpido', 'idiota', 'imbecil', 'imbécil', 'tonto', 'retrasado', 'mongol',
  'maldit', 'diabl', 'satan', 'infiern', 'muer', 'matar', 'asesin', 'terror', 'bomba',
  'droga', 'cocaína', 'marihuan', 'cocain', 'heroin', 'meth', 'fentanil',
  'hdp', 'ptm', 'cm', 'vrg', 'pk', 'hp', 'chtm', 'mamahuev', 'sape', 'sap',
  'gonorre', 'malparid', 'huevón', 'cachón', 'carechimb', 'chimba', 'guevon',
  'gonorrea', 'malparido', 'malparida', 'cachón', 'cachon', 'carechimba'
];

function filterProfanity(text) {
  let filtered = text;
  BAD_WORDS.forEach(word => {
    const regex = new RegExp(word, 'gi');
    filtered = filtered.replace(regex, '***');
  });
  return filtered;
}

function Testimonials() {
  const { user, theme, isAdmin } = useAuthContext();
  const [reviews, setReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({ name: "", text: "" });
  const [error, setError] = useState("");

  // Cargar reseñas del localStorage
  useEffect(() => {
    const saved = localStorage.getItem('nyx_reviews');
    if (saved) {
      setReviews(JSON.parse(saved));
    } else {
      // Reseñas iniciales
      const initial = [
        { id: 1, name: "María Rodríguez", text: "Mi negocio creció gracias a esta web. Increíble trabajo!", date: "2024-03-15", likes: 12, hidden: false },
        { id: 2, name: "Carlos Martínez", text: "Profesional y rápido, recomendado al 100%.", date: "2024-03-10", likes: 8, hidden: false },
        { id: 3, name: "Ana López", text: "Ahora tengo presencia online real. Gracias Nyx Digital!", date: "2024-03-05", likes: 15, hidden: false }
      ];
      setReviews(initial);
      localStorage.setItem('nyx_reviews', JSON.stringify(initial));
    }
  }, []);

  // Guardar reseñas cuando cambian
  useEffect(() => {
    if (reviews.length > 0) {
      localStorage.setItem('nyx_reviews', JSON.stringify(reviews));
    }
  }, [reviews]);

  const checkProfanity = (text) => {
    const lowerText = text.toLowerCase();
    return BAD_WORDS.some(word => lowerText.includes(word));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    
    if (!newReview.name.trim() || !newReview.text.trim()) {
      setError("Por favor completa todos los campos");
      return;
    }

    // Verificar groserías
    if (checkProfanity(newReview.name) || checkProfanity(newReview.text)) {
      setError("Tu reseña contiene lenguaje inapropiado. Por favor sé respetuoso.");
      return;
    }

    // Filtrar groserías
    const filteredName = filterProfanity(newReview.name);
    const filteredText = filterProfanity(newReview.text);

    const review = {
      id: Date.now(),
      name: filteredName,
      text: filteredText,
      date: new Date().toISOString().split('T')[0],
      likes: 0,
      hidden: false
    };

    setReviews([review, ...reviews]);
    setNewReview({ name: "", text: "" });
    setShowForm(false);
  };

  const handleLike = (id) => {
    setReviews(reviews.map(r => 
      r.id === id ? { ...r, likes: r.likes + 1 } : r
    ));
  };

  const toggleHideReview = (id) => {
    if (!isAdmin) return;
    setReviews(reviews.map(r => 
      r.id === id ? { ...r, hidden: !r.hidden } : r
    ));
  };

  const deleteReview = (id) => {
    if (!isAdmin) return;
    if (confirm('¿Estás seguro de eliminar esta reseña permanentemente?')) {
      setReviews(reviews.filter(r => r.id !== id));
    }
  };

  const isLight = theme === 'light';
  
  // Filtrar solo reseñas visibles para usuarios no-admin
  const visibleReviews = isAdmin ? reviews : reviews.filter(r => !r.hidden);

  const styles = {
    section: {
      padding: "100px 40px",
      textAlign: "center",
      background: isLight ? '#f8f9fa' : 'linear-gradient(135deg, #112240, #0A192F)',
      color: isLight ? '#333333' : '#CCD6F6'
    },
    title: {
      fontSize: "2.5rem",
      fontWeight: "700",
      marginBottom: "10px",
      background: isLight ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'linear-gradient(135deg, #64FFDA, #00E5FF)',
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text"
    },
    subtitle: {
      fontSize: "1.1rem",
      color: isLight ? '#6c757d' : '#8892B0',
      marginBottom: "40px"
    },
    addButton: {
      background: isLight ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'linear-gradient(135deg, #64FFDA, #00E5FF)',
      color: isLight ? '#ffffff' : '#0A192F',
      border: "none",
      padding: "12px 24px",
      borderRadius: "25px",
      fontSize: "1rem",
      fontWeight: "600",
      cursor: "pointer",
      marginBottom: "30px",
      transition: "all 0.3s ease",
      boxShadow: isLight ? '0 4px 15px rgba(102,126,234,0.4)' : '0 4px 15px rgba(100,255,218,0.3)'
    },
    form: {
      maxWidth: "500px",
      margin: "0 auto 40px",
      padding: "25px",
      background: isLight ? '#ffffff' : 'rgba(17,34,64,0.8)',
      borderRadius: "15px",
      border: `1px solid ${isLight ? '#dee2e6' : 'rgba(100,255,218,0.2)'}`,
      boxShadow: isLight ? '0 4px 20px rgba(0,0,0,0.1)' : '0 4px 20px rgba(0,0,0,0.3)'
    },
    error: {
      background: "rgba(231, 76, 60, 0.1)",
      border: "1px solid #e74c3c",
      color: "#e74c3c",
      padding: "12px",
      borderRadius: "8px",
      marginBottom: "15px",
      fontSize: "0.9rem"
    },
    input: {
      width: "100%",
      padding: "12px 15px",
      marginBottom: "15px",
      borderRadius: "8px",
      border: `1px solid ${isLight ? '#dee2e6' : 'rgba(100,255,218,0.3)'}`,
      background: isLight ? '#f8f9fa' : 'rgba(10,25,47,0.5)',
      color: isLight ? '#333333' : '#CCD6F6',
      fontSize: "1rem",
      outline: "none"
    },
    textarea: {
      width: "100%",
      padding: "12px 15px",
      marginBottom: "15px",
      borderRadius: "8px",
      border: `1px solid ${isLight ? '#dee2e6' : 'rgba(100,255,218,0.3)'}`,
      background: isLight ? '#f8f9fa' : 'rgba(10,25,47,0.5)',
      color: isLight ? '#333333' : '#CCD6F6',
      fontSize: "1rem",
      minHeight: "100px",
      resize: "vertical",
      outline: "none",
      fontFamily: "inherit"
    },
    submitButton: {
      background: isLight ? '#28a745' : '#64FFDA',
      color: isLight ? '#ffffff' : '#0A192F',
      border: "none",
      padding: "10px 20px",
      borderRadius: "8px",
      fontSize: "1rem",
      fontWeight: "600",
      cursor: "pointer",
      marginRight: "10px"
    },
    cancelButton: {
      background: "transparent",
      color: isLight ? '#6c757d' : '#8892B0',
      border: `1px solid ${isLight ? '#dee2e6' : 'rgba(100,255,218,0.3)'}`,
      padding: "10px 20px",
      borderRadius: "8px",
      fontSize: "1rem",
      cursor: "pointer"
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "25px",
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "0 20px"
    },
    card: {
      background: isLight ? '#ffffff' : 'rgba(17,34,64,0.6)',
      padding: "25px",
      borderRadius: "15px",
      border: `1px solid ${isLight ? '#e9ecef' : 'rgba(100,255,218,0.15)'}`,
      boxShadow: isLight ? '0 4px 15px rgba(0,0,0,0.08)' : '0 4px 15px rgba(0,0,0,0.2)',
      transition: "all 0.3s ease",
      textAlign: "left",
      position: "relative",
      opacity: 1
    },
    cardHidden: {
      opacity: 0.5,
      background: isLight ? '#f8f9fa' : 'rgba(17,34,64,0.3)',
      border: `2px dashed ${isLight ? '#dee2e6' : 'rgba(100,255,218,0.3)'}`
    },
    hiddenBadge: {
      position: "absolute",
      top: "10px",
      right: "10px",
      background: "#e74c3c",
      color: "#ffffff",
      padding: "2px 8px",
      borderRadius: "8px",
      fontSize: "0.7rem",
      fontWeight: "600"
    },
    quoteIcon: {
      fontSize: "3rem",
      color: isLight ? '#667eea' : '#64FFDA',
      opacity: 0.3,
      position: "absolute",
      top: "10px",
      left: "15px"
    },
    cardText: {
      fontSize: "1.1rem",
      color: isLight ? '#495057' : '#CCD6F6',
      lineHeight: "1.6",
      marginTop: "25px",
      marginBottom: "20px",
      fontStyle: "italic"
    },
    cardAuthor: {
      fontSize: "0.95rem",
      color: isLight ? '#667eea' : '#64FFDA',
      fontWeight: "600",
      marginBottom: "5px"
    },
    cardDate: {
      fontSize: "0.8rem",
      color: isLight ? '#adb5bd' : '#8892B0'
    },
    cardFooter: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: "15px",
      paddingTop: "15px",
      borderTop: `1px solid ${isLight ? '#e9ecef' : 'rgba(100,255,218,0.1)'}`
    },
    likeButton: {
      background: "transparent",
      border: "none",
      color: isLight ? '#e74c3c' : '#64FFDA',
      cursor: "pointer",
      fontSize: "1rem",
      display: "flex",
      alignItems: "center",
      gap: "5px"
    },
    badge: {
      position: "absolute",
      top: "15px",
      right: "15px",
      background: isLight ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'linear-gradient(135deg, #64FFDA, #00E5FF)',
      color: isLight ? '#ffffff' : '#0A192F',
      padding: "4px 10px",
      borderRadius: "12px",
      fontSize: "0.75rem",
      fontWeight: "600"
    },
    adminControls: {
      display: "flex",
      gap: "10px",
      marginTop: "10px",
      paddingTop: "10px",
      borderTop: `1px dashed ${isLight ? '#dee2e6' : 'rgba(100,255,218,0.2)'}`
    },
    adminButton: {
      padding: "6px 12px",
      borderRadius: "6px",
      border: "none",
      fontSize: "0.8rem",
      cursor: "pointer",
      fontWeight: "500"
    },
    hideButton: {
      background: "#f39c12",
      color: "#ffffff"
    },
    showButton: {
      background: "#27ae60",
      color: "#ffffff"
    },
    deleteButton: {
      background: "#e74c3c",
      color: "#ffffff"
    }
  };

  return (
    <section style={styles.section}>
      <h2 style={styles.title}>Resultados Reales</h2>
      <p style={styles.subtitle}>Testimonios de clientes satisfechos</p>

      <button 
        style={styles.addButton}
        onClick={() => setShowForm(!showForm)}
        onMouseOver={(e) => {
          e.target.style.transform = "translateY(-2px) scale(1.05)";
        }}
        onMouseOut={(e) => {
          e.target.style.transform = "translateY(0) scale(1)";
        }}
      >
        {showForm ? "✕ Cancelar" : "+ Agregar mi reseña"}
      </button>

      {showForm && (
        <form style={styles.form} onSubmit={handleSubmit}>
          {error && <div style={styles.error}>{error}</div>}
          <input
            type="text"
            placeholder="Tu nombre"
            value={newReview.name}
            onChange={(e) => setNewReview({...newReview, name: e.target.value})}
            style={styles.input}
            maxLength={50}
            required
          />
          <textarea
            placeholder="Comparte tu experiencia..."
            value={newReview.text}
            onChange={(e) => setNewReview({...newReview, text: e.target.value})}
            style={styles.textarea}
            maxLength={300}
            required
          />
          <div style={{fontSize: "0.8rem", color: isLight ? '#6c757d' : '#8892B0', marginBottom: "10px"}}>
            {newReview.text.length}/300 caracteres
          </div>
          <div>
            <button type="submit" style={styles.submitButton}>Publicar reseña</button>
            <button type="button" style={styles.cancelButton} onClick={() => {setShowForm(false); setError("");}}>Cancelar</button>
          </div>
        </form>
      )}

      {isAdmin && (
        <div style={{marginBottom: "20px", fontSize: "0.9rem", color: isLight ? '#6c757d' : '#8892B0'}}>
          Panel Admin: Tienes {reviews.filter(r => r.hidden).length} reseñas ocultas de {reviews.length} total
        </div>
      )}

      <div style={styles.grid}>
        {visibleReviews.map((review, index) => (
          <div 
            key={review.id} 
            style={{
              ...styles.card,
              ...(review.hidden ? styles.cardHidden : {})
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = isLight 
                ? '0 8px 25px rgba(0,0,0,0.15)' 
                : '0 8px 25px rgba(100,255,218,0.15)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = isLight 
                ? '0 4px 15px rgba(0,0,0,0.08)' 
                : '0 4px 15px rgba(0,0,0,0.2)';
            }}
          >
            {index === 0 && !review.hidden && <span style={styles.badge}>Más reciente</span>}
            {review.hidden && <span style={styles.hiddenBadge}>OCULTA</span>}
            <span style={styles.quoteIcon}>"</span>
            <p style={styles.cardText}>"{review.text}"</p>
            <div style={styles.cardFooter}>
              <div>
                <div style={styles.cardAuthor}>- {review.name}</div>
                <div style={styles.cardDate}>{review.date}</div>
              </div>
              <button 
                style={styles.likeButton}
                onClick={() => handleLike(review.id)}
                title="Me gusta"
              >
                â¤ {review.likes}
              </button>
            </div>
            
            {isAdmin && (
              <div style={styles.adminControls}>
                <button 
                  style={{...styles.adminButton, ...(review.hidden ? styles.showButton : styles.hideButton)}}
                  onClick={() => toggleHideReview(review.id)}
                >
                  {review.hidden ? "â Mostrar" : "ð Ocultar"}
                </button>
                <button 
                  style={{...styles.adminButton, ...styles.deleteButton}}
                  onClick={() => deleteReview(review.id)}
                >
                  ð Eliminar
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {visibleReviews.length === 0 && (
        <div style={{padding: "40px", color: isLight ? '#6c757d' : '#8892B0', fontSize: "1.1rem"}}>
          No hay reseñas disponibles en este momento.
        </div>
      )}
    </section>
  );
}

export default Testimonials;