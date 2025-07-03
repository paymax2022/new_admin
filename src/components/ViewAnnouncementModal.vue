<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40" @click.self="emit('close')">
    <div class="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-lg p-6">
      <div class="flex justify-between items-center mb-4">
        <div>
          <h2 class="text-lg font-semibold">{{ announcement.title }}</h2>
          <div class="text-sm text-gray-500">View announcement details</div>
        </div>
        <button @click="emit('close')" class="text-gray-400 hover:text-gray-600 text-xl">&times;</button>
      </div>
      <div class="flex gap-2 mb-4">
        <span :class="announcement.type === 'general' ? 'bg-green-100 text-green-700' : announcement.type === 'system' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'" class="px-3 py-1 rounded-full text-xs font-medium">
          {{ announcement.type.charAt(0).toUpperCase() + announcement.type.slice(1) }}
        </span>
        <span :class="announcement.status === 'published' ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'" class="px-3 py-1 rounded-full text-xs font-medium">
          {{ announcement.status.charAt(0).toUpperCase() + announcement.status.slice(1) }}
        </span>
      </div>
      <div class="mb-4 p-3 bg-gray-50 rounded text-sm text-gray-700">
        {{ announcement.details || 'The monthly board meeting is scheduled for next Friday at 2 PM in the conference room.' }}
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-600">
        <div><span class="font-semibold">Author:</span> {{ announcement.author }}</div>
        <div><span class="font-semibold">Target Audience:</span> {{ announcement.audience }}</div>
        <div><span class="font-semibold">Created:</span> {{ announcement.created }}</div>
        <div><span class="font-semibold">Views:</span> {{ announcement.views }}</div>
        <div v-if="announcement.published"><span class="font-semibold">Published:</span> {{ announcement.published }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ announcement: any }>();
const emit = defineEmits(['close']);
</script> 