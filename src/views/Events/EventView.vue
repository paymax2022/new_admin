<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-2xl font-bold">Update Event - Digital Marketing Seminar</h1>
        <div class="mt-4 flex space-x-4 border-b pb-4">
          <button
            v-for="tab in tabs"
            :key="tab"
            @click="activeTab = tab"
            :class="{
              'text-blue-600 border-blue-600': activeTab === tab,
              'text-gray-500 hover:text-gray-700 border-transparent': activeTab !== tab
            }"
            class="px-4 py-2 font-medium border-b-2 focus:outline-none"
          >
            {{ tab }}
          </button>
        </div>
      </div>

      <!-- Organizer Info -->
      <div class="bg-white rounded-lg shadow p-6 mb-6">
        <h2 class="text-lg font-medium text-gray-900 mb-4">Organiser</h2>
        <p class="text-gray-600">
          Gina White (<a href="mailto:ginawhite@mail.com" class="text-blue-600 hover:underline">ginawhite@mail.com</a>)
        </p>
      </div>

      <!-- Category Select -->
      <div class="bg-white rounded-lg shadow p-6 mb-6">
        <h2 class="text-lg font-medium text-gray-900 mb-4">Select Category</h2>
        <select class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          <option selected>Travel & Trekking</option>
          <option>Business & Seminars</option>
          <option>Food & Drink</option>
          <option>Education & Classes</option>
        </select>
      </div>

      <!-- Event Name -->
      <div class="bg-white rounded-lg shadow p-6 mb-6">
        <h2 class="text-lg font-medium text-gray-900 mb-4">Event Name</h2>
        <input
          type="text"
          v-model="eventName"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
      </div>

      <!-- Event URL -->
      <div class="bg-white rounded-lg shadow p-6 mb-6">
        <h2 class="text-lg font-medium text-gray-900 mb-4">Event URL</h2>
        <div class="flex">
          <span class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
            https://eventmie-pro-demo.classiebit.com/events/
          </span>
          <input
            type="text"
            v-model="eventSlug"
            class="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
        </div>
        <p class="mt-2 text-sm text-gray-500">Full URL: {{ fullEventUrl }}</p>
      </div>

      <!-- Action Buttons -->
      <div class="flex justify-end space-x-4 mt-6">
        <button class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Cancel
        </button>
        <button class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Save Changes
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const tabs = ref(['Details', 'Timings', 'Tickets', 'Location', 'Media', 'SEO', 'Publish']);
const activeTab = ref('Details');

const eventName = ref('Digital Marketing Seminar');
const eventSlug = ref('digital-marketing-seminar');

const fullEventUrl = computed(() => {
  return `https://eventmie-pro-demo.classiebit.com/events/${eventSlug.value}`;
});
</script>

<style scoped>
/* Responsive adjustments */
@media (max-width: 640px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .flex.space-x-4 {
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .flex.space-x-4 button {
    flex: 1 0 auto;
    min-width: 100px;
  }
}
</style>
