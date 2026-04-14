// Base de datos simulada para usuarios y cotizaciones
const DATABASE = {
  users: [],
  quotes: [],
  sessions: []
};

// Importar servicio de correo
import { emailService } from './emailService.js';

// Inicializar datos de ejemplo si está vacío
const initializeDatabase = () => {
  if (DATABASE.users.length === 0) {
    // Usuario admin por defecto
    DATABASE.users.push({
      id: 1,
      email: 'admin@nyxdigital.com',
      password: 'admin123', // En producción esto estaría hasheado
      name: 'Administrador',
      role: 'admin',
      createdAt: new Date().toISOString(),
      avatar: '',
      preferences: {
        theme: 'dark'
      }
    });
    
    // Usuario admin personalizado
    DATABASE.users.push({
      id: 2,
      email: 'janierfarid@gmail.com',
      password: 'Janier07200601', // En producción esto estaría hasheado
      name: 'Janier Farid',
      role: 'admin',
      createdAt: new Date().toISOString(),
      avatar: '',
      preferences: {
        theme: 'dark'
      }
    });
  }
};

// Guardar en localStorage
const saveDatabase = () => {
  localStorage.setItem('nyx_database', JSON.stringify(DATABASE));
};

// Cargar desde localStorage
const loadDatabase = () => {
  const saved = localStorage.getItem('nyx_database');
  if (saved) {
    const data = JSON.parse(saved);
    DATABASE.users = data.users || [];
    DATABASE.quotes = data.quotes || [];
    DATABASE.sessions = data.sessions || [];
  }
  initializeDatabase();
  saveDatabase();
};

// Funciones de usuarios
export const userDB = {
  // Registrar nuevo usuario
  register: async (userData) => {
    const newUser = {
      id: Date.now(),
      email: userData.email,
      password: userData.password, // En producción hashear
      name: userData.name || userData.email.split('@')[0],
      role: 'user',
      createdAt: new Date().toISOString(),
      avatar: userData.avatar || '',
      preferences: {
        theme: 'dark'
      }
    };

    DATABASE.users.push(newUser);
    saveDatabase();

    // Crear sesión
    const session = {
      userId: newUser.id,
      token: btoa(`${newUser.id}:${newUser.email}:${Date.now()}`),
      createdAt: new Date().toISOString()
    };

    DATABASE.sessions.push(session);
    saveDatabase();

    // Enviar correo de bienvenida
    try {
      await emailService.sendWelcomeEmail(newUser.email, newUser.name);
    } catch (error) {
      console.error('Error al enviar correo de bienvenida:', error);
      // No fallar el registro si el correo no se envía
    }

    return { 
      success: true, 
      user: { ...newUser, password: undefined },
      token: session.token 
    };
  },

  // Login de usuario
  login: (email, password) => {
    const user = DATABASE.users.find(u => u.email === email && u.password === password);
    if (user) {
      const session = {
        userId: user.id,
        token: btoa(`${user.id}:${Date.now()}`),
        createdAt: new Date().toISOString()
      };
      DATABASE.sessions.push(session);
      saveDatabase();
      return { 
        success: true, 
        user: { ...user, password: undefined },
        token: session.token 
      };
    }
    return { success: false, message: 'Credenciales incorrectas' };
  },

  // Obtener usuario por token
  getUserByToken: (token) => {
    const session = DATABASE.sessions.find(s => s.token === token);
    if (session) {
      const user = DATABASE.users.find(u => u.id === session.userId);
      return user ? { ...user, password: undefined } : null;
    }
    return null;
  },

  // Logout
  logout: (token) => {
    DATABASE.sessions = DATABASE.sessions.filter(s => s.token !== token);
    saveDatabase();
  },

  // Actualizar usuario
  update: (userId, updates) => {
    const userIndex = DATABASE.users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
      DATABASE.users[userIndex] = { ...DATABASE.users[userIndex], ...updates };
      saveDatabase();
      return { success: true, user: { ...DATABASE.users[userIndex], password: undefined } };
    }
    return { success: false, message: 'Usuario no encontrado' };
  },

  // Verificar si email existe
  emailExists: (email) => {
    return DATABASE.users.some(u => u.email === email);
  }
};

// Funciones de cotizaciones
export const quoteDB = {
  // Guardar cotización
  save: (quoteData) => {
    const quote = {
      id: Date.now(),
      userId: quoteData.userId,
      plan: quoteData.plan,
      domain: quoteData.domain,
      maintenance: quoteData.maintenance,
      totalPrice: quoteData.totalPrice,
      message: quoteData.message,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    DATABASE.quotes.push(quote);
    saveDatabase();
    return { success: true, quote };
  },

  // Obtener cotizaciones de un usuario
  getUserQuotes: (userId) => {
    return DATABASE.quotes.filter(q => q.userId === userId);
  },

  // Actualizar estado de cotización
  updateStatus: (quoteId, status) => {
    const quoteIndex = DATABASE.quotes.findIndex(q => q.id === quoteId);
    if (quoteIndex !== -1) {
      DATABASE.quotes[quoteIndex].status = status;
      DATABASE.quotes[quoteIndex].updatedAt = new Date().toISOString();
      saveDatabase();
      return { success: true };
    }
    return { success: false, message: 'Cotización no encontrada' };
  },

  // Obtener todas las cotizaciones (para admin)
  getAll: () => {
    return DATABASE.quotes;
  }
};

// Inicializar base de datos al cargar
loadDatabase();

export default DATABASE;
