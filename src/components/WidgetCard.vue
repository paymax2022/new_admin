<template>
  <div class="rounded-xl border bg-white dark:bg-gray-900 p-5 shadow flex flex-col gap-2 min-h-[120px]">
    <div class="flex items-center gap-2 mb-1">
      <span class="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 mr-2">
        <component :is="iconComponent" class="w-5 h-5" :class="iconColor" />
      </span>
      <span class="font-medium text-gray-700 dark:text-gray-200">{{ title }}</span>
    </div>
    <div class="flex items-end gap-2">
      <span class="text-2xl font-bold">{{ value }}</span>
      <span v-if="trend === 'up'" class="ml-2 px-2 py-0.5 rounded-full bg-green-50 text-green-600 text-xs font-semibold">Trending up</span>
    </div>
    <div class="text-xs text-gray-400">{{ subtitle }}</div>
    <div class="text-xs text-gray-500">{{ subvalue }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';
import * as HeroIcons from '@heroicons/vue/24/outline';
const props = defineProps({
  title: String,
  value: String,
  subtitle: String,
  subvalue: String,
  icon: String,
  iconColor: String,
  trend: String,
});
const iconComponent = computed(() => {
  if (!props.icon) return null;
  return HeroIcons[props.icon];
});
</script> 