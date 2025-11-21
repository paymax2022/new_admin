<template>
  <div class="min-h-screen bg-[#f7f9fc] p-6 space-y-6">
    <div class="space-y-1">
      <p class="text-sm font-semibold uppercase tracking-[0.2em] text-[#9ca3af]">Complaints Management</p>
      <h1 class="text-3xl font-semibold text-[#111827]">Complaints Management</h1>
      <p class="text-sm text-[#6b7280]">Review and manage complaints submitted by voters and election observers</p>
    </div>

    <section class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <article
        v-for="stat in summaryStats"
        :key="stat.label"
        class="rounded-3xl bg-white p-5 shadow-[0_20px_40px_rgba(15,23,42,0.05)]"
      >
        <div class="flex items-center justify-between gap-4">
          <div>
            <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">{{ stat.label }}</p>
            <p class="mt-2 text-3xl font-semibold text-[#111827]">{{ stat.value }}</p>
          </div>
          <div
            class="flex h-12 w-12 items-center justify-center rounded-full"
            :style="{ backgroundColor: stat.iconBg, color: stat.iconColor }"
          >
            <component :is="stat.icon" class="h-5 w-5" />
          </div>
        </div>
      </article>
    </section>

    <section class="rounded-3xl bg-white p-5 shadow-[0_20px_40px_rgba(15,23,42,0.05)] space-y-4">
      <h2 class="text-sm font-semibold uppercase tracking-wide text-[#94a3b8]">Filters</h2>
      <div class="flex flex-col gap-4 lg:flex-row lg:items-center">
        <div class="flex-1 rounded-full border border-[#e2e8f0] bg-[#f8fafc] px-4 py-2 text-sm text-[#6b7280]">
          <span class="text-[#cbd5f5]">Search complaints...</span>
        </div>
        <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            class="rounded-full border border-[#e2e8f0] bg-white px-4 py-2 text-sm font-semibold text-[#6b7280]"
          >
            All Status
          </button>
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-full border border-[#e2e8f0] bg-white px-4 py-2 text-sm font-semibold text-[#6b7280]"
          >
            All Priorities
            <IconCaretDown class="h-4 w-4 text-[#94a3b8]" />
          </button>
        </div>
      </div>
    </section>

    <section class="space-y-4">
      <article
        v-for="complaint in complaints"
        :key="complaint.id"
        class="rounded-3xl bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.05)]"
      >
        <div class="flex flex-col gap-3">
          <div class="flex flex-wrap items-center gap-3">
            <h3 class="text-base font-semibold text-[#111827]">{{ complaint.title }}</h3>
            <span class="text-xs text-[#94a3b8]">
              {{ complaint.reporter }} &middot; {{ complaint.date }} &middot; {{ complaint.category }}
            </span>
          </div>
          <p class="text-sm text-[#6b7280]">{{ complaint.description }}</p>
          <div class="flex flex-wrap items-center gap-3 text-xs font-semibold">
            <span
              class="rounded-full px-3 py-1 text-white"
              :style="{ backgroundColor: complaint.priority.badgeBg, color: complaint.priority.badgeColor }"
            >
              {{ complaint.priority.label }}
            </span>
            <span
              class="rounded-full px-3 py-1"
              :style="{ backgroundColor: complaint.status.badgeBg, color: complaint.status.badgeColor }"
            >
              {{ complaint.status.label }}
            </span>
          </div>
          <div class="flex flex-wrap items-center justify-between gap-3">
            <p class="text-xs text-[#94a3b8]">Assigned to: {{ complaint.assignedTo }}</p>
            <div class="flex flex-wrap gap-3">
              <button
                type="button"
                class="rounded-full border border-[#e2e8f0] px-4 py-2 text-sm font-semibold text-[#111827]"
                @click="openModal(complaint)"
              >
                View Details
              </button>
              <button
                v-if="complaint.canAssign"
                type="button"
                class="rounded-full bg-[#111827] px-4 py-2 text-sm font-semibold text-white"
              >
                Assign to me
              </button>
            </div>
          </div>
        </div>
      </article>

      <div class="rounded-3xl bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.05)]">
        <h3 class="text-sm font-semibold uppercase tracking-wide text-[#94a3b8]">Status Updated</h3>
        <p class="mt-2 text-sm text-[#6b7280]">
          Complaint status changed to in progress and assigned to you
        </p>
      </div>
    </section>

    <ComplaintDetailsModal
      v-if="modal.open && modal.data"
      :complaint="modal.data"
      @close="closeModal"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import ComplaintDetailsModal from './components/ComplaintDetailsModal.vue';
import IconClipboardText from '@/components/icon/icon-clipboard-text.vue';
import IconClock from '@/components/icon/icon-clock.vue';
import IconRefresh from '@/components/icon/icon-refresh.vue';
import IconCircleCheck from '@/components/icon/icon-circle-check.vue';
import IconCaretDown from '@/components/icon/icon-caret-down.vue';

const summaryStats = [
  {
    label: 'Total Complaints',
    value: '4',
    icon: IconClipboardText,
    iconBg: '#fef9c3',
    iconColor: '#f59e0b',
  },
  {
    label: 'Pending',
    value: '1',
    icon: IconClock,
    iconBg: '#fef2f2',
    iconColor: '#f97316',
  },
  {
    label: 'In Progress',
    value: '1',
    icon: IconRefresh,
    iconBg: '#e0f2fe',
    iconColor: '#0284c7',
  },
  {
    label: 'Resolved',
    value: '1',
    icon: IconCircleCheck,
    iconBg: '#dcfce7',
    iconColor: '#16a34a',
  },
];

const complaints = [
  {
    id: 1,
    title: 'Voting booth malfunction in District 5',
    reporter: 'John Smith',
    date: '11/18/2024',
    category: 'technical problem',
    description:
      'Multiple voters reported that the voting machine in booth #3 was not registering their selections properly.',
    priority: { label: 'High', badgeBg: '#fee2e2', badgeColor: '#b91c1c' },
    status: { label: 'Pending', badgeBg: '#fff7ed', badgeColor: '#ea580c' },
    assignedTo: 'Admin User',
    canAssign: true,
  },
  {
    id: 2,
    title: 'Candidate campaigning too close to polling station',
    reporter: 'John Smith',
    date: '11/18/2024',
    category: 'technical problem',
    description:
      'Candidate representatives were observed campaigning within 100ft of the polling station entrance.',
    priority: { label: 'Medium', badgeBg: '#fef3c7', badgeColor: '#b45309' },
    status: { label: 'In Progress', badgeBg: '#dbeafe', badgeColor: '#1d4ed8' },
    assignedTo: 'Admin User',
    canAssign: false,
  },
  {
    id: 3,
    title: 'Voter registration issue',
    reporter: 'John Smith',
    date: '11/18/2024',
    category: 'technical problem',
    description:
      'Candidate representatives were observed campaigning within 100ft of the polling station entrance.',
    priority: { label: 'Normal', badgeBg: '#dcfce7', badgeColor: '#15803d' },
    status: { label: 'Resolved', badgeBg: '#d1fae5', badgeColor: '#16a34a' },
    assignedTo: 'Admin User',
    canAssign: false,
  },
];

const modal = ref<{ open: boolean; data: (typeof complaints)[0] | null }>({
  open: false,
  data: null,
});

const openModal = (complaint: (typeof complaints)[0]) => {
  modal.value = { open: true, data: complaint };
};

const closeModal = () => {
  modal.value = { open: false, data: null };
};
</script>

