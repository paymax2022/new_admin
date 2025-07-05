<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-semibold">Gamification Management</h1>
      <div class="flex gap-2">
        <button class="flex items-center gap-2 border px-4 py-2 rounded font-medium text-sm"><svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2l2.09 6.26L20 9.27l-5 3.64L16.18 20 12 16.9 7.82 20 9 12.91l-5-3.64 5.91-.01z"/></svg>Configure Rules</button>
        <button class="flex items-center gap-2 bg-black text-white px-4 py-2 rounded font-medium text-sm"><svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>Create Badge</button>
      </div>
    </div>
    <div class="flex gap-6 mb-6 border-b">
      <button v-for="tab in tabs" :key="tab" @click="activeTab = tab" class="pb-2 px-4 font-medium" :class="activeTab === tab ? 'border-b-2 border-black' : 'text-gray-400'">{{ tab }}</button>
    </div>
    <div v-if="activeTab === 'Overview'">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div class="bg-white border rounded-xl p-4 flex flex-col items-center">
          <span class="mb-2"><svg class="w-7 h-7 text-yellow-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg></span>
          <div class="text-2xl font-bold mb-1">4</div>
          <div class="text-xs text-gray-500">Active Badges</div>
        </div>
        <div class="bg-white border rounded-xl p-4 flex flex-col items-center">
          <span class="mb-2"><svg class="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 17v-6a2 2 0 012-2h2a2 2 0 012 2v6m6 0v-4a2 2 0 012-2h2a2 2 0 012 2v4M13 21h-2"/></svg></span>
          <div class="text-2xl font-bold mb-1">3</div>
          <div class="text-xs text-gray-500">Leaderboards</div>
        </div>
        <div class="bg-white border rounded-xl p-4 flex flex-col items-center">
          <span class="mb-2"><svg class="w-7 h-7 text-purple-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 17.75L18.2 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg></span>
          <div class="text-2xl font-bold mb-1">546</div>
          <div class="text-xs text-gray-500">Total Badges Earned</div>
        </div>
        <div class="bg-white border rounded-xl p-4 flex flex-col items-center">
          <span class="mb-2"><svg class="w-7 h-7 text-emerald-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg></span>
          <div class="text-2xl font-bold mb-1">87%</div>
          <div class="text-xs text-gray-500">Member Participation</div>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white border rounded-xl p-6">
          <div class="font-semibold mb-4">Top Performing Badges</div>
          <div class="flex flex-col gap-4">
            <div class="flex items-center gap-3">
              <span class="text-red-500"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 110 16 8 8 0 010-16zm0 2a6 6 0 100 12A6 6 0 0010 4zm0 2a4 4 0 110 8 4 4 0 010-8z"/></svg></span>
              <div>
                <div class="font-medium text-sm">Active Contributor</div>
                <div class="text-xs text-gray-400">89 earned</div>
              </div>
              <div class="ml-auto text-xs text-gray-500">18%<span class="ml-1">completion</span></div>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-pink-500"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><rect x="2" y="2" width="16" height="16" rx="4"/></svg></span>
              <div>
                <div class="font-medium text-sm">Meeting Master</div>
                <div class="text-xs text-gray-400">156 earned</div>
              </div>
              <div class="ml-auto text-xs text-gray-500">31%<span class="ml-1">completion</span></div>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-yellow-400"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><polygon points="10,2 12,8 18,8 13,12 15,18 10,14 5,18 7,12 2,8 8,8"/></svg></span>
              <div>
                <div class="font-medium text-sm">Survey Star</div>
                <div class="text-xs text-gray-400">234 earned</div>
              </div>
              <div class="ml-auto text-xs text-gray-500">47%<span class="ml-1">completion</span></div>
            </div>
          </div>
        </div>
        <div class="bg-white border rounded-xl p-6">
          <div class="font-semibold mb-4">Leaderboard Activity</div>
          <div class="flex flex-col gap-3">
            <div class="flex items-center gap-2 text-sm">
              <span class="text-blue-500"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 17v-6a2 2 0 012-2h2a2 2 0 012 2v6m6 0v-4a2 2 0 012-2h2a2 2 0 012 2v4M13 21h-2"/></svg></span>
              <span>Top Action Completers</span>
              <span class="ml-auto text-xs text-gray-400">346 participants</span>
              <span class="text-xs text-gray-400 ml-2">Weekly refresh</span>
            </div>
            <div class="flex items-center gap-2 text-sm">
              <span class="text-emerald-500"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="7" r="4"/><path d="M5.5 21v-2A4.5 4.5 0 0110 14.5h4A4.5 4.5 0 0118.5 19v2"/></svg></span>
              <span>Most Active Members</span>
              <span class="ml-auto text-xs text-gray-400">428 participants</span>
              <span class="text-xs text-gray-400 ml-2">Monthly refresh</span>
            </div>
            <div class="flex items-center gap-2 text-sm">
              <span class="text-yellow-500"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 17.75L18.2 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg></span>
              <span>Survey Participation</span>
              <span class="ml-auto text-xs text-gray-400">289 participants</span>
              <span class="text-xs text-gray-400 ml-2">Monthly refresh</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Other tabs can be implemented similarly -->
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const tabs = ['Overview', 'Badges', 'Leader boards', 'Member Progress'];
const activeTab = ref('Overview');
</script> 