<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
    <div class="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-sm p-0 relative">
      <!-- Close Button -->
      <button class="absolute top-4 right-4 text-gray-400 hover:text-black dark:hover:text-white text-2xl" @click="$emit('close')">&times;</button>
      <div class="px-8 pt-8 pb-4">
        <h2 class="font-semibold text-lg mb-4">Delete Member</h2>
        <p class="mb-6 text-gray-700 dark:text-gray-300 text-sm">
          Are you sure you want to permanently delete <span class="font-semibold">{{ member?.name }}</span>?<br />
          This action cannot be undone and will remove all their data from the system.
        </p>
        <div class="flex gap-2 mt-2">
          <button class="flex-1 border rounded px-4 py-2 font-medium" @click="$emit('close')">Cancel</button>
          <button class="flex-1 rounded px-4 py-2 font-medium bg-red-600 text-white hover:bg-red-700" @click="$emit('confirm', member)">Delete Member</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  member: { type: Object, required: true }
});
</script> 