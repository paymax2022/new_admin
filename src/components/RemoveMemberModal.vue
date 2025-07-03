<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40" @click.self="emit('close')">
    <div class="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-sm p-6">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-semibold">Remove Member</h2>
        <button @click="emit('close')" class="text-gray-400 hover:text-gray-600 text-xl">&times;</button>
      </div>
      <div class="mb-6 text-sm text-gray-700 dark:text-gray-300">
        Are you sure you want to remove {{ member.name }} from this group? This action cannot be undone.
      </div>
      <div class="flex justify-end gap-2">
        <button type="button" @click="emit('close')" class="px-4 py-2 rounded border">Cancel</button>
        <button type="button" @click="emit('remove', member)" class="px-4 py-2 rounded bg-red-600 text-white">Remove Member</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ member: { name: string } }>();
const emit = defineEmits(['close', 'remove']);
</script> 