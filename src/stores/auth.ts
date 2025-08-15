import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { safeDecodeUser } from '@/utils/dataTransformers';

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || '');
  const user = ref(null);

  const isAuthenticated = computed(() => !!token.value);

  function setToken(newToken) {
    token.value = newToken;
    if (newToken) {
      localStorage.setItem('token', newToken);
    } else {
      localStorage.removeItem('token');
    }
  }

  function setUser(newUser) {
    // Safely decode user data to handle boolean field issues
    const decodedUser = safeDecodeUser(newUser);
    user.value = decodedUser;
    if (decodedUser) {
      localStorage.setItem('user', JSON.stringify(decodedUser));
    } else {
      localStorage.removeItem('user');
    }
  }

  function login(newToken, newUser) {
    setToken(newToken);
    setUser(newUser);
  }

  function logout() {
    setToken('');
    setUser(null);
  }

  return { token, user, isAuthenticated, login, logout, setToken, setUser };
}); 