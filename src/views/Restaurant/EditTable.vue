<template>
    <div class="p-6 mx-10 bg-white rounded-lg shadow-md">
        <h1 class="text-2xl font-bold mb-6 text-gray-800">Edit Table</h1>

        <form @submit.prevent="handleSubmit" class="space-y-4">
            <div>
                <label for="name" class="block text-sm font-medium text-gray-700 mb-1"> RESTAURANT NAME <span class="text-red-500">*</span> </label>
                <input
                    type="text"
                    id="name"
                    v-model="form.name"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter restaurant name"
                />
                <span v-if="errors.name" class="text-red-500 text-xs">{{ errors.name }}</span>
            </div>

            <div>
                <label for="name" class="block text-sm font-medium text-gray-700 mb-1"> NAME <span class="text-red-500">*</span> </label>
                <input
                    type="text"
                    id="name"
                    v-model="form.restaurant"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter restaurant name"
                />
                <span v-if="errors.name" class="text-red-500 text-xs">{{ errors.restaurant }}</span>
            </div>
            <div>
                <label for="capacity" class="block text-sm font-medium text-gray-700 mb-1"> CAPACITY <span class="text-red-500">*</span> </label>
                <input
                    type="number"
                    id="capacity"
                    v-model="form.capacity"
                    required
                    min="1"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter capacity"
                />
                <span v-if="errors.capacity" class="text-red-500 text-xs">{{ errors.capacity }}</span>
            </div>

            <div>
                <label for="status" class="block text-sm font-medium text-gray-700 mb-1"> STATUS <span class="text-red-500">*</span> </label>
                <select
                    id="status"
                    v-model="form.status"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="" disabled selected>Select status</option>
                    <option value="open">Open</option>
                    <option value="closed">Closed</option>
                    <option value="renovation">Under Renovation</option>
                </select>
                <span v-if="errors.status" class="text-red-500 text-xs">{{ errors.status }}</span>
            </div>

            <button
                type="submit"
                class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
                :disabled="isSubmitting"
            >
                <span v-if="!isSubmitting">Save</span>
                <span v-else>Saving...</span>
            </button>
        </form>
    </div>
</template>

<script setup lang="ts">
    import { ref, reactive } from 'vue';

    type RestaurantStatus = 'open' | 'closed' | 'renovation';

    interface RestaurantForm {
        name: string;
        restaurant: string;
        capacity: number | null;
        status: RestaurantStatus | '';
    }

    interface FormErrors {
        name?: string;
        restaurant?: string;
        capacity?: string;
        status?: string;
    }

    const form = reactive<RestaurantForm>({
        name: '',
        restaurant: '',
        capacity: null,
        status: '',
    });

    const errors = reactive<FormErrors>({});
    const isSubmitting = ref(false);

    const validateForm = (): boolean => {
        let isValid = true;
        errors.name = !form.name ? 'Restaurant name is required' : '';
        errors.restaurant = !form.restaurant ? 'Restaurant name is required' : '';
        errors.capacity = !form.capacity ? 'Capacity is required' : '';
        errors.status = !form.status ? 'Status is required' : '';

        if (!form.name || !form.capacity || !form.status) {
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        isSubmitting.value = true;

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Reset form after successful submission
            form.name = '';
            form.capacity = null;
            form.status = '';
        } catch (error) {
        } finally {
            isSubmitting.value = false;
        }
    };
</script>
