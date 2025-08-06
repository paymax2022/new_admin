<template>
  <div class="p-6 bg-white dark:bg-gray-900 min-h-screen">
    <div class="mb-6">
      <h1 class="text-2xl font-semibold text-gray-900 dark:text-gray-100">Transaction Management</h1>
    </div>
    <!-- Transaction Management -->
    <div class="mb-6">
      <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Transaction Management</h2>
      <p class="text-sm text-gray-500 dark:text-gray-400">Manage and monitor all financial transactions in the system</p>
    </div>
    <!-- Search, Filter, Actions -->
    <div class="flex items-center justify-between mb-6">
      <!-- Search Bar -->
      <div class="flex-1 max-w-lg">
        <div class="relative">
          <MagnifyingGlassIcon class="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search by user or transaction ID"
            class="w-full rounded-md border border-gray-300 pl-10 pr-4 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-400"
          >
        </div>
      </div>
      <!-- Filters -->
      <div class="flex items-center space-x-3">
        <div class="w-40">
          <select v-model="statusFilter" class="block w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100">
            <option value="">All Status</option>
            <option value="SUCCESSFUL">Completed</option>
            <option value="PENDING">Pending</option>
            <option value="FAILED">Failed</option>
            <option value="REVERSED">Reversed</option>
          </select>
        </div>
        <!-- Native Date Range Picker -->
        <div class="flex items-center space-x-2">
          <input type="date" v-model="startDate" @change="onDateChange" class="rounded-md border border-gray-300 py-2 px-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100" />
          <span class="text-gray-500">to</span>
          <input type="date" v-model="endDate" @change="onDateChange" class="rounded-md border border-gray-300 py-2 px-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100" />
        </div>
        <!-- Actions -->
        <button @click="refresh" class="inline-flex items-center justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
          <ArrowPathIcon class="h-4 w-4 mr-2" />
        </button>
        <button @click="flagTransaction(selectedTransaction)" class="inline-flex items-center justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
          <FlagIcon class="h-4 w-4 mr-2" />
        </button>
        <button @click="printTable" class="inline-flex items-center justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
          <PrinterIcon class="h-4 w-4 mr-2" />
        </button>
        <button @click="exportCSV" class="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          <ArrowDownTrayIcon class="h-4 w-4 mr-2" />
          Export
        </button>
      </div>
    </div>
    <div v-if="loading" class="flex justify-center items-center py-10">
      <span class="text-blue-600 font-semibold">Loading...</span>
    </div>
    <div v-else>
    <div class="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead class="bg-gray-50 dark:bg-gray-800">
          <tr>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Transaction ID</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">User</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
              <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="transaction in filteredTransactions" :key="transaction.id" @click="openModal(transaction)" class="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50">
            <td class="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{{ transaction.id }}</td>
              <td class="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{{ new Date(transaction.created_at).toLocaleString() }}</td>
              <td class="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                <span v-if="transaction.user">{{ transaction.user.first_name }} {{ transaction.user.lastname }}<br><span class="text-xs text-gray-500">{{ transaction.user.email }}</span></span>
                <span v-else>-</span>
              </td>
              <td class="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{{ transaction.category }}</td>
              <td class="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{{ formatCurrency(transaction.amount) }}</td>
            <td class="px-4 py-3 text-sm">
              <span :class="[
                'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                {
                    'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400': transaction.status === 'SUCCESSFUL',
                    'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400': transaction.status === 'FAILED',
                    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400': transaction.status === 'PENDING',
                    'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400': transaction.status === 'REVERSED'
                }
              ]">
                {{ transaction.status }}
              </span>
            </td>
            <td class="px-4 py-3 text-sm text-right space-x-1">
                <button class="text-gray-400 hover:text-gray-500" @click.stop="openModal(transaction)">
                <MagnifyingGlassIcon class="h-4 w-4" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Pagination -->
    <div class="flex items-center justify-between mt-4">
      <div class="text-sm text-gray-500 dark:text-gray-400">
          Showing {{ (page - 1) * rowsPerPage + 1 }} to {{ Math.min(page * rowsPerPage, totalCount) }} of {{ totalCount }} entries
        </div>
        <div class="flex items-center space-x-2">
          <button @click="goToPage(page - 1)" :disabled="page === 1" class="inline-flex items-center justify-center rounded-md border border-gray-300 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800">&larr;</button>
          <button v-for="p in totalPages" :key="p" @click="goToPage(p)" :class="['inline-flex items-center justify-center rounded-md px-3 py-1 text-sm font-medium', p === page ? 'bg-blue-600 text-white' : 'border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800']">{{ p }}</button>
          <button @click="goToPage(page + 1)" :disabled="page === totalPages" class="inline-flex items-center justify-center rounded-md border border-gray-300 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800">&rarr;</button>
        </div>
      </div>
    </div>
    <!-- Transaction Details Modal (already present) -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-2xl relative">
        <button @click="closeModal" class="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl font-bold">&times;</button>
        <h2 class="text-xl font-semibold mb-4">Transaction Details</h2>
        <div v-if="selectedTransaction">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><strong>ID:</strong> {{ selectedTransaction.id }}</div>
            <div><strong>Date:</strong> {{ new Date(selectedTransaction.created_at).toLocaleString() }}</div>
            <div><strong>User:</strong> <span v-if="selectedTransaction.user">{{ selectedTransaction.user.first_name }} {{ selectedTransaction.user.lastname }} ({{ selectedTransaction.user.email }})</span></div>
            <div><strong>Receiver:</strong> {{ selectedTransaction.receiver }}</div>
            <div><strong>Category:</strong> {{ selectedTransaction.category }}</div>
            <div><strong>Service Type:</strong> {{ selectedTransaction.service_type }}</div>
            <div><strong>Amount:</strong> {{ formatCurrency(selectedTransaction.amount) }}</div>
            <div><strong>Status:</strong> {{ selectedTransaction.status }}</div>
            <div><strong>Payment Method:</strong> {{ selectedTransaction.payment_method }}</div>
            <div><strong>Network:</strong> {{ selectedTransaction.network }}</div>
            <div><strong>Provider:</strong> {{ selectedTransaction.provider }}</div>
            <div><strong>Provider Package:</strong> {{ selectedTransaction.providerPackage }}</div>
            <div><strong>Phone Number:</strong> {{ selectedTransaction.phoneNumber }}</div>
            <div><strong>Payment Reference:</strong> {{ selectedTransaction.paymentReference }}</div>
            <div><strong>Entry:</strong> {{ selectedTransaction.entry }}</div>
            <div><strong>Created At:</strong> {{ new Date(selectedTransaction.created_at).toLocaleString() }}</div>
            <div><strong>Updated At:</strong> {{ new Date(selectedTransaction.updated_at).toLocaleString() }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import {
  MagnifyingGlassIcon,
  CalendarIcon,
  ArrowPathIcon,
  FlagIcon,
  PrinterIcon,
  ArrowDownTrayIcon
} from '@heroicons/vue/24/outline'
import transactionService from '@/services/transactionService'
// Removed Datepicker import

export default {
  name: 'TransactionManagementView',
  components: {
    MagnifyingGlassIcon,
    CalendarIcon,
    ArrowPathIcon,
    FlagIcon,
    PrinterIcon,
    ArrowDownTrayIcon
  },
  setup() {
    const transactions = ref([])
    const loading = ref(false)
    const showModal = ref(false)
    const selectedTransaction = ref(null)
    const page = ref(1)
    const rowsPerPage = ref(10)
    const totalCount = ref(0)
    const totalPages = ref(1)
    const searchQuery = ref('')
    const statusFilter = ref('')
    const startDate = ref('')
    const endDate = ref('')

    const fetchTransactions = async (pageNum = 1) => {
      loading.value = true
      try {
        const params = {
          page: pageNum,
          rows_per_page: rowsPerPage.value,
        }
        if (startDate.value) params.start_date = startDate.value
        if (endDate.value) params.end_date = endDate.value
        if (searchQuery.value) params.q = searchQuery.value
        if (statusFilter.value) params.status = statusFilter.value
        const res = await transactionService.getTransactions(params)
        const data = res.data
        transactions.value = data.data || []
        page.value = data.page || 1
        rowsPerPage.value = data.rows_per_page || 10
        totalCount.value = data.total_count || 0
        totalPages.value = Math.ceil(totalCount.value / rowsPerPage.value)
      } catch (e) {
        transactions.value = []
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      fetchTransactions()
    })

    const goToPage = (p) => {
      if (p < 1 || p > totalPages.value) return
      fetchTransactions(p)
    }

    const openModal = (transaction) => {
      selectedTransaction.value = transaction
      showModal.value = true
    }
    const closeModal = () => {
      showModal.value = false
      selectedTransaction.value = null
    }

    const onDateChange = () => {
      fetchTransactions(1)
    }

    const refresh = () => fetchTransactions(page.value)
    const printTable = () => window.print()
    const exportCSV = () => {
      // Implement CSV export logic for filteredTransactions.value
    }
    const flagTransaction = (transaction) => {
      // Implement flag logic
    }

    // Format currency for NGN
    const formatCurrency = (value) => {
      return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 0
      }).format(value)
    }

    const filteredTransactions = computed(() => {
      let filtered = transactions.value
      if (searchQuery.value) {
        const q = searchQuery.value.toLowerCase()
        filtered = filtered.filter(t =>
          (t.id && t.id.toLowerCase().includes(q)) ||
          (t.user && ((t.user.first_name + ' ' + t.user.lastname).toLowerCase().includes(q) || (t.user.email && t.user.email.toLowerCase().includes(q))) )
        )
      }
      if (statusFilter.value) {
        filtered = filtered.filter(t => t.status === statusFilter.value)
      }
      if (startDate.value) {
        filtered = filtered.filter(t => new Date(t.created_at) >= new Date(startDate.value))
      }
      if (endDate.value) {
        filtered = filtered.filter(t => new Date(t.created_at) <= new Date(endDate.value))
      }
      return filtered
    })

    return {
        transactions,
        loading,
        showModal,
        selectedTransaction,
        page,
        rowsPerPage,
        totalCount,
        totalPages,
        goToPage,
        openModal,
        closeModal,
        searchQuery,
        statusFilter,
        filteredTransactions,
        startDate,
        endDate,
        onDateChange,
        refresh,
        printTable,
        exportCSV,
        flagTransaction,
        formatCurrency
      }
  }
}
</script>