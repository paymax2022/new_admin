<template>
  <transition name="fade">
    <div class="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
      <div class="absolute inset-0 bg-[#0f172a]/40 backdrop-blur-sm" @click="$emit('close')" />
      <div class="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-[0_40px_80px_rgba(15,23,42,0.18)]">
        <header class="flex items-center justify-between border-b border-[#e2e8f0] px-8 py-6">
          <h2 class="text-xl font-semibold text-[#111827]">Update Eligibility Status</h2>
          <button
            type="button"
            class="flex h-9 w-9 items-center justify-center rounded-full bg-[#f1f5f9] text-[#475569] transition hover:opacity-80"
            @click="$emit('close')"
          >
            <IconX class="h-5 w-5" />
          </button>
        </header>

        <div class="px-8 py-6 space-y-6">
          <!-- Voter Information -->
          <div>
            <h3 class="text-2xl font-semibold text-[#111827] mb-2">{{ voter?.name || 'N/A' }}</h3>
            <p class="text-sm text-[#6b7280]">ID: {{ voter?.voterId || 'N/A' }}</p>
          </div>

          <!-- New Status -->
          <div>
            <label class="block text-sm font-semibold text-[#111827] mb-2">New Status</label>
            <div class="relative">
              <select
                v-model="newStatus"
                class="w-full appearance-none rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 pr-10 text-sm text-[#1f2937] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
              >
                <option value="eligible">Eligible</option>
                <option value="warning">Warning</option>
                <option value="suspended">Suspended</option>
                <option value="restricted">Restricted</option>
              </select>
              <IconCaretDown class="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#94a3b8] pointer-events-none" />
            </div>
          </div>

          <!-- Reason -->
          <div>
            <label class="block text-sm font-semibold text-[#111827] mb-2">Reason</label>
            <textarea
              v-model="reason"
              rows="4"
              placeholder="Enter reason for status change..."
              class="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm text-[#1f2937] placeholder:text-[#94a3b8] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5] resize-none"
            />
          </div>
        </div>

        <!-- Action Buttons -->
        <footer class="flex items-center justify-end gap-3 border-t border-[#e2e8f0] px-8 py-6">
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-xl border border-[#e2e8f0] bg-white px-6 py-2.5 text-sm font-semibold text-[#111827] transition hover:border-[#cbd5f5] hover:bg-[#f8fafc]"
            @click="handleRestrict"
          >
            <span class="flex h-5 w-5 items-center justify-center rounded-full bg-[#111827] text-xs font-semibold text-white">R</span>
            Restrict
          </button>
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-xl bg-[#111827] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1f2937]"
            @click="handleMarkEligible"
          >
            <span class="flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-semibold text-[#111827]">R</span>
            Mark Eligible
          </button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import IconX from '@/components/icon/icon-x.vue';
import IconCaretDown from '@/components/icon/icon-caret-down.vue';

interface Voter {
  id?: string;
  voterId?: string;
  name?: string;
  status?: string;
}

const props = defineProps<{
  voter?: Voter | null;
}>();

const emit = defineEmits(['close', 'update']);

const newStatus = ref('eligible');
const reason = ref('');

// Initialize status when voter prop changes
watch(
  () => props.voter,
  (newVoter) => {
    if (newVoter?.status) {
      newStatus.value = newVoter.status.toLowerCase();
    }
    reason.value = '';
  },
  { immediate: true }
);

const handleRestrict = () => {
  emit('update', {
    voter: props.voter,
    newStatus: 'restricted',
    reason: reason.value,
  });
  emit('close');
};

const handleMarkEligible = () => {
  emit('update', {
    voter: props.voter,
    newStatus: newStatus.value,
    reason: reason.value,
  });
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

