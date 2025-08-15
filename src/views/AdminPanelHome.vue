<template>
    <div class="p-6 space-y-8 bg-white dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <div>
        <h1 class="text-2xl font-semibold text-gray-800 dark:text-white">Dashboard</h1>
        <p class="text-gray-500 dark:text-gray-300 mt-1">Overview of your system's performance and key metrics.</p>
      </div>


    <div class="grid grid-cols-1 dark:bg-gray-900 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white dark:bg-gray-800 rounded shadow p-4 flex items-center space-x-4">
        <UserIcon class="w-6 h-6 text-blue-600" />
        <div>
          <p class="text-gray-500">Total Users</p>
          <div v-if="isLoadingUsers" class="animate-pulse h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div v-else>
            <p class="text-xl font-semibold">{{ userData.total }}</p>
            <div class="flex items-center text-xs mt-1">
              <span :class="userData.isIncreasing ? 'text-green-500' : 'text-red-500'">
                {{ userData.isIncreasing ? '↑' : '↓' }} {{ Math.abs(userData.percentChange) }}%
              </span>
              <span class="text-gray-500 ml-1">vs last month</span>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded shadow p-4 flex items-center space-x-4">
        <WalletIcon class="w-6 h-6 text-green-600" />
        <div>
          <p class="text-gray-500">Active Wallet</p>
          <div v-if="isLoadingWallets" class="animate-pulse h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div v-else>
            <p class="text-xl font-semibold">{{ walletData.count }}</p>
            <div class="flex items-center text-xs mt-1">
              <span :class="walletData.is_increasing ? 'text-green-500' : 'text-red-500'">
                {{ walletData.is_increasing ? '↑' : '↓' }} {{ Math.abs(walletData.percent_change) }}%
              </span>
              <span class="text-gray-500 ml-1">vs last month</span>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded shadow p-4 flex items-center space-x-4">
        <ArrowDownUpIcon class="w-6 h-6 text-yellow-600" />
        <div>
          <p class="text-gray-500">Transactions</p>
          <div v-if="isLoading" class="animate-pulse h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div v-else>
            <p class="text-xl font-semibold">{{ formatCurrency(transactionData.transactions.total) }}</p>
            <div class="flex items-center text-xs mt-1">
              <span :class="transactionData.transactions.is_increasing ? 'text-green-500' : 'text-red-500'">
                {{ transactionData.transactions.is_increasing ? '↑' : '↓' }} {{ Math.abs(transactionData.transactions.percentage_change) }}%
              </span>
              <span class="text-gray-500 ml-1">vs last month</span>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded shadow p-4 flex items-center space-x-4">
        <BadgeDollarSignIcon class="w-6 h-6 text-purple-600" />
        <div>
          <p class="text-gray-500">Commission Paid</p>
          <div v-if="isLoading" class="animate-pulse h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div v-else>
            <p class="text-xl font-semibold">{{ formatCurrency(transactionData.commission.total) }}</p>
            <div class="flex items-center text-xs mt-1">
              <span :class="transactionData.commission.is_increasing ? 'text-green-500' : 'text-red-500'">
                {{ transactionData.commission.is_increasing ? '↑' : '↓' }} {{ Math.abs(transactionData.commission.percentage_change) }}%
              </span>
              <span class="text-gray-500 ml-1">vs last month</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="grid dark:bg-gray-800 grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white rounded dark:bg-gray-800 shadow p-4">
        <h2 class="text-lg font-semibold mb-4">User Growth</h2>
        <div class="h-64 w-full">
          <LineChart :data="userGrowthData" />
        </div>
      </div>
      <div class="bg-white rounded dark:bg-gray-800 shadow p-4">
        <h2 class="text-lg font-semibold mb-4">Wallet Distribution</h2>
        <div class="h-64 w-full">
          <PieChart :data="walletDistributionData" />
        </div>
      </div>
    </div>

    <div class="bg-white rounded shadow p-4 dark:bg-gray-800">
      <h2 class="text-lg font-semibold mb-4">Financial Activity</h2>
      <div class="h-64 w-full">
        <BarChart :data="financialActivityData" />
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 dark:bg-gray-800">
      <div class="bg-white rounded shadow p-4 dark:bg-gray-800 lg:col-span-1">
        <div class="flex justify-between items-center mb-2">
          <h2 class="text-lg font-semibold">Recent Transactions</h2>
          <a href="/transactions" class="text-sm text-blue-600 hover:underline">View All</a>
        </div>
        <p class="text-sm text-gray-500 mb-4">Latest financial activities in the system</p>
        <ul class="space-y-3 text-sm">
          <div v-if="isLoadingTransactions" class="space-y-3">
            <div v-for="i in 4" :key="i" class="animate-pulse flex justify-between items-center">
              <div class="flex items-center gap-2">
                <div class="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                <div class="space-y-2">
                  <div class="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div class="h-3 w-40 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              </div>
              <div class="text-right space-y-2">
                <div class="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div class="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              </div>
            </div>
          </div>
          <template v-else>
            <li v-for="transaction in recentTransactions" :key="transaction.id" class="flex justify-between items-center">
              <div class="flex items-center gap-2">
                <span :class="{
                  'text-red-500': transaction.entry === 'DEBIT',
                  'text-green-500': transaction.entry === 'CREDIT'
                }">
                  {{ transaction.entry === 'DEBIT' ? '⬇' : '⬆' }}
                </span>
                <div>
                  <p class="font-medium">{{ transaction.user ? `${transaction.user.first_name} ${transaction.user.lastname}` : 'Unknown User' }}</p>
                  <p class="text-gray-500">{{ transaction.category }} · {{ transaction.id.substring(0, 8) }}</p>
                </div>
              </div>
              <div class="text-right">
                <p :class="{
                  'text-red-500 font-medium': transaction.entry === 'DEBIT',
                  'text-green-600 font-medium': transaction.entry === 'CREDIT'
                }">
                  {{ transaction.entry === 'DEBIT' ? '-' : '+' }}{{ formatCurrency(transaction.amount) }}
                </p>
                <span :class="{
                  'bg-green-100 text-green-700': transaction.status === 'SUCCESSFUL',
                  'bg-red-100 text-red-700': transaction.status === 'FAILED',
                  'bg-yellow-100 text-yellow-700': transaction.status === 'PENDING'
                }" class="text-xs px-2 py-1 rounded-full">
                  {{ transaction.status === 'SUCCESSFUL' ? 'Completed' : transaction.status }}
                </span>
              </div>
            </li>
          </template>
        </ul>
      </div>

      <div class="bg-white rounded shadow p-4 dark:bg-gray-800 lg:col-span-1">
        <div class="flex justify-between items-center mb-2">
          <h2 class="text-lg font-semibold">Recently Registered Users</h2>
          <a href="#" class="text-sm text-blue-600 hover:underline">View All</a>
        </div>
        <p class="text-sm text-gray-500 mb-4">New users who recently joined the system</p>
        <ul class="space-y-3 text-sm">
          <div v-if="isLoadingUsers" class="space-y-3">
            <div v-for="i in 4" :key="i" class="animate-pulse flex justify-between items-center">
              <div class="space-y-2">
                <div class="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div class="h-3 w-40 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
              <div class="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            </div>
          </div>
          <template v-else>
            <li v-for="user in userData.recentUsers" :key="user.id" class="flex justify-between items-center">
              <div>
                <p class="font-medium">{{ user.first_name || user.lastname || 'User' }} {{ user.lastname || '' }}</p>
                <p class="text-gray-500 text-xs">{{ user.email }}</p>
              </div>
              <span :class="{
                'bg-green-100 text-green-700': user.status === 'ACTIVE',
                'bg-red-100 text-red-700': user.status === 'INACTIVE' || user.status === 'BLOCKED' || user.status === 'DEACTIVATED',
                'bg-yellow-100 text-yellow-700': user.status === 'UNVERIFIED' || user.status === 'PENDING'
              }" class="text-xs px-2 py-1 rounded-full">
                {{ user.status || 'Unknown' }}
              </span>
            </li>
          </template>
        </ul>
      </div>

      <div class="bg-white rounded shadow p-4 dark:bg-gray-800 lg:col-span-1">
        <div class="flex justify-between items-center mb-2">
          <h2 class="text-lg font-semibold">Recent Wallets</h2>
          <a href="/wallet-management" class="text-sm text-blue-600 hover:underline">View All</a>
        </div>
        <p class="text-sm text-gray-500 mb-4">Recently created wallets in the system</p>
        <ul class="space-y-3 text-sm">
          <div v-if="isLoadingWallets" class="space-y-3">
            <div v-for="i in 4" :key="i" class="animate-pulse flex justify-between items-center">
              <div class="space-y-2">
                <div class="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div class="h-3 w-40 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
              <div class="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            </div>
          </div>
          <template v-else>
            <li v-for="wallet in recentWallets" :key="wallet.id" class="flex justify-between items-center">
              <div>
                <p class="font-medium">{{ wallet.name }}</p>
                <p class="text-gray-500 text-xs">{{ wallet.currency }} · {{ formatCurrency(wallet.balance) }}</p>
              </div>
              <span :class="{
                'bg-green-100 text-green-700': wallet.status === 'active',
                'bg-red-100 text-red-700': wallet.status === 'inactive' || wallet.status === 'frozen',
                'bg-yellow-100 text-yellow-700': wallet.status === 'pending'
              }" class="text-xs px-2 py-1 rounded-full">
                {{ wallet.status || 'Unknown' }}
              </span>
            </li>
          </template>
        </ul>
      </div>
    </div>

    <div class="bg-white rounded shadow p-4 dark:bg-gray-800 ">
      <h2 class="text-lg font-semibold mb-4">System Alerts</h2>
      <div class="space-y-4 text-sm dark:bg-gray-800">
        <div class="flex items-start gap-3 bg-yellow-50 p-3 rounded border border-yellow-200 dark:bg-gray-800">
          <span class="text-yellow-500 mt-1">⚠️</span>
          <div>
            <p class="font-semibold text-yellow-700">System update scheduled</p>
            <p class="text-gray-600 dark:text-white">A system update is scheduled for April 15, 2023 at 02:00 UTC. Expected downtime is 15 minutes.</p>
          </div>
        </div>
        <div class="flex items-start gap-3 bg-red-50 p-3 rounded border border-red-200 dark:bg-gray-800">
          <span class="text-red-500 mt-1">🔒</span>
          <div>
            <p class="font-semibold text-red-700">High transaction volume detected</p>
            <p class="text-gray-600 dark:text-white">Unusual transaction patterns detected from 5 accounts. Review needed in Security Dashboard.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { UserIcon, WalletIcon, ArrowDownUpIcon, BadgeDollarSignIcon } from 'lucide-vue-next'
import LineChart from '@/components/charts/LineChart.vue'
import PieChart from '@/components/charts/PieChart.vue'
import BarChart from '@/components/charts/BarChart.vue'
import { ref, onMounted } from 'vue'
import transactionService from '@/services/transactionService'
import userService from '@/services/userService'
import walletService from '@/services/walletService'

// Data for transactions and commission
const transactionData = ref({
  commission: {
    total: 0,
    last_month_total: 0,
    percentage_change: 0,
    is_increasing: false
  },
  transactions: {
    total: 0,
    last_month_total: 0,
    percentage_change: 0,
    is_increasing: false
  }
})

// User data
const userData = ref({
  total: 0,
  current: 0,
  percentChange: 0,
  isIncreasing: false,
  recentUsers: []
})

// Wallet data
const walletData = ref({
  count: 0,
  is_increasing: false,
  percent_change: 0,
  previous_month: 0
})
const recentWallets = ref([])

// Loading states
const isLoading = ref(true)
const isLoadingUsers = ref(true)
const isLoadingWallets = ref(true)
const isLoadingTransactions = ref(true)

// Recent transactions
const recentTransactions = ref([])

// Sample data for charts
const userGrowthData = ref({
  labels: [],
  datasets: [
    {
      label: 'User Registrations',
      data: [],
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      tension: 0.4,
      fill: false
    }
  ]
})

const walletDistributionData = ref({
  labels: [],
  datasets: [
    {
      label: 'Wallets by Currency',
      data: [],
      backgroundColor: ['#10b981', '#f59e0b', '#ef4444', '#6b7280', '#8b5cf6', '#06b6d4', '#84cc16', '#f97316'],
      borderWidth: 2,
      borderColor: '#ffffff'
    }
  ]
})

const financialActivityData = ref({
  labels: [],
  datasets: [
    {
      label: 'Credit',
      data: [],
      backgroundColor: '#10b981',
      borderColor: '#059669',
      borderWidth: 2
    },
    {
      label: 'Debit',
      data: [],
      backgroundColor: '#ef4444',
      borderColor: '#dc2626',
      borderWidth: 2
    },
    {
      label: 'Commission',
      data: [],
      backgroundColor: '#8b5cf6',
      borderColor: '#7c3aed',
      borderWidth: 2
    }
  ]
})

// Debug chart data
console.log('Chart data:', {
  userGrowth: userGrowthData.value,
  walletDistribution: walletDistributionData.value,
  financialActivity: financialActivityData.value
})

// Fetch user registration data for the chart
const fetchUserRegistrations = async () => {
  try {
    // Use the same service pattern as other API calls
    const response = await userService.getUserRegistrations({ year: 2025, status: 'ACTIVE' })
    
    if (response.data && response.data.ok && response.data.data) {
      // Sort data by month order
      const monthOrder = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ]
      
      const sortedData = monthOrder.map(month => {
        const monthData = response.data.data.find(item => item.month === month)
        return monthData ? monthData.count : 0
      })
      
      userGrowthData.value = {
        labels: monthOrder,
        datasets: [
          {
            label: 'User Registrations',
            data: sortedData,
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            tension: 0.4,
            fill: false
          }
        ]
      }
      
      console.log('User registration data updated:', userGrowthData.value)
    }
  } catch (error) {
    console.error('Error fetching user registrations:', error)
    // Fallback to sample data if API fails
    userGrowthData.value = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          label: 'User Registrations',
          data: [2, 23, 7, 5, 0, 2, 8, 1, 0, 0, 0, 0],
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4,
          fill: false
        }
      ]
    }
  }
}

// Fetch transaction totals
const fetchTransactionTotals = async () => {
  try {
    isLoading.value = true
    const response = await transactionService.getTransactionTotal()
    transactionData.value = response.data.data
  } catch (error) {
    console.error('Error fetching transaction totals:', error)
  } finally {
    isLoading.value = false
  }
}

// Fetch users
const fetchUsers = async () => {
  try {
    isLoadingUsers.value = true
    
    // Fetch user count data
    const countResponse = await userService.getUserCount()
    const countData = countResponse.data.data
    userData.value.total = countData.total
    userData.value.current = countData.current
    userData.value.percentChange = countData.percentChange
    userData.value.isIncreasing = countData.isIncreasing
    
    // Fetch recent users
    const usersResponse = await userService.getUsers({
      limit: 10,
      page: 1
    })
    userData.value.recentUsers = usersResponse.data.data.slice(0, 4)
  } catch (error) {
    console.error('Error fetching users:', error)
  } finally {
    isLoadingUsers.value = false
  }
}

// Format currency for NGN
const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0
  }).format(value)
}

// Fetch wallet data
const fetchWalletData = async () => {
  try {
    isLoadingWallets.value = true
    
    // Fetch active wallets count
    const activeWalletsResponse = await walletService.getActiveWallets()
    if (activeWalletsResponse.data && activeWalletsResponse.data.ok) {
      walletData.value = activeWalletsResponse.data.data
    }
    
    // Fetch recent wallets
    const walletsResponse = await walletService.getAllWallets({
      limit: 10,
      page: 1
    })
    if (walletsResponse.data && walletsResponse.data.ok) {
      recentWallets.value = walletsResponse.data.data.slice(0, 4)
    }
  } catch (error) {
    console.error('Error fetching wallet data:', error)
  } finally {
    isLoadingWallets.value = false
  }
}

// Fetch recent transactions
const fetchRecentTransactions = async () => {
  try {
    isLoadingTransactions.value = true
    const response = await transactionService.getTransactions({
      limit: 4,
      page: 1,
      sort: 'created_at',
      order: 'desc'
    })
    if (response.data && response.data.ok) {
      recentTransactions.value = response.data.data
    }
  } catch (error) {
    console.error('Error fetching recent transactions:', error)
  } finally {
    isLoadingTransactions.value = false
  }
}

// Fetch wallet currency distribution data for the chart
const fetchWalletCurrencyDistribution = async () => {
  try {
    // Use the same service pattern as other API calls
    const response = await walletService.getWalletCountByCurrency()
    
    if (response.data && response.data.ok && response.data.data) {
      const labels = response.data.data.map(item => item.currency)
      const data = response.data.data.map(item => item.count)
      
      walletDistributionData.value = {
        labels: labels,
        datasets: [
          {
            label: 'Wallets by Currency',
            data: data,
            backgroundColor: ['#10b981', '#f59e0b', '#ef4444', '#6b7280', '#8b5cf6', '#06b6d4', '#84cc16', '#f97316'],
            borderWidth: 2,
            borderColor: '#ffffff'
          }
        ]
      }
      
      console.log('Wallet currency distribution data updated:', walletDistributionData.value)
    }
  } catch (error) {
    console.error('Error fetching wallet currency distribution:', error)
    // Fallback to sample data if API fails
    walletDistributionData.value = {
      labels: ['NGN'],
      datasets: [
        {
          label: 'Wallets by Currency',
          data: [21],
          backgroundColor: ['#10b981', '#f59e0b', '#ef4444', '#6b7280', '#8b5cf6', '#06b6d4', '#84cc16', '#f97316'],
          borderWidth: 2,
          borderColor: '#ffffff'
        }
      ]
    }
  }
}

// Fetch transaction entries data for the financial activity chart
const fetchTransactionEntries = async () => {
  try {
    // Use the same service pattern as other API calls
    const response = await transactionService.getTransactionEntries({ 
      year: 2025, 
      currency: 'NGN', 
      status: 'SUCCESSFUL,FAILED,PENDING' 
    })
    
    if (response.data && response.data.ok && response.data.data) {
      // Sort data by month order
      const monthOrder = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ]
      
      const creditData = monthOrder.map(month => {
        const monthData = response.data.data.find(item => item.month === month)
        return monthData ? monthData.credit : 0
      })
      
      const debitData = monthOrder.map(month => {
        const monthData = response.data.data.find(item => item.month === month)
        return monthData ? monthData.debit : 0
      })
      
      const commissionData = monthOrder.map(month => {
        const monthData = response.data.data.find(item => item.month === month)
        return monthData ? monthData.commission : 0
      })
      
      financialActivityData.value = {
        labels: monthOrder,
        datasets: [
          {
            label: 'Credit',
            data: creditData,
            backgroundColor: '#10b981',
            borderColor: '#059669',
            borderWidth: 2
          },
          {
            label: 'Debit',
            data: debitData,
            backgroundColor: '#ef4444',
            borderColor: '#dc2626',
            borderWidth: 2
          },
          {
            label: 'Commission',
            data: commissionData,
            backgroundColor: '#8b5cf6',
            borderColor: '#7c3aed',
            borderWidth: 2
          }
        ]
      }
      
      console.log('Transaction entries data updated:', financialActivityData.value)
    }
  } catch (error) {
    console.error('Error fetching transaction entries:', error)
    // Fallback to sample data if API fails
    financialActivityData.value = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          label: 'Credit',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          backgroundColor: '#10b981',
          borderColor: '#059669',
          borderWidth: 2
        },
        {
          label: 'Debit',
          data: [0, 0, 0, 0, 0, 100, 1500, 0, 0, 0, 0, 0],
          backgroundColor: '#ef4444',
          borderColor: '#dc2626',
          borderWidth: 2
        },
        {
          label: 'Commission',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          backgroundColor: '#8b5cf6',
          borderColor: '#7c3aed',
          borderWidth: 2
        }
      ]
    }
  }
}

onMounted(() => {
  fetchTransactionTotals()
  fetchUsers()
  fetchWalletData()
  fetchRecentTransactions()
  fetchUserRegistrations() // Call the new function here
  fetchWalletCurrencyDistribution() // Call the new function here
  fetchTransactionEntries() // Call the new function here
})
</script>

<style scoped>
/* Scoped styles for dashboard layout */
</style>
