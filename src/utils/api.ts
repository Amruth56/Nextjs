import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  signup: async (username: string, email: string, password: string) => {
    const response = await api.post('/api/users', { username, email, password });
    return response.data;
  },
  login: async (email: string, password: string) => {
    const response = await api.post('/api/users/login', { email, password });
    return response.data;
  },
  getCurrentUser: async () => {
    const response = await api.get('/api/users');
    return response.data;
  },
  updateUser: async (id: string, data: { username?: string; email?: string }) => {
    const response = await api.put(`/api/users/${id}`, data);
    return response.data;
  },
};

export const notes = {
  getAll: async (page = 1, limit = 10) => {
    const response = await api.get(`/api/notes?page=${page}&limit=${limit}`);
    return response.data;
  },
  getOne: async (id: string) => {
    const response = await api.get(`/api/notes/${id}`);
    return response.data;
  },
  create: async (title: string, body: string) => {
    const response = await api.post('/api/notes', { title, body });
    return response.data;
  },
  update: async (id: string, title: string, content: string) => {
    const response = await api.put(`/api/notes/${id}`, { title, content });
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/api/notes/${id}`);
    return response.data;
  },
};

export default api;