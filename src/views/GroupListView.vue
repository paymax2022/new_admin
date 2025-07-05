<template>
  <div class="p-6 space-y-6">
    <div class="flex justify-between items-center mb-4">
      <div>
        <h1 class="text-2xl font-semibold">Group Management</h1>
        <div class="text-sm text-gray-500">Group Directory</div>
      </div>
      <button
        class="bg-black text-white rounded px-4 py-2 flex items-center gap-2 text-sm font-medium"
        @click="showCreateModal = true"
      >
        <PlusIcon class="w-5 h-5" /> + Create Group
      </button>
    </div>
    <div class="flex gap-4 mb-4">
      <div class="flex gap-2">
        <button v-for="tab in tabs" :key="tab" @click="activeTab = tab" :class="['px-4 py-2 rounded font-medium', activeTab === tab ? 'bg-black text-white' : 'bg-gray-100 text-gray-500']">{{ tab }}</button>
      </div>
      <div class="flex-1 flex gap-2 justify-end">
        <input type="text" class="border rounded px-3 py-2 w-64" placeholder="Search groups" />
        <button class="border rounded px-4 py-2 flex items-center gap-2"><AdjustmentsHorizontalIcon class="w-5 h-5" /> Filter</button>
      </div>
    </div>
    <div class="bg-white dark:bg-gray-900 rounded-lg shadow p-0 overflow-x-auto">
      <table class="w-full text-sm">
        <thead>
          <tr class="text-left text-gray-500 border-b">
            <th class="py-2 px-4">Name</th>
            <th class="py-2 px-4">Members</th>
            <th class="py-2 px-4">Visibility</th>
            <th class="py-2 px-4">Created</th>
            <th class="py-2 px-4">Status</th>
            <th class="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="group in groups" :key="group.name" class="border-b last:border-0">
            <td class="py-2 px-4 font-medium">{{ group.name }}</td>
            <td class="py-2 px-4">{{ group.members }}</td>
            <td class="py-2 px-4">{{ group.visibility }}</td>
            <td class="py-2 px-4">{{ group.created }}</td>
            <td class="py-2 px-4">
              <span :class="group.status === 'Active' ? 'text-green-600' : 'text-red-500'">{{ group.status }}</span>
            </td>
            <td class="py-2 px-4">
              <Menu as="div" class="relative inline-block text-left">
                <MenuButton class="flex items-center p-1 hover:bg-gray-100 rounded">
                  <EllipsisVerticalIcon class="w-5 h-5 text-gray-400" />
                </MenuButton>
                <MenuItems class="absolute right-0 mt-2 w-32 origin-top-right bg-white border border-gray-200 rounded shadow-lg focus:outline-none z-10">
                  <MenuItem>
                    <button
                      class="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                      @click="openEditModal(group)"
                    >
                      <PencilIcon class="w-4 h-4" /> Edit group
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button
                      class="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 flex items-center gap-2"
                      @click="openDeleteModal(group)"
                    >
                      <TrashIcon class="w-4 h-4" /> Delete
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <CreateGroupModal v-if="showCreateModal" @close="showCreateModal = false" @created="onGroupCreated" />
    <EditGroupModal
      v-if="showEditModal && groupToEdit"
      :group="groupToEdit"
      @close="showEditModal = false"
      @updated="onGroupUpdated"
    />
    <DeleteGroupConfirmModal
      v-if="showDeleteModal"
      :group="groupToDelete"
      @close="showDeleteModal = false"
      @confirm="onGroupDeleteConfirmed"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { PlusIcon, AdjustmentsHorizontalIcon, EllipsisVerticalIcon, PencilIcon, TrashIcon } from '@heroicons/vue/24/outline';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';
import CreateGroupModal from '@/components/CreateGroupModal.vue';
import EditGroupModal from '@/components/EditGroupModal.vue';
import DeleteGroupConfirmModal from '@/components/DeleteGroupConfirmModal.vue';

const tabs = ['All Groups', 'Active', 'Inactive'];
const activeTab = ref('All Groups');
const groups = [
  { name: 'Executive Board', members: 9, visibility: 'Private', created: '2023-04-15', status: 'Active' },
  { name: 'Marketing Committee', members: 12, visibility: 'Public', created: '2023-05-22', status: 'Active' },
  { name: 'Finance Team', members: 7, visibility: 'Private', created: '2023-06-10', status: 'Inactive' },
  { name: 'Event Planning', members: 13, visibility: 'Public', created: '2023-07-09', status: 'Active' },
  { name: 'Technology Committee', members: 224, visibility: 'Public', created: '2023-08-18', status: 'Inactive' },
];

const showCreateModal = ref(false);
const showEditModal = ref(false);
const showDeleteModal = ref(false);
const groupToEdit = ref(null);
const groupToDelete = ref(null);

function onGroupCreated(newGroup) {
  // Add the new group to your groups array or handle as needed
  // groups.push(newGroup); // If groups is reactive
}

function onGroupUpdated(updatedGroup) {
  // Find and update the group in your groups array as needed
  // Example:
  // const idx = groups.findIndex(g => g.name === updatedGroup.name);
  // if (idx !== -1) groups[idx] = updatedGroup;
}

function openEditModal(group) {
  groupToEdit.value = { ...group };
  showEditModal.value = true;
}

function openDeleteModal(group) {
  groupToDelete.value = { ...group };
  showDeleteModal.value = true;
}

function onGroupDeleteConfirmed(group) {
  // Remove the group from your groups array as needed
  // Example:
  // const idx = groups.findIndex(g => g.name === group.name);
  // if (idx !== -1) groups.splice(idx, 1);
}
</script> 