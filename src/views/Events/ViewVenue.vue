<template>
  <div class="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
    <!-- Header Section -->
    <div class="mb-8 border-b pb-6">
      <h1 class="text-3xl font-bold text-gray-800">{{ event.title }}</h1>
      <div class="flex items-center mt-2 text-sm text-gray-600">
        <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
          {{ formatStatus(event.status) }}
        </span>
        <span class="mx-2">•</span>
        <span>Created by {{ event.organizer }}</span>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Left Column (Main Content) -->
      <div class="lg:col-span-2">
        <!-- Image Display -->
        <div class="mb-6 rounded-lg overflow-hidden bg-gray-100">
          <img
            v-if="event.imagePreview"
            :src="event.imagePreview"
            :alt="event.title"
            class="w-full h-64 object-cover"
          >
          <div v-else class="w-full h-64 flex items-center justify-center text-gray-400">
            <span>No image uploaded</span>
          </div>
        </div>

        <!-- Description Section -->
        <div class="mb-8">
          <h2 class="text-xl font-semibold mb-4 text-gray-800">Event Description</h2>
          <p class="text-gray-700 whitespace-pre-line">{{ event.description || 'No description provided' }}</p>
        </div>

        <!-- Venue Details -->
        <div class="mb-8">
          <h2 class="text-xl font-semibold mb-4 text-gray-800">Venue Details</h2>
          <div class="bg-gray-50 p-4 rounded-lg">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 class="text-sm font-medium text-gray-500">Venue Type</h3>
                <p class="text-gray-800">{{ event.venueType || 'Not specified' }}</p>
              </div>
              <div>
                <h3 class="text-sm font-medium text-gray-500">Slug</h3>
                <p class="text-gray-800">{{ event.slug || 'Not specified' }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column (Sidebar) -->
      <div class="lg:col-span-1">
        <!-- Organizer Card -->
        <div class="bg-blue-50 p-4 rounded-lg mb-6">
          <h2 class="text-lg font-semibold mb-3 text-gray-800">Organizer Information</h2>
          <div class="space-y-2">
            <div>
              <h3 class="text-sm font-medium text-gray-600">Name</h3>
              <p class="text-gray-800">{{ event.organizer }}</p>
            </div>
            <div>
              <h3 class="text-sm font-medium text-gray-600">Email</h3>
              <p class="text-gray-800">{{ event.organizerEmail }}</p>
            </div>
          </div>
        </div>

        <!-- Location Card -->
        <div class="bg-gray-50 p-4 rounded-lg mb-6">
          <h2 class="text-lg font-semibold mb-3 text-gray-800">Location</h2>
          <div class="space-y-3">
            <div>
              <h3 class="text-sm font-medium text-gray-600">Address</h3>
              <p class="text-gray-800">{{ event.address || 'Not specified' }}</p>
            </div>
            <div class="grid grid-cols-3 gap-2">
              <div>
                <h3 class="text-sm font-medium text-gray-600">City</h3>
                <p class="text-gray-800">{{ event.city || '--' }}</p>
              </div>
              <div>
                <h3 class="text-sm font-medium text-gray-600">State</h3>
                <p class="text-gray-800">{{ event.state || '--' }}</p>
              </div>
              <div>
                <h3 class="text-sm font-medium text-gray-600">Zip</h3>
                <p class="text-gray-800">{{ event.zipCode || '--' }}</p>
              </div>
            </div>
            <div>
              <h3 class="text-sm font-medium text-gray-600">Country</h3>
              <p class="text-gray-800">{{ event.country || 'Not specified' }}</p>
            </div>
            <div v-if="event.latitude && event.longitude" class="pt-2">
              <a
                :href="`https://www.google.com/maps?q=${event.latitude},${event.longitude}`"
                target="_blank"
                class="text-sm text-blue-600 hover:underline flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                View on Google Maps
              </a>
            </div>
          </div>
        </div>

        <!-- Coordinates -->
        <div v-if="event.latitude && event.longitude" class="bg-gray-50 p-4 rounded-lg">
          <h2 class="text-lg font-semibold mb-3 text-gray-800">Coordinates</h2>
          <div class="grid grid-cols-2 gap-2">
            <div>
              <h3 class="text-sm font-medium text-gray-600">Latitude</h3>
              <p class="text-gray-800 font-mono">{{ event.latitude }}</p>
            </div>
            <div>
              <h3 class="text-sm font-medium text-gray-600">Longitude</h3>
              <p class="text-gray-800 font-mono">{{ event.longitude }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Back Button -->
    <div class="mt-8">
      <button
        @click="$router.go(-1)"
        class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        ← Back to Events
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// This would normally come from a route parameter or API call
const event = ref({
  organizer: 'Tony Ray',
  organizerEmail: 'tonyray@mail.com',
  title: 'Australia Grand Hawk View',
  description: 'A spectacular view of the Australian landscape with majestic hawks soaring above. Join us for this unique experience in the heart of nature.',
  venueType: 'outdoor',
  slug: 'australia-grand-hawk-view',
  status: 'published',
  address: '123 Hawk View Road',
  city: 'Blue Mountains',
  state: 'NSW',
  country: 'Australia',
  zipCode: '2780',
  latitude: '-33.7128',
  longitude: '150.3119',
  imagePreview: 'https://images.unsplash.com/photo-1527004013197-933c9bb61180?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
});

const formatStatus = (status) => {
  const statusMap = {
    draft: 'Draft',
    published: 'Published',
    archived: 'Archived'
  };
  return statusMap[status] || status;
};
</script>

<style scoped>
/* Custom styles if needed */
</style>
