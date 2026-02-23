<template>
  <div class="min-h-screen bg-white p-5 md:p-6">
    <div class="mx-auto max-w-[1220px] space-y-6">
      <!-- Header -->
      <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 class="text-[30px] font-semibold leading-tight text-[#0f172a]">Pricing & Fare Rules</h1>
          <p class="mt-1 text-sm text-[#64748b]">Manage pricing for different vehicle types and zones</p>
        </div>
        <div class="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <div class="flex flex-wrap items-center gap-2">
            <button
              class="flex items-center gap-2 rounded-lg border border-[#e5e7eb] bg-white px-4 py-2.5 text-sm font-medium text-[#0f172a] hover:bg-[#f8fafc]"
              @click="openFareSimulatorModal"
            >
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Fare Simulator
            </button>
            <button
              class="flex items-center gap-2 rounded-lg border border-[#e5e7eb] bg-white px-4 py-2.5 text-sm font-medium text-[#0f172a] hover:bg-[#f8fafc]"
              @click="openSurgeModal"
            >
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Configure Surge
            </button>
            <button
              class="flex items-center gap-2 rounded-lg bg-[#0f172a] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#1e293b]"
              @click="openAddVehicleModal"
            >
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Add Vehicle Type
            </button>
          </div>
        </div>
      </div>

      <!-- Vehicle Type Cards -->
      <div class="space-y-4">
        <div
          v-for="vehicle in vehicleTypes"
          :key="vehicle.id"
          class="rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-sm"
        >
          <div class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div class="flex-1">
              <div class="flex flex-wrap items-center gap-2">
                <span class="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f1f5f9]">
                  <IconCar class="h-5 w-5 text-[#64748b]" />
                </span>
                <div class="flex flex-wrap items-center gap-2">
                  <h3 class="text-lg font-semibold text-[#0f172a]">{{ vehicle.name }}</h3>
                  <span class="inline-flex rounded-full bg-[#0f172a] px-2.5 py-0.5 text-xs font-medium text-white">
                    active
                  </span>
                </div>
              </div>
              <p class="mt-3 text-sm text-[#64748b]">{{ vehicle.description }}</p>
              <div class="mt-2 flex items-center gap-1.5 text-sm text-[#64748b]">
                <IconUsers class="h-4 w-4" />
                <span>Capacity: {{ vehicle.capacity }} passengers</span>
              </div>
              <div class="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-4">
                <div>
                  <p class="text-xs text-[#94a3b8]">Base Fare</p>
                  <p class="text-sm font-medium text-[#0f172a]">{{ vehicle.baseFare }}</p>
                </div>
                <div>
                  <p class="text-xs text-[#94a3b8]">Rate per km</p>
                  <p class="text-sm font-medium text-[#0f172a]">{{ vehicle.ratePerKm }}</p>
                </div>
                <div>
                  <p class="text-xs text-[#94a3b8]">Rate per min</p>
                  <p class="text-sm font-medium text-[#0f172a]">{{ vehicle.ratePerMin }}</p>
                </div>
                <div>
                  <p class="text-xs text-[#94a3b8]">Minimum Fare</p>
                  <p class="text-sm font-medium text-[#0f172a]">{{ vehicle.minimumFare }}</p>
                </div>
              </div>
            </div>
            <div class="flex flex-wrap items-center gap-2 lg:shrink-0">
              <button
                class="flex items-center gap-2 rounded-lg bg-[#f1f5f9] px-3 py-2 text-sm font-medium text-[#475569] hover:bg-[#e2e8f0]"
                @click="openDetailsModal(vehicle)"
              >
                <IconEye class="h-4 w-4" />
                Details
              </button>
              <button
                class="flex items-center gap-2 rounded-lg bg-[#f1f5f9] px-3 py-2 text-sm font-medium text-[#475569] hover:bg-[#e2e8f0]"
                @click="openHistoryModal(vehicle)"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                History
              </button>
              <button
                class="flex items-center gap-2 rounded-lg bg-[#0f172a] px-3 py-2 text-sm font-medium text-white hover:bg-[#1e293b]"
                @click="openEditPricingModal(vehicle)"
              >
                <IconPencil class="h-4 w-4" />
                Edit
              </button>
              <button class="flex h-9 w-9 items-center justify-center rounded-lg bg-[#dc2626] text-white hover:bg-[#b91c1c]">
                <IconTrash class="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pricing History Modal -->
    <Teleport to="body">
      <div
        v-if="showHistoryModal && historyVehicle"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4"
        @click.self="closeHistoryModal"
      >
        <div class="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-xl bg-white shadow-xl" @click.stop>
          <div class="px-6 py-5">
            <div class="flex items-start justify-between">
              <div class="flex items-center gap-3">
                <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f1f5f9]">
                  <svg class="h-5 w-5 text-[#64748b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <div>
                  <h2 class="text-lg font-semibold text-[#0f172a]">Pricing History - {{ historyVehicle.name }}</h2>
                  <p class="mt-0.5 text-sm text-[#64748b]">View all pricing changes for this vehicle type</p>
                </div>
              </div>
              <button class="rounded-lg p-1.5 text-[#64748b] hover:bg-[#f1f5f9]" @click="closeHistoryModal">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div class="mt-5 space-y-3">
              <div
                v-for="(entry, idx) in historyEntries"
                :key="idx"
                class="flex gap-3 rounded-lg border border-[#e5e7eb] p-4"
              >
                <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f1f5f9]">
                  <svg class="h-4 w-4 text-[#64748b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                </span>
                <div class="min-w-0 flex-1">
                  <p class="text-sm font-medium text-[#0f172a]">{{ entry.updateType }}</p>
                  <p class="mt-1 text-sm">
                    <span class="text-[#64748b] line-through">{{ entry.oldValue }}</span>
                    <span class="ml-2 font-medium text-[#16a34a]">{{ entry.newValue }}</span>
                  </p>
                  <p class="mt-2 text-xs text-[#94a3b8]">{{ entry.updater }}</p>
                  <p class="mt-0.5 text-xs text-[#94a3b8]">{{ entry.date }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Vehicle Details Modal -->
    <Teleport to="body">
      <div
        v-if="showDetailsModal && detailsVehicle"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4"
        @click.self="closeDetailsModal"
      >
        <div class="relative w-full max-w-sm rounded-xl bg-white shadow-xl" @click.stop>
          <div class="max-h-[70vh] overflow-y-auto px-4 py-3">
            <div class="flex items-start justify-between gap-2">
              <div class="flex items-center gap-2 min-w-0">
                <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#f1f5f9]">
                  <IconCar class="h-4 w-4 text-[#64748b]" />
                </span>
                <div class="min-w-0">
                  <h2 class="text-base font-semibold text-[#0f172a]">{{ detailsVehicle.name }} - Vehicle Details</h2>
                  <p class="mt-0.5 text-xs text-[#64748b]">Complete overview of vehicle type configuration and pricing</p>
                </div>
              </div>
              <button class="shrink-0 rounded-lg p-1 text-[#64748b] hover:bg-[#f1f5f9]" @click="closeDetailsModal">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div class="mt-3 flex flex-wrap items-start justify-between gap-2">
              <div class="flex-1 min-w-0">
                <p class="text-[10px] font-medium text-[#475569]">Description</p>
                <p class="text-xs text-[#0f172a]">{{ detailsVehicle.description }}</p>
              </div>
              <span class="shrink-0 rounded-full bg-[#dcfce7] px-2 py-0.5 text-[10px] font-medium text-[#16a34a]">Active</span>
            </div>

            <div class="mt-3 grid grid-cols-3 gap-2">
              <div class="rounded-lg border border-[#e5e7eb] bg-[#f8fafc] p-2 text-center">
                <p class="text-lg font-semibold text-[#0f172a]">{{ detailsVehicle.capacity }}</p>
                <p class="text-[10px] text-[#64748b]">passengers</p>
              </div>
              <div class="rounded-lg border border-[#e5e7eb] bg-[#f8fafc] p-2 text-center">
                <p class="text-sm font-semibold text-[#0f172a]">{{ detailsVehicle.baseFare }}</p>
                <p class="text-[10px] text-[#64748b]">Base Fare</p>
              </div>
              <div class="rounded-lg border border-[#e5e7eb] bg-[#f8fafc] p-2 text-center">
                <p class="text-sm font-semibold text-[#0f172a]">{{ detailsVehicle.minimumFare }}</p>
                <p class="text-[10px] text-[#64748b]">Min Fare</p>
              </div>
            </div>

            <div class="mt-3">
              <p class="text-xs font-semibold text-[#0f172a]">Pricing Breakdown</p>
              <div class="mt-2 grid grid-cols-2 gap-2">
                <div class="rounded border border-[#e5e7eb] px-3 py-2">
                  <p class="text-[10px] text-[#64748b]">Per Kilometer</p>
                  <p class="text-xs font-medium text-[#0f172a]">{{ detailsVehicle.ratePerKm }}</p>
                </div>
                <div class="rounded border border-[#e5e7eb] px-3 py-2">
                  <p class="text-[10px] text-[#64748b]">Per Minute</p>
                  <p class="text-xs font-medium text-[#0f172a]">{{ detailsVehicle.ratePerMin }}</p>
                </div>
                <div class="rounded border border-[#e5e7eb] px-3 py-2">
                  <p class="text-[10px] text-[#64748b]">Wait Time Rate</p>
                  <p class="text-xs font-medium text-[#0f172a]">$0.25/min</p>
                </div>
                <div class="rounded border border-[#e5e7eb] px-3 py-2">
                  <p class="text-[10px] text-[#64748b]">Cancellation Fee</p>
                  <p class="text-xs font-medium text-[#0f172a]">$3.00</p>
                </div>
              </div>
            </div>

            <div class="mt-3">
              <p class="text-xs font-semibold text-[#0f172a]">Multipliers</p>
              <div class="mt-1.5 flex flex-wrap gap-1.5">
                <span class="inline-flex rounded-full bg-[#fff7ed] px-2 py-0.5 text-xs font-medium text-[#c2410c]">Peak Hour: 1.2x</span>
                <span class="inline-flex rounded-full bg-[#f5f3ff] px-2 py-0.5 text-xs font-medium text-[#7c3aed]">Night Charge: 1.15x</span>
              </div>
            </div>

            <div class="mt-3 flex items-start gap-2 rounded border border-[#93c5fd] bg-[#eff6ff] px-3 py-2">
              <svg class="mt-0.5 h-4 w-4 shrink-0 text-[#2563eb]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <p class="text-xs text-[#1e40af]">Tolls & fees: Included in fare</p>
            </div>
          </div>

          <div class="flex justify-end gap-2 border-t border-[#e5e7eb] px-4 py-3">
            <button
              class="rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-xs font-medium text-[#475569] hover:bg-[#f8fafc]"
              @click="closeDetailsModal"
            >
              Close
            </button>
            <button
              class="rounded-lg bg-[#0f172a] px-3 py-2 text-xs font-medium text-white hover:bg-[#1e293b]"
              @click="openEditFromDetails"
            >
              Edit Pricing
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Fare Simulator Modal -->
    <Teleport to="body">
      <div
        v-if="showFareSimulatorModal"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4"
        @click.self="closeFareSimulatorModal"
      >
        <div class="relative w-full max-w-md rounded-xl bg-white shadow-xl" @click.stop>
          <div class="px-6 py-5">
            <div class="flex items-start justify-between">
              <div>
                <h2 class="text-lg font-semibold text-[#0f172a]">Fare Simulator</h2>
                <p class="mt-1 text-sm text-[#64748b]">Calculate estimated fare based on distance, time, and vehicle type.</p>
              </div>
              <button
                class="rounded-lg p-1.5 text-[#64748b] hover:bg-[#f1f5f9]"
                @click="closeFareSimulatorModal"
              >
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div class="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <label class="block text-xs font-medium text-[#475569]">Distance (km)</label>
                <input
                  v-model.number="fareSimulator.distance"
                  type="number"
                  step="0.1"
                  min="0"
                  class="mt-1.5 h-10 w-full rounded-lg border border-[#e5e7eb] bg-[#f8fafc] px-3 text-sm text-[#0f172a] outline-none focus:border-[#2563eb]"
                />
              </div>
              <div>
                <label class="block text-xs font-medium text-[#475569]">Time (minutes)</label>
                <input
                  v-model.number="fareSimulator.time"
                  type="number"
                  min="0"
                  class="mt-1.5 h-10 w-full rounded-lg border border-[#e5e7eb] bg-[#f8fafc] px-3 text-sm text-[#0f172a] outline-none focus:border-[#2563eb]"
                />
              </div>
            </div>

            <div class="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label class="block text-xs font-medium text-[#475569]">Vehicle Type</label>
                <select
                  v-model="fareSimulator.vehicleType"
                  class="mt-1.5 h-10 w-full rounded-lg border border-[#e5e7eb] bg-[#f8fafc] px-3 text-sm text-[#0f172a] outline-none focus:border-[#2563eb]"
                >
                  <option value="">Select vehicle type</option>
                  <option v-for="v in vehicleTypes" :key="v.id" :value="v.id">{{ v.name }}</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-medium text-[#475569]">Surge Multiplier</label>
                <input
                  v-model.number="fareSimulator.surgeMultiplier"
                  type="number"
                  step="0.1"
                  min="1"
                  class="mt-1.5 h-10 w-full rounded-lg border border-[#e5e7eb] bg-[#f8fafc] px-3 text-sm text-[#0f172a] outline-none focus:border-[#2563eb]"
                />
              </div>
            </div>
          </div>

          <div class="flex justify-end gap-3 border-t border-[#e5e7eb] px-6 py-4">
            <button
              class="rounded-lg border border-[#e5e7eb] bg-white px-4 py-2.5 text-sm font-medium text-[#475569] hover:bg-[#f8fafc]"
              @click="closeFareSimulatorModal"
            >
              Cancel
            </button>
            <button
              class="flex items-center gap-2 rounded-lg bg-[#0f172a] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#1e293b]"
              @click="saveFareSimulator"
            >
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Surge Pricing Setup Modal -->
    <Teleport to="body">
      <div
        v-if="showSurgeModal"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4"
        @click.self="closeSurgeModal"
      >
        <div class="relative w-full max-w-md rounded-xl bg-white shadow-xl" @click.stop>
          <div class="px-6 py-5">
            <div class="flex items-start justify-between">
              <div>
                <h2 class="text-lg font-semibold text-[#0f172a]">Surge Pricing Setup</h2>
                <p class="mt-1 text-sm text-[#64748b]">Configure surge pricing zone, multiplier, and schedule</p>
              </div>
              <button
                class="rounded-lg p-1.5 text-[#64748b] hover:bg-[#f1f5f9]"
                @click="closeSurgeModal"
              >
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div class="mt-6 space-y-4">
              <div>
                <label class="block text-xs font-medium text-[#475569]">Zone Name</label>
                <input
                  v-model="surgeSetup.zoneName"
                  type="text"
                  class="mt-1.5 h-10 w-full rounded-lg border border-[#e5e7eb] bg-[#f8fafc] px-3 text-sm text-[#0f172a] outline-none focus:border-[#2563eb]"
                />
              </div>
              <div>
                <label class="block text-xs font-medium text-[#475569]">Surge Multiplier</label>
                <input
                  v-model.number="surgeSetup.surgeMultiplier"
                  type="number"
                  step="0.1"
                  min="1"
                  class="mt-1.5 h-10 w-full rounded-lg border border-[#e5e7eb] bg-[#f8fafc] px-3 text-sm text-[#0f172a] outline-none focus:border-[#2563eb]"
                />
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-medium text-[#475569]">Start Time</label>
                  <input
                    v-model="surgeSetup.startTime"
                    type="time"
                    class="mt-1.5 h-10 w-full rounded-lg border border-[#e5e7eb] bg-[#f8fafc] px-3 text-sm text-[#0f172a] outline-none focus:border-[#2563eb]"
                  />
                </div>
                <div>
                  <label class="block text-xs font-medium text-[#475569]">End Time</label>
                  <input
                    v-model="surgeSetup.endTime"
                    type="time"
                    class="mt-1.5 h-10 w-full rounded-lg border border-[#e5e7eb] bg-[#f8fafc] px-3 text-sm text-[#0f172a] outline-none focus:border-[#2563eb]"
                  />
                </div>
              </div>
              <div>
                <label class="block text-xs font-medium text-[#475569]">Zone Area</label>
                <button
                  type="button"
                  class="mt-1.5 flex min-h-[140px] w-full flex-col items-center justify-center gap-2 rounded-lg border border-[#e5e7eb] bg-[#f1f5f9] px-4 py-6 text-center transition-colors hover:bg-[#e2e8f0]"
                >
                  <svg class="h-10 w-10 text-[#94a3b8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span class="text-sm text-[#64748b]">Click to draw zone polygon on map</span>
                </button>
              </div>
            </div>
          </div>

          <div class="flex justify-end gap-3 border-t border-[#e5e7eb] px-6 py-4">
            <button
              class="rounded-lg border border-[#e5e7eb] bg-white px-4 py-2.5 text-sm font-medium text-[#475569] hover:bg-[#f8fafc]"
              @click="closeSurgeModal"
            >
              Cancel
            </button>
            <button
              class="rounded-lg bg-[#0f172a] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#1e293b]"
              @click="saveSurgeZone"
            >
              Save Surge Zone
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Add New Vehicle Type Modal -->
    <Teleport to="body">
      <div
        v-if="showAddVehicleModal"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4"
        @click.self="closeAddVehicleModal"
      >
        <div class="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white shadow-xl" @click.stop>
          <div class="px-6 py-5">
            <div class="flex items-start justify-between">
              <div>
                <h2 class="text-lg font-semibold text-[#0f172a]">Add New Vehicle Type</h2>
                <p class="mt-1 text-sm text-[#64748b]">Create a new vehicle type with custom pricing and configuration.</p>
              </div>
              <button
                class="rounded-lg p-1.5 text-[#64748b] hover:bg-[#f1f5f9]"
                @click="closeAddVehicleModal"
              >
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div class="mt-4 flex items-start gap-3 rounded-lg border border-[#93c5fd] bg-[#eff6ff] px-4 py-3">
              <svg class="mt-0.5 h-5 w-5 shrink-0 text-[#2563eb]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p class="text-sm text-[#1e40af]">Define the vehicle type details and initial pricing structure. You can refine pricing later.</p>
            </div>

            <div class="mt-6 space-y-4">
              <h3 class="text-sm font-semibold text-[#0f172a]">Vehicle Information</h3>
              <div>
                <label class="block text-xs font-medium text-[#475569]">Vehicle Type Name <span class="text-[#dc2626]">*</span></label>
                <input
                  v-model="newVehicle.name"
                  type="text"
                  placeholder="e.g., Economy, Luxury, SUV"
                  class="mt-1.5 h-10 w-full rounded-lg border border-[#e5e7eb] bg-[#f8fafc] px-3 text-sm text-[#0f172a] placeholder:text-[#94a3b8] outline-none focus:border-[#2563eb]"
                />
              </div>
              <div>
                <label class="block text-xs font-medium text-[#475569]">Passenger Capacity <span class="text-[#dc2626]">*</span></label>
                <input
                  v-model.number="newVehicle.capacity"
                  type="number"
                  min="1"
                  class="mt-1.5 h-10 w-full rounded-lg border border-[#e5e7eb] bg-[#f8fafc] px-3 text-sm text-[#0f172a] outline-none focus:border-[#2563eb]"
                />
              </div>
              <div>
                <label class="block text-xs font-medium text-[#475569]">Description <span class="text-[#dc2626]">*</span></label>
                <textarea
                  v-model="newVehicle.description"
                  rows="3"
                  placeholder="Brief description of this vehicle type..."
                  class="mt-1.5 w-full rounded-lg border border-[#e5e7eb] bg-[#f8fafc] px-3 py-2.5 text-sm text-[#0f172a] placeholder:text-[#94a3b8] outline-none focus:border-[#2563eb]"
                />
              </div>
            </div>

            <div class="mt-6 space-y-4">
              <h3 class="text-sm font-semibold text-[#0f172a]">Initial Pricing Structure</h3>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-medium text-[#475569]">Base Fare ($)</label>
                  <input
                    v-model.number="newVehicle.baseFare"
                    type="number"
                    step="0.01"
                    min="0"
                    class="mt-1.5 h-10 w-full rounded-lg border border-[#e5e7eb] bg-[#f8fafc] px-3 text-sm text-[#0f172a] outline-none focus:border-[#2563eb]"
                  />
                </div>
                <div>
                  <label class="block text-xs font-medium text-[#475569]">Rate per km ($)</label>
                  <input
                    v-model.number="newVehicle.ratePerKm"
                    type="number"
                    step="0.01"
                    min="0"
                    class="mt-1.5 h-10 w-full rounded-lg border border-[#e5e7eb] bg-[#f8fafc] px-3 text-sm text-[#0f172a] outline-none focus:border-[#2563eb]"
                  />
                </div>
                <div>
                  <label class="block text-xs font-medium text-[#475569]">Rate per min ($)</label>
                  <input
                    v-model.number="newVehicle.ratePerMin"
                    type="number"
                    step="0.01"
                    min="0"
                    class="mt-1.5 h-10 w-full rounded-lg border border-[#e5e7eb] bg-[#f8fafc] px-3 text-sm text-[#0f172a] outline-none focus:border-[#2563eb]"
                  />
                </div>
                <div>
                  <label class="block text-xs font-medium text-[#475569]">Minimum Fare ($)</label>
                  <input
                    v-model.number="newVehicle.minimumFare"
                    type="number"
                    step="0.01"
                    min="0"
                    class="mt-1.5 h-10 w-full rounded-lg border border-[#e5e7eb] bg-[#f8fafc] px-3 text-sm text-[#0f172a] outline-none focus:border-[#2563eb]"
                  />
                </div>
              </div>
            </div>

            <div class="mt-6 flex items-center justify-between rounded-lg border border-[#e5e7eb] bg-[#f8fafc] px-4 py-3">
              <div>
                <p class="text-sm font-medium text-[#0f172a]">Set as Active</p>
                <p class="text-xs text-[#64748b]">Make this vehicle type available for bookings immediately.</p>
              </div>
              <button
                type="button"
                role="switch"
                :aria-checked="newVehicle.isActive"
                class="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors"
                :class="newVehicle.isActive ? 'bg-[#2563eb]' : 'bg-[#cbd5e1]'"
                @click="newVehicle.isActive = !newVehicle.isActive"
              >
                <span
                  class="pointer-events-none absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow ring-0 transition-transform"
                  :class="newVehicle.isActive ? 'translate-x-5' : 'translate-x-0'"
                />
              </button>
            </div>
          </div>

          <div class="flex justify-end gap-3 border-t border-[#e5e7eb] px-6 py-4">
            <button
              class="rounded-lg border border-[#e5e7eb] bg-white px-4 py-2.5 text-sm font-medium text-[#475569] hover:bg-[#f8fafc]"
              @click="closeAddVehicleModal"
            >
              Cancel
            </button>
            <button
              class="rounded-lg bg-[#0f172a] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#1e293b]"
              @click="addVehicleType"
            >
              Add Vehicle Type
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Edit Pricing Modal -->
    <Teleport to="body">
      <div
        v-if="showEditPricingModal && editingVehicle"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4"
        @click.self="closeEditPricingModal"
      >
        <div class="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-xl" @click.stop>
          <div class="px-6 py-5">
            <div class="flex items-start justify-between">
              <div class="flex items-center gap-2">
                <svg class="h-5 w-5 text-[#0f172a]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                <h2 class="text-lg font-semibold text-[#0f172a]">Edit Pricing - {{ editingVehicle.name }}</h2>
              </div>
              <button class="rounded-lg p-1.5 text-[#64748b] hover:bg-[#f1f5f9]" @click="closeEditPricingModal">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <p class="mt-1 text-sm text-[#64748b]">Configure all pricing parameters for this vehicle type. Changes will be saved to the system.</p>

            <!-- Tabs -->
            <div class="mt-4 flex gap-1 rounded-lg border border-[#e5e7eb] bg-[#f8fafc] p-1">
              <button
                v-for="tab in editPricingTabs"
                :key="tab.id"
                class="flex-1 rounded-md px-3 py-2 text-xs font-medium transition-colors"
                :class="editPricingTab === tab.id ? 'bg-white text-[#0f172a] shadow-sm' : 'text-[#64748b] hover:text-[#0f172a]'"
                @click="editPricingTab = tab.id"
              >
                {{ tab.label }}
              </button>
            </div>

            <!-- Base Pricing -->
            <div v-show="editPricingTab === 'base'" class="mt-5 space-y-4">
              <div class="flex items-start gap-3 rounded-lg border border-[#e5e7eb] bg-[#f8fafc] px-4 py-3">
                <svg class="mt-0.5 h-5 w-5 shrink-0 text-[#64748b]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                <p class="text-sm text-[#475569]">Base pricing defines the fundamental fare structure for this vehicle type.</p>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-medium text-[#475569]">Base Fare ($)</label>
                  <input v-model.number="editForm.baseFare" type="number" step="0.01" min="0" class="mt-1.5 h-10 w-full rounded-lg border border-[#e5e7eb] bg-[#f8fafc] px-3 text-sm outline-none focus:border-[#2563eb]" />
                  <p class="mt-1 text-xs text-[#94a3b8]">Initial charge when trip starts</p>
                </div>
                <div>
                  <label class="block text-xs font-medium text-[#475569]">Rate per Kilometer ($)</label>
                  <input v-model.number="editForm.ratePerKm" type="number" step="0.01" min="0" class="mt-1.5 h-10 w-full rounded-lg border border-[#e5e7eb] bg-[#f8fafc] px-3 text-sm outline-none focus:border-[#2563eb]" />
                  <p class="mt-1 text-xs text-[#94a3b8]">Cost per kilometer traveled</p>
                </div>
                <div>
                  <label class="block text-xs font-medium text-[#475569]">Rate per Minute ($)</label>
                  <input v-model.number="editForm.ratePerMin" type="number" step="0.01" min="0" class="mt-1.5 h-10 w-full rounded-lg border border-[#e5e7eb] bg-[#f8fafc] px-3 text-sm outline-none focus:border-[#2563eb]" />
                  <p class="mt-1 text-xs text-[#94a3b8]">Cost per minute of trip duration</p>
                </div>
                <div>
                  <label class="block text-xs font-medium text-[#475569]">Wait Time Rate ($/min)</label>
                  <input v-model.number="editForm.waitTimeRate" type="number" step="0.01" min="0" class="mt-1.5 h-10 w-full rounded-lg border border-[#e5e7eb] bg-[#f8fafc] px-3 text-sm outline-none focus:border-[#2563eb]" />
                  <p class="mt-1 text-xs text-[#94a3b8]">Charged when vehicle is waiting</p>
                </div>
                <div>
                  <label class="block text-xs font-medium text-[#475569]">Minimum Fare ($)</label>
                  <input v-model.number="editForm.minimumFare" type="number" step="0.01" min="0" class="mt-1.5 h-10 w-full rounded-lg border border-[#e5e7eb] bg-[#f8fafc] px-3 text-sm outline-none focus:border-[#2563eb]" />
                  <p class="mt-1 text-xs text-[#94a3b8]">Minimum charge for any trip</p>
                </div>
                <div>
                  <label class="block text-xs font-medium text-[#475569]">Maximum Fare ($)</label>
                  <input v-model.number="editForm.maximumFare" type="number" step="0.01" min="0" class="mt-1.5 h-10 w-full rounded-lg border border-[#e5e7eb] bg-[#f8fafc] px-3 text-sm outline-none focus:border-[#2563eb]" />
                  <p class="mt-1 text-xs text-[#94a3b8]">Optional cap on trip fare</p>
                </div>
              </div>
            </div>

            <!-- Time-based -->
            <div v-show="editPricingTab === 'time'" class="mt-5 space-y-5">
              <div class="flex items-center gap-2">
                <svg class="h-4 w-4 text-[#64748b]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                <p class="text-sm text-[#475569]">Configure multipliers for peak hours and night-time rides.</p>
              </div>
              <div>
                <label class="block text-xs font-medium text-[#475569]">Peak Hour Multiplier</label>
                <p class="mt-0.5 text-xs text-[#94a3b8]">Applied during rush hours (7-9 AM, 5-7 PM)</p>
                <div class="mt-2 flex items-center gap-3">
                  <input v-model.number="editForm.peakMultiplier" type="range" min="1" max="2" step="0.05" class="range-slider h-2 flex-1" :style="{ '--fill': ((editForm.peakMultiplier - 1) * 100) + '%' }" />
                  <span class="w-12 text-right text-sm font-medium">{{ editForm.peakMultiplier }}x</span>
                </div>
                <div class="mt-1 flex justify-between text-xs text-[#94a3b8]"><span>1.0x (Normal)</span><span>2.0x (Double)</span></div>
              </div>
              <div>
                <label class="block text-xs font-medium text-[#475569]">Night Charge Multiplier</label>
                <p class="mt-0.5 text-xs text-[#94a3b8]">Applied from 10 PM to 6 AM</p>
                <div class="mt-2 flex items-center gap-3">
                  <input v-model.number="editForm.nightMultiplier" type="range" min="1" max="2" step="0.05" class="range-slider h-2 flex-1" :style="{ '--fill': ((editForm.nightMultiplier - 1) * 100) + '%' }" />
                  <span class="w-12 text-right text-sm font-medium">{{ editForm.nightMultiplier }}x</span>
                </div>
                <div class="mt-1 flex justify-between text-xs text-[#94a3b8]"><span>1.0x (Normal)</span><span>2.0x (Double)</span></div>
              </div>
              <div class="rounded-lg border border-[#93c5fd] bg-[#eff6ff] px-4 py-3 text-sm text-[#1e40af]">Time-based multipliers are applied on top of base pricing and do not stack with surge pricing. The highest applicable multiplier will be used.</div>
            </div>

            <!-- Fees & Charges -->
            <div v-show="editPricingTab === 'fees'" class="mt-5 space-y-4">
              <div class="flex items-start gap-3 rounded-lg border border-[#e5e7eb] bg-[#f8fafc] px-4 py-3">
                <svg class="mt-0.5 h-5 w-5 shrink-0 text-[#64748b]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                <p class="text-sm text-[#475569]">Additional fees and charges for special situations.</p>
              </div>
              <div>
                <label class="block text-xs font-medium text-[#475569]">Cancellation Fee ($)</label>
                <input v-model.number="editForm.cancellationFee" type="number" step="0.01" min="0" class="mt-1.5 h-10 w-full rounded-lg border border-[#e5e7eb] bg-[#f8fafc] px-3 text-sm outline-none focus:border-[#2563eb]" />
                <p class="mt-1 text-xs text-[#94a3b8]">Charged when passenger cancels after driver accepts.</p>
              </div>
              <div class="flex items-center justify-between rounded-lg border border-[#e5e7eb] bg-[#f8fafc] px-4 py-3">
                <div><p class="text-sm font-medium text-[#0f172a]">Include Tolls & Fees</p><p class="text-xs text-[#64748b]">Automatically add road tolls and parking fees to trip fare.</p></div>
                <button type="button" role="switch" :aria-checked="editForm.includeTolls" class="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors" :class="editForm.includeTolls ? 'bg-[#2563eb]' : 'bg-[#cbd5e1]'" @click="editForm.includeTolls = !editForm.includeTolls"><span class="pointer-events-none absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform" :class="editForm.includeTolls ? 'translate-x-5' : 'translate-x-0'" /></button>
              </div>
              <div class="flex items-center justify-between rounded-lg border border-[#e5e7eb] bg-[#f8fafc] px-4 py-3">
                <div><p class="text-sm font-medium text-[#0f172a]">Vehicle Type Status</p><p class="text-xs text-[#64748b]">Enable or disable this vehicle type for new bookings.</p></div>
                <button type="button" role="switch" :aria-checked="editForm.isActive" class="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors" :class="editForm.isActive ? 'bg-[#2563eb]' : 'bg-[#cbd5e1]'" @click="editForm.isActive = !editForm.isActive"><span class="pointer-events-none absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform" :class="editForm.isActive ? 'translate-x-5' : 'translate-x-0'" /></button>
              </div>
            </div>

            <!-- Preview -->
            <div v-show="editPricingTab === 'preview'" class="mt-5 space-y-4">
              <div class="flex items-center gap-2">
                <svg class="h-4 w-4 text-[#64748b]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 00.707.293H19a2 2 0 002-2v-1a2 2 0 00-2-2z"/></svg>
                <p class="text-sm font-medium text-[#0f172a]">Preview fare calculations with the new pricing structure</p>
              </div>
              <div class="grid gap-4 sm:grid-cols-2">
                <div class="rounded-lg border border-[#e5e7eb] bg-white p-4">
                  <p class="text-xs font-medium text-[#64748b]">Sample Trip: Short Distance</p>
                  <div class="mt-3 space-y-1 text-xs text-[#475569]"><p>Distance: 5 km</p><p>Duration: 12 minutes</p><p>Base Fare: ${{ editForm.baseFare.toFixed(2) }}</p><p>Distance (5 × ${{ editForm.ratePerKm }}): ${{ (5 * editForm.ratePerKm).toFixed(2) }}</p><p>Time (12 × ${{ editForm.ratePerMin }}): ${{ (12 * editForm.ratePerMin).toFixed(2) }}</p></div>
                  <p class="mt-3 font-semibold text-[#0f172a]">Estimated Total: ${{ previewShortTotal.toFixed(2) }}</p>
                </div>
                <div class="rounded-lg border border-[#e5e7eb] bg-white p-4">
                  <p class="text-xs font-medium text-[#64748b]">Sample Trip: Long Distance</p>
                  <div class="mt-3 space-y-1 text-xs text-[#475569]"><p>Distance: 25 km</p><p>Duration: 35 minutes</p><p>Base Fare: ${{ editForm.baseFare.toFixed(2) }}</p><p>Distance (25 × ${{ editForm.ratePerKm }}): ${{ (25 * editForm.ratePerKm).toFixed(2) }}</p><p>Time (35 × ${{ editForm.ratePerMin }}): ${{ (35 * editForm.ratePerMin).toFixed(2) }}</p></div>
                  <p class="mt-3 font-semibold text-[#0f172a]">Estimated Total: ${{ previewLongTotal.toFixed(2) }}</p>
                </div>
                <div class="rounded-lg border border-[#e5e7eb] bg-[#f8fafc] p-4">
                  <p class="text-xs font-medium text-[#64748b]">Peak Hour (10 km, 20 min)</p>
                  <div class="mt-3 space-y-1 text-xs text-[#475569]"><p>Base Calculation: ${{ previewBase10.toFixed(2) }}</p><p>Peak Multiplier ({{ editForm.peakMultiplier }}x): ×{{ editForm.peakMultiplier }}</p></div>
                  <p class="mt-3 font-semibold text-[#0f172a]">Peak Hour Total: ${{ (previewBase10 * editForm.peakMultiplier).toFixed(2) }}</p>
                </div>
                <div class="rounded-lg border border-[#e5e7eb] bg-[#f8fafc] p-4">
                  <p class="text-xs font-medium text-[#64748b]">Night Ride (10 km, 20 min)</p>
                  <div class="mt-3 space-y-1 text-xs text-[#475569]"><p>Base Calculation: ${{ previewBase10.toFixed(2) }}</p><p>Night Multiplier ({{ editForm.nightMultiplier }}x): ×{{ editForm.nightMultiplier }}</p></div>
                  <p class="mt-3 font-semibold text-[#0f172a]">Night Ride Total: ${{ (previewBase10 * editForm.nightMultiplier).toFixed(2) }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="flex justify-end gap-3 border-t border-[#e5e7eb] px-6 py-4">
            <button class="flex items-center gap-2 rounded-lg border border-[#e5e7eb] bg-white px-4 py-2.5 text-sm font-medium text-[#475569] hover:bg-[#f8fafc]" @click="closeEditPricingModal">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
              Cancel
            </button>
            <button class="flex items-center gap-2 rounded-lg bg-[#0f172a] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#1e293b]" @click="saveEditPricing">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/></svg>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import IconCar from '@/components/icon/icon-car.vue';
import IconUsers from '@/components/icon/icon-users.vue';
import IconEye from '@/components/icon/icon-eye.vue';
import IconPencil from '@/components/icon/icon-pencil.vue';
import IconTrash from '@/components/icon/icon-trash.vue';

type VehicleType = {
  id: string;
  name: string;
  description: string;
  capacity: number;
  baseFare: string;
  ratePerKm: string;
  ratePerMin: string;
  minimumFare: string;
};

const showFareSimulatorModal = ref(false);
const fareSimulator = ref({
  distance: 5.2,
  time: 18,
  vehicleType: '',
  surgeMultiplier: 1,
});

function openFareSimulatorModal() {
  showFareSimulatorModal.value = true;
}

function closeFareSimulatorModal() {
  showFareSimulatorModal.value = false;
}

function saveFareSimulator() {
  // TODO: calculate/save fare
  closeFareSimulatorModal();
}

const showDetailsModal = ref(false);
const detailsVehicle = ref<VehicleType | null>(null);

function openDetailsModal(vehicle: VehicleType) {
  detailsVehicle.value = vehicle;
  showDetailsModal.value = true;
}

function closeDetailsModal() {
  showDetailsModal.value = false;
  detailsVehicle.value = null;
}

function openEditFromDetails() {
  if (detailsVehicle.value) {
    closeDetailsModal();
    openEditPricingModal(detailsVehicle.value);
  }
}

const showHistoryModal = ref(false);
const historyVehicle = ref<VehicleType | null>(null);

function openHistoryModal(vehicle: VehicleType) {
  historyVehicle.value = vehicle;
  showHistoryModal.value = true;
}

function closeHistoryModal() {
  showHistoryModal.value = false;
  historyVehicle.value = null;
}

const historyEntries = computed(() => {
  const v = historyVehicle.value;
  if (!v) return [];
  const base = parseCurrency(v.baseFare);
  const rateKm = parseCurrency(v.ratePerKm);
  const min = parseCurrency(v.minimumFare);
  return [
    { updateType: 'Base Fare Updated', oldValue: `$${(base - 0.5).toFixed(2)}`, newValue: `$${base.toFixed(2)}`, updater: 'admin@paymax.com', date: '2025-10-15' },
    { updateType: 'Rate per km Updated', oldValue: `$${(rateKm - 0.2).toFixed(2)}`, newValue: `$${rateKm.toFixed(2)}`, updater: 'manager@paymax.com', date: '2025-10-10' },
    { updateType: 'Minimum Fare Updated', oldValue: `$${(min - 1).toFixed(2)}`, newValue: `$${min.toFixed(2)}`, updater: 'admin@paymax.com', date: '2025-10-05' },
  ];
});

const showSurgeModal = ref(false);
const surgeSetup = ref({
  zoneName: 'Downtown Area',
  surgeMultiplier: 1.5,
  startTime: '',
  endTime: '',
});

function openSurgeModal() {
  showSurgeModal.value = true;
}

function closeSurgeModal() {
  showSurgeModal.value = false;
}

function saveSurgeZone() {
  // TODO: save surge zone
  closeSurgeModal();
}

const showAddVehicleModal = ref(false);
const newVehicle = ref({
  name: '',
  capacity: 4,
  description: '',
  baseFare: 5,
  ratePerKm: 1.5,
  ratePerMin: 0.35,
  minimumFare: 8,
  isActive: true,
});

function openAddVehicleModal() {
  resetNewVehicleForm();
  showAddVehicleModal.value = true;
}

function closeAddVehicleModal() {
  showAddVehicleModal.value = false;
}

function resetNewVehicleForm() {
  newVehicle.value = {
    name: '',
    capacity: 4,
    description: '',
    baseFare: 5,
    ratePerKm: 1.5,
    ratePerMin: 0.35,
    minimumFare: 8,
    isActive: true,
  };
}

function addVehicleType() {
  if (!newVehicle.value.name?.trim()) return;
  const id = String(Date.now());
  vehicleTypes.value = [
    ...vehicleTypes.value,
    {
      id,
      name: newVehicle.value.name.trim(),
      description: newVehicle.value.description?.trim() || '',
      capacity: newVehicle.value.capacity || 4,
      baseFare: `$${Number(newVehicle.value.baseFare).toFixed(2)}`,
      ratePerKm: `$${Number(newVehicle.value.ratePerKm).toFixed(2)}`,
      ratePerMin: `$${Number(newVehicle.value.ratePerMin).toFixed(2)}`,
      minimumFare: `$${Number(newVehicle.value.minimumFare).toFixed(2)}`,
    },
  ];
  closeAddVehicleModal();
}

function parseCurrency(s: string): number {
  return parseFloat(String(s).replace(/[$,]/g, '')) || 0;
}

const showEditPricingModal = ref(false);
const editingVehicle = ref<VehicleType | null>(null);
const editPricingTab = ref<'base' | 'time' | 'fees' | 'preview'>('base');
const editPricingTabs = [
  { id: 'base' as const, label: 'Base Pricing' },
  { id: 'time' as const, label: 'Time-based' },
  { id: 'fees' as const, label: 'Fees & Charges' },
  { id: 'preview' as const, label: 'Preview' },
];
const editForm = ref({
  baseFare: 5,
  ratePerKm: 1.5,
  ratePerMin: 0.35,
  waitTimeRate: 0.25,
  minimumFare: 8,
  maximumFare: 150,
  peakMultiplier: 1.2,
  nightMultiplier: 1.15,
  cancellationFee: 3,
  includeTolls: true,
  isActive: true,
});

const previewShortTotal = computed(() => {
  const f = editForm.value;
  const total = f.baseFare + 5 * f.ratePerKm + 12 * f.ratePerMin;
  return Math.max(total, f.minimumFare);
});
const previewLongTotal = computed(() => {
  const f = editForm.value;
  const total = f.baseFare + 25 * f.ratePerKm + 35 * f.ratePerMin;
  return f.maximumFare > 0 ? Math.min(Math.max(total, f.minimumFare), f.maximumFare) : Math.max(total, f.minimumFare);
});
const previewBase10 = computed(() => {
  const f = editForm.value;
  return f.baseFare + 10 * f.ratePerKm + 20 * f.ratePerMin;
});

function openEditPricingModal(vehicle: VehicleType) {
  editingVehicle.value = vehicle;
  editForm.value = {
    baseFare: parseCurrency(vehicle.baseFare),
    ratePerKm: parseCurrency(vehicle.ratePerKm),
    ratePerMin: parseCurrency(vehicle.ratePerMin),
    waitTimeRate: 0.25,
    minimumFare: parseCurrency(vehicle.minimumFare),
    maximumFare: 150,
    peakMultiplier: 1.2,
    nightMultiplier: 1.15,
    cancellationFee: 3,
    includeTolls: true,
    isActive: true,
  };
  editPricingTab.value = 'base';
  showEditPricingModal.value = true;
}

function closeEditPricingModal() {
  showEditPricingModal.value = false;
  editingVehicle.value = null;
}

function saveEditPricing() {
  if (!editingVehicle.value) return;
  const v = vehicleTypes.value.find((x) => x.id === editingVehicle.value!.id);
  if (v) {
    v.baseFare = `$${editForm.value.baseFare.toFixed(2)}`;
    v.ratePerKm = `$${editForm.value.ratePerKm.toFixed(2)}`;
    v.ratePerMin = `$${editForm.value.ratePerMin.toFixed(2)}`;
    v.minimumFare = `$${editForm.value.minimumFare.toFixed(2)}`;
  }
  closeEditPricingModal();
}

const vehicleTypes = ref<VehicleType[]>([
  {
    id: '1',
    name: 'Standard',
    description: 'Affordable rides for everyday travel',
    capacity: 4,
    baseFare: '$5.00',
    ratePerKm: '$1.50',
    ratePerMin: '$0.35',
    minimumFare: '$8.00',
  },
  {
    id: '2',
    name: 'Premium',
    description: 'Luxury vehicles with premium comfort',
    capacity: 4,
    baseFare: '$8.00',
    ratePerKm: '$2.20',
    ratePerMin: '$0.50',
    minimumFare: '$12.00',
  },
  {
    id: '3',
    name: 'XL',
    description: 'Extra space for groups up to 6 passengers',
    capacity: 6,
    baseFare: '$10.00',
    ratePerKm: '$2.80',
    ratePerMin: '$0.60',
    minimumFare: '$15.00',
  },
]);
</script>

<style scoped>
.range-slider {
  -webkit-appearance: none;
  appearance: none;
  background: linear-gradient(to right, #334155 0%, #334155 var(--fill, 0%), #e5e7eb var(--fill, 0%), #e5e7eb 100%);
  border-radius: 9999px;
}
.range-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #334155;
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}
.range-slider::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #334155;
  cursor: pointer;
  border: none;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}
</style>
