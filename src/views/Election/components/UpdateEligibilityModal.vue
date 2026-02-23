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
            <h3 class="text-2xl font-semibold text-[#111827] mb-2">
              {{ voter?.name || voter?.full_name || voter?.participant_name || 'N/A' }}
            </h3>
            <p class="text-sm text-[#6b7280]">
              ID: {{ voter?.identifier || voter?.student_id || voter?.member_id || voter?.voterId || voter?.id || 'N/A' }}
            </p>
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
                <option value="restricted">Restricted</option>
                <option value="suspended">Suspended</option>
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
              required
              class="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm text-[#1f2937] placeholder:text-[#94a3b8] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5] resize-none"
            />
          </div>

          <!-- Flag Participant Section -->
          <div class="rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] p-4">
            <h4 class="text-sm font-semibold text-[#111827] mb-3">Flag Participant</h4>
            <div class="space-y-3">
              <div>
                <label class="block text-sm font-semibold text-[#111827] mb-2">Flag Type</label>
                <select
                  v-model="flagType"
                  class="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm text-[#1f2937] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
                >
                  <option value="">Select flag type</option>
                  <option value="suspicious">Suspicious Activity</option>
                  <option value="violation">Policy Violation</option>
                  <option value="fraud">Potential Fraud</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-semibold text-[#111827] mb-2">Flag Reason</label>
                <textarea
                  v-model="flagReason"
                  rows="3"
                  placeholder="Enter reason for flagging..."
                  class="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm text-[#1f2937] placeholder:text-[#94a3b8] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5] resize-none"
                />
              </div>
              <button
                type="button"
                :disabled="!flagType || !flagReason.trim()"
                @click="handleFlag"
                class="w-full rounded-xl bg-[#dc2626] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#b91c1c] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Flag Participant
              </button>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <footer class="flex items-center justify-end gap-3 border-t border-[#e2e8f0] px-8 py-6">
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-xl border border-[#e2e8f0] bg-white px-6 py-2.5 text-sm font-semibold text-[#111827] transition hover:border-[#cbd5f5] hover:bg-[#f8fafc]"
            @click="$emit('close')"
          >
            Cancel
          </button>
          <button
            type="button"
            :disabled="!reason.trim()"
            class="inline-flex items-center gap-2 rounded-xl bg-[#111827] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1f2937] disabled:opacity-50 disabled:cursor-not-allowed"
            @click="handleUpdate"
          >
            Update Eligibility
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

const props = defineProps<{
  voter?: any | null;
  electionId?: string | null;
}>();

const emit = defineEmits(['close', 'update', 'flag']);

const newStatus = ref('eligible');
const reason = ref('');
const flagType = ref('');
const flagReason = ref('');

// Initialize status when voter prop changes
watch(
  () => props.voter,
  (newVoter) => {
    if (newVoter) {
      const elig = newVoter.eligibility_status || newVoter.is_eligible;
      if (typeof elig === 'boolean') {
        newStatus.value = elig ? 'eligible' : 'restricted';
      } else if (elig) {
        newStatus.value = (elig || '').toLowerCase();
      }
      reason.value = '';
      flagType.value = '';
      flagReason.value = '';
    }
  },
  { immediate: true }
);

const handleUpdate = () => {
  if (!reason.value.trim()) return;
  
  emit('update', {
    voter: props.voter,
    newStatus: newStatus.value,
    reason: reason.value.trim(),
  });
  emit('close');
};

const handleFlag = () => {
  if (!flagType.value || !flagReason.value.trim()) return;
  
  emit('flag', {
    voter: props.voter,
    flag: flagType.value,
    reason: flagReason.value.trim(),
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
