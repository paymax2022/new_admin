<template>
  <div class="container mx-auto px-4 py-8">
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <!-- Header with Search -->
      <div class="px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 class="text-2xl font-bold text-gray-800">Ratings</h1>
        </div>

        <div class="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search ratings..."
              class="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64"
              @input="handleSearch"
            />
            <div class="absolute left-3 top-2.5 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div class="text-sm text-gray-500 flex items-center">
            Show
            <select v-model="perPage" @change="updatePagination" class="mx-2 border rounded px-2 py-1 focus:ring-blue-500 focus:border-blue-500">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
            entries
          </div>
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NAME</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">RESTAURANT NAME</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">RATING</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">REVIEW</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ACTIONS</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="rating in paginatedRatings" :key="rating.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ rating.name }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ rating.restaurantName }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ rating.ratings }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ rating.review }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button class="text-red-500 hover:text-red-700" title="Delete">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                </button>
              </td>
            </tr>
            <tr v-if="filteredRatings.length === 0">
              <td colspan="5" class="px-6 py-4 text-center text-sm text-gray-500">No ratings found</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="text-sm text-gray-500">
          Showing <span class="font-medium">{{ pagination.startIndex + 1 }}</span> to <span class="font-medium">{{ pagination.endIndex }}</span> of
          <span class="font-medium">{{ filteredRatings.length }}</span> entries
        </div>

        <div class="flex items-center gap-1">
          <button @click="prevPage" :disabled="currentPage === 1"
                  class="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
                  :class="{ 'hover:bg-gray-50': currentPage !== 1 }">
            Previous
          </button>

          <button
            v-for="page in visiblePages"
            :key="page"
            @click="goToPage(page)"
            class="w-8 h-8 flex items-center justify-center border rounded"
            :class="{ 'bg-blue-500 text-white border-blue-500': page === currentPage, 'hover:bg-gray-50': page !== currentPage }">
            {{ page }}
          </button>

          <button @click="nextPage" :disabled="currentPage === totalPages"
                  class="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
                  :class="{ 'hover:bg-gray-50': currentPage !== totalPages }">
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

// Sample data
const Ratings = ref([
  { id: 1, name: 'Burger Man', restaurantName: 'Burger King', ratings: 5, review: 'Great food!' },
  { id: 2, name: 'Jane Doe', restaurantName: 'Mama Put', ratings: 4, review: 'Tasty meals!' },
  { id: 3, name: 'John Smith', restaurantName: 'Chicken Republic', ratings: 3, review: 'Decent experience.' },
  { id: 4, name: 'Mary Lou', restaurantName: 'The Dome', ratings: 5, review: 'Excellent!' },
  { id: 5, name: 'Luke Sky', restaurantName: 'Space Diner', ratings: 2, review: 'Could be better.' },
  { id: 6, name: 'Tony Stark', restaurantName: 'Shawarma Spot', ratings: 4, review: 'Pretty good.' },
  { id: 7, name: 'Bruce Wayne', restaurantName: 'Dark Kitchen', ratings: 5, review: 'Top notch!' },
  { id: 8, name: 'Clark Kent', restaurantName: 'Super Subs', ratings: 3, review: 'Okay-ish.' },
  { id: 9, name: 'Diana Prince', restaurantName: 'Amazon Grill', ratings: 5, review: 'Amazing flavor!' },
  { id: 10, name: 'Peter Parker', restaurantName: 'Web Cafe', ratings: 4, review: 'Nice atmosphere.' },
]);

const searchQuery = ref('');
const perPage = ref(5);
const currentPage = ref(1);

// Filtered list
const filteredRatings = computed(() => {
  if (!searchQuery.value) return Ratings.value;
  const query = searchQuery.value.toLowerCase();
  return Ratings.value.filter(
    (item) =>
      item.name.toLowerCase().includes(query) ||
      item.restaurantName.toLowerCase().includes(query) ||
      item.review.toLowerCase().includes(query)
  );
});

// Pagination
const totalPages = computed(() => Math.ceil(filteredRatings.value.length / perPage.value));

const pagination = computed(() => {
  const startIndex = (currentPage.value - 1) * perPage.value;
  const endIndex = Math.min(startIndex + perPage.value, filteredRatings.value.length);
  return { startIndex, endIndex };
});

const paginatedRatings = computed(() => {
  return filteredRatings.value.slice(pagination.value.startIndex, pagination.value.endIndex);
});

const visiblePages = computed(() => {
  const pages = [];
  const maxVisible = 5;
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages.value, start + maxVisible - 1);

  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
});

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

const updatePagination = () => {
  currentPage.value = 1;
};

const handleSearch = () => {
  currentPage.value = 1;
};

watch([searchQuery, perPage], () => {
  currentPage.value = 1;
});
</script>
