import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const notes = {
  getAll: async (page = 1, limit = 10) => {
    try {
      const response = await api.get(`/api/notes?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Error getting notes:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch notes');
    }
  },

  getOne: async (id) => {
    try {
      const response = await api.get(`/api/notes/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error getting note:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch note');
    }
  },

  create: async (title, body) => {
    try {
      const response = await api.post('/api/notes', { title, body });
      return response.data;
    } catch (error) {
      console.error('Error creating note:', error);
      throw new Error(error.response?.data?.message || 'Failed to create note');
    }
  },

  update: async (id, title, body) => {
    try {
      const response = await api.put(`/api/notes/${id}`, { title, body });
      return response.data;
    } catch (error) {
      console.error('Error updating note:', error);
      throw new Error(error.response?.data?.message || 'Failed to update note');
    }
  },

  delete: async (id) => {
    try {
      const response = await api.delete(`/api/notes/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting note:', error);
      throw new Error(error.response?.data?.message || 'Failed to delete note');
    }
  },
};

export const auth = {
  login: async (email, password) => {
    try {
      const response = await api.post('/api/users/login', { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      return response.data;
    } catch (error) {
      console.error('Error logging in:', error);
      throw new Error(error.response?.data?.message || 'Failed to login');
    }
  },

  signup: async (username, email, password) => {
    try {
      const response = await api.post('/api/users', { username, email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      return response.data;
    } catch (error) {
      console.error('Error signing up:', error);
      throw new Error(error.response?.data?.message || 'Failed to sign up');
    }
  },

  logout: () => {
    localStorage.removeItem('token');
  }
};

export default api;