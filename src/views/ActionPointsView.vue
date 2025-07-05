<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-2">
      <h1 class="text-2xl font-semibold">Meeting Management</h1>
      <button class="bg-black text-white rounded px-4 py-2 flex items-center gap-2 text-sm font-medium">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
        Schedule Meeting
      </button>
    </div>
    <div class="font-semibold mb-2 mt-6">Action Point Dashboard</div>
    <div class="overflow-x-auto">
      <table class="min-w-full text-sm">
        <thead>
          <tr class="text-left text-xs text-gray-500 border-b">
            <th class="py-2 pr-4">Action</th>
            <th class="py-2 pr-4">Meeting</th>
            <th class="py-2 pr-4">Assignee</th>
            <th class="py-2 pr-4">Due Date</th>
            <th class="py-2 pr-4">Priority</th>
            <th class="py-2 pr-4">Status</th>
            <th class="py-2 pr-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="point in actionPoints" :key="point.action" class="border-b hover:bg-gray-50">
            <td class="py-2 pr-4">{{ point.action }}</td>
            <td class="py-2 pr-4">{{ point.meeting }}</td>
            <td class="py-2 pr-4">{{ point.assignee }}</td>
            <td class="py-2 pr-4">{{ point.dueDate }}</td>
            <td class="py-2 pr-4">
              <span :class="{
                'text-red-500 font-semibold': point.priority === 'High',
                'text-yellow-500 font-semibold': point.priority === 'Medium',
                'text-blue-500 font-semibold': point.priority === 'Low',
              }">{{ point.priority }}</span>
            </td>
            <td class="py-2 pr-4">
              <span :class="{
                'text-orange-500 font-semibold': point.status === 'In Progress',
                'text-emerald-600 font-semibold': point.status === 'Completed',
                'text-gray-400 font-semibold': point.status === 'Not Started',
              }">{{ point.status }}</span>
            </td>
            <td class="py-2 pr-4 flex gap-2 items-center">
              <button class="text-blue-600 hover:text-black text-xs font-medium" @click="openUpdateModal(point)">Update</button>
              <button class="text-gray-400 hover:text-black" title="Settings" @click="openSettingsModal(point)">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path stroke-linecap="round" stroke-linejoin="round" d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 007.1 19a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 003 15.9V15a1.65 1.65 0 00-1.51-1A1.65 1.65 0 002 12a2 2 0 012-2h.09A1.65 1.65 0 005 7.1a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 007.1 5H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09A1.65 1.65 0 0017 5a1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019 7.1V9c0 .63.37 1.19.91 1.51H21a2 2 0 012 2 2 2 0 01-2 2h-.09A1.65 1.65 0 0019 15z"/></svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <!-- Update Action Point Modal -->
  <div v-if="showUpdateModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div class="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
      <button class="absolute top-3 right-3 text-gray-400 hover:text-gray-700" @click="closeUpdateModal">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
      <h2 class="text-lg font-semibold mb-4">Update Action Point</h2>
      <div class="mb-4">
        <label class="block text-sm font-medium mb-1">Action Description</label>
        <textarea v-model="updateForm.action" class="w-full border rounded px-3 py-2 text-sm" placeholder="Enter description"></textarea>
      </div>
      <div class="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium mb-1">Assignee</label>
          <select v-model="updateForm.assignee" class="w-full border rounded px-3 py-2 text-sm">
            <option disabled value="">Select assignee</option>
            <option>Jane Smith</option>
            <option>Bob Johnson</option>
            <option>Sarah Wilson</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Due Date</label>
          <input v-model="updateForm.dueDate" type="date" class="w-full border rounded px-3 py-2 text-sm" placeholder="mm/dd/yyyy" />
        </div>
      </div>
      <div class="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium mb-1">Status</label>
          <select v-model="updateForm.status" class="w-full border rounded px-3 py-2 text-sm">
            <option>Not Started</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Priority</label>
          <select v-model="updateForm.priority" class="w-full border rounded px-3 py-2 text-sm">
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>
      </div>
      <div class="mb-6">
        <label class="block text-sm font-medium mb-1">Progress Notes</label>
        <textarea v-model="updateForm.notes" class="w-full border rounded px-3 py-2 text-sm" placeholder="Add any update or additional note"></textarea>
      </div>
      <div class="flex gap-2">
        <button class="bg-black text-white px-4 py-2 rounded w-full" @click="saveUpdate">Save Changes</button>
        <button class="border px-4 py-2 rounded w-full" @click="closeUpdateModal">Cancel</button>
      </div>
    </div>
  </div>
  <!-- Action Point Settings Modal -->
  <div v-if="showSettingsModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div class="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg relative">
      <button class="absolute top-3 right-3 text-gray-400 hover:text-gray-700" @click="closeSettingsModal">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
      <h2 class="text-lg font-semibold mb-4">Action Point Settings</h2>
      <div class="mb-4 bg-gray-50 rounded p-3 text-xs">
        <div class="font-medium text-sm mb-1">Action Point Details</div>
        <div>{{ settingsForm.action }}</div>
        <div class="text-gray-500">Assignee: {{ settingsForm.assignee }} | Due: {{ settingsForm.dueDate }} | Priority: {{ settingsForm.priority }}</div>
      </div>
      <div class="mb-4">
        <div class="font-medium text-sm mb-1">Reminder Settings</div>
        <label class="flex items-center gap-2 mb-2">
          <input type="checkbox" v-model="settingsForm.enableReminders" />
          Enable automatic reminders
        </label>
        <div class="flex gap-2 mb-2">
          <select v-model="settingsForm.reminderDays" class="border rounded px-2 py-1 text-xs">
            <option disabled value="">Select alert days</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
          <select v-model="settingsForm.overdueDays" class="border rounded px-2 py-1 text-xs">
            <option disabled value="">Select cover due days</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
        </div>
      </div>
      <div class="mb-4">
        <div class="font-medium text-sm mb-1">Notification Settings</div>
        <label class="flex items-center gap-2 mb-1">
          <input type="checkbox" v-model="settingsForm.notifyAssignee" />
          Notify assignee of updates
        </label>
        <label class="flex items-center gap-2 mb-1">
          <input type="checkbox" v-model="settingsForm.notifyOrganizer" />
          Notify meeting organizer
        </label>
      </div>
      <div class="mb-4">
        <div class="font-medium text-sm mb-1">Permission Settings</div>
        <label class="flex items-center gap-2 mb-1">
          <input type="checkbox" v-model="settingsForm.allowReassign" />
          Allow assignee to reassign task
        </label>
        <label class="flex items-center gap-2 mb-1">
          <input type="checkbox" v-model="settingsForm.trackTime" />
          Track time spent on this action
        </label>
        <label class="flex items-center gap-2 mb-1">
          <input type="checkbox" v-model="settingsForm.requireApproval" />
          Require approval before marking complete
        </label>
      </div>
      <div class="border border-red-200 bg-red-50 rounded p-4 mb-4">
        <div class="font-semibold text-red-600 mb-2">Danger Zone</div>
        <div class="text-xs text-red-600 mb-2">Delete this action point permanently. This action cannot be undone.</div>
        <button class="border border-red-400 text-red-600 rounded px-4 py-1 font-medium flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
          Delete Action Point
        </button>
      </div>
      <div class="flex gap-2">
        <button class="bg-black text-white px-4 py-2 rounded w-full" @click="closeSettingsModal">Save Settings</button>
        <button class="border px-4 py-2 rounded w-full" @click="closeSettingsModal">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const actionPoints = [
  {
    action: 'Review membership growth strategy and preparation',
    meeting: 'Board Meeting - Q1 Review',
    assignee: 'Jane Smith',
    dueDate: '2024-03-23',
    priority: 'High',
    status: 'In Progress',
  },
  {
    action: 'Update payment processing system documentation',
    meeting: 'Board Meeting - Q1 Review',
    assignee: 'Bob Johnson',
    dueDate: '2024-03-25',
    priority: 'Medium',
    status: 'Completed',
  },
  {
    action: 'Organize Q2 member satisfaction survey',
    meeting: 'Board Meeting - Q1 Review',
    assignee: 'Sarah Wilson',
    dueDate: '2024-03-26',
    priority: 'Low',
    status: 'Not Started',
  },
];

const showUpdateModal = ref(false);
const updateForm = ref({
  action: '',
  assignee: '',
  dueDate: '',
  status: 'Not Started',
  priority: 'Medium',
  notes: '',
});
let updateIndex = -1;
function openUpdateModal(point) {
  updateForm.value = {
    action: point.action,
    assignee: point.assignee,
    dueDate: point.dueDate,
    status: point.status,
    priority: point.priority,
    notes: '',
  };
  updateIndex = actionPoints.findIndex(p => p.action === point.action && p.assignee === point.assignee);
  showUpdateModal.value = true;
}
function closeUpdateModal() {
  showUpdateModal.value = false;
  updateForm.value = { action: '', assignee: '', dueDate: '', status: 'Not Started', priority: 'Medium', notes: '' };
  updateIndex = -1;
}
function saveUpdate() {
  if (updateIndex !== -1) {
    actionPoints[updateIndex] = {
      ...actionPoints[updateIndex],
      action: updateForm.value.action,
      assignee: updateForm.value.assignee,
      dueDate: updateForm.value.dueDate,
      status: updateForm.value.status,
      priority: updateForm.value.priority,
    };
  }
  closeUpdateModal();
}

const showSettingsModal = ref(false);
const settingsForm = ref({
  action: '',
  assignee: '',
  dueDate: '',
  priority: '',
  enableReminders: false,
  reminderDays: '',
  overdueDays: '',
  notifyAssignee: false,
  notifyOrganizer: false,
  allowReassign: false,
  trackTime: false,
  requireApproval: false,
});
function openSettingsModal(point) {
  settingsForm.value = {
    action: point.action,
    assignee: point.assignee,
    dueDate: point.dueDate,
    priority: point.priority,
    enableReminders: false,
    reminderDays: '',
    overdueDays: '',
    notifyAssignee: false,
    notifyOrganizer: false,
    allowReassign: false,
    trackTime: false,
    requireApproval: false,
  };
  showSettingsModal.value = true;
}
function closeSettingsModal() {
  showSettingsModal.value = false;
}
</script> 