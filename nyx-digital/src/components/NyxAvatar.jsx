import React from 'react';

const NyxAvatar = ({ size = 24, showText = false }) => {
  const avatarStyle = {
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    border: "2px solid rgba(100,255,218,0.3)"
  };

  const starStyle = {
    position: "absolute",
    width: "60%",
    height: "60%",
    background: "linear-gradient(135deg, #64FFDA, #00E5FF)",
    clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
    animation: "twinkle 3s ease-in-out infinite"
  };

  const moonStyle = {
    position: "absolute",
    width: "40%",
    height: "40%",
    background: "rgba(255,255,255,0.8)",
    borderRadius: "50%",
    top: "10%",
    right: "10%",
    boxShadow: "0 0 10px rgba(255,255,255,0.5)"
  };

  const textStyle = {
    position: "absolute",
    bottom: "-20px",
    left: "50%",
    transform: "translateX(-50%)",
    fontSize: "10px",
    color: "#64FFDA",
    fontWeight: "bold",
    whiteSpace: "nowrap"
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <div style={avatarStyle}>
        <div style={starStyle}></div>
        <div style={moonStyle}></div>
      </div>
      {showText && <div style={textStyle}>Nyx</div>}
    </div>
  );
};

export default NyxAvatar;
