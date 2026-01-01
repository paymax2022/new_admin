<template>
  <Transition name="fade">
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-[#0f172a]/40 px-4 py-10 backdrop-blur-sm">
      <div class="w-full max-w-4xl rounded-3xl bg-white p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        <div class="flex items-start justify-between">
          <h3 class="text-2xl font-semibold text-[#111827]">Provider Logs - {{ provider.provider }}</h3>
          <button
            type="button"
            class="rounded-full bg-[#f1f5f9] p-2 text-[#111827] transition hover:bg-[#e2e8f0]"
            @click="$emit('close')"
          >
            <IconX class="h-4 w-4" />
          </button>
        </div>

        <div class="flex flex-col gap-4 lg:flex-row lg:items-center">
          <div class="flex-1 rounded-full border border-[#e2e8f0] bg-[#f8fafc] px-4 py-2 text-sm text-[#6b7280] flex items-center gap-2">
            <IconSearch class="h-4 w-4 text-[#94a3b8]" />
            <span>Search messages, transaction IDs...</span>
          </div>
          <div class="flex flex-wrap gap-3">
            <button
              type="button"
              class="inline-flex items-center gap-2 rounded-full border border-[#e2e8f0] bg-white px-4 py-2 text-sm font-semibold text-[#6b7280]"
            >
              All Levels
              <IconCaretDown class="h-4 w-4" />
            </button>
            <button
              type="button"
              class="rounded-full border border-[#e2e8f0] bg-white p-2 text-[#6b7280] transition hover:bg-[#f8fafc]"
            >
              <IconRefresh class="h-4 w-4" />
            </button>
            <button
              type="button"
              class="rounded-full border border-[#e2e8f0] bg-white p-2 text-[#6b7280] transition hover:bg-[#f8fafc]"
            >
              <IconDownload class="h-4 w-4" />
            </button>
          </div>
        </div>

        <section class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <article
            v-for="stat in logStats"
            :key="stat.label"
            class="rounded-2xl border border-[#f1f5f9] bg-white p-4"
          >
            <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">{{ stat.label }}</p>
            <p class="mt-2 text-2xl font-semibold text-[#111827]">{{ stat.value }}</p>
          </article>
        </section>

        <section class="space-y-4">
          <article
            v-for="log in logs"
            :key="log.id"
            class="rounded-2xl border border-[#f1f5f9] bg-white p-4"
          >
            <div class="flex items-start gap-4">
              <div
                class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                :style="{ backgroundColor: log.iconBg, color: log.iconColor }"
              >
                <component :is="log.icon" class="h-5 w-5" />
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex flex-wrap items-center justify-between gap-3">
                  <h4 class="text-sm font-semibold text-[#111827]">{{ log.title }}</h4>
                  <span
                    class="rounded-full px-3 py-1 text-xs font-semibold uppercase"
                    :style="{ backgroundColor: log.badgeBg, color: log.badgeColor }"
                  >
                    {{ log.status }}
                  </span>
                </div>
                <p class="mt-1 text-xs text-[#6b7280]">{{ log.details }}</p>
                <p class="mt-2 text-sm text-[#475569]">{{ log.description }}</p>
                <p v-if="log.transactionId" class="mt-2 text-xs font-semibold text-[#7c3aed]">
                  {{ log.transactionId }}
                </p>
              </div>
            </div>
          </article>
        </section>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';
import IconX from '@/components/icon/icon-x.vue';
import IconSearch from '@/components/icon/icon-search.vue';
import IconCaretDown from '@/components/icon/icon-caret-down.vue';
import IconRefresh from '@/components/icon/icon-refresh.vue';
import IconDownload from '@/components/icon/icon-download.vue';
import IconCircleCheck from '@/components/icon/icon-circle-check.vue';
import IconXCircle from '@/components/icon/icon-x-circle.vue';
import IconInfoTriangle from '@/components/icon/icon-info-triangle.vue';

defineProps<{
  provider: {
    provider: string;
  };
}>();

defineEmits<{ (e: 'close'): void }>();

const logStats = [
  { label: 'Total Logs', value: '8,946' },
  { label: 'Success', value: '2' },
  { label: 'Error', value: '1' },
  { label: 'Warning', value: '1' },
];

const logs = [
  {
    id: 1,
    title: 'Transaction processed successfully',
    details: '2024-01-15 14:30:25 • Response: 245ms',
    description: 'Airtime purchase of ₦1,000 for 08012345678',
    transactionId: 'TXN_001234567',
    status: 'Success',
    icon: IconCircleCheck,
    iconBg: '#dcfce7',
    iconColor: '#16a34a',
    badgeBg: '#dcfce7',
    badgeColor: '#16a34a',
  },
  {
    id: 2,
    title: 'API connection timeout',
    details: '2024-01-15 14:28:10 • Response: 30000ms',
    description: 'Failed to connect to provider API after 30 seconds',
    transactionId: 'TXN_001234567',
    status: 'Error',
    icon: IconXCircle,
    iconBg: '#fee2e2',
    iconColor: '#dc2626',
    badgeBg: '#fee2e2',
    badgeColor: '#dc2626',
  },
  {
    id: 3,
    title: 'Low balance warning',
    details: '2024-01-15 14:25:45 • Response: 120ms',
    description: '',
    transactionId: null,
    status: 'Warning',
    icon: IconInfoTriangle,
    iconBg: '#fef3c7',
    iconColor: '#f59e0b',
    badgeBg: '#f1f5f9',
    badgeColor: '#64748b',
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

