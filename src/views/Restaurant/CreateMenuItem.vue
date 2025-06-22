<template>
    <div class="px-28 py-10 bg-white rounded-lg shadow-md">
        <h1 class="text-2xl font-bold mb-6">Menu Item</h1>

        <form @submit.prevent="submitForm" class="space-y-4">
            <!-- Restaurant Field -->
            <div>
                <label for="restaurant" class="block text-sm font-medium text-gray-700"> RESTAURANT <span class="text-red-500">*</span> </label>
                <select
                    id="restaurant"
                    v-model="formData.restaurant"
                    required
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                    <option value="" disabled>Select Restaurant</option>
                    <option v-for="restaurant in restaurants" :key="restaurant.id" :value="restaurant.id">
                        {{ restaurant.name }}
                    </option>
                </select>
            </div>

            <!-- Name Field -->
            <div>
                <label for="name" class="block text-sm font-medium text-gray-700"> NAME <span class="text-red-500">*</span> </label>
                <input
                    type="text"
                    id="name"
                    v-model="formData.name"
                    required
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>

            <!-- Categories Field -->
            <div>
                <label for="categories" class="block text-sm font-medium text-gray-700"> CATEGORIES </label>
                <select
                    id="categories"
                    v-model="formData.category"
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                    <option value="" disabled>Select Category</option>
                    <option v-for="category in categories" :key="category.id" :value="category.id">
                        {{ category.name }}
                    </option>
                </select>
            </div>

            <!-- Unit Price Field -->
            <div>
                <label for="unitPrice" class="block text-sm font-medium text-gray-700"> UNIT PRICE <span class="text-red-500">*</span> </label>
                <div class="mt-1 relative rounded-md shadow-sm">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span class="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                        type="number"
                        id="unitPrice"
                        v-model="formData.unitPrice"
                        required
                        min="0"
                        step="0.01"
                        class="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
            </div>

            <!-- Discount Price Field -->
            <div>
                <label for="discountPrice" class="block text-sm font-medium text-gray-700"> DISCOUNT PRICE </label>
                <div class="mt-1 relative rounded-md shadow-sm">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span class="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                        type="number"
                        id="discountPrice"
                        v-model="formData.discountPrice"
                        min="0"
                        step="0.01"
                        class="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
            </div>

            <!-- Status Field -->
            <div>
                <label class="block text-sm font-medium text-gray-700"> STATUS <span class="text-red-500">*</span> </label>
                <div class="mt-1 space-y-2">
                    <div class="flex items-center">
                        <input
                            type="radio"
                            id="statusActive"
                            v-model="formData.status"
                            value="active"
                            required
                            class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                        />
                        <label for="statusActive" class="ml-2 block text-sm text-gray-700"> Active </label>
                    </div>
                    <div class="flex items-center">
                        <input
                            type="radio"
                            id="statusInactive"
                            v-model="formData.status"
                            value="inactive"
                            class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                        />
                        <label for="statusInactive" class="ml-2 block text-sm text-gray-700"> Inactive </label>
                    </div>
                </div>
            </div>

            <!-- Image Upload -->
            <div>
                <label class="block text-sm font-medium text-gray-700"> IMAGE </label>
                <div class="mt-1 flex items-center">
                    <input type="file" id="image" ref="imageInput" @change="handleImageUpload" accept="image/*" class="hidden" />
                    <button
                        type="button"
                        @click="imageInput?.click()"
                        class="px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Choose file
                    </button>
                    <span class="ml-2 text-sm text-gray-500">
                        {{ formData.image ? formData.image.name : 'No file chosen' }}
                    </span>
                </div>
            </div>
            <div>
                <label for="description" class="block text-sm font-medium text-gray-700"> DESCRIPTION </label>
                <textarea
                    id="description"
                    v-model="formData.description"
                    rows="4"
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter category description"
                ></textarea>
            </div>
            <!-- Submit Button -->
            <div class="pt-4">
                <button
                    type="submit"
                    class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Save Menu Item
                </button>
            </div>
        </form>
    </div>
</template>

<script lang="ts" setup>
    import { ref } from 'vue';

    interface Restaurant {
        id: string;
        name: string;
    }

    interface Category {
        id: string;
        name: string;
    }

    interface FormData {
        restaurant: string;
        name: string;
        category: string;
        unitPrice: number;
        discountPrice: number;
        status: string;
        image: File | null;
        description: string;
    }

    // Sample data - replace with your actual data or API calls
    const restaurants = ref<Restaurant[]>([
        { id: '1', name: 'Main Restaurant' },
        { id: '2', name: 'Downtown Cafe' },
        { id: '3', name: 'Seaside Bistro' },
    ]);

    const categories = ref<Category[]>([
        { id: '1', name: 'Appetizers' },
        { id: '2', name: 'Main Courses' },
        { id: '3', name: 'Desserts' },
        { id: '4', name: 'Beverages' },
    ]);

    const formData = ref<FormData>({
        restaurant: '',
        name: '',
        category: '',
        unitPrice: 0,
        discountPrice: 0,
        status: 'active',
        image: null,
        description: '',
    });

    const imageInput = ref<HTMLInputElement | null>(null);

    const handleImageUpload = (event: Event) => {
        const target = event.target as HTMLInputElement;
        if (target.files && target.files.length > 0) {
            formData.value.image = target.files[0];
        }
    };

    const submitForm = () => {
        console.log('Form submitted:', formData.value);

        // Create FormData for file upload
        const fd = new FormData();
        fd.append('restaurant', formData.value.restaurant);
        fd.append('name', formData.value.name);
        fd.append('category', formData.value.category);
        fd.append('unitPrice', formData.value.unitPrice.toString());
        fd.append('discountPrice', formData.value.discountPrice.toString());
        fd.append('status', formData.value.status);
        if (formData.value.image) {
            fd.append('image', formData.value.image);
        }

        // Example API call:
        // axios.post('/api/menu-items', fd, {
        //   headers: {
        //     'Content-Type': 'multipart/form-data'
        //   }
        // }).then(response => {
        //   console.log('Success:', response);
        // }).catch(error => {
        //   console.error('Error:', error);
        // });
    };
</script>
