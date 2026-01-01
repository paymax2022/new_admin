<template>
  <div class="rounded-3xl bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.05)]">
    <div class="flex items-start justify-between">
      <div>
        <p class="text-sm font-medium uppercase tracking-wide text-[#94a3b8]">{{ title }}</p>
        <h3 class="mt-3 text-3xl font-semibold text-[#1a202c]" v-html="value" />
        <p class="mt-2 text-sm font-medium" :style="{ color: captionColor }">{{ caption }}</p>
      </div>
      <div
        class="flex h-12 w-12 items-center justify-center rounded-full"
        :style="{ backgroundColor: accentBg, color: accentColor }"
      >
        <component :is="icon" class="h-6 w-6" />
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
  captionColor: string;
}>();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { title, value, caption, icon, accentColor, accentBg, captionColor } = props;
</script>


