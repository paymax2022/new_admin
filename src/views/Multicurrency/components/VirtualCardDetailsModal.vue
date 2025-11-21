<template>
  <transition name="fade">
    <div class="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
      <div class="absolute inset-0 bg-[#0f172a]/30 backdrop-blur-sm" @click="$emit('close')" />
      <div class="relative z-10 w-full max-w-md rounded-3xl bg-white shadow-[0_40px_80px_rgba(15,23,42,0.18)]">
        <header class="flex items-center justify-between border-b border-[#f1f5f9] px-8 py-6">
          <div>
            <h2 class="text-xl font-semibold text-[#111827]">Card Details</h2>
            <p class="text-sm text-[#6b7280]">Detailed information about the virtual card</p>
          </div>
          <button
            type="button"
            class="flex h-9 w-9 items-center justify-center rounded-full bg-[#f1f5f9] text-[#475569] transition hover:opacity-80"
            @click="$emit('close')"
          >
            <IconX class="h-5 w-5" />
          </button>
        </header>

        <section class="grid gap-6 px-8 py-6 text-sm text-[#475569] sm:grid-cols-2">
          <div class="space-y-1">
            <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Card Number</p>
            <p class="font-semibold text-[#111827]">{{ card.masked }}</p>
          </div>
          <div class="space-y-1">
            <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Created</p>
            <p class="text-[#111827]">{{ card.created }}</p>
          </div>
          <div class="space-y-1">
            <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Cardholder</p>
            <p class="text-[#111827]">{{ card.user }}</p>
          </div>
          <div class="space-y-1">
            <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Fees Collected</p>
            <p class="text-[#111827]">{{ card.fees }}</p>
          </div>
          <div class="space-y-1">
            <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Balance</p>
            <p class="font-semibold text-[#111827]">{{ card.balance }}</p>
          </div>
          <div class="space-y-1">
            <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Status</p>
            <span
              class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold capitalize"
              :class="statusClasses[card.status]"
            >
              {{ card.status }}
            </span>
          </div>
        </section>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import IconX from '@/components/icon/icon-x.vue';

const statusClasses: Record<'active' | 'suspended' | 'frozen', string> = {
  active: 'bg-[#ecfdf5] text-[#16a34a]',
  suspended: 'bg-[#fef2f2] text-[#ef4444]',
  frozen: 'bg-[#f8fafc] text-[#64748b]',
};

defineProps<{
  card: {
    id: string;
    user: string;
    masked: string;
    balance: string;
    status: 'active' | 'suspended' | 'frozen';
    created: string;
    fees: string;
  };
}>();

defineEmits(['close']);
</script>


