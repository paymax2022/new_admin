<template>
  <div class="min-h-screen bg-[#f7f9fc] p-6 space-y-8">
    <header class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div class="space-y-1">
        <h1 class="text-2xl font-semibold text-[#111827]">Audit logs</h1>
        <p class="text-sm text-[#6b7280]">Track all administrative actions</p>
      </div>
    </header>

    <section class="space-y-6 rounded-3xl bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.05)]">
      <div class="space-y-1">
        <h2 class="text-lg font-semibold text-[#111827]">Administrative Actions</h2>
        <p class="text-sm text-[#6b7280]">Complete history of admin activities</p>
      </div>

      <div class="rounded-3xl border border-[#e2e8f0]">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-[#e2e8f0] text-sm text-[#475569]">
            <thead class="bg-[#f8fafc] text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">
              <tr>
                <th class="px-5 py-4 text-left font-semibold text-[#111827]">Timestamp</th>
                <th class="px-5 py-4 text-left">Admin</th>
                <th class="px-5 py-4 text-left">Action</th>
                <th class="px-5 py-4 text-left">Target</th>
                <th class="px-5 py-4 text-left">Category</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[#e2e8f0] bg-white">
              <tr v-for="log in auditLogs" :key="log.id" class="hover:bg-[#f8fafc] transition">
                <td class="px-5 py-5 text-[#111827]">{{ log.timestamp }}</td>
                <td class="px-5 py-5">{{ log.admin }}</td>
                <td class="px-5 py-5 text-[#475569]">{{ log.action }}</td>
                <td class="px-5 py-5 text-[#475569]">{{ log.target }}</td>
                <td class="px-5 py-5">
                  <span
                    class="inline-flex items-center rounded-full bg-[#f8fafc] px-3 py-1 text-xs font-semibold capitalize text-[#475569]"
                  >
                    {{ log.category }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import IconBellBing from '@/components/icon/icon-bell-bing.vue';
import IconMessageDots from '@/components/icon/icon-message-dots.vue';
import IconUserCircle from '@/components/icon/icon-user-circle.vue';

const auditLogs = [
  {
    id: 1,
    timestamp: '2024-03-20 15:30:45',
    admin: 'Admin User',
    action: 'Suspended user account',
    target: 'Alice Johnson',
    category: 'user management',
  },
  {
    id: 2,
    timestamp: '2024-03-20 15:30:45',
    admin: 'Admin User',
    action: 'Updated exchange rate',
    target: 'USD to EUR',
    category: 'system config',
  },
  {
    id: 3,
    timestamp: '2024-03-20 15:30:45',
    admin: 'Admin User',
    action: 'Resolved support ticket',
    target: 'TKT003',
    category: 'support',
  },
  {
    id: 4,
    timestamp: '2024-03-20 15:30:45',
    admin: 'Admin User',
    action: 'Suspended virtual card',
    target: 'CARD003',
    category: 'card management',
  },
];
</script>

