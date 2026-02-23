<template>
  <div class="min-h-screen bg-white p-5 md:p-6">
    <div class="mx-auto max-w-[1220px] space-y-4">
      <div class="flex items-start justify-between">
        <div>
          <h1 class="text-[30px] font-semibold leading-tight text-[#0f172a]">Vehicles / Fleet Management</h1>
          <p class="mt-1 text-sm text-[#64748b]">Manage all vehicles and fleet inventory</p>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <div v-for="item in cards" :key="item.label" class="rounded-lg border border-[#e5e7eb] bg-white p-4 shadow-sm">
          <div class="flex items-center justify-between">
            <p class="text-xs text-[#64748b]">{{ item.label }}</p>
            <span class="inline-flex h-9 w-9 items-center justify-center rounded-lg" :style="{ backgroundColor: item.bg }">
              <component :is="item.icon" class="h-4 w-4" :class="item.iconClass" />
            </span>
          </div>
          <p class="mt-4 text-[28px] font-semibold text-[#0f172a]">{{ item.value }}</p>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <div class="relative max-w-[320px] flex-1">
          <IconSearch class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94a3b8]" />
          <input
            v-model="search"
            placeholder="Search vehicle ID, model, owner..."
            class="h-10 w-full rounded-lg border border-[#e5e7eb] bg-white pl-9 pr-3 text-sm text-[#0f172a] placeholder:text-[#94a3b8] outline-none focus:border-[#cbd5e1]"
          />
        </div>
        <select class="h-10 rounded-lg border border-[#e5e7eb] bg-white px-4 text-sm text-[#475569] outline-none focus:border-[#cbd5e1]">
          <option value="">Vehicle type</option>
          <option value="car">Car</option>
          <option value="motorcycle">Motorcycle</option>
          <option value="van">Van</option>
        </select>
        <select class="h-10 rounded-lg border border-[#e5e7eb] bg-white px-4 text-sm text-[#475569] outline-none focus:border-[#cbd5e1]">
          <option value="">Status</option>
          <option value="Available">Available</option>
          <option value="In Use">In Use</option>
          <option value="Maintenance">Maintenance</option>
          <option value="Pending Approval">Pending Approval</option>
        </select>
      </div>

      <div class="rounded-xl border border-[#e5e7eb] bg-white overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full min-w-[800px] border-collapse">
            <thead>
              <tr class="border-b border-[#e5e7eb] bg-[#fcfcfd] text-left text-xs font-semibold text-[#64748b]">
                <th class="px-4 py-3">Vehicle</th>
                <th class="px-4 py-3">Owner</th>
                <th class="px-4 py-3">Plate</th>
                <th class="px-4 py-3">Rate</th>
                <th class="px-4 py-3">Trips</th>
                <th class="px-4 py-3">Reason For Removal</th>
                <th class="px-4 py-3">Status</th>
                <th class="w-12 px-2 py-3"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in filteredRows" :key="row.id" class="border-b border-[#f1f5f9] text-sm text-[#0f172a]">
                <td class="px-4 py-3">
                  <div class="flex items-center gap-3">
                    <span
                      class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                      :style="{ backgroundColor: row.iconBg }"
                    >
                      <!-- Car -->
                      <svg v-if="row.vehicleType === 'car'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="h-4 w-4" :class="row.iconClass" fill="currentColor"><path d="M135.2 117.4L109.1 192l293.8 0-26.1-74.6C372.3 104.6 360.2 96 346.6 96L165.4 96c-13.6 0-25.7 8.6-30.2 21.4zM39.6 196.8L74.8 96.3C88.3 57.8 124.6 32 165.4 32l181.2 0c40.8 0 77.1 25.8 90.6 64.3l35.2 100.5c23.2 9.6 39.6 32.5 39.6 59.2l0 144 0 48c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-48L96 400l0 48c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-48L0 256c0-26.7 16.4-49.6 39.6-59.2zM128 288a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm288 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"/></svg>
                      <!-- Motorcycle -->
                      <svg v-else-if="row.vehicleType === 'motorcycle'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="h-4 w-4" :class="row.iconClass" fill="currentColor"><path d="M280 32c-13.3 0-24 10.7-24 24s10.7 24 24 24h57.7l16.4 30.3L256 192l-45.3-45.3c-12-12-28.3-18.7-45.3-18.7H64c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64h1.3c.2 0 .4 0 .6 0H96 352h1.3c.2 0 .4 0 .6 0H384c53 0 96-43 96-96c0-41.4-26.2-76.6-63.1-90.2l23.5-43.4 52 52L536 192l27.3-27.3c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6l-24 24 24 24c6.2 6.2 6.2 16.4 0 22.6s-16.4 6.2-22.6 0L540 222.6l-54.6 54.6-52.6-52.6 54.6-54.6L540 115.3 562.7 92.6c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0L494.6 115.3 440 169.9l-52.6-52.6 54.6-54.6L477.3 38.6c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0L377.4 115.3 322.7 60.6c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6L356.7 96 256 196.7 184.9 125.6 201.3 89.8 280 32zM128 192h50.7l64 64H64v-32c0-17.7 14.3-32 32-32H128zm128 64H96c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64h160V256zm32 160H352 384 512c35.3 0 64-28.7 64-64V320c0-35.3-28.7-64-64-64H384c-35.3 0-64 28.7-64 64v96zm160-96c-17.7 0-32 14.3-32 32v32c0 17.7 14.3 32 32 32h64c17.7 0 32-14.3 32-32V288c0-17.7-14.3-32-32-32H448zM64 352v32c0 17.7 14.3 32 32 32h64c17.7 0 32-14.3 32-32V288c0-17.7-14.3-32-32-32H96c-17.7 0-32 14.3-32 32v32z"/></svg>
                      <!-- Van -->
                      <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="h-4 w-4" :class="row.iconClass" fill="currentColor"><path d="M64 32C28.7 32 0 60.7 0 96V304v80 32c0 17.7 14.3 32 32 32H64c17.7 0 32-14.3 32-32V384H352v32c0 17.7 14.3 32 32 32h32c17.7 0 32-14.3 32-32V384h32c17.7 0 32-14.3 32-32V304 96c0-35.3-28.7-64-64-64H413.3c-12.4 0-24.2 4.9-32.9 13.6L352 125.3 291.6 64.9C282.9 56.2 271.1 51.2 258.7 51.2H64zM352 160l64 64H352V160zM64 352V96H256v96c0 17.7 14.3 32 32 32H352v32H64zm448 0V192H416V160 96h64V352h32z"/></svg>
                    </span>
                    <span class="font-medium text-[#334155]">{{ row.vehicle }}</span>
                  </div>
                </td>
                <td class="px-4 py-3 text-[#334155]">{{ row.owner }}</td>
                <td class="px-4 py-3 text-[#334155]">{{ row.plate }}</td>
                <td class="px-4 py-3 text-[#334155]">{{ row.rate }}</td>
                <td class="px-4 py-3 text-[#334155]">{{ row.trips }}</td>
                <td class="px-4 py-3 text-[#334155]">{{ row.reasonForRemoval || '—' }}</td>
                <td class="px-4 py-3">
                  <span
                    class="rounded-full px-3 py-1 text-xs font-medium"
                    :class="getStatusClass(row.status)"
                  >
                    {{ row.status }}
                  </span>
                </td>
                <td class="relative px-2 py-3">
                  <button
                    class="rounded-md p-1.5 text-[#64748b] hover:bg-[#f8fafc]"
                    @click.stop="openActionId = openActionId === row.id ? null : row.id"
                  >
                    <IconHorizontalDots class="h-4 w-4" />
                  </button>
                  <div
                    v-if="openActionId === row.id"
                    class="absolute right-0 top-full z-10 mt-1 w-44 rounded-lg border border-[#e5e7eb] bg-white py-1 shadow-lg"
                  >
                    <button
                      class="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-[#334155] hover:bg-[#f8fafc]"
                      @click.stop="viewDetails(row)"
                    >
                      <IconEye class="h-3.5 w-3.5 text-[#64748b]" />
                      View Details
                    </button>
                    <button
                      class="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-[#dc2626] hover:bg-[#fef2f2]"
                      @click.stop="removeVehicle(row)"
                    >
                      <IconTrash class="h-3.5 w-3.5" />
                      Remove Vehicle
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Vehicle Details Modal -->
    <div
      v-if="showDetailsModal && selectedVehicle"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4"
      @click="closeDetailsModal"
    >
      <div class="w-full max-w-lg rounded-2xl bg-white shadow-2xl" @click.stop>
        <div class="flex items-start justify-between border-b border-[#e5e7eb] p-5">
          <div class="flex items-center gap-3">
            <span
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
              :style="{ backgroundColor: selectedVehicle.iconBg }"
            >
              <svg v-if="selectedVehicle.vehicleType === 'car'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="h-5 w-5" :class="selectedVehicle.iconClass" fill="currentColor"><path d="M135.2 117.4L109.1 192l293.8 0-26.1-74.6C372.3 104.6 360.2 96 346.6 96L165.4 96c-13.6 0-25.7 8.6-30.2 21.4zM39.6 196.8L74.8 96.3C88.3 57.8 124.6 32 165.4 32l181.2 0c40.8 0 77.1 25.8 90.6 64.3l35.2 100.5c23.2 9.6 39.6 32.5 39.6 59.2l0 144 0 48c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-48L96 400l0 48c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-48L0 256c0-26.7 16.4-49.6 39.6-59.2zM128 288a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm288 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"/></svg>
              <svg v-else-if="selectedVehicle.vehicleType === 'motorcycle'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="h-5 w-5" :class="selectedVehicle.iconClass" fill="currentColor"><path d="M280 32c-13.3 0-24 10.7-24 24s10.7 24 24 24h57.7l16.4 30.3L256 192l-45.3-45.3c-12-12-28.3-18.7-45.3-18.7H64c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64h1.3c.2 0 .4 0 .6 0H96 352h1.3c.2 0 .4 0 .6 0H384c53 0 96-43 96-96c0-41.4-26.2-76.6-63.1-90.2l23.5-43.4 52 52L536 192l27.3-27.3c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6l-24 24 24 24c6.2 6.2 6.2 16.4 0 22.6s-16.4 6.2-22.6 0L540 222.6l-54.6 54.6-52.6-52.6 54.6-54.6L540 115.3 562.7 92.6c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0L494.6 115.3 440 169.9l-52.6-52.6 54.6-54.6L477.3 38.6c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0L377.4 115.3 322.7 60.6c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6L356.7 96 256 196.7 184.9 125.6 201.3 89.8 280 32zM128 192h50.7l64 64H64v-32c0-17.7 14.3-32 32-32H128zm128 64H96c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64h160V256zm32 160H352 384 512c35.3 0 64-28.7 64-64V320c0-35.3-28.7-64-64-64H384c-35.3 0-64 28.7-64 64v96zm160-96c-17.7 0-32 14.3-32 32v32c0 17.7 14.3 32 32 32h64c17.7 0 32-14.3 32-32V288c0-17.7-14.3-32-32-32H448zM64 352v32c0 17.7 14.3 32 32 32h64c17.7 0 32-14.3 32-32V288c0-17.7-14.3-32-32-32H96c-17.7 0-32 14.3-32 32v32z"/></svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="h-5 w-5" :class="selectedVehicle.iconClass" fill="currentColor"><path d="M64 32C28.7 32 0 60.7 0 96V304v80 32c0 17.7 14.3 32 32 32H64c17.7 0 32-14.3 32-32V384H352v32c0 17.7 14.3 32 32 32h32c17.7 0 32-14.3 32-32V384h32c17.7 0 32-14.3 32-32V304 96c0-35.3-28.7-64-64-64H413.3c-12.4 0-24.2 4.9-32.9 13.6L352 125.3 291.6 64.9C282.9 56.2 271.1 51.2 258.7 51.2H64zM352 160l64 64H352V160zM64 352V96H256v96c0 17.7 14.3 32 32 32H352v32H64zm448 0V192H416V160 96h64V352h32z"/></svg>
            </span>
            <div>
              <h3 class="text-lg font-semibold text-[#0f172a]">{{ getVehicleDisplayName(selectedVehicle) }}</h3>
              <p class="text-sm text-[#64748b]">V{{ selectedVehicle.id.padStart(3, '0') }} • {{ selectedVehicle.plate }}</p>
            </div>
          </div>
          <button class="rounded-md p-1.5 text-[#64748b] hover:bg-[#f8fafc]" @click="closeDetailsModal">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div class="border-b border-[#e5e7eb] px-5">
          <div class="flex gap-6">
            <button
              v-for="tab in modalTabs"
              :key="tab"
              @click="activeModalTab = tab"
              class="border-b-2 px-1 py-3 text-sm font-medium transition"
              :class="activeModalTab === tab ? 'border-[#0f172a] text-[#0f172a]' : 'border-transparent text-[#64748b] hover:text-[#0f172a]'"
            >
              {{ tab }}
            </button>
          </div>
        </div>
        <div v-if="activeModalTab === 'Details'" class="p-5">
          <div class="grid grid-cols-2 gap-6">
            <div class="space-y-4">
              <div>
                <p class="text-xs text-[#64748b]">Type</p>
                <p class="mt-0.5 text-sm font-medium text-[#0f172a]">{{ getVehicleTypeLabel(selectedVehicle.vehicleType) }}</p>
              </div>
              <div>
                <p class="text-xs text-[#64748b]">Color</p>
                <p class="mt-0.5 text-sm font-medium text-[#0f172a]">{{ selectedVehicle.color || 'Silver' }}</p>
              </div>
              <div>
                <p class="text-xs text-[#64748b]">Transmission</p>
                <p class="mt-0.5 text-sm font-medium text-[#0f172a]">{{ selectedVehicle.transmission || 'Automatic' }}</p>
              </div>
              <div>
                <p class="text-xs text-[#64748b]">Hourly Rate</p>
                <p class="mt-0.5 text-sm font-medium text-[#0f172a]">{{ selectedVehicle.rate }}/hr</p>
              </div>
              <div>
                <p class="text-xs text-[#64748b]">Location</p>
                <p class="mt-0.5 flex items-center gap-1.5 text-sm font-medium text-[#0f172a]">
                  <svg class="h-4 w-4 text-[#94a3b8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  {{ selectedVehicle.location || 'New York' }}
                </p>
              </div>
              <div>
                <p class="text-xs text-[#64748b]">Registered</p>
                <p class="mt-0.5 flex items-center gap-1.5 text-sm font-medium text-[#0f172a]">
                  <IconCalendar class="h-4 w-4 text-[#94a3b8]" />
                  {{ selectedVehicle.registered || '2023-01' }}
                </p>
              </div>
            </div>
            <div class="space-y-4">
              <div>
                <p class="text-xs text-[#64748b]">Year</p>
                <p class="mt-0.5 text-sm font-medium text-[#0f172a]">{{ selectedVehicle.year || '2022' }}</p>
              </div>
              <div>
                <p class="text-xs text-[#64748b]">Seats</p>
                <p class="mt-0.5 text-sm font-medium text-[#0f172a]">{{ selectedVehicle.seats ?? 5 }}</p>
              </div>
              <div>
                <p class="text-xs text-[#64748b]">Fuel Type</p>
                <p class="mt-0.5 text-sm font-medium text-[#0f172a]">{{ selectedVehicle.fuelType || 'Gasoline' }}</p>
              </div>
              <div>
                <p class="text-xs text-[#64748b]">License Plate</p>
                <p class="mt-0.5 text-sm font-medium text-[#0f172a]">{{ selectedVehicle.plate }}</p>
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="activeModalTab === 'Owner'" class="p-5">
          <div class="flex items-start gap-4">
            <img
              :src="`https://i.pravatar.cc/80?u=${selectedVehicle.owner}`"
              :alt="selectedVehicle.owner"
              class="h-16 w-16 rounded-full object-cover"
            />
            <div class="min-w-0 flex-1">
              <h4 class="text-base font-semibold text-[#0f172a]">{{ selectedVehicle.owner }}</h4>
              <p class="text-xs text-[#64748b]">Vehicle Owner</p>
              <div class="mt-4 space-y-2">
                <p class="flex items-center gap-2 text-sm text-[#334155]">
                  <svg class="h-4 w-4 text-[#94a3b8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  <span class="text-[#64748b]">Email</span>
                  {{ selectedVehicle.ownerEmail || `${selectedVehicle.owner.toLowerCase().replace(/\s+/g, '.')}@email.com` }}
                </p>
                <p class="flex items-center gap-2 text-sm text-[#334155]">
                  <svg class="h-4 w-4 text-[#94a3b8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  <span class="text-[#64748b]">Phone</span>
                  {{ selectedVehicle.ownerPhone || '+1 (555) 010-0101' }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="activeModalTab === 'Stats'" class="p-5">
          <div class="grid grid-cols-2 gap-6">
            <div class="space-y-5">
              <div class="flex items-center gap-4 rounded-lg border border-[#e5e7eb] bg-[#f8fafc] p-4">
                <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#dbeafe]">
                  <svg class="h-5 w-5 text-[#2563eb]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h8m-8 4h8m-5-7l-2 6H5l2-6zm14 0l-2 6h-3l2-6zM5 17h14a2 2 0 002-2v-4H3v4a2 2 0 002 2z" /></svg>
                </span>
                <div>
                  <p class="text-xs text-[#64748b]">Total Trips</p>
                  <p class="text-lg font-semibold text-[#0f172a]">{{ selectedVehicle.trips }}</p>
                </div>
              </div>
              <div class="flex items-center gap-4 rounded-lg border border-[#e5e7eb] bg-[#f8fafc] p-4">
                <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#fef9c3]">
                  <svg class="h-5 w-5 text-[#eab308]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                </span>
                <div>
                  <p class="text-xs text-[#64748b]">Rating</p>
                  <p class="text-lg font-semibold text-[#0f172a]">{{ selectedVehicle.rating ?? '4.8' }}</p>
                </div>
              </div>
            </div>
            <div class="space-y-5">
              <div class="flex items-center gap-4 rounded-lg border border-[#e5e7eb] bg-[#f8fafc] p-4">
                <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#dcfce7]">
                  <svg class="h-5 w-5 text-[#16a34a]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </span>
                <div>
                  <p class="text-xs text-[#64748b]">Total Earnings</p>
                  <p class="text-lg font-semibold text-[#0f172a]">{{ selectedVehicle.totalEarnings ?? selectedVehicle.rate }}</p>
                </div>
              </div>
              <div class="flex items-center gap-4 rounded-lg border border-[#e5e7eb] bg-[#f8fafc] p-4">
                <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#ede9fe]">
                  <IconCalendar class="h-5 w-5 text-[#8b5cf6]" />
                </span>
                <div>
                  <p class="text-xs text-[#64748b]">Last Trip</p>
                  <p class="text-lg font-semibold text-[#0f172a]">{{ selectedVehicle.lastTrip || '2024-01-18' }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="activeModalTab === 'Photos'" class="p-5">
          <div class="flex flex-wrap gap-4">
            <div
              v-for="(photo, i) in (selectedVehicle.photos && selectedVehicle.photos.length ? selectedVehicle.photos : defaultVehiclePhotos)"
              :key="i"
              class="h-40 w-48 overflow-hidden rounded-lg border border-[#e5e7eb] bg-[#f8fafc]"
            >
              <img
                :src="photo"
                :alt="`Vehicle photo ${i + 1}`"
                class="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
        <div v-else class="min-h-[200px] p-8 text-center text-sm text-[#94a3b8]">Content for {{ activeModalTab }} tab.</div>
        <div class="flex justify-end gap-3 border-t border-[#e5e7eb] p-5">
          <button class="rounded-md border border-[#e5e7eb] px-4 py-2 text-sm font-medium text-[#475569] hover:bg-[#f8fafc]" @click="openEditModal">Edit Details</button>
          <button class="rounded-md bg-[#dc2626] px-4 py-2 text-sm font-medium text-white hover:bg-[#b91c1c]" @click="openRemoveModal(selectedVehicle)">Remove Vehicle</button>
        </div>
      </div>
    </div>

    <!-- Remove Vehicle Modal -->
    <div
      v-if="showRemoveModal && vehicleToRemove"
      class="fixed inset-0 z-[70] flex items-center justify-center bg-black/35 px-4"
      @click="closeRemoveModal"
    >
      <div class="w-full max-w-md rounded-2xl bg-white shadow-2xl" @click.stop>
        <div class="flex items-center justify-between border-b border-[#e5e7eb] p-5">
          <h3 class="text-lg font-semibold text-[#0f172a]">Remove Vehicle</h3>
          <button class="rounded-md p-1.5 text-[#64748b] hover:bg-[#f8fafc]" @click="closeRemoveModal">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div class="p-5">
          <p class="text-sm text-[#334155]">
            Are you sure you want to remove {{ getVehicleDisplayName(vehicleToRemove) }} ({{ vehicleToRemove.plate }}) from the fleet?
          </p>
          <p class="mt-2 text-sm text-[#64748b]">
            This action will notify the owner and remove the vehicle from all active listings.
          </p>
          <div class="mt-4">
            <label class="mb-1 block text-xs font-medium text-[#64748b]">Reason for Removal *</label>
            <textarea
              v-model="removeReason"
              rows="4"
              placeholder="Please provide a reason for removing this vehicle..."
              class="w-full rounded-lg border border-[#e5e7eb] bg-white p-3 text-sm text-[#0f172a] placeholder:text-[#94a3b8] outline-none focus:border-[#cbd5e1]"
            ></textarea>
          </div>
        </div>
        <div class="flex justify-end gap-3 border-t border-[#e5e7eb] p-5">
          <button type="button" class="rounded-md border border-[#e5e7eb] px-4 py-2 text-sm font-medium text-[#475569] hover:bg-[#f8fafc]" @click="closeRemoveModal">Cancel</button>
          <button
            type="button"
            class="rounded-md bg-[#fecaca] px-4 py-2 text-sm font-medium text-white hover:bg-[#fca5a5] disabled:cursor-not-allowed disabled:opacity-60"
            :disabled="!removeReason.trim()"
            @click="confirmRemoveVehicle"
          >
            Remove Vehicle
          </button>
        </div>
      </div>
    </div>

    <!-- Edit Vehicle Details Modal -->
    <div
      v-if="showEditModal && selectedVehicle"
      class="fixed inset-0 z-[60] flex items-center justify-center bg-black/35 px-4"
      @click="closeEditModal"
    >
      <div class="w-full max-w-lg rounded-2xl bg-white shadow-2xl" @click.stop>
        <div class="flex items-center justify-between border-b border-[#e5e7eb] p-5">
          <h3 class="text-lg font-semibold text-[#0f172a]">Edit Vehicle Details</h3>
          <button class="rounded-md p-1.5 text-[#64748b] hover:bg-[#f8fafc]" @click="closeEditModal">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <form class="p-5" @submit.prevent="saveEditChanges">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="mb-1 block text-xs font-medium text-[#64748b]">Model</label>
              <input
                v-model="editForm.model"
                type="text"
                readonly
                class="h-10 w-full rounded-lg border border-[#e5e7eb] bg-[#f8fafc] pl-3 pr-3 text-sm text-[#64748b] outline-none"
              />
            </div>
            <div>
              <label class="mb-1 block text-xs font-medium text-[#64748b]">License Plate</label>
              <input
                v-model="editForm.licensePlate"
                type="text"
                readonly
                class="h-10 w-full rounded-lg border border-[#e5e7eb] bg-[#f8fafc] pl-3 pr-3 text-sm text-[#64748b] outline-none"
              />
            </div>
            <div>
              <label class="mb-1 block text-xs font-medium text-[#64748b]">Hourly Rate ($)</label>
              <input
                v-model="editForm.hourlyRate"
                type="text"
                class="h-10 w-full rounded-lg border border-[#e5e7eb] bg-white pl-3 pr-3 text-sm text-[#0f172a] outline-none focus:border-[#cbd5e1]"
              />
            </div>
            <div>
              <label class="mb-1 block text-xs font-medium text-[#64748b]">Color</label>
              <input
                v-model="editForm.color"
                type="text"
                class="h-10 w-full rounded-lg border border-[#e5e7eb] bg-white pl-3 pr-3 text-sm text-[#0f172a] outline-none focus:border-[#cbd5e1]"
              />
            </div>
            <div>
              <label class="mb-1 block text-xs font-medium text-[#64748b]">Seats</label>
              <input
                v-model="editForm.seats"
                type="text"
                class="h-10 w-full rounded-lg border border-[#e5e7eb] bg-white pl-3 pr-3 text-sm text-[#0f172a] outline-none focus:border-[#cbd5e1]"
              />
            </div>
            <div>
              <label class="mb-1 block text-xs font-medium text-[#64748b]">Transmission</label>
              <select
                v-model="editForm.transmission"
                class="h-10 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 text-sm text-[#0f172a] outline-none focus:border-[#cbd5e1]"
              >
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
                <option value="CVT">CVT</option>
                <option value="Dual-Clutch">Dual-Clutch</option>
              </select>
            </div>
            <div class="col-span-2">
              <label class="mb-1 block text-xs font-medium text-[#64748b]">Fuel Type</label>
              <select
                v-model="editForm.fuelType"
                class="h-10 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 text-sm text-[#0f172a] outline-none focus:border-[#cbd5e1]"
              >
                <option value="Gasoline">Gasoline</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
                <option value="CNG">CNG</option>
              </select>
            </div>
            <div class="col-span-2">
              <label class="mb-1 block text-xs font-medium text-[#64748b]">Location</label>
              <input
                v-model="editForm.location"
                type="text"
                placeholder="Location"
                class="h-10 w-full rounded-lg border border-[#e5e7eb] bg-white pl-3 pr-3 text-sm text-[#0f172a] placeholder:text-[#94a3b8] outline-none focus:border-[#cbd5e1]"
              />
            </div>
          </div>
          <div class="mt-6 flex justify-end gap-3 border-t border-[#e5e7eb] pt-5">
            <button type="button" class="rounded-md border border-[#e5e7eb] px-4 py-2 text-sm font-medium text-[#475569] hover:bg-[#f8fafc]" @click="closeEditModal">Cancel</button>
            <button type="submit" class="rounded-md bg-[#0f172a] px-4 py-2 text-sm font-medium text-white hover:bg-[#1e293b]">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import IconSearch from '@/components/icon/icon-search.vue';
import IconCar from '@/components/icon/icon-car.vue';
import IconCalendar from '@/components/icon/icon-calendar.vue';
import IconClock from '@/components/icon/icon-clock.vue';
import IconHorizontalDots from '@/components/icon/icon-horizontal-dots.vue';
import IconEye from '@/components/icon/icon-eye.vue';
import IconTrash from '@/components/icon/icon-trash.vue';

type VehicleRow = {
  id: string;
  vehicle: string;
  owner: string;
  plate: string;
  rate: string;
  trips: number;
  reasonForRemoval: string;
  status: string;
  vehicleType: 'car' | 'motorcycle' | 'van';
  iconBg: string;
  iconClass: string;
  color?: string;
  transmission?: string;
  location?: string;
  registered?: string;
  year?: string;
  seats?: number;
  fuelType?: string;
  ownerEmail?: string;
  ownerPhone?: string;
  rating?: string;
  totalEarnings?: string;
  lastTrip?: string;
  photos?: string[];
  hourlyRate?: string;
};

const defaultVehiclePhotos = [
  'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop',
];

const cards = [
  { label: 'Total Vehicles', value: '24,563', icon: IconCar, iconClass: 'text-[#3b82f6]', bg: '#dbeafe' },
  { label: 'Available', value: '1,847', icon: IconCar, iconClass: 'text-[#16a34a]', bg: '#dcfce7' },
  { label: 'In Use', value: '1,284', icon: IconCalendar, iconClass: 'text-[#8b5cf6]', bg: '#ede9fe' },
  { label: 'Pending Approval', value: '1,284', icon: IconClock, iconClass: 'text-[#eab308]', bg: '#fef9c3' },
];

const search = ref('');
const openActionId = ref<string | null>(null);
const showDetailsModal = ref(false);
const showEditModal = ref(false);
const showRemoveModal = ref(false);
const vehicleToRemove = ref<VehicleRow | null>(null);
const removeReason = ref('');
const selectedVehicle = ref<VehicleRow | null>(null);
const modalTabs = ['Details', 'Owner', 'Stats', 'Photos'];
const activeModalTab = ref('Details');

const editForm = ref({
  model: '',
  licensePlate: '',
  hourlyRate: '',
  color: '',
  seats: '',
  transmission: '',
  fuelType: '',
  location: '',
});

const rows = ref<VehicleRow[]>([
  {
    id: '1',
    vehicle: 'Toyota Camry 2022 V001',
    owner: 'John Smith',
    plate: 'ABC-1234',
    rate: '₦125,000',
    trips: 234,
    reasonForRemoval: 'Violation of Policy',
    status: 'Available',
    vehicleType: 'car',
    iconBg: '#fee2e2',
    iconClass: 'text-[#dc2626]',
  },
  {
    id: '2',
    vehicle: 'Honda CBR 500 V002',
    owner: 'John Smith',
    plate: 'ABC-1234',
    rate: '₦125,000',
    trips: 234,
    reasonForRemoval: '',
    status: 'In Use',
    vehicleType: 'motorcycle',
    iconBg: '#ede9fe',
    iconClass: 'text-[#8b5cf6]',
  },
  {
    id: '3',
    vehicle: 'Yamaha MT-07 V003',
    owner: 'John Smith',
    plate: 'ABC-1234',
    rate: '₦125,000',
    trips: 234,
    reasonForRemoval: '',
    status: 'Maintenance',
    vehicleType: 'motorcycle',
    iconBg: '#dbeafe',
    iconClass: 'text-[#2563eb]',
  },
  {
    id: '4',
    vehicle: 'Ford Transit 2021 V004',
    owner: 'John Smith',
    plate: 'ABC-1234',
    rate: '₦125,000',
    trips: 234,
    reasonForRemoval: '',
    status: 'Pending Approval',
    vehicleType: 'van',
    iconBg: '#dcfce7',
    iconClass: 'text-[#16a34a]',
  },
  {
    id: '5',
    vehicle: 'Mercedes Sprinter V005',
    owner: 'John Smith',
    plate: 'ABC-1234',
    rate: '₦125,000',
    trips: 234,
    reasonForRemoval: 'Violation of Policy',
    status: 'Available',
    vehicleType: 'van',
    iconBg: '#fef9c3',
    iconClass: 'text-[#eab308]',
  },
]);

const filteredRows = computed(() => {
  const q = search.value.trim().toLowerCase();
  if (!q) return rows.value;
  return rows.value.filter(
    (r) =>
      r.vehicle.toLowerCase().includes(q) ||
      r.owner.toLowerCase().includes(q) ||
      r.plate.toLowerCase().includes(q)
  );
});

function getStatusClass(status: string) {
  switch (status) {
    case 'Available':
      return 'bg-[#dcfce7] text-[#16a34a]';
    case 'In Use':
      return 'bg-[#dbeafe] text-[#2563eb]';
    case 'Maintenance':
      return 'bg-[#fee2e2] text-[#dc2626]';
    case 'Pending Approval':
      return 'bg-[#fef9c3] text-[#ca8a04]';
    default:
      return 'bg-[#f1f5f9] text-[#64748b]';
  }
}

function getVehicleDisplayName(row: VehicleRow) {
  const match = row.vehicle.match(/^(.+?)\s+V\d+$/);
  return match ? match[1] : row.vehicle;
}

function getVehicleTypeLabel(type: string) {
  return type === 'car' ? 'Car' : type === 'motorcycle' ? 'Motorcycle' : 'Van';
}

function viewDetails(row: VehicleRow) {
  openActionId.value = null;
  selectedVehicle.value = row;
  activeModalTab.value = 'Details';
  showDetailsModal.value = true;
}

function closeDetailsModal() {
  showDetailsModal.value = false;
  selectedVehicle.value = null;
}

function openEditModal() {
  if (!selectedVehicle.value) return;
  const v = selectedVehicle.value;
  editForm.value = {
    model: getVehicleDisplayName(v) + (v.year ? ` ${v.year}` : ' 2022'),
    licensePlate: v.plate,
    hourlyRate: v.hourlyRate ?? '25',
    color: v.color ?? 'Silver',
    seats: String(v.seats ?? 5),
    transmission: v.transmission ?? 'Automatic',
    fuelType: v.fuelType ?? 'Gasoline',
    location: v.location ?? '',
  };
  showEditModal.value = true;
}

function closeEditModal() {
  showEditModal.value = false;
}

function saveEditChanges() {
  if (!selectedVehicle.value) return;
  const v = selectedVehicle.value;
  v.hourlyRate = editForm.value.hourlyRate;
  v.color = editForm.value.color;
  v.seats = Number(editForm.value.seats) || 5;
  v.transmission = editForm.value.transmission;
  v.fuelType = editForm.value.fuelType;
  v.location = editForm.value.location;
  v.rate = `$${editForm.value.hourlyRate}/hr`;
  closeEditModal();
}

function openRemoveModal(vehicle: VehicleRow) {
  openActionId.value = null;
  vehicleToRemove.value = vehicle;
  removeReason.value = '';
  showRemoveModal.value = true;
  showDetailsModal.value = false;
}

function closeRemoveModal() {
  showRemoveModal.value = false;
  vehicleToRemove.value = null;
  removeReason.value = '';
}

function confirmRemoveVehicle() {
  if (!vehicleToRemove.value || !removeReason.value.trim()) return;
  const v = vehicleToRemove.value;
  v.reasonForRemoval = removeReason.value.trim();
  rows.value = rows.value.filter((r) => r.id !== v.id);
  closeRemoveModal();
}

function removeVehicle(row: VehicleRow) {
  openRemoveModal(row);
}
</script>
