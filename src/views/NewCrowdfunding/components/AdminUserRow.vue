<template>
  <tr class="text-sm text-[#1e293b]">
    <td class="border-b border-[#e2e8f0] bg-white px-5 py-4 align-top">
      <div class="flex items-center gap-3">
        <div class="flex h-10 w-10 items-center justify-center rounded-full bg-[#eef2ff] text-sm font-semibold text-[#6366f1]">
          {{ initials }}
        </div>
        <div>
          <p class="font-semibold text-[#111827]">{{ name }}</p>
          <p class="text-xs text-[#94a3b8]">{{ email }}</p>
        </div>
      </div>
    </td>
    <td class="border-b border-[#e2e8f0] bg-white px-5 py-4 align-top">
      <span
        class="inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
        :style="{ color: role.color, borderColor: role.color, backgroundColor: role.bg }"
      >
        {{ role.label }}
      </span>
    </td>
    <td class="border-b border-[#e2e8f0] bg-white px-5 py-4 align-top text-[#475569]">
      {{ department }}
    </td>
    <td class="border-b border-[#e2e8f0] bg-white px-5 py-4 align-top">
      <span
        class="inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
        :style="{ color: status.color, borderColor: status.color, backgroundColor: status.bg }"
      >
        {{ status.label }}
      </span>
    </td>
    <td class="border-b border-[#e2e8f0] bg-white px-5 py-4 align-top text-[#475569]">
      {{ permissions }}
    </td>
    <td class="border-b border-[#e2e8f0] bg-white px-5 py-4 align-top text-[#475569]">
      {{ lastLogin }}
    </td>
    <td class="relative border-b border-[#e2e8f0] bg-white px-5 py-4 align-top text-right">
      <div class="inline-flex items-center gap-1">
        <button
          type="button"
          class="flex h-8 w-8 items-center justify-center rounded-full border border-transparent text-[#1f2937] transition hover:bg-[#f1f5f9]"
          @click="toggleMenu"
        >
          <IconDotsVertical class="h-5 w-5" />
        </button>
      </div>
      <div
        v-if="isMenuOpen"
        class="absolute right-5 top-12 z-10 w-48 rounded-2xl border border-[#e2e8f0] bg-white p-2 shadow-[0_20px_40px_rgba(15,23,42,0.08)]"
      >
        <button
          v-for="action in actions"
          :key="action.label"
          type="button"
          class="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-semibold transition hover:bg-[#f8fafc]"
          :class="action.style === 'danger' ? 'text-[#dc2626]' : 'text-[#1f2937]'"
          @click="handleAction(action)"
        >
          <IconEye v-if="action.type === 'view'" class="h-4 w-4" />
          <IconBan v-else-if="action.type === 'suspend'" class="h-4 w-4" />
          <IconRefresh v-else-if="action.type === 'reactivate'" class="h-4 w-4" />
          <IconPencil v-else-if="action.type === 'edit'" class="h-4 w-4" />
          {{ action.label }}
        </button>
      </div>
    </td>
  </tr>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';

import IconBan from '@/components/icon/icon-ban.vue';
import IconDotsVertical from '@/components/icon/icon-horizontal-dots.vue';
import IconEye from '@/components/icon/icon-eye.vue';
import IconPencil from '@/components/icon/icon-pencil.vue';
import IconRefresh from '@/components/icon/icon-refresh.vue';

const props = defineProps<{
  initials: string;
  name: string;
  email: string;
  role: { label: string; color: string; bg: string };
  department: string;
  status: { label: string; color: string; bg: string };
  permissions: string;
  lastLogin: string;
  actions: { label: string; type: string; style: 'primary' | 'danger' | 'ghost' }[];
  detail: Record<string, unknown>;
}>();

const emit = defineEmits<{
  (e: 'action', payload: { action: { label: string; type: string; style: string }; row: Record<string, unknown> }): void;
}>();

const payload = computed(() => ({
  initials: props.initials,
  name: props.name,
  email: props.email,
  role: props.role,
  department: props.department,
  status: props.status,
  permissions: props.permissions,
  lastLogin: props.lastLogin,
  actions: props.actions,
  detail: props.detail,
}));

const isMenuOpen = ref(false);
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const payloadValue = computed(() => ({ ...payload.value }));

const handleAction = (action: { label: string; type: string; style: string }) => {
  emit('action', { action, row: payloadValue.value });
  isMenuOpen.value = false;
};
</script>

