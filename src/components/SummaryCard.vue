<template>
  <div class="rounded-lg border bg-white dark:bg-gray-900 p-4 shadow flex flex-col gap-1 min-h-[110px]">
    <div class="flex items-center gap-2 mb-1">
      <span v-if="iconComponent" :class="['flex items-center justify-center w-9 h-9 rounded-full mr-2', iconBg]">
        <component :is="iconComponent" class="w-5 h-5" :class="iconColor" />
      </span>
      <span class="font-medium text-gray-700 dark:text-gray-200">{{ title }}</span>
    </div>
    <div class="flex items-end gap-2">
      <span class="text-2xl font-bold" :class="valueColor">{{ value }}</span>
      <span class="text-xs" :class="changeColor">{{ change }}</span>
    </div>
    <div class="text-xs text-gray-400">{{ subtext }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';
import * as HeroIcons from '@heroicons/vue/24/outline';

const props = defineProps({
  title: String,
  value: String,
  change: String,
  subtext: String,
  icon: String, // Should be a Heroicon name, e.g. 'UserIcon'
  positive: Boolean,
  negative: Boolean,
  iconBg: String, // Optional: bg color class
  iconColor: String, // Optional: icon color class
});

const iconComponent = computed(() => {
  if (!props.icon) return null;
  return HeroIcons[props.icon];
});

const valueColor = computed(() =>
  props.negative ? 'text-red-600' : props.positive ? 'text-green-600' : ''
);
const changeColor = computed(() =>
  props.negative ? 'text-red-500' : props.positive ? 'text-green-500' : 'text-gray-400'
);
</script> 