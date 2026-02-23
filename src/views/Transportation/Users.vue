<template>
  <div class="min-h-screen bg-white p-5 md:p-6">
    <div class="mx-auto max-w-[1220px] space-y-4">
      <div class="flex items-start justify-between">
        <div>
          <h1 class="text-[30px] font-semibold leading-tight text-[#0f172a]">Users Management</h1>
          <p class="mt-1 text-sm text-[#64748b]">Manage all registered users and their accounts</p>
        </div>
      </div>

      <div class="grid gap-3 md:grid-cols-3">
        <div v-for="item in stats" :key="item.label" class="rounded-lg border border-[#e5e7eb] bg-white p-5">
          <p class="text-sm text-[#64748b]">{{ item.label }}</p>
          <div class="mt-4 flex items-center justify-between">
            <p class="text-[28px] font-semibold text-[#0f172a]">{{ item.value }}</p>
            <span class="rounded-full px-3 py-1 text-xs font-medium" :class="item.tagClass">{{ item.tag }}</span>
          </div>
        </div>
      </div>

      <div class="rounded-lg border border-[#e5e7eb] bg-white">
        <div class="flex items-center gap-3 p-3">
          <div class="relative flex-1">
            <IconSearch class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94a3b8]" />
            <input
              v-model="search"
              type="text"
              placeholder="Search users"
              class="h-10 w-full rounded-md border border-[#e5e7eb] bg-white pl-9 pr-3 text-sm text-[#0f172a] outline-none transition placeholder:text-[#94a3b8] focus:border-[#cbd5e1]"
            />
          </div>
          <button class="inline-flex h-10 items-center gap-2 rounded-md border border-[#e5e7eb] px-4 text-sm text-[#475569] hover:bg-[#f8fafc]">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M3 4h18M6 12h12M10 20h4" />
            </svg>
            Filters
          </button>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full min-w-[1040px] border-collapse">
            <thead>
              <tr class="border-y border-[#e5e7eb] bg-[#fcfcfd] text-left text-xs font-semibold text-[#64748b]">
                <th class="px-4 py-3">User</th>
                <th class="px-4 py-3">Phone</th>
                <th class="px-4 py-3">Bookings</th>
                <th class="px-4 py-3">Wallet</th>
                <th class="px-4 py-3">Wallet Adjustment Reason</th>
                <th class="px-4 py-3">Status</th>
                <th class="px-4 py-3">Suspension Reason</th>
                <th class="px-4 py-3">Joined</th>
                <th class="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in filteredUsers" :key="row.id" class="border-b border-[#f1f5f9] text-sm text-[#0f172a]">
                <td class="px-4 py-3">
                  <div class="flex items-center gap-3">
                    <div class="flex h-7 w-7 items-center justify-center rounded-full bg-[#111827] text-[10px] font-semibold text-white">
                      {{ row.initials }}
                    </div>
                    <div>
                      <p class="font-medium">{{ row.name }}</p>
                      <p class="text-xs text-[#94a3b8]">{{ row.email }}</p>
                    </div>
                  </div>
                </td>
                <td class="px-4 py-3 text-[#475569]">{{ row.phone }}</td>
                <td class="px-4 py-3 text-[#475569]">{{ row.bookings }}</td>
                <td class="px-4 py-3 text-[#475569]">{{ row.wallet }}</td>
                <td class="px-4 py-3 text-[#475569]">{{ row.reason }}</td>
                <td class="px-4 py-3">
                  <span class="rounded-full px-3 py-1 text-xs font-medium" :class="row.status === 'Active' ? 'bg-[#dcfce7] text-[#16a34a]' : 'bg-[#fee2e2] text-[#dc2626]'">
                    {{ row.status }}
                  </span>
                </td>
                <td class="px-4 py-3 text-[#475569]">{{ row.suspensionReason }}</td>
                <td class="px-4 py-3 text-[#475569]">{{ row.joined }}</td>
                <td class="relative px-4 py-3 text-right">
                  <button
                    class="rounded-md p-1 text-[#64748b] hover:bg-[#f8fafc]"
                    @click.stop="toggleActions(row.id)"
                  >
                    <IconHorizontalDots class="h-4 w-4" />
                  </button>
                  <div
                    v-if="openActionId === row.id"
                    class="absolute right-4 z-20 mt-2 w-44 rounded-md border border-[#e5e7eb] bg-white p-1 shadow-lg"
                  >
                    <button
                      class="flex w-full items-center gap-2 rounded px-2 py-2 text-left text-xs text-[#334155] hover:bg-[#f8fafc]"
                      @click.stop="openUserProfile(row)"
                    >
                      <IconEye class="h-3.5 w-3.5" />
                      View Details
                    </button>
                    <button
                      class="flex w-full items-center gap-2 rounded px-2 py-2 text-left text-xs text-[#334155] hover:bg-[#f8fafc]"
                      @click.stop="openAdjustWallet(row)"
                    >
                      <IconPencil class="h-3.5 w-3.5" />
                      Adjust wallet
                    </button>
                    <button
                      class="flex w-full items-center gap-2 rounded px-2 py-2 text-left text-xs hover:bg-[#f8fafc]"
                      :class="row.status === 'Active' ? 'text-[#dc2626] hover:bg-[#fef2f2]' : 'text-[#16a34a] hover:bg-[#f0fdf4]'"
                      @click.stop="openStatusModal(row)"
                    >
                      <IconBan class="h-3.5 w-3.5" />
                      {{ row.status === 'Active' ? 'Suspend Account' : 'Activate Account' }}
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Centered user profile modal -->
    <div
      v-if="showProfileModal && selectedUser"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4"
      @click="closeUserProfile"
    >
      <div
        class="w-full max-w-2xl rounded-2xl bg-white p-6 pr-10 shadow-2xl md:p-7 md:pr-12"
        @click.stop
      >
        <div class="mb-4 flex items-start justify-between">
          <div>
            <h2 class="text-[32px] font-semibold leading-tight text-[#0f172a]">User Profile</h2>
            <p class="mt-1 text-sm text-[#475569]">View and manage user details</p>
          </div>
          <button class="rounded-md p-1 text-[#334155] hover:bg-[#f8fafc]" @click="closeUserProfile">
            <IconX class="h-6 w-6" />
          </button>
        </div>

        <div class="mb-6 flex items-center gap-8 border-b border-[#e5e7eb] text-[18px] text-[#94a3b8]">
          <button
            v-for="tab in profileTabs"
            :key="tab"
            class="pb-3 font-medium transition"
            :class="activeProfileTab === tab ? 'border-b-2 border-[#0f172a] text-[#0f172a]' : ''"
            @click="activeProfileTab = tab"
          >
            {{ tab }}
          </button>
        </div>

        <div v-if="activeProfileTab === 'Personal Information'" class="space-y-8">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="flex h-10 w-10 items-center justify-center rounded-full bg-[#111827] text-sm font-semibold text-white">
                {{ selectedUser.initials }}
              </div>
              <div>
                <p class="text-[24px] font-medium leading-tight text-[#0f172a]">{{ selectedUser.name }}</p>
                <p class="text-[16px] text-[#475569]">{{ selectedUser.email }}</p>
              </div>
            </div>
            <span
              class="rounded-full px-7 py-2 text-[20px] font-medium"
              :class="selectedUser.status === 'Active' ? 'bg-[#dcfce7] text-[#16a34a]' : 'bg-[#fee2e2] text-[#dc2626]'"
            >
              {{ selectedUser.status }}
            </span>
          </div>

          <div class="grid grid-cols-2 gap-y-8">
            <div>
              <p class="text-[16px] text-[#334155]">Phone</p>
              <p class="mt-2 text-[28px] font-medium leading-tight text-[#0f172a]">{{ selectedUser.phone }}</p>
            </div>
            <div>
              <p class="text-[16px] text-[#334155]">Member Since</p>
              <p class="mt-2 text-[28px] font-medium leading-tight text-[#0f172a]">{{ selectedUser.joined }}</p>
            </div>
            <div>
              <p class="text-[16px] text-[#334155]">Total Bookings</p>
              <p class="mt-2 text-[28px] font-medium leading-tight text-[#0f172a]">{{ selectedUser.bookings }}</p>
            </div>
            <div>
              <p class="text-[16px] text-[#334155]">Wallet Balance</p>
              <p class="mt-2 text-[28px] font-medium leading-tight text-[#0f172a]">{{ selectedUser.wallet }}</p>
            </div>
          </div>
        </div>

        <div v-else-if="activeProfileTab === 'Bookings'" class="pt-1">
          <div class="overflow-x-auto">
            <table class="w-full min-w-[620px] border-collapse">
              <thead>
                <tr class="rounded-lg bg-[#f8fafc] text-left text-sm font-medium text-[#334155]">
                  <th class="px-4 py-3 font-medium">Booking ID</th>
                  <th class="px-4 py-3 font-medium">Service</th>
                  <th class="px-4 py-3 font-medium">Date</th>
                  <th class="px-4 py-3 font-medium">Amount</th>
                  <th class="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in bookingRows"
                  :key="`${item.id}-${item.service}`"
                  class="border-b border-[#f1f5f9] text-sm text-[#334155] last:border-b-0"
                >
                  <td class="px-4 py-3">{{ item.id }}</td>
                  <td class="px-4 py-3">{{ item.service }}</td>
                  <td class="px-4 py-3">{{ item.date }}</td>
                  <td class="px-4 py-3 text-[#0f172a]">{{ item.amount }}</td>
                  <td class="px-4 py-3">
                    <span
                      class="rounded-full px-4 py-1 text-xs font-medium"
                      :class="
                        item.status === 'completed'
                          ? 'bg-[#dcfce7] text-[#16a34a]'
                          : 'bg-[#fee2e2] text-[#dc2626]'
                      "
                    >
                      {{ item.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div v-else class="pt-1">
          <div class="overflow-x-auto">
            <table class="w-full min-w-[620px] border-collapse">
              <thead>
                <tr class="rounded-lg bg-[#f8fafc] text-left text-sm font-medium text-[#334155]">
                  <th class="px-4 py-3 font-medium">Transaction ID</th>
                  <th class="px-4 py-3 font-medium">Type</th>
                  <th class="px-4 py-3 font-medium">Date</th>
                  <th class="px-4 py-3 font-medium">Amount</th>
                  <th class="px-4 py-3 font-medium">Balance</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in walletRows"
                  :key="item.id"
                  class="border-b border-[#f1f5f9] text-sm text-[#334155] last:border-b-0"
                >
                  <td class="px-4 py-3">{{ item.id }}</td>
                  <td class="px-4 py-3">{{ item.type }}</td>
                  <td class="px-4 py-3">{{ item.date }}</td>
                  <td class="px-4 py-3 font-medium" :class="item.amount.startsWith('-') ? 'text-[#dc2626]' : 'text-[#16a34a]'">
                    {{ item.amount }}
                  </td>
                  <td class="px-4 py-3 text-[#0f172a]">{{ item.balance }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Adjust wallet modal -->
    <div
      v-if="showAdjustWalletModal && selectedAdjustUser"
      class="fixed inset-0 z-[60] flex items-center justify-center bg-black/30 px-4"
      @click="closeAdjustWallet"
    >
      <div
        class="w-full max-w-md rounded-xl bg-white p-5 shadow-2xl"
        @click.stop
      >
        <div class="mb-3 flex items-start justify-between">
          <div>
            <h3 class="text-xl font-semibold text-[#0f172a]">Adjust Wallet Balance</h3>
            <p class="mt-1 text-xs text-[#64748b]">Modify the wallet balance for {{ selectedAdjustUser.name }}</p>
          </div>
          <button class="rounded-md p-1 text-[#334155] hover:bg-[#f8fafc]" @click="closeAdjustWallet">
            <IconX class="h-5 w-5" />
          </button>
        </div>

        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-[#0f172a]">{{ selectedAdjustUser.name }}</p>
              <p class="text-xs text-[#64748b]">Email: {{ selectedAdjustUser.email }}</p>
              <p class="text-xs text-[#64748b]">Wallet ID: W001</p>
            </div>
            <span
              class="rounded-full px-4 py-1 text-xs font-medium"
              :class="selectedAdjustUser.status === 'Active' ? 'bg-[#dcfce7] text-[#16a34a]' : 'bg-[#fee2e2] text-[#dc2626]'"
            >
              {{ selectedAdjustUser.status }}
            </span>
          </div>

          <div>
            <p class="text-xs text-[#64748b]">Current Balance</p>
            <p class="mt-1 text-lg font-semibold text-[#0f172a]">{{ selectedAdjustUser.wallet }}</p>
          </div>

          <div>
            <label class="mb-1 block text-xs text-[#334155]">Adjustment Type</label>
            <div class="relative">
              <select
                v-model="walletForm.adjustmentType"
                class="h-10 w-full appearance-none rounded-md border border-[#e5e7eb] bg-white px-3 pr-8 text-sm text-[#0f172a] outline-none focus:border-[#cbd5e1]"
              >
                <option disabled value="">Select adjustment type</option>
                <option value="credit">Credit</option>
                <option value="debit">Debit</option>
              </select>
              <svg class="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94a3b8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M6 9l6 6 6-6" />
              </svg>
            </div>
          </div>

          <div>
            <label class="mb-1 block text-xs text-[#334155]">Amount (₦)</label>
            <input
              v-model="walletForm.amount"
              type="text"
              placeholder="Enter Amount"
              class="h-10 w-full rounded-md border border-[#e5e7eb] px-3 text-sm text-[#0f172a] outline-none placeholder:text-[#94a3b8] focus:border-[#cbd5e1]"
            />
          </div>

          <div>
            <label class="mb-1 block text-xs text-[#334155]">Reason for Adjustment</label>
            <textarea
              v-model="walletForm.reason"
              rows="3"
              placeholder="Enter reason for balance adjustment (required for audit trail)"
              class="w-full resize-none rounded-md border border-[#e5e7eb] px-3 py-2 text-sm text-[#0f172a] outline-none placeholder:text-[#94a3b8] focus:border-[#cbd5e1]"
            ></textarea>
          </div>
        </div>

        <div class="mt-4 flex items-center justify-end gap-2">
          <button
            class="rounded-md border border-[#e5e7eb] px-4 py-2 text-sm text-[#475569] hover:bg-[#f8fafc]"
            @click="closeAdjustWallet"
          >
            Cancel
          </button>
          <button
            class="rounded-md bg-black px-4 py-2 text-sm text-white hover:bg-[#111827]"
            @click="submitAdjustWallet"
          >
            Adjust Balance
          </button>
        </div>
      </div>
    </div>

    <!-- Suspend / Activate modal -->
    <div
      v-if="showStatusModal && selectedStatusUser"
      class="fixed inset-0 z-[70] flex items-center justify-center bg-black/30 px-4"
      @click="closeStatusModal"
    >
      <div class="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl md:p-7" @click.stop>
        <div class="mb-4 flex items-start justify-between">
          <div>
            <h3 class="text-[34px] font-semibold leading-tight text-[#0f172a]">
              {{ statusModalMode === 'suspend' ? 'Suspend Driver?' : 'Activate Driver Account' }}
            </h3>
            <p class="mt-1 text-sm text-[#64748b]">
              {{
                statusModalMode === 'suspend'
                  ? 'This will suspend the user account and restrict access to all services.'
                  : 'This will activate the user account and restore full access to services.'
              }}
            </p>
          </div>
          <button class="rounded-md p-1 text-[#334155] hover:bg-[#f8fafc]" @click="closeStatusModal">
            <IconX class="h-6 w-6" />
          </button>
        </div>

        <div>
          <label class="mb-2 block text-sm text-[#334155]">
            {{ statusModalMode === 'suspend' ? 'Reason for Suspension' : 'Reason (Optional)' }}
          </label>
          <textarea
            v-model="statusReason"
            rows="4"
            :placeholder="
              statusModalMode === 'suspend'
                ? 'Please provide a reason for suspension...'
                : 'Optional reason for activating this account...'
            "
            class="w-full resize-none rounded-md border border-[#d1d5db] px-3 py-2 text-sm text-[#0f172a] outline-none placeholder:text-[#94a3b8] focus:border-[#cbd5e1]"
          ></textarea>
        </div>

        <div
          class="mt-4 flex items-center gap-3 rounded-lg px-4 py-3 text-sm"
          :class="
            statusModalMode === 'suspend'
              ? 'bg-[#fef2f2] text-[#b91c1c]'
              : 'bg-[#f0fdf4] text-[#15803d]'
          "
        >
          <svg class="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.8"
              d="M12 9v2m0 4h.01M4.93 19h14.14c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.2 16c-.77 1.33.19 3 1.73 3z"
            />
          </svg>
          <span>
            {{
              statusModalMode === 'suspend'
                ? 'Suspending this account will immediately block user access and freeze all wallet transactions.'
                : 'Activating this account will restore full access and enable all wallet functions.'
            }}
          </span>
        </div>

        <div class="mt-6 flex items-center justify-end gap-3">
          <button
            class="rounded-md border border-[#d1d5db] bg-white px-5 py-2 text-sm text-[#475569] hover:bg-[#f8fafc]"
            @click="closeStatusModal"
          >
            Cancel
          </button>
          <button
            class="rounded-md px-5 py-2 text-sm font-medium text-white"
            :class="
              statusModalMode === 'suspend'
                ? 'bg-[#f3b5bb] disabled:cursor-not-allowed disabled:opacity-80'
                : 'bg-black hover:bg-[#111827]'
            "
            :disabled="statusModalMode === 'suspend' && !statusReason.trim()"
            @click="submitStatusChange"
          >
            {{ statusModalMode === 'suspend' ? 'Suspend Driver' : 'Activate Account' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue';
import IconSearch from '@/components/icon/icon-search.vue';
import IconHorizontalDots from '@/components/icon/icon-horizontal-dots.vue';
import IconEye from '@/components/icon/icon-eye.vue';
import IconPencil from '@/components/icon/icon-pencil.vue';
import IconBan from '@/components/icon/icon-ban.vue';
import IconX from '@/components/icon/icon-x.vue';

type UserRow = {
  id: string;
  initials: string;
  name: string;
  email: string;
  phone: string;
  bookings: number;
  wallet: string;
  reason: string;
  status: 'Active' | 'Suspended';
  suspensionReason: string;
  joined: string;
};

const stats = [
  { label: 'Total Users', value: '12,543', tag: '+6.2%', tagClass: 'bg-[#e2e8f0] text-[#475569]' },
  { label: 'Active Users', value: '11,892', tag: '94.8%', tagClass: 'bg-[#dcfce7] text-[#16a34a]' },
  { label: 'Suspended Users', value: '11,892', tag: '0.7%', tagClass: 'bg-[#fee2e2] text-[#dc2626]' },
];

const rows = ref<UserRow[]>([
  { id: '1', initials: 'SJ', name: 'Sarah Johnson', email: 'sarah.j@email.com', phone: '+1 234 567 8901', bookings: 64, wallet: '₦25,000', reason: 'Technical issues', status: 'Active', suspensionReason: '—', joined: 'Jan 15, 2024' },
  { id: '2', initials: 'SJ', name: 'Sarah Johnson', email: 'sarah.j@email.com', phone: '+1 234 567 8901', bookings: 64, wallet: '₦25,000', reason: '—', status: 'Suspended', suspensionReason: 'Invalid Account', joined: '—' },
  { id: '3', initials: 'SJ', name: 'Sarah Johnson', email: 'sarah.j@email.com', phone: '+1 234 567 8901', bookings: 64, wallet: '₦25,000', reason: 'Transaction issues', status: 'Active', suspensionReason: '—', joined: 'Jan 15, 2024' },
  { id: '4', initials: 'SJ', name: 'Sarah Johnson', email: 'sarah.j@email.com', phone: '+1 234 567 8901', bookings: 64, wallet: '₦25,000', reason: '—', status: 'Active', suspensionReason: '—', joined: 'Jan 15, 2024' },
]);

const search = ref('');
const openActionId = ref<string | null>(null);
const showProfileModal = ref(false);
const showAdjustWalletModal = ref(false);
const showStatusModal = ref(false);
const selectedUser = ref<UserRow | null>(null);
const selectedAdjustUser = ref<UserRow | null>(null);
const selectedStatusUser = ref<UserRow | null>(null);
const statusModalMode = ref<'suspend' | 'activate'>('suspend');
const statusReason = ref('');
const profileTabs = ['Personal Information', 'Bookings', 'Wallet'] as const;
const activeProfileTab = ref<(typeof profileTabs)[number]>('Personal Information');
const walletForm = reactive({
  adjustmentType: '',
  amount: '',
  reason: '',
});
const bookingRows = [
  { id: 'B2847', service: 'Ride', date: 'Apr 10, 2024', amount: '₦125,000', status: 'completed' },
  { id: 'B2847', service: 'Parcel', date: 'Apr 10, 2024', amount: '₦125,000', status: 'cancelled' },
  { id: 'B2847', service: 'Vehicle Hire', date: 'Apr 10, 2024', amount: '₦125,000', status: 'completed' },
  { id: 'B2847', service: 'Bus', date: 'Apr 10, 2024', amount: '₦125,000', status: 'completed' },
];
const walletRows = [
  { id: 'T001', type: 'Wallet Top-up', date: 'Apr 10, 2024', amount: '+₦125,000', balance: '₦125,000' },
  { id: 'T002', type: 'Ride Payment', date: 'Apr 10, 2024', amount: '+₦125,000', balance: '₦125,000' },
  { id: 'T003', type: 'Refund', date: 'Apr 10, 2024', amount: '-₦125,000', balance: '₦125,000' },
  { id: 'T004', type: 'Parcel Payment', date: 'Apr 10, 2024', amount: '+₦125,000', balance: '₦125,000' },
];

const filteredUsers = computed(() => {
  const q = search.value.trim().toLowerCase();
  if (!q) return rows.value;
  return rows.value.filter((row) => {
    return (
      row.name.toLowerCase().includes(q) ||
      row.email.toLowerCase().includes(q) ||
      row.phone.toLowerCase().includes(q)
    );
  });
});

const toggleActions = (id: string) => {
  openActionId.value = openActionId.value === id ? null : id;
};

const openUserProfile = (row: UserRow) => {
  selectedUser.value = row;
  activeProfileTab.value = 'Personal Information';
  showProfileModal.value = true;
  openActionId.value = null;
};

const closeUserProfile = () => {
  showProfileModal.value = false;
};

const openAdjustWallet = (row: UserRow) => {
  selectedAdjustUser.value = row;
  walletForm.adjustmentType = '';
  walletForm.amount = '';
  walletForm.reason = '';
  showAdjustWalletModal.value = true;
  openActionId.value = null;
};

const closeAdjustWallet = () => {
  showAdjustWalletModal.value = false;
};

const submitAdjustWallet = () => {
  showAdjustWalletModal.value = false;
};

const openStatusModal = (row: UserRow) => {
  selectedStatusUser.value = row;
  statusModalMode.value = row.status === 'Active' ? 'suspend' : 'activate';
  statusReason.value = '';
  showStatusModal.value = true;
  openActionId.value = null;
};

const closeStatusModal = () => {
  showStatusModal.value = false;
};

const submitStatusChange = () => {
  if (!selectedStatusUser.value) return;
  const target = rows.value.find((item) => item.id === selectedStatusUser.value?.id);
  if (!target) return;

  if (statusModalMode.value === 'suspend') {
    target.status = 'Suspended';
    target.suspensionReason = statusReason.value.trim() || 'Suspended by admin';
  } else {
    target.status = 'Active';
    target.suspensionReason = '—';
  }

  showStatusModal.value = false;
};

const handleOutsideClick = () => {
  openActionId.value = null;
};

onMounted(() => {
  window.addEventListener('click', handleOutsideClick);
});

onBeforeUnmount(() => {
  window.removeEventListener('click', handleOutsideClick);
});
</script>
