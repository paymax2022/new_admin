<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
    <div class="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-md p-0 relative">
      <!-- Close Button -->
      <button class="absolute top-4 right-4 text-gray-400 hover:text-black dark:hover:text-white text-2xl" @click="$emit('close')">&times;</button>
      <div class="px-8 pt-8 pb-4">
        <h2 class="font-semibold text-lg mb-4">Member Details - {{ member?.name }}</h2>
        <div class="mb-4">
          <div class="flex items-center gap-2 mb-1">
            <span class="font-medium">{{ member?.name }}</span>
            <span v-if="member?.status === 'Active'" class="px-3 py-1 rounded-full bg-green-100 text-green-600 text-xs font-semibold">Active</span>
            <span v-if="member?.status === 'Suspended'" class="px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-semibold">Suspended</span>
          </div>
          <div class="text-xs text-gray-500">{{ member?.email }}</div>
          <div class="text-xs text-gray-400">Member since: {{ member?.subscriptionDate }}</div>
          <div class="text-xs text-gray-400 mb-2">Last active: {{ member?.lastActive }}</div>
        </div>
        <div class="mb-4">
          <div class="font-semibold text-xs mb-2">Account Actions</div>
          <div class="flex flex-col gap-2">
            <button class="w-full flex items-center gap-2 border rounded px-3 py-2 text-left text-sm"><span>🔑</span>Send Password Reset</button>
            <button class="w-full flex items-center gap-2 border rounded px-3 py-2 text-left text-sm"><span>✉️</span>Resend Welcome Email</button>
          </div>
        </div>
        <div class="mb-4">
          <div class="font-semibold text-xs mb-2">Payment & Billing</div>
          <button class="w-full flex items-center gap-2 border rounded px-3 py-2 text-left text-sm" @click="showPaymentHistory = true"><span>💳</span>View Payment History</button>
        </div>
        <div class="mb-4">
          <div class="font-semibold text-xs mb-2">Danger Zone</div>
          <div class="flex flex-col gap-2">
            <button class="w-full flex items-center gap-2 rounded px-3 py-2 text-left text-sm bg-orange-50 text-orange-700 border border-orange-200" @click="showSuspendModal = true">⚠️ Suspend Member</button>
            <button class="w-full flex items-center gap-2 rounded px-3 py-2 text-left text-sm bg-red-50 text-red-700 border border-red-200" @click="$emit('delete', member)">🗑️ Delete Member</button>
          </div>
        </div>
        <div class="flex gap-2 mt-6">
          <button class="flex-1 border rounded px-4 py-2 font-medium" @click="$emit('close')">Cancel</button>
        </div>
      </div>
      <PaymentHistoryModal v-if="showPaymentHistory" :member="member" @close="showPaymentHistory = false" />
      <SuspendMemberModal v-if="showSuspendModal" :member="member" @close="showSuspendModal = false" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps({
  member: { type: Object, required: true }
});
import PaymentHistoryModal from '@/components/PaymentHistoryModal.vue';
import SuspendMemberModal from '@/components/SuspendMemberModal.vue';
const showPaymentHistory = ref(false);
const showSuspendModal = ref(false);
</script> 