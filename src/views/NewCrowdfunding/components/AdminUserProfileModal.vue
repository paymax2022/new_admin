<template>
  <transition name="fade">
    <div class="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
      <div class="absolute inset-0 bg-[#0f172a]/40 backdrop-blur-sm" @click="$emit('close')" />
      <div class="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-[0_40px_80px_rgba(15,23,42,0.18)]">
        <div class="flex items-center justify-between border-b border-[#e2e8f0] px-8 py-6">
          <h2 class="text-2xl font-semibold text-[#111827]">Admin User Profile</h2>
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
            <div class="flex h-12 w-12 items-center justify-center rounded-full bg-[#eef2ff] text-base font-semibold text-[#6366f1]">
              {{ initials }}
            </div>
            <div class="space-y-1">
              <div class="flex items-center gap-2">
                <p class="text-sm font-semibold text-[#111827]">{{ user.name }}</p>
                <span
                  class="inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
                  :style="{ color: user.role.color, borderColor: user.role.color, backgroundColor: user.role.bg }"
                >
                  {{ user.role.label }}
                </span>
                <span
                  class="inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
                  :style="{ color: user.status.color, borderColor: user.status.color, backgroundColor: user.status.bg }"
                >
                  {{ user.status.label }}
                </span>
              </div>
              <p class="text-xs text-[#2563eb]">{{ user.email }}</p>
            </div>
          </div>

          <div class="grid gap-6 sm:grid-cols-2">
            <div class="space-y-4">
              <div class="space-y-1">
                <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Basic Information</p>
                <div class="space-y-2 text-sm text-[#475569]">
                  <div>
                    <p class="font-semibold text-[#111827]">Email</p>
                    <p>{{ user.email }}</p>
                  </div>
                  <div>
                    <p class="font-semibold text-[#111827]">Department</p>
                    <p>{{ user.department }}</p>
                  </div>
                  <div>
                    <p class="font-semibold text-[#111827]">Joined Date</p>
                    <p>{{ userProfile.joinedDate }}</p>
                  </div>
                  <div>
                    <p class="font-semibold text-[#111827]">Last Login</p>
                    <p>{{ userProfile.lastLogin }}</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="space-y-4">
              <div class="space-y-2">
                <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Permissions</p>
                <span class="inline-flex items-center gap-2 rounded-full border border-[#e2e8f0] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#111827]">
                  <IconLockDots class="h-4 w-4 text-[#2563eb]" />
                  All Access
                  <span class="ml-2 inline-flex items-center rounded-full bg-[#eef2ff] px-2 py-0.5 text-[10px] font-semibold text-[#2563eb]">
                    Granted
                  </span>
                </span>
                <p class="text-xs text-[#94a3b8]">Includes user management, campaign, wallet, reports and compliance.</p>
              </div>
            </div>
          </div>

          <div class="space-y-3">
            <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Activity Summary</p>
            <div class="grid gap-4 sm:grid-cols-3">
              <div class="rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-4 text-center">
                <p class="text-2xl font-semibold text-[#111827]">{{ userProfile.activity.today }}</p>
                <p class="text-xs text-[#94a3b8]">Actions Today</p>
              </div>
              <div class="rounded-2xl border border-[#e2e8f0] bg-[#fdf8f0] px-4 py-4 text-center">
                <p class="text-2xl font-semibold text-[#111827]">{{ userProfile.activity.thisWeek }}</p>
                <p class="text-xs text-[#94a3b8]">This Week</p>
              </div>
              <div class="rounded-2xl border border-[#e2e8f0] bg-[#e6fffa] px-4 py-4 text-center">
                <p class="text-2xl font-semibold text-[#10b981]">{{ userProfile.activity.uptime }}</p>
                <p class="text-xs text-[#94a3b8]">Uptime</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import IconLockDots from '@/components/icon/icon-lock-dots.vue';
import IconX from '@/components/icon/icon-x.vue';

const props = defineProps<{
  user: Record<string, any>;
}>();

const userProfile = computed(() => ({
  joinedDate: props.user.detail?.joinedDate ?? '—',
  lastLogin: props.user.lastLogin ?? '—',
  activity: {
    today: props.user.detail?.activity?.today ?? '—',
    thisWeek: props.user.detail?.activity?.thisWeek ?? '—',
    uptime: props.user.detail?.activity?.uptime ?? '—',
  },
}));

const initials = computed(() => (props.user.name || '').split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase());

defineEmits(['close']);
</script>

