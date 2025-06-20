<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      <h1 class="text-2xl font-bold">Banners</h1>
      <div class="flex flex-wrap gap-2">
        <button class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
          Add New
        </button>
        <button class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
          Bulk Delete
        </button>
        <button class="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
          </svg>
          Order
        </button>
      </div>
    </div>

    <div class="mb-4 flex justify-between items-center">
      <div class="text-sm text-gray-600">
        Show
        <select v-model="entriesPerPage" class="mx-1 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
        entries
      </div>
    </div>

    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Banner URL</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sequence</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated At</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="banner in paginatedBanners" :key="banner.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="h-16 w-32 bg-gray-200 rounded flex items-center justify-center overflow-hidden">
                  <span v-if="!banner.image" class="text-gray-400 text-sm">No image</span>
                  <img v-else :src="banner.image" :alt="banner.url" class="h-full w-full object-cover">
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-blue-600 underline">
                <a :href="banner.url" target="_blank">{{ banner.url }}</a>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ banner.sequence }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <span :class="banner.status === 'Enabled' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
                      class="px-2 py-1 text-xs font-medium rounded-full">
                  {{ banner.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ formatDateTime(banner.updatedAt) }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium flex items-center space-x-3">
                <button @click="viewBanner(banner)" class="text-blue-600 hover:text-blue-900">
                  View
                </button>
                <button @click="editBanner(banner)" class="text-indigo-600 hover:text-indigo-900">
                  Edit
                </button>
                <button @click="deleteBanner(banner)" class="text-red-600 hover:text-red-900">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="flex flex-col sm:flex-row justify-between items-center mt-4">
      <div class="text-sm text-gray-600 mb-2 sm:mb-0">
        Showing {{ startEntry }} to {{ endEntry }} of {{ banners.length }} entries
      </div>
      <div class="flex space-x-2">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          :class="{'opacity-50 cursor-not-allowed': currentPage === 1}"
          class="px-3 py-1 border rounded hover:bg-gray-100"
        >
          Previous
        </button>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          :class="{'opacity-50 cursor-not-allowed': currentPage === totalPages}"
          class="px-3 py-1 border rounded hover:bg-gray-100"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface Banner {
  id: number;
  image?: string;
  url: string;
  sequence: number;
  status: 'Enabled' | 'Disabled';
  updatedAt: string;
}

const banners = ref<Banner[]>([
  { id: 1, url: '/events', sequence: 2, status: 'Enabled', updatedAt: '2025-05-27 07:21:01' },
  { id: 2, url: '/events', sequence: 1, status: 'Enabled', updatedAt: '2025-05-27 06:56:49' }
]);

// Pagination
const entriesPerPage = ref(10);
const currentPage = ref(1);

const totalPages = computed(() => Math.ceil(banners.value.length / entriesPerPage.value));
const paginatedBanners = computed(() => {
  const start = (currentPage.value - 1) * entriesPerPage.value;
  const end = start + entriesPerPage.value;
  return banners.value.slice(start, end);
});
const startEntry = computed(() => (currentPage.value - 1) * entriesPerPage.value + 1);
const endEntry = computed(() => Math.min(currentPage.value * entriesPerPage.value, banners.value.length));

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};
const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const formatDateTime = (dateTime: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(dateTime).toLocaleString('en-US', options);
};

const viewBanner = (banner: Banner) => {
  console.log('Viewing banner:', banner.id);
  // Navigate to view page or show modal
};

const editBanner = (banner: Banner) => {
  console.log('Editing banner:', banner.id);
  // Navigate to edit page or show modal
};

const deleteBanner = (banner: Banner) => {
  console.log('Deleting banner:', banner.id);
  // Show confirmation and delete
};
</script>

<style scoped>
@media (max-width: 1024px) {
  table {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }
}
</style>
