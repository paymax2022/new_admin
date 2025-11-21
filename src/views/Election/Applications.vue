<template>
  <div class="min-h-screen bg-[#f7f9fc] p-6 space-y-6">
    <!-- Header -->
    <div class="space-y-2">
      <p class="text-sm font-semibold uppercase tracking-[0.2em] text-[#9ca3af]">Election</p>
      <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-3xl font-semibold text-[#111827]">Candidate Applications</h1>
          <p class="text-sm text-[#6b7280]">Review and manage candidate applications for upcoming elections</p>
        </div>
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-full border border-[#e2e8f0] bg-white px-5 py-2 text-sm font-semibold text-[#111827] transition hover:border-[#cbd5f5]"
        >
          <IconDownload class="h-4 w-4" />
          Export
        </button>
      </div>
    </div>

    <!-- Key Metrics -->
    <section class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <article
        v-for="stat in stats"
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

    <!-- Filters -->
    <section class="rounded-3xl bg-white p-5 shadow-[0_20px_40px_rgba(15,23,42,0.05)] space-y-4">
      <h2 class="text-sm font-semibold uppercase tracking-wide text-[#94a3b8]">Filter Applications</h2>
      <div class="flex flex-col gap-4 lg:flex-row lg:items-center">
        <div class="flex-1 rounded-full border border-[#e2e8f0] bg-[#f8fafc] px-4 py-2 text-sm text-[#6b7280]">
          <span class="text-[#cbd5f5]">Search candidates, positions, or parties…</span>
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
            All Positions
            <IconCaretDown class="h-4 w-4 text-[#94a3b8]" />
          </button>
        </div>
      </div>
    </section>

    <!-- Applications List -->
    <section class="rounded-3xl bg-white p-5 shadow-[0_20px_40px_rgba(15,23,42,0.05)]">
      <ul class="space-y-6">
        <li
          v-for="application in applications"
          :key="application.id"
          class="flex flex-col gap-3 border-b border-[#f1f5f9] pb-5 last:border-0 last:pb-0"
        >
          <div class="flex flex-col gap-1 text-sm text-[#111827]">
            <p class="text-base font-semibold text-[#111827]">{{ application.name }}</p>
            <p class="text-[#6b7280]">
              {{ application.position }} &middot; {{ application.party }} &middot; {{ application.district }}
            </p>
            <p class="text-[#94a3b8]">Applied: {{ application.applied }}</p>
          </div>
          <div class="flex flex-wrap items-center justify-between gap-3">
            <span
              class="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide"
              :class="application.badgeClass"
            >
              {{ application.status }}
            </span>
            <button
              type="button"
              class="inline-flex items-center gap-2 text-sm font-semibold text-[#111827]"
              @click="openReviewModal(application)"
            >
              Review
              <IconArrowForward class="h-4 w-4" />
            </button>
          </div>
        </li>
      </ul>
    </section>

    <ApplicationReviewModal
      v-if="reviewModal.open && reviewModal.application"
      :application="reviewModal.application"
      @close="closeReviewModal"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import IconClipboardText from '@/components/icon/icon-clipboard-text.vue';
import IconCalendar from '@/components/icon/icon-calendar.vue';
import IconCircleCheck from '@/components/icon/icon-circle-check.vue';
import IconEye from '@/components/icon/icon-eye.vue';
import IconDownload from '@/components/icon/icon-download.vue';
import IconCaretDown from '@/components/icon/icon-caret-down.vue';
import IconArrowForward from '@/components/icon/icon-arrow-forward.vue';
import ApplicationReviewModal from './components/ApplicationReviewModal.vue';

const stats = [
  {
    label: 'Total Applications',
    value: '4',
    icon: IconClipboardText,
    iconBg: '#fef9c3',
    iconColor: '#f59e0b',
  },
  {
    label: 'Pending Review',
    value: '1',
    icon: IconCalendar,
    iconBg: '#e0f2fe',
    iconColor: '#0284c7',
  },
  {
    label: 'Approved',
    value: '1',
    icon: IconCircleCheck,
    iconBg: '#dcfce7',
    iconColor: '#16a34a',
  },
  {
    label: 'Under Review',
    value: '1',
    icon: IconEye,
    iconBg: '#ede9fe',
    iconColor: '#7c3aed',
  },
];

const applications = [
  {
    id: 1,
    candidateId: 'SJU001',
    name: 'Sarah Johnson',
    position: 'Mayor',
    party: 'Progressive Alliance',
    district: 'District 1',
    applied: 'Jan 14, 2024',
    status: 'Pending',
    badgeClass: 'bg-[#fef3c7] text-[#b45309]',
    email: 'sarah.johnson@email.com',
    phone: '(555) 123-4567',
    education: 'MBA, Harvard Business School',
    experience: 'City Council Member (2020-2024)',
    statement: 'Focus on sustainable development, affordable housing, and public transportation improvements.',
    documents: [
      { name: 'Resume.pdf' },
      { name: 'Platform_Statement.pdf' },
      { name: 'Endorsements.pdf' },
    ],
  },
  {
    id: 2,
    candidateId: 'MCH318',
    name: 'Michael Chen',
    position: 'City Council',
    party: 'Independent',
    district: 'District 3',
    applied: 'Jan 14, 2024',
    status: 'Approved',
    badgeClass: 'bg-[#dcfce7] text-[#15803d]',
    email: 'michael.chen@email.com',
    phone: '(555) 555-1212',
    education: 'MPA, Stanford University',
    experience: 'Community Organizer (2018-2023)',
    statement: 'Empowering local communities through transparent governance and participatory budgeting.',
    documents: [
      { name: 'Resume.pdf' },
      { name: 'Community_Support_Letters.pdf' },
    ],
  },
  {
    id: 3,
    candidateId: 'SJU001-B',
    name: 'Sarah Johnson',
    position: 'Mayor',
    party: 'Progressive Alliance',
    district: 'District 1',
    applied: 'Jan 14, 2024',
    status: 'In Review',
    badgeClass: 'bg-[#ede9fe] text-[#6d28d9]',
    email: 'sarah.johnson@email.com',
    phone: '(555) 123-4567',
    education: 'MBA, Harvard Business School',
    experience: 'City Council Member (2020-2024)',
    statement: 'Building collaborative partnerships between city officials, educators, and local businesses.',
    documents: [
      { name: 'Resume.pdf' },
      { name: 'Platform_Statement.pdf' },
    ],
  },
  {
    id: 4,
    candidateId: 'SJU001-C',
    name: 'Sarah Johnson',
    position: 'Mayor',
    party: 'Progressive Alliance',
    district: 'District 1',
    applied: 'Jan 14, 2024',
    status: 'Rejected',
    badgeClass: 'bg-[#fee2e2] text-[#b91c1c]',
    email: 'sarah.johnson@email.com',
    phone: '(555) 123-4567',
    education: 'MBA, Harvard Business School',
    experience: 'Community Advisor (2016-2020)',
    statement: 'Prioritizing responsible fiscal policy and neighborhood safety initiatives.',
    documents: [{ name: 'Resume.pdf' }],
  },
];

const reviewModal = ref<{ open: boolean; application: (typeof applications)[0] | null }>({
  open: false,
  application: null,
});

const openReviewModal = (application: (typeof applications)[0]) => {
  reviewModal.value = { open: true, application };
};

const closeReviewModal = () => {
  reviewModal.value = { open: false, application: null };
};
</script>


