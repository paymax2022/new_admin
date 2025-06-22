<template>
  <div class="max-w-2xl mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-md">
    <h1 class="text-2xl font-bold mb-6">Create Category</h1>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <!-- Name Field -->
        <div class="sm:col-span-2">
          <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            v-model="formData.name"
            type="text"
            id="name"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Artificial Intelligence"
          />
        </div>

        <!-- Slug Field -->
        <div class="sm:col-span-2">
          <label for="slug" class="block text-sm font-medium text-gray-700 mb-1">Slug</label>
          <input
            v-model="formData.slug"
            type="text"
            id="slug"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="artificial-intelligence"
          />
        </div>

        <!-- Thumbnail Upload -->
        <div class="sm:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Thumb (256x256 px)</label>
          <div class="mt-1 flex items-center">
            <label
              for="thumbnail"
              class="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
            >
              Choose file
              <input id="thumbnail" type="file" class="sr-only" @change="handleFileUpload" />
            </label>
            <span class="ml-3 text-sm text-gray-500" v-if="!formData.thumbnail">No file chosen</span>
            <span class="ml-3 text-sm text-gray-500" v-else>{{ formData.thumbnail.name }}</span>
          </div>
        </div>

        <!-- Status Select -->
        <div class="sm:col-span-2">
          <label for="status" class="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            v-model="formData.status"
            id="status"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option v-for="option in statusOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>
      </div>

      <!-- Save Button -->
      <div class="pt-4">
        <button
          type="submit"
          class="w-full sm:w-auto px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Save
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface FormData {
  name: string;
  slug: string;
  thumbnail: File | null;
  status: 'enabled' | 'disabled';
}

interface StatusOption {
  value: FormData['status'];
  label: string;
}

const formData = ref<FormData>({
  name: 'Artificial Intelligence',
  slug: 'artificial-intelligence',
  thumbnail: null,
  status: 'enabled'
});

const statusOptions: StatusOption[] = [
  { value: 'enabled', label: 'Enabled' },
  { value: 'disabled', label: 'Disabled' }
];

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    formData.value.thumbnail = target.files[0];
  }
};

const handleSubmit = () => {
  console.log('Form submitted:', formData.value);
  // Here you would typically send the data to an API
  alert('Form submitted! Check console for data.');
};
</script>
