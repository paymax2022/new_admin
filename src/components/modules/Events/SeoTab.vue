<template>
  <div class="space-y-6">
    <!-- Meta Title -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Meta Title</label>
      <input
        v-model="metaTitle"
        type="text"
        placeholder="Enter meta title (recommended 50-60 characters)"
        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <p class="text-xs text-gray-500 mt-1">
        Character count: {{ metaTitle.length }} ({{ 60 - metaTitle.length }} remaining)
      </p>
    </div>

    <!-- Meta Tags -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Meta Tags</label>
      <div class="flex flex-wrap gap-2 mb-2">
        <span
          v-for="(tag, index) in metaTags"
          :key="index"
          class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
        >
          {{ tag }}
          <button
            @click="removeTag(index)"
            type="button"
            class="ml-1.5 inline-flex text-blue-400 hover:text-blue-600"
          >
            <svg class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </span>
      </div>
      <div class="flex">
        <input
          v-model="newTag"
          @keydown.enter.prevent="addTag"
          type="text"
          placeholder="Add tags (press Enter to add)"
          class="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          @click="addTag"
          class="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
        >
          Add
        </button>
      </div>
      <p class="text-xs text-gray-500 mt-1">Separate tags with commas or press Enter</p>
    </div>

    <!-- Meta Description -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
      <textarea
        v-model="metaDescription"
        rows="4"
        placeholder="Enter meta description (recommended 150-160 characters)"
        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      ></textarea>
      <p class="text-xs text-gray-500 mt-1">
        Character count: {{ metaDescription.length }} ({{ 160 - metaDescription.length }} remaining)
      </p>
    </div>

    <!-- Save Button -->
    <div class="pt-4">
      <button
        @click="saveSeoData"
        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Save
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const metaTitle = ref('');
const metaDescription = ref('');
const metaTags = ref<string[]>([]);
const newTag = ref('');

const addTag = () => {
  if (newTag.value.trim()) {
    // Handle comma-separated tags
    const tagsToAdd = newTag.value.split(',').map(tag => tag.trim()).filter(tag => tag);
    metaTags.value = [...metaTags.value, ...tagsToAdd];
    newTag.value = '';
  }
};

const removeTag = (index: number) => {
  metaTags.value.splice(index, 1);
};

const saveSeoData = () => {
  // Implement save logic here
  console.log({
    metaTitle: metaTitle.value,
    metaDescription: metaDescription.value,
    metaTags: metaTags.value
  });
};
</script>
