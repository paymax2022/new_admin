<template>
  <div class="rounded-2xl border border-[#e2e8f0] p-5 transition hover:border-[#cbd5f5] hover:shadow-[0_16px_30px_rgba(15,23,42,0.08)]">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h3 class="text-lg font-semibold text-[#1a202c]">{{ name }}</h3>
        <p class="mt-1 text-sm text-[#94a3b8]">{{ category }}</p>
      </div>
      <span
        class="inline-flex items-center self-start rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide"
        :style="{ color: statusColor, backgroundColor: statusBg }"
      >
        {{ status }}
      </span>
    </div>

    <div class="mt-5">
      <div class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">{{ progressLabel }}</div>
      <div class="mt-2 h-2 rounded-full bg-[#edf2f7]">
        <div
          class="h-full rounded-full"
          :style="{ width: `${progressWidth}%`, backgroundColor: progressColor }"
        />
      </div>
      <div class="mt-3 flex items-center justify-between text-sm font-semibold text-[#1a202c]">
        <span>{{ formattedCurrent }}</span>
        <span>{{ formattedGoal }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps<{
  name: string;
  category: string;
  status: string;
  statusColor: string;
  statusBg: string;
  progressLabel: string;
  currentAmount: number;
  goalAmount: number;
  progress: number;
  progressColor: string;
}>();

const clamp = (value: number) => Math.min(1, Math.max(0, value));

const progressWidth = computed(() => Math.round(clamp(props.progress) * 100));

const formatter = new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN',
  maximumFractionDigits: 0,
});

const formattedCurrent = computed(() => formatter.format(props.currentAmount));
const formattedGoal = computed(() => formatter.format(props.goalAmount));
</script>


