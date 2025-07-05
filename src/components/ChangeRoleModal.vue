<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40" @click.self="emit('close')">
    <div class="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-md p-6">
      <div class="flex justify-between items-center mb-4">
        <div>
          <h2 class="text-lg font-semibold">Change Role</h2>
          <div class="text-sm text-gray-500">Change the role for {{ member.name }}.</div>
        </div>
        <button @click="emit('close')" class="text-gray-400 hover:text-gray-600 text-xl">&times;</button>
      </div>
      <form @submit.prevent="onChangeRole">
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Current Role: {{ member.role }}</label>
        </div>
        <div class="mb-6">
          <label class="block text-sm font-medium mb-1">Select role</label>
          <select v-model="selectedRole" class="w-full border rounded px-3 py-2" required>
            <option value="" disabled>Select role</option>
            <option value="Admin">Admin</option>
            <option value="Member">Member</option>
          </select>
        </div>
        <div class="flex justify-end gap-2">
          <button type="button" @click="emit('close')" class="px-4 py-2 rounded border">Cancel</button>
          <button type="submit" class="px-4 py-2 rounded bg-black text-white flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 7.5l-9 9m0-9l9 9" />
            </svg>
            Role change
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps<{ member: { name: string; role: string } }>();
const emit = defineEmits(['close', 'change']);
const selectedRole = ref('');
function onChangeRole() {
  if (selectedRole.value && selectedRole.value !== props.member.role) {
    emit('change', { member: props.member, newRole: selectedRole.value });
  }
  emit('close');
}
</script> 