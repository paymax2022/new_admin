<template>
  <div class="flex items-center justify-between rounded-3xl bg-white p-5 shadow-[0_20px_40px_rgba(15,23,42,0.05)]">
    <div>
      <p class="text-sm font-semibold uppercase tracking-wide text-[#94a3b8]">{{ title }}</p>
      <p class="mt-3 text-3xl font-semibold text-[#111827]">{{ value }}</p>
      <p class="mt-2 text-xs font-semibold uppercase tracking-wide text-[#16a34a]">{{ caption }}</p>
    </div>
    <div
      class="flex h-12 w-12 items-center justify-center rounded-full"
      :style="{ backgroundColor: accentBg, color: accentColor }"
    >
      <component :is="icon" class="h-6 w-6" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Component } from 'vue';

const props = defineProps<{
  title: string;
  value: string;
  caption: string;
  icon: Component;
  accentColor: string;
  accentBg: string;
}>();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { title, value, caption, icon, accentColor, accentBg } = props;
</script>


