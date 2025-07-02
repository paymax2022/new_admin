<template>
  <div class="p-6 space-y-6">
    <!-- Header -->
    <div>
      <h1 class="text-2xl font-semibold mb-1">Member Management</h1>
      <p class="text-gray-500 dark:text-gray-400 text-sm">Monitor your organization's key metrics and performance</p>
    </div>
    <!-- Tabs -->
    <div class="flex gap-6 border-b mb-4">
      <button v-for="tab in tabs" :key="tab" @click="activeTab = tab" :class="['pb-2 px-1 font-medium', activeTab === tab ? 'border-b-2 border-black text-black dark:border-white dark:text-white' : 'text-gray-400']">{{ tab }}</button>
    </div>
    <!-- Search and Filter -->
    <div class="flex gap-4 items-center mb-2">
      <input type="text" class="flex-1 border rounded px-3 py-2" placeholder="Search members by name or email" />
      <select class="border rounded px-3 py-2 w-40">
        <option>All Status</option>
        <option>Active</option>
        <option>Suspended</option>
        <option>Overdue</option>
      </select>
    </div>
    <!-- Members Table -->
    <div class="bg-white dark:bg-gray-900 rounded-lg shadow p-0 overflow-x-auto">
      <table class="w-full text-sm">
        <thead>
          <tr class="text-left text-gray-500 border-b">
            <th class="py-2 px-4">Member</th>
            <th class="py-2 px-4">Membership Type</th>
            <th class="py-2 px-4">Status</th>
            <th class="py-2 px-4">Subscription</th>
            <th class="py-2 px-4">Subscription</th>
            <th class="py-2 px-4">Last Active</th>
            <th class="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(member, i) in members" :key="i" class="border-b last:border-0">
            <td class="py-2 px-4">
              <div class="font-medium">{{ member.name }}</div>
              <div class="text-xs text-gray-400">{{ member.email }}</div>
            </td>
            <td class="py-2 px-4">{{ member.type }}</td>
            <td class="py-2 px-4">
              <span :class="member.status === 'Active' ? 'text-green-500' : member.status === 'Suspended' ? 'text-red-500' : ''">{{ member.status }}</span>
            </td>
            <td class="py-2 px-4">
              <span :class="member.subscription === 'Paid' ? 'text-green-500' : member.subscription === 'Overdue' ? 'text-red-500' : member.subscription === 'Grace Period' ? 'text-yellow-500' : ''">{{ member.subscription }}</span>
            </td>
            <td class="py-2 px-4">{{ member.subscriptionDate }}</td>
            <td class="py-2 px-4">{{ member.lastActive }}</td>
            <td class="py-2 px-4 flex gap-2">
              <button class="hover:bg-gray-100 rounded p-1"><component :is="icons.PencilIcon" class="w-4 h-4 text-gray-400" /></button>
              <button class="hover:bg-gray-100 rounded p-1"><component :is="icons.EyeIcon" class="w-4 h-4 text-gray-400" /></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { PencilIcon, EyeIcon } from '@heroicons/vue/24/outline';
const tabs = ['Member Directory', 'Membership Types', 'Onboarding'];
const activeTab = ref('Member Directory');
const icons = { PencilIcon, EyeIcon };
const members = [
  { name: 'John Doe', email: 'john@example.com', type: 'Premium', status: 'Active', subscription: 'Paid', subscriptionDate: '2024-01-15', lastActive: '2 hours ago' },
  { name: 'Jane Smith', email: 'jane@example.com', type: 'Basic', status: 'Suspended', subscription: 'Overdue', subscriptionDate: '2024-01-15', lastActive: '2 hours ago' },
  { name: 'Bob Johnson', email: 'bob@example.com', type: 'Student', status: 'Suspended', subscription: 'Overdue', subscriptionDate: '2024-01-15', lastActive: '2 hours ago' },
  { name: 'Sarah Wilson', email: 'sarah@example.com', type: 'Student', status: 'Active', subscription: 'Grace Period', subscriptionDate: '2024-01-15', lastActive: '2 hours ago' },
];
</script> 