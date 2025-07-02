<template>
  <button class="rounded-xl border border-dashed bg-white dark:bg-gray-900 p-6 w-full flex flex-col items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition min-h-[100px]">
    <span class="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 mb-2">
      <component :is="iconComponent" class="w-7 h-7 text-gray-400" />
    </span>
    <span class="font-medium text-gray-700 dark:text-gray-200 text-sm">{{ label }}</span>
  </button>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';
import * as HeroIcons from '@heroicons/vue/24/outline';
const props = defineProps({
  icon: String,
  label: String,
});
const iconComponent = computed(() => {
  if (!props.icon) return null;
  return HeroIcons[props.icon];
});
</script> 