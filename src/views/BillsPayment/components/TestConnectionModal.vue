<template>
  <Transition name="fade">
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-[#0f172a]/40 px-4 py-10 backdrop-blur-sm">
      <div class="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl space-y-6">
        <div class="flex items-start justify-between">
          <div class="flex items-center gap-3">
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e0f2fe]">
              <IconRouter class="h-5 w-5 text-[#0284c7]" />
            </div>
            <h3 class="text-2xl font-semibold text-[#111827]">Test Connection</h3>
          </div>
          <button
            type="button"
            class="rounded-full bg-[#f1f5f9] p-2 text-[#111827] transition hover:bg-[#e2e8f0]"
            @click="$emit('close')"
          >
            <IconX class="h-4 w-4" />
          </button>
        </div>

        <p class="text-sm text-[#475569]">Testing connection to {{ provider.provider }} services</p>

        <div class="flex flex-wrap items-center gap-2">
          <button
            type="button"
            class="rounded-full border border-[#e2e8f0] bg-white px-4 py-2 text-sm font-semibold text-[#111827]"
          >
            {{ provider.service }}
          </button>
          <button
            type="button"
            class="rounded-full bg-[#dcfce7] px-4 py-2 text-sm font-semibold text-[#16a34a]"
          >
            Active
          </button>
        </div>

        <div class="space-y-4">
          <div
            v-for="check in connectionChecks"
            :key="check.label"
            class="flex items-center justify-between rounded-2xl border border-[#f1f5f9] p-4"
          >
            <div class="flex items-center gap-3">
              <div
                class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                :style="{ backgroundColor: check.iconBg, color: check.iconColor }"
              >
                <component :is="check.icon" class="h-4 w-4" />
              </div>
              <div>
                <p class="text-sm font-semibold text-[#111827]">{{ check.label }}</p>
                <p class="text-xs" :class="check.statusColor">{{ check.status }}</p>
              </div>
            </div>
            <div v-if="check.value" class="flex items-center gap-2 text-sm">
              <IconInfoCircle class="h-4 w-4 text-[#94a3b8]" />
              <span class="text-[#94a3b8]">{{ check.value }}</span>
              <span :class="check.valueColor">{{ check.value }}</span>
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
            class="inline-flex items-center gap-2 rounded-full bg-[#7c3aed] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#6d28d9]"
            @click="$emit('runTest')"
          >
            <IconBolt class="h-4 w-4" />
            Run Test
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';
import IconX from '@/components/icon/icon-x.vue';
import IconRouter from '@/components/icon/icon-router.vue';
import IconXCircle from '@/components/icon/icon-x-circle.vue';
import IconCircleCheck from '@/components/icon/icon-circle-check.vue';
import IconInfoCircle from '@/components/icon/icon-info-circle.vue';
import IconBolt from '@/components/icon/icon-bolt.vue';
import IconClock from '@/components/icon/icon-clock.vue';

defineProps<{
  provider: {
    provider: string;
    service: string;
  };
}>();

defineEmits<{ (e: 'close'): void; (e: 'runTest'): void }>();

const connectionChecks = [
  {
    label: 'API Endpoint',
    status: 'Connection failed',
    statusColor: 'text-[#dc2626]',
    icon: IconXCircle,
    iconBg: '#fee2e2',
    iconColor: '#dc2626',
    value: null,
    valueColor: '',
  },
  {
    label: 'Authentication',
    status: 'Connected Successfully',
    statusColor: 'text-[#16a34a]',
    icon: IconCircleCheck,
    iconBg: '#dcfce7',
    iconColor: '#16a34a',
    value: null,
    valueColor: '',
  },
  {
    label: 'Service Availability',
    status: 'Connected Successfully',
    statusColor: 'text-[#16a34a]',
    icon: IconCircleCheck,
    iconBg: '#dcfce7',
    iconColor: '#16a34a',
    value: null,
    valueColor: '',
  },
  {
    label: 'Response Time',
    status: '',
    statusColor: '',
    icon: IconClock,
    iconBg: '#dcfce7',
    iconColor: '#16a34a',
    value: '426ms',
    valueColor: 'text-[#16a34a] font-semibold',
  },
];
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

