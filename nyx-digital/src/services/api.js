// API base configuration
// Production backend URL (Render)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://nyx-digital-api.onrender.com/api';

// Generic API request function
class ApiService {
  constructor(baseURL = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);
      
      // Handle HTTP errors
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  }

  // HTTP methods
  async get(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    return this.request(url, { method: 'GET' });
  }

  async post(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }

  // File upload
  async upload(endpoint, formData) {
    const token = localStorage.getItem('authToken');
    const headers = {};
    
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'POST',
        headers,
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  }
}

// Create API service instance
const api = new ApiService();

// Contact API
export const contactAPI = {
  submit: (contactData) => api.post('/contact', contactData),
  getAll: (params) => api.get('/contact', params),
  getById: (id) => api.get(`/contact/${id}`),
  update: (id, data) => api.put(`/contact/${id}`, data),
  addNote: (id, note) => api.post(`/contact/${id}/notes`, note),
};

// Services API
export const servicesAPI = {
  getAll: (params) => api.get('/services', params),
  getPopular: () => api.get('/services/popular'),
  getBySlug: (slug) => api.get(`/services/${slug}`),
  create: (data) => api.post('/services', data),
  update: (id, data) => api.put(`/services/${id}`, data),
  delete: (id) => api.delete(`/services/${id}`),
  getCategories: () => api.get('/services/meta/categories'),
};

// Projects API
export const projectsAPI = {
  getAll: (params) => api.get('/projects', params),
  getFeatured: () => api.get('/projects/featured'),
  getBySlug: (slug) => api.get(`/projects/${slug}`),
};

// Users API
export const usersAPI = {
  register: (userData) => api.post('/users/register', userData),
  login: (credentials) => api.post('/users/login', credentials),
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
  logout: () => api.post('/users/logout'),
};

// Reviews API
export const reviewsAPI = {
  getAll: (admin = false) => api.get('/reviews', { admin: admin.toString() }),
  create: (reviewData) => api.post('/reviews', reviewData),
  like: (id) => api.post(`/reviews/${id}/like`),
  toggleHide: (id) => api.put(`/reviews/${id}/hide`),
  delete: (id) => api.delete(`/reviews/${id}`),
};

// Health check
export const healthAPI = {
  check: () => api.get('/health'),
};

// Error handling utilities
export class APIError extends Error {
  constructor(message, status = null, data = null) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.data = data;
  }
}

// Response validation utilities
export const validateResponse = (response, expectedFields = []) => {
  if (!response || response.status !== 'success') {
    throw new APIError(response?.message || 'Invalid response format');
  }

  if (expectedFields.length > 0) {
    const missingFields = expectedFields.filter(field => !(field in response.data));
    if (missingFields.length > 0) {
      throw new APIError(`Missing required fields: ${missingFields.join(', ')}`);
    }
  }

  return response.data;
};

// Loading state utilities
export const withLoading = async (promise, setLoading) => {
  try {
    setLoading(true);
    const result = await promise;
    return result;
  } finally {
    setLoading(false);
  }
};

// Retry utility for failed requests
export const withRetry = async (requestFn, maxRetries = 3, delay = 1000) => {
  let lastError;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await requestFn();
    } catch (error) {
      lastError = error;
      
      // Don't retry on client errors (4xx)
      if (error.status && error.status >= 400 && error.status < 500) {
        throw error;
      }
      
      // Wait before retrying
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
      }
    }
  }
  
  throw lastError;
};

// Cache utility
class APICache {
  constructor(ttl = 5 * 60 * 1000) { // 5 minutes default TTL
    this.cache = new Map();
    this.ttl = ttl;
  }

  set(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() - item.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  clear() {
    this.cache.clear();
  }

  delete(key) {
    this.cache.delete(key);
  }
}

export const apiCache = new APICache();

// Cached API calls
export const cachedAPI = {
  get: async (endpoint, params = {}, cacheKey = null) => {
    const key = cacheKey || `${endpoint}?${JSON.stringify(params)}`;
    const cached = apiCache.get(key);
    
    if (cached) {
      return cached;
    }

    const data = await api.get(endpoint, params);
    apiCache.set(key, data);
    return data;
  },
  
  invalidate: (pattern) => {
    if (typeof pattern === 'string') {
      apiCache.delete(pattern);
    } else {
      // Invalidate all cache
      apiCache.clear();
    }
  },
};

export default api;
