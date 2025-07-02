<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
    <div class="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-md p-0 relative">
      <!-- Close Button -->
      <button class="absolute top-4 right-4 text-gray-400 hover:text-black dark:hover:text-white text-2xl" @click="$emit('close')">&times;</button>
      <div class="px-8 pt-8 pb-4">
        <h2 class="font-semibold text-lg mb-1">Create Quick Stats</h2>
        <p class="text-gray-500 dark:text-gray-400 text-sm mb-4">Display key metrics and statistics on your dashboard.</p>
        <div class="mb-4">
          <div class="font-medium text-xs mb-1">Stats to Display</div>
          <div class="flex flex-col gap-2 mb-3">
            <label class="flex items-center gap-2 text-sm"><input type="checkbox" checked /> Total Members</label>
            <label class="flex items-center gap-2 text-sm"><input type="checkbox" checked /> Monthly Revenue</label>
            <label class="flex items-center gap-2 text-sm"><input type="checkbox" /> Upcoming Events</label>
            <label class="flex items-center gap-2 text-sm"><input type="checkbox" /> Engagement Rate</label>
          </div>
          <label class="block text-xs mb-1 font-medium">Update Frequency</label>
          <select class="w-full border rounded px-2 py-2 mb-3">
            <option disabled selected value="">Select Frequency</option>
            <option>Real-time</option>
            <option>Hourly</option>
            <option>Daily</option>
            <option>Weekly</option>
          </select>
        </div>
        <div class="flex gap-2 mt-6">
          <button class="flex-1 bg-black text-white rounded px-4 py-2 font-medium">Create Quick Stats</button>
          <button class="flex-1 border rounded px-4 py-2 font-medium" @click="$emit('close')">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template> 