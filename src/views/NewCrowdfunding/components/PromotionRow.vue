<template>
  <tr class="text-sm text-[#1e293b]">
    <td class="border-b border-[#d9e3f0] bg-white px-5 py-4 align-top font-semibold text-[#111827]">
      {{ id }}
    </td>
    <td class="border-b border-[#d9e3f0] bg-white px-5 py-4 align-top">
      <p class="font-semibold text-[#111827]">{{ campaign }}</p>
    </td>
    <td class="border-b border-[#d9e3f0] bg-white px-5 py-4 align-top">
      <span
        class="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide"
        :style="{ color: type.color, borderColor: type.color, backgroundColor: type.bg }"
      >
        {{ type.label }}
      </span>
    </td>
    <td class="border-b border-[#d9e3f0] bg-white px-5 py-4 align-top text-[#475569]">
      {{ duration }}
    </td>
    <td class="border-b border-[#d9e3f0] bg-white px-5 py-4 align-top font-semibold text-[#111827]">
      {{ budget }}
    </td>
    <td class="border-b border-[#d9e3f0] bg-white px-5 py-4 align-top">
      <span
        class="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide"
        :style="{ color: progress.color, borderColor: progress.color, backgroundColor: progress.bg }"
      >
        {{ progress.label }}
      </span>
    </td>
    <td class="border-b border-[#d9e3f0] bg-white px-5 py-4 align-top">
      <span
        class="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide"
        :style="urgency.label.toLowerCase() === 'high'
          ? { color: '#FFFFFF', borderColor: urgency.color, backgroundColor: urgency.color }
          : { color: urgency.color, borderColor: urgency.color, backgroundColor: urgency.bg }"
      >
        {{ urgency.label }}
      </span>
    </td>
    <td class="border-b border-[#d9e3f0] bg-white px-5 py-4 align-top">
      <span
        class="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide"
        :style="{ color: status.color, borderColor: status.color, backgroundColor: status.bg }"
      >
        {{ status.label }}
      </span>
    </td>
    <td class="border-b border-[#d9e3f0] bg-white px-5 py-4 align-top text-[#475569]">
      {{ requested }}
    </td>
    <td class="border-b border-[#d9e3f0] bg-white px-5 py-4 align-top text-right">
      <button
        class="inline-flex items-center gap-2 rounded-full border border-[#e2e8f0] bg-[#f8fafc] px-4 py-2 text-sm font-semibold text-[#1f2937] transition hover:opacity-90"
        type="button"
        @click="$emit('action', { action: { type: 'view', label: 'View' }, row: payload })"
      >
        <IconEye class="h-4 w-4" />
        View
      </button>
    </td>
  </tr>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import IconEye from '@/components/icon/icon-eye.vue';

const props = defineProps<{
  id: string;
  campaign: string;
  type: { label: string; color: string; bg: string };
  duration: string;
  budget: string;
  progress: { label: string; color: string; bg: string; value: string };
  urgency: { label: string; color: string; bg: string };
  status: { label: string; color: string; bg: string };
  requested: string;
  actions: { label: string; type: string }[];
  detail: Record<string, unknown>;
}>();

const payload = computed(() => ({
  ...props,
}));
</script>

