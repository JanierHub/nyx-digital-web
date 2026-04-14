import { useState, useEffect, useContext, createContext } from 'react';
import { userDB } from '../utils/database';

// Contexto de autenticación
const AuthContext = createContext();

// Hook de autenticación
export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  // Verificar sesión al cargar
  useEffect(() => {
    const savedToken = localStorage.getItem('auth_token');
    if (savedToken) {
      const userData = userDB.getUserByToken(savedToken);
      if (userData) {
        setUser(userData);
        setToken(savedToken);
      } else {
        // Token inválido, limpiar
        localStorage.removeItem('auth_token');
      }
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
    }
    return result;
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
    login,
    register,
    logout,
    updateUser,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin'
  };
}


// Hook para usar el contexto
export function useAuthContext() {
  return useContext(AuthContext);
}

export default AuthContext;
