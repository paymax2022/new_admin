<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-2">
      <h1 class="text-2xl font-semibold">Meeting Management</h1>
      <button class="bg-black text-white rounded px-4 py-2 flex items-center gap-2 text-sm font-medium">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
        Schedule Meeting
      </button>
    </div>
    <div class="font-semibold mb-2 mt-6">Meeting Archive</div>
    <div class="flex flex-wrap gap-2 items-center mb-4">
      <div class="flex-1 min-w-[200px]">
        <input class="w-full border rounded px-3 py-2 text-sm" placeholder="Search archived meeting..." />
      </div>
      <button class="border rounded px-3 py-2 text-sm flex items-center gap-2">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
        Filter by date
      </button>
    </div>
    <div class="overflow-x-auto">
      <table class="min-w-full text-sm">
        <thead>
          <tr class="text-left text-xs text-gray-500 border-b">
            <th class="py-2 pr-4">Meeting</th>
            <th class="py-2 pr-4">Date</th>
            <th class="py-2 pr-4">Type</th>
            <th class="py-2 pr-4">Attendees</th>
            <th class="py-2 pr-4">Documents</th>
            <th class="py-2 pr-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="meeting in meetings" :key="meeting.title" class="border-b hover:bg-gray-50">
            <td class="py-2 pr-4">
              <div class="font-medium">{{ meeting.title }}</div>
              <div class="text-xs text-gray-400">{{ meeting.subtitle }}</div>
            </td>
            <td class="py-2 pr-4">{{ meeting.date }}</td>
            <td class="py-2 pr-4">{{ meeting.type }}</td>
            <td class="py-2 pr-4">
              <a href="#" class="text-emerald-600 underline">{{ meeting.attendees }}</a>
            </td>
            <td class="py-2 pr-4 flex items-center gap-1">
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M7 7v10a2 2 0 002 2h6a2 2 0 002-2V7a2 2 0 00-2-2H9a2 2 0 00-2 2z"/></svg>
              <span>{{ meeting.documents }}</span>
            </td>
            <td class="py-2 pr-4 flex gap-2">
              <button class="text-blue-600 hover:text-black text-xs font-medium" @click="openMeetingModal(meeting)">View</button>
              <button class="text-gray-400 hover:text-black text-xs font-medium" @click="openExportModal(meeting)">Export</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <!-- Meeting Details Modal -->
  <div v-if="showMeetingModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div class="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg relative">
      <button class="absolute top-3 right-3 text-gray-400 hover:text-gray-700" @click="closeMeetingModal">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
      <h2 class="text-lg font-semibold mb-2">{{ selectedMeeting.title }}</h2>
      <div class="text-xs text-gray-500 mb-2">Meeting Overview</div>
      <div class="flex gap-4 items-center mb-2">
        <div class="flex items-center gap-1 text-xs text-gray-600">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
          {{ selectedMeeting.date }}
        </div>
        <div class="flex items-center gap-1 text-xs text-gray-600">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="10"/></svg>
          10:00 AM – 1:00 PM
        </div>
        <div class="flex items-center gap-1 text-xs text-gray-600">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="7" r="4"/><path d="M17 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2"/></svg>
          8 attendees
        </div>
        <div class="flex items-center gap-1 text-xs text-gray-600">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M7 7v10a2 2 0 002 2h6a2 2 0 002-2V7a2 2 0 00-2-2H9a2 2 0 00-2 2z"/></svg>
          3 documents
        </div>
      </div>
      <div class="text-xs text-gray-500 mb-2">Annual review and planning</div>
      <div class="mb-2">
        <div class="font-medium text-xs mb-1">Attendees (8)</div>
        <div class="flex flex-wrap gap-2 mb-2">
          <span class="bg-gray-100 rounded px-2 py-1 text-xs">John Doe</span>
          <span class="bg-gray-100 rounded px-2 py-1 text-xs">Jane Smith</span>
          <span class="bg-gray-100 rounded px-2 py-1 text-xs">Bob Johnson</span>
          <span class="bg-gray-100 rounded px-2 py-1 text-xs">Susan Wilson</span>
          <span class="bg-gray-100 rounded px-2 py-1 text-xs">Mike Davis</span>
          <span class="bg-gray-100 rounded px-2 py-1 text-xs">Lisa Anderson</span>
          <span class="bg-gray-100 rounded px-2 py-1 text-xs">Paul Brown</span>
          <span class="bg-gray-100 rounded px-2 py-1 text-xs">Emma Jones</span>
        </div>
      </div>
      <div class="mb-2">
        <div class="font-medium text-xs mb-1">Agenda</div>
        <div class="flex flex-col gap-2">
          <div class="flex items-center gap-2"><svg class="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></svg> <span class="font-medium">Opening Remarks</span> <span class="text-xs text-gray-500">Duration: 10 min</span> <span class="text-xs text-emerald-600 ml-auto">Completed</span></div>
          <div class="flex items-center gap-2"><svg class="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></svg> <span class="font-medium">Q4 Financial Review</span> <span class="text-xs text-gray-500">Duration: 45 min</span> <span class="text-xs text-emerald-600 ml-auto">Completed</span></div>
          <div class="flex items-center gap-2"><svg class="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></svg> <span class="font-medium">Strategic Planning 2024</span> <span class="text-xs text-gray-500">Duration: 60 min</span> <span class="text-xs text-emerald-600 ml-auto">Completed</span></div>
        </div>
      </div>
      <div class="mb-2">
        <div class="font-medium text-xs mb-1">Action Points</div>
        <div class="flex flex-col gap-2">
          <div>
            <div class="font-medium">Finalize 2024 budget document</div>
            <div class="text-xs text-gray-500">Assigned to: Jane Smith | Due: Dec 21, 2023</div>
          </div>
          <div class="flex items-center gap-2">
            <div>
              <div class="font-medium">Prepare Q1 strategic initiatives</div>
              <div class="text-xs text-gray-500">Assigned to: Bob Johnson | Due: Jan 15, 2024</div>
            </div>
            <span class="text-xs text-emerald-600 ml-auto">Completed</span>
          </div>
        </div>
      </div>
      <div class="mb-6">
        <div class="font-medium text-xs mb-1">Documents</div>
        <div class="flex flex-col gap-2">
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M7 7v10a2 2 0 002 2h6a2 2 0 002-2V7a2 2 0 00-2-2H9a2 2 0 00-2 2z"/></svg>
            <span class="underline text-blue-600">Q4_Financial_Report.pdf</span>
            <span class="text-xs text-emerald-600 ml-auto">Completed</span>
          </div>
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M7 7v10a2 2 0 002 2h6a2 2 0 002-2V7a2 2 0 00-2-2H9a2 2 0 00-2 2z"/></svg>
            <span class="underline text-blue-600">Strategic_Plan_2024.docx</span>
            <span class="text-xs text-emerald-600 ml-auto">Completed</span>
          </div>
        </div>
      </div>
      <div class="flex gap-2">
        <button class="bg-black text-white px-4 py-2 rounded w-full flex items-center justify-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 16v-8m0 0l-4 4m4-4l4 4"/><path d="M20 20H4"/></svg>
          Export Meeting
        </button>
        <button class="border px-4 py-2 rounded w-full" @click="closeMeetingModal">Cancel</button>
      </div>
    </div>
  </div>
  <!-- Export Meeting Modal -->
  <div v-if="showExportModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div class="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg relative">
      <button class="absolute top-3 right-3 text-gray-400 hover:text-gray-700" @click="closeExportModal">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
      <h2 class="text-lg font-semibold mb-2">Export Meeting</h2>
      <div class="font-medium mb-1">{{ exportMeeting.title }}</div>
      <div class="text-xs text-gray-500 mb-4">{{ exportMeeting.date }}</div>
      <div class="mb-4">
        <label class="block text-sm font-medium mb-1">Export Format</label>
        <select v-model="exportForm.format" class="w-full border rounded px-3 py-2 text-sm">
          <option disabled value="">Select File Format</option>
          <option>PDF</option>
          <option>DOCX</option>
          <option>XLSX</option>
        </select>
      </div>
      <div class="mb-4">
        <div class="font-medium text-sm mb-1">Include in Export</div>
        <label class="flex items-center gap-2 mb-1"><input type="checkbox" v-model="exportForm.sections.details" /> Meeting Details & Overview</label>
        <label class="flex items-center gap-2 mb-1"><input type="checkbox" v-model="exportForm.sections.attendees" /> Attendee List</label>
        <label class="flex items-center gap-2 mb-1"><input type="checkbox" v-model="exportForm.sections.agenda" /> Agenda Items</label>
        <label class="flex items-center gap-2 mb-1"><input type="checkbox" v-model="exportForm.sections.actions" /> Action Points & Assignments</label>
        <label class="flex items-center gap-2 mb-1"><input type="checkbox" v-model="exportForm.sections.notes" /> Meeting Notes & Minutes</label>
        <label class="flex items-center gap-2 mb-1"><input type="checkbox" v-model="exportForm.sections.documents" /> Attached Documents (as links)</label>
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium mb-1">Export File Name</label>
        <input v-model="exportForm.fileName" class="w-full border rounded px-3 py-2 text-sm" />
      </div>
      <div class="mb-6">
        <div class="font-medium text-sm mb-1">Document</div>
        <div class="border rounded bg-gray-50 px-4 py-3 text-xs">
          <div class="flex items-center gap-2 mb-1">
            <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M7 7v10a2 2 0 002 2h6a2 2 0 002-2V7a2 2 0 00-2-2H9a2 2 0 00-2 2z"/></svg>
            <span>Export Preview</span>
          </div>
          <div>Format: {{ exportForm.format || 'PDF' }}</div>
          <div>Sections: 6/6</div>
          <div>Estimated size: &lt;2.5 MB</div>
        </div>
      </div>
      <div class="flex gap-2">
        <button class="bg-black text-white px-4 py-2 rounded w-full flex items-center justify-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 16v-8m0 0l-4 4m4-4l4 4"/><path d="M20 20H4"/></svg>
          Export Meeting
        </button>
        <button class="border px-4 py-2 rounded w-full" @click="closeExportModal">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

type Meeting = {
  title: string;
  subtitle: string;
  date: string;
  type: string;
  attendees: string;
  documents: string;
};

const meetings = [
  {
    title: 'Board Meeting - Q4 2023',
    subtitle: 'Annual review and planning',
    date: 'Dec 15, 2023',
    type: 'Board',
    attendees: '8 members',
    documents: '3 files',
  },
  {
    title: 'Committee Meeting - Finance',
    subtitle: 'Budget planning session',
    date: 'Nov 20, 2023',
    type: 'Committee',
    attendees: '5 members',
    documents: '7 files',
  },
];

const emptyMeeting: Meeting = {
  title: '',
  subtitle: '',
  date: '',
  type: '',
  attendees: '',
  documents: '',
};

const showMeetingModal = ref(false);
const selectedMeeting = ref<Meeting>(emptyMeeting);
function openMeetingModal(meeting: Meeting) {
  selectedMeeting.value = meeting;
  showMeetingModal.value = true;
}
function closeMeetingModal() {
  showMeetingModal.value = false;
  selectedMeeting.value = emptyMeeting;
}

const showExportModal = ref(false);
const exportMeeting = ref<Meeting>(emptyMeeting);
const exportForm = ref({
  format: '',
  sections: {
    details: true,
    attendees: true,
    agenda: true,
    actions: false,
    notes: false,
    documents: false,
  },
  fileName: '',
});
function openExportModal(meeting: Meeting) {
  exportMeeting.value = meeting;
  exportForm.value = {
    format: '',
    sections: {
      details: true,
      attendees: true,
      agenda: true,
      actions: false,
      notes: false,
      documents: false,
    },
    fileName: `${meeting.title.replace(/\s+/g, '_')}_Export_${new Date().toISOString().slice(0,10)}`,
  };
  showExportModal.value = true;
}
function closeExportModal() {
  showExportModal.value = false;
  exportMeeting.value = emptyMeeting;
}
</script> 