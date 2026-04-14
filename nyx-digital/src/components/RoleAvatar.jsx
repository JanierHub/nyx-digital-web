function RoleAvatar({ size = 40, role = 'user', theme = 'dark' }) {
  const isAdmin = role === 'admin';
  const isLight = theme === 'light';

  // Avatar de USUARIO - Eclipse estilo Nyx (luna oscura con halo)
  const UserEclipse = () => (
    <div style={{
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: "50%",
      position: "relative",
      background: isLight 
        ? 'radial-gradient(circle at 30% 30%, #4a5568 0%, #1a202c 50%, #000000 100%)'
        : 'radial-gradient(circle at 30% 30%, #2d3748 0%, #1a202c 50%, #000000 100%)',
      boxShadow: isLight
        ? '0 0 15px rgba(100, 255, 218, 0.6), inset -5px -5px 15px rgba(0,0,0,0.5)'
        : '0 0 20px rgba(100, 255, 218, 0.8), inset -5px -5px 15px rgba(0,0,0,0.5)',
      border: `2px solid ${isLight ? 'rgba(100, 255, 218, 0.8)' : '#64FFDA'}`,
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      {/* Halo del eclipse */}
      <div style={{
        position: "absolute",
        width: "120%",
        height: "120%",
        borderRadius: "50%",
        background: isLight
          ? 'radial-gradient(circle, transparent 40%, rgba(100, 255, 218, 0.3) 70%, transparent 100%)'
          : 'radial-gradient(circle, transparent 40%, rgba(100, 255, 218, 0.5) 70%, transparent 100%)',
        top: "-10%",
        left: "-10%"
      }} />
      {/* La luna oscura */}
      <div style={{
        width: "70%",
        height: "70%",
        borderRadius: "50%",
        background: isLight
          ? 'radial-gradient(circle at 25% 25%, #2d3748 0%, #000000 100%)'
          : 'radial-gradient(circle at 25% 25%, #1a202c 0%, #000000 100%)',
        boxShadow: 'inset 2px 2px 8px rgba(255,255,255,0.1)',
        position: "relative",
        zIndex: 1
      }}>
        {/* Pequeña estrella brillante */}
        <div style={{
          position: "absolute",
          width: "4px",
          height: "4px",
          background: "#64FFDA",
          borderRadius: "50%",
          top: "30%",
          right: "25%",
          boxShadow: '0 0 6px #64FFDA'
        }} />
      </div>
    </div>
  );

  // Avatar de ADMIN - Corona solar/estrella brillante
  const AdminCrown = () => (
    <div style={{
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: "50%",
      position: "relative",
      background: isLight
        ? 'radial-gradient(circle at 30% 30%, #fbbf24 0%, #f59e0b 40%, #d97706 100%)'
        : 'radial-gradient(circle at 30% 30%, #fcd34d 0%, #fbbf24 40%, #f59e0b 100%)',
      boxShadow: isLight
        ? '0 0 20px rgba(251, 191, 36, 0.7), inset -3px -3px 10px rgba(0,0,0,0.3)'
        : '0 0 25px rgba(251, 191, 36, 0.9), inset -3px -3px 10px rgba(0,0,0,0.3)',
      border: `2px solid ${isLight ? 'rgba(251, 191, 36, 0.9)' : '#fbbf24'}`,
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      {/* Corona de rayos */}
      {[...Array(8)].map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          width: "3px",
          height: "60%",
          background: isLight
            ? 'linear-gradient(to bottom, rgba(251,191,36,0.8), transparent)'
            : 'linear-gradient(to bottom, rgba(252,211,77,0.9), transparent)',
          top: "-20%",
          left: "50%",
          transformOrigin: "bottom center",
          transform: `translateX(-50%) rotate(${i * 45}deg)`,
          borderRadius: "2px"
        }} />
      ))}
      {/* Centro brillante */}
      <div style={{
        width: "50%",
        height: "50%",
        borderRadius: "50%",
        background: isLight
          ? 'radial-gradient(circle, #fffbeb 0%, #fcd34d 100%)'
          : 'radial-gradient(circle, #ffffff 0%, #fcd34d 100%)',
        boxShadow: '0 0 10px rgba(255,255,255,0.8)',
        position: "relative",
        zIndex: 1
      }}>
        {/* Símbolo A */}
        <span style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: `${size * 0.35}px`,
          fontWeight: "800",
          color: "#92400e"
        }}>A</span>
      </div>
    </div>
  );

  return isAdmin ? <AdminCrown /> : <UserEclipse />;
}

export default RoleAvatar;
