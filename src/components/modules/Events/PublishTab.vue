<template>
  <div class="space-y-6">
    <!-- Event Tags Section -->
    <div>
      <h3 class="text-lg font-medium text-gray-700 mb-2">Event Tags (Optional)</h3>

      <!-- Selected Tags Display -->
      <div class="flex flex-wrap gap-2 mb-3">
        <span
          v-for="(tag, index) in selectedTags"
          :key="index"
          class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
        >
          {{ tag }}
          <button
            @click="removeTag(index)"
            type="button"
            class="ml-1.5 inline-flex text-blue-400 hover:text-blue-600"
          >
            <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </span>
      </div>

      <!-- Tag Search and Add -->
      <div class="flex gap-2">
        <input
          v-model="tagSearch"
          type="text"
          placeholder="Search Tags"
          class="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          @click="addTag"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add Tag
        </button>
      </div>
    </div>

    <!-- Save Button -->
    <div class="pt-4">
      <button
        @click="saveTags"
        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Save
      </button>
    </div>

    <!-- Publish Section -->
    <div class="mt-8 border-t border-gray-200 pt-6">
      <div class="bg-gray-50 p-4 rounded-lg mb-4">
        <p class="text-sm text-gray-600">
          Once you complete all the required steps, your event becomes eligible for Publish
        </p>
      </div>

      <button
        @click="publishEvent"
        :disabled="!isPublishEligible"
        :class="{
          'bg-green-600 hover:bg-green-700': isPublishEligible,
          'bg-gray-400 cursor-not-allowed': !isPublishEligible
        }"
        class="w-full px-4 py-3 text-white rounded-md text-lg font-medium"
      >
        Publish Event
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const tagSearch = ref('');
const selectedTags = ref<string[]>(['Marketing', 'Workshop', 'Business']);
const isPublishEligible = ref(false); // Set based on your validation logic

const addTag = () => {
  if (tagSearch.value.trim() && !selectedTags.value.includes(tagSearch.value.trim())) {
    selectedTags.value.push(tagSearch.value.trim());
    tagSearch.value = '';
  }
};

const removeTag = (index: number) => {
  selectedTags.value.splice(index, 1);
};

const saveTags = () => {
  // Implement save logic here
  console.log('Saved tags:', selectedTags.value);
};

const publishEvent = () => {
  if (isPublishEligible.value) {
    // Implement publish logic here
    console.log('Event published!');
  }
};
</script>
