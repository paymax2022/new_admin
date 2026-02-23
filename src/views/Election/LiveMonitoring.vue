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

    <!-- Bottom Section: Real-time Activity, Turnout Analytics, Trends, and Insights -->
    <section class="grid gap-6 lg:grid-cols-2">
      <!-- Real-time Activity -->
      <div class="rounded-3xl bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.05)]">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-[#111827]">Real-time Activity</h2>
          <button
            v-if="realTimeActivities.length > 0"
            type="button"
            class="text-xs font-semibold text-[#2563eb] hover:text-[#1e40af]"
            @click="loadMoreActivities"
          >
            Load More
          </button>
        </div>
        <div class="space-y-3 max-h-96 overflow-y-auto">
          <div v-if="loadingActivities" class="text-center py-4">
            <p class="text-sm text-[#94a3b8]">Loading activities...</p>
          </div>
          <div
            v-else-if="realTimeActivities.length === 0"
            class="text-center py-4"
          >
            <p class="text-sm text-[#94a3b8]">No recent activities</p>
          </div>
          <div
            v-for="activity in realTimeActivities"
            :key="activity.id"
            class="flex items-start gap-3"
          >
            <div class="mt-1 h-2 w-2 rounded-full bg-[#16a34a] shrink-0 animate-pulse" />
            <div class="flex-1">
              <p class="text-sm font-semibold text-[#111827]">
                <span class="text-[#94a3b8]">{{ activity.time }}</span>
                <span class="ml-2">{{ activity.action }}</span>
                <span v-if="activity.user" class="ml-2 text-[#2563eb]">by {{ activity.user }}</span>
              </p>
              <p class="text-xs text-[#6b7280] mt-1">{{ activity.description }}</p>
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
          <div v-if="analytics.growthRate > 0" class="flex items-center gap-3">
            <div class="flex h-10 w-10 items-center justify-center rounded-full bg-[#dcfce7] text-[#16a34a]">
              <IconTrendingUp class="h-5 w-5" />
            </div>
            <div>
              <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Turnout growth (24h)</p>
              <p class="text-sm font-semibold text-[#16a34a]">+{{ analytics.growthRate.toFixed(1) }}%</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Voting Trends -->
      <div class="rounded-3xl bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.05)]">
        <h2 class="text-lg font-semibold text-[#111827] mb-4">Voting Trends</h2>
        <div v-if="velocityData" class="space-y-4">
          <!-- Total Votes -->
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Total Votes</p>
              <p class="text-sm font-semibold text-[#111827]">{{ (velocityData.total_votes_so_far || 0).toLocaleString() }}</p>
            </div>
            <div class="text-right">
              <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Velocity Trend</p>
              <p class="text-sm font-semibold" :class="getVelocityTrendClass(velocityData.velocity_trend)">
                {{ formatVelocityTrend(velocityData.velocity_trend) }}
              </p>
            </div>
          </div>
          
          <!-- Voting Rates -->
          <div class="space-y-3 pt-2 border-t border-[#e2e8f0]">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-xs font-semibold text-[#111827]">Votes per Hour</p>
                <p class="text-xs text-[#94a3b8]">Current rate</p>
              </div>
              <p class="text-sm font-semibold text-[#2563eb]">{{ (velocityData.votes_per_hour || 0).toLocaleString() }}/hr</p>
            </div>
            <div class="flex items-center justify-between">
              <div>
                <p class="text-xs font-semibold text-[#111827]">Votes per Minute</p>
                <p class="text-xs text-[#94a3b8]">Current rate</p>
              </div>
              <p class="text-sm font-semibold text-[#2563eb]">{{ (velocityData.votes_per_minute || 0).toFixed(1) }}/min</p>
            </div>
            <div class="flex items-center justify-between">
              <div>
                <p class="text-xs font-semibold text-[#111827]">Last Hour</p>
                <p class="text-xs text-[#94a3b8]">Votes in past hour</p>
              </div>
              <p class="text-sm font-semibold text-[#16a34a]">{{ (velocityData.votes_last_hour || 0).toLocaleString() }}</p>
            </div>
            <div class="flex items-center justify-between">
              <div>
                <p class="text-xs font-semibold text-[#111827]">Last 5 Minutes</p>
                <p class="text-xs text-[#94a3b8]">Recent activity</p>
              </div>
              <p class="text-sm font-semibold text-[#16a34a]">{{ (velocityData.votes_last_5_min || 0).toLocaleString() }}</p>
            </div>
          </div>
          
          <!-- Velocity Stats -->
          <div v-if="velocityData.peak_velocity || velocityData.average_velocity" class="space-y-2 pt-2 border-t border-[#e2e8f0]">
            <div v-if="velocityData.peak_velocity" class="flex items-center justify-between">
              <p class="text-xs font-semibold text-[#111827]">Peak Velocity</p>
              <p class="text-xs font-semibold text-[#f59e0b]">{{ velocityData.peak_velocity.toLocaleString() }}/hr</p>
            </div>
            <div v-if="velocityData.average_velocity" class="flex items-center justify-between">
              <p class="text-xs font-semibold text-[#111827]">Average Velocity</p>
              <p class="text-xs font-semibold text-[#6b7280]">{{ velocityData.average_velocity.toFixed(1) }}/hr</p>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-4">
          <p class="text-sm text-[#94a3b8]">No trend data available</p>
        </div>
      </div>

      <!-- Election Insights -->
      <div class="rounded-3xl bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.05)]">
        <h2 class="text-lg font-semibold text-[#111827] mb-4">Election Insights</h2>
        <div v-if="hasInsights" class="space-y-3">
          <!-- Suspicious Activity -->
          <div
            v-if="insights.suspicious_activities && insights.suspicious_activities.length > 0"
            v-for="(activity, index) in insights.suspicious_activities.slice(0, 1)"
            :key="`activity-${index}`"
            class="flex items-start gap-3 p-3 rounded-xl bg-[#fef3c7] border border-[#fbbf24]"
          >
            <IconInfoTriangle class="h-5 w-5 text-[#f59e0b] shrink-0 mt-0.5" />
            <div class="flex-1">
              <p class="text-xs font-semibold text-[#111827]">
                {{ activity.type || activity.category || activity.title || 'Suspicious Activity' }}
              </p>
              <p class="text-xs text-[#6b7280]">
                {{ activity.description || activity.message || activity.details || activity.reason || 'Activity detected' }}
              </p>
              <p v-if="activity.severity" class="text-[10px] text-[#f59e0b] mt-1 uppercase font-semibold">
                {{ activity.severity }}
              </p>
            </div>
          </div>
          
          <!-- Voting Patterns -->
          <div
            v-for="(pattern, index) in (insights.patterns || []).slice(0, 5)"
            :key="`pattern-${index}`"
            class="flex items-start gap-3 p-3 rounded-xl bg-[#e0f2fe] border border-[#0ea5e9]"
          >
            <IconBarChart class="h-5 w-5 text-[#0ea5e9] shrink-0 mt-0.5" />
            <div class="flex-1">
              <p class="text-xs font-semibold text-[#111827]">
                {{ pattern.name || 'Pattern Detected' }}
              </p>
              <p class="text-xs text-[#6b7280]">
                {{ pattern.description || 'Voting pattern identified' }}
              </p>
            </div>
          </div>
          
          <!-- Projected Turnout -->
          <div
            v-if="insights.projected_turnout !== null && insights.projected_turnout !== undefined"
            class="flex items-start gap-3 p-3 rounded-xl bg-[#dcfce7] border border-[#16a34a]"
          >
            <IconCircleCheck class="h-5 w-5 text-[#16a34a] shrink-0 mt-0.5" />
            <div class="flex-1">
              <p class="text-xs font-semibold text-[#111827]">Projected Turnout</p>
              <p class="text-xs text-[#6b7280]">
                {{ insights.projected_turnout.toLocaleString() }} voters expected
              </p>
            </div>
          </div>
          
          <!-- Comparison Data -->
          <div
            v-if="insights.comparison_data"
            class="flex items-start gap-3 p-3 rounded-xl bg-[#f3f4f6] border border-[#9ca3af]"
          >
            <IconTrendingUp class="h-5 w-5 text-[#6b7280] shrink-0 mt-0.5" />
            <div class="flex-1">
              <p class="text-xs font-semibold text-[#111827]">Turnout Comparison</p>
              <p class="text-xs text-[#6b7280]">
                <span v-if="insights.comparison_data.current_vs_average && insights.comparison_data.current_vs_average !== 'N/A'">
                  {{ insights.comparison_data.current_vs_average }} vs average
                </span>
                <span v-else>
                  Average turnout rate: {{ (insights.comparison_data.average_turnout_rate || 0).toFixed(1) }}%
                </span>
              </p>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-4">
          <p class="text-sm text-[#94a3b8]">No insights available</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, computed, markRaw } from 'vue';
import { useToast } from 'vue-toastification';
import IconUsersGroup from '@/components/icon/icon-users-group.vue';
import IconLock from '@/components/icon/icon-lock.vue';
import IconInfoTriangle from '@/components/icon/icon-info-triangle.vue';
import IconCircleCheck from '@/components/icon/icon-circle-check.vue';
import IconClock from '@/components/icon/icon-clock.vue';
import IconBarChart from '@/components/icon/icon-bar-chart.vue';
import IconEye from '@/components/icon/icon-eye.vue';
import IconTrendingUp from '@/components/icon/icon-trending-up.vue';
import electionService from '@/services/electionService';

const toast = useToast();

// Mark icons as raw
const IconUsersGroupRaw = markRaw(IconUsersGroup);
const IconLockRaw = markRaw(IconLock);
const IconInfoTriangleRaw = markRaw(IconInfoTriangle);
const IconCircleCheckRaw = markRaw(IconCircleCheck);
const IconClockRaw = markRaw(IconClock);
const IconBarChartRaw = markRaw(IconBarChart);
const IconEyeRaw = markRaw(IconEye);
const IconTrendingUpRaw = markRaw(IconTrendingUp);

const loading = ref(false);
let refreshInterval: ReturnType<typeof setInterval> | null = null;

const statistics = ref([
  {
    label: 'Total Voters',
    value: '0',
    delta: '',
    deltaColor: 'text-[#16a34a]',
    icon: IconUsersGroupRaw,
    iconBg: '#e0f2fe',
    iconColor: '#0ea5e9',
    tag: null,
    tagClass: '',
  },
  {
    label: 'Active Elections',
    value: '0',
    delta: '',
    deltaColor: '',
    icon: IconLockRaw,
    iconBg: '#dcfce7',
    iconColor: '#16a34a',
    tag: 'Live',
    tagClass: 'border-[#16a34a] bg-[#dcfce7] text-[#16a34a]',
  },
  {
    label: 'Pending Complaints',
    value: '0',
    delta: '',
    deltaColor: 'text-[#dc2626]',
    icon: IconInfoTriangleRaw,
    iconBg: '#fef3c7',
    iconColor: '#f59e0b',
    tag: 'Action Required',
    tagClass: 'border-[#f59e0b] bg-[#fef3c7] text-[#f59e0b]',
  },
  {
    label: 'Completed Elections',
    value: '0',
    delta: '',
    deltaColor: 'text-[#16a34a]',
    icon: IconCircleCheckRaw,
    iconBg: '#dcfce7',
    iconColor: '#16a34a',
    tag: null,
    tagClass: '',
  },
]);

const activeElections = ref<any[]>([]);
const realTimeActivities = ref<any[]>([]);
const activityOffset = ref(0);
const loadingActivities = ref(false);
const votingTrends = ref<any[]>([]);
const velocityData = ref<any>(null);
const insights = ref<any>({
  suspicious_activities: [],
  patterns: [],
  projected_turnout: null,
  comparison_data: null,
  active_voters: 0,
  inactive_voters: 0,
  dropoff_rate: 0,
  voting_patterns: null,
  // Legacy fields
  projections: null,
  recommendations: [],
  anomalies: [],
  alerts: [],
});

// Computed property to check if there are any insights
const hasInsights = computed(() => {
  return (
    (insights.value.suspicious_activities?.length || 0) > 0 ||
    (insights.value.patterns?.length || 0) > 0 ||
    insights.value.projected_turnout !== null ||
    insights.value.comparison_data !== null
  );
});
const analytics = ref({
  peakHour: 'N/A',
  votesThisHour: 0,
  avgVotesPerMinute: 0,
  growthRate: 0,
  currentTurnout: 0,
});

// Calculate time remaining
const calculateTimeRemaining = (endDate: string) => {
  if (!endDate) return 'N/A';
  const end = new Date(endDate);
  const now = new Date();
  const diff = end.getTime() - now.getTime();
  
  if (diff <= 0) return 'Election ended';
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  if (days > 0) return `${days} day${days > 1 ? 's' : ''}, ${hours} hour${hours > 1 ? 's' : ''} remaining`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''}, ${minutes} minute${minutes > 1 ? 's' : ''} remaining`;
  return `${minutes} minute${minutes > 1 ? 's' : ''} remaining`;
};

// Format time
const formatTime = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
};

// Format trend time
const formatTrendTime = (timestamp: string) => {
  if (!timestamp) return 'N/A';
  try {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  } catch {
    return timestamp;
  }
};

// Load active elections with monitoring data
const loadActiveElections = async () => {
  try {
    const response = await electionService.getActiveElections(10);
    const elections = Array.isArray(response?.data) ? response.data : [];
    
    statistics.value[1].value = elections.length.toString();
    
    // Load monitoring data for each election
    const electionsWithData = await Promise.all(
      elections.map(async (election: any) => {
        try {
          const [metricsRes, analysisRes, breakdownRes] = await Promise.allSettled([
            electionService.getElectionMetrics(election.id || election._id),
            electionService.getVotingTimeAnalysis(election.id || election._id),
            electionService.getPositionBreakdown(election.id || election._id),
          ]);
          
          const metrics = metricsRes.status === 'fulfilled' ? metricsRes.value?.data : {};
          const analysis = analysisRes.status === 'fulfilled' ? analysisRes.value?.data : {};
          const breakdown = breakdownRes.status === 'fulfilled' ? breakdownRes.value?.data : {};
          
          const eligibleVoters = metrics.eligible_voters || metrics.total_eligible_voters || 0;
          const votesCast = metrics.votes_cast || metrics.total_votes || 0;
          const turnoutPercentage = eligibleVoters > 0 ? Math.round((votesCast / eligibleVoters) * 100) : 0;
          
          // Get positions from breakdown or election
          const positions = breakdown.positions?.map((p: any) => p.name || p.position_name) || 
                          election.positions?.map((p: any) => p.name || p) || [];
          
          // Determine activity level
          const avgVotingRate = analysis.average_voting_rate || analysis.avg_votes_per_hour || 0;
          let activityLevel = 'Low activity';
          if (avgVotingRate > 100) activityLevel = 'High activity';
          else if (avgVotingRate > 50) activityLevel = 'Medium activity';
          
          return {
            id: election.id || election._id,
            title: election.title || election.name || 'Untitled Election',
            timeRemaining: calculateTimeRemaining(election.end_date || election.endDate),
            activityLevel,
            turnoutPercentage,
            votesCast: votesCast.toLocaleString(),
            eligibleVoters: eligibleVoters.toLocaleString(),
            positions: positions.slice(0, 5), // Limit to 5 positions
          };
        } catch (error) {
          console.error(`Error loading data for election ${election.id}:`, error);
          return {
            id: election.id || election._id,
            title: election.title || election.name || 'Untitled Election',
            timeRemaining: calculateTimeRemaining(election.end_date || election.endDate),
            activityLevel: 'Unknown',
            turnoutPercentage: 0,
            votesCast: '0',
            eligibleVoters: '0',
            positions: [],
          };
        }
      })
    );
    
    activeElections.value = electionsWithData;
    
    // Update total voters from first election if available
    if (electionsWithData.length > 0 && electionsWithData[0].eligibleVoters) {
      const total = electionsWithData.reduce((sum, e) => {
        const voters = parseInt(e.eligibleVoters.replace(/,/g, '')) || 0;
        return sum + voters;
      }, 0);
      statistics.value[0].value = total.toLocaleString();
    }
    
  } catch (error: any) {
    console.error('Error loading active elections:', error);
    toast.error('Failed to load active elections');
  }
};

// Get election ID from recent activities
const getElectionIdFromActivities = async (): Promise<string | null> => {
  try {
    // First try to get from active elections
    if (activeElections.value.length > 0 && activeElections.value[0].id) {
      const electionId = activeElections.value[0].id;
      // Check if it's a valid ID (not the placeholder)
      if (electionId && electionId !== '000000000000000000000000') {
        return electionId;
      }
    }
    
    // Fallback: Get election ID from recent activities endpoint
    const recentResponse = await electionService.getRecentActivities();
    if (recentResponse && 'ok' in recentResponse && recentResponse.ok && 'data' in recentResponse) {
      const responseData = recentResponse.data as any;
      const activities = responseData?.activities || responseData?.data?.activities || [];
      
      // Find the first valid election ID (not the placeholder)
      for (const activity of activities) {
        const electionId = activity.election_id;
        if (electionId && electionId !== '000000000000000000000000') {
          return electionId;
        }
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error getting election ID from activities:', error);
    return null;
  }
};

// Load real-time activities
const loadRealTimeActivities = async (reset = false) => {
  loadingActivities.value = true;
  try {
    // Get election ID from recent activities or active elections
    const electionId = await getElectionIdFromActivities();
    
    if (!electionId) {
      console.warn('No valid election ID found for loading live activities');
      realTimeActivities.value = [];
      return;
    }
    
    // Use getLiveActivities endpoint: /election/admin/elections/:id/feed/live?limit=20&include_names=true
    const response = await electionService.getLiveActivities(electionId, { 
      limit: 20, 
      include_names: true 
    });
    
    // Handle different response structures
    let activities: any[] = [];
    
    if (response && 'ok' in response && response.ok && 'data' in response) {
      const responseData = response.data as any;
      
      // Check if data is directly an array
      if (Array.isArray(responseData)) {
        activities = responseData;
      } 
      // Check if data has an activities property
      else if (responseData?.activities && Array.isArray(responseData.activities)) {
        activities = responseData.activities;
      }
      // Check if data has an events property
      else if (responseData?.events && Array.isArray(responseData.events)) {
        activities = responseData.events;
      }
      // Check if data has a data property with activities
      else if (responseData?.data?.activities && Array.isArray(responseData.data.activities)) {
        activities = responseData.data.activities;
      }
    } else if (Array.isArray(response)) {
      // Response might be directly an array
      activities = response;
    }
    
    // Map activities to display format
    const mappedActivities = activities.map((activity: any, index: number) => ({
      id: activity.id || activity._id || `activity-${reset ? index : activityOffset.value + index}`,
      action: activity.action || activity.type || activity.event_type || 'Activity',
      description: activity.description || activity.message || activity.details || activity.summary || '',
      time: formatTime(activity.timestamp || activity.created_at || activity.createdAt || activity.time || new Date().toISOString()),
      user: activity.user_name || activity.user || activity.participant_name || null,
    }));
    
    if (reset || activityOffset.value === 0) {
      realTimeActivities.value = mappedActivities;
      activityOffset.value = mappedActivities.length;
    } else {
      // Append new activities, avoiding duplicates
      const existingIds = new Set(realTimeActivities.value.map(a => a.id));
      const newActivities = mappedActivities.filter(a => !existingIds.has(a.id));
      realTimeActivities.value = [...realTimeActivities.value, ...newActivities];
      activityOffset.value += newActivities.length;
    }
  } catch (error: any) {
    console.error('Error loading real-time activities:', error);
    toast.error(error?.response?.data?.message || 'Failed to load real-time activities');
    realTimeActivities.value = [];
  } finally {
    loadingActivities.value = false;
  }
};

// Load more activities
const loadMoreActivities = async () => {
  // For live feed, we'll fetch again with a higher limit or use activity stream for pagination
  loadingActivities.value = true;
  try {
    // Get election ID from recent activities or active elections
    const electionId = await getElectionIdFromActivities();
    
    if (!electionId) {
      console.warn('No valid election ID found for loading more activities');
      return;
    }
    
    // Use activity stream for pagination when loading more
    const response = await electionService.getActivityStream(electionId, {
      limit: 20,
      offset: activityOffset.value,
      include_names: true,
      anonymize: false,
    });
    
    let activities: any[] = [];
    if (response && 'ok' in response && response.ok && 'data' in response) {
      const responseData = response.data as any;
      if (Array.isArray(responseData)) {
        activities = responseData;
      } else if (responseData?.events && Array.isArray(responseData.events)) {
        activities = responseData.events;
      } else if (responseData?.data?.events && Array.isArray(responseData.data.events)) {
        activities = responseData.data.events;
      }
    }
    
    const newActivities = activities.map((activity: any, index: number) => ({
      id: activity.id || activity._id || `activity-${activityOffset.value + index}`,
      action: activity.action || activity.type || activity.event_type || 'Activity',
      description: activity.description || activity.message || activity.details || activity.summary || '',
      time: formatTime(activity.timestamp || activity.created_at || activity.createdAt || activity.time || new Date().toISOString()),
      user: activity.user_name || activity.user || activity.participant_name || null,
    }));
    
    // Append new activities, avoiding duplicates
    const existingIds = new Set(realTimeActivities.value.map(a => a.id));
    const uniqueNewActivities = newActivities.filter(a => !existingIds.has(a.id));
    
    if (uniqueNewActivities.length > 0) {
      realTimeActivities.value = [...realTimeActivities.value, ...uniqueNewActivities];
      activityOffset.value += uniqueNewActivities.length;
    }
  } catch (error: any) {
    console.error('Error loading more activities:', error);
    toast.error('Failed to load more activities');
  } finally {
    loadingActivities.value = false;
  }
};

// Format velocity trend label
const formatVelocityTrend = (trend: string) => {
  if (!trend) return 'N/A';
  const trendMap: Record<string, string> = {
    'steady': 'Steady',
    'increasing': 'Increasing',
    'decreasing': 'Decreasing',
    'slow': 'Slow',
    'fast': 'Fast',
    'moderate': 'Moderate',
  };
  return trendMap[trend.toLowerCase()] || trend.charAt(0).toUpperCase() + trend.slice(1);
};

// Get velocity trend color class
const getVelocityTrendClass = (trend: string) => {
  if (!trend) return 'text-[#94a3b8]';
  const trendLower = trend.toLowerCase();
  if (trendLower === 'increasing' || trendLower === 'fast') {
    return 'text-[#16a34a]';
  } else if (trendLower === 'decreasing' || trendLower === 'slow') {
    return 'text-[#dc2626]';
  } else if (trendLower === 'steady' || trendLower === 'moderate') {
    return 'text-[#2563eb]';
  }
  return 'text-[#6b7280]';
};

// Load voting trends from velocity endpoint
const loadVotingTrends = async () => {
  try {
    // Get election ID from recent activities or active elections
    const electionId = await getElectionIdFromActivities();
    
    if (!electionId) {
      console.warn('No valid election ID found for loading voting trends');
      velocityData.value = null;
      return;
    }
    
    // Use velocity endpoint: /election/admin/elections/:id/feed/velocity
    const response = await electionService.getVotingVelocity(electionId);
    
    // Handle response structure based on actual API response
    if (response && 'ok' in response && response.ok && 'data' in response) {
      // Store the velocity data directly
      velocityData.value = response.data;
    } else if (response && typeof response === 'object' && 'data' in response) {
      velocityData.value = response.data;
    } else {
      velocityData.value = null;
    }
  } catch (error: any) {
    console.error('Error loading voting trends:', error);
    toast.error(error?.response?.data?.message || 'Failed to load voting trends');
    velocityData.value = null;
  }
};

// Load election insights
const loadElectionInsights = async () => {
  try {
    // Get election ID from recent activities or active elections
    const electionId = await getElectionIdFromActivities();
    
    if (!electionId) {
      console.warn('No valid election ID found for loading election insights');
      insights.value = {
        suspicious_activities: [],
        patterns: [],
        projected_turnout: null,
        comparison_data: null,
        active_voters: 0,
        inactive_voters: 0,
        dropoff_rate: 0,
        voting_patterns: null,
        projections: null,
        recommendations: [],
        anomalies: [],
        alerts: [],
      };
      return;
    }
    
    // Use insights endpoint: /election/admin/elections/:id/monitoring/insights
    const response = await electionService.getElectionInsights(electionId);
    
    // Handle response structure
    let insightsData: any = {};
    
    if (response && 'ok' in response && response.ok && 'data' in response) {
      insightsData = response.data;
    } else if (response && typeof response === 'object' && 'data' in response) {
      insightsData = response.data;
    } else if (response && typeof response === 'object') {
      insightsData = response;
    }
    
    // Map insights data to our structure based on actual API response
    // API returns: suspicious_activity (singular, can be null), voting_patterns (object), projected_turnout, etc.
    
    // Handle suspicious_activity (singular, can be null)
    const suspiciousActivity = insightsData.suspicious_activity;
    const suspiciousActivitiesList = suspiciousActivity 
      ? [suspiciousActivity] 
      : [];
    
    // Transform voting_patterns object into array format for display
    const patternsList: any[] = [];
    if (insightsData.voting_patterns && typeof insightsData.voting_patterns === 'object') {
      const patterns = insightsData.voting_patterns;
      
      // Add most active hour pattern
      if (patterns.most_active_hour) {
        patternsList.push({
          name: 'Most Active Hour',
          description: `Peak voting time: ${patterns.most_active_hour}`,
          type: 'activity_time',
        });
      }
      
      // Add least active hour pattern
      if (patterns.least_active_hour) {
        patternsList.push({
          name: 'Least Active Hour',
          description: `Lowest voting time: ${patterns.least_active_hour}`,
          type: 'activity_time',
        });
      }
      
      // Add average vote time pattern
      if (patterns.average_vote_time) {
        patternsList.push({
          name: 'Average Vote Time',
          description: `Users take ${patterns.average_vote_time} on average to vote`,
          type: 'vote_time',
        });
      }
      
      // Add mobile vs desktop pattern
      if (patterns.mobile_vs_desktop) {
        const mobile = patterns.mobile_vs_desktop.mobile || 0;
        const desktop = patterns.mobile_vs_desktop.desktop || 0;
        const total = mobile + desktop;
        if (total > 0) {
          const mobilePercent = ((mobile / total) * 100).toFixed(1);
          const desktopPercent = ((desktop / total) * 100).toFixed(1);
          patternsList.push({
            name: 'Device Usage',
            description: `Mobile: ${mobilePercent}% | Desktop: ${desktopPercent}%`,
            type: 'device',
          });
        }
      }
      
      // Add consistent voting pattern
      if (patterns.consistent_voting !== undefined) {
        patternsList.push({
          name: 'Voting Consistency',
          description: patterns.consistent_voting 
            ? 'Voters show consistent voting patterns' 
            : 'Voting patterns vary significantly',
          type: 'consistency',
        });
      }
    }
    
    insights.value = {
      suspicious_activities: suspiciousActivitiesList,
      patterns: patternsList,
      projected_turnout: insightsData.projected_turnout || null,
      comparison_data: insightsData.comparison_data || null,
      active_voters: insightsData.active_voters || 0,
      inactive_voters: insightsData.inactive_voters || 0,
      dropoff_rate: insightsData.dropoff_rate || 0,
      voting_patterns: insightsData.voting_patterns || null,
      // Keep legacy fields for backward compatibility
      projections: insightsData.projected_turnout || null,
      recommendations: [],
      anomalies: [],
      alerts: [],
    };
  } catch (error: any) {
    console.error('Error loading election insights:', error);
    toast.error(error?.response?.data?.message || 'Failed to load election insights');
    insights.value = {
      suspicious_activities: [],
      patterns: [],
      projections: null,
      recommendations: [],
      anomalies: [],
      alerts: [],
    };
  }
};

// Load analytics
const loadAnalytics = async () => {
  try {
    // Get election ID from recent activities or active elections
    const electionId = await getElectionIdFromActivities();
    
    if (!electionId) {
      console.warn('No valid election ID found for loading analytics');
      analytics.value = {
        peakHour: 'N/A',
        votesThisHour: 0,
        avgVotesPerMinute: 0,
      };
      return;
    }
    
    // Use turnout-growth endpoint: /election/admin/elections/:id/feed/turnout-growth?hours=24
    // Also get voting analysis for peak hours and average voting rate
    const [turnoutGrowthRes, analysisRes] = await Promise.allSettled([
      electionService.getTurnoutGrowth(electionId, 24),
      electionService.getVotingTimeAnalysis(electionId),
    ]);
    
    const turnoutGrowth = turnoutGrowthRes.status === 'fulfilled' && turnoutGrowthRes.value?.ok 
      ? turnoutGrowthRes.value.data 
      : {};
    const analysis = analysisRes.status === 'fulfilled' && analysisRes.value?.ok
      ? analysisRes.value.data 
      : {};
    
    // Extract data from turnout growth response
    // The response might have: growth_rate, current_turnout, previous_turnout, hourly_data, etc.
    const growthRate = turnoutGrowth.growth_rate || turnoutGrowth.turnout_growth_rate || 0;
    const currentTurnout = turnoutGrowth.current_turnout || turnoutGrowth.turnout || 0;
    const hourlyData = turnoutGrowth.hourly_data || turnoutGrowth.data || [];
    
    // Find peak hour from analysis data (peak_hours field)
    let peakHour = 'N/A';
    if (analysis.peak_hours && Array.isArray(analysis.peak_hours) && analysis.peak_hours.length > 0) {
      // peak_hours is an array, get the first one
      const peakHourValue = analysis.peak_hours[0];
      if (typeof peakHourValue === 'number') {
        peakHour = `${peakHourValue}:00 - ${peakHourValue + 1}:00`;
      } else if (peakHourValue && typeof peakHourValue === 'object') {
        const hour = peakHourValue.hour || peakHourValue.hour_number || 0;
        peakHour = `${hour}:00 - ${hour + 1}:00`;
      }
    } else if (hourlyData.length > 0) {
      // Fallback: Find the hour with maximum votes/turnout from hourly data
      const peakHourData = hourlyData.reduce((max: any, hour: any) => {
        const hourVotes = hour.votes || hour.turnout || 0;
        const maxVotes = max.votes || max.turnout || 0;
        return hourVotes > maxVotes ? hour : max;
      }, hourlyData[0]);
      
      if (peakHourData.hour !== undefined) {
        const hour = peakHourData.hour;
        peakHour = `${hour}:00 - ${hour + 1}:00`;
      } else if (peakHourData.timestamp) {
        const date = new Date(peakHourData.timestamp);
        const hour = date.getHours();
        peakHour = `${hour}:00 - ${hour + 1}:00`;
      }
    }
    
    // Get votes this hour - fetch velocity data if not already loaded, otherwise use existing
    let votesThisHour = 0;
    let currentVelocityData = velocityData.value;
    
    // If velocity data not loaded yet, fetch it
    if (!currentVelocityData) {
      try {
        const velocityResponse = await electionService.getVotingVelocity(electionId);
        if (velocityResponse && 'ok' in velocityResponse && velocityResponse.ok && 'data' in velocityResponse) {
          currentVelocityData = velocityResponse.data;
        }
      } catch (error) {
        // Ignore error, will use fallback
      }
    }
    
    if (currentVelocityData && currentVelocityData.votes_last_hour !== undefined) {
      votesThisHour = currentVelocityData.votes_last_hour;
    } else if (hourlyData.length > 0) {
      // Get the most recent hour's data
      const currentHour = new Date().getHours();
      const currentHourData = hourlyData.find((h: any) => {
        if (h.hour !== undefined) return h.hour === currentHour;
        if (h.timestamp) {
          const hour = new Date(h.timestamp).getHours();
          return hour === currentHour;
        }
        return false;
      });
      votesThisHour = currentHourData?.votes || currentHourData?.turnout || 0;
    } else {
      // Fallback to analysis data
      votesThisHour = analysis.votes_this_hour || analysis.current_hour_votes || 0;
    }
    
    // Get average votes per minute from velocity data or calculate from average voting rate
    let avgVotesPerMinute = 0;
    if (currentVelocityData && currentVelocityData.votes_per_minute !== undefined) {
      avgVotesPerMinute = currentVelocityData.votes_per_minute;
    } else if (analysis.average_voting_rate !== undefined) {
      // Convert average voting rate (per hour) to per minute
      avgVotesPerMinute = parseFloat((analysis.average_voting_rate / 60).toFixed(1));
    } else if (votesThisHour > 0) {
      // Calculate from current hour votes
      avgVotesPerMinute = parseFloat((votesThisHour / 60).toFixed(1));
    }
    
    analytics.value = {
      peakHour,
      votesThisHour: typeof votesThisHour === 'number' ? votesThisHour : parseInt(String(votesThisHour)) || 0,
      avgVotesPerMinute: typeof avgVotesPerMinute === 'number' ? avgVotesPerMinute : parseFloat(String(avgVotesPerMinute)) || 0,
      growthRate: typeof growthRate === 'number' ? growthRate : parseFloat(String(growthRate)) || 0,
      currentTurnout: typeof currentTurnout === 'number' ? currentTurnout : parseInt(String(currentTurnout)) || 0,
    };
  } catch (error: any) {
    console.error('Error loading analytics:', error);
    analytics.value = {
      peakHour: 'N/A',
      votesThisHour: 0,
      avgVotesPerMinute: 0,
      growthRate: 0,
      currentTurnout: 0,
    };
  }
};

// Load all monitoring data
const loadMonitoringData = async () => {
  loading.value = true;
  try {
    await loadActiveElections();
    
    // Load all monitoring endpoints in parallel
    await Promise.all([
      loadRealTimeActivities(true), // Reset activities
      loadAnalytics(),
      loadVotingTrends(),
      loadElectionInsights(),
    ]);
  } catch (error: any) {
    console.error('Error loading monitoring data:', error);
    toast.error('Failed to load monitoring data');
  } finally {
    loading.value = false;
  }
};

// Refresh data periodically
const startAutoRefresh = () => {
  refreshInterval = setInterval(() => {
    loadMonitoringData();
  }, 30000); // Refresh every 30 seconds
};

onMounted(() => {
  loadMonitoringData();
  startAutoRefresh();
});

onBeforeUnmount(() => {
  if (refreshInterval) {
    clearInterval(refreshInterval);
  }
});
</script>

