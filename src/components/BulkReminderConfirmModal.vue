<template>
  <div class="fixed inset-0 z-60 flex items-center justify-center bg-black/30">
    <div class="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-md p-0 relative">
      <!-- Close Button -->
      <button class="absolute top-4 right-4 text-gray-400 hover:text-black dark:hover:text-white text-2xl" @click="$emit('close')">&times;</button>
      <div class="px-6 pt-6 pb-2">
        <div class="flex items-center gap-2 mb-2">
          <span class="text-2xl">🔔</span>
          <span class="font-semibold text-lg">Send Bulk Payment Reminder</span>
        </div>
        <div class="text-sm text-gray-700 dark:text-gray-300 mb-3">
          You are about to send payment reminders to 15 members with overdue payments.
        </div>
        <div class="mb-3">
          <div class="font-semibold mb-1">Reminder will include:</div>
          <ul class="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300">
            <li>Payment amount and due date</li>
            <li>Direct payment link</li>
            <li>Account suspension warning</li>
            <li>Contact information for support</li>
          </ul>
        </div>
        <div class="text-xs text-gray-400 mb-4">
          This action will be logged in the system for tracking purposes.
        </div>
        <div class="flex gap-2">
          <button class="flex-1 bg-black text-white rounded px-4 py-2 font-medium" @click="$emit('sent')">Send Reminder</button>
          <button class="flex-1 border rounded px-4 py-2 font-medium" @click="$emit('close')">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template> 