<template>
  <div class="min-h-screen bg-[#f7f9fc] p-6 space-y-6">
    <div class="space-y-1">
      <p class="text-sm font-semibold uppercase tracking-[0.2em] text-[#9ca3af]">Notifications</p>
      <h1 class="text-3xl font-semibold text-[#111827]">Notifications</h1>
      <p class="text-sm text-[#6b7280]">Manage and review system notifications and alerts</p>
    </div>

    <section class="flex flex-wrap items-center gap-4">
      <div class="rounded-full border border-[#e2e8f0] bg-white px-4 py-2 text-sm font-semibold text-[#111827]">
        All Notifications
      </div>
      <div class="rounded-full border border-[#e2e8f0] bg-white px-4 py-2 text-sm font-semibold text-[#dc2626]">
        6 Unread
      </div>
      <div class="ml-auto flex flex-wrap items-center gap-3">
        <button
          type="button"
          class="rounded-full border border-[#e2e8f0] bg-white px-4 py-2 text-sm font-semibold text-[#6b7280]"
        >
          Mark All as Read (44)
        </button>
      </div>
    </section>

    <section class="rounded-3xl bg-white p-5 shadow-[0_20px_40px_rgba(15,23,42,0.05)] space-y-4">
      <div class="flex flex-col gap-4 lg:flex-row lg:items-center">
        <div class="flex-1 rounded-full border border-[#e2e8f0] bg-[#f8fafc] px-4 py-2 text-sm text-[#6b7280]">
          <span class="text-[#cbd5f5]">Search notifications...</span>
        </div>
        <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            class="rounded-full border border-[#e2e8f0] bg-white px-4 py-2 text-sm font-semibold text-[#6b7280]"
          >
            All Types
          </button>
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-full border border-[#e2e8f0] bg-white px-4 py-2 text-sm font-semibold text-[#6b7280]"
          >
            All Status
            <IconCaretDown class="h-4 w-4 text-[#94a3b8]" />
          </button>
        </div>
      </div>
    </section>

    <section class="space-y-3">
      <article
        v-for="notification in notifications"
        :key="notification.id"
        class="rounded-3xl bg-white p-5 shadow-[0_20px_40px_rgba(15,23,42,0.05)]"
      >
        <div class="flex flex-col gap-2">
          <div class="flex flex-wrap items-center gap-3">
            <div class="flex items-center gap-2">
              <span class="text-base font-semibold text-[#111827]">{{ notification.title }}</span>
              <span
                v-if="notification.priority"
                class="rounded-full px-3 py-1 text-xs font-semibold uppercase"
                :style="{ backgroundColor: notification.priority.bg, color: notification.priority.color }"
              >
                {{ notification.priority.label }}
              </span>
            </div>
            <span class="text-xs text-[#94a3b8]">{{ notification.timeAgo }}</span>
          </div>
          <p class="text-sm text-[#6b7280]">{{ notification.description }}</p>
        </div>
      </article>
    </section>
  </div>
</template>

<script lang="ts" setup>
import IconCaretDown from '@/components/icon/icon-caret-down.vue';

const notifications = [
  {
    id: 1,
    title: 'New Complaint Submitted',
    timeAgo: '45m ago',
    description: 'A new complaint has been filed regarding voting irregularities in District 5.',
    priority: { label: 'high', bg: '#fee2e2', color: '#b91c1c' },
  },
  {
    id: 2,
    title: 'Election Registration Deadline Approaching',
    timeAgo: '63m ago',
    description: 'A new complaint has been filed regarding voting irregularities in District 5.',
    priority: { label: 'medium', bg: '#fef3c7', color: '#b45309' },
  },
  {
    id: 3,
    title: 'System Maintenance Scheduled',
    timeAgo: '83m ago',
    description: 'Scheduled maintenance window: Jan 20, 2024 from 2:00 AM to 3:00 AM.',
    priority: { label: 'low', bg: '#f1f5f9', color: '#475569' },
  },
  {
    id: 4,
    title: 'New User Registration Spike',
    timeAgo: '89m ago',
    description: '500+ new voter registrations in the last 24 hours.',
    priority: { label: 'medium', bg: '#dbeafe', color: '#1d4ed8' },
  },
  {
    id: 5,
    title: 'Security Alert: Multiple Failed Login Attempts',
    timeAgo: '91m ago',
    description: 'Detected 15 failed login attempts from IP: 192.168.1.100.',
    priority: { label: 'high', bg: '#fee2e2', color: '#b91c1c' },
  },
  {
    id: 6,
    title: 'Election Results Published',
    timeAgo: '3h ago',
    description: 'Election Results Published',
    priority: { label: 'neutral', bg: '#ede9fe', color: '#7c3aed' },
  },
];
</script>

