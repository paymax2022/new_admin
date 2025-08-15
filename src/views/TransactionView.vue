<template>
  <div class="space-y-6">
    <!-- Header Section -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Transaction Monitoring</h1>
        <p class="text-gray-600 dark:text-gray-400">Track all platform transactions and fees</p>
      </div>
      <div class="flex items-center space-x-4">
        <div class="text-sm text-gray-500">
          Last refreshed: {{ lastUpdated }}
        </div>
        <button class="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 flex items-center space-x-2">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>Export Data</span>
        </button>
      </div>
    </div>

    <!-- Key Metrics Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      <DashboardCard
        title="Total Volume"
        value="₦1,740,000"
        subtitle="8 transactions"
        icon="money-bag"
        color="purple"
      />
      <DashboardCard
        title="Platform Revenue"
        value="₦17,400"
        subtitle="1.0% transaction fee"
        icon="chart-line"
        color="red"
      />
      <DashboardCard
        title="Success Rate"
        value="75%"
        subtitle="6 completed"
        icon="percent"
        color="green"
      />
    </div>

    <!-- Search and Filter Section -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div class="flex flex-col sm:flex-row gap-4">
        <div class="flex-1">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Search transactions
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search by transaction ID, school, or amount"
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
            />
          </div>
        </div>
        <div class="sm:w-48">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            All Status
          </label>
          <select
            v-model="selectedStatus"
            class="block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
          >
            <option value="">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Transaction History Section -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div class="p-6 border-b border-gray-200 dark:border-gray-700">
        <div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Transaction History</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">View all financial transactions across the platform</p>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Transaction ID
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                School
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Amount (₦)
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Platform Fee
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Type
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Payment Method
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Date
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="transaction in filteredTransactions" :key="transaction.id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                {{ transaction.id }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {{ transaction.school }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {{ transaction.amount }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {{ transaction.platformFee }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {{ transaction.type }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {{ transaction.paymentMethod }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {{ transaction.date }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getStatusClass(transaction.status)" class="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                  {{ transaction.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                <button @click="viewTransactionDetails(transaction)" class="text-purple-600 hover:text-purple-900">Details</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="px-6 py-3 border-t border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-700 dark:text-gray-300">
            Showing {{ startIndex + 1 }} to {{ endIndex }} of {{ filteredTransactions.length }} entries (filtered from {{ transactionsData.length }} total entries)
          </div>
          <div class="flex items-center space-x-2">
            <button
              @click="goToPage(1)"
              :disabled="currentPage === 1"
              class="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              &lt;&lt;
            </button>
            <button
              @click="goToPage(currentPage - 1)"
              :disabled="currentPage === 1"
              class="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              &lt;
            </button>
            <button
              v-for="page in visiblePages"
              :key="page"
              @click="page !== '...' ? goToPage(page as number) : null"
              :disabled="page === '...'"
              :class="page === currentPage ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-50'"
              class="px-3 py-1 text-sm border border-gray-300 rounded-md"
            >
              {{ page }}
            </button>
            <button
              @click="goToPage(currentPage + 1)"
              :disabled="currentPage === totalPages"
              class="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              &gt;
            </button>
            <button
              @click="goToPage(totalPages)"
              :disabled="currentPage === totalPages"
              class="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              &gt;&gt;
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Transaction Details Modal -->
    <div v-if="showTransactionModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <!-- Modal Header -->
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-semibold text-gray-900">Transaction #{{ selectedTransaction?.id }}</h3>
            <button @click="closeTransactionModal" class="text-gray-400 hover:text-gray-600">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Transaction Information -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div class="space-y-4">
              <div>
                <h4 class="text-sm font-medium text-gray-500 mb-2">School</h4>
                <p class="text-lg font-semibold text-gray-900">{{ selectedTransaction?.school }}</p>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-500 mb-2">Amount</h4>
                <p class="text-lg font-semibold text-gray-900">{{ selectedTransaction?.amount }}</p>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-500 mb-2">Transaction Type</h4>
                <p class="text-lg font-semibold text-gray-900">{{ selectedTransaction?.type }}</p>
              </div>
            </div>
            <div class="space-y-4">
              <div>
                <h4 class="text-sm font-medium text-gray-500 mb-2">Status</h4>
                <span :class="getStatusClass(selectedTransaction?.status)" class="inline-flex px-3 py-1 text-sm font-semibold rounded-full">
                  {{ selectedTransaction?.status }}
                </span>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-500 mb-2">Platform Fee</h4>
                <p class="text-lg font-semibold text-gray-900">{{ selectedTransaction?.platformFee }}</p>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-500 mb-2">Payment Method</h4>
                <p class="text-lg font-semibold text-gray-900">{{ selectedTransaction?.paymentMethod }}</p>
              </div>
            </div>
          </div>

          <!-- Additional Details -->
          <div class="mb-6">
            <h4 class="text-sm font-medium text-gray-500 mb-3">Additional Details</h4>
            <div class="bg-gray-50 rounded-lg p-4 space-y-3">
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Transaction Date:</span>
                <span class="text-sm font-medium text-gray-900">{{ selectedTransaction?.date }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Processing Time:</span>
                <span class="text-sm font-medium text-gray-900">2.3 seconds</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Reference Number:</span>
                <span class="text-sm font-medium text-gray-900">REF-{{ selectedTransaction?.id }}</span>
              </div>
            </div>
          </div>

          <!-- Footer Buttons -->
          <div class="flex justify-between">
            <button @click="closeTransactionModal" class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
              Close
            </button>
            <button class="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800">
              Download Receipt
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import DashboardCard from '@/components/DashboardCard.vue'

// Reactive data
const lastUpdated = ref('5/10/2025, 8:20:13 PM')

// Transaction data
const transactionsData = ref([
  {
    id: 'TXN001',
    school: 'Heritage Grammar School',
    amount: '₦250,000',
    platformFee: '₦2,500',
    type: 'School Fee',
    paymentMethod: 'Card',
    date: '5/14/2023',
    status: 'completed'
  },
  {
    id: 'TXN002',
    school: 'Greenfield Academy',
    amount: '₦185,000',
    platformFee: '₦1,850',
    type: 'Uniform Fee',
    paymentMethod: 'Bank Transfer',
    date: '5/13/2023',
    status: 'pending'
  },
  {
    id: 'TXN003',
    school: 'St. Michael\'s College',
    amount: '₦320,000',
    platformFee: '₦3,200',
    type: 'School Fee',
    paymentMethod: 'Card',
    date: '5/12/2023',
    status: 'completed'
  },
  {
    id: 'TXN004',
    school: 'Westpoint International',
    amount: '₦275,000',
    platformFee: '₦2,750',
    type: 'Boarding Fee',
    paymentMethod: 'Wallet',
    date: '5/11/2023',
    status: 'completed'
  },
  {
    id: 'TXN005',
    school: 'Horizon Educational Center',
    amount: '₦150,000',
    platformFee: '₦1,500',
    type: 'Exam Fee',
    paymentMethod: 'Card',
    date: '5/10/2023',
    status: 'failed'
  }
])

// Transaction modal state
const showTransactionModal = ref(false)
const selectedTransaction = ref<any>(null)

// Search and filter
const searchQuery = ref('')
const selectedStatus = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)

// Computed properties for transactions
const filteredTransactions = computed(() => {
  let filtered = transactionsData.value

  if (searchQuery.value) {
    filtered = filtered.filter(transaction => 
      transaction.school.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      transaction.amount.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (selectedStatus.value) {
    filtered = filtered.filter(transaction => transaction.status === selectedStatus.value)
  }

  return filtered
})

const totalPages = computed(() => Math.ceil(filteredTransactions.value.length / itemsPerPage.value))
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value)
const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage.value, filteredTransactions.value.length))

const visiblePages = computed(() => {
  const pages: (number | string)[] = []
  const total = totalPages.value
  
  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    if (currentPage.value <= 4) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(total)
    } else if (currentPage.value >= total - 3) {
      pages.push(1)
      pages.push('...')
      for (let i = total - 4; i <= total; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)
      pages.push('...')
      for (let i = currentPage.value - 1; i <= currentPage.value + 1; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(total)
    }
  }
  
  return pages
})

// Functions
const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const getStatusClass = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800'
    case 'pending':
      return 'bg-orange-100 text-orange-800'
    case 'failed':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

// Functions for transaction modal
const viewTransactionDetails = (transaction: any) => {
  selectedTransaction.value = transaction
  showTransactionModal.value = true
}

const closeTransactionModal = () => {
  showTransactionModal.value = false
  selectedTransaction.value = null
}

// Lifecycle
onMounted(() => {
  console.log('Transaction page mounted')
})
</script>
