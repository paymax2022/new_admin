<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40" @click.self="emit('close')">
    <div class="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-md p-6">
      <div class="flex justify-between items-center mb-4">
        <div>
          <h2 class="text-lg font-semibold">Moderate Post</h2>
          <div class="text-sm text-gray-500">Take action on: "{{ post.title }}"</div>
        </div>
        <button @click="emit('close')" class="text-gray-400 hover:text-gray-600 text-xl">&times;</button>
      </div>
      <form @submit.prevent="onModerate">
        <div class="mb-6">
          <label class="block text-sm font-medium mb-1">Action</label>
          <select v-model="action" class="w-full border rounded px-3 py-2" required>
            <option value="" disabled>Select action</option>
            <option value="approve">Approve</option>
            <option value="reject">Reject</option>
          </select>
        </div>
        <div class="flex justify-end gap-2">
          <button type="button" @click="emit('close')" class="px-4 py-2 rounded border">Cancel</button>
          <button type="submit" class="px-4 py-2 rounded bg-black text-white">Approve Post</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps<{ post: any }>();
const emit = defineEmits(['close', 'moderate']);
const action = ref('');
function onModerate() {
  emit('moderate', { post: props.post, action: action.value });
}
</script> 