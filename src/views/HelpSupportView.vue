<template>
  <div class="flex flex-col items-center justify-center min-h-screen pt-24">
    <h1 class="text-2xl font-semibold mb-2">Help & Support</h1>
    <div class="text-sm text-gray-500 mb-8">Get assistance with ConnectGroup administration</div>
    <button class="flex flex-col items-center border border-blue-200 bg-white px-6 py-4 rounded-xl shadow hover:shadow-md transition mb-2" @click="showTicketModal = true">
      <span class="flex items-center gap-2 text-blue-600 font-semibold text-base">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/><path d="M12 16v-1m0-4a1 1 0 10-2 0c0 1 2 1 2 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        Submit Ticket
      </span>
      <span class="text-xs text-gray-500 mt-1">Contact our support team</span>
    </button>
    <!-- Submit Support Ticket Modal -->
    <div v-if="showTicketModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div class="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl relative">
        <button class="absolute top-3 right-3 text-gray-400 hover:text-gray-700" @click="closeTicketModal">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
        <h2 class="text-lg font-semibold mb-6">Submit Support Ticket</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label class="block text-sm font-medium mb-1">Full Name<span class="text-red-500">*</span></label>
            <input v-model="ticketForm.name" class="w-full border rounded px-3 py-2 text-sm" placeholder="Enter your full name" />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Email Address<span class="text-red-500">*</span></label>
            <input v-model="ticketForm.email" class="w-full border rounded px-3 py-2 text-sm" placeholder="Enter your email" />
          </div>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Subject<span class="text-red-500">*</span></label>
          <input v-model="ticketForm.subject" class="w-full border rounded px-3 py-2 text-sm" placeholder="Brief description of your issue" />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label class="block text-sm font-medium mb-1">Category<span class="text-red-500">*</span></label>
            <select v-model="ticketForm.category" class="w-full border rounded px-3 py-2 text-sm">
              <option disabled value="">Select category</option>
              <option>Technical Issue</option>
              <option>Billing</option>
              <option>Account</option>
              <option>Feature Request</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Priority<span class="text-red-500">*</span></label>
            <select v-model="ticketForm.priority" class="w-full border rounded px-3 py-2 text-sm">
              <option disabled value="">Select priority</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Urgent</option>
            </select>
          </div>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Description</label>
          <textarea v-model="ticketForm.description" class="w-full border rounded px-3 py-2 text-sm" rows="3" placeholder="Please provide detailed information about your issue, including steps to reproduce if applicable."></textarea>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Attachments (Optional)</label>
          <div class="border-2 border-dashed rounded flex flex-col items-center justify-center px-4 py-8 bg-gray-50 text-xs text-gray-400 cursor-pointer">
            <svg class="w-8 h-8 mb-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 16v-4m0 0V8m0 4h4m-4 0H8m8 4a4 4 0 01-8 0V8a4 4 0 018 0v8z"/></svg>
            Click to upload files or drag and drop<br />
            <span class="text-xs">(PNG, JPG, PDF, max 10MB each)</span>
          </div>
        </div>
        <div class="mb-6 text-xs text-gray-500">
          <div class="mb-1 font-medium">Before submitting:</div>
          <ul class="list-disc pl-5">
            <li>Check our Help Articles for common solutions</li>
            <li>Include screenshots if relevant</li>
            <li>We typically respond within 24 hours</li>
          </ul>
        </div>
        <div class="flex gap-2">
          <button class="bg-black text-white px-4 py-2 rounded w-full">Submit Ticket</button>
          <button class="border px-4 py-2 rounded w-full" @click="closeTicketModal">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const showTicketModal = ref(false);
const ticketForm = ref({
  name: '',
  email: '',
  subject: '',
  category: '',
  priority: '',
  description: '',
  // attachments: [] // For demo, not implemented
});
function closeTicketModal() {
  showTicketModal.value = false;
  ticketForm.value = { name: '', email: '', subject: '', category: '', priority: '', description: '' };
}
</script> 