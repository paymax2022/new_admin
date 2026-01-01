<template>
  <tr class="text-sm text-[#1e293b]">
    <td class="border-b border-[#d9e3f0] bg-white px-5 py-4 align-top font-semibold text-[#111827]">
      {{ id }}
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
      {{ from }}
    </td>
    <td class="border-b border-[#d9e3f0] bg-white px-5 py-4 align-top text-[#475569]">
      {{ to }}
    </td>
    <td class="border-b border-[#d9e3f0] bg-white px-5 py-4 align-top font-semibold text-[#111827]">
      {{ amount }}
    </td>
    <td class="border-b border-[#d9e3f0] bg-white px-5 py-4 align-top text-[#475569]">
      {{ fee }}
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
      {{ date }}
    </td>
    <td class="border-b border-[#d9e3f0] bg-white px-5 py-4 align-top text-right">
      <button
        class="inline-flex items-center gap-2 rounded-full border border-[#e2e8f0] bg-[#f8fafc] px-4 py-2 text-sm font-semibold text-[#1f2937] transition hover:opacity-90"
        type="button"
        @click="$emit('action', { action: { type: 'view-details', label: action.label }, row: emitPayload })"
      >
        <IconEye class="h-4 w-4" />
        {{ action.label }}
      </button>
    </td>
  </tr>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import IconEye from '@/components/icon/icon-eye.vue';

const props = defineProps<{
  id: string;
  type: { label: string; color: string; bg: string };
  from: string;
  to: string;
  amount: string;
  fee: string;
  status: { label: string; color: string; bg: string };
  date: string;
  action: { label: string };
  detail: Record<string, unknown>;
}>();

const emitPayload = computed(() => ({
  id: props.id,
  type: props.type,
  from: props.from,
  to: props.to,
  amount: props.amount,
  fee: props.fee,
  status: props.status,
  date: props.date,
  action: props.action,
  detail: props.detail,
}));
</script>

