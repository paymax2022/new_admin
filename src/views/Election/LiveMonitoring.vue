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

      <!-- Voting Trends -->
      <div class="rounded-3xl bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.05)]">
        <h2 class="text-lg font-semibold text-[#111827] mb-4">Voting Trends</h2>
        <div v-if="votingTrends.length > 0" class="space-y-3">
          <div
            v-for="trend in votingTrends.slice(0, 5)"
            :key="trend.timestamp"
            class="flex items-center justify-between"
          >
            <div>
              <p class="text-xs font-semibold text-[#111827]">{{ formatTrendTime(trend.timestamp) }}</p>
              <p class="text-xs text-[#94a3b8]">Cumulative votes: {{ trend.cumulative_votes || trend.total_votes || 0 }}</p>
            </div>
            <div class="text-right">
              <p class="text-xs font-semibold text-[#16a34a]" v-if="trend.votes_in_period > 0">
                +{{ trend.votes_in_period }}
              </p>
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
        <div v-if="insights.suspicious_activities?.length > 0 || insights.patterns?.length > 0" class="space-y-3">
          <div
            v-for="(activity, index) in (insights.suspicious_activities || []).slice(0, 3)"
            :key="index"
            class="flex items-start gap-3 p-3 rounded-xl bg-[#fef3c7] border border-[#fbbf24]"
          >
            <IconInfoTriangle class="h-5 w-5 text-[#f59e0b] shrink-0 mt-0.5" />
            <div class="flex-1">
              <p class="text-xs font-semibold text-[#111827]">{{ activity.type || 'Suspicious Activity' }}</p>
              <p class="text-xs text-[#6b7280]">{{ activity.description || activity.message || 'Activity detected' }}</p>
            </div>
          </div>
          <div
            v-for="(pattern, index) in (insights.patterns || []).slice(0, 2)"
            :key="`pattern-${index}`"
            class="flex items-start gap-3 p-3 rounded-xl bg-[#e0f2fe] border border-[#0ea5e9]"
          >
            <IconBarChart class="h-5 w-5 text-[#0ea5e9] shrink-0 mt-0.5" />
            <div class="flex-1">
              <p class="text-xs font-semibold text-[#111827]">{{ pattern.name || 'Pattern Detected' }}</p>
              <p class="text-xs text-[#6b7280]">{{ pattern.description || 'Voting pattern identified' }}</p>
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
const insights = ref<any>({
  suspicious_activities: [],
  patterns: [],
  projections: null,
});
const analytics = ref({
  peakHour: 'N/A',
  votesThisHour: 0,
  avgVotesPerMinute: 0,
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

// Load real-time activities
const loadRealTimeActivities = async (reset = false) => {
  if (activeElections.value.length === 0) return;
  
  loadingActivities.value = true;
  try {
    const firstElectionId = activeElections.value[0].id;
    
    // Use getLiveActivities for initial load
    if (reset || activityOffset.value === 0) {
      const response = await electionService.getLiveActivities(firstElectionId, { limit: 20, include_names: true });
      const activities = Array.isArray(response?.data) ? response.data : Array.isArray(response?.data?.activities) ? response.data.activities : [];
      
      realTimeActivities.value = activities.map((activity: any, index: number) => ({
        id: activity.id || activity._id || `activity-${index}`,
        action: activity.action || activity.type || 'Activity',
        description: activity.description || activity.message || activity.details || '',
        time: formatTime(activity.timestamp || activity.created_at || activity.createdAt || new Date().toISOString()),
      }));
      activityOffset.value = 20;
    } else {
      // Use getActivityStream for pagination
      const response = await electionService.getActivityStream(firstElectionId, {
        limit: 20,
        offset: activityOffset.value,
        include_names: true,
        anonymize: false,
      });
      
      const activities = Array.isArray(response?.data) ? response.data : Array.isArray(response?.data?.events) ? response.data.events : [];
      const newActivities = activities.map((activity: any, index: number) => ({
        id: activity.id || activity._id || `activity-${activityOffset.value + index}`,
        action: activity.action || activity.type || 'Activity',
        description: activity.description || activity.message || activity.details || '',
        time: formatTime(activity.timestamp || activity.created_at || activity.createdAt || new Date().toISOString()),
      }));
      
      realTimeActivities.value = [...realTimeActivities.value, ...newActivities];
      activityOffset.value += newActivities.length;
    }
  } catch (error: any) {
    console.error('Error loading real-time activities:', error);
  } finally {
    loadingActivities.value = false;
  }
};

// Load more activities
const loadMoreActivities = () => {
  loadRealTimeActivities(false);
};

// Load voting trends
const loadVotingTrends = async () => {
  try {
    if (activeElections.value.length > 0) {
      const firstElectionId = activeElections.value[0].id;
      const response = await electionService.getVotingTrends(firstElectionId);
      
      const trends = response?.data?.trends || 
                     response?.data?.data?.trends || 
                     Array.isArray(response?.data) ? response.data : [];
      
      votingTrends.value = trends.slice(0, 10); // Show last 10 trends
    }
  } catch (error: any) {
    console.error('Error loading voting trends:', error);
  }
};

// Load election insights
const loadElectionInsights = async () => {
  try {
    if (activeElections.value.length > 0) {
      const firstElectionId = activeElections.value[0].id;
      const response = await electionService.getElectionInsights(firstElectionId);
      
      const data = response?.data || {};
      insights.value = {
        suspicious_activities: Array.isArray(data.suspicious_activities) ? data.suspicious_activities : [],
        patterns: Array.isArray(data.patterns) ? data.patterns : [],
        projections: data.projections || data.projection || null,
      };
    }
  } catch (error: any) {
    console.error('Error loading election insights:', error);
  }
};

// Load analytics
const loadAnalytics = async () => {
  try {
    if (activeElections.value.length > 0) {
      const firstElectionId = activeElections.value[0].id;
      
      const [analysisRes, velocityRes] = await Promise.allSettled([
        electionService.getVotingTimeAnalysis(firstElectionId),
        electionService.getVotingVelocity(firstElectionId),
      ]);
      
      const analysis = analysisRes.status === 'fulfilled' ? analysisRes.value?.data : {};
      const velocity = velocityRes.status === 'fulfilled' ? velocityRes.value?.data : {};
      
      // Get peak hours
      const peakHours = analysis.peak_hours || analysis.peakHours || [];
      const peakHour = peakHours.length > 0 
        ? `${peakHours[0].hour || 'N/A'}:00 - ${(peakHours[0].hour || 0) + 1}:00`
        : 'N/A';
      
      // Get votes this hour
      const votesThisHour = analysis.votes_this_hour || analysis.current_hour_votes || velocity.votes_per_hour || 0;
      
      // Get average votes per minute
      const avgVotesPerMinute = velocity.votes_per_minute || 
                               (velocity.votes_per_hour ? (velocity.votes_per_hour / 60).toFixed(1) : 0);
      
      analytics.value = {
        peakHour,
        votesThisHour: typeof votesThisHour === 'number' ? votesThisHour : parseInt(votesThisHour) || 0,
        avgVotesPerMinute: typeof avgVotesPerMinute === 'number' ? avgVotesPerMinute : parseFloat(avgVotesPerMinute) || 0,
      };
    }
  } catch (error: any) {
    console.error('Error loading analytics:', error);
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

