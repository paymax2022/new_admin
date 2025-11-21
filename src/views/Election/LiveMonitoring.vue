<template>
  <div class="min-h-screen bg-[#f7f9fc] p-6 space-y-6">
    <!-- Header -->
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div class="space-y-1">
        <h1 class="text-2xl font-semibold text-[#111827]">Live Monitoring</h1>
        <p class="text-sm text-[#6b7280]">Real-time election monitoring and activity tracking</p>
      </div>
    </div>

    <!-- Key Metrics -->
    <section class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <div
        v-for="stat in statistics"
        :key="stat.label"
        class="flex items-center justify-between rounded-3xl bg-white p-5 shadow-[0_20px_40px_rgba(15,23,42,0.05)]"
      >
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 mb-1.5 flex-wrap">
            <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8] whitespace-nowrap">{{ stat.label }}</p>
            <span
              v-if="stat.tag"
              class="inline-flex items-center whitespace-nowrap rounded-full border px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide shrink-0"
              :class="stat.tagClass"
            >
              {{ stat.tag }}
            </span>
          </div>
          <p class="text-2xl font-semibold text-[#111827]">{{ stat.value }}</p>
          <p class="mt-1.5 text-[10px] font-semibold uppercase tracking-wide" :class="stat.deltaColor">
            {{ stat.delta }}
          </p>
        </div>
        <div
          class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full ml-2"
          :style="{ backgroundColor: stat.iconBg, color: stat.iconColor }"
        >
          <component :is="stat.icon" class="h-4 w-4" />
        </div>
      </div>
    </section>

    <!-- Active Elections -->
    <section>
      <h2 class="text-lg font-semibold text-[#111827] mb-4">Active Elections</h2>
      <div class="grid gap-4 md:grid-cols-2">
        <div
          v-for="election in activeElections"
          :key="election.id"
          class="rounded-2xl border border-[#e2e8f0] bg-white p-6"
        >
          <div class="flex items-start justify-between mb-4">
            <h3 class="text-base font-semibold text-[#111827]">{{ election.title }}</h3>
            <span class="inline-flex items-center rounded-full border border-[#16a34a] bg-[#dcfce7] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#16a34a]">
              Live
            </span>
          </div>

          <div class="space-y-4">
            <!-- Time and Activity -->
            <div class="flex items-center gap-4 text-sm text-[#475569]">
              <div class="flex items-center gap-2">
                <IconClock class="h-4 w-4 text-[#94a3b8]" />
                <span>{{ election.timeRemaining }}</span>
              </div>
              <div class="flex items-center gap-2">
                <IconBarChart class="h-4 w-4 text-[#94a3b8]" />
                <span>{{ election.activityLevel }}</span>
              </div>
            </div>

            <!-- Voter Turnout -->
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Voter Turnout</span>
                <span class="text-sm font-semibold text-[#111827]">{{ election.turnoutPercentage }}%</span>
              </div>
              <div class="h-3 w-full rounded-full bg-[#f1f5f9] overflow-hidden mb-2">
                <div
                  class="h-full rounded-full bg-[#16a34a] transition-all duration-300"
                  :style="{ width: `${election.turnoutPercentage}%` }"
                />
              </div>
              <div class="flex items-center justify-between text-sm text-[#6b7280]">
                <span>{{ election.votesCast }} votes cast</span>
                <span>{{ election.eligibleVoters }} eligible voters</span>
              </div>
            </div>

            <!-- Position Buttons -->
            <div class="flex flex-wrap gap-2">
              <button
                v-for="position in election.positions"
                :key="position"
                type="button"
                class="rounded-full border border-[#e2e8f0] bg-white px-4 py-2 text-sm font-semibold text-[#475569] transition hover:border-[#cbd5f5] hover:text-[#1e293b]"
              >
                {{ position }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Bottom Section: Real-time Activity and Turnout Analytics -->
    <section class="grid gap-6 lg:grid-cols-2">
      <!-- Real-time Activity -->
      <div class="rounded-3xl bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.05)]">
        <h2 class="text-lg font-semibold text-[#111827] mb-4">Real-time Activity</h2>
        <div class="space-y-3">
          <div
            v-for="activity in realTimeActivities"
            :key="activity.id"
            class="flex items-start gap-3"
          >
            <div class="mt-1 h-2 w-2 rounded-full bg-[#16a34a] shrink-0" />
            <div class="flex-1">
              <p class="text-sm font-semibold text-[#111827]">{{ activity.time }} {{ activity.action }}</p>
              <p class="text-xs text-[#94a3b8]">{{ activity.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Turnout Analytics -->
      <div class="rounded-3xl bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.05)]">
        <h2 class="text-lg font-semibold text-[#111827] mb-4">Turnout Analytics</h2>
        <div class="space-y-4">
          <div class="flex items-center gap-3">
            <div class="flex h-10 w-10 items-center justify-center rounded-full bg-[#e0f2fe] text-[#0ea5e9]">
              <IconBarChart class="h-5 w-5" />
            </div>
            <div>
              <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Peak voting hour</p>
              <p class="text-sm font-semibold text-[#111827]">{{ analytics.peakHour }}</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <div class="flex h-10 w-10 items-center justify-center rounded-full bg-[#e0f2fe] text-[#0ea5e9]">
              <IconEye class="h-5 w-5" />
            </div>
            <div>
              <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Votes this hour</p>
              <p class="text-sm font-semibold text-[#111827]">{{ analytics.votesThisHour }} votes</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <div class="flex h-10 w-10 items-center justify-center rounded-full bg-[#e0f2fe] text-[#0ea5e9]">
              <IconTrendingUp class="h-5 w-5" />
            </div>
            <div>
              <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Avg. votes/minute</p>
              <p class="text-sm font-semibold text-[#111827]">{{ analytics.avgVotesPerMinute }} votes</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import IconUsersGroup from '@/components/icon/icon-users-group.vue';
import IconLock from '@/components/icon/icon-lock.vue';
import IconInfoTriangle from '@/components/icon/icon-info-triangle.vue';
import IconCircleCheck from '@/components/icon/icon-circle-check.vue';
import IconClock from '@/components/icon/icon-clock.vue';
import IconBarChart from '@/components/icon/icon-bar-chart.vue';
import IconEye from '@/components/icon/icon-eye.vue';
import IconTrendingUp from '@/components/icon/icon-trending-up.vue';

const statistics = [
  {
    label: 'Total Voters',
    value: '2,847',
    delta: '+12% from last election',
    deltaColor: 'text-[#16a34a]',
    icon: IconUsersGroup,
    iconBg: '#e0f2fe',
    iconColor: '#0ea5e9',
    tag: null,
    tagClass: '',
  },
  {
    label: 'Active Elections',
    value: '3',
    delta: '',
    deltaColor: '',
    icon: IconLock,
    iconBg: '#dcfce7',
    iconColor: '#16a34a',
    tag: 'Live',
    tagClass: 'border-[#16a34a] bg-[#dcfce7] text-[#16a34a]',
  },
  {
    label: 'Pending Complaints',
    value: '8,946',
    delta: '-14 from yesterday',
    deltaColor: 'text-[#dc2626]',
    icon: IconInfoTriangle,
    iconBg: '#fef3c7',
    iconColor: '#f59e0b',
    tag: 'Action Required',
    tagClass: 'border-[#f59e0b] bg-[#fef3c7] text-[#f59e0b]',
  },
  {
    label: 'Completed Elections',
    value: '15',
    delta: '+10 this month',
    deltaColor: 'text-[#16a34a]',
    icon: IconCircleCheck,
    iconBg: '#dcfce7',
    iconColor: '#16a34a',
    tag: null,
    tagClass: '',
  },
];

const activeElections = [
  {
    id: 1,
    title: 'Student Union President 2024',
    timeRemaining: '1 day, 14 hours remaining',
    activityLevel: 'High activity',
    turnoutPercentage: 53,
    votesCast: '1508 votes cast',
    eligibleVoters: '2847 eligible voters',
    positions: ['President', 'Vice President', 'Secretary'],
  },
  {
    id: 2,
    title: 'Student Union President 2024',
    timeRemaining: '1 day, 14 hours remaining',
    activityLevel: 'High activity',
    turnoutPercentage: 53,
    votesCast: '1508 votes cast',
    eligibleVoters: '2847 eligible voters',
    positions: ['President', 'Vice President', 'Secretary'],
  },
];

const realTimeActivities = [
  {
    id: 1,
    action: 'Vote cast',
    description: 'Student Union President - Position 1',
    time: '14:23:45',
  },
  {
    id: 2,
    action: 'Vote cast',
    description: 'Class Rep - Year 2 Position',
    time: '14:23:32',
  },
  {
    id: 3,
    action: 'Voter authenticated',
    description: 'Student ID: ST0024-1547',
    time: '14:23:45',
  },
  {
    id: 4,
    action: 'Vote cast',
    description: 'Student Union President - Position 1',
    time: '14:23:45',
  },
];

const analytics = {
  peakHour: '2:00 PM - 3:00 PM',
  votesThisHour: 347,
  avgVotesPerMinute: 5.8,
};
</script>

