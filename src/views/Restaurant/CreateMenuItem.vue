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
                    <option v-if="loading" disabled>Loading restaurants...</option>
                    <option v-for="restaurant in restaurants" :key="restaurant._id" :value="restaurant._id">
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

            <!-- Discount Type Field -->
            <div>
                <label for="menuDiscountType" class="block text-sm font-medium text-gray-700"> MENU DISCOUNT TYPE </label>
                <select
                    id="menuDiscountType"
                    v-model="formData.menuDiscountType"
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                    <option value="percentage">Percentage</option>
                    <option value="fixed">Fixed</option>
                </select>
            </div>

            <!-- Menu Discount Amount Field -->
            <div>
                <label for="menuDiscountAmount" class="block text-sm font-medium text-gray-700"> MENU DISCOUNT AMOUNT </label>
                <input
                    type="number"
                    id="menuDiscountAmount"
                    v-model="formData.menuDiscountAmount"
                    min="0"
                    step="0.01"
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>

            <!-- Discount Type Field -->
            <div>
                <label for="discountType" class="block text-sm font-medium text-gray-700"> DISCOUNT TYPE </label>
                <select
                    id="discountType"
                    v-model="formData.discountType"
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                    <option value="fixed">Fixed</option>
                    <option value="percentage">Percentage</option>
                </select>
            </div>

            <!-- Discount Amount Field -->
            <div>
                <label for="discountAmount" class="block text-sm font-medium text-gray-700"> DISCOUNT AMOUNT </label>
                <input
                    type="number"
                    id="discountAmount"
                    v-model="formData.discountAmount"
                    min="0"
                    step="0.01"
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
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
                    :disabled="isSubmitting"
                    class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {{ isSubmitting ? 'Creating...' : 'Save Menu Item' }}
                </button>
            </div>
        </form>
    </div>
</template>

<script lang="ts" setup>
    import { ref, onMounted } from 'vue';
    import { useToast } from 'vue-toastification';
    import { restaurantService } from '@/services/restaurantService';

    const toast = useToast();

    interface Restaurant {
        _id: string;
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
        menuDiscountType: string;
        menuDiscountAmount: number;
        discountType: string;
        discountAmount: number;
        status: string;
        image: File | null;
        description: string;
    }

    const restaurants = ref<Restaurant[]>([]);
    const loading = ref(false);

    // Fetch restaurants from API
    const fetchRestaurants = async () => {
        try {
            loading.value = true;
            const response = await restaurantService.getAllRestaurants(100, 1);
            // Handle nested response structure: response.data.data.data contains the restaurants array
            if (response?.data?.data?.data && Array.isArray(response.data.data.data)) {
                restaurants.value = response.data.data.data;
            } else if (response?.data?.data && Array.isArray(response.data.data)) {
                restaurants.value = response.data.data;
            } else if (Array.isArray(response?.data)) {
                restaurants.value = response.data;
            }
        } catch (error) {
            console.error('Error fetching restaurants:', error);
        } finally {
            loading.value = false;
        }
    };

    onMounted(() => {
        fetchRestaurants();
    });

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
        menuDiscountType: 'percentage',
        menuDiscountAmount: 0,
        discountType: 'fixed',
        discountAmount: 0,
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

    const isSubmitting = ref(false);

    const submitForm = async () => {
        if (!formData.value.restaurant) {
            toast.error('Please select a restaurant');
            return;
        }

        if (!formData.value.name) {
            toast.error('Please enter a menu item name');
            return;
        }

        try {
            isSubmitting.value = true;
            
            // Create FormData for file upload
            const fd = new FormData();
            fd.append('name', formData.value.name);
            fd.append('description', formData.value.description || '');
            fd.append('category', formData.value.category || '');
            fd.append('menu_item[menu_product_name]', formData.value.name);
            fd.append('menu_item[menu_is_combo]', 'false');
            
            if (formData.value.menuDiscountType && formData.value.menuDiscountAmount > 0) {
                fd.append('menu_item[menu_discount][discount_type]', formData.value.menuDiscountType);
                fd.append('menu_item[menu_discount][discount_amount]', formData.value.menuDiscountAmount.toString());
            }
            
            if (formData.value.discountType && formData.value.discountAmount > 0) {
                fd.append('discount[discount_type]', formData.value.discountType);
                fd.append('discount[discount_amount]', formData.value.discountAmount.toString());
            }
            
            if (formData.value.image) {
                fd.append('image', formData.value.image);
            }

            const response = await restaurantService.createMenu(formData.value.restaurant, fd);
            console.log('Menu item created successfully:', response);
            toast.success('Menu item created successfully!');
            
            // Reset form
            formData.value = {
                restaurant: formData.value.restaurant,
                name: '',
                category: '',
                unitPrice: 0,
                menuDiscountType: 'percentage',
                menuDiscountAmount: 0,
                discountType: 'fixed',
                discountAmount: 0,
                status: 'active',
                image: null,
                description: '',
            };
            
            // Reset file input
            if (imageInput.value) {
                imageInput.value.value = '';
            }
        } catch (error: any) {
            console.error('Error creating menu item:', error);
            toast.error(error.response?.data?.message || 'Error creating menu item. Please try again.');
        } finally {
            isSubmitting.value = false;
        }
    };
</script>
