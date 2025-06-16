<template>
  <div class="relative inline-block text-left">
    <div>
      <button type="button" @click="open = !open"
        class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none"
        id="menu-button" aria-expanded="true" aria-haspopup="true">
        Bulk Action <span v-if="selected.length">({{ selected.length }})</span>
        <ChevronDownIcon class="-mr-1 ml-2 h-5 w-5" />
      </button>
    </div>

    <div v-if="open" class="origin-top-right absolute right-0 mt-2 w-44 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
      <div class="py-1 text-sm text-gray-700 dark:text-gray-200">
        <button @click="emit('assign'); open = false" class="block px-4 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2">
          <UserPlusIcon class="w-4 h-4" /> Assign Role
        </button>
        <button @click="emit('export'); open = false" class="block px-4 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2">
          <DownloadIcon class="w-4 h-4" /> Export
        </button>
        <button @click="emit('delete'); open = false" class="block px-4 py-2 w-full text-left text-red-600 hover:bg-red-100 dark:hover:bg-red-700 flex items-center gap-2">
          <TrashIcon class="w-4 h-4" /> Delete Selected
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ChevronDownIcon, UserPlusIcon, DownloadIcon, TrashIcon } from 'lucide-vue-next'

const props = defineProps({ selected: Array })
const emit = defineEmits(['assign', 'export', 'delete'])
const open = ref(false)
</script>
