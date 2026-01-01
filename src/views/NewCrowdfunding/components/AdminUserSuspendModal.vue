<template>
  <transition name="fade">
    <div class="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
      <div class="absolute inset-0 bg-[#0f172a]/40 backdrop-blur-sm" @click="$emit('close')" />
      <div class="relative z-10 w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-[0_40px_80px_rgba(15,23,42,0.18)]">
        <div class="flex items-center justify-between border-b border-[#e2e8f0] px-8 py-6">
          <h2 class="text-2xl font-semibold text-[#111827]">Suspend User</h2>
          <button
            type="button"
            class="flex h-9 w-9 items-center justify-center rounded-full bg-[#f1f5f9] text-[#475569] transition hover:opacity-90"
            @click="$emit('close')"
          >
            <IconX class="h-5 w-5" />
          </button>
        </div>

        <div class="space-y-6 px-8 py-6">
          <div class="space-y-4">
            <div class="flex items-center gap-4">
              <div class="flex h-10 w-10 items-center justify-center rounded-full bg-[#eef2ff] text-sm font-semibold text-[#6366f1]">
                {{ initials }}
              </div>
              <div class="space-y-1">
                <p class="text-sm font-semibold text-[#111827]">{{ user.name }}</p>
                <p class="text-xs text-[#2563eb]">{{ user.email }}</p>
                <div class="flex items-center gap-2">
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
              </div>
            </div>

            <div class="rounded-2xl border border-[#fde68a] bg-[#fffbeb] px-4 py-4 text-xs text-[#92400e]">
              <div class="flex items-center gap-2 text-sm font-semibold text-[#b45309]">
                <IconAlert class="h-4 w-4" />
                This action will:
              </div>
              <ul class="mt-2 list-disc space-y-1 pl-5">
                <li>Immediately revoke admin panel access</li>
                <li>Disable all assigned permissions</li>
                <li>Log the user out of all active sessions</li>
                <li>Require manual reactivation to restore access</li>
              </ul>
            </div>

            <div>
              <label class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Reason for suspend *</label>
              <textarea
                rows="4"
                placeholder="Enter the reason for suspending this user..."
                class="mt-2 w-full rounded-2xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm text-[#1f2937] focus:border-[#f97316] focus:outline-none focus:ring-2 focus:ring-[#fed7aa]"
              />
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
            class="rounded-full border border-[#dc2626] bg-[#dc2626] px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#b91c1c]"
          >
            Suspend User
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import IconAlert from '@/components/icon/icon-info-triangle.vue';
import IconX from '@/components/icon/icon-x.vue';

const props = defineProps<{
  user: Record<string, any>;
}>();

const initials = computed(() => (props.user.name || '').split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase());

defineEmits(['close']);
</script>

