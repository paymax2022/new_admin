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
        <select
          v-model="selectedElectionId"
          class="flex-1 rounded-full border border-[#e2e8f0] bg-white px-4 py-2 text-sm font-semibold text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#111827]"
          @change="loadApplications"
        >
          <option value="">Select Election</option>
          <option v-for="election in elections" :key="election.id" :value="election.id">
            {{ election.title }}
          </option>
        </select>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search candidates, positions..."
          class="flex-1 rounded-full border border-[#e2e8f0] bg-[#f8fafc] px-4 py-2 text-sm text-[#111827] placeholder-[#cbd5f5] focus:outline-none focus:ring-2 focus:ring-[#111827]"
        />
        <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
          <select
            v-model="statusFilter"
            class="rounded-full border border-[#e2e8f0] bg-white px-4 py-2 text-sm font-semibold text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#111827]"
            @change="loadApplications"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="in_review">In Review</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>
    </section>

    <!-- Applications List -->
    <section class="rounded-3xl bg-white p-5 shadow-[0_20px_40px_rgba(15,23,42,0.05)]">
      <div v-if="loading" class="text-center py-8 text-[#6b7280]">Loading applications...</div>
      <div v-else-if="!selectedElectionId" class="text-center py-8 text-[#6b7280]">Please select an election to view applications</div>
      <div v-else-if="applications.length === 0" class="text-center py-8 text-[#6b7280]">No applications found</div>
      <ul v-else class="space-y-6">
        <li
          v-for="application in filteredApplications"
          :key="application.id"
          class="flex flex-col gap-3 border-b border-[#f1f5f9] pb-5 last:border-0 last:pb-0"
        >
          <div class="flex flex-col gap-1 text-sm text-[#111827]">
            <p class="text-base font-semibold text-[#111827]">{{ application.name }}</p>
            <p class="text-[#6b7280]">
              {{ application.position }} &middot; {{ application.party || 'Independent' }} &middot; {{ application.district || 'N/A' }}
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
import { ref, computed, onMounted, markRaw } from 'vue';
import { useToast } from 'vue-toastification';
import IconClipboardText from '@/components/icon/icon-clipboard-text.vue';
import IconCalendar from '@/components/icon/icon-calendar.vue';
import IconCircleCheck from '@/components/icon/icon-circle-check.vue';
import IconEye from '@/components/icon/icon-eye.vue';
import IconDownload from '@/components/icon/icon-download.vue';
import IconCaretDown from '@/components/icon/icon-caret-down.vue';
import IconArrowForward from '@/components/icon/icon-arrow-forward.vue';
import ApplicationReviewModal from './components/ApplicationReviewModal.vue';
import electionService from '@/services/electionService';

const toast = useToast();

// Mark icons as raw
const IconClipboardTextRaw = markRaw(IconClipboardText);
const IconCalendarRaw = markRaw(IconCalendar);
const IconCircleCheckRaw = markRaw(IconCircleCheck);
const IconEyeRaw = markRaw(IconEye);

const loading = ref(false);
const selectedElectionId = ref('');
const searchQuery = ref('');
const statusFilter = ref('');
const elections = ref<any[]>([]);
const applications = ref<any[]>([]);

const stats = ref([
  {
    label: 'Total Applications',
    value: '0',
    icon: IconClipboardTextRaw,
    iconBg: '#fef9c3',
    iconColor: '#f59e0b',
  },
  {
    label: 'Pending Review',
    value: '0',
    icon: IconCalendarRaw,
    iconBg: '#e0f2fe',
    iconColor: '#0284c7',
  },
  {
    label: 'Approved',
    value: '0',
    icon: IconCircleCheckRaw,
    iconBg: '#dcfce7',
    iconColor: '#16a34a',
  },
  {
    label: 'Under Review',
    value: '0',
    icon: IconEyeRaw,
    iconBg: '#ede9fe',
    iconColor: '#7c3aed',
  },
]);

const getStatusBadgeClass = (status: string) => {
  const statusLower = (status || '').toLowerCase();
  if (statusLower === 'approved') return 'bg-[#dcfce7] text-[#15803d]';
  if (statusLower === 'pending') return 'bg-[#fef3c7] text-[#b45309]';
  if (statusLower === 'in_review' || statusLower === 'in review') return 'bg-[#ede9fe] text-[#6d28d9]';
  if (statusLower === 'rejected') return 'bg-[#fee2e2] text-[#b91c1c]';
  return 'bg-[#f1f5f9] text-[#64748b]';
};

const formatDate = (dateString: string) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const filteredApplications = computed(() => {
  let filtered = applications.value;
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter((app: any) =>
      app.name?.toLowerCase().includes(query) ||
      app.position?.toLowerCase().includes(query) ||
      app.party?.toLowerCase().includes(query)
    );
  }
  
  return filtered;
});

const loadElections = async () => {
  try {
    const response = await electionService.getAllElectionsAdmin({ limit: 50 });
    if (response?.data && Array.isArray(response.data)) {
      elections.value = response.data.map((e: any) => ({
        id: e.id || e._id,
        title: e.title || e.name || 'Untitled Election',
      }));
      
      // Auto-select first election if available
      if (elections.value.length > 0 && !selectedElectionId.value) {
        selectedElectionId.value = elections.value[0].id;
        await loadApplications();
      }
    }
  } catch (error: any) {
    console.error('Error loading elections:', error);
    toast.error('Failed to load elections');
  }
};

const loadApplications = async () => {
  if (!selectedElectionId.value) {
    applications.value = [];
    updateStats();
    return;
  }
  
  loading.value = true;
  try {
    const params: any = { limit: 100 };
    if (statusFilter.value) {
      params.status = statusFilter.value;
    }
    
    const response = await electionService.getApplicationsByElection(selectedElectionId.value, params);
    const apps = Array.isArray(response?.data) ? response.data : [];
    
    applications.value = apps.map((app: any) => ({
      id: app.id || app._id || app.application_id,
      candidateId: app.candidate_id || app.participant_id || app.identifier || 'N/A',
      name: app.candidate_name || app.full_name || app.name || 'Unknown Candidate',
      position: app.position_name || app.position?.name || app.position || 'N/A',
      party: app.party || app.political_party || null,
      district: app.district || app.constituency || null,
      applied: formatDate(app.created_at || app.applied_at || app.submitted_at),
      status: app.status || 'pending',
      badgeClass: getStatusBadgeClass(app.status || 'pending'),
      email: app.email || app.candidate_email || '',
      phone: app.phone || app.phone_number || '',
      education: app.education || app.qualifications || '',
      experience: app.experience || app.work_experience || '',
      statement: app.manifesto || app.statement || app.bio || '',
      documents: app.documents || app.attachments || [],
      original: app,
    }));
    
    updateStats();
  } catch (error: any) {
    console.error('Error loading applications:', error);
    toast.error('Failed to load applications');
  } finally {
    loading.value = false;
  }
};

const updateStats = () => {
  const total = applications.value.length;
  const pending = applications.value.filter((app: any) => 
    (app.status || '').toLowerCase() === 'pending'
  ).length;
  const approved = applications.value.filter((app: any) => 
    (app.status || '').toLowerCase() === 'approved'
  ).length;
  const inReview = applications.value.filter((app: any) => 
    (app.status || '').toLowerCase() === 'in_review' || 
    (app.status || '').toLowerCase() === 'in review'
  ).length;
  
  stats.value[0].value = total.toString();
  stats.value[1].value = pending.toString();
  stats.value[2].value = approved.toString();
  stats.value[3].value = inReview.toString();
};

const reviewModal = ref<{ open: boolean; application: any | null }>({
  open: false,
  application: null,
});

const openReviewModal = (application: any) => {
  reviewModal.value = { open: true, application };
};

const closeReviewModal = () => {
  reviewModal.value = { open: false, application: null };
  loadApplications(); // Refresh after review
};

onMounted(() => {
  loadElections();
});
</script>


