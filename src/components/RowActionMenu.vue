<template>
  <div class="relative inline-block text-left">
    <button @click="show = !show" class="text-gray-500 hover:text-black dark:hover:text-white">
      ⋮
    </button>
    <div v-if="show" class="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 border rounded shadow-lg z-50">
      <ul class="text-sm">
        <li class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">View</li>
        <li class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">Edit</li>
        <li @click="emit('delete', user.id)" class="px-4 py-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-700 cursor-pointer">Delete</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({ user: Object })
const emit = defineEmits(['delete'])

const show = ref(false)
</script>
