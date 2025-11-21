<template>
  <transition name="fade">
    <div class="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
      <div class="absolute inset-0 bg-[#0f172a]/40 backdrop-blur-sm" @click="$emit('close')" />
      <div class="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-[0_40px_80px_rgba(15,23,42,0.18)]">
        <header class="flex items-center justify-between border-b border-[#e2e8f0] px-8 py-6">
          <div class="flex items-center gap-3">
            <h2 class="text-xl font-semibold text-[#111827]">Election Details</h2>
            <span
              v-if="election?.status === 'Live' || election?.status === 'ongoing'"
              class="inline-flex items-center rounded-full bg-[#16a34a] px-3 py-1 text-xs font-semibold text-white"
            >
              Live
            </span>
            <span
              v-else-if="election?.status === 'Completed' || election?.status === 'completed'"
              class="inline-flex items-center rounded-full border border-[#e2e8f0] bg-[#f1f5f9] px-3 py-1 text-xs font-semibold text-[#475569]"
            >
              Completed
            </span>
            <span
              v-else-if="election?.status === 'Upcoming' || election?.status === 'upcoming'"
              class="inline-flex items-center rounded-full border border-[#e2e8f0] bg-[#f1f5f9] px-3 py-1 text-xs font-semibold text-[#475569]"
            >
              Upcoming
            </span>
            <button
              v-if="election?.status === 'Upcoming' || election?.status === 'upcoming'"
              type="button"
              class="inline-flex items-center gap-2 rounded-full border border-[#e2e8f0] bg-white px-3 py-1 text-xs font-semibold text-[#475569] transition hover:border-[#cbd5f5] hover:text-[#1e293b]"
              @click="$emit('edit')"
            >
              <IconEdit class="h-4 w-4" />
              Edit
            </button>
          </div>
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
                  :value="election?.title || ''"
                  type="text"
                  readonly
                  class="w-full rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-sm text-[#1f2937] cursor-not-allowed"
                />
              </div>

              <!-- Description -->
              <div>
                <label class="block text-sm font-semibold text-[#111827] mb-2">Description</label>
                <textarea
                  :value="election?.description || ''"
                  readonly
                  rows="3"
                  class="w-full rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-sm text-[#1f2937] cursor-not-allowed resize-none"
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
                  <IconCalendar class="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#94a3b8] pointer-events-none" />
                  <input
                    :value="formatDate(election?.startDate) || ''"
                    type="text"
                    readonly
                    class="w-full rounded-xl border border-[#e2e8f0] bg-[#f8fafc] pl-10 pr-4 py-3 text-sm text-[#1f2937] cursor-not-allowed"
                  />
                </div>
              </div>

              <!-- End Date -->
              <div>
                <label class="block text-sm font-semibold text-[#111827] mb-2">End Date</label>
                <div class="relative">
                  <IconClock class="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#94a3b8] pointer-events-none" />
                  <input
                    :value="formatDate(election?.endDate) || ''"
                    type="text"
                    readonly
                    class="w-full rounded-xl border border-[#e2e8f0] bg-[#f8fafc] pl-10 pr-4 py-3 text-sm text-[#1f2937] cursor-not-allowed"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Election Statistics -->
          <div>
            <h3 class="text-lg font-semibold text-[#111827] mb-4">Election Statistics</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <!-- Positions -->
              <div>
                <label class="block text-sm font-semibold text-[#111827] mb-2">Positions</label>
                <div class="relative">
                  <IconUsersGroup class="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#94a3b8] pointer-events-none" />
                  <input
                    :value="getPositionsCount()"
                    type="text"
                    readonly
                    class="w-full rounded-xl border border-[#e2e8f0] bg-[#f8fafc] pl-10 pr-4 py-3 text-sm text-[#1f2937] cursor-not-allowed"
                  />
                </div>
              </div>

              <!-- Total Voters -->
              <div>
                <label class="block text-sm font-semibold text-[#111827] mb-2">Total Voters</label>
                <div class="relative">
                  <IconUserCircle class="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#94a3b8] pointer-events-none" />
                  <input
                    :value="getTotalVoters()"
                    type="text"
                    readonly
                    class="w-full rounded-xl border border-[#e2e8f0] bg-[#f8fafc] pl-10 pr-4 py-3 text-sm text-[#1f2937] cursor-not-allowed"
                  />
                </div>
              </div>

              <!-- Current Turnout -->
              <div>
                <label class="block text-sm font-semibold text-[#111827] mb-2">Current Turnout</label>
                <div class="relative">
                  <IconBarChart class="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#94a3b8] pointer-events-none" />
                  <input
                    :value="getCurrentVotes()"
                    type="text"
                    readonly
                    class="w-full rounded-xl border border-[#e2e8f0] bg-[#f8fafc] pl-10 pr-4 py-3 text-sm text-[#1f2937] cursor-not-allowed"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Button -->
        <footer class="flex items-center justify-end border-t border-[#e2e8f0] px-8 py-6">
          <button
            type="button"
            class="rounded-xl border border-[#e2e8f0] bg-white px-6 py-2.5 text-sm font-semibold text-[#475569] transition hover:border-[#cbd5f5] hover:text-[#1e293b]"
            @click="$emit('close')"
          >
            Close
          </button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import IconX from '@/components/icon/icon-x.vue';
import IconCalendar from '@/components/icon/icon-calendar.vue';
import IconClock from '@/components/icon/icon-clock.vue';
import IconUsersGroup from '@/components/icon/icon-users-group.vue';
import IconUserCircle from '@/components/icon/icon-user-circle.vue';
import IconBarChart from '@/components/icon/icon-bar-chart.vue';
import IconEdit from '@/components/icon/icon-edit.vue';

const props = defineProps<{
  election?: {
    title?: string;
    description?: string;
    startDate?: string;
    endDate?: string;
    status?: string;
    positions?: string;
    votes?: string;
    eligibleVoters?: string;
  };
}>();

const emit = defineEmits(['close', 'edit']);

const formatDate = (dateString?: string) => {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch {
    return dateString;
  }
};

const getPositionsCount = () => {
  if (props.election?.positions) {
    const count = parseInt(props.election.positions) || 0;
    return `${count} position${count !== 1 ? 's' : ''}`;
  }
  return '0 positions';
};

const getTotalVoters = () => {
  if (props.election?.eligibleVoters) {
    const voters = props.election.eligibleVoters.replace(/\D/g, '') || '0';
    return `${voters} voters`;
  }
  return '0 voters';
};

const getCurrentVotes = () => {
  if (props.election?.votes) {
    const votes = props.election.votes.replace(/\D/g, '') || '0';
    return `${votes} votes`;
  }
  return '0 votes';
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

