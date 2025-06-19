<template>
  <div class="p-6 bg-white dark:bg-gray-900 min-h-screen">
    <div class="flex items-center justify-between mb-2">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Dispute Management</h1>
      <div class="flex gap-2">
        <button class="flex items-center px-4 py-2 bg-white border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700">
          <span class="mr-2">📊</span> Analytics
        </button>
        <button class="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
          <span class="mr-2">⬇️</span> Export
        </button>
      </div>
    </div>
    <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">View and manage all customer disputes</p>
    <div class="flex flex-wrap gap-2 mb-4">
      <input v-model="search" type="text" placeholder="Search: Disputes" class="flex-1 min-w-[200px] border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm dark:bg-gray-800 dark:text-gray-100" />
      <select v-model="statusFilter" class="border border-gray-300 dark:border-gray-600 rounded-md text-sm px-3 py-2 dark:bg-gray-800 dark:text-gray-100">
        <option value="">All Status</option>
        <option value="Open">Open</option>
        <option value="Investigating">Investigating</option>
        <option value="Pending">Pending</option>
        <option value="Resolved">Resolved</option>
      </select>
    </div>
    <div class="mb-2 border-b border-gray-200 dark:border-gray-700">
      <nav class="flex space-x-8" aria-label="Tabs">
        <button v-for="tab in tabs" :key="tab" @click="selectedTab = tab" :class="[selectedTab === tab ? 'border-blue-600 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200', 'whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm focus:outline-none']">
          {{ tab }}
        </button>
      </nav>
    </div>
    <div class="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead>
          <tr class="bg-gray-50 dark:bg-gray-700">
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300">Dispute ID</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300">User</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300">Subject</th>
            <th class="px-4 py-2 text-right text-xs font-medium text-gray-500 dark:text-gray-300">Amount</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300">Date Opened</th>
            <th class="px-4 py-2 text-center text-xs font-medium text-gray-500 dark:text-gray-300">Status</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300">Assignee</th>
            <th class="px-4 py-2 text-center text-xs font-medium text-gray-500 dark:text-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, idx) in paginatedRows" :key="row.id" class="hover:bg-gray-50 dark:hover:bg-gray-800/50">
            <td class="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">{{ row.id }}</td>
            <td class="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">{{ row.user }}</td>
            <td class="px-4 py-2 text-sm text-gray-700 dark:text-gray-200">{{ row.subject }}</td>
            <td class="px-4 py-2 text-sm text-right text-gray-900 dark:text-gray-100">${{ row.amount.toFixed(2) }}</td>
            <td class="px-4 py-2 text-sm text-gray-700 dark:text-gray-200">{{ row.date }}</td>
            <td class="px-4 py-2 text-center">
              <span :class="statusClass(row.status)">{{ row.status }}</span>
            </td>
            <td class="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">{{ row.assignee }}</td>
            <td class="px-4 py-2 text-center">
              <button class="text-blue-600 hover:text-blue-800 mx-1" title="Assign">👤</button>
              <button class="text-green-600 hover:text-green-800 mx-1" title="View">👁️</button>
              <button class="text-yellow-600 hover:text-yellow-800 mx-1" title="Edit">✏️</button>
              <button class="text-gray-400 hover:text-gray-600 mx-1" title="Notes">📝</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="flex items-center justify-between px-4 py-2 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400">
        <span>Showing 0 to 0 of entries (filtered from 0 total entries)</span>
        <div class="flex gap-1">
          <button v-for="n in 5" :key="n" @click="page = n" :class="[page === n ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200', 'px-2 py-1 rounded border border-gray-300 dark:border-gray-600']">{{ n }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
const tabs = ['All Disputes', 'Open', 'Investigating', 'Resolved']
const selectedTab = ref('All Disputes')
const search = ref('')
const statusFilter = ref('')
const page = ref(1)
const rows = ref([
  { id: 'DIS-12345', user: 'John Smith', subject: 'Incorrect Transaction Amount', amount: 250.00, date: '2023-04-07', status: 'Open', assignee: 'Assign' },
  { id: 'DIS-23456', user: 'Jane Doe', subject: 'Failed Withdrawal', amount: 210.00, date: '2023-04-09', status: 'Investigating', assignee: 'John Smith' },
  { id: 'DIS-34567', user: 'Michael Brown', subject: 'Unauthorized Access', amount: 1200.00, date: '2023-04-10', status: 'Pending', assignee: 'John Smith' },
  { id: 'DIS-12448', user: 'Michael Brown', subject: 'Missing Referral Commission', amount: 1200.00, date: '2023-04-09', status: 'Resolved', assignee: 'John Smith' },
])
const filteredRows = computed(() => {
  let data = rows.value
  if (selectedTab.value !== 'All Disputes') {
    data = data.filter(r => r.status === selectedTab.value)
  }
  if (search.value) {
    data = data.filter(r => r.user.toLowerCase().includes(search.value.toLowerCase()) || r.subject.toLowerCase().includes(search.value.toLowerCase()) || r.id.toLowerCase().includes(search.value.toLowerCase()))
  }
  if (statusFilter.value) {
    data = data.filter(r => r.status === statusFilter.value)
  }
  return data
})
const paginatedRows = computed(() => filteredRows.value.slice((page.value-1)*5, page.value*5))
function statusClass(status) {
  return {
    'Open': 'inline-block px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-600',
    'Investigating': 'inline-block px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700',
    'Pending': 'inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700',
    'Resolved': 'inline-block px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700',
  }[status] || ''
}
</script> 