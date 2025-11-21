<template>
  <tr class="text-sm text-[#1e293b]">
    <td class="border-b border-[#d9e3f0] bg-white px-5 py-4 align-top font-semibold text-[#111827]">
      {{ id }}
    </td>
    <td class="border-b border-[#d9e3f0] bg-white px-5 py-4 align-top">
      <p class="font-semibold text-[#111827]">{{ subject }}</p>
    </td>
    <td class="border-b border-[#d9e3f0] bg-white px-5 py-4 align-top text-[#475569]">
      {{ user }}
    </td>
    <td class="border-b border-[#d9e3f0] bg-white px-5 py-4 align-top">
      <span
        class="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide"
        :style="{ color: category.color, borderColor: category.color, backgroundColor: category.bg }"
      >
        {{ category.label }}
      </span>
    </td>
    <td class="border-b border-[#d9e3f0] bg-white px-5 py-4 align-top">
      <span
        class="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide"
        :style="priority.label.toLowerCase() === 'high'
          ? { color: '#FFFFFF', borderColor: priority.color, backgroundColor: priority.color }
          : { color: priority.color, borderColor: priority.color, backgroundColor: priority.bg }"
      >
        {{ priority.label }}
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
      {{ agent }}
    </td>
    <td class="border-b border-[#d9e3f0] bg-white px-5 py-4 align-top text-[#475569]">
      {{ created }}
    </td>
    <td class="border-b border-[#d9e3f0] bg-white px-5 py-4 align-top">
      <div class="flex items-center justify-end gap-3 whitespace-nowrap">
        <ActionButton
          v-for="action in formattedActions"
          :key="action.label"
          v-bind="action"
          @click="$emit('action', { action, row: payload })"
        />
      </div>
    </td>
  </tr>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import ActionButton, { type ActionButtonConfig } from './SupportTicketRowActionButton.vue';

const props = defineProps<{
  id: string;
  subject: string;
  user: string;
  category: { label: string; color: string; bg: string };
  priority: { label: string; color: string; bg: string };
  status: { label: string; color: string; bg: string };
  agent: string;
  created: string;
  actions: { label: string; type: string }[];
  detail: Record<string, unknown>;
}>();

const actionStyles: Record<string, Pick<ActionButtonConfig, 'icon' | 'textColor' | 'bgColor' | 'borderColor'>> = {
  view: { icon: 'eye', textColor: '#111827', bgColor: '#F1F5F9', borderColor: '#E2E8F0' },
  assign: { icon: 'user-plus', textColor: '#2563EB', bgColor: '#DBEAFE', borderColor: '#BFDBFE' },
};

const formattedActions = computed<ActionButtonConfig[]>(() =>
  props.actions.map((action) => {
    const style = actionStyles[action.type] ?? actionStyles.view;
    return { label: action.label, type: action.type, ...style };
  })
);

const payload = computed(() => ({
  id: props.id,
  subject: props.subject,
  user: props.user,
  category: props.category,
  priority: props.priority,
  status: props.status,
  agent: props.agent,
  created: props.created,
  detail: props.detail,
  actions: props.actions,
}));
</script>

