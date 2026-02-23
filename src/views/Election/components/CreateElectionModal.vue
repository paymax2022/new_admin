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

            <!-- Institution Type -->
            <div>
              <label class="block text-sm font-semibold text-[#111827] mb-2">
                Institution Type <span class="text-[#dc2626]">*</span>
              </label>
              <div class="relative">
                <select
                  v-model="formData.type"
                  class="w-full appearance-none rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 pr-10 text-sm text-[#1f2937] placeholder:text-[#94a3b8] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
                  @change="onInstitutionTypeChange"
                >
                  <option value="" disabled>Select institution type</option>
                  <option value="school">School</option>
                  <option value="estate">Estate</option>
                  <option value="group">Group</option>
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

            <!-- Institution Selection -->
            <div v-if="formData.type">
              <label class="block text-sm font-semibold text-[#111827] mb-2">
                Institution <span class="text-[#dc2626]">*</span>
              </label>
              <div class="relative">
                <select
                  v-model="formData.institution_id"
                  :disabled="loadingInstitutions || !formData.type"
                  class="w-full appearance-none rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 pr-10 text-sm text-[#1f2937] placeholder:text-[#94a3b8] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5] disabled:bg-gray-50 disabled:cursor-not-allowed"
                  @change="onInstitutionChange"
                >
                  <option value="" disabled>
                    {{ loadingInstitutions ? 'Loading...' : `Select ${formData.type}` }}
                  </option>
                  <option
                    v-for="institution in institutions"
                    :key="institution.id || institution._id"
                    :value="institution.id || institution._id"
                  >
                    {{ institution.name || institution.title || institution.institution_name || 'Unnamed Institution' }}
                  </option>
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
              <p v-if="formData.institution_name" class="mt-1 text-xs text-[#6b7280]">
                Selected: {{ formData.institution_name }}
              </p>
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
                    type="datetime-local"
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
                    type="datetime-local"
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

            <!-- Eligibility Rules -->
            <div>
              <h3 class="text-lg font-semibold text-[#111827] mb-4">Eligibility Rules</h3>
              <div class="space-y-4">
                <!-- Minimum GPA for Voters -->
                <div>
                  <label class="block text-sm font-semibold text-[#111827] mb-2">
                    Minimum GPA for Voters
                  </label>
                  <input
                    v-model.number="eligibilityRules.minGpa"
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    placeholder="e.g., 2.5"
                    class="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm text-[#1f2937] placeholder:text-[#94a3b8] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
                  />
                </div>

                <!-- Minimum GPA for Candidates -->
                <div>
                  <label class="block text-sm font-semibold text-[#111827] mb-2">
                    Minimum GPA for Candidates
                  </label>
                  <input
                    v-model.number="eligibilityRules.minGpaForCandidate"
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    placeholder="e.g., 3.0"
                    class="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm text-[#1f2937] placeholder:text-[#94a3b8] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
                  />
                </div>

                <!-- Maximum Admins -->
                <div>
                  <label class="block text-sm font-semibold text-[#111827] mb-2">
                    Maximum Admins
                  </label>
                  <input
                    v-model.number="eligibilityRules.maxAdmins"
                    type="number"
                    min="0"
                    placeholder="e.g., 0"
                    class="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm text-[#1f2937] placeholder:text-[#94a3b8] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
                  />
                </div>

                <!-- Checkboxes -->
                <div class="space-y-3">
                  <label class="flex items-center gap-3 cursor-pointer">
                    <input
                      v-model="eligibilityRules.requireFeesClearance"
                      type="checkbox"
                      class="h-5 w-5 rounded border-[#e2e8f0] text-[#111827] focus:ring-2 focus:ring-[#cbd5f5]"
                    />
                    <span class="text-sm font-semibold text-[#111827]">Require fees clearance</span>
                  </label>

                  <label class="flex items-center gap-3 cursor-pointer">
                    <input
                      v-model="eligibilityRules.requireActiveStatus"
                      type="checkbox"
                      class="h-5 w-5 rounded border-[#e2e8f0] text-[#111827] focus:ring-2 focus:ring-[#cbd5f5]"
                    />
                    <span class="text-sm font-semibold text-[#111827]">Require active status</span>
                  </label>

                  <label class="flex items-center gap-3 cursor-pointer">
                    <input
                      v-model="eligibilityRules.adminRequiresApproval"
                      type="checkbox"
                      class="h-5 w-5 rounded border-[#e2e8f0] text-[#111827] focus:ring-2 focus:ring-[#cbd5f5]"
                    />
                    <span class="text-sm font-semibold text-[#111827]">Admin requires approval</span>
                  </label>

                  <label class="flex items-center gap-3 cursor-pointer">
                    <input
                      v-model="eligibilityRules.candidateRequiresApproval"
                      type="checkbox"
                      class="h-5 w-5 rounded border-[#e2e8f0] text-[#111827] focus:ring-2 focus:ring-[#cbd5f5]"
                    />
                    <span class="text-sm font-semibold text-[#111827]">Candidate requires approval</span>
                  </label>
                </div>
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
                  <span class="text-sm font-semibold text-[#111827]">{{ formData.type ? formData.type.charAt(0).toUpperCase() + formData.type.slice(1) : 'N/A' }}</span>
                </div>
                <div v-if="formData.institution_name" class="flex items-center justify-between">
                  <span class="text-sm font-semibold text-[#94a3b8]">Institution</span>
                  <span class="text-sm font-semibold text-[#111827]">{{ formData.institution_name }}</span>
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
import { ref, watch } from 'vue';
import { useToast } from 'vue-toastification';
import IconX from '@/components/icon/icon-x.vue';
import IconCalendar from '@/components/icon/icon-calendar.vue';
import IconPlus from '@/components/icon/icon-plus.vue';
import IconUserCircle from '@/components/icon/icon-user-circle.vue';
import electionService from '@/services/electionService';

const props = withDefaults(
  defineProps<{
    initialTemplate?: {
      id: number;
      title: string;
      description: string;
      positions: string[];
      duration: string;
      type: string;
    } | null;
  }>(),
  { initialTemplate: null }
);

const toast = useToast();
const emit = defineEmits(['close', 'next']);

const currentStep = ref(1);
const loadingInstitutions = ref(false);
const institutions = ref<any[]>([]);

const formData = ref({
  title: '',
  description: '',
  type: '' as 'school' | 'estate' | 'group' | '',
  institution_id: '',
  institution_name: '',
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
  allowVoteChange: false,
  requireVerification: true,
});

const eligibilityRules = ref({
  minGpa: 2.5,
  minGpaForCandidate: 3.0,
  maxAdmins: 0,
  requireFeesClearance: true,
  requireActiveStatus: true,
  adminRequiresApproval: true,
  candidateRequiresApproval: true,
});

// Pre-fill form from Quick Start Template (e.g. "3 days" → start/end dates)
function getDefaultDatesFromDuration(durationStr: string): { startDate: string; endDate: string } {
  const pad = (n: number) => n.toString().padStart(2, '0');
  const start = new Date();
  start.setHours(8, 0, 0, 0);
  const days = parseInt(String(durationStr).replace(/\D/g, '') || '3', 10) || 3;
  const end = new Date(start);
  end.setDate(end.getDate() + days);
  end.setHours(17, 0, 0, 0);
  return {
    startDate: `${start.getFullYear()}-${pad(start.getMonth() + 1)}-${pad(start.getDate())}T${pad(start.getHours())}:${pad(start.getMinutes())}`,
    endDate: `${end.getFullYear()}-${pad(end.getMonth() + 1)}-${pad(end.getDate())}T${pad(end.getHours())}:${pad(end.getMinutes())}`,
  };
}

function applyTemplate(template: NonNullable<typeof props.initialTemplate>) {
  formData.value.title = template.title || formData.value.title;
  formData.value.description = template.description || formData.value.description;
  const { startDate, endDate } = getDefaultDatesFromDuration(template.duration || '3 days');
  formData.value.startDate = startDate;
  formData.value.endDate = endDate;
  positions.value = (template.positions && template.positions.length > 0)
    ? template.positions.map((name) => ({
        title: name,
        description: '',
        maxCandidates: name.toLowerCase().includes('representative') ? '1' : '5',
      }))
    : [{ title: '', description: '', maxCandidates: '' }];
  currentStep.value = 1;
}

watch(
  () => props.initialTemplate,
  (template) => {
    if (template) applyTemplate(template);
  },
  { immediate: true }
);

// Load institutions based on type
const onInstitutionTypeChange = async () => {
  formData.value.institution_id = '';
  formData.value.institution_name = '';
  institutions.value = [];
  
  if (!formData.value.type) return;
  
  loadingInstitutions.value = true;
  try {
    let response;
    if (formData.value.type === 'school') {
      response = await electionService.getSchools();
    } else if (formData.value.type === 'estate') {
      response = await electionService.getEstates();
    } else if (formData.value.type === 'group') {
      response = await electionService.getGroups();
    }
    
    // Handle various response structures
    let data = response?.data;
    if (!data) {
      data = response; // Sometimes data is at root level
    }
    
    // Check if data is nested
    if (data?.data && Array.isArray(data.data)) {
      data = data.data;
    } else if (Array.isArray(data)) {
      // Already an array
    } else {
      data = [];
    }
    
    institutions.value = data || [];
    
    if (institutions.value.length === 0) {
      toast.info(`No ${formData.value.type}s available`);
    }
  } catch (error: any) {
    console.error('Error loading institutions:', error);
    const errorMessage = error?.response?.data?.message || error?.message || 'Failed to load institutions';
    toast.error(errorMessage);
  } finally {
    loadingInstitutions.value = false;
  }
};

// Update institution name when institution is selected
const onInstitutionChange = () => {
  const selected = institutions.value.find(
    (inst) => (inst.id || inst._id) === formData.value.institution_id
  );
  if (selected) {
    // Try multiple possible field names for institution name
    formData.value.institution_name = 
      selected.name || 
      selected.title || 
      selected.institution_name || 
      selected.school_name ||
      selected.estate_name ||
      selected.group_name ||
      selected.full_name ||
      '';
    
    if (!formData.value.institution_name) {
      console.warn('Institution name not found in response:', selected);
    }
  } else {
    formData.value.institution_name = '';
  }
};

const addPosition = () => {
  positions.value.push({
    title: '',
    description: '',
    maxCandidates: '',
  });
};

const formatDate = (dateString: string) => {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' });
  } catch {
    return dateString;
  }
};

// Convert datetime-local string to ISO format
const convertToISO = (dateString: string): string => {
  if (!dateString) return '';
  
  // datetime-local format is "YYYY-MM-DDTHH:mm" (no timezone)
  // We need to convert it to ISO format with UTC timezone
  // The browser's datetime-local input returns local time, so we need to convert
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    // Fallback: try to parse as-is
    return dateString;
  }
  
  // Return ISO string in UTC format
  return date.toISOString();
};

const handleNext = () => {
  // Validate required fields on step 1
  if (currentStep.value === 1) {
    if (!formData.value.title) {
      toast.error('Please enter an election title');
      return;
    }
    if (!formData.value.type) {
      toast.error('Please select an institution type');
      return;
    }
    if (!formData.value.institution_id) {
      toast.error('Please select an institution');
      return;
    }
    if (!formData.value.startDate || !formData.value.endDate) {
      toast.error('Please enter start and end dates');
      return;
    }
  }
  
  // Validate positions on step 2
  if (currentStep.value === 2) {
    if (positions.value.length === 0) {
      toast.error('Please add at least one position');
      return;
    }
    const invalidPositions = positions.value.some((p) => !p.title);
    if (invalidPositions) {
      toast.error('Please enter a title for all positions');
      return;
    }
  }
  
  if (currentStep.value < 3) {
    currentStep.value++;
  } else {
    // Transform form data to match API format exactly
    const apiData = {
      title: formData.value.title,
      description: formData.value.description || '',
      type: formData.value.type as 'school' | 'estate' | 'group',
      institution_id: formData.value.institution_id,
      institution_name: formData.value.institution_name,
      start_date: convertToISO(formData.value.startDate),
      end_date: convertToISO(formData.value.endDate),
      settings: {
        is_public: settings.value.isPublic,
        allow_vote_changes: settings.value.allowVoteChange,
        require_identification: settings.value.requireVerification,
        enable_complaints: true,
        show_results: true,
      },
      positions: positions.value
        .filter((pos) => pos.title) // Remove empty positions
        .map((pos, index) => ({
          name: pos.title,
          description: pos.description || '',
          max_candidates: pos.maxCandidates ? parseInt(pos.maxCandidates.toString()) : undefined,
          order: index + 1,
        })),
      eligibility_rules: {
        min_gpa: eligibilityRules.value.minGpa !== undefined && eligibilityRules.value.minGpa !== null
          ? parseFloat(eligibilityRules.value.minGpa.toString())
          : undefined,
        min_gpa_for_candidate: eligibilityRules.value.minGpaForCandidate !== undefined && eligibilityRules.value.minGpaForCandidate !== null
          ? parseFloat(eligibilityRules.value.minGpaForCandidate.toString())
          : undefined,
        max_admins: eligibilityRules.value.maxAdmins !== undefined && eligibilityRules.value.maxAdmins !== null
          ? parseInt(eligibilityRules.value.maxAdmins.toString())
          : 0,
        require_fees_clearance: eligibilityRules.value.requireFeesClearance !== undefined
          ? eligibilityRules.value.requireFeesClearance
          : true,
        require_active_status: eligibilityRules.value.requireActiveStatus !== undefined
          ? eligibilityRules.value.requireActiveStatus
          : true,
        admin_requires_approval: eligibilityRules.value.adminRequiresApproval !== undefined
          ? eligibilityRules.value.adminRequiresApproval
          : true,
        candidate_requires_approval: eligibilityRules.value.candidateRequiresApproval !== undefined
          ? eligibilityRules.value.candidateRequiresApproval
          : true,
      },
    };
    
    // Clean up eligibility_rules - remove undefined values
    Object.keys(apiData.eligibility_rules).forEach((key) => {
      if (apiData.eligibility_rules[key] === undefined) {
        delete apiData.eligibility_rules[key];
      }
    });
    
    emit('next', apiData);
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

