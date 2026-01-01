<template>
  <transition name="fade">
    <div class="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
      <div class="absolute inset-0 bg-[#0f172a]/40 backdrop-blur-sm" @click="$emit('close')" />
      <div class="relative z-10 w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-[0_40px_80px_rgba(15,23,42,0.18)]">
        <header class="flex items-center justify-between border-b border-[#e2e8f0] px-8 py-6">
          <div>
            <h2 class="text-xl font-semibold text-[#111827]">User Details</h2>
            <p class="text-sm text-[#6b7280]">Complete information about the selected user</p>
          </div>
          <button
            type="button"
            class="flex h-9 w-9 items-center justify-center rounded-full bg-[#f1f5f9] text-[#475569] transition hover:opacity-80"
            @click="$emit('close')"
          >
            <IconX class="h-5 w-5" />
          </button>
        </header>

        <section class="grid gap-x-10 gap-y-6 px-8 py-6 sm:grid-cols-2">
          <div class="space-y-1">
            <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Full Name</p>
            <p class="text-sm font-semibold text-[#111827]">{{ user.name }}</p>
          </div>
          <div class="space-y-1">
            <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">User ID</p>
            <p class="text-sm font-semibold text-[#111827]">{{ user.userId }}</p>
          </div>
          <div class="space-y-1">
            <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Email Address</p>
            <p class="text-sm text-[#475569]">{{ user.email }}</p>
          </div>
          <div class="space-y-1">
            <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Status</p>
            <span
              class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold capitalize"
              :class="statusClasses[user.status]"
            >
              {{ user.status }}
            </span>
          </div>
          <div class="space-y-2">
            <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">KYC Status</p>
            <span class="inline-flex items-center rounded-full bg-[#ecfdf5] px-3 py-1 text-xs font-semibold text-[#16a34a]">
              Verified
            </span>
          </div>
          <div class="space-y-1">
            <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Join Date</p>
            <p class="text-sm text-[#475569]">{{ user.joined }}</p>
          </div>
        </section>

        <section class="space-y-4 px-8 pb-8">
          <h3 class="text-sm font-semibold text-[#111827]">Accounts & Balances</h3>
          <div class="space-y-3">
            <div
              v-for="balance in user.balances"
              :key="balance.currency"
              class="flex items-center gap-3 rounded-2xl border border-[#e2e8f0] px-4 py-3"
            >
              <img :src="balance.flag" :alt="`${balance.currency} flag`" class="h-6 w-6 rounded-full object-cover" />
              <div class="text-sm text-[#475569]">
                <p class="font-semibold text-[#111827]">{{ balance.amount }}</p>
                <p class="text-xs text-[#94a3b8] uppercase">{{ balance.currency }}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import IconX from '@/components/icon/icon-x.vue';

const statusClasses: Record<string, string> = {
  Active: 'bg-[#ecfdf5] text-[#16a34a]',
  Suspended: 'bg-[#fef2f2] text-[#ef4444]',
  Inactive: 'bg-[#f8fafc] text-[#64748b]',
};

defineProps<{
  user: {
    name: string;
    email: string;
    joined: string;
    userId: string;
    status: 'Active' | 'Suspended' | 'Inactive';
    kyc: 'verified' | 'pending';
    balances: { currency: string; amount: string; flag: string }[];
  };
}>();

defineEmits(['close']);
</script>

