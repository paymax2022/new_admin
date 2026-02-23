<template>
  <div class="min-h-screen bg-white p-5 md:p-6">
    <div class="mx-auto max-w-[1400px] space-y-5">
      <!-- Header -->
      <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 class="text-[30px] font-semibold leading-tight text-[#0f172a]">Dispatch & Manual Assignment</h1>
          <p class="mt-1 text-sm text-[#64748b]">Monitor ride requests and assign drivers in real-time</p>
        </div>
      </div>

      <!-- Stat Cards -->
      <div class="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <div class="rounded-lg border border-[#e5e7eb] bg-white p-4 shadow-sm">
          <div class="flex items-center justify-between">
            <p class="text-xs text-[#64748b]">Pending Requests</p>
            <span class="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#fef9c3]"><svg class="h-4 w-4 text-[#eab308]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></span>
          </div>
          <p class="mt-3 text-2xl font-semibold text-[#0f172a]">4</p>
        </div>
        <div class="rounded-lg border border-[#e5e7eb] bg-white p-4 shadow-sm">
          <div class="flex items-center justify-between">
            <p class="text-xs text-[#64748b]">Available Drivers</p>
            <span class="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#dcfce7]"><IconUsers class="h-4 w-4 text-[#16a34a]" /></span>
          </div>
          <p class="mt-3 text-2xl font-semibold text-[#0f172a]">4</p>
        </div>
        <div class="rounded-lg border border-[#e5e7eb] bg-white p-4 shadow-sm">
          <div class="flex items-center justify-between">
            <p class="text-xs text-[#64748b]">Active Assignments</p>
            <span class="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#dbeafe]"><svg class="h-4 w-4 text-[#2563eb]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke-width="2"/><circle cx="12" cy="12" r="6" stroke-width="2"/><circle cx="12" cy="12" r="2" stroke-width="2"/></svg></span>
          </div>
          <p class="mt-3 text-2xl font-semibold text-[#0f172a]">0</p>
        </div>
        <div class="rounded-lg border border-[#e5e7eb] bg-white p-4 shadow-sm">
          <div class="flex items-center justify-between">
            <p class="text-xs text-[#64748b]">Avg Wait Time</p>
            <span class="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#ede9fe]"><svg class="h-4 w-4 text-[#8b5cf6]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"/></svg></span>
          </div>
          <p class="mt-3 text-2xl font-semibold text-[#0f172a]">4.2m</p>
        </div>
      </div>

      <!-- Main Content: 3 Columns -->
      <div class="grid gap-4 lg:grid-cols-3">
        <!-- Left: Ride Requests -->
        <div class="rounded-xl border border-[#e5e7eb] bg-white shadow-sm">
          <div class="flex items-center justify-between border-b border-[#e5e7eb] px-4 py-3">
            <span class="flex items-center gap-2">
              <h2 class="text-sm font-semibold text-[#0f172a]">Ride Requests</h2>
              <span class="flex h-5 w-5 items-center justify-center rounded-full bg-[#ef4444] text-[10px] font-medium text-white">2</span>
            </span>
          </div>
          <div class="flex border-b border-[#e5e7eb]">
            <button
              class="flex-1 px-4 py-2.5 text-xs font-medium"
              :class="requestsTab === 'pending' ? 'bg-[#334155] text-white' : 'bg-white text-[#64748b]'"
              @click="requestsTab = 'pending'"
            >
              Pending
            </button>
            <button
              class="flex-1 px-4 py-2.5 text-xs font-medium"
              :class="requestsTab === 'assigned' ? 'bg-[#334155] text-white' : 'bg-white text-[#64748b]'"
              @click="requestsTab = 'assigned'"
            >
              Assigned
            </button>
            <button
              class="flex-1 px-4 py-2.5 text-xs font-medium"
              :class="requestsTab === 'cancelled' ? 'bg-[#334155] text-white' : 'bg-white text-[#64748b]'"
              @click="requestsTab = 'cancelled'"
            >
              Cancelled
            </button>
          </div>
          <div class="max-h-[360px] overflow-y-auto p-3 space-y-2">
            <div
              v-for="req in filteredRideRequests"
              :key="req.id"
              class="cursor-pointer rounded-lg border border-[#e5e7eb] bg-[#fefce8] p-3 transition-colors hover:bg-[#fef9c3]"
              @click="openRequestDetailsModal(req)"
            >
              <div class="flex items-start justify-between">
                <p class="text-xs font-semibold text-[#0f172a]">{{ req.id }}</p>
                <span class="flex items-center gap-1 text-[10px] text-[#64748b]">
                  <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  {{ req.time }}
                </span>
              </div>
              <p class="mt-1 text-xs font-medium text-[#0f172a]">{{ req.passenger }}</p>
              <p class="mt-1 flex items-start gap-1.5 text-[10px] text-[#64748b]">
                <svg class="mt-0.5 h-3 w-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/></svg>
                <span>Pickup: {{ req.pickup }}</span>
              </p>
              <p class="mt-0.5 flex items-start gap-1.5 text-[10px] text-[#64748b]">
                <svg class="mt-0.5 h-3 w-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/></svg>
                <span>Destination: {{ req.destination }}</span>
              </p>
              <div class="mt-2 flex items-center gap-1.5 text-[10px] text-[#64748b]">
                <IconCar class="h-3 w-3" />
                <span>Vehicle Type: {{ req.vehicleType }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Middle: Live Dispatch Map -->
        <div class="rounded-xl border border-[#e5e7eb] bg-white shadow-sm">
          <div class="flex items-center justify-between border-b border-[#e5e7eb] px-4 py-3">
            <h2 class="text-sm font-semibold text-[#0f172a]">Live Dispatch Map</h2>
            <div class="flex gap-2">
              <button class="flex items-center gap-1.5 rounded-lg border border-[#e5e7eb] bg-white px-3 py-1.5 text-xs text-[#64748b] hover:bg-[#f8fafc]">
                <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>
                Zones
              </button>
              <button class="flex items-center gap-1.5 rounded-lg border border-[#e5e7eb] bg-white px-3 py-1.5 text-xs text-[#64748b] hover:bg-[#f8fafc]">
                <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                Recenter
              </button>
            </div>
          </div>
          <div class="relative p-4">
            <div class="flex min-h-[340px] flex-col items-center justify-center rounded-lg border border-[#e5e7eb] bg-[#f1f5f9]">
              <svg class="h-16 w-16 text-[#94a3b8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <p class="mt-3 text-sm font-medium text-[#64748b]">Interactive Map View</p>
              <p class="mt-1 text-xs text-[#94a3b8]">See driver locations, ride requests, and zones</p>
            </div>
            <div class="absolute left-6 top-6 rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 shadow-sm">
              <p class="text-xs font-medium text-[#16a34a]"><span class="mr-1.5 inline-block h-2 w-2 rounded-full bg-[#16a34a]"></span>4 Available</p>
              <p class="mt-1 text-xs font-medium text-[#ef4444]"><span class="mr-1.5 inline-block h-2 w-2 rounded-full bg-[#ef4444]"></span>4 Waiting</p>
              <div class="mt-2 space-y-1 border-t border-[#e5e7eb] pt-2 text-[10px] text-[#64748b]">
                <p><span class="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-[#16a34a]"></span>Available Drivers</p>
                <p><span class="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-[#f97316]"></span>Busy Drivers</p>
                <p><span class="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-[#ef4444]"></span>Pending Requests</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Available Drivers -->
        <div class="rounded-xl border border-[#e5e7eb] bg-white shadow-sm">
          <div class="flex items-center justify-between border-b border-[#e5e7eb] px-4 py-3">
            <span class="flex items-center gap-2">
              <h2 class="text-sm font-semibold text-[#0f172a]">Available Drivers</h2>
              <span class="flex h-5 w-5 items-center justify-center rounded-full bg-[#ef4444] text-[10px] font-medium text-white">4</span>
            </span>
          </div>
          <div class="border-b border-[#e5e7eb] p-3 space-y-2">
            <div class="relative">
              <IconSearch class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94a3b8]" />
              <input placeholder="Search drivers..." class="h-9 w-full rounded-lg border border-[#e5e7eb] bg-white pl-9 pr-3 text-xs text-[#0f172a] placeholder:text-[#94a3b8] outline-none focus:border-[#cbd5e1]" />
            </div>
            <div class="flex gap-2">
              <select class="h-8 flex-1 rounded-lg border border-[#e5e7eb] bg-white px-2 text-xs text-[#64748b] outline-none focus:border-[#cbd5e1]">
                <option>All Type</option>
              </select>
              <select class="h-8 flex-1 rounded-lg border border-[#e5e7eb] bg-white px-2 text-xs text-[#64748b] outline-none focus:border-[#cbd5e1]">
                <option>All Reg</option>
              </select>
            </div>
          </div>
          <div class="max-h-[320px] overflow-y-auto p-3 space-y-2">
            <div
              v-for="driver in availableDrivers"
              :key="driver.id"
              class="rounded-lg border border-[#e5e7eb] bg-[#dcfce7] p-3"
            >
              <div class="flex items-center gap-2">
                <span class="inline-block h-2 w-2 rounded-full bg-[#16a34a]"></span>
                <p class="text-xs font-semibold text-[#0f172a]">{{ driver.name }}</p>
              </div>
              <p class="mt-1 text-[10px] text-[#64748b]">Driver ID: {{ driver.id }}</p>
              <div class="mt-2 flex items-center gap-1.5 text-[10px] text-[#64748b]">
                <IconCar class="h-3 w-3" />
                <span>Vehicle: {{ driver.vehicle }}</span>
              </div>
              <div class="mt-1 flex items-center gap-1.5 text-[10px] text-[#64748b]">
                <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/></svg>
                <span>Location: {{ driver.location }}</span>
              </div>
              <div class="mt-1 flex items-center gap-1.5 text-[10px] text-[#64748b]">
                <svg class="h-3 w-3 text-[#eab308]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                <span>Rating: {{ driver.rating }} ({{ driver.trips }} trips)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Assignments -->
      <div class="rounded-xl border border-[#e5e7eb] bg-white shadow-sm">
        <div class="flex items-center justify-between border-b border-[#e5e7eb] px-4 py-3">
          <h2 class="text-sm font-semibold text-[#0f172a]">Recent Assignments</h2>
          <button class="text-xs font-medium text-[#2563eb] hover:underline">View All</button>
        </div>
        <div class="space-y-3 p-4">
          <div
            v-for="assignment in recentAssignments"
            :key="assignment.id"
            class="flex gap-3 rounded-lg border border-[#e5e7eb] p-4"
          >
              <span
                class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                :class="assignment.statusClass"
              >
                <component :is="assignment.icon" class="h-5 w-5" :class="assignment.iconClass" />
              </span>
              <div class="min-w-0 flex-1">
                <p class="text-sm font-semibold text-[#0f172a]">{{ assignment.id }} - {{ assignment.passenger }}</p>
                <p class="mt-0.5 text-[10px] text-[#64748b]">{{ assignment.timestamp }}</p>
                <p v-if="assignment.note" class="mt-1 text-[10px] text-[#64748b]">{{ assignment.note }}</p>
                <span
                  class="mt-2 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-medium"
                  :class="assignment.badgeClass"
                >
                  {{ assignment.status }}
                </span>
              </div>
            </div>
        </div>
      </div>
    </div>

    <!-- Ride Request Details Modal -->
    <Teleport to="body">
      <div
        v-if="showRequestDetailsModal && selectedRequest"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4"
        @click.self="closeRequestDetailsModal"
      >
        <div class="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white shadow-xl" @click.stop>
          <!-- Pending: Rider, pricing, pickup/dropoff, special request, recommended drivers -->
          <template v-if="selectedRequest.status === 'Pending'">
            <div class="px-6 py-5">
              <div class="flex items-start justify-between">
                <div class="flex items-center gap-3">
                  <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f1f5f9]">
                    <svg class="h-5 w-5 text-[#64748b]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  </span>
                  <div>
                    <h2 class="text-lg font-semibold text-[#0f172a]">Ride Request Details - {{ selectedRequest.id }}</h2>
                    <p class="mt-0.5 text-sm text-[#64748b]">Complete information about this ride request</p>
                  </div>
                </div>
                <button class="rounded-lg p-1.5 text-[#64748b] hover:bg-[#f1f5f9]" @click="closeRequestDetailsModal">
                  <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <div class="mt-5 grid grid-cols-2 gap-4">
                <div>
                  <p class="text-xs font-medium text-[#475569]">Rider</p>
                  <p class="mt-1 text-sm font-medium text-[#0f172a]">{{ selectedRequest.passenger }}</p>
                </div>
                <div>
                  <p class="text-xs font-medium text-[#475569]">Distance</p>
                  <p class="mt-1 text-sm font-medium text-[#0f172a]">{{ getRequestDetail(selectedRequest.id, 'distance') }}</p>
                </div>
                <div class="flex items-center gap-2">
                  <svg class="h-4 w-4 text-[#64748b]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                  <p class="text-sm font-medium text-[#0f172a]">{{ getRequestDetail(selectedRequest.id, 'phone') }}</p>
                </div>
                <div>
                  <p class="text-xs font-medium text-[#475569]">Estimated Fare</p>
                  <p class="mt-1 text-sm font-medium text-[#0f172a]">{{ getRequestDetail(selectedRequest.id, 'estimatedFare') }}</p>
                </div>
                <div>
                  <p class="text-xs font-medium text-[#475569]">Vehicle Type</p>
                  <p class="mt-1 text-sm font-medium text-[#0f172a]">{{ selectedRequest.vehicleType }}</p>
                </div>
              </div>
              <div class="mt-5 space-y-3">
                <div>
                  <p class="text-xs font-medium text-[#475569]">Pickup Location</p>
                  <div class="mt-1.5 flex items-center gap-2 rounded-lg border border-[#dcfce7] bg-[#dcfce7] px-3 py-2.5">
                    <svg class="h-4 w-4 shrink-0 text-[#16a34a]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                    <span class="text-sm text-[#0f172a]">{{ getRequestDetail(selectedRequest.id, 'pickupFull') }}</span>
                  </div>
                </div>
                <div>
                  <p class="text-xs font-medium text-[#475569]">Dropoff Location</p>
                  <div class="mt-1.5 flex items-center gap-2 rounded-lg border border-[#fee2e2] bg-[#fee2e2] px-3 py-2.5">
                    <svg class="h-4 w-4 shrink-0 text-[#dc2626]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                    <span class="text-sm text-[#0f172a]">{{ getRequestDetail(selectedRequest.id, 'dropoffFull') }}</span>
                  </div>
                </div>
              </div>
              <div class="mt-5">
                <p class="text-xs font-medium text-[#475569]">Special Request:</p>
                <div class="mt-1.5 flex items-start gap-2 rounded-lg border border-[#e5e7eb] bg-[#f8fafc] px-3 py-2.5">
                  <svg class="mt-0.5 h-4 w-4 shrink-0 text-[#64748b]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  <span class="text-sm text-[#64748b]">{{ getRequestDetail(selectedRequest.id, 'specialRequest') || 'Special note here...' }}</span>
                </div>
              </div>
              <div class="mt-5">
                <div class="flex items-center justify-between">
                  <p class="text-sm font-semibold text-[#0f172a]">Recommended Drivers</p>
                  <button class="flex items-center gap-2 rounded-lg bg-[#2196F3] px-3 py-2 text-xs font-medium text-white hover:bg-[#1976D2]">
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                    Auto-Assign Best
                  </button>
                </div>
                <div class="mt-3 space-y-3">
                  <div
                    v-for="driver in recommendedDrivers"
                    :key="driver.name"
                    class="flex items-center justify-between gap-4 rounded-lg border border-[#93c5fd] bg-[#dbeafe] p-3"
                  >
                    <div class="flex items-center gap-3 min-w-0">
                      <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#dcfce7]">
                        <svg class="h-4 w-4 text-[#16a34a]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                      </div>
                      <div>
                        <p class="text-sm font-medium text-[#0f172a]">{{ driver.name }}</p>
                        <p class="text-xs text-[#64748b]">{{ driver.distance }} - {{ driver.eta }}</p>
                      </div>
                    </div>
                    <div class="flex shrink-0 items-center gap-2">
                      <span class="flex items-center gap-0.5 text-xs font-medium text-[#0f172a]">
                        <svg class="h-3.5 w-3.5 text-[#eab308]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                        {{ driver.rating }}
                      </span>
                      <button class="rounded-lg bg-[#2196F3] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#1976D2]" @click="openConfirmAssignmentModal(driver)">Assign</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>

          <!-- Assigned: Ride Details with assigned driver and notifications -->
          <template v-else-if="selectedRequest.status === 'Assigned'">
            <div class="px-6 py-5">
              <div class="flex items-start justify-between">
                <div>
                  <h2 class="text-lg font-semibold text-[#0f172a]">Ride Details</h2>
                  <p class="mt-0.5 text-sm text-[#64748b]">Complete booking information.</p>
                </div>
                <button class="rounded-lg p-1.5 text-[#64748b] hover:bg-[#f1f5f9]" @click="closeRequestDetailsModal">
                  <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <div class="mt-5 space-y-4">
                <p class="text-sm text-[#0f172a]"><span class="font-medium text-[#475569]">Vehicle Type:</span> {{ selectedRequest.vehicleType }} <span class="text-[#64748b]">1</span></p>
                <p class="text-sm text-[#0f172a]"><span class="font-medium text-[#475569]">Distance:</span> {{ getAssignedDetail(selectedRequest.id, 'distance') }}</p>
                <p class="text-sm text-[#0f172a]"><span class="font-medium text-[#475569]">Duration:</span> {{ getAssignedDetail(selectedRequest.id, 'duration') }}</p>
                <p class="text-sm text-[#0f172a]"><span class="font-medium text-[#475569]">Estimated Fare:</span> {{ getAssignedDetail(selectedRequest.id, 'estimatedFare') }}</p>
              </div>
              <div class="mt-5 rounded-lg border border-[#e5e7eb] bg-[#f8fafc] p-4">
                <p class="text-sm font-semibold text-[#0f172a]">Assigned Driver</p>
                <div class="mt-3 flex items-start gap-3">
                  <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f1f5f9]">
                    <svg class="h-5 w-5 text-[#94a3b8]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-[#0f172a]">{{ getAssignedDetail(selectedRequest.id, 'driverName') }}</p>
                    <p class="flex items-center gap-0.5 text-xs text-[#0f172a]">
                      <svg class="h-3.5 w-3.5 text-[#eab308]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                      {{ getAssignedDetail(selectedRequest.id, 'driverRating') }}
                    </p>
                    <p class="mt-1 text-xs text-[#64748b]">{{ getAssignedDetail(selectedRequest.id, 'driverVehicle') }}</p>
                    <p class="text-xs text-[#64748b]">License: {{ getAssignedDetail(selectedRequest.id, 'licensePlate') }}</p>
                    <p class="mt-1 flex items-center gap-1.5 text-xs text-[#0f172a]">
                      <svg class="h-3.5 w-3.5 text-[#64748b]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                      {{ getAssignedDetail(selectedRequest.id, 'driverPhone') }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="mt-5 space-y-2 text-sm text-[#475569]">
                <p><span class="font-medium">Booked At:</span> {{ getAssignedDetail(selectedRequest.id, 'bookedAt') }}</p>
                <p class="flex items-center gap-2">
                  <svg class="h-4 w-4 text-[#16a34a]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                  Passenger Notified
                </p>
                <p class="flex items-center gap-2">
                  <svg class="h-4 w-4 text-[#16a34a]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                  Driver Notified
                </p>
              </div>
            </div>
          </template>

          <!-- Cancelled: Booking reference, status, passenger info, trip details -->
          <template v-else-if="selectedRequest.status === 'Cancelled'">
            <div class="px-6 py-5">
              <div class="flex items-start justify-between">
                <div>
                  <h2 class="text-lg font-semibold text-[#0f172a]">Ride Details</h2>
                  <p class="mt-0.5 text-sm text-[#64748b]">Complete booking information</p>
                </div>
                <button class="rounded-lg p-1.5 text-[#64748b] hover:bg-[#f1f5f9]" @click="closeRequestDetailsModal">
                  <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <div class="mt-5 space-y-4">
                <div class="flex justify-between">
                  <p class="text-xs font-medium text-[#475569]">Booking Reference</p>
                  <p class="text-sm font-medium text-[#0f172a]">{{ getCancelledDetail(selectedRequest.id, 'bookingRef') }}</p>
                </div>
                <div class="flex justify-between items-center">
                  <p class="text-xs font-medium text-[#475569]">Status</p>
                  <span class="rounded px-3 py-1 text-xs font-medium text-white bg-[#dc2626]">Cancelled</span>
                </div>
              </div>
              <div class="mt-5">
                <p class="text-sm font-semibold text-[#0f172a]">Passenger Information</p>
                <p class="mt-1 text-sm text-[#0f172a]">{{ getCancelledDetail(selectedRequest.id, 'passengerName') }}</p>
                <p class="text-xs text-[#64748b]">{{ getCancelledDetail(selectedRequest.id, 'passengerPhone') }}</p>
                <p class="text-xs text-[#64748b]">{{ getCancelledDetail(selectedRequest.id, 'passengerEmail') }}</p>
              </div>
              <div class="mt-5">
                <p class="text-sm font-semibold text-[#0f172a]">Trip Details</p>
                <p class="mt-2 flex items-center gap-2 text-sm text-[#0f172a]">
                  <svg class="h-4 w-4 text-[#64748b]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                  {{ getCancelledDetail(selectedRequest.id, 'dateTime') }}
                </p>
                <p class="mt-2 flex items-center gap-2 text-sm text-[#0f172a]">
                  <svg class="h-4 w-4 shrink-0 text-[#16a34a]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/></svg>
                  <span class="text-[#64748b]">Pickup</span> {{ getCancelledDetail(selectedRequest.id, 'pickup') }}
                </p>
                <p class="mt-1 flex items-center gap-2 text-sm text-[#0f172a]">
                  <svg class="h-4 w-4 shrink-0 text-[#dc2626]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/></svg>
                  <span class="text-[#64748b]">Dropoff</span> {{ getCancelledDetail(selectedRequest.id, 'dropoff') }}
                </p>
                <div class="mt-3 flex gap-6">
                  <div>
                    <p class="text-xs text-[#64748b]">Vehicle Type</p>
                    <p class="text-sm font-medium text-[#0f172a]">{{ getCancelledDetail(selectedRequest.id, 'vehicleType') }}</p>
                  </div>
                  <div>
                    <p class="text-xs text-[#64748b]">Passengers</p>
                    <p class="text-sm font-medium text-[#0f172a]">{{ getCancelledDetail(selectedRequest.id, 'passengers') }}</p>
                  </div>
                </div>
              </div>
            </div>
          </template>

          <div class="flex justify-end border-t border-[#e5e7eb] px-6 py-4">
            <button
              class="rounded-lg border border-[#e5e7eb] bg-white px-6 py-2.5 text-sm font-medium text-[#475569] hover:bg-[#f8fafc]"
              @click="closeRequestDetailsModal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Confirm Manual Assignment Modal -->
    <Teleport to="body">
      <div
        v-if="showConfirmAssignmentModal && selectedRequest && selectedDriver"
        class="fixed inset-0 z-[101] flex items-center justify-center bg-black/40 p-4"
        @click.self="closeConfirmAssignmentModal"
      >
        <div class="relative w-full max-w-md overflow-hidden rounded-xl bg-white shadow-xl" @click.stop>
          <div class="px-6 py-5">
            <div class="flex items-start justify-between">
              <div>
                <h2 class="text-lg font-semibold text-[#0f172a]">Confirm Manual Assignment</h2>
                <p class="mt-0.5 text-sm text-[#64748b]">Assign this trip to the selected driver.</p>
              </div>
              <button class="rounded-lg p-1.5 text-[#64748b] hover:bg-[#f1f5f9]" @click="closeConfirmAssignmentModal">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div class="mt-5 rounded-lg border border-[#e5e7eb] bg-[#f8fafc] px-4 py-3">
              <p class="flex items-start gap-2 text-sm text-[#475569]">
                <svg class="mt-0.5 h-4 w-4 shrink-0 text-[#64748b]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                <span>You are about to manually assign <span class="block font-medium text-[#0f172a]">{{ selectedRequest.id }}</span> to <span class="block font-medium text-[#0f172a]">{{ selectedDriver.name }}</span></span>
              </p>
            </div>
            <div class="mt-5 grid grid-cols-2 gap-4">
              <div>
                <p class="text-xs font-medium text-[#475569]">Trip</p>
                <p class="mt-1 text-sm font-medium text-[#0f172a]">{{ selectedRequest.id }}</p>
                <p class="text-sm text-[#64748b]">{{ selectedRequest.passenger }}</p>
              </div>
              <div>
                <p class="text-xs font-medium text-[#475569]">Driver</p>
                <p class="mt-1 text-sm font-medium text-[#0f172a]">{{ selectedDriver.name }}</p>
                <p class="text-sm text-[#64748b]">{{ selectedDriver.vehicleType }}</p>
              </div>
            </div>
            <div class="mt-4 flex gap-3">
              <div class="flex-1 rounded-lg border border-[#e5e7eb] bg-[#f8fafc] px-3 py-2.5 text-center">
                <p class="text-[10px] font-medium text-[#64748b]">Distance</p>
                <p class="mt-0.5 text-sm font-semibold text-[#0f172a]">{{ selectedDriver.distance }}</p>
              </div>
              <div class="flex-1 rounded-lg border border-[#e5e7eb] bg-[#f8fafc] px-3 py-2.5 text-center">
                <p class="text-[10px] font-medium text-[#64748b]">ETA</p>
                <p class="mt-0.5 text-sm font-semibold text-[#0f172a]">{{ selectedDriver.etaShort }}</p>
              </div>
              <div class="flex-1 rounded-lg border border-[#e5e7eb] bg-[#f8fafc] px-3 py-2.5 text-center">
                <p class="text-[10px] font-medium text-[#64748b]">Rating</p>
                <p class="mt-0.5 flex items-center justify-center gap-0.5 text-sm font-semibold text-[#0f172a]">
                  <svg class="h-3.5 w-3.5 text-[#eab308]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  {{ selectedDriver.rating }}
                </p>
              </div>
            </div>
            <div class="mt-5">
              <label class="block text-xs font-medium text-[#475569]">Assignment Notes (Optional)</label>
              <textarea
                v-model="assignmentNotes"
                placeholder="Add any special instructions or notes..."
                rows="3"
                class="mt-1.5 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 py-2.5 text-sm text-[#0f172a] placeholder:text-[#94a3b8] outline-none focus:border-[#cbd5e1]"
              />
            </div>
          </div>
          <div class="flex justify-end gap-2 border-t border-[#e5e7eb] px-6 py-4">
            <button
              class="rounded-lg border border-[#e5e7eb] bg-white px-5 py-2.5 text-sm font-medium text-[#475569] hover:bg-[#f8fafc]"
              @click="closeConfirmAssignmentModal"
            >
              Cancel
            </button>
            <button
              class="flex items-center gap-2 rounded-lg bg-[#0f172a] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#1e293b]"
              @click="confirmAssignment"
            >
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
              Confirm Assignment
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Driver Assigned Successfully Modal -->
    <Teleport to="body">
      <div
        v-if="showSuccessModal && lastAssignedRequest && lastAssignedDriver"
        class="fixed inset-0 z-[102] flex items-center justify-center bg-black/40 p-4"
        @click.self="closeSuccessModal"
      >
        <div class="relative w-full max-w-md overflow-hidden rounded-xl bg-white shadow-xl" @click.stop>
          <div class="px-6 py-5">
            <div class="flex items-start justify-between">
              <h2 class="text-lg font-semibold text-[#0f172a]">Driver Assigned Successfully</h2>
              <button class="rounded-lg p-1.5 text-[#64748b] hover:bg-[#f1f5f9]" @click="closeSuccessModal">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <p class="mt-5 text-sm leading-relaxed text-[#475569]">
              You've assigned <strong>{{ lastAssignedDriver.name }}</strong> to <strong>{{ lastAssignedRequest.passenger }}</strong> for this trip.
            </p>
            <p class="mt-3 text-sm leading-relaxed text-[#475569]">
              Pickup at {{ getRequestDetail(lastAssignedRequest.id, 'pickupFull') }}, drop off at {{ getRequestDetail(lastAssignedRequest.id, 'dropoffFull') }}.
            </p>
            <p class="mt-3 text-sm leading-relaxed text-[#475569]">
              The driver has been notified and can now proceed to the pickup point.
            </p>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import IconCar from '@/components/icon/icon-car.vue';
import IconSearch from '@/components/icon/icon-search.vue';
import IconUsers from '@/components/icon/icon-users.vue';
import IconSend from '@/components/icon/icon-send.vue';
import IconSquareCheck from '@/components/icon/icon-square-check.vue';

const requestsTab = ref<'pending' | 'assigned' | 'cancelled'>('pending');

type RideRequest = {
  id: string;
  passenger: string;
  pickup: string;
  destination: string;
  vehicleType: string;
  time: string;
  status: 'Pending' | 'Assigned' | 'Cancelled';
};

const rideRequests = ref<RideRequest[]>([
  { id: 'REQ-1001', passenger: 'John Davis', pickup: '123 Main', destination: '450 Oak', vehicleType: 'Standard', time: '2 min ago', status: 'Pending' },
  { id: 'REQ-1002', passenger: 'Sarah Johnson', pickup: '780 Park Lane, Midtown', destination: '321 River Road, Evartac', vehicleType: 'Premium', time: '5 min ago', status: 'Assigned' },
  { id: 'REQ-1003', passenger: 'Michael Chen', pickup: 'Airport Terminal 2', destination: '585 Business', vehicleType: 'XL', time: '8 min ago', status: 'Pending' },
  { id: 'REQ-1004', passenger: 'David Wilson', pickup: '222 Castro Street', destination: 'Golden Gate Park', vehicleType: 'Premium', time: '1 hour ago', status: 'Cancelled' },
]);

const filteredRideRequests = computed(() => {
  return rideRequests.value.filter((r) => r.status.toLowerCase() === requestsTab.value);
});

const showRequestDetailsModal = ref(false);
const selectedRequest = ref<RideRequest | null>(null);

const requestDetailsMap: Record<string, Record<string, string>> = {
  'REQ-1001': { phone: '+234567809', distance: '8.5 km', estimatedFare: '$24.50', pickupFull: '123 Main Street, Downtown', dropoffFull: '456 Oak Avenue, Uptown', specialRequest: 'Special note here......' },
  'REQ-1002': { phone: '+234567810', distance: '12.2 km', estimatedFare: '$38.00', pickupFull: '780 Park Lane, Midtown', dropoffFull: '321 River Road, Evartac', specialRequest: '' },
  'REQ-1003': { phone: '+234567811', distance: '22.5 km', estimatedFare: '$65.00', pickupFull: 'Airport Terminal 2', dropoffFull: '585 Business District', specialRequest: 'Need child seat' },
  'REQ-1004': { phone: '+234567812', distance: '5.2 km', estimatedFare: '$18.00', pickupFull: '222 Castro Street', dropoffFull: 'Golden Gate Park', specialRequest: '' },
};

const assignedDetailsMap: Record<string, Record<string, string>> = {
  'REQ-1002': { distance: '2.1 mi', duration: '12 min', estimatedFare: '$18.50', driverName: 'Maria Garcia', driverRating: '4.95', driverVehicle: '2023 Honda Accord', licensePlate: 'XYZ-5678', driverPhone: '+1 (555) 876-5432', bookedAt: '2025-10-17 16:20' },
};

const cancelledDetailsMap: Record<string, Record<string, string>> = {
  'REQ-1004': { bookingRef: 'BK-20251018-015', passengerName: 'David Wilson', passengerPhone: '+1 (555) 567-8901', passengerEmail: 'david.w@email.com', dateTime: '2025-10-19 at 10:30', pickup: '222 Castro Street, San Francisco, CA 94114', dropoff: 'Golden Gate Park, San Francisco, CA 94122', vehicleType: 'Premium', passengers: '2' },
};

const recommendedDrivers = [
  { name: 'James Wilson', distance: '0.8 km', eta: '3m ETA', etaShort: '3 min', rating: '4.9', vehicleType: 'Standard' },
  { name: 'Lisa Anderson', distance: '1.5 km', eta: '6m ETA', etaShort: '6 min', rating: '4.92', vehicleType: 'Standard' },
];

type RecommendedDriver = (typeof recommendedDrivers)[number];

const showConfirmAssignmentModal = ref(false);
const selectedDriver = ref<RecommendedDriver | null>(null);
const showSuccessModal = ref(false);
const assignmentNotes = ref('');
const lastAssignedRequest = ref<RideRequest | null>(null);
const lastAssignedDriver = ref<RecommendedDriver | null>(null);

function getRequestDetail(reqId: string, key: string): string {
  return requestDetailsMap[reqId]?.[key] ?? '';
}

function getAssignedDetail(reqId: string, key: string): string {
  return assignedDetailsMap[reqId]?.[key] ?? '';
}

function getCancelledDetail(reqId: string, key: string): string {
  return cancelledDetailsMap[reqId]?.[key] ?? '';
}

function openRequestDetailsModal(req: RideRequest) {
  selectedRequest.value = req;
  showRequestDetailsModal.value = true;
}

function closeRequestDetailsModal() {
  showRequestDetailsModal.value = false;
  selectedRequest.value = null;
}

function openConfirmAssignmentModal(driver: RecommendedDriver) {
  selectedDriver.value = driver;
  assignmentNotes.value = '';
  showConfirmAssignmentModal.value = true;
}

function closeConfirmAssignmentModal() {
  showConfirmAssignmentModal.value = false;
  selectedDriver.value = null;
}

function confirmAssignment() {
  if (selectedRequest.value && selectedDriver.value) {
    lastAssignedRequest.value = selectedRequest.value;
    lastAssignedDriver.value = selectedDriver.value;
  }
  closeConfirmAssignmentModal();
  closeRequestDetailsModal();
  showSuccessModal.value = true;
}

function closeSuccessModal() {
  showSuccessModal.value = false;
  lastAssignedRequest.value = null;
  lastAssignedDriver.value = null;
}

const availableDrivers = [
  { id: 'DRV-501', name: 'James Wilson', vehicle: 'Standard - Toyota Camry 2022', location: 'Downtown', rating: '4.3', trips: '1245' },
  { id: 'DRV-502', name: 'Emma Thompson', vehicle: 'Premium - Honda Accord 2023', location: 'Midtown', rating: '4.8', trips: '892' },
  { id: 'DRV-503', name: 'David Brown', vehicle: 'Standard - Toyota Camry 2022', location: 'Airport', rating: '4.5', trips: '1102' },
  { id: 'DRV-504', name: 'Lisa Martinez', vehicle: 'XL - Ford Explorer 2022', location: 'Downtown', rating: '4.6', trips: '756' },
];

const recentAssignments = [
  { id: 'REQ-900', passenger: 'Maria Garcia', timestamp: '2025-10-19 14:42 by dispatch@paymex.com', note: '', status: 'In progress', statusClass: 'bg-[#dbeafe]', iconClass: 'text-[#2563eb]', icon: IconSend, badgeClass: 'bg-[#dbeafe] text-[#2563eb]' },
  { id: 'REQ-968', passenger: 'James Wilson', timestamp: '2025-10-14 14:30', note: "Customer requested 'experienced driver'", status: 'Completed', statusClass: 'bg-[#dcfce7]', iconClass: 'text-[#16a34a]', icon: IconSquareCheck, badgeClass: 'bg-[#dcfce7] text-[#16a34a]' },
];
</script>
