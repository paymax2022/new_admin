<template>
  <transition name="fade">
    <div class="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
      <div class="absolute inset-0 bg-[#0f172a]/40 backdrop-blur-sm" @click="$emit('close')" />
      <div class="relative z-10 w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-[0_40px_80px_rgba(15,23,42,0.18)]">
        <div class="flex items-center justify-between border-b border-[#e2e8f0] px-8 py-6">
          <h2 class="text-2xl font-semibold text-[#111827]">Create New Role</h2>
          <button
            type="button"
            class="flex h-9 w-9 items-center justify-center rounded-full bg-[#f1f5f9] text-[#475569] transition hover:opacity-90"
            @click="$emit('close')"
          >
            <IconX class="h-5 w-5" />
          </button>
        </div>

        <div class="space-y-6 px-8 py-6">
          <div class="grid gap-4 sm:grid-cols-2">
            <div>
              <label class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Role Name</label>
              <input type="text" placeholder="e.g., Content Moderator" class="mt-2 w-full rounded-xl border border-[#e2e8f0] px-4 py-2 text-sm focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]" />
            </div>
            <div>
              <label class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Description</label>
              <input type="text" placeholder="Brief description of this role's responsibilities." class="mt-2 w-full rounded-xl border border-[#e2e8f0] px-4 py-2 text-sm focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]" />
            </div>
          </div>

          <div>
            <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Permissions</p>
            <div class="mt-3 grid gap-3 sm:grid-cols-2">
              <button
                v-for="permission in permissions"
                :key="permission.label"
                type="button"
                class="flex items-center justify-between rounded-xl border border-[#e2e8f0] px-4 py-3 text-sm text-[#475569] transition hover:bg-[#f8fafc]"
              >
                <span>{{ permission.label }}</span>
                <span
                  class="inline-flex h-5 w-9 items-center rounded-full border border-transparent px-0.5 transition-colors duration-200"
                  :class="permission.enabled ? 'bg-[#2563eb]' : 'bg-[#e2e8f0]'"
                >
                  <span
                    class="h-4 w-4 rounded-full bg-white shadow transform transition-transform duration-200"
                    :class="permission.enabled ? 'translate-x-4' : 'translate-x-0'"
                  />
                </span>
              </button>
            </div>
          </div>
        </div>

        <div class="flex justify-end gap-3 border-t border-[#e2e8f0] px-8 py-4">
          <button
            type="button"
            class="rounded-full border border-[#e2e8f0] px-5 py-2 text-sm font-semibold text-[#475569] transition hover:border-[#cbd5f5] hover:text-[#1e293b]"
            @click="$emit('close')"
          >
            Cancel
          </button>
          <button
            type="button"
            class="rounded-full border border-[#2563eb] bg-[#2563eb] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#1d4ed8]"
          >
            Create Role
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import IconX from '@/components/icon/icon-x.vue';

defineEmits(['close']);

const permissions = [
  { label: 'User Management', enabled: true },
  { label: 'Wallet Management', enabled: false },
  { label: 'Campaign Management', enabled: true },
  { label: 'Promotion Management', enabled: true },
  { label: 'Support', enabled: false },
  { label: 'Admin Users', enabled: true },
  { label: 'System Settings', enabled: false },
];
</script>


