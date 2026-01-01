<template>
  <div class="min-h-screen bg-[#f7f9fc] p-6 space-y-8">
    <header class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div class="space-y-1">
        <h1 class="text-2xl font-semibold text-[#111827]">System Settings</h1>
        <p class="text-sm text-[#6b7280]">Configure platform parameters and limits</p>
      </div>
    </header>

    <section class="grid gap-6 lg:grid-cols-2">
      <div class="space-y-6">
        <div class="rounded-3xl border border-[#e2e8f0] bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.05)]">
          <h2 class="text-lg font-semibold text-[#111827]">Exchange Rates</h2>
          <p class="mt-1 text-sm text-[#6b7280]">Manage currency conversion rates</p>
          <div class="mt-4 space-y-4">
            <div v-for="rate in exchangeRates" :key="rate.label" class="space-y-2">
              <label class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">{{ rate.label }}</label>
              <input
                type="text"
                :placeholder="rate.placeholder"
                class="w-full rounded-2xl border border-[#e2e8f0] px-4 py-3 text-sm text-[#111827] focus:border-[#111827] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
              />
            </div>
            <button
              type="button"
              class="w-full rounded-full border border-[#111827] bg-[#111827] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0b1220]"
            >
              Update Rate
            </button>
          </div>
        </div>

        <div class="rounded-3xl border border-[#e2e8f0] bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.05)]">
          <h2 class="text-lg font-semibold text-[#111827]">Virtual Card Fees</h2>
          <p class="mt-1 text-sm text-[#6b7280]">Configure card issuance and funding fees</p>
          <div class="mt-4 space-y-4">
            <div v-for="fee in virtualCardFees" :key="fee.label" class="space-y-2">
              <label class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">{{ fee.label }}</label>
              <input
                type="number"
                :placeholder="fee.placeholder"
                class="w-full rounded-2xl border border-[#e2e8f0] px-4 py-3 text-sm text-[#111827] focus:border-[#111827] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
              />
            </div>
            <button
              type="button"
              class="w-full rounded-full border border-[#111827] bg-[#111827] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0b1220]"
            >
              Update Fees
            </button>
          </div>
        </div>
      </div>

      <div class="space-y-6">
        <div class="rounded-3xl border border-[#e2e8f0] bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.05)]">
          <h2 class="text-lg font-semibold text-[#111827]">Transaction Limits</h2>
          <p class="mt-1 text-sm text-[#6b7280]">Set maximum transaction amounts</p>
          <div class="mt-4 space-y-4">
            <div v-for="limit in transactionLimits" :key="limit.label" class="space-y-2">
              <label class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">{{ limit.label }}</label>
              <input
                type="number"
                :placeholder="limit.placeholder"
                class="w-full rounded-2xl border border-[#e2e8f0] px-4 py-3 text-sm text-[#111827] focus:border-[#111827] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
              />
            </div>
            <button
              type="button"
              class="w-full rounded-full border border-[#111827] bg-[#111827] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0b1220]"
            >
              Update Limits
            </button>
          </div>
        </div>

        <div class="rounded-3xl border border-[#e2e8f0] bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.05)]">
          <h2 class="text-lg font-semibold text-[#111827]">Transfer Fees</h2>
          <p class="mt-1 text-sm text-[#6b7280]">Set transfer and conversion fees</p>
          <div class="mt-4 space-y-4">
            <div v-for="fee in transferFees" :key="fee.label" class="space-y-2">
              <label class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">{{ fee.label }}</label>
              <input
                type="number"
                :placeholder="fee.placeholder"
                class="w-full rounded-2xl border border-[#e2e8f0] px-4 py-3 text-sm text-[#111827] focus:border-[#111827] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
              />
            </div>
            <button
              type="button"
              class="w-full rounded-full border border-[#111827] bg-[#111827] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0b1220]"
            >
              Update Fees
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="rounded-3xl border border-[#e2e8f0] bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.05)]">
      <h2 class="text-lg font-semibold text-[#111827]">System Notifications</h2>
      <p class="mt-1 text-sm text-[#6b7280]">Manage app-wide notifications and maintenance messages</p>
      <div class="mt-4 space-y-4">
        <div class="space-y-2">
          <label class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Notification Title</label>
          <input
            type="text"
            placeholder="Enter notification title"
            class="w-full rounded-2xl border border-[#e2e8f0] px-4 py-3 text-sm text-[#111827] focus:border-[#111827] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
          />
        </div>
        <div class="space-y-2">
          <label class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Message</label>
          <textarea
            rows="5"
            placeholder="Enter notification message..."
            class="w-full rounded-2xl border border-[#e2e8f0] px-4 py-3 text-sm text-[#111827] focus:border-[#111827] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
          />
        </div>
        <button
          type="button"
          class="w-full rounded-full border border-[#111827] bg-[#111827] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0b1220]"
        >
          Send Notification
        </button>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import IconBellBing from '@/components/icon/icon-bell-bing.vue';
import IconMessageDots from '@/components/icon/icon-message-dots.vue';
import IconUserCircle from '@/components/icon/icon-user-circle.vue';

const exchangeRates = [
  { label: 'USD to EUR', placeholder: 'USD to EUR' },
  { label: 'USD to GBP', placeholder: 'USD to GBP' },
  { label: 'USD to NGN', placeholder: 'USD to NGN' },
];

const transactionLimits = [
  { label: 'Daily Send Limit (USD)', placeholder: '$0.00' },
  { label: 'Daily Withdrawal Limit (USD)', placeholder: '$0.00' },
  { label: 'Single Transaction Limit (USD)', placeholder: '$0.00' },
];

const virtualCardFees = [
  { label: 'Card Issue Fee (USD)', placeholder: '$0.00' },
  { label: 'Card Funding Fee (USD)', placeholder: '$0.00' },
];

const transferFees = [
  { label: 'Local Transfer Fee (%)', placeholder: '0.00' },
  { label: 'Currency Conversion Fee (%)', placeholder: '0.00' },
];
</script>

