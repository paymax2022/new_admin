<template>
  <div class="min-h-screen bg-[#f7f9fc] p-6 space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-semibold text-[#1a202c]">Crowdfunding Dashboard</h1>
        <p class="mt-1 text-sm text-[#718096]">Overview of platform performance and quick actions</p>
      </div>
      <button
        class="hidden sm:inline-flex items-center gap-2 rounded-full bg-[#3b82f6] px-5 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-[#2563eb]">
        <IconPlus class="h-5 w-5" />
        New Campaign
      </button>
    </div>

    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <DashboardStatCard
        title="Total Campaigns"
        :value="stats.totalCampaigns"
        caption="+12% from last month"
        :icon="IconLayoutGrid"
        accent-color="#3B82F6"
        accent-bg="#E7F0FF"
        caption-color="#16A34A"
      />
      <DashboardStatCard
        title="Pending Approvals"
        :value="stats.pendingApprovals"
        caption="-15% from last month"
        :icon="IconClock"
        accent-color="#F59E0B"
        accent-bg="#FFF4E5"
        caption-color="#DC2626"
      />
      <DashboardStatCard
        title="Total Donations"
        :value="stats.totalDonations"
        caption="+12% from last month"
        :icon="IconCash"
        accent-color="#10B981"
        accent-bg="#E6FBF2"
        caption-color="#16A34A"
      />
      <DashboardStatCard
        title="Active Users"
        :value="stats.activeUsers"
        caption="-7% from last month"
        :icon="IconUsersGroup"
        accent-color="#6366F1"
        accent-bg="#EEF0FF"
        caption-color="#DC2626"
      />
    </div>

    <div class="grid gap-6 lg:grid-cols-2">
      <div class="space-y-6">
        <div class="rounded-3xl bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.05)]">
          <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 class="text-xl font-semibold text-[#1a202c]">Recent Campaigns</h2>
              <p class="text-sm text-[#94a3b8]">Monitor campaign performance and approve requests</p>
            </div>
            <button
              class="inline-flex items-center gap-2 rounded-full border border-[#E2E8F0] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#475569] transition hover:border-[#94a3b8] hover:text-[#1e293b]">
              View All
            </button>
          </div>

          <div class="mt-6 space-y-5">
            <CampaignCard
              v-for="campaign in recentCampaigns"
              :key="campaign.name"
              :name="campaign.name"
              :category="campaign.category"
              :status="campaign.status"
              :status-color="campaign.statusColor"
              :status-bg="campaign.statusBg"
              :progress-label="campaign.progressLabel"
              :current-amount="campaign.currentAmount"
              :goal-amount="campaign.goalAmount"
              :progress-color="campaign.progressColor"
              :progress="campaign.progress"
            />
          </div>
        </div>
      </div>

      <div class="space-y-6">
        <div class="rounded-3xl bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.05)]">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-semibold text-[#1a202c]">Quick Actions</h2>
            <span class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Manage</span>
          </div>

          <div class="mt-6 space-y-4">
            <QuickActionRow
              title="23 Pending Approvals"
              subtitle="Campaigns waiting for your review"
              :icon="IconClipboardText"
              accent-bg="#FFF7E6"
              accent-color="#F59E0B"
              button-label="Review"
              button-bg="#FEF3C7"
              button-color="#B45309"
            />
            <QuickActionRow
              title="7 Withdrawals"
              subtitle="Ready for processing (&#8358;2,450)"
              :icon="IconCash"
              accent-bg="#E6FBF2"
              accent-color="#10B981"
              button-label="Process"
              button-bg="#D1FAE5"
              button-color="#047857"
            />
            <QuickActionRow
              title="15 Support Tickets"
              subtitle="User inquiries and issues"
              :icon="IconChatDots"
              accent-bg="#E8EDFF"
              accent-color="#6366F1"
              button-label="Handle"
              button-bg="#E0E7FF"
              button-color="#4338CA"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import IconChatDots from '@/components/icon/icon-chat-dots.vue';
import IconClipboardText from '@/components/icon/icon-clipboard-text.vue';
import IconClock from '@/components/icon/icon-clock.vue';
import IconLayoutGrid from '@/components/icon/icon-layout-grid.vue';
import IconPlus from '@/components/icon/icon-plus.vue';
import IconUsersGroup from '@/components/icon/icon-users-group.vue';
import IconCash from '@/components/icon/icon-cash-banknotes.vue';

import DashboardStatCard from './components/DashboardStatCard.vue';
import CampaignCard from './components/CampaignCard.vue';
import QuickActionRow from './components/QuickActionRow.vue';
import crowdfundingService from '@/services/crowdfundingService';

const loading = ref(false);
const stats = ref({
  totalCampaigns: '1,247',
  pendingApprovals: '23',
  totalDonations: '₦2.4M',
  activeUsers: '8,945',
});

const recentCampaigns = ref([
  {
    name: 'Emergency Surgery Fund',
    category: 'Medical',
    status: 'Pending',
    statusColor: '#F59E0B',
    statusBg: '#FFF7E6',
    progressLabel: 'Progress',
    currentAmount: 250000,
    goalAmount: 500000,
    progressColor: '#3B82F6',
    progress: 0.6,
  },
]);

const loadDashboardData = async () => {
  try {
    loading.value = true;
    const [statisticsResponse, campaignsResponse] = await Promise.all([
      crowdfundingService.getStatistics({ period: 'monthly' }),
      crowdfundingService.listAllCampaigns({ page: 1, limit: 3, status: 'all', sort: 'created_at' }),
    ]);

    if (statisticsResponse.success && statisticsResponse.data) {
      const statsData = statisticsResponse.data;
      stats.value = {
        totalCampaigns: statsData.total_campaigns?.toLocaleString() || '0',
        pendingApprovals: statsData.pending_approvals?.toLocaleString() || '0',
        totalDonations: `₦${(statsData.total_amount_raised / 1000000).toFixed(1)}M`,
        activeUsers: statsData.active_users?.toLocaleString() || '0',
      };
    }

    if (campaignsResponse.success && campaignsResponse.data?.data) {
      recentCampaigns.value = campaignsResponse.data.data.slice(0, 3).map((campaign: any) => ({
        name: campaign.title,
        category: campaign.category,
        status: campaign.status === 'pending' ? 'Pending' : campaign.status === 'approved' ? 'Approved' : 'Active',
        statusColor: campaign.status === 'pending' ? '#F59E0B' : '#10B981',
        statusBg: campaign.status === 'pending' ? '#FFF7E6' : '#E6FBF2',
        progressLabel: 'Progress',
        currentAmount: campaign.current_amount || 0,
        goalAmount: campaign.goal_amount || 0,
        progressColor: '#3B82F6',
        progress: campaign.goal_amount > 0 ? (campaign.current_amount || 0) / campaign.goal_amount : 0,
      }));
    }
  } catch (error) {
    console.error('Error loading dashboard data:', error);
    // Keep dummy data on error
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadDashboardData();
});
</script>

