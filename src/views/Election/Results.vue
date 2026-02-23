<template>
  <div class="min-h-screen bg-[#f7f9fc] p-6 space-y-6">
    <!-- Header -->
    <div class="flex flex-col gap-2">
      <p class="text-sm font-semibold uppercase tracking-[0.2em] text-[#9ca3af]">Election Results</p>
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-3xl font-semibold text-[#111827]">Election Results</h1>
          <p class="text-sm text-[#6b7280]">Comprehensive analytics and insights from election data</p>
        </div>
        <div class="flex flex-wrap items-center gap-3">
          <select
            v-model="selectedElectionId"
            class="rounded-xl border border-[#e2e8f0] bg-white px-4 py-2.5 text-sm text-[#1f2937] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5] min-w-[220px]"
            :disabled="loadingElections"
          >
            <option value="">Select an election</option>
            <option
              v-for="e in elections"
              :key="e.id"
              :value="e.id"
            >
              {{ e.title || e.name || 'Untitled' }}
            </option>
          </select>
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-full bg-[#111827] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1f2937] disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="!selectedElectionId || loading"
            @click="exportReport"
          >
            <IconDownload class="h-4 w-4" />
            Export CSV
          </button>
        </div>
      </div>
    </div>

    <div v-if="loading && selectedElectionId" class="rounded-3xl bg-white p-8 text-center text-[#64748b] shadow-[0_20px_40px_rgba(15,23,42,0.05)]">
      Loading results…
    </div>
    <div v-else-if="!selectedElectionId" class="rounded-3xl bg-white p-12 text-center text-[#64748b] shadow-[0_20px_40px_rgba(15,23,42,0.05)]">
      Select an election above to view results.
    </div>
    <template v-else>
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
          <h3 class="text-lg font-semibold text-[#111827] mb-4">Peak Hours & Voting Pattern</h3>
          <dl class="space-y-4 text-sm">
            <div class="flex items-center justify-between border-b border-[#f1f5f9] pb-3">
              <dt class="text-[#6b7280]">Peak Period</dt>
              <dd class="font-semibold text-[#111827]">{{ trendsData?.voting_pattern?.peak_period || '—' }}</dd>
            </div>
            <div class="flex items-center justify-between border-b border-[#f1f5f9] pb-3">
              <dt class="text-[#6b7280]">Velocity Trend</dt>
              <dd class="font-semibold text-[#111827]">{{ trendsData?.voting_pattern?.velocity_trend || '—' }}</dd>
            </div>
            <div class="flex items-center justify-between border-b border-[#f1f5f9] pb-3">
              <dt class="text-[#6b7280]">Average Time to Vote</dt>
              <dd class="font-semibold text-[#111827]">{{ trendsData?.average_time_to_vote || '—' }}</dd>
            </div>
            <div class="flex items-center justify-between">
              <dt class="text-[#6b7280]">Early / Mid / Late</dt>
              <dd class="font-semibold text-[#111827]">{{ votingPatternSummary }}</dd>
            </div>
          </dl>
        </article>
        <article class="rounded-3xl bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.05)]">
          <h3 class="text-lg font-semibold text-[#111827] mb-4">Historical Comparison</h3>
          <dl class="space-y-4 text-sm">
            <div class="flex items-center justify-between border-b border-[#f1f5f9] pb-3">
              <dt class="text-[#6b7280]">Current Turnout</dt>
              <dd class="font-semibold text-[#111827]">{{ comparisonData?.current_turnout ?? '—' }}</dd>
            </div>
            <div class="flex items-center justify-between border-b border-[#f1f5f9] pb-3">
              <dt class="text-[#6b7280]">Previous Turnout</dt>
              <dd class="font-semibold text-[#111827]">{{ comparisonData?.previous_turnout ?? '—' }}</dd>
            </div>
            <div class="flex items-center justify-between border-b border-[#f1f5f9] pb-3">
              <dt class="text-[#6b7280]">Turnout Change</dt>
              <dd class="font-semibold" :class="(comparisonData?.turnout_change ?? 0) >= 0 ? 'text-[#16a34a]' : 'text-[#dc2626]'">{{ comparisonData?.turnout_change != null ? (comparisonData.turnout_change >= 0 ? `+${comparisonData.turnout_change}%` : `${comparisonData.turnout_change}%`) : '—' }}</dd>
            </div>
            <div class="flex items-center justify-between">
              <dt class="text-[#6b7280]">Trend</dt>
              <dd class="font-semibold text-[#111827]">{{ comparisonData?.trend || '—' }}</dd>
            </div>
          </dl>
        </article>
      </div>
    </section>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch, onMounted } from 'vue';
import { useToast } from 'vue-toastification';
import IconAward from '@/components/icon/icon-award.vue';
import IconBarChart from '@/components/icon/icon-bar-chart.vue';
import IconUsersGroup from '@/components/icon/icon-users-group.vue';
import IconUserCircle from '@/components/icon/icon-user-circle.vue';
import IconDownload from '@/components/icon/icon-download.vue';
import electionService from '@/services/electionService';

const toast = useToast();
const elections = ref<Array<{ id: string; title?: string; name?: string }>>([]);
const loadingElections = ref(false);
const selectedElectionId = ref('');
const loading = ref(false);
const resultsData = ref<{
  election_id?: string;
  election_title?: string;
  total_eligible_voters?: number;
  total_votes_cast?: number;
  turnout_percentage?: number;
  position_results?: Array<{
    position_id: string;
    position_name: string;
    total_votes: number;
    candidate_results: Array<{ candidate_id?: string; candidate_name?: string; votes?: number; percentage?: number; rank?: number; status?: string }>;
    result_status?: string;
    margin_of_victory?: number;
    margin_percentage?: number;
  }>;
  winners?: Array<unknown>;
  generated_at?: string;
} | null>(null);
const demographicsData = ref<any>(null);
const trendsData = ref<any>(null);
const comparisonData = ref<any>(null);

const loadElections = async () => {
  loadingElections.value = true;
  try {
    const response = await electionService.getAllElectionsAdmin({ limit: 100 });
    const list = response?.data?.elections ?? (Array.isArray(response?.data) ? response.data : []);
    elections.value = (list || []).map((e: any) => ({ id: e.id || e._id, title: e.title || e.name }));
    if (elections.value.length && !selectedElectionId.value) {
      selectedElectionId.value = elections.value[0].id;
    }
  } catch (e: any) {
    toast.error('Failed to load elections');
    console.error(e);
  } finally {
    loadingElections.value = false;
  }
};

const loadResults = async () => {
  if (!selectedElectionId.value) return;
  loading.value = true;
  resultsData.value = null;
  demographicsData.value = null;
  trendsData.value = null;
  comparisonData.value = null;
  try {
    const [res, demo, trends, comp] = await Promise.allSettled([
      electionService.getElectionResultsAdmin(selectedElectionId.value),
      electionService.getDemographicAnalysis(selectedElectionId.value),
      electionService.getTrendAnalysis(selectedElectionId.value),
      electionService.getHistoricalComparison(selectedElectionId.value),
    ]);
    if (res.status === 'fulfilled' && res.value?.data) resultsData.value = res.value.data;
    if (demo.status === 'fulfilled' && demo.value?.data) demographicsData.value = demo.value.data;
    if (trends.status === 'fulfilled' && trends.value?.data) trendsData.value = trends.value.data;
    if (comp.status === 'fulfilled' && comp.value?.data) comparisonData.value = comp.value.data;
  } catch (e: any) {
    toast.error('Failed to load results');
    console.error(e);
  } finally {
    loading.value = false;
  }
};

watch(selectedElectionId, (id) => {
  if (id) loadResults();
});

onMounted(() => {
  loadElections();
});

const summaryCards = computed(() => {
  const r = resultsData.value;
  const c = comparisonData.value;
  const eligible = r?.total_eligible_voters ?? 0;
  const votes = r?.total_votes_cast ?? 0;
  const turnout = r?.turnout_percentage ?? 0;
  const positions = r?.position_results ?? [];
  const candidateCount = positions.reduce((sum, p) => sum + (p.candidate_results?.length ?? 0), 0);
  const changeStr = c?.turnout_change != null ? (c.turnout_change >= 0 ? `+${c.turnout_change}%` : `${c.turnout_change}%`) : '—';
  return [
    { label: 'Election', value: r?.election_title || '—', change: '', description: 'Selected election', icon: IconAward, iconBg: '#eff6ff', iconColor: '#2563eb' },
    { label: 'Total Votes Cast', value: votes.toLocaleString(), change: '', description: 'All verified ballots submitted', icon: IconBarChart, iconBg: '#f0fdf4', iconColor: '#16a34a' },
    { label: 'Turnout', value: `${turnout}%`, change: changeStr, description: 'Compared to previous election', icon: IconUsersGroup, iconBg: '#fff7ed', iconColor: '#f97316' },
    { label: 'Candidates', value: String(candidateCount), change: '', description: 'Across all positions', icon: IconUserCircle, iconBg: '#ecfccb', iconColor: '#65a30d' },
  ];
});

const tabs = ['Overview', 'Candidates', 'Demographics', 'Trends'];
const activeTab = ref('Overview');

const COLORS = ['#3b82f6', '#f97316', '#a855f7', '#22c55e', '#0ea5e9', '#84cc16'];

const voteDistribution = computed(() => {
  const r = resultsData.value;
  const positions = r?.position_results ?? [];
  const first = positions[0];
  const candidates = first?.candidate_results ?? [];
  const total = first?.total_votes || 1;
  return candidates.map((c: any, i: number) => ({
    label: c.candidate_name || c.name || `Candidate ${i + 1}`,
    value: `${(c.percentage ?? (total ? Math.round(((c.votes ?? 0) / total) * 1000) / 10 : 0))}%`,
    color: COLORS[i % COLORS.length],
  }));
});

const turnoutByAge = computed(() => {
  const demo = demographicsData.value;
  if (demo?.age_groups && Array.isArray(demo.age_groups)) {
    return demo.age_groups.map((g: any) => ({
      range: g.range || g.label || '—',
      eligibleCount: g.eligible_count ?? g.eligibleCount ?? 0,
      votersCount: g.voters_count ?? g.votersCount ?? g.votes ?? 0,
    }));
  }
  return [
    { range: '18-24', eligibleCount: 0, votersCount: 0 },
    { range: '25-34', eligibleCount: 0, votersCount: 0 },
    { range: '35-44', eligibleCount: 0, votersCount: 0 },
    { range: '45-54', eligibleCount: 0, votersCount: 0 },
    { range: '55+', eligibleCount: 0, votersCount: 0 },
  ];
});

const insightCards = computed(() => {
  const r = resultsData.value;
  const c = comparisonData.value;
  const votes = r?.total_votes_cast ?? 0;
  const eligible = r?.total_eligible_voters ?? 0;
  const turnout = r?.turnout_percentage ?? 0;
  const positions = r?.position_results ?? [];
  const margin = positions[0]?.margin_percentage ?? positions[0]?.margin_of_victory ?? 0;
  const candidateCount = positions.reduce((s, p) => s + (p.candidate_results?.length ?? 0), 0);
  return [
    { label: 'Victory Margin', value: `${margin}%`, delta: 'Leading position', description: 'Margin for first position', },
    { label: 'Voter Turnout', value: `${turnout}%`, delta: `${votes.toLocaleString()} of ${eligible.toLocaleString()} eligible`, description: 'From election results', },
    { label: 'Total Candidates', value: String(candidateCount), delta: `Across ${positions.length} position(s)`, description: 'Active in this election', },
  ];
});

const conicGradient = computed(() => {
  const slices = voteDistribution.value;
  if (!slices.length) return 'conic-gradient(#e2e8f0 0% 100%)';
  let offset = 0;
  const segments = slices
    .map((slice) => {
      const start = offset;
      const value = parseFloat(String(slice.value).replace('%', '')) || 0;
      offset += value;
      return `${slice.color} ${start}% ${offset}%`;
    })
    .join(', ');
  return `conic-gradient(${segments})`;
});

const maxEligibleCount = computed(() => {
  const groups = turnoutByAge.value;
  const max = Math.max(...groups.map((g) => g.eligibleCount), 1);
  return Math.ceil(max / 50) * 50 || 100;
});
const yAxisTicks = computed(() => {
  const divisions = 4;
  const step = maxEligibleCount.value / divisions;
  return Array.from({ length: divisions + 1 }, (_, index) => Math.round(maxEligibleCount.value - step * index));
});

const candidateResults = computed(() => {
  const r = resultsData.value;
  const positions = r?.position_results ?? [];
  const flat: Array<{ id: string; name: string; totalVotes: number; percentage: number; badge: string; badgeClass: string }> = [];
  positions.forEach((pos) => {
    (pos.candidate_results || []).forEach((c: any, idx: number) => {
      const votes = c.votes ?? 0;
      const total = pos.total_votes || 1;
      const pct = pos.total_votes ? Math.round((votes / total) * 1000) / 10 : 0;
      const rank = c.rank ?? idx + 1;
      const isWinner = c.status === 'winner' || rank === 1;
      const isRunnerUp = rank === 2;
      flat.push({
        id: c.candidate_id || `${pos.position_id}-${idx}`,
        name: c.candidate_name || c.name || `Candidate ${idx + 1}`,
        totalVotes: votes,
        percentage: c.percentage ?? pct,
        badge: isWinner ? 'winner' : isRunnerUp ? 'runner-up' : 'candidate',
        badgeClass: isWinner ? 'border-[#16a34a] bg-[#dcfce7] text-[#16a34a]' : isRunnerUp ? 'border-[#f97316] bg-[#ffedd5] text-[#f97316]' : 'border-[#94a3b8] bg-[#f1f5f9] text-[#475569]',
      });
    });
  });
  return flat;
});

const demographicBreakdown = computed(() => {
  const demo = demographicsData.value;
  if (demo?.breakdown && Array.isArray(demo.breakdown)) {
    return demo.breakdown.map((b: any, i: number) => ({
      id: i + 1,
      label: b.label || b.range || b.name || '—',
      percentage: b.percentage ?? 0,
      totalVotes: b.total_votes ?? b.totalVotes ?? 0,
      details: b.details || `${(b.total_votes ?? 0).toLocaleString()} votes`,
    }));
  }
  return turnoutByAge.value.map((g, i) => ({
    id: i + 1,
    label: g.range,
    percentage: g.eligibleCount ? Math.round((g.votersCount / g.eligibleCount) * 1000) / 10 : 0,
    totalVotes: g.votersCount,
    details: `${g.votersCount.toLocaleString()} / ${g.eligibleCount.toLocaleString()} eligible`,
  }));
});

const geographicDistribution = computed(() => {
  const demo = demographicsData.value;
  if (demo?.regions && Array.isArray(demo.regions)) {
    const total = demo.regions.reduce((s: number, r: any) => s + (r.total_votes ?? r.votes ?? 0), 0) || 1;
    return demo.regions.map((r: any, i: number) => ({
      id: i + 1,
      label: r.label || r.name || r.region || '—',
      percentage: total ? Math.round(((r.total_votes ?? r.votes ?? 0) / total) * 1000) / 10 : 0,
      totalVotes: r.total_votes ?? r.votes ?? 0,
      detail: `${(r.total_votes ?? r.votes ?? 0).toLocaleString()} votes`,
    }));
  }
  return [];
});

const timelineData = computed(() => {
  const t = trendsData.value;
  const curve = t?.turnout_curve ?? t?.hourly ?? [];
  if (Array.isArray(curve) && curve.length > 0) {
    return curve.map((p: any) => ({
      time: p.time ?? p.label ?? p.hour ?? '—',
      value: p.value ?? p.votes ?? p.count ?? 0,
    }));
  }
  return [
    { time: '06:00', value: 0 },
    { time: '12:00', value: 0 },
    { time: '18:00', value: 0 },
  ];
});

const maxTimelineValue = computed(() => {
  const data = timelineData.value;
  const m = Math.max(...data.map((p) => p.value), 1);
  return m;
});
const timelineTicks = computed(() => {
  const max = maxTimelineValue.value;
  return [max, Math.round(max * 0.75), Math.round(max * 0.5), Math.round(max * 0.25), 0];
});

const chartWidth = 600;
const chartHeight = 200;

const buildPoint = (pointIndex: number) => {
  const data = timelineData.value;
  const len = data.length;
  const spacing = len <= 1 ? chartWidth : chartWidth / (len - 1);
  const x = spacing * pointIndex;
  const val = data[pointIndex]?.value ?? 0;
  const valueRatio = maxTimelineValue.value ? val / maxTimelineValue.value : 0;
  const y = chartHeight - valueRatio * chartHeight;
  return { x, y };
};

const timelineLinePoints = computed(() => {
  const data = timelineData.value;
  return data
    .map((_, index) => {
      const { x, y } = buildPoint(index);
      return `${x},${y}`;
    })
    .join(' ');
});

const timelineAreaPath = computed(() => {
  const data = timelineData.value;
  if (!data.length) return '';
  const firstPoint = buildPoint(0);
  const lastPoint = buildPoint(data.length - 1);
  const pathPoints = data
    .map((_, index) => {
      const { x, y } = buildPoint(index);
      return `${x},${y}`;
    })
    .join(' L ');
  return `M ${firstPoint.x},${chartHeight} L ${pathPoints} L ${lastPoint.x},${chartHeight} Z`;
});

const votingPatternSummary = computed(() => {
  const vp = trendsData.value?.voting_pattern;
  if (!vp) return '—';
  const e = vp.early_voting ?? 0;
  const m = vp.mid_voting ?? 0;
  const l = vp.late_voting ?? 0;
  return `${e}% / ${m}% / ${l}%`;
});

const highlightPoint = computed(() => {
  const data = timelineData.value;
  const i = Math.min(4, data.length - 1);
  return data[i] ?? { time: '—', value: 0 };
});
const highlightPointStyle = computed(() => {
  const data = timelineData.value;
  const point = highlightPoint.value;
  const idx = data.indexOf(point);
  if (idx < 0 || !data.length) return { transform: 'translate(0,0)' };
  const spacing = data.length <= 1 ? chartWidth : chartWidth / (data.length - 1);
  const valueRatio = maxTimelineValue.value ? point.value / maxTimelineValue.value : 0;
  const x = spacing * idx;
  const y = chartHeight - valueRatio * chartHeight;
  return {
    transform: `translate(calc(14px + ${(x / chartWidth) * 100}% - 30px), calc(16px + ${y}px))`,
  };
});

async function exportReport() {
  if (!selectedElectionId.value) return;
  try {
    const blob = await electionService.exportResults(selectedElectionId.value, 'csv');
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `election-results-${selectedElectionId.value}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Export downloaded');
  } catch (e: any) {
    toast.error(e?.response?.data?.message || 'Export failed');
    console.error(e);
  }
}
</script>


