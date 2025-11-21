<template>
  <div class="min-h-screen bg-[#f7f9fc] p-6 space-y-8">
    <header class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div class="space-y-1">
        <h1 class="text-2xl font-semibold text-[#111827]">Dashboard Overview</h1>
        <p class="text-sm text-[#6b7280]">Monitor your fintech platform's performance and key metrics</p>
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
            <p class="text-sm font-semibold text-[#6b7280] uppercase tracking-wide">{{ card.label }}</p>
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

    <section class="grid gap-6 xl:grid-cols-[2fr,1fr]">
      <div class="rounded-3xl bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.05)]">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-lg font-semibold text-[#111827]">Transaction Overview</h2>
            <p class="text-sm text-[#6b7280]">Weekly transaction volume</p>
          </div>
          <button
            type="button"
            class="rounded-full border border-[#e2e8f0] px-4 py-2 text-sm font-semibold text-[#475569] transition hover:border-[#cbd5f5] hover:text-[#1e293b]"
          >
            View report
          </button>
        </div>
        <div class="mt-6 space-y-6">
          <div class="relative overflow-hidden rounded-3xl border border-[#e2e8f0] bg-white p-6">
            <div class="grid grid-cols-7 gap-4">
              <div
                v-for="(day, index) in transactionData"
                :key="day.label"
                class="flex flex-col items-center gap-4 text-xs font-medium text-[#94a3b8]"
              >
                <div class="flex h-48 w-full items-end justify-center gap-1 rounded-2xl bg-[#f8fafc] p-2">
                  <div
                    class="w-[18%] rounded-full bg-[#2563eb]"
                    :style="{ height: `${day.fee}px` }"
                  />
                  <div
                    class="w-[18%] rounded-full bg-[#22c55e]"
                    :style="{ height: `${day.currency}px` }"
                  />
                  <div
                    class="w-[18%] rounded-full bg-[#f97316]"
                    :style="{ height: `${day.volume}px` }"
                  />
                </div>
                <span>{{ day.label }}</span>
              </div>
            </div>
          </div>
          <div class="flex items-center justify-center gap-6 text-xs font-semibold text-[#475569]">
            <div class="flex items-center gap-2">
              <span class="h-2 w-2 rounded-full bg-[#2563eb]" /> Fees
            </div>
            <div class="flex items-center gap-2">
              <span class="h-2 w-2 rounded-full bg-[#22c55e]" /> Currency
            </div>
            <div class="flex items-center gap-2">
              <span class="h-2 w-2 rounded-full bg-[#f97316]" /> Volume
            </div>
          </div>
        </div>
      </div>

      <div class="rounded-3xl bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.05)]">
        <h2 class="text-lg font-semibold text-[#111827]">Currency Distribution</h2>
        <div class="mt-6 flex flex-col items-center gap-6">
          <div
            class="relative flex h-56 w-56 items-center justify-center rounded-full text-sm font-semibold text-white"
            :style="{ background: pieBackground }"
          >
            <div class="flex h-20 w-20 items-center justify-center rounded-full bg-white text-[#111827] shadow-lg">
              USD: $75k
            </div>
          </div>
          <div class="grid gap-3 text-sm text-[#475569]">
            <div v-for="slice in currencySlices" :key="slice.label" class="flex items-center gap-3">
              <span class="h-2.5 w-2.5 rounded-full" :style="{ backgroundColor: slice.color }" />
              <div class="flex items-center gap-2">
                <span class="font-semibold text-[#111827]">{{ slice.label }}</span>
                <span class="text-[#6b7280]">{{ slice.value }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="rounded-3xl bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.05)]">
      <h2 class="text-lg font-semibold text-[#111827]">Recent Activities</h2>
      <p class="text-sm text-[#6b7280]">Latest actions across the platform</p>
      <ul class="mt-6 space-y-5">
        <li v-for="activity in recentActivities" :key="activity.id" class="flex items-center justify-between text-sm text-[#475569]">
          <div>
            <p class="font-semibold text-[#111827]">{{ activity.user }}</p>
            <p>{{ activity.action }}</p>
          </div>
          <span class="text-xs text-[#94a3b8]">{{ activity.time }}</span>
        </li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import IconBellBing from '@/components/icon/icon-bell-bing.vue';
import IconMessageDots from '@/components/icon/icon-message-dots.vue';
import IconTrendingUp from '@/components/icon/icon-trending-up.vue';
import IconUsersGroup from '@/components/icon/icon-users-group.vue';
import IconWallet from '@/components/icon/icon-wallet.vue';
import IconUserCircle from '@/components/icon/icon-user-circle.vue';
import IconHelpCircle from '@/components/icon/icon-help-circle.vue';

const statCards = [
  {
    label: 'Total Users',
    value: '12,458',
    delta: '+4.2% from last month',
    deltaColor: 'text-[#22c55e]',
    icon: IconUsersGroup,
    iconBg: '#e0f2fe',
    iconColor: '#0ea5e9',
  },
  {
    label: 'Total Transactions',
    value: '$2.4M',
    delta: '+3.2% from last month',
    deltaColor: 'text-[#22c55e]',
    icon: IconWallet,
    iconBg: '#ecfdf5',
    iconColor: '#22c55e',
  },
  {
    label: 'Active Cards',
    value: '3,842',
    delta: '+1.8% from last month',
    deltaColor: 'text-[#22c55e]',
    icon: IconTrendingUp,
    iconBg: '#fdf4ff',
    iconColor: '#a855f7',
  },
  {
    label: 'Pending Tickets',
    value: '24',
    delta: '-6% from last month',
    deltaColor: 'text-[#ef4444]',
    icon: IconHelpCircle,
    iconBg: '#fff7ed',
    iconColor: '#f97316',
  },
];

const transactionData = [
  { label: 'Mon', fee: 120, currency: 160, volume: 220 },
  { label: 'Tue', fee: 190, currency: 210, volume: 250 },
  { label: 'Wed', fee: 160, currency: 200, volume: 230 },
  { label: 'Thu', fee: 200, currency: 230, volume: 280 },
  { label: 'Fri', fee: 170, currency: 220, volume: 260 },
  { label: 'Sat', fee: 140, currency: 180, volume: 210 },
  { label: 'Sun', fee: 210, currency: 240, volume: 290 },
];

const currencySlices = [
  { label: 'USD', value: '$75k', color: '#2563eb', range: 130 },
  { label: 'EUR', value: '$55k', color: '#22c55e', range: 90 },
  { label: 'NGN', value: '$45k', color: '#f97316', range: 70 },
  { label: 'GBP', value: '$30k', color: '#facc15', range: 70 },
];

const pieBackground = computed(() => {
  let startAngle = 0;
  return `conic-gradient(${currencySlices
    .map((slice) => {
      const endAngle = startAngle + slice.range;
      const gradient = `${slice.color} ${startAngle}deg ${endAngle}deg`;
      startAngle = endAngle;
      return gradient;
    })
    .join(', ')})`;
});

const recentActivities = [
  { id: 1, user: 'John Doe', action: 'Sent USD $500 to Jane Smith', time: '2 min ago' },
  { id: 2, user: 'Alice Johnson', action: 'Created virtual USD card', time: '6 min ago' },
  { id: 3, user: 'Admin User', action: 'Created virtual USD card', time: '14 min ago' },
  { id: 4, user: 'Admin User', action: 'Converted EUR 200 to USD', time: '18 min ago' },
];
</script>

