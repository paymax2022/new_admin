<template>
  <div class="min-h-screen bg-white p-5 md:p-6">
    <div class="mx-auto max-w-[1220px] space-y-5">
      <!-- Header -->
      <div>
        <h1 class="text-2xl font-bold leading-tight text-[#333]">Vehicle Hire</h1>
        <p class="mt-1 text-sm text-[#6b7280]">Manage vehicle rental bookings and fleet</p>
      </div>

      <!-- Stats cards (Rentals tab) -->
      <div v-if="activeTab === 'rentals'" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div class="rounded-xl border border-[#e5e7eb] bg-white p-4 shadow-sm">
          <div class="flex items-start justify-between">
            <div>
              <p class="text-2xl font-bold text-[#333]">5</p>
              <p class="mt-1 text-xs font-medium text-[#22c55e]">+12.5% vs last period</p>
            </div>
            <span class="flex h-10 w-10 items-center justify-center rounded-lg bg-[#dbeafe] text-[#2563eb]">
              <IconCalendar class="h-5 w-5" />
            </span>
          </div>
          <p class="mt-2 text-sm font-medium text-[#6b7280]">Total Bookings</p>
        </div>
        <div class="rounded-xl border border-[#e5e7eb] bg-white p-4 shadow-sm">
          <div class="flex items-start justify-between">
            <div>
              <p class="text-2xl font-bold text-[#333]">3</p>
              <p class="mt-1 text-xs font-medium text-[#22c55e]">+12.5% vs last period</p>
            </div>
            <span class="flex h-10 w-10 items-center justify-center rounded-lg bg-[#dcfce7] text-[#16a34a]">
              <IconCar class="h-5 w-5" />
            </span>
          </div>
          <p class="mt-2 text-sm font-medium text-[#6b7280]">Active Rentals</p>
        </div>
        <div class="rounded-xl border border-[#e5e7eb] bg-white p-4 shadow-sm">
          <div class="flex items-start justify-between">
            <div>
              <p class="text-2xl font-bold text-[#333]">1</p>
              <p class="mt-1 text-xs font-medium text-[#22c55e]">+12.5% vs last period</p>
            </div>
            <span class="flex h-10 w-10 items-center justify-center rounded-lg bg-[#dbeafe] text-[#2563eb]">
              <IconSquareCheck class="h-5 w-5" />
            </span>
          </div>
          <p class="mt-2 text-sm font-medium text-[#6b7280]">Completed</p>
        </div>
        <div class="rounded-xl border border-[#e5e7eb] bg-white p-4 shadow-sm">
          <div class="flex items-start justify-between">
            <div>
              <p class="text-2xl font-bold text-[#333]">₦30,500</p>
              <p class="mt-1 text-xs font-medium text-[#22c55e]">+12.5% vs last period</p>
            </div>
            <span class="flex h-10 w-10 items-center justify-center rounded-lg bg-[#fef9c3] text-[#ca8a04]">
              <IconDollarSign class="h-5 w-5" />
            </span>
          </div>
          <p class="mt-2 text-sm font-medium text-[#6b7280]">Revenue</p>
        </div>
      </div>

      <!-- Fleet KPI cards (Fleet Map tab) -->
      <div v-else-if="activeTab === 'fleet-map'" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <div class="rounded-xl border border-[#e5e7eb] bg-white p-4 shadow-sm">
          <div class="flex items-start justify-between">
            <div>
              <p class="text-2xl font-bold text-[#333]">5</p>
            </div>
            <span class="flex h-10 w-10 items-center justify-center rounded-lg bg-[#dbeafe] text-[#2563eb]">
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v3"/><path d="M12 18v3"/><path d="M3 12h3"/><path d="M18 12h3"/><circle cx="12" cy="12" r="2"/><path d="M5.64 5.64l2.12 2.12"/><path d="M16.24 16.24l2.12 2.12"/><path d="M5.64 18.36l2.12-2.12"/><path d="M16.24 7.76l2.12-2.12"/></svg>
            </span>
          </div>
          <p class="mt-2 text-sm font-medium text-[#6b7280]">Total Fleet</p>
        </div>
        <div class="rounded-xl border border-[#e5e7eb] bg-white p-4 shadow-sm">
          <div class="flex items-start justify-between">
            <div>
              <p class="text-2xl font-bold text-[#333]">3</p>
            </div>
            <span class="flex h-10 w-10 items-center justify-center rounded-lg bg-[#dbeafe] text-[#2563eb]">
              <IconCar class="h-5 w-5" />
            </span>
          </div>
          <p class="mt-2 text-sm font-medium text-[#6b7280]">On Hire</p>
        </div>
        <div class="rounded-xl border border-[#e5e7eb] bg-white p-4 shadow-sm">
          <div class="flex items-start justify-between">
            <div>
              <p class="text-2xl font-bold text-[#333]">1</p>
            </div>
            <span class="flex h-10 w-10 items-center justify-center rounded-lg bg-[#dcfce7] text-[#16a34a]">
              <IconSquareCheck class="h-5 w-5" />
            </span>
          </div>
          <p class="mt-2 text-sm font-medium text-[#6b7280]">Available</p>
        </div>
        <div class="rounded-xl border border-[#e5e7eb] bg-white p-4 shadow-sm">
          <div class="flex items-start justify-between">
            <div>
              <p class="text-2xl font-bold text-[#333]">5</p>
            </div>
            <span class="flex h-10 w-10 items-center justify-center rounded-lg bg-[#fef9c3] text-[#ca8a04]">
              <IconClock class="h-5 w-5" />
            </span>
          </div>
          <p class="mt-2 text-sm font-medium text-[#6b7280]">Returned</p>
        </div>
        <div class="rounded-xl border border-[#e5e7eb] bg-white p-4 shadow-sm">
          <div class="flex items-start justify-between">
            <div>
              <p class="text-2xl font-bold text-[#333]">3</p>
            </div>
            <span class="flex h-10 w-10 items-center justify-center rounded-lg bg-[#fee2e2] text-[#dc2626]">
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 9v4"/><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 17h.01"/></svg>
            </span>
          </div>
          <p class="mt-2 text-sm font-medium text-[#6b7280]">Needs Maintenance</p>
        </div>
      </div>

      <!-- Pricing Config KPI cards -->
      <div v-else-if="activeTab === 'pricing-config'" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div class="rounded-xl border border-[#e5e7eb] bg-white p-4 shadow-sm">
          <div class="flex items-start justify-between">
            <div>
              <p class="text-2xl font-bold text-[#333]">5</p>
            </div>
            <span class="flex h-10 w-10 items-center justify-center rounded-lg bg-[#dbeafe] text-[#2563eb]">
              <IconCar class="h-5 w-5" />
            </span>
          </div>
          <p class="mt-2 text-sm font-medium text-[#6b7280]">Active Categories</p>
        </div>
        <div class="rounded-xl border border-[#e5e7eb] bg-white p-4 shadow-sm">
          <div class="flex items-start justify-between">
            <div>
              <p class="text-2xl font-bold text-[#333]">20%</p>
            </div>
            <span class="flex h-10 w-10 items-center justify-center rounded-lg bg-[#dcfce7] text-[#16a34a]">
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </span>
          </div>
          <p class="mt-2 text-sm font-medium text-[#6b7280]">Avg. Commission</p>
        </div>
        <div class="rounded-xl border border-[#e5e7eb] bg-white p-4 shadow-sm">
          <div class="flex items-start justify-between">
            <div>
              <p class="text-2xl font-bold text-[#333]">3</p>
            </div>
            <span class="flex h-10 w-10 items-center justify-center rounded-lg bg-[#dbeafe] text-[#2563eb]">
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </span>
          </div>
          <p class="mt-2 text-sm font-medium text-[#6b7280]">Commission Tiers</p>
        </div>
        <div class="rounded-xl border border-[#e5e7eb] bg-white p-4 shadow-sm">
          <div class="flex items-start justify-between">
            <div>
              <p class="text-2xl font-bold text-[#333]">₦1,500</p>
            </div>
            <span class="flex h-10 w-10 items-center justify-center rounded-lg bg-[#ffedd5] text-[#ea580c]">
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/></svg>
            </span>
          </div>
          <p class="mt-2 text-sm font-medium text-[#6b7280]">Min Payout</p>
        </div>
      </div>

      <!-- Tabs -->
      <div class="border-b border-[#e5e7eb]">
        <div class="flex gap-0">
          <button
            v-for="tab in tabs"
            :key="tab.value"
            type="button"
            class="border-b-2 px-4 py-3 text-sm font-medium transition-colors"
            :class="activeTab === tab.value ? 'border-[#333] bg-[#f1f5f9] text-[#333]' : 'border-transparent bg-transparent text-[#6b7280] hover:bg-[#f8fafc]'"
            @click="activeTab = tab.value"
          >
            {{ tab.label }}
          </button>
        </div>
      </div>

      <!-- Search and filter (Rentals tab only) -->
      <div v-if="activeTab === 'rentals'" class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div class="relative flex-1 max-w-md">
          <IconSearch class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9ca3af]" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search rentals..."
            class="h-10 w-full rounded-lg border border-[#e5e7eb] bg-white py-2 pl-9 pr-3 text-sm text-[#333] placeholder:text-[#9ca3af] outline-none focus:border-[#333]"
          />
        </div>
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-lg border border-[#e5e7eb] bg-white px-4 py-2.5 text-sm font-medium text-[#6b7280] hover:bg-[#f8fafc]"
        >
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/>
          </svg>
          Filters
        </button>
      </div>

      <!-- Table (Rentals tab) -->
      <div v-if="activeTab === 'rentals'" class="overflow-x-auto rounded-lg border border-[#e5e7eb] bg-white">
        <table class="w-full min-w-[900px] border-collapse">
          <thead>
            <tr class="border-b border-[#e5e7eb] bg-white text-left text-sm font-semibold text-[#333]">
              <th class="px-4 py-3">Booking ID</th>
              <th class="px-4 py-3">Customer</th>
              <th class="px-4 py-3">Vehicle</th>
              <th class="px-4 py-3">Driver</th>
              <th class="px-4 py-3">Duration</th>
              <th class="px-4 py-3">Total</th>
              <th class="px-4 py-3">Status</th>
              <th class="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="row in rentalRows"
              :key="row.id"
              class="border-b border-[#e5e7eb] bg-[#f8fafc] text-sm text-[#333] last:border-b-0"
            >
              <td class="px-4 py-3 font-medium">{{ row.bookingId }}</td>
              <td class="px-4 py-3">{{ row.customer }}</td>
              <td class="px-4 py-3">{{ row.vehicle }}</td>
              <td class="px-4 py-3">
                <button
                  v-if="row.driverAssign"
                  type="button"
                  class="inline-flex items-center gap-1.5 rounded-lg border border-[#e5e7eb] bg-[#f1f5f9] px-3 py-1.5 text-sm font-medium text-[#374151] hover:bg-[#e2e8f0]"
                  @click="openAssignDriverModal(row)"
                >
                  <IconUser class="h-4 w-4" />
                  <IconHorizontalDots class="h-4 w-4" />
                  Assign
                </button>
                <span v-else>{{ row.driver }}</span>
              </td>
              <td class="px-4 py-3 text-[#6b7280]">{{ row.duration }}</td>
              <td class="px-4 py-3">{{ row.total }}</td>
              <td class="px-4 py-3">
                <span
                  class="inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium"
                  :class="row.statusClass"
                >
                  {{ row.status }}
                </span>
              </td>
              <td class="px-4 py-3">
                <button
                  type="button"
                  class="rounded-lg bg-[#3b82f6] px-3 py-1.5 text-sm font-medium text-white hover:bg-[#2563eb]"
                  @click="openRentalDetails(row)"
                >
                  Manage
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Fleet Map tab: Live Map + Fleet Status + All Fleet Vehicles -->
      <template v-else-if="activeTab === 'fleet-map'">
        <div class="grid gap-5 lg:grid-cols-[1fr_320px]">
          <!-- Live Fleet Map -->
          <div class="rounded-xl border border-[#e5e7eb] bg-white p-4 shadow-sm">
            <div class="flex items-center justify-between">
              <h2 class="text-base font-bold text-[#333]">Live Fleet Map</h2>
              <button
                type="button"
                class="rounded-lg border border-[#e5e7eb] bg-white px-3 py-1.5 text-sm font-medium text-[#374151] hover:bg-[#f8fafc]"
              >
                Click markers to view details
              </button>
            </div>
            <div class="relative mt-4 aspect-[4/3] overflow-hidden rounded-lg bg-[#f1f5f9]">
              <!-- Placeholder map with markers -->
              <div class="absolute inset-0 grid grid-cols-4 grid-rows-3 gap-3 p-6">
                <button
                  v-for="m in fleetMapMarkers"
                  :key="m.id"
                  type="button"
                  class="flex cursor-pointer items-center justify-center rounded-full text-xs font-medium text-white transition-opacity hover:opacity-90"
                  :class="m.bgClass"
                  @click="openVehicleDetailsModal(m)"
                >
                  {{ m.plate }}
                </button>
              </div>
              <!-- Status Legend -->
              <div class="absolute bottom-3 left-3 rounded-lg border border-[#e5e7eb] bg-white/95 px-3 py-2 shadow-sm">
                <p class="text-xs font-semibold text-[#333]">Status Legend</p>
                <ul class="mt-1.5 space-y-1 text-xs text-[#6b7280]">
                  <li class="flex items-center gap-2">
                    <span class="h-2 w-2 rounded-full bg-[#3b82f6]"/> On Hire
                  </li>
                  <li class="flex items-center gap-2">
                    <span class="h-2 w-2 rounded-full bg-[#22c55e]"/> Available
                  </li>
                  <li class="flex items-center gap-2">
                    <span class="h-2 w-2 rounded-full bg-[#eab308]"/> Returned
                  </li>
                  <li class="flex items-center gap-2">
                    <span class="h-2 w-2 rounded-full bg-[#ec4899]"/> Sent for Repair
                  </li>
                  <li class="flex items-center gap-2">
                    <span class="h-2 w-2 rounded-full bg-[#ef4444]"/> Needs Maintenance
                  </li>
                  <li class="flex items-center gap-2">
                    <span class="h-2 w-2 rounded-full bg-[#7f1d1d]"/> Under Maintenance
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Fleet Status sidebar -->
          <div class="rounded-xl border border-[#e5e7eb] bg-white p-4 shadow-sm">
            <h2 class="text-base font-bold text-[#333]">Fleet Status</h2>
            <div class="relative mt-3">
              <IconSearch class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9ca3af]" />
              <input
                v-model="fleetStatusSearch"
                type="text"
                placeholder="Search vehicles..."
                class="h-10 w-full rounded-lg border border-[#e5e7eb] bg-white py-2 pl-9 pr-3 text-sm text-[#333] placeholder:text-[#9ca3af] outline-none focus:border-[#333]"
              />
            </div>
            <select
              v-model="fleetStatusFilter"
              class="mt-3 h-10 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 text-sm text-[#333] outline-none focus:border-[#333]"
            >
              <option value="all">All Status</option>
              <option value="on-hire">On Hire</option>
              <option value="available">Available</option>
              <option value="returned">Returned</option>
              <option value="needs-maintenance">Needs Maintenance</option>
              <option value="under-maintenance">Under Maintenance</option>
            </select>
            <div class="mt-4 max-h-[320px] space-y-3 overflow-y-auto">
              <div
                v-for="v in filteredFleetStatusList"
                :key="v.id"
                class="flex items-start justify-between gap-2 rounded-lg border border-[#e5e7eb] bg-[#f8fafc] p-3"
              >
                <div class="min-w-0 flex-1">
                  <p class="font-medium text-[#333]">{{ v.name }}</p>
                  <span
                    class="mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium"
                    :class="v.statusClass"
                  >
                    {{ v.statusLabel }}
                  </span>
                  <p class="mt-0.5 text-xs text-[#6b7280]">{{ v.termLabel }}</p>
                  <p class="mt-0.5 flex items-center gap-2 text-xs text-[#6b7280]">
                    <span>{{ v.mileage }}</span>
                    <span>·</span>
                    <span>{{ v.lastSeen }}</span>
                  </p>
                </div>
                <button
                  type="button"
                  class="shrink-0 rounded-lg px-2.5 py-1.5 text-xs font-medium"
                  :class="v.actionClass"
                  @click="openVehicleDetailsModalFromFleetStatus(v)"
                >
                  {{ v.actionLabel }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- All Fleet Vehicles table -->
        <div class="rounded-xl border border-[#e5e7eb] bg-white shadow-sm">
          <h2 class="border-b border-[#e5e7eb] px-4 py-3 text-base font-bold text-[#333]">All Fleet Vehicles</h2>
          <div class="overflow-x-auto">
            <table class="w-full min-w-[800px] border-collapse">
              <thead>
                <tr class="border-b border-[#e5e7eb] bg-white text-left text-sm font-semibold text-[#333]">
                  <th class="px-4 py-3">Vehicle</th>
                  <th class="px-4 py-3">Plate</th>
                  <th class="px-4 py-3">Status</th>
                  <th class="px-4 py-3">Location</th>
                  <th class="px-4 py-3">Fuel Type</th>
                  <th class="px-4 py-3">Seat</th>
                  <th class="px-4 py-3">Last Updated</th>
                  <th class="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="v in fleetVehiclesTable"
                  :key="v.id"
                  class="border-b border-[#e5e7eb] bg-[#f8fafc] text-sm text-[#333] last:border-b-0"
                >
                  <td class="px-4 py-3 font-medium">{{ v.name }}</td>
                  <td class="px-4 py-3">{{ v.plate }}</td>
                  <td class="px-4 py-3">
                    <span
                      class="inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium"
                      :class="v.statusClass"
                    >
                      {{ v.statusLabel }}
                    </span>
                  </td>
                  <td class="px-4 py-3 text-[#6b7280]">{{ v.location }}</td>
                  <td class="px-4 py-3">{{ v.fuelType }}</td>
                  <td class="px-4 py-3">{{ v.seat }}</td>
                  <td class="px-4 py-3 text-[#6b7280]">{{ v.lastUpdated }}</td>
                  <td class="px-4 py-3">
                    <button type="button" class="text-[#3b82f6] font-medium hover:underline" @click="openVehicleDetailsModalFromTable(v)">View</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </template>

      <!-- Pricing Config tab: sub-tabs + content -->
      <template v-else-if="activeTab === 'pricing-config'">
        <div class="border-b border-[#e5e7eb]">
          <div class="flex gap-0">
            <button
              v-for="sub in pricingConfigSubTabs"
              :key="sub.value"
              type="button"
              class="border-b-2 px-4 py-3 text-sm font-medium transition-colors"
              :class="pricingConfigSubTab === sub.value ? 'border-[#333] bg-[#f1f5f9] text-[#333]' : 'border-transparent bg-transparent text-[#6b7280] hover:bg-[#f8fafc]'"
              @click="pricingConfigSubTab = sub.value"
            >
              {{ sub.label }}
            </button>
          </div>
        </div>

        <!-- Category Commission sub-tab -->
        <template v-if="pricingConfigSubTab === 'category-commission'">
          <div class="mb-4 mt-4">
            <h2 class="text-base font-bold text-[#333]">Commission by Vehicle Category</h2>
            <p class="mt-0.5 text-sm text-[#6b7280]">Set commission percentage the platform takes from each booking based on vehicle type. Owners set their own prices; these rates determine your platform's cut.</p>
          </div>
          <div class="overflow-x-auto rounded-lg border border-[#e5e7eb] bg-white">
            <table class="w-full min-w-[700px] border-collapse">
              <thead>
                <tr class="border-b border-[#e5e7eb] bg-white text-left text-sm font-semibold text-[#333]">
                  <th class="px-4 py-3">Category</th>
                  <th class="px-4 py-3">Platform Commission</th>
                  <th class="px-4 py-3">Min Fee</th>
                  <th class="px-4 py-3">Max Fee</th>
                  <th class="px-4 py-3">Owner Gets</th>
                  <th class="px-4 py-3">Status</th>
                  <th class="w-14 px-2 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="row in commissionCategoryRows"
                  :key="row.id"
                  class="border-b border-[#e5e7eb] bg-[#f8fafc] text-sm text-[#333] last:border-b-0"
                >
                  <td class="px-4 py-3">
                    <span class="inline-flex items-center gap-2">
                      <span class="flex h-8 w-8 items-center justify-center text-[#64748b]">
                        <IconCar class="h-5 w-5" />
                      </span>
                      <span class="font-medium">{{ row.category }}</span>
                    </span>
                  </td>
                  <td class="px-4 py-3">
                    <span class="inline-flex rounded-full bg-[#fef3c7] px-2.5 py-0.5 text-xs font-medium text-[#b45309]">
                      {{ row.platformCommission }}
                    </span>
                  </td>
                  <td class="px-4 py-3">{{ row.minFee }}</td>
                  <td class="px-4 py-3">{{ row.maxFee }}</td>
                  <td class="px-4 py-3 font-medium text-[#16a34a]">{{ row.ownerGets }}</td>
                  <td class="px-4 py-3">
                    <button
                      type="button"
                      role="switch"
                      :aria-checked="row.enabled"
                      class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-0 transition-colors focus:outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-2"
                      :class="row.enabled ? 'bg-[#333]' : 'bg-[#d1d5db]'"
                      @click="toggleCommissionRow(row)"
                    >
                      <span
                        class="pointer-events-none absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow ring-0 transition"
                        :class="row.enabled ? 'translate-x-5' : 'translate-x-0'"
                      />
                    </button>
                  </td>
                  <td class="px-2 py-3">
                    <button
                      type="button"
                      class="rounded p-1.5 text-[#6b7280] hover:bg-[#e5e7eb]"
                      title="Edit"
                      @click="editCommissionRow(row)"
                    >
                      <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </template>

        <!-- Owner Tiers sub-tab -->
        <template v-else-if="pricingConfigSubTab === 'owner-tiers'">
          <div class="mb-4 mt-4">
            <h2 class="text-base font-bold text-[#333]">Owner Commission Tiers</h2>
            <p class="mt-0.5 text-sm text-[#6b7280]">Reward high-performing vehicle owners with lower commission rates based on their monthly earnings. This encourages owners to list more vehicles and provide better service.</p>
          </div>
          <div class="overflow-x-auto rounded-lg border border-[#e5e7eb] bg-white">
            <table class="w-full min-w-[800px] border-collapse">
              <thead>
                <tr class="border-b border-[#e5e7eb] bg-white text-left text-sm font-semibold text-[#333]">
                  <th class="px-4 py-3">Tier</th>
                  <th class="px-4 py-3">Monthly Earnings Range</th>
                  <th class="px-4 py-3">Platform Commission</th>
                  <th class="px-4 py-3">Owner Keeps</th>
                  <th class="px-4 py-3">Description</th>
                  <th class="w-14 px-2 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="row in ownerTiersRows"
                  :key="row.id"
                  class="border-b border-[#e5e7eb] bg-[#f8fafc] text-sm text-[#333] last:border-b-0"
                >
                  <td class="px-4 py-3 font-medium">{{ row.tier }}</td>
                  <td class="px-4 py-3">{{ row.earningsRange }}</td>
                  <td class="px-4 py-3">
                    <span class="inline-flex rounded-full bg-[#fef3c7] px-2.5 py-0.5 text-xs font-medium text-[#b45309]">
                      {{ row.platformCommission }}
                    </span>
                  </td>
                  <td class="px-4 py-3 font-medium text-[#16a34a]">{{ row.ownerKeeps }}</td>
                  <td class="px-4 py-3 text-[#6b7280]">{{ row.description }}</td>
                  <td class="px-2 py-3">
                    <button
                      type="button"
                      class="rounded p-1.5 text-[#6b7280] hover:bg-[#e5e7eb]"
                      title="Edit"
                      @click="editOwnerTierRow(row)"
                    >
                      <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </template>

        <!-- Platform Settings sub-tab -->
        <template v-else-if="pricingConfigSubTab === 'platform-settings'">
          <div class="mt-4 space-y-6">
            <!-- Commission & Fees -->
            <div class="rounded-xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
              <h2 class="text-base font-bold text-[#333]">Commission & Fees</h2>
              <p class="mt-0.5 text-sm text-[#6b7280]">Configure default rates and processing fees</p>

              <div class="mt-6 space-y-6">
                <div>
                  <div class="flex items-center justify-between">
                    <label class="text-sm font-medium text-[#374151]">Default Platform Commission</label>
                    <span class="text-sm font-medium text-[#333]">{{ platformSettingsDefaultCommission }}%</span>
                  </div>
                  <input
                    v-model.number="platformSettingsDefaultCommission"
                    type="range"
                    min="0"
                    max="50"
                    step="1"
                    class="mt-2 h-2 w-full cursor-pointer appearance-none rounded-lg bg-[#e5e7eb] accent-[#333]"
                  />
                  <p class="mt-1 text-xs text-[#6b7280]">Applied when no category or tier-specific rate exists.</p>
                </div>

                <div>
                  <label class="block text-sm font-medium text-[#374151]">Driver Commission (from owner's share)</label>
                  <div class="mt-1.5 flex items-center rounded-lg border border-[#e5e7eb] bg-white">
                    <input
                      v-model="platformSettingsDriverCommission"
                      type="text"
                      placeholder="0"
                      class="w-full border-0 bg-transparent px-3 py-2.5 text-sm text-[#333] outline-none focus:ring-0"
                    />
                    <span class="pr-3 text-sm text-[#6b7280]">%</span>
                  </div>
                  <p class="mt-1 text-xs text-[#6b7280]">When using platform driver, this % of driver fee goes to platform.</p>
                </div>

                <div>
                  <label class="block text-sm font-medium text-[#374151]">Payment Processing Fee</label>
                  <div class="mt-1.5 flex items-center rounded-lg border border-[#e5e7eb] bg-white">
                    <input
                      v-model="platformSettingsPaymentFee"
                      type="text"
                      placeholder="0"
                      class="w-full border-0 bg-transparent px-3 py-2.5 text-sm text-[#333] outline-none focus:ring-0"
                    />
                    <span class="pr-3 text-sm text-[#6b7280]">%</span>
                  </div>
                  <p class="mt-1 text-xs text-[#6b7280]">Added to customer total for payment processing.</p>
                </div>
              </div>
            </div>

            <!-- Payout Settings -->
            <div class="rounded-xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
              <h2 class="text-base font-bold text-[#333]">Payout Settings</h2>
              <p class="mt-0.5 text-sm text-[#6b7280]">Configure owner payout rules</p>

              <div class="mt-6 space-y-6">
                <div>
                  <label class="block text-sm font-medium text-[#374151]">Payout Schedule</label>
                  <select
                    v-model="platformSettingsPayoutSchedule"
                    class="mt-1.5 h-10 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 pr-9 text-sm text-[#333] outline-none focus:border-[#333]"
                  >
                    <option value="">Select Schedule</option>
                    <option value="weekly">Weekly</option>
                    <option value="biweekly">Bi-weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-[#374151]">Minimum Payout Amount</label>
                  <div class="mt-1.5 flex items-center rounded-lg border border-[#e5e7eb] bg-white">
                    <span class="pl-3 text-sm text-[#6b7280]">₦</span>
                    <input
                      v-model="platformSettingsMinPayout"
                      type="text"
                      placeholder="0"
                      class="w-full border-0 bg-transparent px-2 py-2.5 text-sm text-[#333] outline-none focus:ring-0"
                    />
                  </div>
                  <p class="mt-1 text-xs text-[#6b7280]">Owners must reach this amount before a payout is processed.</p>
                </div>

                <button
                  type="button"
                  class="w-full rounded-lg bg-[#333] py-3 text-sm font-medium text-white hover:bg-[#1f2937]"
                  @click="savePlatformSettings"
                >
                  Save Platform Settings
                </button>
              </div>
            </div>
          </div>
        </template>

        <!-- Pricing Policy sub-tab -->
        <template v-else-if="pricingConfigSubTab === 'pricing-policy'">
          <div class="mt-4 rounded-xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
            <h2 class="text-base font-bold text-[#333]">Pricing Policies</h2>
            <p class="mt-0.5 text-sm text-[#6b7280]">Control how owners can set and adjust their prices. These policies help maintain market quality and prevent pricing issues.</p>

            <div class="mt-6 space-y-4">
              <div
                v-for="policy in pricingPolicyItems"
                :key="policy.id"
                class="flex items-start justify-between gap-4 rounded-lg border border-[#e5e7eb] bg-[#f8fafc] p-4"
              >
                <div class="min-w-0 flex-1">
                  <p class="font-medium text-[#333]">{{ policy.label }}</p>
                  <p class="mt-0.5 text-sm text-[#6b7280]">{{ policy.description }}</p>
                </div>
                <button
                  type="button"
                  role="switch"
                  :aria-checked="policy.enabled"
                  class="relative mt-0.5 inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-0 transition-colors focus:outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-2"
                  :class="policy.enabled ? 'bg-[#333]' : 'bg-[#d1d5db]'"
                  @click="policy.enabled = !policy.enabled"
                >
                  <span
                    class="pointer-events-none absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow ring-0 transition"
                    :class="policy.enabled ? 'translate-x-5' : 'translate-x-0'"
                  />
                </button>
              </div>
            </div>
          </div>
        </template>

        <!-- Earnings Calculator sub-tab -->
        <template v-else-if="pricingConfigSubTab === 'earnings-calculator'">
          <div class="mt-4 grid gap-6 lg:grid-cols-2">
            <!-- Left: Earnings Calculator form -->
            <div class="rounded-xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
              <h2 class="text-base font-bold text-[#333]">Earnings Calculator</h2>
              <p class="mt-0.5 text-sm text-[#6b7280]">See how platform commission applies to owner-set prices.</p>

              <div class="mt-6 space-y-4">
                <div>
                  <label class="block text-sm font-medium text-[#374151]">Vehicle Category</label>
                  <select
                    v-model="earningsCalcCategory"
                    class="mt-1.5 h-10 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 pr-9 text-sm text-[#333] outline-none focus:border-[#333]"
                  >
                    <option value="">Select Category</option>
                    <option
                      v-for="cat in earningsCalcCategoryOptions"
                      :key="cat.value"
                      :value="cat.value"
                    >
                      {{ cat.label }}
                    </option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-[#374151]">Owner Tier</label>
                  <select
                    v-model="earningsCalcTier"
                    class="mt-1.5 h-10 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 pr-9 text-sm text-[#333] outline-none focus:border-[#333]"
                  >
                    <option value="">Select Tier</option>
                    <option
                      v-for="t in ownerTiersRows"
                      :key="t.id"
                      :value="t.id"
                    >
                      {{ t.tier }}
                    </option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-[#374151]">Owner's Daily Price (₦)</label>
                  <div class="mt-1.5 flex items-center rounded-lg border border-[#e5e7eb] bg-white">
                    <span class="pl-3 text-sm text-[#6b7280]">₦</span>
                    <input
                      v-model.number="earningsCalcDailyPrice"
                      type="number"
                      min="0"
                      step="1"
                      class="w-full border-0 bg-transparent px-2 py-2.5 text-sm text-[#333] outline-none focus:ring-0"
                    />
                  </div>
                  <p class="mt-1 text-xs text-[#6b7280]">Price set by the vehicle owner per day.</p>
                </div>

                <div>
                  <label class="block text-sm font-medium text-[#374151]">Hire Duration (days)</label>
                  <input
                    v-model.number="earningsCalcDuration"
                    type="number"
                    min="0"
                    step="1"
                    class="mt-1.5 h-10 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 text-sm text-[#333] outline-none focus:border-[#333]"
                  />
                </div>

                <div class="flex items-center justify-between rounded-lg border border-[#e5e7eb] bg-[#f8fafc] p-4">
                  <div>
                    <p class="font-medium text-[#333]">Include Platform Driver</p>
                    <p class="mt-0.5 text-xs text-[#6b7280]">Add driver fee and commission to the breakdown.</p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    :aria-checked="earningsCalcIncludeDriver"
                    class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-0 transition-colors focus:outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-2"
                    :class="earningsCalcIncludeDriver ? 'bg-[#333]' : 'bg-[#d1d5db]'"
                    @click="earningsCalcIncludeDriver = !earningsCalcIncludeDriver"
                  >
                    <span
                      class="pointer-events-none absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow ring-0 transition"
                      :class="earningsCalcIncludeDriver ? 'translate-x-5' : 'translate-x-0'"
                    />
                  </button>
                </div>
              </div>
            </div>

            <!-- Right: Revenue Breakdown -->
            <div class="rounded-xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
              <h2 class="text-base font-bold text-[#333]">Revenue Breakdown</h2>
              <p class="mt-0.5 text-sm text-[#6b7280]">Earnings split between platform, owner, and driver.</p>

              <div class="mt-6 space-y-6">
                <!-- Customer Payment -->
                <div>
                  <h3 class="text-sm font-semibold text-[#374151]">Customer Payment</h3>
                  <dl class="mt-2 space-y-1.5 text-sm">
                    <div class="flex justify-between">
                      <dt class="text-[#6b7280]">Vehicle Rental ({{ earningsCalcDuration }} days × ₦{{ formatNum(earningsCalcDailyPrice) }}):</dt>
                      <dd class="font-medium text-[#333]">₦{{ formatMoney(revenueBreakdown.vehicleRental) }}</dd>
                    </div>
                    <div class="flex justify-between">
                      <dt class="text-[#6b7280]">Processing Fee ({{ revenueBreakdown.processingFeePercent }}%):</dt>
                      <dd class="font-medium text-[#333]">₦{{ formatMoney(revenueBreakdown.processingFeeAmount) }}</dd>
                    </div>
                    <div class="flex justify-between border-t border-[#e5e7eb] pt-2">
                      <dt class="font-medium text-[#333]">Customer Pays:</dt>
                      <dd class="font-bold text-[#333]">₦{{ formatMoney(revenueBreakdown.customerPays) }}</dd>
                    </div>
                  </dl>
                </div>

                <!-- Revenue Split -->
                <div>
                  <h3 class="text-sm font-semibold text-[#374151]">Revenue Split</h3>
                  <dl class="mt-2 space-y-1.5 text-sm">
                    <div class="font-medium text-[#374151]">Platform Earnings</div>
                    <div class="flex justify-between pl-2">
                      <dt class="text-[#6b7280]">Commission ({{ revenueBreakdown.commissionPercent }}%):</dt>
                      <dd class="font-medium text-[#333]">₦{{ formatMoney(revenueBreakdown.platformCommission) }}</dd>
                    </div>
                    <div class="flex justify-between pl-2">
                      <dt class="text-[#6b7280]">Processing Fee:</dt>
                      <dd class="font-medium text-[#333]">₦{{ formatMoney(revenueBreakdown.processingFeeAmount) }}</dd>
                    </div>
                    <div class="font-medium text-[#374151] mt-3">Owner Earnings</div>
                    <div class="flex justify-between pl-2">
                      <dt class="text-[#6b7280]">After {{ revenueBreakdown.commissionPercent }}% platform commission:</dt>
                      <dd class="font-medium text-[#333]">₦{{ formatMoney(revenueBreakdown.ownerEarnings) }}</dd>
                    </div>
                    <template v-if="earningsCalcIncludeDriver">
                      <div class="font-medium text-[#374151] mt-3">Driver</div>
                      <div class="flex justify-between pl-2">
                        <dt class="text-[#6b7280]">Driver fee (if applied):</dt>
                        <dd class="font-medium text-[#333]">₦{{ formatMoney(revenueBreakdown.driverEarnings) }}</dd>
                      </div>
                    </template>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </template>

        <!-- Placeholder for other pricing sub-tabs -->
        <div v-else class="mt-4 rounded-lg border border-[#e5e7eb] bg-[#f8fafc] px-6 py-12 text-center text-sm text-[#6b7280]">
          Content for {{ pricingConfigSubTabs.find(s => s.value === pricingConfigSubTab)?.label }}.
        </div>
      </template>

      <!-- Placeholder for other tabs -->
      <div v-else class="rounded-lg border border-[#e5e7eb] bg-[#f8fafc] px-6 py-12 text-center text-sm text-[#6b7280]">
        Content for {{ tabs.find(t => t.value === activeTab)?.label }} tab.
      </div>
    </div>

    <!-- Rental Details Modal -->
    <Teleport to="body">
      <div
        v-if="showRentalDetailsModal && rentalDetails"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        @click.self="closeRentalDetailsModal"
      >
        <div class="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-xl">
          <div class="sticky top-0 z-10 flex items-start justify-between border-b border-[#e5e7eb] bg-white px-6 py-4">
            <div class="flex items-center gap-3">
              <h2 class="text-lg font-semibold text-[#333]">Rental Details - {{ rentalDetails.bookingId }}</h2>
              <span
                class="inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium"
                :class="rentalDetails.statusClass"
              >
                {{ rentalDetails.status }}
              </span>
            </div>
            <button
              type="button"
              class="rounded-md p-1.5 text-[#6b7280] hover:bg-[#f1f5f9]"
              @click="closeRentalDetailsModal"
            >
              <IconX class="h-5 w-5" />
            </button>
          </div>

          <div class="space-y-6 px-6 py-5">
            <!-- Customer & Vehicle (two columns) -->
            <div class="grid gap-6 sm:grid-cols-2">
              <div class="flex gap-3">
                <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f1f5f9] text-[#64748b]">
                  <IconUser class="h-5 w-5" />
                </span>
                <div>
                  <p class="text-xs font-medium uppercase tracking-wide text-[#6b7280]">Customer</p>
                  <p class="mt-0.5 font-medium text-[#333]">{{ rentalDetails.customerName }}</p>
                  <p class="mt-0.5 text-sm text-[#6b7280]">{{ rentalDetails.contact }}</p>
                </div>
              </div>
              <div class="flex gap-3">
                <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f1f5f9] text-[#64748b]">
                  <IconCar class="h-5 w-5" />
                </span>
                <div>
                  <p class="text-xs font-medium uppercase tracking-wide text-[#6b7280]">Vehicle</p>
                  <p class="mt-0.5 font-medium text-[#333]">{{ rentalDetails.vehicleMakeModel }}</p>
                  <p class="mt-0.5 text-sm text-[#6b7280]">Plate: {{ rentalDetails.plate }}</p>
                  <span class="mt-1 inline-block rounded-full bg-[#e5e7eb] px-2 py-0.5 text-xs font-medium text-[#374151]">{{ rentalDetails.vehicleType }}</span>
                </div>
              </div>
            </div>

            <!-- Driver Assignment -->
            <div class="flex gap-3">
              <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f1f5f9] text-[#64748b]">
                <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4"/><path d="M12 18v4"/><path d="M4.93 4.93l2.83 2.83"/><path d="M16.24 16.24l2.83 2.83"/><path d="M2 12h4"/><path d="M18 12h4"/><path d="M4.93 19.07l2.83-2.83"/><path d="M16.24 7.76l2.83-2.83"/><circle cx="12" cy="12" r="3"/></svg>
              </span>
              <div class="flex flex-1 items-center justify-between gap-4">
                <div>
                  <p class="text-xs font-medium uppercase tracking-wide text-[#6b7280]">Driver Assignment</p>
                  <div v-if="rentalDetails.driverName" class="mt-0.5 flex items-center gap-2">
                    <IconSquareCheck class="h-4 w-4 text-[#16a34a]" />
                    <span class="font-medium text-[#333]">{{ rentalDetails.driverName }}</span>
                  </div>
                  <p v-else class="mt-0.5 text-sm text-[#6b7280]">Not assigned</p>
                </div>
                <button
                  type="button"
                  class="rounded-lg bg-[#333] px-4 py-2 text-sm font-medium text-white hover:bg-[#1f2937]"
                  @click="openAssignDriverModalFromDetails()"
                >
                  Reassign
                </button>
              </div>
            </div>

            <!-- Rental Period -->
            <div class="flex gap-3">
              <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f1f5f9] text-[#64748b]">
                <IconCalendar class="h-5 w-5" />
              </span>
              <div class="flex-1">
                <p class="text-xs font-medium uppercase tracking-wide text-[#6b7280]">Rental Period</p>
                <div class="mt-2 space-y-2">
                  <div>
                    <p class="text-sm font-medium text-[#333]">Pickup: {{ rentalDetails.pickupDate }}</p>
                    <p class="mt-0.5 flex items-center gap-1.5 text-sm text-[#6b7280]">
                      <IconMapPin class="h-4 w-4 shrink-0" />
                      {{ rentalDetails.pickupLocation }}
                    </p>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-[#333]">Return: {{ rentalDetails.returnDate }}</p>
                    <p class="mt-0.5 flex items-center gap-1.5 text-sm text-[#6b7280]">
                      <IconMapPin class="h-4 w-4 shrink-0" />
                      {{ rentalDetails.returnLocation }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Duration -->
            <div class="flex gap-3">
              <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f1f5f9] text-[#64748b]">
                <IconClock class="h-5 w-5" />
              </span>
              <div>
                <p class="text-xs font-medium uppercase tracking-wide text-[#6b7280]">Duration</p>
                <p class="mt-0.5 font-medium text-[#333]">{{ rentalDetails.durationDays }}</p>
              </div>
            </div>

            <!-- Rental Terms -->
            <div class="flex flex-wrap gap-4">
              <div class="flex items-center gap-2 text-sm text-[#333]">
                <span class="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f1f5f9] text-[#64748b]">
                  <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 10h6"/><path d="M14 14h6"/><path d="M4 6h14"/><path d="M4 10h2"/><path d="M4 14h2"/><path d="M4 18h2"/><path d="M8 10h4"/><path d="M8 14h4"/></svg>
                </span>
                <span><strong class="text-[#6b7280]">Fuel Policy:</strong> {{ rentalDetails.fuelPolicy }}</span>
              </div>
              <div class="flex items-center gap-2 text-sm text-[#333]">
                <span class="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f1f5f9] text-[#64748b]">
                  <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                </span>
                <span><strong class="text-[#6b7280]">Mileage:</strong> {{ rentalDetails.mileage }}</span>
              </div>
              <div class="flex items-center gap-2 text-sm text-[#333]">
                <span class="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f1f5f9] text-[#64748b]">
                  <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </span>
                <span><strong class="text-[#6b7280]">Insurance:</strong> {{ rentalDetails.insurance }}</span>
              </div>
            </div>

            <!-- Payment Summary -->
            <div class="border-t border-[#e5e7eb] pt-4">
              <p class="text-sm font-semibold text-[#333]">Payment Summary</p>
              <div class="mt-3 space-y-2 text-sm">
                <div class="flex justify-between text-[#6b7280]">
                  <span>Daily Rate</span>
                  <span class="text-[#333]">{{ rentalDetails.dailyRate }}</span>
                </div>
                <div class="flex justify-between text-[#6b7280]">
                  <span>Duration</span>
                  <span class="text-[#333]">{{ rentalDetails.durationDays }}</span>
                </div>
                <div class="flex justify-between text-[#6b7280]">
                  <span>Security Deposit</span>
                  <span class="text-[#333]">{{ rentalDetails.securityDeposit }}</span>
                </div>
              </div>
              <div class="mt-4 flex justify-between border-t border-[#e5e7eb] pt-4">
                <span class="font-semibold text-[#333]">Total</span>
                <span class="text-lg font-bold text-[#333]">{{ rentalDetails.total }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Assign Driver Modal -->
    <Teleport to="body">
      <div
        v-if="showAssignDriverModal && assignDriverContext"
        class="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
        @click.self="closeAssignDriverModal"
      >
        <div class="relative flex max-h-[90vh] w-full max-w-lg flex-col rounded-xl bg-white shadow-xl">
          <div class="flex items-start justify-between border-b border-[#e5e7eb] px-6 py-4">
            <div>
              <h2 class="text-lg font-semibold text-[#333]">Assign Driver - {{ assignDriverContext.bookingId }}</h2>
              <p class="mt-0.5 text-sm text-[#6b7280]">Assign a driver to {{ assignDriverContext.customerName }}'s rental of {{ assignDriverContext.vehicleName }}</p>
            </div>
            <button type="button" class="rounded-md p-1.5 text-[#6b7280] hover:bg-[#f1f5f9]" @click="closeAssignDriverModal">
              <IconX class="h-5 w-5" />
            </button>
          </div>

          <div class="flex flex-1 flex-col overflow-hidden px-6 py-4">
            <!-- Currently Assigned (when reopening for reassign) -->
            <div v-if="assignDriverContext.currentDriverName" class="mb-4">
              <p class="text-xs font-medium uppercase tracking-wide text-[#6b7280]">Currently Assigned</p>
              <div class="mt-2 flex items-center gap-3 rounded-lg border border-[#e5e7eb] bg-[#f8fafc] p-3">
                <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e5e7eb] text-[#64748b]">
                  <IconUser class="h-5 w-5" />
                </span>
                <div class="min-w-0 flex-1 text-sm">
                  <p class="font-medium text-[#333]">{{ assignDriverContext.currentDriverName }}</p>
                  <p class="text-[#6b7280]">Honda Accord · 4.9 ★ · 342 trips completed · +1234-567-8901</p>
                </div>
              </div>
            </div>

            <div class="relative flex-1">
              <IconSearch class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9ca3af]" />
              <input
                v-model="assignDriverSearch"
                type="text"
                placeholder="Search booking ID, user, driver..."
                class="h-10 w-full rounded-lg border border-[#e5e7eb] bg-white py-2 pl-9 pr-3 text-sm text-[#333] placeholder:text-[#9ca3af] outline-none focus:border-[#333]"
              />
            </div>

            <div class="mt-4 min-h-0 flex-1 overflow-y-auto">
              <p class="mb-2 text-xs font-medium uppercase tracking-wide text-[#6b7280]">Select a driver</p>
              <div class="space-y-2">
                <button
                  v-for="d in filteredAssignDrivers"
                  :key="d.id"
                  type="button"
                  class="flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-colors"
                  :class="d.busy
                    ? 'cursor-not-allowed border-[#e5e7eb] bg-[#f8fafc] opacity-60'
                    : selectedAssignDriverId === d.id
                      ? 'border-[#333] bg-white'
                      : 'border-[#e5e7eb] bg-white hover:border-[#d1d5db]'"
                  :disabled="d.busy"
                  @click="!d.busy && (selectedAssignDriverId = d.id)"
                >
                  <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e5e7eb] text-[#64748b]">
                    <IconUser class="h-5 w-5" />
                  </span>
                  <div class="min-w-0 flex-1">
                    <p class="font-medium text-[#333]">{{ d.name }}</p>
                    <p class="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-[#6b7280]">
                      <span>{{ d.vehicle }}</span>
                      <span>·</span>
                      <span class="flex items-center gap-0.5">4.9 <span class="text-amber-500">★</span></span>
                      <span>·</span>
                      <span>{{ d.tripsCompleted }} trips completed</span>
                      <span>·</span>
                      <span>{{ d.phone }}</span>
                    </p>
                  </div>
                  <span
                    class="shrink-0 rounded-full px-2 py-0.5 text-xs font-medium"
                    :class="d.busy ? 'bg-[#ffedd5] text-[#c2410c]' : 'bg-[#dcfce7] text-[#15803d]'"
                  >
                    {{ d.busy ? 'Busy' : 'Available' }}
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div class="flex justify-end gap-3 border-t border-[#e5e7eb] px-6 py-4">
            <button
              type="button"
              class="rounded-lg border border-[#e5e7eb] bg-white px-4 py-2.5 text-sm font-medium text-[#374151] hover:bg-[#f8fafc]"
              @click="closeAssignDriverModal"
            >
              Cancel
            </button>
            <button
              type="button"
              class="rounded-lg bg-[#333] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#1f2937]"
              :disabled="!selectedAssignDriverId"
              @click="confirmAssignDriver"
            >
              Assign Driver
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Vehicle Details Modal (Fleet Map) -->
    <Teleport to="body">
      <div
        v-if="showVehicleDetailsModal && vehicleDetails"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        @click.self="closeVehicleDetailsModal"
      >
        <div class="relative w-full max-w-md rounded-xl bg-white shadow-xl">
          <div class="flex items-start justify-between border-b border-[#e5e7eb] px-6 py-4">
            <div class="flex flex-wrap items-center gap-2">
              <h2 class="text-lg font-bold text-[#333]">{{ vehicleDetails.name }}</h2>
              <span
                class="inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium text-white"
                :class="vehicleDetails.statusBadgeClass"
              >
                {{ vehicleDetails.statusLabel }}
              </span>
            </div>
            <button type="button" class="rounded-md p-1.5 text-[#6b7280] hover:bg-[#f1f5f9]" @click="closeVehicleDetailsModal">
              <IconX class="h-5 w-5" />
            </button>
          </div>

          <div class="space-y-4 px-6 py-5">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="text-xs font-medium text-[#6b7280]">License Plate</p>
                <p class="mt-0.5 text-sm font-medium text-[#333]">{{ vehicleDetails.plate }}</p>
              </div>
              <div>
                <p class="text-xs font-medium text-[#6b7280]">Last Updated</p>
                <p class="mt-0.5 text-sm font-medium text-[#333]">{{ vehicleDetails.lastUpdated }}</p>
              </div>
            </div>

            <div class="rounded-lg bg-[#f8fafc] px-3 py-2.5">
              <p class="flex items-center gap-2 text-xs font-medium text-[#6b7280]">
                <IconMapPin class="h-4 w-4 shrink-0" />
                Current Location
              </p>
              <p class="mt-0.5 text-sm font-medium text-[#333]">{{ vehicleDetails.location }}</p>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="rounded-lg bg-[#f8fafc] px-3 py-2.5">
                <p class="flex items-center gap-2 text-xs font-medium text-[#6b7280]">
                  <svg class="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 10h6"/><path d="M14 14h6"/><path d="M4 6h14"/><path d="M4 10h2"/><path d="M4 14h2"/><path d="M4 18h2"/><path d="M8 10h4"/><path d="M8 14h4"/></svg>
                  Fuel Type
                </p>
                <p class="mt-0.5 text-sm font-medium text-[#333]">{{ vehicleDetails.fuelType }}</p>
              </div>
              <div class="rounded-lg bg-[#f8fafc] px-3 py-2.5">
                <p class="flex items-center gap-2 text-xs font-medium text-[#6b7280]">
                  <svg class="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19v-3"/><path d="M20 19v-3"/><path d="M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4"/><path d="M4 16h16"/></svg>
                  Seat
                </p>
                <p class="mt-0.5 text-sm font-medium text-[#333]">{{ vehicleDetails.seat }}</p>
              </div>
            </div>

            <div v-if="vehicleDetails.currentRenter" class="rounded-lg bg-[#f8fafc] px-3 py-2.5">
              <p class="text-xs font-medium text-[#6b7280]">Current Renter</p>
              <p class="mt-0.5 text-sm font-medium text-[#333]">{{ vehicleDetails.currentRenter }}</p>
            </div>

            <div
              v-if="vehicleDetails.maintenanceNotes"
              class="rounded-lg bg-[#fce7f3] px-3 py-2.5"
            >
              <p class="text-xs font-medium text-[#b91c1c]">Maintenance Notes</p>
              <p class="mt-0.5 text-sm font-medium text-[#b91c1c]">{{ vehicleDetails.maintenanceNotes }}</p>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Edit Commission Modal (Pricing Config) -->
    <Teleport to="body">
      <div
        v-if="showEditCommissionModal && editingCommissionRow"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        @click.self="closeEditCommissionModal"
      >
        <div class="relative w-full max-w-md rounded-xl bg-white shadow-xl">
          <div class="flex items-start justify-between border-b border-[#e5e7eb] px-6 py-4">
            <h2 class="text-lg font-semibold text-[#333]">Edit {{ editingCommissionRow.category }} Commission</h2>
            <button type="button" class="rounded-md p-1.5 text-[#6b7280] hover:bg-[#f1f5f9]" @click="closeEditCommissionModal">
              <IconX class="h-5 w-5" />
            </button>
          </div>
          <div class="space-y-4 px-6 py-5">
            <div>
              <label class="block text-sm font-medium text-[#374151]">Platform Commission (%)</label>
              <input
                v-model="editCommissionForm.platformCommission"
                type="text"
                placeholder="e.g. 16"
                class="mt-1.5 h-10 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 text-sm text-[#333] placeholder:text-[#9ca3af] outline-none focus:border-[#333]"
              />
              <p class="mt-1 text-xs text-[#6b7280]">Owner keeps {{ ownerKeepsPercent }}%</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-[#374151]">Minimum Fee (N)</label>
              <input
                v-model="editCommissionForm.minFee"
                type="text"
                placeholder="0"
                class="mt-1.5 h-10 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 text-sm text-[#333] placeholder:text-[#9ca3af] outline-none focus:border-[#333]"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-[#374151]">Maximum Fee (N)</label>
              <input
                v-model="editCommissionForm.maxFee"
                type="text"
                placeholder="0"
                class="mt-1.5 h-10 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 text-sm text-[#333] placeholder:text-[#9ca3af] outline-none focus:border-[#333]"
              />
            </div>
          </div>
          <div class="flex justify-end gap-3 border-t border-[#e5e7eb] px-6 py-4">
            <button
              type="button"
              class="rounded-lg border border-[#e5e7eb] bg-white px-4 py-2.5 text-sm font-medium text-[#374151] hover:bg-[#f8fafc]"
              @click="closeEditCommissionModal"
            >
              Cancel
            </button>
            <button
              type="button"
              class="rounded-lg bg-[#333] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#1f2937]"
              @click="saveEditCommissionModal"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Edit Owner Tier Modal -->
    <Teleport to="body">
      <div
        v-if="showEditOwnerTierModal && editingOwnerTierRow"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        @click.self="closeEditOwnerTierModal"
      >
        <div class="relative w-full max-w-md rounded-xl bg-white shadow-xl">
          <div class="flex items-start justify-between border-b border-[#e5e7eb] px-6 py-4">
            <h2 class="text-lg font-semibold text-[#333]">Edit {{ editingOwnerTierRow.tier }} Tier</h2>
            <button type="button" class="rounded-md p-1.5 text-[#6b7280] hover:bg-[#f1f5f9]" @click="closeEditOwnerTierModal">
              <IconX class="h-5 w-5" />
            </button>
          </div>
          <div class="space-y-4 px-6 py-5">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-[#374151]">Min Monthly Earnings (₦)</label>
                <input
                  v-model="editOwnerTierForm.minEarnings"
                  type="text"
                  placeholder="0"
                  class="mt-1.5 h-10 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 text-sm text-[#333] placeholder:text-[#9ca3af] outline-none focus:border-[#333]"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-[#374151]">Max Monthly Earnings (₦)</label>
                <input
                  v-model="editOwnerTierForm.maxEarnings"
                  type="text"
                  placeholder="0"
                  class="mt-1.5 h-10 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 text-sm text-[#333] placeholder:text-[#9ca3af] outline-none focus:border-[#333]"
                />
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-[#374151]">Platform Commission (%)</label>
              <input
                v-model="editOwnerTierForm.platformCommission"
                type="text"
                placeholder="0"
                class="mt-1.5 h-10 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 text-sm text-[#333] placeholder:text-[#9ca3af] outline-none focus:border-[#333]"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-[#374151]">Description</label>
              <textarea
                v-model="editOwnerTierForm.description"
                rows="3"
                placeholder="Enter description"
                class="mt-1.5 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-sm text-[#333] placeholder:text-[#9ca3af] outline-none focus:border-[#333]"
              />
            </div>
          </div>
          <div class="flex justify-end gap-3 border-t border-[#e5e7eb] px-6 py-4">
            <button
              type="button"
              class="rounded-lg border border-[#e5e7eb] bg-white px-4 py-2.5 text-sm font-medium text-[#374151] hover:bg-[#f8fafc]"
              @click="closeEditOwnerTierModal"
            >
              Cancel
            </button>
            <button
              type="button"
              class="rounded-lg bg-[#333] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#1f2937]"
              @click="saveEditOwnerTierModal"
            >
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
import IconCalendar from '@/components/icon/icon-calendar.vue';
import IconCar from '@/components/icon/icon-car.vue';
import IconDollarSign from '@/components/icon/icon-dollar-sign.vue';
import IconHorizontalDots from '@/components/icon/icon-horizontal-dots.vue';
import IconMapPin from '@/components/icon/icon-map-pin.vue';
import IconSearch from '@/components/icon/icon-search.vue';
import IconSquareCheck from '@/components/icon/icon-square-check.vue';
import IconUser from '@/components/icon/icon-user.vue';
import IconX from '@/components/icon/icon-x.vue';
import IconClock from '@/components/icon/icon-clock.vue';

type RentalRow = {
  id: string;
  bookingId: string;
  customer: string;
  vehicle: string;
  driver: string;
  driverAssign: boolean;
  duration: string;
  total: string;
  status: string;
  statusClass: string;
};

type RentalDetails = {
  bookingId: string;
  status: string;
  statusClass: string;
  customerName: string;
  contact: string;
  vehicleMakeModel: string;
  plate: string;
  vehicleType: string;
  driverName: string;
  pickupDate: string;
  pickupLocation: string;
  returnDate: string;
  returnLocation: string;
  durationDays: string;
  fuelPolicy: string;
  mileage: string;
  insurance: string;
  dailyRate: string;
  securityDeposit: string;
  total: string;
};

const activeTab = ref('rentals');
const searchQuery = ref('');
const showRentalDetailsModal = ref(false);
const rentalDetails = ref<RentalDetails | null>(null);

type AssignDriverContext = {
  bookingId: string;
  customerName: string;
  vehicleName: string;
  currentDriverName?: string;
  rowId?: string;
};

type AssignDriverOption = {
  id: string;
  name: string;
  vehicle: string;
  phone: string;
  tripsCompleted: string;
  busy: boolean;
};

const showAssignDriverModal = ref(false);
const assignDriverContext = ref<AssignDriverContext | null>(null);
const assignDriverSearch = ref('');
const selectedAssignDriverId = ref<string | null>(null);

const assignDrivers = ref<AssignDriverOption[]>([
  { id: 'd1', name: 'Maria Garcia', vehicle: 'Honda Accord', phone: '+1234-567-8900', tripsCompleted: '342', busy: false },
  { id: 'd2', name: 'Maria Garcia', vehicle: 'Honda Accord', phone: '+1234-567-8901', tripsCompleted: '342', busy: true },
  { id: 'd3', name: 'Maria Garcia', vehicle: 'Honda Accord', phone: '+1234-567-8901', tripsCompleted: '342', busy: false },
]);

const filteredAssignDrivers = computed(() => {
  const q = assignDriverSearch.value.trim().toLowerCase();
  if (!q) return assignDrivers.value;
  return assignDrivers.value.filter(
    (d) =>
      d.name.toLowerCase().includes(q) ||
      d.vehicle.toLowerCase().includes(q) ||
      d.phone.includes(q)
  );
});

// Fleet Map tab
const fleetStatusSearch = ref('');
const fleetStatusFilter = ref('all');

type VehicleDetailsModal = {
  name: string;
  plate: string;
  statusLabel: string;
  statusBadgeClass: string;
  location: string;
  fuelType: string;
  seat: string;
  lastUpdated: string;
  currentRenter?: string;
  maintenanceNotes?: string;
};

const showVehicleDetailsModal = ref(false);
const vehicleDetails = ref<VehicleDetailsModal | null>(null);

const fleetMapMarkers = ref<(VehicleDetailsModal & { id: string; status: string; bgClass: string })[]>([
  { id: 'm1', name: 'Toyota Camry 2023', plate: 'ABC 1234', statusLabel: 'On Hire', statusBadgeClass: 'bg-[#3b82f6] text-white', status: 'on-hire', bgClass: 'bg-[#3b82f6]', location: 'Downtown Manhattan, NY', fuelType: 'Petrol', seat: '4', lastUpdated: '2 mins ago', currentRenter: 'Peter Anderson' },
  { id: 'm2', name: 'Toyota Camry 2023', plate: 'ABC 1234', statusLabel: 'Available', statusBadgeClass: 'bg-[#22c55e] text-white', status: 'available', bgClass: 'bg-[#22c55e]', location: 'Downtown Manhattan, NY', fuelType: 'Petrol', seat: '4', lastUpdated: '2 mins ago' },
  { id: 'm3', name: 'Toyota Camry 2023', plate: 'ABC 1234', statusLabel: 'Returned', statusBadgeClass: 'bg-[#eab308] text-white', status: 'returned', bgClass: 'bg-[#eab308]', location: 'Downtown Manhattan, NY', fuelType: 'Petrol', seat: '4', lastUpdated: '2 mins ago' },
  { id: 'm4', name: 'Toyota Camry 2023', plate: 'ABC 1234', statusLabel: 'Needs Maintenance', statusBadgeClass: 'bg-[#ec4899] text-white', status: 'needs-maintenance', bgClass: 'bg-[#ef4444]', location: 'Downtown Manhattan, NY', fuelType: 'Petrol', seat: '4', lastUpdated: '2 mins ago', maintenanceNotes: 'Brake pads need replacement, oil change overdue' },
  { id: 'm5', name: 'Toyota Camry 2023', plate: 'ABC 1234', statusLabel: 'On Hire', statusBadgeClass: 'bg-[#3b82f6] text-white', status: 'on-hire', bgClass: 'bg-[#3b82f6]', location: 'Downtown Manhattan, NY', fuelType: 'Petrol', seat: '4', lastUpdated: '2 mins ago', currentRenter: 'Peter Anderson' },
  { id: 'm6', name: 'Toyota Camry 2023', plate: 'ABC 1234', statusLabel: 'Available', statusBadgeClass: 'bg-[#22c55e] text-white', status: 'available', bgClass: 'bg-[#22c55e]', location: 'Downtown Manhattan, NY', fuelType: 'Petrol', seat: '4', lastUpdated: '2 mins ago' },
  { id: 'm7', name: 'Toyota Camry 2023', plate: 'ABC 1234', statusLabel: 'Returned', statusBadgeClass: 'bg-[#eab308] text-white', status: 'returned', bgClass: 'bg-[#eab308]', location: 'Downtown Manhattan, NY', fuelType: 'Petrol', seat: '4', lastUpdated: '2 mins ago' },
  { id: 'm8', name: 'Toyota Camry 2023', plate: 'ABC 1234', statusLabel: 'Sent for Repair', statusBadgeClass: 'bg-[#ec4899] text-white', status: 'sent-repair', bgClass: 'bg-[#ec4899]', location: 'Downtown Manhattan, NY', fuelType: 'Petrol', seat: '4', lastUpdated: '2 mins ago' },
  { id: 'm9', name: 'Toyota Camry 2023', plate: 'ABC 1234', statusLabel: 'Under Maintenance', statusBadgeClass: 'bg-[#7f1d1d] text-white', status: 'under-maintenance', bgClass: 'bg-[#7f1d1d]', location: 'Downtown Manhattan, NY', fuelType: 'Petrol', seat: '4', lastUpdated: '2 mins ago' },
]);

type FleetStatusItem = {
  id: string;
  name: string;
  statusKey: string;
  statusLabel: string;
  statusClass: string;
  termLabel: string;
  mileage: string;
  lastSeen: string;
  actionLabel: string;
  actionClass: string;
};

const fleetStatusList = ref<(FleetStatusItem & { location: string; fuelType: string; seat: string; currentRenter?: string; maintenanceNotes?: string; statusBadgeClass: string })[]>([
  { id: 'fs1', name: 'Toyota Camry 2023', statusKey: 'on-hire', statusLabel: 'On Hire', statusClass: 'bg-[#dbeafe] text-[#1d4ed8]', statusBadgeClass: 'bg-[#3b82f6] text-white', termLabel: 'Rental Term', mileage: '15,420 mi', lastSeen: '2 mins ago', actionLabel: 'Check In', actionClass: 'bg-[#3b82f6] text-white', location: 'Downtown Manhattan, NY', fuelType: 'Petrol', seat: '4', currentRenter: 'Peter Anderson' },
  { id: 'fs2', name: 'Toyota Camry 2023', statusKey: 'available', statusLabel: 'Available', statusClass: 'bg-[#dcfce7] text-[#15803d]', statusBadgeClass: 'bg-[#22c55e] text-white', termLabel: 'Daily Term', mileage: '15,420 mi', lastSeen: '2 mins ago', actionLabel: 'View', actionClass: 'border border-[#e5e7eb] bg-white text-[#374151]', location: 'Downtown Manhattan, NY', fuelType: 'Petrol', seat: '4' },
  { id: 'fs3', name: 'Toyota Camry 2023', statusKey: 'returned', statusLabel: 'Returned', statusClass: 'bg-[#fef9c3] text-[#b45309]', statusBadgeClass: 'bg-[#eab308] text-white', termLabel: 'Rental Term', mileage: '15,420 mi', lastSeen: '2 mins ago', actionLabel: 'View', actionClass: 'border border-[#e5e7eb] bg-white text-[#374151]', location: 'Downtown Manhattan, NY', fuelType: 'Petrol', seat: '4' },
  { id: 'fs4', name: 'Toyota Camry 2023', statusKey: 'needs-maintenance', statusLabel: 'Needs Maintenance', statusClass: 'bg-[#fee2e2] text-[#b91c1c]', statusBadgeClass: 'bg-[#ec4899] text-white', termLabel: '—', mileage: '15,420 mi', lastSeen: '2 mins ago', actionLabel: 'Mark Maintenance', actionClass: 'bg-[#ef4444] text-white', location: 'Downtown Manhattan, NY', fuelType: 'Petrol', seat: '4', maintenanceNotes: 'Brake pads need replacement, oil change overdue' },
  { id: 'fs5', name: 'Toyota Camry 2023', statusKey: 'under-maintenance', statusLabel: 'Under Maintenance', statusClass: 'bg-[#7f1d1d] text-white', statusBadgeClass: 'bg-[#7f1d1d] text-white', termLabel: '—', mileage: '15,420 mi', lastSeen: '2 mins ago', actionLabel: 'View', actionClass: 'border border-[#e5e7eb] bg-white text-[#374151]', location: 'Downtown Manhattan, NY', fuelType: 'Petrol', seat: '4' },
]);

const filteredFleetStatusList = computed(() => {
  let list = fleetStatusList.value;
  const q = fleetStatusSearch.value.trim().toLowerCase();
  if (q) list = list.filter((v) => v.name.toLowerCase().includes(q) || v.statusLabel.toLowerCase().includes(q));
  const f = fleetStatusFilter.value;
  if (f !== 'all') list = list.filter((v) => v.statusKey === f);
  return list;
});

type FleetVehicleRow = {
  id: string;
  name: string;
  plate: string;
  statusLabel: string;
  statusClass: string;
  location: string;
  fuelType: string;
  seat: string;
  lastUpdated: string;
};

type FleetVehicleRowExtended = FleetVehicleRow & { currentRenter?: string; maintenanceNotes?: string; statusBadgeClass: string };

const fleetVehiclesTable = ref<FleetVehicleRowExtended[]>([
  { id: 'fv1', name: 'Toyota Camry 2023', plate: 'ABC 1234', statusLabel: 'On Hire', statusClass: 'bg-[#dbeafe] text-[#1d4ed8]', statusBadgeClass: 'bg-[#3b82f6] text-white', location: 'Downtown Manhattan, NY', fuelType: 'Petrol', seat: '4', lastUpdated: '2 mins ago', currentRenter: 'Peter Anderson' },
  { id: 'fv2', name: 'Toyota Camry 2023', plate: 'ABC 1234', statusLabel: 'Available', statusClass: 'bg-[#dcfce7] text-[#15803d]', statusBadgeClass: 'bg-[#22c55e] text-white', location: 'Downtown Manhattan, NY', fuelType: 'Petrol', seat: '4', lastUpdated: '2 mins ago' },
  { id: 'fv3', name: 'Toyota Camry 2023', plate: 'ABC 1234', statusLabel: 'Returned', statusClass: 'bg-[#fef9c3] text-[#b45309]', statusBadgeClass: 'bg-[#eab308] text-white', location: 'Downtown Manhattan, NY', fuelType: 'Petrol', seat: '4', lastUpdated: '2 mins ago' },
]);

function openVehicleDetailsModal(details: VehicleDetailsModal) {
  vehicleDetails.value = {
    name: details.name,
    plate: details.plate,
    statusLabel: details.statusLabel,
    statusBadgeClass: details.statusBadgeClass,
    location: details.location,
    fuelType: details.fuelType,
    seat: details.seat,
    lastUpdated: details.lastUpdated,
    currentRenter: details.currentRenter,
    maintenanceNotes: details.maintenanceNotes,
  };
  showVehicleDetailsModal.value = true;
}

function openVehicleDetailsModalFromFleetStatus(v: (FleetStatusItem & { location: string; fuelType: string; seat: string; currentRenter?: string; maintenanceNotes?: string; statusBadgeClass: string })) {
  openVehicleDetailsModal({
    name: v.name,
    plate: 'ABC 1234',
    statusLabel: v.statusLabel,
    statusBadgeClass: v.statusBadgeClass,
    location: v.location,
    fuelType: v.fuelType,
    seat: v.seat,
    lastUpdated: v.lastSeen,
    currentRenter: v.currentRenter,
    maintenanceNotes: v.maintenanceNotes,
  });
}

function openVehicleDetailsModalFromTable(v: FleetVehicleRowExtended) {
  openVehicleDetailsModal({
    name: v.name,
    plate: v.plate,
    statusLabel: v.statusLabel,
    statusBadgeClass: v.statusBadgeClass,
    location: v.location,
    fuelType: v.fuelType,
    seat: v.seat,
    lastUpdated: v.lastUpdated,
    currentRenter: v.currentRenter,
    maintenanceNotes: v.maintenanceNotes,
  });
}

function closeVehicleDetailsModal() {
  showVehicleDetailsModal.value = false;
  vehicleDetails.value = null;
}

const tabs = [
  { value: 'rentals', label: 'Rentals' },
  { value: 'fleet-map', label: 'Fleet Map' },
  { value: 'pricing-config', label: 'Pricing Config' },
];

const pricingConfigSubTab = ref('category-commission');
const pricingConfigSubTabs = [
  { value: 'category-commission', label: 'Category Commission' },
  { value: 'owner-tiers', label: 'Owner Tiers' },
  { value: 'platform-settings', label: 'Platform Settings' },
  { value: 'pricing-policy', label: 'Pricing Policy' },
  { value: 'earnings-calculator', label: 'Earnings Calculator' },
];

type CommissionCategoryRow = {
  id: string;
  category: string;
  platformCommission: string;
  minFee: string;
  maxFee: string;
  ownerGets: string;
  enabled: boolean;
};

const commissionCategoryRows = ref<CommissionCategoryRow[]>([
  { id: 'cc1', category: 'Sedan', platformCommission: '16%', minFee: '₦1,500', maxFee: '₦1,500', ownerGets: '82%', enabled: true },
  { id: 'cc2', category: 'Sedan', platformCommission: '16%', minFee: '₦1,500', maxFee: '₦1,500', ownerGets: '82%', enabled: true },
  { id: 'cc3', category: 'Sedan', platformCommission: '16%', minFee: '₦1,500', maxFee: '₦1,500', ownerGets: '82%', enabled: true },
  { id: 'cc4', category: 'Sedan', platformCommission: '16%', minFee: '₦1,500', maxFee: '₦1,500', ownerGets: '82%', enabled: true },
]);

const showEditCommissionModal = ref(false);
const editingCommissionRow = ref<CommissionCategoryRow | null>(null);
const editCommissionForm = ref({
  platformCommission: '',
  minFee: '',
  maxFee: '',
});

const ownerKeepsPercent = computed(() => {
  const n = Number(editCommissionForm.value.platformCommission.replace(/%/g, '').trim());
  if (Number.isNaN(n) || n < 0 || n > 100) return 0;
  return Math.round(100 - n);
});

function toggleCommissionRow(row: CommissionCategoryRow) {
  row.enabled = !row.enabled;
}

function editCommissionRow(row: CommissionCategoryRow) {
  editingCommissionRow.value = row;
  editCommissionForm.value = {
    platformCommission: row.platformCommission.replace(/%/g, '').trim() || '',
    minFee: row.minFee.replace(/^₦|N|,/g, '').trim() || '',
    maxFee: row.maxFee.replace(/^₦|N|,/g, '').trim() || '',
  };
  showEditCommissionModal.value = true;
}

function closeEditCommissionModal() {
  showEditCommissionModal.value = false;
  editingCommissionRow.value = null;
}

function saveEditCommissionModal() {
  const row = editingCommissionRow.value;
  if (!row) return;
  const pc = editCommissionForm.value.platformCommission.trim();
  const minVal = editCommissionForm.value.minFee.trim();
  const maxVal = editCommissionForm.value.maxFee.trim();
  if (pc) {
    const n = Number(pc);
    if (!Number.isNaN(n)) {
      row.platformCommission = `${n}%`;
      row.ownerGets = `${100 - n}%`;
    }
  }
  if (minVal) row.minFee = `₦${Number(minVal).toLocaleString()}`;
  if (maxVal) row.maxFee = `₦${Number(maxVal).toLocaleString()}`;
  closeEditCommissionModal();
}

type OwnerTierRow = {
  id: string;
  tier: string;
  earningsRange: string;
  platformCommission: string;
  ownerKeeps: string;
  description: string;
};

const ownerTiersRows = ref<OwnerTierRow[]>([
  { id: 'ot1', tier: 'Starter', earningsRange: '₦1,500 - ₦1,500', platformCommission: '22%', ownerKeeps: '78%', description: 'New owners or low-volume listings' },
  { id: 'ot2', tier: 'Bronze', earningsRange: '₦1,500 - ₦1,500', platformCommission: '22%', ownerKeeps: '78%', description: 'New owners or low-volume listings' },
  { id: 'ot3', tier: 'Silver', earningsRange: '₦1,500 - ₦1,500', platformCommission: '22%', ownerKeeps: '78%', description: 'New owners or low-volume listings' },
  { id: 'ot4', tier: 'Gold', earningsRange: '₦1,500 - ₦1,500', platformCommission: '22%', ownerKeeps: '78%', description: 'New owners or low-volume listings' },
  { id: 'ot5', tier: 'Platinum', earningsRange: '₦1,500 - ₦1,500', platformCommission: '22%', ownerKeeps: '78%', description: 'New owners or low-volume listings' },
]);

const showEditOwnerTierModal = ref(false);
const editingOwnerTierRow = ref<OwnerTierRow | null>(null);
const editOwnerTierForm = ref({
  minEarnings: '',
  maxEarnings: '',
  platformCommission: '',
  description: '',
});

function parseEarningsRange(range: string): { min: string; max: string } {
  const parts = range.split(/\s*-\s*/).map((s) => s.replace(/^₦|N|,/g, '').trim());
  return { min: parts[0] || '', max: parts[1] ?? parts[0] ?? '' };
}

const platformSettingsDefaultCommission = ref(20);
const platformSettingsDriverCommission = ref('');
const platformSettingsPaymentFee = ref('');
const platformSettingsPayoutSchedule = ref('');
const platformSettingsMinPayout = ref('');

const pricingPolicyItems = ref([
  { id: 'smart-pricing', label: 'Smart Pricing Suggestions', description: 'Show owners suggested pricing based on market data and vehicle type', enabled: false },
  { id: 'surge-pricing', label: 'Allow Surge Pricing', description: 'Let owners increase prices during high-demand periods (holidays, events)', enabled: false },
  { id: 'discount-limits', label: 'Discount Limits', description: 'Cap maximum discounts owners can offer to prevent race-to-bottom pricing', enabled: false },
]);

// Earnings Calculator state
const earningsCalcCategory = ref('');
const earningsCalcTier = ref('');
const earningsCalcDailyPrice = ref(0);
const earningsCalcDuration = ref(0);
const earningsCalcIncludeDriver = ref(false);

const earningsCalcCategoryOptions = computed(() => {
  const seen = new Set<string>();
  return commissionCategoryRows.value
    .filter((r) => {
      if (seen.has(r.category)) return false;
      seen.add(r.category);
      return true;
    })
    .map((r) => ({ value: r.category, label: r.category }));
});

const revenueBreakdown = computed(() => {
  const daily = Number(earningsCalcDailyPrice.value) || 0;
  const days = Math.max(0, Math.floor(Number(earningsCalcDuration.value) || 0));
  const vehicleRental = daily * days;
  const processingFeePct = Number(platformSettingsPaymentFee.value) || 2.5;
  const processingFeeAmount = vehicleRental * (processingFeePct / 100);
  const customerPays = vehicleRental + processingFeeAmount;

  const tierId = earningsCalcTier.value;
  const tier = tierId ? ownerTiersRows.value.find((t) => t.id === tierId) : null;
  const commissionPct = tier
    ? Number(tier.platformCommission.replace(/%/g, '').trim()) || platformSettingsDefaultCommission.value
    : platformSettingsDefaultCommission.value;
  const platformCommission = vehicleRental * (commissionPct / 100);
  const ownerEarnings = vehicleRental - platformCommission;
  const driverEarnings = earningsCalcIncludeDriver.value ? 0 : 0; // placeholder when driver fee is configured

  return {
    vehicleRental,
    processingFeePercent: processingFeePct,
    processingFeeAmount,
    customerPays,
    commissionPercent: commissionPct,
    platformCommission,
    ownerEarnings,
    driverEarnings,
  };
});

function formatNum(n: number): string {
  return Number.isNaN(n) ? '0' : String(n);
}

function formatMoney(n: number): string {
  return Number.isNaN(n) ? '0.00' : n.toFixed(2);
}

function savePlatformSettings() {
  // Persist or API call can be wired here
}

function editOwnerTierRow(row: OwnerTierRow) {
  editingOwnerTierRow.value = row;
  const { min, max } = parseEarningsRange(row.earningsRange);
  editOwnerTierForm.value = {
    minEarnings: min,
    maxEarnings: max,
    platformCommission: row.platformCommission.replace(/%/g, '').trim() || '',
    description: row.description || '',
  };
  showEditOwnerTierModal.value = true;
}

function closeEditOwnerTierModal() {
  showEditOwnerTierModal.value = false;
  editingOwnerTierRow.value = null;
}

function saveEditOwnerTierModal() {
  const row = editingOwnerTierRow.value;
  if (!row) return;
  const minVal = editOwnerTierForm.value.minEarnings.trim();
  const maxVal = editOwnerTierForm.value.maxEarnings.trim();
  const pc = editOwnerTierForm.value.platformCommission.trim();
  const desc = editOwnerTierForm.value.description.trim();
  if (minVal !== '' || maxVal !== '') {
    const min = minVal ? Number(minVal) : 0;
    const max = maxVal ? Number(maxVal) : min;
    row.earningsRange = `₦${min.toLocaleString()} - ₦${max.toLocaleString()}`;
  }
  if (pc) {
    const n = Number(pc);
    if (!Number.isNaN(n)) {
      row.platformCommission = `${n}%`;
      row.ownerKeeps = `${100 - n}%`;
    }
  }
  if (desc) row.description = desc;
  closeEditOwnerTierModal();
}

const rentalRows = ref<RentalRow[]>([
  { id: '1', bookingId: 'VH001', customer: 'Peter Anderson', vehicle: 'Toyota Camry 20...', driver: 'Michael Johnson', driverAssign: false, duration: '3 days, 2024-01-15 - 2024-01-18', total: '₦1,500', status: 'Active', statusClass: 'bg-[#dbeafe] text-[#1d4ed8]' },
  { id: '2', bookingId: 'VH002', customer: 'Peter Anderson', vehicle: 'Toyota Camry 20...', driver: 'Self-drive', driverAssign: false, duration: '3 days, 2024-01-15 - 2024-01-18', total: '₦1,500', status: 'Completed', statusClass: 'bg-[#dcfce7] text-[#15803d]' },
  { id: '3', bookingId: 'VH003', customer: 'Peter Anderson', vehicle: 'Toyota Camry 20...', driver: '', driverAssign: true, duration: '3 days, 2024-01-15 - 2024-01-18', total: '₦1,500', status: 'Pending', statusClass: 'bg-[#fef3c7] text-[#b45309]' },
  { id: '4', bookingId: 'VH004', customer: 'Peter Anderson', vehicle: 'Toyota Camry 20...', driver: 'Robert Davis', driverAssign: false, duration: '3 days, 2024-01-15 - 2024-01-18', total: '₦1,500', status: 'Cancelled', statusClass: 'bg-[#fee2e2] text-[#b91c1c]' },
]);

const rentalDetailsByBookingId: Record<string, Partial<RentalDetails>> = {
  VH001: {
    contact: '+1 234-567-2001',
    vehicleMakeModel: 'Toyota Camry 2023',
    plate: 'ABC 1234',
    vehicleType: 'Sedan',
    pickupDate: '2024-01-15',
    pickupLocation: 'Airport Terminal 1',
    returnDate: '2024-01-18',
    returnLocation: 'Downtown Office',
    durationDays: '3 days',
    fuelPolicy: 'Full to Full',
    mileage: 'Unlimited',
    insurance: 'Comprehensive',
    dailyRate: '₦1,500',
    securityDeposit: '₦1,500',
  },
  VH002: {
    contact: '+1 234-567-2001',
    vehicleMakeModel: 'Toyota Camry 2023',
    plate: 'ABC 1234',
    vehicleType: 'Sedan',
    pickupDate: '2024-01-15',
    pickupLocation: 'Airport Terminal 1',
    returnDate: '2024-01-18',
    returnLocation: 'Downtown Office',
    durationDays: '3 days',
    fuelPolicy: 'Full to Full',
    mileage: 'Unlimited',
    insurance: 'Comprehensive',
    dailyRate: '₦1,500',
    securityDeposit: '₦1,500',
  },
  VH003: {
    contact: '+1 234-567-2001',
    vehicleMakeModel: 'Toyota Camry 2023',
    plate: 'ABC 1234',
    vehicleType: 'Sedan',
    pickupDate: '2024-01-15',
    pickupLocation: 'Airport Terminal 1',
    returnDate: '2024-01-18',
    returnLocation: 'Downtown Office',
    durationDays: '3 days',
    fuelPolicy: 'Full to Full',
    mileage: 'Unlimited',
    insurance: 'Comprehensive',
    dailyRate: '₦1,500',
    securityDeposit: '₦1,500',
  },
  VH004: {
    contact: '+1 234-567-2001',
    vehicleMakeModel: 'Toyota Camry 2023',
    plate: 'ABC 1234',
    vehicleType: 'Sedan',
    pickupDate: '2024-01-15',
    pickupLocation: 'Airport Terminal 1',
    returnDate: '2024-01-18',
    returnLocation: 'Downtown Office',
    durationDays: '3 days',
    fuelPolicy: 'Full to Full',
    mileage: 'Unlimited',
    insurance: 'Comprehensive',
    dailyRate: '₦1,500',
    securityDeposit: '₦1,500',
  },
};

function openRentalDetails(row: RentalRow) {
  const extra = rentalDetailsByBookingId[row.bookingId] || {};
  rentalDetails.value = {
    bookingId: row.bookingId,
    status: row.status,
    statusClass: row.statusClass,
    customerName: row.customer,
    contact: extra.contact ?? '+1 234-567-2001',
    vehicleMakeModel: extra.vehicleMakeModel ?? row.vehicle.replace('...', '23'),
    plate: extra.plate ?? 'ABC 1234',
    vehicleType: extra.vehicleType ?? 'Sedan',
    driverName: row.driverAssign ? '' : row.driver,
    pickupDate: extra.pickupDate ?? '2024-01-15',
    pickupLocation: extra.pickupLocation ?? 'Airport Terminal 1',
    returnDate: extra.returnDate ?? '2024-01-18',
    returnLocation: extra.returnLocation ?? 'Downtown Office',
    durationDays: extra.durationDays ?? '3 days',
    fuelPolicy: extra.fuelPolicy ?? 'Full to Full',
    mileage: extra.mileage ?? 'Unlimited',
    insurance: extra.insurance ?? 'Comprehensive',
    dailyRate: extra.dailyRate ?? '₦1,500',
    securityDeposit: extra.securityDeposit ?? '₦1,500',
    total: row.total,
  };
  showRentalDetailsModal.value = true;
}

function closeRentalDetailsModal() {
  showRentalDetailsModal.value = false;
  rentalDetails.value = null;
}

function openAssignDriverModal(row: RentalRow) {
  const extra = rentalDetailsByBookingId[row.bookingId];
  const vehicleName = extra?.vehicleMakeModel ?? row.vehicle.replace('...', '23');
  assignDriverContext.value = {
    bookingId: row.bookingId,
    customerName: row.customer,
    vehicleName,
    currentDriverName: row.driverAssign ? undefined : row.driver || undefined,
    rowId: row.id,
  };
  selectedAssignDriverId.value = assignDrivers.value.find((d) => !d.busy)?.id ?? null;
  assignDriverSearch.value = '';
  showAssignDriverModal.value = true;
}

function openAssignDriverModalFromDetails() {
  if (!rentalDetails.value) return;
  assignDriverContext.value = {
    bookingId: rentalDetails.value.bookingId,
    customerName: rentalDetails.value.customerName,
    vehicleName: rentalDetails.value.vehicleMakeModel,
    currentDriverName: rentalDetails.value.driverName || undefined,
  };
  selectedAssignDriverId.value = assignDrivers.value.find((d) => !d.busy)?.id ?? null;
  assignDriverSearch.value = '';
  showRentalDetailsModal.value = false;
  showAssignDriverModal.value = true;
}

function closeAssignDriverModal() {
  showAssignDriverModal.value = false;
  assignDriverContext.value = null;
  selectedAssignDriverId.value = null;
  assignDriverSearch.value = '';
}

function confirmAssignDriver() {
  const ctx = assignDriverContext.value;
  const driverId = selectedAssignDriverId.value;
  if (!ctx || !driverId) return;
  const driver = assignDrivers.value.find((d) => d.id === driverId);
  if (driver && ctx.rowId) {
    const row = rentalRows.value.find((r) => r.id === ctx.rowId);
    if (row) {
      row.driver = driver.name;
      row.driverAssign = false;
    }
  }
  closeAssignDriverModal();
}
</script>
