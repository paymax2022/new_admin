<template>
  <div class="min-h-screen bg-[#f7f9fc] p-6 space-y-8">
    <header class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div class="space-y-1">
        <h1 class="text-2xl font-semibold text-[#111827]">Virtual Cards</h1>
        <p class="text-sm text-[#6b7280]">Manage all virtual USD cards</p>
      </div>
    </header>

    <section class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
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
          <h2 class="text-lg font-semibold text-[#111827]">All Virtual Cards</h2>
          <p class="text-sm text-[#6b7280]">View and manage virtual card details</p>
        </div>
        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <div class="relative flex items-center">
            <IconSearch class="absolute left-4 h-4 w-4 text-[#94a3b8]" />
            <input
              type="text"
              placeholder="Search by name"
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
                <th class="px-5 py-4 text-left font-semibold text-[#111827]">Card ID</th>
                <th class="px-5 py-4 text-left">User</th>
                <th class="px-5 py-4 text-left">Card Number</th>
                <th class="px-5 py-4 text-left">Balance</th>
                <th class="px-5 py-4 text-left">Status</th>
                <th class="px-5 py-4 text-left">Created</th>
                <th class="px-5 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[#e2e8f0] bg-white">
              <tr v-for="(card, index) in cards" :key="card.id" class="relative hover:bg-[#f8fafc] transition">
                <td class="px-5 py-5 font-semibold text-[#111827]">{{ card.id }}</td>
                <td class="px-5 py-5 text-[#475569]">{{ card.user }}</td>
                <td class="px-5 py-5 text-[#475569]">{{ card.masked }}</td>
                <td class="px-5 py-5 font-semibold text-[#111827]">{{ card.balance }}</td>
                <td class="px-5 py-5">
                  <span
                    class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold capitalize"
                    :class="statusClasses[card.status]"
                  >
                    {{ card.status }}
                  </span>
                </td>
                <td class="px-5 py-5 text-[#475569]">{{ card.created }}</td>
                <td class="px-5 py-5 text-right">
                  <div class="relative inline-flex">
                    <button
                      type="button"
                      class="flex h-9 w-9 items-center justify-center rounded-full border border-[#e2e8f0] text-[#475569] transition hover:border-[#cbd5f5]"
                      @click.stop="toggleRowMenu(index)"
                    >
                      <IconHorizontalDots class="h-5 w-5" />
                    </button>
                    <transition name="fade">
                      <div
                        v-if="openMenuIndex === index"
                        class="absolute right-0 top-12 z-20 w-40 rounded-2xl border border-[#e2e8f0] bg-white py-2 text-left shadow-[0_20px_40px_rgba(15,23,42,0.12)]"
                      >
                        <button
                          type="button"
                          class="flex w-full items-center justify-between px-4 py-2 text-sm font-semibold text-[#475569] transition hover:bg-[#f8fafc]"
                          @click="openDetails(card)"
                        >
                          View Details
                          <IconEye class="h-4 w-4 text-[#2563eb]" />
                        </button>
                        <button
                          type="button"
                          class="flex w-full items-center justify-between px-4 py-2 text-sm font-semibold text-[#ef4444] transition hover:bg-[#fef2f2]"
                          @click="openSuspend(card)"
                        >
                          Suspend Card
                          <IconBan class="h-4 w-4" />
                        </button>
                      </div>
                    </transition>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <VirtualCardDetailsModal 
      v-if="detailsModal.open && detailsModal.card" 
      :card="{
        ...detailsModal.card,
        status: detailsModal.card.status as 'active' | 'suspended' | 'frozen'
      }" 
      @close="closeDetails" 
    />
    <VirtualCardSuspendModal v-if="suspendModal.open && suspendModal.card" :card="suspendModal.card" @close="closeSuspend" />
  </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

import IconBan from '@/components/icon/icon-ban.vue';
import IconBellBing from '@/components/icon/icon-bell-bing.vue';
import IconCreditCard from '@/components/icon/icon-credit-card.vue';
import IconEye from '@/components/icon/icon-eye.vue';
import IconHorizontalDots from '@/components/icon/icon-horizontal-dots.vue';
import IconMessageDots from '@/components/icon/icon-message-dots.vue';
import IconSearch from '@/components/icon/icon-search.vue';
import IconSettings from '@/components/icon/icon-settings.vue';
import IconTrendingUp from '@/components/icon/icon-trending-up.vue';
import IconUserCircle from '@/components/icon/icon-user-circle.vue';
import IconWallet from '@/components/icon/icon-wallet.vue';

import VirtualCardDetailsModal from './components/VirtualCardDetailsModal.vue';
import VirtualCardSuspendModal from './components/VirtualCardSuspendModal.vue';

const statCards = [
  {
    label: 'Total Cards',
    value: '8,642',
    delta: '+12% from last month',
    deltaColor: 'text-[#22c55e]',
    icon: IconCreditCard,
    iconBg: '#eef2ff',
    iconColor: '#4f46e5',
  },
  {
    label: 'Active Cards',
    value: '$2.4M',
    delta: '+10.5% from last month',
    deltaColor: 'text-[#22c55e]',
    icon: IconTrendingUp,
    iconBg: '#ecfdf5',
    iconColor: '#22c55e',
  },
  {
    label: 'Total Fees Collected',
    value: '$14',
    delta: '+$2 from last month',
    deltaColor: 'text-[#22c55e]',
    icon: IconWallet,
    iconBg: '#fdf4ff',
    iconColor: '#a855f7',
  },
];

const statusClasses: Record<'active' | 'suspended' | 'frozen', string> = {
  active: 'bg-[#ecfdf5] text-[#16a34a]',
  suspended: 'bg-[#fef2f2] text-[#ef4444]',
  frozen: 'bg-[#f8fafc] text-[#64748b]',
};

const openMenuIndex = ref<number | null>(null);
const detailsModal = ref<{ open: boolean; card: (typeof cards)[number] | null }>({ open: false, card: null });
const suspendModal = ref<{ open: boolean; card: (typeof cards)[number] | null }>({ open: false, card: null });

const handleClickOutside = () => {
  openMenuIndex.value = null;
};

const toggleRowMenu = (index: number) => {
  openMenuIndex.value = openMenuIndex.value === index ? null : index;
};

const openDetails = (card: (typeof cards)[number]) => {
  detailsModal.value = { open: true, card };
  openMenuIndex.value = null;
};

const closeDetails = () => {
  detailsModal.value = { open: false, card: null };
};

const openSuspend = (card: (typeof cards)[number]) => {
  suspendModal.value = { open: true, card };
  openMenuIndex.value = null;
};

const closeSuspend = () => {
  suspendModal.value = { open: false, card: null };
};

onMounted(() => window.addEventListener('click', handleClickOutside));
onBeforeUnmount(() => window.removeEventListener('click', handleClickOutside));

const cards = [
  {
    id: 'CARD001',
    user: 'John Doe',
    masked: '**** **** **** 1234',
    balance: '$480',
    status: 'active',
    created: '2024-01-20',
    fees: '$150',
  },
  {
    id: 'CARD002',
    user: 'John Doe',
    masked: '**** **** **** 1234',
    balance: '$450',
    status: 'suspended',
    created: '2024-01-20',
    fees: '$150',
  },
  {
    id: 'CARD003',
    user: 'John Doe',
    masked: '**** **** **** 1234',
    balance: '$490',
    status: 'active',
    created: '2024-01-20',
    fees: '$150',
  },
  {
    id: 'CARD004',
    user: 'John Doe',
    masked: '**** **** **** 1234',
    balance: '$480',
    status: 'active',
    created: '2024-01-20',
    fees: '$150',
  },
  {
    id: 'CARD005',
    user: 'John Doe',
    masked: '**** **** **** 1234',
    balance: '$480',
    status: 'frozen',
    created: '2024-01-22',
    fees: '$150',
  },
];
</script>

