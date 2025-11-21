<template>
  <div class="flex items-center justify-between rounded-2xl border border-[#e2e8f0] px-4 py-3">
    <div>
      <p class="text-sm font-semibold text-[#111827]">{{ label }}</p>
      <p class="text-xs text-[#94a3b8]">{{ description }}</p>
    </div>
    <span
      class="inline-flex h-6 w-11 items-center rounded-full border border-transparent px-0.5 transition-colors duration-200"
      :class="enabled ? 'bg-[#2563eb]' : 'bg-[#e2e8f0]'"
    >
      <span
        class="h-5 w-5 rounded-full bg-white shadow transform transition-transform duration-200"
        :class="enabled ? 'translate-x-5' : 'translate-x-0'"
      />
    </span>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  label: string;
  description: string;
  enabled?: boolean;
}>();
</script>


