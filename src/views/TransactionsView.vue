<template>
  <div class="p-6 bg-white dark:bg-gray-900 min-h-screen">
    <div class="mb-6">
      <h1 class="text-2xl font-semibold text-gray-900 dark:text-gray-100">Transactions</h1>
    </div>
    <!-- Transaction Management -->
    <div class="mb-6">
      <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Transaction</h2>
      <p class="text-sm text-gray-500 dark:text-gray-400">Manage and monitor all financial transactions in the system</p>
    </div>
    <!-- Search, Filter, Actions -->
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
      <!-- Search Bar -->
      <div class="flex-1 max-w-lg">
        <div class="relative">
          <MagnifyingGlassIcon class="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            v-model="searchQuery"
            @input="handleSearchChange"
            type="text"
            placeholder="Search by user or transaction ID"
            class="w-full rounded-md border border-gray-300 pl-10 pr-4 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-400"
          >
        </div>
      </div>
      <!-- Filters -->
      <div class="flex items-center space-x-3 flex-wrap">
        <div class="w-40">
          <select v-model="statusFilter" @change="watchStatusFilter" class="block w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100">
            <option value="">All Status</option>
            <option value="SUCCESSFUL">Completed</option>
            <option value="PENDING">Pending</option>
            <option value="FAILED">Failed</option>
            <option value="REVERSED">Reversed</option>
          </select>
        </div>
        <!-- Native Date Range Picker -->
        <div class="flex items-center space-x-2">
          <input type="date" v-model="startDate" @change="watchDateFilters" class="rounded-md border border-gray-300 py-2 px-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100" />
          <span class="text-gray-500 dark:text-gray-400">to</span>
          <input type="date" v-model="endDate" @change="watchDateFilters" class="rounded-md border border-gray-300 py-2 px-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100" />
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
        <div class="relative">
          <button
            @click="showExportDropdown = !showExportDropdown"
            class="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            data-export-button
          >
          <ArrowDownTrayIcon class="h-4 w-4 mr-2" />
          Export
            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <!-- Export Dropdown -->
          <div v-if="showExportDropdown"
            class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50"
            data-export-dropdown
          >
            <div class="py-1">
              <button
                @click="exportToExcel"
                class="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Export to Excel
              </button>
              <button
                @click="exportToPDF"
                class="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                Export to PDF
        </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Vue3 DataTable -->
    <div v-if="loading" class="flex justify-center items-center py-10">
      <span class="text-blue-600 font-semibold">Loading...</span>
    </div>
    <div v-else-if="filteredTransactions.length === 0" class="rounded-lg border border-gray-200 dark:border-gray-700 p-10">
      <div class="text-center">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">No transactions found</h3>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {{ transactions.length === 0 ? 'No transactions available. Try refreshing the page.' : 'Try adjusting your filters.' }}
        </p>
        <div class="mt-6">
          <button
            @click="refresh"
            class="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
          >
            <ArrowPathIcon class="h-4 w-4 mr-2" />
            Refresh
          </button>
        </div>
        <!-- Debug info -->
        <div class="mt-4 text-xs text-gray-400">
          Debug: transactions={{ transactions.length }}, filtered={{ filteredTransactions.length }}
        </div>
      </div>
    </div>
    <div v-else class="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-900">
      <!-- Enhanced Table Header with Summary -->
      <div class="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <svg class="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Transaction History
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Showing <span class="font-semibold text-gray-900 dark:text-white">{{ filteredTransactions.length }}</span>
              {{ filteredTransactions.length === 1 ? 'transaction' : 'transactions' }}
              <span v-if="transactions.length !== filteredTransactions.length" class="text-gray-500 dark:text-gray-500">
                (filtered from {{ transactions.length }} total)
              </span>
            </p>
          </div>
          <div class="flex items-center gap-2 relative">
            <!-- Column Visibility Toggle -->
            <button
              @click="showColumnMenu = !showColumnMenu"
              class="inline-flex items-center gap-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all shadow-sm hover:shadow"
            >
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              Columns
            </button>
            <!-- Column Visibility Dropdown -->
            <div
              v-if="showColumnMenu"
              v-click-outside="() => (showColumnMenu = false)"
              class="absolute right-0 mt-2 w-56 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-xl z-50 p-2"
            >
              <div class="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-200 dark:border-gray-700 mb-2">
                Toggle Columns
              </div>
              <div class="max-h-64 overflow-y-auto">
                <div
                  v-for="column in columns"
                  :key="column.key"
                  class="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                  @click="toggleColumnVisibility(column.key)"
                >
                  <input
                    type="checkbox"
                    :checked="column.visible !== false"
                    class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600"
                    @change="toggleColumnVisibility(column.key)"
                  />
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ column.label }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Enhanced Table Container -->
      <div class="overflow-x-auto">
        <Vue3Datatable
          v-if="filteredTransactions.length > 0 && visibleColumns.length > 0"
          :rows="filteredTransactions"
          :columns="visibleColumns"
          :totalRows="filteredTransactions.length"
          :sortable="true"
          :searchable="false"
          :pageSize="rowsPerPage"
          :pageSizeOptions="[10, 25, 50, 100]"
          skin="bh-table-compact"
          :loading="loading"
          :classes="{
            table: 'min-w-full divide-y divide-gray-200 dark:divide-gray-700',
            thead: 'bg-gray-50 dark:bg-gray-800',
            tbody: 'bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700',
            tr: 'hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer',
            th: 'px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300',
            td: 'px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100',
          }"
          @row-clicked="onRowClick"
        >
          <!-- Custom slots for columns - Vue3Datatable uses field name as slot name and passes { value: row } -->
          <template #user_name="data">
            <div v-if="data && data.value" class="flex flex-col">
              <span class="font-medium text-gray-900 dark:text-white">
                {{ data.value.user_name || '-' }}
              </span>
              <span v-if="data.value.user_email && data.value.user_email !== '-'" class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {{ data.value.user_email }}
              </span>
            </div>
            <span v-else class="text-gray-400">-</span>
          </template>

          <template #status="data">
            <span v-if="data && data.value" :class="getStatusClass(data.value.status || 'UNKNOWN')" class="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold">
              <span :class="getStatusDotClass(data.value.status || 'UNKNOWN')" class="h-2 w-2 rounded-full"></span>
              {{ data.value.status || 'UNKNOWN' }}
            </span>
            <span v-else class="text-gray-400">-</span>
          </template>

          <template #created_at="data">
            <div v-if="data && data.value" class="flex flex-col">
              <span v-if="data.value.date_formatted && data.value.date_formatted !== '-'" class="text-gray-900 dark:text-white">
                {{ typeof data.value.date_formatted === 'string' ? data.value.date_formatted.split(',')[0] : '-' }}
              </span>
              <span v-else class="text-gray-900 dark:text-white">-</span>
              <span v-if="data.value.date_formatted && typeof data.value.date_formatted === 'string' && data.value.date_formatted.includes(',')" class="text-xs text-gray-500 dark:text-gray-400">
                {{ data.value.date_formatted.split(',')[1]?.trim() }}
              </span>
            </div>
            <span v-else class="text-gray-400">-</span>
          </template>

          <template #amount="data">
            <div v-if="data && data.value" class="text-right">
              <span class="font-bold text-gray-900 dark:text-white text-base">{{ data.value.amount_formatted || formatCurrency(0) }}</span>
            </div>
            <span v-else class="text-gray-400">-</span>
          </template>

          <template #category="data">
            <span v-if="data && data.value" class="inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
              {{ data.value.category || 'N/A' }}
            </span>
            <span v-else class="text-gray-400">N/A</span>
          </template>

          <template #actions="data">
            <div v-if="data && data.value" class="flex items-center justify-center gap-2">
              <button
                @click.stop="viewTransactionDetails(data.value)"
                class="inline-flex items-center rounded-md bg-blue-50 dark:bg-blue-900/30 px-2.5 py-1.5 text-xs font-medium text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                title="View Details"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
              <button
                @click.stop="flagTransaction(data.value)"
                class="inline-flex items-center rounded-md bg-gray-50 dark:bg-gray-800 px-2.5 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                title="Flag Transaction"
              >
                <FlagIcon class="h-4 w-4" />
              </button>
            </div>
            <span v-else class="text-gray-400">-</span>
          </template>
        </Vue3Datatable>
      </div>

      <!-- Enhanced Table Footer with Summary -->
      <div v-if="filteredTransactions.length > 0" class="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-t border-gray-200 dark:border-gray-700">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="flex flex-col">
            <span class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total Value</span>
            <span class="text-lg font-bold text-gray-900 dark:text-white mt-1">
              {{ formatCurrency(filteredTransactions.reduce((sum, t) => sum + (typeof t.amount === 'number' ? t.amount : parseFloat(t.amount) || 0), 0)) }}
            </span>
          </div>
          <div class="flex flex-col">
            <span class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Successful</span>
            <span class="text-lg font-bold text-green-600 dark:text-green-400 mt-1">
              {{ filteredTransactions.filter(t => t.status === 'SUCCESSFUL').length }}
            </span>
          </div>
          <div class="flex flex-col">
            <span class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Pending</span>
            <span class="text-lg font-bold text-yellow-600 dark:text-yellow-400 mt-1">
              {{ filteredTransactions.filter(t => t.status === 'PENDING').length }}
            </span>
          </div>
          <div class="flex flex-col">
            <span class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Failed</span>
            <span class="text-lg font-bold text-red-600 dark:text-red-400 mt-1">
              {{ filteredTransactions.filter(t => t.status === 'FAILED').length }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed, watch } from 'vue'
import Vue3Datatable from '@bhplugin/vue3-datatable'
import '@bhplugin/vue3-datatable/dist/style.css'
import {
  MagnifyingGlassIcon,
  ArrowPathIcon,
  FlagIcon,
  PrinterIcon,
  ArrowDownTrayIcon
} from '@heroicons/vue/24/outline'
import transactionService from '@/services/transactionService'
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useToast } from 'vue-toastification';

export default {
  name: 'TransactionsView',
  components: {
    Vue3Datatable,
    MagnifyingGlassIcon,
    ArrowPathIcon,
    FlagIcon,
    PrinterIcon,
    ArrowDownTrayIcon
  },
  directives: {
    'click-outside': {
      mounted(el, binding) {
        el.clickOutsideEvent = (event) => {
          if (!(el === event.target || el.contains(event.target))) {
            binding.value()
          }
        }
        document.addEventListener('click', el.clickOutsideEvent)
      },
      unmounted(el) {
        if (el.clickOutsideEvent) {
          document.removeEventListener('click', el.clickOutsideEvent)
        }
      },
    },
  },
  setup() {
    const toast = useToast()
    const transactions = ref([])
    const loading = ref(false)
    const rowsPerPage = ref(10)
    const searchQuery = ref('')
    const statusFilter = ref('')
    const startDate = ref('')
    const endDate = ref('')
    const showExportDropdown = ref(false)
    const selectedTransaction = ref(null)

    const showColumnMenu = ref(false)

    // Table columns configuration with improved structure
    // Vue3Datatable uses 'title' for column headers
    const columns = ref([
      {
        key: 'id',
        title: 'Transaction ID',
        field: 'id',
        sortable: true,
        filterable: true,
        visible: true,
        width: '180px',
        headerClass: 'font-semibold',
      },
      {
        key: 'date',
        title: 'Date & Time',
        field: 'created_at',
        sortable: true,
        filterable: true,
        visible: true,
        width: '200px',
        headerClass: 'font-semibold',
      },
      {
        key: 'user',
        title: 'User',
        field: 'user_name',
        sortable: true,
        filterable: true,
        visible: true,
        width: '220px',
        headerClass: 'font-semibold',
      },
      {
        key: 'category',
        title: 'Transaction Type',
        field: 'category',
        sortable: true,
        filterable: true,
        visible: true,
        width: '160px',
        headerClass: 'font-semibold',
      },
      {
        key: 'amount',
        title: 'Amount',
        field: 'amount',
        sortable: true,
        filterable: true,
        visible: true,
        width: '150px',
        headerClass: 'font-semibold text-right',
        cellClass: 'text-right',
      },
      {
        key: 'status',
        title: 'Status',
        field: 'status',
        sortable: true,
        filterable: true,
        visible: true,
        width: '130px',
        headerClass: 'font-semibold',
      },
      {
        key: 'actions',
        title: 'Actions',
        field: 'actions',
        sortable: false,
        filterable: false,
        visible: true,
        width: '100px',
        headerClass: 'font-semibold text-center',
        cellClass: 'text-center',
      },
    ])

    // Computed property for visible columns
    const visibleColumns = computed(() => {
      return columns.value.filter(col => col.visible !== false)
    })

    // Toggle column visibility
    const toggleColumnVisibility = (key) => {
      const column = columns.value.find(col => col.key === key)
      if (column) {
        column.visible = !column.visible
      }
    }


    // Format currency for NGN - defined before fetchTransactions
    const formatCurrency = (value) => {
      return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 0
      }).format(value)
    }

    const transformTransactionData = (rawTransactions) => {
      if (!Array.isArray(rawTransactions)) {
        console.warn('transformTransactionData: rawTransactions is not an array', rawTransactions)
        return []
      }

      return rawTransactions.map(t => {
        if (!t || typeof t !== 'object') {
          console.warn('transformTransactionData: invalid transaction object', t)
          return null
        }

        try {
          return {
            ...t,
            // Format user name for display
            user_name: t.user ? `${t.user.first_name || ''} ${t.user.lastname || ''}`.trim() || '-' : '-',
            user_email: t.user?.email || '-',
            // Format date - handle missing created_at
            date_formatted: t.created_at ? new Date(t.created_at).toLocaleString() : '-',
            // Format amount - handle missing or invalid amount
            amount_formatted: t.amount ? formatCurrency(t.amount) : formatCurrency(0),
            // Ensure category exists - check multiple possible fields
            category: t.category || t.service_type || t.type || t.transaction_type || 'N/A',
            // Ensure status exists
            status: t.status || 'UNKNOWN',
            // Ensure amount is a number for calculations
            amount: typeof t.amount === 'number' ? t.amount : (parseFloat(t.amount) || 0),
            // Ensure id exists
            id: t.id || t.transaction_id || `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
          }
        } catch (error) {
          console.error('Error transforming transaction:', error, t)
          return {
            id: t.id || 'UNKNOWN',
            user_name: '-',
            user_email: '-',
            date_formatted: '-',
            amount_formatted: formatCurrency(0),
            category: 'N/A',
            status: 'UNKNOWN',
            amount: 0
          }
        }
      }).filter(t => t !== null) // Remove any null entries
    }

    const fetchTransactions = async () => {
      loading.value = true
      try {
        // Try fetching without pagination first, then with pagination if needed
        let res;
        try {
          // First try without any params
          res = await transactionService.getTransactions()
        } catch (e1) {
          // If that fails, try with pagination
          console.log('Trying with pagination params...')
          res = await transactionService.getTransactions({ page: 1, limit: 50 })
        }

        const data = res.data
        console.log('Transactions data received:', data)
        let rawTransactions = data.data || data || []

        if (rawTransactions.length > 0) {
          // Transform data for display
          transactions.value = transformTransactionData(rawTransactions)
          console.log('Loaded', transactions.value.length, 'transactions from API')
        } else {
          // If no data, use sample data
          throw new Error('No data returned from API')
        }
      } catch (e) {
        console.error('Error fetching transactions:', e)
        // Use sample data as fallback
        try {
          console.log('Loading sample data as fallback...')
          const sampleRes = await transactionService.getSampleTransactions()
          const sampleData = sampleRes.data.data || []
          transactions.value = transformTransactionData(sampleData)
          toast.warning('Using sample data. API connection failed.')
          console.log('Loaded', transactions.value.length, 'sample transactions')
        } catch (fallbackError) {
          console.error('Fallback also failed:', fallbackError)
        transactions.value = []
          toast.error('Failed to load transactions')
        }
      } finally {
        loading.value = false
        console.log('Final transactions count:', transactions.value.length, 'items')
      }
    }

    onMounted(() => {
      fetchTransactions()

      // Add click outside listener to close export dropdown
      document.addEventListener('click', (e) => {
        const exportButton = document.querySelector('[data-export-button]')
        const exportDropdown = document.querySelector('[data-export-dropdown]')

        if (exportButton && exportDropdown) {
          if (!exportButton.contains(e.target) && !exportDropdown.contains(e.target)) {
            showExportDropdown.value = false
          }
        }
      })
    })

    // Watch for filter changes
    const watchStatusFilter = () => {
      // Filters are applied in computed property
    }

    const watchDateFilters = () => {
      // Filters are applied in computed property
    }

    const refresh = () => {
      fetchTransactions()
      toast.info('Refreshing transactions...')
    }

    const printTable = () => window.print()

    // Watch for search query changes
    const debouncedSearch = ref(null)
    const handleSearchChange = () => {
      if (debouncedSearch.value) clearTimeout(debouncedSearch.value)
      debouncedSearch.value = setTimeout(() => {
        // Search is handled in computed property
      }, 300)
    }

    const exportToExcel = () => {
      // Determine which transactions to export (filtered or all)
      const transactionsToExport = filteredTransactions.value.length > 0
        ? filteredTransactions.value
        : transactions.value

      if (transactionsToExport.length === 0) {
        toast.warning('No transactions to export')
        showExportDropdown.value = false
        return
      }

      // Format data for Excel
      const excelData = transactionsToExport.map(transaction => ({
        'Transaction ID': transaction.id,
        'Date': new Date(transaction.created_at).toLocaleString(),
        'User': transaction.user ? `${transaction.user.first_name} ${transaction.user.lastname}` : 'N/A',
        'Email': transaction.user?.email || 'N/A',
        'Type': transaction.category,
        'Amount': formatCurrency(transaction.amount),
        'Status': transaction.status,
        'Payment Method': transaction.payment_method || 'N/A',
        'Currency': transaction.currency || 'NGN'
      }))

      const worksheet = XLSX.utils.json_to_sheet(excelData)
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions")

      // Generate filename with timestamp
      const timestamp = new Date().toISOString().slice(0, 10)
      const filename = `transactions-${timestamp}.xlsx`

      XLSX.writeFile(workbook, filename)
      showExportDropdown.value = false
      toast.success(`Exported ${transactionsToExport.length} transactions to Excel successfully!`)
    }

    const exportToPDF = () => {
      // Determine which transactions to export (filtered or all)
      const transactionsToExport = filteredTransactions.value.length > 0
        ? filteredTransactions.value
        : transactions.value

      if (transactionsToExport.length === 0) {
        toast.warning('No transactions to export')
        showExportDropdown.value = false
        return
      }

      const doc = new jsPDF()

      // Add title
      const title = `Transactions Report (${transactionsToExport.length})`

      doc.setFontSize(16)
      doc.text(title, 14, 22)

      // Add timestamp
      doc.setFontSize(10)
      doc.setTextColor(100, 100, 100)
      doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30)

      // Prepare table data
      const tableColumn = ["ID", "Date", "User", "Type", "Amount", "Status"]
      const tableRows = transactionsToExport.map(transaction => [
        transaction.id,
        new Date(transaction.created_at).toLocaleDateString(),
        transaction.user ? `${transaction.user.first_name} ${transaction.user.lastname}` : 'N/A',
        transaction.category,
        formatCurrency(transaction.amount),
        transaction.status
      ])

      // Generate PDF with auto table using the plugin function
      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 40,
        styles: {
          fontSize: 8,
          cellPadding: 2
        },
        headStyles: {
          fillColor: [59, 130, 246], // Blue color
          textColor: 255
        },
        alternateRowStyles: {
          fillColor: [248, 250, 252] // Light gray
        }
      })

      // Generate filename with timestamp
      const timestamp = new Date().toISOString().slice(0, 10)
      const filename = `transactions-${timestamp}.pdf`

      doc.save(filename)
      showExportDropdown.value = false
      toast.success(`Exported ${transactionsToExport.length} transactions to PDF successfully!`)
    }

    const flagTransaction = (transaction) => {
      if (!transaction) {
        toast.warning('Please select a transaction first')
        return
      }
      // Implement flag logic
      toast.info('Flag transaction functionality coming soon')
    }

    const onRowClick = (row) => {
      selectedTransaction.value = row
      // You can add a modal or detail view here if needed
    }

    const viewTransactionDetails = (transaction) => {
      selectedTransaction.value = transaction
      // You can open a modal here
      toast.info(`Viewing details for transaction ${transaction.id}`)
    }

    const getStatusClass = (status) => {
      const statusClasses = {
        'SUCCESSFUL': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800',
        'FAILED': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800',
        'PENDING': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800',
        'REVERSED': 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400 border border-gray-200 dark:border-gray-700'
      }
      return statusClasses[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400 border border-gray-200 dark:border-gray-700'
    }

    const getStatusDotClass = (status) => {
      const dotClasses = {
        'SUCCESSFUL': 'bg-green-500',
        'FAILED': 'bg-red-500',
        'PENDING': 'bg-yellow-500',
        'REVERSED': 'bg-gray-500'
      }
      return dotClasses[status] || 'bg-gray-500'
    }

    const filteredTransactions = computed(() => {
      let filtered = [...transactions.value] // Create a copy to avoid mutating original

      console.log('Filtering transactions. Total:', filtered.length)

      // Apply search filter
      if (searchQuery.value) {
        const q = searchQuery.value.toLowerCase()
        filtered = filtered.filter(t =>
          (t.id && t.id.toLowerCase().includes(q)) ||
          (t.user_name && t.user_name.toLowerCase().includes(q)) ||
          (t.user_email && t.user_email.toLowerCase().includes(q)) ||
          (t.category && t.category.toLowerCase().includes(q)) ||
          (t.amount_formatted && t.amount_formatted.toLowerCase().includes(q)) ||
          (t.user && (
            ((t.user.first_name || '') + ' ' + (t.user.lastname || '')).toLowerCase().includes(q) ||
            (t.user.email && t.user.email.toLowerCase().includes(q))
          ))
        )
        console.log('After search filter:', filtered.length)
      }

      // Apply status filter
      if (statusFilter.value) {
        filtered = filtered.filter(t => (t.status || 'UNKNOWN') === statusFilter.value)
        console.log('After status filter:', filtered.length)
      }

      // Apply date filters
      if (startDate.value) {
        filtered = filtered.filter(t => {
          if (!t.created_at) return false
          try {
            return new Date(t.created_at) >= new Date(startDate.value)
          } catch {
            return false
          }
        })
        console.log('After start date filter:', filtered.length)
      }
      if (endDate.value) {
        // Add one day to end date to include the entire day
        const endDateObj = new Date(endDate.value)
        endDateObj.setHours(23, 59, 59, 999)
        filtered = filtered.filter(t => {
          if (!t.created_at) return false
          try {
            return new Date(t.created_at) <= endDateObj
          } catch {
            return false
          }
        })
        console.log('After end date filter:', filtered.length)
      }

      console.log('Final filtered transactions:', filtered)
      return filtered
    })

    // Watch transactions for debugging (after filteredTransactions is defined)
    watch(transactions, (newVal) => {
      console.log('Transactions updated:', newVal.length, 'items')
    }, { deep: true })

    // Watch filteredTransactions for debugging
    watch(filteredTransactions, (newVal) => {
      console.log('Filtered transactions updated:', newVal.length, 'items')
    })

    return {
      transactions,
      loading,
      rowsPerPage,
      searchQuery,
      statusFilter,
      startDate,
      endDate,
      refresh,
      printTable,
      exportToExcel,
      exportToPDF,
      flagTransaction,
      filteredTransactions,
      formatCurrency,
      getStatusClass,
      getStatusDotClass,
      showExportDropdown,
      handleSearchChange,
      watchStatusFilter,
      watchDateFilters,
      columns,
      visibleColumns,
      onRowClick,
      selectedTransaction,
      showColumnMenu,
      toggleColumnVisibility,
      viewTransactionDetails
    }
  }
}
</script>

<style scoped>
/* Enhanced Custom styles for the datatable */
:deep(.bh-table-compact) {
  border-collapse: separate;
  border-spacing: 0;
  width: 100%;
}

/* Enhanced Table Headers */
:deep(.bh-table-compact thead) {
  background: linear-gradient(to right, #f9fafb, #f3f4f6);
}

.dark :deep(.bh-table-compact thead) {
  background: linear-gradient(to right, #374151, #1f2937);
}

:deep(.bh-table-compact thead th) {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: #f9fafb;
  padding: 1rem 1.5rem;
  font-weight: 700;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #374151;
  border-bottom: 2px solid #e5e7eb;
  white-space: nowrap;
}

.dark :deep(.bh-table-compact thead th) {
  background-color: #374151;
  color: #d1d5db;
  border-bottom-color: #4b5563;
}

/* Sortable header hover effect */
:deep(.bh-table-compact thead th:hover) {
  background-color: #f3f4f6;
}

.dark :deep(.bh-table-compact thead th:hover) {
  background-color: #4b5563;
}

/* Table Body */
:deep(.bh-table-compact tbody) {
  background-color: #ffffff;
}

.dark :deep(.bh-table-compact tbody) {
  background-color: #111827;
}

:deep(.bh-table-compact tbody tr) {
  transition: all 0.15s ease-in-out;
  border-bottom: 1px solid #e5e7eb;
}

.dark :deep(.bh-table-compact tbody tr) {
  border-bottom-color: #374151;
}

:deep(.bh-table-compact tbody tr:hover) {
  cursor: pointer;
  background-color: #f9fafb;
  transform: scale(1.001);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.dark :deep(.bh-table-compact tbody tr:hover) {
  background-color: #1f2937;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

:deep(.bh-table-compact tbody td) {
  padding: 1rem 1.5rem;
  vertical-align: middle;
}

/* Pagination styling */
:deep(.bh-datatable-pagination) {
  margin-top: 1rem;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  background-color: #ffffff;
  border-top: 1px solid #e5e7eb;
}

.dark :deep(.bh-datatable-pagination) {
  background-color: #1f2937;
  border-top-color: #374151;
}

:deep(.bh-datatable-pagination select) {
  padding: 0.375rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  background-color: #ffffff;
}

.dark :deep(.bh-datatable-pagination select) {
  background-color: #374151;
  border-color: #4b5563;
  color: #f3f4f6;
}

:deep(.bh-datatable-pagination button) {
  padding: 0.375rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background-color: #ffffff;
  color: #374151;
  font-size: 0.875rem;
  transition: all 0.15s ease-in-out;
  cursor: pointer;
}

:deep(.bh-datatable-pagination button:hover:not(:disabled)) {
  background-color: #f9fafb;
  border-color: #9ca3af;
}

:deep(.bh-datatable-pagination button:disabled) {
  opacity: 0.5;
  cursor: not-allowed;
}

.dark :deep(.bh-datatable-pagination button) {
  background-color: #374151;
  border-color: #4b5563;
  color: #d1d5db;
}

.dark :deep(.bh-datatable-pagination button:hover:not(:disabled)) {
  background-color: #4b5563;
}

/* Striped rows */
:deep(.bh-table-compact.striped tbody tr:nth-child(even)) {
  background-color: #f9fafb;
}

.dark :deep(.bh-table-compact.striped tbody tr:nth-child(even)) {
  background-color: #374151;
}
</style>
