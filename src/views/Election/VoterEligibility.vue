<template>
  <div class="min-h-screen bg-[#f7f9fc] p-6 space-y-6">
    <!-- Header -->
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div class="space-y-1">
        <h1 class="text-2xl font-semibold text-[#111827]">Voter Eligibility</h1>
        <p class="text-sm text-[#6b7280]">Manage voter eligibility status and apply eligibility criteria.</p>
      </div>
    </div>

    <!-- Summary Statistics -->
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

    <!-- Eligibility Criteria Section -->
    <section class="rounded-3xl bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.05)]">
      <div class="mb-4">
        <h2 class="text-lg font-semibold text-[#111827]">Eligibility Criteria</h2>
        <p class="text-sm text-[#6b7280]">Set the requirements for voter eligibility</p>
      </div>
      <div class="flex flex-col lg:flex-row gap-4 items-end">
        <div class="flex-1 space-y-4">
          <!-- Minimum GPA -->
          <div>
            <label class="block text-sm font-semibold text-[#111827] mb-2">Minimum GPA</label>
            <input
              v-model="eligibilityCriteria.minGPA"
              type="number"
              step="0.1"
              placeholder="Enter Minimum GPA"
              class="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm text-[#1f2937] placeholder:text-[#94a3b8] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
            />
          </div>

          <!-- Fee Requirements -->
          <div class="flex items-center gap-3">
            <input
              v-model="eligibilityCriteria.feeRequirements"
              type="checkbox"
              class="h-5 w-5 rounded border-[#e2e8f0] text-[#111827] focus:ring-2 focus:ring-[#cbd5f5]"
            />
            <label class="text-sm font-semibold text-[#111827]">Fee Requirements</label>
          </div>

          <!-- Conduct Requirements -->
          <div class="flex items-center gap-3">
            <input
              v-model="eligibilityCriteria.excludeProbation"
              type="radio"
              name="conduct"
              :value="true"
              class="h-5 w-5 border-[#e2e8f0] text-[#111827] focus:ring-2 focus:ring-[#cbd5f5]"
            />
            <label class="text-sm font-semibold text-[#111827]">Exclude probation cases</label>
          </div>
        </div>

        <!-- Run Eligibility Check Button -->
        <div>
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-xl bg-[#111827] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1f2937]"
            @click="runEligibilityCheck"
          >
            Run Eligibility Check
          </button>
        </div>
      </div>
    </section>

    <!-- Search and Filter Section -->
    <section class="rounded-3xl bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.05)]">
      <h2 class="text-lg font-semibold text-[#111827] mb-4">Search & Filter</h2>
      <div class="flex flex-col lg:flex-row gap-4">
        <!-- Search Bar -->
        <div class="flex-1 relative">
          <label class="block text-sm font-semibold text-[#111827] mb-2">Search Voters</label>
          <div class="relative">
            <IconSearch class="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#94a3b8]" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Name, ID, or email..."
              class="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 pl-11 pr-4 text-sm text-[#1f2937] placeholder:text-[#94a3b8] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
            />
          </div>
        </div>

        <!-- Eligibility Status Filter -->
        <div class="lg:w-48">
          <label class="block text-sm font-semibold text-[#111827] mb-2">Eligibility Status</label>
          <select
            v-model="eligibilityFilter"
            class="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm text-[#1f2937] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
          >
            <option value="">All Status</option>
            <option value="eligible">Eligible</option>
            <option value="warning">Warning</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>

        <!-- Clear Filter Button -->
        <div class="lg:flex lg:items-end">
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-xl border border-[#e2e8f0] bg-white px-6 py-3 text-sm font-semibold text-[#475569] transition hover:border-[#cbd5f5] hover:text-[#1e293b]"
            @click="clearFilters"
          >
            <IconSettings class="h-5 w-5" />
            Clear Filter
          </button>
        </div>
      </div>
    </section>

    <!-- Voter List Table -->
    <section class="rounded-3xl bg-white shadow-[0_20px_40px_rgba(15,23,42,0.05)] overflow-hidden">
      <!-- Bulk Actions Bar -->
      <div
        v-if="selectedVoters.length > 0"
        class="flex items-center gap-4 border-b border-[#e2e8f0] px-6 py-4 bg-[#f8fafc]"
      >
        <p class="text-sm font-semibold text-[#111827]">{{ selectedVoters.length }} voters selected</p>
        <select
          v-model="bulkAction"
          class="rounded-xl border border-[#e2e8f0] bg-white px-4 py-2 text-sm text-[#1f2937] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
        >
          <option value="">Choose action</option>
          <option value="approve">Approve Eligibility</option>
          <option value="suspend">Suspend</option>
          <option value="restrict">Restrict</option>
        </select>
        <button
          type="button"
          class="rounded-xl bg-[#111827] px-6 py-2 text-sm font-semibold text-white transition hover:bg-[#1f2937]"
          @click="applyBulkAction"
        >
          Apply Action
        </button>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-[#e2e8f0]">
          <thead class="bg-[#f8fafc]">
            <tr>
              <th class="px-6 py-4 text-left">
                <input
                  type="checkbox"
                  :checked="isAllSelected"
                  class="h-5 w-5 rounded border-[#e2e8f0] text-[#111827] focus:ring-2 focus:ring-[#cbd5f5]"
                  @change="toggleSelectAll"
                />
              </th>
              <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Voter ID</th>
              <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Name</th>
              <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">GPA</th>
              <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Fees</th>
              <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Conduct</th>
              <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Status</th>
              <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Last Updated</th>
              <th class="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#e2e8f0] bg-white">
            <tr
              v-for="voter in filteredVoters"
              :key="voter.id"
              class="hover:bg-[#f8fafc] transition"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <input
                  type="checkbox"
                  :checked="isVoterSelected(voter.id)"
                  class="h-5 w-5 rounded border-[#e2e8f0] text-[#111827] focus:ring-2 focus:ring-[#cbd5f5]"
                  @change="toggleVoterSelection(voter.id)"
                />
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-[#111827]">{{ voter.voterId }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-[#475569]">{{ voter.name }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-[#111827]">{{ voter.gpa }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold text-white"
                  :class="getFeeStatusClass(voter.fees)"
                >
                  {{ voter.fees }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold text-white"
                  :class="getConductClass(voter.conduct)"
                >
                  {{ voter.conduct }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-white"
                  :class="getStatusClass(voter.status)"
                >
                  <IconCircleCheck v-if="voter.status === 'Eligible'" class="h-3.5 w-3.5" />
                  <IconInfoTriangle v-else-if="voter.status === 'Warning'" class="h-3.5 w-3.5" />
                  <IconXCircle v-else-if="voter.status === 'Suspended'" class="h-3.5 w-3.5" />
                  {{ voter.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-[#475569]">{{ voter.lastUpdated }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-right">
                <button
                  type="button"
                  class="inline-flex items-center justify-center rounded-full p-2 text-[#475569] transition hover:bg-[#f1f5f9]"
                  @click="handleVoterAction(voter)"
                >
                  <IconSettings class="h-5 w-5" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Update Eligibility Status Modal -->
    <UpdateEligibilityModal
      v-if="updateEligibilityModal.open && updateEligibilityModal.data"
      :voter="updateEligibilityModal.data"
      @close="closeUpdateEligibilityModal"
      @update="handleUpdateEligibility"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import IconUsersGroup from '@/components/icon/icon-users-group.vue';
import IconLock from '@/components/icon/icon-lock.vue';
import IconInfoTriangle from '@/components/icon/icon-info-triangle.vue';
import IconCircleCheck from '@/components/icon/icon-circle-check.vue';
import IconSearch from '@/components/icon/icon-search.vue';
import IconSettings from '@/components/icon/icon-settings.vue';
import IconXCircle from '@/components/icon/icon-x-circle.vue';
import UpdateEligibilityModal from './components/UpdateEligibilityModal.vue';

interface Voter {
  id: string;
  voterId: string;
  name: string;
  gpa: number;
  fees: 'Paid' | 'Pending' | 'Overdue';
  conduct: 'Good' | 'Warning' | 'Overdue';
  status: 'Eligible' | 'Warning' | 'Suspended';
  lastUpdated: string;
}

const searchQuery = ref('');
const eligibilityFilter = ref('');
const selectedVoters = ref<string[]>([]);
const bulkAction = ref('');
const updateEligibilityModal = ref<{ open: boolean; data: Voter | null }>({
  open: false,
  data: null,
});

const eligibilityCriteria = ref({
  minGPA: '',
  feeRequirements: true,
  excludeProbation: false,
});

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
    delta: '-2 from yesterday',
    deltaColor: 'text-[#dc2626]',
    icon: IconInfoTriangle,
    iconBg: '#fef3c7',
    iconColor: '#f59e0b',
    tag: 'Review required',
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

const voters = ref<Voter[]>([
  {
    id: '1',
    voterId: 'STU001',
    name: 'John Doe',
    gpa: 3.75,
    fees: 'Paid',
    conduct: 'Good',
    status: 'Eligible',
    lastUpdated: '1/14/2024',
  },
  {
    id: '2',
    voterId: 'STU001',
    name: 'John Doe',
    gpa: 3.75,
    fees: 'Pending',
    conduct: 'Good',
    status: 'Eligible',
    lastUpdated: '1/14/2024',
  },
  {
    id: '3',
    voterId: 'STU002',
    name: 'John Doe',
    gpa: 2.45,
    fees: 'Overdue',
    conduct: 'Warning',
    status: 'Warning',
    lastUpdated: '1/14/2024',
  },
  {
    id: '4',
    voterId: 'STU001',
    name: 'John Doe',
    gpa: 3.75,
    fees: 'Paid',
    conduct: 'Good',
    status: 'Eligible',
    lastUpdated: '1/14/2024',
  },
  {
    id: '5',
    voterId: 'STU001',
    name: 'John Doe',
    gpa: 3.12,
    fees: 'Paid',
    conduct: 'Overdue',
    status: 'Suspended',
    lastUpdated: '1/14/2024',
  },
]);

const filteredVoters = computed(() => {
  let filtered = voters.value;

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (voter) =>
        voter.name.toLowerCase().includes(query) ||
        voter.voterId.toLowerCase().includes(query)
    );
  }

  // Eligibility filter
  if (eligibilityFilter.value) {
    filtered = filtered.filter((voter) => voter.status.toLowerCase() === eligibilityFilter.value);
  }

  return filtered;
});

const getFeeStatusClass = (status: string) => {
  switch (status) {
    case 'Paid':
      return 'bg-[#16a34a]';
    case 'Pending':
      return 'bg-[#f59e0b]';
    case 'Overdue':
      return 'bg-[#dc2626]';
    default:
      return 'bg-[#94a3b8]';
  }
};

const getConductClass = (status: string) => {
  switch (status) {
    case 'Good':
      return 'bg-[#16a34a]';
    case 'Warning':
      return 'bg-[#f59e0b]';
    case 'Overdue':
      return 'bg-[#dc2626]';
    default:
      return 'bg-[#94a3b8]';
  }
};

const getStatusClass = (status: string) => {
  switch (status) {
    case 'Eligible':
      return 'bg-[#16a34a]';
    case 'Warning':
      return 'bg-[#f59e0b]';
    case 'Suspended':
      return 'bg-[#dc2626]';
    default:
      return 'bg-[#94a3b8]';
  }
};

const clearFilters = () => {
  searchQuery.value = '';
  eligibilityFilter.value = '';
};

const runEligibilityCheck = () => {
  console.log('Running eligibility check with criteria:', eligibilityCriteria.value);
  // Handle eligibility check
};

const handleVoterAction = (voter: Voter) => {
  updateEligibilityModal.value = { open: true, data: voter };
};

const closeUpdateEligibilityModal = () => {
  updateEligibilityModal.value = { open: false, data: null };
};

const handleUpdateEligibility = (data: { voter: Voter; newStatus: string; reason: string }) => {
  console.log('Update eligibility:', data);
  // Handle eligibility update
};

const isVoterSelected = (voterId: string) => {
  return selectedVoters.value.includes(voterId);
};

const toggleVoterSelection = (voterId: string) => {
  const index = selectedVoters.value.indexOf(voterId);
  if (index > -1) {
    selectedVoters.value.splice(index, 1);
  } else {
    selectedVoters.value.push(voterId);
  }
};

const isAllSelected = computed(() => {
  return filteredVoters.value.length > 0 && selectedVoters.value.length === filteredVoters.value.length;
});

const toggleSelectAll = () => {
  if (isAllSelected.value) {
    selectedVoters.value = [];
  } else {
    selectedVoters.value = filteredVoters.value.map((voter) => voter.id);
  }
};

const applyBulkAction = () => {
  if (!bulkAction.value) return;
  console.log('Apply bulk action:', bulkAction.value, 'to voters:', selectedVoters.value);
  // Handle bulk action
  selectedVoters.value = [];
  bulkAction.value = '';
};
</script>

