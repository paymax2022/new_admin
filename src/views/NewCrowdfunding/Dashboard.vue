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
        value="1,247"
        caption="+12% from last month"
        :icon="IconLayoutGrid"
        accent-color="#3B82F6"
        accent-bg="#E7F0FF"
        caption-color="#16A34A"
      />
      <DashboardStatCard
        title="Pending Approvals"
        value="23"
        caption="-15% from last month"
        :icon="IconClock"
        accent-color="#F59E0B"
        accent-bg="#FFF4E5"
        caption-color="#DC2626"
      />
      <DashboardStatCard
        title="Total Donations"
        value="&#8358;2.4M"
        caption="+12% from last month"
        :icon="IconCash"
        accent-color="#10B981"
        accent-bg="#E6FBF2"
        caption-color="#16A34A"
      />
      <DashboardStatCard
        title="Active Users"
        value="8,945"
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
              name="Emergency Surgery Fund"
              category="Medical"
              status="Pending"
              status-color="#F59E0B"
              status-bg="#FFF7E6"
              progress-label="Progress"
              :current-amount="250000"
              :goal-amount="500000"
              progress-color="#3B82F6"
              :progress="0.6"
            />
            <CampaignCard
              name="School Technology Drive"
              category="Education"
              status="Approved"
              status-color="#10B981"
              status-bg="#E6FBF2"
              progress-label="Progress"
              :current-amount="162000"
              :goal-amount="200000"
              progress-color="#3B82F6"
              :progress="0.82"
            />
            <CampaignCard
              name="Community Health Outreach"
              category="Health"
              status="Approved"
              status-color="#10B981"
              status-bg="#E6FBF2"
              progress-label="Progress"
              :current-amount="185000"
              :goal-amount="200000"
              progress-color="#3B82F6"
              :progress="0.92"
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
</script>

