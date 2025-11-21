<template>
  <transition name="fade">
    <div class="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
      <div class="absolute inset-0 bg-[#0f172a]/40 backdrop-blur-sm" @click="$emit('close')" />
      <div class="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-[0_40px_80px_rgba(15,23,42,0.18)]">
        <header class="flex items-center justify-between border-b border-[#e2e8f0] px-8 py-6">
          <div class="flex items-center gap-3">
            <h2 class="text-xl font-semibold text-[#111827]">Live Monitoring: {{ election?.title || 'Election' }}</h2>
            <span class="inline-flex items-center rounded-full border border-[#16a34a] bg-[#dcfce7] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#16a34a]">
              Live
            </span>
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
          <!-- Overall Voter Turnout -->
          <div class="rounded-2xl border border-[#e2e8f0] bg-white p-6">
            <h3 class="text-lg font-semibold text-[#111827] mb-4">Overall Voter Turnout</h3>
            <div class="flex items-end gap-4 mb-4">
              <div>
                <p class="text-5xl font-semibold text-[#111827]">{{ turnoutPercentage }}%</p>
              </div>
              <div class="flex-1">
                <p class="text-sm text-[#6b7280] mb-1">{{ votesCast }} votes cast</p>
                <p class="text-sm text-[#6b7280]">{{ eligibleVoters }} eligible voters</p>
              </div>
            </div>
            <div class="h-3 w-full rounded-full bg-[#f1f5f9] overflow-hidden">
              <div
                class="h-full rounded-full bg-[#16a34a] transition-all duration-300"
                :style="{ width: `${turnoutPercentage}%` }"
              />
            </div>
          </div>

          <!-- Key Metrics -->
          <div class="rounded-2xl border border-[#e2e8f0] bg-white p-6">
            <h3 class="text-lg font-semibold text-[#111827] mb-4">Key Metrics</h3>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8] mb-1">Votes/Hour</p>
                <p class="text-2xl font-semibold text-[#111827]">{{ metrics.votesPerHour }}</p>
              </div>
              <div>
                <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8] mb-1">Peak Hour</p>
                <p class="text-2xl font-semibold text-[#111827]">{{ metrics.peakHour }}</p>
              </div>
              <div>
                <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8] mb-1">Avg Vote Time</p>
                <p class="text-2xl font-semibold text-[#111827]">{{ metrics.avgVoteTime }} min</p>
              </div>
              <div>
                <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8] mb-1">Warning</p>
                <p class="text-2xl font-semibold text-[#f59e0b]">{{ metrics.warnings }}</p>
              </div>
            </div>
          </div>

          <!-- Overall Voter Turnout by Position -->
          <div class="rounded-2xl border border-[#e2e8f0] bg-white p-6">
            <h3 class="text-lg font-semibold text-[#111827] mb-4">Overall Voter Turnout by Position</h3>
            <div class="space-y-4">
              <div
                v-for="position in positionTurnout"
                :key="position.name"
                class="space-y-2"
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <span class="text-sm font-semibold text-[#111827]">{{ position.name }}</span>
                    <span class="text-xs text-[#6b7280]">{{ position.votes }} votes ({{ position.candidates }} candidates)</span>
                  </div>
                  <span class="text-sm font-semibold text-[#111827]">{{ position.percentage }}%</span>
                </div>
                <div class="h-2 w-full rounded-full bg-[#f1f5f9] overflow-hidden">
                  <div
                    class="h-full rounded-full bg-[#2563eb] transition-all duration-300"
                    :style="{ width: `${position.percentage}%` }"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Recent Activity -->
          <div class="rounded-2xl border border-[#e2e8f0] bg-white p-6">
            <h3 class="text-lg font-semibold text-[#111827] mb-4">Recent Activity</h3>
            <div class="space-y-3">
              <div
                v-for="activity in recentActivities"
                :key="activity.id"
                class="flex items-start gap-3"
              >
                <div
                  class="mt-1 h-2 w-2 rounded-full shrink-0"
                  :style="{ backgroundColor: activity.color }"
                />
                <div class="flex-1">
                  <p class="text-sm font-semibold text-[#111827]">{{ activity.description }}</p>
                  <p class="text-xs text-[#94a3b8]">{{ activity.time }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import IconX from '@/components/icon/icon-x.vue';

const props = defineProps<{
  election?: {
    title: string;
    votes?: string;
    eligibleVoters?: string;
  };
}>();

const emit = defineEmits(['close']);

const votesCast = computed(() => {
  if (props.election?.votes) {
    return parseInt(props.election.votes.replace(/\D/g, '')) || 1509;
  }
  return 1509;
});

const eligibleVoters = computed(() => {
  if (props.election?.eligibleVoters) {
    return parseInt(props.election.eligibleVoters.replace(/\D/g, '')) || 2847;
  }
  return 2847;
});

const turnoutPercentage = computed(() => {
  return Math.round((votesCast.value / eligibleVoters.value) * 100);
});

const metrics = {
  votesPerHour: 45,
  peakHour: '2:00 PM',
  avgVoteTime: 2.3,
  warnings: 4,
};

const positionTurnout = [
  {
    name: 'President',
    votes: 234,
    candidates: 3,
    percentage: 16,
  },
  {
    name: 'Vice President',
    votes: 198,
    candidates: 2,
    percentage: 13,
  },
  {
    name: 'Secretary',
    votes: 187,
    candidates: 4,
    percentage: 12,
  },
  {
    name: 'Treasurer',
    votes: 158,
    candidates: 2,
    percentage: 10,
  },
];

const recentActivities = [
  {
    id: 1,
    description: '15 new votes cast for President position',
    time: '2 minutes ago',
    color: '#dc2626',
  },
  {
    id: 2,
    description: 'Voter turnout reached 50% milestone',
    time: '5 minutes ago',
    color: '#16a34a',
  },
  {
    id: 3,
    description: '1 complaint reported for technical issues',
    time: '12 minutes ago',
    color: '#2563eb',
  },
  {
    id: 4,
    description: 'Peak voting activity detected',
    time: '18 minutes ago',
    color: '#f97316',
  },
];
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

