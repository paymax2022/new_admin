<template>
  <div class=" p-4 sm:p-6 bg-white rounded-lg shadow-md">
    <h1 class="text-2xl font-bold text-gray-800 mb-6">Edit User</h1>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <!-- Two-column layout for larger screens -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- First Name -->
        <div class="form-group">
          <label class="block text-sm font-medium text-gray-700 mb-1">
            FIRST NAME <span class="text-red-500">*</span>
          </label>
          <input
            v-model="form.firstName"
            type="text"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- Last Name -->
        <div class="form-group">
          <label class="block text-sm font-medium text-gray-700 mb-1">
            LAST NAME <span class="text-red-500">*</span>
          </label>
          <input
            v-model="form.lastName"
            type="text"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <!-- Email -->
      <div class="form-group">
        <label class="block text-sm font-medium text-gray-700 mb-1">
          EMAIL <span class="text-red-500">*</span>
        </label>
        <input
          v-model="form.email"
          type="email"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="admin@example.com"
        />
      </div>

      <!-- Phone -->
      <div class="form-group">
        <label class="block text-sm font-medium text-gray-700 mb-1">
          PHONE <span class="text-red-500">*</span>
        </label>
        <input
          v-model="form.phone"
          type="tel"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- Username -->
      <div class="form-group">
        <label class="block text-sm font-medium text-gray-700 mb-1">
          USERNAME
        </label>
        <input
          v-model="form.username"
          type="text"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- Password -->
      <div class="form-group">
        <label class="block text-sm font-medium text-gray-700 mb-1">
          PASSWORD <span class="text-red-500">*</span>
        </label>
        <input
          v-model="form.password"
          type="password"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- Two-column layout for larger screens -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Role -->
        <div class="form-group">
          <label class="block text-sm font-medium text-gray-700 mb-1">
            ROLE <span class="text-red-500">*</span>
          </label>
          <select
            v-model="form.role"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="editor">Editor</option>
          </select>
        </div>

        <!-- Status -->
        <div class="form-group">
          <label class="block text-sm font-medium text-gray-700 mb-1">
            STATUS <span class="text-red-500">*</span>
          </label>
          <select
            v-model="form.status"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      <!-- Address -->
      <div class="form-group">
        <label class="block text-sm font-medium text-gray-700 mb-1">
          ADDRESS
        </label>
        <textarea
          v-model="form.address"
          rows="3"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>

      <!-- Image Upload -->
      <div class="form-group">
        <label class="block text-sm font-medium text-gray-700 mb-1">
          IMAGE
        </label>
        <div class="flex items-center">
          <label class="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Choose file
            <input type="file" @change="handleFileUpload" class="sr-only" />
          </label>
          <span class="ml-3 text-sm text-gray-500">
            {{ form.image ? form.image.name : 'No file chosen' }}
          </span>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="pt-4">
        <button
          type="submit"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Save
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  username: '',
  password: '',
  role: '',
  status: '',
  address: '',
  image: null as File | null
});

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    form.value.image = target.files[0];
  }
};

const handleSubmit = () => {
  console.log('Form submitted:', form.value);
  // Here you would typically send the form data to your backend
  alert('Form submitted successfully!');
};
</script>

<style scoped>
/* Additional custom styles if needed */
.form-group {
  @apply mb-4;
}
</style>
