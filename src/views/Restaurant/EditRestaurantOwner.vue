<template>
  <div class=" bg-white rounded-lg shadow-md p-6">
    <h1 class="text-2xl font-bold mb-6">Edit Restaurant Owner</h1>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- First Name & Last Name -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">FIRST NAME *</label>
          <input
            v-model="formData.firstName"
            type="text"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
        </div>

        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">LAST NAME *</label>
          <input
            v-model="formData.lastName"
            type="text"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
        </div>

        <!-- Phone & Username -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">PHONE</label>
          <input
            v-model="formData.phone"
            type="tel"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
        </div>

        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">USERNAME</label>
          <input
            v-model="formData.username"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
        </div>

        <!-- Email & Password -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">EMAIL *</label>
          <input
            v-model="formData.email"
            type="email"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
        </div>

        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">PASSWORD</label>
          <input
            v-model="formData.password"
            type="password"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
        </div>

        <!-- Status Dropdown -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">STATUS *</label>
          <select
            v-model="formData.status"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        <!-- Image Upload -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">IMAGE</label>
          <div class="flex items-center">
            <input
              type="file"
              @change="handleFileUpload"
              class="hidden"
              id="file-upload"
              accept="image/*"
            >
            <label
              for="file-upload"
              class="px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
            >
              Choose file
            </label>
            <span class="ml-2 text-sm text-gray-500">
              {{ formData.image ? formData.image.name : 'No file chosen' }}
            </span>
          </div>
        </div>
      </div>

      <!-- Address -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">ADDRESS</label>
        <textarea
          v-model="formData.address"
          rows="3"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        ></textarea>
      </div>

      <!-- Save Button -->
      <div class="flex justify-end">
        <button
          type="submit"
          class="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          SAVE
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface RestaurantOwnerForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  username: string;
  address: string;
  password: string;
  status: 'Active' | 'Inactive' | 'Pending';
  image: File | null;
}

const formData = ref<RestaurantOwnerForm>({
  firstName: 'restaurant',
  lastName: 'owner',
  email: 'restaurantowner@example.com',
  phone: '115005550006',
  username: 'restaurantowner',
  address: 'Dhaka, Bangladesh',
  password: '',
  status: 'Active',
  image: null
});

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    formData.value.image = target.files[0];
  }
};

const handleSubmit = () => {
  console.log('Form submitted:', formData.value);
  // Here you would typically send the data to an API
  // Example: await apiService.saveRestaurantOwner(formData.value);
};
</script>

<style scoped>
/* Any additional custom styles can go here */
</style>
