<template>
  <tr class="text-sm text-[#1e293b]">
    <td class="border-b border-[#d9e3f0] bg-white px-5 py-4 align-top">
      <div class="flex items-center gap-3">
        <div class="flex h-10 w-10 items-center justify-center rounded-full bg-[#eef2ff] text-sm font-semibold text-[#6366f1]">
          {{ initials }}
        </div>
        <div>
          <p class="font-semibold text-[#111827]">{{ name }}</p>
          <p class="text-xs text-[#94a3b8]">{{ userId }}</p>
        </div>
      </div>
    </td>
    <td class="border-b border-[#d9e3f0] bg-white px-5 py-4 align-top">
      <p class="font-semibold text-[#111827]">{{ contactEmail }}</p>
      <p class="text-xs text-[#94a3b8]">{{ contactPhone }}</p>
    </td>
    <td class="border-b border-[#d9e3f0] bg-white px-5 py-4 align-top">
      <p class="font-semibold text-[#111827]">{{ activity }}</p>
      <p class="text-xs text-[#94a3b8]">{{ activityDetail }}</p>
    </td>
    <td class="border-b border-[#d9e3f0] bg-white px-5 py-4 align-top">
      <p class="font-semibold text-[#111827]">{{ wallet }}</p>
      <p class="text-xs text-[#94a3b8]">in donations</p>
    </td>
    <td class="border-b border-[#d9e3f0] bg-white px-5 py-4 align-top">
      <span
        class="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide"
        :style="{ color: statusColor, borderColor: statusColor, backgroundColor: statusBg }"
      >
        {{ status }}
      </span>
    </td>
    <td class="border-b border-[#d9e3f0] bg-white px-5 py-4 align-top text-[#475569]">
      {{ suspensionReason }}
    </td>
    <td class="border-b border-[#d9e3f0] bg-white px-5 py-4 align-top text-[#475569]">
      {{ lastActive }}
    </td>
    <td class="border-b border-[#d9e3f0] bg-white px-5 py-4 align-top">
      <div class="flex items-center justify-end gap-3 whitespace-nowrap">
        <ActionButton
          v-for="action in formattedActions"
          :key="action.label"
          v-bind="action"
          @click="emit('action', { action, row: rowPayload })"
        />
      </div>
    </td>
  </tr>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import ActionButton, { type ActionButtonConfig } from './UserRowActionButton.vue';

const emit = defineEmits(['action']);

const props = defineProps<{
  initials: string;
  name: string;
  userId: string;
  contactEmail: string;
  contactPhone: string;
  activity: string;
  activityDetail: string;
  wallet: string;
  status: string;
  statusColor: string;
  statusBg: string;
  suspensionReason: string;
  lastActive: string;
  actions: { label: string; type: string }[];
  detail: Record<string, unknown>;
  suspendModal?: Record<string, unknown>;
  activateModal?: Record<string, unknown>;
}>();

const baseActionStyles: Record<string, Pick<ActionButtonConfig, 'icon' | 'textColor' | 'bgColor' | 'borderColor'>> = {
  view: {
    icon: 'eye',
    textColor: '#111827',
    bgColor: '#F1F5F9',
    borderColor: '#E2E8F0',
  },
  suspend: {
    icon: 'ban',
    textColor: '#DC2626',
    bgColor: '#FEE2E2',
    borderColor: '#FECACA',
  },
  activate: {
    icon: 'circle-check',
    textColor: '#16A34A',
    bgColor: '#DCFCE7',
    borderColor: '#A7F3D0',
  },
};

const formattedActions = computed<ActionButtonConfig[]>(() =>
  props.actions.map((action) => {
    const style = baseActionStyles[action.type] || baseActionStyles.view;
    return {
      label: action.label,
      type: action.type,
      ...style,
    };
  })
);

const rowPayload = computed(() => ({
  initials: props.initials,
  name: props.name,
  userId: props.userId,
  contactEmail: props.contactEmail,
  contactPhone: props.contactPhone,
  activity: props.activity,
  activityDetail: props.activityDetail,
  wallet: props.wallet,
  status: props.status,
  statusColor: props.statusColor,
  statusBg: props.statusBg,
  suspensionReason: props.suspensionReason,
  lastActive: props.lastActive,
  detail: props.detail,
  actions: props.actions,
  suspendModal: props.suspendModal || {},
  activateModal: props.activateModal || {},
}));
</script>

