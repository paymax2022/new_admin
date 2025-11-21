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
      <div class="relative flex items-center justify-end" @click.stop data-action-menu>
        <button
          :ref="(el) => setButtonRef(el)"
          type="button"
          class="rounded-full p-2 text-[#6b7280] transition hover:bg-[#f1f5f9]"
          @click="toggleDropdown"
        >
          <IconHorizontalDots class="h-5 w-5" />
        </button>
        <Teleport to="body">
          <div
            v-if="isDropdownOpen"
            class="fixed z-[9999] w-48 rounded-2xl border border-[#e2e8f0] bg-white p-2 shadow-lg"
            :style="dropdownPosition"
            data-dropdown="true"
          >
            <button
              v-for="action in formattedActions"
              :key="action.label"
              type="button"
              class="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition hover:bg-[#f8fafc]"
              :style="{ color: action.textColor }"
              @click="handleActionClick(action)"
            >
              <component :is="getIconComponent(action.icon)" class="h-4 w-4" />
              {{ action.label }}
            </button>
          </div>
        </Teleport>
      </div>
    </td>
  </tr>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted, onUnmounted, watch, nextTick } from 'vue';
import type { ComponentPublicInstance } from 'vue';

import { type ActionButtonConfig } from './UserRowActionButton.vue';
import IconHorizontalDots from '@/components/icon/icon-horizontal-dots.vue';
import IconBan from '@/components/icon/icon-ban.vue';
import IconCircleCheck from '@/components/icon/icon-circle-check.vue';
import IconEye from '@/components/icon/icon-eye.vue';

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

const iconMap = {
  eye: IconEye,
  ban: IconBan,
  'circle-check': IconCircleCheck,
};

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

const getIconComponent = (iconName: keyof typeof iconMap) => {
  return iconMap[iconName] || IconEye;
};

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

const isDropdownOpen = ref(false);
const buttonRef = ref<HTMLElement | null>(null);
const dropdownPosition = ref<{ top: string; right: string } | { display: string }>({ display: 'none' });

const setButtonRef = (el: HTMLElement | Element | ComponentPublicInstance | null) => {
  if (el && el instanceof HTMLElement) {
    buttonRef.value = el;
  } else if (el && '$el' in el && el.$el instanceof HTMLElement) {
    buttonRef.value = el.$el;
  }
};

const updateDropdownPosition = () => {
  if (!buttonRef.value || !isDropdownOpen.value) {
    return;
  }
  
  const rect = buttonRef.value.getBoundingClientRect();
  dropdownPosition.value = {
    top: `${rect.bottom + 8}px`,
    right: `${window.innerWidth - rect.right}px`,
  };
};

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
  if (isDropdownOpen.value) {
    nextTick(() => {
      updateDropdownPosition();
    });
  }
};

const closeDropdown = () => {
  isDropdownOpen.value = false;
};

const handleActionClick = (action: ActionButtonConfig) => {
  emit('action', { action, row: rowPayload.value });
  closeDropdown();
};

const handleClickOutside = (event: MouseEvent) => {
  if (isDropdownOpen.value) {
    const target = event.target as HTMLElement;
    const isButton = buttonRef.value?.contains(target);
    const isDropdown = target.closest('[data-dropdown="true"]');
    if (!isButton && !isDropdown) {
      closeDropdown();
    }
  }
};

watch(isDropdownOpen, (isOpen) => {
  if (isOpen) {
    nextTick(() => {
      updateDropdownPosition();
    });
  }
});

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  window.addEventListener('resize', updateDropdownPosition);
  window.addEventListener('scroll', updateDropdownPosition, true);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  window.removeEventListener('resize', updateDropdownPosition);
  window.removeEventListener('scroll', updateDropdownPosition, true);
});
</script>

