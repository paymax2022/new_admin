<template>
  <div class="min-h-screen bg-[#f7f9fc] p-6 space-y-6">
    <!-- Header -->
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div class="space-y-1">
        <h1 class="text-2xl font-semibold text-[#111827]">Member Directory</h1>
        <p class="text-sm text-[#6b7280]">View and manage all registered members in the system.</p>
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

    <!-- Search & Filter Section -->
    <section class="rounded-3xl bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.05)]">
      <h2 class="text-lg font-semibold text-[#111827] mb-4">Search & Filter</h2>
      <div class="flex flex-col lg:flex-row gap-4">
        <!-- Search Bar -->
        <div class="flex-1 relative">
          <label class="block text-sm font-semibold text-[#111827] mb-2">Search Members</label>
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
            class="inline-flex items-center gap-2 rounded-xl border border-[#e2e8f0] bg-[#111827] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1f2937]"
            @click="clearFilters"
          >
            <IconSettings class="h-5 w-5" />
            Clear Filter
          </button>
        </div>
      </div>
    </section>

    <!-- Member Table -->
    <section class="rounded-3xl bg-white shadow-[0_20px_40px_rgba(15,23,42,0.05)] overflow-hidden">
      <div v-if="loading" class="p-8 text-center">
        <p class="text-sm text-[#94a3b8]">Loading members...</p>
      </div>
      <div v-else-if="members.length === 0" class="p-8 text-center">
        <p class="text-sm text-[#94a3b8]">No members found</p>
      </div>
      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-[#e2e8f0]">
          <thead class="bg-[#f8fafc]">
            <tr>
              <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">ID</th>
              <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Name</th>
              <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Email</th>
              <th v-if="selectedDirectoryType === 'school'" class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Department</th>
              <th v-if="selectedDirectoryType === 'estate'" class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Block</th>
              <th v-if="selectedDirectoryType === 'group'" class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Zone</th>
              <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Status</th>
              <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Eligibility</th>
              <th class="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#e2e8f0] bg-white">
            <tr
              v-for="member in filteredMembers"
              :key="member.id || member.participant_id || member._id"
              class="hover:bg-[#f8fafc] transition"
            >
              <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-[#111827]">
                {{ member.identifier || member.student_id || member.member_id || member.id || 'N/A' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-[#475569]">
                {{ member.name || member.full_name || member.participant_name || 'N/A' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-[#475569]">
                {{ member.email || 'N/A' }}
              </td>
              <td v-if="selectedDirectoryType === 'school'" class="px-6 py-4 whitespace-nowrap text-sm text-[#475569]">
                {{ member.department || 'N/A' }}
              </td>
              <td v-if="selectedDirectoryType === 'estate'" class="px-6 py-4 whitespace-nowrap text-sm text-[#475569]">
                {{ member.block || 'N/A' }}
              </td>
              <td v-if="selectedDirectoryType === 'group'" class="px-6 py-4 whitespace-nowrap text-sm text-[#475569]">
                {{ member.zone || 'N/A' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold text-white"
                  :class="getStatusClass(member.fee_status || member.dues_status)"
                >
                  {{ formatStatus(member.fee_status || member.dues_status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold text-white"
                  :class="getEligibilityClass(member.eligibility_status || member.is_eligible)"
                >
                  {{ formatEligibility(member.eligibility_status || member.is_eligible) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right">
                <button
                  type="button"
                  class="inline-flex items-center justify-center rounded-full p-2 text-[#475569] transition hover:bg-[#f1f5f9]"
                  @click="viewMemberDetails(member)"
                >
                  <IconEye class="h-5 w-5" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="members.length > 0" class="flex items-center justify-between border-t border-[#e2e8f0] bg-[#f8fafc] px-6 py-4">
        <div class="text-sm text-[#6b7280]">
          Showing {{ (currentPage - 1) * pageSize + 1 }} to {{ Math.min(currentPage * pageSize, totalMembers) }} of {{ totalMembers }} members
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
            :disabled="currentPage * pageSize >= totalMembers"
            @click="loadPage(currentPage + 1)"
            class="rounded-xl border border-[#e2e8f0] bg-white px-4 py-2 text-sm font-semibold text-[#475569] transition disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#f8fafc]"
          >
            Next
          </button>
        </div>
      </div>
    </section>

    <!-- Member Profile Modal -->
    <MemberProfileModal
      v-if="memberProfileModal.open && memberProfileModal.data"
      :member="memberProfileModal.data"
      :election-id="electionId"
      @close="closeMemberProfileModal"
      @eligibility-updated="handleEligibilityUpdated"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useToast } from 'vue-toastification';
import { useRoute } from 'vue-router';
import IconSearch from '@/components/icon/icon-search.vue';
import IconSettings from '@/components/icon/icon-settings.vue';
import IconEye from '@/components/icon/icon-eye.vue';
import MemberProfileModal from './components/MemberProfileModal.vue';
import electionService from '@/services/electionService';

const toast = useToast();
const route = useRoute();

// Directory types
const directoryTypes = [
  { label: 'School', value: 'school' },
  { label: 'Estate', value: 'estate' },
  { label: 'Group', value: 'group' },
];

const selectedDirectoryType = ref<'school' | 'estate' | 'group'>('school');
const searchQuery = ref('');
const loading = ref(false);
const members = ref<any[]>([]);
const totalMembers = ref(0);
const currentPage = ref(1);
const pageSize = ref(50);
const electionId = ref<string | null>(null);

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

const memberProfileModal = ref<{ open: boolean; data: any | null }>({
  open: false,
  data: null,
});

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
        // Handle nested structure: data.participants or data.data.participants
        const participants = responseData?.participants || responseData?.data?.participants || [];
        members.value = Array.isArray(participants) ? participants : [];
        // Use total_count from response or fallback to participants length
        totalMembers.value = responseData?.total_count || responseData?.total || members.value.length;
      } else {
        const responseData = response?.data as any;
        const participants = responseData?.participants || responseData?.data?.participants || [];
        members.value = Array.isArray(participants) ? participants : [];
        totalMembers.value = responseData?.total_count || responseData?.total || members.value.length;
      }
    } else if (selectedDirectoryType.value === 'estate') {
      if (filters.value.block) params.block = filters.value.block;
      if (filters.value.house_type) params.house_type = filters.value.house_type;
      if (filters.value.dues_status) params.dues_status = filters.value.dues_status;
      if (filters.value.eligibility_status) params.eligibility_status = filters.value.eligibility_status;

      const response = await electionService.getEstateDirectory(electionId.value, params);
      if (response && 'ok' in response && response.ok && 'data' in response) {
        const responseData = response.data as any;
        // Handle nested structure: data.participants or data.data.participants
        const participants = responseData?.participants || responseData?.data?.participants || [];
        members.value = Array.isArray(participants) ? participants : [];
        // Use total_count from response or fallback to participants length
        totalMembers.value = responseData?.total_count || responseData?.total || members.value.length;
      } else {
        const responseData = response?.data as any;
        const participants = responseData?.participants || responseData?.data?.participants || [];
        members.value = Array.isArray(participants) ? participants : [];
        totalMembers.value = responseData?.total_count || responseData?.total || members.value.length;
      }
    } else if (selectedDirectoryType.value === 'group') {
      if (filters.value.membership_type) params.membership_type = filters.value.membership_type;
      if (filters.value.zone) params.zone = filters.value.zone;
      if (filters.value.dues_status) params.dues_status = filters.value.dues_status;
      if (filters.value.eligibility_status) params.eligibility_status = filters.value.eligibility_status;

      const response = await electionService.getGroupDirectory(electionId.value, params);
      if (response && 'ok' in response && response.ok && 'data' in response) {
        const responseData = response.data as any;
        // Handle nested structure: data.participants or data.data.participants
        const participants = responseData?.participants || responseData?.data?.participants || [];
        members.value = Array.isArray(participants) ? participants : [];
        // Use total_count from response or fallback to participants length
        totalMembers.value = responseData?.total_count || responseData?.total || members.value.length;
      } else {
        const responseData = response?.data as any;
        const participants = responseData?.participants || responseData?.data?.participants || [];
        members.value = Array.isArray(participants) ? participants : [];
        totalMembers.value = responseData?.total_count || responseData?.total || members.value.length;
      }
    }
  } catch (error: any) {
    console.error('Error loading directory:', error);
    toast.error(error?.response?.data?.message || 'Failed to load directory');
    members.value = [];
    totalMembers.value = 0;
  } finally {
    loading.value = false;
  }
};

// Filtered members (client-side search)
const filteredMembers = computed(() => {
  if (!searchQuery.value) return members.value;
  
  const query = searchQuery.value.toLowerCase();
  return members.value.filter((member) => {
    const name = (member.name || member.full_name || member.participant_name || '').toLowerCase();
    const email = (member.email || '').toLowerCase();
    const id = (member.identifier || member.student_id || member.member_id || member.id || '').toLowerCase();
    return name.includes(query) || email.includes(query) || id.includes(query);
  });
});

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

// Get status class
const getStatusClass = (status: string | boolean | undefined) => {
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

// Get eligibility class
const getEligibilityClass = (eligibility: string | boolean | undefined) => {
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

// View member details
const viewMemberDetails = async (member: any) => {
  if (!electionId.value) {
    const id = await getElectionId();
    if (!id) {
      toast.error('No election ID found');
      return;
    }
    electionId.value = id;
  }

  try {
    const participantId = member.participant_id || member.id || member._id;
    if (!participantId) {
      memberProfileModal.value = { open: true, data: member };
      return;
    }

    // Fetch full participant profile
    const response = await electionService.getParticipantProfile(electionId.value, participantId);
    if (response && 'ok' in response && response.ok && 'data' in response) {
      memberProfileModal.value = { open: true, data: response.data };
    } else {
      memberProfileModal.value = { open: true, data: member };
    }
  } catch (error: any) {
    console.error('Error loading participant profile:', error);
    // Still show modal with available data
    memberProfileModal.value = { open: true, data: member };
  }
};

// Close member profile modal
const closeMemberProfileModal = () => {
  memberProfileModal.value = { open: false, data: null };
};

// Handle eligibility updated
const handleEligibilityUpdated = () => {
  loadDirectory();
  toast.success('Eligibility updated successfully');
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
    toast.warning('Please select an election to view directory');
  }
});
</script>
