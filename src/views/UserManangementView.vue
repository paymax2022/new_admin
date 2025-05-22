<template>
  <div class="p-6">
    <!-- Search & Filters -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
      <input v-model="search" type="text" placeholder="Search name/email" class="input w-full md:w-64" />

      <div class="flex gap-2 flex-wrap">
        <DropdownFilter
          v-model="selectedStatus"
          label="All Status"
          :options="statuses"
        />
        <DropdownFilter
          v-model="selectedRole"
          label="All Roles"
          :options="roles"
        />
        <DropdownAction
          :selected="selectedRows"
          @assign="assignRoles"
          @export="exportUsers"
          @delete="deleteSelected"
        />
        <button class="btn btn-primary">Export</button>
        <button class="btn btn-primary">+ Add User</button>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto rounded border bg-white dark:bg-gray-900">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
        <thead class="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th class="px-4 py-2">
              <input type="checkbox" @change="toggleSelectAll" :checked="allSelected" />
            </th>
            <th class="px-4 py-2">ID</th>
            <th class="px-4 py-2">Name</th>
            <th class="px-4 py-2">Email</th>
            <th class="px-4 py-2">Role</th>
            <th class="px-4 py-2">Status</th>
            <th class="px-4 py-2">Registration</th>
            <th class="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in paginatedUsers"
            :key="user.id"
            class="hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <td class="px-4 py-2">
              <input type="checkbox" v-model="selectedRows" :value="user.id" />
            </td>
            <td class="px-4 py-2">{{ user.id }}</td>
            <td class="px-4 py-2">{{ user.name }}</td>
            <td class="px-4 py-2">{{ user.email }}</td>
            <td class="px-4 py-2">{{ user.role }}</td>
            <td class="px-4 py-2">
              <span :class="statusBadgeClass(user.status)">
                {{ user.status }}
              </span>
            </td>
            <td class="px-4 py-2">{{ user.registration }}</td>
            <td class="px-4 py-2">
              <RowActionMenu :user="user" @delete="deleteUser" />
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <div class="flex justify-between items-center px-4 py-3 border-t text-sm dark:text-white">
        <span>Showing {{ startIndex + 1 }} - {{ endIndex }} of {{ filteredUsers.length }}</span>
        <div class="flex gap-2">
          <button class="btn" :disabled="currentPage === 1" @click="currentPage--">Previous</button>
          <button class="btn" :disabled="endIndex >= filteredUsers.length" @click="currentPage++">Next</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import DropdownFilter from '@/components/DropdownFilter.vue'
import DropdownAction from '@/components/DropdownAction.vue'
import RowActionMenu from '@/components/RowActionMenu.vue'

const search = ref('')
const selectedStatus = ref('All Status')
const selectedRole = ref('All Roles')
const selectedRows = ref([])

const statuses = ['All Status', 'Active', 'Inactive', 'Suspended']
const roles = ['All Roles', 'Admin', 'Agent', 'Customer']

const generateUsers = () => {
  const dummy = []
  for (let i = 1; i <= 100; i++) {
    dummy.push({
      id: `U${1000 + i}`,
      name: `User ${i}`,
      email: `user${i}@example.com`,
      role: roles[i % roles.length] || 'Customer',
      status: statuses[i % statuses.length] || 'Active',
      registration: `2023-01-${(i % 28 + 1).toString().padStart(2, '0')}`,
    })
  }
  return dummy
}

const users = ref(generateUsers())
const allSelected = computed(() => selectedRows.value.length === users.value.length)

const filteredUsers = computed(() => {
  return users.value.filter(u => {
    return (
      (selectedStatus.value === 'All Status' || u.status === selectedStatus.value) &&
      (selectedRole.value === 'All Roles' || u.role === selectedRole.value) &&
      (u.name.toLowerCase().includes(search.value.toLowerCase()) || u.email.toLowerCase().includes(search.value.toLowerCase()))
    )
  })
})

const currentPage = ref(1)
const perPage = 10
const startIndex = computed(() => (currentPage.value - 1) * perPage)
const endIndex = computed(() => Math.min(startIndex.value + perPage, filteredUsers.value.length))
const paginatedUsers = computed(() => filteredUsers.value.slice(startIndex.value, endIndex.value))

function toggleSelectAll() {
  selectedRows.value = allSelected.value ? [] : users.value.map(u => u.id)
}

function statusBadgeClass(status) {
  const base = 'px-2 py-1 rounded text-xs font-medium'
  switch (status) {
    case 'Active': return `${base} bg-green-100 text-green-800`
    case 'Suspended': return `${base} bg-yellow-100 text-yellow-800`
    case 'Inactive': return `${base} bg-red-100 text-red-800`
    default: return base
  }
}

function assignRoles() {
  alert(`Assigning roles to: ${selectedRows.value.join(', ')}`)
}

function exportUsers() {
  alert(`Exporting ${selectedRows.value.length} users`)
}

function deleteSelected() {
  users.value = users.value.filter(u => !selectedRows.value.includes(u.id))
  selectedRows.value = []
}

function deleteUser(id) {
  users.value = users.value.filter(u => u.id !== id)
}
</script>

<style scoped>
.input {
  @apply px-3 py-2 border rounded dark:bg-gray-800 dark:text-white;
}
.btn {
  @apply px-3 py-2 text-sm font-medium border rounded disabled:opacity-50;
}
.btn-primary {
  @apply bg-blue-600 text-white hover:bg-blue-700;
}
</style>
