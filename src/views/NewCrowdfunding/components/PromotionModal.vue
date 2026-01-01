<template>
  <transition name="fade">
    <div class="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
      <div class="absolute inset-0 bg-[#0f172a]/40 backdrop-blur-sm" @click="$emit('close')" />
      <div class="relative z-10 flex w-full max-w-2xl max-h-[90vh] flex-col overflow-hidden rounded-3xl bg-white shadow-[0_40px_80px_rgba(15,23,42,0.18)]">
        <button
          type="button"
          class="absolute right-6 top-6 flex h-9 w-9 items-center justify-center rounded-full bg-[#f1f5f9] text-[#475569] transition hover:opacity-90"
          @click="$emit('close')"
        >
          <IconX class="h-5 w-5" />
        </button>

        <div class="flex-1 space-y-6 overflow-y-auto p-8">
          <div>
            <h2 class="text-2xl font-semibold text-[#111827]">Promotion Details - {{ promotion.id }}</h2>
            <p class="text-sm text-[#64748b]">Review campaign details and promotion request</p>
          </div>

          <div class="grid gap-6 sm:grid-cols-2">
            <div class="space-y-4">
              <div>
                <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Campaign</p>
                <p class="mt-2 text-sm font-semibold text-[#111827]">{{ promotion.detail.campaign }}</p>
              </div>
              <div>
                <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Category</p>
                <p class="mt-2 text-sm text-[#475569]">{{ promotion.detail.category }}</p>
              </div>
              <div>
                <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Budget</p>
                <p class="mt-2 text-sm text-[#475569]">{{ promotion.detail.budget }}</p>
              </div>
              <div>
                <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Current Raised</p>
                <p class="mt-2 text-sm font-semibold text-[#16a34a]">{{ promotion.detail.currentRaised }}</p>
              </div>
              <div>
                <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Requested Date</p>
                <p class="mt-2 text-sm text-[#475569]">{{ promotion.detail.requestedDate }}</p>
              </div>
              <div>
                <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Description</p>
                <p class="mt-2 text-sm text-[#475569]">{{ promotion.detail.description }}</p>
              </div>
            </div>

            <div class="space-y-4">
              <div>
                <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Owner</p>
                <p class="mt-2 text-sm text-[#475569]">{{ promotion.detail.owner }}</p>
              </div>
              <div>
                <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Email</p>
                <p class="mt-2 text-sm text-[#2563eb]">{{ promotion.detail.email }}</p>
              </div>
              <div>
                <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Payment Method</p>
                <p class="mt-2 text-sm text-[#475569]">{{ promotion.detail.paymentMethod }}</p>
              </div>
              <div>
                <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Goal</p>
                <p class="mt-2 text-sm text-[#475569]">{{ promotion.detail.goal }}</p>
              </div>
              <div>
                <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Progress</p>
                <p class="mt-2 text-sm text-[#475569]">{{ promotion.detail.progress }}</p>
              </div>
              <div class="flex items-center gap-3">
                <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Urgency</p>
                <span
                  class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide"
                  :style="{ color: promotion.detail.urgency.color, backgroundColor: promotion.detail.urgency.bg }"
                >
                  {{ promotion.detail.urgency.label }}
                </span>
              </div>
            </div>
          </div>

          <div class="grid gap-4 sm:grid-cols-2">
            <div>
              <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Duration</p>
              <p class="mt-2 text-sm text-[#475569]">{{ promotion.detail.duration }}</p>
            </div>
            <div>
              <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Timeline</p>
              <p class="mt-2 text-sm text-[#475569]">{{ promotion.detail.startDate }} - {{ promotion.detail.endDate }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import IconX from '@/components/icon/icon-x.vue';

defineProps<{
  promotion: Record<string, any>;
}>();

defineEmits(['close']);
</script>

