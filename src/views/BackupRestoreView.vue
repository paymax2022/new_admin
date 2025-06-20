<template>
  <div class="p-6 bg-white dark:bg-gray-900 min-h-screen">
    <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">Backup & Restore</h1>
    <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">Configure the system settings and preferences.</p>
    <div class="mb-6">
      <nav class="flex gap-2" aria-label="Tabs">
        <button v-for="tab in tabs" :key="tab" @click="selectedTab = tab" :class="[selectedTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200', 'px-4 py-2 rounded font-medium text-sm focus:outline-none']">
          {{ tab }}
        </button>
      </nav>
    </div>
    <div v-if="selectedTab === 'Backup'">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Create Backup</h2>
      <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Create a backup of your system data</p>
      <form class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Backup Type</label>
          <select v-model="form.type" class="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm dark:bg-gray-800 dark:text-gray-100">
            <option>Full Backup</option>
            <option>Users Only</option>
            <option>Transactions only</option>
            <option>Settings Only</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Compression Level</label>
          <select v-model="form.compression" class="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm dark:bg-gray-800 dark:text-gray-100">
            <option>None</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
      </form>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Backup Name (Optional)</label>
        <input v-model="form.name" type="text" class="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm dark:bg-gray-800 dark:text-gray-100" placeholder="e.g. Pre-update backup" />
      </div>
      <div class="flex items-center mb-4">
        <input id="media" type="checkbox" v-model="form.includeMedia" class="toggle mr-2" />
        <label for="media" class="text-sm text-gray-700 dark:text-gray-200">Include Media Files</label>
        <span class="ml-2 text-xs text-gray-400">Include uploaded images and documents.</span>
      </div>
      <div class="flex items-center mb-6">
        <input id="encrypt" type="checkbox" v-model="form.encrypt" class="toggle mr-2" />
        <label for="encrypt" class="text-sm text-gray-700 dark:text-gray-200">Encrypt Backup</label>
        <span class="ml-2 text-xs text-gray-400">Secure backup with password protection</span>
      </div>
      <div class="flex gap-2 justify-between">
        <button type="button" class="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center">
          <span class="mr-2">⬇️</span> Download Last Backup
        </button>
        <button type="submit" class="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 font-medium flex items-center">
          <span class="mr-2">🔄</span> Start Backup
        </button>
      </div>
    </div>
    <div v-else class="text-gray-500 dark:text-gray-400 p-8 text-center">
      <span v-if="selectedTab === 'Restore'">Restore content coming soon.</span>
      <span v-else-if="selectedTab === 'Settings'">Settings content coming soon.</span>
      <span v-else-if="selectedTab === 'History'">History content coming soon.</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const tabs = ['Backup', 'Restore', 'Settings', 'History']
const selectedTab = ref('Backup')
const form = ref({
  type: 'Full Backup',
  compression: 'None',
  name: '',
  includeMedia: true,
  encrypt: false
})
</script>

<style scoped>
.toggle {
  width: 2rem;
  height: 1.1rem;
  background: #e5e7eb;
  border-radius: 9999px;
  position: relative;
  appearance: none;
  outline: none;
  cursor: pointer;
  transition: background 0.2s;
}
.toggle:checked {
  background: #2563eb;
}
.toggle:before {
  content: '';
  position: absolute;
  left: 0.2rem;
  top: 0.15rem;
  width: 0.8rem;
  height: 0.8rem;
  background: #fff;
  border-radius: 9999px;
  transition: transform 0.2s;
}
.toggle:checked:before {
  transform: translateX(0.9rem);
}
</style>
