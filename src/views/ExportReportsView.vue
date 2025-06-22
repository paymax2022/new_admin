<template>
  <div class="p-6 bg-white dark:bg-gray-900 min-h-screen">
    <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Export Reports</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <!-- Generate New Report -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Generate New Report</h2>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Create and download custom reports for your data</p>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Report Type</label>
          <select v-model="reportType" class="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm dark:bg-gray-800 dark:text-gray-100">
            <option v-for="type in reportTypes" :key="type" :value="type">{{ type }}</option>
          </select>
        </div>
        <div class="mb-4 grid grid-cols-2 gap-2">
          <div v-for="field in dataFields" :key="field.value" class="flex items-center">
            <input type="checkbox" v-model="selectedFields" :value="field.value" class="mr-2" />
            <label class="text-sm text-gray-700 dark:text-gray-200">{{ field.label }}</label>
          </div>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Date Range</label>
          <select v-model="dateRange" class="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm dark:bg-gray-800 dark:text-gray-100">
            <option>Last 30 days</option>
            <option>Last 7 days</option>
            <option>This Month</option>
            <option>Last Month</option>
          </select>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Export Format</label>
          <select v-model="exportFormat" class="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm dark:bg-gray-800 dark:text-gray-100">
            <option>CSV</option>
            <option>XLSX</option>
          </select>
        </div>
        <button class="w-full py-2 rounded bg-blue-600 text-white font-semibold flex items-center justify-center gap-2 text-base hover:bg-blue-700">
          Generate report
        </button>
      </div>
      <!-- Scheduled Reports -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Scheduled Reports</h2>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Set up automated report generation on a schedule</p>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Report Type</label>
          <select v-model="scheduledReportType" class="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm dark:bg-gray-800 dark:text-gray-100">
            <option v-for="type in reportTypes" :key="type" :value="type">{{ type }}</option>
          </select>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Frequency</label>
          <select v-model="frequency" class="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm dark:bg-gray-800 dark:text-gray-100">
            <option>Weekly</option>
            <option>Daily</option>
            <option>Monthly</option>
          </select>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Delivery Method</label>
          <select v-model="deliveryMethod" class="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm dark:bg-gray-800 dark:text-gray-100">
            <option>Mail</option>
            <option>Download</option>
          </select>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Recipients (Email)</label>
          <input v-model="recipients" type="text" class="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm dark:bg-gray-800 dark:text-gray-100" placeholder="emails@example.com" />
        </div>
        <button class="w-full py-2 rounded bg-blue-600 text-white font-semibold flex items-center justify-center gap-2 text-base hover:bg-blue-700">
          Schedule report
        </button>
      </div>
    </div>
    <!-- Previous Exports Table -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Previous Exports</h2>
      <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Download or view your previously generated reports:</p>
      <div class="flex flex-wrap gap-2 mb-4 items-center">
        <input v-model="search" type="text" placeholder="Search reports" class="flex-1 min-w-[200px] border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm dark:bg-gray-800 dark:text-gray-100" />
        <select v-model="typeFilter" class="border border-gray-300 dark:border-gray-600 rounded-md text-sm px-3 py-2 dark:bg-gray-800 dark:text-gray-100">
          <option value="">All Types</option>
          <option v-for="type in reportTypes" :key="type" :value="type">{{ type }}</option>
        </select>
        <button class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V4z"/></svg>
        </button>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr class="bg-gray-50 dark:bg-gray-700">
              <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300">Report Name</th>
              <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300">Type</th>
              <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300">Format</th>
              <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300">Date Created</th>
              <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300">Size</th>
              <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300">Status</th>
              <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, idx) in paginatedExports" :key="row.name + idx" class="hover:bg-gray-50 dark:hover:bg-gray-800/50">
              <td class="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">{{ row.name }}</td>
              <td class="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">{{ row.type }}</td>
              <td class="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">{{ row.format }}</td>
              <td class="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">{{ row.date }}</td>
              <td class="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">{{ row.size }}</td>
              <td class="px-4 py-2 text-sm">
                <span :class="statusClass(row.status)" class="inline-block px-3 py-1 rounded-full text-xs font-semibold">
                  {{ row.status }}
                </span>
              </td>
              <td class="px-4 py-2 text-sm">
                <button class="text-blue-600 hover:underline mr-2">Download</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="flex items-center justify-between px-4 py-2 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400">
          <span>Showing {{ (exportPage-1)*perPage+1 }} to {{ Math.min(exportPage*perPage, filteredExports.length) }} of {{ filteredExports.length }} entries</span>
          <div class="flex gap-1">
            <button v-for="n in totalPages" :key="n" @click="exportPage = n" :class="[exportPage === n ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200', 'px-2 py-1 rounded border border-gray-300 dark:border-gray-600']">{{ n }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
const reportTypes = [
  'Transaction Report',
  'User Activity Report',
  'Financial Summary',
  'Commission Report',
  'User Growth Report',
  'Wallet Balance Report',
  'Referral Performance Report',
]
const dataFields = [
  { label: 'ID', value: 'id' },
  { label: 'User', value: 'user' },
  { label: 'Date/Time', value: 'datetime' },
  { label: 'Amount', value: 'amount' },
  { label: 'Status', value: 'status' },
]
const reportType = ref(reportTypes[0])
const selectedFields = ref(['id', 'user', 'datetime', 'amount', 'status'])
const dateRange = ref('Last 30 days')
const exportFormat = ref('CSV')
const scheduledReportType = ref(reportTypes[0])
const frequency = ref('Weekly')
const deliveryMethod = ref('Mail')
const recipients = ref('emails@example.com')
const search = ref('')
const typeFilter = ref('')
const exportsData = ref([
  { name: 'transaction-report-2023-04-06', type: 'transaction', format: 'csv', date: '2023-04-06 08:46:32', size: '1.2 MB', status: 'completed' },
  { name: 'user-activity-2023-04-06', type: 'user activity', format: 'csv', date: '2023-04-06 08:46:32', size: '1.2 MB', status: 'completed' },
  { name: 'commission-2023-04-06', type: 'commission', format: 'csv', date: '2023-04-06 08:46:32', size: '1.2 MB', status: 'completed' },
  { name: 'user-activity-2023-04-06', type: 'user activity', format: 'csv', date: '2023-04-06 08:46:32', size: '1.2 MB', status: 'completed' },
  { name: 'user-activity-2023-04-06', type: 'user activity', format: 'csv', date: '2023-04-06 08:46:32', size: '1.2 MB', status: 'processing' },
])
const filteredExports = computed(() => {
  let data = exportsData.value
  if (search.value) {
    data = data.filter(r => r.name.toLowerCase().includes(search.value.toLowerCase()) || r.type.toLowerCase().includes(search.value.toLowerCase()))
  }
  if (typeFilter.value) {
    data = data.filter(r => r.type === typeFilter.value)
  }
  return data
})
const exportPage = ref(1)
const perPage = 10
const totalPages = computed(() => Math.ceil(filteredExports.value.length / perPage))
const paginatedExports = computed(() => filteredExports.value.slice((exportPage.value-1)*perPage, exportPage.value*perPage))
function statusClass(status) {
  return {
    'completed': 'bg-green-100 text-green-600',
    'processing': 'bg-blue-100 text-blue-600',
    'failed': 'bg-red-100 text-red-600',
  }[status] || ''
}
</script>
