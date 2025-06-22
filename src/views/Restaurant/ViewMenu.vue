<template>
  <div class="max-w-4xl mx-auto mt-10 bg-white shadow rounded-md">
    <!-- Tabs -->
    <div class="flex border-b border-red-300">
      <button
        :class="[
          'flex-1 px-4 py-3 text-center text-sm font-medium',
          activeTab === 'info'
            ? 'text-red-500 border-b-2 border-red-500 bg-red-50'
            : 'text-gray-500 hover:text-red-500'
        ]"
        @click="activeTab = 'info'"
      >
        <span class="inline-flex items-center gap-1">
        Information
        </span>
      </button>
      <button
        :class="[
          'flex-1 px-4 py-3 text-center text-sm font-medium',
          activeTab === 'image'
            ? 'text-red-500 border-b-2 border-red-500 bg-red-50'
            : 'text-gray-500 hover:text-red-500'
        ]"
        @click="activeTab = 'image'"
      >
        <span class="inline-flex items-center gap-1">
           Image
        </span>
      </button>
    </div>

    <!-- Tab Panels -->
    <div class="p-6 text-sm md:text-base">
      <!-- Info Tab -->
      <div v-if="activeTab === 'info'" class="grid grid-cols-1 md:grid-cols-2 gap-y-4">
        <div>
          <p class="text-gray-900 font-semibold">Name</p>
          <p class="text-gray-500">Chicken pasta</p>
        </div>
        <div>
          <p class="text-gray-900 font-semibold">Status</p>
          <span class="inline-block bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-md">
            Active
          </span>
        </div>
        <div>
          <p class="text-gray-900 font-semibold">Created Date</p>
          <p class="text-gray-500">4 weeks ago</p>
        </div>
        <div>
          <p class="text-gray-900 font-semibold">Description</p>
          <p class="text-gray-500">
            Indulge in the comforting and wholesome experience of restful foods.
          </p>
        </div>
      </div>

      <!-- Image Tab -->
      <div v-else class="flex justify-center items-center">
        <img
          src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=400&q=80"
          alt="Chicken Pasta"
          class="rounded-md w-full max-w-xs"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('info')
</script>
