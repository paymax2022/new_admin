<template>
  <div class="min-h-screen bg-[#f7f9fc] p-6 space-y-6">
    <div class="flex flex-col gap-1">
      <h1 class="text-2xl font-semibold text-[#111827]">Settings</h1>
      <p class="text-sm text-[#6b7280]">Manage platform configuration and preferences</p>
    </div>

    <div class="rounded-3xl bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.05)] space-y-6">
      <div class="border-b border-[#e2e8f0]">
        <nav class="flex flex-wrap items-center gap-6 text-sm font-semibold text-[#94a3b8]">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            class="relative pb-3 transition"
            :class="activeTab === tab.id ? 'text-[#111827]' : 'hover:text-[#111827]'"
            @click="activeTab = tab.id"
          >
            {{ tab.label }}
            <span
              class="absolute inset-x-0 bottom-0 h-0.5 transition"
              :class="activeTab === tab.id ? 'bg-[#111827]' : 'bg-transparent'"
            ></span>
          </button>
        </nav>
      </div>

      <div v-if="activeTab === 'general'" class="space-y-5">
        <h2 class="text-lg font-semibold text-[#111827]">General Settings</h2>

        <div class="grid gap-4">
          <div>
            <label class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Application Name</label>
            <input
              type="text"
              placeholder="Enter Application Name"
              class="mt-2 w-full rounded-xl border border-[#e2e8f0] px-4 py-2 text-sm focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
            />
          </div>
          <div>
            <label class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Application Description</label>
            <input
              type="text"
              placeholder="Write a brief description"
              class="mt-2 w-full rounded-xl border border-[#e2e8f0] px-4 py-2 text-sm focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
            />
          </div>
          <div>
            <label class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Support Email</label>
            <input
              type="email"
              placeholder="support@crowdadmin.com"
              class="mt-2 w-full rounded-xl border border-[#e2e8f0] px-4 py-2 text-sm focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
            />
          </div>
          <div>
            <label class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Maximum Campaign Duration (days)</label>
            <input
              type="number"
              placeholder="0"
              class="mt-2 w-full rounded-xl border border-[#e2e8f0] px-4 py-2 text-sm focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
            />
          </div>
        </div>

        <div class="space-y-3">
          <h3 class="text-sm font-semibold text-[#111827]">System Behavior</h3>
          <div class="space-y-4 text-sm text-[#475569]">
            <ToggleRow label="Campaign Auto-Approval" description="Automatically approve campaigns without admin review" :enabled="true" />
            <ToggleRow label="Maintenance Mode" description="Temporarily disable public access to the platform" />
            <ToggleRow label="Email Notifications" description="Send email notifications to users" :enabled="true" />
          </div>
        </div>

        <div class="flex flex-wrap items-center justify-end gap-3">
          <button type="button" class="rounded-full border border-[#e2e8f0] px-5 py-2 text-sm font-semibold text-[#475569] transition hover:border-[#cbd5f5] hover:text-[#1e293b]">
            Reset to default
          </button>
          <button type="button" class="rounded-full border border-[#111827] bg-[#111827] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#0b1220]">
            Save changes
          </button>
        </div>
      </div>

      <div v-else-if="activeTab === 'categories'" class="space-y-6">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold text-[#111827]">Campaign Categories</h2>
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-full border border-[#2563eb] bg-[#2563eb] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1d4ed8]"
          >
            Add Category
            <IconPlus class="h-4 w-4" />
          </button>
        </div>

        <div class="rounded-2xl border border-[#e2e8f0] bg-white px-4">
          <div class="flex flex-col gap-3 py-4">
            <div class="flex items-center gap-3">
              <div class="flex-1">
                <input
                  type="text"
                  placeholder="New category name..."
                  class="w-full rounded-xl border border-[#e2e8f0] px-4 py-2 text-sm focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
                />
              </div>
              <button
                type="button"
                class="inline-flex items-center gap-2 rounded-full border border-[#2563eb] bg-[#2563eb] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1d4ed8]"
              >
                Add Category
                <IconPlus class="h-4 w-4" />
              </button>
            </div>

            <div class="overflow-hidden rounded-2xl border border-[#e2e8f0]">
              <table class="min-w-full divide-y divide-[#e2e8f0]">
                <thead class="bg-[#f8fafc] text-left text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">
                  <tr>
                    <th class="px-5 py-3">Category</th>
                    <th class="px-5 py-3">Required Documents</th>
                    <th class="px-5 py-3">Verification</th>
                    <th class="px-5 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-[#e2e8f0] text-sm text-[#475569]">
                  <tr v-for="category in categories" :key="category.name" class="bg-white">
                    <td class="px-5 py-4 font-semibold text-[#111827]">{{ category.name }}</td>
                    <td class="px-5 py-4">
                      <div class="flex flex-wrap gap-2">
                        <span
                          v-for="doc in category.documents"
                          :key="doc"
                          class="rounded-full border border-[#e2e8f0] bg-[#f8fafc] px-3 py-1 text-xs font-medium text-[#475569]"
                        >
                          {{ doc }}
                        </span>
                      </div>
                    </td>
                    <td class="px-5 py-4">
                      <span class="inline-flex items-center rounded-full border border-[#2563eb] bg-transparent px-3 py-1 text-xs font-semibold text-[#2563eb]">
                        Required
                      </span>
                    </td>
                    <td class="px-5 py-4 text-right">
                      <button type="button" class="text-sm font-semibold text-[#ef4444] transition hover:text-[#dc2626]">
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="activeTab === 'notifications'" class="space-y-6">
        <div>
          <h2 class="text-lg font-semibold text-[#111827]">Notification Preferences</h2>
          <p class="text-sm text-[#6b7280]">Transaction Alerts</p>
        </div>

        <div class="space-y-4 text-sm text-[#475569]">
          <NotificationRow
            v-for="notification in notificationPreferences"
            :key="notification.label"
            :label="notification.label"
            :description="notification.description"
            :enabled="notification.enabled"
          />
        </div>

        <div>
          <label class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Admin Notification Email</label>
          <input
            type="email"
            placeholder="admin@crowdadmin.com"
            class="mt-2 w-full rounded-xl border border-[#e2e8f0] px-4 py-2 text-sm focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
          />
        </div>

        <div class="flex justify-end">
          <button
            type="button"
            class="rounded-full border border-[#111827] bg-[#111827] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#0b1220]"
          >
            Save Notification Settings
          </button>
        </div>
      </div>

      <div v-else-if="activeTab === 'payments'" class="space-y-6">
        <h2 class="text-lg font-semibold text-[#111827]">Payment Settings</h2>

        <div class="space-y-5 text-sm text-[#475569]">
          <div>
            <label class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Platform Fee (%)</label>
            <input
              type="number"
              placeholder="0"
              class="mt-2 w-full rounded-xl border border-[#e2e8f0] px-4 py-2 text-sm focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
            />
            <p class="mt-1 text-xs text-[#94a3b8]">Percentage fee charged on successful campaigns</p>
          </div>
          <div>
            <label class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Minimum Withdrawal Amount</label>
            <input
              type="number"
              placeholder="0"
              class="mt-2 w-full rounded-xl border border-[#e2e8f0] px-4 py-2 text-sm focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
            />
            <p class="mt-1 text-xs text-[#94a3b8]">Percentage fee charged on successful campaigns</p>
          </div>
          <div>
            <label class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Payment Gateway</label>
            <select
              class="mt-2 w-full appearance-none rounded-xl border border-[#e2e8f0] bg-white px-4 py-2 text-sm text-[#1f2937] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
            >
              <option disabled selected>Select Payment gateway</option>
              <option>Stripe</option>
              <option>PayPal</option>
              <option>Flutterwave</option>
            </select>
          </div>
          <div>
            <ToggleRow
              label="Auto-Withdrawal"
              description="Automatically process withdrawals when campaigns end"
              :enabled="true"
            />
          </div>
        </div>

        <div class="flex justify-end">
          <button
            type="button"
            class="rounded-full border border-[#111827] bg-[#111827] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#0b1220]"
          >
            Save Payment Settings
          </button>
        </div>
      </div>

      <div v-else class="py-10 text-center text-sm text-[#94a3b8]">
        Design pending for this section.
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import IconPlus from '@/components/icon/icon-plus.vue';

import ToggleRow from './components/SettingsToggleRow.vue';
import NotificationRow from './components/SettingsNotificationRow.vue';

const tabs = [
  { id: 'general', label: 'General' },
  { id: 'categories', label: 'Categories' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'payments', label: 'Payments' },
];

const activeTab = ref<'general' | 'categories' | 'notifications' | 'payments'>('general');

const categories = [
  {
    name: 'Health',
    documents: ['Medical Report', "Doctor's Prescription", 'Hospital Bill'],
  },
  {
    name: 'Education',
    documents: ['School Enrollment', 'Fee Structure', 'Student ID'],
  },
  {
    name: 'Emergency',
    documents: ['Police Report', 'Identity Proof'],
  },
];

const notificationPreferences = [
  {
    label: 'New Campaign Notifications',
    description: 'Notify admins when new campaigns are created',
    enabled: true,
  },
  {
    label: 'Verification Request Notifications',
    description: 'Notify admins when verification documents are submitted',
    enabled: false,
  },
  {
    label: 'Payment Notifications',
    description: 'Notify admins of payment activities',
    enabled: true,
  },
  {
    label: 'User Support Notifications',
    description: 'Notify admins of new support tickets',
    enabled: false,
  },
];
</script>

