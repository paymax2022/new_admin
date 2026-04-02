<template>
  <div class="min-h-screen bg-[#f7f9fc] p-6 space-y-8">
    <header class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div class="space-y-1">
        <h1 class="text-2xl font-semibold text-[#111827]">User Management</h1>
        <p class="text-sm text-[#6b7280]">View and manage card customers (multicurrency users)</p>
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
          <h2 class="text-lg font-semibold text-[#111827]">Card Customers</h2>
          <p class="text-sm text-[#6b7280]">Total of {{ totalCount }} card customers</p>
        </div>
        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <div class="relative flex items-center">
            <IconSearch class="absolute left-4 h-4 w-4 text-[#94a3b8]" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search by name or email"
              class="w-full rounded-full border border-[#e2e8f0] bg-[#f8fafc] py-2 pl-11 pr-4 text-sm text-[#1f2937] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
            />
          </div>
          <select
            v-model="statusFilter"
            class="rounded-full border border-[#e2e8f0] bg-white px-4 py-2 text-sm font-semibold text-[#475569] focus:border-[#2563eb] focus:outline-none"
            @change="onStatusFilterChange"
          >
            <option value="">All statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div class="rounded-3xl border border-[#e2e8f0] overflow-x-auto">
        <table class="min-w-full divide-y divide-[#e2e8f0] text-sm text-[#475569]">
          <thead class="bg-[#f8fafc] text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">
            <tr>
              <th class="px-5 py-4 text-left font-semibold text-[#111827]">User</th>
              <th class="px-5 py-4 text-left">Status</th>
              <th class="px-5 py-4 text-left">Provider</th>
              <th class="px-5 py-4 text-left">User type</th>
              <th class="px-5 py-4 text-left">Joined</th>
              <th class="px-5 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#e2e8f0] bg-white">
            <tr v-if="loading">
              <td colspan="6" class="px-5 py-8 text-center text-sm text-[#6b7280]">Loading card customers...</td>
            </tr>
            <tr v-else-if="error">
              <td colspan="6" class="px-5 py-8 text-center text-sm text-red-500">{{ error }}</td>
            </tr>
            <tr v-else-if="filteredUsers.length === 0">
              <td colspan="6" class="px-5 py-8 text-center text-sm text-[#6b7280]">No card customers found</td>
            </tr>
            <tr
              v-else
              v-for="(user, index) in filteredUsers"
              :key="user.id"
              class="relative hover:bg-[#f8fafc] transition"
            >
              <td class="px-5 py-5">
                <div class="space-y-1">
                  <p class="font-semibold text-[#111827]">{{ user.name }}</p>
                  <p class="text-xs text-[#6b7280]">{{ user.email }}</p>
                </div>
              </td>
              <td class="px-5 py-5">
                <span
                  class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
                  :class="statusClasses[user.status] || 'bg-[#f8fafc] text-[#64748b]'"
                >
                  {{ user.status }}
                </span>
              </td>
              <td class="px-5 py-5 text-[#475569] capitalize">{{ user.provider || '—' }}</td>
              <td class="px-5 py-5 text-[#475569]">{{ user.userType || user.role || '—' }}</td>
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
                      class="absolute right-0 top-12 z-[9999] w-44 rounded-2xl border border-[#e2e8f0] bg-white py-2 text-left shadow-[0_20px_40px_rgba(15,23,42,0.12)]"
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
                        v-if="user.status !== 'ACTIVE'"
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

      <div
        v-if="totalCount > 0"
        class="flex flex-wrap items-center justify-between gap-4 border-t border-[#e2e8f0] pt-4"
      >
        <p class="text-sm text-[#6b7280]">
          Showing {{ (currentPage - 1) * rowsPerPage + 1 }}–{{ Math.min(currentPage * rowsPerPage, totalCount) }} of
          {{ totalCount }}
        </p>
        <div class="flex items-center gap-2">
          <button
            type="button"
            class="rounded-full border border-[#e2e8f0] bg-white px-4 py-2 text-sm font-semibold text-[#475569] transition hover:border-[#cbd5f5] disabled:opacity-50"
            :disabled="currentPage <= 1"
            @click="goToPage(currentPage - 1)"
          >
            Previous
          </button>
          <button
            type="button"
            class="rounded-full border border-[#e2e8f0] bg-white px-4 py-2 text-sm font-semibold text-[#475569] transition hover:border-[#cbd5f5] disabled:opacity-50"
            :disabled="currentPage >= totalPages"
            @click="goToPage(currentPage + 1)"
          >
            Next
          </button>
        </div>
      </div>
    </section>

    <UserDetailsModal v-if="userDetails.open && userDetails.user" :user="userDetails.user" @close="closeUserDetails" />
    <UserSuspendModal v-if="suspendModal.open && suspendModal.user" :user="suspendModal.user" @close="closeSuspend" />
    <UserActivateModal v-if="activateModal.open && activateModal.user" :user="activateModal.user" @close="closeActivate" />
  </div>
</template>

<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

import IconBan from '@/components/icon/icon-ban.vue';
import IconCheck from '@/components/icon/icon-checks.vue';
import IconEye from '@/components/icon/icon-eye.vue';
import IconHorizontalDots from '@/components/icon/icon-horizontal-dots.vue';
import IconSearch from '@/components/icon/icon-search.vue';
import IconUsersGroup from '@/components/icon/icon-users-group.vue';
import IconWallet from '@/components/icon/icon-wallet.vue';
import IconHelpCircle from '@/components/icon/icon-help-circle.vue';
import IconDollarSign from '@/components/icon/icon-dollar-sign.vue';
import currencyService from '@/services/currencyService';

import UserDetailsModal from './components/UserDetailsModal.vue';
import UserSuspendModal from './components/UserSuspendModal.vue';
import UserActivateModal from './components/UserActivateModal.vue';

type UserRecord = {
  id: string;
  name: string;
  email: string;
  userId: string;
  status: string;
  provider?: string;
  userType?: string;
  role?: string;
  joined: string;
  balances?: { currency: string; amount: string; flag: string }[];
};

const loading = ref(false);
const error = ref('');
const users = ref<UserRecord[]>([]);
const totalCount = ref(0);
const currentPage = ref(1);
const rowsPerPage = 10;
const statusFilter = ref('active');
const searchQuery = ref('');

const totalPages = computed(() => Math.max(1, Math.ceil(totalCount.value / rowsPerPage)));

const statCards = computed(() => [
  {
    label: 'Total Card Customers',
    value: totalCount.value.toLocaleString(),
    delta: 'Card customers with virtual cards',
    deltaColor: 'text-[#6b7280]',
    icon: IconUsersGroup,
    iconBg: '#e0f2fe',
    iconColor: '#0ea5e9',
  },
  {
    label: 'Active',
    value: statusFilter.value === 'active' ? users.value.length.toString() : '—',
    delta: statusFilter.value === 'active' ? 'Currently viewing' : 'Use filter',
    deltaColor: 'text-[#22c55e]',
    icon: IconWallet,
    iconBg: '#ecfdf5',
    iconColor: '#22c55e',
  },
  {
    label: 'This page',
    value: users.value.length.toString(),
    delta: `Page ${currentPage.value} of ${totalPages.value}`,
    deltaColor: 'text-[#6b7280]',
    icon: IconDollarSign,
    iconBg: '#fdf4ff',
    iconColor: '#a855f7',
  },
  {
    label: 'Suspended',
    value: '—',
    delta: 'Filter by status to see counts',
    deltaColor: 'text-[#6b7280]',
    icon: IconHelpCircle,
    iconBg: '#fff7ed',
    iconColor: '#f97316',
  },
]);

const statusClasses: Record<string, string> = {
  ACTIVE: 'bg-[#ecfdf5] text-[#16a34a]',
  Active: 'bg-[#ecfdf5] text-[#16a34a]',
  active: 'bg-[#ecfdf5] text-[#16a34a]',
  Suspended: 'bg-[#fef2f2] text-[#ef4444]',
  SUSPENDED: 'bg-[#fef2f2] text-[#ef4444]',
  Inactive: 'bg-[#f8fafc] text-[#64748b]',
  INACTIVE: 'bg-[#f8fafc] text-[#64748b]',
  inactive: 'bg-[#f8fafc] text-[#64748b]',
};

function formatDate(iso: string | undefined): string {
  if (!iso) return '—';
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  } catch {
    return iso;
  }
}

function mapCardCustomerToUser(row: {
  id: string;
  user_id?: string;
  provider?: string;
  status?: string;
  createdAt?: string;
  user?: {
    first_name?: string;
    lastname?: string;
    email?: string;
    id?: string;
    role?: string;
    userType?: string;
    status?: string;
  };
}): UserRecord {
  const u = row.user || {};
  const name = [u.first_name, u.lastname].filter(Boolean).join(' ').trim() || '—';
  return {
    id: row.id,
    name,
    email: u.email || '—',
    userId: u.id || row.user_id || row.id,
    status: u.status ?? row.status ?? '—',
    provider: row.provider,
    userType: u.userType,
    role: u.role,
    joined: formatDate(row.createdAt),
    balances: [], // API does not return balances; details modal shows empty section
  };
}

async function fetchCardCustomers() {
  loading.value = true;
  error.value = '';
  try {
    const res = await currencyService.getCardCustomers({
      page: currentPage.value,
      limit: rowsPerPage,
      status: statusFilter.value || undefined,
    });
    const data = res?.data;
    if (data?.ok && Array.isArray(data.data)) {
      users.value = data.data.map(mapCardCustomerToUser);
      totalCount.value = typeof data.total_count === 'number' ? data.total_count : data.data.length;
    } else {
      users.value = [];
      totalCount.value = 0;
    }
  } catch (e: unknown) {
    const msg = e && typeof e === 'object' && 'message' in e ? String((e as { message: unknown }).message) : 'Failed to load card customers';
    error.value = msg;
    users.value = [];
    totalCount.value = 0;
  } finally {
    loading.value = false;
  }
}

const filteredUsers = computed(() => {
  const q = searchQuery.value.trim().toLowerCase();
  if (!q) return users.value;
  return users.value.filter(
    (u) =>
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q)
  );
});

function goToPage(page: number) {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
  fetchCardCustomers();
}

function onStatusFilterChange() {
  currentPage.value = 1;
  fetchCardCustomers();
}

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
  fetchCardCustomers();
});

onBeforeUnmount(() => {
  window.removeEventListener('click', handleClickOutside);
});
</script>

