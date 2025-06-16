<template>
  <div class="p-6 space-y-6">
    <div>
      <h1 class="text-2xl font-semibold text-gray-800 dark:text-gray-100">Role & Permission Management</h1>
      <p class="text-gray-500 dark:text-gray-400">Manage roles, permissions, and access control for users</p>
    </div>

    <div class="flex items-center gap-6 border-b border-gray-200 dark:border-gray-700">
      <button class="pb-2 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Roles</button>
      <button class="pb-2 text-sm text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400">Users with Roles</button>
    </div>

    <div class="flex justify-between items-center mt-4">
      <h2 class="text-lg font-medium text-gray-800 dark:text-gray-100">Users with Assigned Roles</h2>
      <button class="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700">Assign Role</button>
    </div>

    <div class="overflow-x-auto rounded shadow">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
        <thead class="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th class="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-300">ID</th>
            <th class="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-300">Name</th>
            <th class="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-300">Email</th>
            <th class="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-300">Role</th>
            <th class="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-300">Last Active</th>
            <th class="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-300">Action</th>
          </tr>
        </thead>
        <tbody class="bg-white dark:bg-gray-900 divide-y divide-gray-100 dark:divide-gray-700">
          <tr v-for="i in 10" :key="i">
            <td class="px-4 py-2 text-gray-700 dark:text-gray-300">U100</td>
            <td class="px-4 py-2 text-gray-700 dark:text-gray-300">John Doe</td>
            <td class="px-4 py-2 text-gray-700 dark:text-gray-300">john.doe@example.com</td>
            <td class="px-4 py-2 text-gray-700 dark:text-gray-300">
              <span class="inline-flex gap-2">
                <span class="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-2 py-1 rounded-full text-xs">Admin</span>
                <span v-if="i % 3 === 0" class="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-2 py-1 rounded-full text-xs">Finance</span>
                <span v-else-if="i % 3 === 1" class="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-2 py-1 rounded-full text-xs">Agent</span>
              </span>
            </td>
            <td class="px-4 py-2 text-gray-700 dark:text-gray-300">4/8/2023, 9:30:00 AM</td>
            <td class="px-4 py-2">
              <button @click="showModal = true" class="text-blue-600 dark:text-blue-400 hover:underline">Edit Roles</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mt-4">
      <p>Showing 0 to 0 of 0 entries (filtered from 0 total entries)</p>
      <div class="flex items-center gap-1">
        <button class="px-2 py-1 rounded border text-gray-500 dark:text-gray-400">&laquo;</button>
        <button class="px-3 py-1 rounded bg-blue-600 text-white">1</button>
        <button class="px-2 py-1 rounded border text-gray-500 dark:text-gray-400">&raquo;</button>
      </div>
    </div>

    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-end bg-black/40">
      <div class="w-full max-w-md bg-white dark:bg-gray-900 p-6 rounded-l-lg shadow-lg h-full overflow-y-auto">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
            <UserIcon class="w-5 h-5 text-blue-600 dark:text-blue-400" />
            Edit Roles for John Doe
          </h3>
          <button @click="showModal = false" class="text-gray-500 hover:text-red-500 text-xl">&times;</button>
        </div>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Modify role assignments for this user</p>

        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Select User</label>
          <select class="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100">
            <option>Select a user</option>
            <option>John Doe</option>
            <option>Jane Smith</option>
            <option>David Johnson</option>
          </select>
        </div>

        <div class="space-y-3 border border-gray-200 dark:border-gray-700 p-4 rounded">
          <div v-for="role in roles" :key="role.name" class="flex items-center justify-between">
            <div class="text-gray-800 dark:text-gray-100">
              {{ role.name }}
              <span v-if="role.type" class="ml-1 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded text-xs text-gray-600 dark:text-gray-300">{{ role.type }}</span>
            </div>
            <label class="inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="role.active" class="sr-only">
              <div class="relative">
                <div class="w-10 h-5 bg-gray-300 rounded-full shadow-inner transition-colors duration-300" :class="role.active ? 'bg-blue-600' : ''"></div>
                <div class="absolute left-0 top-0 w-5 h-5 bg-white border rounded-full shadow transform transition-transform duration-300" :class="role.active ? 'translate-x-full border-blue-600' : 'border-gray-300'"></div>
              </div>
            </label>
          </div>
        </div>

        <div class="mt-6 flex justify-end gap-3">
          <button @click="showModal = false" class="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 border rounded hover:bg-gray-100 dark:hover:bg-gray-800">Cancel</button>
          <button class="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">Save Assignments</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { UserIcon } from 'lucide-vue-next'

const showModal = ref(false)

const roles = ref([
  { name: 'Admin', type: 'System', active: true },
  { name: 'Manager', type: 'System', active: false },
  { name: 'Agent', type: 'System', active: false },
  { name: 'Finance', type: null, active: false },
  { name: 'Support', type: null, active: false }
])
</script>

<style scoped>
/* additional styles if needed */
</style>
