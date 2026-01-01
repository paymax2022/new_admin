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
        <div class="divide-y divide-[#e2e8f0]">
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
                class="inline-flex items-center rounded-full border border-[#e2e8f0] bg-[#f1f5f9] px-3 py-1 text-xs font-semibold text-[#64748b]"
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
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import IconPlus from '@/components/icon/icon-plus.vue';
import IconUsersGroup from '@/components/icon/icon-users-group.vue';
import IconCircleCheck from '@/components/icon/icon-circle-check.vue';
import IconPlayCircle from '@/components/icon/icon-play-circle.vue';
import IconClock from '@/components/icon/icon-clock.vue';
import IconEye from '@/components/icon/icon-eye.vue';
import CreateElectionModal from './components/CreateElectionModal.vue';
import ElectionDetailsModal from './components/ElectionDetailsModal.vue';

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

const recentElections = [
  {
    id: 1,
    title: 'Student Union President 2024',
    details: '2847 eligible voters • 53% turnout',
    status: 'ongoing',
    icon: IconPlayCircle,
    iconBg: '#e0f2fe',
    iconColor: '#0ea5e9',
  },
  {
    id: 2,
    title: 'Class Representative Elections',
    details: '1523 eligible voters • 32% turnout',
    status: 'ongoing',
    icon: IconPlayCircle,
    iconBg: '#e0f2fe',
    iconColor: '#0ea5e9',
  },
  {
    id: 3,
    title: 'Graduate Council',
    details: '892 eligible voters • 0% turnout',
    status: 'upcoming',
    icon: IconClock,
    iconBg: '#f1f5f9',
    iconColor: '#64748b',
  },
  {
    id: 4,
    title: 'Sports Committee',
    details: '456 eligible voters • 78% turnout',
    status: 'completed',
    icon: IconCircleCheck,
    iconBg: '#dcfce7',
    iconColor: '#16a34a',
  },
];

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

const useTemplate = (template: typeof templates[0]) => {
  console.log('Use template:', template);
  // Handle template usage - could open the create election modal with pre-filled data
  openCreateElectionModal();
};

const viewElectionDetails = (election: typeof recentElections[0]) => {
  // Parse the details string to extract eligible voters and turnout
  const detailsMatch = election.details.match(/(\d+)\s+eligible voters.*?(\d+)%/);
  const eligibleVoters = detailsMatch ? detailsMatch[1] : '0';
  const turnoutPercent = detailsMatch ? detailsMatch[2] : '0';
  
  // Calculate current votes based on turnout percentage
  const totalVoters = parseInt(eligibleVoters);
  const currentVotes = Math.round((totalVoters * parseInt(turnoutPercent)) / 100);

  // Set default dates based on status - using December 2024 to match the design
  let startDate = '';
  let endDate = '';
  
  if (election.status === 'ongoing') {
    startDate = new Date('2024-12-01').toISOString(); // Dec 1, 2024
    endDate = new Date('2024-12-03').toISOString(); // Dec 3, 2024
  } else if (election.status === 'upcoming') {
    startDate = new Date('2024-12-15').toISOString();
    endDate = new Date('2024-12-18').toISOString();
  } else {
    startDate = new Date('2024-11-01').toISOString();
    endDate = new Date('2024-11-03').toISOString();
  }

  // Map status to proper format
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
      description: 'Annual election for Student Union leadership positions',
      startDate,
      endDate,
      status,
      positions: '3',
      eligibleVoters: `${eligibleVoters} eligible voters`,
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
  // Capture the election data before closing
  const electionData = electionDetailsModal.value.data;
  // Close the details modal
  closeElectionDetailsModal();
  // TODO: Open edit election modal with the election data
  console.log('Edit election:', electionData);
};
</script>

