<template>
  <button :class="[baseColor, 'rounded-lg p-6 w-full flex flex-col items-center justify-center shadow hover:opacity-90 transition min-h-[130px]']">
    <span class="flex items-center justify-center w-12 h-12 rounded-full mb-3 bg-white/20">
      <component :is="iconComponent" class="w-7 h-7 text-white" />
    </span>
    <span class="font-semibold text-white text-base">{{ title }}</span>
    <span class="text-xs text-white/80">{{ subtitle }}</span>
  </button>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';
import * as HeroIcons from '@heroicons/vue/24/outline';

const props = defineProps({
  color: {
    type: String,
    default: 'gray',
  },
  title: String,
  subtitle: String,
  icon: String, // Should be a Heroicon name, e.g. 'UserPlusIcon'
});

const colorMap: Record<string, string> = {
  blue: 'bg-blue-600',
  green: 'bg-green-600',
  purple: 'bg-purple-600',
  orange: 'bg-orange-500',
  gray: 'bg-gray-500',
};
const baseColor = computed(() => colorMap[props.color as keyof typeof colorMap] || colorMap.gray);

const iconComponent = computed(() => {
  if (!props.icon) return null;
  return HeroIcons[props.icon as keyof typeof HeroIcons];
});
</script> 