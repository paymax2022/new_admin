<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-2">
      <div>
        <h1 class="text-2xl font-semibold">Event Management</h1>
        <div class="text-sm text-gray-500">Manage events, RSVPs, check-ins, and analytics</div>
      </div>
      <button
        v-if="activeTab === 'Event List'"
        class="bg-black text-white rounded px-4 py-2 flex items-center gap-2 text-sm font-medium"
        @click="openCreateEventModal"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
        </svg>
        Create event
      </button>
      <button
        v-else-if="activeTab === 'RSVP Management'"
        class="bg-black text-white rounded px-4 py-2 flex items-center gap-2 text-sm font-medium"
        @click="openSendRsvpModal"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16 8v8M8 16h8M8 8h8"/>
        </svg>
        Send RSVP
      </button>
    </div>
    <div class="flex gap-6 border-b mb-4 mt-4">
      <button :class="['pb-2 px-2 font-medium', activeTab === 'Event List' ? 'border-b-2 border-black' : 'text-gray-400']" @click="activeTab = 'Event List'">Event List</button>
      <button :class="['pb-2 px-2 font-medium', activeTab === 'RSVP Management' ? 'border-b-2 border-black' : 'text-gray-400']" @click="activeTab = 'RSVP Management'">RSVP Management</button>
      <button :class="['pb-2 px-2 font-medium', activeTab === 'Check-in' ? 'border-b-2 border-black' : 'text-gray-400']" @click="activeTab = 'Check-in'">Check-in</button>
      <button :class="['pb-2 px-2 font-medium', activeTab === 'Analytics' ? 'border-b-2 border-black' : 'text-gray-400']" @click="activeTab = 'Analytics'">Analytics</button>
    </div>
    <div v-if="activeTab === 'Event List'">
      <div class="text-xs text-gray-400 mb-2">Event List</div>
      <input type="text" class="w-full border rounded px-3 py-2 text-sm mb-4" placeholder="Search events..." v-model="search" />
      <div class="overflow-x-auto">
        <table class="min-w-full text-sm">
          <thead>
            <tr class="text-left text-xs text-gray-500 border-b">
              <th class="py-2 pr-4">Event</th>
              <th class="py-2 pr-4">Date & Time</th>
              <th class="py-2 pr-4">Location</th>
              <th class="py-2 pr-4">Type</th>
              <th class="py-2 pr-4">Status</th>
              <th class="py-2 pr-4">Attendance</th>
              <th class="py-2 pr-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="event in filteredEvents" :key="event.id" class="border-b hover:bg-gray-50">
              <td class="py-2 pr-4">
                <div class="font-medium">{{ event.name }}</div>
                <div class="text-xs text-gray-400">#{{ event.id }}</div>
              </td>
              <td class="py-2 pr-4">
                <div>{{ event.date }}</div>
                <div class="text-xs text-gray-400">{{ event.time }}</div>
              </td>
              <td class="py-2 pr-4">{{ event.location }}</td>
              <td class="py-2 pr-4">{{ event.type }}</td>
              <td class="py-2 pr-4">
                <span v-if="event.status === 'Upcoming'" class="text-blue-600 font-semibold cursor-pointer">Upcoming</span>
                <span v-else-if="event.status === 'Open'" class="text-green-600 font-semibold cursor-pointer">Open</span>
                <span v-else-if="event.status === 'Completed'" class="text-gray-600 font-semibold cursor-pointer">Completed</span>
                <span v-else-if="event.status === 'Draft'" class="text-yellow-600 font-semibold cursor-pointer">Draft</span>
              </td>
              <td class="py-2 pr-4">
                <div>{{ event.attended }}/{{ event.capacity }} attended</div>
                <div class="text-xs text-gray-400">{{ event.rsvps }} RSVPs</div>
              </td>
              <td class="py-2 pr-4 flex gap-2">
                <button class="text-gray-500 hover:text-black" title="View" @click="openEventDetailsModal(event)"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg></button>
                <button class="text-gray-500 hover:text-black" title="Edit" @click="openEditEventModal(event)"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6-6m2 2l-6 6m-2 2h6"/></svg></button>
                <button class="text-gray-500 hover:text-red-600" title="Delete" @click="openDeleteEventModal(event)"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-else-if="activeTab === 'RSVP Management'">
      <div class="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div class="bg-white border rounded-xl p-4 flex flex-col items-center">
          <div class="text-2xl font-bold text-blue-600">4</div>
          <div class="text-xs text-gray-500 mt-1">Total Registered</div>
        </div>
        <div class="bg-white border rounded-xl p-4 flex flex-col items-center">
          <div class="text-2xl font-bold text-green-600">3</div>
          <div class="text-xs text-gray-500 mt-1">Checked In</div>
        </div>
        <div class="bg-white border rounded-xl p-4 flex flex-col items-center">
          <div class="text-2xl font-bold text-red-600">1</div>
          <div class="text-xs text-gray-500 mt-1">Pending</div>
        </div>
        <div class="bg-white border rounded-xl p-4 flex flex-col items-center">
          <div class="text-2xl font-bold text-purple-600">95.2%</div>
          <div class="text-xs text-gray-500 mt-1">Total Guests</div>
        </div>
      </div>
      <div class="flex items-center mb-4 gap-2">
        <input type="text" class="w-full border rounded px-3 py-2 text-sm" placeholder="Search by name, email or ticket ID..." v-model="rsvpSearch" />
        <button class="border border-black text-black rounded px-2 py-1 flex items-center gap-1 text-xs font-medium bg-white hover:bg-gray-50" style="min-width: 0; height: 32px;" @click="openManualCheckInModal">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
          </svg>
          Manual Check In
        </button>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full text-sm">
          <thead>
            <tr class="text-left text-xs text-gray-500 border-b">
              <th class="py-2 pr-4">Attendee</th>
              <th class="py-2 pr-4">Ticket ID</th>
              <th class="py-2 pr-4">Status</th>
              <th class="py-2 pr-4">Check-in Time</th>
              <th class="py-2 pr-4">Guests</th>
              <th class="py-2 pr-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="attendee in filteredRsvpAttendees" :key="attendee.id" class="border-b hover:bg-gray-50">
              <td class="py-2 pr-4">
                <div class="font-medium">{{ attendee.name }}</div>
                <div class="text-xs text-gray-400">{{ attendee.email }}</div>
              </td>
              <td class="py-2 pr-4">{{ attendee.ticketId }}</td>
              <td class="py-2 pr-4">
                <span v-if="attendee.status === 'Checked In'" class="text-green-600 font-semibold">Checked In</span>
                <span v-else class="text-yellow-600 font-semibold">Pending</span>
              </td>
              <td class="py-2 pr-4">{{ attendee.checkInTime || '-' }}</td>
              <td class="py-2 pr-4">{{ attendee.guests }}</td>
              <td class="py-2 pr-4">
                <template v-if="attendee.status === 'Checked In'">
                  <span class="inline-flex items-center gap-1 text-green-600 font-semibold">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                    Checked In
                  </span>
                </template>
                <template v-else>
                  <button class="bg-green-600 text-white px-4 py-1 rounded" @click="checkInAttendee(attendee)">Check In</button>
                </template>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-else-if="activeTab === 'Analytics'">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div class="bg-white border rounded-xl p-4 flex flex-col items-center">
          <svg class="w-7 h-7 mb-1 text-blue-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
          <div class="text-2xl font-bold text-blue-600">33</div>
          <div class="text-xs text-gray-500 mt-1">Total Events</div>
          <div class="text-xs text-blue-400 mt-1">+12% from last month</div>
        </div>
        <div class="bg-white border rounded-xl p-4 flex flex-col items-center">
          <svg class="w-7 h-7 mb-1 text-green-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
          <div class="text-2xl font-bold text-green-600">2,210</div>
          <div class="text-xs text-gray-500 mt-1">Total Attendance</div>
          <div class="text-xs text-green-400 mt-1">+8% from last month</div>
        </div>
        <div class="bg-white border rounded-xl p-4 flex flex-col items-center">
          <svg class="w-7 h-7 mb-1 text-purple-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-6"/></svg>
          <div class="text-2xl font-bold text-purple-600">78%</div>
          <div class="text-xs text-gray-500 mt-1">Avg. Attendance Rate</div>
          <div class="text-xs text-purple-400 mt-1">+3% from last month</div>
        </div>
        <div class="bg-white border rounded-xl p-4 flex flex-col items-center">
          <svg class="w-7 h-7 mb-1 text-yellow-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polygon points="12 2 15 8.5 22 9.3 17 14.1 18.2 21 12 17.8 5.8 21 7 14.1 2 9.3 9 8.5 12 2"/></svg>
          <div class="text-2xl font-bold text-yellow-500">4.5</div>
          <div class="text-xs text-gray-500 mt-1">Avg. Satisfaction</div>
          <div class="text-xs text-yellow-400 mt-1">+0.2 from last month</div>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div class="bg-white border rounded-xl p-4">
          <div class="font-semibold text-sm mb-2">Monthly Attendance Trends</div>
          <Bar :data="barData" :options="barOptions" class="h-48" />
        </div>
        <div class="bg-white border rounded-xl p-4">
          <div class="font-semibold text-sm mb-2">Event Types Distribution</div>
          <Pie :data="pieData" :options="pieOptions" class="h-48" />
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-white border rounded-xl p-4">
          <div class="font-semibold text-sm mb-2">Satisfaction Trends</div>
          <Line :data="lineData" :options="lineOptions" class="h-40" />
        </div>
        <div class="bg-white border rounded-xl p-4">
          <div class="font-semibold text-sm mb-2">Top Performing Events</div>
          <div class="flex flex-col gap-2 mt-2">
            <div class="flex items-center justify-between">
              <div>
                <div class="font-semibold">Annual General Meeting</div>
                <div class="text-xs text-gray-500">2024-01-15</div>
                <div class="text-xs text-gray-400">85% RSVP rate</div>
              </div>
              <div class="flex items-center gap-1">
                <span class="text-yellow-500 font-bold">4.8</span>
                <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.386-2.46a1 1 0 00-1.175 0l-3.386 2.46c-.784.57-1.838-.196-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118l-3.385-2.46c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z"/></svg>
                <span class="text-xs text-green-600 font-semibold">95% full</span>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <div>
                <div class="font-semibold">Community Workshop</div>
                <div class="text-xs text-gray-500">2024-01-20</div>
                <div class="text-xs text-gray-400">88% RSVP rate</div>
              </div>
              <div class="flex items-center gap-1">
                <span class="text-yellow-500 font-bold">4.6</span>
                <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.386-2.46a1 1 0 00-1.175 0l-3.386 2.46c-.784.57-1.838-.196-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118l-3.385-2.46c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z"/></svg>
                <span class="text-xs text-green-600 font-semibold">88% full</span>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <div>
                <div class="font-semibold">Networking Event</div>
                <div class="text-xs text-gray-500">2024-01-10</div>
                <div class="text-xs text-gray-400">81% RSVP rate</div>
              </div>
              <div class="flex items-center gap-1">
                <span class="text-yellow-500 font-bold">4.2</span>
                <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.386-2.46a1 1 0 00-1.175 0l-3.386 2.46c-.784.57-1.838-.196-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118l-3.385-2.46c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z"/></svg>
                <span class="text-xs text-green-600 font-semibold">81% full</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="text-xs text-gray-400 mb-2">{{ activeTab }} (Coming Soon)</div>
    </div>
  </div>
  <div v-if="showCreateEventModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div class="bg-white rounded-xl shadow-lg p-8 w-full max-w-xl relative">
      <button class="absolute top-3 right-3 text-gray-400 hover:text-gray-700" @click="closeCreateEventModal">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
      <h2 class="text-xl font-semibold mb-4">Create New Event</h2>
      <div class="mb-4">
        <label class="block text-sm font-medium mb-1">Event Title</label>
        <input v-model="newEvent.title" class="w-full border rounded px-3 py-2 text-sm" placeholder="Enter event title" />
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium mb-1">Description</label>
        <input v-model="newEvent.description" class="w-full border rounded px-3 py-2 text-sm" placeholder="Describe your event" />
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium mb-1">Event Date</label>
        <input v-model="newEvent.date" type="date" class="w-full border rounded px-3 py-2 text-sm" />
      </div>
      <div class="mb-4 flex gap-4">
        <div class="flex-1">
          <label class="block text-sm font-medium mb-1">Start Time</label>
          <input v-model="newEvent.startTime" type="time" class="w-full border rounded px-3 py-2 text-sm" />
        </div>
        <div class="flex-1">
          <label class="block text-sm font-medium mb-1">End Time</label>
          <input v-model="newEvent.endTime" type="time" class="w-full border rounded px-3 py-2 text-sm" />
        </div>
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium mb-1">Location</label>
        <input v-model="newEvent.location" class="w-full border rounded px-3 py-2 text-sm" placeholder="Enter event location" />
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium mb-1">Maximum Capacity</label>
        <input v-model="newEvent.capacity" type="number" min="1" class="w-full border rounded px-3 py-2 text-sm" placeholder="Enter max attendees" />
      </div>
      <div class="mb-6">
        <div class="font-medium mb-2">Event Settings:</div>
        <div class="flex flex-col gap-2">
          <label class="flex items-center gap-2">
            <input type="checkbox" v-model="newEvent.hideRsvp" />
            Hide RSVP
          </label>
          <label class="flex items-center gap-2">
            <input type="checkbox" v-model="newEvent.allowWaitlist" />
            Allow Waitlist
          </label>
          <label class="flex items-center gap-2">
            <input type="checkbox" v-model="newEvent.sendReminders" />
            Send Reminders
          </label>
          <label class="flex items-center gap-2">
            <input type="checkbox" v-model="newEvent.publicEvent" />
            Public Event
          </label>
        </div>
      </div>
      <div class="flex gap-2">
        <button class="bg-black text-white px-4 py-2 rounded" @click="createEvent">Create Event</button>
        <button class="border px-4 py-2 rounded" @click="closeCreateEventModal">Cancel</button>
      </div>
    </div>
  </div>
  <div v-if="showEventDetailsModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div class="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg relative">
      <button class="absolute top-3 right-3 text-gray-400 hover:text-gray-700" @click="closeEventDetailsModal">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
      <div v-if="selectedEvent">
        <div class="flex items-center justify-between mb-2">
          <h2 class="text-xl font-semibold">Event Details</h2>
          <span v-if="selectedEvent.status === 'Upcoming'" class="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-semibold">Upcoming</span>
          <span v-else-if="selectedEvent.status === 'Open'" class="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-semibold">Open</span>
          <span v-else-if="selectedEvent.status === 'Completed'" class="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 font-semibold">Completed</span>
          <span v-else-if="selectedEvent.status === 'Draft'" class="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 font-semibold">Draft</span>
        </div>
        <div class="font-semibold text-lg mb-1">{{ selectedEvent.name }}</div>
        <div class="text-xs text-gray-400 mb-4">Event ID: #{{ selectedEvent.id }}</div>
        <div class="flex gap-6 mb-4">
          <div class="flex flex-col gap-3 flex-1">
            <div class="flex items-center gap-2 text-sm">
              <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              <span>{{ selectedEvent.date }} at {{ selectedEvent.time }}</span>
            </div>
            <div class="flex items-center gap-2 text-sm">
              <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 12.414a2 2 0 10-2.828 0l-4.243 4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              <span>{{ selectedEvent.location }}</span>
            </div>
            <div class="flex items-center gap-2 text-sm">
              <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path stroke-linecap="round" stroke-linejoin="round" d="M8 12h4v4"/></svg>
              <span>{{ selectedEvent.type }}</span>
            </div>
          </div>
          <div class="flex-1">
            <div class="font-semibold text-sm mb-2">Attendance Summary</div>
            <div class="flex flex-col gap-1 text-xs">
              <div class="flex justify-between"><span>Total Capacity:</span><span>{{ selectedEvent.capacity }}</span></div>
              <div class="flex justify-between"><span>RSVPs:</span><span>{{ selectedEvent.rsvps }}</span></div>
              <div class="flex justify-between"><span>Attended:</span><span>{{ selectedEvent.attended }}</span></div>
              <div class="flex justify-between"><span>Available Spots:</span><span>{{ selectedEvent.capacity - selectedEvent.rsvps }}</span></div>
            </div>
            <div class="mt-2">
              <button class="w-full text-xs px-2 py-1 rounded bg-gray-100 text-gray-700 font-semibold">Attendance Rate<br><span class="font-bold">{{ attendanceRate }}% of RSVPs attended</span></button>
            </div>
          </div>
        </div>
        <div class="mb-2">
          <div class="font-semibold text-sm mb-1">Event Description</div>
          <div class="text-xs text-gray-600">This is a sample event description. In a real implementation, this would contain the actual event details, agenda, reports, materials, and other relevant details.</div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="showEditEventModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div class="bg-white rounded-xl shadow-lg p-8 w-full max-w-xl relative">
      <button class="absolute top-3 right-3 text-gray-400 hover:text-gray-700" @click="closeEditEventModal">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
      <h2 class="text-xl font-semibold mb-4">Edit Event</h2>
      <div class="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium mb-1">Event Title</label>
          <input v-model="editEvent.title" class="w-full border rounded px-3 py-2 text-sm" placeholder="Enter event title" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Event Type</label>
          <select v-model="editEvent.type" class="w-full border rounded px-3 py-2 text-sm">
            <option>Meeting</option>
            <option>Workshop</option>
            <option>Social</option>
          </select>
        </div>
      </div>
      <div class="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium mb-1">Date</label>
          <input v-model="editEvent.date" type="date" class="w-full border rounded px-3 py-2 text-sm" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Time</label>
          <input v-model="editEvent.time" type="time" class="w-full border rounded px-3 py-2 text-sm" />
        </div>
      </div>
      <div class="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium mb-1">Location</label>
          <input v-model="editEvent.location" class="w-full border rounded px-3 py-2 text-sm" placeholder="Enter event location" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Capacity</label>
          <input v-model="editEvent.capacity" type="number" min="1" class="w-full border rounded px-3 py-2 text-sm" placeholder="Enter max attendees" />
        </div>
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium mb-1">Status</label>
        <select v-model="editEvent.status" class="w-full border rounded px-3 py-2 text-sm">
          <option>Upcoming</option>
          <option>Open</option>
          <option>Completed</option>
          <option>Draft</option>
        </select>
      </div>
      <div class="mb-6">
        <label class="block text-sm font-medium mb-1">Description</label>
        <textarea v-model="editEvent.description" class="w-full border rounded px-3 py-2 text-sm" placeholder="Event description"></textarea>
      </div>
      <div class="flex gap-2">
        <button class="bg-black text-white px-4 py-2 rounded w-full" @click="saveEditEvent">Save Changes</button>
        <button class="border px-4 py-2 rounded w-full" @click="closeEditEventModal">Cancel</button>
      </div>
    </div>
  </div>
  <div v-if="showDeleteEventModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div class="bg-white rounded-xl shadow-lg p-8 w-full max-w-xl relative">
      <button class="absolute top-3 right-3 text-gray-400 hover:text-gray-700" @click="closeDeleteEventModal">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
      <div class="flex items-center gap-2 mb-2">
        <svg class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"/></svg>
        <h2 class="text-xl font-semibold text-red-600">Delete Event</h2>
        <span v-if="deleteEvent.status === 'Upcoming'" class="ml-auto text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-semibold">Upcoming</span>
        <span v-else-if="deleteEvent.status === 'Open'" class="ml-auto text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-semibold">Open</span>
        <span v-else-if="deleteEvent.status === 'Completed'" class="ml-auto text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 font-semibold">Completed</span>
        <span v-else-if="deleteEvent.status === 'Draft'" class="ml-auto text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 font-semibold">Draft</span>
      </div>
      <div class="mb-2 text-sm">Are you sure you want to delete this event? This action cannot be undone.</div>
      <div class="font-semibold mb-1">{{ deleteEvent.title }}</div>
      <div class="flex items-center gap-2 text-xs text-gray-500 mb-1">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
        {{ deleteEvent.date }} at {{ deleteEvent.time }}
      </div>
      <div class="flex items-center gap-2 text-xs text-gray-500 mb-1">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 12.414a2 2 0 10-2.828 0l-4.243 4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
        {{ deleteEvent.location }}
      </div>
      <div class="flex items-center gap-2 text-xs text-gray-500 mb-3">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 10a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M19.07 4.93a10 10 0 11-14.14 0"/></svg>
        {{ deleteEvent.rsvps }} RSVPs, {{ deleteEvent.attended }} attended
      </div>
      <div class="mb-4">
        <div class="border border-red-400 bg-red-50 text-red-700 rounded px-3 py-2 text-xs">
          <strong>Warning: This event has {{ deleteEvent.rsvps }} RSVPs.</strong><br />
          Deleting this event will affect all registered attendees.
        </div>
      </div>
      <div class="flex gap-2">
        <button class="bg-red-600 text-white px-4 py-2 rounded w-full" @click="confirmDeleteEvent">Delete Event</button>
        <button class="border px-4 py-2 rounded w-full" @click="closeDeleteEventModal">Cancel</button>
      </div>
    </div>
  </div>
  <div v-if="showSendRsvpModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div class="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg relative">
      <button class="absolute top-3 right-3 text-gray-400 hover:text-gray-700" @click="closeSendRsvpModal">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
      <h2 class="text-xl font-semibold mb-4">Send RSVP Reminder</h2>
      <div class="mb-4">
        <div class="font-medium text-sm mb-1">Recipient</div>
        <div class="text-xs text-gray-500 mb-1">Multiple Recipients</div>
        <div class="text-xs text-gray-700 mb-1">bulk@operation.com</div>
        <div class="text-xs text-gray-400 mb-1">Status: Pending</div>
      </div>
      <div class="mb-4 grid grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-medium mb-1">Reminder Type</label>
          <select v-model="rsvpReminder.type" class="w-full border rounded px-3 py-2 text-sm">
            <option>Gentle Reminder</option>
            <option>Urgent Reminder</option>
          </select>
        </div>
        <div>
          <label class="block text-xs font-medium mb-1">Schedule</label>
          <select v-model="rsvpReminder.schedule" class="w-full border rounded px-3 py-2 text-sm">
            <option>Send Now</option>
            <option>Send in 1 hour</option>
            <option>Send Tomorrow</option>
          </select>
        </div>
      </div>
      <div class="mb-4">
        <label class="block text-xs font-medium mb-1">Message Preview</label>
        <div class="border rounded px-3 py-2 text-xs bg-blue-50 text-blue-700">
          Hi {{ rsvpReminder.name || '[name]' }}, we wanted to gently remind you about the upcoming {{ rsvpReminder.event || '[event]' }} on {{ rsvpReminder.date || '[date]' }}. We'd love to have you join us! Please confirm your attendance at your earliest convenience.
        </div>
      </div>
      <div class="mb-6">
        <label class="block text-xs font-medium mb-1">Custom Message (Optional)</label>
        <textarea v-model="rsvpReminder.custom" class="w-full border rounded px-3 py-2 text-sm" placeholder="Enter a custom reminder message..."></textarea>
        <div class="text-xs text-gray-400 mt-1">Leave empty to use the template above. Use {name}, {event}, {date} for dynamic content.</div>
      </div>
      <div class="flex gap-2">
        <button class="bg-black text-white px-4 py-2 rounded w-full" @click="sendRsvpReminder">Send Now</button>
        <button class="border px-4 py-2 rounded w-full" @click="closeSendRsvpModal">Cancel</button>
      </div>
    </div>
  </div>
  <div v-if="showManualCheckInModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div class="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
      <button class="absolute top-3 right-3 text-gray-400 hover:text-gray-700" @click="closeManualCheckInModal">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
      <h2 class="text-xl font-semibold mb-4">Manual Check-in</h2>
      <div class="mb-4">
        <div class="font-medium text-sm mb-1">Event Information</div>
        <div class="bg-indigo-50 rounded p-3 mb-2">
          <div class="font-semibold">Annual General Meeting</div>
          <div class="text-xs text-gray-500">2024-01-15</div>
          <div class="text-xs text-gray-500">Status: Active</div>
        </div>
      </div>
      <div class="mb-4">
        <label class="block text-xs font-medium mb-1">Search Attendee</label>
        <input type="text" class="w-full border rounded px-3 py-2 text-sm" placeholder="Search by name, email or ticket ID ..." v-model="manualCheckInSearch" @input="searchManualAttendee" />
      </div>
      <div v-if="manualSelectedAttendee" class="mb-4 bg-green-50 border border-green-200 rounded p-3 flex items-center justify-between">
        <div>
          <div class="font-semibold">{{ manualSelectedAttendee.name }}</div>
          <div class="text-xs text-gray-500 flex items-center gap-2">
            <svg class="w-4 h-4 inline" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16 12a4 4 0 01-8 0 4 4 0 018 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 14v2m0 4h.01"/></svg>
            {{ manualSelectedAttendee.email }}
          </div>
          <div class="text-xs text-gray-500">TKT - {{ manualSelectedAttendee.ticketId }}</div>
        </div>
        <button class="text-xs text-blue-600 border border-blue-600 rounded px-2 py-0.5 ml-4" @click="clearManualAttendee">Change</button>
      </div>
      <div v-if="manualSelectedAttendee" class="mb-4 grid grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-medium mb-1">Number of Guests</label>
          <input type="number" min="1" class="w-full border rounded px-3 py-2 text-sm" v-model="manualCheckInGuests" />
        </div>
        <div>
          <label class="block text-xs font-medium mb-1">Check-in Time</label>
          <input type="text" class="w-full border rounded px-3 py-2 text-sm" v-model="manualCheckInTime" />
        </div>
      </div>
      <div v-if="manualSelectedAttendee" class="mb-6">
        <label class="block text-xs font-medium mb-1">Notes (Optional)</label>
        <textarea class="w-full border rounded px-3 py-2 text-sm" v-model="manualCheckInNotes" placeholder="Add any special note for this check-in"></textarea>
      </div>
      <div class="flex gap-2">
        <button :class="['px-4 py-2 rounded w-full flex items-center justify-center gap-2', manualSelectedAttendee ? 'bg-black text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed']" :disabled="!manualSelectedAttendee">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
          Check-in
        </button>
        <button class="border px-4 py-2 rounded w-full" @click="closeManualCheckInModal">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Bar, Pie, Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement
} from 'chart.js';
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement, ArcElement);
const activeTab = ref('Event List');
const search = ref('');
const events = ref([
  { id: 1, name: 'Annual General Meeting', date: '2024-01-15', time: '14:00', location: 'Conference Hall', type: 'Meeting', status: 'Upcoming', attended: 45, capacity: 100, rsvps: 67 },
  { id: 2, name: 'Community Workshop', date: '2024-01-20', time: '10:00', location: 'Training Room', type: 'Workshop', status: 'Open', attended: 23, capacity: 50, rsvps: 28 },
  { id: 3, name: 'Networking Event', date: '2024-01-10', time: '18:00', location: 'Main Lobby', type: 'Social', status: 'Completed', attended: 89, capacity: 150, rsvps: 112 },
  { id: 4, name: 'Board Meeting', date: '2024-01-25', time: '09:00', location: 'Boardroom', type: 'Meeting', status: 'Draft', attended: 89, capacity: 150, rsvps: 112 },
]);
const filteredEvents = computed(() => {
  if (!search.value) return events.value;
  return events.value.filter(e => e.name.toLowerCase().includes(search.value.toLowerCase()));
});
const showCreateEventModal = ref(false);
const newEvent = ref({
  title: '',
  description: '',
  date: '',
  startTime: '',
  endTime: '',
  location: '',
  capacity: '',
  hideRsvp: false,
  allowWaitlist: false,
  sendReminders: false,
  publicEvent: false,
});
const showEventDetailsModal = ref(false);
const selectedEvent = ref<any>(null);
const showEditEventModal = ref(false);
const editEvent = ref<any>({});
const showDeleteEventModal = ref(false);
const deleteEvent = ref<any>({});
const rsvpAttendees = ref([
  { id: 1, name: 'John Doe', email: 'john@example.com', ticketId: 'TKT-001', status: 'Checked In', checkInTime: '14:15', guests: 1 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', ticketId: 'TKT-002', status: 'Pending', checkInTime: '', guests: 3 },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com', ticketId: 'TKT-003', status: 'Checked In', checkInTime: '14:02', guests: 2 },
  { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', ticketId: 'TKT-004', status: 'Pending', checkInTime: '', guests: 5 },
]);
const rsvpSearch = ref('');
const filteredRsvpAttendees = computed(() => {
  if (!rsvpSearch.value) return rsvpAttendees.value;
  return rsvpAttendees.value.filter(a =>
    a.name.toLowerCase().includes(rsvpSearch.value.toLowerCase()) ||
    a.email.toLowerCase().includes(rsvpSearch.value.toLowerCase()) ||
    a.ticketId.toLowerCase().includes(rsvpSearch.value.toLowerCase())
  );
});
const showSendRsvpModal = ref(false);
const rsvpReminder = ref({
  type: 'Gentle Reminder',
  schedule: 'Send Now',
  name: '',
  event: '',
  date: '',
  custom: '',
});
const showManualCheckInModal = ref(false);
const manualCheckInSearch = ref('');
const manualSelectedAttendee = ref<any>(null);
const manualCheckInGuests = ref(1);
const manualCheckInTime = ref(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
const manualCheckInNotes = ref('');
const barData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Attendance',
      backgroundColor: '#a78bfa',
      data: [500, 350, 550, 700, 400, 400],
      borderRadius: 6,
    },
  ],
};
const barOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    tooltip: { enabled: true },
  },
  scales: {
    y: { beginAtZero: true, ticks: { stepSize: 100 } },
  },
};
const pieData = {
  labels: ['Workshop', 'Meeting', 'Social Events', 'Training'],
  datasets: [
    {
      backgroundColor: ['#60a5fa', '#fbbf24', '#34d399', '#f472b6'],
      data: [25, 25, 25, 25],
    },
  ],
};
const pieOptions = {
  responsive: true,
  plugins: {
    legend: { position: 'right' as const },
    tooltip: { enabled: true },
  },
};
const lineData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Satisfaction',
      borderColor: '#818cf8',
      backgroundColor: 'rgba(129,140,248,0.2)',
      data: [600, 500, 550, 600, 650, 700],
      tension: 0.4,
      fill: true,
      pointRadius: 4,
      pointBackgroundColor: '#818cf8',
    },
  ],
};
const lineOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    tooltip: { enabled: true },
  },
  scales: {
    y: { beginAtZero: true, ticks: { stepSize: 100 } },
  },
};
function openCreateEventModal() {
  showCreateEventModal.value = true;
}
function closeCreateEventModal() {
  showCreateEventModal.value = false;
}
function createEvent() {
  // For demo: just close modal. You can add logic to push to events array if needed.
  closeCreateEventModal();
}
function openEventDetailsModal(event: any) {
  selectedEvent.value = event;
  showEventDetailsModal.value = true;
}
function closeEventDetailsModal() {
  showEventDetailsModal.value = false;
  selectedEvent.value = null;
}
function openEditEventModal(event: any) {
  // Deep copy to avoid mutating the original until save
  editEvent.value = { ...event };
  showEditEventModal.value = true;
}
function closeEditEventModal() {
  showEditEventModal.value = false;
  editEvent.value = {};
}
function saveEditEvent() {
  // For demo: just close modal. You can add logic to update the events array if needed.
  closeEditEventModal();
}
function openDeleteEventModal(event: any) {
  deleteEvent.value = { ...event };
  showDeleteEventModal.value = true;
}
function closeDeleteEventModal() {
  showDeleteEventModal.value = false;
  deleteEvent.value = {};
}
function confirmDeleteEvent() {
  events.value = events.value.filter(e => e.id !== deleteEvent.value.id);
  closeDeleteEventModal();
}
const attendanceRate = computed(() => {
  if (!selectedEvent.value || !selectedEvent.value.rsvps) return 0;
  return Math.round((selectedEvent.value.attended / selectedEvent.value.rsvps) * 100);
});
function checkInAttendee(attendee: any) {
  attendee.status = 'Checked In';
  attendee.checkInTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
function openSendRsvpModal() {
  showSendRsvpModal.value = true;
}
function closeSendRsvpModal() {
  showSendRsvpModal.value = false;
}
function sendRsvpReminder() {
  // For demo: just close modal. Add logic to send reminder if needed.
  closeSendRsvpModal();
}
function openManualCheckInModal() {
  showManualCheckInModal.value = true;
}
function closeManualCheckInModal() {
  showManualCheckInModal.value = false;
  manualCheckInSearch.value = '';
  manualSelectedAttendee.value = null;
  manualCheckInGuests.value = 1;
  manualCheckInTime.value = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  manualCheckInNotes.value = '';
}
function searchManualAttendee() {
  // For demo, auto-select Jane Smith if her name, email, or ticket is typed
  if (manualCheckInSearch.value.toLowerCase().includes('jane') || manualCheckInSearch.value.toLowerCase().includes('tkt-002')) {
    manualSelectedAttendee.value = { name: 'Jane Smith', email: 'jane@example.com', ticketId: '002' };
  } else {
    manualSelectedAttendee.value = null;
  }
}
function clearManualAttendee() {
  manualSelectedAttendee.value = null;
  manualCheckInSearch.value = '';
}
</script> 