<template>
  <div class="container mx-auto p-4">
    <div class="bg-white rounded-lg shadow-md p-6">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">Banners</h1>
        <button
          @click="showAddModal = true"
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-200"
        >
          + Add Banner
        </button>
      </div>

      <!-- Banners Table -->
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                IMAGE
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                RESTAURANT
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                TITLE
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                STATUS
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="banner in banners" :key="banner.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <img
                  :src="banner.imageUrl"
                  :alt="banner.title"
                  class="h-12 w-12 object-cover rounded"
                >
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ banner.restaurant }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ banner.title }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="{
                    'bg-green-100 text-green-800': banner.status === 'Active',
                    'bg-red-100 text-red-800': banner.status === 'Inactive'
                  }"
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                >
                  {{ banner.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button
                  @click="editBanner(banner.id)"
                  class="text-indigo-600 hover:text-indigo-900 mr-3"
                >
                  Edit
                </button>
                <button
                  @click="deleteBanner(banner.id)"
                  class="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Add Banner Modal -->
      <div v-if="showAddModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div class="bg-white rounded-lg shadow-xl w-full max-w-md">
          <div class="p-6">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-semibold text-gray-800">Add New Banner</h3>
              <button @click="showAddModal = false" class="text-gray-400 hover:text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div class="space-y-4">
              <!-- Restaurant Selection -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">RESTAURANT *</label>
                <select
                  v-model="newBanner.restaurant"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" disabled selected>Select Restaurant</option>
                  <option v-for="restaurant in restaurants" :key="restaurant" :value="restaurant">
                    {{ restaurant }}
                  </option>
                </select>
              </div>

              <!-- Title -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">TITLE *</label>
                <input
                  v-model="newBanner.title"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter banner title"
                >
              </div>

              <!-- URL -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">URL</label>
                <input
                  v-model="newBanner.url"
                  type="url"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter destination URL"
                >
              </div>

              <!-- Status -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">STATUS *</label>
                <select
                  v-model="newBanner.status"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <!-- Description -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">DESCRIPTION</label>
                <textarea
                  v-model="newBanner.description"
                  rows="3"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter banner description"
                ></textarea>
              </div>

              <!-- Image Upload -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">IMAGE *</label>
                <div class="mt-1 flex items-center">
                  <label class="cursor-pointer">
                    <span class="inline-block px-4 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                      Choose file
                    </span>
                    <input
                      type="file"
                      @change="handleImageUpload"
                      required
                      class="sr-only"
                      accept="image/*"
                    />
                  </label>
                  <span class="ml-2 text-sm text-gray-500" v-if="!newBanner.imageFile">
                    No file chosen
                  </span>
                  <span class="ml-2 text-sm text-gray-500" v-else>
                    {{ newBanner.imageFile.name }}
                  </span>
                </div>
                <p class="mt-1 text-xs text-gray-500">
                  Recommended size: 1200x400 pixels
                </p>
              </div>
            </div>

            <div class="mt-6 flex justify-end space-x-3">
              <button
                @click="showAddModal = false"
                class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                @click="addBanner"
                class="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
                :disabled="isSubmitting"
              >
                <span v-if="!isSubmitting">Add Banner</span>
                <span v-else>Adding...</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

interface Banner {
  id: string;
  imageUrl: string;
  restaurant: string;
  title: string;
  url: string;
  status: 'Active' | 'Inactive';
  description: string;
}

// Mock data for restaurants
const restaurants = ref([
  "Sultan's Dine",
  "Mr Beast Burger",
  "Starbucks",
  "McDonalds",
  "Burger King",
  "Gustosa Pasta"
]);

// Mock data for banners
const banners = ref<Banner[]>([
  {
    id: '1',
    imageUrl: 'https://via.placeholder.com/1200x400?text=Sultan%27s+Dine',
    restaurant: "Sultan's Dine",
    title: 'Special Offer',
    url: 'https://example.com/sultans-dine',
    status: 'Active',
    description: 'Special discount for this week'
  },
  {
    id: '2',
    imageUrl: 'https://via.placeholder.com/1200x400?text=Mr+Beast+Burger',
    restaurant: 'Mr Beast Burger',
    title: 'New Menu',
    url: 'https://example.com/mr-beast-burger',
    status: 'Active',
    description: 'Try our new burger collection'
  },
  {
    id: '3',
    imageUrl: 'https://via.placeholder.com/1200x400?text=Starbucks',
    restaurant: 'Starbucks',
    title: 'Summer Special',
    url: 'https://example.com/starbucks',
    status: 'Active',
    description: 'New summer drinks available'
  },
  {
    id: '4',
    imageUrl: 'https://via.placeholder.com/1200x400?text=McDonalds',
    restaurant: 'McDonalds',
    title: 'Happy Meal',
    url: 'https://example.com/mcdonalds',
    status: 'Active',
    description: 'New toys in happy meals'
  },
  {
    id: '5',
    imageUrl: 'https://via.placeholder.com/1200x400?text=Burger+King',
    restaurant: 'Burger King',
    title: 'Whopper Deal',
    url: 'https://example.com/burger-king',
    status: 'Active',
    description: '50% off on whopper'
  },
  {
    id: '6',
    imageUrl: 'https://via.placeholder.com/1200x400?text=Gustosa+Pasta',
    restaurant: 'Gustosa Pasta',
    title: 'Pasta Week',
    url: 'https://example.com/gustosa-pasta',
    status: 'Active',
    description: 'All pasta dishes 20% off'
  }
]);

const showAddModal = ref(false);
const isSubmitting = ref(false);

const newBanner = reactive({
  restaurant: '',
  title: '',
  url: '',
  status: 'Active' as 'Active' | 'Inactive',
  description: '',
  imageFile: null as File | null
});

const handleImageUpload = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    newBanner.imageFile = input.files[0];
  }
};

const addBanner = async () => {
  if (!newBanner.restaurant || !newBanner.title || !newBanner.imageFile) {
    alert('Please fill all required fields');
    return;
  }

  isSubmitting.value = true;

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // In a real app, you would upload the image to a server and get a URL
    const imageUrl = URL.createObjectURL(newBanner.imageFile);

    const newId = (banners.value.length + 1).toString();
    banners.value.unshift({
      id: newId,
      imageUrl,
      restaurant: newBanner.restaurant,
      title: newBanner.title,
      url: newBanner.url,
      status: newBanner.status,
      description: newBanner.description
    });

    // Reset form
    newBanner.restaurant = '';
    newBanner.title = '';
    newBanner.url = '';
    newBanner.status = 'Active';
    newBanner.description = '';
    newBanner.imageFile = null;
    showAddModal.value = false;
  } catch (error) {
    console.error('Error adding banner:', error);
  } finally {
    isSubmitting.value = false;
  }
};

const editBanner = (id: string) => {
  console.log('Edit banner:', id);
  // In a real app, you would open an edit modal or navigate to edit view
};

const deleteBanner = (id: string) => {
  if (confirm('Are you sure you want to delete this banner?')) {
    banners.value = banners.value.filter(banner => banner.id !== id);
  }
};
</script>
