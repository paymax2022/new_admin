<template>
    <div class="p-6 bg-gray-50 min-h-screen">
        <!-- Header Section -->
        <div class="mb-6">
            <h1 class="text-3xl font-bold text-gray-900 mb-2">Active Riders</h1>
            <div class="relative max-w-md mb-4">
                <input
                    type="text"
                    placeholder="Search res, name, ID..."
                    v-model="searchQuery"
                    class="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                <svg class="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-2 text-sm text-gray-600">
                    <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                    <span>Active Riders</span>
                </div>
                <a href="#" class="text-sm text-blue-600 hover:text-blue-700">See all</a>
            </div>
        </div>

        <!-- Riders List -->
        <div class="bg-white border border-gray-200 rounded-lg overflow-hidden mb-6">
            <div v-if="loading" class="px-6 py-8 text-center text-gray-500">
                <div class="flex items-center justify-center">
                    <svg class="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span class="ml-3">Loading riders...</span>
                </div>
            </div>
            <div v-else-if="allRiders.length === 0" class="px-6 py-8 text-center text-gray-500">
                No online riders found
            </div>
            <div v-else class="divide-y divide-gray-200">
                <div v-for="rider in paginatedRiders" :key="rider.id" class="flex items-center gap-4 px-6 py-4 hover:bg-gray-50">
                    <!-- Profile Picture -->
                    <div class="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                        <svg class="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                        </svg>
                    </div>
                    <!-- Rider Info -->
                    <div class="flex-1">
                        <div class="flex items-center gap-2 mb-1">
                            <p class="text-sm font-bold text-gray-900">{{ rider.name }}</p>
                            <div class="flex items-center gap-1">
                                <svg class="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span class="text-sm text-gray-900">{{ rider.rating }}</span>
                            </div>
                        </div>
                        <p class="text-sm text-gray-600 mb-2">{{ rider.location }}</p>
                        <div class="flex items-center gap-4 text-sm text-gray-600">
                            <span>{{ rider.deliveries }} deliveries</span>
                            <span>{{ rider.vehicleType }}</span>
                            <span>{{ rider.avgTime }} avg</span>
                        </div>
                    </div>
                    <!-- Status -->
                    <div>
                        <span
                            :class="[
                                'text-xs font-medium px-2 py-1 rounded',
                                rider.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                            ]"
                        >
                            {{ rider.status }}
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Pagination -->
        <div class="flex items-center justify-center">
            <div class="flex items-center gap-2">
                <button
                    @click="currentPage = Math.max(1, currentPage - 1)"
                    :disabled="currentPage === 1"
                    :class="[
                        'px-3 py-1 rounded border',
                        currentPage === 1
                            ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    ]"
                >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button
                    v-for="page in [1, 2, 3, 4, 5]"
                    :key="page"
                    @click="currentPage = page"
                    :class="[
                        'px-3 py-1 rounded border text-sm',
                        currentPage === page
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    ]"
                >
                    {{ page }}
                </button>
                <span v-if="totalPages > 5" class="px-2 text-gray-500">...</span>
                <button
                    v-if="totalPages > 5"
                    @click="currentPage = totalPages"
                    :class="[
                        'px-3 py-1 rounded border text-sm',
                        currentPage === totalPages
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    ]"
                >
                    {{ totalPages }}
                </button>
                <button
                    @click="currentPage = Math.min(totalPages, currentPage + 1)"
                    :disabled="currentPage === totalPages"
                    :class="[
                        'px-3 py-1 rounded border',
                        currentPage === totalPages
                            ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    ]"
                >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { restaurantService } from '@/services/restaurantService';
import { useToast } from 'vue-toastification';

const toast = useToast();
const searchQuery = ref('');
const currentPage = ref(1);
const ridersPerPage = ref(10);
const loading = ref(false);

const allRiders = ref<any[]>([]);

// Transform API rider data to component format
const transformRiderData = (apiRider: any) => {
    const fullName = `${apiRider.first_name || ''} ${apiRider.last_name || ''}`.trim() || 'Unknown Rider';
    const location = apiRider.local_district || apiRider.address || apiRider.state || 'N/A';
    const vehicleType = apiRider.vehicle_type || apiRider.transport_mode || 'N/A';
    
    return {
        id: apiRider._id || apiRider.id || 'N/A',
        name: fullName,
        location: location,
        rating: '4.8', // Default rating - API doesn't provide this
        deliveries: '0', // Default deliveries - API doesn't provide this
        vehicleType: vehicleType,
        avgTime: '18m', // Default avg time - API doesn't provide this
        status: apiRider.status === 'online' ? 'Available' : 'On Delivery',
        _original: apiRider
    };
};

// Fetch all online riders
const fetchAllRiders = async () => {
    loading.value = true;
    try {
        const response = await restaurantService.getRiders('online');
        const ridersData = response.data?.riders || response.riders || [];
        
        if (Array.isArray(ridersData)) {
            allRiders.value = ridersData.map(transformRiderData);
        } else {
            allRiders.value = [];
        }
        
        if (allRiders.value.length === 0) {
            toast.info('No online riders found');
        } else {
            toast.success(`Loaded ${allRiders.value.length} online rider(s)`);
        }
    } catch (error: any) {
        console.error('Error fetching riders:', error);
        const errorMessage = error.response?.data?.message || 'Failed to load riders';
        toast.error(errorMessage);
        allRiders.value = [];
    } finally {
        loading.value = false;
    }
};

// Fetch riders on mount
onMounted(() => {
    fetchAllRiders();
});

const filteredRiders = computed(() => {
    let filtered = allRiders.value;

    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(
            (rider) =>
                rider.name.toLowerCase().includes(query) ||
                rider.location.toLowerCase().includes(query) ||
                rider.id.toLowerCase().includes(query)
        );
    }

    return filtered;
});

const totalPages = computed(() => Math.ceil(filteredRiders.value.length / ridersPerPage.value));

const paginatedRiders = computed(() => {
    const startIndex = (currentPage.value - 1) * ridersPerPage.value;
    const endIndex = startIndex + ridersPerPage.value;
    return filteredRiders.value.slice(startIndex, endIndex);
});
</script>

