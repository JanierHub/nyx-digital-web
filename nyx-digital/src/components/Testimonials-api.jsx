import { useState, useEffect } from "react";
import { useAuthContext } from "./AuthProvider";
import { reviewsAPI } from "../services/api.js";

function Testimonials() {
  const { user, theme, isAdmin } = useAuthContext();
  const [reviews, setReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({ name: "", text: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Cargar reseñas desde el backend
  useEffect(() => {
    loadReviews();
  }, [isAdmin]);

  const loadReviews = async () => {
    try {
      setLoading(true);
      const response = await reviewsAPI.getAll(isAdmin);
      if (response.data?.reviews) {
        setReviews(response.data.reviews);
      }
    } catch (error) {
      console.error("Error loading reviews:", error);
      setError("Error al cargar reseñas");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!newReview.name.trim() || !newReview.text.trim()) {
      setError("Por favor completa todos los campos");
      return;
    }

    try {
      const response = await reviewsAPI.create({
        name: newReview.name,
        text: newReview.text
      });
      
      if (response.data?.review) {
        setReviews([response.data.review, ...reviews]);
        setNewReview({ name: "", text: "" });
        setShowForm(false);
      }
    } catch (error) {
      console.error("Error creating review:", error);
      setError(error.response?.data?.message || "Error al crear reseña");
    }
  };

  const handleLike = async (id) => {
    try {
      const response = await reviewsAPI.like(id);
      if (response.data?.review) {
        setReviews(reviews.map(r => 
          r._id === id ? response.data.review : r
        ));
      }
    } catch (error) {
      console.error("Error liking review:", error);
      if (error.response?.data?.message === 'Already liked') {
        setError("Ya le diste like a esta reseña");
      }
    }
  };

  const toggleHideReview = async (id) => {
    if (!isAdmin) return;
    try {
      const response = await reviewsAPI.toggleHide(id);
      if (response.data?.review) {
        setReviews(reviews.map(r => 
          r._id === id ? response.data.review : r
        ));
      }
    } catch (error) {
      console.error("Error toggling review:", error);
    }
  };

  const deleteReview = async (id) => {
    if (!isAdmin) return;
    if (!confirm('¿Estás seguro de eliminar esta reseña permanentemente?')) return;
    
    try {
      await reviewsAPI.delete(id);
      setReviews(reviews.filter(r => r._id !== id));
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const isLight = theme === 'light';
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
      marginBottom: "30px"
    },
    form: {
      maxWidth: "500px",
      margin: "0 auto 40px",
      padding: "25px",
      background: isLight ? '#ffffff' : 'rgba(17,34,64,0.8)',
      borderRadius: "15px"
    },
    error: {
      background: "rgba(231, 76, 60, 0.1)",
      border: "1px solid #e74c3c",
      color: "#e74c3c",
      padding: "12px",
      borderRadius: "8px",
      marginBottom: "15px"
    },
    input: {
      width: "100%",
      padding: "12px 15px",
      marginBottom: "15px",
      borderRadius: "8px",
      border: `1px solid ${isLight ? '#dee2e6' : 'rgba(100,255,218,0.3)'}`,
      background: isLight ? '#f8f9fa' : 'rgba(10,25,47,0.5)',
      color: isLight ? '#333333' : '#CCD6F6',
      fontSize: "1rem"
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
      resize: "vertical"
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
      margin: "0 auto"
    },
    card: {
      background: isLight ? '#ffffff' : 'rgba(17,34,64,0.6)',
      padding: "25px",
      borderRadius: "15px",
      border: `1px solid ${isLight ? '#e9ecef' : 'rgba(100,255,218,0.15)'}`,
      textAlign: "left",
      position: "relative"
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
      fontWeight: "600"
    },
    cardDate: {
      fontSize: "0.8rem",
      color: isLight ? '#adb5bd' : '#8892B0'
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
      marginTop: "10px"
    },
    adminButton: {
      padding: "6px 12px",
      borderRadius: "6px",
      border: "none",
      fontSize: "0.8rem",
      cursor: "pointer"
    }
  };

  if (loading) {
    return (
      <section style={styles.section}>
        <h2 style={styles.title}>Resultados Reales</h2>
        <p style={{color: isLight ? '#6c757d' : '#8892B0'}}>Cargando reseñas...</p>
      </section>
    );
  }

  return (
    <section style={styles.section}>
      <h2 style={styles.title}>Resultados Reales</h2>
      <p style={styles.subtitle}>Testimonios de clientes satisfechos</p>

      <button 
        style={styles.addButton}
        onClick={() => setShowForm(!showForm)}
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
          <div>
            <button type="submit" style={styles.submitButton}>Publicar</button>
            <button type="button" style={styles.cancelButton} onClick={() => setShowForm(false)}>Cancelar</button>
          </div>
        </form>
      )}

      {isAdmin && (
        <div style={{marginBottom: "20px", color: isLight ? '#6c757d' : '#8892B0'}}>
          Panel Admin: {reviews.filter(r => r.hidden).length} reseñas ocultas de {reviews.length} total
        </div>
      )}

      <div style={styles.grid}>
        {visibleReviews.map((review, index) => (
          <div 
            key={review._id} 
            style={{...styles.card, ...(review.hidden ? styles.cardHidden : {})}}
          >
            {index === 0 && !review.hidden && <span style={styles.badge}>Más reciente</span>}
            {review.hidden && <span style={styles.hiddenBadge}>OCULTA</span>}
            
            <p style={styles.cardText}>"{review.text}"</p>
            
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
              <div>
                <div style={styles.cardAuthor}>- {review.name}</div>
                <div style={styles.cardDate}>
                  {new Date(review.createdAt).toLocaleDateString('es-ES')}
                </div>
              </div>
              <button 
                style={styles.likeButton}
                onClick={() => handleLike(review._id)}
              >
                ❤️ {review.likes}
              </button>
            </div>
            
            {isAdmin && (
              <div style={styles.adminControls}>
                <button 
                  style={{...styles.adminButton, background: review.hidden ? '#27ae60' : '#f39c12', color: '#fff'}}
                  onClick={() => toggleHideReview(review._id)}
                >
                  {review.hidden ? "👁️ Mostrar" : "🙈 Ocultar"}
                </button>
                <button 
                  style={{...styles.adminButton, background: '#e74c3c', color: '#fff'}}
                  onClick={() => deleteReview(review._id)}
                >
                  🗑️ Eliminar
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {visibleReviews.length === 0 && (
        <div style={{padding: "40px", color: isLight ? '#6c757d' : '#8892B0'}}>
          No hay reseñas disponibles.
        </div>
      )}
    </section>
  );
}

export default Testimonials;
