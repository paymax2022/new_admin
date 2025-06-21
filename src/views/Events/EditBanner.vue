<template>
  <div class="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
    <!-- Page Header -->
    <div class="mb-8 border-b pb-6">
      <h1 class="text-2xl font-bold text-gray-800">Edit Banner</h1>
      <p class="mt-1 text-sm text-gray-600">Update the banner details below</p>
    </div>

    <!-- Banner Image Section -->
    <div class="mb-8">
      <label class="block text-sm font-medium text-gray-700 mb-2">Banner Image</label>
      <div class="flex flex-col md:flex-row gap-6">
        <!-- Current Banner Preview -->
        <div class="w-full md:w-1/2">
          <div class="bg-gray-100 rounded-lg overflow-hidden h-48 flex items-center justify-center">
            <img
              v-if="form.imageUrl"
              :src="form.imageUrl"
              alt="Current banner"
              class="h-full w-full object-cover"
            >
            <div v-else class="text-gray-400 text-center p-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p class="mt-2">No banner image set</p>
            </div>
          </div>
          <p class="mt-2 text-xs text-gray-500">Current banner</p>
        </div>

        <!-- Image Upload -->
        <div class="w-full md:w-1/2">
          <div class="border-2 border-dashed border-gray-300 rounded-lg h-48 flex flex-col items-center justify-center">
            <template v-if="!newImage">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p class="mt-2 text-sm text-gray-600">Upload a new image</p>
              <p class="mt-1 text-xs text-gray-500">PNG, JPG up to 5MB</p>
              <input
                type="file"
                @change="handleImageUpload"
                accept="image/*"
                class="hidden"
                ref="fileInput"
                id="banner-upload"
              >
              <label for="banner-upload" class="mt-3 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium text-gray-700 cursor-pointer transition">
                Select File
              </label>
            </template>
            <template v-else>
              <img :src="newImagePreview" alt="New banner preview" class="h-full w-full object-cover">
              <button
                @click="removeNewImage"
                class="mt-2 px-2 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded-md text-xs font-medium transition"
              >
                Remove
              </button>
            </template>
          </div>
          <p class="mt-2 text-xs text-gray-500">New banner preview</p>
        </div>
      </div>
    </div>

    <!-- Banner Details Form -->
    <div class="space-y-6">
      <!-- Banner URL -->
      <div>
        <label for="banner-url" class="block text-sm font-medium text-gray-700 mb-1">Banner URL</label>
        <div class="mt-1 relative rounded-md shadow-sm">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span class="text-gray-500 sm:text-sm">/</span>
          </div>
          <input
            type="text"
            id="banner-url"
            v-model="form.url"
            class="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
            placeholder="events"
          >
        </div>
      </div>

      <!-- Sequence Number -->
      <div>
        <label for="sequence-number" class="block text-sm font-medium text-gray-700 mb-1">Sequence Number</label>
        <input
          type="number"
          id="sequence-number"
          v-model.number="form.sequence"
          min="0"
          class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        >
        <p class="mt-1 text-xs text-gray-500">Lower numbers appear first (starting from 0)</p>
      </div>

      <!-- Status Toggle -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
        <div class="mt-1">
          <label class="inline-flex items-center cursor-pointer">
            <input type="checkbox" class="sr-only peer" v-model="form.status" true-value="enabled" false-value="disabled">
            <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            <span class="ml-3 text-sm font-medium text-gray-700 capitalize">{{ form.status }}</span>
          </label>
        </div>
      </div>

      <!-- Created At (Readonly) -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Created At</label>
        <div class="mt-1 p-2 bg-gray-50 rounded-md text-sm text-gray-800">
          {{ formatDateTime(form.createdAt) }}
        </div>
      </div>
    </div>

    <!-- Form Actions -->
    <div class="mt-8 flex justify-end space-x-4 border-t pt-6">
      <button
        @click="cancelEditing"
        type="button"
        class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Cancel
      </button>
      <button
        @click.prevent="saveChanges"
        type="submit"
        class="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        :disabled="isSaving"
      >
        <span v-if="isSaving">
          <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Saving...
        </span>
        <span v-else>Save Changes</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const form = ref({
  imageUrl: 'https://images.unsplash.com/photo-1517840901100-8179e982acb7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  url: 'events',
  sequence: 2,
  status: 'enabled',
  createdAt: '2025-08-18 08:15:00'
});

const newImage = ref(null);
const newImagePreview = ref(null);
const isSaving = ref(false);
const fileInput = ref(null);

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    // Validate file type and size
    if (!file.type.match('image.*')) {
      alert('Please select an image file');
      return;
    }
    if (file.size > 5 * 1024 * 1024) { // 5MB
      alert('Image size should be less than 5MB');
      return;
    }

    newImage.value = file;
    newImagePreview.value = URL.createObjectURL(file);
  }
};

const removeNewImage = () => {
  newImage.value = null;
  newImagePreview.value = null;
  fileInput.value.value = ''; // Reset file input
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

const saveChanges = async () => {
  isSaving.value = true;

  try {
    // Here you would typically send the data to your API
    // For demo purposes, we'll just simulate an API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // If using a new image, you would upload it first
    if (newImage.value) {
      // Upload logic would go here
      console.log('Uploading new image:', newImage.value.name);
      // After successful upload, update the imageUrl
      // form.value.imageUrl = newImageUrlFromServer;
    }

    console.log('Form data to save:', form.value);
    alert('Banner updated successfully!');
    router.push('/banners'); // Redirect to banners list after save
  } catch (error) {
    console.error('Error saving banner:', error);
    alert('Failed to update banner. Please try again.');
  } finally {
    isSaving.value = false;
  }
};

const cancelEditing = () => {
  if (confirm('Are you sure you want to discard your changes?')) {
    router.push('/banners');
  }
};
</script>

<style scoped>
/* Custom styles if needed */
</style>
