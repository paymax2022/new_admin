<template>
  <div class="p-6 bg-white dark:bg-gray-900 min-h-screen">
    <div class="mb-6">
      <h1 class="text-2xl font-semibold text-gray-900 dark:text-gray-100">Wallet Management</h1>
      <p class="text-sm text-gray-500 dark:text-gray-400">Manage user wallets, transactions, and currency settings</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <!-- Total Balance Card -->
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Balance (USD)</h3>
          <CurrencyDollarIcon class="h-5 w-5 text-blue-500" />
        </div>
        <p class="text-2xl font-semibold text-gray-900 dark:text-gray-100">$14,137.75</p>
      </div>

      <!-- Active Wallets Card -->
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Active Wallets</h3>
          <WalletIcon class="h-5 w-5 text-blue-500" />
        </div>
        <p class="text-2xl font-semibold text-gray-900 dark:text-gray-100">6</p>
      </div>

      <!-- Recent Deposits Card -->
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Recent Deposits</h3>
          <ArrowDownIcon class="h-5 w-5 text-blue-500" />
        </div>
        <p class="text-2xl font-semibold text-gray-900 dark:text-gray-100">$18,450</p>
      </div>

      <!-- Recent Withdrawals Card -->
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Recent Withdrawals</h3>
          <ArrowUpIcon class="h-5 w-5 text-blue-500" />
        </div>
        <p class="text-2xl font-semibold text-gray-900 dark:text-gray-100">$12,345</p>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <!-- Wallet Activity Trends -->
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Wallet Activity Trends</h3>
        <div class="h-64">
          <Line :data="activityTrendsData" :options="lineChartOptions" />
        </div>
      </div>

      <!-- Wallet Distribution -->
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Wallet Distribution</h3>
        <div class="h-64">
          <Doughnut :data="distributionData" :options="doughnutChartOptions" />
        </div>
      </div>
    </div>

    <!-- Filters and Actions -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center space-x-4">
        <!-- Search -->
        <div class="relative flex-1 max-w-xs">
          <MagnifyingGlassIcon class="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search Wallet"
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
          >
        </div>

        <!-- Currency Filter Dropdown -->
        <div class="relative">
          <button 
            @click="toggleCurrencyDropdown"
            data-dropdown="currency"
            class="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 min-w-[140px] justify-between"
          >
            <span>{{ selectedCurrency }}</span>
            <ChevronDownIcon class="h-4 w-4" />
          </button>
          <!-- Currency Dropdown -->
          <div v-if="showCurrencyDropdown" 
               class="absolute z-10 mt-1 w-full rounded-md bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
            <div class="py-1">
              <div class="px-3 py-2 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/50 font-medium">
                CURRENCY
              </div>
              <a 
                v-for="currency in currencies" 
                :key="currency.value"
                href="#" 
                @click.prevent="selectCurrency(currency)"
                class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                :class="{'bg-blue-50 dark:bg-blue-900/20': selectedCurrency === currency.label}"
              >
                {{ currency.label }}
              </a>
            </div>
          </div>
        </div>

        <!-- Status Filter Dropdown -->
        <div class="relative">
          <button 
            @click="toggleStatusDropdown"
            data-dropdown="status"
            class="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 min-w-[140px] justify-between"
          >
            <span>{{ selectedStatus }}</span>
            <ChevronDownIcon class="h-4 w-4" />
          </button>
          <!-- Status Dropdown -->
          <div v-if="showStatusDropdown" 
               class="absolute z-10 mt-1 w-full rounded-md bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
            <div class="py-1">
              <div class="px-3 py-2 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/50 font-medium">
                STATUS
              </div>
              <a 
                v-for="status in statuses" 
                :key="status.value"
                href="#" 
                @click.prevent="selectStatus(status)"
                class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                :class="{'bg-blue-50 dark:bg-blue-900/20': selectedStatus === status.label}"
              >
                <span class="inline-flex items-center">
                  <span v-if="status.color" :class="['h-2 w-2 rounded-full mr-2', status.color]"></span>
                  {{ status.label }}
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="flex items-center space-x-3">
        <button class="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 font-medium">+ Export</button>
        <button class="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 font-medium">Reconcile Wallets</button>
      </div>
    </div>

    <!-- Wallets Table -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead class="bg-gray-50 dark:bg-gray-900/50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">ID</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">User</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Currency</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Balance</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Last Activity</th>
            <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
          <tr v-for="wallet in wallets" :key="wallet.id">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{{ wallet.id }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{{ wallet.user }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{{ wallet.type }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{{ wallet.currency }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{{ wallet.balance }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span :class="[
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                {
                  'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400': wallet.status === 'active',
                  'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400': wallet.status === 'frozen',
                  'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400': wallet.status === 'inactive'
                }
              ]">
                {{ wallet.status }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{{ wallet.lastActivity }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <div class="relative">
                <button 
                  @click="toggleActionDropdown(wallet.id)"
                  data-dropdown="action"
                  class="text-gray-400 hover:text-gray-500"
                >
                  <EllipsisVerticalIcon class="h-5 w-5" />
                </button>
                <!-- Actions Dropdown -->
                <div v-if="activeActionDropdown === wallet.id" 
                     class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div class="py-1 divide-y divide-gray-100 dark:divide-gray-700">
                    <div class="px-4 py-3">
                      <p class="text-base font-semibold text-gray-900 dark:text-white">Actions</p>
                    </div>
                    <div class="py-1">
                      <a 
                        href="#" 
                        @click.prevent="handleWalletAction('view', wallet)"
                        class="group flex items-center px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                      >
                        <EyeIcon class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-300" />
                        View Details
                      </a>
                      <a 
                        href="#" 
                        @click.prevent="handleWalletAction('credit', wallet)"
                        class="group flex items-center px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                      >
                        <PlusCircleIcon class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-300" />
                        Credit Funds
                      </a>
                      <a 
                        href="#" 
                        @click.prevent="handleWalletAction('debit', wallet)"
                        class="group flex items-center px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                      >
                        <MinusCircleIcon class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-300" />
                        Debit Funds
                      </a>
                      <a 
                        href="#" 
                        @click.prevent="handleWalletAction('freeze', wallet)"
                        class="group flex items-center px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <NoSymbolIcon class="mr-3 h-5 w-5 text-red-400 group-hover:text-red-500 dark:text-red-400 dark:group-hover:text-red-300" />
                        Freeze Website
                      </a>
                      <a 
                        href="#" 
                        @click.prevent="handleWalletAction('remark', wallet)"
                        class="group flex items-center px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                      >
                        <ChatBubbleLeftIcon class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-300" />
                        Add Remark
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import {
  CurrencyDollarIcon,
  WalletIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  MagnifyingGlassIcon,
  EllipsisVerticalIcon,
  ChevronDownIcon,
  PencilIcon,
  CreditCardIcon,
  ClockIcon,
  BanknotesIcon,
  NoSymbolIcon,
  EyeIcon,
  PlusCircleIcon,
  MinusCircleIcon,
  ChatBubbleLeftIcon
} from '@heroicons/vue/24/outline'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import { Line, Doughnut } from 'vue-chartjs'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

// Chart Data
const activityTrendsData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Deposits',
      data: [1500, 2000, 1800, 2200, 1900, 2100],
      borderColor: '#3B82F6',
      tension: 0.4,
      fill: false
    },
    {
      label: 'Withdrawals',
      data: [1000, 1200, 900, 1400, 1100, 1300],
      borderColor: '#EF4444',
      tension: 0.4,
      fill: false
    }
  ]
}

const distributionData = {
  labels: ['USD Wallet', 'EUR Wallet', 'GBP Wallet', 'Other Wallets'],
  datasets: [{
    data: [40, 30, 20, 10],
    backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#6B7280']
  }]
}

// Chart Options
const lineChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: '#374151'
      }
    },
    x: {
      grid: {
        color: '#374151'
      }
    }
  },
  plugins: {
    legend: {
      labels: {
        color: '#9CA3AF'
      }
    }
  }
}

const doughnutChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        color: '#9CA3AF'
      }
    }
  }
}

// Wallet Data
const wallets = ref([
  {
    id: 'W0001',
    user: 'John Doe',
    type: 'Main',
    currency: 'USD',
    balance: '$5750.45',
    status: 'active',
    lastActivity: '2023-04-07'
  },
  {
    id: 'W0002',
    user: 'John Doe',
    type: 'Savings',
    currency: 'EUR',
    balance: '€1750.45',
    status: 'active',
    lastActivity: '2023-04-07'
  },
  {
    id: 'W0003',
    user: 'John Doe',
    type: 'Main',
    currency: 'USD',
    balance: '$2750.45',
    status: 'frozen',
    lastActivity: '2023-04-07'
  },
  {
    id: 'W0004',
    user: 'John Doe',
    type: 'Bonus',
    currency: 'USD',
    balance: '$250.45',
    status: 'active',
    lastActivity: '2023-04-07'
  },
  {
    id: 'W0005',
    user: 'John Doe',
    type: 'Main',
    currency: 'USD',
    balance: '$1750.45',
    status: 'inactive',
    lastActivity: '2023-04-07'
  },
  {
    id: 'W0006',
    user: 'John Doe',
    type: 'Main',
    currency: 'USD',
    balance: '$750.45',
    status: 'active',
    lastActivity: '2023-04-07'
  }
])

// Dropdown states
const showCurrencyDropdown = ref(false)
const showStatusDropdown = ref(false)
const activeActionDropdown = ref(null)

// Selected values
const selectedCurrency = ref('All Currencies')
const selectedStatus = ref('All Status')

// Currency options
const currencies = [
  { label: 'All Currencies', value: 'all' },
  { label: 'USD', value: 'usd' },
  { label: 'EUR', value: 'eur' },
  { label: 'GBP', value: 'gbp' }
]

// Status options
const statuses = [
  { label: 'All Status', value: 'all' },
  { label: 'Active', value: 'active', color: 'bg-green-400' },
  { label: 'Frozen', value: 'frozen', color: 'bg-red-400' },
  { label: 'Inactive', value: 'inactive', color: 'bg-gray-400' }
]

// Update functions
const selectCurrency = (currency) => {
  selectedCurrency.value = currency.label
  showCurrencyDropdown.value = false
}

const selectStatus = (status) => {
  selectedStatus.value = status.label
  showStatusDropdown.value = false
}

// Toggle functions
const toggleCurrencyDropdown = () => {
  showCurrencyDropdown.value = !showCurrencyDropdown.value
  showStatusDropdown.value = false
  activeActionDropdown.value = null
}

const toggleStatusDropdown = () => {
  showStatusDropdown.value = !showStatusDropdown.value
  showCurrencyDropdown.value = false
  activeActionDropdown.value = null
}

const toggleActionDropdown = (walletId) => {
  activeActionDropdown.value = activeActionDropdown.value === walletId ? null : walletId
  showCurrencyDropdown.value = false
  showStatusDropdown.value = false
}

const handleWalletAction = (action, wallet) => {
  console.log(`Performing ${action} action on wallet ${wallet.id}`)
  activeActionDropdown.value = null
}

// Click outside handler
const handleClickOutside = (event) => {
  const statusDropdown = event.target.closest('[data-dropdown="status"]')
  const currencyDropdown = event.target.closest('[data-dropdown="currency"]')
  const actionDropdown = event.target.closest('[data-dropdown="action"]')
  
  if (!statusDropdown && showStatusDropdown.value) {
    showStatusDropdown.value = false
  }
  if (!currencyDropdown && showCurrencyDropdown.value) {
    showCurrencyDropdown.value = false
  }
  if (!actionDropdown && activeActionDropdown.value !== null) {
    activeActionDropdown.value = null
  }
}

// Add click outside listener
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script> 