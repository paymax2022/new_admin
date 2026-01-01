<template>
  <transition name="fade">
    <div class="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
      <div class="absolute inset-0 bg-[#0f172a]/30 backdrop-blur-sm" @click="$emit('close')" />
      <div class="relative z-10 w-full max-w-lg rounded-3xl bg-white shadow-[0_40px_80px_rgba(15,23,42,0.18)]">
        <header class="flex items-center justify-between border-b border-[#f1f5f9] px-8 py-6">
          <div class="flex items-center gap-3 text-[#ef4444]">
            <div class="flex h-10 w-10 items-center justify-center rounded-full bg-[#fee2e2]">
              <IconLock class="h-5 w-5" />
            </div>
            <div>
              <h2 class="text-xl font-semibold text-[#111827]">Suspend User</h2>
              <p class="text-sm text-[#6b7280]">
                Are you sure you want to suspend {{ user.name }}? They will lose access to the platform until reactivated.
              </p>
            </div>
          </div>
          <button
            type="button"
            class="flex h-9 w-9 items-center justify-center rounded-full bg-[#f1f5f9] text-[#475569] transition hover:opacity-80"
            @click="$emit('close')"
          >
            <IconX class="h-5 w-5" />
          </button>
        </header>

        <section class="space-y-5 px-8 py-6">
          <div>
            <label class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Reason (Required)</label>
            <textarea
              rows="4"
              placeholder="Please provide a reason for suspending this user..."
              class="mt-2 w-full rounded-2xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm text-[#1f2937] focus:border-[#ef4444] focus:outline-none focus:ring-2 focus:ring-[#fca5a5]"
            />
          </div>

          <div class="rounded-2xl border border-[#fecaca] bg-[#fef2f2] px-4 py-4 text-sm text-[#b91c1c]">
            <div class="flex items-start gap-3">
              <IconAlert class="mt-1 h-4 w-4" />
              <p>Suspending this user will immediately block user access and freeze all accounts.</p>
            </div>
          </div>
        </section>

        <footer class="flex justify-end gap-3 border-t border-[#f1f5f9] px-8 py-5">
          <button
            type="button"
            class="rounded-full border border-[#e2e8f0] px-5 py-2 text-sm font-semibold text-[#475569] transition hover:border-[#cbd5f5]"
            @click="$emit('close')"
          >
            Cancel
          </button>
          <button
            type="button"
            class="rounded-full border border-[#ef4444] bg-[#ef4444] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#dc2626]"
          >
            Suspend Account
          </button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import IconAlert from '@/components/icon/icon-info-triangle.vue';
import IconLock from '@/components/icon/icon-lock.vue';
import IconX from '@/components/icon/icon-x.vue';

defineProps<{
  user: { name: string };
}>();

defineEmits(['close']);
</script>


