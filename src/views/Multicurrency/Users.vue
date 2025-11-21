<template>
  <div class="min-h-screen bg-[#f7f9fc] p-6 space-y-8">
    <header class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div class="space-y-1">
        <h1 class="text-2xl font-semibold text-[#111827]">User Management</h1>
        <p class="text-sm text-[#6b7280]">View and manage all registered users</p>
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
          <h2 class="text-lg font-semibold text-[#111827]">All Users</h2>
          <p class="text-sm text-[#6b7280]">Total of 6 registered users</p>
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

      <div class="rounded-3xl border border-[#e2e8f0] overflow-x-auto">
        <table class="min-w-full divide-y divide-[#e2e8f0] text-sm text-[#475569]">
          <thead class="bg-[#f8fafc] text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">
            <tr>
              <th class="px-5 py-4 text-left font-semibold text-[#111827]">User</th>
              <th class="px-5 py-4 text-left">Status</th>
              <th class="px-5 py-4 text-left">KYC</th>
              <th class="px-5 py-4 text-left">Reason for suspension</th>
              <th class="px-5 py-4 text-left">Account Balance</th>
              <th class="px-5 py-4 text-left">Joined</th>
              <th class="px-5 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#e2e8f0] bg-white">
            <tr v-for="(user, index) in users" :key="user.email" class="relative hover:bg-[#f8fafc] transition">
              <td class="px-5 py-5">
                <div class="space-y-1">
                  <p class="font-semibold text-[#111827]">{{ user.name }}</p>
                  <p class="text-xs text-[#6b7280]">{{ user.email }}</p>
                </div>
              </td>
              <td class="px-5 py-5">
                <span
                  class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
                  :class="statusClasses[user.status]"
                >
                  {{ user.status }}
                </span>
              </td>
              <td class="px-5 py-5">
                <span
                  class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold capitalize"
                  :class="kycClasses[user.kyc]"
                >
                  {{ user.kyc }}
                </span>
              </td>
              <td class="px-5 py-5 text-[#94a3b8]">
                {{ user.reason || '—' }}
              </td>
              <td class="px-5 py-5">
                <div class="space-y-1">
                  <div v-for="balance in user.balances" :key="balance.currency" class="flex items-center gap-2">
                    <img
                      :src="balance.flag"
                      :alt="`${balance.currency} flag`"
                      class="h-5 w-5 rounded-full object-cover"
                    />
                    <span class="font-semibold text-[#111827]">{{ balance.amount }}</span>
                  </div>
                </div>
              </td>
              <td class="px-5 py-5 text-[#475569]">
                {{ user.joined }}
              </td>
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
                      class="absolute right-0 top-12 z-20 w-44 rounded-2xl border border-[#e2e8f0] bg-white py-2 text-left shadow-[0_20px_40px_rgba(15,23,42,0.12)]"
                    >
                      <button
                        type="button"
                        class="flex w-full items-center justify-between px-4 py-2 text-sm font-semibold text-[#475569] transition hover:bg-[#f8fafc]"
                        @click="viewUserDetails(user)"
                      >
                        View Details
                        <IconEye class="h-4 w-4 text-[#2563eb]" />
                      </button>
                      <button
                        v-if="user.status !== 'Active'"
                        type="button"
                        class="flex w-full items-center justify-between px-4 py-2 text-sm font-semibold text-[#4f46e5] transition hover:bg-[#f5f3ff]"
                        @click="openActivate(user)"
                      >
                        Activate User
                        <IconCheck class="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        class="flex w-full items-center justify-between px-4 py-2 text-sm font-semibold text-[#ef4444] transition hover:bg-[#fef2f2]"
                        @click="openSuspend(user)"
                      >
                        Suspend User
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
    </section>

    <UserDetailsModal v-if="userDetails.open && userDetails.user" :user="userDetails.user" @close="closeUserDetails" />
    <UserSuspendModal v-if="suspendModal.open && suspendModal.user" :user="suspendModal.user" @close="closeSuspend" />
    <UserActivateModal v-if="activateModal.open && activateModal.user" :user="activateModal.user" @close="closeActivate" />
  </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

import IconBan from '@/components/icon/icon-ban.vue';
import IconBellBing from '@/components/icon/icon-bell-bing.vue';
import IconCheck from '@/components/icon/icon-checks.vue';
import IconEye from '@/components/icon/icon-eye.vue';
import IconHorizontalDots from '@/components/icon/icon-horizontal-dots.vue';
import IconMessageDots from '@/components/icon/icon-message-dots.vue';
import IconSearch from '@/components/icon/icon-search.vue';
import IconUserCircle from '@/components/icon/icon-user-circle.vue';
import IconSettings from '@/components/icon/icon-settings.vue';
import IconUsersGroup from '@/components/icon/icon-users-group.vue';
import IconWallet from '@/components/icon/icon-wallet.vue';
import IconHelpCircle from '@/components/icon/icon-help-circle.vue';
import IconDollarSign from '@/components/icon/icon-dollar-sign.vue';

import UserDetailsModal from './components/UserDetailsModal.vue';
import UserSuspendModal from './components/UserSuspendModal.vue';
import UserActivateModal from './components/UserActivateModal.vue';

const statCards = [
  {
    label: 'Total Users',
    value: '12,458',
    delta: '+8.2% from last month',
    deltaColor: 'text-[#22c55e]',
    icon: IconUsersGroup,
    iconBg: '#e0f2fe',
    iconColor: '#0ea5e9',
  },
  {
    label: 'Active Users',
    value: '4',
    delta: '+12% from last month',
    deltaColor: 'text-[#22c55e]',
    icon: IconWallet,
    iconBg: '#ecfdf5',
    iconColor: '#22c55e',
  },
  {
    label: 'New Users',
    value: '3,842',
    delta: '+8.6% from last month',
    deltaColor: 'text-[#22c55e]',
    icon: IconDollarSign,
    iconBg: '#fdf4ff',
    iconColor: '#a855f7',
  },
  {
    label: 'Suspended Users',
    value: '24',
    delta: '+4.5% from last month',
    deltaColor: 'text-[#ef4444]',
    icon: IconHelpCircle,
    iconBg: '#fff7ed',
    iconColor: '#f97316',
  },
];

const statusClasses: Record<'Active' | 'Suspended' | 'Inactive', string> = {
  Active: 'bg-[#ecfdf5] text-[#16a34a]',
  Suspended: 'bg-[#fef2f2] text-[#ef4444]',
  Inactive: 'bg-[#f8fafc] text-[#64748b]',
};

const kycClasses: Record<string, string> = {
  verified: 'bg-[#ecfdf5] text-[#16a34a]',
  pending: 'bg-[#fff7ed] text-[#f97316]',
};

const openMenuIndex = ref<number | null>(null);
const userDetails = ref<{ open: boolean; user: UserRecord | null }>({ open: false, user: null });
const suspendModal = ref<{ open: boolean; user: UserRecord | null }>({ open: false, user: null });
const activateModal = ref<{ open: boolean; user: UserRecord | null }>({ open: false, user: null });

const handleClickOutside = () => {
  openMenuIndex.value = null;
};

const toggleRowMenu = (index: number) => {
  openMenuIndex.value = openMenuIndex.value === index ? null : index;
};

const viewUserDetails = (user: UserRecord) => {
  userDetails.value = { open: true, user };
  openMenuIndex.value = null;
};

const closeUserDetails = () => {
  userDetails.value = { open: false, user: null };
};

const openSuspend = (user: UserRecord) => {
  suspendModal.value = { open: true, user };
  openMenuIndex.value = null;
};

const closeSuspend = () => {
  suspendModal.value = { open: false, user: null };
};

const openActivate = (user: UserRecord) => {
  activateModal.value = { open: true, user };
  openMenuIndex.value = null;
};

const closeActivate = () => {
  activateModal.value = { open: false, user: null };
};

onMounted(() => {
  window.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  window.removeEventListener('click', handleClickOutside);
});

type UserRecord = {
  name: string;
  email: string;
  userId: string;
  status: 'Active' | 'Suspended' | 'Inactive';
  kyc: 'verified' | 'pending';
  reason: string;
  balances: { currency: string; amount: string; flag: string }[];
  joined: string;
};

const users: UserRecord[] = [
  {
    name: 'John Doe',
    email: 'john@doeexample.com',
    userId: 'UD-001',
    status: 'Active',
    kyc: 'verified',
    reason: '',
    balances: [
      { currency: 'USD', amount: 'USD: 12,450', flag: 'https://flagcdn.com/us.svg' },
      { currency: 'EUR', amount: 'EUR: 12,450', flag: 'https://flagcdn.com/eu.svg' },
    ],
    joined: '2024-06-15',
  },
  {
    name: 'John Doe',
    email: 'john@doeexample.com',
    userId: 'UD-002',
    status: 'Active',
    kyc: 'verified',
    reason: '',
    balances: [
      { currency: 'USD', amount: 'USD: 12,450', flag: 'https://flagcdn.com/us.svg' },
      { currency: 'NGN', amount: 'NGN: 12,450', flag: 'https://flagcdn.com/ng.svg' },
    ],
    joined: '2024-06-15',
  },
  {
    name: 'John Doe',
    email: 'john@doeexample.com',
    userId: 'UD-003',
    status: 'Suspended',
    kyc: 'verified',
    reason: 'Suspicious transactions',
    balances: [
      { currency: 'USD', amount: 'USD: 12,450', flag: 'https://flagcdn.com/us.svg' },
      { currency: 'EUR', amount: 'EUR: 12,450', flag: 'https://flagcdn.com/eu.svg' },
    ],
    joined: '2024-06-15',
  },
  {
    name: 'John Doe',
    email: 'john@doeexample.com',
    userId: 'UD-004',
    status: 'Inactive',
    kyc: 'verified',
    reason: '',
    balances: [
      { currency: 'USD', amount: 'USD: 12,450', flag: 'https://flagcdn.com/us.svg' },
      { currency: 'EUR', amount: 'EUR: 12,450', flag: 'https://flagcdn.com/eu.svg' },
    ],
    joined: '2024-06-15',
  },
  {
    name: 'John Doe',
    email: 'john@doeexample.com',
    userId: 'UD-005',
    status: 'Inactive',
    kyc: 'pending',
    reason: '',
    balances: [
      { currency: 'USD', amount: 'USD: 0.00', flag: 'https://flagcdn.com/us.svg' },
      { currency: 'NGN', amount: 'NGN: 0.00', flag: 'https://flagcdn.com/ng.svg' },
    ],
    joined: '2024-06-15',
  },
];
</script>

