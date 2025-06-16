<template>
  <div class="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12">
    <div class="text-center mb-12">
      <h1 class="text-3xl font-semibold text-gray-800 mb-2">Admin Panel</h1>
      <p class="text-gray-600 max-w-xl mx-auto">
        Comprehensive admin dashboard with user management, roles & permissions, and financial controls
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl">
      <div class="bg-white rounded-lg shadow p-6 text-center">
        <DashboardIcon class="w-8 h-8 mx-auto mb-2 text-blue-600" />
        <h2 class="text-lg font-medium mb-1">Dashboard</h2>
        <p class="text-sm text-gray-500 mb-4">Overview of key metrics and system performance</p>
        <button class="text-blue-600 hover:underline text-sm">View Dashboard</button>
      </div>

      <div class="bg-white rounded-lg shadow p-6 text-center">
        <UserIcon class="w-8 h-8 mx-auto mb-2 text-blue-600" />
        <h2 class="text-lg font-medium mb-1">User Management</h2>
        <p class="text-sm text-gray-500 mb-4">Create, update, and manage user accounts</p>
        <button class="text-blue-600 hover:underline text-sm">View User Management</button>
      </div>

      <div class="bg-white rounded-lg shadow p-6 text-center">
        <ShieldIcon class="w-8 h-8 mx-auto mb-2 text-blue-600" />
        <h2 class="text-lg font-medium mb-1">Roles & Permissions</h2>
        <p class="text-sm text-gray-500 mb-4">Configure access control for users</p>
        <button class="text-blue-600 hover:underline text-sm">View Roles and Permissions</button>
      </div>

      <div class="bg-white rounded-lg shadow p-6 text-center">
        <WalletIcon class="w-8 h-8 mx-auto mb-2 text-blue-600" />
        <h2 class="text-lg font-medium mb-1">Wallet Management</h2>
        <p class="text-sm text-gray-500 mb-4">Manage user wallets and financial transactions</p>
        <button class="text-blue-600 hover:underline text-sm">View Wallet Management</button>
      </div>
    </div>

    <div class="mt-12">
      <button class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700" @click="adminDashboard">
        Go to Admin Dashboard
      </button>
    </div>

    <footer class="mt-16 text-gray-500 text-sm">
      Admin Panel © 2023 | A comprehensive control center for your application
    </footer>
  </div>
</template>

<script setup>
import { UserIcon, ShieldIcon, WalletIcon, LayoutDashboardIcon as DashboardIcon } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const router = useRouter()


function adminDashboard() {
  // Add your login logic here if needed
  router.push({ name: 'admin-home' })
}
</script>

<style scoped>
/* Add custom styles if needed */
</style>
