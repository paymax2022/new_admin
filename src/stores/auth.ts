import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

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
    user.value = newUser;
    if (newUser) {
      localStorage.setItem('user', JSON.stringify(newUser));
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