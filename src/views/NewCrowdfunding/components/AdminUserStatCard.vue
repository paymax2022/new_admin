<template>
  <div class="rounded-2xl bg-white p-4 shadow-[0_15px_30px_rgba(15,23,42,0.05)]">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">{{ title }}</p>
        <p class="mt-2 text-2xl font-semibold text-[#111827]">{{ value }}</p>
        <p class="mt-1 text-[11px] font-semibold uppercase tracking-wide text-[#64748b]">{{ caption }}</p>
      </div>
      <div
        class="flex h-10 w-10 items-center justify-center rounded-full"
        :style="{ backgroundColor: accentBg, color: accentColor }"
      >
        <component :is="icon" class="h-5 w-5" />
      </div>
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

