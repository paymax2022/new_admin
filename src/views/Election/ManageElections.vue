<template>
  <div class="min-h-screen bg-[#f7f9fc] p-6 space-y-6">
    <!-- Header -->
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div class="space-y-1">
        <h1 class="text-2xl font-semibold text-[#111827]">Manage Elections</h1>
        <p class="text-sm text-[#6b7280]">Monitor, control, and manage all your elections.</p>
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

    <!-- Statistics Cards -->
    <section class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <div
        v-for="stat in statistics"
        :key="stat.label"
        class="flex items-center justify-between rounded-3xl bg-white p-5 shadow-[0_20px_40px_rgba(15,23,42,0.05)]"
      >
        <div class="flex-1 min-w-0">
          <p class="text-sm font-semibold text-[#111827] mb-1">{{ stat.label }}</p>
          <p class="text-2xl font-semibold text-[#111827]">{{ stat.value }}</p>
        </div>
        <div
          class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full ml-2"
          :style="{ backgroundColor: stat.iconBg, color: stat.iconColor }"
        >
          <component :is="stat.icon" class="h-5 w-5" />
        </div>
      </div>
    </section>

    <!-- Search and Filter -->
    <section class="flex flex-col sm:flex-row gap-4">
      <div class="relative flex-1">
        <IconSearch class="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#94a3b8] pointer-events-none" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search elections..."
          class="w-full rounded-xl border border-[#e2e8f0] bg-white pl-10 pr-4 py-3 text-sm text-[#1f2937] placeholder:text-[#94a3b8] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
        />
      </div>
      <select
        v-model="statusFilter"
        class="rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm text-[#1f2937] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
      >
        <option value="">All Status</option>
        <option value="ongoing">Ongoing</option>
        <option value="upcoming">Upcoming</option>
        <option value="completed">Completed</option>
        <option value="draft">Draft</option>
      </select>
    </section>

    <!-- Elections List -->
    <section class="space-y-4">
      <div
        v-for="election in filteredElections"
        :key="election.id"
        class="rounded-3xl bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.05)]"
      >
        <div class="flex items-start justify-between gap-4">
          <div class="flex-1">
            <!-- Title and Status -->
            <div class="flex items-center gap-3 mb-2">
              <h3 class="text-lg font-semibold text-[#111827]">{{ election.title }}</h3>
              <span
                class="inline-flex items-center rounded-full border border-[#e2e8f0] bg-[#f1f5f9] px-3 py-1 text-xs font-semibold text-[#475569]"
              >
                {{ election.status }}
              </span>
            </div>

            <!-- Description -->
            <p class="text-sm text-[#6b7280] mb-4">{{ election.description }}</p>

            <!-- Details -->
            <div class="flex flex-wrap items-center gap-6 mb-4">
              <div class="flex items-center gap-2 text-sm text-[#475569]">
                <IconCalendar class="h-4 w-4 text-[#94a3b8]" />
                <span>{{ election.dateRange }}</span>
              </div>
              <div class="flex items-center gap-2 text-sm text-[#475569]">
                <IconUsersGroup class="h-4 w-4 text-[#94a3b8]" />
                <span>{{ election.voters }}</span>
              </div>
              <div class="flex items-center gap-2 text-sm text-[#475569]">
                <IconAward class="h-4 w-4 text-[#94a3b8]" />
                <span>{{ election.positions }}</span>
              </div>
            </div>

            <!-- Statistics -->
            <div class="grid grid-cols-3 gap-4 pt-4 border-t border-[#e2e8f0]">
              <div>
                <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8] mb-1">Votes Cast</p>
                <p class="text-base font-semibold text-[#111827]">{{ election.votesCast }}</p>
              </div>
              <div>
                <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8] mb-1">Turnout</p>
                <p class="text-base font-semibold text-[#111827]">{{ election.turnout }}</p>
              </div>
              <div>
                <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8] mb-1">Candidates</p>
                <p class="text-base font-semibold text-[#111827]">{{ election.candidates }}</p>
              </div>
            </div>
          </div>

          <!-- Action Menu -->
          <div class="relative action-menu-container">
            <button
              type="button"
              class="flex h-8 w-8 items-center justify-center rounded-full text-[#475569] transition hover:bg-[#f1f5f9]"
              @click.stop="toggleActionMenu(election.id)"
            >
              <IconHorizontalDots class="h-5 w-5" />
            </button>

            <!-- Dropdown Menu -->
            <div
              v-if="activeActionMenu === election.id"
              class="absolute right-0 top-10 z-10 w-48 rounded-xl border border-[#e2e8f0] bg-white shadow-lg"
              @click.stop
            >
              <div class="py-2">
                <button
                  type="button"
                  class="flex w-full items-center gap-3 px-4 py-2 text-sm font-semibold text-[#475569] transition hover:bg-[#f8fafc]"
                  @click="viewDetails(election)"
                >
                  <IconEye class="h-4 w-4" />
                  View Details
                </button>
                <button
                  type="button"
                  class="flex w-full items-center gap-3 px-4 py-2 text-sm font-semibold text-[#475569] transition hover:bg-[#f8fafc]"
                  @click="editElection(election)"
                >
                  <IconEdit class="h-4 w-4" />
                  Edit Election
                </button>
                <button
                  v-if="election.status === 'ongoing'"
                  type="button"
                  class="flex w-full items-center gap-3 px-4 py-2 text-sm font-semibold text-[#475569] transition hover:bg-[#f8fafc]"
                  @click="pauseElection(election)"
                >
                  <IconPause class="h-4 w-4" />
                  Pause Election
                </button>
                <button
                  v-if="election.status === 'ongoing'"
                  type="button"
                  class="flex w-full items-center gap-3 px-4 py-2 text-sm font-semibold text-[#475569] transition hover:bg-[#f8fafc]"
                  @click="endElection(election)"
                >
                  <IconX class="h-4 w-4" />
                  End Election
                </button>
                <button
                  type="button"
                  class="flex w-full items-center gap-3 px-4 py-2 text-sm font-semibold text-[#475569] transition hover:bg-[#f8fafc]"
                  @click="viewResults(election)"
                >
                  <IconBarChart class="h-4 w-4" />
                  View Results
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Create Election Modal -->
    <CreateElectionModal
      v-if="showCreateElectionModal"
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

    <!-- Edit Election Modal -->
    <EditElectionModal
      v-if="editElectionModal.open && editElectionModal.data"
      :election="editElectionModal.data"
      @close="closeEditElectionModal"
      @save="handleSaveElection"
    />

    <!-- Pause Election Modal -->
    <PauseElectionModal
      v-if="pauseElectionModal.open && pauseElectionModal.data"
      :election="pauseElectionModal.data"
      @close="closePauseElectionModal"
      @confirm="handleConfirmPause"
    />

    <!-- End Election Modal -->
    <EndElectionModal
      v-if="endElectionModal.open && endElectionModal.data"
      :election="endElectionModal.data"
      @close="closeEndElectionModal"
      @confirm="handleConfirmEnd"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import IconPlus from '@/components/icon/icon-plus.vue';
import IconPlayCircle from '@/components/icon/icon-play-circle.vue';
import IconClock from '@/components/icon/icon-clock.vue';
import IconCircleCheck from '@/components/icon/icon-circle-check.vue';
import IconEdit from '@/components/icon/icon-edit.vue';
import IconSearch from '@/components/icon/icon-search.vue';
import IconCalendar from '@/components/icon/icon-calendar.vue';
import IconUsersGroup from '@/components/icon/icon-users-group.vue';
import IconAward from '@/components/icon/icon-award.vue';
import IconEye from '@/components/icon/icon-eye.vue';
import IconBarChart from '@/components/icon/icon-bar-chart.vue';
import IconX from '@/components/icon/icon-x.vue';
import IconHorizontalDots from '@/components/icon/icon-horizontal-dots.vue';
import IconPause from '@/components/icon/icon-pause.vue';
import CreateElectionModal from './components/CreateElectionModal.vue';
import ElectionDetailsModal from './components/ElectionDetailsModal.vue';
import EditElectionModal from './components/EditElectionModal.vue';
import PauseElectionModal from './components/PauseElectionModal.vue';
import EndElectionModal from './components/EndElectionModal.vue';

const showCreateElectionModal = ref(false);
const searchQuery = ref('');
const statusFilter = ref('');
const activeActionMenu = ref<number | null>(null);
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

const editElectionModal = ref<{
  open: boolean;
  data: {
    title?: string;
    description?: string;
    startDate?: string;
    endDate?: string;
    positions?: string;
    eligibleVoters?: string;
  } | null;
}>({
  open: false,
  data: null,
});

const pauseElectionModal = ref<{
  open: boolean;
  data: {
    title?: string;
  } | null;
}>({
  open: false,
  data: null,
});

const endElectionModal = ref<{
  open: boolean;
  data: {
    title?: string;
  } | null;
}>({
  open: false,
  data: null,
});

const statistics = [
  {
    label: 'Active Elections',
    value: '2',
    icon: IconPlayCircle,
    iconBg: '#e0f2fe',
    iconColor: '#0ea5e9',
  },
  {
    label: 'Upcoming',
    value: '1',
    icon: IconClock,
    iconBg: '#f1f5f9',
    iconColor: '#64748b',
  },
  {
    label: 'Completed',
    value: '1',
    icon: IconCircleCheck,
    iconBg: '#dcfce7',
    iconColor: '#16a34a',
  },
  {
    label: 'Drafts',
    value: '1',
    icon: IconEdit,
    iconBg: '#fef3c7',
    iconColor: '#f59e0b',
  },
];

const elections = [
  {
    id: 1,
    title: 'Student Union President 2024',
    description: 'Annual election for Student Union leadership positions.',
    status: 'ongoing',
    dateRange: '12/1/2024 - 12/3/2024',
    voters: '2847 voters',
    positions: '3 positions',
    votesCast: '1509',
    turnout: '53%',
    candidates: '8',
  },
  {
    id: 2,
    title: 'Student Union President 2024',
    description: 'Annual election for Student Union leadership positions.',
    status: 'upcoming',
    dateRange: '12/1/2024 - 12/3/2024',
    voters: '2847 voters',
    positions: '3 positions',
    votesCast: '1509',
    turnout: '53%',
    candidates: '8',
  },
];

const filteredElections = computed(() => {
  let filtered = elections;

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (election) =>
        election.title.toLowerCase().includes(query) ||
        election.description.toLowerCase().includes(query)
    );
  }

  // Filter by status
  if (statusFilter.value) {
    filtered = filtered.filter((election) => election.status === statusFilter.value);
  }

  return filtered;
});

const toggleActionMenu = (electionId: number) => {
  activeActionMenu.value = activeActionMenu.value === electionId ? null : electionId;
};

const openCreateElectionModal = () => {
  showCreateElectionModal.value = true;
};

const closeCreateElectionModal = () => {
  showCreateElectionModal.value = false;
};

const handleNextStep = (formData: unknown) => {
  console.log('Form data:', formData);
  closeCreateElectionModal();
};

const viewDetails = (election: typeof elections[0]) => {
  activeActionMenu.value = null;
  
  // Parse date range (format: "12/1/2024 - 12/3/2024")
  const dateParts = election.dateRange.split(' - ');
  const startDateStr = dateParts[0] || '';
  const endDateStr = dateParts[1] || '';
  
  // Convert to ISO format for the modal
  const parseDate = (dateStr: string) => {
    if (!dateStr) return '';
    const [month, day, year] = dateStr.split('/');
    return new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`).toISOString();
  };
  
  // Extract voters count
  const votersMatch = election.voters.match(/(\d+)/);
  const votersCount = votersMatch ? votersMatch[1] : '0';
  
  // Calculate votes from turnout percentage
  const turnoutPercent = parseInt(election.turnout.replace('%', '')) || 0;
  const totalVoters = parseInt(votersCount);
  const currentVotes = Math.round((totalVoters * turnoutPercent) / 100);
  
  // Map status
  let status = election.status;
  if (status === 'ongoing') {
    status = 'Live';
  } else if (status === 'completed') {
    status = 'Completed';
  } else if (status === 'upcoming') {
    status = 'Upcoming';
  }
  
  electionDetailsModal.value = {
    open: true,
    data: {
      title: election.title,
      description: election.description,
      startDate: parseDate(startDateStr),
      endDate: parseDate(endDateStr),
      status,
      positions: election.positions,
      eligibleVoters: `${votersCount} eligible voters`,
      votes: `${currentVotes} votes`,
    },
  };
};

const closeElectionDetailsModal = () => {
  electionDetailsModal.value = {
    open: false,
    data: null,
  };
};

const handleEditElection = () => {
  const electionData = electionDetailsModal.value.data;
  closeElectionDetailsModal();
  if (electionData) {
    openEditElectionModal(electionData);
  }
};

const editElection = (election: typeof elections[0]) => {
  activeActionMenu.value = null;
  
  // Parse date range (format: "12/1/2024 - 12/3/2024")
  const dateParts = election.dateRange.split(' - ');
  const startDateStr = dateParts[0] || '';
  const endDateStr = dateParts[1] || '';
  
  // Convert to ISO format for the modal
  const parseDate = (dateStr: string) => {
    if (!dateStr) return '';
    const [month, day, year] = dateStr.split('/');
    return new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`).toISOString();
  };
  
  // Extract voters count
  const votersMatch = election.voters.match(/(\d+)/);
  const votersCount = votersMatch ? votersMatch[1] : '0';
  
  openEditElectionModal({
    title: election.title,
    description: election.description,
    startDate: parseDate(startDateStr),
    endDate: parseDate(endDateStr),
    positions: election.positions,
    eligibleVoters: `${votersCount} eligible voters`,
  });
};

const openEditElectionModal = (electionData: {
  title?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  positions?: string;
  eligibleVoters?: string;
}) => {
  editElectionModal.value = {
    open: true,
    data: electionData,
  };
};

const closeEditElectionModal = () => {
  editElectionModal.value = {
    open: false,
    data: null,
  };
};

const handleSaveElection = (formData: unknown) => {
  console.log('Save election:', formData);
  // TODO: Save election changes
  closeEditElectionModal();
};

const pauseElection = (election: typeof elections[0]) => {
  activeActionMenu.value = null;
  pauseElectionModal.value = {
    open: true,
    data: {
      title: election.title,
    },
  };
};

const closePauseElectionModal = () => {
  pauseElectionModal.value = {
    open: false,
    data: null,
  };
};

const handleConfirmPause = (election: { title?: string }) => {
  console.log('Pause election confirmed:', election);
  // TODO: Implement pause election logic
  closePauseElectionModal();
};

const endElection = (election: typeof elections[0]) => {
  activeActionMenu.value = null;
  endElectionModal.value = {
    open: true,
    data: {
      title: election.title,
    },
  };
};

const closeEndElectionModal = () => {
  endElectionModal.value = {
    open: false,
    data: null,
  };
};

const handleConfirmEnd = (election: { title?: string }) => {
  console.log('End election confirmed:', election);
  // TODO: Implement end election logic
  closeEndElectionModal();
};

const viewResults = (election: typeof elections[0]) => {
  console.log('View results:', election);
  activeActionMenu.value = null;
};

// Close menu when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (!target.closest('.action-menu-container')) {
    activeActionMenu.value = null;
  }
};

// Add click outside listener on mount
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

