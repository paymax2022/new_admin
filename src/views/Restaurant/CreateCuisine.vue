<template>
    <div class="px-28 py-10 bg-white rounded-lg shadow-md">
    <h1 class="text-2xl font-bold mb-6">Add Cuisine</h1>

    <form @submit.prevent="submitForm" class="space-y-4">
      <!-- Name Field -->
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700">
          NAME <span class="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          v-model="formData.name"
          required
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter cuisine name"
        />
      </div>

      <!-- Status Field -->
      <div>
        <label class="block text-sm font-medium text-gray-700">
          STATUS <span class="text-red-500">*</span>
        </label>
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
            <label for="statusActive" class="ml-2 block text-sm text-gray-700">
              Active
            </label>
          </div>
          <div class="flex items-center">
            <input
              type="radio"
              id="statusInactive"
              v-model="formData.status"
              value="inactive"
              class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
            />
            <label for="statusInactive" class="ml-2 block text-sm text-gray-700">
              Inactive
            </label>
          </div>
        </div>
      </div>

      <!-- Description Field -->
      <div>
        <label for="description" class="block text-sm font-medium text-gray-700">
          DESCRIPTION
        </label>
        <textarea
          id="description"
          v-model="formData.description"
          rows="4"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter cuisine description"
        ></textarea>
      </div>

      <!-- Image Upload -->
      <div>
        <label class="block text-sm font-medium text-gray-700">
          CUISINE IMAGE <span class="text-red-500">*</span>
        </label>
        <div class="mt-1 flex items-center">
          <input
            type="file"
            id="image"
            ref="imageInput"
            @change="handleImageUpload"
            accept="image/*"
            required
            class="hidden"
          />
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
        <div v-if="formData.image" class="mt-2">
          <img
            :src="previewImage"
            alt="Cuisine preview"
            class="h-32 object-cover rounded-md"
          />
        </div>
      </div>

      <!-- Submit Button -->
      <div class="pt-4">
        <button
          type="submit"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Cuisine
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';

interface FormData {
  name: string;
  status: string;
  description: string;
  image: File | null;
}

const formData = ref<FormData>({
  name: '',
  status: 'active',
  description: '',
  image: null
});

const imageInput = ref<HTMLInputElement | null>(null);

const previewImage = computed(() => {
  if (formData.value.image) {
    return URL.createObjectURL(formData.value.image);
  }
  return '';
});

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
  fd.append('name', formData.value.name);
  fd.append('status', formData.value.status);
  fd.append('description', formData.value.description);
  if (formData.value.image) {
    fd.append('image', formData.value.image);
  }

  // Example API call:
  // axios.post('/api/cuisines', fd, {
  //   headers: {
  //     'Content-Type': 'multipart/form-data'
  //   }
  // }).then(response => {
  //   console.log('Success:', response);
  //   // Reset form after successful submission
  //   formData.value = {
  //     name: '',
  //     status: 'active',
  //     description: '',
  //     image: null
  //   };
  //   if (imageInput.value) {
  //     imageInput.value.value = '';
  //   }
  // }).catch(error => {
  //   console.error('Error:', error);
  // });
};
</script>
