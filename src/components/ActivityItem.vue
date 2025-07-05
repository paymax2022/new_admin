<template>
  <div class="flex items-center gap-4 bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border">
    <span class="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800" :class="iconColor">
      <component :is="iconComponent" class="w-5 h-5" />
    </span>
    <div class="flex-1 min-w-0">
      <div class="flex items-center gap-2">
        <span class="font-medium text-gray-900 dark:text-gray-100">{{ title }}</span>
        <span v-if="badge" :class="['text-xs rounded px-2 py-0.5 font-semibold', badgeClass]">{{ badge }}</span>
      </div>
      <div class="text-xs text-gray-500 truncate">{{ desc }}</div>
    </div>
    <span class="text-xs text-gray-400 whitespace-nowrap">{{ time }}</span>
    <slot name="actions" />
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';
import * as HeroIcons from '@heroicons/vue/24/outline';

const props = defineProps({
  icon: String, // Heroicon name
  iconColor: String,
  title: String,
  desc: String,
  badge: String,
  badgeType: String, // 'success', 'info', 'warning', etc.
  time: String,
});

const iconComponent = computed(() => {
  if (!props.icon) return null;
  return HeroIcons[props.icon];
});

const badgeClass = computed(() => {
  switch (props.badgeType) {
    case 'success': return 'bg-green-100 text-green-700';
    case 'info': return 'bg-gray-100 text-gray-700';
    case 'warning': return 'bg-red-100 text-red-700';
    default: return 'bg-gray-100 text-gray-700';
  }
});
</script> 