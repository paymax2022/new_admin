<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-2">
      <h1 class="text-2xl font-semibold">Meeting Management</h1>
      <div class="flex gap-2">
        <button class="border border-black text-black rounded px-4 py-2 flex items-center gap-2 text-sm font-medium bg-white hover:bg-gray-50" @click="openTemplatesModal">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
          Templates
        </button>
        <button class="bg-black text-white rounded px-4 py-2 flex items-center gap-2 text-sm font-medium" @click="openScheduleMeetingModal">
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
      <div class="font-semibold mb-2">Recent Meetings</div>
      <div class="overflow-x-auto">
        <table class="min-w-full text-sm">
          <thead>
            <tr class="text-left text-xs text-gray-500 border-b">
              <th class="py-2 pr-4">Meeting</th>
              <th class="py-2 pr-4">Date & Time</th>
              <th class="py-2 pr-4">Attendees</th>
              <th class="py-2 pr-4">Status</th>
              <th class="py-2 pr-4">Actions</th>
              <th class="py-2 pr-4">Operations</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="meeting in meetings" :key="meeting.id" class="border-b hover:bg-gray-50">
              <td class="py-2 pr-4">
                <div class="font-medium">{{ meeting.title }}</div>
                <div class="text-xs text-gray-400">{{ meeting.timeAgo }}</div>
              </td>
              <td class="py-2 pr-4">
                <div>{{ meeting.date }}</div>
                <div class="text-xs text-gray-400">{{ meeting.time }}</div>
              </td>
              <td class="py-2 pr-4">
                <a href="#" class="text-blue-600 underline">{{ meeting.attendees }}</a>
              </td>
              <td class="py-2 pr-4">
                <span v-if="meeting.status === 'Completed'" class="text-emerald-600 font-semibold">Completed</span>
                <span v-else-if="meeting.status === 'Upcoming'" class="text-blue-600 font-semibold">Upcoming</span>
                <span v-else class="text-purple-600 font-semibold">Scheduled</span>
              </td>
              <td class="py-2 pr-4">
                <span v-if="meeting.status === 'Completed'" class="text-emerald-600 font-semibold">{{ meeting.actions }}</span>
                <span v-else class="text-gray-400 font-semibold">{{ meeting.actions }}</span>
                <div class="w-24 h-2 bg-gray-200 rounded mt-1">
                  <div :class="meeting.status === 'Completed' ? 'bg-emerald-500' : 'bg-gray-300'" class="h-2 rounded" :style="{ width: meeting.progress }"></div>
                </div>
              </td>
              <td class="py-2 pr-4 flex gap-2 items-center">
                <button class="text-gray-500 hover:text-black" title="View" @click="openMeetingDetailsModal(meeting)"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg></button>
                <button class="text-gray-400 hover:text-black" title="Settings" @click="openMeetingSettingsModal(meeting)"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path stroke-linecap="round" stroke-linejoin="round" d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 007.1 19a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 003 15.9V15a1.65 1.65 0 00-1.51-1A1.65 1.65 0 002 12a2 2 0 012-2h.09A1.65 1.65 0 005 7.1a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 007.1 5H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09A1.65 1.65 0 0017 5a1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019 7.1V9c0 .63.37 1.19.91 1.51H21a2 2 0 012 2 2 2 0 01-2 2h-.09A1.65 1.65 0 0019 15z"/></svg></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div v-if="showScheduleMeetingModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div class="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg relative">
      <button class="absolute top-3 right-3 text-gray-400 hover:text-gray-700" @click="closeScheduleMeetingModal">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
      <h2 class="text-xl font-semibold mb-4">Create New Meeting</h2>
      <div class="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium mb-1">Meeting Title</label>
          <input v-model="newMeeting.title" class="w-full border rounded px-3 py-2 text-sm" placeholder="Enter meeting title" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Meeting Type</label>
          <select v-model="newMeeting.type" class="w-full border rounded px-3 py-2 text-sm">
            <option disabled value="">Select type</option>
            <option>Board</option>
            <option>Committee</option>
            <option>Planning</option>
          </select>
        </div>
      </div>
      <div class="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium mb-1">Date</label>
          <input v-model="newMeeting.date" type="date" class="w-full border rounded px-3 py-2 text-sm" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Time</label>
          <input v-model="newMeeting.time" type="time" class="w-full border rounded px-3 py-2 text-sm" />
        </div>
      </div>
      <div class="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium mb-1">Calendar Group</label>
          <input v-model="newMeeting.group" class="w-full border rounded px-3 py-2 text-sm" placeholder="Conference room or Team link" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Location</label>
          <input v-model="newMeeting.location" class="w-full border rounded px-3 py-2 text-sm" placeholder="Enter location" />
        </div>
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium mb-1">Description</label>
        <textarea v-model="newMeeting.description" class="w-full border rounded px-3 py-2 text-sm" placeholder="Meeting description and objectives"></textarea>
      </div>
      <div class="mb-6">
        <label class="block text-sm font-medium mb-1">Attendees</label>
        <input v-model="newMeeting.attendees" class="w-full border rounded px-3 py-2 text-sm" placeholder="Add attendees (Comma separated)" />
      </div>
      <div class="flex gap-2">
        <button class="bg-black text-white px-4 py-2 rounded w-full" @click="scheduleMeeting">Schedule Meeting</button>
        <button class="border px-4 py-2 rounded w-full" @click="closeScheduleMeetingModal">Cancel</button>
      </div>
    </div>
  </div>
  <div v-if="showMeetingDetailsModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div class="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl relative">
      <button class="absolute top-3 right-3 text-gray-400 hover:text-gray-700" @click="closeMeetingDetailsModal">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
      <h2 class="text-xl font-semibold mb-2">{{ meetingDetails.title }}</h2>
      <div class="mb-4 flex flex-wrap gap-6 text-xs text-gray-500">
        <div class="flex items-center gap-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
          {{ meetingDetails.date }}
        </div>
        <div class="flex items-center gap-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="10"/></svg>
          {{ meetingDetails.time }} ({{ meetingDetails.timeAgo }})
        </div>
        <div class="flex items-center gap-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
          4 attendees
        </div>
        <div class="flex items-center gap-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-6"/></svg>
          3/5 actions completed
        </div>
      </div>
      <div class="border-b flex gap-6 mb-4">
        <button class="pb-2 px-2 font-medium" :class="meetingTab==='Agenda' ? 'border-b-2 border-black' : 'text-gray-400'" @click="meetingTab='Agenda'">Agenda</button>
        <button class="pb-2 px-2 font-medium" :class="meetingTab==='Attendees' ? 'border-b-2 border-black' : 'text-gray-400'" @click="meetingTab='Attendees'">Attendees</button>
        <button class="pb-2 px-2 font-medium" :class="meetingTab==='Action Items' ? 'border-b-2 border-black' : 'text-gray-400'" @click="meetingTab='Action Items'">Action Items</button>
        <button class="pb-2 px-2 font-medium" :class="meetingTab==='Documents' ? 'border-b-2 border-black' : 'text-gray-400'" @click="meetingTab='Documents'">Documents</button>
      </div>
      <div v-if="meetingTab==='Agenda'">
        <div class="flex flex-col gap-2">
          <div class="flex items-center justify-between bg-gray-50 rounded px-3 py-2" v-for="(item, idx) in agendaItems" :key="idx">
            <div>
              <div class="font-medium">{{ idx+1 }}. {{ item.title }}</div>
              <div class="text-xs text-gray-500">Presenter: {{ item.presenter }}</div>
            </div>
            <span class="text-xs text-gray-400">{{ item.time }}</span>
          </div>
        </div>
      </div>
      <div v-else-if="meetingTab==='Attendees'">
        <div class="flex flex-col gap-2">
          <div class="bg-gray-50 rounded px-3 py-2">John Doe</div>
          <div class="bg-gray-50 rounded px-3 py-2">Sarah Wilson</div>
          <div class="bg-gray-50 rounded px-3 py-2">Mike Johnson</div>
          <div class="bg-gray-50 rounded px-3 py-2">Jane Smith</div>
        </div>
      </div>
      <div v-else-if="meetingTab==='Action Items'">
        <div class="flex flex-col gap-2">
          <div v-for="(item, idx) in actionItems" :key="idx" class="bg-gray-50 rounded px-3 py-2 flex flex-col md:flex-row md:items-center md:justify-between gap-1">
            <div>
              <div class="font-medium">{{ item.task }}</div>
              <div class="text-xs text-gray-500">Assigned to: {{ item.assignee }}, Due: {{ item.due }}</div>
            </div>
            <span
              class="text-xs font-semibold px-2 py-0.5 rounded"
              :class="{
                'bg-orange-100 text-orange-600': item.status === 'In Progress',
                'bg-emerald-100 text-emerald-600': item.status === 'Completed',
                'bg-gray-200 text-gray-500': item.status === 'Not Started',
              }"
            >
              {{ item.status }}
            </span>
          </div>
        </div>
      </div>
      <div v-else-if="meetingTab==='Documents'">
        <div class="flex flex-col gap-2">
          <div v-for="(doc, idx) in documents" :key="idx" class="bg-gray-50 rounded px-3 py-2 flex flex-col md:flex-row md:items-center md:justify-between gap-1">
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M7 7v10a2 2 0 002 2h6a2 2 0 002-2V7a2 2 0 00-2-2H9a2 2 0 00-2 2z"/></svg>
              <span class="font-medium">{{ doc.name }}</span>
              <span class="text-xs text-gray-400">{{ doc.size }}</span>
              <span class="text-xs px-2 py-0.5 rounded bg-gray-200 text-gray-600">{{ doc.tag }}</span>
            </div>
            <button class="text-xs text-blue-600 font-medium">View</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="showMeetingSettingsModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div class="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg relative">
      <button class="absolute top-3 right-3 text-gray-400 hover:text-gray-700" @click="closeMeetingSettingsModal">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
      <h2 class="text-lg font-semibold mb-4">Meeting Settings - {{ meetingSettings.title }}</h2>
      <div class="border-b flex gap-6 mb-4">
        <button class="pb-2 px-2 font-medium" :class="meetingSettingsTab==='General' ? 'border-b-2 border-black' : 'text-gray-400'" @click="meetingSettingsTab='General'">General</button>
        <button class="pb-2 px-2 font-medium" :class="meetingSettingsTab==='Notifications' ? 'border-b-2 border-black' : 'text-gray-400'" @click="meetingSettingsTab='Notifications'">Notifications</button>
        <button class="pb-2 px-2 font-medium" :class="meetingSettingsTab==='Permissions' ? 'border-b-2 border-black' : 'text-gray-400'" @click="meetingSettingsTab='Permissions'">Permissions</button>
        <button class="pb-2 px-2 font-medium" :class="meetingSettingsTab==='Advanced' ? 'border-b-2 border-black' : 'text-gray-400'" @click="meetingSettingsTab='Advanced'">Advanced</button>
      </div>
      <div v-if="meetingSettingsTab==='General'">
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Meeting Title</label>
          <input v-model="meetingSettings.title" class="w-full border rounded px-3 py-2 text-sm" />
        </div>
        <div class="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-1">Date</label>
            <input v-model="meetingSettings.date" type="date" class="w-full border rounded px-3 py-2 text-sm" />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Time</label>
            <input v-model="meetingSettings.time" type="time" class="w-full border rounded px-3 py-2 text-sm" />
          </div>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Location/Meeting Link</label>
          <input v-model="meetingSettings.location" class="w-full border rounded px-3 py-2 text-sm" />
        </div>
        <div class="mb-6">
          <label class="block text-sm font-medium mb-1">Description</label>
          <textarea v-model="meetingSettings.description" class="w-full border rounded px-3 py-2 text-sm"></textarea>
        </div>
        <div class="flex gap-2">
          <button class="bg-black text-white px-4 py-2 rounded w-full" @click="saveMeetingSettings">Save Changes</button>
          <button class="border px-4 py-2 rounded w-full" @click="closeMeetingSettingsModal">Cancel</button>
        </div>
      </div>
      <div v-else-if="meetingSettingsTab==='Notifications'">
        <div class="mb-6">
          <div class="font-medium mb-2">Basic Information</div>
          <div class="mb-4">
            <div class="flex items-center justify-between mb-2">
              <span class="font-medium text-sm">Email Reminders</span>
              <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="notificationSettings.emailReminders" class="sr-only peer" />
                <div class="w-10 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-black transition"></div>
              </label>
            </div>
            <div class="text-xs text-gray-500 mb-2">Send email reminders to attendees</div>
            <div v-if="notificationSettings.emailReminders" class="flex flex-col gap-2 ml-4">
              <label class="flex items-center gap-2">
                <input type="checkbox" v-model="notificationSettings.reminderTimes['24h']" />
                24 hours before
              </label>
              <label class="flex items-center gap-2">
                <input type="checkbox" v-model="notificationSettings.reminderTimes['1h']" />
                1 hour before
              </label>
              <label class="flex items-center gap-2">
                <input type="checkbox" v-model="notificationSettings.reminderTimes['15m']" />
                15 minutes before
              </label>
            </div>
          </div>
          <div class="flex items-center justify-between mb-2">
            <span class="font-medium text-sm">SMS Reminders</span>
            <label class="inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="notificationSettings.smsReminders" class="sr-only peer" />
              <div class="w-10 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-black transition"></div>
            </label>
          </div>
          <div class="text-xs text-gray-500 mb-4">Send SMS reminders to attendees</div>
        </div>
        <div class="flex gap-2">
          <button class="bg-black text-white px-4 py-2 rounded w-full" @click="saveMeetingSettings">Save</button>
          <button class="border px-4 py-2 rounded w-full" @click="closeMeetingSettingsModal">Cancel</button>
        </div>
      </div>
      <div v-else-if="meetingSettingsTab==='Permissions'">
        <div class="mb-6">
          <div class="font-medium mb-2">Advanced Settings</div>
          <div class="flex items-center justify-between mb-4">
            <span class="font-medium text-sm">Record Meeting</span>
            <label class="inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="permissionsSettings.recordMeeting" class="sr-only peer" />
              <div class="w-10 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-black transition"></div>
            </label>
          </div>
          <div class="flex items-center justify-between mb-4">
            <span class="font-medium text-sm">Auto-Generate Minutes</span>
            <label class="inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="permissionsSettings.autoMinutes" class="sr-only peer" />
              <div class="w-10 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-black transition"></div>
            </label>
          </div>
          <div class="font-medium mb-2">Meeting Integration</div>
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm">Calendar Sync</span>
            <label class="inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="permissionsSettings.calendarSync" class="sr-only peer" />
              <div class="w-10 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-black transition"></div>
            </label>
          </div>
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm">Slack Notifications</span>
            <label class="inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="permissionsSettings.slack" class="sr-only peer" />
              <div class="w-10 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-black transition"></div>
            </label>
          </div>
          <div class="flex items-center justify-between mb-4">
            <span class="text-sm">Teams Integration</span>
            <label class="inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="permissionsSettings.teams" class="sr-only peer" />
              <div class="w-10 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-black transition"></div>
            </label>
          </div>
          <div class="border border-red-200 bg-red-50 rounded p-4 mt-6">
            <div class="font-semibold text-red-600 mb-2">Danger Zone</div>
            <div class="flex flex-col gap-2">
              <div class="flex items-center justify-between">
                <div>
                  <div class="font-medium text-sm text-red-600">Cancel Meeting</div>
                  <div class="text-xs text-gray-500">Cancels this meeting and notifies all attendees.</div>
                </div>
                <button class="border border-red-400 text-red-600 rounded px-4 py-1 font-medium">Cancel Meeting</button>
              </div>
              <div class="flex items-center justify-between">
                <div>
                  <div class="font-medium text-sm text-red-600">Delete Meeting</div>
                  <div class="text-xs text-gray-500">Permanently delete this meeting and all related data.</div>
                </div>
                <button class="border border-red-400 text-red-600 rounded px-4 py-1 font-medium">Delete</button>
              </div>
            </div>
          </div>
        </div>
        <div class="flex gap-2 mt-4">
          <button class="bg-black text-white px-4 py-2 rounded w-full" @click="saveMeetingSettings">Save Changes</button>
          <button class="border px-4 py-2 rounded w-full" @click="closeMeetingSettingsModal">Cancel</button>
        </div>
      </div>
      <div v-else>
        <div class="text-xs text-gray-400">{{ meetingSettingsTab }} (Coming Soon)</div>
      </div>
    </div>
  </div>
  <div v-if="showTemplatesModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div class="bg-white rounded-xl shadow-lg p-8 w-full max-w-3xl relative">
      <button class="absolute top-3 right-3 text-gray-400 hover:text-gray-700" @click="closeTemplatesModal">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
      <div class="flex justify-between items-center mb-2">
        <h2 class="text-xl font-semibold">Meeting Templates</h2>
        <button class="bg-black text-white rounded px-4 py-2 flex items-center gap-2 text-sm font-medium"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg> Create Template</button>
      </div>
      <div class="text-sm text-gray-500 mb-4">Choose from pre-built templates or create your own custom template</div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div v-for="template in meetingTemplates" :key="template.name" class="border rounded-xl p-5 bg-gray-50 flex flex-col gap-2 relative">
          <div class="flex items-center gap-2 mb-1">
            <span class="text-xs font-semibold px-2 py-1 rounded-full" :class="template.tagColor">{{ template.tag }}</span>
            <span class="text-xs text-gray-400">Template</span>
          </div>
          <div class="font-semibold">{{ template.name }}</div>
          <div class="text-xs text-gray-500 mb-1">{{ template.description }}</div>
          <div class="text-xs text-gray-400 mb-1">{{ template.duration }} • {{ template.sections.length }} sections</div>
          <div class="text-xs font-medium mb-1">Agenda Sections:</div>
          <ul class="text-xs mb-2 ml-4 list-disc">
            <li v-for="section in template.sections" :key="section" v-html="section"></li>
          </ul>
          <div class="flex gap-2 mt-auto">
            <button class="bg-black text-white px-3 py-1 rounded text-xs font-medium">Use Template</button>
            <button class="border px-3 py-1 rounded text-xs font-medium" @click="openTemplatePreviewModal(template)">Preview</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="showTemplatePreviewModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div class="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl relative">
      <button class="absolute top-3 right-3 text-gray-400 hover:text-gray-700" @click="closeTemplatePreviewModal">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
      <div class="font-semibold text-lg mb-4">Template Preview</div>
      <div class="mb-4 p-4 rounded-lg" :class="selectedTemplate?.tagColor + ' bg-opacity-30'">
        <div class="font-semibold text-base mb-1">{{ selectedTemplate?.name }} Template</div>
        <div class="text-xs text-gray-500 mb-1" v-html="selectedTemplate?.description"></div>
        <div class="flex gap-4 text-xs text-gray-600">
          <span><svg class="inline w-4 h-4 mr-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>{{ selectedTemplate?.duration }}</span>
          <span><svg class="inline w-4 h-4 mr-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/></svg>{{ selectedTemplate?.sections.length }} agenda sections</span>
          <span><svg class="inline w-4 h-4 mr-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M16 12h2a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6a2 2 0 012-2h2"/></svg>Suitable for committee meetings</span>
        </div>
      </div>
      <div class="mb-4">
        <div class="font-semibold mb-2">Meeting Structure Preview</div>
        <div class="text-xs text-gray-500 mb-2">Meeting Type: Committee</div>
        <div class="text-xs text-gray-500 mb-2">Recommended: 1-2 hours, 4 agenda sections</div>
        <div class="font-medium mb-1">Agenda Sections:</div>
        <div class="flex flex-col gap-2 mb-2">
          <div v-for="section in selectedTemplate?.sections" :key="section" class="flex items-center justify-between border-b pb-1">
            <span>{{ section.replace(/<[^>]+>/g, '') }}</span>
            <svg class="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 20h9"/><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 3.5a2.121 2.121 0 113 3L7 19.5 3 21l1.5-4L16.5 3.5z"/></svg>
          </div>
        </div>
      </div>
      <div class="mb-4">
        <div class="font-medium mb-1">Template Benefits:</div>
        <div class="flex flex-col gap-1 text-xs">
          <div class="flex items-center gap-2"><span class="text-green-500">●</span> Structured For Efficiency <span class="text-gray-400">Pre-defined agenda and time allocations</span></div>
          <div class="flex items-center gap-2"><span class="text-red-500">●</span> Clear Objectives <span class="text-gray-400">Well-defined goals for each meeting section</span></div>
        </div>
      </div>
      <div class="flex gap-2 mt-4">
        <button class="bg-black text-white px-4 py-2 rounded w-full">Join & Use Template</button>
        <button class="border px-4 py-2 rounded w-full" @click="closeTemplatePreviewModal">Exit Preview</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const meetings = [
  { id: 1, title: 'Board Meeting - Q1 Review', timeAgo: '2 hours', date: '2024-03-15', time: '10:00 AM', attendees: 'TCHEHFY+2', status: 'Completed', actions: '3/5 completed', progress: '60%' },
  { id: 2, title: 'Member Engagement Committee', timeAgo: '15 hours', date: '2024-03-18', time: '2:04 PM', attendees: 'ANCVEF', status: 'Upcoming', actions: '0/0 completed', progress: '0%' },
  { id: 3, title: 'Annual Budget Planning', timeAgo: '3 hours', date: '2024-03-20', time: '9:01 AM', attendees: 'TCHEHFY+2', status: 'Scheduled', actions: '0/0 completed', progress: '0%' },
  { id: 4, title: 'Board Meeting', timeAgo: '3 hours', date: '2024-03-20', time: '9:00 AM', attendees: 'TCHEHFY+2', status: 'Scheduled', actions: '0/0 completed', progress: '0%' },
];

const showScheduleMeetingModal = ref(false);
const newMeeting = ref({
  title: '',
  type: '',
  date: '',
  time: '',
  group: '',
  location: '',
  description: '',
  attendees: '',
});

function openScheduleMeetingModal() {
  showScheduleMeetingModal.value = true;
}

function closeScheduleMeetingModal() {
  showScheduleMeetingModal.value = false;
}

function scheduleMeeting() {
  // For demo: just close modal. Add logic to add meeting if needed.
  closeScheduleMeetingModal();
}

const showMeetingDetailsModal = ref(false);
const meetingDetails = ref<any>({});
const meetingTab = ref('Agenda');
const agendaItems = ref([
  { title: 'Welcome & Opening Remarks', presenter: 'John Doe', time: '10 min' },
  { title: 'Financial Review Q1', presenter: 'Sarah Wilson', time: '20 min' },
  { title: 'Membership Growth Strategy', presenter: 'Mike Johnson', time: '15 min' },
  { title: 'Action Items & Next Steps', presenter: 'John Doe', time: '15 min' },
]);

function openMeetingDetailsModal(meeting: any) {
  meetingDetails.value = meeting;
  showMeetingDetailsModal.value = true;
  meetingTab.value = 'Agenda';
}

function closeMeetingDetailsModal() {
  showMeetingDetailsModal.value = false;
  meetingDetails.value = {};
}

const actionItems = ref([
  {
    task: 'Review membership growth strategy',
    assignee: 'John Doe',
    due: '2024-07-23',
    status: 'In Progress',
  },
  {
    task: 'Update payment processing documentation',
    assignee: 'Mike Johnson',
    due: '2024-07-25',
    status: 'Completed',
  },
  {
    task: 'Organize Q2 member survey',
    assignee: 'Sarah Wilson',
    due: '2024-07-30',
    status: 'Not Started',
  },
]);

const documents = ref([
  {
    name: 'Q1_Financial_Report.pdf',
    size: '2.4 MB',
    tag: 'Financial',
  },
  {
    name: 'Meeting_Minutes.docx',
    size: '1.2 MB',
    tag: 'Minutes',
  },
  {
    name: 'Growth_Strategy_Presentation.pptx',
    size: '5.1 MB',
    tag: 'Presentation',
  },
]);

const showMeetingSettingsModal = ref(false);
const meetingSettings = ref<any>({});
const meetingSettingsTab = ref('General');
const notificationSettings = ref({
  emailReminders: false,
  smsReminders: false,
  reminderTimes: {
    '24h': false,
    '1h': false,
    '15m': false,
  },
});
const permissionsSettings = ref({
  recordMeeting: false,
  autoMinutes: false,
  calendarSync: false,
  slack: false,
  teams: false,
});

function openMeetingSettingsModal(meeting: any) {
  meetingSettings.value = { ...meeting };
  showMeetingSettingsModal.value = true;
  meetingSettingsTab.value = 'General';
}
function closeMeetingSettingsModal() {
  showMeetingSettingsModal.value = false;
  meetingSettings.value = {};
}
function saveMeetingSettings() {
  // For demo: just close modal. Add logic to save settings if needed.
  closeMeetingSettingsModal();
}

const showTemplatesModal = ref(false);
function openTemplatesModal() {
  showTemplatesModal.value = true;
}
function closeTemplatesModal() {
  showTemplatesModal.value = false;
}
const meetingTemplates = [
  {
    name: 'Board Meeting',
    tag: 'Governance',
    tagColor: 'bg-purple-100 text-purple-700',
    description: 'Standard board meeting with financial review and strategic discussions',
    duration: '2-3 hours',
    sections: [
      'Opening Remarks',
      'Financial Review',
      'Strategic Planning',
      'Action Items',
    ],
  },
  {
    name: 'Committee Meeting',
    tag: 'Committee',
    tagColor: 'bg-blue-100 text-blue-700',
    description: '<b>General committee meeting for project updates and planning</b>',
    duration: '1-2 hours',
    sections: [
      'Welcome',
      '<b>Previous Minutes</b>',
      '<b>Project Updates</b>',
      'New Business',
    ],
  },
  {
    name: 'Planning Session',
    tag: 'Planning',
    tagColor: 'bg-green-100 text-green-700',
    description: 'Strategic planning and goal-setting session',
    duration: '3-4 hours',
    sections: [
      'Objectives Review',
      'Goal Setting',
      'Strategy Planning',
      'Action Planning',
    ],
  },
  {
    name: 'Quick Standup',
    tag: 'Standup',
    tagColor: 'bg-yellow-100 text-yellow-700',
    description: 'Brief team standup for updates and blockers',
    duration: '30 minutes',
    sections: [
      'Progress Updates',
      'Blockers',
      'Next Steps',
    ],
  },
];

const showTemplatePreviewModal = ref(false);
const selectedTemplate = ref<any>(null);
function openTemplatePreviewModal(template) {
  selectedTemplate.value = template;
  showTemplatePreviewModal.value = true;
}
function closeTemplatePreviewModal() {
  showTemplatePreviewModal.value = false;
  selectedTemplate.value = null;
}
</script> 