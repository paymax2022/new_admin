<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
    <div class="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-md p-0 relative">
      <!-- Close Button -->
      <button class="absolute top-4 right-4 text-gray-400 hover:text-black dark:hover:text-white text-2xl" @click="$emit('close')">&times;</button>
      <div class="px-8 pt-8 pb-4">
        <h2 class="font-semibold text-lg mb-1">Create Alerts Panel</h2>
        <p class="text-gray-500 dark:text-gray-400 text-sm mb-4">Configure system alerts and notifications display.</p>
        <div class="mb-4">
          <div class="font-medium text-xs mb-1">Alert Types</div>
          <div class="flex flex-col gap-2 mb-3">
            <label class="flex items-center gap-2 text-sm"><input type="checkbox" checked /> Payment Overdue</label>
            <label class="flex items-center gap-2 text-sm"><input type="checkbox" /> Payment Overdue</label>
            <label class="flex items-center gap-2 text-sm"><input type="checkbox" /> System Alert</label>
            <label class="flex items-center gap-2 text-sm"><input type="checkbox" /> Member Activity</label>
          </div>
          <label class="block text-xs mb-1 font-medium">Priority Level</label>
          <select class="w-full border rounded px-2 py-2 mb-3">
            <option disabled selected value="">Select Priority</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>
        <div class="flex gap-2 mt-6">
          <button class="flex-1 bg-black text-white rounded px-4 py-2 font-medium">Create Alert Panel</button>
          <button class="flex-1 border rounded px-4 py-2 font-medium" @click="$emit('close')">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template> 