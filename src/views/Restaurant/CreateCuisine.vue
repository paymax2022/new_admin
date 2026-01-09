<template>
    <div class="px-28 py-10 bg-white rounded-lg shadow-md">
        <h1 class="text-2xl font-bold mb-6">Add Cuisine</h1>

        <form @submit.prevent="submitForm" class="space-y-4">
            <!-- Restaurant Selection -->
            <div>
                <label for="restaurant" class="block text-sm font-medium text-gray-700">
                    RESTAURANT <span class="text-red-500">*</span>
                </label>
                <select id="restaurant" v-model="formData.restaurantId" required :disabled="loadingRestaurants"
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                    <option value="">Select a restaurant</option>
                    <option v-for="restaurant in restaurants" :key="restaurant._id" :value="restaurant._id">
                        {{ restaurant.name }}
                    </option>
                </select>
            </div>

            <!-- Name Field -->
            <div>
                <label for="name" class="block text-sm font-medium text-gray-700">
                    NAME <span class="text-red-500">*</span>
                </label>
                <input type="text" id="name" v-model="formData.name" required
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter cuisine name" />
            </div>

            <!-- Submit Button -->
            <div class="pt-4">
                <button type="submit" :disabled="loading"
                    class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed">
                    <span v-if="loading" class="inline-flex items-center">
                        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                            </circle>
                            <path class="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                            </path>
                        </svg>
                        Creating...
                    </span>
                    <span v-else>Add Cuisine</span>
                </button>
            </div>
        </form>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { restaurantService } from '@/services/restaurantService';
import { useToast } from 'vue-toastification';

interface FormData {
    restaurantId: string;
    name: string;
}

interface Restaurant {
    _id: string;
    name: string;
}

const router = useRouter();
const route = useRoute();
const toast = useToast();
const loading = ref(false);
const loadingRestaurants = ref(false);
const restaurants = ref<Restaurant[]>([]);

const formData = ref<FormData>({
    restaurantId: '',
    name: ''
});

// Fetch restaurants list
onMounted(async () => {
    try {
        loadingRestaurants.value = true;
        const response = await restaurantService.getAllRestaurants(100, 1);
        // Handle different response structures
        const restaurantsData = response.data?.data || response.data || response;
        restaurants.value = Array.isArray(restaurantsData) ? restaurantsData : [];
    } catch (error: any) {
        console.error('Error fetching restaurants:', error);
        toast.error('Failed to load restaurants');
    } finally {
        loadingRestaurants.value = false;
    }
});

const submitForm = async () => {
    if (!formData.value.restaurantId) {
        toast.error('Please select a restaurant');
        return;
    }

    loading.value = true;

    try {
        // Send only name field as JSON
        const cuisineData = {
            name: formData.value.name
        };

        await restaurantService.createCuisine(formData.value.restaurantId, cuisineData);

        toast.success('Cuisine created successfully');

        // Reset form after successful submission
        formData.value = {
            restaurantId: '',
            name: ''
        };

        // Navigate back to cuisines list
        router.push({ name: 'restaurantCuisines' });
    } catch (error: any) {
        console.error('Error creating cuisine:', error);
        const errorMessage = error.response?.data?.message || 'Failed to create cuisine';
        toast.error(errorMessage);
    } finally {
        loading.value = false;
    }
};
</script>
