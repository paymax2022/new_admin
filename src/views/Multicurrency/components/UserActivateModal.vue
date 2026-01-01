<template>
  <transition name="fade">
    <div class="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
      <div class="absolute inset-0 bg-[#0f172a]/30 backdrop-blur-sm" @click="$emit('close')" />
      <div class="relative z-10 w-full max-w-lg rounded-3xl bg-white shadow-[0_40px_80px_rgba(15,23,42,0.18)]">
        <header class="flex items-center justify-between border-b border-[#f1f5f9] px-8 py-6">
          <div>
            <h2 class="text-xl font-semibold text-[#111827]">Activate User</h2>
            <p class="text-sm text-[#6b7280]">This will activate the user account and restore full access to services.</p>
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
          <div class="rounded-2xl border border-[#fde68a] bg-[#fffbeb] px-4 py-4">
            <div class="flex items-center gap-3 text-[#b45309]">
              <IconAlert class="h-5 w-5" />
              <h3 class="text-sm font-semibold">User Information</h3>
            </div>
            <div class="mt-3 space-y-2 text-sm text-[#475569]">
              <p><span class="font-semibold text-[#111827]">Name:</span> {{ user.name }}</p>
              <p><span class="font-semibold text-[#111827]">Email:</span> {{ user.email }}</p>
              <p><span class="font-semibold text-[#111827]">ID:</span> {{ user.userId }}</p>
              <p><span class="font-semibold text-[#111827]">Current Status:</span> {{ user.status.toLowerCase() }}</p>
            </div>
          </div>

          <div>
            <label class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Reason (Optional)</label>
            <textarea
              rows="4"
              placeholder="Optional reason for activating this account..."
              class="mt-2 w-full rounded-2xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm text-[#1f2937] focus:border-[#4f46e5] focus:outline-none focus:ring-2 focus:ring-[#c7d2fe]"
            />
          </div>

          <div class="rounded-2xl border border-[#bbf7d0] bg-[#ecfdf5] px-4 py-4 text-sm text-[#15803d]">
            <div class="flex items-start gap-3">
              <IconCheck class="mt-1 h-4 w-4" />
              <p>Activating this user will restore full access and enable all account functions.</p>
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
            class="rounded-full border border-[#4f46e5] bg-[#4f46e5] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#4338ca]"
          >
            Activate Account
          </button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import IconAlert from '@/components/icon/icon-info-triangle.vue';
import IconCheck from '@/components/icon/icon-checks.vue';
import IconX from '@/components/icon/icon-x.vue';

defineProps<{
  user: {
    name: string;
    email: string;
    userId: string;
    status: 'Active' | 'Suspended' | 'Inactive';
  };
}>();

defineEmits(['close']);
</script>


