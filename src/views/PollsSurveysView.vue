<template>
  <div class="p-6 space-y-6">
    <!-- Header -->
    <div class="flex items-center gap-3 mb-4">
      <IconListCheck class="w-7 h-7 text-black" />
      <h1 class="text-2xl font-semibold">Polls & Surveys</h1>
    </div>
    <!-- Tabs -->
    <div class="flex gap-6 border-b mb-4">
      <button :class="['pb-2 px-2 font-medium', activeTab === 'Builder' ? 'border-b-2 border-black' : 'text-gray-400']" @click="activeTab = 'Builder'">Builder</button>
      <button :class="['pb-2 px-2 font-medium', activeTab === 'Participation' ? 'border-b-2 border-black' : 'text-gray-400']" @click="activeTab = 'Participation'">Participation</button>
      <button :class="['pb-2 px-2 font-medium', activeTab === 'Result' ? 'border-b-2 border-black' : 'text-gray-400']" @click="activeTab = 'Result'">Result</button>
      <button :class="['pb-2 px-2 font-medium', activeTab === 'Analytics' ? 'border-b-2 border-black' : 'text-gray-400']" @click="activeTab = 'Analytics'">Analytics</button>
    </div>
    <div v-if="activeTab === 'Builder'">
      <div class="text-xs text-gray-400 mb-2">Poll & Survey Builder</div>
      <div>
        <div class="flex gap-2 mb-4">
          <button :class="['px-4 py-2 text-sm font-medium rounded', quickPollMode ? 'bg-black text-white' : 'bg-gray-100 text-gray-400']" @click="quickPollMode = true">Quick Poll</button>
          <button :class="['px-4 py-2 text-sm font-medium rounded', !quickPollMode ? 'bg-black text-white' : 'bg-gray-100 text-gray-400']" @click="quickPollMode = false">Survey Builder</button>
        </div>
        <div v-if="quickPollMode" class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Create Quick Poll -->
          <div class="bg-white rounded-lg shadow p-6">
            <form @submit.prevent>
              <div class="mb-4">
                <label class="block text-sm font-medium mb-1">Poll Question</label>
                <input v-model="poll.question" type="text" class="w-full border rounded px-3 py-2" placeholder="what would you like to ask" />
              </div>
              <div class="mb-4">
                <label class="block text-sm font-medium mb-1">Poll Options</label>
                <div v-for="(option, idx) in poll.options" :key="idx" class="mb-2 flex gap-2">
                  <input v-model="poll.options[idx]" type="text" class="w-full border rounded px-3 py-2" :placeholder="`Option ${idx+1}`" />
                  <button v-if="poll.options.length > 2" type="button" class="text-red-500" @click="removeOption(idx)" tabindex="-1">&times;</button>
                </div>
                <button type="button" class="text-sm text-gray-600 flex items-center gap-1 mt-1" @click="addOption"><span class="text-lg">+</span> Add another Option</button>
              </div>
              <div class="mb-4 flex gap-2">
                <div class="flex-1">
                  <label class="block text-sm font-medium mb-1">Target Audience</label>
                  <select v-model="poll.audience" class="w-full border rounded px-3 py-2">
                    <option value="">Select audience</option>
                    <option>All Members</option>
                    <option>Premium Members</option>
                    <option>Event Attendees</option>
                  </select>
                </div>
                <div class="flex-1">
                  <label class="block text-sm font-medium mb-1">Duration (days)</label>
                  <input v-model="poll.duration" type="number" min="1" class="w-full border rounded px-3 py-2" placeholder="Enter duration" />
                </div>
              </div>
              <div class="flex gap-2">
                <button type="submit" class="bg-black text-white rounded px-4 py-2 flex-1">Create poll</button>
                <button type="button" class="bg-gray-100 text-gray-400 rounded px-4 py-2 flex-1" disabled>Save Draft</button>
              </div>
            </form>
          </div>
          <!-- Poll Preview -->
          <div class="bg-white rounded-lg shadow p-6">
            <div class="font-semibold mb-2">Poll Preview</div>
            <div class="mb-4">{{ poll.question || 'What would you like to ask?' }}</div>
            <div class="mb-4">
              <div v-for="(option, idx) in poll.options" :key="idx" class="flex items-center gap-2 mb-2">
                <input type="radio" :id="'option'+idx" :name="'pollPreview'" :value="option" disabled />
                <label :for="'option'+idx">{{ option || `Option ${idx+1}` }}</label>
              </div>
            </div>
            <button class="bg-black text-white rounded px-4 py-2">Submit</button>
            <div class="text-xs text-gray-400 mt-2">Preview updates as you type</div>
          </div>
        </div>
        <div v-else>
          <!-- Survey Builder UI -->
          <div class="bg-white rounded-lg shadow p-6 mb-6">
            <div class="font-semibold mb-4">Survey Builder</div>
            <form @submit.prevent>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label class="block text-sm font-medium mb-1">Survey Title</label>
                  <input v-model="survey.title" type="text" class="w-full border rounded px-3 py-2" placeholder="member satisfaction survey" />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1">Survey Type</label>
                  <select v-model="survey.type" class="w-full border rounded px-3 py-2">
                    <option value="">Select type</option>
                    <option>Feedback</option>
                    <option>Assessment</option>
                    <option>Quiz</option>
                  </select>
                </div>
              </div>
              <div class="mb-4">
                <label class="block text-sm font-medium mb-1">Description</label>
                <textarea v-model="survey.description" class="w-full border rounded px-3 py-2" rows="2" placeholder="Tell Members what this survey is about"></textarea>
              </div>
            </form>
          </div>
          <!-- Survey Questions -->
          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex justify-between items-center mb-4">
              <div class="font-semibold">Survey Questions</div>
              <button class="bg-black text-white rounded px-3 py-1 flex items-center gap-1 text-sm font-medium" @click="openAddSurveyQuestionModal"><span class="text-lg">+</span> Add questions</button>
            </div>
            <div v-for="(q, idx) in survey.questions" :key="idx" class="mb-3 p-3 rounded bg-gray-50 flex flex-col gap-1 relative">
              <div class="font-medium">Question {{ idx + 1 }}</div>
              <div>{{ q.text }}</div>
              <div class="flex gap-2 mt-1">
                <span class="bg-gray-200 text-xs px-2 py-1 rounded">{{ q.type }}</span>
                <span v-if="q.required" class="bg-red-100 text-red-600 text-xs px-2 py-1 rounded">Required</span>
              </div>
              <div class="absolute right-2 top-2 flex gap-2">
                <button class="text-gray-400 hover:text-black" @click="openEditSurveyQuestionModal(idx)"><IconEdit class="w-4 h-4" /></button>
                <button class="text-gray-400 hover:text-black"><IconTrash class="w-4 h-4" /></button>
              </div>
            </div>
            <button class="bg-black text-white rounded px-4 py-2 mt-4 float-right">Create Survey</button>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="activeTab === 'Participation'">
      <div class="flex justify-between items-center mb-4">
        <div class="text-xs text-gray-400">Participation Management</div>
        <div class="flex gap-2">
          <button class="border rounded px-4 py-2 flex items-center gap-2 text-sm" @click="openSendReminderModal"><svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16 17v-1a4 4 0 00-3-3.87"></path><circle cx="12" cy="7" r="4"></circle></svg> Send Reminder</button>
          <button class="bg-black text-white rounded px-4 py-2 flex items-center gap-2 text-sm font-medium" @click="openBoostParticipationModal"><svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m4 0h-1v-4h-1m4 0h-1v-4h-1"/></svg> Boost Participation</button>
        </div>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div class="bg-white rounded-lg shadow p-4 flex flex-col items-center">
          <div class="text-2xl font-bold text-blue-600">390</div>
          <div class="text-gray-500 text-xs">Total Responses</div>
        </div>
        <div class="bg-white rounded-lg shadow p-4 flex flex-col items-center">
          <div class="text-2xl font-bold text-green-600">78%</div>
          <div class="text-gray-500 text-xs">Avg Response Rate</div>
        </div>
        <div class="bg-white rounded-lg shadow p-4 flex flex-col items-center">
          <div class="text-2xl font-bold text-yellow-600">2</div>
          <div class="text-gray-500 text-xs">Active Polls</div>
        </div>
        <div class="bg-white rounded-lg shadow p-4 flex flex-col items-center">
          <div class="text-2xl font-bold text-purple-600">110</div>
          <div class="text-gray-500 text-xs">Non-Participants</div>
        </div>
      </div>
      <div class="bg-white rounded-lg shadow p-6">
        <div class="font-semibold mb-4">Active Poll Participation</div>
        <div v-for="poll in participationPolls" :key="poll.title" class="mb-6 border-b last:border-0 pb-6">
          <div class="flex justify-between items-center mb-1">
            <div class="font-medium">{{ poll.title }}</div>
            <div class="flex items-center gap-2">
              <span class="bg-green-100 text-green-600 text-xs px-2 py-1 rounded">Active</span>
              <button class="border rounded px-3 py-1 text-xs flex items-center gap-1"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16 17v-1a4 4 0 00-3-3.87"></path><circle cx="12" cy="7" r="4"></circle></svg> Send Reminder</button>
            </div>
          </div>
          <div class="text-xs text-gray-400 mb-1">Created: {{ poll.created }} &nbsp; Ends: {{ poll.ends }}</div>
          <div class="text-xs text-gray-500 mb-2">Participation Rate</div>
          <div class="w-full h-3 bg-gray-200 rounded mb-2">
            <div class="h-3 bg-black rounded" :style="{ width: poll.progress + '%' }"></div>
          </div>
          <div class="flex justify-between text-xs mb-2">
            <div>Responses: <span class="font-semibold">{{ poll.responses }}/{{ poll.target }}</span></div>
            <div>Responses: <span class="font-semibold">{{ poll.totalResponses }}</span></div>
          </div>
          <div class="flex gap-2">
            <button class="border rounded px-3 py-1 text-xs" @click="openNonParticipantsModal">View Non-Participants</button>
            <button class="border rounded px-3 py-1 text-xs">Export Participants</button>
            <button class="border rounded px-3 py-1 text-xs" @click="openParticipationAnalyticsModal">Participation Analytics</button>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="activeTab === 'Result'">
      <div class="flex justify-between items-center mb-4">
        <div class="text-xs text-gray-400">Poll & Survey Results</div>
        <div class="flex gap-2">
          <button class="border rounded px-4 py-2 flex items-center gap-2 text-sm"><svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg> Export All Results</button>
          <button class="bg-black text-white rounded px-4 py-2 flex items-center gap-2 text-sm font-medium"><svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 17v-2a4 4 0 014-4h2a4 4 0 014 4v2"/></svg> Generate Report</button>
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div class="bg-white rounded-lg shadow p-4 flex flex-col items-center">
          <div class="text-2xl font-bold text-green-600">24</div>
          <div class="text-gray-500 text-xs">Completed Polls</div>
        </div>
        <div class="bg-white rounded-lg shadow p-4 flex flex-col items-center">
          <div class="text-2xl font-bold text-purple-600">89%</div>
          <div class="text-gray-500 text-xs">Avg Response Rate</div>
        </div>
        <div class="bg-white rounded-lg shadow p-4 flex flex-col items-center">
          <div class="text-2xl font-bold text-yellow-600">4.2</div>
          <div class="text-gray-500 text-xs">Avg Survey Rating</div>
        </div>
      </div>
      <!-- Poll Result Card -->
      <div class="bg-white rounded-lg shadow p-6 mb-6">
        <div class="flex justify-between items-center mb-2">
          <div class="font-semibold">Preferred Event Time</div>
          <span class="bg-green-100 text-green-600 text-xs px-2 py-1 rounded">Active</span>
        </div>
        <div class="flex items-center justify-between text-xs text-gray-400 mb-1">
          <span>Response Rate</span>
          <span>Response Rate</span>
        </div>
        <div class="w-full h-2 bg-gray-200 rounded mb-4">
          <div class="h-2 bg-black rounded" style="width: 80%"></div>
        </div>
        <div class="text-xs text-gray-500 mb-2 font-medium">Result Breakdown</div>
        <div class="space-y-2 mb-2">
          <div class="flex items-center gap-2">
            <span class="w-40 text-xs">Morning (9-11 AM)</span>
            <div class="flex-1 h-2 bg-gray-100 rounded relative">
              <div class="h-2 bg-gray-400 rounded" style="width: 18%"></div>
            </div>
            <span class="ml-2 text-xs text-gray-500">89 votes (18%)</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="w-40 text-xs">Afternoon (2-4 PM)</span>
            <div class="flex-1 h-2 bg-gray-100 rounded relative">
              <div class="h-2 bg-blue-600 rounded" style="width: 44%"></div>
            </div>
            <span class="ml-2 text-xs text-blue-600 font-semibold">Winner<br/>102 votes (44%)</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="w-40 text-xs">Evening (6-8 PM)</span>
            <div class="flex-1 h-2 bg-gray-100 rounded relative">
              <div class="h-2 bg-gray-400 rounded" style="width: 38%"></div>
            </div>
            <span class="ml-2 text-xs text-gray-500">93 votes (38%)</span>
          </div>
        </div>
      </div>
      <!-- Survey Result Card -->
      <div class="bg-white rounded-lg shadow p-6 mb-6">
        <div class="flex justify-between items-center mb-2">
          <div class="font-semibold">Member Satisfaction Survey</div>
          <span class="bg-green-100 text-green-600 text-xs px-2 py-1 rounded">Active</span>
        </div>
        <div class="flex items-center text-xs text-gray-400 mb-1">
          <span>Type: Survey</span>
          <span class="mx-2">•</span>
          <span>Completed: 2024-03-25</span>
          <span class="mx-2">•</span>
          <span>Responses: 150</span>
        </div>
        <div class="flex items-center justify-between text-xs text-gray-400 mb-1">
          <span>Response Rate</span>
          <span>Response Rate</span>
        </div>
        <div class="w-full h-2 bg-gray-200 rounded mb-4">
          <div class="h-2 bg-black rounded" style="width: 92%"></div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          <div class="bg-gray-50 rounded-lg p-4 flex flex-col items-center">
            <div class="text-lg font-bold text-black">8</div>
            <div class="text-gray-500 text-xs">Questions</div>
          </div>
          <div class="bg-gray-50 rounded-lg p-4 flex flex-col items-center">
            <div class="text-lg font-bold text-green-600">4.2</div>
            <div class="text-gray-500 text-xs">Average Rating</div>
          </div>
          <div class="bg-gray-50 rounded-lg p-4 flex flex-col items-center">
            <div class="text-lg font-bold text-purple-600">92%</div>
            <div class="text-gray-500 text-xs">Satisfaction</div>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="activeTab === 'Analytics'">
      <div class="text-xs text-gray-400 mb-2">Poll & Survey Analytics</div>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div class="bg-white rounded-lg shadow p-4 flex flex-col items-center">
          <div class="text-2xl font-bold text-blue-600">24</div>
          <div class="text-gray-500 text-xs">Total Polls Created</div>
        </div>
        <div class="bg-white rounded-lg shadow p-4 flex flex-col items-center">
          <div class="text-2xl font-bold text-green-600">89%</div>
          <div class="text-gray-500 text-xs">Avg Response Rate</div>
        </div>
        <div class="bg-white rounded-lg shadow p-4 flex flex-col items-center">
          <div class="text-2xl font-bold text-purple-600">4.2</div>
          <div class="text-gray-500 text-xs">Avg Survey Rating</div>
        </div>
      </div>
      <div class="mb-6">
        <div class="text-sm font-medium mb-2">Member Engagement Trends</div>
        <div class="bg-gray-100 rounded-lg flex flex-col items-center justify-center h-40 text-gray-400 text-xs mb-6">
          <svg class="w-8 h-8 mb-2" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 3v18h18"/></svg>
          Response rate trends over time<br/>Chart visualization would appear here
        </div>
      </div>
      <div class="bg-white rounded-lg shadow p-4">
        <div class="font-medium mb-4">Top Performing Polls</div>
        <div class="divide-y">
          <div class="flex items-center justify-between py-3">
            <div>
              <div class="font-medium text-sm">New Feature Preferences</div>
              <div class="text-xs text-gray-400">445 responses</div>
            </div>
            <span class="bg-green-100 text-green-600 text-xs font-semibold px-3 py-1 rounded-full">88%</span>
          </div>
          <div class="flex items-center justify-between py-3">
            <div>
              <div class="font-medium text-sm">Event Timing Survey</div>
              <div class="text-xs text-gray-400">234 responses</div>
            </div>
            <span class="bg-green-100 text-green-600 text-xs font-semibold px-3 py-1 rounded-full">78%</span>
          </div>
          <div class="flex items-center justify-between py-3">
            <div>
              <div class="font-medium text-sm">Membership Benefits Poll</div>
              <div class="text-xs text-gray-400">198 responses</div>
            </div>
            <span class="bg-green-100 text-green-600 text-xs font-semibold px-3 py-1 rounded-full">72%</span>
          </div>
        </div>
      </div>
    </div>
    <AddSurveyQuestionModal
      v-if="showAddSurveyQuestionModal"
      @close="closeAddSurveyQuestionModal"
      @add="handleAddSurveyQuestion"
    />
    <EditSurveyQuestionModal
      v-if="showEditSurveyQuestionModal && selectedEditSurveyQuestionIndex !== null"
      :question="survey.questions[selectedEditSurveyQuestionIndex]"
      @close="closeEditSurveyQuestionModal"
      @update="handleUpdateSurveyQuestion"
    />
    <NonParticipantsModal
      v-if="showNonParticipantsModal"
      @close="closeNonParticipantsModal"
    />
    <ParticipationAnalyticsModal
      v-if="showParticipationAnalyticsModal"
      @close="closeParticipationAnalyticsModal"
    />
    <SendReminderModal
      v-if="showSendReminderModal"
      @close="closeSendReminderModal"
      @send="handleSendReminder"
    />
    <BoostParticipationModal
      v-if="showBoostParticipationModal"
      @close="closeBoostParticipationModal"
      @launch="handleLaunchBoost"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import IconListCheck from '@/components/icon/icon-list-check.vue';
import IconEdit from '@/components/icon/icon-edit.vue';
import IconTrash from '@/components/icon/icon-trash.vue';
import AddSurveyQuestionModal from '@/components/AddSurveyQuestionModal.vue';
import EditSurveyQuestionModal from '@/components/EditSurveyQuestionModal.vue';
import NonParticipantsModal from '@/components/NonParticipantsModal.vue';
import ParticipationAnalyticsModal from '@/components/ParticipationAnalyticsModal.vue';
import SendReminderModal from '@/components/SendReminderModal.vue';
import BoostParticipationModal from '@/components/BoostParticipationModal.vue';
const activeTab = ref('Builder');
const quickPollMode = ref(true);
const poll = ref({
  question: '',
  options: ['', '', ''],
  audience: '',
  duration: ''
});
function addOption() {
  poll.value.options.push('');
}
function removeOption(idx) {
  poll.value.options.splice(idx, 1);
}
const survey = ref({
  title: '',
  type: '',
  description: '',
  questions: [
    { text: 'How satisfied are you with our services?', type: 'Rating Scale', required: true },
    { text: 'What features would you like to see improved?', type: 'Multiple Choice', required: false },
  ]
});
const showAddSurveyQuestionModal = ref(false);
const showEditSurveyQuestionModal = ref(false);
const selectedEditSurveyQuestionIndex = ref<number|null>(null);
const showNonParticipantsModal = ref(false);
const showParticipationAnalyticsModal = ref(false);
const showSendReminderModal = ref(false);
const showBoostParticipationModal = ref(false);
function openAddSurveyQuestionModal() {
  showAddSurveyQuestionModal.value = true;
}
function closeAddSurveyQuestionModal() {
  showAddSurveyQuestionModal.value = false;
}
function handleAddSurveyQuestion(newQuestion) {
  survey.value.questions.push(newQuestion);
  closeAddSurveyQuestionModal();
}
function openEditSurveyQuestionModal(idx: number) {
  selectedEditSurveyQuestionIndex.value = idx;
  showEditSurveyQuestionModal.value = true;
}
function closeEditSurveyQuestionModal() {
  showEditSurveyQuestionModal.value = false;
  selectedEditSurveyQuestionIndex.value = null;
}
function handleUpdateSurveyQuestion(updatedQuestion) {
  if (selectedEditSurveyQuestionIndex.value !== null) {
    survey.value.questions[selectedEditSurveyQuestionIndex.value] = updatedQuestion;
  }
  closeEditSurveyQuestionModal();
}
function openNonParticipantsModal() {
  showNonParticipantsModal.value = true;
}
function closeNonParticipantsModal() {
  showNonParticipantsModal.value = false;
}
function openParticipationAnalyticsModal() {
  showParticipationAnalyticsModal.value = true;
}
function closeParticipationAnalyticsModal() {
  showParticipationAnalyticsModal.value = false;
}
function openSendReminderModal() {
  showSendReminderModal.value = true;
}
function closeSendReminderModal() {
  showSendReminderModal.value = false;
}
function handleSendReminder(payload) {
  // Handle sending reminders here
  closeSendReminderModal();
}
function openBoostParticipationModal() {
  showBoostParticipationModal.value = true;
}
function closeBoostParticipationModal() {
  showBoostParticipationModal.value = false;
}
function handleLaunchBoost() {
  // Handle launching boost participation
  closeBoostParticipationModal();
}
const participationPolls = [
  {
    title: 'Preferred Event Time',
    created: '2024-03-18',
    ends: '2024-03-20',
    progress: 47,
    responses: 234,
    target: 500,
    totalResponses: 266,
  },
  {
    title: 'Member Satisfaction Survey',
    created: '2024-03-10',
    ends: '2024-03-20',
    progress: 31,
    responses: 156,
    target: 500,
    totalResponses: 344,
  },
];
</script> 