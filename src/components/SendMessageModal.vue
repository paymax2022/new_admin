<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40" @click.self="emit('close')">
    <div class="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-md p-6">
      <div class="flex justify-between items-center mb-4">
        <div>
          <h2 class="text-lg font-semibold">Send Message</h2>
          <div class="text-sm text-gray-500">Send a message to {{ member.name }}.</div>
        </div>
        <button @click="emit('close')" class="text-gray-400 hover:text-gray-600 text-xl">&times;</button>
      </div>
      <form @submit.prevent="onSend">
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Subject</label>
          <input v-model="subject" type="text" class="w-full border rounded px-3 py-2" placeholder="Enter message subject" required />
        </div>
        <div class="mb-6">
          <label class="block text-sm font-medium mb-1">Message</label>
          <textarea v-model="message" class="w-full border rounded px-3 py-2" rows="4" placeholder="Enter your message here" required></textarea>
        </div>
        <div class="flex justify-end gap-2">
          <button type="button" @click="emit('close')" class="px-4 py-2 rounded border">Cancel</button>
          <button type="submit" class="px-4 py-2 rounded bg-black text-white flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.668c0 .456-.244.88-.64 1.1l-8.22 4.566a2.25 2.25 0 01-2.22 0L2.39 8.518A1.125 1.125 0 011.75 7.418V6.75" />
            </svg>
            Send Message
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps<{ member: { name: string } }>();
const emit = defineEmits(['close', 'send']);
const subject = ref('');
const message = ref('');
function onSend() {
  emit('send', { subject: subject.value, message: message.value, member: props.member });
}
</script> 