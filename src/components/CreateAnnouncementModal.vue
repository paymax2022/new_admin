<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40" @click.self="emit('close')">
    <div class="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-lg p-6">
      <div class="flex justify-between items-center mb-4">
        <div>
          <h2 class="text-lg font-semibold">Create New Announcement</h2>
          <div class="text-sm text-gray-500">Create a new announcement to share with your members</div>
        </div>
        <button @click="emit('close')" class="text-gray-400 hover:text-gray-600 text-xl">&times;</button>
      </div>
      <form @submit.prevent="onCreate">
        <div class="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-1">Title</label>
            <input v-model="form.title" type="text" class="w-full border rounded px-3 py-2" placeholder="Enter Announcement title" required />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Type</label>
            <select v-model="form.type" class="w-full border rounded px-3 py-2" required>
              <option value="" disabled>Select type</option>
              <option value="general">General</option>
              <option value="system">System</option>
              <option value="event">Event</option>
            </select>
          </div>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Content</label>
          <textarea v-model="form.details" class="w-full border rounded px-3 py-2" rows="2" placeholder="Enter announcement content" required></textarea>
        </div>
        <div class="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-1">Target Audience</label>
            <select v-model="form.audience" class="w-full border rounded px-3 py-2" required>
              <option value="" disabled>Select audience</option>
              <option>All Members</option>
              <option>Premium Members</option>
              <option>Event Attendees</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Status</label>
            <select v-model="form.status" class="w-full border rounded px-3 py-2" required>
              <option value="" disabled>Select status</option>
              <option value="published">Publish Now</option>
              <option value="scheduled">Schedule</option>
              <option value="draft">Save as Draft</option>
            </select>
          </div>
        </div>
        <div class="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-1">Time</label>
            <input v-model="form.time" type="time" class="w-full border rounded px-3 py-2" placeholder="8:00" />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Date</label>
            <input v-model="form.date" type="date" class="w-full border rounded px-3 py-2" placeholder="DD/MM/YYYY" />
          </div>
        </div>
        <div class="flex justify-end gap-2">
          <button type="button" @click="emit('close')" class="px-4 py-2 rounded border">Cancel</button>
          <button type="submit" class="px-4 py-2 rounded bg-black text-white">Create Announcement</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const emit = defineEmits(['close', 'create']);
const form = ref({
  title: '',
  type: '',
  details: '',
  audience: '',
  status: '',
  time: '',
  date: '',
});
function onCreate() {
  emit('create', { ...form.value });
}
</script> 