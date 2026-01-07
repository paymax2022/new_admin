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
    // Get token from multiple sources with fallbacks
    let token = '';
    
    // Method 1: Try localStorage directly (most reliable)
    token = localStorage.getItem('token') || '';
    
    // Method 2: Try Pinia store (if localStorage is empty)
    if (!token) {
      try {
        const authStore = useAuthStore();
        // In Pinia setup stores, refs are auto-unwrapped when accessed as properties
        // So authStore.token gives the value directly, not the ref object
        const storeToken = authStore.token;
        // Handle both cases: if it's a ref object or already unwrapped
        if (storeToken) {
          token = (typeof storeToken === 'object' && 'value' in storeToken) 
            ? storeToken.value 
            : String(storeToken);
        }
      } catch (e) {
        // Store access failed, already have localStorage fallback
        if (process.env.NODE_ENV === 'development') {
          console.warn('[API] Auth store access failed:', e);
        }
      }
    }
    
    // Clean token (remove quotes if present)
    if (token) {
      token = token.replace(/^["']|["']$/g, '');
    }
    
    // Set Authorization header for all requests
    config.headers = config.headers || {};
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    // Debug logging in development
    if (process.env.NODE_ENV === 'development') {
      if (config.url?.includes('/admin/')) {
        if (token) {
          console.log(`[API] ${config.method?.toUpperCase()} ${config.url} - Auth: ✓`);
        } else {
          console.warn(`[API] ${config.method?.toUpperCase()} ${config.url} - Auth: ✗ (No token)`);
        }
      }
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Global error handler
api.interceptors.response.use(
  response => response,
  error => {
    // Handle 401 Unauthorized errors
    if (error.response?.status === 401) {
      const url = error.config?.url || '';
      const method = error.config?.method?.toUpperCase() || 'GET';
      console.error(`[API] Unauthorized (401) for: ${method} ${url}`);
      
      // Check if token exists
      const token = localStorage.getItem('token');
      if (!token) {
        console.warn('[API] No token found in localStorage. User may need to log in.');
        
        // Only redirect if we're not on login/auth pages and not fetching profile
        // Profile fetch failures shouldn't trigger redirects - the router guard handles that
        if (typeof window !== 'undefined') {
          const currentPath = window.location.pathname;
          const isAuthPage = currentPath.includes('/login') || currentPath.includes('/auth');
          const isProfileRequest = url.includes('/admin/me') || url.includes('/admin/auth/profile');
          
          // Only redirect for critical auth failures, not profile/data fetches
          if (!isAuthPage && !isProfileRequest && url.includes('/admin/')) {
            // Wait a bit to avoid redirect loops during navigation
            setTimeout(() => {
              if (!localStorage.getItem('token')) {
                console.warn('[API] Redirecting to login - no token available');
                window.location.href = '/login';
              }
            }, 100);
          }
        }
      } else {
        // Token exists but request failed - might be expired or invalid for this endpoint
        console.warn(`[API] Token exists but request was unauthorized. Token: ${token.substring(0, 20)}...`);
        
        // Don't redirect if it's a profile/data fetch - let the component handle it
        // Only redirect for critical operations like login/auth endpoints
        const isProfileRequest = url.includes('/admin/me') || url.includes('/admin/auth/profile');
        if (!isProfileRequest && url.includes('/admin/auth/')) {
          // This might be a login/auth endpoint failure - handle separately
          console.warn('[API] Auth endpoint failed - token may be invalid');
        }
      }
    }
    
    const toast = useToast();
    const message = error.response?.data?.message || error.message || 'An error occurred';
    // toast.error(message);
    return Promise.reject(error);
  }
);

export default api; 