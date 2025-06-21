<template>
  <div class="p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-xl font-semibold mb-6">Booking Status Update</h2>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <!-- Booking Cancel -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Booking Cancel</label>
        <select
          v-model="formData.bookingCancel"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="No Cancellation">No Cancellation</option>
          <option value="Cancellation Requested">Cancellation Requested</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <!-- Status -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Status</label>
        <select
          v-model="formData.status"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="Enabled">Enabled</option>
          <option value="Disabled">Disabled</option>
        </select>
      </div>

      <!-- Checked In -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Checked In</label>
        <select
          v-model="formData.checkedIn"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>

      <!-- Payment Type -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Payment Type</label>
        <select
          v-model="formData.paymentType"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="Offline">Offline</option>
          <option value="Online">Online</option>
          <option value="Credit">Credit</option>
        </select>
      </div>

      <!-- Is Paid -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Is Paid</label>
        <select
          v-model="formData.isPaid"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
          <option value="Partial">Partial</option>
        </select>
      </div>

      <!-- Submit Button -->
      <div class="pt-4">
        <button
          type="submit"
          class="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Save
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface FormData {
  bookingCancel: string;
  status: string;
  checkedIn: string;
  paymentType: string;
  isPaid: string;
}

const formData = ref<FormData>({
  bookingCancel: 'No Cancellation',
  status: 'Enabled',
  checkedIn: 'No',
  paymentType: 'Offline',
  isPaid: 'Yes'
});

const handleSubmit = () => {
  console.log('Form submitted:', formData.value);
  // Here you would typically send the data to an API
  alert('Booking status updated successfully!');
};
</script>

<style scoped>
/* Responsive adjustments */
@media (max-width: 640px) {
  .max-w-md {
    width: 100%;
    margin-left: 1rem;
    margin-right: 1rem;
  }
}
</style>
