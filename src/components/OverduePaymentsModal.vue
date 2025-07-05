<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
    <div class="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-4xl p-0 relative">
      <!-- Success Alert -->
      <div v-if="showSuccess" class="absolute top-4 right-24 bg-green-50 border border-green-200 text-green-800 rounded px-4 py-2 flex items-center gap-2 shadow">
        <span class="text-green-500">✔️</span>
        <span>Bulk Reminder Sent</span>
        <span class="text-xs text-green-700">Payment reminders have been sent to all 15 members with overdue payments.</span>
      </div>
      <!-- Close Button -->
      <button class="absolute top-4 right-4 text-gray-400 hover:text-black dark:hover:text-white text-2xl" @click="$emit('close')">&times;</button>
      <!-- Header -->
      <div class="flex items-center gap-2 px-6 pt-6 pb-2">
        <span class="font-semibold text-lg">Overdue Payments Review</span>
      </div>
      <!-- Summary Bar -->
      <div class="bg-orange-50 text-orange-700 px-6 py-3 flex items-center justify-between">
        <div>
          <div class="font-medium">15 Members with Overdue Payments</div>
          <div class="text-xs">Total Outstanding: <span class="font-semibold text-orange-500">$1,347</span></div>
        </div>
        <button class="bg-black text-white rounded px-4 py-2 font-medium" @click="showBulkModal = true">Send Bulk Reminder</button>
      </div>
      <!-- Table -->
      <div class="p-6 pt-4">
        <table class="w-full text-sm">
          <thead>
            <tr class="text-left text-gray-500 border-b">
              <th class="py-2">Member</th>
              <th class="py-2">Amount</th>
              <th class="py-2">Plan</th>
              <th class="py-2">Days Past Due</th>
              <th class="py-2">Contact</th>
              <th class="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, i) in rows" :key="i" class="border-b last:border-0">
              <td class="py-2 font-medium">{{ row.name }}</td>
              <td class="py-2 text-red-500 font-semibold">${{ row.amount }}</td>
              <td class="py-2">{{ row.plan }}</td>
              <td class="py-2" :class="row.days > 10 ? 'text-red-500 font-semibold' : ''">{{ row.days }} days</td>
              <td class="py-2">
                <div>{{ row.email }}</div>
                <div class="text-xs text-gray-400">{{ row.phone }}</div>
              </td>
              <td class="py-2">
                <button class="border rounded px-3 py-1 text-xs font-medium hover:bg-gray-100">Reminder</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <BulkReminderConfirmModal v-if="showBulkModal" @close="showBulkModal = false" @sent="onBulkSent" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BulkReminderConfirmModal from './BulkReminderConfirmModal.vue';
const showBulkModal = ref(false);
const showSuccess = ref(false);

function onBulkSent() {
  showBulkModal.value = false;
  showSuccess.value = true;
  setTimeout(() => showSuccess.value = false, 3000);
}

const rows = [
  { name: 'Sarah Johnson', amount: 89, plan: 'Premium Annual', days: 15, email: 'sarah@email.com', phone: '+1-555-0123' },
  { name: 'Mike Chen', amount: 89, plan: 'Premium Annual', days: 7, email: 'mike@email.com', phone: '+1-555-0124' },
  { name: 'Lisa Rodriguez', amount: 89, plan: 'Premium Annual', days: 15, email: 'lisa@email.com', phone: '+1-555-0125' },
  { name: 'David Kim', amount: 89, plan: 'Premium Annual', days: 2, email: 'david@email.com', phone: '+1-555-0126' },
  { name: 'Emma Thompson', amount: 89, plan: 'Premium Annual', days: 22, email: 'emma@email.com', phone: '+1-555-0127' },
  { name: 'Sarah Johnson', amount: 89, plan: 'Premium Annual', days: 10, email: 'sarah@email.com', phone: '+1-555-0123' },
];
</script> 