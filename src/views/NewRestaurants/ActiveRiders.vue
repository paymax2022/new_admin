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
            <div class="divide-y divide-gray-200">
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
import { ref, computed } from 'vue';

const searchQuery = ref('');
const currentPage = ref(1);
const ridersPerPage = ref(10);

const allRiders = ref([
    {
        id: 1,
        name: 'Carlos Rodriguez',
        location: 'Aja, Lagos',
        rating: '4.8',
        deliveries: '1247',
        vehicleType: 'Bike',
        avgTime: '18m',
        status: 'Available'
    },
    {
        id: 2,
        name: 'Carlos Rodriguez',
        location: 'Aja, Lagos',
        rating: '4.8',
        deliveries: '1247',
        vehicleType: 'Bike',
        avgTime: '18m',
        status: 'Available'
    },
    {
        id: 3,
        name: 'Carlos Rodriguez',
        location: 'Aja, Lagos',
        rating: '4.8',
        deliveries: '1247',
        vehicleType: 'Bike',
        avgTime: '18m',
        status: 'Available'
    },
    {
        id: 4,
        name: 'Carlos Rodriguez',
        location: 'Aja, Lagos',
        rating: '4.8',
        deliveries: '1247',
        vehicleType: 'Bike',
        avgTime: '18m',
        status: 'Available'
    },
    {
        id: 5,
        name: 'Carlos Rodriguez',
        location: 'Aja, Lagos',
        rating: '4.8',
        deliveries: '1247',
        vehicleType: 'Bike',
        avgTime: '18m',
        status: 'Available'
    },
    {
        id: 6,
        name: 'Carlos Rodriguez',
        location: 'Aja, Lagos',
        rating: '4.8',
        deliveries: '1247',
        vehicleType: 'Bike',
        avgTime: '18m',
        status: 'Available'
    },
    {
        id: 7,
        name: 'Carlos Rodriguez',
        location: 'Aja, Lagos',
        rating: '4.8',
        deliveries: '1247',
        vehicleType: 'Bike',
        avgTime: '18m',
        status: 'Available'
    }
]);

const filteredRiders = computed(() => {
    let filtered = allRiders.value;

    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(
            (rider) =>
                rider.name.toLowerCase().includes(query) ||
                rider.location.toLowerCase().includes(query)
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

