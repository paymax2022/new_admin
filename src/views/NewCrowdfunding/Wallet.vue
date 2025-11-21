<template>
  <div class="min-h-screen bg-[#f7f9fc] p-6 space-y-6">
    <div class="flex flex-col gap-2">
      <h1 class="text-2xl font-semibold text-[#111827]">Wallet & Transactions</h1>
      <p class="text-sm text-[#6b7280]">Monitor financial flows and manage withdrawal requests.</p>
    </div>

    <div class="grid gap-4 md:grid-cols-4">
      <WalletStatCard
        title="Total Donations"
        value="₦2,847,392"
        caption="+18% from previous donations"
        :icon="IconDollar"
        accent-color="#2563EB"
        accent-bg="#E0EAFF"
      />
      <WalletStatCard
        title="Pending Withdrawals"
        value="₦127,840"
        caption="+5% from last month"
        :icon="IconWallet"
        accent-color="#F59E0B"
        accent-bg="#FEF3C7"
      />
      <WalletStatCard
        title="Processed Today"
        value="₦45,230"
        caption="+12% new records"
        :icon="IconCircleCheck"
        accent-color="#10B981"
        accent-bg="#D1FAE5"
      />
      <WalletStatCard
        title="Platform Balance"
        value="₦892,150"
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
        <table class="min-w-full">
          <thead>
            <tr class="text-left text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">
              <th class="border-b border-[#d9e3f0] bg-white px-5 py-3">Transaction ID</th>
              <th class="border-b border-[#d9e3f0] bg-white px-5 py-3">Type</th>
              <th class="border-b border-[#d9e3f0] bg-white px-5 py-3">From</th>
              <th class="border-b border-[#d9e3f0] bg-white px-5 py-3">To</th>
              <th class="border-b border-[#d9e3f0] bg-white px-5 py-3">Amount</th>
              <th class="border-b border-[#d9e3f0] bg-white px-5 py-3">Fee</th>
              <th class="border-b border-[#d9e3f0] bg-white px-5 py-3">Status</th>
              <th class="border-b border-[#d9e3f0] bg-white px-5 py-3">Date</th>
              <th class="border-b border-[#d9e3f0] bg-white px-5 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            <TransactionRow
              v-for="transaction in transactions"
              :key="transaction.id"
              v-bind="transaction"
              @action="handleTransactionAction"
            />
          </tbody>
        </table>
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
import { computed, ref } from 'vue';

import IconBalance from '@/components/icon/icon-wallet.vue';
import IconCircleCheck from '@/components/icon/icon-circle-check.vue';
import IconDollar from '@/components/icon/icon-dollar-sign-circle.vue';
import IconSearch from '@/components/icon/icon-search.vue';
import IconWallet from '@/components/icon/icon-wallet.vue';
import IconX from '@/components/icon/icon-x.vue';

import FilterSelect from './components/WalletFilterSelect.vue';
import TransactionRow from './components/WalletTransactionRow.vue';
import WalletStatCard from './components/WalletStatCard.vue';

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

const transactions: TransactionRecord[] = [
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

