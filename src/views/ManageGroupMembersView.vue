<template>
  <div class="p-6 space-y-6">
    <div class="flex justify-between items-center mb-4">
      <div>
        <h1 class="text-2xl font-semibold">Group Management</h1>
        <div class="text-sm text-gray-500">Manage Group: Executive Board</div>
      </div>
      <button class="bg-black text-white rounded px-4 py-2 flex items-center gap-2 text-sm font-medium" @click="openAddMemberModal">
        <PlusIcon class="w-5 h-5" /> Add Member
      </button>
    </div>
    <div class="flex gap-4 mb-4 items-center">
      <input type="text" class="border rounded px-3 py-2 w-72" placeholder="Search group members..." />
      <button class="border rounded px-4 py-2 flex items-center gap-2 text-sm" @click="openExportMembersModal">
        <ArrowDownTrayIcon class="w-5 h-5" /> Export Members
      </button>
      <button class="border rounded px-4 py-2 flex items-center gap-2 text-sm"><ArrowUpTrayIcon class="w-5 h-5" /> Bulk import</button>
      <div class="flex-1 flex justify-end">
        <select class="border rounded px-3 py-2 text-sm">
          <option>All</option>
          <option>Active</option>
          <option>Pending</option>
          <option>Inactive</option>
        </select>
      </div>
    </div>
    <div class="bg-white dark:bg-gray-900 rounded-lg shadow p-0 overflow-x-auto">
      <table class="w-full text-sm">
        <thead>
          <tr class="text-left text-gray-500 border-b">
            <th class="py-2 px-4">Member</th>
            <th class="py-2 px-4">Role</th>
            <th class="py-2 px-4">Joined</th>
            <th class="py-2 px-4">Status</th>
            <th class="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="member in members" :key="member.email" class="border-b last:border-0">
            <td class="py-2 px-4 flex items-center gap-3">
              <img :src="member.avatar" class="w-8 h-8 rounded-full object-cover" />
              <div>
                <div class="font-medium">{{ member.name }}</div>
                <div class="text-xs text-gray-400">{{ member.email }}</div>
              </div>
            </td>
            <td class="py-2 px-4">
              <span v-if="member.role === 'Admin'" class="bg-gray-900 text-white text-xs px-2 py-1 rounded">Admin</span>
              <span v-else class="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">Member</span>
            </td>
            <td class="py-2 px-4">{{ member.joined }}</td>
            <td class="py-2 px-4">
              <span :class="member.status === 'Active' ? 'text-green-600' : member.status === 'Pending' ? 'text-yellow-500' : 'text-red-500'">{{ member.status }}</span>
            </td>
            <td class="py-2 px-4">
              <Menu as="div" class="relative inline-block text-left">
                <MenuButton class="flex items-center p-1 hover:bg-gray-100 rounded">
                  <EllipsisVerticalIcon class="w-5 h-5 text-gray-400" />
                </MenuButton>
                <MenuItems class="absolute right-0 mt-2 w-40 origin-top-right bg-white border border-gray-200 rounded shadow-lg focus:outline-none z-10">
                  <MenuItem>
                    <button class="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2" @click="openSendMessageModal(member)">
                      <EnvelopeIcon class="w-4 h-4" /> Send message
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button class="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2" @click="openChangeRoleModal(member)">
                      <UserIcon class="w-4 h-4" /> Change role
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button class="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 flex items-center gap-2" @click="openRemoveMemberModal(member)">
                      <TrashIcon class="w-4 h-4" /> Remove from Group
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <SendMessageModal
      v-if="showSendMessageModal && selectedMember"
      :member="selectedMember"
      @close="closeSendMessageModal"
      @send="handleSendMessage"
    />
    <ChangeRoleModal
      v-if="showChangeRoleModal && selectedRoleMember"
      :member="selectedRoleMember"
      @close="closeChangeRoleModal"
      @change="handleRoleChange"
    />
    <RemoveMemberModal
      v-if="showRemoveMemberModal && selectedRemoveMember"
      :member="selectedRemoveMember"
      @close="closeRemoveMemberModal"
      @remove="handleRemoveMember"
    />
    <ExportMembersModal
      v-if="showExportMembersModal"
      @close="closeExportMembersModal"
      @export="handleExportMembers"
    />
    <AddMemberModal
      v-if="showAddMemberModal"
      @close="closeAddMemberModal"
      @add="handleAddMember"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { PlusIcon, ArrowDownTrayIcon, ArrowUpTrayIcon, EllipsisVerticalIcon, EnvelopeIcon, UserIcon, TrashIcon } from '@heroicons/vue/24/outline';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';
import SendMessageModal from '@/components/SendMessageModal.vue';
import ChangeRoleModal from '@/components/ChangeRoleModal.vue';
import RemoveMemberModal from '@/components/RemoveMemberModal.vue';
import ExportMembersModal from '@/components/ExportMembersModal.vue';
import AddMemberModal from '@/components/AddMemberModal.vue';

const members = [
  { name: 'Alex Johnson', email: 'alex.johnson@email.com', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', role: 'Admin', joined: '2023-05-12', status: 'Active' },
  { name: 'Sarah Williams', email: 'sarah.williams@email.com', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', role: 'Member', joined: '2023-05-13', status: 'Active' },
  { name: 'Michael Brown', email: 'michael.brown@email.com', avatar: 'https://randomuser.me/api/portraits/men/45.jpg', role: 'Member', joined: '2023-05-16', status: 'Pending' },
  { name: 'Emily Davis', email: 'emily.davis@email.com', avatar: 'https://randomuser.me/api/portraits/women/65.jpg', role: 'Admin', joined: '2023-05-18', status: 'Active' },
  { name: 'David Wilson', email: 'david.wilson@email.com', avatar: 'https://randomuser.me/api/portraits/men/77.jpg', role: 'Member', joined: '2023-05-17', status: 'Inactive' },
];

const showSendMessageModal = ref(false);
const selectedMember = ref(null);
const showChangeRoleModal = ref(false);
const selectedRoleMember = ref(null);
const showRemoveMemberModal = ref(false);
const selectedRemoveMember = ref(null);
const showExportMembersModal = ref(false);
const showAddMemberModal = ref(false);

function openSendMessageModal(member) {
  selectedMember.value = member;
  showSendMessageModal.value = true;
}

function closeSendMessageModal() {
  showSendMessageModal.value = false;
  selectedMember.value = null;
}

function handleSendMessage(payload) {
  // Handle sending message here (e.g., API call)
  closeSendMessageModal();
}

function openChangeRoleModal(member) {
  selectedRoleMember.value = member;
  showChangeRoleModal.value = true;
}

function closeChangeRoleModal() {
  showChangeRoleModal.value = false;
  selectedRoleMember.value = null;
}

function handleRoleChange(payload) {
  // Handle role change here (e.g., API call)
  closeChangeRoleModal();
}

function openRemoveMemberModal(member) {
  selectedRemoveMember.value = member;
  showRemoveMemberModal.value = true;
}

function closeRemoveMemberModal() {
  showRemoveMemberModal.value = false;
  selectedRemoveMember.value = null;
}

function handleRemoveMember(member) {
  // Handle member removal here (e.g., API call)
  closeRemoveMemberModal();
}

function openExportMembersModal() {
  showExportMembersModal.value = true;
}

function closeExportMembersModal() {
  showExportMembersModal.value = false;
}

function handleExportMembers(payload) {
  // Handle export logic here (e.g., API call or file download)
  closeExportMembersModal();
}

function openAddMemberModal() {
  showAddMemberModal.value = true;
}

function closeAddMemberModal() {
  showAddMemberModal.value = false;
}

function handleAddMember(payload) {
  // Handle add member logic here (e.g., API call)
  closeAddMemberModal();
}
</script> 