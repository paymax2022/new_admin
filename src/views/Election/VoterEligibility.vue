<template>
  <div class="min-h-screen bg-[#f7f9fc] p-6 space-y-6">
    <!-- Header -->
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div class="space-y-1">
        <h1 class="text-2xl font-semibold text-[#111827]">Voter Eligibility</h1>
        <p class="text-sm text-[#6b7280]">Manage voter eligibility status and apply eligibility criteria.</p>
      </div>
    </div>

    <!-- Directory Type Tabs -->
    <section class="rounded-3xl bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.05)]">
      <div class="flex gap-2 border-b border-[#e2e8f0]">
        <button
          v-for="type in directoryTypes"
          :key="type.value"
          type="button"
          @click="selectedDirectoryType = type.value"
          class="px-4 py-2 text-sm font-semibold transition"
          :class="
            selectedDirectoryType === type.value
              ? 'text-[#2563eb] border-b-2 border-[#2563eb]'
              : 'text-[#6b7280] hover:text-[#111827]'
          "
        >
          {{ type.label }}
        </button>
      </div>
    </section>

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
              @input="handleSearch"
            />
          </div>
        </div>

        <!-- Type-specific Filters -->
        <template v-if="selectedDirectoryType === 'school'">
          <div class="lg:w-48">
            <label class="block text-sm font-semibold text-[#111827] mb-2">Department</label>
            <input
              v-model="filters.department"
              type="text"
              placeholder="e.g., Computer Science"
              class="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm text-[#1f2937] placeholder:text-[#94a3b8] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
              @input="handleFilterChange"
            />
          </div>
          <div class="lg:w-32">
            <label class="block text-sm font-semibold text-[#111827] mb-2">Level</label>
            <input
              v-model="filters.level"
              type="text"
              placeholder="e.g., 200"
              class="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm text-[#1f2937] placeholder:text-[#94a3b8] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
              @input="handleFilterChange"
            />
          </div>
        </template>

        <template v-if="selectedDirectoryType === 'estate'">
          <div class="lg:w-48">
            <label class="block text-sm font-semibold text-[#111827] mb-2">Block</label>
            <input
              v-model="filters.block"
              type="text"
              placeholder="e.g., A"
              class="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm text-[#1f2937] placeholder:text-[#94a3b8] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
              @input="handleFilterChange"
            />
          </div>
          <div class="lg:w-48">
            <label class="block text-sm font-semibold text-[#111827] mb-2">House Type</label>
            <input
              v-model="filters.house_type"
              type="text"
              placeholder="e.g., flat"
              class="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm text-[#1f2937] placeholder:text-[#94a3b8] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
              @input="handleFilterChange"
            />
          </div>
        </template>

        <template v-if="selectedDirectoryType === 'group'">
          <div class="lg:w-48">
            <label class="block text-sm font-semibold text-[#111827] mb-2">Membership Type</label>
            <input
              v-model="filters.membership_type"
              type="text"
              placeholder="e.g., regular"
              class="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm text-[#1f2937] placeholder:text-[#94a3b8] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
              @input="handleFilterChange"
            />
          </div>
          <div class="lg:w-48">
            <label class="block text-sm font-semibold text-[#111827] mb-2">Zone</label>
            <input
              v-model="filters.zone"
              type="text"
              placeholder="e.g., North"
              class="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm text-[#1f2937] placeholder:text-[#94a3b8] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
              @input="handleFilterChange"
            />
          </div>
        </template>

        <!-- Common Filters -->
        <div class="lg:w-48">
          <label class="block text-sm font-semibold text-[#111827] mb-2">Dues/Fee Status</label>
          <select
            v-model="filters.dues_status"
            class="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm text-[#1f2937] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
            @change="handleFilterChange"
          >
            <option value="">All Status</option>
            <option value="paid">Paid</option>
            <option value="cleared">Cleared</option>
            <option value="pending">Pending</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>

        <div class="lg:w-48">
          <label class="block text-sm font-semibold text-[#111827] mb-2">Eligibility Status</label>
          <select
            v-model="filters.eligibility_status"
            class="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm text-[#1f2937] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
            @change="handleFilterChange"
          >
            <option value="">All Status</option>
            <option value="eligible">Eligible</option>
            <option value="restricted">Restricted</option>
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

      <div v-if="loading" class="p-8 text-center">
        <p class="text-sm text-[#94a3b8]">Loading voters...</p>
      </div>
      <div v-else-if="voters.length === 0" class="p-8 text-center">
        <p class="text-sm text-[#94a3b8]">No voters found</p>
      </div>
      <div v-else class="overflow-x-auto">
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
              <th v-if="selectedDirectoryType === 'school'" class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Department</th>
              <th v-if="selectedDirectoryType === 'estate'" class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Block</th>
              <th v-if="selectedDirectoryType === 'group'" class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Zone</th>
              <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Fees/Dues</th>
              <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Status</th>
              <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Last Updated</th>
              <th class="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#e2e8f0] bg-white">
            <tr
              v-for="voter in filteredVoters"
              :key="voter.id || voter.participant_id || voter._id"
              class="hover:bg-[#f8fafc] transition"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <input
                  type="checkbox"
                  :checked="isVoterSelected(voter.id || voter.participant_id || voter._id)"
                  class="h-5 w-5 rounded border-[#e2e8f0] text-[#111827] focus:ring-2 focus:ring-[#cbd5f5]"
                  @change="toggleVoterSelection(voter.id || voter.participant_id || voter._id)"
                />
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-[#111827]">
                {{ voter.identifier || voter.student_id || voter.member_id || voter.id || 'N/A' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-[#475569]">
                {{ voter.name || voter.full_name || voter.participant_name || 'N/A' }}
              </td>
              <td v-if="selectedDirectoryType === 'school'" class="px-6 py-4 whitespace-nowrap text-sm text-[#475569]">
                {{ voter.department || 'N/A' }}
              </td>
              <td v-if="selectedDirectoryType === 'estate'" class="px-6 py-4 whitespace-nowrap text-sm text-[#475569]">
                {{ voter.block || 'N/A' }}
              </td>
              <td v-if="selectedDirectoryType === 'group'" class="px-6 py-4 whitespace-nowrap text-sm text-[#475569]">
                {{ voter.zone || 'N/A' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold text-white"
                  :class="getFeeStatusClass(voter.fee_status || voter.dues_status)"
                >
                  {{ formatStatus(voter.fee_status || voter.dues_status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-white"
                  :class="getStatusClass(voter.eligibility_status || voter.is_eligible)"
                >
                  <IconCircleCheck v-if="isEligible(voter)" class="h-3.5 w-3.5" />
                  <IconInfoTriangle v-else-if="isRestricted(voter)" class="h-3.5 w-3.5" />
                  <IconXCircle v-else-if="isSuspended(voter)" class="h-3.5 w-3.5" />
                  {{ formatEligibility(voter.eligibility_status || voter.is_eligible) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-[#475569]">
                {{ formatDate(voter.updated_at || voter.updatedAt || voter.last_updated) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right">
                <div class="flex items-center justify-end gap-2">
                  <button
                    type="button"
                    class="inline-flex items-center justify-center rounded-full p-2 text-[#475569] transition hover:bg-[#f1f5f9]"
                    @click="viewVoterProfile(voter)"
                    title="View Profile"
                  >
                    <IconEye class="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    class="inline-flex items-center justify-center rounded-full p-2 text-[#475569] transition hover:bg-[#f1f5f9]"
                    @click="handleVoterAction(voter)"
                    title="Update Eligibility"
                  >
                    <IconSettings class="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="voters.length > 0" class="flex items-center justify-between border-t border-[#e2e8f0] bg-[#f8fafc] px-6 py-4">
        <div class="text-sm text-[#6b7280]">
          Showing {{ (currentPage - 1) * pageSize + 1 }} to {{ Math.min(currentPage * pageSize, totalVoters) }} of {{ totalVoters }} voters
        </div>
        <div class="flex gap-2">
          <button
            type="button"
            :disabled="currentPage === 1"
            @click="loadPage(currentPage - 1)"
            class="rounded-xl border border-[#e2e8f0] bg-white px-4 py-2 text-sm font-semibold text-[#475569] transition disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#f8fafc]"
          >
            Previous
          </button>
          <button
            type="button"
            :disabled="currentPage * pageSize >= totalVoters"
            @click="loadPage(currentPage + 1)"
            class="rounded-xl border border-[#e2e8f0] bg-white px-4 py-2 text-sm font-semibold text-[#475569] transition disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#f8fafc]"
          >
            Next
          </button>
        </div>
      </div>
    </section>

    <!-- Update Eligibility Status Modal -->
    <UpdateEligibilityModal
      v-if="updateEligibilityModal.open && updateEligibilityModal.data"
      :voter="updateEligibilityModal.data"
      :election-id="electionId"
      @close="closeUpdateEligibilityModal"
      @update="handleUpdateEligibility"
      @flag="handleFlagParticipant"
    />

    <!-- Participant Profile Modal -->
    <MemberProfileModal
      v-if="profileModal.open && profileModal.data"
      :member="profileModal.data"
      :election-id="electionId"
      @close="closeProfileModal"
      @eligibility-updated="handleEligibilityUpdated"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, watch, markRaw } from 'vue';
import { useToast } from 'vue-toastification';
import { useRoute } from 'vue-router';
import IconUsersGroup from '@/components/icon/icon-users-group.vue';
import IconLock from '@/components/icon/icon-lock.vue';
import IconInfoTriangle from '@/components/icon/icon-info-triangle.vue';
import IconCircleCheck from '@/components/icon/icon-circle-check.vue';
import IconSearch from '@/components/icon/icon-search.vue';
import IconSettings from '@/components/icon/icon-settings.vue';
import IconXCircle from '@/components/icon/icon-x-circle.vue';
import IconEye from '@/components/icon/icon-eye.vue';
import UpdateEligibilityModal from './components/UpdateEligibilityModal.vue';
import MemberProfileModal from './components/MemberProfileModal.vue';
import electionService from '@/services/electionService';

const toast = useToast();
const route = useRoute();

// Mark icons as raw
const IconUsersGroupRaw = markRaw(IconUsersGroup);
const IconLockRaw = markRaw(IconLock);
const IconInfoTriangleRaw = markRaw(IconInfoTriangle);
const IconCircleCheckRaw = markRaw(IconCircleCheck);

// Directory types
const directoryTypes = [
  { label: 'School', value: 'school' },
  { label: 'Estate', value: 'estate' },
  { label: 'Group', value: 'group' },
];

const selectedDirectoryType = ref<'school' | 'estate' | 'group'>('school');
const searchQuery = ref('');
const eligibilityFilter = ref('');
const loading = ref(false);
const voters = ref<any[]>([]);
const totalVoters = ref(0);
const currentPage = ref(1);
const pageSize = ref(50);
const electionId = ref<string | null>(null);
const selectedVoters = ref<string[]>([]);
const bulkAction = ref('');
const directoryStats = ref<any>(null);

// Filters
const filters = ref({
  department: '',
  level: '',
  block: '',
  house_type: '',
  membership_type: '',
  zone: '',
  dues_status: '',
  eligibility_status: '',
});

const updateEligibilityModal = ref<{ open: boolean; data: any | null }>({
  open: false,
  data: null,
});

const profileModal = ref<{ open: boolean; data: any | null }>({
  open: false,
  data: null,
});

const eligibilityCriteria = ref({
  minGPA: '',
  feeRequirements: true,
  excludeProbation: false,
});

// Statistics - will be updated from API
const statistics = ref([
  {
    label: 'Total Participants',
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
    label: 'Eligible',
    value: '0',
    delta: '',
    deltaColor: 'text-[#16a34a]',
    icon: IconCircleCheckRaw,
    iconBg: '#dcfce7',
    iconColor: '#16a34a',
    tag: null,
    tagClass: '',
  },
  {
    label: 'Ineligible',
    value: '0',
    delta: '',
    deltaColor: 'text-[#dc2626]',
    icon: IconInfoTriangleRaw,
    iconBg: '#fef3c7',
    iconColor: '#f59e0b',
    tag: null,
    tagClass: '',
  },
  {
    label: 'Candidates',
    value: '0',
    delta: '',
    deltaColor: 'text-[#16a34a]',
    icon: IconLockRaw,
    iconBg: '#dcfce7',
    iconColor: '#16a34a',
    tag: null,
    tagClass: '',
  },
]);

// Get election ID from route or activities
const getElectionId = async (): Promise<string | null> => {
  // Try route query first
  if (route.query.electionId) {
    return route.query.electionId as string;
  }

  // Try to get from recent activities
  try {
    const recentResponse = await electionService.getRecentActivities();
    if (recentResponse && 'ok' in recentResponse && recentResponse.ok && 'data' in recentResponse) {
      const responseData = recentResponse.data as any;
      const activities = responseData?.activities || responseData?.data?.activities || [];
      
      for (const activity of activities) {
        const id = activity.election_id;
        if (id && id !== '000000000000000000000000') {
          return id;
        }
      }
    }
  } catch (error) {
    console.error('Error getting election ID:', error);
  }

  return null;
};

// Load directory data
const loadDirectory = async (resetPage = false) => {
  if (!electionId.value) {
    const id = await getElectionId();
    if (!id) {
      toast.error('No election ID found. Please select an election first.');
      return;
    }
    electionId.value = id;
  }

  if (resetPage) {
    currentPage.value = 1;
  }

  loading.value = true;
  try {
    const offset = (currentPage.value - 1) * pageSize.value;
    const params: any = {
      limit: pageSize.value,
      offset,
    };

    // Add filters based on directory type
    if (selectedDirectoryType.value === 'school') {
      if (filters.value.department) params.department = filters.value.department;
      if (filters.value.level) params.level = filters.value.level;
      if (filters.value.dues_status) params.fee_status = filters.value.dues_status;
      if (filters.value.eligibility_status) params.eligibility_status = filters.value.eligibility_status;

      const response = await electionService.getSchoolDirectory(electionId.value, params);
      if (response && 'ok' in response && response.ok && 'data' in response) {
        const responseData = response.data as any;
        const participants = responseData?.participants || responseData?.data?.participants || [];
        voters.value = Array.isArray(participants) ? participants : [];
        totalVoters.value = responseData?.total_count || responseData?.total || voters.value.length;
        directoryStats.value = responseData?.statistics || null;
        updateStatistics();
      } else {
        const responseData = response?.data as any;
        const participants = responseData?.participants || responseData?.data?.participants || [];
        voters.value = Array.isArray(participants) ? participants : [];
        totalVoters.value = responseData?.total_count || responseData?.total || voters.value.length;
        directoryStats.value = responseData?.statistics || null;
        updateStatistics();
      }
    } else if (selectedDirectoryType.value === 'estate') {
      if (filters.value.block) params.block = filters.value.block;
      if (filters.value.house_type) params.house_type = filters.value.house_type;
      if (filters.value.dues_status) params.dues_status = filters.value.dues_status;
      if (filters.value.eligibility_status) params.eligibility_status = filters.value.eligibility_status;

      const response = await electionService.getEstateDirectory(electionId.value, params);
      if (response && 'ok' in response && response.ok && 'data' in response) {
        const responseData = response.data as any;
        const participants = responseData?.participants || responseData?.data?.participants || [];
        voters.value = Array.isArray(participants) ? participants : [];
        totalVoters.value = responseData?.total_count || responseData?.total || voters.value.length;
        directoryStats.value = responseData?.statistics || null;
        updateStatistics();
      } else {
        const responseData = response?.data as any;
        const participants = responseData?.participants || responseData?.data?.participants || [];
        voters.value = Array.isArray(participants) ? participants : [];
        totalVoters.value = responseData?.total_count || responseData?.total || voters.value.length;
        directoryStats.value = responseData?.statistics || null;
        updateStatistics();
      }
    } else if (selectedDirectoryType.value === 'group') {
      if (filters.value.membership_type) params.membership_type = filters.value.membership_type;
      if (filters.value.zone) params.zone = filters.value.zone;
      if (filters.value.dues_status) params.dues_status = filters.value.dues_status;
      if (filters.value.eligibility_status) params.eligibility_status = filters.value.eligibility_status;

      const response = await electionService.getGroupDirectory(electionId.value, params);
      if (response && 'ok' in response && response.ok && 'data' in response) {
        const responseData = response.data as any;
        const participants = responseData?.participants || responseData?.data?.participants || [];
        voters.value = Array.isArray(participants) ? participants : [];
        totalVoters.value = responseData?.total_count || responseData?.total || voters.value.length;
        directoryStats.value = responseData?.statistics || null;
        updateStatistics();
      } else {
        const responseData = response?.data as any;
        const participants = responseData?.participants || responseData?.data?.participants || [];
        voters.value = Array.isArray(participants) ? participants : [];
        totalVoters.value = responseData?.total_count || responseData?.total || voters.value.length;
        directoryStats.value = responseData?.statistics || null;
        updateStatistics();
      }
    }
  } catch (error: any) {
    console.error('Error loading directory:', error);
    toast.error(error?.response?.data?.message || 'Failed to load directory');
    voters.value = [];
    totalVoters.value = 0;
  } finally {
    loading.value = false;
  }
};

// Update statistics from directory response
const updateStatistics = () => {
  if (directoryStats.value) {
    statistics.value[0].value = (directoryStats.value.total_participants || 0).toLocaleString();
    statistics.value[1].value = (directoryStats.value.eligible_count || 0).toLocaleString();
    statistics.value[2].value = (directoryStats.value.ineligible_count || 0).toLocaleString();
    statistics.value[3].value = (directoryStats.value.candidates_count || 0).toLocaleString();
  }
};

// Filtered voters (client-side search)
const filteredVoters = computed(() => {
  if (!searchQuery.value) return voters.value;
  
  const query = searchQuery.value.toLowerCase();
  return voters.value.filter((voter) => {
    const name = (voter.name || voter.full_name || voter.participant_name || '').toLowerCase();
    const email = (voter.email || '').toLowerCase();
    const id = (voter.identifier || voter.student_id || voter.member_id || voter.id || '').toLowerCase();
    return name.includes(query) || email.includes(query) || id.includes(query);
  });
});

// Format date
const formatDate = (dateString: string | undefined) => {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  } catch {
    return dateString;
  }
};

// Format status
const formatStatus = (status: string | boolean | undefined) => {
  if (typeof status === 'boolean') return status ? 'Paid' : 'Pending';
  if (!status) return 'N/A';
  return status.charAt(0).toUpperCase() + status.slice(1);
};

// Format eligibility
const formatEligibility = (eligibility: string | boolean | undefined) => {
  if (typeof eligibility === 'boolean') return eligibility ? 'Eligible' : 'Not Eligible';
  if (!eligibility) return 'N/A';
  return eligibility.charAt(0).toUpperCase() + eligibility.slice(1);
};

// Check eligibility status
const isEligible = (voter: any) => {
  const elig = voter.eligibility_status || voter.is_eligible;
  if (typeof elig === 'boolean') return elig;
  return (elig || '').toLowerCase() === 'eligible';
};

const isRestricted = (voter: any) => {
  const elig = voter.eligibility_status || voter.is_eligible;
  if (typeof elig === 'boolean') return !elig;
  return (elig || '').toLowerCase() === 'restricted';
};

const isSuspended = (voter: any) => {
  const elig = voter.eligibility_status;
  return (elig || '').toLowerCase() === 'suspended';
};

// Get fee status class
const getFeeStatusClass = (status: string | boolean | undefined) => {
  const statusStr = typeof status === 'boolean' ? (status ? 'paid' : 'pending') : (status || '').toLowerCase();
  switch (statusStr) {
    case 'paid':
    case 'cleared':
      return 'bg-[#16a34a]';
    case 'pending':
      return 'bg-[#f59e0b]';
    case 'overdue':
      return 'bg-[#dc2626]';
    default:
      return 'bg-[#94a3b8]';
  }
};

// Get status class
const getStatusClass = (eligibility: string | boolean | undefined) => {
  const eligStr = typeof eligibility === 'boolean' ? (eligibility ? 'eligible' : 'restricted') : (eligibility || '').toLowerCase();
  switch (eligStr) {
    case 'eligible':
      return 'bg-[#16a34a]';
    case 'restricted':
      return 'bg-[#f59e0b]';
    case 'suspended':
      return 'bg-[#dc2626]';
    default:
      return 'bg-[#94a3b8]';
  }
};

// Handle search (debounced)
let searchTimeout: ReturnType<typeof setTimeout> | null = null;
const handleSearch = () => {
  if (searchTimeout) clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    // Client-side search is handled by computed property
  }, 300);
};

// Handle filter change
const handleFilterChange = () => {
  loadDirectory(true);
};

// Clear filters
const clearFilters = () => {
  searchQuery.value = '';
  eligibilityFilter.value = '';
  filters.value = {
    department: '',
    level: '',
    block: '',
    house_type: '',
    membership_type: '',
    zone: '',
    dues_status: '',
    eligibility_status: '',
  };
  loadDirectory(true);
};

// Load page
const loadPage = (page: number) => {
  currentPage.value = page;
  loadDirectory();
};

// Run eligibility check
const runEligibilityCheck = async () => {
  if (!electionId.value) {
    const id = await getElectionId();
    if (!id) {
      toast.error('No election ID found');
      return;
    }
    electionId.value = id;
  }

  try {
    const response = await electionService.runEligibilityChecks(electionId.value);
    
    // Handle response structure
    let checkResults: any = null;
    if (response && 'ok' in response && response.ok && 'data' in response) {
      checkResults = response.data;
    } else if (response && typeof response === 'object' && 'data' in response) {
      checkResults = response.data;
    }
    
    if (checkResults) {
      const totalChecked = checkResults.total_checked || 0;
      const eligibleCount = checkResults.eligible_count || 0;
      const ineligibleCount = checkResults.ineligible_count || 0;
      const statusChanges = checkResults.status_changes || 0;
      const checkedAt = checkResults.checked_at 
        ? new Date(checkResults.checked_at).toLocaleString() 
        : 'just now';
      
      // Show success message with results
      toast.success(
        `Eligibility check completed! ` +
        `Checked: ${totalChecked.toLocaleString()}, ` +
        `Eligible: ${eligibleCount.toLocaleString()}, ` +
        `Ineligible: ${ineligibleCount.toLocaleString()}, ` +
        `Changes: ${statusChanges.toLocaleString()}`,
        { timeout: 5000 }
      );
      
      // Reload directory to show updated data
      loadDirectory();
    } else {
      toast.success('Eligibility check completed');
      loadDirectory();
    }
  } catch (error: any) {
    console.error('Error running eligibility check:', error);
    toast.error(error?.response?.data?.message || 'Failed to run eligibility check');
  }
};

// View voter profile
const viewVoterProfile = async (voter: any) => {
  if (!electionId.value) {
    const id = await getElectionId();
    if (!id) {
      toast.error('No election ID found');
      return;
    }
    electionId.value = id;
  }

  try {
    const participantId = voter.participant_id || voter.id || voter._id;
    if (!participantId) {
      profileModal.value = { open: true, data: voter };
      return;
    }

    // Fetch full participant profile
    const response = await electionService.getParticipantProfile(electionId.value, participantId);
    if (response && 'ok' in response && response.ok && 'data' in response) {
      profileModal.value = { open: true, data: response.data };
    } else {
      profileModal.value = { open: true, data: voter };
    }
  } catch (error: any) {
    console.error('Error loading participant profile:', error);
    profileModal.value = { open: true, data: voter };
  }
};

// Close profile modal
const closeProfileModal = () => {
  profileModal.value = { open: false, data: null };
};

// Handle voter action
const handleVoterAction = (voter: any) => {
  updateEligibilityModal.value = { open: true, data: voter };
};

// Close update eligibility modal
const closeUpdateEligibilityModal = () => {
  updateEligibilityModal.value = { open: false, data: null };
};

// Handle update eligibility
const handleUpdateEligibility = async (data: { voter: any; newStatus: string; reason: string }) => {
  if (!electionId.value) {
    const id = await getElectionId();
    if (!id) {
      toast.error('No election ID found');
      return;
    }
    electionId.value = id;
  }

  try {
    const participantId = data.voter.participant_id || data.voter.id || data.voter._id;
    if (!participantId) {
      toast.error('Participant ID is required');
      return;
    }

    // Map status to is_eligible boolean
    const isEligible = data.newStatus === 'eligible';
    
    await electionService.updateParticipantEligibility(electionId.value, participantId, {
      is_eligible: isEligible,
      reason: data.reason,
    });
    
    toast.success('Eligibility updated successfully');
    loadDirectory();
    closeUpdateEligibilityModal();
  } catch (error: any) {
    console.error('Error updating eligibility:', error);
    toast.error(error?.response?.data?.message || 'Failed to update eligibility');
  }
};

// Handle flag participant
const handleFlagParticipant = async (data: { voter: any; flag: string; reason: string }) => {
  if (!electionId.value) {
    const id = await getElectionId();
    if (!id) {
      toast.error('No election ID found');
      return;
    }
    electionId.value = id;
  }

  try {
    const participantId = data.voter.participant_id || data.voter.id || data.voter._id;
    if (!participantId) {
      toast.error('Participant ID is required');
      return;
    }

    await electionService.flagParticipant(electionId.value, participantId, {
      flag: data.flag,
      reason: data.reason,
    });
    
    toast.success('Participant flagged successfully');
    loadDirectory();
    closeUpdateEligibilityModal();
  } catch (error: any) {
    console.error('Error flagging participant:', error);
    toast.error(error?.response?.data?.message || 'Failed to flag participant');
  }
};

// Handle eligibility updated from profile modal
const handleEligibilityUpdated = () => {
  loadDirectory();
  toast.success('Eligibility updated successfully');
};

// Voter selection
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
    selectedVoters.value = filteredVoters.value.map((voter) => voter.id || voter.participant_id || voter._id).filter(Boolean);
  }
};

// Apply bulk action
const applyBulkAction = async () => {
  if (!bulkAction.value || selectedVoters.value.length === 0) return;
  
  if (!electionId.value) {
    const id = await getElectionId();
    if (!id) {
      toast.error('No election ID found');
      return;
    }
    electionId.value = id;
  }

  try {
    // Apply bulk eligibility update
    const isEligible = bulkAction.value === 'approve';
    const reason = `Bulk ${bulkAction.value} action`;

    // Update each selected voter
    const updatePromises = selectedVoters.value.map(async (voterId) => {
      const voter = voters.value.find(v => (v.id || v.participant_id || v._id) === voterId);
      if (voter) {
        const participantId = voter.participant_id || voter.id || voter._id;
        if (participantId) {
          await electionService.updateParticipantEligibility(electionId.value!, participantId, {
            is_eligible: isEligible,
            reason: reason,
          });
        }
      }
    });

    await Promise.all(updatePromises);
    toast.success(`Bulk action applied to ${selectedVoters.value.length} voters`);
    selectedVoters.value = [];
    bulkAction.value = '';
    loadDirectory();
  } catch (error: any) {
    console.error('Error applying bulk action:', error);
    toast.error(error?.response?.data?.message || 'Failed to apply bulk action');
  }
};

// Watch directory type change
watch(selectedDirectoryType, () => {
  loadDirectory(true);
});

// Initialize
onMounted(async () => {
  const id = await getElectionId();
  if (id) {
    electionId.value = id;
    loadDirectory();
  } else {
    toast.warning('Please select an election to view voter eligibility');
  }
});
</script>
