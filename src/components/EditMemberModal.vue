<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
    <div class="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-lg p-0 relative">
      <!-- Close Button -->
      <button class="absolute top-4 right-4 text-gray-400 hover:text-black dark:hover:text-white text-2xl" @click="$emit('close')">&times;</button>
      <div class="px-8 pt-8 pb-4">
        <h2 class="font-semibold text-lg mb-4">Edit Member - {{ member.name }}</h2>
        <form @submit.prevent>
          <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label class="block text-xs mb-1 font-medium">Full Name</label>
              <input type="text" class="w-full border rounded px-2 py-2" :value="member.name" />
            </div>
            <div>
              <label class="block text-xs mb-1 font-medium">Email Address</label>
              <input type="email" class="w-full border rounded px-2 py-2" :value="member.email" />
            </div>
            <div>
              <label class="block text-xs mb-1 font-medium">Membership Type</label>
              <select class="w-full border rounded px-2 py-2">
                <option>Premium</option>
                <option>Basic</option>
                <option>Student</option>
              </select>
            </div>
            <div>
              <label class="block text-xs mb-1 font-medium">Account Status</label>
              <select class="w-full border rounded px-2 py-2">
                <option>Active</option>
                <option>Suspended</option>
              </select>
            </div>
            <div>
              <label class="block text-xs mb-1 font-medium">Subscription Status</label>
              <select class="w-full border rounded px-2 py-2">
                <option>Paid</option>
                <option>Overdue</option>
                <option>Grace Period</option>
              </select>
            </div>
          </div>
          <div class="mb-4">
            <label class="block text-xs mb-1 font-medium">Current Status Preview</label>
            <div class="flex gap-2">
              <span v-if="member.status === 'Active'" class="px-3 py-1 rounded-full bg-green-100 text-green-600 text-xs font-semibold">Active</span>
              <span v-if="member.status === 'Suspended'" class="px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-semibold">Suspended</span>
              <span v-if="member.type" class="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-semibold">{{ member.type }}</span>
            </div>
          </div>
          <div class="flex gap-2 mt-6">
            <button class="flex-1 bg-black text-white rounded px-4 py-2 font-medium">Update Member</button>
            <button class="flex-1 border rounded px-4 py-2 font-medium" @click="$emit('close')">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  member: Object
});
</script> 