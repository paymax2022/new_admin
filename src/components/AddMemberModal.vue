<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40" @click.self="emit('close')">
    <div class="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-md p-6">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-semibold">Add Member</h2>
        <button @click="emit('close')" class="text-gray-400 hover:text-gray-600 text-xl">&times;</button>
      </div>
      <form @submit.prevent="onAdd">
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Email Address</label>
          <input v-model="email" type="email" class="w-full border rounded px-3 py-2" placeholder="Enter email address" required />
        </div>
        <div class="mb-6">
          <label class="block text-sm font-medium mb-1">Role</label>
          <select v-model="role" class="w-full border rounded px-3 py-2" required>
            <option value="" disabled>Select Role</option>
            <option value="Admin">Admin</option>
            <option value="Member">Member</option>
          </select>
        </div>
        <div class="flex justify-end gap-2">
          <button type="button" @click="emit('close')" class="px-4 py-2 rounded border">Cancel</button>
          <button type="submit" class="px-4 py-2 rounded bg-black text-white flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M18 9v3a6 6 0 11-12 0V9m12 0V7.5A2.25 2.25 0 0015.75 5.25h-7.5A2.25 2.25 0 006 7.5V9m12 0h-3.75m-4.5 0H6" />
            </svg>
            Add Member
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const emit = defineEmits(['close', 'add']);
const email = ref('');
const role = ref('');
function onAdd() {
  emit('add', { email: email.value, role: role.value });
}
</script> 