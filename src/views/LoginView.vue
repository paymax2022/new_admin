<template>
  <div class="flex flex-col md:flex-row h-screen">
    <!-- Left Panel -->
    <div class="w-full md:w-1/2 bg-gray-900 flex items-center justify-center relative overflow-hidden">
      <div class="absolute w-full h-full">
        <div class="absolute bg-blue-400 rounded-full opacity-40 w-40 h-40 top-10 left-10 blur-3xl"></div>
        <div class="absolute bg-red-500 rounded-full opacity-30 w-32 h-32 top-20 right-20 blur-3xl"></div>
        <div class="absolute bg-blue-300 rounded-full opacity-30 w-48 h-48 bottom-16 left-24 blur-3xl"></div>
        <div class="absolute bg-yellow-200 rounded-full opacity-20 w-28 h-28 bottom-8 right-12 blur-3xl"></div>
      </div>
    </div>

    <!-- Right Panel -->
    <div class="w-full md:w-1/2 bg-white flex items-center justify-center">
      <div class="w-2/3 max-w-md">
        <h2 class="text-2xl font-semibold text-gray-800 mb-8 text-center">Log into your account</h2>

        <form @submit.prevent="handleLogin">
          <div class="mb-4">
            <label class="block text-gray-600 mb-2">User Name</label>
            <input
              v-model="email"
              type="email"
              placeholder="abc@xyzmail.com"
              class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div class="mb-4 relative">
            <label class="block text-gray-600 mb-2">Password</label>
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              class="absolute right-3 top-9 text-gray-600"
              @click="showPassword = !showPassword"
            >
              <span v-if="showPassword">🙈</span>
              <span v-else>👁️</span>
            </button>
          </div>

          <div class="mb-6 text-left">
            <router-link :to="{ name: 'passwordReset' }" class="text-blue-600 text-sm hover:underline">Forgot Password?</router-link>
          </div>

          <button
            type="submit"
            class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>

        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToast } from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import authService from '@/services/authService';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const toast = useToast();
const email = ref('');
const password = ref('');
const showPassword = ref(false);
const loading = ref(false);
const authStore = useAuthStore();

const handleLogin = async () => {
  loading.value = true;
  try {
    const response = await authService.login({ email: email.value, password: password.value });
    const responseData = response?.data?.data || response?.data;
    const access_token = responseData?.access_token || responseData?.token;
    const userData = responseData?.user || responseData?.admin;
    
    if (access_token) {
      // Store token and user in auth store
      authStore.login(access_token, userData || null);
      
      // Verify token was stored
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        console.log('Login successful - Token stored:', storedToken.substring(0, 20) + '...');
        toast.success('Login successful!');
        router.push('/dashboard');
      } else {
        console.error('Login failed - Token was not stored in localStorage');
        toast.error('Failed to store authentication token');
      }
    } else {
      console.error('No token in response:', response?.data);
      toast.error('No token received from server.');
    }
  } catch (error: any) {
    const errorMessage = error?.response?.data?.message || error?.message || 'Login failed';
    console.error('Login error:', errorMessage, error);
    toast.error(errorMessage);
  } finally {
    loading.value = false;
  }
};

// function login() {
//   // Add your login logic here if needed
//   router.push({ name: 'admin-view' })
// }

</script>

<style scoped>
/* Additional styles can go here */
</style>
