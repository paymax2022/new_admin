<template>
  <div class="min-h-screen bg-[#f7f9fc] p-6 space-y-6">
    <!-- Header -->
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div class="space-y-1">
        <h1 class="text-2xl font-semibold text-[#111827]">Create Election</h1>
        <p class="text-sm text-[#6b7280]">Set up new elections or use templates to get started quickly</p>
      </div>
      <button
        type="button"
        class="inline-flex items-center gap-2 rounded-full bg-[#111827] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1f2937]"
        @click="openCreateElectionModal"
      >
        <IconPlus class="h-4 w-4" />
        Create Election
      </button>
    </div>

    <!-- Quick Start Templates Section -->
    <section>
      <h2 class="text-lg font-semibold text-[#111827] mb-4">Quick Start Templates</h2>
      <div class="grid gap-4 md:grid-cols-3">
        <div
          v-for="template in templates"
          :key="template.id"
          class="rounded-2xl border border-[#e2e8f0] bg-white p-6"
        >
          <div class="flex items-center gap-3 mb-4">
            <div
              class="flex h-12 w-12 items-center justify-center rounded-full"
              :style="{ backgroundColor: template.iconBg, color: template.iconColor }"
            >
              <component :is="template.icon" class="h-6 w-6" />
            </div>
            <h3 class="text-base font-semibold text-[#111827]">{{ template.title }}</h3>
          </div>
          <p class="text-sm text-[#6b7280] mb-4">{{ template.description }}</p>
          <div class="flex flex-wrap gap-2 mb-4">
            <span
              v-for="position in template.positions"
              :key="position"
              class="inline-flex items-center rounded-full border border-[#e2e8f0] bg-white px-3 py-1 text-xs font-semibold text-[#475569]"
            >
              {{ position }}
            </span>
          </div>
          <div class="flex items-center gap-4 text-xs text-[#6b7280] mb-4">
            <span>Duration: {{ template.duration }}</span>
            <span>{{ template.type }}</span>
          </div>
          <button
            type="button"
            class="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-2 text-sm font-semibold text-[#475569] transition hover:border-[#cbd5f5] hover:text-[#1e293b]"
            @click="useTemplate(template)"
          >
            Use Template
          </button>
        </div>
      </div>
    </section>

    <!-- Recent Elections Section -->
    <section>
      <div class="mb-4">
        <h2 class="text-lg font-semibold text-[#111827]">Recent Elections</h2>
        <p class="text-sm text-[#6b7280]">View and manage your recent elections</p>
      </div>
      <div class="rounded-3xl bg-white shadow-[0_20px_40px_rgba(15,23,42,0.05)] overflow-hidden">
        <div v-if="loadingElections" class="p-8 text-center">
          <p class="text-sm text-[#94a3b8]">Loading recent elections...</p>
        </div>
        <div v-else-if="recentElections.length === 0" class="p-8 text-center">
          <p class="text-sm text-[#94a3b8]">No recent elections found</p>
        </div>
        <div v-else class="divide-y divide-[#e2e8f0]">
          <div
            v-for="election in recentElections"
            :key="election.id"
            class="flex items-center justify-between p-6 hover:bg-[#f8fafc] transition"
          >
            <div class="flex items-center gap-4 flex-1">
              <div
                class="flex h-10 w-10 items-center justify-center rounded-full"
                :style="{ backgroundColor: election.iconBg, color: election.iconColor }"
              >
                <component :is="election.icon" class="h-5 w-5" />
              </div>
              <div class="flex-1">
                <h3 class="text-base font-semibold text-[#111827] mb-1">{{ election.title }}</h3>
                <p class="text-sm text-[#6b7280]">{{ election.details }}</p>
              </div>
              <span
                class="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold"
                :class="
                  election.statusRaw === 'active' || election.statusRaw === 'live'
                    ? 'border-[#0ea5e9] bg-[#e0f2fe] text-[#0ea5e9]'
                    : election.statusRaw === 'completed' || election.statusRaw === 'ended'
                    ? 'border-[#16a34a] bg-[#dcfce7] text-[#16a34a]'
                    : 'border-[#e2e8f0] bg-[#f1f5f9] text-[#64748b]'
                "
              >
                {{ election.status }}
              </span>
            </div>
            <button
              type="button"
              class="ml-4 inline-flex items-center gap-2 rounded-xl border border-[#e2e8f0] bg-white px-4 py-2 text-sm font-semibold text-[#475569] transition hover:border-[#cbd5f5] hover:text-[#1e293b]"
              @click="viewElectionDetails(election)"
            >
              <IconEye class="h-4 w-4" />
              View Details
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Create Election Modal (pre-filled when opened via Use Template) -->
    <CreateElectionModal
      v-if="showCreateElectionModal"
      :initial-template="templateToApply"
      @close="closeCreateElectionModal"
      @next="handleNextStep"
    />

    <!-- Election Details Modal -->
    <ElectionDetailsModal
      v-if="electionDetailsModal.open && electionDetailsModal.data"
      :election="electionDetailsModal.data"
      @close="closeElectionDetailsModal"
      @edit="handleEditElection"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, markRaw } from 'vue';
import { useToast } from 'vue-toastification';
import IconPlus from '@/components/icon/icon-plus.vue';
import IconUsersGroup from '@/components/icon/icon-users-group.vue';
import IconCircleCheck from '@/components/icon/icon-circle-check.vue';
import IconPlayCircle from '@/components/icon/icon-play-circle.vue';
import IconClock from '@/components/icon/icon-clock.vue';
import IconEye from '@/components/icon/icon-eye.vue';
import CreateElectionModal from './components/CreateElectionModal.vue';
import ElectionDetailsModal from './components/ElectionDetailsModal.vue';
import electionService from '@/services/electionService';

const toast = useToast();

// Mark icons as raw
const IconUsersGroupRaw = markRaw(IconUsersGroup);
const IconCircleCheckRaw = markRaw(IconCircleCheck);
const IconPlayCircleRaw = markRaw(IconPlayCircle);
const IconClockRaw = markRaw(IconClock);

const showCreateElectionModal = ref(false);
const electionDetailsModal = ref<{
  open: boolean;
  data: {
    title?: string;
    description?: string;
    startDate?: string;
    endDate?: string;
    status?: string;
    positions?: string;
    eligibleVoters?: string;
    votes?: string;
  } | null;
}>({
  open: false,
  data: null,
});

const templates = [
  {
    id: 1,
    title: 'Student Union Elections',
    description: 'Template for student government elections with standard positions',
    positions: ['President', 'Vice President', 'Secretary', 'Treasurer'],
    duration: '3 days',
    type: 'Multi-position',
    icon: IconUsersGroup,
    iconBg: '#e0f2fe',
    iconColor: '#0ea5e9',
  },
  {
    id: 2,
    title: 'Class Representative',
    description: 'Simple single-position election for class representatives',
    positions: ['Class Representative'],
    duration: '3 days',
    type: 'Multi-position',
    icon: IconUsersGroup,
    iconBg: '#e0f2fe',
    iconColor: '#0ea5e9',
  },
  {
    id: 3,
    title: 'Council Elections',
    description: 'Large-scale elections with multiple councils and positions',
    positions: ['President', 'Vice President', 'Secretary', 'Treasurer'],
    duration: '3 days',
    type: 'Multi-position',
    icon: IconCircleCheck,
    iconBg: '#dcfce7',
    iconColor: '#16a34a',
  },
];

// Recent elections from GET /api/v1/election/admin/elections?page=1&limit=10
const loadingElections = ref(false);
const recentElections = ref<Array<{
  id: string;
  title: string;
  details: string;
  status: string;
  statusRaw: string;
  icon: any;
  iconBg: string;
  iconColor: string;
  originalData?: any;
}>>([]);

const getStatusIcon = (status: string) => {
  const s = (status || '').toLowerCase();
  if (s === 'active' || s === 'ongoing' || s === 'live') return { icon: IconPlayCircleRaw, iconBg: '#e0f2fe', iconColor: '#0ea5e9' };
  if (s === 'completed' || s === 'ended') return { icon: IconCircleCheckRaw, iconBg: '#dcfce7', iconColor: '#16a34a' };
  if (s === 'upcoming' || s === 'pending') return { icon: IconClockRaw, iconBg: '#f1f5f9', iconColor: '#64748b' };
  return { icon: IconClockRaw, iconBg: '#fef3c7', iconColor: '#f59e0b' }; // draft
};

const loadRecentElections = async () => {
  loadingElections.value = true;
  try {
    const response = await electionService.getAllElectionsAdmin({ page: 1, limit: 10 });
    const rawList = response?.data?.elections ?? (Array.isArray(response?.data) ? response.data : []);
    const stats = (e: any) => e?.stats || {};
    recentElections.value = (rawList || []).map((e: any) => {
      const st = stats(e);
      const participants = st.total_participants ?? e.eligible_voters ?? e.total_voters ?? 0;
      const turnout = st.voter_turnout_percent ?? 0;
      const statusRaw = e.status || 'draft';
      const statusDisplay = statusRaw === 'active' ? 'ongoing' : statusRaw === 'pending' ? 'upcoming' : statusRaw;
      const { icon, iconBg, iconColor } = getStatusIcon(statusRaw);
      return {
        id: e.id || e._id,
        title: e.title || e.name || 'Untitled Election',
        details: `${Number(participants).toLocaleString()} eligible voters • ${turnout}% turnout`,
        status: statusDisplay,
        statusRaw,
        icon,
        iconBg,
        iconColor,
        originalData: e,
      };
    });
  } catch (error: any) {
    console.error('Error loading recent elections:', error);
    toast.error('Failed to load recent elections');
    recentElections.value = [];
  } finally {
    loadingElections.value = false;
  }
};

const templateToApply = ref<typeof templates[0] | null>(null);

const openCreateElectionModal = () => {
  templateToApply.value = null;
  showCreateElectionModal.value = true;
};

const closeCreateElectionModal = () => {
  showCreateElectionModal.value = false;
  templateToApply.value = null;
};

const handleNextStep = async (formData: unknown) => {
  try {
    const data = formData as any;
    if (data) {
      await electionService.createElection(data);
      toast.success('Election created successfully');
      await loadRecentElections(); // Reload recent elections
      closeCreateElectionModal();
    }
  } catch (error: any) {
    console.error('Error creating election:', error);
    toast.error(error?.response?.data?.message || 'Failed to create election');
  }
};

const useTemplate = (template: typeof templates[0]) => {
  templateToApply.value = template;
  showCreateElectionModal.value = true;
};

const viewElectionDetails = async (election: any) => {
  try {
    // Fetch full election details if we have the ID
    let electionData = election.originalData || election;
    
    if (election.id) {
      try {
        const response = await electionService.getElectionDetailsAdmin(election.id);
        // API returns { data: { id, title, ... }, success: true }
        if (response?.data) {
          electionData = response.data;
        }
      } catch (error) {
        console.error('Error fetching election details:', error);
        // Use existing data if fetch fails
      }
    }
    
    const stats = electionData?.stats || {};
    const eligibleVoters = stats.total_participants ?? election.eligibleVoters ?? electionData?.eligible_voters ?? electionData?.total_voters ?? 0;
    const votes = stats.total_votes ?? election.votes ?? electionData?.total_votes ?? electionData?.votes ?? 0;
    const positions = election.positions ?? electionData?.positions?.length ?? electionData?.positions_count ?? 0;
    
    // Map status to proper format
    let status = election.status || electionData.status || 'Draft';
    if (status === 'active' || status === 'live') {
      status = 'Live';
    } else if (status === 'completed' || status === 'ended') {
      status = 'Completed';
    } else if (status === 'pending' || status === 'upcoming') {
      status = 'Upcoming';
    } else if (status === 'draft') {
      status = 'Draft';
    }

    electionDetailsModal.value = {
      open: true,
      data: {
        title: election.title || electionData.title || 'Untitled Election',
        description: election.description || electionData.description || '',
        startDate: election.startDate || electionData.start_date || electionData.startDate || '',
        endDate: election.endDate || electionData.end_date || electionData.endDate || '',
        status,
        positions: positions.toString(),
        eligibleVoters: `${eligibleVoters.toLocaleString()} eligible voters`,
        votes: `${votes.toLocaleString()} votes`,
        originalData: electionData,
      },
    };
  } catch (error: any) {
    console.error('Error viewing election details:', error);
    toast.error('Failed to load election details');
  }
};

const closeElectionDetailsModal = () => {
  electionDetailsModal.value = {
    open: false,
    data: null,
  };
};

const handleEditElection = () => {
  // Capture the election data before closing
  const electionData = electionDetailsModal.value.data;
  // Close the details modal
  closeElectionDetailsModal();
  // TODO: Open edit election modal with the election data
  console.log('Edit election:', electionData);
};

// Load recent elections on mount
onMounted(() => {
  loadRecentElections();
});
</script>

