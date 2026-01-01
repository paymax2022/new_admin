<template>
  <tr class="text-sm text-[#1e293b]">
    <td class="border-b border-[#d9e3f0] bg-white px-5 py-4 align-top">
      <p class="font-semibold text-[#111827]">{{ campaign }}</p>
      <p class="mt-1 text-xs text-[#94a3b8]">{{ campaignSubtitle }}</p>
    </td>
    <td class="border-b border-[#d9e3f0] bg-white px-5 py-4 align-top">
      <p class="font-semibold text-[#111827]">{{ owner }}</p>
      <p class="mt-1 text-xs text-[#94a3b8]">{{ ownerSubtitle }}</p>
    </td>
    <td class="border-b border-[#d9e3f0] bg-white px-5 py-4 align-top">
      <div class="flex items-center justify-between text-xs font-semibold text-[#111827]">
        <span>{{ currentAmount }}</span>
        <span class="text-[#94a3b8]">{{ goalAmount }}</span>
      </div>
      <div class="mt-2 h-2 rounded-full bg-[#e5e7eb]">
        <div
          class="h-full rounded-full bg-[#2563eb]"
          :style="{ width: `${progressPercent}%` }"
        />
      </div>
      <div class="mt-2 text-xs text-[#94a3b8]">
        {{ fundingText }}
      </div>
    </td>
    <td class="border-b border-[#d9e3f0] bg-white px-5 py-4 align-top">
      <span
        class="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold"
        :style="{
          color: statusColor,
          borderColor: statusColor,
          backgroundColor: statusBg,
        }"
      >
        {{ status }}
      </span>
    </td>
    <td class="border-b border-[#d9e3f0] bg-white px-5 py-4 align-top">
      <span class="font-semibold" :style="{ color: verifiedColor }">
        {{ verified }}
      </span>
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
              v-for="action in actions"
              :key="action.label"
              type="button"
              class="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition hover:bg-[#f8fafc]"
              :style="{ color: action.textColor }"
              @click="handleActionClick(action)"
            >
              <component :is="action.icon" class="h-4 w-4" />
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
import type { Component, ComponentPublicInstance } from 'vue';

import IconHorizontalDots from '@/components/icon/icon-horizontal-dots.vue';

type ActionConfig = {
  label: string;
  icon: Component;
  textColor: string;
  bgColor: string;
  borderColor?: string;
  type?: string;
};

const props = defineProps<{
  campaign: string;
  campaignSubtitle: string;
  owner: string;
  ownerSubtitle: string;
  currentAmount: string;
  goalAmount: string;
  fundingText: string;
  progress: number;
  status: string;
  statusColor: string;
  statusBg: string;
  verified: string;
  verifiedColor: string;
  created: string;
  actions: ActionConfig[];
  modal: Record<string, unknown>;
  confirmAction?: {
    title: string;
    message: string;
    confirmLabel: string;
  };
  declineAction?: {
    title: string;
    message: string;
    confirmLabel: string;
    placeholder: string;
  };
  suspendAction?: {
    title: string;
    message: string;
    confirmLabel: string;
  };
  activateAction?: {
    title: string;
    message: string;
    confirmLabel: string;
  };
}>();

const emit = defineEmits(['action']);

const clamp = (value: number) => Math.min(1, Math.max(0, value));

const progressPercent = computed(() => Math.round(clamp(props.progress) * 100));

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

watch(isDropdownOpen, (isOpen) => {
  if (isOpen) {
    nextTick(() => {
      updateDropdownPosition();
    });
  }
});

const closeDropdown = () => {
  isDropdownOpen.value = false;
};

const handleActionClick = (action: ActionConfig) => {
  emit('action', { action, row: props });
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

