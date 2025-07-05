<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40" @click.self="emit('close')">
    <div class="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-lg p-6">
      <div class="flex justify-between items-center mb-4">
        <div>
          <h2 class="text-lg font-semibold">{{ message.subject }}</h2>
          <div class="text-sm text-gray-500">View message campaign details</div>
        </div>
        <button @click="emit('close')" class="text-gray-400 hover:text-gray-600 text-xl">&times;</button>
      </div>
      <div class="flex gap-2 mb-4">
        <span :class="message.type === 'EMAIL' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'" class="px-3 py-1 rounded-full text-xs font-medium">
          {{ message.type }}
        </span>
        <span :class="message.status === 'sent' ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'" class="px-3 py-1 rounded-full text-xs font-medium">
          {{ message.status.charAt(0).toUpperCase() + message.status.slice(1) }}
        </span>
      </div>
      <div class="mb-4 p-3 bg-gray-50 rounded text-sm text-gray-700">
        {{ message.content || "This week's highlights and upcoming events..." }}
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-600">
        <div><span class="font-semibold">Target Group:</span> {{ message.group }}</div>
        <div><span class="font-semibold">Recipients:</span> {{ message.recipients }}</div>
        <div><span class="font-semibold">Created:</span> {{ message.created }}</div>
        <div v-if="message.sent"><span class="font-semibold">Sent:</span> {{ message.sent }}</div>
        <div v-if="message.deliveryRate"><span class="font-semibold">Delivery Rate:</span> {{ message.deliveryRate }}</div>
        <div v-if="message.openRate"><span class="font-semibold">Open Rate:</span> {{ message.openRate }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ message: any }>();
const emit = defineEmits(['close']);
</script> 