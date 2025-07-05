<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40" @click.self="emit('close')">
    <div class="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-lg p-6">
      <div class="flex justify-between items-center mb-4">
        <div>
          <h2 class="text-lg font-semibold">Edit Announcement</h2>
          <div class="text-sm text-gray-500">Update the announcement details</div>
        </div>
        <button @click="emit('close')" class="text-gray-400 hover:text-gray-600 text-xl">&times;</button>
      </div>
      <form @submit.prevent="onUpdate">
        <div class="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-1">Title</label>
            <input v-model="form.title" type="text" class="w-full border rounded px-3 py-2" required />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Type</label>
            <select v-model="form.type" class="w-full border rounded px-3 py-2" required>
              <option value="general">General</option>
              <option value="system">System</option>
              <option value="event">Event</option>
            </select>
          </div>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Content</label>
          <textarea v-model="form.details" class="w-full border rounded px-3 py-2" rows="2" required></textarea>
        </div>
        <div class="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-1">Target Audience</label>
            <select v-model="form.audience" class="w-full border rounded px-3 py-2" required>
              <option>All Members</option>
              <option>Premium Members</option>
              <option>Event Attendees</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Status</label>
            <select v-model="form.status" class="w-full border rounded px-3 py-2" required>
              <option value="published">Publish Now</option>
              <option value="scheduled">Schedule</option>
              <option value="draft">Save as Draft</option>
            </select>
          </div>
        </div>
        <div class="flex justify-end gap-2">
          <button type="button" @click="emit('close')" class="px-4 py-2 rounded border">Cancel</button>
          <button type="submit" class="px-4 py-2 rounded bg-black text-white">Update Announcement</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
const props = defineProps<{ announcement: any }>();
const emit = defineEmits(['close', 'update']);
const form = ref({ ...props.announcement });
watch(() => props.announcement, (val) => { form.value = { ...val }; });
function onUpdate() {
  emit('update', { ...form.value });
}
</script> 