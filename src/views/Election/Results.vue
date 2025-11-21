<template>
  <div class="min-h-screen bg-[#f7f9fc] p-6 space-y-6">
    <!-- Header -->
    <div class="flex flex-col gap-2">
      <p class="text-sm font-semibold uppercase tracking-[0.2em] text-[#9ca3af]">Election Results</p>
      <div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-3xl font-semibold text-[#111827]">Election Results</h1>
          <p class="text-sm text-[#6b7280]">Comprehensive analytics and insights from election data</p>
        </div>
        <button
          type="button"
          class="mt-2 inline-flex items-center gap-2 rounded-full bg-[#111827] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#1f2937]"
        >
          <IconDownload class="h-4 w-4" />
          Export Report
        </button>
      </div>
    </div>

    <!-- Summary Cards -->
    <section class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <article
        v-for="stat in summaryCards"
        :key="stat.label"
        class="rounded-3xl bg-white p-5 shadow-[0_20px_40px_rgba(15,23,42,0.05)]"
      >
        <div class="flex items-center justify-between gap-4">
          <div>
            <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">{{ stat.label }}</p>
            <div class="mt-3 flex items-end gap-2">
              <p class="text-3xl font-semibold text-[#111827]">{{ stat.value }}</p>
              <span class="text-xs font-semibold text-[#16a34a]">{{ stat.change }}</span>
            </div>
          </div>
          <div
            class="flex h-12 w-12 items-center justify-center rounded-full"
            :style="{ backgroundColor: stat.iconBg, color: stat.iconColor }"
          >
            <component :is="stat.icon" class="h-5 w-5" />
          </div>
        </div>
        <p class="mt-3 text-sm text-[#6b7280]">{{ stat.description }}</p>
      </article>
    </section>

    <!-- Tabs -->
    <section class="flex flex-wrap items-center gap-4 rounded-3xl bg-white px-6 pt-4 shadow-[0_20px_40px_rgba(15,23,42,0.05)]">
      <button
        v-for="tab in tabs"
        :key="tab"
        type="button"
        class="relative inline-flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition"
        :class="tab === activeTab ? 'border-[#111827] text-[#111827]' : 'border-transparent text-[#94a3b8] hover:text-[#111827]'"
        @click="activeTab = tab"
      >
        {{ tab }}
        <span
          v-if="tab === activeTab"
          class="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-[#111827]"
        />
      </button>
    </section>

    <!-- Overview Content -->
    <section v-if="activeTab === 'Overview'" class="grid gap-6 lg:grid-cols-2">
      <!-- Vote Distribution -->
      <article class="rounded-3xl bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.05)]">
        <header class="mb-6 flex items-center justify-between">
          <div>
            <h2 class="text-lg font-semibold text-[#111827]">Vote Distribution</h2>
            <p class="text-sm text-[#6b7280]">Breakdown of votes by party affiliation</p>
          </div>
          <span class="rounded-full bg-[#eff6ff] px-3 py-1 text-xs font-semibold text-[#2563eb]">Updated just now</span>
        </header>
        <div class="flex flex-col gap-6 md:flex-row md:items-center">
          <div class="mx-auto h-48 w-48 rounded-full shadow-inner" :style="{ backgroundImage: conicGradient }" />
          <ul class="flex-1 space-y-4">
            <li
              v-for="slice in voteDistribution"
              :key="slice.label"
              class="flex items-center justify-between text-sm font-semibold text-[#111827]"
            >
              <div class="flex items-center gap-3">
                <span class="h-3 w-3 rounded-full" :style="{ backgroundColor: slice.color }" />
                <span>{{ slice.label }}</span>
              </div>
              <span class="text-[#6b7280]">{{ slice.value }}</span>
            </li>
          </ul>
        </div>
      </article>

      <!-- Turnout by Age Group -->
      <article class="rounded-3xl bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.05)]">
        <header class="mb-6 flex items-center justify-between">
          <div>
            <h2 class="text-lg font-semibold text-[#111827]">Turnout by Age Group</h2>
            <p class="text-sm text-[#6b7280]">Voting participation across age demographics</p>
          </div>
          <span class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Votes vs Eligible</span>
        </header>
        <div class="rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] p-6">
          <div class="relative h-64">
            <!-- Horizontal grid lines -->
            <div class="absolute inset-0 flex flex-col justify-between">
              <div
                v-for="tick in yAxisTicks"
                :key="tick"
                class="relative flex items-center"
              >
                <span class="w-10 text-right text-[10px] font-semibold text-[#94a3b8] pr-2">{{ tick }}</span>
                <span class="h-px flex-1 bg-[#e2e8f0]" />
              </div>
            </div>

            <!-- Bars -->
            <div class="absolute inset-0 flex items-end gap-6 pl-12 pr-6 pb-6">
              <div
                v-for="group in turnoutByAge"
                :key="group.range"
                class="flex h-full flex-col items-center justify-end gap-2"
              >
                <div class="flex h-full w-14 items-end gap-2">
                  <div
                    class="w-5 rounded-t-lg bg-[#dbeafe]"
                    :style="{ height: `${(group.eligibleCount / maxEligibleCount) * 100}%` }"
                  />
                  <div
                    class="w-5 rounded-t-lg bg-[#16a34a]"
                    :style="{ height: `${(group.votersCount / maxEligibleCount) * 100}%` }"
                  />
                </div>
                <p class="text-xs font-semibold text-[#111827]">{{ group.range }}</p>
                <p class="text-[11px] text-center text-[#6b7280]">
                  {{ group.votersCount.toLocaleString() }} voters
                </p>
              </div>
            </div>
          </div>

          <!-- Legend -->
          <div class="mt-6 flex flex-wrap items-center justify-center gap-4">
            <div class="flex items-center gap-2 text-xs font-semibold text-[#6b7280]">
              <span class="h-3 w-3 rounded-full bg-[#dbeafe]" /> Eligible Voters
            </div>
            <div class="flex items-center gap-2 text-xs font-semibold text-[#6b7280]">
              <span class="h-3 w-3 rounded-full bg-[#16a34a]" /> Votes Cast
            </div>
          </div>
        </div>
      </article>
    </section>

    <!-- Insight Cards -->
    <section v-if="activeTab === 'Overview'" class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <article
        v-for="insight in insightCards"
        :key="insight.label"
        class="rounded-3xl bg-white p-5 shadow-[0_20px_40px_rgba(15,23,42,0.05)]"
      >
        <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">{{ insight.label }}</p>
        <div class="mt-3 flex items-baseline gap-2">
          <p class="text-3xl font-semibold text-[#111827]">{{ insight.value }}</p>
          <span class="text-xs font-semibold text-[#16a34a]">{{ insight.delta }}</span>
        </div>
        <p class="mt-2 text-sm text-[#6b7280]">{{ insight.description }}</p>
      </article>
    </section>

    <!-- Candidates Tab -->
    <section
      v-if="activeTab === 'Candidates'"
      class="rounded-3xl bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.05)]"
    >
      <div class="space-y-6">
        <div>
          <h2 class="text-lg font-semibold text-[#111827]">Candidate Results</h2>
          <p class="text-sm text-[#6b7280]">Detailed breakdown of candidate performance</p>
        </div>
        <ul class="space-y-5">
          <li
            v-for="candidate in candidateResults"
            :key="candidate.id"
            class="flex flex-col gap-3 border-b border-[#f1f5f9] pb-4 last:border-0 last:pb-0"
          >
            <div class="flex items-center gap-3">
              <p class="text-sm font-semibold text-[#111827]">{{ candidate.name }}</p>
              <span
                class="inline-flex items-center rounded-full border px-3 py-0.5 text-[11px] font-semibold uppercase tracking-wide"
                :class="candidate.badgeClass"
              >
                {{ candidate.badge }}
              </span>
            </div>
            <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div class="flex items-center gap-2 text-sm text-[#6b7280]">
                <span class="font-semibold text-[#111827]">{{ candidate.totalVotes.toLocaleString() }}</span>
                <span>{{ candidate.percentage }}%</span>
              </div>
              <div class="flex-1 rounded-full bg-[#f1f5f9]">
                <div
                  class="h-2 rounded-full bg-[#111827]"
                  :style="{ width: `${candidate.percentage}%` }"
                />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <!-- Demographics Tab -->
    <section
      v-if="activeTab === 'Demographics'"
      class="grid gap-6 lg:grid-cols-2"
    >
      <article class="rounded-3xl bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.05)]">
        <h2 class="text-lg font-semibold text-[#111827] mb-1">Demographic Breakdown</h2>
        <p class="text-sm text-[#6b7280] mb-6">Voting patterns by demographic groups</p>
        <ul class="space-y-5">
          <li
            v-for="segment in demographicBreakdown"
            :key="segment.id"
            class="space-y-2"
          >
            <div class="flex items-center justify-between text-sm font-semibold text-[#111827]">
              <span>{{ segment.label }}</span>
              <span>{{ segment.percentage }}%</span>
            </div>
            <p class="text-xs text-[#6b7280]">{{ segment.details }}</p>
            <div class="flex items-center gap-3">
              <div class="flex-1 rounded-full bg-[#f1f5f9]">
                <div
                  class="h-2 rounded-full bg-[#111827]"
                  :style="{ width: `${segment.percentage}%` }"
                />
              </div>
              <span class="text-xs font-semibold text-[#94a3b8]">{{ segment.totalVotes.toLocaleString() }}</span>
            </div>
          </li>
        </ul>
      </article>
      <article class="rounded-3xl bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.05)]">
        <h2 class="text-lg font-semibold text-[#111827] mb-1">Geographic Distribution</h2>
        <p class="text-sm text-[#6b7280] mb-6">Vote distribution by district</p>
        <ul class="space-y-5">
          <li
            v-for="region in geographicDistribution"
            :key="region.id"
            class="space-y-2"
          >
            <div class="flex items-center justify-between text-sm font-semibold text-[#111827]">
              <span>{{ region.label }}</span>
              <span>{{ region.percentage }}%</span>
            </div>
            <p class="text-xs text-[#6b7280]">{{ region.detail }}</p>
            <div class="flex items-center gap-3">
              <div class="flex-1 rounded-full bg-[#f1f5f9]">
                <div
                  class="h-2 rounded-full bg-[#111827]"
                  :style="{ width: `${region.percentage}%` }"
                />
              </div>
              <span class="text-xs font-semibold text-[#94a3b8]">{{ region.totalVotes.toLocaleString() }}</span>
            </div>
          </li>
        </ul>
      </article>
    </section>

    <!-- Trends Tab -->
    <section
      v-if="activeTab === 'Trends'"
      class="space-y-6"
    >
      <article class="rounded-3xl bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.05)]">
        <div class="flex flex-col gap-2">
          <h2 class="text-lg font-semibold text-[#111827]">Voting Activity Timeline</h2>
          <p class="text-sm text-[#6b7280]">Real-time voting patterns throughout election day</p>
        </div>
        <div class="relative mt-8 rounded-3xl border border-[#e2e8f0] bg-[#f8fafc] p-6">
          <!-- Y-axis labels -->
          <div class="absolute left-6 top-6 bottom-12 flex flex-col justify-between text-[10px] font-semibold text-[#94a3b8]">
            <span v-for="tick in timelineTicks" :key="tick">{{ tick }}</span>
          </div>
          <!-- Time labels -->
          <div class="absolute left-20 right-6 bottom-6 flex justify-between text-[10px] font-semibold text-[#94a3b8]">
            <span v-for="point in timelineData" :key="point.time">{{ point.time }}</span>
          </div>
          <div class="ml-14 mr-6 mt-2 h-64">
            <svg class="h-full w-full" viewBox="0 0 600 220" preserveAspectRatio="none">
              <defs>
                <linearGradient id="timelineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="#c4b5fd" stop-opacity="0.65" />
                  <stop offset="100%" stop-color="#e0e7ff" stop-opacity="0.2" />
                </linearGradient>
              </defs>
              <path
                :d="timelineAreaPath"
                fill="url(#timelineGradient)"
                stroke="none"
              />
              <polyline
                :points="timelineLinePoints"
                fill="none"
                stroke="#818cf8"
                stroke-width="3"
                stroke-linecap="round"
              />
            </svg>
            <div
              class="pointer-events-none absolute"
              :style="highlightPointStyle"
            >
              <div class="rounded-2xl bg-white px-3 py-1 text-xs font-semibold text-[#111827] shadow-lg">
                {{ highlightPoint.value }} votes
              </div>
              <span class="mt-2 inline-block h-3 w-3 rounded-full border-2 border-white bg-[#6366f1] shadow-md" />
            </div>
          </div>
        </div>
      </article>
      <div class="grid gap-6 lg:grid-cols-2">
        <article class="rounded-3xl bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.05)]">
          <h3 class="text-lg font-semibold text-[#111827] mb-4">Peak Hours Analysis</h3>
          <dl class="space-y-4 text-sm">
            <div class="flex items-center justify-between border-b border-[#f1f5f9] pb-3">
              <dt class="text-[#6b7280]">Peak Hour</dt>
              <dd class="font-semibold text-[#111827]">2:00 PM - 3:00 PM</dd>
            </div>
            <div class="flex items-center justify-between border-b border-[#f1f5f9] pb-3">
              <dt class="text-[#6b7280]">Highest Turnout</dt>
              <dd class="font-semibold text-[#111827]">567 votes/hour</dd>
            </div>
            <div class="flex items-center justify-between">
              <dt class="text-[#6b7280]">Average Rate</dt>
              <dd class="font-semibold text-[#111827]">342 votes/hour</dd>
            </div>
          </dl>
        </article>
        <article class="rounded-3xl bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.05)]">
          <h3 class="text-lg font-semibold text-[#111827] mb-4">Historical Comparison</h3>
          <dl class="space-y-4 text-sm">
            <div class="flex items-center justify-between border-b border-[#f1f5f9] pb-3">
              <dt class="text-[#6b7280]">vs 2023 Election</dt>
              <dd class="font-semibold text-[#16a34a]">+15.3%</dd>
            </div>
            <div class="flex items-center justify-between border-b border-[#f1f5f9] pb-3">
              <dt class="text-[#6b7280]">vs 2022 Election</dt>
              <dd class="font-semibold text-[#16a34a]">+8.5%</dd>
            </div>
            <div class="flex items-center justify-between">
              <dt class="text-[#6b7280]">3-year Average</dt>
              <dd class="font-semibold text-[#111827]">73.2%</dd>
            </div>
          </dl>
        </article>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import IconAward from '@/components/icon/icon-award.vue';
import IconBarChart from '@/components/icon/icon-bar-chart.vue';
import IconUsersGroup from '@/components/icon/icon-users-group.vue';
import IconUserCircle from '@/components/icon/icon-user-circle.vue';
import IconDownload from '@/components/icon/icon-download.vue';

const summaryCards = [
  {
    label: 'Total Elections',
    value: '12',
    change: '+2',
    description: 'Live & historical election events',
    icon: IconAward,
    iconBg: '#eff6ff',
    iconColor: '#2563eb',
  },
  {
    label: 'Total Votes Cast',
    value: '8,547',
    change: '+5%',
    description: 'All verified ballots submitted',
    icon: IconBarChart,
    iconBg: '#f0fdf4',
    iconColor: '#16a34a',
  },
  {
    label: 'Average Turnout',
    value: '78.5%',
    change: '+2.3%',
    description: 'Compared to last election cycle',
    icon: IconUsersGroup,
    iconBg: '#fff7ed',
    iconColor: '#f97316',
  },
  {
    label: 'Active Candidates',
    value: '45',
    change: '+9',
    description: 'Across all live and upcoming races',
    icon: IconUserCircle,
    iconBg: '#ecfccb',
    iconColor: '#65a30d',
  },
];

const tabs = ['Overview', 'Candidates', 'Demographics', 'Trends'];
const activeTab = ref('Overview');

const voteDistribution = [
  { label: 'Progressive', value: '42.3%', color: '#3b82f6' },
  { label: 'Unity', value: '20.1%', color: '#f97316' },
  { label: 'Independent', value: '15.6%', color: '#a855f7' },
  { label: 'Change', value: '22.0%', color: '#22c55e' },
];

const turnoutByAge = [
  { range: '18-24', eligibleCount: 700, votersCount: 620 },
  { range: '25-34', eligibleCount: 720, votersCount: 580 },
  { range: '35-44', eligibleCount: 732, votersCount: 675 },
  { range: '45-54', eligibleCount: 635, votersCount: 480 },
  { range: '55+', eligibleCount: 592, votersCount: 320 },
];

const insightCards = [
  {
    label: 'Victory Margin',
    value: '10.2%',
    delta: '4% vote difference',
    description: 'Average winning margin for current cycle',
  },
  {
    label: 'Voter Turnout',
    value: '78.5%',
    delta: '6,237 of 7,945 eligible voters',
    description: 'Measured across all open elections',
  },
  {
    label: 'Total Candidates',
    value: '4',
    delta: 'Across 3 parties + independents',
    description: 'Active races reporting real-time data',
  },
];

const conicGradient = computed(() => {
  let offset = 0;
  const segments = voteDistribution
    .map((slice) => {
      const start = offset;
      const value = parseFloat(slice.value);
      offset += value;
      return `${slice.color} ${start}% ${offset}%`;
    })
    .join(', ');

  return `conic-gradient(${segments})`;
});

const maxEligibleCount = Math.ceil(Math.max(...turnoutByAge.map((group) => group.eligibleCount)) / 50) * 50;
const yAxisTicks = computed(() => {
  const divisions = 4;
  const step = maxEligibleCount / divisions;
  return Array.from({ length: divisions + 1 }, (_, index) => Math.round(maxEligibleCount - step * index));
});

const candidateResults = [
  {
    id: 1,
    name: 'Sarah Johnson',
    totalVotes: 2847,
    percentage: 42.3,
    badge: 'winner',
    badgeClass: 'border-[#16a34a] bg-[#dcfce7] text-[#16a34a]',
  },
  {
    id: 2,
    name: 'Mike Chen',
    totalVotes: 2320,
    percentage: 34.2,
    badge: 'runner-up',
    badgeClass: 'border-[#f97316] bg-[#ffedd5] text-[#f97316]',
  },
  {
    id: 3,
    name: 'Ava Patel',
    totalVotes: 1340,
    percentage: 18.9,
    badge: 'candidate',
    badgeClass: 'border-[#94a3b8] bg-[#f1f5f9] text-[#475569]',
  },
];

const demographicBreakdown = [
  {
    id: 1,
    label: '18-24 years',
    percentage: 61.7,
    totalVotes: 1234,
    details: '1,234 / 2,000 eligible',
  },
  {
    id: 2,
    label: '25-34 years',
    percentage: 86.2,
    totalVotes: 2185,
    details: '2,185 / 2,600 eligible',
  },
  {
    id: 3,
    label: '35-44 years',
    percentage: 85.3,
    totalVotes: 1879,
    details: '1,879 / 2,200 eligible',
  },
  {
    id: 4,
    label: '45-54 years',
    percentage: 61.7,
    totalVotes: 1541,
    details: '1,541 / 2,500 eligible',
  },
];

const geographicDistribution = [
  {
    id: 1,
    label: 'South Campus',
    percentage: 61.7,
    totalVotes: 1847,
    detail: '1,847 votes',
  },
  {
    id: 2,
    label: 'West Campus',
    percentage: 86.2,
    totalVotes: 2345,
    detail: '2,345 votes',
  },
  {
    id: 3,
    label: 'North City',
    percentage: 85.3,
    totalVotes: 1879,
    detail: '1,879 votes',
  },
  {
    id: 4,
    label: 'Online / Remote',
    percentage: 61.7,
    totalVotes: 563,
    detail: '563 votes',
  },
];

const timelineData = [
  { time: '06:00', value: 120 },
  { time: '08:00', value: 180 },
  { time: '10:00', value: 260 },
  { time: '12:00', value: 340 },
  { time: '14:00', value: 460 },
  { time: '16:00', value: 520 },
  { time: '18:00', value: 640 },
  { time: '20:00', value: 720 },
  { time: '22:00', value: 780 },
];

const maxTimelineValue = Math.max(...timelineData.map((point) => point.value));
const timelineTicks = [maxTimelineValue, Math.round(maxTimelineValue * 0.75), Math.round(maxTimelineValue * 0.5), Math.round(maxTimelineValue * 0.25), 0];

const chartWidth = 600;
const chartHeight = 200;

const buildPoint = (pointIndex: number) => {
  const spacing = chartWidth / (timelineData.length - 1);
  const x = spacing * pointIndex;
  const valueRatio = timelineData[pointIndex].value / maxTimelineValue;
  const y = chartHeight - valueRatio * chartHeight;
  return { x, y };
};

const timelineLinePoints = computed(() =>
  timelineData
    .map((_, index) => {
      const { x, y } = buildPoint(index);
      return `${x},${y}`;
    })
    .join(' ')
);

const timelineAreaPath = computed(() => {
  const firstPoint = buildPoint(0);
  const lastPoint = buildPoint(timelineData.length - 1);
  const pathPoints = timelineData
    .map((_, index) => {
      const { x, y } = buildPoint(index);
      return `${x},${y}`;
    })
    .join(' L ');
  return `M ${firstPoint.x},${chartHeight} L ${pathPoints} L ${lastPoint.x},${chartHeight} Z`;
});

const highlightPoint = timelineData[4];
const highlightPointStyle = computed(() => {
  const spacing = chartWidth / (timelineData.length - 1);
  const valueRatio = highlightPoint.value / maxTimelineValue;
  const x = spacing * timelineData.indexOf(highlightPoint);
  const y = chartHeight - valueRatio * chartHeight;
  return {
    transform: `translate(calc(14px + ${(x / chartWidth) * 100}% - 30px), calc(16px + ${y}px))`,
  };
});
</script>


