<template>
  <div class="p-6 bg-white dark:bg-gray-900 min-h-screen">
    <div class="mb-6">
      <h1 class="text-2xl font-semibold text-gray-900 dark:text-gray-100">Transaction Management</h1>
    </div>

    <div class="flex items-center justify-between mb-6">
      <!-- Search Bar -->
      <div class="flex-1 max-w-lg">
        <div class="relative">
          <MagnifyingGlassIcon class="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by user or transaction ID"
            class="w-full rounded-md border border-gray-300 pl-10 pr-4 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-400"
          >
        </div>
      </div>

      <!-- Filters -->
      <div class="flex items-center space-x-3">
        <div class="w-40">
          <select class="block w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100">
            <option>All Status</option>
            <option>Completed</option>
            <option>Pending</option>
            <option>Failed</option>
            <option>Reversed</option>
          </select>
        </div>
        <div class="w-48">
          <button class="w-full inline-flex items-center justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
            <CalendarIcon class="h-4 w-4 mr-2" />
            Pick a date range
          </button>
        </div>
      </div>
    </div>

    <!-- Transaction Management -->
    <div class="mb-6">
      <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Transaction Management</h2>
      <p class="text-sm text-gray-500 dark:text-gray-400">Manage and monitor all financial transactions in the system</p>
    </div>

    <!-- Transactions Table -->
    <div class="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead class="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Transaction ID</th>
            <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Timestamp</th>
            <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Source Wallet</th>
            <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Destination</th>
            <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
            <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
            <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
            <th scope="col" class="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          <tr v-for="transaction in transactions" :key="transaction.id">
            <td class="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{{ transaction.id }}</td>
            <td class="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{{ transaction.timestamp }}</td>
            <td class="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{{ transaction.sourceWallet }}</td>
            <td class="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{{ transaction.destination }}</td>
            <td class="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{{ transaction.type }}</td>
            <td class="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{{ transaction.amount }}</td>
            <td class="px-4 py-3 text-sm">
              <span :class="[
                'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                {
                  'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400': transaction.status === 'completed',
                  'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400': transaction.status === 'pending',
                  'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400': transaction.status === 'failed',
                  'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400': transaction.status === 'reversed'
                }
              ]">
                {{ transaction.status }}
              </span>
            </td>
            <td class="px-4 py-3 text-sm text-right space-x-1">
              <button class="text-gray-400 hover:text-gray-500">
                <ArrowPathIcon class="h-4 w-4" />
              </button>
              <button class="text-gray-400 hover:text-gray-500">
                <FlagIcon class="h-4 w-4" />
              </button>
              <button class="text-gray-400 hover:text-gray-500">
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
        Showing 0 to 0 of 0 entries (filtered from 0 total entries)
      </div>
      <div class="flex items-center space-x-2">
        <button class="inline-flex items-center justify-center rounded-md border border-gray-300 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800">&larr;</button>
        <button class="inline-flex items-center justify-center rounded-md bg-blue-600 px-3 py-1 text-sm font-medium text-white">1</button>
        <button class="inline-flex items-center justify-center rounded-md border border-gray-300 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800">2</button>
        <button class="inline-flex items-center justify-center rounded-md border border-gray-300 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800">3</button>
        <button class="inline-flex items-center justify-center rounded-md border border-gray-300 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800">4</button>
        <button class="inline-flex items-center justify-center rounded-md border border-gray-300 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800">&rarr;</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import {
  MagnifyingGlassIcon,
  CalendarIcon,
  ArrowPathIcon,
  FlagIcon
} from '@heroicons/vue/24/outline'

export default {
  name: 'TransactionManagementView',
  components: {
    MagnifyingGlassIcon,
    CalendarIcon,
    ArrowPathIcon,
    FlagIcon
  },
  setup() {
    const transactions = ref([
      { 
        id: 'TX-12345',
        timestamp: '2025-04-26 10:30:00',
        sourceWallet: 'WAL-123',
        destination: 'WAL-456',
        type: 'transfer',
        amount: 'USD 1000',
        status: 'completed'
      },
      { 
        id: 'TX-12346',
        timestamp: '2025-04-26 10:30:00',
        sourceWallet: 'WAL-123',
        destination: 'WAL-456',
        type: 'debit',
        amount: 'EUR 500',
        status: 'completed'
      },
      { 
        id: 'TX-12347',
        timestamp: '2025-04-26 10:30:00',
        sourceWallet: 'WAL-123',
        destination: 'WAL-456',
        type: 'transfer',
        amount: 'USD 1000',
        status: 'pending'
      },
      { 
        id: 'TX-12348',
        timestamp: '2025-04-26 10:30:00',
        sourceWallet: 'WAL-123',
        destination: 'WAL-456',
        type: 'credit',
        amount: 'USD 1000',
        status: 'failed'
      },
      { 
        id: 'TX-12349',
        timestamp: '2025-04-26 10:30:00',
        sourceWallet: 'WAL-123',
        destination: 'WAL-456',
        type: 'transfer',
        amount: 'EUR 500',
        status: 'completed'
      },
      { 
        id: 'TX-12350',
        timestamp: '2025-04-26 10:30:00',
        sourceWallet: 'WAL-123',
        destination: 'WAL-456',
        type: 'exchange',
        amount: 'USD 1000',
        status: 'reversed'
      },
      { 
        id: 'TX-12351',
        timestamp: '2025-04-26 10:30:00',
        sourceWallet: 'WAL-123',
        destination: 'WAL-456',
        type: 'transfer',
        amount: 'USD 1000',
        status: 'pending'
      },
      { 
        id: 'TX-12352',
        timestamp: '2025-04-26 10:30:00',
        sourceWallet: 'WAL-123',
        destination: 'WAL-456',
        type: 'transfer',
        amount: 'USD 1000',
        status: 'completed'
      }
    ])

    return {
      transactions
    }
  }
}
</script> 