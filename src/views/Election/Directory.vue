<template>
  <div class="min-h-screen bg-[#f7f9fc] p-6 space-y-6">
    <!-- Header -->
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div class="space-y-1">
        <h1 class="text-2xl font-semibold text-[#111827]">Member Directory</h1>
        <p class="text-sm text-[#6b7280]">View and manage all registered members in the system.</p>
      </div>
    </div>

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
            <option value="restricted">Restricted</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>

        <!-- Fee Status Filter -->
        <div class="lg:w-48">
          <label class="block text-sm font-semibold text-[#111827] mb-2">Fee Status</label>
          <select
            v-model="feeStatusFilter"
            class="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm text-[#1f2937] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
          >
            <option value="">All Fee Status</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="overdue">Overdue</option>
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
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-[#e2e8f0]">
          <thead class="bg-[#f8fafc]">
            <tr>
              <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Member ID</th>
              <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Name</th>
              <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Email</th>
              <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">GPA</th>
              <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Fee Status</th>
              <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Eligibility</th>
              <th class="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#e2e8f0] bg-white">
            <tr
              v-for="member in filteredMembers"
              :key="member.id"
              class="hover:bg-[#f8fafc] transition"
            >
              <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-[#111827]">{{ member.memberId }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-[#475569]">{{ member.name }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-[#475569]">{{ member.email }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold" :class="getGPAColor(member.gpa)">
                {{ member.gpa }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold text-white"
                  :class="getFeeStatusClass(member.feeStatus)"
                >
                  {{ member.feeStatus }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold text-white"
                  :class="getEligibilityClass(member.eligibility)"
                >
                  {{ member.eligibility }}
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
    </section>

    <!-- Member Profile Modal -->
    <MemberProfileModal
      v-if="memberProfileModal.open && memberProfileModal.data"
      :member="memberProfileModal.data"
      @close="closeMemberProfileModal"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import IconSearch from '@/components/icon/icon-search.vue';
import IconSettings from '@/components/icon/icon-settings.vue';
import IconEye from '@/components/icon/icon-eye.vue';
import MemberProfileModal from './components/MemberProfileModal.vue';

interface Member {
  id: string;
  memberId: string;
  name: string;
  email: string;
  phone?: string;
  joinedDate?: string;
  major?: string;
  year?: string;
  gpa: number;
  feeStatus: 'Paid' | 'Pending' | 'Overdue';
  eligibility: 'Eligible' | 'Restricted' | 'Suspended';
}

const searchQuery = ref('');
const eligibilityFilter = ref('');
const feeStatusFilter = ref('');
const memberProfileModal = ref<{ open: boolean; data: Member | null }>({
  open: false,
  data: null,
});

const members = ref<Member[]>([
  {
    id: '1',
    memberId: 'STU001',
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1 234-567-8900',
    joinedDate: '8/31/2023',
    major: 'Computer Science',
    year: 'Junior',
    gpa: 3.75,
    feeStatus: 'Paid',
    eligibility: 'Eligible',
  },
  {
    id: '2',
    memberId: 'STU001',
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1 234-567-8900',
    joinedDate: '8/31/2023',
    major: 'Computer Science',
    year: 'Junior',
    gpa: 3.75,
    feeStatus: 'Pending',
    eligibility: 'Eligible',
  },
  {
    id: '3',
    memberId: 'STU002',
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1 234-567-8900',
    joinedDate: '8/31/2023',
    major: 'Computer Science',
    year: 'Junior',
    gpa: 2.45,
    feeStatus: 'Overdue',
    eligibility: 'Restricted',
  },
  {
    id: '4',
    memberId: 'STU001',
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1 234-567-8900',
    joinedDate: '8/31/2023',
    major: 'Computer Science',
    year: 'Junior',
    gpa: 3.75,
    feeStatus: 'Paid',
    eligibility: 'Eligible',
  },
  {
    id: '5',
    memberId: 'STU001',
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1 234-567-8900',
    joinedDate: '8/31/2023',
    major: 'Computer Science',
    year: 'Junior',
    gpa: 3.12,
    feeStatus: 'Paid',
    eligibility: 'Suspended',
  },
]);

const filteredMembers = computed(() => {
  let filtered = members.value;

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (member) =>
        member.name.toLowerCase().includes(query) ||
        member.memberId.toLowerCase().includes(query) ||
        member.email.toLowerCase().includes(query)
    );
  }

  // Eligibility filter
  if (eligibilityFilter.value) {
    filtered = filtered.filter((member) => member.eligibility.toLowerCase() === eligibilityFilter.value);
  }

  // Fee status filter
  if (feeStatusFilter.value) {
    filtered = filtered.filter((member) => member.feeStatus.toLowerCase() === feeStatusFilter.value);
  }

  return filtered;
});

const getGPAColor = (gpa: number) => {
  if (gpa >= 3.5) return 'text-[#16a34a]';
  if (gpa >= 2.5) return 'text-[#f59e0b]';
  return 'text-[#dc2626]';
};

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

const getEligibilityClass = (status: string) => {
  switch (status) {
    case 'Eligible':
      return 'bg-[#16a34a]';
    case 'Restricted':
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
  feeStatusFilter.value = '';
};

const viewMemberDetails = (member: Member) => {
  memberProfileModal.value = { open: true, data: member };
};

const closeMemberProfileModal = () => {
  memberProfileModal.value = { open: false, data: null };
};
</script>

