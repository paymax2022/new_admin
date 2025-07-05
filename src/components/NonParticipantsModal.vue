<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40" @click.self="emit('close')">
    <div class="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-xl p-6">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-semibold">Members Who Haven't Participated</h2>
        <button @click="emit('close')" class="text-gray-400 hover:text-gray-600 text-xl">&times;</button>
      </div>
      <div class="flex gap-2 mb-4">
        <div class="flex-1">
          <label class="block text-xs font-medium mb-1">Sort By</label>
          <select class="w-full border rounded px-3 py-2 text-sm">
            <option>Select</option>
            <option>Name</option>
            <option>Last Active</option>
          </select>
        </div>
        <div class="flex-1">
          <label class="block text-xs font-medium mb-1">Filter by Group</label>
          <select class="w-full border rounded px-3 py-2 text-sm">
            <option>Select group</option>
            <option>All Members</option>
            <option>Premium Members</option>
          </select>
        </div>
      </div>
      <div class="mb-6 max-h-60 overflow-y-auto">
        <div v-for="member in members" :key="member.email" class="flex items-center justify-between border-b last:border-0 py-3">
          <div>
            <div class="font-medium">{{ member.name }}</div>
            <div class="text-xs text-gray-500">{{ member.email }}</div>
            <div class="text-xs text-gray-400">Last active: {{ member.lastActive }}</div>
          </div>
          <div class="flex gap-2">
            <button class="border rounded px-3 py-1 text-xs">View Profile</button>
            <button class="bg-black text-white rounded px-3 py-1 text-xs">Send Reminder</button>
          </div>
        </div>
      </div>
      <div class="flex justify-end gap-2 mt-4">
        <button type="button" @click="emit('close')" class="px-4 py-2 rounded border">Cancel</button>
        <button type="button" class="px-4 py-2 rounded bg-black text-white">Send Reminder to All</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['close']);
const members = [
  { name: 'John Smith', email: 'john@example.com', lastActive: '1 day ago' },
  { name: 'Alice Johnson', email: 'alice@example.com', lastActive: '2 days ago' },
  { name: 'Bob Williams', email: 'bob@example.com', lastActive: '1 day ago' },
];
</script> 