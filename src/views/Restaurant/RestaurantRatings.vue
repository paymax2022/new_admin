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
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CUSTOMER ID</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">RESTAURANT NAME</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">RATING</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DATE</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ACTIONS</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-if="loading">
              <td colspan="5" class="px-6 py-4 text-center text-sm text-gray-500">Loading ratings...</td>
            </tr>
            <tr v-else-if="filteredRatings.length === 0">
              <td colspan="5" class="px-6 py-4 text-center text-sm text-gray-500">No ratings found</td>
            </tr>
            <tr v-else v-for="rating in paginatedRatings" :key="rating.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ rating.customer_id || 'N/A' }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ rating.restaurantName || 'Loading...' }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div class="flex items-center gap-1">
                  <span>{{ rating.rating }}</span>
                  <span class="text-yellow-500">★</span>
                </div>
                <div class="text-xs text-gray-400 mt-1">
                  Food: {{ rating.food_quality }} | Service: {{ rating.service_speed }} | Value: {{ rating.value_for_money }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ formatDate(rating.created_at) }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button class="text-red-500 hover:text-red-700" title="Delete">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                </button>
              </td>
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

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useToast } from 'vue-toastification';
import { restaurantService } from '@/services/restaurantService';

const toast = useToast();
const loading = ref(false);

interface Rating {
    id: string;
    restaurant_id: string;
    customer_id: string;
    order_id: string;
    rating: number;
    food_quality: number;
    service_speed: number;
    value_for_money: number;
    created_at: string;
    updated_at: string;
    restaurantName?: string;
}

const Ratings = ref<Rating[]>([]);
const restaurantNames = ref<Record<string, string>>({});

const searchQuery = ref('');
const perPage = ref(5);
const currentPage = ref(1);

// Fetch restaurant name for a rating
const fetchRestaurantName = async (restaurantId: string) => {
    if (restaurantNames.value[restaurantId]) {
        return restaurantNames.value[restaurantId];
    }

    try {
        const response = await restaurantService.getRestaurantById(restaurantId);
        let restaurantData;
        
        if (response?.data) {
            restaurantData = response.data;
        } else if (response?._id) {
            restaurantData = response;
        }
        
        if (restaurantData && restaurantData.name) {
            restaurantNames.value[restaurantId] = restaurantData.name;
            // Update the rating in the list
            const rating = Ratings.value.find(r => r.restaurant_id === restaurantId);
            if (rating) {
                rating.restaurantName = restaurantData.name;
            }
            return restaurantData.name;
        }
    } catch (error) {
        console.error(`Error fetching restaurant ${restaurantId}:`, error);
        restaurantNames.value[restaurantId] = 'Unknown Restaurant';
        return 'Unknown Restaurant';
    }
    
    return 'Loading...';
};

// Fetch all restaurants with pagination
const fetchAllRestaurants = async (): Promise<any[]> => {
    const allRestaurants: any[] = [];
    let page = 1;
    const limit = 100;
    let hasMore = true;

    while (hasMore) {
        try {
            const response = await restaurantService.getAllRestaurants(limit, page);
            let restaurantsList: any[] = [];
            
            // Handle different response structures
            if (response?.data?.data?.data && Array.isArray(response.data.data.data)) {
                restaurantsList = response.data.data.data;
            } else if (response?.data?.data && Array.isArray(response.data.data)) {
                restaurantsList = response.data.data;
            } else if (Array.isArray(response?.data)) {
                restaurantsList = response.data;
            } else if (Array.isArray(response)) {
                restaurantsList = response;
            }
            
            if (restaurantsList.length === 0) {
                hasMore = false;
            } else {
                allRestaurants.push(...restaurantsList);
                // If we got fewer results than the limit, we've reached the end
                if (restaurantsList.length < limit) {
                    hasMore = false;
                } else {
                    page++;
                }
            }
        } catch (error) {
            console.error(`Error fetching restaurants page ${page}:`, error);
            hasMore = false;
        }
    }

    return allRestaurants;
};

// Fetch all ratings from all restaurants
const fetchAllRatings = async () => {
    try {
        loading.value = true;
        
        // First, get all restaurants
        const restaurantsList = await fetchAllRestaurants();
        
        if (restaurantsList.length === 0) {
            toast.warning('No restaurants found');
            Ratings.value = [];
            return;
        }

        console.log(`Found ${restaurantsList.length} restaurants, fetching ratings...`);
        
        // Create a map of restaurant ID to name for quick lookup
        const restaurantMap = new Map<string, string>();
        restaurantsList.forEach((restaurant: any) => {
            const id = restaurant._id || restaurant.id;
            const name = restaurant.name || `Restaurant ${id?.substring(0, 8)}`;
            if (id) {
                restaurantMap.set(id, name);
            }
        });
        
        // Fetch ratings for each restaurant in parallel (with concurrency limit)
        const allRatings: Rating[] = [];
        const restaurantIds = Array.from(restaurantMap.keys());
        
        // Process in batches to avoid overwhelming the API
        const batchSize = 10;
        for (let i = 0; i < restaurantIds.length; i += batchSize) {
            const batch = restaurantIds.slice(i, i + batchSize);
            const batchPromises = batch.map(async (restaurantId) => {
                try {
                    // Fetch all ratings for this restaurant (use high limit to get all)
                    const ratingsResponse = await restaurantService.getRestaurantRatings(restaurantId, 1000, 0);
                    
                    let ratings: any[] = [];
                    if (ratingsResponse?.data && Array.isArray(ratingsResponse.data)) {
                        ratings = ratingsResponse.data;
                    } else if (Array.isArray(ratingsResponse)) {
                        ratings = ratingsResponse;
                    }
                    
                    return ratings.map((rating: any) => ({
                        ...rating,
                        id: rating._id || rating.id || `${restaurantId}-${rating.created_at}`,
                        restaurantName: restaurantMap.get(restaurantId) || 'Unknown Restaurant'
                    }));
                } catch (error) {
                    console.error(`Error fetching ratings for restaurant ${restaurantId}:`, error);
                    return [];
                }
            });
            
            const batchResults = await Promise.all(batchPromises);
            batchResults.forEach(ratings => {
                allRatings.push(...ratings);
            });
        }
        
        Ratings.value = allRatings;
        toast.success(`Loaded ${allRatings.length} ratings from ${restaurantIds.length} restaurants`);
    } catch (error: any) {
        console.error('Error fetching ratings:', error);
        toast.error('Failed to load ratings');
        Ratings.value = [];
    } finally {
        loading.value = false;
    }
};

const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    } catch {
        return dateString;
    }
};

// Filtered list
const filteredRatings = computed(() => {
  if (!searchQuery.value) return Ratings.value;
  const query = searchQuery.value.toLowerCase();
  return Ratings.value.filter(
    (item) =>
      (item.customer_id || '').toLowerCase().includes(query) ||
      (item.restaurantName || '').toLowerCase().includes(query) ||
      item.rating.toString().includes(query)
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

onMounted(() => {
  fetchAllRatings();
});
</script>
