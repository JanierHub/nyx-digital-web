import React, { useState, useEffect, useContext } from 'react';
import { userDB } from '../utils/database';

// Contexto de autenticación
const AuthContext = React.createContext();

// Hook de autenticación
function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [theme, setTheme] = useState('dark'); // Modo oscuro por defecto

  // Verificar sesión al cargar
  useEffect(() => {
    const savedToken = localStorage.getItem('auth_token');
    if (savedToken) {
      const userData = userDB.getUserByToken(savedToken);
      if (userData) {
        setUser(userData);
        setToken(savedToken);
        // Cargar tema personalizado del usuario
        const userTheme = localStorage.getItem(`theme_${userData.email}`) || 'dark';
        setTheme(userTheme);
      } else {
        // Token inválido, limpiar
        localStorage.removeItem('auth_token');
      }
    } else {
      // Sin usuario, usar tema por defecto (oscuro)
      const defaultTheme = localStorage.getItem('theme') || 'dark';
      setTheme(defaultTheme);
    }
    setLoading(false);
  }, []);

  // Login
  const login = async (email, password) => {
    const result = userDB.login(email, password);
    if (result.success) {
      setUser(result.user);
      setToken(result.token);
      localStorage.setItem('auth_token', result.token);
      localStorage.setItem('user', JSON.stringify(result.user));
      // Cargar tema del usuario
      const userTheme = localStorage.getItem(`theme_${email}`) || 'dark';
      setTheme(userTheme);
    }
    return result;
  };

  // Cambiar tema
  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    if (user) {
      // Guardar tema personalizado del usuario
      localStorage.setItem(`theme_${user.email}`, newTheme);
    } else {
      // Guardar tema por defecto para visitantes
      localStorage.setItem('theme', newTheme);
    }
  };

  // Registro
  const register = async (userData) => {
    // Verificar si email ya existe
    if (userDB.emailExists(userData.email)) {
      return { success: false, message: 'El email ya está registrado' };
    }

    const result = userDB.register(userData);
    if (result.success) {
      // Auto login después de registro
      const loginResult = await login(userData.email, userData.password);
      return loginResult;
    }
    return result;
  };

  // Logout
  const logout = () => {
    if (token) {
      userDB.logout(token);
    }
    setUser(null);
    setToken(null);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    // Siempre volver al modo oscuro predeterminado al hacer logout
    localStorage.setItem('theme', 'dark');
    setTheme('dark');
  };

  // Actualizar usuario
  const updateUser = (updates) => {
    if (user) {
      const result = userDB.update(user.id, updates);
      if (result.success) {
        setUser(result.user);
        localStorage.setItem('user', JSON.stringify(result.user));
      }
      return result;
    }
    return { success: false, message: 'No hay usuario logueado' };
  };

  return {
    user,
    token,
    loading,
    theme,
    login,
    register,
    logout,
    updateUser,
    changeTheme,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin'
  };
}

// Componente Provider para el contexto de autenticación
export function AuthProvider({ children }) {
  const auth = useAuth();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook para usar el contexto
export function useAuthContext() {
  return useContext(AuthContext);
}

export default AuthContext;
