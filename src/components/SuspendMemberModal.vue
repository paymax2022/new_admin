<template>
  <div class="fixed inset-0 z-60 flex items-center justify-center bg-black/30">
    <div class="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-sm p-0 relative">
      <!-- Close Button -->
      <button class="absolute top-4 right-4 text-gray-400 hover:text-black dark:hover:text-white text-2xl" @click="$emit('close')">&times;</button>
      <div class="px-8 pt-8 pb-4">
        <h2 class="font-semibold text-lg mb-4">Suspend Member</h2>
        <div class="mb-6 text-sm text-gray-700 dark:text-gray-300">
          Are you sure you want to suspend <span class="font-semibold">{{ member?.name }}</span>? They will lose access to all member features until their account is reactivated.
        </div>
        <div class="flex gap-2 mt-6">
          <button class="flex-1 border rounded px-4 py-2 font-medium" @click="$emit('close')">Cancel</button>
          <button class="flex-1 bg-orange-500 text-white rounded px-4 py-2 font-medium">Suspend Member</button>
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