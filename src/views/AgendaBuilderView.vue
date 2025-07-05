<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-2">
      <h1 class="text-2xl font-semibold">Meeting Management</h1>
      <div class="flex gap-2">
        <button class="border border-black text-black rounded px-4 py-2 flex items-center gap-2 text-sm font-medium bg-white hover:bg-gray-50">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
          Templates
        </button>
        <button class="bg-black text-white rounded px-4 py-2 flex items-center gap-2 text-sm font-medium">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
          Schedule Meeting
        </button>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div class="bg-white border rounded-xl p-4 flex flex-col items-center">
        <svg class="w-7 h-7 mb-1 text-blue-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
        <div class="text-2xl font-bold text-blue-600">12</div>
        <div class="text-xs text-gray-500 mt-1">This Month</div>
      </div>
      <div class="bg-white border rounded-xl p-4 flex flex-col items-center">
        <svg class="w-7 h-7 mb-1 text-green-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
        <div class="text-2xl font-bold text-green-600">34</div>
        <div class="text-xs text-gray-500 mt-1">Total Actions</div>
      </div>
      <div class="bg-white border rounded-xl p-4 flex flex-col items-center">
        <svg class="w-7 h-7 mb-1 text-emerald-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-6"/></svg>
        <div class="text-2xl font-bold text-emerald-600">85%</div>
        <div class="text-xs text-gray-500 mt-1">Completion Rate</div>
      </div>
      <div class="bg-white border rounded-xl p-4 flex flex-col items-center">
        <svg class="w-7 h-7 mb-1 text-indigo-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="10"/></svg>
        <div class="text-2xl font-bold text-indigo-500">2.3h</div>
        <div class="text-xs text-gray-500 mt-1">Avg Duration</div>
      </div>
    </div>
    <div class="mt-8">
      <div class="font-semibold mb-2">Agenda Builder</div>
      <div class="bg-white border rounded-xl p-6">
        <div class="flex justify-between items-center mb-2">
          <div>
            <div class="font-semibold">Board Meeting - Q2 Planning</div>
            <div class="text-xs text-gray-500">March 25, 2024 at 10:00 AM</div>
          </div>
          <button class="bg-black text-white rounded flex items-center gap-2 px-3 py-1 text-sm font-medium" @click="showAddItemModal = true"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg> Add Item</button>
        </div>
        <div class="divide-y">
          <div v-for="(item, idx) in agendaItems" :key="idx" class="py-4 flex gap-3 items-start">
            <div class="text-lg font-semibold">{{ idx+1 }}.</div>
            <div class="flex-1">
              <div class="font-medium">{{ item.title }}</div>
              <div class="text-xs text-gray-500 mb-1">{{ item.description }}</div>
              <div class="flex flex-wrap gap-4 items-center mt-1">
                <div class="flex items-center gap-1 text-xs text-gray-600">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                  {{ item.time }}
                </div>
                <div class="flex items-center gap-1 text-xs text-gray-600">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="7" r="4"/><path d="M17 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2"/></svg>
                  {{ item.presenter }}
                </div>
                <div v-if="item.file" class="flex items-center gap-1 text-xs text-blue-600">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M7 7v10a2 2 0 002 2h6a2 2 0 002-2V7a2 2 0 00-2-2H9a2 2 0 00-2 2z"/></svg>
                  <a href="#" class="underline">{{ item.file }}</a>
                </div>
              </div>
            </div>
            <div class="flex flex-col gap-2 items-center ml-2">
              <button class="text-gray-400 hover:text-black" title="Edit" @click="openEditItemModal(idx)"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M15.232 5.232l3.536 3.536M9 11l6-6a2.828 2.828 0 114 4l-6 6H9v-4z"/></svg></button>
              <button class="text-gray-400 hover:text-red-600" title="Delete" @click="openDeleteItemModal(idx)"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2"/></svg></button>
            </div>
          </div>
        </div>
        <div class="flex justify-end mt-6">
          <button class="border px-4 py-2 rounded text-sm font-medium">Send to Attendees</button>
        </div>
      </div>
    </div>
    <!-- Add Agenda Item Modal -->
    <div v-if="showAddItemModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div class="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
        <button class="absolute top-3 right-3 text-gray-400 hover:text-gray-700" @click="closeAddItemModal">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
        <h2 class="text-lg font-semibold mb-4">Add Agenda Item</h2>
        <div class="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-1">Item Title<span class="text-red-500">*</span></label>
            <input v-model="newAgendaItem.title" class="w-full border rounded px-3 py-2 text-sm" placeholder="Enter agenda item title" />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Item Type</label>
            <select v-model="newAgendaItem.type" class="w-full border rounded px-3 py-2 text-sm">
              <option disabled value="">Select type</option>
              <option>Discussion</option>
              <option>Presentation</option>
              <option>Break</option>
              <option>Other</option>
            </select>
          </div>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Description</label>
          <textarea v-model="newAgendaItem.description" class="w-full border rounded px-3 py-2 text-sm" placeholder="Meeting description and objectives"></textarea>
        </div>
        <div class="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-1">Duration (min:ss)</label>
            <input v-model="newAgendaItem.duration" class="w-full border rounded px-3 py-2 text-sm" placeholder="Enter duration" />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Presenter/Lead</label>
            <input v-model="newAgendaItem.presenter" class="w-full border rounded px-3 py-2 text-sm" placeholder="Who will present this item?" />
          </div>
        </div>
        <div class="mb-6">
          <label class="block text-sm font-medium mb-1">Document Preview</label>
          <div class="border border-dashed rounded px-4 py-6 text-center text-xs text-gray-500 bg-gray-50">
            <div class="mb-2">Drag and drop your document here, or <span class="text-blue-600 underline cursor-pointer">browse files</span></div>
            <div>Supported formats: PDF, DOC, DOCX, PPT, PPTX, XLS, XLSX (max 25MB)</div>
          </div>
        </div>
        <div class="flex gap-2">
          <button class="bg-black text-white px-4 py-2 rounded w-full" @click="addAgendaItem">Add Item</button>
          <button class="border px-4 py-2 rounded w-full" @click="closeAddItemModal">Cancel</button>
        </div>
      </div>
    </div>
    <!-- Edit Agenda Item Modal -->
    <div v-if="showEditItemModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div class="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
        <button class="absolute top-3 right-3 text-gray-400 hover:text-gray-700" @click="closeEditItemModal">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
        <h2 class="text-lg font-semibold mb-4">Edit Agenda Item</h2>
        <div class="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-1">Item Title<span class="text-red-500">*</span></label>
            <input v-model="editAgendaItem.title" class="w-full border rounded px-3 py-2 text-sm" placeholder="Enter agenda item title" />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Item Type</label>
            <select v-model="editAgendaItem.type" class="w-full border rounded px-3 py-2 text-sm">
              <option disabled value="">Select type</option>
              <option>Discussion</option>
              <option>Presentation</option>
              <option>Break</option>
              <option>Other</option>
            </select>
          </div>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Description</label>
          <textarea v-model="editAgendaItem.description" class="w-full border rounded px-3 py-2 text-sm" placeholder="Meeting description and objectives"></textarea>
        </div>
        <div class="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-1">Duration (minutes)</label>
            <input v-model="editAgendaItem.duration" class="w-full border rounded px-3 py-2 text-sm" placeholder="Enter duration" />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Presenter/Lead</label>
            <input v-model="editAgendaItem.presenter" class="w-full border rounded px-3 py-2 text-sm" placeholder="Who will present this item?" />
          </div>
        </div>
        <div class="mb-6">
          <label class="block text-sm font-medium mb-1">Document Preview</label>
          <div class="border border-dashed rounded px-4 py-6 text-center text-xs text-gray-500 bg-gray-50">
            <div class="mb-2">Drag and drop your document here, or <span class="text-blue-600 underline cursor-pointer">browse files</span></div>
            <div>Supported formats: PDF, DOC, DOCX, PPT, PPTX, XLS, XLSX (max 25MB)</div>
          </div>
        </div>
        <div class="flex gap-2">
          <button class="bg-black text-white px-4 py-2 rounded w-full" @click="saveEditAgendaItem">Add Item</button>
          <button class="border px-4 py-2 rounded w-full" @click="closeEditItemModal">Cancel</button>
        </div>
      </div>
    </div>
    <!-- Delete Agenda Item Modal -->
    <div v-if="showDeleteItemModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div class="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
        <button class="absolute top-3 right-3 text-gray-400 hover:text-gray-700" @click="closeDeleteItemModal">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
        <div class="flex items-center gap-2 mb-2">
          <svg class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"/></svg>
          <h2 class="text-lg font-semibold text-red-600">Delete Agenda Item</h2>
        </div>
        <div class="text-sm text-gray-600 mb-4">This action cannot be undone. This will permanently remove the agenda item from the meeting.</div>
        <div class="mb-2">
          <div class="font-medium">{{ agendaItems[deleteItemIndex]?.title }}</div>
          <div class="text-xs text-gray-500">{{ agendaItems[deleteItemIndex]?.description }}</div>
          <div class="flex gap-4 mt-1 text-xs text-gray-600">
            <div>Duration: {{ agendaItems[deleteItemIndex]?.duration || agendaItems[deleteItemIndex]?.time }}</div>
            <div>Presenter: {{ agendaItems[deleteItemIndex]?.presenter }}</div>
          </div>
        </div>
        <div class="border border-red-300 bg-red-50 text-xs text-red-600 rounded p-3 mb-4">
          <span class="font-semibold">Warning:</span> Deleting this agenda item will also remove any associated documents and notes. Make sure to save any important information before proceeding.
        </div>
        <div class="flex gap-2">
          <button class="bg-red-600 text-white px-4 py-2 rounded w-full font-medium" @click="deleteAgendaItem">Delete Item</button>
          <button class="border px-4 py-2 rounded w-full" @click="closeDeleteItemModal">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const agendaItems = ref([
  {
    title: 'Welcome & Opening Remarks',
    description: 'How satisfied are you with our services?',
    time: '10 minutes',
    presenter: 'John Doe',
    file: '',
    type: 'Presentation',
    duration: '10',
  },
  {
    title: 'Q1 Financial Review',
    description: 'Review quarterly financial performance and budget variance.',
    time: '30 minutes',
    presenter: 'Sarah Wilson',
    file: 'Financial_Report_01.pdf',
    type: 'Discussion',
    duration: '30',
  },
  {
    title: 'Membership Growth Strategy',
    description: 'Discussion on member acquisition and retention initiatives',
    time: '45 minutes',
    presenter: 'Jane Smith',
    file: '',
    type: 'Discussion',
    duration: '45',
  },
]);

const showAddItemModal = ref(false);
const newAgendaItem = ref({
  title: '',
  type: '',
  description: '',
  duration: '',
  presenter: '',
  file: '',
});

function closeAddItemModal() {
  showAddItemModal.value = false;
  newAgendaItem.value = { title: '', type: '', description: '', duration: '', presenter: '', file: '' };
}
function addAgendaItem() {
  // For demo: just close modal. Add logic to push to agendaItems if needed.
  // Ensure 'time' is set from 'duration' for new items
  const item = { ...newAgendaItem.value, time: newAgendaItem.value.duration };
  agendaItems.value.push(item);
  closeAddItemModal();
}

// Edit modal logic
const showEditItemModal = ref(false);
const editAgendaItem = ref({
  title: '',
  type: '',
  description: '',
  duration: '',
  presenter: '',
  file: '',
});
let editItemIndex = -1;

function openEditItemModal(idx) {
  editItemIndex = idx;
  const item = agendaItems.value[idx];
  editAgendaItem.value = { ...item };
  showEditItemModal.value = true;
}
function closeEditItemModal() {
  showEditItemModal.value = false;
  editAgendaItem.value = { title: '', type: '', description: '', duration: '', presenter: '', file: '' };
  editItemIndex = -1;
}
function saveEditAgendaItem() {
  if (editItemIndex !== -1) {
    // Ensure 'time' is set from 'duration' for edited items
    agendaItems.value[editItemIndex] = { ...editAgendaItem.value, time: editAgendaItem.value.duration };
  }
  closeEditItemModal();
}

// Delete modal logic
const showDeleteItemModal = ref(false);
let deleteItemIndex = -1;
function openDeleteItemModal(idx) {
  deleteItemIndex = idx;
  showDeleteItemModal.value = true;
}
function closeDeleteItemModal() {
  showDeleteItemModal.value = false;
  deleteItemIndex = -1;
}
function deleteAgendaItem() {
  if (deleteItemIndex !== -1) {
    agendaItems.value.splice(deleteItemIndex, 1);
  }
  closeDeleteItemModal();
}
</script> 