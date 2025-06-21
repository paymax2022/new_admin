<template>
  <div class="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
    <!-- Page Header -->
    <div class="mb-8 border-b pb-6">
      <h1 class="text-2xl font-bold text-gray-800">Banner Details</h1>
      <div class="flex items-center mt-2 text-sm text-gray-600">
        <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
          {{ banner.status === 'enabled' ? 'Active' : 'Inactive' }}
        </span>
        <span class="mx-2">•</span>
        <span>Created on {{ formatDate(banner.createdAt) }}</span>
      </div>
    </div>

    <!-- Banner Preview -->
    <div class="mb-8">
      <h2 class="text-lg font-semibold mb-3 text-gray-800">Banner Preview</h2>
      <div class="bg-gray-100 rounded-lg overflow-hidden h-48 flex items-center justify-center">
        <img
          v-if="banner.imageUrl"
          :src="banner.imageUrl"
          alt="Banner preview"
          class="h-full w-full object-cover"
        >
        <div v-else class="text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p class="mt-2 text-center">No banner image</p>
        </div>
      </div>
    </div>

    <!-- Banner Details -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div>
        <h2 class="text-lg font-semibold mb-3 text-gray-800">Banner Information</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-600">Banner URL</label>
            <div class="mt-1 p-2 bg-gray-50 rounded-md">
              <p class="text-gray-800">{{ banner.url || '/' }}</p>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-600">Sequence Number</label>
            <div class="mt-1 p-2 bg-gray-50 rounded-md">
              <p class="text-gray-800">{{ banner.sequence }}</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 class="text-lg font-semibold mb-3 text-gray-800">Status Information</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-600">Status</label>
            <div class="mt-1 p-2 bg-gray-50 rounded-md">
              <p class="text-gray-800 capitalize">{{ banner.status }}</p>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-600">Created At</label>
            <div class="mt-1 p-2 bg-gray-50 rounded-md">
              <p class="text-gray-800">{{ formatDateTime(banner.createdAt) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex justify-end space-x-4 border-t pt-6">
      <button
        @click="toggleStatus"
        class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {{ banner.status === 'enabled' ? 'Disable' : 'Enable' }}
      </button>
      <button
        @click="editBanner"
        class="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Edit Banner
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const banner = ref({
  imageUrl: 'https://images.unsplash.com/photo-1517840901100-8179e982acb7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  url: '/events',
  sequence: 2,
  status: 'enabled',
  createdAt: '2025-08-18 08:15:00'
});

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const formatDateTime = (dateString) => {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const toggleStatus = () => {
  banner.value.status = banner.value.status === 'enabled' ? 'disabled' : 'enabled';
};

const editBanner = () => {
  // Navigate to edit page or open modal
  router.push(`/banners/edit/1`); // Assuming you have a route for editing
};
</script>

<style scoped>
/* Custom styles if needed */
</style>
