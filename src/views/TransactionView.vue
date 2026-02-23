<template>
  <div class="space-y-6">
    <!-- Header Section -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Transaction Monitoring</h1>
        <p class="text-gray-600 dark:text-gray-400">School fee payments only</p>
      </div>
      <div class="flex items-center space-x-4">
        <div class="text-sm text-gray-500">
          Last refreshed: {{ lastUpdated }}
        </div>
        <button
          @click="refresh"
          :disabled="isLoading"
          class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 flex items-center space-x-2"
        >
          <svg class="h-4 w-4" :class="{ 'animate-spin': isLoading }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>Refresh</span>
        </button>
        <button
          @click="exportToCSV"
          class="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 flex items-center space-x-2"
        >
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
        :value="metrics.totalVolume"
        :subtitle="`${metrics.count} school fee transactions`"
        icon="money-bag"
        color="purple"
      />
      <DashboardCard
        title="Success Count"
        :value="String(metrics.successCount)"
        subtitle="Completed payments"
        icon="chart-line"
        color="red"
      />
      <DashboardCard
        title="Success Rate"
        :value="metrics.successRate"
        :subtitle="`${metrics.successCount} of ${metrics.count} completed`"
        icon="percent"
        color="green"
      />
    </div>

    <!-- Transaction History Section -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div class="p-6 border-b border-gray-200 dark:border-gray-700">
        <div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Transaction History</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">School fee payments only</p>
        </div>
      </div>

      <!-- Loading / Error / Empty -->
      <div v-if="isLoading" class="p-10 text-center">
        <span class="text-blue-600 dark:text-blue-400 font-semibold">Loading transactions...</span>
      </div>
      <div v-else-if="errorMessage" class="p-10 text-center">
        <p class="text-red-600 dark:text-red-400 mb-2">{{ errorMessage }}</p>
        <button @click="refresh" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Retry</button>
      </div>
      <div v-else-if="transactionsData.length === 0" class="p-10 text-center">
        <p class="text-gray-600 dark:text-gray-400">No school fee payment transactions found.</p>
      </div>
      <!-- Vue3 DataTable -->
      <div v-else class="p-6">
        <Vue3Datatable
          :rows="transactionsData"
          :columns="columns"
          :totalRows="transactionsData.length"
          :sortable="true"
          :searchable="true"
          :pageSize="itemsPerPage"
          :pageSizeOptions="[10, 25, 50, 100]"
          :classes="{
            table: 'table-auto w-full',
            thead: 'bg-gray-50 dark:bg-gray-700',
            tbody: '',
            tr: 'border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors',
            th: 'px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider',
            td: 'px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white',
          }"
          skin="bh-table-compact"
          :loading="false"
          @row-clicked="onRowClick"
        >
          <!-- Custom Status Column -->
          <template #status="{ row }">
            <span :class="getStatusClass(row.status)" class="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
              {{ row.status }}
            </span>
          </template>

          <!-- Custom Actions Column -->
          <template #actions="{ row }">
            <button
              @click.stop="viewTransactionDetails(row)"
              class="text-purple-600 hover:text-purple-900 dark:text-purple-400 dark:hover:text-purple-300 font-medium"
            >
              Details
            </button>
          </template>
        </Vue3Datatable>
      </div>
    </div>

    <!-- Transaction Details Modal -->
    <div v-if="showTransactionModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white dark:bg-gray-800">
        <div class="mt-3">
          <!-- Modal Header -->
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Transaction #{{ selectedTransaction?.id }}</h3>
            <button @click="closeTransactionModal" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Transaction Information -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div class="space-y-4">
              <div>
                <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Narration</h4>
                <p class="text-lg font-semibold text-gray-900 dark:text-white">{{ selectedTransaction?.narration || selectedTransaction?.school || '—' }}</p>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Amount</h4>
                <p class="text-lg font-semibold text-gray-900 dark:text-white">{{ selectedTransaction?.amount }}</p>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Transaction Type</h4>
                <p class="text-lg font-semibold text-gray-900 dark:text-white">{{ selectedTransaction?.type }}</p>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Payer</h4>
                <p class="text-sm font-medium text-gray-900 dark:text-white">{{ selectedTransaction?.userName || '—' }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">{{ selectedTransaction?.userEmail || '—' }}</p>
              </div>
            </div>
            <div class="space-y-4">
              <div>
                <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Status</h4>
                <span :class="getStatusClass(selectedTransaction?.status)" class="inline-flex px-3 py-1 text-sm font-semibold rounded-full">
                  {{ selectedTransaction?.status }}
                </span>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Payment Method</h4>
                <p class="text-lg font-semibold text-gray-900 dark:text-white">{{ selectedTransaction?.paymentMethod }}</p>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Currency</h4>
                <p class="text-lg font-semibold text-gray-900 dark:text-white">{{ selectedTransaction?.currency || 'NGN' }}</p>
              </div>
            </div>
          </div>

          <!-- Additional Details -->
          <div class="mb-6">
            <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Additional Details</h4>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-3">
              <div class="flex justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400">Transaction Date:</span>
                <span class="text-sm font-medium text-gray-900 dark:text-white">{{ selectedTransaction?.date }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400">Payment Reference:</span>
                <span class="text-sm font-medium text-gray-900 dark:text-white break-all">{{ selectedTransaction?.paymentReference || '—' }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400">Transaction ID:</span>
                <span class="text-sm font-medium text-gray-900 dark:text-white">{{ selectedTransaction?.id }}</span>
              </div>
            </div>
          </div>

          <!-- Footer Buttons -->
          <div class="flex justify-between">
            <button
              @click="closeTransactionModal"
              class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Close
            </button>
            <button class="px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-md hover:bg-gray-800 dark:hover:bg-gray-600">
              Download Receipt
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import Vue3Datatable from '@bhplugin/vue3-datatable';
import '@bhplugin/vue3-datatable/dist/style.css';
import DashboardCard from '@/components/DashboardCard.vue';
import transactionService from '@/services/transactionService';

const SCHOOL_FEE_PAYMENT_TYPE = 'school_fee_payment';

// Reactive data
const lastUpdated = ref('—');
const isLoading = ref(false);
const errorMessage = ref<string | null>(null);
const itemsPerPage = ref(10);

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(value);
}

/** Raw list from API (only school_fee_payment), mapped to table row shape */
const transactionsData = ref<Array<{
  id: string;
  school: string;
  amount: string;
  platformFee: string;
  type: string;
  paymentMethod: string;
  date: string;
  status: string;
  narration?: string;
  paymentReference?: string;
  userName?: string;
  userEmail?: string;
  currency?: string;
}>>([]);

// Table columns configuration
const columns = ref([
  {
    key: 'id',
    label: 'Transaction ID',
    field: 'id',
    sortable: true,
    filterable: true,
  },
  {
    key: 'school',
    label: 'School',
    field: 'school',
    sortable: true,
    filterable: true,
  },
  {
    key: 'amount',
    label: 'Amount (₦)',
    field: 'amount',
    sortable: true,
    filterable: true,
  },
  {
    key: 'platformFee',
    label: 'Platform Fee',
    field: 'platformFee',
    sortable: true,
    filterable: true,
  },
  {
    key: 'type',
    label: 'Type',
    field: 'type',
    sortable: true,
    filterable: true,
  },
  {
    key: 'paymentMethod',
    label: 'Payment Method',
    field: 'paymentMethod',
    sortable: true,
    filterable: true,
  },
  {
    key: 'date',
    label: 'Date',
    field: 'date',
    sortable: true,
    filterable: true,
  },
  {
    key: 'status',
    label: 'Status',
    field: 'status',
    sortable: true,
    filterable: true,
  },
  {
    key: 'actions',
    label: 'Actions',
    field: 'actions',
    sortable: false,
    filterable: false,
  },
]);

// Transaction modal state
const showTransactionModal = ref(false);
const selectedTransaction = ref<any>(null);

// Metrics from current data
const metrics = computed(() => {
  const rows = transactionsData.value;
  const total = rows.reduce((sum, r) => {
    const num = parseFloat(String(r.amount).replace(/[^0-9.-]/g, '')) || 0;
    return sum + num;
  }, 0);
  const successCount = rows.filter((r) => /success/i.test(String(r.status))).length;
  const rate = rows.length ? Math.round((successCount / rows.length) * 100) : 0;
  return {
    totalVolume: formatCurrency(total),
    count: rows.length,
    successCount,
    successRate: `${rate}%`,
  };
});

// Functions
const getStatusClass = (status: string) => {
  const s = (status || '').toLowerCase();
  if (s === 'success' || s === 'successful' || s === 'completed') return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
  if (s === 'pending') return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
  if (s === 'failed' || s === 'failure') return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
  return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
};

function mapApiTransactionToRow(t: any): typeof transactionsData.value[0] {
  const user = t.user || {};
  const userName = [user.first_name, user.lastname].filter(Boolean).join(' ') || '—';
  return {
    id: t.id || '—',
    school: t.narration || t.service_type || 'School fees',
    amount: formatCurrency(Number(t.amount) || 0),
    platformFee: '—',
    type: t.service_type || 'School Fee',
    paymentMethod: t.payment_method || '—',
    date: t.created_at ? new Date(t.created_at).toLocaleString() : '—',
    status: t.status || '—',
    narration: t.narration,
    paymentReference: t.paymentReference,
    userName,
    userEmail: user.email,
    currency: t.currency || 'NGN',
  };
}

async function fetchTransactions() {
  isLoading.value = true;
  errorMessage.value = null;
  try {
    const res = await transactionService.getTransactions({ page: 1, limit: 100 });
    const raw = res.data?.data || res.data || [];
    if (!Array.isArray(raw)) {
      transactionsData.value = [];
      return;
    }
    const schoolFeeOnly = raw.filter((t: any) => (t.transaction_type || t.category) === SCHOOL_FEE_PAYMENT_TYPE);
    transactionsData.value = schoolFeeOnly.map(mapApiTransactionToRow);
    lastUpdated.value = new Date().toLocaleString();
  } catch (e: any) {
    errorMessage.value = e?.message || 'Failed to load transactions';
    transactionsData.value = [];
  } finally {
    isLoading.value = false;
  }
}

function refresh() {
  fetchTransactions();
}

const viewTransactionDetails = (transaction: any) => {
  selectedTransaction.value = transaction;
  showTransactionModal.value = true;
};

const closeTransactionModal = () => {
  showTransactionModal.value = false;
  selectedTransaction.value = null;
};

const onRowClick = (row: any) => {
  viewTransactionDetails(row);
};

const exportToCSV = () => {
  const rows = transactionsData.value;
  if (rows.length === 0) return;
  const csvContent = [
    ['Transaction ID', 'School/Narration', 'Amount', 'Type', 'Payment Method', 'Date', 'Status'].join(','),
    ...rows.map((row) =>
      [row.id, `"${(row.school || '').replace(/"/g, '""')}"`, row.amount, row.type, row.paymentMethod, row.date, row.status].join(',')
    ),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `school_fee_transactions_${new Date().toISOString().split('T')[0]}.csv`;
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

onMounted(() => {
  fetchTransactions();
});
</script>

<style scoped>
/* Custom styles for the datatable */
:deep(.bh-table-compact) {
  border-collapse: separate;
  border-spacing: 0;
}

:deep(.bh-table-compact thead th) {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: #f9fafb;
}

.dark :deep(.bh-table-compact thead th) {
  background-color: #374151;
}

:deep(.bh-table-compact tbody tr:hover) {
  cursor: pointer;
}

/* Search input styling */
:deep(.bh-datatable-search) {
  margin-bottom: 1rem;
}

:deep(.bh-datatable-search input) {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  transition: all 0.15s ease-in-out;
}

:deep(.bh-datatable-search input:focus) {
  outline: none;
  border-color: #9333ea;
  box-shadow: 0 0 0 2px rgba(147, 51, 234, 0.1);
}

.dark :deep(.bh-datatable-search input) {
  background-color: #374151;
  border-color: #4b5563;
  color: #f3f4f6;
}

/* Pagination styling */
:deep(.bh-datatable-pagination) {
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

:deep(.bh-datatable-pagination select) {
  padding: 0.375rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
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

/* Filter dropdown styling */
:deep(.bh-datatable-filter) {
  margin-bottom: 1rem;
}

:deep(.bh-datatable-filter select) {
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  background-color: #ffffff;
}

.dark :deep(.bh-datatable-filter select) {
  background-color: #374151;
  border-color: #4b5563;
  color: #f3f4f6;
}
</style>
