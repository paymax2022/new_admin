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
          v-for="election in elections"
          :key="election.id"
          class="rounded-2xl border border-[#e2e8f0] bg-white p-5"
        >
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-2">
                <h3 class="text-base font-semibold text-[#111827]">{{ election.title }}</h3>
                <span
                  class="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide"
                  :class="election.status === 'Live' ? 'border-[#16a34a] bg-[#dcfce7] text-[#16a34a]' : 'border-[#94a3b8] bg-[#f1f5f9] text-[#64748b]'"
                >
                  {{ election.status }}
                </span>
              </div>
              <p class="text-sm text-[#6b7280] mb-4">{{ election.description }}</p>
              <div class="flex flex-wrap items-center gap-6 text-sm text-[#475569]">
                <div>
                  <span class="font-semibold text-[#111827]">Start:</span>
                  <span class="ml-2">{{ election.startDate }}</span>
                </div>
                <div>
                  <span class="font-semibold text-[#111827]">End:</span>
                  <span class="ml-2">{{ election.endDate }}</span>
                </div>
                <div v-if="election.voterTurnout">
                  <span class="font-semibold text-[#111827]">Voter Turnout:</span>
                  <span class="ml-2">{{ election.voterTurnout }}</span>
                </div>
                <div v-if="election.votes && election.eligibleVoters">
                  <span class="font-semibold text-[#111827]">Details:</span>
                  <span class="ml-2">{{ election.votes }} out of {{ election.eligibleVoters }}</span>
                </div>
                <div>
                  <span class="font-semibold text-[#111827]">Positions:</span>
                  <span class="ml-2">{{ election.positions }}</span>
                </div>
                <div v-if="election.votes && !election.eligibleVoters">
                  <span class="font-semibold text-[#111827]">Votes:</span>
                  <span class="ml-2">{{ election.votes }}</span>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-2 ml-4">
              <button
                v-if="election.status === 'Live'"
                type="button"
                class="rounded-full border border-[#e2e8f0] bg-white px-4 py-2 text-sm font-semibold text-[#475569] transition hover:border-[#cbd5f5] hover:text-[#1e293b]"
                @click="openLiveMonitoringModal(election)"
              >
                Monitor
              </button>
              <button
                v-if="election.status === 'Live'"
                type="button"
                class="rounded-full bg-[#111827] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1f2937]"
                @click="openElectionDetailsModal(election)"
              >
                View
              </button>
              <button
                v-else
                type="button"
                class="rounded-full bg-[#111827] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1f2937]"
                @click="openEditElectionModal(election)"
              >
                Edit
              </button>
            </div>
          </div>
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
import { ref } from 'vue';
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

const handleNextStep = (formData: unknown) => {
  console.log('Form data:', formData);
  // Handle form submission here when all steps are completed
  closeCreateElectionModal();
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

const handleSaveElection = (updatedData: unknown) => {
  console.log('Updated election data:', updatedData);
  // Handle saving the updated election data here
  closeEditElectionModal();
};

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
    icon: IconUserCircle,
    iconBg: '#dcfce7',
    iconColor: '#16a34a',
    tag: 'Live',
    tagClass: 'border-[#16a34a] bg-[#dcfce7] text-[#16a34a]',
  },
  {
    label: 'Pending Complaints',
    value: '8,946',
    delta: '-2 from yesterday',
    deltaColor: 'text-[#dc2626]',
    icon: IconInfoTriangle,
    iconBg: '#fef3c7',
    iconColor: '#f59e0b',
    tag: 'Review Required',
    tagClass: 'border-[#f59e0b] bg-[#fef3c7] text-[#f59e0b]',
  },
  {
    label: 'Completed Elections',
    value: '15',
    delta: '+1 this month',
    deltaColor: 'text-[#16a34a]',
    icon: IconCircleCheck,
    iconBg: '#dcfce7',
    iconColor: '#16a34a',
    tag: null,
    tagClass: '',
  },
];

const elections = [
  {
    id: 1,
    title: 'Student Union President 2024',
    description: 'Annual election for Student Union leadership positions',
    status: 'Live',
    startDate: 'Dec 1, 2024',
    endDate: 'Dec 3, 2024',
    voterTurnout: '53%',
    votes: '1509 votes',
    eligibleVoters: '2847 eligible voters',
    positions: '3 positions',
  },
  {
    id: 2,
    title: 'Class Representative Elections',
    description: 'Selecting representatives for each academic class',
    status: 'Live',
    startDate: 'Dec 2, 2024',
    endDate: 'Dec 4, 2024',
    voterTurnout: '53%',
    votes: '1509 votes',
    eligibleVoters: '2847 eligible voters',
    positions: '3 positions',
  },
  {
    id: 3,
    title: 'Graduate Student Council',
    description: 'Elections for graduate student representatives',
    status: 'Upcoming',
    startDate: 'Dec 1, 2024',
    endDate: 'Dec 3, 2024',
    positions: '5 positions',
    votes: '1509 votes',
  },
];

const recentActivities = [
  {
    id: 1,
    title: 'New complaint submitted',
    description: 'Voter eligibility dispute for Student Union election',
    time: '2 minutes ago',
  },
  {
    id: 2,
    title: 'Candidate approved',
    description: 'Sarah Johnson approved for Student Union President',
    time: '2 minutes ago',
  },
  {
    id: 3,
    title: 'Election started',
    description: 'Class Representative Elections went live',
    time: '2 minutes ago',
  },
  {
    id: 4,
    title: 'Bulk voter import',
    description: '1,247 new voters added to database',
    time: '2 hours ago',
  },
];

const quickActions = [
  {
    id: 1,
    label: 'Import New Voters',
    icon: IconUserPlus,
    badge: null,
  },
  {
    id: 2,
    label: 'Create Election',
    icon: IconBox,
    badge: null,
  },
  {
    id: 3,
    label: 'Review Candidates',
    icon: IconChecks,
    badge: null,
  },
  {
    id: 4,
    label: 'Handle Complaints',
    icon: IconInfoTriangle,
    badge: '4',
  },
];
</script>

