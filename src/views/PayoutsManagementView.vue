<template>
  <div class="p-6 bg-white dark:bg-gray-900 min-h-screen">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-semibold text-gray-900 dark:text-gray-100">Payout Management</h1>
      <button class="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 font-medium flex items-center">
        <ArrowDownTrayIcon class="h-4 w-4 mr-2" />
        Export
      </button>
    </div>
    <div class="mb-4">
      <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">Payout Requests</h2>
      <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">Process and manage payout requests from users</p>
      <div class="flex items-center gap-3 mb-4">
        <div class="relative flex-1 max-w-xs">
          <MagnifyingGlassIcon class="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            v-model="search"
            type="text"
            placeholder="Search by user or transaction ID"
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
          >
        </div>
        <select v-model="statusFilter" class="border border-gray-300 rounded-md text-sm px-3 py-2 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100">
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
        <button class="p-2 border border-gray-300 rounded-md text-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100">
          <FunnelIcon class="h-5 w-5" />
        </button>
      </div>
    </div>
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead class="bg-gray-50 dark:bg-gray-900/50">
          <tr>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Request ID</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">User</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Method</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date Requested</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
            <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
          <tr v-for="(item, idx) in paginatedData" :key="item.id" class="hover:bg-gray-50 dark:hover:bg-gray-800/50">
            <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{{ item.id }}</td>
            <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{{ item.user }}</td>
            <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">${{ item.amount.toFixed(2) }}</td>
            <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{{ item.method }}</td>
            <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{{ item.date }}</td>
            <td class="px-4 py-4 whitespace-nowrap">
              <span :class="[
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                item.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : '',
                item.status === 'Approved' ? 'bg-green-100 text-green-800' : '',
                item.status === 'Rejected' ? 'bg-red-100 text-red-800' : ''
              ]">
                {{ item.status }}
              </span>
            </td>
            <td class="px-4 py-4 whitespace-nowrap text-right text-sm font-medium flex gap-2 justify-end">
              <button class="text-gray-500 hover:text-blue-600" @click="openPayoutDetails(item)"><EyeIcon class="h-5 w-5" /></button>
              <button class="text-green-600 hover:text-green-800"><CheckIcon class="h-5 w-5" /></button>
              <button class="text-red-600 hover:text-red-800"><XMarkIcon class="h-5 w-5" /></button>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- Pagination -->
      <div class="flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
        <div class="text-xs text-gray-500 dark:text-gray-400">
          Showing {{ (currentPage-1)*pageSize+1 }} to {{ Math.min(currentPage*pageSize, filteredData.length) }} of {{ filteredData.length }} entries
        </div>
        <div class="flex items-center space-x-1">
          <button @click="prevPage" :disabled="currentPage === 1" class="px-2 py-1 rounded border text-xs" :class="currentPage === 1 ? 'text-gray-400 border-gray-200 dark:border-gray-700' : 'text-gray-700 border-gray-300 dark:text-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800'">
            &lt;
          </button>
          <button v-for="page in totalPages" :key="page" @click="goToPage(page)" :class="['px-2 py-1 rounded border text-xs', currentPage === page ? 'bg-blue-600 text-white border-blue-600' : 'text-gray-700 border-gray-300 dark:text-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800']">
            {{ page }}
          </button>
          <button @click="nextPage" :disabled="currentPage === totalPages" class="px-2 py-1 rounded border text-xs" :class="currentPage === totalPages ? 'text-gray-400 border-gray-200 dark:border-gray-700' : 'text-gray-700 border-gray-300 dark:text-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800'">
            &gt;
          </button>
        </div>
      </div>
    </div>
    <TransitionRoot appear :show="showPayoutDetailsModal" as="template">
      <Dialog as="div" @close="closePayoutDetails" class="relative z-50">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/30 dark:bg-black/50" />
        </TransitionChild>
        <div class="fixed inset-y-0 right-0 overflow-y-auto">
          <div class="flex min-h-full justify-end">
            <TransitionChild
              as="template"
              enter="transform transition ease-in-out duration-300"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transform transition ease-in-out duration-300"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
            >
              <DialogPanel class="w-[450px] transform overflow-hidden bg-white dark:bg-gray-800 p-6 shadow-xl transition-all">
                <div class="flex items-center justify-between mb-5">
                  <DialogTitle class="text-xl font-semibold text-gray-900 dark:text-white">
                    Payout Details
                  </DialogTitle>
                  <button @click="closePayoutDetails" class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                    <XMarkIcon class="h-5 w-5" />
                  </button>
                </div>
                <div class="text-xs text-gray-500 mb-2">Transaction ID: {{ selectedPayout?.id || '' }}</div>
                <div class="space-y-4">
                  <div>
                    <div class="text-sm text-gray-500 mb-1">Status</div>
                    <span :class="[
                      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                      selectedPayout?.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : '',
                      selectedPayout?.status === 'Approved' ? 'bg-green-100 text-green-800' : '',
                      selectedPayout?.status === 'Rejected' ? 'bg-red-100 text-red-800' : ''
                    ]">
                      {{ selectedPayout?.status }}
                    </span>
                  </div>
                  <div>
                    <div class="text-sm text-gray-500 mb-1">Amount</div>
                    <div class="text-base text-gray-900 dark:text-white">USD {{ selectedPayout?.amount?.toFixed(2) }}</div>
                  </div>
                  <div>
                    <div class="text-sm text-gray-500 mb-1">Beneficiary</div>
                    <div class="text-base text-gray-900 dark:text-white">{{ selectedPayout?.user }}</div>
                  </div>
                  <div>
                    <div class="text-sm text-gray-500 mb-1">Method</div>
                    <div class="text-base text-gray-900 dark:text-white">{{ selectedPayout?.method }}</div>
                    <div v-if="selectedPayout?.method === 'Bank Transfer'" class="text-sm text-gray-700 dark:text-gray-300 mt-1">
                      Bank: Access Bank<br />
                      Account Number: 1234567890
                    </div>
                  </div>
                  <div>
                    <div class="text-sm text-gray-500 mb-1">Requested At</div>
                    <div class="text-base text-gray-900 dark:text-white">{{ selectedPayout?.date }}</div>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ArrowDownTrayIcon, MagnifyingGlassIcon, FunnelIcon, EyeIcon, CheckIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { Dialog, DialogPanel, DialogTitle, TransitionRoot, TransitionChild } from '@headlessui/vue'
const payoutData = ref([
  { id: 'PO-12345', user: 'John Smith', amount: 250, method: 'Bank Transfer', date: '2025-04-07', status: 'Pending' },
  { id: 'PO-12346', user: 'Jane Doe', amount: 750, method: 'PayPal', date: '2025-04-07', status: 'Rejected' },
  { id: 'PO-12347', user: 'Michael Brown', amount: 750, method: 'Crypto', date: '2025-04-07', status: 'Approved' },
  { id: 'PO-12347', user: 'Michael Brown', amount: 750, method: 'Crypto', date: '2025-04-07', status: 'Approved' }
])
const search = ref('')
const statusFilter = ref('')
const pageSize = 5
const currentPage = ref(1)
const filteredData = computed(() => {
  let data = payoutData.value
  if (search.value) {
    data = data.filter(item =>
      item.user.toLowerCase().includes(search.value.toLowerCase()) ||
      item.id.toLowerCase().includes(search.value.toLowerCase())
    )
  }
  if (statusFilter.value) {
    data = data.filter(item => item.status === statusFilter.value)
  }
  return data
})
const totalPages = computed(() => Math.ceil(filteredData.value.length / pageSize))
const paginatedData = computed(() => filteredData.value.slice((currentPage.value-1)*pageSize, currentPage.value*pageSize))
function prevPage() { if (currentPage.value > 1) currentPage.value-- }
function nextPage() { if (currentPage.value < totalPages.value) currentPage.value++ }
function goToPage(page) { currentPage.value = page }
const showPayoutDetailsModal = ref(false)
const selectedPayout = ref(null)
function openPayoutDetails(payout) {
  selectedPayout.value = payout
  showPayoutDetailsModal.value = true
}
function closePayoutDetails() {
  showPayoutDetailsModal.value = false
  selectedPayout.value = null
}
</script> 