<template>
  <transition name="fade">
    <div class="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
      <div class="absolute inset-0 bg-[#0f172a]/40 backdrop-blur-sm" @click="$emit('close')" />
      <div class="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-[0_40px_80px_rgba(15,23,42,0.18)]">
        <div class="flex items-center justify-between border-b border-[#e2e8f0] px-8 py-6">
          <div>
            <h2 class="text-2xl font-semibold text-[#111827]">Add New Admin User</h2>
            <p class="text-sm text-[#64748b]">Create a new admin user account with appropriate roles and permissions.</p>
          </div>
          <button
            type="button"
            class="flex h-9 w-9 items-center justify-center rounded-full bg-[#f1f5f9] text-[#475569] transition hover:opacity-90"
            @click="$emit('close')"
          >
            <IconX class="h-5 w-5" />
          </button>
        </div>

        <div class="space-y-6 px-8 py-6">
          <div class="flex items-center gap-4">
            <div class="flex h-12 w-12 items-center justify-center rounded-full bg-[#e2e8f0] text-[#2563eb]">
              <IconUserPlus class="h-6 w-6" />
            </div>
            <div>
              <button type="button" class="text-sm font-semibold text-[#2563eb]">Add New Admin User</button>
              <p class="text-xs text-[#94a3b8]">JPG, PNG or GIF (max 2MB)</p>
            </div>
          </div>

          <div class="grid gap-4 sm:grid-cols-2">
            <div>
              <label class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">First Name</label>
              <input type="text" placeholder="Enter first name" class="mt-2 w-full rounded-xl border border-[#e2e8f0] px-4 py-2 text-sm focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]" />
            </div>
            <div>
              <label class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Last Name</label>
              <input type="text" placeholder="Enter last name" class="mt-2 w-full rounded-xl border border-[#e2e8f0] px-4 py-2 text-sm focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]" />
            </div>
          </div>

          <div>
            <label class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Email Address</label>
            <input type="email" placeholder="Enter email address" class="mt-2 w-full rounded-xl border border-[#e2e8f0] px-4 py-2 text-sm focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]" />
          </div>

          <div class="grid gap-4 sm:grid-cols-2">
            <div>
              <label class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Admin Role</label>
              <select class="mt-2 w-full rounded-xl border border-[#e2e8f0] px-4 py-2 text-sm focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]">
                <option>Select role</option>
                <option>Super Admin</option>
                <option>Operations Admin</option>
                <option>Compliance Admin</option>
                <option>Support Admin</option>
              </select>
            </div>
            <div>
              <label class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Department</label>
              <select class="mt-2 w-full rounded-xl border border-[#e2e8f0] px-4 py-2 text-sm focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]">
                <option>Select department</option>
                <option>Operations</option>
                <option>Analytics</option>
                <option>Compliance</option>
                <option>Support</option>
              </select>
            </div>
          </div>

          <div class="space-y-3">
            <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Permissions</p>
            <div class="grid gap-3 sm:grid-cols-2">
              <label
                v-for="permission in permissions"
                :key="permission"
                class="flex items-center gap-3 rounded-xl border border-[#e2e8f0] px-4 py-3 text-sm text-[#475569]"
              >
                <input
                  type="radio"
                  name="admin-permissions"
                  class="h-4 w-4 rounded-full border border-[#94a3b8] text-[#2563eb] focus:ring-[#2563eb]"
                />
                {{ permission }}
              </label>
            </div>
            <label class="flex items-center gap-2 text-sm font-semibold text-[#2563eb]">
              <input type="radio" name="admin-permissions" class="h-4 w-4 rounded-full border border-[#94a3b8] text-[#2563eb] focus:ring-[#2563eb]" />
              All Access
            </label>
          </div>
        </div>

        <div class="flex justify-end gap-3 border-t border-[#e2e8f0] px-8 py-4">
          <button type="button" class="rounded-full border border-[#e2e8f0] px-5 py-2 text-sm font-semibold text-[#475569] transition hover:border-[#cbd5f5] hover:text-[#1e293b]" @click="$emit('close')">
            Cancel
          </button>
          <button type="button" class="rounded-full border border-[#2563eb] bg-[#2563eb] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#1d4ed8]">
            Create Admin User
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import IconUserPlus from '@/components/icon/icon-user-plus.vue';
import IconX from '@/components/icon/icon-x.vue';

defineEmits(['close']);

const permissions = [
  'Dashboard',
  'User Management',
  'Campaign Management',
  'Admin users',
  'Wallet Management',
  'Support',
  'Promotions',
  'Settings',
];
</script>

