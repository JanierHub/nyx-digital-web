import { useState, useEffect, createContext, useContext } from 'react';

const NotificationContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (notification) => {
    const id = Date.now().toString();
    const newNotification = {
      id,
      type: 'info',
      duration: 5000,
      ...notification
    };
    
    setNotifications(prev => [...prev, newNotification]);
    
    // Auto remove after duration
    if (newNotification.duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, newNotification.duration);
    }
    
    return id;
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  // Convenience methods
  const success = (message, options = {}) => {
    return addNotification({ type: 'success', message, ...options });
  };

  const error = (message, options = {}) => {
    return addNotification({ type: 'error', message, duration: 0, ...options });
  };

  const warning = (message, options = {}) => {
    return addNotification({ type: 'warning', message, ...options });
  };

  const info = (message, options = {}) => {
    return addNotification({ type: 'info', message, ...options });
  };

  return (
    <NotificationContext.Provider value={{
      notifications,
      addNotification,
      removeNotification,
      clearAllNotifications,
      success,
      error,
      warning,
      info
    }}>
      {children}
      <NotificationContainer />
    </NotificationContext.Provider>
  );
};

const NotificationContainer = () => {
  const { notifications, removeNotification } = useNotifications();

  return (
    <div style={container}>
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  );
};

const NotificationItem = ({ notification, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const getNotificationStyle = () => {
    const baseStyle = {
      ...notificationItem,
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateX(0)' : 'translateX(100%)'
    };

    switch (notification.type) {
      case 'success':
        return { ...baseStyle, background: 'linear-gradient(135deg, #2ecc71, #27ae60)' };
      case 'error':
        return { ...baseStyle, background: 'linear-gradient(135deg, #e74c3c, #c0392b)' };
      case 'warning':
        return { ...baseStyle, background: 'linear-gradient(135deg, #f39c12, #e67e22)' };
      case 'info':
      default:
        return { ...baseStyle, background: 'linear-gradient(135deg, #3498db, #2980b9)' };
    }
  };

  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return ;
      case 'error':
        return ;
      case 'warning':
        return ;
      case 'info':
      default:
        return ;
    }
  };

  return (
    <div style={getNotificationStyle()}>
      <div style={notificationContent}>
        <span style={notificationIcon}>{getIcon()}</span>
        <div style={notificationMessage}>{notification.message}</div>
        <button style={closeButton} onClick={handleClose}>
          ×
        </button>
      </div>
      {notification.duration > 0 && (
        <div style={progressBar}>
          <div 
            style={{
              ...progressBarFill,
              animationDuration: `${notification.duration}ms`
            }}
          />
        </div>
      )}
    </div>
  );
};

// Styles
const container = {
  position: 'fixed',
  top: '20px',
  right: '20px',
  zIndex: '9999',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  maxWidth: '400px'
};

const notificationItem = {
  borderRadius: '10px',
  padding: '0',
  boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255,255,255,0.1)',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  color: 'white',
  minWidth: '300px'
};

const notificationContent = {
  display: 'flex',
  alignItems: 'center',
  padding: '15px',
  gap: '10px'
};

const notificationIcon = {
  fontSize: '18px',
  flexShrink: 0
};

const notificationMessage = {
  flex: 1,
  fontSize: '14px',
  lineHeight: '1.4'
};

const closeButton = {
  background: 'none',
  border: 'none',
  color: 'white',
  fontSize: '20px',
  cursor: 'pointer',
  padding: '0',
  width: '24px',
  height: '24px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  transition: 'background 0.3s ease'
};

const progressBar = {
  height: '3px',
  background: 'rgba(255,255,255,0.3)',
  overflow: 'hidden'
};

const progressBarFill = {
  height: '100%',
  background: 'rgba(255,255,255,0.8)',
  width: '100%',
  animation: 'shrink linear forwards',
  transformOrigin: 'left'
};

// Add keyframes for progress bar animation
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes shrink {
    from { width: 100%; }
    to { width: 0%; }
  }
  
  .notification-item:hover .progress-bar-fill {
    animation-play-state: paused;
  }
`;
document.head.appendChild(styleSheet);

export default NotificationProvider;
