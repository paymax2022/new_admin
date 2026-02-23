<template>
  <div class="min-h-screen bg-white p-5 md:p-6">
    <div class="mx-auto max-w-[1000px] space-y-5">
      <!-- Header + Save -->
      <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 class="text-2xl font-bold leading-tight text-[#333]">Settings</h1>
          <p class="mt-1 text-sm text-[#6b7280]">Manage your application configuration</p>
        </div>
        <button
          type="button"
          class="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[#333] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#111]"
          @click="saveChanges"
        >
          <IconSave class="h-4 w-4" />
          Save Changes
        </button>
      </div>

      <!-- Tabs -->
      <div class="border-b border-[#e5e7eb]">
        <div class="flex gap-0">
          <button
            v-for="tab in tabs"
            :key="tab.value"
            type="button"
            class="rounded-t-lg border-b-2 px-4 py-3 text-sm font-medium transition-colors"
            :class="activeTab === tab.value ? 'border-[#333] bg-[#f1f5f9] text-[#333]' : 'border-transparent bg-transparent text-[#6b7280] hover:bg-[#f8fafc]'"
            @click="activeTab = tab.value"
          >
            {{ tab.label }}
          </button>
        </div>
      </div>

      <!-- Pricing tab -->
      <template v-if="activeTab === 'pricing'">
        <!-- Ride Pricing -->
        <section class="rounded-xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
          <h2 class="text-base font-bold text-[#333]">Ride Pricing</h2>
          <div class="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label class="block text-sm font-medium text-[#374151]">Base Fare (₦)</label>
              <input
                v-model="ridePricing.baseFare"
                type="text"
                class="mt-1 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-[#333] shadow-sm focus:border-[#333] focus:outline-none focus:ring-1 focus:ring-[#333]"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-[#374151]">Per Mile Rate (₦)</label>
              <input
                v-model="ridePricing.perMileRate"
                type="text"
                class="mt-1 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-[#333] shadow-sm focus:border-[#333] focus:outline-none focus:ring-1 focus:ring-[#333]"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-[#374151]">Per Minute Rate (₦)</label>
              <input
                v-model="ridePricing.perMinuteRate"
                type="text"
                class="mt-1 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-[#333] shadow-sm focus:border-[#333] focus:outline-none focus:ring-1 focus:ring-[#333]"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-[#374151]">Minimum Fare (₦)</label>
              <input
                v-model="ridePricing.minimumFare"
                type="text"
                class="mt-1 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-[#333] shadow-sm focus:border-[#333] focus:outline-none focus:ring-1 focus:ring-[#333]"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-[#374151]">Cancellation Fee (₦)</label>
              <input
                v-model="ridePricing.cancellationFee"
                type="text"
                class="mt-1 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-[#333] shadow-sm focus:border-[#333] focus:outline-none focus:ring-1 focus:ring-[#333]"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-[#374151]">Surge Multiplier [max]</label>
              <input
                v-model="ridePricing.surgeMultiplier"
                type="text"
                class="mt-1 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-[#333] shadow-sm focus:border-[#333] focus:outline-none focus:ring-1 focus:ring-[#333]"
              />
            </div>
          </div>
        </section>

        <!-- Parcel Delivery Pricing -->
        <section class="rounded-xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
          <h2 class="text-base font-bold text-[#333]">Parcel Delivery Pricing</h2>
          <div class="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label class="block text-sm font-medium text-[#374151]">Base Delivery Fee (₦)</label>
              <input
                v-model="parcelPricing.baseFee"
                type="text"
                class="mt-1 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-[#333] shadow-sm focus:border-[#333] focus:outline-none focus:ring-1 focus:ring-[#333]"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-[#374151]">Per Mile Rate (₦)</label>
              <input
                v-model="parcelPricing.perMileRate"
                type="text"
                class="mt-1 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-[#333] shadow-sm focus:border-[#333] focus:outline-none focus:ring-1 focus:ring-[#333]"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-[#374151]">Weight Surcharge (per kg) (₦)</label>
              <input
                v-model="parcelPricing.weightSurcharge"
                type="text"
                class="mt-1 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-[#333] shadow-sm focus:border-[#333] focus:outline-none focus:ring-1 focus:ring-[#333]"
              />
            </div>
          </div>
        </section>

        <!-- Vehicle Categories -->
        <section class="rounded-xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
          <h2 class="text-base font-bold text-[#333]">Vehicle Categories</h2>
          <div class="mt-4 space-y-4">
            <div
              v-for="cat in vehicleCategories"
              :key="cat.id"
              class="flex flex-col gap-3 rounded-lg bg-[#f1f5f9] p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p class="font-medium text-[#333]">{{ cat.name }}</p>
                <p class="mt-0.5 text-sm text-[#6b7280]">{{ cat.description }}</p>
              </div>
              <div class="flex items-center gap-2 sm:shrink-0">
                <input
                  v-model="cat.multiplier"
                  type="text"
                  class="w-20 rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-center text-[#333] shadow-sm focus:border-[#333] focus:outline-none focus:ring-1 focus:ring-[#333]"
                />
                <span class="text-sm text-[#6b7280]">x multiplier</span>
              </div>
            </div>
          </div>
        </section>
      </template>

      <!-- Payment tab -->
      <template v-if="activeTab === 'payment'">
        <section class="rounded-xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
          <h2 class="text-base font-bold text-[#333]">Payment Gateway</h2>
          <div class="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label class="block text-sm font-medium text-[#374151]">Payment Provider</label>
              <select
                v-model="paymentGateway.provider"
                class="mt-1 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-[#333] shadow-sm focus:border-[#333] focus:outline-none focus:ring-1 focus:ring-[#333]"
              >
                <option value="">Select payment provider</option>
                <option value="paystack">Paystack</option>
                <option value="flutterwave">Flutterwave</option>
                <option value="stripe">Stripe</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-[#374151]">API Key</label>
              <input
                v-model="paymentGateway.apiKey"
                type="text"
                placeholder="Enter API Key"
                class="mt-1 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-[#333] shadow-sm placeholder:text-[#9ca3af] focus:border-[#333] focus:outline-none focus:ring-1 focus:ring-[#333]"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-[#374151]">Webhook Secret</label>
              <input
                v-model="paymentGateway.webhookSecret"
                type="text"
                placeholder="Enter webhook key"
                class="mt-1 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-[#333] shadow-sm placeholder:text-[#9ca3af] focus:border-[#333] focus:outline-none focus:ring-1 focus:ring-[#333]"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-[#374151]">Currency</label>
              <select
                v-model="paymentGateway.currency"
                class="mt-1 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-[#333] shadow-sm focus:border-[#333] focus:outline-none focus:ring-1 focus:ring-[#333]"
              >
                <option value="NGN">NGN (₦)</option>
                <option value="USD">USD ($)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>
          </div>
        </section>
        <section class="rounded-xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
          <h2 class="text-base font-bold text-[#333]">Payout Settings</h2>
          <div class="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label class="block text-sm font-medium text-[#374151]">Payout Schedule</label>
              <select
                v-model="payoutSettings.schedule"
                class="mt-1 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-[#333] shadow-sm focus:border-[#333] focus:outline-none focus:ring-1 focus:ring-[#333]"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="biweekly">Bi-weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-[#374151]">Minimum Payout (₦)</label>
              <input
                v-model="payoutSettings.minimumPayout"
                type="text"
                class="mt-1 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-[#333] shadow-sm focus:border-[#333] focus:outline-none focus:ring-1 focus:ring-[#333]"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-[#374151]">Platform Commission (%)</label>
              <input
                v-model="payoutSettings.platformCommission"
                type="text"
                class="mt-1 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-[#333] shadow-sm focus:border-[#333] focus:outline-none focus:ring-1 focus:ring-[#333]"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-[#374151]">Currency</label>
              <select
                v-model="payoutSettings.currency"
                class="mt-1 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-[#333] shadow-sm focus:border-[#333] focus:outline-none focus:ring-1 focus:ring-[#333]"
              >
                <option value="NGN">NGN (₦)</option>
                <option value="USD">USD ($)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>
          </div>
        </section>
      </template>

      <!-- Vehicle Hire tab -->
      <template v-if="activeTab === 'vehicle-hire'">
        <section class="rounded-xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
          <h2 class="text-base font-bold text-[#333]">Driver Assignment</h2>
          <div class="mt-4 space-y-5">
            <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p class="font-medium text-[#333]">Automatic Driver Assignment</p>
                <p class="mt-0.5 text-sm text-[#6b7280]">Automatically assign available drivers to vehicle hires when customers request a driver.</p>
              </div>
              <button
                type="button"
                role="switch"
                :aria-checked="driverAssignment.autoAssign"
                class="relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-2"
                :class="driverAssignment.autoAssign ? 'bg-[#333]' : 'bg-[#d1d5db]'"
                @click="driverAssignment.autoAssign = !driverAssignment.autoAssign"
              >
                <span
                  class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition-transform"
                  :class="driverAssignment.autoAssign ? 'translate-x-6' : 'translate-x-0.5'"
                  style="margin-top: 2px"
                />
              </button>
            </div>
            <div>
              <label class="block text-sm font-medium text-[#374151]">Assignment Priority</label>
              <select
                v-model="driverAssignment.priority"
                class="mt-1 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-[#333] shadow-sm focus:border-[#333] focus:outline-none focus:ring-1 focus:ring-[#333]"
              >
                <option value="rating">Highest Rating First</option>
                <option value="distance">Nearest First</option>
                <option value="availability">Earliest Available</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-[#374151]">Assignment Timeout (minutes)</label>
              <input
                v-model="driverAssignment.timeoutMinutes"
                type="text"
                class="mt-1 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-[#333] shadow-sm focus:border-[#333] focus:outline-none focus:ring-1 focus:ring-[#333]"
              />
              <p class="mt-1 text-xs text-[#6b7280]">Time to wait before trying next driver.</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-[#374151]">Max Assignment Attempts</label>
              <input
                v-model="driverAssignment.maxAttempts"
                type="text"
                placeholder="e.g. 5"
                class="mt-1 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-[#333] shadow-sm placeholder:text-[#9ca3af] focus:border-[#333] focus:outline-none focus:ring-1 focus:ring-[#333]"
              />
              <p class="mt-1 text-xs text-[#6b7280]">Number of drivers to try before manual assignment.</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-[#374151]">Minimum Driver Rating</label>
              <select
                v-model="driverAssignment.minRating"
                class="mt-1 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-[#333] shadow-sm focus:border-[#333] focus:outline-none focus:ring-1 focus:ring-[#333]"
              >
                <option value="3.0">3.0 or higher</option>
                <option value="4.0">4.0 or higher</option>
                <option value="4.5">4.5 or higher</option>
                <option value="any">Any</option>
              </select>
              <p class="mt-1 text-xs text-[#6b7280]">Only assign drivers with this rating or higher.</p>
            </div>
            <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p class="font-medium text-[#333]">Allow Manual Override</p>
                <p class="mt-0.5 text-sm text-[#6b7280]">Allow admins to manually assign or reassign drivers even when auto-assignment is enabled.</p>
              </div>
              <button
                type="button"
                role="switch"
                :aria-checked="driverAssignment.allowManualOverride"
                class="relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-2"
                :class="driverAssignment.allowManualOverride ? 'bg-[#333]' : 'bg-[#d1d5db]'"
                @click="driverAssignment.allowManualOverride = !driverAssignment.allowManualOverride"
              >
                <span
                  class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition-transform"
                  :class="driverAssignment.allowManualOverride ? 'translate-x-6' : 'translate-x-0.5'"
                  style="margin-top: 2px"
                />
              </button>
            </div>
            <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p class="font-medium text-[#333]">Driver Notification</p>
                <p class="mt-0.5 text-sm text-[#6b7280]">Send push notification to driver when assigned to a vehicle hire.</p>
              </div>
              <button
                type="button"
                role="switch"
                :aria-checked="driverAssignment.driverNotification"
                class="relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-2"
                :class="driverAssignment.driverNotification ? 'bg-[#333]' : 'bg-[#d1d5db]'"
                @click="driverAssignment.driverNotification = !driverAssignment.driverNotification"
              >
                <span
                  class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition-transform"
                  :class="driverAssignment.driverNotification ? 'translate-x-6' : 'translate-x-0.5'"
                  style="margin-top: 2px"
                />
              </button>
            </div>
          </div>
        </section>
        <section class="rounded-xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
          <h2 class="text-base font-bold text-[#333]">Driver Requirements</h2>
          <div class="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label class="block text-sm font-medium text-[#374151]">Driver Requirements</label>
              <select
                v-model="driverRequirements.license"
                class="mt-1 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-[#333] shadow-sm focus:border-[#333] focus:outline-none focus:ring-1 focus:ring-[#333]"
              >
                <option value="all">All Valid Licenses</option>
                <option value="class-b">Class B or higher</option>
                <option value="commercial">Commercial only</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-[#374151]">Background Check</label>
              <select
                v-model="driverRequirements.backgroundCheck"
                class="mt-1 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-[#333] shadow-sm focus:border-[#333] focus:outline-none focus:ring-1 focus:ring-[#333]"
              >
                <option value="required">Required</option>
                <option value="optional">Optional</option>
                <option value="none">Not required</option>
              </select>
            </div>
          </div>
        </section>
      </template>

      <!-- Notifications tab -->
      <template v-if="activeTab === 'notifications'">
        <section class="rounded-xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
          <h2 class="text-base font-bold text-[#333]">Notification Channels</h2>
          <div class="mt-4 space-y-5">
            <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p class="font-medium text-[#333]">Email Notifications</p>
                <p class="mt-0.5 text-sm text-[#6b7280]">Send booking confirmations via email</p>
              </div>
              <button
                type="button"
                role="switch"
                :aria-checked="notificationChannels.email"
                class="relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-2"
                :class="notificationChannels.email ? 'bg-[#333]' : 'bg-[#d1d5db]'"
                @click="notificationChannels.email = !notificationChannels.email"
              >
                <span
                  class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition-transform"
                  :class="notificationChannels.email ? 'translate-x-6' : 'translate-x-0.5'"
                  style="margin-top: 2px"
                />
              </button>
            </div>
            <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p class="font-medium text-[#333]">SMS Notifications</p>
                <p class="mt-0.5 text-sm text-[#6b7280]">Send booking updates via SMS</p>
              </div>
              <button
                type="button"
                role="switch"
                :aria-checked="notificationChannels.sms"
                class="relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-2"
                :class="notificationChannels.sms ? 'bg-[#333]' : 'bg-[#d1d5db]'"
                @click="notificationChannels.sms = !notificationChannels.sms"
              >
                <span
                  class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition-transform"
                  :class="notificationChannels.sms ? 'translate-x-6' : 'translate-x-0.5'"
                  style="margin-top: 2px"
                />
              </button>
            </div>
            <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p class="font-medium text-[#333]">Push Notifications</p>
                <p class="mt-0.5 text-sm text-[#6b7280]">Send real-time app notifications</p>
              </div>
              <button
                type="button"
                role="switch"
                :aria-checked="notificationChannels.push"
                class="relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-2"
                :class="notificationChannels.push ? 'bg-[#333]' : 'bg-[#d1d5db]'"
                @click="notificationChannels.push = !notificationChannels.push"
              >
                <span
                  class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition-transform"
                  :class="notificationChannels.push ? 'translate-x-6' : 'translate-x-0.5'"
                  style="margin-top: 2px"
                />
              </button>
            </div>
          </div>
        </section>
        <section class="rounded-xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
          <h2 class="text-base font-bold text-[#333]">Email Templates</h2>
          <div class="mt-4 space-y-4">
            <div>
              <label class="block text-sm font-medium text-[#374151]">Booking Confirmation Subject</label>
              <input
                v-model="emailTemplates.bookingSubject"
                type="text"
                class="mt-1 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-[#333] shadow-sm focus:border-[#333] focus:outline-none focus:ring-1 focus:ring-[#333]"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-[#374151]">Booking Confirmation Body</label>
              <textarea
                v-model="emailTemplates.bookingBody"
                rows="4"
                class="mt-1 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-[#333] shadow-sm focus:border-[#333] focus:outline-none focus:ring-1 focus:ring-[#333]"
              />
            </div>
          </div>
        </section>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import IconSave from '@/components/icon/icon-save.vue';

const tabs = [
  { value: 'pricing', label: 'Pricing' },
  { value: 'payment', label: 'Payment' },
  { value: 'vehicle-hire', label: 'Vehicle Hire' },
  { value: 'notifications', label: 'Notifications' },
];

const activeTab = ref('pricing');

const ridePricing = reactive({
  baseFare: '2.50',
  perMileRate: '2.50',
  perMinuteRate: '2.50',
  minimumFare: '2.50',
  cancellationFee: '2.50',
  surgeMultiplier: '2.50',
});

const parcelPricing = reactive({
  baseFee: '2.50',
  perMileRate: '2.50',
  weightSurcharge: '2.50',
});

const vehicleCategories = reactive([
  { id: 'economy', name: 'Economy', description: 'Standard vehicles', multiplier: '1.0' },
  { id: 'comfort', name: 'Comfort', description: 'Premium vehicles', multiplier: '1.0' },
  { id: 'luxury', name: 'Luxury', description: 'High-end vehicles', multiplier: '1.0' },
]);

const paymentGateway = reactive({
  provider: '',
  apiKey: '',
  webhookSecret: '',
  currency: 'NGN',
});

const payoutSettings = reactive({
  schedule: 'weekly',
  minimumPayout: '50.00',
  platformCommission: '20',
  currency: 'NGN',
});

const driverAssignment = reactive({
  autoAssign: true,
  priority: 'rating',
  timeoutMinutes: '5',
  maxAttempts: '',
  minRating: '4.0',
  allowManualOverride: true,
  driverNotification: true,
});

const driverRequirements = reactive({
  license: 'all',
  backgroundCheck: 'required',
});

const notificationChannels = reactive({
  email: false,
  sms: false,
  push: false,
});

const emailTemplates = reactive({
  bookingSubject: 'Your booking {{booking_id}} is confirmed!',
  bookingBody: 'Hi {{user_name}}, your booking has been confirmed. Your driver {{driver_name}} will arrive at {{pickup_time}}.',
});

function saveChanges() {
  // Placeholder: persist or show toast
}
</script>
