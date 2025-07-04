<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40" @click.self="emit('close')">
    <div class="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-xl p-6">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-semibold">Send Participation Reminders</h2>
        <button @click="emit('close')" class="text-gray-400 hover:text-gray-600 text-xl">&times;</button>
      </div>
      <form @submit.prevent="onSend">
        <div class="mb-4">
          <div class="text-xs text-gray-500 mb-2">Select Polls for Reminders</div>
          <div v-for="(poll, idx) in polls" :key="poll.title" class="flex items-center gap-3 mb-2 p-2 rounded border border-gray-100">
            <input type="checkbox" v-model="selectedPolls" :value="poll.title" class="accent-black" />
            <div class="flex-1">
              <div class="font-medium">{{ poll.title }}</div>
              <div class="text-xs text-gray-400">{{ poll.nonParticipants }} non-participants &nbsp; <span class="text-gray-300">|</span> Ends: {{ poll.ends }}</div>
            </div>
            <span class="bg-green-100 text-green-600 text-xs px-2 py-1 rounded">Active</span>
          </div>
        </div>
        <div class="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-medium mb-1">Question Type</label>
            <select v-model="questionType" class="w-full border rounded px-3 py-2 text-sm">
              <option>Rating Scale</option>
              <option>Multiple Choice</option>
              <option>Short Answer</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-medium mb-1">Reminder Method</label>
            <select v-model="reminderMethod" class="w-full border rounded px-3 py-2 text-sm">
              <option>Select method</option>
              <option>Email</option>
              <option>SMS</option>
              <option>Push Notification</option>
            </select>
          </div>
        </div>
        <div class="mb-4">
          <label class="block text-xs font-medium mb-1">Custom Message (Optional)</label>
          <textarea v-model="customMessage" class="w-full border rounded px-3 py-2 text-sm" rows="2" placeholder="add a personal message to encourage participants"></textarea>
          <div class="text-xs text-gray-400 mt-1">Leave blank to use the default reminder template</div>
        </div>
        <div class="mb-4 flex items-center gap-2">
          <input id="schedule" type="checkbox" v-model="scheduleLater" class="accent-black" />
          <label for="schedule" class="text-xs">Schedule reminder for later</label>
        </div>
        <div class="mb-4">
          <div class="text-xs font-medium mb-1">Engagement Patterns</div>
          <div class="bg-gray-50 rounded p-3 text-xs text-gray-700">
            <div><span class="font-semibold">Subject:</span> Don't miss out! Your opinion matters</div>
            <div><span class="font-semibold">Message:</span> We've noticed you haven't participated in our recent poll yet. Your feedback is important to us and helps shape our community's success. It only takes a minute!</div>
          </div>
        </div>
        <div class="flex justify-end gap-2 mt-6">
          <button type="button" @click="emit('close')" class="px-4 py-2 rounded border">Cancel</button>
          <button type="submit" class="px-4 py-2 rounded bg-black text-white flex items-center gap-2"><svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16 17v-1a4 4 0 00-3-3.87"></path><circle cx="12" cy="7" r="4"></circle></svg> Send Reminders</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const emit = defineEmits(['close', 'send']);
const polls = [
  { title: 'Preferred Event Time', nonParticipants: 260, ends: '2024-03-20' },
  { title: 'Member Satisfaction Survey', nonParticipants: 344, ends: '2024-03-25' },
];
const selectedPolls = ref([]);
const questionType = ref('Rating Scale');
const reminderMethod = ref('Select method');
const customMessage = ref('');
const scheduleLater = ref(false);
function onSend() {
  emit('send', { selectedPolls: selectedPolls.value, questionType: questionType.value, reminderMethod: reminderMethod.value, customMessage: customMessage.value, scheduleLater: scheduleLater.value });
}
</script> 