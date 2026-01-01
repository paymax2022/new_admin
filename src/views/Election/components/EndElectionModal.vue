<template>
  <transition name="fade">
    <div class="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
      <div class="absolute inset-0 bg-[#0f172a]/40 backdrop-blur-sm" @click="$emit('close')" />
      <div class="relative z-10 w-full max-w-md rounded-3xl bg-white shadow-[0_40px_80px_rgba(15,23,42,0.18)]">
        <header class="flex items-center justify-between border-b border-[#e2e8f0] px-8 py-6">
          <h2 class="text-xl font-semibold text-[#111827]">End Election</h2>
          <button
            type="button"
            class="flex h-9 w-9 items-center justify-center rounded-full bg-[#f1f5f9] text-[#475569] transition hover:opacity-80"
            @click="$emit('close')"
          >
            <IconX class="h-5 w-5" />
          </button>
        </header>

        <div class="px-8 py-6">
          <p class="text-sm text-[#475569] leading-relaxed">
            Are you sure you want to end <span class="font-semibold text-[#111827]">"{{ election?.title || '' }}"</span>? This action
            cannot be undone and will permanently close the election to new votes.
          </p>
        </div>

        <footer class="flex items-center justify-end gap-3 border-t border-[#e2e8f0] px-8 py-6">
          <button
            type="button"
            class="rounded-xl border border-[#e2e8f0] bg-white px-6 py-2.5 text-sm font-semibold text-[#475569] transition hover:border-[#cbd5f5] hover:text-[#1e293b]"
            @click="$emit('close')"
          >
            Cancel
          </button>
          <button
            type="button"
            class="rounded-xl bg-[#111827] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1f2937]"
            @click="handleConfirm"
          >
            End Election
          </button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import IconX from '@/components/icon/icon-x.vue';

const props = defineProps<{
  election?: {
    title?: string;
  };
}>();

const emit = defineEmits(['close', 'confirm']);

const handleConfirm = () => {
  emit('confirm', props.election);
  emit('close');
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>








