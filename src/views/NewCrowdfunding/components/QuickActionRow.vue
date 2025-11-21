<template>
  <div class="flex items-center justify-between rounded-2xl border border-[#e2e8f0] p-4 transition hover:border-[#cbd5f5]">
    <div class="flex items-start gap-4">
      <div
        class="flex h-12 w-12 items-center justify-center rounded-2xl"
        :style="{ backgroundColor: accentBg, color: accentColor }"
      >
        <component :is="icon" class="h-6 w-6" />
      </div>
      <div>
        <p class="text-base font-semibold text-[#1a202c]" v-html="title" />
        <p class="text-sm text-[#94a3b8]" v-html="subtitle" />
      </div>
    </div>
    <button
      class="rounded-full px-4 py-2 text-sm font-semibold transition"
      :style="{
        backgroundColor: buttonBg,
        color: buttonColor,
      }"
    >
      {{ buttonLabel }}
    </button>
  </div>
</template>

<script lang="ts" setup>
import type { Component } from 'vue';

const props = defineProps<{
  title: string;
  subtitle: string;
  icon: Component;
  accentBg: string;
  accentColor: string;
  buttonLabel: string;
  buttonBg: string;
  buttonColor: string;
}>();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { title, subtitle, icon, accentBg, accentColor, buttonLabel, buttonBg, buttonColor } = props;
</script>


