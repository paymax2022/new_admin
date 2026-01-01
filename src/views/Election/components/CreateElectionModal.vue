<template>
  <transition name="fade">
    <div class="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
      <div class="absolute inset-0 bg-[#0f172a]/40 backdrop-blur-sm" @click="$emit('close')" />
      <div class="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-[0_40px_80px_rgba(15,23,42,0.18)]">
        <header class="flex items-center justify-between border-b border-[#e2e8f0] px-8 py-6">
          <div class="flex items-center gap-3">
            <div class="flex h-10 w-10 items-center justify-center rounded-full bg-[#e0f2fe] text-[#0ea5e9]">
              <IconUserCircle class="h-5 w-5" />
            </div>
            <h2 class="text-xl font-semibold text-[#111827]">Create New Election</h2>
          </div>
          <button
            type="button"
            class="flex h-9 w-9 items-center justify-center rounded-full bg-[#f1f5f9] text-[#475569] transition hover:opacity-80"
            @click="$emit('close')"
          >
            <IconX class="h-5 w-5" />
          </button>
        </header>

        <!-- Progress Indicator -->
        <div class="border-b border-[#e2e8f0] px-8 py-6">
          <div class="flex items-center">
            <div class="flex items-center gap-2">
              <div
                class="flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold"
                :class="currentStep === 1 ? 'bg-[#111827] text-white' : 'bg-[#e2e8f0] text-[#94a3b8]'"
              >
                1
              </div>
              <span
                class="text-sm font-semibold"
                :class="currentStep === 1 ? 'text-[#111827]' : 'text-[#94a3b8]'"
              >
                Basic Details
              </span>
            </div>
            <div class="h-px flex-1 bg-[#e2e8f0] mx-4" />
            <div class="flex items-center gap-2">
              <div
                class="flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold"
                :class="currentStep === 2 ? 'bg-[#111827] text-white' : 'bg-[#e2e8f0] text-[#94a3b8]'"
              >
                2
              </div>
              <span
                class="text-sm font-semibold"
                :class="currentStep === 2 ? 'text-[#111827]' : 'text-[#94a3b8]'"
              >
                Positions
              </span>
            </div>
            <div class="h-px flex-1 bg-[#e2e8f0] mx-4" />
            <div class="flex items-center gap-2">
              <div
                class="flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold"
                :class="currentStep === 3 ? 'bg-[#111827] text-white' : 'bg-[#e2e8f0] text-[#94a3b8]'"
              >
                3
              </div>
              <span
                class="text-sm font-semibold"
                :class="currentStep === 3 ? 'text-[#111827]' : 'text-[#94a3b8]'"
              >
                Settings
              </span>
            </div>
          </div>
        </div>

        <!-- Form Content -->
        <div class="px-8 py-6 space-y-6">
          <!-- Step 1: Basic Details -->
          <div v-if="currentStep === 1" class="space-y-6">
            <!-- Election Title -->
            <div>
              <label class="block text-sm font-semibold text-[#111827] mb-2">
                Election Title <span class="text-[#dc2626]">*</span>
              </label>
              <input
                v-model="formData.title"
                type="text"
                placeholder="e.g. Student Union President 2024"
                class="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm text-[#1f2937] placeholder:text-[#94a3b8] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
              />
            </div>

            <!-- Description -->
            <div>
              <label class="block text-sm font-semibold text-[#111827] mb-2">Description</label>
              <textarea
                v-model="formData.description"
                rows="4"
                placeholder="Describe the purpose and scope of this election..."
                class="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm text-[#1f2937] placeholder:text-[#94a3b8] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5] resize-none"
              />
            </div>

            <!-- Election Type -->
            <div>
              <label class="block text-sm font-semibold text-[#111827] mb-2">Election Type</label>
              <div class="relative">
                <select
                  v-model="formData.electionType"
                  class="w-full appearance-none rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 pr-10 text-sm text-[#1f2937] placeholder:text-[#94a3b8] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
                >
                  <option value="" disabled>Select election type</option>
                  <option value="presidential">Presidential</option>
                  <option value="representative">Representative</option>
                  <option value="council">Council</option>
                  <option value="other">Other</option>
                </select>
                <svg
                  class="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#94a3b8] pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <!-- Date Fields -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Start Date & Time -->
              <div>
                <label class="block text-sm font-semibold text-[#111827] mb-2">
                  Start Date & Time <span class="text-[#dc2626]">*</span>
                </label>
                <div class="relative">
                  <input
                    v-model="formData.startDate"
                    type="text"
                    placeholder="mm/dd/yyyy"
                    class="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 pr-10 text-sm text-[#1f2937] placeholder:text-[#94a3b8] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
                  />
                  <IconCalendar class="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#94a3b8] pointer-events-none" />
                </div>
              </div>

              <!-- End Date & Time -->
              <div>
                <label class="block text-sm font-semibold text-[#111827] mb-2">
                  End Date & Time <span class="text-[#dc2626]">*</span>
                </label>
                <div class="relative">
                  <input
                    v-model="formData.endDate"
                    type="text"
                    placeholder="mm/dd/yyyy"
                    class="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 pr-10 text-sm text-[#1f2937] placeholder:text-[#94a3b8] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
                  />
                  <IconCalendar class="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#94a3b8] pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          <!-- Step 2: Positions -->
          <div v-if="currentStep === 2" class="space-y-6">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold text-[#111827]">Election Positions</h3>
              <button
                type="button"
                class="inline-flex items-center gap-2 rounded-full bg-[#111827] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1f2937]"
                @click="addPosition"
              >
                <IconPlus class="h-4 w-4" />
                Add Position
              </button>
            </div>

            <div
              v-for="(position, index) in positions"
              :key="index"
              class="rounded-2xl border border-[#e2e8f0] bg-white p-6 space-y-4"
            >
              <h4 class="text-base font-semibold text-[#111827]">Position {{ index + 1 }}</h4>

              <!-- Position Title -->
              <div>
                <label class="block text-sm font-semibold text-[#111827] mb-2">
                  Position Title <span class="text-[#dc2626]">*</span>
                </label>
                <input
                  v-model="position.title"
                  type="text"
                  placeholder="e.g., President, Secretary, Treasurer"
                  class="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm text-[#1f2937] placeholder:text-[#94a3b8] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
                />
              </div>

              <!-- Position Description -->
              <div>
                <label class="block text-sm font-semibold text-[#111827] mb-2">Position Description</label>
                <textarea
                  v-model="position.description"
                  rows="3"
                  placeholder="Describe the responsibilities and requirements..."
                  class="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm text-[#1f2937] placeholder:text-[#94a3b8] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5] resize-none"
                />
              </div>

              <!-- Maximum Candidates -->
              <div>
                <label class="block text-sm font-semibold text-[#111827] mb-2">Maximum Candidates</label>
                <input
                  v-model="position.maxCandidates"
                  type="number"
                  placeholder="Enter Maximum Candidates"
                  class="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm text-[#1f2937] placeholder:text-[#94a3b8] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
                />
              </div>
            </div>
          </div>

          <!-- Step 3: Settings -->
          <div v-if="currentStep === 3" class="space-y-6">
            <!-- Election Settings -->
            <div>
              <h3 class="text-lg font-semibold text-[#111827] mb-4">Election Settings</h3>
              <div class="space-y-4">
                <!-- Make this election public -->
                <label class="flex items-center gap-3 cursor-pointer">
                  <input
                    v-model="settings.isPublic"
                    type="checkbox"
                    class="h-5 w-5 rounded border-[#e2e8f0] text-[#111827] focus:ring-2 focus:ring-[#cbd5f5]"
                  />
                  <span class="text-sm font-semibold text-[#111827]">Make this election public</span>
                </label>

                <!-- Allow voters to change their vote -->
                <label class="flex items-center gap-3 cursor-pointer">
                  <input
                    v-model="settings.allowVoteChange"
                    type="checkbox"
                    class="h-5 w-5 rounded border-[#e2e8f0] text-[#111827] focus:ring-2 focus:ring-[#cbd5f5]"
                  />
                  <span class="text-sm font-semibold text-[#111827]">Allow voters to change their vote</span>
                </label>

                <!-- Require voter identity verification -->
                <label class="flex items-center gap-3 cursor-pointer">
                  <input
                    v-model="settings.requireVerification"
                    type="checkbox"
                    class="h-5 w-5 rounded border-[#e2e8f0] text-[#111827] focus:ring-2 focus:ring-[#cbd5f5]"
                  />
                  <span class="text-sm font-semibold text-[#111827]">Require voter identity verification</span>
                </label>
              </div>
            </div>

            <!-- Election Summary -->
            <div>
              <h3 class="text-lg font-semibold text-[#111827] mb-4">Election Summary</h3>
              <div class="rounded-2xl border border-[#e2e8f0] bg-white p-6 space-y-4">
                <div class="flex items-center justify-between">
                  <span class="text-sm font-semibold text-[#94a3b8]">Title</span>
                  <span class="text-sm font-semibold text-[#111827]">{{ formData.title || 'N/A' }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm font-semibold text-[#94a3b8]">Type</span>
                  <span class="text-sm font-semibold text-[#111827]">{{ formData.electionType || 'N/A' }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm font-semibold text-[#94a3b8]">Positions</span>
                  <span class="text-sm font-semibold text-[#111827]">{{ positions.length }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm font-semibold text-[#94a3b8]">Duration</span>
                  <span class="text-sm font-semibold text-[#111827]">
                    {{ formatDate(formData.startDate) || 'N/A' }} - {{ formatDate(formData.endDate) || 'N/A' }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <footer class="flex items-center justify-end gap-3 border-t border-[#e2e8f0] px-8 py-6">
          <button
            type="button"
            class="rounded-xl border border-[#e2e8f0] bg-white px-6 py-2.5 text-sm font-semibold text-[#475569] transition hover:border-[#cbd5f5] hover:text-[#1e293b]"
            @click="$emit('close')"
          >
            Cancel
          </button>
          <button
            v-if="currentStep > 1"
            type="button"
            class="rounded-xl border border-[#e2e8f0] bg-white px-6 py-2.5 text-sm font-semibold text-[#475569] transition hover:border-[#cbd5f5] hover:text-[#1e293b]"
            @click="handleBack"
          >
            Back
          </button>
          <button
            type="button"
            class="rounded-xl bg-[#111827] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1f2937]"
            @click="handleNext"
          >
            {{ currentStep === 3 ? 'Create Election' : 'Next' }}
          </button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import IconX from '@/components/icon/icon-x.vue';
import IconCalendar from '@/components/icon/icon-calendar.vue';
import IconPlus from '@/components/icon/icon-plus.vue';
import IconUserCircle from '@/components/icon/icon-user-circle.vue';

const emit = defineEmits(['close', 'next']);

const currentStep = ref(1);

const formData = ref({
  title: '',
  description: '',
  electionType: '',
  startDate: '',
  endDate: '',
});

const positions = ref([
  {
    title: '',
    description: '',
    maxCandidates: '',
  },
]);

const settings = ref({
  isPublic: true,
  allowVoteChange: true,
  requireVerification: false,
});

const addPosition = () => {
  positions.value.push({
    title: '',
    description: '',
    maxCandidates: '',
  });
};

const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' });
};

const handleNext = () => {
  if (currentStep.value < 3) {
    currentStep.value++;
  } else {
    emit('next', {
      ...formData.value,
      positions: positions.value,
      settings: settings.value,
    });
  }
};

const handleBack = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
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

