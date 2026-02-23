<template>
  <div class="min-h-screen bg-[#f7f9fc] p-6 space-y-6">
    <!-- Header -->
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div class="space-y-1">
        <h1 class="text-2xl font-semibold text-[#111827]">Election Dashboard</h1>
        <p class="text-sm text-[#6b7280]">Manage and monitor all election activities</p>
      </div>
    </div>

    <!-- Key Statistics -->
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

    <!-- Elections Overview -->
    <section class="rounded-3xl bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.05)]">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-lg font-semibold text-[#111827]">Elections Overview</h2>
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-full bg-[#111827] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1f2937]"
          @click="openCreateElectionModal"
        >
          <IconPlus class="h-4 w-4" />
          Create Election
        </button>
      </div>

      <div class="space-y-4">
        <div
          v-for="activity in electionActivities"
          :key="activity.id"
          class="rounded-2xl border border-[#e2e8f0] bg-white p-5"
        >
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-2">
                <h3 class="text-base font-semibold text-[#111827]">
                  {{ activity.election_title || 'System Activity' }}
                </h3>
                <span
                  class="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide"
                  :class="
                    activity.action === 'election_created'
                      ? 'border-[#16a34a] bg-[#dcfce7] text-[#16a34a]'
                      : activity.action === 'admin_registered'
                      ? 'border-[#2563eb] bg-[#dbeafe] text-[#2563eb]'
                      : 'border-[#94a3b8] bg-[#f1f5f9] text-[#64748b]'
                  "
                >
                  {{ formatActionLabel(activity.action) }}
                </span>
              </div>
              <p class="text-sm text-[#6b7280] mb-4">{{ activity.description }}</p>
              <div class="flex flex-wrap items-center gap-6 text-sm text-[#475569]">
                <div>
                  <span class="font-semibold text-[#111827]">Time:</span>
                  <span class="ml-2">{{ formatActivityTime(activity.created_at) }}</span>
                </div>
                <div v-if="activity.election_id && activity.election_id !== '000000000000000000000000'">
                  <span class="font-semibold text-[#111827]">Election ID:</span>
                  <span class="ml-2 font-mono text-xs">{{ activity.election_id }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="electionActivities.length === 0 && !loading" class="text-center py-8 text-[#6b7280]">
          No activities found
        </div>
        <div v-if="loading" class="text-center py-8 text-[#6b7280]">
          Loading activities...
        </div>
      </div>
    </section>

    <!-- Bottom Section: Recent Activity and Quick Actions -->
    <section class="grid gap-6 lg:grid-cols-2">
      <!-- Recent Activity -->
      <div class="rounded-3xl bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.05)]">
        <h2 class="text-lg font-semibold text-[#111827] mb-6">Recent Activity</h2>
        <ul class="space-y-4">
          <li
            v-for="activity in recentActivities"
            :key="activity.id"
            class="flex items-start gap-3 pb-4 border-b border-[#e2e8f0] last:border-0 last:pb-0"
          >
            <div class="flex-1">
              <p class="text-sm font-semibold text-[#111827]">{{ activity.title }}</p>
              <p class="text-sm text-[#6b7280] mt-1">{{ activity.description }}</p>
              <p class="text-xs text-[#94a3b8] mt-2">{{ activity.time }}</p>
            </div>
          </li>
        </ul>
      </div>

      <!-- Quick Actions -->
      <div class="rounded-3xl bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.05)]">
        <h2 class="text-lg font-semibold text-[#111827] mb-6">Quick Actions</h2>
        <ul class="space-y-3">
          <li v-for="action in quickActions" :key="action.id">
            <button
              type="button"
              class="flex w-full items-center gap-3 rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-left text-sm font-semibold text-[#1f2937] transition hover:bg-[#f8fafc] hover:border-[#cbd5f5]"
            >
              <component :is="action.icon" class="h-5 w-5 text-[#475569]" />
              <span class="flex-1">{{ action.label }}</span>
              <span
                v-if="action.badge"
                class="flex h-5 w-5 items-center justify-center rounded-full bg-[#dc2626] text-xs font-semibold text-white"
              >
                {{ action.badge }}
              </span>
            </button>
          </li>
        </ul>
      </div>
    </section>

    <!-- Create Election Modal -->
    <CreateElectionModal
      v-if="showCreateElectionModal"
      @close="closeCreateElectionModal"
      @next="handleNextStep"
    />

    <!-- Live Monitoring Modal -->
    <LiveMonitoringModal
      v-if="liveMonitoringModal.open && liveMonitoringModal.data"
      :election="liveMonitoringModal.data"
      @close="closeLiveMonitoringModal"
    />

    <!-- Election Details Modal -->
    <ElectionDetailsModal
      v-if="electionDetailsModal.open && electionDetailsModal.data"
      :election="electionDetailsModal.data"
      @close="closeElectionDetailsModal"
    />

    <!-- Edit Election Modal -->
    <EditElectionModal
      v-if="editElectionModal.open && editElectionModal.data"
      :election="editElectionModal.data"
      @close="closeEditElectionModal"
      @save="handleSaveElection"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, markRaw } from 'vue';
import { useToast } from 'vue-toastification';
import IconUsersGroup from '@/components/icon/icon-users-group.vue';
import IconUserCircle from '@/components/icon/icon-user-circle.vue';
import IconInfoTriangle from '@/components/icon/icon-info-triangle.vue';
import IconCircleCheck from '@/components/icon/icon-circle-check.vue';
import IconPlus from '@/components/icon/icon-plus.vue';
import IconUserPlus from '@/components/icon/icon-user-plus.vue';
import IconBox from '@/components/icon/icon-box.vue';
import IconChecks from '@/components/icon/icon-checks.vue';
import CreateElectionModal from './components/CreateElectionModal.vue';
import LiveMonitoringModal from './components/LiveMonitoringModal.vue';
import ElectionDetailsModal from './components/ElectionDetailsModal.vue';
import EditElectionModal from './components/EditElectionModal.vue';
import electionService from '@/services/electionService';

const toast = useToast();

// Mark icon components as raw to prevent reactivity warnings
const IconUsersGroupRaw = markRaw(IconUsersGroup);
const IconUserCircleRaw = markRaw(IconUserCircle);
const IconInfoTriangleRaw = markRaw(IconInfoTriangle);
const IconCircleCheckRaw = markRaw(IconCircleCheck);
const IconPlusRaw = markRaw(IconPlus);
const IconUserPlusRaw = markRaw(IconUserPlus);
const IconBoxRaw = markRaw(IconBox);
const IconChecksRaw = markRaw(IconChecks);

const showCreateElectionModal = ref(false);
const liveMonitoringModal = ref<{ open: boolean; data: typeof elections[0] | null }>({
  open: false,
  data: null,
});
const electionDetailsModal = ref<{ open: boolean; data: typeof elections[0] | null }>({
  open: false,
  data: null,
});
const editElectionModal = ref<{ open: boolean; data: typeof elections[0] | null }>({
  open: false,
  data: null,
});

const openCreateElectionModal = () => {
  showCreateElectionModal.value = true;
};

const closeCreateElectionModal = () => {
  showCreateElectionModal.value = false;
};

const openLiveMonitoringModal = (election: typeof elections[0]) => {
  liveMonitoringModal.value = { open: true, data: election };
};

const closeLiveMonitoringModal = () => {
  liveMonitoringModal.value = { open: false, data: null };
};

const openElectionDetailsModal = (election: typeof elections[0]) => {
  electionDetailsModal.value = { open: true, data: election };
};

const closeElectionDetailsModal = () => {
  electionDetailsModal.value = { open: false, data: null };
};

const openEditElectionModal = (election: typeof elections[0]) => {
  editElectionModal.value = { open: true, data: election };
};

const closeEditElectionModal = () => {
  editElectionModal.value = { open: false, data: null };
};

const handleSaveElection = async (updatedData: unknown) => {
  try {
    const data = updatedData as { id: string; [key: string]: any };
    if (data.id) {
      await electionService.updateElection(data.id, data);
      toast.success('Election updated successfully');
      await loadElections();
      closeEditElectionModal();
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.message || 'Failed to update election');
  }
};

// Statistics from API
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
    icon: IconUserCircleRaw,
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
    tag: 'Review Required',
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

const elections = ref<any[]>([]);
const recentActivities = ref<any[]>([]);
const electionActivities = ref<any[]>([]);
const loading = ref(false);

const quickActions = [
  {
    id: 1,
    label: 'Import New Voters',
    icon: IconUserPlusRaw,
    badge: null,
  },
  {
    id: 2,
    label: 'Create Election',
    icon: IconBoxRaw,
    badge: null,
  },
  {
    id: 3,
    label: 'Review Candidates',
    icon: IconChecksRaw,
    badge: null,
  },
  {
    id: 4,
    label: 'Handle Complaints',
    icon: IconInfoTriangleRaw,
    badge: computed(() => {
      const pendingCount = statistics.value[2]?.value || '0';
      return pendingCount !== '0' ? pendingCount : null;
    }),
  },
];

// Format date helper
const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

// Format time ago helper
const formatTimeAgo = (dateString: string) => {
  if (!dateString) return 'Just now';
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
};

// Format activity time helper
const formatActivityTime = (dateString: string) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Format action label helper
const formatActionLabel = (action: string) => {
  const actionMap: Record<string, string> = {
    'election_created': 'Election Created',
    'admin_registered': 'Admin Registered',
    'election_started': 'Election Started',
    'election_completed': 'Election Completed',
    'vote_cast': 'Vote Cast',
    'complaint_submitted': 'Complaint Submitted',
  };
  return actionMap[action] || action.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
};

// Load dashboard data
const loadDashboardData = async () => {
  loading.value = true;
  try {
    // Load dashboard stats, active elections, and recent activities
    // Note: Stats endpoint may return 401 - handled gracefully with fallback
    const [statsResponse, activeElectionsResponse, recentActivitiesResponse] = await Promise.allSettled([
      electionService.getDashboardStats().catch((error) => {
        // Silently handle 401 or other errors - will calculate from elections data instead
        // Don't log as error since we have a fallback
        if (process.env.NODE_ENV === 'development' && error?.response?.status !== 401) {
          console.warn('[Dashboard] Stats endpoint failed, will calculate from elections data:', error?.response?.status || error?.message);
        }
        return { status: 'rejected', error };
      }),
      electionService.getActiveElections(),
      electionService.getRecentActivities(),
    ]);

    // Load all elections for display and stats calculation
    await loadElections();

    // Load election activities for Elections Overview section
    try {
      const activitiesResponse = await electionService.getElectionsActivities({ limit: 50 });
      if (activitiesResponse && 'ok' in activitiesResponse && activitiesResponse.ok && 'data' in activitiesResponse) {
        const responseData = activitiesResponse.data as any;
        if (responseData?.activities && Array.isArray(responseData.activities)) {
          electionActivities.value = responseData.activities;
        } else {
          electionActivities.value = [];
        }
      } else {
        electionActivities.value = [];
      }
    } catch (error) {
      console.error('Error loading election activities:', error);
      electionActivities.value = [];
    }

    // Try to use stats from API first, fallback to calculated from elections
    // Check if stats response is successful and has valid data
    const statsResponseData = statsResponse.status === 'fulfilled' && statsResponse.value
      ? statsResponse.value
      : null;
    
    // The API response structure is: { data: {...}, ok: true, message: "..." }
    const statsData = statsResponseData?.ok && statsResponseData?.data
      ? statsResponseData.data
      : null;
    
    if (statsData) {
      // Update statistics from API response
      if (statsData.total_voters !== undefined) {
        statistics.value[0].value = (statsData.total_voters || 0).toLocaleString();
      }
      if (statsData.active_elections !== undefined) {
        statistics.value[1].value = (statsData.active_elections || 0).toString();
      }
      if (statsData.pending_complaints !== undefined) {
        statistics.value[2].value = (statsData.pending_complaints || 0).toString();
      }
      if (statsData.completed_elections !== undefined) {
        statistics.value[3].value = (statsData.completed_elections || 0).toString();
      }
    } else {
      // Calculate statistics from elections data (fallback)
      const allElections = Array.isArray(elections.value) ? elections.value : [];
      const activeElections = allElections.filter((e: any) => 
        e.status === 'active' || e.status === 'Live' || e.status === 'live'
      );
      const completedElections = allElections.filter((e: any) => 
        e.status === 'completed' || e.status === 'Completed'
      );

      // Update statistics from calculated data
      statistics.value[1].value = activeElections.length.toString();
      statistics.value[3].value = completedElections.length.toString();

      // Calculate total voters from elections (sum of eligibleVoters if available)
      let totalVoters = 0;
      for (const election of allElections) {
        const voters = typeof election.eligibleVoters === 'number' 
          ? election.eligibleVoters 
          : parseInt(String(election.eligibleVoters || 0).replace(/,/g, '')) || 0;
        totalVoters += voters;
      }
      statistics.value[0].value = totalVoters > 0 ? totalVoters.toLocaleString() : '0';
    }

    // Also update active elections count from activeElectionsResponse if stats API didn't work
    if (activeElectionsResponse.status === 'fulfilled' && activeElectionsResponse.value?.data && statsResponse.status !== 'fulfilled') {
      const activeFromApi = Array.isArray(activeElectionsResponse.value.data) 
        ? activeElectionsResponse.value.data 
        : [];
      if (activeFromApi.length > 0) {
        statistics.value[1].value = activeFromApi.length.toString();
      }
    }

    // Update recent activities
    if (recentActivitiesResponse.status === 'fulfilled' && recentActivitiesResponse.value?.data) {
      // Handle nested structure: response.data.data.activities or response.data.activities
      const responseData = recentActivitiesResponse.value.data;
      const activities = Array.isArray(responseData?.data?.activities)
        ? responseData.data.activities
        : Array.isArray(responseData?.activities)
        ? responseData.activities
        : Array.isArray(responseData)
        ? responseData
        : [];
      
      recentActivities.value = activities.slice(0, 10).map((activity: any) => ({
        id: activity.id || activity._id || Math.random().toString(),
        title: activity.action || activity.type || activity.title || 'Activity',
        description: activity.description || activity.message || activity.details || '',
        time: formatTimeAgo(activity.created_at || activity.timestamp || activity.createdAt || new Date().toISOString()),
      }));
    }

    // Load pending complaints count only if not provided by API
    if (!statsData || statsData.pending_complaints === undefined) {
      try {
        const allElections = Array.isArray(elections.value) ? elections.value : [];
        let totalPendingComplaints = 0;
        
        for (const election of allElections.slice(0, 5)) {
          try {
            const complaintsResponse = await electionService.getAllComplaintsAdmin(election.id || election._id);
            if (complaintsResponse?.data && Array.isArray(complaintsResponse.data)) {
              const pending = complaintsResponse.data.filter((c: any) => 
                c.status === 'pending' || c.status === 'under_investigation'
              );
              totalPendingComplaints += pending.length;
            }
          } catch (error) {
            // Skip failed requests
          }
        }
        
        statistics.value[2].value = totalPendingComplaints.toString();
      } catch (error) {
        console.error('Error loading complaints:', error);
      }
    }

  } catch (error: any) {
    console.error('Error loading dashboard data:', error);
    toast.error('Failed to load dashboard data');
  } finally {
    loading.value = false;
  }
};

// Load elections
const loadElections = async () => {
  try {
    const response = await electionService.getAllElectionsAdmin({ limit: 50 });
    if (response?.data && Array.isArray(response.data)) {
      elections.value = response.data.map((election: any) => ({
        id: election.id || election._id,
        title: election.title || election.name || 'Untitled Election',
        description: election.description || '',
        status: election.status === 'active' ? 'Live' : 
                election.status === 'pending' ? 'Upcoming' : 
                election.status === 'completed' ? 'Completed' : 
                election.status || 'Draft',
        startDate: formatDate(election.start_date || election.startDate),
        endDate: formatDate(election.end_date || election.endDate),
        voterTurnout: election.voter_turnout 
          ? `${Math.round(election.voter_turnout * 100)}%`
          : election.votes && election.eligible_voters
          ? `${Math.round((election.votes / election.eligible_voters) * 100)}%`
          : null,
        votes: election.total_votes || election.votes || 0,
        eligibleVoters: election.eligible_voters || election.total_voters || 0,
        positions: election.positions?.length || election.positions_count || 0,
      }));
    }
  } catch (error: any) {
    console.error('Error loading elections:', error);
    toast.error('Failed to load elections');
  }
};

// Refresh after modal actions
const handleNextStep = async (formData: unknown) => {
  try {
    const data = formData as any;
    if (data) {
      // Validate required fields
      if (!data.institution_id || !data.institution_name) {
        toast.error('Institution ID and name are required');
        return;
      }
      if (!data.type || !['school', 'estate', 'group'].includes(data.type)) {
        toast.error('Valid institution type (school, estate, or group) is required');
        return;
      }
      
      await electionService.createElection(data);
      toast.success('Election created successfully');
      await loadElections();
      await loadDashboardData();
      closeCreateElectionModal();
    }
  } catch (error: any) {
    console.error('Error creating election:', error);
    toast.error(error?.response?.data?.message || error?.message || 'Failed to create election');
  }
};

onMounted(() => {
  loadDashboardData();
});
</script>

