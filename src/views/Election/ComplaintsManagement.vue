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
        <select
          v-model="selectedElectionId"
          class="flex-1 rounded-full border border-[#e2e8f0] bg-white px-4 py-2 text-sm font-semibold text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#111827]"
          @change="loadComplaints"
        >
          <option value="">Select Election</option>
          <option v-for="election in elections" :key="election.id" :value="election.id">
            {{ election.title }}
          </option>
        </select>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search complaints..."
          class="flex-1 rounded-full border border-[#e2e8f0] bg-[#f8fafc] px-4 py-2 text-sm text-[#111827] placeholder-[#cbd5f5] focus:outline-none focus:ring-2 focus:ring-[#111827]"
        />
        <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
          <select
            v-model="statusFilter"
            class="rounded-full border border-[#e2e8f0] bg-white px-4 py-2 text-sm font-semibold text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#111827]"
            @change="loadComplaints"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="in_review">In Review</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>
    </section>

    <section class="space-y-4">
      <div v-if="loading" class="text-center py-8 text-[#6b7280]">Loading complaints...</div>
      <div v-else-if="!selectedElectionId" class="text-center py-8 text-[#6b7280]">Please select an election to view complaints</div>
      <div v-else-if="filteredComplaints.length === 0" class="text-center py-8 text-[#6b7280]">No complaints found</div>
      <article
        v-for="complaint in filteredComplaints"
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

    </section>

    <ComplaintDetailsModal
      v-if="modal.open && modal.data"
      :complaint="modal.data"
      @close="closeModal"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, markRaw } from 'vue';
import { useToast } from 'vue-toastification';
import ComplaintDetailsModal from './components/ComplaintDetailsModal.vue';
import IconClipboardText from '@/components/icon/icon-clipboard-text.vue';
import IconClock from '@/components/icon/icon-clock.vue';
import IconRefresh from '@/components/icon/icon-refresh.vue';
import IconCircleCheck from '@/components/icon/icon-circle-check.vue';
import IconCaretDown from '@/components/icon/icon-caret-down.vue';
import electionService from '@/services/electionService';

const toast = useToast();

// Mark icons as raw
const IconClipboardTextRaw = markRaw(IconClipboardText);
const IconClockRaw = markRaw(IconClock);
const IconRefreshRaw = markRaw(IconRefresh);
const IconCircleCheckRaw = markRaw(IconCircleCheck);

const loading = ref(false);
const selectedElectionId = ref('');
const searchQuery = ref('');
const statusFilter = ref('');
const elections = ref<any[]>([]);
const complaints = ref<any[]>([]);

const summaryStats = ref([
  {
    label: 'Total Complaints',
    value: '0',
    icon: IconClipboardTextRaw,
    iconBg: '#fef9c3',
    iconColor: '#f59e0b',
  },
  {
    label: 'Pending',
    value: '0',
    icon: IconClockRaw,
    iconBg: '#fef2f2',
    iconColor: '#f97316',
  },
  {
    label: 'In Progress',
    value: '0',
    icon: IconRefreshRaw,
    iconBg: '#e0f2fe',
    iconColor: '#0284c7',
  },
  {
    label: 'Resolved',
    value: '0',
    icon: IconCircleCheckRaw,
    iconBg: '#dcfce7',
    iconColor: '#16a34a',
  },
]);

const getPriorityBadge = (priority: string) => {
  const priorityLower = (priority || '').toLowerCase();
  if (priorityLower === 'high') return { label: 'High', badgeBg: '#fee2e2', badgeColor: '#b91c1c' };
  if (priorityLower === 'medium') return { label: 'Medium', badgeBg: '#fef3c7', badgeColor: '#b45309' };
  return { label: 'Normal', badgeBg: '#dcfce7', badgeColor: '#15803d' };
};

const getStatusBadge = (status: string) => {
  const statusLower = (status || '').toLowerCase();
  if (statusLower === 'pending') return { label: 'Pending', badgeBg: '#fff7ed', badgeColor: '#ea580c' };
  if (statusLower === 'in_review' || statusLower === 'in progress') return { label: 'In Progress', badgeBg: '#dbeafe', badgeColor: '#1d4ed8' };
  if (statusLower === 'resolved') return { label: 'Resolved', badgeBg: '#d1fae5', badgeColor: '#16a34a' };
  if (statusLower === 'closed') return { label: 'Closed', badgeBg: '#f1f5f9', badgeColor: '#64748b' };
  return { label: status || 'Unknown', badgeBg: '#f1f5f9', badgeColor: '#64748b' };
};

const formatDate = (dateString: string) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const filteredComplaints = computed(() => {
  let filtered = complaints.value;
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter((c: any) =>
      c.title?.toLowerCase().includes(query) ||
      c.description?.toLowerCase().includes(query) ||
      c.reporter?.toLowerCase().includes(query)
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
      
      if (elections.value.length > 0 && !selectedElectionId.value) {
        selectedElectionId.value = elections.value[0].id;
        await loadComplaints();
      }
    }
  } catch (error: any) {
    console.error('Error loading elections:', error);
    toast.error('Failed to load elections');
  }
};

const loadComplaints = async () => {
  if (!selectedElectionId.value) {
    complaints.value = [];
    updateStats();
    return;
  }
  
  loading.value = true;
  try {
    const params: any = { limit: 100 };
    if (statusFilter.value) {
      params.status = statusFilter.value;
    }
    
    const response = await electionService.getAllComplaintsAdmin(selectedElectionId.value, params);
    const comps = Array.isArray(response?.data) ? response.data : [];
    
    complaints.value = comps.map((comp: any) => {
      const priority = getPriorityBadge(comp.priority || comp.severity || 'normal');
      const status = getStatusBadge(comp.status || 'pending');
      
      return {
        id: comp.id || comp._id || comp.complaint_id,
        title: comp.title || comp.subject || comp.description?.substring(0, 50) || 'Untitled Complaint',
        reporter: comp.reporter_name || comp.complainant_name || comp.user_name || comp.full_name || 'Anonymous',
        date: formatDate(comp.created_at || comp.submitted_at || comp.date),
        category: comp.category || comp.type || 'General',
        description: comp.description || comp.details || comp.message || '',
        priority,
        status,
        assignedTo: comp.assigned_to || comp.assigned_agent || 'Unassigned',
        canAssign: (comp.status || '').toLowerCase() === 'pending',
        original: comp,
      };
    });
    
    updateStats();
  } catch (error: any) {
    console.error('Error loading complaints:', error);
    toast.error('Failed to load complaints');
  } finally {
    loading.value = false;
  }
};

const updateStats = () => {
  const total = complaints.value.length;
  const pending = complaints.value.filter((c: any) => 
    (c.status.label || '').toLowerCase() === 'pending'
  ).length;
  const inProgress = complaints.value.filter((c: any) => 
    (c.status.label || '').toLowerCase() === 'in progress'
  ).length;
  const resolved = complaints.value.filter((c: any) => 
    (c.status.label || '').toLowerCase() === 'resolved'
  ).length;
  
  summaryStats.value[0].value = total.toString();
  summaryStats.value[1].value = pending.toString();
  summaryStats.value[2].value = inProgress.toString();
  summaryStats.value[3].value = resolved.toString();
};

const modal = ref<{ open: boolean; data: any | null }>({
  open: false,
  data: null,
});

const openModal = (complaint: any) => {
  modal.value = { open: true, data: complaint };
};

const closeModal = () => {
  modal.value = { open: false, data: null };
  loadComplaints(); // Refresh after modal actions
};

onMounted(() => {
  loadElections();
});
</script>

