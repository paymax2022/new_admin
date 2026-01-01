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

    <!-- Transaction History Section -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div class="p-6 border-b border-gray-200 dark:border-gray-700">
        <div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Transaction History</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">View all financial transactions across the platform</p>
        </div>
      </div>

      <!-- Vue3 DataTable -->
      <div class="p-6">
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
          :loading="isLoading"
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
                <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">School</h4>
                <p class="text-lg font-semibold text-gray-900 dark:text-white">{{ selectedTransaction?.school }}</p>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Amount</h4>
                <p class="text-lg font-semibold text-gray-900 dark:text-white">{{ selectedTransaction?.amount }}</p>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Transaction Type</h4>
                <p class="text-lg font-semibold text-gray-900 dark:text-white">{{ selectedTransaction?.type }}</p>
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
                <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Platform Fee</h4>
                <p class="text-lg font-semibold text-gray-900 dark:text-white">{{ selectedTransaction?.platformFee }}</p>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Payment Method</h4>
                <p class="text-lg font-semibold text-gray-900 dark:text-white">{{ selectedTransaction?.paymentMethod }}</p>
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
                <span class="text-sm text-gray-600 dark:text-gray-400">Processing Time:</span>
                <span class="text-sm font-medium text-gray-900 dark:text-white">2.3 seconds</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400">Reference Number:</span>
                <span class="text-sm font-medium text-gray-900 dark:text-white">REF-{{ selectedTransaction?.id }}</span>
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
import { ref, onMounted } from 'vue';
import Vue3Datatable from '@bhplugin/vue3-datatable';
import '@bhplugin/vue3-datatable/dist/style.css';
import DashboardCard from '@/components/DashboardCard.vue';

// Reactive data
const lastUpdated = ref('5/10/2025, 8:20:13 PM');
const isLoading = ref(false);
const itemsPerPage = ref(10);

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
    status: 'completed',
  },
  {
    id: 'TXN002',
    school: 'Greenfield Academy',
    amount: '₦185,000',
    platformFee: '₦1,850',
    type: 'Uniform Fee',
    paymentMethod: 'Bank Transfer',
    date: '5/13/2023',
    status: 'pending',
  },
  {
    id: 'TXN003',
    school: 'St. Michael\'s College',
    amount: '₦320,000',
    platformFee: '₦3,200',
    type: 'School Fee',
    paymentMethod: 'Card',
    date: '5/12/2023',
    status: 'completed',
  },
  {
    id: 'TXN004',
    school: 'Westpoint International',
    amount: '₦275,000',
    platformFee: '₦2,750',
    type: 'Boarding Fee',
    paymentMethod: 'Wallet',
    date: '5/11/2023',
    status: 'completed',
  },
  {
    id: 'TXN005',
    school: 'Horizon Educational Center',
    amount: '₦150,000',
    platformFee: '₦1,500',
    type: 'Exam Fee',
    paymentMethod: 'Card',
    date: '5/10/2023',
    status: 'failed',
  },
  {
    id: 'TXN006',
    school: 'Royal Academy',
    amount: '₦420,000',
    platformFee: '₦4,200',
    type: 'School Fee',
    paymentMethod: 'Bank Transfer',
    date: '5/9/2023',
    status: 'completed',
  },
  {
    id: 'TXN007',
    school: 'Elite Preparatory School',
    amount: '₦195,000',
    platformFee: '₦1,950',
    type: 'Uniform Fee',
    paymentMethod: 'Card',
    date: '5/8/2023',
    status: 'pending',
  },
  {
    id: 'TXN008',
    school: 'Bright Future Academy',
    amount: '₦310,000',
    platformFee: '₦3,100',
    type: 'Boarding Fee',
    paymentMethod: 'Wallet',
    date: '5/7/2023',
    status: 'completed',
  },
]);

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

// Functions
const getStatusClass = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'pending':
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
    case 'failed':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
  }
};

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
  // Get all visible rows (after filtering)
  const csvContent = [
    // Header
    ['Transaction ID', 'School', 'Amount', 'Platform Fee', 'Type', 'Payment Method', 'Date', 'Status'].join(','),
    // Rows
    ...transactionsData.value.map((row) =>
      [row.id, row.school, row.amount, row.platformFee, row.type, row.paymentMethod, row.date, row.status].join(',')
    ),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `transactions_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Lifecycle
onMounted(() => {
  console.log('Transaction page mounted');
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
