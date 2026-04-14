import { useState, useEffect } from "react";
import { useAuthContext } from "./AuthProvider";

function ForumResults() {
  const { user, theme } = useAuthContext();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const [showNewPost, setShowNewPost] = useState(false);
  const [expandedPost, setExpandedPost] = useState(null);

  useEffect(() => {
    // Cargar posts del localStorage
    const savedPosts = localStorage.getItem('forumPosts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      // Posts iniciales de ejemplo
      const initialPosts = [
        {
          id: 1,
          title: "Mi tienda online aumentó ventas 300%",
          content: "Contraté el servicio e-commerce y en 3 meses mis ventas se triplicaron. La optimización SEO hizo maravillas y ahora aparezo en los primeros resultados de Google. ¡Increíble inversión!",
          author: "María Rodríguez",
          date: "2024-03-15",
          likes: 24,
          comments: [
            { id: 1, author: "Juan Pérez", content: "¡Felicidades! ¿Qué tipo de productos vendes?", date: "2024-03-16" },
            { id: 2, author: "Ana García", content: "Me interesa mucho, ¿podrías compartir más detalles?", date: "2024-03-17" }
          ]
        },
        {
          id: 2,
          title: "Web corporativa profesional y moderna",
          content: "Necesitábamos una imagen profesional para nuestra empresa de consultoría. El resultado fue exactamente lo que buscábamos: elegante, funcional y optimizada para móviles. Nuestros clientes nos felicitan constantemente.",
          author: "Carlos Martínez",
          date: "2024-03-10",
          likes: 18,
          comments: [
            { id: 1, author: "Laura Sánchez", content: "¿Tienen portfolio para ver ejemplos?", date: "2024-03-11" }
          ]
        },
        {
          id: 3,
          title: "Sistema de reservas para restaurante",
          content: "Implementaron un sistema completo de reservas online que redujo nuestras llamadas telefónicas en un 70%. Los clientes pueden reservar fácilmente y nosotros gestionamos todo desde un panel administrativo simple.",
          author: "Roberto Silva",
          date: "2024-03-05",
          likes: 31,
          comments: [
            { id: 1, author: "Sofia López", content: "¡Esto es genial! ¿Se integra con WhatsApp?", date: "2024-03-06" },
            { id: 2, author: "Diego Torres", content: "¿Cuál fue el tiempo de implementación?", date: "2024-03-07" }
          ]
        }
      ];
      setPosts(initialPosts);
      localStorage.setItem('forumPosts', JSON.stringify(initialPosts));
    }
  }, []);

  const handleSubmitPost = () => {
    if (newPost.title && newPost.content && user) {
      const post = {
        id: Date.now(),
        title: newPost.title,
        content: newPost.content,
        author: user.name || user.email,
        date: new Date().toISOString().split('T')[0],
        likes: 0,
        comments: []
      };
      const updatedPosts = [post, ...posts];
      setPosts(updatedPosts);
      localStorage.setItem('forumPosts', JSON.stringify(updatedPosts));
      setNewPost({ title: "", content: "" });
      setShowNewPost(false);
    }
  };

  const handleLike = (postId) => {
    const updatedPosts = posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    );
    setPosts(updatedPosts);
    localStorage.setItem('forumPosts', JSON.stringify(updatedPosts));
  };

  const handleComment = (postId, comment) => {
    if (!comment.trim() || !user) return;
    
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, {
            id: Date.now(),
            author: user.name || user.email,
            content: comment,
            date: new Date().toISOString().split('T')[0]
          }]
        };
      }
      return post;
    });
    setPosts(updatedPosts);
    localStorage.setItem('forumPosts', JSON.stringify(updatedPosts));
  };

  const getThemeColors = () => {
    if (theme === 'light') {
      return {
        background: '#ffffff',
        cardBg: '#f8f9fa',
        borderColor: '#dee2e6',
        textPrimary: '#000000',
        textSecondary: '#6c757d',
        accent: '#007bff',
        hover: '#f1f3f4'
      };
    }
    return {
      background: 'linear-gradient(135deg, #112240, #0A192F)',
      cardBg: 'rgba(17,34,64,0.8)',
      borderColor: 'rgba(100,255,218,0.2)',
      textPrimary: '#CCD6F6',
      textSecondary: '#8892B0',
      accent: '#64FFDA',
      hover: 'rgba(100,255,218,0.1)'
    };
  };

  const colors = getThemeColors();

  const sectionStyle = {
    padding: "100px 40px",
    background: colors.background,
    color: colors.textPrimary,
    minHeight: "100vh"
  };

  const headerStyle = {
    textAlign: "center",
    marginBottom: "60px"
  };

  const titleStyle = {
    fontSize: "clamp(2rem, 4vw, 2.5rem)",
    fontWeight: "700",
    marginBottom: "20px",
    color: colors.textPrimary
  };

  const subtitleStyle = {
    fontSize: "1.2rem",
    color: colors.textSecondary,
    maxWidth: "600px",
    margin: "0 auto"
  };

  const postsContainerStyle = {
    maxWidth: "800px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  };

  const postCardStyle = {
    background: colors.cardBg,
    border: `1px solid ${colors.borderColor}`,
    borderRadius: "12px",
    padding: "20px",
    transition: "all 0.3s ease"
  };

  const postHeaderStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "15px"
  };

  const postTitleStyle = {
    fontSize: "1.3rem",
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: "5px"
  };

  const postMetaStyle = {
    fontSize: "0.9rem",
    color: colors.textSecondary
  };

  const postContentStyle = {
    color: colors.textPrimary,
    lineHeight: "1.6",
    marginBottom: "15px"
  };

  const postActionsStyle = {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    paddingTop: "15px",
    borderTop: `1px solid ${colors.borderColor}`
  };

  const buttonStyle = {
    background: "none",
    border: "none",
    color: colors.textSecondary,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    fontSize: "0.9rem",
    transition: "all 0.3s ease"
  };

  const newPostButtonStyle = {
    background: colors.accent,
    color: theme === 'light' ? '#ffffff' : '#0A192F',
    border: "none",
    padding: "12px 24px",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    marginBottom: "30px",
    transition: "all 0.3s ease"
  };

  const newPostFormStyle = {
    background: colors.cardBg,
    border: `1px solid ${colors.borderColor}`,
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "30px"
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: `1px solid ${colors.borderColor}`,
    background: theme === 'light' ? '#ffffff' : 'rgba(10,25,47,0.5)',
    color: colors.textPrimary,
    fontSize: "1rem",
    marginBottom: "15px"
  };

  const textareaStyle = {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: `1px solid ${colors.borderColor}`,
    background: theme === 'light' ? '#ffffff' : 'rgba(10,25,47,0.5)',
    color: colors.textPrimary,
    fontSize: "1rem",
    minHeight: "120px",
    resize: "vertical",
    marginBottom: "15px"
  };

  const commentSectionStyle = {
    marginTop: "20px",
    paddingTop: "20px",
    borderTop: `1px solid ${colors.borderColor}`
  };

  const commentStyle = {
    background: theme === 'light' ? '#f1f3f4' : 'rgba(10,25,47,0.3)',
    padding: "12px",
    borderRadius: "8px",
    marginTop: "10px"
  };

  const commentInputStyle = {
    display: "flex",
    gap: "10px",
    marginTop: "15px"
  };

  return (
    <section style={sectionStyle}>
      <div style={headerStyle}>
        <h2 style={titleStyle}>Resultados Reales - Foro de Clientes</h2>
        <p style={subtitleStyle}>
          Comparte tus experiencias y lee los resultados que otros han obtenido con nuestros servicios
        </p>
      </div>

      <div style={postsContainerStyle}>
        {user && (
          <>
            {!showNewPost ? (
              <button 
                style={newPostButtonStyle}
                onClick={() => setShowNewPost(true)}
                onMouseOver={(e) => e.target.style.opacity = "0.8"}
                onMouseOut={(e) => e.target.style.opacity = "1"}
              >
                + Compartir mi resultado
              </button>
            ) : (
              <div style={newPostFormStyle}>
                <input
                  type="text"
                  placeholder="Título de tu experiencia"
                  value={newPost.title}
                  onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                  style={inputStyle}
                />
                <textarea
                  placeholder="Describe tus resultados y experiencia..."
                  value={newPost.content}
                  onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                  style={textareaStyle}
                />
                <div style={{display: "flex", gap: "10px"}}>
                  <button 
                    style={newPostButtonStyle}
                    onClick={handleSubmitPost}
                  >
                    Publicar
                  </button>
                  <button 
                    style={{
                      ...newPostButtonStyle,
                      background: colors.textSecondary
                    }}
                    onClick={() => setShowNewPost(false)}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {posts.map(post => (
          <div key={post.id} style={postCardStyle}>
            <div style={postHeaderStyle}>
              <div>
                <h3 style={postTitleStyle}>{post.title}</h3>
                <p style={postMetaStyle}>Por {post.author} - {post.date}</p>
              </div>
            </div>
            
            <p style={postContentStyle}>{post.content}</p>
            
            <div style={postActionsStyle}>
              <button 
                style={buttonStyle}
                onClick={() => handleLike(post.id)}
                onMouseOver={(e) => e.target.style.color = colors.accent}
                onMouseOut={(e) => e.target.style.color = colors.textSecondary}
              >
                {post.likes} Me gusta
              </button>
              <button 
                style={buttonStyle}
                onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
                onMouseOver={(e) => e.target.style.color = colors.accent}
                onMouseOut={(e) => e.target.style.color = colors.textSecondary}
              >
                {post.comments.length} Comentarios
              </button>
            </div>

            {expandedPost === post.id && (
              <div style={commentSectionStyle}>
                <h4 style={{color: colors.textPrimary, marginBottom: "15px"}}>Comentarios</h4>
                
                {post.comments.map(comment => (
                  <div key={comment.id} style={commentStyle}>
                    <div style={{display: "flex", justifyContent: "space-between", marginBottom: "5px"}}>
                      <strong style={{color: colors.textPrimary}}>{comment.author}</strong>
                      <span style={{color: colors.textSecondary, fontSize: "0.8rem"}}>{comment.date}</span>
                    </div>
                    <p style={{color: colors.textPrimary, margin: 0}}>{comment.content}</p>
                  </div>
                ))}

                {user && (
                  <div style={commentInputStyle}>
                    <input
                      type="text"
                      placeholder="Escribe un comentario..."
                      style={{...inputStyle, marginBottom: 0, flex: 1}}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleComment(post.id, e.target.value);
                          e.target.value = '';
                        }
                      }}
                    />
                    <button 
                      style={{
                        ...newPostButtonStyle,
                        padding: "12px 20px",
                        marginBottom: 0
                      }}
                      onClick={(e) => {
                        const input = e.target.parentElement.querySelector('input');
                        handleComment(post.id, input.value);
                        input.value = '';
                      }}
                    >
                      Enviar
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default ForumResults;
