<template>
  <div class="min-h-screen bg-white p-6">
    <!-- Header Section -->
    <div class="mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 mb-1">Referral System</h1>
        <p class="text-xs text-gray-600">Track and manage contestant referrals</p>
      </div>
    </div>

    <!-- Key Metrics Section -->
    <div class="grid grid-cols-4 gap-6 mb-6">
      <!-- Total Referrals -->
      <div class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
        <div class="flex items-center justify-between mb-4">
          <h4 class="text-sm font-medium text-gray-600">Total Referrals</h4>
          <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10l5 5m0-5l-5 5" />
          </svg>
        </div>
        <h3 class="text-4xl font-bold text-gray-900 mb-1">1,267</h3>
      </div>

      <!-- Successful Conversions -->
      <div class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
        <div class="flex items-center justify-between mb-4">
          <h4 class="text-sm font-medium text-gray-600">Successful Conversions</h4>
          <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h3 class="text-4xl font-bold text-gray-900 mb-1">945</h3>
      </div>

      <!-- Conversion Rate -->
      <div class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
        <div class="flex items-center justify-between mb-4">
          <h4 class="text-sm font-medium text-gray-600">Conversion Rate</h4>
          <span class="inline-flex items-center px-2 py-0.5 bg-green-400 text-white text-xs font-semibold rounded">+5.2%</span>
        </div>
        <h3 class="text-4xl font-bold text-gray-900 mb-1">74.6%</h3>
      </div>

      <!-- Active Links -->
      <div class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
        <div class="flex items-center justify-between mb-4">
          <h4 class="text-sm font-medium text-gray-600">Active Links</h4>
          <svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
          </svg>
        </div>
        <h3 class="text-4xl font-bold text-gray-900 mb-1">3</h3>
      </div>
    </div>

    <!-- Sub-navigation Tabs -->
    <div class="flex items-center gap-6 border-b border-gray-200 mb-6">
      <button @click="activeTab = 'tracking'" class="pb-2 relative">
        <span class="text-sm font-medium" :class="activeTab === 'tracking' ? 'text-gray-900' : 'text-gray-500'">Referral Tracking</span>
        <div v-if="activeTab === 'tracking'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></div>
      </button>
      <button @click="activeTab = 'top-referrers'" class="pb-2 relative">
        <span class="text-sm font-medium" :class="activeTab === 'top-referrers' ? 'text-gray-900' : 'text-gray-500'">Top Referrers</span>
        <div v-if="activeTab === 'top-referrers'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></div>
      </button>
      <button @click="activeTab = 'link-management'" class="pb-2 relative">
        <span class="text-sm font-medium" :class="activeTab === 'link-management' ? 'text-gray-900' : 'text-gray-500'">Link Management</span>
        <div v-if="activeTab === 'link-management'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></div>
      </button>
    </div>

    <!-- Contestant Referrals List -->
    <div v-if="activeTab === 'tracking'">
      <h2 class="text-lg font-bold text-gray-900 mb-4">Contestant Referrals</h2>
      <div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div class="divide-y divide-gray-200">
          <!-- Referral Row -->
          <div v-for="(referral, index) in referrals" :key="index" class="p-6 hover:bg-gray-50 transition-colors">
            <div class="grid grid-cols-12 gap-6 items-center">
              <!-- Left Column - Contestant Details -->
              <div class="col-span-3">
                <div class="flex items-center gap-3">
                  <div>
                    <h3 class="text-base font-semibold text-gray-900 mb-1">{{ referral.name }}</h3>
                    <p class="text-xs text-gray-500">{{ referral.id }}</p>
                  </div>
                  <span class="inline-flex items-center px-2.5 py-0.5 bg-gray-300 text-white text-xs font-semibold rounded-full whitespace-nowrap">
                    {{ referral.status }}
                  </span>
                </div>
              </div>

              <!-- Middle Columns - Referral Statistics -->
              <div class="col-span-6 grid grid-cols-3 gap-6">
                <div>
                  <p class="text-xs text-gray-500 mb-1">Total Referrals</p>
                  <p class="text-base font-semibold text-gray-900">{{ referral.totalReferrals }}</p>
                </div>
                <div>
                  <p class="text-xs text-gray-500 mb-1">Successful</p>
                  <p class="text-base font-semibold text-green-600">{{ referral.successful }}</p>
                </div>
                <div>
                  <p class="text-xs text-gray-500 mb-1">Conversion Rate</p>
                  <p class="text-base font-semibold text-gray-900">{{ referral.conversionRate }}</p>
                </div>
              </div>

              <!-- Right Column - Referral Link -->
              <div class="col-span-3">
                <div class="flex items-center gap-2">
                  <div class="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg">
                    <p class="text-sm text-gray-900 truncate">{{ referral.referralLink }}</p>
                  </div>
                  <button @click="copyLink(referral.referralLink)" class="px-3 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-lg transition-colors">
                    <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Top Referrers Tab -->
    <div v-if="activeTab === 'top-referrers'">
      <h2 class="text-lg font-bold text-gray-900 mb-4">Top Referrers Leaderboard</h2>
      <div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div class="divide-y divide-gray-200">
          <div v-for="(referrer, index) in topReferrers" :key="index" class="p-6 hover:bg-gray-50 transition-colors">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-4">
                <div>
                  <h3 class="text-base font-semibold text-gray-900">{{ referrer.name }}</h3>
                </div>
              </div>
              <div class="flex items-center gap-4">
                <div class="text-right">
                  <p class="text-base font-semibold text-gray-900">{{ referrer.referralCount }} referrals</p>
                </div>
                <span v-if="referrer.rank" :class="getRankBadgeClass(referrer.rank)" class="inline-flex items-center px-3 py-1 text-xs font-semibold rounded">
                  {{ referrer.rank }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Link Management Tab -->
    <div v-if="activeTab === 'link-management'">
      <h2 class="text-lg font-bold text-gray-900 mb-6">Link Management</h2>
      
      <!-- Auto-Generate Links Section -->
      <div class="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mb-6">
        <h3 class="text-base font-semibold text-gray-900 mb-2">Auto-Generate Links</h3>
        <p class="text-sm text-gray-600 mb-4">Referral links are automatically generated when contestants register. You can regenerate links if needed.</p>
        <button @click="showGenerateLinksModal = true" class="px-6 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors">
          Regenerate All Links
        </button>
      </div>

      <!-- Link Analytics Section -->
      <div class="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <h3 class="text-base font-semibold text-gray-900 mb-2">Link Analytics</h3>
        <p class="text-sm text-gray-600 mb-4">Track click-through rates, conversion metrics, and performance insights for all referral links.</p>
        <button @click="showAnalyticsModal = true" class="px-6 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          View Analytics
        </button>
      </div>
    </div>

    <!-- Referral Link Analytics Modal -->
    <div v-if="showAnalyticsModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <!-- Modal Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
          <h2 class="text-2xl font-bold text-gray-900">Referral Link Analytics</h2>
          <button @click="showAnalyticsModal = false" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Modal Body -->
        <div class="p-6 space-y-6">
          <!-- Key Metrics -->
          <div class="grid grid-cols-4 gap-4">
            <!-- Total Clicks -->
            <div class="bg-white border border-gray-200 rounded-xl p-4">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <div>
                  <p class="text-xs text-gray-600">Total Clicks</p>
                  <h3 class="text-2xl font-bold text-gray-900">4,567</h3>
                </div>
              </div>
            </div>

            <!-- Unique Visitors -->
            <div class="bg-white border border-gray-200 rounded-xl p-4">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p class="text-xs text-gray-600">Unique Visitors</p>
                  <h3 class="text-2xl font-bold text-gray-900">3,421</h3>
                </div>
              </div>
            </div>

            <!-- Conversion Rate -->
            <div class="bg-white border border-gray-200 rounded-xl p-4">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p class="text-xs text-gray-600">Conversion Rate</p>
                  <h3 class="text-2xl font-bold text-gray-900">74.6%</h3>
                </div>
              </div>
            </div>

            <!-- Avg. CTR -->
            <div class="bg-white border border-gray-200 rounded-xl p-4">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <p class="text-xs text-gray-600">Avg. CTR</p>
                  <h3 class="text-2xl font-bold text-gray-900">12.4%</h3>
                </div>
              </div>
            </div>
          </div>

          <!-- Top Referrers Leaderboard -->
          <div>
            <h3 class="text-lg font-bold text-gray-900 mb-4">Top Referrers Leaderboard</h3>
            <div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              <div class="divide-y divide-gray-200">
                <div v-for="(referrer, index) in analyticsReferrers" :key="index" class="p-4 hover:bg-gray-50 transition-colors">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-4">
                      <div>
                        <h3 class="text-sm font-semibold text-gray-900">{{ referrer.name }}</h3>
                      </div>
                    </div>
                    <div class="flex items-center gap-4 text-sm">
                      <div class="text-gray-600">
                        <span class="font-semibold text-gray-900">{{ referrer.clicks }} clicks</span> + <span class="font-semibold text-gray-900">{{ referrer.conversions }} conversions</span>
                      </div>
                      <div class="text-gray-900 font-semibold">
                        {{ referrer.conversionRate }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Daily Performance -->
          <div>
            <h3 class="text-lg font-bold text-gray-900 mb-4">Daily Performance (Last 7 Days)</h3>
            <div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              <div class="divide-y divide-gray-200">
                <div v-for="(day, index) in dailyPerformance" :key="index" class="p-4 hover:bg-gray-50 transition-colors">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-4 w-1/4">
                      <span class="text-sm font-semibold text-gray-900">{{ day.day }}</span>
                    </div>
                    <div class="flex-1 flex items-center gap-4">
                      <div class="flex-1">
                        <div class="flex items-center gap-3 mb-2">
                          <span class="text-sm text-gray-600">{{ day.clicks }} clicks</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-2">
                          <div class="bg-gray-800 h-2 rounded-full" :style="{ width: '60%' }"></div>
                        </div>
                      </div>
                      <div class="flex items-center gap-4 text-sm w-1/3 justify-end">
                        <span class="font-semibold text-gray-900">{{ day.conversions }} conversions</span>
                        <span class="text-gray-900 font-semibold">{{ day.conversionRate }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Performance Insights -->
          <div>
            <h3 class="text-lg font-bold text-gray-900 mb-4">Performance Insights</h3>
            <div class="grid grid-cols-2 gap-4">
              <!-- Best Performing Day -->
              <div class="bg-green-50 border border-green-200 rounded-xl p-4">
                <h4 class="text-sm font-semibold text-gray-900 mb-2">Best Performing Day</h4>
                <p class="text-sm text-gray-600">Friday with 445 clicks and 20% conversion rate</p>
              </div>

              <!-- Top Referrer -->
              <div class="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <h4 class="text-sm font-semibold text-gray-900 mb-2">Top Referrer</h4>
                <p class="text-sm text-gray-600">Michael Chan with 17.5% conversion rate</p>
              </div>

              <!-- Growth Trend -->
              <div class="bg-purple-50 border border-purple-200 rounded-xl p-4">
                <h4 class="text-sm font-semibold text-gray-900 mb-2">Growth Trend</h4>
                <p class="text-sm text-gray-600">+12% increase in conversions this week</p>
              </div>

              <!-- Optimization Tip -->
              <div class="bg-orange-50 border border-orange-200 rounded-xl p-4">
                <h4 class="text-sm font-semibold text-gray-900 mb-2">Optimization Tip</h4>
                <p class="text-sm text-gray-600">Consider running a referral campaign on your best performing day</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Select Contestants Modal -->
    <div v-if="showGenerateLinksModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <!-- Modal Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
          <h2 class="text-2xl font-bold text-gray-900">Select Contestants</h2>
          <button @click="showGenerateLinksModal = false" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Modal Body -->
        <div class="p-6 space-y-6">
          <!-- Select Contestants Section -->
          <div>
            <h3 class="text-lg font-bold text-gray-900 mb-4">Select Contestants</h3>
            <div class="space-y-3">
              <div v-for="(contestant, index) in availableContestants" :key="index" class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div class="flex items-center gap-3">
                  <input type="checkbox" :value="contestant.id" v-model="selectedContestantIds" class="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500">
                  <div>
                    <h4 class="text-base font-semibold text-gray-900">{{ contestant.name }}</h4>
                    <p class="text-sm text-gray-500">{{ contestant.id }}</p>
                  </div>
                </div>
                <span class="inline-flex items-center px-2.5 py-0.5 bg-gray-300 text-white text-xs font-semibold rounded-full whitespace-nowrap">
                  {{ contestant.status }}
                </span>
              </div>
            </div>
          </div>

          <!-- Link Settings Section -->
          <div>
            <h3 class="text-lg font-bold text-gray-900 mb-4">Link Settings</h3>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-900 mb-2">Campaign Name</label>
                <input v-model="campaignName" type="text" placeholder="e.g., Social media blast" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-900 mb-2">Expiry Date</label>
                <input v-model="expiryDate" type="text" placeholder="mm/dd/yyyy" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
              </div>
            </div>
          </div>

          <!-- Preview Section -->
          <div>
            <h3 class="text-lg font-bold text-gray-900 mb-4">Preview</h3>
            <p class="text-sm text-gray-600 mb-4">This will generate unique referral links for {{ selectedContestantIds.length }} selected contestant(s).</p>
            <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <ul class="space-y-2">
                <li v-for="(contestant, index) in availableContestants.filter(c => selectedContestantIds.includes(c.id))" :key="index" class="text-sm text-gray-900 font-mono">
                  https://thespotlight.com/ref/{{ getPreviewLink(contestant.name, contestant.id) }}{{ campaignName ? '-' + campaignName.toLowerCase().replace(/\s+/g, '-') : '' }}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="flex items-center justify-end gap-3 p-6 border-t border-gray-200 sticky bottom-0 bg-white">
          <button @click="showGenerateLinksModal = false" class="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50">
            Cancel
          </button>
          <button @click="generateLinks" class="px-6 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700">
            Generate Links
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeTab = ref('tracking');

const referrals = ref([
  {
    name: 'Sarah Johnson',
    id: 'CID-001',
    status: 'Active',
    totalReferrals: '234',
    successful: '189',
    conversionRate: '80.8%',
    referralLink: 'https://thespotlight.com/ref/sarah-001',
  },
  {
    name: 'Sarah Johnson',
    id: 'CID-001',
    status: 'Active',
    totalReferrals: '234',
    successful: '189',
    conversionRate: '80.8%',
    referralLink: 'https://thespotlight.com/ref/sarah-001',
  },
  {
    name: 'Sarah Johnson',
    id: 'CID-001',
    status: 'Active',
    totalReferrals: '234',
    successful: '189',
    conversionRate: '80.8%',
    referralLink: 'https://thespotlight.com/ref/sarah-001',
  },
  {
    name: 'Sarah Johnson',
    id: 'CID-001',
    status: 'Active',
    totalReferrals: '234',
    successful: '189',
    conversionRate: '80.8%',
    referralLink: 'https://thespotlight.com/ref/sarah-001',
  },
]);

const topReferrers = ref([
  {
    name: 'Sarah Johnson',
    referralCount: '234',
    rank: null,
  },
  {
    name: 'Sarah Johnson',
    referralCount: '234',
    rank: 'Gold',
  },
  {
    name: 'Sarah Johnson',
    referralCount: '234',
    rank: null,
  },
  {
    name: 'Sarah Johnson',
    referralCount: '234',
    rank: 'Silver',
  },
  {
    name: 'Sarah Johnson',
    referralCount: '234',
    rank: 'Gold',
  },
]);

const getRankBadgeClass = (rank: string | null) => {
  if (rank === 'Gold') {
    return 'bg-yellow-500 text-white';
  } else if (rank === 'Silver') {
    return 'bg-gray-500 text-white';
  }
  return '';
};

const showAnalyticsModal = ref(false);

const analyticsReferrers = ref([
  {
    name: 'Sarah Johnson',
    clicks: '1234',
    conversions: '150',
    conversionRate: '15.3%',
  },
  {
    name: 'Sarah Johnson',
    clicks: '1234',
    conversions: '150',
    conversionRate: '15.3%',
  },
  {
    name: 'Sarah Johnson',
    clicks: '1234',
    conversions: '150',
    conversionRate: '15.3%',
  },
  {
    name: 'Sarah Johnson',
    clicks: '1234',
    conversions: '150',
    conversionRate: '15.3%',
  },
]);

const dailyPerformance = ref([
  {
    day: 'Mon',
    clicks: '234',
    conversions: '45',
    conversionRate: '19.2%',
  },
  {
    day: 'Tue',
    clicks: '234',
    conversions: '45',
    conversionRate: '19.2%',
  },
  {
    day: 'Wed',
    clicks: '234',
    conversions: '45',
    conversionRate: '19.2%',
  },
  {
    day: 'Thu',
    clicks: '234',
    conversions: '45',
    conversionRate: '19.2%',
  },
]);

const copyLink = (link: string) => {
  navigator.clipboard.writeText(link).then(() => {
    // You could add a toast notification here
    console.log('Link copied:', link);
  });
};

// Generate Links Modal
const showGenerateLinksModal = ref(false);
const campaignName = ref('');
const expiryDate = ref('');
const selectedContestantIds = ref(['CID-001', 'CID-002', 'CID-003']);

const availableContestants = ref([
  {
    name: 'Sarah Johnson',
    id: 'CID-001',
    status: 'Active',
  },
  {
    name: 'Michael Chen',
    id: 'CID-002',
    status: 'Active',
  },
  {
    name: 'Aisha Ibrahim',
    id: 'CID-003',
    status: 'Active',
  },
]);

const getPreviewLink = (name: string, id: string) => {
  const nameSlug = name.toLowerCase().split(' ')[0];
  const idNumber = id.split('-')[1];
  return `${nameSlug}-${idNumber}`;
};

const generateLinks = () => {
  // TODO: Implement link generation logic
  console.log('Generating links for:', {
    contestantIds: selectedContestantIds.value,
    campaignName: campaignName.value,
    expiryDate: expiryDate.value,
  });
  showGenerateLinksModal.value = false;
};
</script>

