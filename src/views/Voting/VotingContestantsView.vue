<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Contestants</h1>
      <p class="text-sm text-gray-500 dark:text-gray-400">Manage all contestants across voting contests</p>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <p class="text-gray-600 dark:text-gray-400">Contestants management content will be implemented here.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const loading = ref(false);

onMounted(() => {
  console.log('Voting Contestants View mounted');
});
</script>

