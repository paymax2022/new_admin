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
      <div v-else-if="selectedTab === 'Commission Structure'">
        <form class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 max-w-4xl mx-auto relative">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">Commission Structure</h2>
            <button type="submit" class="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 font-medium"><span>💾</span> Save Changes</button>
          </div>
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">Configure commission rates and tiers for referrals</p>
          <div class="flex items-center justify-between mb-6">
            <label class="font-medium text-gray-700 dark:text-gray-200">Enable Multi-Level Commissions</label>
            <input type="checkbox" v-model="commissionForm.multiLevel" class="toggle toggle-primary" />
          </div>
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Commission Type</label>
            <div class="flex gap-6">
              <label class="flex items-center gap-2">
                <input type="radio" value="percentage" v-model="commissionForm.type" />
                <span>Percentage of Transaction</span>
              </label>
              <label class="flex items-center gap-2">
                <input type="radio" value="fixed" v-model="commissionForm.type" />
                <span>Fixed Amount</span>
              </label>
              <label class="flex items-center gap-2">
                <input type="radio" value="hybrid" v-model="commissionForm.type" />
                <span>Hybrid % + Fixed</span>
              </label>
            </div>
          </div>
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Commission Calculation Basis</label>
            <select v-model="commissionForm.basis" class="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm dark:bg-gray-700 dark:text-gray-100">
              <option value="single">Single level</option>
              <option value="transaction">Per transaction</option>
              <option value="first">First purchase only</option>
              <option value="lifetime">Life Value</option>
            </select>
          </div>
          <div class="mb-6">
            <div class="flex justify-between items-center mb-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-200">Commission Tiers</label>
              <button type="button" class="px-3 py-1 rounded bg-gray-100 dark:bg-gray-700 text-sm font-medium border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600" @click="openAddTierModal">+ Add Tier</button>
            </div>
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
                <thead>
                  <tr class="bg-gray-50 dark:bg-gray-700">
                    <th class="px-4 py-2 text-left font-medium text-gray-500 dark:text-gray-300">Level</th>
                    <th class="px-4 py-2 text-left font-medium text-gray-500 dark:text-gray-300">Commission Rate</th>
                    <th class="px-4 py-2 text-left font-medium text-gray-500 dark:text-gray-300">Min Referrals</th>
                    <th class="px-4 py-2 text-left font-medium text-gray-500 dark:text-gray-300">Max Commission</th>
                    <th class="px-4 py-2 text-center font-medium text-gray-500 dark:text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(tier, idx) in commissionForm.tiers" :key="tier.id" class="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td class="px-4 py-2">Level {{ idx + 1 }}</td>
                    <td class="px-4 py-2"><input v-model="tier.rate" type="text" class="w-20 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 dark:bg-gray-700 dark:text-gray-100" /></td>
                    <td class="px-4 py-2"><input v-model="tier.minReferrals" type="number" min="0" class="w-16 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 dark:bg-gray-700 dark:text-gray-100" /></td>
                    <td class="px-4 py-2"><input v-model="tier.maxCommission" type="text" class="w-24 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 dark:bg-gray-700 dark:text-gray-100" /></td>
                    <td class="px-4 py-2 text-center">
                      <button type="button" class="text-blue-600 hover:text-blue-800 mr-2" @click="editTier(idx)"><span>✏️</span></button>
                      <button type="button" class="text-red-600 hover:text-red-800" @click="removeTier(idx)"><span>🗑️</span></button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Minimum Payout Threshold</label>
              <input v-model="commissionForm.minPayout" type="number" min="0" class="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm dark:bg-gray-700 dark:text-gray-100" placeholder="$0" />
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Minimum amount required before commission payout</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Commission Vesting Period</label>
              <input v-model="commissionForm.vestingPeriod" type="number" min="0" class="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm dark:bg-gray-700 dark:text-gray-100" placeholder="0" />
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Days commission is available after withdrawal</p>
            </div>
          </div>
        </form>
        <!-- Add Commission Tier Modal -->
        <TransitionRoot appear :show="showAddTierModal" as="template">
          <Dialog as="div" @close="showAddTierModal = false" class="relative z-50">
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <div class="fixed inset-0 bg-black/30 dark:bg-black/50" />
            </TransitionChild>
            <div class="fixed inset-y-0 right-0 overflow-y-auto">
              <div class="flex min-h-full justify-end">
                <TransitionChild
                  as="template"
                  enter="transform transition ease-in-out duration-300"
                  enter-from="translate-x-full"
                  enter-to="translate-x-0"
                  leave="transform transition ease-in-out duration-300"
                  leave-from="translate-x-0"
                  leave-to="translate-x-full"
                >
                  <DialogPanel class="w-full max-w-md bg-white dark:bg-gray-800 shadow-xl p-6">
                    <div class="flex justify-between items-center mb-4">
                      <DialogTitle class="text-xl font-semibold text-gray-900 dark:text-white">Add Commission Tier</DialogTitle>
                      <button @click="showAddTierModal = false" class="text-gray-400 hover:text-gray-600 text-2xl font-bold">&times;</button>
                    </div>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">Create a new commission tier for your referral program.</p>
                    <form @submit.prevent="handleAddTier">
                      <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Level</label>
                        <input v-model="newTier.level" type="number" min="1" class="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm dark:bg-gray-700 dark:text-gray-100" />
                      </div>
                      <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Rate (%)</label>
                        <input v-model="newTier.rate" type="number" min="0" class="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm dark:bg-gray-700 dark:text-gray-100" />
                      </div>
                      <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Min Referrals</label>
                        <input v-model="newTier.minReferrals" type="number" min="0" class="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm dark:bg-gray-700 dark:text-gray-100" />
                      </div>
                      <div class="mb-6">
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Max Commission</label>
                        <input v-model="newTier.maxCommission" type="number" min="0" class="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm dark:bg-gray-700 dark:text-gray-100" />
                      </div>
                      <div class="flex justify-end gap-3">
                        <button type="button" @click="showAddTierModal = false" class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">Cancel</button>
                        <button type="submit" class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700">Add Tier</button>
                      </div>
                    </form>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </Dialog>
        </TransitionRoot>
      </div>
      <div v-else-if="selectedTab === 'Rewards'">
        <form class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 max-w-3xl mx-auto relative">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">Rewards & Bonuses</h2>
            <button type="submit" class="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 font-medium"><span>💾</span> Save Changes</button>
          </div>
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">Configure additional rewards and bonuses for referrers</p>
          <div class="flex items-center justify-between mb-6">
            <label class="font-medium text-gray-700 dark:text-gray-200">Enable Sign-up Bonus</label>
            <input type="checkbox" v-model="rewardsForm.signupBonusEnabled" class="toggle toggle-primary" />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Sign-up Bonus Amount</label>
            <input v-model="rewardsForm.signupBonusAmount" type="number" min="0" class="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm dark:bg-gray-700 dark:text-gray-100" placeholder="$10" />
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">This message will be pre-filled when users share their referral links</p>
          </div>
          <div class="flex items-center justify-between mb-6">
            <label class="font-medium text-gray-700 dark:text-gray-200">Enable Milestone Bonuses</label>
            <input type="checkbox" v-model="rewardsForm.milestoneBonusEnabled" class="toggle toggle-primary" />
          </div>
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Milestone Bonuses</label>
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
                <thead>
                  <tr class="bg-gray-50 dark:bg-gray-700">
                    <th class="px-4 py-2 text-left font-medium text-gray-500 dark:text-gray-300">Milestone</th>
                    <th class="px-4 py-2 text-left font-medium text-gray-500 dark:text-gray-300">Bonus Amount</th>
                    <th class="px-4 py-2 text-left font-medium text-gray-500 dark:text-gray-300">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="bonus in rewardsForm.milestoneBonuses" :key="bonus.milestone" class="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td class="px-4 py-2">{{ bonus.milestone }}</td>
                    <td class="px-4 py-2">${{ bonus.amount }}</td>
                    <td class="px-4 py-2">
                      <span class="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-600">Active</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="flex items-center justify-between mb-2">
            <label class="font-medium text-gray-700 dark:text-gray-200">Enable Seasonal Promotions</label>
            <input type="checkbox" v-model="rewardsForm.seasonalPromosEnabled" class="toggle toggle-primary" />
          </div>
        </form>
      </div>
      <div v-else-if="selectedTab === 'Marketing Materials'">
        <form class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 max-w-3xl mx-auto relative">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">Marketing Materials</h2>
            <button type="submit" class="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 font-medium"><span>💾</span> Save Changes</button>
          </div>
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">Configure marketing materials for referrers to share</p>
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Referral Email Template</label>
            <textarea v-model="marketingForm.emailTemplate" rows="4" class="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm dark:bg-gray-700 dark:text-gray-100" />
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Use [referral_link] and [referrer_name] as placeholders</p>
          </div>
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Social Media Share Text</label>
            <textarea v-model="marketingForm.socialShareText" rows="2" class="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm dark:bg-gray-700 dark:text-gray-100" />
          </div>
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Referral Landing Page Content</label>
            <textarea v-model="marketingForm.landingContent" rows="3" class="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm dark:bg-gray-700 dark:text-gray-100" />
          </div>
          <div class="flex items-center justify-between mb-6">
            <label class="font-medium text-gray-700 dark:text-gray-200">Enable Social Media Sharing</label>
            <input type="checkbox" v-model="marketingForm.socialSharingEnabled" class="toggle toggle-primary" />
          </div>
          <div class="mb-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Enabled Social Platforms</label>
            <div class="flex flex-wrap gap-2 mt-2">
              <span v-for="platform in marketingForm.socialPlatforms" :key="platform" class="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200">{{ platform }}</span>
              <button type="button" class="px-3 py-1 rounded-full text-sm font-medium bg-gray-200 text-gray-600 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-300">+ Add Platforms</button>
            </div>
          </div>
        </form>
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
const commissionForm = ref({
  multiLevel: true,
  type: 'percentage',
  basis: 'single',
  tiers: [
    { id: 1, rate: '10%', minReferrals: 0, maxCommission: '$500' },
    { id: 2, rate: '10%', minReferrals: 0, maxCommission: '$500' },
    { id: 3, rate: '10%', minReferrals: 0, maxCommission: '$500' },
  ],
  minPayout: 0,
  vestingPeriod: 0,
})
const showAddTierModal = ref(false)
const newTier = ref({ level: '', rate: '', minReferrals: '', maxCommission: '' })
const rewardsForm = ref({
  signupBonusEnabled: true,
  signupBonusAmount: 10,
  milestoneBonusEnabled: true,
  milestoneBonuses: [
    { milestone: '6 Referrals', amount: 500 },
    { milestone: '5 Referrals', amount: 500 },
    { milestone: '3 Referrals', amount: 500 },
  ],
  seasonalPromosEnabled: true,
})
const marketingForm = ref({
  emailTemplate: `Hi [name],\n\nI've been using [Product Name] and thought you might like it too!\n\nSign up using my referral link and get a $10 bonus:\n[referral_link]\n\nBest,\n[referrer_name]`,
  socialShareText: `I'm loving [Product Name]! Sign up using my link and get a $10 bonus. [referral_link] #ProductName`,
  landingContent: `Welcome to [Product Name]!\n\nSign up now invited by [referrer_name] to join [Product Name].\n\nSign up below and win a $10 welcome bonus!`,
  socialSharingEnabled: true,
  socialPlatforms: ['Facebook', 'Twitter', 'LinkedIn', 'Whatsapp', 'Telegram', 'Instagram'],
})

function addTier() {
  commissionForm.value.tiers.push({
    id: Date.now(),
    rate: '',
    minReferrals: 0,
    maxCommission: '',
  })
}
function removeTier(idx) {
  commissionForm.value.tiers.splice(idx, 1)
}
function editTier(idx) {
  // Placeholder for edit action (UI only)
}
function openAddTierModal() {
  showAddTierModal.value = true
  newTier.value = { level: '', rate: '', minReferrals: '', maxCommission: '' }
}
function handleAddTier() {
  commissionForm.value.tiers.push({
    id: Date.now(),
    rate: newTier.value.rate + '%',
    minReferrals: newTier.value.minReferrals,
    maxCommission: '$' + newTier.value.maxCommission,
  })
  showAddTierModal.value = false
}
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