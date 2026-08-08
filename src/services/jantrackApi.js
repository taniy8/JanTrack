import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jtrack-token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authLogin = (credentials) => api.post('/auth/login', credentials);
export const authRegister = (payload) => api.post('/auth/register', payload);
export const getCurrentUser = () => api.get('/me');
export const getAnalytics = () => api.get('/analytics');
export const getUsers = () => api.get('/users');
export const getUser = (id) => api.get(`/users/${id}`);
export const createUser = (payload) => api.post('/users', payload);
export const updateUser = (id, payload) => api.patch(`/users/${id}`, payload);
export const deleteUser = (id) => api.delete(`/users/${id}`);
export const getDepartments = () => api.get('/departments');
export const createDepartment = (payload) => api.post('/departments', payload);
export const updateDepartment = (id, payload) => api.patch(`/departments/${id}`, payload);
export const deleteDepartment = (id) => api.delete(`/departments/${id}`);
export const getCategories = () => api.get('/categories');
export const createCategory = (payload) => api.post('/categories', payload);
export const updateCategory = (id, payload) => api.patch(`/categories/${id}`, payload);
export const deleteCategory = (id) => api.delete(`/categories/${id}`);
export const getComplaints = () => api.get('/complaints');
export const getComplaint = (id) => api.get(`/complaints/${id}`);
export const createComplaintRemote = (payload) => api.post('/complaints', payload);
export const updateComplaintRemote = (id, payload) => api.patch(`/complaints/${id}`, payload);
export const deleteComplaint = (id) => api.delete(`/complaints/${id}`);
export const getNotifications = () => api.get('/notifications');
export const updateNotification = (id, payload) => api.patch(`/notifications/${id}`, payload);
export const getAuditLogs = () => api.get('/audit-logs');

export default api;
