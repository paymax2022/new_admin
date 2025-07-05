<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
    <div class="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-md p-0 relative">
      <!-- Close Button -->
      <button class="absolute top-4 right-4 text-gray-400 hover:text-black dark:hover:text-white text-2xl" @click="$emit('close')">&times;</button>
      <div class="px-8 pt-8 pb-4">
        <h2 class="font-semibold text-lg mb-1">Create New Widget</h2>
        <p class="text-gray-500 dark:text-gray-400 text-sm mb-4">Add a custom widget to your dashboard with your preferred settings.</p>
        <div class="mb-4">
          <label class="block text-xs mb-1 font-medium">Widget Title</label>
          <input type="text" class="w-full border rounded px-2 py-2 mb-3" placeholder="Enter Widget title" />
          <label class="block text-xs mb-1 font-medium">Widget Type</label>
          <select class="w-full border rounded px-2 py-2 mb-3">
            <option disabled selected value="">Select Widget type</option>
            <option>Performance Chart</option>
            <option>Task List</option>
            <option>Alert Panel</option>
            <option>Quick Start</option>
          </select>
          <label class="block text-xs mb-1 font-medium">Description</label>
          <textarea class="w-full border rounded px-2 py-2 mb-3" rows="3" placeholder="Widget description (Optional)"></textarea>
        </div>
        <div class="flex gap-2 mt-6">
          <button class="flex-1 bg-black text-white rounded px-4 py-2 font-medium">Create Widget</button>
          <button class="flex-1 border rounded px-4 py-2 font-medium" @click="$emit('close')">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template> 