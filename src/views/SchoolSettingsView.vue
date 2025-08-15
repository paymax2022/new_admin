<template>
  <div class="space-y-6">
    <!-- Header Section -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">School Settings</h1>
        <p class="text-gray-600 dark:text-gray-400">Configure and customize school management settings</p>
      </div>
    </div>

    <!-- Navigation Tabs -->
    <div class="border-b border-gray-200 dark:border-gray-700">
      <nav class="-mb-px flex space-x-8">
        <button 
          @click="activeTab = 'general'"
          :class="activeTab === 'general' ? 'border-purple-500 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
          class="whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
        >
          General
        </button>
        <button 
          @click="activeTab = 'feeConfiguration'"
          :class="activeTab === 'feeConfiguration' ? 'border-purple-500 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
          class="whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
        >
          Fee Configuration
        </button>
        <button 
          @click="activeTab = 'notifications'"
          :class="activeTab === 'notifications' ? 'border-purple-500 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
          class="whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
        >
          Notifications
        </button>
        <button 
          @click="activeTab = 'security'"
          :class="activeTab === 'security' ? 'border-purple-500 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
          class="whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
        >
          Security
        </button>
      </nav>
    </div>

    <!-- General Settings Tab -->
    <div v-if="activeTab === 'general'" class="space-y-6">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">General Settings</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-6">Basic school configuration and preferences</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Default School Name</label>
            <input 
              v-model="generalSettings.defaultSchoolName"
              type="text"
              placeholder="Enter default school name"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Support Email</label>
            <input 
              v-model="generalSettings.supportEmail"
              type="email"
              placeholder="Enter support email"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Support Phone</label>
            <input 
              v-model="generalSettings.supportPhone"
              type="tel"
              placeholder="Enter support phone number"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Default Currency</label>
            <select 
              v-model="generalSettings.defaultCurrency"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="">Select Default Currency</option>
              <option value="NGN">Nigerian Naira (₦)</option>
              <option value="USD">US Dollar ($)</option>
              <option value="EUR">Euro (€)</option>
              <option value="GBP">British Pound (£)</option>
            </select>
          </div>
      </div>
    </div>
    
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">System Configuration</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-6">Platform-wide system settings</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Default Time Zone</label>
            <select 
              v-model="generalSettings.defaultTimeZone"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="">Select Default Time Zone</option>
              <option value="Africa/Lagos">Africa/Lagos (WAT)</option>
              <option value="UTC">UTC</option>
              <option value="America/New_York">America/New_York (EST)</option>
              <option value="Europe/London">Europe/London (GMT)</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date Format</label>
            <select 
              v-model="generalSettings.dateFormat"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              <option value="DD-MM-YYYY">DD-MM-YYYY</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Max File Size (MB)</label>
            <input 
              v-model="generalSettings.maxFileSize"
              type="number"
              placeholder="Enter max file size"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Maintenance Mode</label>
            <div class="flex items-center space-x-3">
              <button 
                @click="generalSettings.maintenanceMode = !generalSettings.maintenanceMode"
                :class="generalSettings.maintenanceMode ? 'bg-purple-600' : 'bg-gray-200'"
                class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                <span 
                  :class="generalSettings.maintenanceMode ? 'translate-x-6' : 'translate-x-1'"
                  class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                />
              </button>
              <span class="text-sm text-gray-600 dark:text-gray-400">
                {{ generalSettings.maintenanceMode ? 'Enabled' : 'Disabled' }}
              </span>
            </div>
            <p class="text-xs text-gray-500 mt-1">When enabled, only super admins can access the platform</p>
          </div>
        </div>
      </div>

      <div class="flex justify-end">
        <button @click="saveGeneralSettings" class="px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800">
          Save General Settings
        </button>
      </div>
    </div>

    <!-- Fee Configuration Tab -->
    <div v-if="activeTab === 'feeConfiguration'" class="space-y-6">
      <!-- Payment Integrations Section -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Payment Integrations</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-6">Connect payment gateways and other services</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Left Column -->
          <div class="space-y-6">
            <!-- Flutterwave -->
            <div class="border border-gray-200 rounded-lg p-4">
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 flex items-center justify-center bg-green-500 rounded-full">
                    <span class="text-white font-bold text-xs">FW</span>
                  </div>
                  <div>
                    <h4 class="text-sm font-semibold text-gray-900">Flutterwave</h4>
                    <p class="text-xs text-gray-500">Process payments via Flutterwave</p>
                  </div>
                </div>
                <button 
                  @click="paymentIntegrations.flutterwave.enabled = !paymentIntegrations.flutterwave.enabled"
                  :class="paymentIntegrations.flutterwave.enabled ? 'bg-gray-900' : 'bg-gray-200'"
                  class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  <span 
                    :class="paymentIntegrations.flutterwave.enabled ? 'translate-x-6' : 'translate-x-1'"
                    class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                  />
                </button>
              </div>
              <div class="space-y-3">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">API Key</label>
                  <input 
                    v-model="paymentIntegrations.flutterwave.apiKey"
                    type="password"
                    placeholder="Enter Flutterwave API key"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 text-sm"
                  />
                </div>
                <div class="flex items-center space-x-2 text-green-600">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                  <span class="text-sm font-medium">Connected</span>
                </div>
              </div>
            </div>

            <!-- Stripe -->
            <div class="border border-gray-200 rounded-lg p-4">
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 flex items-center justify-center">
                    <img src="https://stripe.com/img/v3/home/twitter.png" alt="Stripe" class="w-8 h-8" />
                  </div>
                  <div>
                    <h4 class="text-sm font-semibold text-gray-900">Stripe</h4>
                    <p class="text-xs text-gray-500">Process international payments</p>
                  </div>
                </div>
                <button 
                  @click="paymentIntegrations.stripe.enabled = !paymentIntegrations.stripe.enabled"
                  :class="paymentIntegrations.stripe.enabled ? 'bg-gray-900' : 'bg-gray-200'"
                  class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  <span 
                    :class="paymentIntegrations.stripe.enabled ? 'translate-x-6' : 'translate-x-1'"
                    class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                  />
                </button>
              </div>
              <div class="space-y-3">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">API Key</label>
                  <input 
                    v-model="paymentIntegrations.stripe.apiKey"
                    type="password"
                    placeholder="Enter Stripe API key"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 text-sm"
                  />
                </div>
                <div class="text-orange-600 text-sm font-medium">Not configured</div>
              </div>
            </div>
          </div>

          <!-- Right Column -->
          <div class="space-y-6">
            <!-- Paystack -->
            <div class="border border-gray-200 rounded-lg p-4">
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 flex items-center justify-center bg-blue-500 rounded-full">
                    <span class="text-white font-bold text-xs">PS</span>
                  </div>
                  <div>
                    <h4 class="text-sm font-semibold text-gray-900">Paystack</h4>
                    <p class="text-xs text-gray-500">Process payments via Paystack</p>
                  </div>
                </div>
                <button 
                  @click="paymentIntegrations.paystack.enabled = !paymentIntegrations.paystack.enabled"
                  :class="paymentIntegrations.paystack.enabled ? 'bg-gray-900' : 'bg-gray-200'"
                  class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  <span 
                    :class="paymentIntegrations.paystack.enabled ? 'translate-x-6' : 'translate-x-1'"
                    class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                  />
                </button>
              </div>
              <div class="space-y-3">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Secret Key</label>
                  <input 
                    v-model="paymentIntegrations.paystack.secretKey"
                    type="password"
                    placeholder="Enter Paystack secret key"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 text-sm"
                  />
                </div>
                <div class="flex items-center space-x-2 text-green-600">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                  <span class="text-sm font-medium">Connected</span>
                </div>
              </div>
            </div>

            <!-- Interswitch -->
            <div class="border border-gray-200 rounded-lg p-4">
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 flex items-center justify-center bg-blue-800 rounded-full">
                    <span class="text-white font-bold text-xs">IS</span>
                  </div>
                  <div>
                    <h4 class="text-sm font-semibold text-gray-900">Interswitch</h4>
                    <p class="text-xs text-gray-500">Process payments via Interswitch</p>
                  </div>
                </div>
                <button 
                  @click="paymentIntegrations.interswitch.enabled = !paymentIntegrations.interswitch.enabled"
                  :class="paymentIntegrations.interswitch.enabled ? 'bg-gray-900' : 'bg-gray-200'"
                  class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  <span 
                    :class="paymentIntegrations.interswitch.enabled ? 'translate-x-6' : 'translate-x-1'"
                    class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                  />
                </button>
              </div>
              <div class="space-y-3">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">API Key</label>
                  <input 
                    v-model="paymentIntegrations.interswitch.apiKey"
                    type="password"
                    placeholder="Enter Interswitch API key"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 text-sm"
                  />
                </div>
                <div class="text-orange-600 text-sm font-medium">Not configured</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Email Service Section -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Email Service</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-6">Configure email service providers</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Provider</label>
            <select 
              v-model="emailService.provider"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="">Select email provider</option>
              <option value="sendgrid">SendGrid</option>
              <option value="mailgun">Mailgun</option>
              <option value="aws-ses">AWS SES</option>
              <option value="smtp">SMTP</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">From Email</label>
            <input 
              v-model="emailService.fromEmail"
              type="email"
              placeholder="Enter email address"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">API Key</label>
            <input 
              v-model="emailService.apiKey"
              type="password"
              placeholder="Enter API key"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
            />
            <div class="text-orange-600 text-sm mt-1">Not configured</div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">From Name</label>
            <input 
              v-model="emailService.fromName"
              type="text"
              placeholder="Enter Name"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
        </div>
      </div>

      <!-- SMS Service Section -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">SMS Service</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-6">Configure SMS service providers</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">SMS Provider</label>
            <select 
              v-model="smsService.provider"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="">Select SMS provider</option>
              <option value="twilio">Twilio</option>
              <option value="africastalking">Africa's Talking</option>
              <option value="bulksms">BulkSMS</option>
              <option value="smsgh">SMSGH</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Sender ID</label>
            <input 
              v-model="smsService.senderId"
              type="text"
              placeholder="Enter Sender ID"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">API Key</label>
            <input 
              v-model="smsService.apiKey"
              type="password"
              placeholder="Enter API key"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
            />
            <div class="text-orange-600 text-sm mt-1">Not configured</div>
          </div>
        </div>
      </div>

      <div class="flex justify-end">
        <button @click="saveIntegrationSettings" class="px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800">
          Save Integration Settings
        </button>
      </div>
    </div>

    <!-- Notifications Tab -->
    <div v-if="activeTab === 'notifications'" class="space-y-6">
      <!-- Communication Channels Section -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Communication Channels</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-6">Configure system and user notifications</p>
        
        <div class="space-y-4">
          <!-- Email Notifications -->
          <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-lg">
                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-900">Email Notifications</h4>
                <p class="text-xs text-gray-500">Send system notifications via email</p>
              </div>
            </div>
            <button 
              @click="notificationSettings.emailNotifications = !notificationSettings.emailNotifications"
              :class="notificationSettings.emailNotifications ? 'bg-gray-900' : 'bg-gray-200'"
              class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              <span 
                :class="notificationSettings.emailNotifications ? 'translate-x-6' : 'translate-x-1'"
                class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
              />
            </button>
          </div>
          
          <!-- SMS Notifications -->
          <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 flex items-center justify-center bg-green-100 rounded-lg">
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-900">SMS Notifications</h4>
                <p class="text-xs text-gray-500">Send time-sensitive alerts via SMS</p>
              </div>
            </div>
            <button 
              @click="notificationSettings.smsNotifications = !notificationSettings.smsNotifications"
              :class="notificationSettings.smsNotifications ? 'bg-gray-900' : 'bg-gray-200'"
              class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              <span 
                :class="notificationSettings.smsNotifications ? 'translate-x-6' : 'translate-x-1'"
                class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
              />
            </button>
          </div>
          
          <!-- Payment Reminders -->
          <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 flex items-center justify-center bg-yellow-100 rounded-lg">
                <svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-900">Payment Reminders</h4>
                <p class="text-xs text-gray-500">Send automatic reminders for due payments</p>
              </div>
            </div>
            <button 
              @click="notificationSettings.paymentReminders = !notificationSettings.paymentReminders"
              :class="notificationSettings.paymentReminders ? 'bg-gray-900' : 'bg-gray-200'"
              class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              <span 
                :class="notificationSettings.paymentReminders ? 'translate-x-6' : 'translate-x-1'"
                class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
              />
            </button>
          </div>
          
          <!-- Marketing Emails -->
          <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 flex items-center justify-center bg-purple-100 rounded-lg">
                <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-900">Marketing Emails</h4>
                <p class="text-xs text-gray-500">Send promotional content and updates</p>
              </div>
            </div>
            <button 
              @click="notificationSettings.marketingEmails = !notificationSettings.marketingEmails"
              :class="notificationSettings.marketingEmails ? 'bg-gray-900' : 'bg-gray-200'"
              class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              <span 
                :class="notificationSettings.marketingEmails ? 'translate-x-6' : 'translate-x-1'"
                class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
              />
            </button>
          </div>
        </div>
      </div>

      <!-- System Notifications Section -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">System Notifications</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-6">Configure system-specific notification types</p>
        
        <div class="space-y-4">
          <!-- System Updates -->
          <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 flex items-center justify-center bg-orange-100 rounded-lg">
                <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-900">System Updates</h4>
                <p class="text-xs text-gray-500">Notify about platform updates and maintenance</p>
              </div>
            </div>
            <button 
              @click="notificationSettings.systemUpdates = !notificationSettings.systemUpdates"
              :class="notificationSettings.systemUpdates ? 'bg-gray-900' : 'bg-gray-200'"
              class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              <span 
                :class="notificationSettings.systemUpdates ? 'translate-x-6' : 'translate-x-1'"
                class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
              />
            </button>
          </div>
          
          <!-- Usage Reports -->
          <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 flex items-center justify-center bg-indigo-100 rounded-lg">
                <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-900">Usage Reports</h4>
                <p class="text-xs text-gray-500">Send weekly activity and performance reports</p>
              </div>
            </div>
            <button 
              @click="notificationSettings.usageReports = !notificationSettings.usageReports"
              :class="notificationSettings.usageReports ? 'bg-gray-900' : 'bg-gray-200'"
              class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              <span 
                :class="notificationSettings.usageReports ? 'translate-x-6' : 'translate-x-1'"
                class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
              />
            </button>
          </div>
        </div>
      </div>

      <!-- Reminder Schedule Section -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Reminder Schedule</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-6">Configure the timing of reminders</p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Payment Reminder Days Before</label>
            <select 
              v-model="notificationSettings.paymentReminderDays"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="">Select Payment reminder days before</option>
              <option value="1">1 day before</option>
              <option value="3">3 days before</option>
              <option value="7">1 week before</option>
              <option value="14">2 weeks before</option>
              <option value="30">1 month before</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Reminder Frequency</label>
            <select 
              v-model="notificationSettings.reminderFrequency"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="">Select reminder frequency</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="biweekly">Bi-weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Overdue Reminder Days After</label>
            <select 
              v-model="notificationSettings.overdueReminderDays"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="">Select overdue reminder days after</option>
              <option value="1">1 day after</option>
              <option value="3">3 days after</option>
              <option value="7">1 week after</option>
              <option value="14">2 weeks after</option>
              <option value="30">1 month after</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Notification Templates Section -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Notification Templates</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-6">Customize notification content</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Template</label>
            <textarea 
              v-model="notificationSettings.emailTemplate"
              rows="6"
              placeholder="Enter email template"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
            ></textarea>
            <button @click="saveEmailTemplate" class="mt-2 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 text-sm">
              Save
            </button>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">SMS Template</label>
            <textarea 
              v-model="notificationSettings.smsTemplate"
              rows="6"
              placeholder="Enter SMS template"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
            ></textarea>
            <button @click="saveSmsTemplate" class="mt-2 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 text-sm">
              Save
            </button>
          </div>
        </div>
      </div>

      <div class="flex justify-end">
        <button @click="saveNotificationSettings" class="px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800">
          Save Notifications Settings
        </button>
      </div>
    </div>

    <!-- Security Tab -->
    <div v-if="activeTab === 'security'" class="space-y-6">
      <!-- Authentication Section -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Authentication</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-6">Configure platform security and access controls</p>
        
        <div class="space-y-6">
          <!-- Two-Factor Authentication -->
          <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-lg">
                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-900">Two-Factor Authentication</h4>
                <p class="text-xs text-gray-500">Require 2FA for all admin users</p>
              </div>
            </div>
            <button 
              @click="securitySettings.twoFactorAuth = !securitySettings.twoFactorAuth"
              :class="securitySettings.twoFactorAuth ? 'bg-gray-900' : 'bg-gray-200'"
              class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              <span 
                :class="securitySettings.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'"
                class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
              />
            </button>
          </div>

          <!-- Password and Session Settings -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password Expiry (days)</label>
              <input 
                v-model="securitySettings.passwordExpiry"
                type="number"
                placeholder="Enter Password Expiration days"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
              />
              <p class="text-xs text-gray-500 mt-1">0 = never expires</p>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Session Timeout (minutes)</label>
              <input 
                v-model="securitySettings.sessionTimeout"
                type="number"
                placeholder="Enter Session Time out"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
          </div>

          <!-- IP Restriction -->
          <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 flex items-center justify-center bg-green-100 rounded-lg">
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-900">IP Restriction</h4>
                <p class="text-xs text-gray-500">Limit admin access to specific IP addresses</p>
              </div>
            </div>
            <button 
              @click="securitySettings.ipRestriction = !securitySettings.ipRestriction"
              :class="securitySettings.ipRestriction ? 'bg-gray-900' : 'bg-gray-200'"
              class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              <span 
                :class="securitySettings.ipRestriction ? 'translate-x-6' : 'translate-x-1'"
                class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
              />
            </button>
          </div>

          <!-- Audit Logging -->
          <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 flex items-center justify-center bg-purple-100 rounded-lg">
                <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-900">Audit Logging</h4>
                <p class="text-xs text-gray-500">Log all administrator actions</p>
              </div>
            </div>
            <button 
              @click="securitySettings.auditLogging = !securitySettings.auditLogging"
              :class="securitySettings.auditLogging ? 'bg-gray-900' : 'bg-gray-200'"
              class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              <span 
                :class="securitySettings.auditLogging ? 'translate-x-6' : 'translate-x-1'"
                class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
              />
            </button>
          </div>

          <!-- Data Retention Period -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Data Retention Period (months)</label>
            <select 
              v-model="securitySettings.dataRetentionPeriod"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="">Select retention period</option>
              <option value="3">3 months</option>
              <option value="6">6 months</option>
              <option value="12">1 year</option>
              <option value="24">2 years</option>
              <option value="36">3 years</option>
              <option value="60">5 years</option>
              <option value="0">Indefinite</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Access Control Section -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Access Control</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-6">Configure login security and account protection</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Max Failed Login Attempts</label>
            <select 
              v-model="securitySettings.maxFailedLoginAttempts"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="">Select no of max failed attempt</option>
              <option value="3">3 attempts</option>
              <option value="5">5 attempts</option>
              <option value="10">10 attempts</option>
              <option value="15">15 attempts</option>
              <option value="20">20 attempts</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Account Lockout Duration (minutes)</label>
            <select 
              v-model="securitySettings.accountLockoutDuration"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="">Select account lockout duration time</option>
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="120">2 hours</option>
              <option value="240">4 hours</option>
              <option value="480">8 hours</option>
              <option value="1440">24 hours</option>
              <option value="0">Until manually unlocked</option>
            </select>
          </div>
        </div>
      </div>

      <div class="flex justify-end">
        <button @click="saveSecuritySettings" class="px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800">
          Save Security Settings
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// Active tab state
const activeTab = ref('general')

// General settings
const generalSettings = ref({
  defaultSchoolName: 'FeeSync School',
  supportEmail: 'support@feesync.com',
  supportPhone: '+234 123 456 7890',
  defaultCurrency: 'NGN',
  defaultTimeZone: 'Africa/Lagos',
  dateFormat: 'DD/MM/YYYY',
  maxFileSize: 10,
  maintenanceMode: false
})

// Fee settings
const feeSettings = ref({
  platformFee: 2.5,
  transactionFee: 100,
  minPayoutAmount: 5000,
  payoutSchedule: 'monthly'
})

// Notification settings
const notificationSettings = ref({
  emailNotifications: true,
  smsNotifications: false,
  pushNotifications: true,
  paymentReminders: true,
  marketingEmails: true,
  systemUpdates: true,
  usageReports: true,
  paymentReminderDays: '7',
  reminderFrequency: 'weekly',
  overdueReminderDays: '3',
  emailTemplate: 'Dear {{studentName}},\n\nYour payment for {{invoiceTitle}} is due on {{dueDate}}.\n\nAmount: {{amount}}\nInvoice ID: {{invoiceId}}\n\nPlease make the payment at your earliest convenience.\n\nRegards,\n{{schoolName}}',
  smsTemplate: 'Dear {{studentName}},\n\nYour payment for {{invoiceTitle}} is due on {{dueDate}}.\n\nAmount: {{amount}}\nInvoice ID: {{invoiceId}}\n\nPlease make the payment at your earliest convenience.\n\nRegards,\n{{schoolName}}'
})

// Security settings
const securitySettings = ref({
  sessionTimeout: 30,
  maxLoginAttempts: 5,
  passwordExpiry: 90,
  twoFactorAuth: true,
  ipRestriction: false,
  auditLogging: true,
  dataRetentionPeriod: '12',
  maxFailedLoginAttempts: '5',
  accountLockoutDuration: '30'
})

// Integration settings
const paymentIntegrations = ref({
  flutterwave: {
    enabled: true,
    apiKey: 'your_flutterwave_api_key'
  },
  stripe: {
    enabled: false,
    apiKey: ''
  },
  paystack: {
    enabled: true,
    secretKey: 'your_paystack_secret_key'
  },
  interswitch: {
    enabled: false,
    apiKey: ''
  }
})

const emailService = ref({
  provider: '',
  fromEmail: '',
  apiKey: '',
  fromName: ''
})

const smsService = ref({
  provider: '',
  senderId: '',
  apiKey: ''
})

// Save functions
const saveGeneralSettings = () => {
  console.log('Saving general settings:', generalSettings.value)
  // Here you would typically save to backend
  alert('General settings saved successfully!')
}

const saveFeeSettings = () => {
  console.log('Saving fee settings:', feeSettings.value)
  // Here you would typically save to backend
  alert('Fee settings saved successfully!')
}

const saveNotificationSettings = () => {
  console.log('Saving notification settings:', notificationSettings.value)
  // Here you would typically save to backend
  alert('Notification settings saved successfully!')
}

const saveSecuritySettings = () => {
  console.log('Saving security settings:', securitySettings.value)
  // Here you would typically save to backend
  alert('Security settings saved successfully!')
}

const saveIntegrationSettings = () => {
  console.log('Saving integration settings:', {
    paymentIntegrations: paymentIntegrations.value,
    emailService: emailService.value,
    smsService: smsService.value
  })
  // Here you would typically save to backend
  alert('Integration settings saved successfully!')
}

const saveEmailTemplate = () => {
  console.log('Saving email template:', notificationSettings.value.emailTemplate)
  // Here you would typically save to backend
  alert('Email template saved successfully!')
}

const saveSmsTemplate = () => {
  console.log('Saving SMS template:', notificationSettings.value.smsTemplate)
  // Here you would typically save to backend
  alert('SMS template saved successfully!')
}
</script>



