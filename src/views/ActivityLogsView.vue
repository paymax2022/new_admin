<template>
  <div class="p-6 bg-white dark:bg-gray-900 min-h-screen">
    <div class="flex items-center justify-between mb-2">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Activity Logs</h1>
      <div class="flex gap-2">
        <button class="flex items-center px-4 py-2 bg-white border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
          Date Range
        </button>
        <button class="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"/></svg>
          Export
        </button>
      </div>
    </div>
    <div class="mb-2">
      <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">System Activity</h2>
      <p class="text-sm text-gray-500 dark:text-gray-400">Comprehensive logs of system and user activities</p>
    </div>
    <div class="flex flex-wrap gap-2 mb-4 items-center">
      <input v-model="search" type="text" placeholder="Search Logs" class="flex-1 min-w-[200px] border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm dark:bg-gray-800 dark:text-gray-100" />
      <select v-model="categoryFilter" class="border border-gray-300 dark:border-gray-600 rounded-md text-sm px-3 py-2 dark:bg-gray-800 dark:text-gray-100">
        <option value="">All Categories</option>
        <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
      </select>
      <select v-model="userFilter" class="border border-gray-300 dark:border-gray-600 rounded-md text-sm px-3 py-2 dark:bg-gray-800 dark:text-gray-100">
        <option value="">All Users</option>
        <option v-for="user in users" :key="user" :value="user">{{ user }}</option>
      </select>
      <button class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V4z"/></svg>
      </button>
    </div>
    <div class="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead>
          <tr class="bg-gray-50 dark:bg-gray-700">
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300">Timestamp</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300">User</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300">Action</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300">Details</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300">IP Address</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300">Category</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, idx) in paginatedLogs" :key="row.timestamp + idx" class="hover:bg-gray-50 dark:hover:bg-gray-800/50">
            <td class="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">{{ row.timestamp }}</td>
            <td class="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">{{ row.user }}</td>
            <td class="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">{{ row.action }}</td>
            <td class="px-4 py-2 text-sm text-gray-700 dark:text-gray-200">{{ row.details }}</td>
            <td class="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">{{ row.ip }}</td>
            <td class="px-4 py-2 text-sm">
              <span :class="categoryClass(row.category)" class="inline-block px-3 py-1 rounded-full text-xs font-semibold">
                {{ row.category }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="flex items-center justify-between px-4 py-2 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400">
        <span>Showing {{ (logPage-1)*perPage+1 }} to {{ Math.min(logPage*perPage, filteredLogs.length) }} of {{ filteredLogs.length }} entries</span>
        <div class="flex gap-1">
          <button v-for="n in totalPages" :key="n" @click="logPage = n" :class="[logPage === n ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200', 'px-2 py-1 rounded border border-gray-300 dark:border-gray-600']">{{ n }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
const search = ref('')
const categoryFilter = ref('')
const userFilter = ref('')
const categories = ['Dispute', 'Auth', 'User', 'Wallet', 'System']
const users = ['admin@example.com / Admin']
const logs = ref([
  { timestamp: '2025-04-09 08:23:45', user: 'admin@example.com / Admin', action: 'Dispute Resolved', details: 'Resolved dispute ID: DIS-5678 in favor of customer', ip: '192.168.1.1', category: 'Dispute' },
  { timestamp: '2025-04-09 08:23:45', user: 'admin@example.com / Admin', action: 'Login', details: 'User logged in successfully', ip: '192.168.1.1', category: 'Auth' },
  { timestamp: '2025-04-09 08:23:45', user: 'admin@example.com / Admin', action: 'Dispute Resolved', details: 'Resolved dispute ID: DIS-5678 in favor of customer', ip: '192.168.1.1', category: 'Dispute' },
  { timestamp: '2025-04-09 08:23:45', user: 'admin@example.com / Admin', action: 'Dispute Resolved', details: 'Resolved dispute ID: DIS-5678 in favor of customer', ip: '192.168.1.1', category: 'Dispute' },
  { timestamp: '2025-04-09 08:23:45', user: 'admin@example.com / Admin', action: 'User Created', details: 'Created new user account: john.smith@example.com', ip: '192.168.1.1', category: 'User' },
  { timestamp: '2025-04-09 08:23:45', user: 'admin@example.com / Admin', action: 'Wallet Credited', details: 'Credited $500 to wallet ID: W-7890', ip: '192.168.1.1', category: 'Wallet' },
  { timestamp: '2025-04-09 08:23:45', user: 'admin@example.com / Admin', action: 'Role Modified', details: 'Modified permissions for role: Moderator', ip: '192.168.1.1', category: 'System' },
])
const filteredLogs = computed(() => {
  let data = logs.value
  if (search.value) {
    data = data.filter(r => r.user.toLowerCase().includes(search.value.toLowerCase()) || r.action.toLowerCase().includes(search.value.toLowerCase()) || r.details.toLowerCase().includes(search.value.toLowerCase()))
  }
  if (categoryFilter.value) {
    data = data.filter(r => r.category === categoryFilter.value)
  }
  if (userFilter.value) {
    data = data.filter(r => r.user === userFilter.value)
  }
  return data
})
const logPage = ref(1)
const perPage = 10
const totalPages = computed(() => Math.ceil(filteredLogs.value.length / perPage))
const paginatedLogs = computed(() => filteredLogs.value.slice((logPage.value-1)*perPage, logPage.value*perPage))
function categoryClass(category) {
  return {
    'Dispute': 'bg-red-100 text-red-600',
    'Auth': 'bg-yellow-100 text-yellow-700',
    'User': 'bg-blue-100 text-blue-600',
    'Wallet': 'bg-green-100 text-green-600',
    'System': 'bg-gray-100 text-gray-700',
  }[category] || ''
}
</script> 