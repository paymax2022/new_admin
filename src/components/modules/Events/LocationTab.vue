<template>
  <div class="space-y-6">
    <!-- Online Event Toggle -->
    <div class="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
      <label class="relative inline-flex items-center cursor-pointer mt-1">
        <input
          type="checkbox"
          v-model="isOnlineEvent"
          class="sr-only peer"
        >
        <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
      </label>
      <div>
        <h3 class="font-medium text-gray-700">Online Event</h3>
        <p class="text-sm text-gray-500">
          Make Event Hybrid by making it Online & Selecting a Venue. Attendees can come to Venue with Tickets,
          and can join online with Online Event Secret Details
        </p>
      </div>
    </div>

    <!-- Venue Selection (Conditional) -->
    <div v-if="isOnlineEvent" class="space-y-4">
      <h3 class="text-lg font-medium text-gray-700">Event Venues (Optional)</h3>

      <!-- Venue Search -->
      <div class="relative">
        <input
          type="text"
          placeholder="-- Search Venues --"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          @click="showCreateVenueModal = true"
          class="absolute right-2 top-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          Create Venue
        </button>
      </div>

      <!-- Selected Venues List -->
      <div v-if="selectedVenues.length > 0" class="space-y-2">
        <div v-for="venue in selectedVenues" :key="venue.id" class="p-3 border border-gray-200 rounded-lg flex justify-between items-center">
          <div>
            <h4 class="font-medium">{{ venue.name }}</h4>
            <p class="text-sm text-gray-500">{{ venue.address }}</p>
          </div>
          <button @click="removeVenue(venue.id)" class="text-red-500 hover:text-red-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Save Button -->
    <div class="pt-4">
      <button class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
        Save
      </button>
    </div>

    <!-- Create Venue Modal -->
    <div v-if="showCreateVenueModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-medium">Create New Venue</h3>
            <button @click="showCreateVenueModal = false" class="text-gray-400 hover:text-gray-500">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form @submit.prevent="createVenue" class="space-y-4">
            <!-- Venue Name -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Venue Name</label>
              <input
                v-model="venueForm.name"
                type="text"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <!-- Address -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <textarea
                v-model="venueForm.address"
                rows="3"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <!-- Capacity -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
              <input
                v-model="venueForm.capacity"
                type="number"
                min="1"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div class="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                @click="showCreateVenueModal = false"
                class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Create Venue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Venue {
  id: string;
  name: string;
  address: string;
  capacity: number;
}

const isOnlineEvent = ref(false);
const showCreateVenueModal = ref(false);
const selectedVenues = ref<Venue[]>([]);

const venueForm = ref({
  name: '',
  address: '',
  capacity: 100
});

const createVenue = () => {
  const newVenue: Venue = {
    id: Date.now().toString(),
    ...venueForm.value
  };
  selectedVenues.value.push(newVenue);
  showCreateVenueModal.value = false;
  venueForm.value = {
    name: '',
    address: '',
    capacity: 100
  };
};

const removeVenue = (id: string) => {
  selectedVenues.value = selectedVenues.value.filter(venue => venue.id !== id);
};
</script>
