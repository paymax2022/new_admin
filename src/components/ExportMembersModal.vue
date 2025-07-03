<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40" @click.self="emit('close')">
    <div class="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-md p-6">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-semibold">Export Members</h2>
        <button @click="emit('close')" class="text-gray-400 hover:text-gray-600 text-xl">&times;</button>
      </div>
      <div class="mb-4 text-sm text-gray-700 dark:text-gray-300">
        Export the member list to a file:
      </div>
      <form @submit.prevent="onExport">
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Export Format</label>
          <select v-model="format" class="w-full border rounded px-3 py-2" required>
            <option value="" disabled>Select format</option>
            <option value="csv">CSV</option>
            <option value="xlsx">Excel (.xlsx)</option>
          </select>
        </div>
        <div class="mb-6 flex items-center gap-2">
          <input id="includeInactive" type="checkbox" v-model="includeInactive" class="rounded border-gray-300" />
          <label for="includeInactive" class="text-sm">Include inactive members</label>
        </div>
        <div class="flex justify-end gap-2">
          <button type="button" @click="emit('close')" class="px-4 py-2 rounded border">Cancel</button>
          <button type="submit" class="px-4 py-2 rounded bg-black text-white flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5v-9m0 9l-3-3m3 3l3-3m6.75 2.25v-10.5A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5h15a2.25 2.25 0 002.25-2.25z" />
            </svg>
            Export
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const emit = defineEmits(['close', 'export']);
const format = ref('');
const includeInactive = ref(false);
function onExport() {
  emit('export', { format: format.value, includeInactive: includeInactive.value });
}
</script> 