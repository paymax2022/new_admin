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

import { type ActionButtonConfig } from './SupportTicketRowActionButton.vue';
import IconHorizontalDots from '@/components/icon/icon-horizontal-dots.vue';
import IconEye from '@/components/icon/icon-eye.vue';
import IconUserPlus from '@/components/icon/icon-user-plus.vue';

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

const emit = defineEmits(['action']);

const iconMap = {
  eye: IconEye,
  'user-plus': IconUserPlus,
};

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

const getIconComponent = (iconName: keyof typeof iconMap) => {
  return iconMap[iconName] || IconEye;
};

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
  emit('action', { action, row: payload.value });
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

