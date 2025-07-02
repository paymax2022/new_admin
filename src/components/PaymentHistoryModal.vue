<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
    <div class="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-3xl p-0 relative">
      <!-- Close Button -->
      <button class="absolute top-4 right-4 text-gray-400 hover:text-black dark:hover:text-white text-2xl" @click="$emit('close')">&times;</button>
      <div class="px-8 pt-8 pb-4">
        <h2 class="font-semibold text-lg mb-4">Payment History - {{ member?.name }}</h2>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div class="rounded-lg bg-blue-50 p-4 text-center">
            <div class="text-xs text-blue-700 mb-1">Total Payments</div>
            <div class="text-2xl font-bold text-blue-700">4</div>
          </div>
          <div class="rounded-lg bg-green-50 p-4 text-center">
            <div class="text-xs text-green-700 mb-1">Total Paid</div>
            <div class="text-2xl font-bold text-green-700">$267.00</div>
          </div>
          <div class="rounded-lg bg-red-50 p-4 text-center">
            <div class="text-xs text-red-700 mb-1">Failed Payments</div>
            <div class="text-2xl font-bold text-red-700">1</div>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="text-left text-gray-500 border-b">
                <th class="py-2 px-4">Date</th>
                <th class="py-2 px-4">Description</th>
                <th class="py-2 px-4">Amount</th>
                <th class="py-2 px-4">Method</th>
                <th class="py-2 px-4">Status</th>
                <th class="py-2 px-4">Invoice</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(p, i) in payments" :key="i" class="border-b last:border-0">
                <td class="py-2 px-4">{{ p.date }}</td>
                <td class="py-2 px-4">{{ p.desc }}</td>
                <td class="py-2 px-4">${{ p.amount }}</td>
                <td class="py-2 px-4">{{ p.method }}</td>
                <td class="py-2 px-4">
                  <span :class="p.status === 'Paid' ? 'text-green-600' : 'text-red-600'">{{ p.status }}</span>
                </td>
                <td class="py-2 px-4">
                  <button class="flex items-center gap-1 border rounded px-2 py-1 text-xs font-medium hover:bg-gray-100">
                    <ArrowDownTrayIcon class="w-4 h-4" />
                    {{ p.invoice }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="flex gap-2 mt-6">
          <button class="flex-1 border rounded px-4 py-2 font-medium" @click="$emit('close')">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowDownTrayIcon } from '@heroicons/vue/24/outline';
const props = defineProps({
  member: { type: Object, required: true }
});
const payments = [
  { date: '2024-03-01', desc: 'Premium Membership - March 2024', amount: 89, method: 'Credit Card', status: 'Paid', invoice: 'INV-2024-001' },
  { date: '2024-03-01', desc: 'Premium Membership - February 2024', amount: 89, method: 'Credit Card', status: 'Failed', invoice: 'INV-2024-002' },
  { date: '2024-03-01', desc: 'Premium Membership - January 2024', amount: 89, method: 'Credit Card', status: 'Paid', invoice: 'INV-2024-003' },
  { date: '2024-03-01', desc: 'Premium Membership - December 2023', amount: 89, method: 'Credit Card', status: 'Paid', invoice: 'INV-2024-004' },
];
</script> 