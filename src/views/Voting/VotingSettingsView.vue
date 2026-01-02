<template>
  <div class="min-h-screen bg-white p-6">
    <!-- Header Section -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 mb-1">Settings</h1>
        <p class="text-sm text-gray-600">Manage system settings and integrations</p>
      </div>
      <div class="flex items-center gap-3">
        <!-- Save all Settings Button -->
        <button @click="saveAllSettings" class="px-6 py-2 bg-gradient-to-r from-purple-500 to-purple-700 text-white font-medium rounded-lg hover:from-purple-600 hover:to-purple-800 flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Save all Settings
        </button>
      </div>
    </div>

    <!-- Navigation Tabs -->
    <div class="flex items-center gap-6 border-b border-gray-200 mb-6">
      <button @click="activeTab = 'profile'" class="pb-2 relative">
        <span class="text-sm font-medium" :class="activeTab === 'profile' ? 'text-gray-900 font-semibold' : 'text-gray-500'">Profile Settings</span>
        <div v-if="activeTab === 'profile'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></div>
      </button>
      <button @click="activeTab = 'notifications'" class="pb-2 relative">
        <span class="text-sm font-medium" :class="activeTab === 'notifications' ? 'text-gray-900 font-semibold' : 'text-gray-500'">Notifications</span>
        <div v-if="activeTab === 'notifications'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></div>
      </button>
      <button @click="activeTab = 'voting-logic'" class="pb-2 relative">
        <span class="text-sm font-medium" :class="activeTab === 'voting-logic' ? 'text-gray-900 font-semibold' : 'text-gray-500'">Voting Logic</span>
        <div v-if="activeTab === 'voting-logic'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></div>
      </button>
      <button @click="activeTab = 'api-integrations'" class="pb-2 relative">
        <span class="text-sm font-medium" :class="activeTab === 'api-integrations' ? 'text-gray-900 font-semibold' : 'text-gray-500'">API Integrations</span>
        <div v-if="activeTab === 'api-integrations'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></div>
      </button>
      <button @click="activeTab = 'security'" class="pb-2 relative">
        <span class="text-sm font-medium" :class="activeTab === 'security' ? 'text-gray-900 font-semibold' : 'text-gray-500'">Security</span>
        <div v-if="activeTab === 'security'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></div>
      </button>
    </div>

    <!-- Main Content Area - Profile Settings Tab -->
    <div v-if="activeTab === 'profile'" class="grid grid-cols-2 gap-6">
      <!-- Profile Information -->
      <div class="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <h3 class="text-lg font-bold text-gray-900 mb-6">Profile Information</h3>
        <div class="space-y-5">
          <!-- Full Name -->
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-2">Full Name</label>
            <input v-model="profileForm.fullName" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="Enter full name">
          </div>

          <!-- Email Address -->
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-2">Email Address</label>
            <input v-model="profileForm.email" type="email" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="Enter email address">
          </div>

          <!-- Phone Number -->
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-2">Phone Number</label>
            <input v-model="profileForm.phone" type="tel" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="Enter phone number">
          </div>

          <!-- Organization -->
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-2">Organization</label>
            <input v-model="profileForm.organization" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="Enter organization">
          </div>
        </div>
      </div>

      <!-- System Preferences -->
      <div class="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <h3 class="text-lg font-bold text-gray-900 mb-6">System Preferences</h3>
        <div class="space-y-5">
          <!-- Timezone -->
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-2">Timezone</label>
            <div class="relative">
              <select v-model="preferencesForm.timezone" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white">
                <option value="">Select time zone</option>
                <option value="utc">UTC</option>
                <option value="est">Eastern Standard Time</option>
                <option value="pst">Pacific Standard Time</option>
                <option value="wast">West Africa Standard Time</option>
              </select>
              <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Language -->
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-2">Language</label>
            <div class="relative">
              <select v-model="preferencesForm.language" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white">
                <option value="">Select language</option>
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
              <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Default Currency -->
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-2">Default Currency</label>
            <div class="relative">
              <select v-model="preferencesForm.currency" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white">
                <option value="">Select Currency</option>
                <option value="ngn">NGN (₦)</option>
                <option value="usd">USD ($)</option>
                <option value="eur">EUR (€)</option>
                <option value="gbp">GBP (£)</option>
              </select>
              <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Dark Mode -->
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-1">Dark Mode</label>
            <p class="text-xs text-gray-500 mb-3">Use dark theme</p>
            <div class="flex items-center justify-between">
              <div></div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="preferencesForm.darkMode" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-300"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Notifications Tab -->
    <div v-if="activeTab === 'notifications'" class="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
      <h3 class="text-lg font-bold text-gray-900 mb-6">Notification Preferences</h3>
      <div class="space-y-5">
        <!-- Email Alerts -->
        <div class="flex items-center justify-between">
          <div>
            <div class="text-sm font-medium text-gray-900 mb-1">Email Alerts</div>
            <div class="text-xs text-gray-500">Receive notifications via email</div>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="notificationPrefs.emailAlerts" class="sr-only peer">
            <div class="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-300"></div>
          </label>
        </div>

        <!-- Push Notifications -->
        <div class="flex items-center justify-between">
          <div>
            <div class="text-sm font-medium text-gray-900 mb-1">Push Notifications</div>
            <div class="text-xs text-gray-500">Browser push notifications</div>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="notificationPrefs.pushNotifications" class="sr-only peer">
            <div class="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-300"></div>
          </label>
        </div>

        <!-- System Alerts -->
        <div class="flex items-center justify-between">
          <div>
            <div class="text-sm font-medium text-gray-900 mb-1">System Alerts</div>
            <div class="text-xs text-gray-500">Critical system notifications</div>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="notificationPrefs.systemAlerts" class="sr-only peer">
            <div class="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-300"></div>
          </label>
        </div>

        <!-- Contestant Activity -->
        <div class="flex items-center justify-between">
          <div>
            <div class="text-sm font-medium text-gray-900 mb-1">Contestant Activity</div>
            <div class="text-xs text-gray-500">New registrations and updates</div>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="notificationPrefs.contestantActivity" class="sr-only peer">
            <div class="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-300"></div>
          </label>
        </div>

        <!-- Voting Alerts -->
        <div class="flex items-center justify-between">
          <div>
            <div class="text-sm font-medium text-gray-900 mb-1">Voting Alerts</div>
            <div class="text-xs text-gray-500">Voting milestones and updates</div>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="notificationPrefs.votingAlerts" class="sr-only peer">
            <div class="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-300"></div>
          </label>
        </div>
      </div>
    </div>

    <!-- Voting Logic Tab -->
    <div v-if="activeTab === 'voting-logic'" class="grid grid-cols-2 gap-6">
      <!-- Voting Restriction Logic -->
      <div class="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <h3 class="text-lg font-bold text-gray-900 mb-6">Voting Restriction Logic</h3>
        <div class="space-y-5">
          <!-- Free Voting Interval -->
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-2">Free Voting Interval</label>
            <div class="relative">
              <select v-model="votingLogicForm.freeVotingInterval" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white">
                <option value="">Select interval</option>
                <option value="1min">1 minute</option>
                <option value="5min">5 minutes</option>
                <option value="15min">15 minutes</option>
                <option value="30min">30 minutes</option>
                <option value="1hour">1 hour</option>
                <option value="24hour">24 hours</option>
              </select>
              <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Paid Vote Price -->
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-2">Paid Vote Price (NGN)</label>
            <input v-model.number="votingLogicForm.paidVotePrice" type="number" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="Enter price">
          </div>

          <!-- Max Votes per Session -->
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-2">Max Votes per Session</label>
            <input v-model.number="votingLogicForm.maxVotesPerSession" type="number" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="Enter max votes">
          </div>

          <!-- Public Leaderboard -->
          <div>
            <div class="flex items-center justify-between">
              <div>
                <div class="text-sm font-medium text-gray-900 mb-1">Public Leaderboard</div>
                <div class="text-xs text-gray-500">Show vote counts publicly</div>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="votingLogicForm.publicLeaderboard" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-300"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Badge Automation Rules -->
      <div class="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <h3 class="text-lg font-bold text-gray-900 mb-6">Badge Automation Rules</h3>
        <div class="space-y-5">
          <!-- Auto Profile Badge -->
          <div>
            <div class="flex items-center justify-between">
              <div>
                <div class="text-sm font-medium text-gray-900 mb-1">Auto Profile Badge</div>
                <div class="text-xs text-gray-500">Assign on registration</div>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="badgeAutomationForm.autoProfileBadge" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-300"></div>
              </label>
            </div>
          </div>

          <!-- Milestone Badges -->
          <div>
            <div class="flex items-center justify-between">
              <div>
                <div class="text-sm font-medium text-gray-900 mb-1">Milestone Badges</div>
                <div class="text-xs text-gray-500">Auto-assign based on vote count</div>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="badgeAutomationForm.milestoneBadges" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-300"></div>
              </label>
            </div>
          </div>

          <!-- Nomination Threshold -->
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-2">Nomination Threshold (votes)</label>
            <input v-model.number="badgeAutomationForm.nominationThreshold" type="number" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="Enter threshold">
          </div>

          <!-- Eviction Risk Threshold -->
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-2">Eviction Risk Threshold (position)</label>
            <input v-model.number="badgeAutomationForm.evictionRiskThreshold" type="number" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="Enter threshold">
          </div>
        </div>
      </div>
    </div>

    <!-- API Integrations Tab -->
    <div v-if="activeTab === 'api-integrations'" class="grid grid-cols-2 gap-6">
      <!-- SMS Integration -->
      <div class="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <h3 class="text-lg font-bold text-gray-900 mb-6">SMS Integration</h3>
        <div class="space-y-5">
          <!-- SMS Provider -->
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-2">SMS Provider</label>
            <div class="relative">
              <select v-model="apiIntegrationsForm.smsProvider" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white">
                <option value="">Select Provider</option>
                <option value="twilio">Twilio</option>
                <option value="vonage">Vonage</option>
                <option value="aws-sns">AWS SNS</option>
              </select>
              <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <!-- API Key -->
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-2">API Key</label>
            <input v-model="apiIntegrationsForm.smsApiKey" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="API Key">
          </div>

          <!-- Sender ID -->
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-2">Sender ID</label>
            <input v-model="apiIntegrationsForm.smsSenderId" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="Enter sender ID">
          </div>

          <!-- Test Button -->
          <button @click="testSMSIntegration" class="w-full px-4 py-2 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800">
            Test SMS Integration
          </button>
        </div>
      </div>

      <!-- Email Integration -->
      <div class="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <h3 class="text-lg font-bold text-gray-900 mb-6">Email Integration</h3>
        <div class="space-y-5">
          <!-- Email Provider -->
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-2">Email Provider</label>
            <div class="relative">
              <select v-model="apiIntegrationsForm.emailProvider" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white">
                <option value="">Select Provider</option>
                <option value="sendgrid">SendGrid</option>
                <option value="mailgun">Mailgun</option>
                <option value="ses">AWS SES</option>
                <option value="postmark">Postmark</option>
              </select>
              <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <!-- API Key -->
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-2">API Key</label>
            <input v-model="apiIntegrationsForm.emailApiKey" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="API Key">
          </div>

          <!-- From Email -->
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-2">From Email</label>
            <input v-model="apiIntegrationsForm.fromEmail" type="email" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="Enter from email">
          </div>

          <!-- Test Button -->
          <button @click="testEmailIntegration" class="w-full px-4 py-2 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800">
            Test Email Integration
          </button>
        </div>
      </div>

      <!-- WhatsApp Integration -->
      <div class="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <h3 class="text-lg font-bold text-gray-900 mb-6">WhatsApp Integration</h3>
        <div class="space-y-5">
          <!-- WhatsApp Provider -->
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-2">WhatsApp Provider</label>
            <div class="relative">
              <select v-model="apiIntegrationsForm.whatsappProvider" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white">
                <option value="">Select Provider</option>
                <option value="twilio">Twilio</option>
                <option value="meta">Meta (WhatsApp Business API)</option>
                <option value="360dialog">360dialog</option>
              </select>
              <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <!-- API Key -->
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-2">API Key</label>
            <input v-model="apiIntegrationsForm.whatsappApiKey" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="API Key">
          </div>

          <!-- Phone Number ID -->
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-2">Phone Number ID</label>
            <input v-model="apiIntegrationsForm.whatsappPhoneNumberId" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="Enter phone number ID">
          </div>

          <!-- Test Button -->
          <button @click="testWhatsAppIntegration" class="w-full px-4 py-2 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800">
            Test WhatsApp Integration
          </button>
        </div>
      </div>

      <!-- Payment Integration -->
      <div class="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <h3 class="text-lg font-bold text-gray-900 mb-6">Payment Integration</h3>
        <div class="space-y-5">
          <!-- Payment Provider -->
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-2">Payment Provider</label>
            <div class="relative">
              <select v-model="apiIntegrationsForm.paymentProvider" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white">
                <option value="">Select Provider</option>
                <option value="paystack">Paystack</option>
                <option value="flutterwave">Flutterwave</option>
                <option value="stripe">Stripe</option>
                <option value="paypal">PayPal</option>
              </select>
              <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Public Key -->
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-2">Public Key</label>
            <input v-model="apiIntegrationsForm.paymentPublicKey" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="Enter public key">
          </div>

          <!-- Secret Key -->
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-2">Secret Key</label>
            <input v-model="apiIntegrationsForm.paymentSecretKey" type="password" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="Enter Secret Key">
          </div>

          <!-- Test Button -->
          <button @click="testPaymentIntegration" class="w-full px-4 py-2 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800">
            Test Payment Integration
          </button>
        </div>
      </div>
    </div>

    <!-- Security Tab -->
    <div v-if="activeTab === 'security'" class="grid grid-cols-2 gap-6">
      <!-- Security Settings -->
      <div class="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <h3 class="text-lg font-bold text-gray-900 mb-6">Security Settings</h3>
        <div class="space-y-5">
          <!-- Current Password -->
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-2">Current Password</label>
            <input v-model="securityForm.currentPassword" type="password" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="Current Password">
          </div>

          <!-- New Password -->
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-2">New Password</label>
            <input v-model="securityForm.newPassword" type="password" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="New Password">
          </div>

          <!-- Confirm New Password -->
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-2">Confirm New Password</label>
            <input v-model="securityForm.confirmPassword" type="password" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="Confirm New Password">
          </div>

          <!-- Update Password Button -->
          <button @click="updatePassword" class="w-full px-4 py-2 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800">
            Update Password
          </button>
        </div>
      </div>

      <!-- Access Control -->
      <div class="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <h3 class="text-lg font-bold text-gray-900 mb-6">Access Control</h3>
        <div class="space-y-5">
          <!-- Two-Factor Authentication -->
          <div>
            <div class="flex items-center justify-between">
              <div>
                <div class="text-sm font-medium text-gray-900 mb-1">Two-Factor Authentication</div>
                <div class="text-xs text-gray-500">Add extra security to your account</div>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="accessControlForm.twoFactorAuth" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-300"></div>
              </label>
            </div>
          </div>

          <!-- Auto Session Timeout -->
          <div>
            <div class="flex items-center justify-between mb-3">
              <div>
                <div class="text-sm font-medium text-gray-900 mb-1">Auto Session Timeout</div>
                <div class="text-xs text-gray-500">Logout after inactivity</div>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="accessControlForm.autoSessionTimeout" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-300"></div>
              </label>
            </div>
            <!-- Timeout Duration -->
            <div>
              <label class="block text-sm font-medium text-gray-900 mb-2">Timeout Duration (minutes)</label>
              <input v-model.number="accessControlForm.timeoutDuration" type="number" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="Enter duration">
            </div>
          </div>

          <!-- Backup Email -->
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-2">Backup Email</label>
            <input v-model="accessControlForm.backupEmail" type="email" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="backup@example.com">
          </div>
        </div>
      </div>
    </div>

    <!-- Other Tabs Placeholder -->
    <div v-if="activeTab !== 'profile' && activeTab !== 'notifications' && activeTab !== 'voting-logic' && activeTab !== 'api-integrations' && activeTab !== 'security'" class="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
      <p class="text-sm text-gray-500">{{ activeTab }} content will be displayed here.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import votingService from '@/services/votingService';
import { useToast } from 'vue-toastification';

const toast = useToast();
const route = useRoute();
const activeTab = ref('profile');
const contestId = ref<string>('');
const voteRule = ref<any>(null);
const isLoading = ref(false);

const profileForm = ref({
  fullName: 'Admin User',
  email: 'admin@thespotlight.com',
  phone: '+234 801 234 5678',
  organization: 'The Spotlight Entertainment',
});

const preferencesForm = ref({
  timezone: '',
  language: '',
  currency: '',
  darkMode: false,
});

const notificationPrefs = ref({
  emailAlerts: true,
  pushNotifications: true,
  systemAlerts: true,
  contestantActivity: true,
  votingAlerts: true,
});

const votingLogicForm = ref({
  freeVotingInterval: '',
  paidVotePrice: 100,
  maxVotesPerSession: 10,
  publicLeaderboard: false,
});

const badgeAutomationForm = ref({
  autoProfileBadge: true,
  milestoneBadges: true,
  nominationThreshold: 1000,
  evictionRiskThreshold: 120,
});

const apiIntegrationsForm = ref({
  smsProvider: '',
  smsApiKey: '',
  smsSenderId: 'Spotlight',
  emailProvider: '',
  emailApiKey: '',
  fromEmail: 'noreply@thespotlight.com',
  whatsappProvider: '',
  whatsappApiKey: '',
  whatsappPhoneNumberId: '+234xxxxxxxxxx',
  paymentProvider: '',
  paymentPublicKey: '',
  paymentSecretKey: '',
});

const testSMSIntegration = () => {
  console.log('Testing SMS integration:', apiIntegrationsForm.value);
};

const testEmailIntegration = () => {
  console.log('Testing Email integration:', apiIntegrationsForm.value);
};

const testWhatsAppIntegration = () => {
  console.log('Testing WhatsApp integration:', apiIntegrationsForm.value);
};

const testPaymentIntegration = () => {
  console.log('Testing Payment integration:', apiIntegrationsForm.value);
};

const securityForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
});

const accessControlForm = ref({
  twoFactorAuth: false,
  autoSessionTimeout: true,
  timeoutDuration: 30,
  backupEmail: '',
});

const updatePassword = () => {
  console.log('Updating password:', securityForm.value);
  // Handle password update logic here
};

// Fetch vote rule
const fetchVoteRule = async (id: string) => {
  if (!id) return;
  isLoading.value = true;
  try {
    const response = await votingService.getVoteRule(id);
    if (response.ok && response.data) {
      voteRule.value = response.data;
      // Populate voting logic form with vote rule data
      if (voteRule.value) {
        votingLogicForm.value.freeVotingInterval = voteRule.value.delay_timing || '';
        votingLogicForm.value.maxVotesPerSession = voteRule.value.standard_max_vote_per_limit || 10;
      }
    }
  } catch (error: any) {
    console.error('Error fetching vote rule:', error);
  } finally {
    isLoading.value = false;
  }
};

// Save vote rule
const saveVoteRule = async () => {
  if (!contestId.value) {
    toast.error('Contest ID is required');
    return;
  }
  try {
    const ruleData = {
      contest_id: contestId.value,
      points_per_vote: 2,
      voting_delays: parseInt(votingLogicForm.value.freeVotingInterval) || 1,
      delay_timing: 'minute',
      standard_max_vote_per_limit: votingLogicForm.value.maxVotesPerSession || 10,
      standard_vote_after_min: 60,
    };
    
    if (voteRule.value?.id) {
      // Update existing rule
      const response = await votingService.updateVoteRule({ ...ruleData, id: voteRule.value.id });
      if (response.ok) {
        toast.success('Vote rule updated successfully');
      } else {
        toast.error(response.message || 'Error updating vote rule');
      }
    } else {
      // Create new rule
      const response = await votingService.createVoteRule(ruleData);
      if (response.ok) {
        toast.success('Vote rule created successfully');
        voteRule.value = response.data;
      } else {
        toast.error(response.message || 'Error creating vote rule');
      }
    }
  } catch (error: any) {
    console.error('Error saving vote rule:', error);
    toast.error(error.response?.data?.message || error.message || 'Error saving vote rule');
  }
};

const saveAllSettings = () => {
  // Handle save all settings logic here
  if (activeTab.value === 'voting-logic') {
    saveVoteRule();
    return;
  }
  console.log('Saving all settings:', {
    profile: profileForm.value,
    preferences: preferencesForm.value,
    notifications: notificationPrefs.value,
    votingLogic: votingLogicForm.value,
    badgeAutomation: badgeAutomationForm.value,
    apiIntegrations: apiIntegrationsForm.value,
    security: securityForm.value,
    accessControl: accessControlForm.value,
  });
};
</script>
