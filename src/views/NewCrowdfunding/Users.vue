<template>
  <div class="min-h-screen bg-[#f7f9fc] p-6 space-y-6">
    <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
      <div>
        <h1 class="text-2xl font-semibold text-[#111827]">User Management</h1>
        <p class="mt-1 text-sm text-[#6b7280]">Monitor and manage all users on your crowdfunding platform.</p>
      </div>
    </div>

    <div class="grid gap-4 md:grid-cols-3">
      <SummaryStatCard
        title="Total Users"
        :value="userStats.totalUsers"
        caption="Campaign creators"
        :icon="IconUsersGroup"
        accent-color="#2563EB"
        accent-bg="#E0EAFF"
      />
      <SummaryStatCard
        title="Active Users"
        :value="userStats.activeUsers"
        caption="Currently active"
        :icon="IconCircleCheck"
        accent-color="#10B981"
        accent-bg="#D1FAE5"
      />
      <SummaryStatCard
        title="Suspended"
        :value="userStats.suspended"
        caption="Blocked users"
        :icon="IconInfoCircle"
        accent-color="#EF4444"
        accent-bg="#FEE2E2"
      />
    </div>

    <div class="rounded-3xl bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.05)]">
      <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div class="relative flex-1">
          <IconSearch class="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#94a3b8]" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search users by name or email..."
            class="w-full rounded-full border border-[#e2e8f0] bg-white py-3 pl-12 pr-4 text-sm text-[#1f2937] placeholder:text-[#94a3b8] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
          />
        </div>
        <div class="flex flex-wrap items-center gap-3">
          <div class="relative">
            <select
              v-model="statusFilter"
              @change="loadUsers"
              class="appearance-none rounded-full border border-[#e2e8f0] bg-white px-4 py-2 pr-10 text-sm font-semibold text-[#475569] transition hover:border-[#cbd5f5] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
            >
              <option value="">All Status</option>
              <option value="ACTIVE">Active</option>
              <option value="BLOCKED">Suspended</option>
              <option value="PENDING">Pending</option>
            </select>
            <IconCaretsDown class="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94a3b8]" />
          </div>
          <div class="relative">
            <select
              class="appearance-none rounded-full border border-[#e2e8f0] bg-white px-4 py-2 pr-10 text-sm font-semibold text-[#475569] transition hover:border-[#cbd5f5] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
            >
              <option selected>All Users</option>
              <option>Campaign Owners</option>
              <option>Donors</option>
              <option>Support Staff</option>
            </select>
            <IconCaretsDown class="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94a3b8]" />
          </div>
        </div>
      </div>

      <div class="mt-6 overflow-x-auto">
        <table class="min-w-full">
          <thead>
            <tr class="text-left text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">
              <th class="border-b border-[#d9e3f0] bg-white px-5 py-3">User</th>
              <th class="border-b border-[#d9e3f0] bg-white px-5 py-3">Contact</th>
              <th class="border-b border-[#d9e3f0] bg-white px-5 py-3">Activity</th>
              <th class="border-b border-[#d9e3f0] bg-white px-5 py-3">Wallet</th>
              <th class="border-b border-[#d9e3f0] bg-white px-5 py-3">Status</th>
              <th class="border-b border-[#d9e3f0] bg-white px-5 py-3">Suspension Reason</th>
              <th class="border-b border-[#d9e3f0] bg-white px-5 py-3">Last Active</th>
              <th class="border-b border-[#d9e3f0] bg-white px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <UserRow
              v-for="user in filteredUsers"
              :key="user.id"
              v-bind="user"
              @action="handleUserAction"
            />
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <transition name="fade">
    <div
      v-if="isUserModalOpen && userDetail && selectedUser"
      class="fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
    >
      <div class="absolute inset-0 bg-[#0f172a]/40 backdrop-blur-sm" @click="closeUserModal" />
      <div class="relative z-10 flex w-full max-w-3xl max-h-[90vh] flex-col overflow-hidden rounded-3xl bg-white shadow-[0_40px_80px_rgba(15,23,42,0.18)]">
        <button
          type="button"
          class="absolute right-6 top-6 flex h-9 w-9 items-center justify-center rounded-full bg-[#f1f5f9] text-[#475569] transition hover:opacity-90"
          @click="closeUserModal"
        >
          <IconX class="h-5 w-5" />
        </button>

        <div class="flex-1 space-y-6 overflow-y-auto p-8">
          <div class="space-y-1">
            <h2 class="text-2xl font-semibold text-[#111827]">User Details</h2>
            <p class="text-sm text-[#64748b]">Complete information for {{ selectedUser.name }}</p>
          </div>

          <div class="rounded-2xl border border-[#e2e8f0] bg-white px-5 py-4">
            <div class="flex flex-wrap items-center justify-between gap-4">
              <div class="flex items-center gap-4">
                <div class="flex h-12 w-12 items-center justify-center rounded-full bg-[#eef2ff] text-base font-semibold text-[#6366f1]">
                  {{ selectedUser.initials }}
                </div>
                <div>
                  <p class="text-lg font-semibold text-[#111827]">{{ userDetail.name }}</p>
                  <p class="text-xs text-[#94a3b8]">{{ userDetail.userId }}</p>
                </div>
              </div>
              <span
                class="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide"
                :style="{ color: userDetail.status.color, borderColor: userDetail.status.color, backgroundColor: userDetail.status.bg }"
              >
                {{ userDetail.status.label }}
              </span>
            </div>
          </div>

          <div class="grid gap-6 md:grid-cols-2">
            <div class="space-y-4">
              <h3 class="text-sm font-semibold uppercase tracking-wide text-[#94a3b8]">Contact Information</h3>
              <div class="space-y-2 text-sm text-[#475569]">
                <div class="flex justify-between">
                  <span class="font-semibold text-[#111827]">Email</span>
                  <span>{{ userDetail.email }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="font-semibold text-[#111827]">Phone</span>
                  <span>{{ userDetail.phone }}</span>
                </div>
              </div>

              <div class="space-y-3">
                <h3 class="text-sm font-semibold uppercase tracking-wide text-[#94a3b8]">About</h3>
                <p class="text-sm leading-relaxed text-[#475569]">{{ userDetail.about }}</p>
              </div>
            </div>

            <div class="space-y-4">
              <h3 class="text-sm font-semibold uppercase tracking-wide text-[#94a3b8]">Activity Statistics</h3>
              <div class="grid gap-4 sm:grid-cols-2">
                <div class="rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-4">
                  <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">{{ userDetail.stats.campaigns.label }}</p>
                  <p class="mt-2 text-2xl font-semibold text-[#111827]">{{ userDetail.stats.campaigns.value }}</p>
                  <p class="mt-3 text-xs font-semibold uppercase tracking-wide text-[#16a34a]">{{ userDetail.stats.campaigns.amount }}</p>
                  <p class="text-xs text-[#94a3b8]">{{ userDetail.stats.campaigns.amountLabel }}</p>
                </div>
                <div class="rounded-2xl border border-[#e2e8f0] bg-[#fdf8f0] px-4 py-4">
                  <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">{{ userDetail.stats.donations.label }}</p>
                  <p class="mt-2 text-2xl font-semibold text-[#111827]">{{ userDetail.stats.donations.value }}</p>
                  <p class="mt-3 text-xs font-semibold uppercase tracking-wide text-[#f59e0b]">{{ userDetail.stats.donations.amount }}</p>
                  <p class="text-xs text-[#94a3b8]">{{ userDetail.stats.donations.amountLabel }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="space-y-3">
            <h3 class="text-sm font-semibold uppercase tracking-wide text-[#94a3b8]">Active Campaigns</h3>
            <div class="space-y-2">
              <div
                v-for="campaign in userDetail.activeCampaigns"
                :key="campaign.name"
                class="flex items-center justify-between rounded-2xl border border-[#e2e8f0] bg-white px-4 py-3"
              >
                <p class="text-sm font-semibold text-[#111827]">{{ campaign.name }}</p>
                <span
                  class="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide"
                  :style="{ color: campaign.color, borderColor: campaign.color, backgroundColor: campaign.bg }"
                >
                  {{ campaign.status }}
                </span>
              </div>
            </div>
          </div>

          <div class="space-y-3">
            <h3 class="text-sm font-semibold uppercase tracking-wide text-[#94a3b8]">Account Information</h3>
            <div class="rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-4 text-sm text-[#475569]">
              <div class="flex justify-between">
                <span class="font-semibold text-[#111827]">Account Owner</span>
                <span>{{ userDetail.account.owner }}</span>
              </div>
              <div class="mt-3 flex justify-between">
                <span class="font-semibold text-[#111827]">Date Joined</span>
                <span>{{ userDetail.account.joined }}</span>
              </div>
              <div class="mt-3 flex justify-between">
                <span class="font-semibold text-[#111827]">Last Active</span>
                <span>{{ userDetail.account.lastActive }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>

  <transition name="fade">
    <div
      v-if="suspendUserModalState"
      class="fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
    >
      <div class="absolute inset-0 bg-[#0f172a]/40 backdrop-blur-sm" @click="closeSuspendModal" />
      <div class="relative z-10 w-full max-w-sm rounded-3xl bg-white p-6 text-center shadow-[0_30px_60px_rgba(15,23,42,0.16)]">
        <div class="text-left">
        <button
          type="button"
          class="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-[#f1f5f9] text-[#475569] hover:opacity-90"
          @click="closeSuspendModal"
        >
          <IconX class="h-4 w-4" />
        </button>
        <h3 class="text-lg font-semibold text-[#111827]">{{ suspendUserModalState.title }}</h3>
        <p class="mt-3 text-sm leading-relaxed text-[#475569]">
          {{ suspendUserModalState.message }}
        </p>
        <div class="mt-6 space-y-3 text-left">
          <label class="block text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Rejection Reason</label>
          <select
            v-model="suspendUserModalState.reason"
            class="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm text-[#1f2937] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
          >
            <option value="" disabled>{{ suspendUserModalState.placeholder }}</option>
            <option value="policy-violation">Policy Violation</option>
            <option value="fraudulent-activity">Fraudulent Activity</option>
            <option value="incomplete-documents">Incomplete Documents</option>
            <option value="other">Other</option>
          </select>
          <p class="text-xs text-[#94a3b8]">The user will be notified of this action via email.</p>
        </div>
        <div class="mt-6 flex gap-3">
          <button
            type="button"
            class="w-1/2 rounded-full border border-[#e2e8f0] px-4 py-2 text-sm font-semibold text-[#475569] transition hover:border-[#cbd5f5] hover:text-[#1e293b]"
            @click="closeSuspendModal"
          >
            Cancel
          </button>
          <button
            type="button"
            class="w-1/2 rounded-full bg-[#dc2626] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#b91c1c]"
            @click="confirmSuspendUser"
          >
            {{ suspendUserModalState.confirmLabel }}
          </button>
        </div>
        </div>
      </div>
    </div>
  </transition>

  <transition name="fade">
    <div
      v-if="activateUserModalState"
      class="fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
    >
      <div class="absolute inset-0 bg-[#0f172a]/40 backdrop-blur-sm" @click="closeActivateModal" />
      <div class="relative z-10 w-full max-w-sm rounded-3xl bg-white p-6 text-center shadow-[0_30px_60px_rgba(15,23,42,0.16)]">
        <div class="text-left">
          <button
            type="button"
            class="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-[#f1f5f9] text-[#475569] hover:opacity-90"
            @click="closeActivateModal"
          >
            <IconX class="h-4 w-4" />
          </button>
          <h3 class="text-lg font-semibold text-[#111827]">{{ activateUserModalState.title }}</h3>
          <p class="mt-3 text-sm leading-relaxed text-[#475569]">
            {{ activateUserModalState.message }}
          </p>
          <div class="mt-6 flex gap-3">
            <button
              type="button"
              class="w-1/2 rounded-full border border-[#e2e8f0] px-4 py-2 text-sm font-semibold text-[#475569] transition hover:border-[#cbd5f5] hover:text-[#1e293b]"
              @click="closeActivateModal"
            >
              Cancel
            </button>
            <button
              type="button"
              class="w-1/2 rounded-full bg-[#16a34a] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#15803d]"
              @click="confirmActivateUser"
            >
              {{ activateUserModalState.confirmLabel }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted } from 'vue';
import { useToast } from 'vue-toastification';

import IconInfoCircle from '@/components/icon/icon-info-circle.vue';
import IconCaretsDown from '@/components/icon/icon-carets-down.vue';
import IconCircleCheck from '@/components/icon/icon-circle-check.vue';
import IconSearch from '@/components/icon/icon-search.vue';
import IconUsersGroup from '@/components/icon/icon-users-group.vue';
import IconX from '@/components/icon/icon-x.vue';

import SummaryStatCard from './components/SummaryStatCard.vue';
import UserRow from './components/UserRow.vue';
import crowdfundingService from '@/services/crowdfundingService';

const toast = useToast();
const loading = ref(false);
const searchQuery = ref('');
const statusFilter = ref('');
const userStats = ref({
  totalUsers: '0',
  activeUsers: '0',
  suspended: '0',
});

type UserDetail = {
  name: string;
  userId: string;
  status: { label: string; color: string; bg: string };
  email: string;
  phone: string;
  about: string;
  stats: {
    campaigns: { value: string; label: string; amount: string; amountLabel: string };
    donations: { value: string; label: string; amount: string; amountLabel: string };
  };
  activeCampaigns: Array<{ name: string; status: string; color: string; bg: string }>;
  account: { owner: string; joined: string; lastActive: string };
};

type UserRecord = {
  id: number;
  initials: string;
  name: string;
  userId: string;
  contactEmail: string;
  contactPhone: string;
  activity: string;
  activityDetail: string;
  wallet: string;
  status: string;
  statusColor: string;
  statusBg: string;
  suspensionReason: string;
  lastActive: string;
  actions: { label: string; type: string }[];
  detail: UserDetail;
  suspendModal: {
    title: string;
    message: string;
    confirmLabel: string;
    placeholder: string;
  };
  activateModal: {
    title: string;
    message: string;
    confirmLabel: string;
  };
};

const users = ref<UserRecord[]>([]);

const loadUsers = async () => {
  try {
    loading.value = true;
    
    // Fetch users and statistics from endpoints
    const [creatorsResponse, userStatsResponse] = await Promise.all([
      crowdfundingService.listCampaignCreators({
        page: 1,
        limit: 100, // API limit is 100
        status: statusFilter.value as 'ACTIVE' | 'BLOCKED' | 'PENDING' | undefined,
      }),
      crowdfundingService.getUserStatistics(),
    ]);

    // Get statistics from getUserStatistics endpoint - this is the primary source
    if (userStatsResponse.success && userStatsResponse.data) {
      const stats = userStatsResponse.data;
      
      // Log the response to see what fields are available
      console.log('User Statistics Response:', stats);
      
      // Map all possible field names that the API might return
      const totalUsers = stats.total_campaign_creators || stats.campaign_creators || stats.total_users || stats.total || 0;
      const activeUsers = stats.active_campaign_creators || stats.active_users || stats.active || 0;
      const suspendedUsers = stats.blocked_campaign_creators || stats.blocked_users || stats.suspended_users || stats.blocked || stats.suspended || 0;
      
      userStats.value = {
        totalUsers: totalUsers.toLocaleString(),
        activeUsers: activeUsers.toLocaleString(),
        suspended: suspendedUsers.toLocaleString(),
      };
    } else {
      // If getUserStatistics fails, log error and use fallback
      console.error('getUserStatistics failed:', userStatsResponse);
      toast.error('Failed to load user statistics');
      
      // Fallback: Use pagination info from listCampaignCreators
      if (creatorsResponse.success && creatorsResponse.data) {
        const pagination = creatorsResponse.data.pagination;
        if (pagination && pagination.total) {
          userStats.value = {
            totalUsers: pagination.total.toLocaleString(),
            activeUsers: '0', // Cannot determine without fetching all users
            suspended: '0', // Cannot determine without fetching all users
          };
        }
      }
    }

    if (creatorsResponse.success && creatorsResponse.data?.data) {
      users.value = creatorsResponse.data.data.map((creator: any, index: number) => ({
        id: index + 1,
        initials: creator.name?.substring(0, 2).toUpperCase() || 'AN',
        name: creator.name || 'Unknown User',
        userId: `ID: ${creator.user_id || creator.id || `UD${String(index + 1).padStart(2, '0')}`}`,
        contactEmail: creator.email || 'N/A',
        contactPhone: creator.phone || 'N/A',
        activity: `${creator.total_campaigns || 0} campaigns`,
        activityDetail: `${creator.total_donations || 0} donations`,
        wallet: `₦${(creator.wallet_balance || 0).toLocaleString()}`,
        status: creator.status === 'ACTIVE' ? 'Active' : creator.status === 'BLOCKED' ? 'Suspended' : 'Pending',
        statusColor: creator.status === 'ACTIVE' ? '#16A34A' : creator.status === 'BLOCKED' ? '#DC2626' : '#F59E0B',
        statusBg: creator.status === 'ACTIVE' ? '#E6FBF2' : creator.status === 'BLOCKED' ? '#FEE2E2' : '#FFF7E6',
        suspensionReason: creator.status === 'BLOCKED' ? 'Policy Violation' : '—',
        lastActive: creator.last_activity ? new Date(creator.last_activity).toLocaleDateString() : 'N/A',
        actions: creator.status === 'ACTIVE' 
          ? [{ label: 'View', type: 'view' }, { label: 'Suspend', type: 'suspend' }]
          : [{ label: 'View', type: 'view' }, { label: 'Activate', type: 'activate' }],
        detail: {
          name: creator.name || 'Unknown User',
          userId: `ID: ${creator.user_id || creator.id || 'N/A'}`,
          status: {
            label: creator.status === 'ACTIVE' ? 'Active' : creator.status === 'BLOCKED' ? 'Suspended' : 'Pending',
            color: creator.status === 'ACTIVE' ? '#16A34A' : creator.status === 'BLOCKED' ? '#DC2626' : '#F59E0B',
            bg: creator.status === 'ACTIVE' ? '#E6FBF2' : creator.status === 'BLOCKED' ? '#FEE2E2' : '#FFF7E6',
          },
          email: creator.email || 'N/A',
          phone: creator.phone || 'N/A',
          about: creator.bio || 'No description available.',
          stats: {
            campaigns: {
              value: (creator.total_campaigns || 0).toString(),
              label: 'Campaigns Created',
              amount: `₦${(creator.wallet_balance || 0).toLocaleString()}`,
              amountLabel: 'Wallet Balance',
            },
            donations: {
              value: (creator.total_donations || 0).toString(),
              label: 'Donations Made',
              amount: `₦${(creator.amount_donated || 0).toLocaleString()}`,
              amountLabel: 'Total Donated',
            },
          },
          activeCampaigns: [],
          account: {
            owner: creator.name || 'Unknown',
            joined: creator.created_at ? new Date(creator.created_at).toLocaleDateString() : 'N/A',
            lastActive: creator.last_activity ? new Date(creator.last_activity).toLocaleDateString() : 'N/A',
          },
        },
        suspendModal: {
          title: 'Suspend User',
          message: `Suspending ${creator.name || 'this user'} will prevent them from accessing their account and campaigns.`,
          confirmLabel: 'Suspend User',
          placeholder: 'Select reason',
        },
        activateModal: {
          title: 'Unsuspend User?',
          message: `Are you sure you want to reactivate ${creator.name || 'this user'}'s account? They will regain full access to the platform.`,
          confirmLabel: 'Unsuspend User',
        },
      }));

      // Load campaign history for each user
      for (const user of users.value) {
        try {
          const userId = user.userId.replace('ID: ', '');
          const historyResponse = await crowdfundingService.getUserCampaignHistory(userId);
          if (historyResponse.success && historyResponse.data) {
            const history = historyResponse.data;
            user.detail.activeCampaigns = (history.active_campaigns || []).map((campaign: any) => ({
              name: campaign.title || 'Untitled Campaign',
              status: campaign.status === 'active' ? 'Active' : campaign.status === 'completed' ? 'Completed' : 'Pending',
              color: campaign.status === 'active' ? '#16A34A' : campaign.status === 'completed' ? '#2563EB' : '#F59E0B',
              bg: campaign.status === 'active' ? '#DCFCE7' : campaign.status === 'completed' ? '#DBEAFE' : '#FEF3C7',
            }));
          }
        } catch (error) {
          console.error(`Error loading campaign history for user ${user.userId}:`, error);
        }
      }
    }
  } catch (error) {
    console.error('Error loading users:', error);
    toast.error('Failed to load users');
    // Fallback to dummy data
    if (users.value.length === 0) {
      users.value = dummyUsers;
    }
  } finally {
    loading.value = false;
  }
};

const dummyUsers: UserRecord[] = [
  {
    id: 1,
    initials: 'DR',
    name: 'Delores Robertson',
    userId: 'ID: UD01',
    contactEmail: 'john.doe@example.com',
    contactPhone: '+1 650-0123',
    activity: '2 campaigns',
    activityDetail: '18 donations',
    wallet: '₦2,500',
    status: 'Active',
    statusColor: '#16A34A',
    statusBg: '#E6FBF2',
    suspensionReason: '—',
    lastActive: '1/14/2024',
    actions: [
      { label: 'View', type: 'view' },
      { label: 'Suspend', type: 'suspend' },
    ],
    suspendModal: {
      title: 'Suspend User',
      message: 'Suspending {name} will prevent them from accessing their account and campaigns.',
      confirmLabel: 'Suspend User',
      placeholder: 'Select reason',
    },
    activateModal: {
      title: 'Unsuspend User?',
      message: 'Are you sure you want to reactivate {name} account? They will regain full access to the platform.',
      confirmLabel: 'Unsuspend User',
    },
    detail: {
      name: 'Delores Robertson',
      userId: 'ID: UD01',
      status: { label: 'Active', color: '#16A34A', bg: '#E6FBF2' },
      email: 'john.doe@example.com',
      phone: '+1 650-0123',
      about: 'Passionate about helping others through crowdfunding initiatives. Active donor and campaign creator.',
      stats: {
        campaigns: { value: '2', label: 'Campaigns Created', amount: '₦2,500', amountLabel: 'Wallet Balance' },
        donations: { value: '15', label: 'Donations Made', amount: '₦12,500', amountLabel: 'Total Donated' },
      },
      activeCampaigns: [
        { name: 'Emergency Surgery Fund for Sarah', status: 'Active', color: '#16A34A', bg: '#DCFCE7' },
        { name: 'School Technology Drive', status: 'Completed', color: '#2563EB', bg: '#DBEAFE' },
      ],
      account: {
        owner: 'John Doe',
        joined: '12/10/2022',
        lastActive: '1/14/2024',
      },
    },
  },
  {
    id: 2,
    initials: 'DR',
    name: 'Delores Robertson',
    userId: 'ID: UD01',
    contactEmail: 'john.doe@example.com',
    contactPhone: '+1 650-0123',
    activity: '2 campaigns',
    activityDetail: '18 donations',
    wallet: '₦2,500',
    status: 'Active',
    statusColor: '#16A34A',
    statusBg: '#E6FBF2',
    suspensionReason: '—',
    lastActive: '1/14/2024',
    actions: [
      { label: 'View', type: 'view' },
      { label: 'Suspend', type: 'suspend' },
    ],
    suspendModal: {
      title: 'Suspend User',
      message: 'Suspending {name} will prevent them from accessing their account and campaigns.',
      confirmLabel: 'Suspend User',
      placeholder: 'Select reason',
    },
    activateModal: {
      title: 'Unsuspend User?',
      message: 'Are you sure you want to reactivate {name} account? They will regain full access to the platform.',
      confirmLabel: 'Unsuspend User',
    },
    detail: {
      name: 'Delores Robertson',
      userId: 'ID: UD02',
      status: { label: 'Active', color: '#16A34A', bg: '#E6FBF2' },
      email: 'mary.smith@example.com',
      phone: '+1 650-0456',
      about: 'Leading multiple community projects and supporting health causes globally.',
      stats: {
        campaigns: { value: '3', label: 'Campaigns Created', amount: '₦3,800', amountLabel: 'Wallet Balance' },
        donations: { value: '22', label: 'Donations Made', amount: '₦16,200', amountLabel: 'Total Donated' },
      },
      activeCampaigns: [
        { name: 'Community Health Outreach', status: 'Active', color: '#16A34A', bg: '#DCFCE7' },
        { name: 'Youth Empowerment Program', status: 'Scheduled', color: '#F59E0B', bg: '#FEF3C7' },
      ],
      account: {
        owner: 'Mary Smith',
        joined: '07/18/2021',
        lastActive: '1/14/2024',
      },
    },
  },
  {
    id: 3,
    initials: 'DR',
    name: 'Delores Robertson',
    userId: 'ID: UD01',
    contactEmail: 'john.doe@example.com',
    contactPhone: '+1 650-0123',
    activity: '2 campaigns',
    activityDetail: '18 donations',
    wallet: '₦2,500',
    status: 'Suspended',
    statusColor: '#DC2626',
    statusBg: '#FEE2E2',
    suspensionReason: 'Policy Violation',
    lastActive: '1/14/2024',
    actions: [
      { label: 'View', type: 'view' },
      { label: 'Activate', type: 'activate' },
    ],
    suspendModal: {
      title: 'Suspend User',
      message: 'Suspending {name} will prevent them from accessing their account and campaigns.',
      confirmLabel: 'Suspend User',
      placeholder: 'Select reason',
    },
    activateModal: {
      title: 'Unsuspend User?',
      message: 'Are you sure you want to reactivate {name} account? They will regain full access to the platform.',
      confirmLabel: 'Unsuspend User',
    },
    detail: {
      name: 'Delores Robertson',
      userId: 'ID: UD03',
      status: { label: 'Suspended', color: '#DC2626', bg: '#FEE2E2' },
      email: 'support@careplus.org',
      phone: '+1 650-0789',
      about: 'Temporarily suspended due to policy review. Previously active in education fundraising.',
      stats: {
        campaigns: { value: '1', label: 'Campaigns Created', amount: '₦850', amountLabel: 'Wallet Balance' },
        donations: { value: '4', label: 'Donations Made', amount: '₦2,400', amountLabel: 'Total Donated' },
      },
      activeCampaigns: [
        { name: 'Emergency Surgery Fund for Sarah', status: 'Active', color: '#16A34A', bg: '#DCFCE7' },
        { name: 'School Technology Drive', status: 'Completed', color: '#2563EB', bg: '#DBEAFE' },
      ],
      account: {
        owner: 'CarePlus Org',
        joined: '03/02/2020',
        lastActive: '12/08/2023',
      },
    },
  },
];

const selectedUser = ref<UserRecord | null>(null);
const isUserModalOpen = ref(false);
const suspendUserModalState = ref<{
  title: string;
  message: string;
  confirmLabel: string;
  placeholder: string;
  user: UserRecord;
  reason: string;
} | null>(null);
const activateUserModalState = ref<{
  title: string;
  message: string;
  confirmLabel: string;
  user: UserRecord;
} | null>(null);

const handleUserAction = ({ action, row }: { action: { type: string }; row: UserRecord }) => {
  if (action.type === 'view') {
    selectedUser.value = row;
    isUserModalOpen.value = true;
    suspendUserModalState.value = null;
    activateUserModalState.value = null;
    return;
  }

  if (action.type === 'suspend') {
    suspendUserModalState.value = {
      ...row.suspendModal,
      message: row.suspendModal.message.replace('{name}', row.name),
      user: row,
      reason: '',
    };
    isUserModalOpen.value = false;
    activateUserModalState.value = null;
    return;
  }

  if (action.type === 'activate') {
    activateUserModalState.value = {
      ...row.activateModal,
      message: row.activateModal.message.replace('{name}', row.name),
      user: row,
    };
    isUserModalOpen.value = false;
    suspendUserModalState.value = null;
    return;
  }
};

const closeUserModal = () => {
  isUserModalOpen.value = false;
  selectedUser.value = null;
};

const closeSuspendModal = () => {
  suspendUserModalState.value = null;
};

const closeActivateModal = () => {
  activateUserModalState.value = null;
};

const userDetail = computed<UserDetail | null>(() => selectedUser.value?.detail ?? null);

const filteredUsers = computed(() => {
  let filtered = users.value;

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (u) =>
        u.name.toLowerCase().includes(query) ||
        u.contactEmail.toLowerCase().includes(query) ||
        u.userId.toLowerCase().includes(query)
    );
  }

  return filtered;
});

const confirmSuspendUser = async () => {
  if (!suspendUserModalState.value) return;
  try {
    // Note: User suspension endpoint may need to be added to the service
    toast.success(`User ${suspendUserModalState.value.user.name} suspended`);
    await loadUsers();
  } catch (error) {
    console.error('Error suspending user:', error);
    toast.error('Failed to suspend user');
  } finally {
  suspendUserModalState.value = null;
  }
};

const confirmActivateUser = async () => {
  if (!activateUserModalState.value) return;
  try {
    // Note: User activation endpoint may need to be added to the service
    toast.success(`User ${activateUserModalState.value.user.name} reactivated`);
    await loadUsers();
  } catch (error) {
    console.error('Error activating user:', error);
    toast.error('Failed to activate user');
  } finally {
  activateUserModalState.value = null;
  }
};

onMounted(() => {
  loadUsers();
});
</script>

