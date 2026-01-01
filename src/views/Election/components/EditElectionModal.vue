<template>
  <transition name="fade">
    <div class="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
      <div class="absolute inset-0 bg-[#0f172a]/40 backdrop-blur-sm" @click="$emit('close')" />
      <div class="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-[0_40px_80px_rgba(15,23,42,0.18)]">
        <header class="flex items-center justify-between border-b border-[#e2e8f0] px-8 py-6">
          <h2 class="text-xl font-semibold text-[#111827]">Edit Election Details</h2>
          <button
            type="button"
            class="flex h-9 w-9 items-center justify-center rounded-full bg-[#f1f5f9] text-[#475569] transition hover:opacity-80"
            @click="$emit('close')"
          >
            <IconX class="h-5 w-5" />
          </button>
        </header>

        <div class="px-8 py-6 space-y-6">
          <!-- Basic Information -->
          <div>
            <h3 class="text-lg font-semibold text-[#111827] mb-4">Basic Information</h3>
            <div class="space-y-4">
              <!-- Election Title -->
              <div>
                <label class="block text-sm font-semibold text-[#111827] mb-2">Election Title</label>
                <input
                  v-model="editData.title"
                  type="text"
                  placeholder="e.g. Student Union President 2024"
                  class="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm text-[#1f2937] placeholder:text-[#94a3b8] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
                />
              </div>

              <!-- Description -->
              <div>
                <label class="block text-sm font-semibold text-[#111827] mb-2">Description</label>
                <textarea
                  v-model="editData.description"
                  rows="3"
                  placeholder="Describe the purpose and scope of this election..."
                  class="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm text-[#1f2937] placeholder:text-[#94a3b8] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5] resize-none"
                />
              </div>
            </div>
          </div>

          <!-- Schedule -->
          <div>
            <h3 class="text-lg font-semibold text-[#111827] mb-4">Schedule</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Start Date -->
              <div>
                <label class="block text-sm font-semibold text-[#111827] mb-2">Start Date</label>
                <div class="relative">
                  <input
                    v-model="editData.startDate"
                    type="text"
                    placeholder="MM/DD/YYYY"
                    class="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 pr-10 text-sm text-[#1f2937] placeholder:text-[#94a3b8] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
                  />
                  <IconCalendar class="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#94a3b8] pointer-events-none" />
                </div>
              </div>

              <!-- End Date -->
              <div>
                <label class="block text-sm font-semibold text-[#111827] mb-2">End Date</label>
                <div class="relative">
                  <input
                    v-model="editData.endDate"
                    type="text"
                    placeholder="MM/DD/YYYY"
                    class="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 pr-10 text-sm text-[#1f2937] placeholder:text-[#94a3b8] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
                  />
                  <IconCalendar class="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#94a3b8] pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          <!-- Election Statistics -->
          <div>
            <h3 class="text-lg font-semibold text-[#111827] mb-4">Election Statistics</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Positions -->
              <div>
                <label class="block text-sm font-semibold text-[#111827] mb-2">Positions</label>
                <input
                  v-model="editData.positions"
                  type="text"
                  placeholder="Enter number of positions"
                  class="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm text-[#1f2937] placeholder:text-[#94a3b8] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
                />
              </div>

              <!-- Total Voters -->
              <div>
                <label class="block text-sm font-semibold text-[#111827] mb-2">Total Voters</label>
                <div class="relative">
                  <IconUserCircle class="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#94a3b8] pointer-events-none" />
                  <input
                    :value="editData.totalVoters"
                    type="text"
                    readonly
                    disabled
                    class="w-full rounded-xl border border-[#e2e8f0] bg-[#f8fafc] pl-10 pr-4 py-3 text-sm text-[#1f2937] cursor-not-allowed"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <footer class="flex items-center justify-end gap-3 border-t border-[#e2e8f0] px-8 py-6">
          <button
            type="button"
            class="rounded-xl border border-[#e2e8f0] bg-white px-6 py-2.5 text-sm font-semibold text-[#475569] transition hover:border-[#cbd5f5] hover:text-[#1e293b]"
            @click="$emit('close')"
          >
            Close
          </button>
          <button
            type="button"
            class="rounded-xl bg-[#111827] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1f2937]"
            @click="handleSave"
          >
            Save Changes
          </button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import IconX from '@/components/icon/icon-x.vue';
import IconCalendar from '@/components/icon/icon-calendar.vue';
import IconUserCircle from '@/components/icon/icon-user-circle.vue';

const props = defineProps<{
  election?: {
    title?: string;
    description?: string;
    startDate?: string;
    endDate?: string;
    positions?: string;
    eligibleVoters?: string;
  };
}>();

const emit = defineEmits(['close', 'save']);

const editData = ref({
  title: '',
  description: '',
  startDate: '',
  endDate: '',
  positions: '',
  totalVoters: '',
});

// Format date to MM/DD/YYYY
const formatDateForInput = (dateString?: string) => {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  } catch {
    return dateString;
  }
};

// Initialize form data when election prop changes
watch(
  () => props.election,
  (newElection) => {
    if (newElection) {
      editData.value = {
        title: newElection.title || '',
        description: newElection.description || '',
        startDate: formatDateForInput(newElection.startDate),
        endDate: formatDateForInput(newElection.endDate),
        positions: newElection.positions?.replace(/\D/g, '') || '',
        totalVoters: newElection.eligibleVoters?.replace(/\D/g, '') ? `${newElection.eligibleVoters.replace(/\D/g, '')} voters` : '',
      };
    }
  },
  { immediate: true }
);

const handleSave = () => {
  emit('save', editData.value);
  emit('close');
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

