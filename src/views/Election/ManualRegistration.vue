<template>
  <div class="min-h-screen bg-[#f8fafc] p-6 space-y-6">
    <div class="flex flex-col gap-4">
      <div>
        <p class="text-sm font-semibold uppercase tracking-[0.2em] text-[#9ca3af]">Manual Registration</p>
        <h1 class="text-3xl font-semibold text-[#111827]">Manual Registration</h1>
        <p class="text-sm text-[#6b7280]">Manually register voters and candidates in the system</p>
      </div>
      <div>
        <label class="block text-xs font-semibold uppercase tracking-wide text-[#94a3b8] mb-2">Election</label>
        <select
          v-model="selectedElectionId"
          class="w-full max-w-md rounded-full border border-[#e2e8f0] bg-white px-4 py-2.5 text-sm text-[#111827] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
          :disabled="loadingElections"
        >
          <option value="">Select election</option>
          <option v-for="e in elections" :key="e.id" :value="e.id">{{ e.title }}</option>
        </select>
        <p v-if="!selectedElectionId && (activeTab === 'voter' || activeTab === 'candidate')" class="mt-1 text-xs text-[#94a3b8]">Select an election to register voters or candidates.</p>
      </div>
    </div>

    <section class="rounded-3xl bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.05)] space-y-6">
      <div class="flex flex-wrap items-center gap-4 border-b border-[#f1f5f9] pb-2 text-sm font-semibold">
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-full px-4 py-2 transition"
          :class="activeTab === 'voter' ? 'bg-[#111827] text-white' : 'bg-transparent text-[#94a3b8] hover:text-[#111827]'"
          @click="activeTab = 'voter'"
        >
          <IconUserPlus class="h-4 w-4" />
          Register Voter
        </button>
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-full px-4 py-2 transition"
          :class="activeTab === 'candidate' ? 'bg-[#111827] text-white' : 'bg-transparent text-[#94a3b8] hover:text-[#111827]'"
          @click="activeTab = 'candidate'"
        >
          <IconUsers class="h-4 w-4" />
          Register Candidates
        </button>
      </div>

      <div v-if="activeTab === 'voter'" class="space-y-6">
        <div>
          <h2 class="text-sm font-semibold uppercase tracking-wide text-[#94a3b8]">Voter Registration</h2>
        </div>
        <form class="space-y-6" @submit.prevent="handleRegister">
          <div class="grid gap-5 md:grid-cols-2">
            <FieldBlock label="Full Name">
              <input
                v-model="voterForm.fullName"
                type="text"
                placeholder="Enter full name"
                class="field-input"
                required
              />
            </FieldBlock>

            <FieldBlock label="Email">
              <input
                v-model="voterForm.email"
                type="email"
                placeholder="Enter email"
                class="field-input"
                required
              />
            </FieldBlock>

            <FieldBlock label="School Category">
              <select v-model="voterForm.category" class="field-select" required>
                <option value="" disabled>Select</option>
                <option v-for="option in schoolCategories" :key="option">{{ option }}</option>
              </select>
            </FieldBlock>

            <FieldBlock label="School Name">
              <select v-model="voterForm.schoolName" class="field-select" required>
                <option value="" disabled>Select</option>
                <option v-for="option in schoolNames" :key="option">{{ option }}</option>
              </select>
            </FieldBlock>

            <FieldBlock label="Matriculation Number">
              <input
                v-model="voterForm.matricNumber"
                type="text"
                placeholder="Enter your Matriculation Number"
                class="field-input"
                required
              />
            </FieldBlock>

            <FieldBlock label="Gender">
              <select v-model="voterForm.gender" class="field-select" required>
                <option value="" disabled>Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </FieldBlock>

            <FieldBlock label="Department">
              <select v-model="voterForm.department" class="field-select" required>
                <option value="" disabled>Select</option>
                <option v-for="dept in departments" :key="dept">{{ dept }}</option>
              </select>
            </FieldBlock>

            <FieldBlock label="Faculty">
              <select v-model="voterForm.faculty" class="field-select" required>
                <option value="" disabled>Select</option>
                <option v-for="fac in faculties" :key="fac">{{ fac }}</option>
              </select>
            </FieldBlock>

            <FieldBlock label="Program">
              <select v-model="voterForm.program" class="field-select" required>
                <option value="" disabled>Select</option>
                <option v-for="program in programs" :key="program">{{ program }}</option>
              </select>
            </FieldBlock>

            <FieldBlock label="Phone">
              <input
                v-model="voterForm.phone"
                type="tel"
                placeholder="Enter phone (optional)"
                class="field-input"
              />
            </FieldBlock>

            <FieldBlock label="Reason / Notes">
              <input
                v-model="voterForm.reason"
                type="text"
                placeholder="Optional notes"
                class="field-input"
              />
            </FieldBlock>
          </div>

          <div class="flex justify-end">
            <button
              type="submit"
              class="inline-flex items-center gap-2 rounded-full bg-[#111827] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0f172a] disabled:opacity-50 disabled:cursor-not-allowed"
              :disabled="submittingVoter || !selectedElectionId"
            >
              <IconPlus class="h-4 w-4" />
              {{ submittingVoter ? 'Registering…' : 'Register Voter' }}
            </button>
          </div>
        </form>
      </div>

      <div v-else class="space-y-6">
        <div class="flex items-center justify-between">
          <h2 class="text-sm font-semibold uppercase tracking-wide text-[#94a3b8]">Candidate Registration</h2>
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-full border border-[#e2e8f0] px-4 py-2 text-xs font-semibold text-[#111827]"
          >
            Upload Image
          </button>
        </div>
        <form class="space-y-6" @submit.prevent="handleCandidateRegister">
          <div class="grid gap-5 md:grid-cols-2">
            <FieldBlock label="Full Name">
              <input v-model="candidateForm.name" type="text" placeholder="Enter full name" class="field-input" required />
            </FieldBlock>
            <FieldBlock label="Registration/Matriculation Number">
              <input
                v-model="candidateForm.registrationNumber"
                type="text"
                placeholder="Enter Registration / Matriculation Number"
                class="field-input"
                required
              />
            </FieldBlock>
            <FieldBlock label="Email">
              <input v-model="candidateForm.email" type="email" placeholder="Enter email" class="field-input" required />
            </FieldBlock>
            <FieldBlock label="Phone">
              <input v-model="candidateForm.phone" type="tel" placeholder="Enter phone (optional)" class="field-input" />
            </FieldBlock>
            <FieldBlock label="Department">
              <select v-model="candidateForm.department" class="field-select" required>
                <option value="" disabled>Select</option>
                <option v-for="dept in departments" :key="dept">{{ dept }}</option>
              </select>
            </FieldBlock>
            <FieldBlock label="Faculty">
              <select v-model="candidateForm.faculty" class="field-select" required>
                <option value="" disabled>Select</option>
                <option v-for="fac in faculties" :key="fac">{{ fac }}</option>
              </select>
            </FieldBlock>
            <FieldBlock label="Position">
              <select v-model="candidateForm.position" class="field-select" required>
                <option value="" disabled>Select</option>
                <option v-for="position in positions" :key="position">{{ position }}</option>
              </select>
            </FieldBlock>
            <FieldBlock label="GPA">
              <input v-model="candidateForm.gpa" type="text" placeholder="Enter GPA" class="field-input" required />
            </FieldBlock>
          </div>

          <FieldBlock label="Bio">
            <textarea
              v-model="candidateForm.bio"
              rows="3"
              class="field-textarea"
              placeholder="Write a brief description about yourself"
            ></textarea>
          </FieldBlock>

          <div class="space-y-4">
            <div class="flex items-center gap-2">
              <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Manifesto Point</p>
              <button
                type="button"
                class="inline-flex items-center gap-1 text-xs font-semibold text-[#111827]"
                @click="addManifestoPoint"
              >
                <IconPlus class="h-3 w-3" />
                Add Point
              </button>
            </div>
            <div class="space-y-3">
              <div v-for="(point, index) in candidateForm.manifestoPoints" :key="'manifesto-' + index" class="relative">
                <input
                  v-model="candidateForm.manifestoPoints[index]"
                  type="text"
                  class="field-input pr-10"
                  placeholder="Administrative points"
                />
                <button
                  v-if="candidateForm.manifestoPoints.length > 1"
                  type="button"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#cbd5f5]"
                  @click="removeManifestoPoint(index)"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>

          <div class="space-y-4">
            <div class="flex items-center gap-2">
              <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Leadership Experience</p>
              <button
                type="button"
                class="inline-flex items-center gap-1 text-xs font-semibold text-[#111827]"
                @click="addLeadershipExperience"
              >
                <IconPlus class="h-3 w-3" />
                Add Experience
              </button>
            </div>
            <div class="space-y-3">
              <div v-for="(exp, index) in candidateForm.leadershipExperiences" :key="'exp-' + index" class="relative">
                <input
                  v-model="candidateForm.leadershipExperiences[index]"
                  type="text"
                  class="field-input pr-10"
                  placeholder="Achievements & Experience"
                />
                <button
                  v-if="candidateForm.leadershipExperiences.length > 1"
                  type="button"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#cbd5f5]"
                  @click="removeLeadershipExperience(index)"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>

          <div class="flex justify-end">
            <button
              type="submit"
              class="inline-flex items-center gap-2 rounded-full bg-[#111827] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0f172a] disabled:opacity-50 disabled:cursor-not-allowed"
              :disabled="submittingCandidate || !selectedElectionId"
            >
              <IconPlus class="h-4 w-4" />
              {{ submittingCandidate ? 'Registering…' : 'Register Candidate' }}
            </button>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, defineComponent, h, onMounted } from 'vue';
import { useToast } from 'vue-toastification';
import IconUserPlus from '@/components/icon/icon-user-plus.vue';
import IconUsers from '@/components/icon/icon-users.vue';
import IconPlus from '@/components/icon/icon-plus.vue';
import electionService from '@/services/electionService';

defineOptions({ name: 'ManualRegistration' });
const toast = useToast();

const activeTab = ref<'voter' | 'candidate'>('voter');
const elections = ref<Array<{ id: string; title: string }>>([]);
const loadingElections = ref(false);
const selectedElectionId = ref('');
const submittingVoter = ref(false);
const submittingCandidate = ref(false);

const isValidObjectId = (id: unknown): id is string => {
  if (typeof id !== 'string' || !id) return false;
  return /^[a-fA-F0-9]{24}$/.test(id.trim());
};

const loadElections = async () => {
  loadingElections.value = true;
  try {
    const response = await electionService.getAllElectionsAdmin({ limit: 50 });
    const list = response?.data?.elections ?? (Array.isArray(response?.data) ? response.data : []);
    const mapped = (list || []).map((e: any) => ({
      id: String(e.id ?? e._id ?? '').trim(),
      title: e.title || e.name || 'Untitled Election',
    }));
    elections.value = mapped.filter((e) => isValidObjectId(e.id));
    if (elections.value.length > 0 && !selectedElectionId.value) selectedElectionId.value = elections.value[0].id;
  } catch (e: any) {
    toast.error('Failed to load elections');
    console.error(e);
  } finally {
    loadingElections.value = false;
  }
};

onMounted(() => loadElections());

const voterForm = reactive({
  fullName: '',
  email: '',
  category: '',
  schoolName: '',
  matricNumber: '',
  gender: '',
  department: '',
  faculty: '',
  program: '',
  phone: '',
  reason: '',
});

const schoolCategories = ['Undergraduate', 'Postgraduate', 'Professional'];
const schoolNames = ['Central University', 'Tech Institute', 'City College'];
const departments = ['Computer Science', 'Political Science', 'Economics'];
const faculties = ['Science', 'Social Sciences', 'Business'];
const programs = ['B.Sc', 'M.Sc', 'MBA'];
const positions = ['President', 'Vice President', 'Secretary', 'Treasurer'];

const candidateForm = reactive({
  name: '',
  email: '',
  phone: '',
  registrationNumber: '',
  department: '',
  faculty: '',
  position: '',
  gpa: '',
  bio: '',
  manifestoPoints: [''],
  leadershipExperiences: [''],
});

const handleRegister = async () => {
  const electionId = selectedElectionId.value;
  if (!isValidObjectId(electionId)) {
    toast.error('Please select an election');
    return;
  }
  submittingVoter.value = true;
  try {
    await electionService.manualVoterRegistration(electionId, {
      identifier: voterForm.matricNumber,
      email: voterForm.email,
      full_name: voterForm.fullName,
      phone: voterForm.phone || '',
      reason: voterForm.reason || '',
    });
    toast.success('Voter registered successfully');
    Object.assign(voterForm, {
      fullName: '',
      email: '',
      category: '',
      schoolName: '',
      matricNumber: '',
      gender: '',
      department: '',
      faculty: '',
      program: '',
      phone: '',
      reason: '',
    });
  } catch (e: any) {
    toast.error(e?.response?.data?.message || 'Failed to register voter');
    console.error(e);
  } finally {
    submittingVoter.value = false;
  }
};

const handleCandidateRegister = async () => {
  const electionId = selectedElectionId.value;
  if (!isValidObjectId(electionId)) {
    toast.error('Please select an election');
    return;
  }
  submittingCandidate.value = true;
  try {
    await electionService.manualCandidateRegistration(electionId, {
      identifier: candidateForm.registrationNumber,
      email: candidateForm.email,
      full_name: candidateForm.name,
      phone: candidateForm.phone || '',
      reason: candidateForm.bio || '',
    });
    toast.success('Candidate registered successfully');
    Object.assign(candidateForm, {
      name: '',
      email: '',
      phone: '',
      registrationNumber: '',
      department: '',
      faculty: '',
      position: '',
      gpa: '',
      bio: '',
      manifestoPoints: [''],
      leadershipExperiences: [''],
    });
  } catch (e: any) {
    toast.error(e?.response?.data?.message || 'Failed to register candidate');
    console.error(e);
  } finally {
    submittingCandidate.value = false;
  }
};

const addManifestoPoint = () => {
  candidateForm.manifestoPoints.push('');
};

const removeManifestoPoint = (index: number) => {
  candidateForm.manifestoPoints.splice(index, 1);
};

const addLeadershipExperience = () => {
  candidateForm.leadershipExperiences.push('');
};

const removeLeadershipExperience = (index: number) => {
  candidateForm.leadershipExperiences.splice(index, 1);
};

const FieldBlock = defineComponent({
  name: 'FieldBlock',
  props: {
    label: { type: String, required: true },
  },
  setup(props, { slots }) {
    return () =>
      h('div', { class: 'space-y-2' }, [
        h(
          'p',
          { class: 'text-xs font-semibold uppercase tracking-wide text-[#94a3b8]' },
          props.label
        ),
        slots.default ? slots.default() : null,
      ]);
  },
});
</script>

<style scoped>
.field-select,
.field-input {
  width: 100%;
  border-radius: 999px;
  border: 1px solid #e2e8f0;
  background-color: #f8fafc;
  padding: 0.65rem 1.25rem;
  font-size: 0.9rem;
  color: #111827;
}

.field-select:focus,
.field-input:focus {
  outline: none;
  border-color: #94a3b8;
  background-color: #fff;
  box-shadow: 0 0 0 2px rgba(148, 163, 184, 0.2);
}

.field-textarea {
  width: 100%;
  border-radius: 20px;
  border: 1px solid #e2e8f0;
  background-color: #f8fafc;
  padding: 0.9rem 1.25rem;
  font-size: 0.9rem;
  color: #111827;
}

.field-textarea:focus {
  outline: none;
  border-color: #94a3b8;
  background-color: #fff;
  box-shadow: 0 0 0 2px rgba(148, 163, 184, 0.2);
}
</style>

