<template>
  <div class="flex h-screen">
    <!-- Left Panel -->
    <div class="w-1/2 bg-gray-900 flex items-center justify-center relative overflow-hidden">
      <div class="absolute w-full h-full">
        <div class="absolute bg-blue-400 rounded-full opacity-40 w-40 h-40 top-10 left-10 blur-3xl"></div>
        <div class="absolute bg-red-500 rounded-full opacity-30 w-32 h-32 top-20 right-20 blur-3xl"></div>
        <div class="absolute bg-blue-300 rounded-full opacity-30 w-48 h-48 bottom-16 left-24 blur-3xl"></div>
        <div class="absolute bg-yellow-200 rounded-full opacity-20 w-28 h-28 bottom-8 right-12 blur-3xl"></div>
      </div>
    </div>

    <!-- Right Panel -->
    <div class="w-1/2 bg-white flex items-center justify-center">
      <div class="w-2/3 max-w-md">
        <h2 class="text-2xl font-semibold text-gray-800 mb-8 text-center">Log into your account</h2>

        <form @submit.prevent="handleLogin">
          <div class="mb-4">
            <label class="block text-gray-600 mb-2">User Name</label>
            <input
              v-model="username"
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
            <a href="#" class="text-blue-600 text-sm hover:underline">Forgot Password?</a>
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

<script setup>
import { ref } from 'vue'

const username = ref('')
const password = ref('')
const showPassword = ref(false)

function handleLogin() {
  console.log('Login attempt:', username.value, password.value)
  // Add your login logic here (e.g., API call)
}
</script>

<style scoped>
/* Additional styles can go here */
</style>
