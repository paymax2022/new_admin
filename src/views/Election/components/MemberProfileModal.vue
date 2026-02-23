<template>
  <transition name="fade">
    <div class="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
      <div class="absolute inset-0 bg-[#0f172a]/40 backdrop-blur-sm" @click="$emit('close')" />
      <div class="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-[0_40px_80px_rgba(15,23,42,0.18)]">
        <header class="flex items-center justify-between border-b border-[#e2e8f0] px-8 py-6">
          <h2 class="text-xl font-semibold text-[#111827]">Member Profile</h2>
          <button
            type="button"
            class="flex h-9 w-9 items-center justify-center rounded-full bg-[#f1f5f9] text-[#475569] transition hover:opacity-80"
            @click="$emit('close')"
          >
            <IconX class="h-5 w-5" />
          </button>
        </header>

        <div class="px-8 py-6 space-y-6">
          <!-- Member Name and ID -->
          <div>
            <h3 class="text-2xl font-semibold text-[#111827] mb-2">
              {{ member?.name || member?.full_name || member?.participant_name || 'N/A' }}
            </h3>
            <p class="text-sm text-[#6b7280]">
              ID: {{ member?.identifier || member?.student_id || member?.member_id || member?.id || 'N/A' }}
            </p>
          </div>

          <!-- Contact and Information -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Contact Information (Left Column) -->
            <div class="space-y-4">
              <h4 class="text-sm font-semibold uppercase tracking-wide text-[#94a3b8]">Contact Information</h4>
              <div class="space-y-3">
                <div class="flex items-center gap-3">
                  <IconMail class="h-5 w-5 text-[#94a3b8]" />
                  <span class="text-sm text-[#475569]">{{ member?.email || 'N/A' }}</span>
                </div>
                <div v-if="member?.phone" class="flex items-center gap-3">
                  <IconPhone class="h-5 w-5 text-[#94a3b8]" />
                  <span class="text-sm text-[#475569]">{{ member.phone }}</span>
                </div>
                <div v-if="member?.created_at || member?.joined_date" class="flex items-center gap-3">
                  <IconCalendar class="h-5 w-5 text-[#94a3b8]" />
                  <span class="text-sm text-[#475569]">
                    Joined: {{ formatDate(member.created_at || member.joined_date) }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Additional Information (Right Column) -->
            <div class="space-y-4">
              <h4 class="text-sm font-semibold uppercase tracking-wide text-[#94a3b8]">Additional Information</h4>
              <div class="space-y-3">
                <div v-if="member?.department" class="flex items-center gap-3">
                  <IconAward class="h-5 w-5 text-[#94a3b8]" />
                  <span class="text-sm text-[#475569]">Department: {{ member.department }}</span>
                </div>
                <div v-if="member?.level" class="flex items-center gap-3">
                  <span class="text-sm text-[#475569]">Level: {{ member.level }}</span>
                </div>
                <div v-if="member?.block" class="flex items-center gap-3">
                  <span class="text-sm text-[#475569]">Block: {{ member.block }}</span>
                </div>
                <div v-if="member?.house_type" class="flex items-center gap-3">
                  <span class="text-sm text-[#475569]">House Type: {{ member.house_type }}</span>
                </div>
                <div v-if="member?.zone" class="flex items-center gap-3">
                  <span class="text-sm text-[#475569]">Zone: {{ member.zone }}</span>
                </div>
                <div v-if="member?.membership_type" class="flex items-center gap-3">
                  <span class="text-sm text-[#475569]">Membership: {{ member.membership_type }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Status Cards -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- Fee/Dues Status -->
            <div class="rounded-2xl border border-[#e2e8f0] bg-white p-4">
              <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8] mb-2">Fee/Dues Status</p>
              <span
                class="inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold text-white"
                :class="getStatusClass(member?.fee_status || member?.dues_status)"
              >
                {{ formatStatus(member?.fee_status || member?.dues_status) }}
              </span>
            </div>

            <!-- Eligibility -->
            <div class="rounded-2xl border border-[#e2e8f0] bg-white p-4">
              <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8] mb-2">Eligibility</p>
              <span
                class="inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold text-white"
                :class="getEligibilityClass(member?.eligibility_status || member?.is_eligible)"
              >
                {{ formatEligibility(member?.eligibility_status || member?.is_eligible) }}
              </span>
            </div>

            <!-- Additional Status -->
            <div v-if="member?.status" class="rounded-2xl border border-[#e2e8f0] bg-white p-4">
              <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8] mb-2">Status</p>
              <span class="inline-flex items-center rounded-full bg-[#2563eb] px-3 py-1.5 text-xs font-semibold text-white">
                {{ member.status }}
              </span>
            </div>
          </div>

          <!-- Update Eligibility Section -->
          <div v-if="electionId && (member?.participant_id || member?.id)" class="rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] p-6">
            <h4 class="text-sm font-semibold text-[#111827] mb-4">Update Eligibility</h4>
            <form @submit.prevent="handleUpdateEligibility" class="space-y-4">
              <div>
                <label class="block text-sm font-semibold text-[#111827] mb-2">Eligibility Status</label>
                <select
                  v-model="eligibilityForm.is_eligible"
                  class="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm text-[#1f2937] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
                >
                  <option :value="true">Eligible</option>
                  <option :value="false">Not Eligible</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-semibold text-[#111827] mb-2">Reason</label>
                <textarea
                  v-model="eligibilityForm.reason"
                  rows="3"
                  placeholder="Enter reason for eligibility change..."
                  required
                  class="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm text-[#1f2937] placeholder:text-[#94a3b8] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
                />
              </div>
              <div class="flex gap-3">
                <button
                  type="submit"
                  :disabled="updatingEligibility"
                  class="flex-1 rounded-xl bg-[#111827] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1f2937] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {{ updatingEligibility ? 'Updating...' : 'Update Eligibility' }}
                </button>
                <button
                  type="button"
                  @click="eligibilityForm = { is_eligible: true, reason: '' }"
                  class="rounded-xl border border-[#e2e8f0] bg-white px-6 py-3 text-sm font-semibold text-[#475569] transition hover:bg-[#f8fafc]"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useToast } from 'vue-toastification';
import IconX from '@/components/icon/icon-x.vue';
import IconMail from '@/components/icon/icon-mail.vue';
import IconPhone from '@/components/icon/icon-phone.vue';
import IconCalendar from '@/components/icon/icon-calendar.vue';
import IconAward from '@/components/icon/icon-award.vue';
import electionService from '@/services/electionService';

const toast = useToast();

const props = defineProps<{
  member?: any | null;
  electionId?: string | null;
}>();

const emit = defineEmits(['close', 'eligibility-updated']);

const updatingEligibility = ref(false);
const eligibilityForm = ref({
  is_eligible: true,
  reason: '',
});

// Watch member changes to update form
watch(() => props.member, (newMember) => {
  if (newMember) {
    eligibilityForm.value.is_eligible = newMember.is_eligible !== undefined 
      ? newMember.is_eligible 
      : (newMember.eligibility_status === 'eligible' || newMember.eligibility_status === 'Eligible');
    eligibilityForm.value.reason = '';
  }
}, { immediate: true });

// Format date
const formatDate = (dateString: string | undefined) => {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  } catch {
    return dateString;
  }
};

// Format status
const formatStatus = (status: string | boolean | undefined) => {
  if (typeof status === 'boolean') return status ? 'Paid' : 'Pending';
  if (!status) return 'N/A';
  return status.charAt(0).toUpperCase() + status.slice(1);
};

// Format eligibility
const formatEligibility = (eligibility: string | boolean | undefined) => {
  if (typeof eligibility === 'boolean') return eligibility ? 'Eligible' : 'Not Eligible';
  if (!eligibility) return 'N/A';
  return eligibility.charAt(0).toUpperCase() + eligibility.slice(1);
};

// Get status class
const getStatusClass = (status: string | boolean | undefined) => {
  const statusStr = typeof status === 'boolean' ? (status ? 'paid' : 'pending') : (status || '').toLowerCase();
  switch (statusStr) {
    case 'paid':
    case 'cleared':
      return 'bg-[#16a34a]';
    case 'pending':
      return 'bg-[#f59e0b]';
    case 'overdue':
      return 'bg-[#dc2626]';
    default:
      return 'bg-[#94a3b8]';
  }
};

// Get eligibility class
const getEligibilityClass = (eligibility: string | boolean | undefined) => {
  const eligStr = typeof eligibility === 'boolean' ? (eligibility ? 'eligible' : 'restricted') : (eligibility || '').toLowerCase();
  switch (eligStr) {
    case 'eligible':
      return 'bg-[#16a34a]';
    case 'restricted':
      return 'bg-[#f59e0b]';
    case 'suspended':
      return 'bg-[#dc2626]';
    default:
      return 'bg-[#94a3b8]';
  }
};

// Handle update eligibility
const handleUpdateEligibility = async () => {
  if (!props.electionId) {
    toast.error('Election ID is required');
    return;
  }

  const participantId = props.member?.participant_id || props.member?.id || props.member?._id;
  if (!participantId) {
    toast.error('Participant ID is required');
    return;
  }

  if (!eligibilityForm.value.reason.trim()) {
    toast.error('Please provide a reason for the eligibility change');
    return;
  }

  updatingEligibility.value = true;
  try {
    await electionService.updateParticipantEligibility(props.electionId, participantId, {
      is_eligible: eligibilityForm.value.is_eligible,
      reason: eligibilityForm.value.reason.trim(),
    });
    
    toast.success('Eligibility updated successfully');
    emit('eligibility-updated');
    emit('close');
  } catch (error: any) {
    console.error('Error updating eligibility:', error);
    toast.error(error?.response?.data?.message || 'Failed to update eligibility');
  } finally {
    updatingEligibility.value = false;
  }
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
