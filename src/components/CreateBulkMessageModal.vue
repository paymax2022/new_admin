<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40" @click.self="emit('close')">
    <div class="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-lg p-6">
      <div class="flex justify-between items-center mb-4">
        <div>
          <h2 class="text-lg font-semibold">Create Bulk Message Campaign</h2>
          <div class="text-sm text-gray-500">Create a new message to send to multiple members</div>
        </div>
        <button @click="emit('close')" class="text-gray-400 hover:text-gray-600 text-xl">&times;</button>
      </div>
      <form @submit.prevent="onCreate">
        <div class="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-1">Subject</label>
            <input v-model="form.subject" type="text" class="w-full border rounded px-3 py-2" placeholder="Enter subject" required />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Message Type</label>
            <select v-model="form.type" class="w-full border rounded px-3 py-2" required>
              <option value="" disabled>Select message type</option>
              <option value="EMAIL">EMAIL</option>
              <option value="SMS">SMS</option>
            </select>
          </div>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Message Content</label>
          <textarea v-model="form.content" class="w-full border rounded px-3 py-2" rows="2" placeholder="Enter your Message Content" required></textarea>
        </div>
        <div class="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-1">Target Group</label>
            <select v-model="form.group" class="w-full border rounded px-3 py-2" required>
              <option value="" disabled>Select group</option>
              <option>All Members</option>
              <option>Premium Members</option>
              <option>Event Attendees</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Action</label>
            <select v-model="form.action" class="w-full border rounded px-3 py-2" required>
              <option value="" disabled>Select Action</option>
              <option>Send Now</option>
              <option>Schedule</option>
              <option>Save as Draft</option>
            </select>
          </div>
        </div>
        <div class="flex justify-end gap-2">
          <button type="button" @click="emit('close')" class="px-4 py-2 rounded border">Cancel</button>
          <button type="submit" class="px-4 py-2 rounded bg-black text-white">Send Campaign</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const emit = defineEmits(['close', 'create']);
const form = ref({
  subject: '',
  type: '',
  content: '',
  group: '',
  action: '',
});
function onCreate() {
  emit('create', { ...form.value });
}
</script> 