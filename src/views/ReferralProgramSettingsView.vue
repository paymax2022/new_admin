<template>
  <div class="p-6 bg-white dark:bg-gray-900 min-h-screen">
    <h1 class="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">Referral Program Settings</h1>
    <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">Configure and manage how the referral system works</p>
    <div>
      <div class="border-b border-gray-200 dark:border-gray-700 mb-6">
        <nav class="-mb-px flex space-x-8" aria-label="Tabs">
          <button v-for="tab in tabs" :key="tab" @click="selectedTab = tab" :class="[selectedTab === tab ? 'border-blue-600 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200', 'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm focus:outline-none']">
            {{ tab }}
          </button>
        </nav>
      </div>
      <div v-if="selectedTab === 'General Settings'">
        <form class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 max-w-2xl">
          <h2 class="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Program Status</h2>
          <div class="flex items-center justify-between mb-6">
            <label class="font-medium text-gray-700 dark:text-gray-200">Enable Referral Program</label>
            <input type="checkbox" v-model="form.enabled" class="toggle toggle-primary" />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Referral Link Format</label>
            <input v-model="form.linkFormat" type="text" class="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm dark:bg-gray-700 dark:text-gray-100" placeholder="https://example.com/ref/{userId}/{referralCode}" />
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Use {referral_code} as a placeholder for the user's unique referral code</p>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Maximum Referral Levels</label>
            <select v-model="form.maxLevels" class="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm dark:bg-gray-700 dark:text-gray-100">
              <option value="1">1 level</option>
              <option value="2">2 level</option>
              <option value="3">3 level</option>
              <option value="4">4 level</option>
              <option value="5">5 level</option>
            </select>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">How many levels deep in the referral tree to track and reward</p>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Referral Code Format</label>
            <select v-model="form.codeFormat" class="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm dark:bg-gray-700 dark:text-gray-100">
              <option value="alphanumeric">Alphanumeric (e.g., A45B59)</option>
              <option value="numeric">Numeric (e.g., 123456)</option>
              <option value="letters">Letters Only (e.g., ABCDEF)</option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Referral Code length</label>
            <select v-model="form.codeLength" class="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm dark:bg-gray-700 dark:text-gray-100">
              <option v-for="n in [4,5,6,7,8,9,10]" :key="n" :value="n">{{ n }}</option>
            </select>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Length of automatically generated referral codes</p>
          </div>
          <div class="flex items-center justify-between mb-4">
            <label class="font-medium text-gray-700 dark:text-gray-200">Allow Custom Referral Codes</label>
            <input type="checkbox" v-model="form.allowCustom" class="toggle toggle-primary" />
          </div>
          <div class="flex items-center justify-between mb-6">
            <label class="font-medium text-gray-700 dark:text-gray-200">Require Email Verification</label>
            <input type="checkbox" v-model="form.requireEmailVerification" class="toggle toggle-primary" />
          </div>
          <div class="flex gap-2 justify-end">
            <button type="button" class="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">Reset</button>
            <button type="submit" class="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 font-medium">Save Changes</button>
          </div>
        </form>
      </div>
      <div v-else class="text-gray-500 dark:text-gray-400 p-8 text-center">
        <span v-if="selectedTab === 'Commission Structure'">Commission Structure settings coming soon.</span>
        <span v-else-if="selectedTab === 'Rewards'">Rewards settings coming soon.</span>
        <span v-else-if="selectedTab === 'Marketing Materials'">Marketing Materials coming soon.</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const tabs = ['General Settings', 'Commission Structure', 'Rewards', 'Marketing Materials']
const selectedTab = ref('General Settings')
const form = ref({
  enabled: true,
  linkFormat: 'https://example.com/ref/{userId}/{referralCode}',
  maxLevels: '2',
  codeFormat: 'alphanumeric',
  codeLength: 6,
  allowCustom: true,
  requireEmailVerification: true
})
</script>

<style scoped>
.toggle {
  width: 2.5rem;
  height: 1.25rem;
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
  left: 0.25rem;
  top: 0.2rem;
  width: 0.85rem;
  height: 0.85rem;
  background: #fff;
  border-radius: 9999px;
  transition: transform 0.2s;
}
.toggle:checked:before {
  transform: translateX(1.25rem);
}
</style> 