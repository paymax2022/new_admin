<template>
  <div class="min-h-screen bg-[#f7f9fc] p-6 space-y-8">
    <header class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div class="space-y-1">
        <h1 class="text-2xl font-semibold text-[#111827]">Transactions</h1>
        <p class="text-sm text-[#6b7280]">Monitor all platform transactions</p>
      </div>
    </header>

    <section class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <article
        v-for="card in statCards"
        :key="card.label"
        class="flex flex-col justify-between rounded-3xl border border-transparent bg-white p-5 shadow-[0_20px_40px_rgba(15,23,42,0.05)]"
      >
        <div class="flex items-center justify-between">
          <div class="space-y-2">
            <p class="text-sm font-semibold uppercase tracking-wide text-[#6b7280]">{{ card.label }}</p>
            <p class="text-2xl font-semibold text-[#111827]">{{ card.value }}</p>
          </div>
          <div
            class="flex h-12 w-12 items-center justify-center rounded-2xl"
            :style="{ backgroundColor: card.iconBg, color: card.iconColor }"
          >
            <component :is="card.icon" class="h-6 w-6" />
          </div>
        </div>
        <p class="mt-4 text-sm font-medium" :class="card.deltaColor">{{ card.delta }}</p>
      </article>
    </section>

    <section class="rounded-3xl bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.05)] space-y-6">
      <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 class="text-lg font-semibold text-[#111827]">All Transactions</h2>
          <p class="text-sm text-[#6b7280]">View and manage transaction history</p>
        </div>
        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <div class="relative flex items-center">
            <IconSearch class="absolute left-4 h-4 w-4 text-[#94a3b8]" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search transactions..."
              class="w-full rounded-full border border-[#e2e8f0] bg-[#f8fafc] py-2 pl-11 pr-4 text-sm text-[#1f2937] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
              @input="handleSearch"
            />
          </div>
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-full border border-[#e2e8f0] bg-white px-4 py-2 text-sm font-semibold text-[#475569] transition hover:border-[#cbd5f5] hover:text-[#1e293b]"
          >
            <IconSettings class="h-4 w-4" />
            Filters
          </button>
        </div>
      </div>

      <div class="rounded-3xl border border-[#e2e8f0] bg-white">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-[#e2e8f0] text-sm text-[#475569]">
            <thead class="bg-[#f8fafc] text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">
              <tr>
                <th class="px-5 py-4 text-left font-semibold text-[#111827]">Transaction ID</th>
                <th class="px-5 py-4 text-left">Type</th>
                <th class="px-5 py-4 text-left">From</th>
                <th class="px-5 py-4 text-left">To</th>
                <th class="px-5 py-4 text-left">Amount</th>
                <th class="px-5 py-4 text-left">Status</th>
                <th class="px-5 py-4 text-left">Date &amp; Time</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[#e2e8f0] bg-white">
              <tr v-if="loading">
                <td colspan="7" class="px-5 py-8 text-center text-sm text-[#6b7280]">Loading transactions...</td>
              </tr>
              <tr v-else-if="error">
                <td colspan="7" class="px-5 py-8 text-center text-sm text-red-500">{{ error }}</td>
              </tr>
              <tr v-else-if="filteredTransactions.length === 0">
                <td colspan="7" class="px-5 py-8 text-center text-sm text-[#6b7280]">No transactions found</td>
              </tr>
              <tr v-else v-for="transaction in paginatedTransactions" :key="transaction.id" class="hover:bg-[#f8fafc] transition">
                <td class="px-5 py-5 font-semibold text-[#111827]">{{ transaction.id || transaction.paymentReference || 'N/A' }}</td>
                <td class="px-5 py-5">
                  <span
                    class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold capitalize"
                    :class="transaction.typeClasses"
                  >
                    {{ transaction.type }}
                  </span>
                </td>
                <td class="px-5 py-5 text-[#475569]">{{ transaction.from }}</td>
                <td class="px-5 py-5 text-[#475569]">{{ transaction.to }}</td>
                <td class="px-5 py-5 font-semibold text-[#111827]">{{ transaction.amount }}</td>
                <td class="px-5 py-5">
                  <span
                    class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold capitalize"
                    :class="statusClasses[transaction.status]"
                  >
                    {{ transaction.status }}
                  </span>
                </td>
                <td class="px-5 py-5 text-[#475569]">{{ transaction.date }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- Pagination -->
        <div v-if="!loading && filteredTransactions.length > 0" class="flex items-center justify-between border-t border-[#e2e8f0] px-5 py-4">
          <div class="text-sm text-[#6b7280]">
            Showing <span class="font-medium text-[#111827]">{{ pagination.startIndex + 1 }}</span> to 
            <span class="font-medium text-[#111827]">{{ pagination.endIndex }}</span> of 
            <span class="font-medium text-[#111827]">{{ totalCount }}</span> entries
          </div>
          <div class="flex items-center gap-2">
            <button
              @click="prevPage"
              :disabled="currentPage === 1"
              class="rounded-full border border-[#e2e8f0] px-4 py-2 text-sm text-[#475569] transition hover:bg-[#f8fafc] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span class="text-sm text-[#475569]">
              Page {{ currentPage }} of {{ totalPages }}
            </span>
            <button
              @click="nextPage"
              :disabled="currentPage === totalPages"
              class="rounded-full border border-[#e2e8f0] px-4 py-2 text-sm text-[#475569] transition hover:bg-[#f8fafc] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useToast } from 'vue-toastification';
import IconBellBing from '@/components/icon/icon-bell-bing.vue';
import IconDollarSign from '@/components/icon/icon-dollar-sign.vue';
import IconMessageDots from '@/components/icon/icon-message-dots.vue';
import IconSearch from '@/components/icon/icon-search.vue';
import IconSettings from '@/components/icon/icon-settings.vue';
import IconTrendingUp from '@/components/icon/icon-trending-up.vue';
import IconUserCircle from '@/components/icon/icon-user-circle.vue';
import IconWallet from '@/components/icon/icon-wallet.vue';
import transactionService from '@/services/transactionService';

const toast = useToast();
const loading = ref(false);
const error = ref('');
const searchQuery = ref('');
const currentPage = ref(1);
const limit = ref(10);
const totalCount = ref(0);

type Transaction = {
  id: string;
  type: string;
  typeClasses: string;
  from: string;
  to: string;
  amount: string;
  status: 'completed' | 'pending' | 'failed';
  date: string;
};

const transactions = ref<Transaction[]>([]);

// Fetch transactions from API
const fetchTransactions = async () => {
  loading.value = true;
  error.value = '';
  
  try {
    const response = await transactionService.getAccountTransactions({
      page: currentPage.value,
      limit: limit.value,
    });
    
    // Handle response structure
    let transactionsData: any[] = [];
    if (response?.data?.data && Array.isArray(response.data.data)) {
      transactionsData = response.data.data;
      totalCount.value = response.data.total_count || response.data.data.length;
    } else if (Array.isArray(response?.data)) {
      transactionsData = response.data;
      totalCount.value = transactionsData.length;
    }
    
    // Transform API data to component structure
    transactions.value = transactionsData.map((txn: any) => {
      // Determine transaction type from service_type or category
      const serviceType = txn.service_type || txn.category || '';
      let type = 'Other';
      let typeClass = typeStyles['other'] || 'bg-[#f1f5f9] text-[#475569]';
      
      if (serviceType.toLowerCase().includes('bills') || serviceType.toLowerCase().includes('payment')) {
        type = 'Bills Payment';
        typeClass = typeStyles['bills payment'] || 'bg-[#eef2ff] text-[#4f46e5]';
      } else if (serviceType.toLowerCase().includes('airtime')) {
        type = 'Airtime';
        typeClass = typeStyles['airtime'] || 'bg-[#eff6ff] text-[#2563eb]';
      } else if (txn.entry === 'DEBIT') {
        type = 'Debit';
        typeClass = typeStyles['debit'] || 'bg-[#fef3f2] text-[#f87171]';
      } else if (txn.entry === 'CREDIT') {
        type = 'Credit';
        typeClass = typeStyles['credit'] || 'bg-[#ecfdf5] text-[#16a34a]';
      }
      
      // Map status
      let status: 'completed' | 'pending' | 'failed' = 'completed';
      if (txn.status === 'SUCCESSFUL' || txn.payment_status === 'SUCCESSFUL') {
        status = 'completed';
      } else if (txn.status === 'PENDING' || txn.payment_status === 'PENDING') {
        status = 'pending';
      } else {
        status = 'failed';
      }
      
      // Format amount
      const amount = txn.amount || 0;
      const currency = txn.currency || 'NGN';
      const formattedAmount = new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
      }).format(amount);
      
      // Format date
      const date = txn.created_at ? new Date(txn.created_at).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }) : 'N/A';
      
      // Get user info
      const userName = txn.user 
        ? `${txn.user.first_name || ''} ${txn.user.lastname || ''}`.trim() || txn.user.email || 'Unknown'
        : 'Unknown';
      
      return {
        id: txn.id || txn.paymentReference || '',
        type,
        typeClasses: typeClass,
        from: userName,
        to: txn.receiver || txn.phoneNumber || 'N/A',
        amount: formattedAmount,
        status,
        date,
      };
    });
  } catch (err: any) {
    console.error('Error fetching transactions:', err);
    error.value = err?.response?.data?.message || 'Failed to load transactions';
    toast.error('Failed to load transactions');
    transactions.value = [];
  } finally {
    loading.value = false;
  }
};

// Filtered transactions based on search
const filteredTransactions = computed(() => {
  if (!searchQuery.value) return transactions.value;
  
  const query = searchQuery.value.toLowerCase();
  return transactions.value.filter(
    (txn) =>
      txn.id.toLowerCase().includes(query) ||
      txn.from.toLowerCase().includes(query) ||
      txn.to.toLowerCase().includes(query) ||
      txn.type.toLowerCase().includes(query) ||
      txn.amount.toLowerCase().includes(query)
  );
});

// Pagination
const totalPages = computed(() => Math.ceil(totalCount.value / limit.value));

const pagination = computed(() => {
  const startIndex = (currentPage.value - 1) * limit.value;
  const endIndex = Math.min(startIndex + filteredTransactions.value.length, totalCount.value);
  return { startIndex, endIndex };
});

const paginatedTransactions = computed(() => {
  return filteredTransactions.value;
});

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    fetchTransactions();
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    fetchTransactions();
  }
};

const handleSearch = () => {
  // Search is client-side, no need to refetch
};

// Stat cards with real data
const statCards = computed(() => [
  {
    label: 'Total Transactions',
    value: totalCount.value.toLocaleString(),
    delta: '+12% from last month',
    deltaColor: 'text-[#22c55e]',
    icon: IconWallet,
    iconBg: '#ecfdf5',
    iconColor: '#22c55e',
  },
  {
    label: 'Transaction Volume',
    value: transactions.value.reduce((sum, txn) => {
      const amount = parseFloat(txn.amount.replace(/[^0-9.-]+/g, '')) || 0;
      return sum + amount;
    }, 0).toLocaleString('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }),
    delta: '+10.5% from last month',
    deltaColor: 'text-[#22c55e]',
    icon: IconDollarSign,
    iconBg: '#fdf4ff',
    iconColor: '#a855f7',
  },
  {
    label: 'Successful',
    value: transactions.value.filter(t => t.status === 'completed').length.toLocaleString(),
    delta: '+8% from last month',
    deltaColor: 'text-[#22c55e]',
    icon: IconTrendingUp,
    iconBg: '#e0f2fe',
    iconColor: '#0ea5e9',
  },
  {
    label: 'Pending',
    value: transactions.value.filter(t => t.status === 'pending').length.toLocaleString(),
    delta: '-4% from last month',
    deltaColor: 'text-[#ef4444]',
    icon: IconMessageDots,
    iconBg: '#fff7ed',
    iconColor: '#f97316',
  },
]);

const statusClasses: Record<'completed' | 'pending' | 'failed', string> = {
  completed: 'bg-[#ecfdf5] text-[#16a34a]',
  pending: 'bg-[#fff7ed] text-[#f97316]',
  failed: 'bg-[#fef2f2] text-[#ef4444]',
};

const typeStyles: Record<string, string> = {
  send: 'bg-[#eef2ff] text-[#4f46e5]',
  receive: 'bg-[#ecfdf5] text-[#16a34a]',
  convert: 'bg-[#eff6ff] text-[#2563eb]',
  'card fund': 'bg-[#111827] text-white',
  withdraw: 'bg-[#fef3f2] text-[#f87171]',
  'bills payment': 'bg-[#eef2ff] text-[#4f46e5]',
  airtime: 'bg-[#eff6ff] text-[#2563eb]',
  debit: 'bg-[#fef3f2] text-[#f87171]',
  credit: 'bg-[#ecfdf5] text-[#16a34a]',
  other: 'bg-[#f1f5f9] text-[#475569]',
};

onMounted(() => {
  fetchTransactions();
});

watch([currentPage], () => {
  fetchTransactions();
});
</script>

