<template>
  <div class="min-h-screen bg-white p-6">
    <!-- Header Section -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 mb-1">Notifications & Messaging</h1>
        <p class="text-xs text-gray-600">Send messages and manage notification templates</p>
      </div>
      <div class="flex items-center gap-3">
        <!-- Send Broadcast Button -->
        <button @click="showBroadcastModal = true" class="px-6 py-2 bg-gradient-to-r from-purple-600 to-orange-400 text-white font-medium rounded-lg hover:from-purple-700 hover:to-orange-500 flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
          Send Broadcast
        </button>
      </div>
    </div>

    <!-- Key Metrics Section -->
    <div class="grid grid-cols-4 gap-6 mb-6">
      <!-- Messages Sent Today -->
      <div class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
            <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </div>
          <div class="flex-1">
            <h4 class="text-sm font-medium text-gray-600">Messages Sent Today</h4>
            <h3 class="text-4xl font-bold text-gray-900 mt-1">1,247</h3>
          </div>
        </div>
      </div>

      <!-- Open Rate -->
      <div class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div class="flex-1">
            <h4 class="text-sm font-medium text-gray-600">Open Rate</h4>
            <h3 class="text-4xl font-bold text-gray-900 mt-1">84.3%</h3>
          </div>
        </div>
      </div>

      <!-- Scheduled Messages -->
      <div class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
            <svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="flex-1">
            <h4 class="text-sm font-medium text-gray-600">Scheduled Messages</h4>
            <h3 class="text-4xl font-bold text-gray-900 mt-1">12</h3>
          </div>
        </div>
      </div>

      <!-- Active Recipients -->
      <div class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div class="flex-1">
            <h4 class="text-sm font-medium text-gray-600">Active Recipients</h4>
            <h3 class="text-4xl font-bold text-gray-900 mt-1">127</h3>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation Tabs -->
    <div class="flex items-center gap-6 border-b border-gray-200 mb-6">
      <button @click="activeTab = 'compose'" class="pb-2 relative">
        <span class="text-sm font-medium" :class="activeTab === 'compose' ? 'text-gray-900' : 'text-gray-500'">Compose Message</span>
        <div v-if="activeTab === 'compose'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></div>
      </button>
      <button @click="activeTab = 'templates'" class="pb-2 relative">
        <span class="text-sm font-medium" :class="activeTab === 'templates' ? 'text-gray-900' : 'text-gray-500'">Templates</span>
        <div v-if="activeTab === 'templates'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></div>
      </button>
      <button @click="activeTab = 'scheduled'" class="pb-2 relative">
        <span class="text-sm font-medium" :class="activeTab === 'scheduled' ? 'text-gray-900' : 'text-gray-500'">Scheduled Messages</span>
        <div v-if="activeTab === 'scheduled'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></div>
      </button>
      <button @click="activeTab = 'settings'" class="pb-2 relative">
        <span class="text-sm font-medium" :class="activeTab === 'settings' ? 'text-gray-900' : 'text-gray-500'">Notification Settings</span>
        <div v-if="activeTab === 'settings'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></div>
      </button>
    </div>

    <!-- Compose Message Tab -->
    <div v-if="activeTab === 'compose'">
      <h2 class="text-xl font-bold text-gray-900 mb-6">Send New Message</h2>
      <div class="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <div class="space-y-6">
          <!-- Recipients and Message Channel Row -->
          <div class="grid grid-cols-2 gap-6">
            <!-- Recipients -->
            <div>
              <label class="block text-sm font-medium text-gray-900 mb-2">Recipients</label>
              <div class="relative">
                <select v-model="messageForm.recipients" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white">
                  <option value="">Select Recipients</option>
                  <option value="all">All Contestants</option>
                  <option value="active">Active Contestants</option>
                  <option value="voters">Voters</option>
                </select>
                <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Message Channel -->
            <div>
              <label class="block text-sm font-medium text-gray-900 mb-2">Message Channel</label>
              <div class="relative">
                <select v-model="messageForm.channel" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white">
                  <option value="">Select Channel</option>
                  <option value="email">Email</option>
                  <option value="sms">SMS</option>
                  <option value="push">Push Notification</option>
                </select>
                <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <!-- Subject/Title -->
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-2">Subject/Title</label>
            <input v-model="messageForm.subject" type="text" placeholder="Enter message subject" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
          </div>

          <!-- Message Content -->
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-2">Message Content</label>
            <textarea v-model="messageForm.content" rows="6" placeholder="Type your message here..." class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"></textarea>
            <p class="text-xs text-gray-500 mt-2">Use variables: {contestant_name}, {vote_count}, {position}, {contest_name}</p>
          </div>

          <!-- Schedule for later -->
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-3">
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="messageForm.scheduleForLater" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
              <span class="text-sm font-medium text-gray-900">Schedule for later</span>
            </div>
            <input v-if="messageForm.scheduleForLater" v-model="messageForm.scheduleDate" type="text" placeholder="mm/dd/yyyy" class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent w-32">
          </div>

          <!-- Action Buttons -->
          <div class="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
            <button class="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50">
              Save a Template
            </button>
            <button class="px-6 py-2 bg-gradient-to-r from-purple-600 to-orange-400 text-white font-medium rounded-lg hover:from-purple-700 hover:to-orange-500">
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Templates Tab -->
    <div v-if="activeTab === 'templates'">
      <h2 class="text-xl font-bold text-gray-900 mb-6">Message Templates-</h2>
      <div class="space-y-4">
        <!-- Registration Confirmation Template -->
        <div class="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-2">
                <h3 class="text-base font-bold text-gray-900">Registration Confirmation</h3>
                <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-600 text-white">Active</span>
              </div>
              <p class="text-xs text-gray-500 mb-2">Email + SMS</p>
              <p class="text-sm text-gray-500">Welcome to The Spotlight! Your registration has been confirmed. Contest ID: [contestant_id]</p>
            </div>
            <div class="flex items-center gap-2">
              <button @click="openEditModal('Registration Confirmation', 'Email + SMS', 'Welcome to The Spotlight! Your registration has been confirmed. Contest ID: [contestant_id]', true)" class="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50">
                Edit
              </button>
              <button @click="openUseTemplateModal('Registration Confirmation', 'Welcome to The Spotlight! Your registration has been confirmed. Contest ID: [contestant_id]')" class="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50">
                Use Template
              </button>
            </div>
          </div>
        </div>

        <!-- Eviction Alert Template -->
        <div class="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-2">
                <h3 class="text-base font-bold text-gray-900">Eviction Alert</h3>
                <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-600 text-white">Inactive</span>
              </div>
              <p class="text-xs text-gray-500 mb-2">Email + SMS + Whatsapp</p>
              <p class="text-sm text-gray-500">You are at risk of eviction. Current position: [position], get votes now!</p>
            </div>
            <div class="flex items-center gap-2">
              <button @click="openEditModal('Eviction Alert', 'Email + SMS + Whatsapp', 'You are at risk of eviction. Current position: [position], get votes now!', false)" class="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50">
                Edit
              </button>
              <button @click="openUseTemplateModal('Eviction Alert', 'You are at risk of eviction. Current position: [position], get votes now!')" class="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50">
                Use Template
              </button>
            </div>
          </div>
        </div>

        <!-- Weekly Vote Update Template -->
        <div class="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-2">
                <h3 class="text-base font-bold text-gray-900">Weekly Vote Update</h3>
                <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-600 text-white">Active</span>
              </div>
              <p class="text-xs text-gray-500 mb-2">Email</p>
              <p class="text-sm text-gray-500">Weekly update: You received [vote_count] votes this week. Keep it up!</p>
            </div>
            <div class="flex items-center gap-2">
              <button @click="openEditModal('Weekly Vote Update', 'Email', 'Weekly update: You received [vote_count] votes this week. Keep it up!', true)" class="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50">
                Edit
              </button>
              <button @click="openUseTemplateModal('Weekly Vote Update', 'Weekly update: You received [vote_count] votes this week. Keep it up!')" class="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50">
                Use Template
              </button>
            </div>
          </div>
        </div>

        <!-- Badge Assignment Template -->
        <div class="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-2">
                <h3 class="text-base font-bold text-gray-900">Badge Assignment</h3>
                <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-orange-600 text-white">Active</span>
              </div>
              <p class="text-xs text-gray-500 mb-2">Push + Email</p>
              <p class="text-sm text-gray-500">Congratulations! You've earned a new badge: [badge_name]</p>
            </div>
            <div class="flex items-center gap-2">
              <button @click="openEditModal('Badge Assignment', 'Push + Email', 'Congratulations! You\'ve earned a new badge: [badge_name]', true)" class="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50">
                Edit
              </button>
              <button @click="openUseTemplateModal('Badge Assignment', 'Congratulations! You\'ve earned a new badge: [badge_name]')" class="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50">
                Use Template
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Scheduled Messages Tab -->
    <div v-if="activeTab === 'scheduled'">
      <h2 class="text-xl font-bold text-gray-900 mb-6">Scheduled Messages</h2>
      <div class="space-y-4">
        <!-- Weekly Vote Summary -->
        <div class="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-2">
                <h3 class="text-base font-bold text-gray-900">Weekly Vote Summary</h3>
                <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">Sending</span>
              </div>
              <div class="space-y-1 text-sm">
                <p class="text-gray-600">To: All Contestants</p>
                <p class="text-gray-600">Via: Email</p>
                <p class="text-gray-600">Scheduled: 2024-09-21 19:00</p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <button @click="openEditScheduledModal('Weekly Vote Summary', 'all', '01/21/2024 06:00 PM', 'Email Only', 'Here\'s your weekly vote summary. You received {vote_count} votes this week. Keep engaging with your fans!')" class="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50">
                Edit
              </button>
              <button class="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700">
                Cancel
              </button>
            </div>
          </div>
        </div>

        <!-- Eviction Reminder -->
        <div class="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-2">
                <h3 class="text-base font-bold text-gray-900">Eviction Reminder</h3>
                <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800">Sent</span>
              </div>
              <div class="space-y-1 text-sm">
                <p class="text-gray-600">To: At-Risk Contestants</p>
                <p class="text-gray-600">Via: SMS + Whatsapp</p>
                <p class="text-gray-600">Scheduled: 2024-09-20 12:00</p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <button @click="showDeliveryReportModal = true" class="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50">
                View Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Notification Settings Tab -->
    <div v-if="activeTab === 'settings'">
      <h2 class="text-xl font-bold text-gray-900 mb-6">Notification Settings</h2>
      <div class="grid grid-cols-2 gap-6">
        <!-- Notification Preferences -->
        <div class="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-6">Notification Preferences</h3>
          <div class="space-y-6">
            <!-- Email Notifications -->
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-900">Email Notifications</p>
                <p class="text-xs text-gray-500 mt-1">Send notifications via email</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="notificationSettings.email" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>

            <!-- SMS Notifications -->
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-900">SMS Notifications</p>
                <p class="text-xs text-gray-500 mt-1">Send notifications via SMS</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="notificationSettings.sms" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>

            <!-- WhatsApp Notifications -->
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-900">WhatsApp Notifications</p>
                <p class="text-xs text-gray-500 mt-1">Send notifications via WhatsApp</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="notificationSettings.whatsapp" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>

            <!-- Push Notifications -->
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-900">Push Notifications</p>
                <p class="text-xs text-gray-500 mt-1">Send push notifications to mobile app</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="notificationSettings.push" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
          </div>
        </div>

        <!-- Automation Settings -->
        <div class="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-6">Automation Settings</h3>
          <div class="space-y-6">
            <!-- Auto Registration Confirmation -->
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-900">Auto Registration Confirmation</p>
                <p class="text-xs text-gray-500 mt-1">Send welcome message on registration</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="automationSettings.autoRegistration" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>

            <!-- Weekly Auto Updates -->
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-900">Weekly Auto Updates</p>
                <p class="text-xs text-gray-500 mt-1">Send weekly auto summaries</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="automationSettings.weeklyUpdates" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>

            <!-- Eviction Alerts -->
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-900">Eviction Alerts</p>
                <p class="text-xs text-gray-500 mt-1">Auto-send eviction FYI alerts</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="automationSettings.evictionAlerts" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>

            <!-- Save Settings Button -->
            <div class="pt-4">
              <button @click="saveNotificationSettings" class="w-full px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800">
                Save Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Template Modal -->
    <div v-if="showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click.self="closeEditModal">
      <div class="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <!-- Modal Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 class="text-xl font-bold text-gray-900">Edit Template: {{ editTemplate.name }}</h2>
          <button @click="closeEditModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Modal Body -->
        <div class="p-6 space-y-6">
          <!-- Template Name -->
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-2">Template Name</label>
            <input v-model="editTemplate.name" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
          </div>

          <!-- Delivery Channels -->
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-2">Delivery Channels</label>
            <div class="relative">
              <select v-model="editTemplate.channel" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white">
                <option value="Email only">Email only</option>
                <option value="SMS only">SMS only</option>
                <option value="Push only">Push only</option>
                <option value="Email + SMS">Email + SMS</option>
                <option value="Email + Push">Email + Push</option>
                <option value="Email + SMS + Whatsapp">Email + SMS + Whatsapp</option>
                <option value="Push + Email">Push + Email</option>
              </select>
              <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Message Content -->
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-2">Message Content</label>
            <textarea v-model="editTemplate.content" rows="6" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"></textarea>
            <p class="text-xs text-gray-500 mt-2">Available variables: {contestant_name}, {votes_count}, {contest_name}, {contestant_id}, {badge_name}</p>
          </div>

          <!-- Template Active Toggle -->
          <div class="flex items-center gap-3">
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="editTemplate.isActive" class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
            <span class="text-sm font-medium" :class="editTemplate.isActive ? 'text-purple-600' : 'text-gray-600'">
              {{ editTemplate.isActive ? 'Active' : 'Inactive' }}
            </span>
          </div>

          <!-- Template Preview -->
          <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 class="text-sm font-semibold text-gray-900 mb-3">Template Preview</h3>
            <div class="space-y-2 text-sm">
              <div>
                <span class="font-medium text-gray-700">Name:</span>
                <span class="text-gray-600 ml-2">{{ editTemplate.name }}</span>
              </div>
              <div>
                <span class="font-medium text-gray-700">Channel:</span>
                <span class="text-gray-600 ml-2">{{ editTemplate.channel }}</span>
              </div>
              <div>
                <span class="font-medium text-gray-700">Content:</span>
                <span class="text-gray-600 ml-2">{{ editTemplate.content }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <button @click="closeEditModal" class="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50">
            Cancel
          </button>
          <button @click="saveTemplate" class="px-6 py-2 bg-gradient-to-r from-purple-600 to-orange-400 text-white font-medium rounded-lg hover:from-purple-700 hover:to-orange-500">
            Save Changes
          </button>
        </div>
      </div>
    </div>

    <!-- Use Template Modal -->
    <div v-if="showUseTemplateModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click.self="closeUseTemplateModal">
      <div class="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <!-- Modal Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 class="text-xl font-bold text-gray-900">Use Template: {{ useTemplateData.templateName }}</h2>
          <button @click="closeUseTemplateModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Modal Body -->
        <div class="p-6 space-y-6">
          <!-- Recipients -->
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-2">Recipients</label>
            <div class="relative">
              <select v-model="useTemplateData.recipients" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white">
                <option value="all">All Contestants (123)</option>
                <option value="active">Active Contestants (98)</option>
                <option value="voters">Voters (156)</option>
              </select>
              <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Delivery Channels -->
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-2">Delivery Channels</label>
            <div class="relative">
              <select v-model="useTemplateData.channel" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white">
                <option value="Email only">Email only</option>
                <option value="SMS only">SMS only</option>
                <option value="Push only">Push only</option>
                <option value="Email + SMS">Email + SMS</option>
                <option value="Email + Push">Email + Push</option>
                <option value="Email + SMS + Whatsapp">Email + SMS + Whatsapp</option>
                <option value="Push + Email">Push + Email</option>
              </select>
              <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Subject/Title -->
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-2">Subject/Title</label>
            <input v-model="useTemplateData.subject" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
          </div>

          <!-- Message Content (Email/Primary) -->
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-2">Message Content (Email/Primary)</label>
            <textarea v-model="useTemplateData.content" rows="4" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"></textarea>
            <p class="text-xs text-gray-500 mt-2">Available variables: [contestant_name], [vote_count], [contest_name], [contestant_id], [badge_name]</p>
          </div>

          <!-- Schedule for later -->
          <div class="flex items-center gap-3">
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="useTemplateData.scheduleForLater" class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
            <span class="text-sm font-medium text-gray-900">Schedule for later</span>
          </div>

          <!-- Message Content (Secondary/SMS) -->
          <div v-if="useTemplateData.channel.includes('SMS')">
            <label class="block text-sm font-medium text-gray-900 mb-2">Message Content (Secondary/SMS)</label>
            <textarea v-model="useTemplateData.smsContent" rows="4" placeholder="Enter SMS message content..." class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"></textarea>
          </div>

          <!-- Message Summary -->
          <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 class="text-sm font-semibold text-gray-900 mb-3">Message Summary</h3>
            <div class="space-y-2 text-sm">
              <div>
                <span class="font-medium text-gray-700">Template:</span>
                <span class="text-gray-600 ml-2">{{ useTemplateData.templateName }}</span>
              </div>
              <div>
                <span class="font-medium text-gray-700">Recipients:</span>
                <span class="text-gray-600 ml-2">{{ getRecipientsText() }}</span>
              </div>
              <div>
                <span class="font-medium text-gray-700">Channels:</span>
                <span class="text-gray-600 ml-2">{{ useTemplateData.channel }}</span>
              </div>
              <div>
                <span class="font-medium text-gray-700">Delivery:</span>
                <span class="text-gray-600 ml-2">{{ useTemplateData.scheduleForLater ? 'Scheduled' : 'Send immediately' }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <button @click="closeUseTemplateModal" class="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50">
            Cancel
          </button>
          <button @click="sendMessage" class="px-6 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700">
            Send Message
          </button>
        </div>
      </div>
    </div>

    <!-- Send Broadcast Message Modal -->
    <div v-if="showBroadcastModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click.self="closeBroadcastModal">
      <div class="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <!-- Modal Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 class="text-xl font-bold text-gray-900">Send Broadcast Message</h2>
          <button @click="closeBroadcastModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Modal Body -->
        <div class="p-6 space-y-6">
          <!-- Recipients -->
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-2">Recipients</label>
            <div class="relative">
              <select v-model="broadcastForm.recipients" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white">
                <option value="">Select recipients</option>
                <option value="all">All Contestants (127)</option>
                <option value="active">Active Contestants (98)</option>
                <option value="voters">Voters (156)</option>
              </select>
              <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Priority Level -->
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-2">Priority Level</label>
            <div class="relative">
              <select v-model="broadcastForm.priority" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white">
                <option value="">Select priority</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Broadcast Title -->
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-2">Broadcast Title</label>
            <input v-model="broadcastForm.title" type="text" placeholder="Enter broadcast title" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
          </div>

          <!-- Message Content -->
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-2">Message Content</label>
            <textarea v-model="broadcastForm.content" rows="6" placeholder="Type your broadcast message here..." class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"></textarea>
          </div>

          <!-- Delivery Channels -->
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-3">Delivery Channels</label>
            <div class="space-y-3">
              <label class="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" v-model="broadcastForm.channels.email" class="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500">
                <span class="text-sm text-gray-900">Email</span>
              </label>
              <label class="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" v-model="broadcastForm.channels.sms" class="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500">
                <span class="text-sm text-gray-900">SMS</span>
              </label>
              <label class="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" v-model="broadcastForm.channels.push" class="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500">
                <span class="text-sm text-gray-900">Push Notification</span>
              </label>
            </div>
          </div>

          <!-- Delivery Options -->
          <div class="space-y-4">
            <label class="block text-sm font-medium text-gray-900 mb-3">Delivery Options</label>
            
            <!-- Send Immediately -->
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-900">Send Immediately</span>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="broadcastForm.sendImmediately" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-700"></div>
              </label>
            </div>

            <!-- Track Delivery -->
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-900">Track Delivery</span>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="broadcastForm.trackDelivery" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-700"></div>
              </label>
            </div>
          </div>

          <!-- Broadcast Summary -->
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-2">Broadcast Summary</label>
            <textarea :value="getBroadcastSummary()" rows="3" readonly class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-600"></textarea>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <button @click="closeBroadcastModal" class="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50">
            Cancel
          </button>
          <button @click="sendBroadcast" class="px-6 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700">
            Send Broadcast
          </button>
        </div>
      </div>
    </div>

    <!-- Edit Scheduled Message Modal -->
    <div v-if="showEditScheduledModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click.self="closeEditScheduledModal">
      <div class="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <!-- Modal Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 class="text-xl font-bold text-gray-900">Edit Scheduled Message: {{ scheduledMessageForm.title }}</h2>
          <button @click="closeEditScheduledModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Modal Body -->
        <div class="p-6 space-y-6">
          <!-- Message Title -->
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-2">Message Title</label>
            <input v-model="scheduledMessageForm.title" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
          </div>

          <!-- Recipients -->
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-2">Recipients</label>
            <div class="relative">
              <select v-model="scheduledMessageForm.recipients" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white">
                <option value="all">All Contestants (124)</option>
                <option value="active">Active Contestants (98)</option>
                <option value="atRisk">At-Risk Contestants (12)</option>
              </select>
              <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Scheduled Time -->
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-2">Scheduled Time</label>
            <input v-model="scheduledMessageForm.scheduledTime" type="text" placeholder="01/21/2024 06:00 PM" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
          </div>

          <!-- Delivery Channels -->
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-2">Delivery Channels</label>
            <div class="relative">
              <select v-model="scheduledMessageForm.channel" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white">
                <option value="Email Only">Email Only</option>
                <option value="SMS Only">SMS Only</option>
                <option value="Push Only">Push Only</option>
                <option value="Email + SMS">Email + SMS</option>
                <option value="Email + SMS + Whatsapp">Email + SMS + Whatsapp</option>
              </select>
              <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Message Content -->
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-2">Message Content</label>
            <textarea v-model="scheduledMessageForm.content" rows="6" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"></textarea>
            <p class="text-xs text-gray-500 mt-2">Available variables: {contestant_name}, {vote_count}, {qualifier}, {contest_name}, {contestant_id}</p>
          </div>

          <!-- Message Preview -->
          <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 class="text-sm font-semibold text-gray-900 mb-3">Message Preview</h3>
            <div class="space-y-2 text-sm">
              <div>
                <span class="font-medium text-gray-700">Title:</span>
                <span class="text-gray-600 ml-2">{{ scheduledMessageForm.title }}</span>
              </div>
              <div>
                <span class="font-medium text-gray-700">Recipients:</span>
                <span class="text-gray-600 ml-2">{{ getRecipientsTextForScheduled() }}</span>
              </div>
              <div>
                <span class="font-medium text-gray-700">Scheduled For:</span>
                <span class="text-gray-600 ml-2">{{ formatScheduledTime() }}</span>
              </div>
              <div>
                <span class="font-medium text-gray-700">Channels:</span>
                <span class="text-gray-600 ml-2">{{ scheduledMessageForm.channel }}</span>
              </div>
              <div>
                <span class="font-medium text-gray-700">Content:</span>
                <span class="text-gray-600 ml-2">{{ scheduledMessageForm.content }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <button @click="closeEditScheduledModal" class="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50">
            Cancel
          </button>
          <button @click="saveScheduledMessage" class="px-6 py-2 bg-gradient-to-r from-purple-600 to-orange-400 text-white font-medium rounded-lg hover:from-purple-700 hover:to-orange-500">
            Save Changes
          </button>
        </div>
      </div>
    </div>

    <!-- Message Delivery Report Modal -->
    <div v-if="showDeliveryReportModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click.self="closeDeliveryReportModal">
      <div class="bg-white rounded-xl shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <!-- Modal Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 class="text-xl font-bold text-gray-900">Message Delivery Report: Eviction Reminder</h2>
          <button @click="closeDeliveryReportModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Modal Body -->
        <div class="p-6 space-y-6">
          <!-- Summary Statistics -->
          <div class="grid grid-cols-4 gap-4">
            <div class="text-center">
              <p class="text-sm text-gray-600 mb-1">Sent</p>
              <p class="text-2xl font-bold text-gray-900">127</p>
            </div>
            <div class="text-center">
              <p class="text-sm text-gray-600 mb-1">Delivered</p>
              <p class="text-2xl font-bold text-gray-900">47%</p>
              <p class="text-xs text-gray-500 mt-1">119</p>
            </div>
            <div class="text-center">
              <p class="text-sm text-gray-600 mb-1">Opened</p>
              <p class="text-2xl font-bold text-gray-900">24h</p>
              <p class="text-xs text-gray-500 mt-1">25</p>
            </div>
            <div class="text-center">
              <p class="text-sm text-gray-600 mb-1">Clicked</p>
              <p class="text-2xl font-bold text-gray-900">34</p>
            </div>
          </div>

          <!-- Delivery Status Breakdown -->
          <div>
            <h3 class="text-sm font-semibold text-gray-900 mb-3">Delivery Status Breakdown</h3>
            <div class="grid grid-cols-4 gap-4">
              <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                <p class="text-sm font-medium text-green-700 mb-1">Delivered</p>
                <p class="text-2xl font-bold text-green-900">119</p>
              </div>
              <div class="bg-red-50 border border-red-200 rounded-lg p-4">
                <p class="text-sm font-medium text-red-700 mb-1">Failed</p>
                <p class="text-2xl font-bold text-red-900">5</p>
              </div>
              <div class="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <p class="text-sm font-medium text-orange-700 mb-1">Pending</p>
                <p class="text-2xl font-bold text-orange-900">3</p>
              </div>
              <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p class="text-sm font-medium text-blue-700 mb-1">Open Rate</p>
                <p class="text-2xl font-bold text-blue-900">25%</p>
              </div>
            </div>
          </div>

          <!-- Channel Performance -->
          <div>
            <h3 class="text-sm font-semibold text-gray-900 mb-3">Channel Performance</h3>
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 class="text-sm font-semibold text-gray-900 mb-3">SMS</h4>
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span class="text-gray-600">Sent:</span>
                    <span class="font-medium text-gray-900">127</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Delivered:</span>
                    <span class="font-medium text-gray-900">119</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Opened:</span>
                    <span class="font-medium text-gray-900">25</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Clicked:</span>
                    <span class="font-medium text-gray-900">34</span>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 class="text-sm font-semibold text-gray-900 mb-3">WhatsApp</h4>
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span class="text-gray-600">Sent:</span>
                    <span class="font-medium text-gray-900">127</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Delivered:</span>
                    <span class="font-medium text-gray-900">119</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Opened:</span>
                    <span class="font-medium text-gray-900">25</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Clicked:</span>
                    <span class="font-medium text-gray-900">34</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Message Details -->
          <div>
            <h3 class="text-sm font-semibold text-gray-900 mb-3">Message Details</h3>
            <div class="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
              <div class="flex justify-between items-start">
                <span class="text-sm font-medium text-gray-700">Recipients:</span>
                <span class="text-sm text-gray-900 text-right">At-Risk Contestants</span>
              </div>
              <div class="flex justify-between items-start">
                <span class="text-sm font-medium text-gray-700">Delivery Channels:</span>
                <span class="text-sm text-gray-900 text-right">SMS + WhatsApp</span>
              </div>
              <div class="flex justify-between items-start">
                <span class="text-sm font-medium text-gray-700">Sent At:</span>
                <span class="text-sm text-gray-900 text-right">2024-09-20 12:00:00</span>
              </div>
              <div class="flex justify-between items-start">
                <span class="text-sm font-medium text-gray-700">Completed At:</span>
                <span class="text-sm text-gray-900 text-right">2024-09-20 12:05:23</span>
              </div>
              <div>
                <span class="text-sm font-medium text-gray-700 block mb-2">Message Content:</span>
                <div class="bg-white border border-gray-300 rounded-lg p-3">
                  <p class="text-sm text-gray-700">You're at risk of imminent Eviction! Contact property management for more info to stay safe!</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <button @click="closeDeliveryReportModal" class="px-6 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeTab = ref('compose');

const messageForm = ref({
  recipients: '',
  channel: '',
  subject: '',
  content: '',
  scheduleForLater: false,
  scheduleDate: '',
});

const showEditModal = ref(false);
const editTemplate = ref({
  name: '',
  channel: '',
  content: '',
  isActive: true,
});

const openEditModal = (name: string, channel: string, content: string, isActive: boolean) => {
  editTemplate.value = {
    name,
    channel: 'Email only', // Default channel as shown in design
    content: content.replace(/\[/g, '{').replace(/\]/g, '}'), // Convert brackets to curly braces
    isActive,
  };
  showEditModal.value = true;
};

const closeEditModal = () => {
  showEditModal.value = false;
};

const saveTemplate = () => {
  // Handle save logic here
  console.log('Saving template:', editTemplate.value);
  closeEditModal();
};

const showUseTemplateModal = ref(false);
const useTemplateData = ref({
  templateName: '',
  recipients: 'all',
  channel: 'Email only',
  subject: '',
  content: '',
  scheduleForLater: false,
  scheduleDate: '',
  smsContent: '',
});

const openUseTemplateModal = (templateName: string, content: string) => {
  useTemplateData.value = {
    templateName,
    recipients: 'all',
    channel: 'Email only',
    subject: templateName,
    content: content, // Keep brackets as shown in design
    scheduleForLater: false,
    scheduleDate: '',
    smsContent: '',
  };
  showUseTemplateModal.value = true;
};

const closeUseTemplateModal = () => {
  showUseTemplateModal.value = false;
};

const getRecipientsText = () => {
  if (useTemplateData.value.recipients === 'all') {
    return 'All Contestants (127)';
  } else if (useTemplateData.value.recipients === 'active') {
    return 'Active Contestants (98)';
  } else {
    return 'Voters (156)';
  }
};

const sendMessage = () => {
  // Handle send message logic here
  console.log('Sending message:', useTemplateData.value);
  closeUseTemplateModal();
};

const showBroadcastModal = ref(false);
const broadcastForm = ref({
  recipients: '',
  priority: '',
  title: '',
  content: '',
  channels: {
    email: true,
    sms: true,
    push: true,
  },
  sendImmediately: true,
  trackDelivery: true,
});

const closeBroadcastModal = () => {
  showBroadcastModal.value = false;
};

const getBroadcastSummary = () => {
  const recipientCount = broadcastForm.value.recipients === 'all' ? '127' : 
                         broadcastForm.value.recipients === 'active' ? '98' : 
                         broadcastForm.value.recipients === 'voters' ? '156' : '127';
  
  const selectedChannels: string[] = [];
  if (broadcastForm.value.channels.email) selectedChannels.push('Email');
  if (broadcastForm.value.channels.sms) selectedChannels.push('SMS');
  if (broadcastForm.value.channels.push) selectedChannels.push('Push Notification');
  
  const channelsText = selectedChannels.join(', ');
  
  return `This message will be sent to ${recipientCount} recipients via ${channelsText}.`;
};

const sendBroadcast = () => {
  // Handle send broadcast logic here
  console.log('Sending broadcast:', broadcastForm.value);
  closeBroadcastModal();
};

const showEditScheduledModal = ref(false);
const scheduledMessageForm = ref({
  title: '',
  recipients: 'all',
  scheduledTime: '',
  channel: 'Email Only',
  content: '',
});

const openEditScheduledModal = (title: string, recipients: string, scheduledTime: string, channel: string, content: string) => {
  scheduledMessageForm.value = {
    title,
    recipients,
    scheduledTime,
    channel,
    content,
  };
  showEditScheduledModal.value = true;
};

const closeEditScheduledModal = () => {
  showEditScheduledModal.value = false;
};

const getRecipientsTextForScheduled = () => {
  if (scheduledMessageForm.value.recipients === 'all') {
    return 'All Contestants';
  } else if (scheduledMessageForm.value.recipients === 'active') {
    return 'Active Contestants';
  } else {
    return 'At-Risk Contestants';
  }
};

const formatScheduledTime = () => {
  // Convert the input time format to display format
  // For now, just return as is or format it
  const time = scheduledMessageForm.value.scheduledTime;
  if (time.includes('/')) {
    // Format: 01/21/2024 06:00 PM -> 2024-01-21 18:00
    const parts = time.split(' ');
    const datePart = parts[0];
    const timePart = parts[1];
    const ampm = parts[2];
    
    const [month, day, year] = datePart.split('/');
    let [hours, minutes] = timePart.split(':');
    let hour24 = parseInt(hours);
    
    if (ampm === 'PM' && hour24 !== 12) {
      hour24 += 12;
    } else if (ampm === 'AM' && hour24 === 12) {
      hour24 = 0;
    }
    
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')} ${hour24.toString().padStart(2, '0')}:${minutes}`;
  }
  return time;
};

const saveScheduledMessage = () => {
  // Handle save scheduled message logic here
  console.log('Saving scheduled message:', scheduledMessageForm.value);
  closeEditScheduledModal();
};

const showDeliveryReportModal = ref(false);

const closeDeliveryReportModal = () => {
  showDeliveryReportModal.value = false;
};

const notificationSettings = ref({
  email: true,
  sms: true,
  whatsapp: true,
  push: true,
});

const automationSettings = ref({
  autoRegistration: true,
  weeklyUpdates: true,
  evictionAlerts: true,
});

const saveNotificationSettings = () => {
  // Handle save notification settings logic here
  console.log('Saving notification settings:', {
    notifications: notificationSettings.value,
    automation: automationSettings.value,
  });
  // Show success message or handle save
};
</script>

