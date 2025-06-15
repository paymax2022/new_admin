<template>
  <div class="container mx-auto p-4">
    <div class="bg-white rounded-lg shadow-md p-6">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">Push Notifications</h1>
        <button
          @click="showAddModal = true"
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-200"
        >
          + Add Push Notification
        </button>
      </div>

      <!-- Controls Row -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <div class="text-sm text-gray-600">
          <select
            v-model="perPage"
            @change="resetPagination"
            class="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="10">10 entries per page</option>
            <option value="25">25 entries per page</option>
            <option value="50">50 entries per page</option>
          </select>
        </div>

        <div class="relative w-full sm:w-64">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search notifications..."
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
          <div class="absolute left-3 top-2.5 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Type Filter -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-2">Filter by Type:</label>
        <div class="flex flex-wrap gap-3">
          <button
            v-for="type in notificationTypes"
            :key="type.value"
            @click="toggleTypeFilter(type.value)"
            :class="{
              'bg-blue-600 text-white': activeTypeFilters.includes(type.value),
              'bg-gray-100 text-gray-700 hover:bg-gray-200': !activeTypeFilters.includes(type.value)
            }"
            class="px-3 py-1 rounded-md text-sm font-medium transition"
          >
            {{ type.label }}
          </button>
        </div>
      </div>

      <!-- Notifications List -->
      <div class="space-y-4">
        <div
          v-for="notification in paginatedNotifications"
          :key="notification.id"
          class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
        >
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-gray-800 mb-1">{{ notification.title }}</h3>
              <p class="text-gray-600 text-sm line-clamp-2">{{ notification.description }}</p>
            </div>
            <div class="flex flex-col sm:flex-row sm:items-center gap-3 text-sm">
              <span class="bg-gray-100 text-gray-700 px-2 py-1 rounded">
                {{ notification.type }}
              </span>
              <div class="flex gap-2">
                <button
                  @click="editNotification(notification.id)"
                  class="text-indigo-600 hover:text-indigo-900"
                >
                  Edit
                </button>
                <button
                  @click="deleteNotification(notification.id)"
                  class="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          v-if="filteredNotifications.length === 0"
          class="border border-gray-200 rounded-lg p-8 text-center"
        >
          <p class="text-gray-500">No notifications found</p>
        </div>
      </div>

      <!-- Pagination -->
      <div class="flex flex-col sm:flex-row items-center justify-between mt-6 px-2 py-3 bg-white border-t border-gray-200">
        <div class="text-sm text-gray-700 mb-4 sm:mb-0">
          Showing <span class="font-medium">{{ pagination.startIndex + 1 }}</span> to
          <span class="font-medium">{{ pagination.endIndex }}</span> of
          <span class="font-medium">{{ filteredNotifications.length }}</span> entries
        </div>

        <div class="flex space-x-1">
          <button
            @click="prevPage"
            :disabled="pagination.currentPage === 1"
            :class="{
              'cursor-not-allowed bg-gray-100': pagination.currentPage === 1,
              'hover:bg-gray-100': pagination.currentPage > 1
            }"
            class="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium"
          >
            Previous
          </button>

          <button
            v-for="page in visiblePages"
            :key="page"
            @click="goToPage(page)"
            :class="{
              'bg-blue-600 text-white': page === pagination.currentPage,
              'hover:bg-gray-100': page !== pagination.currentPage
            }"
            class="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium"
          >
            {{ page }}
          </button>

          <button
            @click="nextPage"
            :disabled="pagination.currentPage === pagination.totalPages"
            :class="{
              'cursor-not-allowed bg-gray-100': pagination.currentPage === pagination.totalPages,
              'hover:bg-gray-100': pagination.currentPage < pagination.totalPages
            }"
            class="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium"
          >
            Next
          </button>
        </div>
      </div>
    </div>

    <!-- Add Notification Modal -->
    <div v-if="showAddModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold text-gray-800">Add Push Notification</h3>
            <button @click="showAddModal = false" class="text-gray-400 hover:text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="space-y-4">
            <!-- Restaurant Selection -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">RESTAURANT</label>
              <select
                v-model="newNotification.restaurantId"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled selected>Select Restaurant</option>
                <option v-for="restaurant in restaurants" :key="restaurant.id" :value="restaurant.id">
                  {{ restaurant.name }}
                </option>
              </select>
            </div>

            <!-- Customer Selection -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">SELECT CUSTOMER</label>
              <select
                v-model="newNotification.customerType"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Customer</option>
                <option value="specific">Specific Customers</option>
                <option value="segment">Customer Segment</option>
              </select>
            </div>

            <!-- Description -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">DESCRIPTION <span class="text-red-500">*</span></label>
              <textarea
                v-model="newNotification.description"
                rows="4"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter notification description"
              ></textarea>
            </div>

            <div class="border-t border-gray-200 pt-4">
              <!-- Title -->
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">TITLE <span class="text-red-500">*</span></label>
                <input
                  type="text"
                  v-model="newNotification.title"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter notification title"
                />
              </div>

              <!-- Image Upload -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">IMAGE</label>
                <div class="mt-1 flex items-center">
                  <label class="cursor-pointer">
                    <span class="inline-block px-4 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                      Choose file
                    </span>
                    <input
                      type="file"
                      @change="handleFileUpload"
                      class="sr-only"
                      accept="image/*"
                    />
                  </label>
                  <span class="ml-2 text-sm text-gray-500" v-if="!newNotification.imageFile">
                    No file chosen
                  </span>
                  <span class="ml-2 text-sm text-gray-500" v-else>
                    {{ newNotification.imageFile.name }}
                  </span>
                </div>
              </div>
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
              @click="addNotification"
              class="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
              :disabled="isSubmitting"
            >
              <span v-if="!isSubmitting">Send Notification</span>
              <span v-else>Sending...</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';

interface Restaurant {
  id: string;
  name: string;
}

interface PushNotification {
  id: string;
  restaurantId?: string;
  customerType: string;
  title: string;
  description: string;
  type: string;
  imageFile?: File;
  createdAt: string;
}

const notificationTypes = [
  { value: 'all', label: 'All Customers' },
  { value: 'promo', label: 'Promotional' },
  { value: 'update', label: 'System Update' },
  { value: 'alert', label: 'Alert' },
];

// Mock data
const restaurants = ref<Restaurant[]>([
  { id: '1', name: 'Main Restaurant' },
  { id: '2', name: 'Downtown Location' },
  { id: '3', name: 'Uptown Bistro' },
]);

const notifications = ref<PushNotification[]>([
  {
    id: '1',
    title: 'Chicken Burger 10% Off',
    description: 'Our chicken burger is now available at a special discount price for a limited time only!',
    type: 'promo',
    customerType: 'all',
    createdAt: '2025-06-10'
  },
  {
    id: '2',
    title: 'System Maintenance',
    description: 'We will be performing scheduled maintenance on June 15 from 2-4 AM. The app may be unavailable during this time.',
    type: 'update',
    customerType: 'all',
    createdAt: '2025-06-05'
  },
]);

const searchQuery = ref('');
const perPage = ref(10);
const activeTypeFilters = ref<string[]>(['all']);
const showAddModal = ref(false);
const isSubmitting = ref(false);

const newNotification = reactive({
  restaurantId: '',
  customerType: 'all',
  title: '',
  description: '',
  type: 'promo',
  imageFile: undefined as File | undefined
});

const pagination = reactive({
  currentPage: 1,
  totalPages: computed(() => Math.ceil(filteredNotifications.value.length / perPage.value)),
  startIndex: computed(() => (pagination.currentPage - 1) * perPage.value),
  endIndex: computed(() => Math.min(pagination.currentPage * perPage.value, filteredNotifications.value.length))
});

const filteredNotifications = computed(() => {
  let filtered = notifications.value;

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(notification =>
      notification.title.toLowerCase().includes(query) ||
      notification.description.toLowerCase().includes(query)
    );
  }

  // Apply type filter
  if (!activeTypeFilters.value.includes('all')) {
    filtered = filtered.filter(notification =>
      activeTypeFilters.value.includes(notification.type)
    );
  }

  return filtered;
});

const paginatedNotifications = computed(() => {
  return filteredNotifications.value.slice(
    pagination.startIndex,
    pagination.currentPage * perPage.value
  );
});

const visiblePages = computed(() => {
  const maxVisiblePages = 5;
  const pages = [];
  let startPage = Math.max(1, pagination.currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = startPage + maxVisiblePages - 1;

  if (endPage > pagination.totalPages) {
    endPage = pagination.totalPages;
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return pages;
});

const handleFileUpload = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    newNotification.imageFile = input.files[0];
  }
};

const toggleTypeFilter = (type: string) => {
  if (type === 'all') {
    activeTypeFilters.value = ['all'];
  } else {
    const index = activeTypeFilters.value.indexOf(type);
    if (index > -1) {
      activeTypeFilters.value.splice(index, 1);
      if (activeTypeFilters.value.length === 0) {
        activeTypeFilters.value = ['all'];
      }
    } else {
      const allIndex = activeTypeFilters.value.indexOf('all');
      if (allIndex > -1) {
        activeTypeFilters.value.splice(allIndex, 1);
      }
      activeTypeFilters.value.push(type);
    }
  }
  resetPagination();
};

const resetPagination = () => {
  pagination.currentPage = 1;
};

const prevPage = () => {
  if (pagination.currentPage > 1) {
    pagination.currentPage--;
  }
};

const nextPage = () => {
  if (pagination.currentPage < pagination.totalPages) {
    pagination.currentPage++;
  }
};

const goToPage = (page: number) => {
  if (page >= 1 && page <= pagination.totalPages) {
    pagination.currentPage = page;
  }
};

const addNotification = async () => {
  if (!newNotification.title || !newNotification.description) return;

  isSubmitting.value = true;

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newId = (notifications.value.length + 1).toString();
    notifications.value.unshift({
      id: newId,
      restaurantId: newNotification.restaurantId,
      customerType: newNotification.customerType,
      title: newNotification.title,
      description: newNotification.description,
      type: newNotification.type,
      createdAt: new Date().toISOString().split('T')[0]
    });

    // Reset form
    newNotification.restaurantId = '';
    newNotification.customerType = 'all';
    newNotification.title = '';
    newNotification.description = '';
    newNotification.type = 'promo';
    newNotification.imageFile = undefined;
    showAddModal.value = false;
    resetPagination();
  } catch (error) {
    console.error('Error adding notification:', error);
  } finally {
    isSubmitting.value = false;
  }
};

const editNotification = (id: string) => {
  console.log('Edit notification:', id);
};

const deleteNotification = (id: string) => {
  notifications.value = notifications.value.filter(n => n.id !== id);
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
