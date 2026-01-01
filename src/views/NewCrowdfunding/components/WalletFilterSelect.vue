<template>
  <div class="relative">
    <select
      class="appearance-none rounded-full border border-[#e2e8f0] bg-white px-4 py-2 pr-10 text-sm font-semibold text-[#475569] transition hover:border-[#cbd5f5] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
    >
      <option selected>{{ label }}</option>
    </select>
    <IconCaretsDown class="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94a3b8]" />
  </div>
</template>

<script lang="ts" setup>
import IconCaretsDown from '@/components/icon/icon-carets-down.vue';

defineProps<{
  label: string;
}>();
</script>


