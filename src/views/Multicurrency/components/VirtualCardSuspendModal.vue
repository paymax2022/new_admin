<template>
  <transition name="fade">
    <div class="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
      <div class="absolute inset-0 bg-[#0f172a]/30 backdrop-blur-sm" @click="$emit('close')" />
      <div class="relative z-10 w-full max-w-md rounded-3xl bg-white shadow-[0_40px_80px_rgba(15,23,42,0.18)]">
        <header class="flex items-center justify-between border-b border-[#f1f5f9] px-8 py-6">
          <div class="flex items-center gap-3 text-[#ef4444]">
            <div class="flex h-10 w-10 items-center justify-center rounded-full bg-[#fee2e2]">
              <IconLock class="h-5 w-5" />
            </div>
            <div>
              <h2 class="text-xl font-semibold text-[#111827]">Suspend Card</h2>
              <p class="text-sm text-[#6b7280]">
                Are you sure you want to suspend card {{ card.id }}? The cardholder will not be able to use this card until it is
                reactivated.
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

        <footer class="flex justify-end gap-3 px-8 py-6">
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
            Suspend Card
          </button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import IconLock from '@/components/icon/icon-lock.vue';
import IconX from '@/components/icon/icon-x.vue';

defineProps<{
  card: { id: string };
}>();

defineEmits(['close']);
</script>


