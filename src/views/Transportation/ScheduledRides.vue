<template>
  <div class="min-h-screen bg-white p-5 md:p-6">
    <div class="mx-auto max-w-[1400px] space-y-5">
      <!-- Header -->
      <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 class="text-[30px] font-semibold leading-tight text-[#0f172a]">Scheduled Rides</h1>
          <p class="mt-1 text-sm text-[#64748b]">Manage pre-booked and recurring rides</p>
        </div>
      </div>

      <!-- Stat Cards -->
      <div class="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <div class="rounded-lg border border-[#e5e7eb] bg-white p-4 shadow-sm">
          <p class="text-xs font-medium text-[#64748b]">Total Scheduled</p>
          <p class="mt-3 text-2xl font-semibold text-[#0f172a]">3</p>
        </div>
        <div class="rounded-lg border border-[#e5e7eb] bg-white p-4 shadow-sm">
          <p class="text-xs font-medium text-[#64748b]">Today</p>
          <p class="mt-3 text-2xl font-semibold text-[#0f172a]">2</p>
        </div>
        <div class="rounded-lg border border-[#e5e7eb] bg-white p-4 shadow-sm">
          <p class="text-xs font-medium text-[#64748b]">Pending Assignment</p>
          <p class="mt-3 text-2xl font-semibold text-[#0f172a]">2</p>
        </div>
        <div class="rounded-lg border border-[#e5e7eb] bg-white p-4 shadow-sm">
          <p class="text-xs font-medium text-[#64748b]">Recurring</p>
          <p class="mt-3 text-2xl font-semibold text-[#0f172a]">1</p>
        </div>
      </div>

      <!-- Filters -->
      <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div class="relative flex-1 max-w-md">
          <IconSearch class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94a3b8]" />
          <input
            v-model="search"
            placeholder="Search by passenger, booking ref, or location..."
            class="h-10 w-full rounded-lg border border-[#e5e7eb] bg-white pl-9 pr-3 text-sm text-[#0f172a] placeholder:text-[#94a3b8] outline-none focus:border-[#cbd5e1]"
          />
        </div>
        <div class="flex items-center gap-3">
          <div class="flex gap-1 border-b border-[#e5e7eb]">
            <button
              v-for="tab in statusTabs"
              :key="tab.value"
              class="relative px-4 py-2.5 text-xs font-medium transition-colors"
              :class="statusTab === tab.value ? 'text-[#0f172a]' : 'text-[#64748b] hover:text-[#0f172a]'"
              @click="statusTab = tab.value"
            >
              <span v-if="statusTab === tab.value" class="absolute left-1/2 top-1 h-1 w-1 -translate-x-1/2 rounded-full bg-[#ef4444]"></span>
              {{ tab.label }}
              <span
                v-if="statusTab === tab.value"
                class="absolute bottom-0 left-0 right-0 h-0.5 rounded-t bg-[#ef4444]"
              ></span>
            </button>
          </div>
          <select class="h-10 rounded-lg border border-[#e5e7eb] bg-white px-4 text-sm text-[#475569] outline-none focus:border-[#cbd5e1]">
            <option>All Status</option>
          </select>
          <select class="h-10 rounded-lg border border-[#e5e7eb] bg-white px-4 text-sm text-[#475569] outline-none focus:border-[#cbd5e1]">
            <option>All Vehicles</option>
          </select>
        </div>
      </div>

      <!-- Ride Cards -->
      <div class="space-y-4">
        <div
          v-for="ride in filteredRides"
          :key="ride.id"
          class="rounded-xl border border-[#e5e7eb] bg-white p-4 shadow-sm"
        >
          <div class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <!-- Card Header -->
            <div class="flex flex-1 flex-wrap items-start justify-between gap-3">
              <div class="flex items-center gap-3">
                <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f1f5f9] text-[#64748b]">
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                </span>
                <div>
                  <p class="text-sm font-semibold text-[#0f172a]">{{ ride.bookingId }}</p>
                  <p class="text-xs text-[#64748b]">{{ ride.dateTime }}</p>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-xs text-[#64748b]">{{ ride.vehicleType }}</span>
                <IconCar class="h-3.5 w-3.5 text-[#94a3b8]" />
                <span class="text-xs text-[#64748b]">{{ ride.passengers }} passenger{{ ride.passengers > 1 ? 's' : '' }}</span>
              </div>
              <span
                class="px-2.5 py-1 text-xs font-medium text-white"
                :class="[ride.status === 'Cancelled' ? 'rounded' : 'rounded-full', getStatusBadgeClass(ride.status)]"
              >
                {{ ride.status === 'Cancelled' ? 'Canceled' : ride.status }}
              </span>
              <div class="flex items-center gap-1">
                <template v-if="ride.status !== 'Cancelled'">
                <button class="rounded p-1.5 text-[#64748b] hover:bg-[#f1f5f9]" @click="openEditModal(ride)">
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
                </button>
                <button class="rounded p-1.5 text-[#64748b] hover:bg-[#f1f5f9]">
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/></svg>
                </button>
                <button class="rounded p-1.5 text-[#64748b] hover:bg-[#f1f5f9]">
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </button>
                </template>
                <button v-else class="rounded p-1.5 text-[#64748b] hover:bg-[#f1f5f9]" @click="openViewModal(ride)">
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                </button>
              </div>
            </div>
          </div>

          <div class="mt-5 grid gap-4 sm:grid-cols-2">
            <!-- Passenger Details -->
            <div>
              <p class="text-xs font-semibold text-[#0f172a]">Passenger</p>
              <div class="mt-2 flex items-center gap-3">
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f1f5f9]">
                  <svg class="h-5 w-5 text-[#94a3b8]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                </div>
                <div>
                  <p class="text-sm font-medium text-[#0f172a]">{{ ride.passengerName }}</p>
                  <p class="flex items-center gap-1.5 text-xs text-[#64748b]">
                    <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                    {{ ride.passengerPhone }}
                  </p>
                </div>
              </div>
              <!-- Driver Details (Assigned/Completed) -->
              <div v-if="ride.status === 'Assigned' || ride.status === 'Completed'" class="mt-4 flex items-center gap-3">
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#dcfce7]">
                  <svg class="h-5 w-5 text-[#16a34a]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                </div>
                <div>
                  <p class="text-sm font-medium text-[#0f172a]">{{ ride.driverName }}</p>
                  <p class="text-xs text-[#64748b]">{{ ride.driverVehicle }}</p>
                  <p class="flex items-center gap-0.5 text-xs font-medium text-[#0f172a]">
                    <svg class="h-3.5 w-3.5 text-[#eab308]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    {{ ride.driverRating }}
                  </p>
                </div>
                <div class="ml-auto">
                  <svg class="h-5 w-5 text-[#64748b]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>
                </div>
              </div>
            </div>

            <!-- Route Details -->
            <div>
              <p class="text-xs font-semibold text-[#0f172a]">Route</p>
              <div class="mt-2 space-y-2">
                <p class="flex items-start gap-2 text-sm text-[#0f172a]">
                  <svg class="mt-0.5 h-4 w-4 shrink-0 text-[#16a34a]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  {{ ride.pickup }}
                </p>
                <p class="flex items-start gap-2 text-sm text-[#0f172a]">
                  <svg class="mt-0.5 h-4 w-4 shrink-0 text-[#dc2626]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  {{ ride.dropoff }}
                </p>
              </div>
            </div>
          </div>

          <!-- Ride Summary -->
          <div class="mt-4 flex flex-wrap items-center gap-4 border-t border-[#e5e7eb] pt-4">
            <div class="flex items-center gap-1.5 text-sm text-[#0f172a]">
              <svg class="h-4 w-4 text-[#94a3b8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>
              {{ ride.distance }}
            </div>
            <div class="flex items-center gap-1.5 text-sm text-[#0f172a]">
              <svg class="h-4 w-4 text-[#94a3b8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              {{ ride.duration }}
            </div>
            <div class="flex items-center gap-1.5 text-sm text-[#0f172a]">
              <svg class="h-4 w-4 text-[#94a3b8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              {{ ride.fare }}
            </div>
            <div v-if="ride.status === 'Upcoming'" class="ml-auto">
              <button class="rounded-lg bg-[#2196F3] px-4 py-2 text-xs font-medium text-white hover:bg-[#1976D2]">
                Assign Driver
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Scheduled Ride Modal -->
    <Teleport to="body">
      <div
        v-if="showEditModal && selectedRideForEdit"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4"
        @click.self="closeEditModal"
      >
        <div class="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white shadow-xl" @click.stop>
          <div class="px-6 py-5">
            <div class="flex items-start justify-between">
              <div>
                <h2 class="text-lg font-semibold text-[#0f172a]">Edit Scheduled Ride</h2>
                <p class="mt-0.5 text-sm text-[#64748b]">Modify ride booking details</p>
              </div>
              <button class="rounded-lg p-1.5 text-[#64748b] hover:bg-[#f1f5f9]" @click="closeEditModal">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <form id="edit-ride-form" class="mt-5 space-y-5" @submit.prevent="updateRide">
              <!-- Passenger Information -->
              <div>
                <p class="mb-3 text-sm font-semibold text-[#0f172a]">Passenger Information</p>
                <div class="grid gap-4 sm:grid-cols-2">
                  <div class="sm:col-span-2">
                    <label class="block text-xs font-medium text-[#475569]">Full Name *</label>
                    <input v-model="editForm.fullName" type="text" required class="mt-1.5 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 py-2.5 text-sm text-[#0f172a] outline-none focus:border-[#cbd5e1]" />
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-[#475569]">Phone Number *</label>
                    <input v-model="editForm.phoneNumber" type="tel" required class="mt-1.5 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 py-2.5 text-sm text-[#0f172a] outline-none focus:border-[#cbd5e1]" />
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-[#475569]">Email Address</label>
                    <input v-model="editForm.email" type="email" class="mt-1.5 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 py-2.5 text-sm text-[#0f172a] outline-none focus:border-[#cbd5e1]" />
                  </div>
                </div>
              </div>

              <!-- Trip Details -->
              <div>
                <p class="mb-3 text-sm font-semibold text-[#0f172a]">Trip Details</p>
                <div class="space-y-4">
                  <div>
                    <label class="block text-xs font-medium text-[#475569]">Pickup Location *</label>
                    <input v-model="editForm.pickup" type="text" required class="mt-1.5 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 py-2.5 text-sm text-[#0f172a] outline-none focus:border-[#cbd5e1]" />
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-[#475569]">Dropoff Location *</label>
                    <input v-model="editForm.dropoff" type="text" required class="mt-1.5 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 py-2.5 text-sm text-[#0f172a] outline-none focus:border-[#cbd5e1]" />
                  </div>
                  <div class="grid gap-4 sm:grid-cols-2">
                    <div class="relative">
                      <label class="block text-xs font-medium text-[#475569]">Date *</label>
                      <input v-model="editForm.date" type="date" required class="mt-1.5 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 py-2.5 pr-10 text-sm text-[#0f172a] outline-none focus:border-[#cbd5e1]" />
                      <svg class="pointer-events-none absolute right-3 top-9 h-4 w-4 text-[#94a3b8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                    </div>
                    <div class="relative">
                      <label class="block text-xs font-medium text-[#475569]">Time *</label>
                      <input v-model="editForm.time" type="time" required class="mt-1.5 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 py-2.5 pr-10 text-sm text-[#0f172a] outline-none focus:border-[#cbd5e1]" />
                      <svg class="pointer-events-none absolute right-3 top-9 h-4 w-4 text-[#94a3b8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    </div>
                  </div>
                  <div class="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label class="block text-xs font-medium text-[#475569]">Vehicle Type *</label>
                      <select v-model="editForm.vehicleType" required class="mt-1.5 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 py-2.5 text-sm text-[#0f172a] outline-none focus:border-[#cbd5e1]">
                        <option value="Standard">Standard</option>
                        <option value="Premium">Premium</option>
                        <option value="XL">XL</option>
                      </select>
                    </div>
                    <div>
                      <label class="block text-xs font-medium text-[#475569]">Passengers *</label>
                      <input v-model.number="editForm.passengers" type="number" min="1" required class="mt-1.5 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 py-2.5 text-sm text-[#0f172a] outline-none focus:border-[#cbd5e1]" />
                    </div>
                  </div>
                </div>
              </div>

              <!-- Special Requests -->
              <div>
                <label class="block text-xs font-medium text-[#475569]">Special Requests</label>
                <textarea v-model="editForm.specialRequests" rows="3" placeholder="Add any special instructions..." class="mt-1.5 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 py-2.5 text-sm text-[#0f172a] placeholder:text-[#94a3b8] outline-none focus:border-[#cbd5e1]"></textarea>
              </div>
            </form>
          </div>

          <div class="flex justify-end gap-2 border-t border-[#e5e7eb] px-6 py-4">
            <button
              type="button"
              class="rounded-lg border border-[#e5e7eb] bg-white px-5 py-2.5 text-sm font-medium text-[#475569] hover:bg-[#f8fafc]"
              @click="closeEditModal"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="edit-ride-form"
              class="flex items-center gap-2 rounded-lg bg-[#0f172a] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#1e293b]"
            >
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
              Update Ride
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- View Ride Details Modal (for Cancelled) -->
    <Teleport to="body">
      <div
        v-if="showViewModal && selectedRideForView"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4"
        @click.self="closeViewModal"
      >
        <div class="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white shadow-xl" @click.stop>
          <div class="px-6 py-5">
            <div class="flex items-start justify-between">
              <div>
                <h2 class="text-lg font-semibold text-[#0f172a]">Ride Details</h2>
                <p class="mt-0.5 text-sm text-[#64748b]">Complete booking information</p>
              </div>
              <button class="rounded-lg p-1.5 text-[#64748b] hover:bg-[#f1f5f9]" @click="closeViewModal">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div class="mt-5 space-y-4">
              <div class="flex justify-between">
                <p class="text-xs font-medium text-[#475569]">Booking Reference</p>
                <p class="text-sm font-medium text-[#0f172a]">{{ selectedRideForView.bookingId }}</p>
              </div>
              <div class="flex justify-between items-center">
                <p class="text-xs font-medium text-[#475569]">Status</p>
                <span class="rounded px-2.5 py-1 text-xs font-medium text-white bg-[#dc2626]">Canceled</span>
              </div>
            </div>
            <div class="mt-5">
              <p class="text-sm font-semibold text-[#0f172a]">Passenger Information</p>
              <p class="mt-1 text-sm text-[#0f172a]">{{ selectedRideForView.passengerName }}</p>
              <p class="text-xs text-[#64748b]">{{ selectedRideForView.passengerPhone }}</p>
              <p class="text-xs text-[#64748b]">{{ selectedRideForView.passengerEmail || '—' }}</p>
            </div>
            <div class="mt-5">
              <p class="text-sm font-semibold text-[#0f172a]">Trip Details</p>
              <p class="mt-2 flex items-center gap-2 text-sm text-[#0f172a]">
                <svg class="h-4 w-4 text-[#64748b]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                {{ selectedRideForView.dateTime }}
              </p>
              <p class="mt-2 flex items-center gap-2 text-sm text-[#0f172a]">
                <svg class="h-4 w-4 shrink-0 text-[#16a34a]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/></svg>
                <span class="text-[#64748b]">Pickup</span> {{ selectedRideForView.pickup }}
              </p>
              <p class="mt-1 flex items-center gap-2 text-sm text-[#0f172a]">
                <svg class="h-4 w-4 shrink-0 text-[#dc2626]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/></svg>
                <span class="text-[#64748b]">Dropoff</span> {{ selectedRideForView.dropoff }}
              </p>
              <div class="mt-3 flex gap-6">
                <div>
                  <p class="text-xs text-[#64748b]">Vehicle Type</p>
                  <p class="text-sm font-medium text-[#0f172a]">{{ selectedRideForView.vehicleType }}</p>
                </div>
                <div>
                  <p class="text-xs text-[#64748b]">Passengers</p>
                  <p class="text-sm font-medium text-[#0f172a]">{{ selectedRideForView.passengers }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="flex justify-end border-t border-[#e5e7eb] px-6 py-4">
            <button
              class="rounded-lg border border-[#e5e7eb] bg-white px-6 py-2.5 text-sm font-medium text-[#475569] hover:bg-[#f8fafc]"
              @click="closeViewModal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import IconSearch from '@/components/icon/icon-search.vue';
import IconCar from '@/components/icon/icon-car.vue';

type RideStatus = 'Upcoming' | 'Assigned' | 'Completed' | 'Cancelled';

type ScheduledRide = {
  id: string;
  bookingId: string;
  dateTime: string;
  vehicleType: string;
  passengers: number;
  status: RideStatus;
  passengerName: string;
  passengerPhone: string;
  passengerEmail?: string;
  pickup: string;
  dropoff: string;
  distance: string;
  duration: string;
  fare: string;
  specialRequests?: string;
  driverName?: string;
  driverVehicle?: string;
  driverRating?: string;
};

const search = ref('');
const showEditModal = ref(false);
const showViewModal = ref(false);
const selectedRideForEdit = ref<ScheduledRide | null>(null);
const selectedRideForView = ref<ScheduledRide | null>(null);
const editForm = ref({
  fullName: '',
  phoneNumber: '',
  email: '',
  pickup: '',
  dropoff: '',
  date: '',
  time: '',
  vehicleType: 'Standard',
  passengers: 1,
  specialRequests: '',
});
const statusTab = ref('all');

const statusTabs = [
  { value: 'all', label: 'All' },
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'assigned', label: 'Assigned' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Canceled' },
];

const rides = ref<ScheduledRide[]>([
  {
    id: '1',
    bookingId: 'BK-20251019-061',
    dateTime: '2025-10-20 at 08:00',
    vehicleType: 'Standard',
    passengers: 1,
    status: 'Upcoming',
    passengerName: 'Robert Johnson',
    passengerPhone: '+1 (555) 123-4567',
    passengerEmail: 'robert.jg@email.com',
    pickup: '123 Market Street, San Francisco, CA 94102',
    dropoff: 'SFO International Airport, Terminal 2',
    distance: '16.3 mi',
    duration: '28 min',
    fare: '$40.00',
    specialRequests: 'Need help with luggage',
  },
  {
    id: '2',
    bookingId: 'BK-20251019-062',
    dateTime: '2025-10-20 at 14:30',
    vehicleType: 'Premium',
    passengers: 2,
    status: 'Assigned',
    passengerName: 'Sarah Williams',
    passengerPhone: '+1 (505) 234-5678',
    pickup: '456 Oak Avenue, Downtown',
    dropoff: 'Central Convention Center',
    distance: '8.5 mi',
    duration: '15 min',
    fare: '$28.50',
    driverName: 'John Smith',
    driverVehicle: '2022 Toyota Camry - ANC-1234',
    driverRating: '4.8',
  },
  {
    id: '4',
    bookingId: 'BK-20251018-015',
    dateTime: '2025-10-19 at 10:30',
    vehicleType: 'Premium',
    passengers: 2,
    status: 'Cancelled',
    passengerName: 'David Wilson',
    passengerPhone: '+1 (555) 567-8901',
    passengerEmail: 'david.w@email.com',
    pickup: '222 Castro Street, San Francisco, CA 94114',
    dropoff: 'Golden Gate Park, San Francisco, CA 94122',
    distance: '3.8 mi',
    duration: '16 min',
    fare: '$28.75',
  },
  {
    id: '3',
    bookingId: 'BK-20251018-058',
    dateTime: '2025-10-19 at 09:15',
    vehicleType: 'Standard',
    passengers: 1,
    status: 'Completed',
    passengerName: 'Michael Brown',
    passengerPhone: '+1 (505) 345-6789',
    pickup: '789 Elm Street',
    dropoff: 'Tech Hub Office Park',
    distance: '12.1 mi',
    duration: '22 min',
    fare: '$35.00',
    driverName: 'Emma Davis',
    driverVehicle: '2023 Honda Accord - BCD-5678',
    driverRating: '4.9',
  },
]);

const filteredRides = computed(() => {
  const q = search.value.trim().toLowerCase();
  let list = rides.value;

  if (statusTab.value !== 'all') {
    const statusMap: Record<string, RideStatus> = {
      upcoming: 'Upcoming',
      assigned: 'Assigned',
      completed: 'Completed',
      cancelled: 'Cancelled',
    };
    const target = statusMap[statusTab.value];
    if (target) list = list.filter((r) => r.status === target);
  }

  if (!q) return list;
  return list.filter(
    (r) =>
      r.passengerName.toLowerCase().includes(q) ||
      r.bookingId.toLowerCase().includes(q) ||
      r.pickup.toLowerCase().includes(q) ||
      r.dropoff.toLowerCase().includes(q)
  );
});

function getStatusBadgeClass(status: RideStatus) {
  switch (status) {
    case 'Upcoming':
      return 'bg-[#FFC107]';
    case 'Assigned':
      return 'bg-[#2196F3]';
    case 'Completed':
      return 'bg-[#4CAF50]';
    case 'Cancelled':
      return 'bg-[#F44336]';
    default:
      return 'bg-[#64748b]';
  }
}

function parseDateTime(dateTime: string): { date: string; time: string } {
  const match = dateTime.match(/^(\d{4})-(\d{2})-(\d{2})\s+at\s+(\d{1,2}):(\d{2})/);
  if (match) {
    return {
      date: `${match[1]}-${match[2]}-${match[3]}`,
      time: `${match[4].padStart(2, '0')}:${match[5]}`,
    };
  }
  return { date: '', time: '' };
}

function openViewModal(ride: ScheduledRide) {
  selectedRideForView.value = ride;
  showViewModal.value = true;
}

function closeViewModal() {
  showViewModal.value = false;
  selectedRideForView.value = null;
}

function openEditModal(ride: ScheduledRide) {
  selectedRideForEdit.value = ride;
  const { date, time } = parseDateTime(ride.dateTime);
  editForm.value = {
    fullName: ride.passengerName,
    phoneNumber: ride.passengerPhone,
    email: ride.passengerEmail ?? '',
    pickup: ride.pickup,
    dropoff: ride.dropoff,
    date,
    time,
    vehicleType: ride.vehicleType,
    passengers: ride.passengers,
    specialRequests: ride.specialRequests ?? '',
  };
  showEditModal.value = true;
}

function closeEditModal() {
  showEditModal.value = false;
  selectedRideForEdit.value = null;
}

function updateRide() {
  if (!selectedRideForEdit.value) return;
  const ride = rides.value.find((r) => r.id === selectedRideForEdit.value!.id);
  if (ride) {
    ride.passengerName = editForm.value.fullName;
    ride.passengerPhone = editForm.value.phoneNumber;
    ride.passengerEmail = editForm.value.email || undefined;
    ride.pickup = editForm.value.pickup;
    ride.dropoff = editForm.value.dropoff;
    ride.dateTime = `${editForm.value.date} at ${editForm.value.time}`;
    ride.vehicleType = editForm.value.vehicleType;
    ride.passengers = editForm.value.passengers;
    ride.specialRequests = editForm.value.specialRequests || undefined;
  }
  closeEditModal();
}
</script>
