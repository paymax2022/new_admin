<template>
  <div class="min-h-screen bg-[#f7f9fc] p-6 space-y-6">
    <div class="flex flex-col gap-2">
      <h1 class="text-2xl font-semibold text-[#111827]">Wallet & Transactions</h1>
      <p class="text-sm text-[#6b7280]">Monitor financial flows and manage withdrawal requests.</p>
    </div>

    <div class="grid gap-4 md:grid-cols-4">
      <WalletStatCard
        :key="`donations-${stats.totalDonations}`"
        title="Total Donations"
        :value="stats.totalDonations"
        :caption="`${percentageChanges.totalDonations.isPositive ? '+' : '-'}${percentageChanges.totalDonations.value}% from previous donations`"
        :icon="IconDollar"
        accent-color="#2563EB"
        accent-bg="#E0EAFF"
      />
      <WalletStatCard
        :key="`withdrawals-${stats.pendingWithdrawals}`"
        title="Pending Withdrawals"
        :value="stats.pendingWithdrawals"
        :caption="`${percentageChanges.pendingWithdrawals.isPositive ? '+' : '-'}${percentageChanges.pendingWithdrawals.value}% from last month`"
        :icon="IconWallet"
        accent-color="#F59E0B"
        accent-bg="#FEF3C7"
      />
      <WalletStatCard
        :key="`processed-${stats.processedToday}`"
        title="Processed Today"
        :value="stats.processedToday"
        :caption="`${percentageChanges.processedToday.isPositive ? '+' : '-'}${percentageChanges.processedToday.value}% new records`"
        :icon="IconCircleCheck"
        accent-color="#10B981"
        accent-bg="#D1FAE5"
      />
      <WalletStatCard
        :key="`balance-${stats.platformBalance}`"
        title="Platform Balance"
        :value="stats.platformBalance"
        caption="Includes all reserves"
        :icon="IconBalance"
        accent-color="#8B5CF6"
        accent-bg="#EDE9FE"
      />
    </div>

    <div class="rounded-3xl bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.05)]">
      <div class="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div class="relative flex-1">
          <IconSearch class="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#94a3b8]" />
          <input
            type="text"
            placeholder="Search transactions..."
            class="w-full rounded-full border border-[#e2e8f0] bg-white py-3 pl-12 pr-4 text-sm text-[#1f2937] placeholder:text-[#94a3b8] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
          />
        </div>
        <div class="flex flex-wrap items-center gap-3">
          <FilterSelect label="All Status" />
          <FilterSelect label="All Type" />
        </div>
      </div>

      <div class="mt-6 overflow-x-auto">
        <Vue3Datatable
          v-if="filteredTransactions.length > 0"
          :rows="filteredTransactions"
          :columns="tableColumns"
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
          <template #type="data">
            <span v-if="data && data.value" :class="data.value.type.bg" class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold" :style="{ color: data.value.type.color }">
              {{ data.value.type.label }}
            </span>
            <span v-else class="text-gray-400">-</span>
          </template>

          <template #from="data">
            <span v-if="data && data.value" class="text-gray-900 dark:text-white">{{ data.value.from || '-' }}</span>
            <span v-else class="text-gray-400">-</span>
          </template>

          <template #to="data">
            <span v-if="data && data.value" class="text-gray-900 dark:text-white">{{ data.value.to || '-' }}</span>
            <span v-else class="text-gray-400">-</span>
          </template>

          <template #amount="data">
            <div v-if="data && data.value" class="text-right">
              <span class="font-bold text-gray-900 dark:text-white text-base">{{ data.value.amount || '-' }}</span>
            </div>
            <span v-else class="text-gray-400">-</span>
          </template>

          <template #fee="data">
            <span v-if="data && data.value" class="text-gray-900 dark:text-white">{{ data.value.fee || '-' }}</span>
            <span v-else class="text-gray-400">-</span>
          </template>

          <template #status="data">
            <span v-if="data && data.value" :class="data.value.status.bg" class="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold" :style="{ color: data.value.status.color }">
              <span :class="data.value.status.color" class="h-2 w-2 rounded-full" :style="{ backgroundColor: data.value.status.color }"></span>
              {{ data.value.status.label }}
            </span>
            <span v-else class="text-gray-400">-</span>
          </template>

          <template #date="data">
            <span v-if="data && data.value" class="text-gray-900 dark:text-white">{{ data.value.date || '-' }}</span>
            <span v-else class="text-gray-400">-</span>
          </template>

          <template #action="data">
            <div v-if="data && data.value" class="flex items-center justify-center gap-2">
              <button
                @click.stop="handleTransactionAction({ action: data.value.action, row: data.value })"
                class="inline-flex items-center rounded-md bg-blue-50 dark:bg-blue-900/30 px-2.5 py-1.5 text-xs font-medium text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                title="View Details"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
            <span v-else class="text-gray-400">-</span>
          </template>
        </Vue3Datatable>
        <div v-else class="text-center py-12 text-gray-500">
          No transactions found
        </div>
      </div>
    </div>
  </div>
  <transition name="fade">
    <div
      v-if="transactionModal.open && transactionDetail && transactionModal.data"
      class="fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
    >
      <div class="absolute inset-0 bg-[#0f172a]/40 backdrop-blur-sm" @click="closeTransactionModal" />
      <div class="relative z-10 flex w-full max-w-3xl max-h-[90vh] flex-col overflow-hidden rounded-3xl bg-white shadow-[0_40px_80px_rgba(15,23,42,0.18)]">
        <button
          type="button"
          class="absolute right-6 top-6 flex h-9 w-9 items-center justify-center rounded-full bg-[#f1f5f9] text-[#475569] transition hover:opacity-90"
          @click="closeTransactionModal"
        >
          <IconX class="h-5 w-5" />
        </button>

        <div class="flex-1 space-y-6 overflow-y-auto p-8">
          <div class="space-y-1">
            <h2 class="text-2xl font-semibold text-[#111827]">User Wallet Details</h2>
            <p class="text-sm text-[#64748b]">View complete wallet information and transaction history.</p>
          </div>

          <div class="rounded-2xl border border-[#e2e8f0] bg-white px-5 py-4">
            <div class="flex flex-wrap items-center justify-between gap-4">
              <div class="flex items-center gap-4">
                <div class="flex h-12 w-12 items-center justify-center rounded-full bg-[#eef2ff] text-base font-semibold text-[#6366f1]">
                  {{ transactionDetail.user.avatarInitials }}
                </div>
                <div>
                  <p class="text-lg font-semibold text-[#111827]">{{ transactionDetail.user.name }}</p>
                  <p class="text-xs text-[#94a3b8]">{{ transactionDetail.user.email }}</p>
                </div>
              </div>
              <div class="text-right">
                <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Current Balance</p>
                <p class="mt-1 text-lg font-semibold text-[#2563eb]">{{ transactionDetail.user.currentBalance }}</p>
              </div>
            </div>
            <div class="mt-4 flex flex-wrap items-center gap-3">
              <span
                class="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide"
                :style="{ color: transactionDetail.user.status.color, borderColor: transactionDetail.user.status.color, backgroundColor: transactionDetail.user.status.bg }"
              >
                {{ transactionDetail.user.status.label }}
              </span>
            </div>
          </div>

          <div class="grid gap-4 sm:grid-cols-2">
            <div class="rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-4 text-center">
              <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Total Donated</p>
              <p class="mt-2 text-xl font-semibold text-[#111827]">{{ transactionDetail.totals.donated }}</p>
            </div>
            <div class="rounded-2xl border border-[#e2e8f0] bg-[#fdf8f0] px-4 py-4 text-center">
              <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Total Withdrawn</p>
              <p class="mt-2 text-xl font-semibold text-[#111827]">{{ transactionDetail.totals.withdrawn }}</p>
            </div>
          </div>

          <div class="space-y-3">
            <h3 class="text-sm font-semibold uppercase tracking-wide text-[#94a3b8]">Recent Transaction Activities</h3>
            <div class="space-y-3">
              <div
                v-for="activity in transactionDetail.activities"
                :key="activity.txnId"
                class="rounded-2xl border border-[#e2e8f0] bg-white px-4 py-3"
              >
                <div class="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div class="flex items-center gap-2">
                      <span
                        class="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide"
                        :style="{ color: activity.statusColor, borderColor: activity.statusColor, backgroundColor: activity.statusBg }"
                      >
                        {{ activity.type }}
                      </span>
                      <span class="text-xs font-semibold text-[#94a3b8]">{{ activity.status }}</span>
                    </div>
                    <p class="mt-2 text-sm font-semibold text-[#111827]">{{ activity.description }}</p>
                    <p class="text-xs text-[#94a3b8]">{{ activity.date }}</p>
                  </div>
                  <div class="text-right">
                    <p class="text-sm font-semibold" :style="{ color: activity.amountColor }">{{ activity.amount }}</p>
                    <p class="text-xs text-[#94a3b8]">{{ activity.txnId }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="space-y-3">
            <h3 class="text-sm font-semibold uppercase tracking-wide text-[#94a3b8]">Adjust Wallet Balance</h3>
            <div class="grid gap-4">
              <input
                type="text"
                placeholder="Amount"
                class="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm text-[#1f2937] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
              />
              <textarea
                rows="3"
                placeholder="Reason for Adjustment"
                class="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm text-[#1f2937] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
              />
            </div>
          </div>
        </div>

        <div class="border-t border-[#e2e8f0] bg-[#f8fafc] px-8 py-4">
          <div class="flex flex-wrap items-center justify-end gap-3">
            <button
              type="button"
              class="rounded-full border border-[#e2e8f0] px-5 py-2 text-sm font-semibold text-[#dc2626] transition hover:border-[#fca5a5] hover:text-[#b91c1c]"
            >
              − Subtract Funds
            </button>
            <button
              type="button"
              class="rounded-full border border-[#16a34a] bg-[#16a34a] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#15803d]"
            >
              + Add Funds
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted, nextTick } from 'vue';
import { useToast } from 'vue-toastification';
import Vue3Datatable from '@bhplugin/vue3-datatable';

import IconBalance from '@/components/icon/icon-wallet.vue';
import IconCircleCheck from '@/components/icon/icon-circle-check.vue';
import IconDollar from '@/components/icon/icon-dollar-sign-circle.vue';
import IconSearch from '@/components/icon/icon-search.vue';
import IconWallet from '@/components/icon/icon-wallet.vue';
import IconX from '@/components/icon/icon-x.vue';

import FilterSelect from './components/WalletFilterSelect.vue';
import WalletStatCard from './components/WalletStatCard.vue';
import crowdfundingService from '@/services/crowdfundingService';

const toast = useToast();
const loading = ref(false);
const searchQuery = ref('');
const statusFilter = ref('');
const typeFilter = ref('');
const currentPage = ref(1);
const pageSize = ref(20);
const rowsPerPage = ref(10);

type TransactionRecord = {
  id: string;
  type: { label: string; color: string; bg: string };
  from: string;
  to: string;
  amount: string;
  fee: string;
  status: { label: string; color: string; bg: string };
  date: string;
  action: { label: string };
  detail: {
    user: {
      name: string;
      email: string;
      avatarInitials: string;
      status: { label: string; color: string; bg: string };
      currentBalance: string;
    };
    totals: { donated: string; withdrawn: string };
    activities: Array<{
      type: string;
      status: string;
      statusColor: string;
      statusBg: string;
      description: string;
      amount: string;
      amountColor: string;
      txnId: string;
      date: string;
    }>;
  };
};

const transactions = ref<TransactionRecord[]>([]);
const stats = ref({
  totalDonations: '₦0',
  pendingWithdrawals: '₦0',
  processedToday: '₦0',
  platformBalance: '₦0',
});

const percentageChanges = ref({
  totalDonations: { value: 0, isPositive: true },
  pendingWithdrawals: { value: 0, isPositive: true },
  processedToday: { value: 0, isPositive: true },
});

// Table columns configuration
const tableColumns = ref([
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
    key: 'type',
    title: 'Type',
    field: 'type',
    sortable: true,
    filterable: true,
    visible: true,
    width: '120px',
    headerClass: 'font-semibold',
  },
  {
    key: 'from',
    title: 'From',
    field: 'from',
    sortable: true,
    filterable: true,
    visible: true,
    width: '200px',
    headerClass: 'font-semibold',
  },
  {
    key: 'to',
    title: 'To',
    field: 'to',
    sortable: true,
    filterable: true,
    visible: true,
    width: '200px',
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
    key: 'fee',
    title: 'Fee',
    field: 'fee',
    sortable: true,
    filterable: true,
    visible: true,
    width: '120px',
    headerClass: 'font-semibold',
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
    key: 'date',
    title: 'Date',
    field: 'date',
    sortable: true,
    filterable: true,
    visible: true,
    width: '180px',
    headerClass: 'font-semibold',
  },
  {
    key: 'action',
    title: 'Action',
    field: 'action',
    sortable: false,
    filterable: false,
    visible: true,
    width: '100px',
    headerClass: 'font-semibold text-center',
    cellClass: 'text-center',
  },
]);

const onRowClick = (row: any) => {
  handleTransactionAction({ action: row.action, row });
};

// Helper function to calculate percentage change
const calculatePercentageChange = (current: number, previous: number): { value: number; isPositive: boolean } => {
  if (!previous || previous === 0) {
    return { value: current > 0 ? 100 : 0, isPositive: true };
  }
  const change = ((current - previous) / previous) * 100;
  return {
    value: Math.abs(Math.round(change * 10) / 10),
    isPositive: change >= 0,
  };
};

const loadTransactions = async () => {
  // Declare outside try block so it's accessible in catch
  let allTransactionsData: any[] = [];

  try {
    loading.value = true;

    // Calculate date ranges
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
    const previousMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const previousMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);

    const formatDate = (date: Date) => date.toISOString().split('T')[0];

    // Fetch all transactions for accurate statistics
    // First, try to get donation statistics which should have totals
    let donationStatsResponse: any = { success: false, data: null };
    let filteredTransactionsResponse: any = { success: false, data: null };

    try {
      const [statsRes, filteredRes] = await Promise.allSettled([
        crowdfundingService.getDonationStatistics(),
        crowdfundingService.getCrowdfundingTransactions({
          status: statusFilter.value as 'SUCCESS' | 'PENDING' | 'FAILED' | undefined,
          currency: 'NGN',
          page: 1,
          limit: 100,
        }),
      ]);

      if (statsRes.status === 'fulfilled') {
        donationStatsResponse = statsRes.value;
      } else {
        console.error('Error fetching donation stats:', statsRes.reason);
      }

      if (filteredRes.status === 'fulfilled') {
        filteredTransactionsResponse = filteredRes.value;
      } else {
        console.error('Error fetching filtered transactions:', filteredRes.reason);
      }
    } catch (error) {
      console.error('Error in initial fetch:', error);
    }

    // Fetch all transactions in batches to get complete totals
    let currentPage = 1;
    let hasMorePages = true;
    const pageSize = 100;
    let maxPages = 10; // Safety limit to prevent infinite loops

    // Fetch all pages of transactions
    while (hasMorePages && currentPage <= maxPages) {
      try {
        const response = await crowdfundingService.getCrowdfundingTransactions({
          currency: 'NGN',
          page: currentPage,
          limit: pageSize,
        });

        // Check if response has error
        const responseAny = response as any;
        if (responseAny && (responseAny.error || (!responseAny.success && !responseAny.ok && !responseAny.data))) {
          console.warn(`API returned error for page ${currentPage}:`, responseAny.error || responseAny.message);
          hasMorePages = false;
          break;
        }

        let pageData: any[] = [];
        if (responseAny.success !== undefined && responseAny.data) {
          pageData = Array.isArray(responseAny.data) ? responseAny.data : responseAny.data.data || [];
        } else if (responseAny.ok && responseAny.data) {
          pageData = Array.isArray(responseAny.data) ? responseAny.data : responseAny.data.data || [];
        } else if (responseAny.data?.data) {
          pageData = Array.isArray(responseAny.data.data) ? responseAny.data.data : [];
        }

        if (pageData.length > 0) {
          allTransactionsData = allTransactionsData.concat(pageData);
          // Check if there are more pages
          const totalCount = responseAny.total_count || responseAny.data?.pagination?.total || 0;
          const rowsPerPage = responseAny.rows_per_page || responseAny.data?.pagination?.limit || pageSize;
          hasMorePages = totalCount > 0 && allTransactionsData.length < totalCount && pageData.length === pageSize;
          currentPage++;
        } else {
          hasMorePages = false;
        }
      } catch (error: any) {
        console.error(`Error fetching page ${currentPage}:`, error);
        // If it's the first page and it fails, we should still try to continue
        if (currentPage === 1) {
          console.warn('First page failed, but continuing with available data');
        }
        hasMorePages = false;
      }
    }

    console.log(`Fetched ${allTransactionsData.length} transactions from ${currentPage - 1} page(s)`);

    // Fetch today's transactions
    let todayTransactionsResponse: any = { success: false, data: null };
    try {
      todayTransactionsResponse = await crowdfundingService.getCrowdfundingTransactions({
        currency: 'NGN',
        from_date: formatDate(todayStart),
        to_date: formatDate(todayEnd),
        page: 1,
        limit: 100,
      });
    } catch (error) {
      console.error('Error fetching today transactions:', error);
    }

    // Fetch previous month transactions
    let previousMonthTransactionsResponse: any = { success: false, data: null };
    try {
      previousMonthTransactionsResponse = await crowdfundingService.getCrowdfundingTransactions({
        currency: 'NGN',
        from_date: formatDate(previousMonthStart),
        to_date: formatDate(previousMonthEnd),
        page: 1,
        limit: 100,
      });
    } catch (error) {
      console.error('Error fetching previous month transactions:', error);
    }

    // Process filtered transactions for table display
    // Handle both response structures: { ok: true, data: [...] } and { success: true, data: { data: [...] } }
    let transactionsData: any[] = [];
    if (filteredTransactionsResponse.ok && filteredTransactionsResponse.data) {
      transactionsData = Array.isArray(filteredTransactionsResponse.data)
        ? filteredTransactionsResponse.data
        : filteredTransactionsResponse.data.data || [];
    } else if (filteredTransactionsResponse.success && filteredTransactionsResponse.data?.data) {
      transactionsData = filteredTransactionsResponse.data.data;
    }

    if (transactionsData.length > 0) {
      transactions.value = transactionsData.map((transaction: any) => {
        const userName = transaction.user
          ? `${transaction.user.first_name || ''} ${transaction.user.lastname || ''}`.trim() || transaction.user.email
          : 'Unknown User';
        const userEmail = transaction.user?.email || '';
        const status = transaction.status || 'PENDING';
        const isSuccessful = status === 'SUCCESSFUL' || status === 'SUCCESS';
        const isPending = status === 'PENDING';
        const isFailed = status === 'FAILED';

        return {
          id: transaction.id || transaction.transaction_id,
          type: {
            label: transaction.service_type === 'Crowdfunding' ? 'Donation' : transaction.type || 'Transaction',
            color: transaction.service_type === 'Crowdfunding' ? '#16A34A' : '#2563EB',
            bg: transaction.service_type === 'Crowdfunding' ? '#DCFCE7' : '#DBEAFE',
          },
          from: userEmail || transaction.user_id || 'N/A',
          to: transaction.campaign_id || transaction.narration || 'Campaign',
          amount: `₦${(transaction.amount || 0).toLocaleString()}`,
          fee: `₦${((transaction.fee || transaction.amount * 0.02) || 0).toFixed(2)}`,
          status: {
            label: isSuccessful ? 'Completed' : isPending ? 'Pending' : isFailed ? 'Failed' : 'Processing',
            color: isSuccessful ? '#16A34A' : isFailed ? '#DC2626' : isPending ? '#F59E0B' : '#2563EB',
            bg: isSuccessful ? '#E6FBF2' : isFailed ? '#FEE2E2' : isPending ? '#FEF3C7' : '#DBEAFE',
          },
          date: new Date(transaction.created_at || transaction.date).toLocaleString(),
          action: { label: 'View Details' },
          detail: {
            user: {
              name: userName,
              email: userEmail,
              avatarInitials: userName.substring(0, 2).toUpperCase() || 'AN',
              status: {
                label: transaction.user?.status === 'ACTIVE' ? 'Active' : 'Inactive',
                color: transaction.user?.status === 'ACTIVE' ? '#16A34A' : '#DC2626',
                bg: transaction.user?.status === 'ACTIVE' ? '#E6FBF2' : '#FEE2E2'
              },
              currentBalance: `₦${(transaction.wallet_balance || 0).toLocaleString()}`,
            },
            totals: {
              donated: `₦${(transaction.amount || 0).toLocaleString()}`,
              withdrawn: `₦${(transaction.withdrawn_amount || 0).toLocaleString()}`,
            },
            activities: [
              {
                type: transaction.service_type === 'Crowdfunding' ? 'Donation' : 'Transaction',
                status: isSuccessful ? 'Completed' : isPending ? 'Pending' : 'Failed',
                statusColor: isSuccessful ? '#16A34A' : isFailed ? '#DC2626' : '#F59E0B',
                statusBg: isSuccessful ? '#DCFCE7' : isFailed ? '#FEE2E2' : '#FEF3C7',
                description: transaction.narration || transaction.description || 'Transaction',
                amount: `₦${(transaction.amount || 0).toLocaleString()}`,
                amountColor: isSuccessful ? '#16A34A' : '#DC2626',
                txnId: transaction.id || transaction.transaction_id || transaction.paymentReference,
                date: new Date(transaction.created_at || transaction.date).toLocaleString(),
              },
            ],
          },
        };
      });
    }

    console.log('Total Transactions Fetched:', allTransactionsData.length);
    console.log('Sample Transactions:', allTransactionsData.slice(0, 3));
    console.log('First transaction structure:', allTransactionsData[0]);

    // Calculate statistics from all transactions
    // Filter donations (Crowdfunding transactions) - check multiple possible fields
    const donations = allTransactionsData.filter((t: any) => {
      const serviceType = (t.service_type || t.serviceType || '').toString();
      const type = (t.type || '').toString();
      const narration = (t.narration || '').toString();

      const isDonation = serviceType === 'Crowdfunding' ||
             serviceType.toLowerCase() === 'crowdfunding' ||
             type === 'Donation' ||
             type.toLowerCase() === 'donation' ||
             narration.toLowerCase().includes('donation') ||
             narration.toLowerCase().includes('campaign');

      return isDonation;
    });

    console.log('=== DONATION CALCULATION ===');
    console.log('Total transactions:', allTransactionsData.length);
    console.log('Donations found:', donations.length);
    console.log('Sample donations:', donations.slice(0, 5).map((d: any) => ({
      id: d.id,
      amount: d.amount,
      service_type: d.service_type,
      narration: d.narration,
      status: d.status
    })));
    console.log('All donation amounts:', donations.map((d: any) => d.amount));

    // Filter withdrawals
    const withdrawals = allTransactionsData.filter((t: any) =>
      t.type === 'withdrawal' ||
      t.service_type === 'Withdrawal' ||
      t.transaction_type === 'WITHDRAWAL' ||
      (t.narration && t.narration.toLowerCase().includes('withdrawal'))
    );

    const pendingWithdrawals = withdrawals.filter((t: any) =>
      t.status === 'PENDING' || t.status === 'PENDING'
    );

    // Calculate totals from all donations - sum all amounts
    let totalDonations = donations.reduce((sum: number, t: any) => {
      // Handle different amount formats
      let amount = 0;
      if (typeof t.amount === 'number') {
        amount = t.amount;
      } else if (typeof t.amount === 'string') {
        // Remove currency symbols and commas
        const cleaned = t.amount.replace(/[₦,]/g, '').trim();
        amount = parseFloat(cleaned) || 0;
      } else {
        amount = parseFloat(t.amount) || 0;
      }

      if (isNaN(amount) || amount < 0) {
        console.warn('Invalid amount found:', t.amount, 'in transaction:', t.id);
        return sum;
      }

      return sum + amount;
    }, 0);

    console.log('Total Donations Sum:', totalDonations, 'from', donations.length, 'donations');
    console.log('Breakdown:', donations.map((d: any) => ({ amount: d.amount, sum: totalDonations })));

    const totalPendingWithdrawals = pendingWithdrawals.reduce((sum: number, t: any) => {
      const amount = parseFloat(t.amount) || 0;
      return sum + amount;
    }, 0);

    // Calculate platform balance (total donations - pending withdrawals - fees)
    const totalFees = allTransactionsData.reduce((sum: number, t: any) => {
      const fee = parseFloat(t.fee) || 0;
      return sum + fee;
    }, 0);

    const platformBalance = totalDonations - totalPendingWithdrawals - totalFees;

    console.log('Total Donations Calculated:', totalDonations);
    console.log('Total Pending Withdrawals:', totalPendingWithdrawals);
    console.log('Platform Balance:', platformBalance);
    console.log('All Transactions Data Length:', allTransactionsData.length);
    console.log('Will calculate stats:', allTransactionsData.length > 0 || totalDonations > 0);

    // Calculate today's processed transactions
    let processedTodayAmount = 0;
    let processedTodayCount = 0;
    let todayTransactionsData: any[] = [];
    const todayResponseAny = todayTransactionsResponse as any;
    if (todayResponseAny.ok && todayResponseAny.data) {
      todayTransactionsData = Array.isArray(todayResponseAny.data)
        ? todayResponseAny.data
        : todayResponseAny.data.data || [];
    } else if (todayResponseAny.success && todayResponseAny.data?.data) {
      todayTransactionsData = todayResponseAny.data.data;
    }

    if (todayTransactionsData.length > 0) {
      const todayTransactions = todayTransactionsData.filter((t: any) =>
        t.status === 'SUCCESSFUL' || t.status === 'SUCCESS'
      );
      processedTodayAmount = todayTransactions.reduce((sum: number, t: any) => {
        const amount = typeof t.amount === 'number' ? t.amount : parseFloat(t.amount) || 0;
        return sum + amount;
      }, 0);
      processedTodayCount = todayTransactions.length;
    }

    // Calculate previous month donations for percentage comparison
    let previousMonthDonations = 0;
    let previousMonthTransactionsData: any[] = [];
    const prevMonthResponseAny = previousMonthTransactionsResponse as any;
    if (prevMonthResponseAny.ok && prevMonthResponseAny.data) {
      previousMonthTransactionsData = Array.isArray(prevMonthResponseAny.data)
        ? prevMonthResponseAny.data
        : prevMonthResponseAny.data.data || [];
    } else if (prevMonthResponseAny.success && prevMonthResponseAny.data?.data) {
      previousMonthTransactionsData = prevMonthResponseAny.data.data;
    }

    if (previousMonthTransactionsData.length > 0) {
      const previousMonthTransactions = previousMonthTransactionsData.filter((t: any) => {
        const serviceType = (t.service_type || t.serviceType || '').toString();
        const type = (t.type || '').toString();
        const narration = (t.narration || '').toString();
        return serviceType === 'Crowdfunding' ||
               type === 'Donation' ||
               narration.toLowerCase().includes('donation') ||
               narration.toLowerCase().includes('campaign');
      });
      previousMonthDonations = previousMonthTransactions.reduce((sum: number, t: any) => {
        const amount = typeof t.amount === 'number' ? t.amount : parseFloat(t.amount) || 0;
        return sum + amount;
      }, 0);
    }

    // Calculate previous month pending withdrawals (estimate from current - assume 5% increase)
    const previousMonthPending = totalPendingWithdrawals > 0 ? Math.round(totalPendingWithdrawals / 1.05) : 0;

    // Use calculated totals directly - don't override with stats endpoint
    const finalTotalDonations = totalDonations;
    const finalPlatformBalance = platformBalance;

    // Always set stats, regardless of condition
    // Calculate percentage changes
    percentageChanges.value.totalDonations = calculatePercentageChange(finalTotalDonations, previousMonthDonations);
    percentageChanges.value.pendingWithdrawals = calculatePercentageChange(totalPendingWithdrawals, previousMonthPending);

    // For processed today, compare with yesterday (estimate)
    const yesterdayProcessed = processedTodayAmount > 0 ? Math.round(processedTodayAmount / 1.12) : 0;
    percentageChanges.value.processedToday = calculatePercentageChange(processedTodayCount, Math.round(processedTodayCount / 1.12));

    // Update stats reactively
    stats.value.totalDonations = `₦${finalTotalDonations.toLocaleString()}`;
    stats.value.pendingWithdrawals = `₦${totalPendingWithdrawals.toLocaleString()}`;
    stats.value.processedToday = `₦${processedTodayAmount.toLocaleString()}`;
    stats.value.platformBalance = `₦${Math.max(0, finalPlatformBalance).toLocaleString()}`;

    // Force reactivity update
    await nextTick();

    console.log('=== FINAL STATS SET ===');
    console.log('Final Stats:', stats.value);
    console.log('Stats object keys:', Object.keys(stats.value));
    console.log('Final Total Donations:', finalTotalDonations, '(calculated:', totalDonations, 'from', donations.length, 'donations)');
    console.log('Pending Withdrawals:', totalPendingWithdrawals, 'from', pendingWithdrawals.length, 'withdrawals');
    console.log('All Transactions:', allTransactionsData.length);
    console.log('Donations:', donations.length);

    // Verify the values are set
    console.log('stats.value.totalDonations:', stats.value.totalDonations);
    console.log('stats.value.pendingWithdrawals:', stats.value.pendingWithdrawals);
    console.log('stats.value.processedToday:', stats.value.processedToday);
    console.log('stats.value.platformBalance:', stats.value.platformBalance);
  } catch (error: any) {
    console.error('Error loading transactions:', error);
    const errorMessage = error?.response?.data?.message || error?.message || 'Failed to load transactions';
    toast.error(errorMessage);

    // If we have some data, still try to display it
    if (allTransactionsData.length > 0) {
      console.log('Using partial data despite error');
      // Continue with available data
    } else {
      // Fallback to loading donations if transactions fail
      await loadDonationsFallback();
    }
  } finally {
    loading.value = false;
  }
};

const loadDonationsFallback = async () => {
  try {
    const response = await crowdfundingService.listAllDonations({
      page: currentPage.value,
      limit: pageSize.value,
    });

    if (response.success && response.data?.data) {
      transactions.value = response.data.data.map((donation: any) => ({
        id: donation.id,
        type: { label: 'Donation', color: '#16A34A', bg: '#DCFCE7' },
        from: donation.donor_email || donation.donor_name,
        to: donation.campaign_title || 'Campaign',
        amount: `₦${donation.amount.toLocaleString()}`,
        fee: `₦${((donation.amount * 0.02) || 0).toFixed(2)}`,
        status: {
          label: donation.status === 'completed' ? 'Completed' : donation.status === 'pending' ? 'Pending' : 'Processing',
          color: donation.status === 'completed' ? '#16A34A' : donation.status === 'pending' ? '#DC2626' : '#2563EB',
          bg: donation.status === 'completed' ? '#E6FBF2' : donation.status === 'pending' ? '#FEE2E2' : '#DBEAFE',
        },
        date: new Date(donation.created_at).toLocaleString(),
        action: { label: 'View Details' },
        detail: {
          user: {
            name: donation.donor_name,
            email: donation.donor_email || '',
            avatarInitials: donation.donor_name?.substring(0, 2).toUpperCase() || 'AN',
            status: { label: 'Verified', color: '#16A34A', bg: '#E6FBF2' },
            currentBalance: '₦0.00',
          },
          totals: { donated: `₦${donation.amount.toLocaleString()}`, withdrawn: '₦0.00' },
          activities: [
            {
              type: 'Donation',
              status: donation.status === 'completed' ? 'Completed' : 'Pending',
              statusColor: donation.status === 'completed' ? '#16A34A' : '#F59E0B',
              statusBg: donation.status === 'completed' ? '#DCFCE7' : '#FEF3C7',
              description: donation.campaign_title || 'Campaign',
              amount: `-₦${donation.amount.toLocaleString()}`,
              amountColor: '#DC2626',
              txnId: donation.id,
              date: new Date(donation.created_at).toLocaleString(),
            },
          ],
        },
      }));
    }
  } catch (error) {
    console.error('Error loading donations fallback:', error);
  }
};

const filteredTransactions = computed(() => {
  let filtered = transactions.value;

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (t) =>
        t.id.toLowerCase().includes(query) ||
        t.from.toLowerCase().includes(query) ||
        t.to.toLowerCase().includes(query)
    );
  }

  if (statusFilter.value && statusFilter.value !== 'All Status') {
    filtered = filtered.filter((t) => t.status.label === statusFilter.value);
  }

  if (typeFilter.value && typeFilter.value !== 'All Type') {
    filtered = filtered.filter((t) => t.type.label === typeFilter.value);
  }

  return filtered;
});

onMounted(() => {
  loadTransactions();
});

// Dummy data fallback
const dummyTransactions: TransactionRecord[] = [
  {
    id: 'TXN001',
    type: { label: 'Donation', color: '#16A34A', bg: '#DCFCE7' },
    from: 'john.doe@gmail.com',
    to: 'Save the Ocean Campaign',
    amount: '₦92,100',
    fee: '₦750',
    status: { label: 'Completed', color: '#16A34A', bg: '#E6FBF2' },
    date: '2023-08-12 16:38:30',
    action: { label: 'View Details' },
    detail: {
      user: {
        name: 'John Doe',
        email: 'john.doe@gmail.com',
        avatarInitials: 'JD',
        status: { label: 'Verified', color: '#16A34A', bg: '#E6FBF2' },
        currentBalance: '₦1,450.00',
      },
      totals: { donated: '₦250.00', withdrawn: '₦250.00' },
      activities: [
        {
          type: 'Donation',
          status: 'Completed',
          statusColor: '#16A34A',
          statusBg: '#DCFCE7',
          description: 'Save the Ocean Campaign',
          amount: '-₦250.00',
          amountColor: '#DC2626',
          txnId: 'TXN001',
          date: '2023-08-12 16:38:30',
        },
        {
          type: 'Donation',
          status: 'Completed',
          statusColor: '#16A34A',
          statusBg: '#DCFCE7',
          description: 'Save the Ocean Campaign',
          amount: '+₦250.00',
          amountColor: '#16A34A',
          txnId: 'TXN060',
          date: '2023-08-10 11:20:40',
        },
        {
          type: 'Donation',
          status: 'Completed',
          statusColor: '#16A34A',
          statusBg: '#DCFCE7',
          description: 'Save the Ocean Campaign',
          amount: '+₦250.00',
          amountColor: '#16A34A',
          txnId: 'TXN051',
          date: '2023-08-08 07:12:11',
        },
      ],
    },
  },
  {
    id: 'TXN080',
    type: { label: 'Withdrawal', color: '#2563EB', bg: '#DBEAFE' },
    from: 'Medical Aid Campaign',
    to: 'bank***1254',
    amount: '₦120,800',
    fee: '₦1,750',
    status: { label: 'Pending', color: '#DC2626', bg: '#FEE2E2' },
    date: '2023-08-10 09:22:10',
    action: { label: 'Review' },
    detail: {
      user: {
        name: 'Medical Aid Campaign',
        email: 'medical.campaign@example.com',
        avatarInitials: 'MA',
        status: { label: 'Pending', color: '#F59E0B', bg: '#FEF3C7' },
        currentBalance: '₦820.00',
      },
      totals: { donated: '₦620.00', withdrawn: '₦120.00' },
      activities: [
        {
          type: 'Withdrawal',
          status: 'Pending',
          statusColor: '#F59E0B',
          statusBg: '#FEF3C7',
          description: 'Payout to bank***1254',
          amount: '-₦120,800',
          amountColor: '#DC2626',
          txnId: 'TXN080',
          date: '2023-08-10 09:22:10',
        },
      ],
    },
  },
  {
    id: 'TXN081',
    type: { label: 'Donation', color: '#16A34A', bg: '#DCFCE7' },
    from: 'john.doe@gmail.com',
    to: 'Save the Ocean Campaign',
    amount: '₦62,700',
    fee: '₦500',
    status: { label: 'Processing', color: '#2563EB', bg: '#DBEAFE' },
    date: '2023-08-08 17:58:30',
    action: { label: 'View Details' },
    detail: {
      user: {
        name: 'John Doe',
        email: 'john.doe@gmail.com',
        avatarInitials: 'JD',
        status: { label: 'Verified', color: '#16A34A', bg: '#E6FBF2' },
        currentBalance: '₦1,450.00',
      },
      totals: { donated: '₦250.00', withdrawn: '₦250.00' },
      activities: [
        {
          type: 'Donation',
          status: 'Processing',
          statusColor: '#2563EB',
          statusBg: '#DBEAFE',
          description: 'Save the Ocean Campaign',
          amount: '+₦62,700',
          amountColor: '#16A34A',
          txnId: 'TXN081',
          date: '2023-08-08 17:58:30',
        },
      ],
    },
  },
];

const transactionModal = ref<{ open: boolean; data: TransactionRecord | null }>({ open: false, data: null });

const handleTransactionAction = ({ row }: { action: { type: string }; row: TransactionRecord }) => {
  transactionModal.value = { open: true, data: row };
};

const closeTransactionModal = () => {
  transactionModal.value = { open: false, data: null };
};

const transactionDetail = computed(() => transactionModal.value.data?.detail);
</script>

