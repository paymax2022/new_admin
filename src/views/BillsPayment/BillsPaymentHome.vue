<template>
  <div class="min-h-screen bg-[#f7f9fc] p-6 space-y-6" @click="activeDropdown = null">
    <header class="space-y-1">
      <p class="text-sm font-semibold uppercase tracking-[0.2em] text-[#9ca3af]">Bill Payment Services</p>
      <h1 class="text-3xl font-semibold text-[#111827]">Bill Payment Services</h1>
      <p class="text-sm text-[#6b7280]">Manage airtime, data, electricity, and TV subscriptions services</p>
    </header>

    <section class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <article
        v-for="card in serviceSummary"
        :key="card.title"
        class="rounded-3xl bg-white p-5 shadow-[0_20px_40px_rgba(15,23,42,0.05)] space-y-4"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">{{ card.title }}</p>
            <p class="mt-3 text-2xl font-semibold text-[#111827]">{{ card.amount }}</p>
          </div>
          <span
            class="rounded-full border px-3 py-1 text-xs font-semibold uppercase"
            :class="card.status === 'Active' ? 'border-[#16a34a] text-[#16a34a]' : 'border-[#f59e0b] text-[#f59e0b]'"
          >
            {{ card.status }}
          </span>
        </div>
        <div class="grid grid-cols-2 gap-3 text-xs text-[#6b7280]">
          <div>
            <p class="font-semibold text-[#111827]">{{ card.metrics.revenue }}</p>
            <p>Total Revenue</p>
          </div>
          <div>
            <p class="font-semibold text-[#111827]">{{ card.metrics.transactions }}</p>
            <p>Transactions</p>
          </div>
          <div>
            <p class="font-semibold text-[#111827]">{{ card.metrics.uptime }}</p>
            <p>Uptime</p>
          </div>
          <div>
            <p class="font-semibold text-[#111827]">{{ card.metrics.providers }}</p>
            <p>Providers</p>
          </div>
        </div>
      </article>
    </section>

    <section class="rounded-3xl bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.05)] space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-semibold text-[#111827]">Service Providers</h2>
        <button class="rounded-full border border-[#e2e8f0] px-4 py-2 text-sm font-semibold text-[#6b7280]">
          Add Provider
        </button>
      </div>

      <div class="overflow-x-auto overflow-y-visible">
        <table class="w-full text-left text-sm">
          <thead>
            <tr class="text-[#94a3b8] uppercase text-xs tracking-wide">
              <th class="py-3">Provider</th>
              <th>Service</th>
              <th>Status</th>
              <th>Success Rate</th>
              <th>Commission</th>
              <th>Uptime</th>
              <th>Last Sync</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody class="text-[#111827]">
            <tr
              v-for="provider in providers"
              :key="provider.provider"
              class="border-t border-[#f1f5f9]"
            >
              <td class="py-4 font-semibold">{{ provider.provider }}</td>
              <td>{{ provider.service }}</td>
              <td>
                <span
                  class="rounded-full px-3 py-1 text-xs font-semibold uppercase"
                  :class="provider.statusClass"
                >
                  {{ provider.status }}
                </span>
              </td>
              <td>
                <span :class="provider.successRateColor">{{ provider.successRate }}</span>
              </td>
              <td>{{ provider.commission }}</td>
              <td>
                <span :class="provider.uptimeColor">{{ provider.uptime }}</span>
              </td>
              <td class="text-[#94a3b8] text-xs">{{ provider.lastSync }}</td>
              <td>
                <div class="relative" @click.stop>
                  <button
                    :ref="(el) => setButtonRef(provider.provider, el)"
                    type="button"
                    class="rounded-full p-2 text-[#6b7280] transition hover:bg-[#f1f5f9]"
                    @click="toggleDropdown(provider.provider)"
                  >
                    <IconHorizontalDots class="h-5 w-5" />
                  </button>
                  <Teleport to="body">
                    <div
                      v-if="activeDropdown === provider.provider"
                      class="fixed z-[9999] w-48 rounded-2xl border border-[#e2e8f0] bg-white p-2 shadow-lg"
                      :style="getDropdownPosition(provider.provider)"
                      data-dropdown="true"
                    >
                    <button
                      type="button"
                      class="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-semibold text-[#111827] transition hover:bg-[#f8fafc]"
                      @click="openConfig(provider)"
                    >
                      <IconSettings class="h-4 w-4" />
                      Configure
                    </button>
                    <button
                      type="button"
                      class="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-semibold text-[#111827] transition hover:bg-[#f8fafc]"
                      @click="openTestConnection(provider)"
                    >
                      <IconLink class="h-4 w-4" />
                      Test connection
                    </button>
                    <button
                      type="button"
                      class="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-semibold text-[#111827] transition hover:bg-[#f8fafc]"
                      @click="openLogs(provider)"
                    >
                      <IconEye class="h-4 w-4" />
                      View logs
                    </button>
                    <button
                      type="button"
                      class="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-semibold text-[#dc2626] transition hover:bg-[#f8fafc]"
                      @click="openSuspendModal(provider)"
                    >
                      <IconBan class="h-4 w-4" />
                      Suspend
                    </button>
                    </div>
                  </Teleport>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Transactions Table Section -->
    <section class="rounded-3xl bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.05)] space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-semibold text-[#111827]">Transactions</h2>
        <p class="text-sm text-[#6b7280]">Showing Airtime and Electricity transactions only</p>
      </div>

      <!-- Search and Filters -->
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div class="flex-1 max-w-lg">
          <div class="relative">
            <MagnifyingGlassIcon class="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search by user or transaction ID"
              class="w-full rounded-md border border-gray-300 pl-10 pr-4 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
          </div>
        </div>
        <div class="flex items-center space-x-3">
          <select v-model="statusFilter" class="block w-40 rounded-md border border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
            <option value="">All Status</option>
            <option value="SUCCESSFUL">Completed</option>
            <option value="PENDING">Pending</option>
            <option value="FAILED">Failed</option>
            <option value="REVERSED">Reversed</option>
          </select>
          <div class="flex items-center space-x-2">
            <input type="date" v-model="startDate" class="rounded-md border border-gray-300 py-2 px-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            <span class="text-gray-500">to</span>
            <input type="date" v-model="endDate" class="rounded-md border border-gray-300 py-2 px-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
          </div>
          <button @click="refresh" class="inline-flex items-center justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
            <ArrowPathIcon class="h-4 w-4 mr-2" />
            Refresh
          </button>
        </div>
      </div>

      <!-- Vue3 DataTable -->
      <div v-if="loading" class="flex justify-center items-center py-10">
        <span class="text-blue-600 font-semibold">Loading...</span>
      </div>
      <div v-else-if="filteredTransactions.length === 0" class="rounded-lg border border-gray-200 p-10 text-center">
        <h3 class="text-sm font-medium text-gray-900">No transactions found</h3>
        <p class="mt-1 text-sm text-gray-500">Try adjusting your filters or refresh the page.</p>
      </div>
      <div v-else class="rounded-lg border border-gray-200 overflow-hidden">
        <Vue3Datatable
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
            table: 'min-w-full divide-y divide-gray-200',
            thead: 'bg-gray-50',
            tbody: 'bg-white divide-y divide-gray-200',
            tr: 'hover:bg-gray-50 transition-colors cursor-pointer',
            th: 'px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-700',
            td: 'px-6 py-4 whitespace-nowrap text-sm text-gray-900',
          }"
        >
          <template #user_name="data">
            <div v-if="data && data.value" class="flex flex-col">
              <span class="font-medium text-gray-900">
                {{ data.value.user_name || '-' }}
              </span>
              <span v-if="data.value.user_email && data.value.user_email !== '-'" class="text-xs text-gray-500 mt-0.5">
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
              <span v-if="data.value.date_formatted && data.value.date_formatted !== '-'" class="text-gray-900">
                {{ typeof data.value.date_formatted === 'string' ? data.value.date_formatted.split(',')[0] : '-' }}
              </span>
              <span v-else class="text-gray-900">-</span>
              <span v-if="data.value.date_formatted && typeof data.value.date_formatted === 'string' && data.value.date_formatted.includes(',')" class="text-xs text-gray-500">
                {{ data.value.date_formatted.split(',')[1]?.trim() }}
              </span>
            </div>
            <span v-else class="text-gray-400">-</span>
          </template>

          <template #amount="data">
            <div v-if="data && data.value" class="text-right">
              <span class="font-bold text-gray-900 text-base">{{ data.value.amount_formatted || formatCurrency(0) }}</span>
            </div>
            <span v-else class="text-gray-400">-</span>
          </template>

          <template #category="data">
            <span v-if="data && data.value" class="inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
              {{ data.value.category || 'N/A' }}
            </span>
            <span v-else class="text-gray-400">N/A</span>
          </template>
        </Vue3Datatable>
      </div>
    </section>
  </div>

  <ConfigureProviderModal
    v-if="configModal.open && configModal.provider"
    :provider="configModal.provider"
    @close="closeConfig"
  />

  <ProviderLogsModal
    v-if="logsModal.open && logsModal.provider"
    :provider="logsModal.provider"
    @close="closeLogs"
  />

  <SuspendProviderModal
    v-if="suspendModal.open && suspendModal.provider"
    :provider="suspendModal.provider"
    @close="closeSuspendModal"
    @suspend="handleSuspend"
  />

  <TestConnectionModal
    v-if="testConnectionModal.open && testConnectionModal.provider"
    :provider="testConnectionModal.provider"
    @close="closeTestConnection"
    @runTest="handleRunTest"
  />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import ConfigureProviderModal from './components/ConfigureProviderModal.vue';
import ProviderLogsModal from './components/ProviderLogsModal.vue';
import SuspendProviderModal from './components/SuspendProviderModal.vue';
import TestConnectionModal from './components/TestConnectionModal.vue';
import IconHorizontalDots from '@/components/icon/icon-horizontal-dots.vue';
import IconSettings from '@/components/icon/icon-settings.vue';
import IconLink from '@/components/icon/icon-link.vue';
import IconEye from '@/components/icon/icon-eye.vue';
import IconBan from '@/components/icon/icon-ban.vue';
import Vue3Datatable from '@bhplugin/vue3-datatable';
import '@bhplugin/vue3-datatable/dist/style.css';
import { MagnifyingGlassIcon, ArrowPathIcon } from '@heroicons/vue/24/outline';
import transactionService from '@/services/transactionService';
import { useToast } from 'vue-toastification';

const serviceSummary = [
  {
    title: 'Airtime',
    amount: '₦2,450,000',
    status: 'Active',
    metrics: {
      revenue: '₦2,450,000',
      transactions: '12,453',
      uptime: '99.5%',
      providers: '4 providers',
    },
  },
  {
    title: 'Data',
    amount: '₦6,670,000',
    status: 'Active',
    metrics: {
      revenue: '₦6,670,000',
      transactions: '15,121',
      uptime: '98.5%',
      providers: '5 providers',
    },
  },
  {
    title: 'Electricity',
    amount: '₦8,340,000',
    status: 'Active',
    metrics: {
      revenue: '₦8,340,000',
      transactions: '12,453',
      uptime: '99.6%',
      providers: '4 providers',
    },
  },
  {
    title: 'TV Subscriptions',
    amount: '₦1,890,000',
    status: 'Active',
    metrics: {
      revenue: '₦1,890,000',
      transactions: '8,563',
      uptime: '98.5%',
      providers: '3 providers',
    },
  },
];

const providers = [
  {
    provider: 'MTN Nigeria',
    service: 'Airtime/Data',
    status: 'Active',
    statusClass: 'bg-[#dcfce7] text-[#15803d]',
    successRate: '98.5%',
    commission: '2.5%',
    uptime: '98.5%',
    lastSync: '2 mins ago',
    successRateColor: 'text-[#16a34a] font-semibold',
    uptimeColor: 'text-[#16a34a] font-semibold',
  },
  {
    provider: 'Airtel Nigeria',
    service: 'Airtime/Data',
    status: 'Inactive',
    statusClass: 'bg-[#f1f5f9] text-[#64748b]',
    successRate: '96.1%',
    commission: '1.5%',
    uptime: '96.1%',
    lastSync: '2 mins ago',
    successRateColor: 'text-[#16a34a] font-semibold',
    uptimeColor: 'text-[#16a34a] font-semibold',
  },
  {
    provider: 'IKEDC',
    service: 'Electricity',
    status: 'Active',
    statusClass: 'bg-[#dcfce7] text-[#15803d]',
    successRate: '94.3%',
    commission: '3.0%',
    uptime: '97.2%',
    lastSync: '2 mins ago',
    successRateColor: 'text-[#f97316] font-semibold',
    uptimeColor: 'text-[#f97316] font-semibold',
  },
  {
    provider: 'GOtv',
    service: 'TV Subscription',
    status: 'Suspended',
    statusClass: 'bg-[#fee2e2] text-[#b91c1c]',
    successRate: '78.9%',
    commission: '1.8%',
    uptime: '96.1%',
    lastSync: '2 mins ago',
    successRateColor: 'text-[#dc2626] font-semibold',
    uptimeColor: 'text-[#16a34a] font-semibold',
  },
];

const toast = useToast();

// Transaction table state
const loading = ref(false);
const transactions = ref([]);
const searchQuery = ref('');
const statusFilter = ref('');
const startDate = ref('');
const endDate = ref('');
const rowsPerPage = ref(10);

// Format currency
const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0
  }).format(value);
};

// Transform transaction data
const transformTransactionData = (rawTransactions) => {
  if (!Array.isArray(rawTransactions)) {
    return [];
  }
  
  return rawTransactions.map(t => {
    if (!t || typeof t !== 'object') {
      return null;
    }
    
    try {
      const amountValue = parseFloat(t.amount) || 0;
      return {
        ...t,
        user_name: t.user ? `${t.user.first_name || ''} ${t.user.lastname || ''}`.trim() || '-' : '-',
        user_email: t.user?.email || '-',
        date_formatted: t.created_at ? new Date(t.created_at).toLocaleString() : '-',
        amount_formatted: formatCurrency(amountValue),
        category: t.category || t.service_type || t.type || t.transaction_type || 'N/A',
        status: t.status || 'UNKNOWN',
        amount: amountValue,
        id: t.id || t.transaction_id || `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      };
    } catch (error) {
      console.error('Error transforming transaction:', error, t);
      return {
        id: t.id || 'UNKNOWN',
        user_name: '-',
        user_email: '-',
        date_formatted: '-',
        amount_formatted: formatCurrency(0),
        category: 'N/A',
        status: 'UNKNOWN',
        amount: 0
      };
    }
  }).filter(t => t !== null);
};

// Fetch transactions
const fetchTransactions = async () => {
  loading.value = true;
  try {
    let res;
    try {
      res = await transactionService.getTransactions();
    } catch (e1) {
      res = await transactionService.getTransactions({ page: 1, limit: 50 });
    }

    const data = res.data;
    let rawTransactions = data.data || data || [];

    if (rawTransactions.length > 0) {
      transactions.value = transformTransactionData(rawTransactions);
    } else {
      throw new Error('No data returned from API');
    }
  } catch (e) {
    console.error('Error fetching transactions:', e);
    try {
      const sampleRes = await transactionService.getSampleTransactions();
      const sampleData = sampleRes.data.data || [];
      transactions.value = transformTransactionData(sampleData);
      toast.warning('Using sample data. API connection failed.');
    } catch (fallbackError) {
      console.error('Fallback also failed:', fallbackError);
      transactions.value = [];
      toast.error('Failed to load transactions');
    }
  } finally {
    loading.value = false;
  }
};

// Filter transactions - only show Airtime and Electricity
const filteredTransactions = computed(() => {
  let filtered = [...transactions.value];

  // Filter to only show Airtime and Electricity transactions
  filtered = filtered.filter(t => {
    const category = (t.category || '').toLowerCase();
    return category.includes('airtime') || category.includes('electricity');
  });

  // Apply search filter
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    filtered = filtered.filter(t =>
      (t.id && t.id.toLowerCase().includes(q)) ||
      (t.user_name && t.user_name.toLowerCase().includes(q)) ||
      (t.user_email && t.user_email.toLowerCase().includes(q)) ||
      (t.category && t.category.toLowerCase().includes(q))
    );
  }

  // Apply status filter
  if (statusFilter.value) {
    filtered = filtered.filter(t => (t.status || 'UNKNOWN') === statusFilter.value);
  }

  // Apply date filters
  if (startDate.value) {
    filtered = filtered.filter(t => {
      if (!t.created_at) return false;
      try {
        return new Date(t.created_at) >= new Date(startDate.value);
      } catch {
        return false;
      }
    });
  }
  if (endDate.value) {
    const endDateObj = new Date(endDate.value);
    endDateObj.setHours(23, 59, 59, 999);
    filtered = filtered.filter(t => {
      if (!t.created_at) return false;
      try {
        return new Date(t.created_at) <= endDateObj;
      } catch {
        return false;
      }
    });
  }

  return filtered;
});

// Table columns
const columns = ref([
  {
    key: 'id',
    title: 'Transaction ID',
    field: 'id',
    sortable: true,
    filterable: true,
    visible: true,
    width: '180px',
  },
  {
    key: 'date',
    title: 'Date & Time',
    field: 'created_at',
    sortable: true,
    filterable: true,
    visible: true,
    width: '200px',
  },
  {
    key: 'user',
    title: 'User',
    field: 'user_name',
    sortable: true,
    filterable: true,
    visible: true,
    width: '220px',
  },
  {
    key: 'category',
    title: 'Transaction Type',
    field: 'category',
    sortable: true,
    filterable: true,
    visible: true,
    width: '160px',
  },
  {
    key: 'amount',
    title: 'Amount',
    field: 'amount',
    sortable: true,
    filterable: true,
    visible: true,
    width: '150px',
  },
  {
    key: 'status',
    title: 'Status',
    field: 'status',
    sortable: true,
    filterable: true,
    visible: true,
    width: '130px',
  },
]);

const visibleColumns = computed(() => {
  return columns.value.filter(col => col.visible !== false);
});

// Status styling functions
const getStatusClass = (status) => {
  const statusClasses = {
    'SUCCESSFUL': 'bg-green-100 text-green-800 border border-green-200',
    'FAILED': 'bg-red-100 text-red-800 border border-red-200',
    'PENDING': 'bg-yellow-100 text-yellow-800 border border-yellow-200',
    'REVERSED': 'bg-gray-100 text-gray-800 border border-gray-200'
  };
  return statusClasses[status] || 'bg-gray-100 text-gray-800 border border-gray-200';
};

const getStatusDotClass = (status) => {
  const dotClasses = {
    'SUCCESSFUL': 'bg-green-500',
    'FAILED': 'bg-red-500',
    'PENDING': 'bg-yellow-500',
    'REVERSED': 'bg-gray-500'
  };
  return dotClasses[status] || 'bg-gray-500';
};

const refresh = () => {
  fetchTransactions();
  toast.info('Refreshing transactions...');
};


const configModal = ref<{ open: boolean; provider: (typeof providers)[0] | null }>({
  open: false,
  provider: null,
});

const logsModal = ref<{ open: boolean; provider: (typeof providers)[0] | null }>({
  open: false,
  provider: null,
});

const suspendModal = ref<{ open: boolean; provider: (typeof providers)[0] | null }>({
  open: false,
  provider: null,
});

const testConnectionModal = ref<{ open: boolean; provider: (typeof providers)[0] | null }>({
  open: false,
  provider: null,
});

const activeDropdown = ref<string | null>(null);
const buttonRefs = ref<Record<string, HTMLElement | null>>({});

const setButtonRef = (providerName: string, el: HTMLElement | Element | ComponentPublicInstance | null) => {
  if (el && el instanceof HTMLElement) {
    buttonRefs.value[providerName] = el;
  } else if (el && '$el' in el && el.$el instanceof HTMLElement) {
    buttonRefs.value[providerName] = el.$el;
  }
};

const getDropdownPosition = (providerName: string) => {
  const button = buttonRefs.value[providerName];
  if (!button) {
    return { display: 'none' };
  }
  
  const rect = button.getBoundingClientRect();
  return {
    top: `${rect.bottom + 8}px`,
    right: `${window.innerWidth - rect.right}px`,
  };
};

const toggleDropdown = (providerName: string) => {
  activeDropdown.value = activeDropdown.value === providerName ? null : providerName;
};

const handleClickOutside = (event: MouseEvent) => {
  if (activeDropdown.value) {
    const target = event.target as HTMLElement;
    const isButton = Object.values(buttonRefs.value).some((ref) => ref?.contains(target));
    const isDropdown = target.closest('[data-dropdown="true"]');
    if (!isButton && !isDropdown) {
      activeDropdown.value = null;
    }
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  fetchTransactions();
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

const openConfig = (provider: (typeof providers)[0]) => {
  configModal.value = { open: true, provider };
  activeDropdown.value = null;
};

const closeConfig = () => {
  configModal.value = { open: false, provider: null };
};

const openLogs = (provider: (typeof providers)[0]) => {
  logsModal.value = { open: true, provider };
  activeDropdown.value = null;
};

const closeLogs = () => {
  logsModal.value = { open: false, provider: null };
};

const openSuspendModal = (provider: (typeof providers)[0]) => {
  suspendModal.value = { open: true, provider };
  activeDropdown.value = null;
};

const closeSuspendModal = () => {
  suspendModal.value = { open: false, provider: null };
};

const handleSuspend = () => {
  // Handle suspend action here
  console.log('Suspending provider:', suspendModal.value.provider);
  closeSuspendModal();
  // You can add additional logic here, like updating the provider status
};

const openTestConnection = (provider: (typeof providers)[0]) => {
  testConnectionModal.value = { open: true, provider };
  activeDropdown.value = null;
};

const closeTestConnection = () => {
  testConnectionModal.value = { open: false, provider: null };
};

const handleRunTest = () => {
  // Handle run test action here
  console.log('Running connection test for provider:', testConnectionModal.value.provider);
  // You can add additional logic here, like actually running the connection test
};
</script>

<style scoped>
.input-select {
  width: 100%;
  border-radius: 999px;
  border: 1px solid #e2e8f0;
  background-color: #f8fafc;
  padding: 0.65rem 1.25rem;
  font-size: 0.9rem;
  color: #111827;
}

.input-select:focus {
  outline: none;
  border-color: #94a3b8;
  background-color: #fff;
  box-shadow: 0 0 0 2px rgba(148, 163, 184, 0.2);
}
</style>
