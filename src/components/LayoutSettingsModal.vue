<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
    <div class="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-md p-0 relative">
      <!-- Close Button -->
      <button class="absolute top-4 right-4 text-gray-400 hover:text-black dark:hover:text-white text-2xl" @click="$emit('close')">&times;</button>
      <div class="px-8 pt-8 pb-4">
        <h2 class="font-semibold text-lg mb-1">Dashboard Layout Settings</h2>
        <p class="text-gray-500 dark:text-gray-400 text-sm mb-4">Customize how your dashboard widgets are displayed and organized.</p>
        <div class="mb-4">
          <div class="font-medium mb-2">Layout Style</div>
          <div class="flex gap-3 mb-4">
            <button :class="['flex-1 flex flex-col items-center gap-1 border rounded-lg p-3', layout==='grid' ? 'border-black dark:border-white' : 'border-gray-200']" @click="layout='grid'">
              <span class="w-6 h-6"><Squares2X2Icon /></span>
              <span class="text-xs">Grid</span>
            </button>
            <button :class="['flex-1 flex flex-col items-center gap-1 border rounded-lg p-3', layout==='columns' ? 'border-black dark:border-white' : 'border-gray-200']" @click="layout='columns'">
              <span class="w-6 h-6"><ViewColumnsIcon /></span>
              <span class="text-xs">Columns</span>
            </button>
            <button :class="['flex-1 flex flex-col items-center gap-1 border rounded-lg p-3', layout==='rows' ? 'border-black dark:border-white' : 'border-gray-200']" @click="layout='rows'">
              <span class="w-6 h-6"><Bars3Icon /></span>
              <span class="text-xs">Rows</span>
            </button>
          </div>
          <div class="flex gap-3 mb-4">
            <div class="flex-1">
              <label class="block text-xs mb-1">Columns per Row</label>
              <select class="w-full border rounded px-2 py-1" v-model="columns">
                <option disabled value="">Select Columns per row</option>
                <option v-for="n in [2,3,4,5,6]" :key="n" :value="n">{{ n }}</option>
              </select>
            </div>
            <div class="flex-1">
              <label class="block text-xs mb-1">Widget Spacing</label>
              <select class="w-full border rounded px-2 py-1" v-model="spacing">
                <option disabled value="">Select Spacing</option>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
          </div>
        </div>
        <div class="flex gap-2 mt-6">
          <button class="flex-1 bg-black text-white rounded px-4 py-2 font-medium">Save Layout</button>
          <button class="flex-1 border rounded px-4 py-2 font-medium" @click="$emit('close')">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Squares2X2Icon, ViewColumnsIcon, Bars3Icon } from '@heroicons/vue/24/outline';
const layout = ref('grid');
const columns = ref('');
const spacing = ref('');
</script> 