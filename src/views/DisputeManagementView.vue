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
            <td class="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">
              <button v-if="row.assignee === 'Assign'" class="text-blue-600 hover:underline" @click="openAssignModal(row)">Assign</button>
              <span v-else>{{ row.assignee }}</span>
            </td>
            <td class="px-4 py-2 text-center flex gap-2 justify-center">
              <button class="text-gray-600 hover:text-blue-600" title="View" @click="openAnalyticsModal(row)">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              </button>
              <button class="text-green-600 hover:text-green-800" title="Resolve">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
              </button>
              <button class="text-gray-400 hover:text-gray-600" title="Notes">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8 4.03-8 9-8 9 3.582 9 8z" /></svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- Analytics Modal -->
      <TransitionRoot appear :show="showAnalyticsModal" as="template">
        <Dialog as="div" @close="showAnalyticsModal = false" class="relative z-50">
          <TransitionChild
            as="template"
            enter="transform transition ease-in-out duration-300"
            enter-from="translate-x-full"
            enter-to="translate-x-0"
            leave="transform transition ease-in-out duration-300"
            leave-from="translate-x-0"
            leave-to="translate-x-full"
          >
            <DialogPanel class="fixed inset-y-0 right-0 w-full max-w-md bg-white dark:bg-gray-900 shadow-xl p-8 overflow-y-auto">
              <h2 class="text-xl font-bold mb-2">Dispute Analytics</h2>
              <p class="text-sm text-gray-500 mb-6">View statistics about dispute trends and resolution times</p>
              <div class="grid grid-cols-2 gap-4 mb-6">
                <div class="bg-gray-50 rounded-lg p-4 text-center">
                  <div class="text-xs text-gray-500 mb-1">Total Disputes</div>
                  <div class="text-2xl font-bold">4</div>
                  <div class="text-xs text-gray-400">Last 30 days</div>
                </div>
                <div class="bg-gray-50 rounded-lg p-4 text-center">
                  <div class="text-xs text-gray-500 mb-1">Open</div>
                  <div class="text-2xl font-bold text-red-500">1</div>
                  <div class="text-xs text-gray-400">Require attention</div>
                </div>
                <div class="bg-gray-50 rounded-lg p-4 text-center">
                  <div class="text-xs text-gray-500 mb-1">Resolved</div>
                  <div class="text-2xl font-bold text-green-600">1</div>
                  <div class="text-xs text-gray-400">Successfully closed</div>
                </div>
              </div>
              <div class="mb-6">
                <div class="font-semibold mb-2">Resolution Breakdown</div>
                <div class="flex flex-col gap-1 text-sm">
                  <div>In favor of buyer <span class="float-right">1 (100%)</span></div>
                  <div>In favor of seller <span class="float-right">0 (0%)</span></div>
                  <div>Escalated to legal <span class="float-right">0 (0%)</span></div>
                </div>
              </div>
              <div class="mb-6">
                <div class="font-semibold mb-2">Response Time</div>
                <div class="flex flex-col gap-1 text-sm">
                  <div>Average time to first response <span class="float-right">2.4 hours</span></div>
                  <div>Average resolution time <span class="float-right">3.2 days</span></div>
                </div>
              </div>
              <div class="flex justify-end">
                <button @click="showAnalyticsModal = false" class="px-4 py-2 rounded bg-blue-600 text-white">Close</button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </TransitionRoot>
      <!-- Assign Modal -->
      <TransitionRoot appear :show="showAssignModal" as="template">
        <Dialog as="div" @close="showAssignModal = false" class="relative z-50">
          <TransitionChild
            as="template"
            enter="transform transition ease-in-out duration-300"
            enter-from="translate-x-full"
            enter-to="translate-x-0"
            leave="transform transition ease-in-out duration-300"
            leave-from="translate-x-0"
            leave-to="translate-x-full"
          >
            <DialogPanel class="fixed inset-y-0 right-0 w-full max-w-md bg-white dark:bg-gray-900 shadow-xl p-8 overflow-y-auto">
              <div class="flex justify-between items-center mb-6">
                <h2 class="text-xl font-bold">Assign Dispute</h2>
                <button @click="showAssignModal = false" class="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
              </div>
              <p class="text-sm text-gray-500 mb-6">Select a staff member to handle dispute {{ selectedDispute?.id }}</p>
              <div class="flex flex-col gap-3 mb-8">
                <button v-for="staff in staffList" :key="staff" class="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  {{ staff }}
                </button>
              </div>
              <div class="flex justify-end">
                <button @click="showAssignModal = false" class="px-4 py-2 rounded bg-blue-600 text-white">Close</button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </TransitionRoot>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
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
const showAnalyticsModal = ref(false)
const showAssignModal = ref(false)
const selectedDispute = ref(null)
const staffList = [
  'John Smith',
  'John Smith',
  'John Smith',
  'John Smith',
  'John Smith',
]
function openAnalyticsModal(row) {
  showAnalyticsModal.value = true
}
function openAssignModal(row) {
  selectedDispute.value = row
  showAssignModal.value = true
}
</script> 