<template>
  <div class="min-h-screen bg-white p-6 space-y-6">
    <!-- Header -->
    <div class="flex flex-col gap-2">
      <h1 class="text-2xl font-semibold text-[#111827]">Settings</h1>
      <p class="text-sm text-[#6b7280]">Manage system configurations, roles, and integrations</p>
    </div>

    <!-- Settings Sections -->
    <div class="grid gap-6 lg:grid-cols-2">
      <!-- General Settings -->
      <div class="rounded-xl bg-white border border-[#e5e7eb] p-6 shadow-sm">
        <div class="mb-6">
          <h2 class="text-lg font-semibold text-[#111827] mb-1">General Settings</h2>
          <p class="text-sm text-[#6b7280]">Basic application configurations</p>
        </div>

        <div class="space-y-6">
          <!-- Auto-assign Deliveries -->
          <div class="flex items-center justify-between">
            <div class="flex-1">
              <p class="text-sm font-medium text-[#111827] mb-1">Auto-assign Deliveries</p>
              <p class="text-sm text-[#6b7280]">Automatically assign deliveries to nearest available rider</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer ml-4">
              <input
                type="checkbox"
                v-model="settings.autoAssignDeliveries"
                class="sr-only peer"
              />
              <div
                class="w-11 h-6 bg-[#d1d5db] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#22c55e]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#22c55e]"
              ></div>
            </label>
          </div>

          <!-- Enable Real-time Tracking -->
          <div class="flex items-center justify-between">
            <div class="flex-1">
              <p class="text-sm font-medium text-[#111827] mb-1">Enable Real-time Tracking</p>
              <p class="text-sm text-[#6b7280]">Allow customers to track their deliveries in real-time</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer ml-4">
              <input
                type="checkbox"
                v-model="settings.realTimeTracking"
                class="sr-only peer"
              />
              <div
                class="w-11 h-6 bg-[#d1d5db] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#22c55e]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#22c55e]"
              ></div>
            </label>
          </div>

          <!-- SMS Notifications -->
          <div class="flex items-center justify-between">
            <div class="flex-1">
              <p class="text-sm font-medium text-[#111827] mb-1">SMS Notifications</p>
              <p class="text-sm text-[#6b7280]">Send SMS updates for delivery status changes</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer ml-4">
              <input
                type="checkbox"
                v-model="settings.smsNotifications"
                class="sr-only peer"
              />
              <div
                class="w-11 h-6 bg-[#d1d5db] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#22c55e]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#22c55e]"
              ></div>
            </label>
          </div>
        </div>
      </div>

      <!-- Operational Limits -->
      <div class="rounded-xl bg-white border border-[#e5e7eb] p-6 shadow-sm">
        <div class="mb-6">
          <h2 class="text-lg font-semibold text-[#111827] mb-1">Operational Limits</h2>
          <p class="text-sm text-[#6b7280]">Set operational boundaries</p>
        </div>

        <div class="space-y-6">
          <!-- Maximum Delivery Distance -->
          <div>
            <label class="block text-sm font-medium text-[#111827] mb-2">
              Maximum Delivery Distance (km)
            </label>
            <input
              type="text"
              v-model="settings.maxDeliveryDistance"
              placeholder="---"
              class="w-full rounded-lg border border-[#e5e7eb] bg-[#f9fafb] px-4 py-2.5 text-sm text-[#111827] placeholder:text-[#9ca3af] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20 focus:bg-white transition-colors"
            />
          </div>

          <!-- Max Concurrent Deliveries per Rider -->
          <div>
            <label class="block text-sm font-medium text-[#111827] mb-2">
              Max Concurrent Deliveries per Rider
            </label>
            <input
              type="text"
              v-model="settings.maxConcurrentDeliveries"
              placeholder="---"
              class="w-full rounded-lg border border-[#e5e7eb] bg-[#f9fafb] px-4 py-2.5 text-sm text-[#111827] placeholder:text-[#9ca3af] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20 focus:bg-white transition-colors"
            />
          </div>

          <!-- Delivery Timeout -->
          <div>
            <label class="block text-sm font-medium text-[#111827] mb-2">
              Delivery Timeout (seconds)
            </label>
            <div class="relative">
              <select
                v-model="settings.deliveryTimeout"
                class="appearance-none w-full rounded-lg border border-[#e5e7eb] bg-[#f9fafb] px-4 py-2.5 pr-10 text-sm text-[#111827] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20 focus:bg-white transition-colors"
              >
                <option value="30">30</option>
                <option value="60">60</option>
                <option value="90">90</option>
                <option value="120">120</option>
                <option value="180">180</option>
                <option value="300">300</option>
              </select>
              <IconCaretsDown class="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9ca3af]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import IconCaretsDown from '@/components/icon/icon-carets-down.vue';

interface Settings {
  autoAssignDeliveries: boolean;
  realTimeTracking: boolean;
  smsNotifications: boolean;
  maxDeliveryDistance: string;
  maxConcurrentDeliveries: string;
  deliveryTimeout: string;
}

const settings = ref<Settings>({
  autoAssignDeliveries: true,
  realTimeTracking: true,
  smsNotifications: true,
  maxDeliveryDistance: '',
  maxConcurrentDeliveries: '',
  deliveryTimeout: '60',
});
</script>

<style scoped>
/* Additional styles if needed */
</style>

