<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40" @click.self="emit('close')">
    <div class="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-lg p-6">
      <div class="flex justify-between items-center mb-4">
        <div>
          <h2 class="text-lg font-semibold">{{ post.title }}</h2>
          <div class="text-sm text-gray-500">View forum post details</div>
        </div>
        <button @click="emit('close')" class="text-gray-400 hover:text-gray-600 text-xl">&times;</button>
      </div>
      <div class="flex gap-2 mb-4">
        <span class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">{{ post.category }}</span>
        <span :class="post.status === 'approved' ? 'bg-green-100 text-green-700' : post.status === 'pending' ? 'bg-orange-100 text-orange-700' : post.status === 'flagged' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'" class="px-3 py-1 rounded-full text-xs font-medium">
          {{ post.status.charAt(0).toUpperCase() + post.status.slice(1) }}
        </span>
      </div>
      <div class="mb-4 p-3 bg-gray-50 rounded text-sm text-gray-700">
        {{ post.content || "Let's give a warm welcome to all our new members who joined this month..." }}
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-600">
        <div><span class="font-semibold">Author:</span> {{ post.author }}</div>
        <div><span class="font-semibold">Category:</span> {{ post.category }}</div>
        <div><span class="font-semibold">Created:</span> {{ post.created }}</div>
        <div><span class="font-semibold">Replies:</span> {{ post.replies }}</div>
        <div><span class="font-semibold">Views:</span> {{ post.views }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ post: any }>();
const emit = defineEmits(['close']);
</script> 