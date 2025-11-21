<template>
  <button
    class="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium tracking-wide transition hover:opacity-90"
    :class="{ 'border': Boolean(borderColor) }"
    :style="{
      color: textColor,
      backgroundColor: bgColor,
      borderColor: borderColor || 'transparent',
    }"
    type="button"
    @click="emit('click')"
  >
    <component :is="icon" class="h-4 w-4" />
    {{ label }}
  </button>
</template>

<script lang="ts" setup>
import type { Component } from 'vue';

const props = defineProps<{
  icon: Component;
  label: string;
  textColor: string;
  bgColor: string;
  borderColor?: string;
}>();

const emit = defineEmits(['click']);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { icon, label, textColor, bgColor, borderColor } = props;
</script>

