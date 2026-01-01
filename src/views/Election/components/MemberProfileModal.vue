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
            <h3 class="text-2xl font-semibold text-[#111827] mb-2">{{ member?.name || 'N/A' }}</h3>
            <p class="text-sm text-[#6b7280]">ID: {{ member?.memberId || 'N/A' }}</p>
          </div>

          <!-- Contact and Academic Information -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Contact Information (Left Column) -->
            <div class="space-y-4">
              <h4 class="text-sm font-semibold uppercase tracking-wide text-[#94a3b8]">Contact Information</h4>
              <div class="space-y-3">
                <div class="flex items-center gap-3">
                  <IconMail class="h-5 w-5 text-[#94a3b8]" />
                  <span class="text-sm text-[#475569]">{{ member?.email || 'N/A' }}</span>
                </div>
                <div class="flex items-center gap-3">
                  <IconPhone class="h-5 w-5 text-[#94a3b8]" />
                  <span class="text-sm text-[#475569]">{{ member?.phone || '+1 234-567-8900' }}</span>
                </div>
                <div class="flex items-center gap-3">
                  <IconCalendar class="h-5 w-5 text-[#94a3b8]" />
                  <span class="text-sm text-[#475569]">Joined: {{ member?.joinedDate || '8/31/2023' }}</span>
                </div>
              </div>
            </div>

            <!-- Academic Information (Right Column) -->
            <div class="space-y-4">
              <h4 class="text-sm font-semibold uppercase tracking-wide text-[#94a3b8]">Academic Information</h4>
              <div class="space-y-3">
                <div class="flex items-center gap-3">
                  <IconAward class="h-5 w-5 text-[#94a3b8]" />
                  <span class="text-sm text-[#475569]">{{ member?.major || 'Computer Science' }}</span>
                </div>
                <div class="flex items-center gap-3">
                  <span class="text-sm text-[#475569]">Year: {{ member?.year || 'Junior' }}</span>
                </div>
                <div class="flex items-center gap-3">
                  <span class="text-sm text-[#475569]">GPA: {{ member?.gpa || '3.75' }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Status Cards -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- Fee Status -->
            <div class="rounded-2xl border border-[#e2e8f0] bg-white p-4">
              <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8] mb-2">Fee Status</p>
              <span
                class="inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold text-white"
                :class="getFeeStatusClass(member?.feeStatus || 'Paid')"
              >
                {{ member?.feeStatus || 'Paid' }}
              </span>
            </div>

            <!-- Conduct Record -->
            <div class="rounded-2xl border border-[#e2e8f0] bg-white p-4">
              <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8] mb-2">Conduct Record</p>
              <span class="inline-flex items-center rounded-full bg-[#16a34a] px-3 py-1.5 text-xs font-semibold text-white">
                Good
              </span>
            </div>

            <!-- Eligibility -->
            <div class="rounded-2xl border border-[#e2e8f0] bg-white p-4">
              <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8] mb-2">Eligibility</p>
              <span
                class="inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold text-white"
                :class="getEligibilityClass(member?.eligibility || 'Eligible')"
              >
                {{ member?.eligibility || 'Eligible' }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import IconX from '@/components/icon/icon-x.vue';
import IconMail from '@/components/icon/icon-mail.vue';
import IconPhone from '@/components/icon/icon-phone.vue';
import IconCalendar from '@/components/icon/icon-calendar.vue';
import IconAward from '@/components/icon/icon-award.vue';

interface Member {
  id?: string;
  memberId?: string;
  name?: string;
  email?: string;
  phone?: string;
  joinedDate?: string;
  major?: string;
  year?: string;
  gpa?: number;
  feeStatus?: 'Paid' | 'Pending' | 'Overdue';
  eligibility?: 'Eligible' | 'Restricted' | 'Suspended';
}

const props = defineProps<{
  member?: Member | null;
}>();

const emit = defineEmits(['close']);

const getFeeStatusClass = (status: string) => {
  switch (status) {
    case 'Paid':
      return 'bg-[#16a34a]';
    case 'Pending':
      return 'bg-[#f59e0b]';
    case 'Overdue':
      return 'bg-[#dc2626]';
    default:
      return 'bg-[#16a34a]';
  }
};

const getEligibilityClass = (status: string) => {
  switch (status) {
    case 'Eligible':
      return 'bg-[#16a34a]';
    case 'Restricted':
      return 'bg-[#f59e0b]';
    case 'Suspended':
      return 'bg-[#dc2626]';
    default:
      return 'bg-[#16a34a]';
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

