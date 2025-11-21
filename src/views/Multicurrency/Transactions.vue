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
              type="text"
              placeholder="Search users"
              class="w-full rounded-full border border-[#e2e8f0] bg-[#f8fafc] py-2 pl-11 pr-4 text-sm text-[#1f2937] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
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
              <tr v-for="transaction in transactions" :key="transaction.id" class="hover:bg-[#f8fafc] transition">
                <td class="px-5 py-5 font-semibold text-[#111827]">{{ transaction.id }}</td>
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
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import IconBellBing from '@/components/icon/icon-bell-bing.vue';
import IconDollarSign from '@/components/icon/icon-dollar-sign.vue';
import IconMessageDots from '@/components/icon/icon-message-dots.vue';
import IconSearch from '@/components/icon/icon-search.vue';
import IconSettings from '@/components/icon/icon-settings.vue';
import IconTrendingUp from '@/components/icon/icon-trending-up.vue';
import IconUserCircle from '@/components/icon/icon-user-circle.vue';
import IconWallet from '@/components/icon/icon-wallet.vue';

const statCards = [
  {
    label: 'Total Transactions',
    value: '8,642',
    delta: '+12% from last month',
    deltaColor: 'text-[#22c55e]',
    icon: IconWallet,
    iconBg: '#ecfdf5',
    iconColor: '#22c55e',
  },
  {
    label: 'Transaction Volume',
    value: '$2.4M',
    delta: '+10.5% from last month',
    deltaColor: 'text-[#22c55e]',
    icon: IconDollarSign,
    iconBg: '#fdf4ff',
    iconColor: '#a855f7',
  },
  {
    label: 'Successful',
    value: '8,398',
    delta: '+8% from last month',
    deltaColor: 'text-[#22c55e]',
    icon: IconTrendingUp,
    iconBg: '#e0f2fe',
    iconColor: '#0ea5e9',
  },
  {
    label: 'Pending',
    value: '244',
    delta: '-4% from last month',
    deltaColor: 'text-[#ef4444]',
    icon: IconMessageDots,
    iconBg: '#fff7ed',
    iconColor: '#f97316',
  },
];

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
};

const transactions = [
  {
    id: 'TXN001',
    type: 'Send',
    typeClasses: typeStyles['send'],
    from: 'John Doe',
    to: 'Jane Smith',
    amount: '$500',
    status: 'completed',
    date: '2024-09-20 14:30',
  },
  {
    id: 'TXN002',
    type: 'Receive',
    typeClasses: typeStyles['receive'],
    from: 'John Doe',
    to: 'Jane Smith',
    amount: '$200',
    status: 'pending',
    date: '2024-09-20 14:30',
  },
  {
    id: 'TXN003',
    type: 'Convert',
    typeClasses: typeStyles['convert'],
    from: 'John Doe',
    to: 'Jane Smith',
    amount: '$100',
    status: 'failed',
    date: '2024-09-20 14:30',
  },
  {
    id: 'TXN004',
    type: 'Card Fund',
    typeClasses: typeStyles['card fund'],
    from: 'John Doe',
    to: 'Jane Smith',
    amount: '$150',
    status: 'completed',
    date: '2024-09-20 14:30',
  },
  {
    id: 'TXN005',
    type: 'Withdraw',
    typeClasses: typeStyles['withdraw'],
    from: 'John Doe',
    to: 'Jane Smith',
    amount: '₦500,000',
    status: 'failed',
    date: '2024-09-20 14:30',
  },
];
</script>

