<template>
  <div class="min-h-screen bg-white p-5 md:p-6">
    <div class="mx-auto max-w-[1220px] space-y-5">
      <!-- Header -->
      <div>
        <h1 class="text-2xl font-bold leading-tight text-[#333]">Parcel Delivery Pricing</h1>
        <p class="mt-1 text-sm text-[#333]">Configure pricing rules that reflect in the mobile app</p>
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

      <!-- Vehicle Type Pricing (visible when Vehicle Rates active) -->
      <template v-if="activeTab === 'vehicle-rates'">
        <div class="mb-4">
          <h2 class="text-base font-bold text-[#333]">Vehicle Type Pricing</h2>
          <p class="mt-0.5 text-sm text-[#333]">Set base fare and per-kilometer rates for each vehicle type</p>
        </div>

        <div class="overflow-x-auto rounded-lg border border-[#e5e7eb] bg-white">
          <table class="w-full min-w-[700px] border-collapse">
            <thead>
              <tr class="border-b border-[#e5e7eb] bg-white text-left text-sm font-semibold text-[#333]">
                <th class="px-4 py-3">Vehicle</th>
                <th class="px-4 py-3">Base Fare</th>
                <th class="px-4 py-3">Per KM</th>
                <th class="px-4 py-3">Per Minute</th>
                <th class="px-4 py-3">Max Weight</th>
                <th class="px-4 py-3">Status</th>
                <th class="w-14 px-2 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="row in vehicleRows"
                :key="row.id"
                class="border-b border-[#e5e7eb] bg-[#f8fafc] text-sm text-[#333]"
              >
                <td class="px-4 py-3">
                  <span class="inline-flex items-center gap-2">
                    <span class="flex h-8 w-8 items-center justify-center text-[#333] [&_svg]:h-4 [&_svg]:w-4">
                      <!-- Bicycle -->
                      <svg v-if="row.vehicle === 'Bicycle'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/><path d="M9 17.5h6"/><path d="M12 6a3 3 0 0 0-3 3"/><path d="M15 9l2 5.5"/>
                      </svg>
                      <!-- Motorbike -->
                      <svg v-else-if="row.vehicle === 'Motorbike'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="5" cy="17" r="3"/><circle cx="19" cy="17" r="3"/><path d="M8 17h8"/><path d="M12 5v4"/><path d="M14 9l3-2"/><path d="M10 9L7 7"/>
                      </svg>
                      <!-- Car -->
                      <svg v-else-if="row.vehicle === 'Car'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" class="h-4 w-4"><path d="M135.2 117.4L109.1 192h293.8l-26.1-74.6C372.3 104.6 360.2 96 346.6 96H165.4c-13.6 0-25.7 8.6-30.2 21.4zM39.6 196.8L74.8 96.3C88.3 57.8 124.6 32 165.4 32h181.2c40.8 0 77.1 25.8 90.6 64.3l35.2 100.5c23.2 9.6 39.6 32.5 39.6 59.2v144v48c0 17.7-14.3 32-32 32h-32c-17.7 0-32-14.3-32-32v-48H96v48c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32v-48V256c0-26.7 16.4-49.6 39.6-59.2zM128 288a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm288 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"/></svg>
                      <!-- Van -->
                      <svg v-else-if="row.vehicle === 'Van'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l2 4v4h-6V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
                      </svg>
                    </span>
                    <span class="font-medium">{{ row.vehicle }}</span>
                  </span>
                </td>
                <td class="px-4 py-3">{{ row.baseFare }}</td>
                <td class="px-4 py-3">{{ row.perKm }}</td>
                <td class="px-4 py-3">{{ row.perMinute }}</td>
                <td class="px-4 py-3">{{ row.maxWeight }}</td>
                <td class="px-4 py-3">
                  <button
                    type="button"
                    role="switch"
                    :aria-checked="row.enabled"
                    class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-0 transition-colors focus:outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-2"
                    :class="row.enabled ? 'bg-[#333]' : 'bg-[#d1d5db]'"
                    @click="toggleRow(row)"
                  >
                    <span
                      class="pointer-events-none absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow ring-0 transition"
                      :class="row.enabled ? 'translate-x-5' : 'translate-x-0'"
                    />
                  </button>
                </td>
                <td class="relative px-2 py-3" @click.stop>
                  <button
                    type="button"
                    class="rounded p-1.5 text-[#333] hover:bg-[#e5e7eb]"
                    :title="openActionId === row.id ? '' : 'Edit'"
                    @click="openActionId = openActionId === row.id ? null : row.id"
                  >
                    <IconHorizontalDots class="h-4 w-4" />
                  </button>
                  <div
                    v-if="openActionId === row.id"
                    class="absolute right-0 top-full z-10 mt-1 w-28 rounded border border-[#e5e7eb] bg-white py-1 shadow-lg"
                    @click.stop
                  >
                    <button
                      type="button"
                      class="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-[#333] hover:bg-[#f8fafc]"
                      @click="editRow(row)"
                    >
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>

      <!-- Parcel Category Pricing (Categories tab) -->
      <template v-else-if="activeTab === 'categories'">
        <div class="mb-4">
          <h2 class="text-base font-bold text-[#333]">Parcel Category Pricing</h2>
          <p class="mt-0.5 text-sm text-[#333]">Set price multipliers based on parcel category</p>
        </div>

        <div class="overflow-x-auto rounded-lg border border-[#e5e7eb] bg-white">
          <table class="w-full min-w-[600px] border-collapse">
            <thead>
              <tr class="border-b border-[#e5e7eb] bg-white text-left text-sm font-semibold text-[#333]">
                <th class="px-4 py-3">Category</th>
                <th class="px-4 py-3">Description</th>
                <th class="px-4 py-3">Multiplier</th>
                <th class="px-4 py-3">Status</th>
                <th class="w-14 px-2 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="row in categoryRows"
                :key="row.id"
                class="border-b border-[#e5e7eb] bg-[#f8fafc] text-sm text-[#333] hover:bg-[#eff6ff]"
              >
                <td class="px-4 py-3">
                  <span class="inline-flex items-center gap-2">
                    <span class="flex h-8 w-8 items-center justify-center text-[#333] [&_svg]:h-4 [&_svg]:w-4">
                      <!-- Document -->
                      <svg v-if="row.category === 'Document'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M12 18v-6"/><path d="M9 15h6"/>
                      </svg>
                      <!-- Food -->
                      <svg v-else-if="row.category === 'Food'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 8c0-3.5-2.5-6-6-6S6 4.5 6 8"/><path d="M6 8v14"/><path d="M18 8v14"/><path d="M6 14h12"/><path d="M9 4l1 4"/><path d="M15 4l-1 4"/>
                      </svg>
                      <!-- Electronics -->
                      <svg v-else-if="row.category === 'Electronics'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/>
                      </svg>
                      <!-- Fragile -->
                      <svg v-else-if="row.category === 'Fragile'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 9v4"/><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 17h.01"/>
                      </svg>
                      <!-- Others -->
                      <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>
                      </svg>
                    </span>
                    <span class="font-medium">{{ row.category }}</span>
                  </span>
                </td>
                <td class="px-4 py-3 text-[#6b7280]">{{ row.description }}</td>
                <td class="px-4 py-3">{{ row.multiplier }}</td>
                <td class="px-4 py-3">
                  <button
                    type="button"
                    role="switch"
                    :aria-checked="row.enabled"
                    class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-0 transition-colors focus:outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-2"
                    :class="row.enabled ? 'bg-[#333]' : 'bg-[#d1d5db]'"
                    @click="toggleCategoryRow(row)"
                  >
                    <span
                      class="pointer-events-none absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow ring-0 transition"
                      :class="row.enabled ? 'translate-x-5' : 'translate-x-0'"
                    />
                  </button>
                </td>
                <td class="relative px-2 py-3" @click.stop>
                  <button
                    type="button"
                    class="rounded p-1.5 text-[#333] hover:bg-[#e5e7eb]"
                    title="Edit"
                    @click="openActionId = openActionId === row.id ? null : row.id"
                  >
                    <IconHorizontalDots class="h-4 w-4" />
                  </button>
                  <div
                    v-if="openActionId === row.id"
                    class="absolute right-0 top-full z-10 mt-1 w-28 rounded border border-[#e5e7eb] bg-white py-1 shadow-lg"
                    @click.stop
                  >
                    <button
                      type="button"
                      class="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-[#333] hover:bg-[#f8fafc]"
                      @click="editCategoryRow(row)"
                    >
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>

      <!-- Distance-Based Pricing (Distance tab) -->
      <template v-else-if="activeTab === 'distance'">
        <div class="mb-4">
          <h2 class="text-base font-bold text-[#333]">Distance-Based Pricing</h2>
          <p class="mt-0.5 text-sm text-[#333]">Configure pricing rules that reflect in the mobile app</p>
        </div>

        <div class="overflow-x-auto rounded-lg border border-[#e5e7eb] bg-white">
          <table class="w-full min-w-[600px] border-collapse">
            <thead>
              <tr class="border-b border-[#e5e7eb] bg-white text-left text-sm font-semibold text-[#333]">
                <th class="px-4 py-3">Distance Range</th>
                <th class="px-4 py-3">Min (km)</th>
                <th class="px-4 py-3">Max (km)</th>
                <th class="px-4 py-3">Multiplier</th>
                <th class="w-14 px-2 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="row in distanceRows"
                :key="row.id"
                class="border-b border-[#e5e7eb] bg-[#f8fafc] text-sm text-[#333] hover:bg-[#eff6ff]"
              >
                <td class="px-4 py-3 font-medium">{{ row.rangeLabel }}</td>
                <td class="px-4 py-3">{{ row.minKm }}</td>
                <td class="px-4 py-3">{{ row.maxKm == null ? '30+' : row.maxKm }}</td>
                <td class="px-4 py-3">{{ row.multiplier }}</td>
                <td class="relative px-2 py-3" @click.stop>
                  <button
                    type="button"
                    class="rounded p-1.5 text-[#333] hover:bg-[#e5e7eb]"
                    title="Edit"
                    @click="openActionId = openActionId === row.id ? null : row.id"
                  >
                    <IconHorizontalDots class="h-4 w-4" />
                  </button>
                  <div
                    v-if="openActionId === row.id"
                    class="absolute right-0 top-full z-10 mt-1 w-28 rounded border border-[#e5e7eb] bg-white py-1 shadow-lg"
                    @click.stop
                  >
                    <button
                      type="button"
                      class="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-[#333] hover:bg-[#f8fafc]"
                      @click="editDistanceRow(row)"
                    >
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>

      <!-- Fare Calculator (Calculator tab) -->
      <template v-else-if="activeTab === 'calculator'">
        <div class="mb-4">
          <h2 class="text-base font-bold text-[#333]">Fare Calculator</h2>
          <p class="mt-0.5 text-sm text-[#333]">Test your pricing configuration with different scenarios</p>
        </div>

        <div class="flex flex-col gap-6 lg:flex-row lg:items-start">
          <!-- Left: inputs -->
          <div class="flex-1 space-y-6 rounded-lg border border-[#e5e7eb] bg-[#f8fafc] p-6">
            <div>
              <label class="block text-sm font-medium text-[#374151]">Distance (km)</label>
              <input
                v-model.number="calculatorDistance"
                type="number"
                min="0"
                step="0.1"
                class="mt-1.5 h-10 w-full max-w-xs rounded-lg border border-[#e5e7eb] bg-white px-3 text-sm text-[#333] outline-none focus:border-[#333]"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-[#374151]">Vehicle Type</label>
              <div class="mt-2 flex flex-wrap gap-2">
                <button
                  v-for="v in calculatorVehicleOptions"
                  :key="v"
                  type="button"
                  class="inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors"
                  :class="selectedVehicle === v ? 'border-[#333] bg-[#333] text-white' : 'border-[#d1d5db] bg-white text-[#333] hover:bg-[#f1f5f9]'"
                  @click="selectedVehicle = v"
                >
                  <span class="flex h-5 w-5 items-center justify-center [&_svg]:h-4 [&_svg]:w-4">
                    <svg v-if="v === 'Bicycle'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/><path d="M9 17.5h6"/><path d="M12 6a3 3 0 0 0-3 3"/><path d="M15 9l2 5.5"/></svg>
                    <svg v-else-if="v === 'Motorbike'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="5" cy="17" r="3"/><circle cx="19" cy="17" r="3"/><path d="M8 17h8"/><path d="M12 5v4"/><path d="M14 9l3-2"/><path d="M10 9L7 7"/></svg>
                    <svg v-else-if="v === 'Car'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor"><path d="M135.2 117.4L109.1 192h293.8l-26.1-74.6C372.3 104.6 360.2 96 346.6 96H165.4c-13.6 0-25.7 8.6-30.2 21.4zM39.6 196.8L74.8 96.3C88.3 57.8 124.6 32 165.4 32h181.2c40.8 0 77.1 25.8 90.6 64.3l35.2 100.5c23.2 9.6 39.6 32.5 39.6 59.2v144v48c0 17.7-14.3 32-32 32h-32c-17.7 0-32-14.3-32-32v-48H96v48c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32v-48V256c0-26.7 16.4-49.6 39.6-59.2zM128 288a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm288 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"/></svg>
                    <svg v-else-if="v === 'Van'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l2 4v4h-6V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                  </span>
                  {{ v }}
                </button>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-[#374151]">Parcel Category</label>
              <div class="mt-2 flex flex-wrap gap-2">
                <button
                  v-for="c in calculatorCategoryOptions"
                  :key="c"
                  type="button"
                  class="inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors"
                  :class="selectedCategory === c ? 'border-[#333] bg-[#333] text-white' : 'border-[#d1d5db] bg-white text-[#333] hover:bg-[#f1f5f9]'"
                  @click="selectedCategory = c"
                >
                  <span class="flex h-5 w-5 items-center justify-center [&_svg]:h-4 [&_svg]:w-4">
                    <svg v-if="c === 'Document'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M12 18v-6"/><path d="M9 15h6"/></svg>
                    <svg v-else-if="c === 'Food'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8c0-3.5-2.5-6-6-6S6 4.5 6 8"/><path d="M6 8v14"/><path d="M18 8v14"/><path d="M6 14h12"/><path d="M9 4l1 4"/><path d="M15 4l-1 4"/></svg>
                    <svg v-else-if="c === 'Electronics'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/></svg>
                    <svg v-else-if="c === 'Fragile'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 9v4"/><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 17h.01"/></svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
                  </span>
                  {{ c }}
                </button>
              </div>
            </div>
          </div>

          <!-- Right: estimated fare -->
          <div class="flex-1 rounded-lg border border-[#e5e7eb] bg-white p-6 lg:min-w-[280px]">
            <p class="text-sm font-medium text-[#374151]">Estimated Fare</p>
            <p class="mt-2 text-2xl font-bold text-[#333]">{{ estimatedFareFormatted }}</p>
            <div class="mt-4 space-y-1 text-sm text-[#6b7280]">
              <p>Distance: {{ displayDistance }} km</p>
              <p>Vehicle: {{ selectedVehicle }}</p>
              <p>Category: {{ selectedCategory }}</p>
            </div>
          </div>
        </div>
      </template>

      <!-- Placeholder for other tabs -->
      <div v-else class="rounded-lg border border-[#e5e7eb] bg-[#f8fafc] px-6 py-12 text-center text-sm text-[#6b7280]">
        Content for {{ tabs.find(t => t.value === activeTab)?.label }} tab.
      </div>
    </div>

    <!-- Edit Vehicle Pricing Modal -->
    <Teleport to="body">
      <div
        v-if="showEditModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        @click.self="closeEditModal"
      >
        <div class="relative w-full max-w-lg rounded-xl bg-white shadow-xl">
          <div class="flex items-start justify-between border-b border-[#e5e7eb] px-6 py-4">
            <h2 class="text-lg font-semibold text-[#333]">Edit Vehicle Pricing - {{ editingRow?.vehicle }}</h2>
            <button
              type="button"
              class="rounded-md p-1.5 text-[#6b7280] hover:bg-[#f1f5f9]"
              @click="closeEditModal"
            >
              <IconX class="h-5 w-5" />
            </button>
          </div>
          <div class="px-6 py-5">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-[#374151]">Base Fare (N)</label>
                <input
                  v-model="editForm.baseFare"
                  type="text"
                  placeholder="-"
                  class="mt-1.5 h-10 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 text-sm text-[#333] placeholder:text-[#9ca3af] outline-none focus:border-[#333]"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-[#374151]">Per KM Rate (N)</label>
                <input
                  v-model="editForm.perKm"
                  type="text"
                  placeholder="-"
                  class="mt-1.5 h-10 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 text-sm text-[#333] placeholder:text-[#9ca3af] outline-none focus:border-[#333]"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-[#374151]">Per Minute Rate (N)</label>
                <input
                  v-model="editForm.perMinute"
                  type="text"
                  placeholder="-"
                  class="mt-1.5 h-10 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 text-sm text-[#333] placeholder:text-[#9ca3af] outline-none focus:border-[#333]"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-[#374151]">Max Weight (kg)</label>
                <input
                  v-model="editForm.maxWeight"
                  type="text"
                  placeholder="-"
                  class="mt-1.5 h-10 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 text-sm text-[#333] placeholder:text-[#9ca3af] outline-none focus:border-[#333]"
                />
              </div>
            </div>
          </div>
          <div class="flex justify-end gap-3 border-t border-[#e5e7eb] px-6 py-4">
            <button
              type="button"
              class="rounded-lg border border-[#e5e7eb] bg-white px-4 py-2.5 text-sm font-medium text-[#374151] hover:bg-[#f8fafc]"
              @click="closeEditModal"
            >
              Cancel
            </button>
            <button
              type="button"
              class="rounded-lg bg-[#333] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#1f2937]"
              @click="saveEditModal"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Edit Category Modal -->
    <Teleport to="body">
      <div
        v-if="showEditCategoryModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        @click.self="closeEditCategoryModal"
      >
        <div class="relative w-full max-w-lg rounded-xl bg-white shadow-xl">
          <div class="flex items-start justify-between border-b border-[#e5e7eb] px-6 py-4">
            <h2 class="text-lg font-semibold text-[#333]">Edit Category - {{ editingCategoryRow?.category }}</h2>
            <button
              type="button"
              class="rounded-md p-1.5 text-[#6b7280] hover:bg-[#f1f5f9]"
              @click="closeEditCategoryModal"
            >
              <IconX class="h-5 w-5" />
            </button>
          </div>
          <div class="px-6 py-5 space-y-4">
            <div>
              <label class="block text-sm font-medium text-[#374151]">Description</label>
              <input
                v-model="editCategoryForm.description"
                type="text"
                placeholder="e.g. Letters, contracts, papers"
                class="mt-1.5 h-10 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 text-sm text-[#333] placeholder:text-[#9ca3af] outline-none focus:border-[#333]"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-[#374151]">Multiplier</label>
              <input
                v-model="editCategoryForm.multiplier"
                type="text"
                placeholder="Enter multiplier value"
                class="mt-1.5 h-10 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 text-sm text-[#333] placeholder:text-[#9ca3af] outline-none focus:border-[#333]"
              />
              <p class="mt-1 text-xs text-[#6b7280]">A multiplier of 1.5 means 50% more than base price</p>
            </div>
          </div>
          <div class="flex justify-end gap-3 border-t border-[#e5e7eb] px-6 py-4">
            <button
              type="button"
              class="rounded-lg border border-[#e5e7eb] bg-white px-4 py-2.5 text-sm font-medium text-[#374151] hover:bg-[#f8fafc]"
              @click="closeEditCategoryModal"
            >
              Cancel
            </button>
            <button
              type="button"
              class="rounded-lg bg-[#333] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#1f2937]"
              @click="saveEditCategoryModal"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Edit Distance Bracket Modal -->
    <Teleport to="body">
      <div
        v-if="showEditDistanceModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        @click.self="closeEditDistanceModal"
      >
        <div class="relative w-full max-w-lg rounded-xl bg-white shadow-xl">
          <div class="flex items-start justify-between border-b border-[#e5e7eb] px-6 py-4">
            <h2 class="text-lg font-semibold text-[#333]">Edit Distance Bracket</h2>
            <button
              type="button"
              class="rounded-md p-1.5 text-[#6b7280] hover:bg-[#f1f5f9]"
              @click="closeEditDistanceModal"
            >
              <IconX class="h-5 w-5" />
            </button>
          </div>
          <div class="px-6 py-5 space-y-4">
            <div>
              <label class="block text-sm font-medium text-[#374151]">Label</label>
              <input
                v-model="editDistanceForm.label"
                type="text"
                placeholder="e.g. Short 0-5 km"
                class="mt-1.5 h-10 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 text-sm text-[#333] placeholder:text-[#9ca3af] outline-none focus:border-[#333]"
              />
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-[#374151]">Min Distance (km)</label>
                <input
                  v-model="editDistanceForm.minKm"
                  type="text"
                  placeholder="0"
                  class="mt-1.5 h-10 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 text-sm text-[#333] placeholder:text-[#9ca3af] outline-none focus:border-[#333]"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-[#374151]">Max Distance (km)</label>
                <input
                  v-model="editDistanceForm.maxKm"
                  type="text"
                  placeholder="Leave empty for 30+"
                  class="mt-1.5 h-10 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 text-sm text-[#333] placeholder:text-[#9ca3af] outline-none focus:border-[#333]"
                />
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-[#374151]">Price Multiplier</label>
              <input
                v-model="editDistanceForm.priceMultiplier"
                type="text"
                placeholder="e.g. 1.5"
                class="mt-1.5 h-10 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 text-sm text-[#333] placeholder:text-[#9ca3af] outline-none focus:border-[#333]"
              />
            </div>
          </div>
          <div class="flex justify-end gap-3 border-t border-[#e5e7eb] px-6 py-4">
            <button
              type="button"
              class="rounded-lg border border-[#e5e7eb] bg-white px-4 py-2.5 text-sm font-medium text-[#374151] hover:bg-[#f8fafc]"
              @click="closeEditDistanceModal"
            >
              Cancel
            </button>
            <button
              type="button"
              class="rounded-lg bg-[#333] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#1f2937]"
              @click="saveEditDistanceModal"
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
import { computed, onMounted, onUnmounted, ref } from 'vue';
import IconHorizontalDots from '@/components/icon/icon-horizontal-dots.vue';
import IconX from '@/components/icon/icon-x.vue';

type VehicleRow = {
  id: string;
  vehicle: string;
  baseFare: string;
  perKm: string;
  perMinute: string;
  maxWeight: string;
  enabled: boolean;
};

type CategoryRow = {
  id: string;
  category: string;
  description: string;
  multiplier: string;
  enabled: boolean;
};

type DistanceRow = {
  id: string;
  rangeLabel: string;
  minKm: number;
  maxKm: number | null;
  multiplier: string;
};

const activeTab = ref('vehicle-rates');
const openActionId = ref<string | null>(null);
const showEditModal = ref(false);
const editingRow = ref<VehicleRow | null>(null);
const editForm = ref({
  baseFare: '',
  perKm: '',
  perMinute: '',
  maxWeight: '',
});

const showEditCategoryModal = ref(false);
const editingCategoryRow = ref<CategoryRow | null>(null);
const editCategoryForm = ref({
  description: '',
  multiplier: '',
});

const showEditDistanceModal = ref(false);
const editingDistanceRow = ref<DistanceRow | null>(null);
const editDistanceForm = ref({
  label: '',
  minKm: '',
  maxKm: '',
  priceMultiplier: '',
});

const tabs = [
  { value: 'vehicle-rates', label: 'Vehicle Rates' },
  { value: 'categories', label: 'Categories' },
  { value: 'distance', label: 'Distance' },
  { value: 'calculator', label: 'Calculator' },
];

const vehicleRows = ref<VehicleRow[]>([
  { id: '1', vehicle: 'Bicycle', baseFare: 'N125,000', perKm: 'N125,000', perMinute: 'N125,000', maxWeight: '5 kg', enabled: false },
  { id: '2', vehicle: 'Motorbike', baseFare: 'N125,000', perKm: 'N125,000', perMinute: 'N125,000', maxWeight: '5 kg', enabled: true },
  { id: '3', vehicle: 'Car', baseFare: 'N125,000', perKm: 'N125,000', perMinute: 'N125,000', maxWeight: '5 kg', enabled: true },
  { id: '4', vehicle: 'Van', baseFare: 'N125,000', perKm: 'N125,000', perMinute: 'N125,000', maxWeight: '5 kg', enabled: true },
]);

const categoryRows = ref<CategoryRow[]>([
  { id: 'cat-document', category: 'Document', description: 'Letters, contracts, papers', multiplier: '1x', enabled: false },
  { id: 'cat-food', category: 'Food', description: 'Perishable food items', multiplier: '1.2x', enabled: true },
  { id: 'cat-electronics', category: 'Electronics', description: 'Phones, laptops, gadgets', multiplier: '1.5x', enabled: true },
  { id: 'cat-fragile', category: 'Fragile', description: 'Glass, ceramics, delicate items', multiplier: '1.8x', enabled: true },
  { id: 'cat-others', category: 'Others', description: 'General items', multiplier: '1x', enabled: true },
]);

const distanceRows = ref<DistanceRow[]>([
  { id: 'dist-short', rangeLabel: 'Short (0-5 km)', minKm: 0, maxKm: 5, multiplier: '1x' },
  { id: 'dist-medium', rangeLabel: 'Medium (5-15 km)', minKm: 5, maxKm: 15, multiplier: '1.2x' },
  { id: 'dist-long', rangeLabel: 'Long (15-30 km)', minKm: 15, maxKm: 30, multiplier: '1.5x' },
  { id: 'dist-extra', rangeLabel: 'Extra Long (30+ km)', minKm: 30, maxKm: null, multiplier: '2x' },
]);

const calculatorDistance = ref<number | string>(10);
const selectedVehicle = ref('Motorbike');
const selectedCategory = ref('Document');
const calculatorVehicleOptions = ['Bicycle', 'Motorbike', 'Car', 'Van'];
const calculatorCategoryOptions = ['Document', 'Food', 'Electronics', 'Fragile', 'Others'];

function parseCurrency(s: string): number {
  const n = Number(String(s).replace(/^[N₦]|,/g, '').trim());
  return Number.isNaN(n) ? 0 : n;
}

function parseMultiplier(s: string): number {
  const n = Number(String(s).replace(/x$/i, '').trim());
  return Number.isNaN(n) || n <= 0 ? 1 : n;
}

const displayDistance = computed(() => {
  const d = calculatorDistance.value;
  const n = typeof d === 'number' ? d : Number(d);
  return Number.isNaN(n) ? 0 : n;
});

const estimatedFareFormatted = computed(() => {
  const km = displayDistance.value;
  const vRow = vehicleRows.value.find((r) => r.vehicle === selectedVehicle.value);
  const cRow = categoryRows.value.find((r) => r.category === selectedCategory.value);
  const base = vRow ? parseCurrency(vRow.baseFare) : 0;
  const perKm = vRow ? parseCurrency(vRow.perKm) : 0;
  const mult = cRow ? parseMultiplier(cRow.multiplier) : 1;
  const raw = (base + perKm * km) * mult;
  return `₦${Math.round(raw).toLocaleString()}`;
});

function toggleRow(row: VehicleRow) {
  row.enabled = !row.enabled;
}

function toggleCategoryRow(row: CategoryRow) {
  row.enabled = !row.enabled;
}

function editDistanceRow(row: DistanceRow) {
  openActionId.value = null;
  editingDistanceRow.value = row;
  editDistanceForm.value = {
    label: row.rangeLabel,
    minKm: String(row.minKm),
    maxKm: row.maxKm == null ? '' : String(row.maxKm),
    priceMultiplier: row.multiplier.replace(/x$/i, '').trim() || '',
  };
  showEditDistanceModal.value = true;
}

function closeEditDistanceModal() {
  showEditDistanceModal.value = false;
  editingDistanceRow.value = null;
}

function saveEditDistanceModal() {
  const row = editingDistanceRow.value;
  if (!row) return;
  const label = editDistanceForm.value.label.trim();
  const minVal = editDistanceForm.value.minKm.trim();
  const maxVal = editDistanceForm.value.maxKm.trim();
  const mult = editDistanceForm.value.priceMultiplier.trim();
  if (label) row.rangeLabel = label;
  if (minVal) {
    const n = Number(minVal);
    if (!Number.isNaN(n)) row.minKm = n;
  }
  row.maxKm = maxVal ? (Number(maxVal) || null) : null;
  if (mult) {
    const num = Number(mult);
    if (!Number.isNaN(num)) row.multiplier = num === 1 ? '1x' : `${num}x`;
  }
  closeEditDistanceModal();
}

function editCategoryRow(row: CategoryRow) {
  openActionId.value = null;
  editingCategoryRow.value = row;
  editCategoryForm.value = {
    description: row.description,
    multiplier: row.multiplier.replace(/x$/i, '').trim() || '',
  };
  showEditCategoryModal.value = true;
}

function closeEditCategoryModal() {
  showEditCategoryModal.value = false;
  editingCategoryRow.value = null;
}

function saveEditCategoryModal() {
  const row = editingCategoryRow.value;
  if (!row) return;
  const desc = editCategoryForm.value.description.trim();
  const mult = editCategoryForm.value.multiplier.trim();
  if (desc) row.description = desc;
  if (mult) {
    const num = Number(mult);
    if (!Number.isNaN(num)) row.multiplier = num === 1 ? '1x' : `${num}x`;
  }
  closeEditCategoryModal();
}

function editRow(row: VehicleRow) {
  openActionId.value = null;
  editingRow.value = row;
  editForm.value = {
    baseFare: row.baseFare.replace(/^N|₦|,/g, '').trim() || '',
    perKm: row.perKm.replace(/^N|₦|,/g, '').trim() || '',
    perMinute: row.perMinute.replace(/^N|₦|,/g, '').trim() || '',
    maxWeight: row.maxWeight.replace(/\s*kg$/i, '').trim() || '',
  };
  showEditModal.value = true;
}

function closeEditModal() {
  showEditModal.value = false;
  editingRow.value = null;
}

function saveEditModal() {
  const row = editingRow.value;
  if (!row) return;
  const n = (v: string) => (v ? `N${Number(v).toLocaleString()}` : row.baseFare);
  row.baseFare = editForm.value.baseFare ? n(editForm.value.baseFare) : row.baseFare;
  row.perKm = editForm.value.perKm ? n(editForm.value.perKm) : row.perKm;
  row.perMinute = editForm.value.perMinute ? n(editForm.value.perMinute) : row.perMinute;
  row.maxWeight = editForm.value.maxWeight ? `${editForm.value.maxWeight} kg` : row.maxWeight;
  closeEditModal();
}

function handleClickOutside() {
  openActionId.value = null;
}

onMounted(() => document.addEventListener('click', handleClickOutside));
onUnmounted(() => document.removeEventListener('click', handleClickOutside));
</script>
