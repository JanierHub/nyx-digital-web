import React, { useState, useEffect, useContext } from 'react';
import { usersAPI } from '../services/api.js';

// Contexto de autenticación
const AuthContext = React.createContext();

// Hook de autenticación
function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [theme, setTheme] = useState('dark');

  // Verificar sesión al cargar
  useEffect(() => {
    const initAuth = async () => {
      const savedToken = localStorage.getItem('auth_token');
      if (savedToken) {
        try {
          // Set token for API calls
          setToken(savedToken);
          // Get user profile from API
          const response = await usersAPI.getProfile();
          if (response.data?.user) {
            setUser(response.data.user);
            setTheme(response.data.user.theme || 'dark');
          }
        } catch (error) {
          console.error('Auth initialization error:', error);
          localStorage.removeItem('auth_token');
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  // Login
  const login = async (email, password) => {
    try {
      const response = await usersAPI.login({ email, password });
      if (response.data?.user && response.data?.token) {
        const userData = response.data.user;
        const authToken = response.data.token;
        
        setUser(userData);
        setToken(authToken);
        localStorage.setItem('auth_token', authToken);
        setTheme(userData.theme || 'dark');
        
        return { success: true, user: userData };
      }
      return { success: false, message: 'Login failed' };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Credenciales incorrectas' 
      };
    }
  };

  // Cambiar tema
  const changeTheme = async (newTheme) => {
    setTheme(newTheme);
    if (user && token) {
      try {
        await usersAPI.updateProfile({ theme: newTheme });
      } catch (error) {
        console.error('Theme update error:', error);
      }
    }
  };

  // Registro
  const register = async (userData) => {
    try {
      const response = await usersAPI.register(userData);
      if (response.data?.user && response.data?.token) {
        const newUser = response.data.user;
        const authToken = response.data.token;
        
        setUser(newUser);
        setToken(authToken);
        localStorage.setItem('auth_token', authToken);
        
        return { success: true, user: newUser };
      }
      return { success: false, message: 'Registration failed' };
    } catch (error) {
      console.error('Register error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Error al registrarse' 
      };
    }
  };

  // Logout
  const logout = async () => {
    try {
      if (token) {
        await usersAPI.logout();
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem('auth_token');
      localStorage.setItem('theme', 'dark');
      setTheme('dark');
    }
  };

  // Actualizar usuario
  const updateUser = async (updates) => {
    if (user && token) {
      try {
        const response = await usersAPI.updateProfile(updates);
        if (response.data?.user) {
          setUser(response.data.user);
          return { success: true, user: response.data.user };
        }
      } catch (error) {
        console.error('Update user error:', error);
        return { success: false, message: 'Error al actualizar' };
      }
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
