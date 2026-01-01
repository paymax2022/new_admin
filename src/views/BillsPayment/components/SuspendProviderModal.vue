<template>
  <Transition name="fade">
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-[#0f172a]/40 px-4 py-10 backdrop-blur-sm">
      <div class="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl space-y-6">
        <div class="flex items-start justify-between">
          <div class="flex items-center gap-3">
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#fef3c7]">
              <IconInfoTriangle class="h-5 w-5 text-[#f59e0b]" />
            </div>
            <h3 class="text-2xl font-semibold text-[#111827]">Suspend Provider</h3>
          </div>
          <button
            type="button"
            class="rounded-full bg-[#f1f5f9] p-2 text-[#111827] transition hover:bg-[#e2e8f0]"
            @click="$emit('close')"
          >
            <IconX class="h-4 w-4" />
          </button>
        </div>

        <div class="space-y-4">
          <p class="text-sm text-[#475569]">Are you sure you want to suspend {{ provider.provider }}?</p>

          <div class="rounded-2xl border border-[#f1f5f9] bg-white p-4">
            <p class="text-lg font-semibold text-[#111827]">{{ provider.provider }}</p>
            <div class="mt-3 flex flex-wrap gap-4 text-sm text-[#6b7280]">
              <div class="flex items-center gap-2">
                <IconBarChart class="h-4 w-4" />
                <span>Success: {{ provider.successRate }}</span>
              </div>
              <div class="flex items-center gap-2">
                <IconClock class="h-4 w-4" />
                <span>Uptime: {{ provider.uptime }}</span>
              </div>
            </div>
          </div>

          <div class="rounded-2xl border border-[#fed7aa] bg-[#fff7ed] p-4">
            <div class="flex items-start gap-3">
              <IconInfoTriangle class="h-5 w-5 shrink-0 text-[#f59e0b]" />
              <p class="text-sm text-[#9a3412]">
                Warning: Suspending this provider will stop all transactions and may affect service availability for users.
              </p>
            </div>
          </div>
        </div>

        <div class="flex justify-end gap-3">
          <button
            type="button"
            class="rounded-full border border-[#e2e8f0] px-4 py-2 text-sm font-semibold text-[#6b7280]"
            @click="$emit('close')"
          >
            Cancel
          </button>
          <button
            type="button"
            class="rounded-full bg-[#dc2626] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#b91c1c]"
            @click="$emit('suspend')"
          >
            Suspend Provider
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';
import IconX from '@/components/icon/icon-x.vue';
import IconInfoTriangle from '@/components/icon/icon-info-triangle.vue';
import IconBarChart from '@/components/icon/icon-bar-chart.vue';
import IconClock from '@/components/icon/icon-clock.vue';

defineProps<{
  provider: {
    provider: string;
    successRate: string;
    uptime: string;
  };
}>();

defineEmits<{ (e: 'close'): void; (e: 'suspend'): void }>();
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

