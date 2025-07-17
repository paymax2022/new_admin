import axios from 'axios';
import { useToast } from 'vue-toastification';
import { useAuthStore } from '@/stores/auth';

const BASE_URL = 'https://all-in-one-w69p.onrender.com';

const api = axios.create({
  baseURL: BASE_URL,
  // withCredentials: true, // for cookie-based auth
});

// Attach token to every request if available
api.interceptors.request.use(
  (config) => {
    // Try Pinia store first, fallback to localStorage
    let token = '';
    try {
      const authStore = useAuthStore();
      token = authStore.token;
    } catch (e) {
      token = localStorage.getItem('token') || '';
    }
    if (token) {
      config.headers = config.headers || {};
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Global error handler
api.interceptors.response.use(
  response => response,
  error => {
    const toast = useToast();
    const message = error.response?.data?.message || error.message || 'An error occurred';
    toast.error(message);
    return Promise.reject(error);
  }
);

export default api; 