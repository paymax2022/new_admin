<template>
  <div class="min-h-screen bg-white p-5 md:p-6">
    <div class="mx-auto max-w-[1220px] space-y-5">
      <!-- Header -->
      <div>
        <h1 class="text-2xl font-bold leading-tight text-[#333]">Bus Booking</h1>
        <p class="mt-1 text-sm text-[#6b7280]">Manage inter-state & intra-state bus reservations</p>
      </div>

      <!-- KPI cards -->
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div class="rounded-xl border border-[#e5e7eb] bg-white p-4 shadow-sm">
          <div class="flex items-start justify-between">
            <div>
              <p class="text-2xl font-bold text-[#333]">5</p>
              <p class="mt-1 text-xs font-medium text-[#22c55e]">+12.5% vs last period</p>
            </div>
            <span class="flex h-10 w-10 items-center justify-center rounded-lg bg-[#dbeafe] text-[#2563eb]">
              <IconClipboardText class="h-5 w-5" />
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
              <IconSquareCheck class="h-5 w-5" />
            </span>
          </div>
          <p class="mt-2 text-sm font-medium text-[#6b7280]">Confirmed</p>
        </div>
        <div class="rounded-xl border border-[#e5e7eb] bg-white p-4 shadow-sm">
          <div class="flex items-start justify-between">
            <div>
              <p class="text-2xl font-bold text-[#333]">1</p>
              <p class="mt-1 text-xs font-medium text-[#22c55e]">+12.5% vs last period</p>
            </div>
            <span class="flex h-10 w-10 items-center justify-center rounded-lg bg-[#e9d5ff] text-[#7c3aed]">
              <IconUsers class="h-5 w-5" />
            </span>
          </div>
          <p class="mt-2 text-sm font-medium text-[#6b7280]">Total Passengers</p>
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

      <!-- Search and filters (Bookings tab) -->
      <div v-if="activeTab === 'bookings'" class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div class="relative flex-1 max-w-md">
          <IconSearch class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9ca3af]" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search bookings, passengers, providers..."
            class="h-10 w-full rounded-lg border border-[#e5e7eb] bg-white py-2 pl-9 pr-3 text-sm text-[#333] placeholder:text-[#9ca3af] outline-none focus:border-[#333]"
          />
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-lg border border-[#e5e7eb] bg-white px-4 py-2.5 text-sm font-medium text-[#374151] hover:bg-[#f8fafc]"
            @click="showTypeDropdown = !showTypeDropdown; showTripDropdown = false; showStatusDropdown = false"
          >
            {{ filterTypeLabel }}
            <IconCaretDown class="h-4 w-4 text-[#6b7280]" />
          </button>
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-lg border border-[#e5e7eb] bg-white px-4 py-2.5 text-sm font-medium text-[#374151] hover:bg-[#f8fafc]"
            @click="showTripDropdown = !showTripDropdown; showTypeDropdown = false; showStatusDropdown = false"
          >
            {{ filterTripLabel }}
            <IconCaretDown class="h-4 w-4 text-[#6b7280]" />
          </button>
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-lg border border-[#e5e7eb] bg-white px-4 py-2.5 text-sm font-medium text-[#374151] hover:bg-[#f8fafc]"
            @click="showStatusDropdown = !showStatusDropdown; showTypeDropdown = false; showTripDropdown = false"
          >
            {{ filterStatusLabel }}
            <IconCaretDown class="h-4 w-4 text-[#6b7280]" />
          </button>
        </div>
      </div>

      <!-- Bookings table -->
      <div v-if="activeTab === 'bookings'" class="overflow-x-auto rounded-lg border border-[#e5e7eb] bg-white">
        <table class="w-full min-w-[900px] border-collapse">
          <thead>
            <tr class="border-b border-[#e5e7eb] bg-[#f9fafb] text-left text-sm font-semibold text-[#333]">
              <th class="px-4 py-3">Booking ID</th>
              <th class="px-4 py-3">Passenger</th>
              <th class="px-4 py-3">Route</th>
              <th class="px-4 py-3">Type</th>
              <th class="px-4 py-3">Provider</th>
              <th class="px-4 py-3">Payment</th>
              <th class="px-4 py-3">Fare</th>
              <th class="px-4 py-3">Status</th>
              <th class="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="row in bookingRows"
              :key="row.id"
              class="border-b border-[#e5e7eb] bg-white text-sm text-[#333] last:border-b-0 hover:bg-[#f8fafc]"
            >
              <td class="px-4 py-3 font-medium">{{ row.bookingId }}</td>
              <td class="px-4 py-3">{{ row.passenger }}</td>
              <td class="px-4 py-3 text-[#6b7280]">{{ row.route }}</td>
              <td class="px-4 py-3">
                <span
                  class="inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium"
                  :class="row.type === 'Inter-State' ? 'bg-[#dbeafe] text-[#2563eb]' : 'bg-[#f3e8ff] text-[#7c3aed]'"
                >
                  {{ row.type }}
                </span>
              </td>
              <td class="px-4 py-3">{{ row.provider }}</td>
              <td class="px-4 py-3 text-[#6b7280]">{{ row.payment }}</td>
              <td class="px-4 py-3">{{ row.fare }}</td>
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
                  class="text-sm font-medium text-[#374151] hover:text-[#111] hover:underline"
                  @click="viewBooking(row)"
                >
                  View
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Subscriptions tab placeholder -->
      <div v-else-if="activeTab === 'subscriptions'" class="rounded-lg border border-[#e5e7eb] bg-[#f8fafc] px-6 py-12 text-center text-sm text-[#6b7280]">
        Content for Subscriptions tab.
      </div>

      <!-- Providers tab placeholder -->
      <div v-else-if="activeTab === 'providers'" class="rounded-lg border border-[#e5e7eb] bg-[#f8fafc] px-6 py-12 text-center text-sm text-[#6b7280]">
        Content for Providers tab.
      </div>
    </div>

    <!-- Booking Details Modal -->
    <Teleport to="body">
      <div
        v-if="showBookingDetailsModal && bookingDetails"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        @click.self="closeBookingDetailsModal"
      >
        <div
          class="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-xl"
          @click.stop
        >
          <!-- Modal header -->
          <div class="sticky top-0 z-10 flex items-start justify-between border-b border-[#e5e7eb] bg-white px-6 py-4">
            <div>
              <h2 class="text-lg font-bold text-[#333]">Booking Details - {{ bookingDetails.bookingId }}</h2>
              <div class="mt-2 flex flex-wrap gap-1.5">
                <span
                  class="inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium text-white"
                  :class="bookingDetails.statusBadgeClass"
                >
                  {{ bookingDetails.status }}
                </span>
                <span class="inline-flex rounded-full bg-[#f3f4f6] px-2.5 py-0.5 text-xs font-medium text-[#374151]">Business</span>
                <span
                  class="inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium"
                  :class="bookingDetails.type === 'Inter-State' ? 'bg-[#dbeafe] text-[#2563eb]' : 'bg-[#f3e8ff] text-[#7c3aed]'"
                >
                  {{ bookingDetails.type }}
                </span>
                <span class="inline-flex rounded-full bg-[#f3f4f6] px-2.5 py-0.5 text-xs font-medium text-[#374151]">{{ bookingDetails.tripType }}</span>
              </div>
            </div>
            <button
              type="button"
              class="rounded-lg p-1.5 text-[#6b7280] hover:bg-[#f3f4f6] hover:text-[#111]"
              aria-label="Close"
              @click="closeBookingDetailsModal"
            >
              <IconX class="h-5 w-5" />
            </button>
          </div>

          <div class="space-y-6 px-6 py-5">
            <!-- Operator -->
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <span class="flex h-12 w-12 items-center justify-center rounded-full bg-[#ea580c] text-sm font-bold text-white">GG</span>
                <div>
                  <p class="font-semibold text-[#333]">{{ bookingDetails.provider }}</p>
                  <p class="text-sm text-[#6b7280]">{{ bookingDetails.providerType }}</p>
                </div>
              </div>
              <span class="rounded-full bg-[#f3f4f6] px-3 py-1.5 text-sm font-medium text-[#374151]">{{ bookingDetails.tripRef }}</span>
            </div>

            <!-- Passenger & Payment (two columns) -->
            <div class="grid gap-6 sm:grid-cols-2">
              <div>
                <div class="flex items-center gap-2 text-sm font-semibold text-[#374151]">
                  <IconUser class="h-4 w-4 text-[#6b7280]" />
                  Passenger (Self)
                </div>
                <div class="mt-3 flex items-center gap-3">
                  <span class="flex h-10 w-10 items-center justify-center rounded-full bg-[#e5e7eb] text-[#6b7280]">
                    <IconUser class="h-5 w-5" />
                  </span>
                  <div>
                    <p class="font-medium text-[#333]">{{ bookingDetails.passengerName }}</p>
                    <div class="mt-1.5 space-y-1 text-sm text-[#6b7280]">
                      <p class="flex items-center gap-2">
                        <IconPhone class="h-3.5 w-3.5" />
                        {{ bookingDetails.passengerPhone }}
                      </p>
                      <p class="flex items-center gap-2">
                        <IconMail class="h-3.5 w-3.5" />
                        {{ bookingDetails.passengerEmail }}
                      </p>
                      <p class="flex items-center gap-2">
                        <span class="inline-flex h-3.5 w-3.5 items-center justify-center rounded bg-[#fee2e2] text-[#dc2626]">!</span>
                        Emergency: {{ bookingDetails.emergencyContact }}
                      </p>
                    </div>
                    <p v-if="bookingDetails.additionalPassengerCount" class="mt-1 text-xs text-[#6b7280]">{{ bookingDetails.additionalPassengerCount }} passengers</p>
                  </div>
                </div>
              </div>
              <div>
                <div class="flex items-center gap-2 text-sm font-semibold text-[#374151]">
                  <IconCreditCard class="h-4 w-4 text-[#6b7280]" />
                  Payment Method
                </div>
                <div class="mt-3 text-sm text-[#333]">
                  <p class="font-medium">{{ bookingDetails.paymentMethodLabel }}</p>
                  <p class="mt-0.5 text-[#6b7280]">{{ bookingDetails.paymentCardMask }}</p>
                  <span class="mt-2 inline-block rounded-full bg-[#f3f4f6] px-2.5 py-0.5 text-xs font-medium text-[#374151]">{{ bookingDetails.paymentGateway }}</span>
                </div>
              </div>
            </div>

            <!-- Additional passengers (when present) -->
            <div v-if="bookingDetails.additionalPassengers?.length" class="border-t border-[#e5e7eb] pt-4">
              <div class="flex items-center gap-2 text-sm font-semibold text-[#374151]">
                <IconUsers class="h-4 w-4 text-[#6b7280]" />
                Additional Passengers ({{ bookingDetails.additionalPassengers.length }})
              </div>
              <ul class="mt-3 space-y-3">
                <li
                  v-for="(p, i) in bookingDetails.additionalPassengers"
                  :key="i"
                  class="flex items-center justify-between rounded-lg border border-[#e5e7eb] bg-[#f8fafc] px-4 py-3 text-sm"
                >
                  <div>
                    <p class="font-medium text-[#333]">{{ p.name }}</p>
                    <p class="mt-0.5 flex items-center gap-2 text-[#6b7280]">
                      <IconPhone class="h-3.5 w-3.5" />{{ p.phone }}
                      <span class="mx-1">·</span>
                      <IconMail class="h-3.5 w-3.5" />{{ p.email }}
                    </p>
                  </div>
                  <span class="rounded-full bg-[#e5e7eb] px-2.5 py-0.5 text-xs font-medium text-[#374151]">Seat {{ p.seat }}</span>
                </li>
              </ul>
            </div>

            <!-- Journey details -->
            <div class="border-t border-[#e5e7eb] pt-4">
              <div class="flex items-center gap-2 text-sm font-semibold text-[#374151]">
                <IconMapPin class="h-4 w-4 text-[#6b7280]" />
                Journey Details
              </div>
              <p class="mt-1 text-xs font-medium uppercase tracking-wide text-[#9ca3af]">TRIP</p>
              <div class="mt-3 space-y-4">
                <!-- Outbound -->
                <div class="flex gap-4">
                  <div class="flex flex-col items-center">
                    <span class="h-3 w-3 rounded-full bg-[#22c55e]"></span>
                    <div class="mt-1 h-full w-px bg-[#e5e7eb]"></div>
                    <span class="h-3 w-3 rounded-full bg-[#ef4444]"></span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="flex justify-between gap-2">
                      <div>
                        <p class="font-medium text-[#333]">{{ bookingDetails.journey.origin.city }}</p>
                        <p class="text-xs text-[#6b7280]">{{ bookingDetails.journey.origin.address }}</p>
                      </div>
                      <div class="text-right text-sm text-[#6b7280]">
                        <p>{{ bookingDetails.journey.origin.time }}</p>
                        <p>{{ bookingDetails.journey.origin.date }}</p>
                      </div>
                    </div>
                    <div class="mt-2 flex justify-between gap-2 border-t border-[#e5e7eb] pt-2">
                      <div>
                        <p class="font-medium text-[#333]">{{ bookingDetails.journey.destination.city }}</p>
                        <p class="text-xs text-[#6b7280]">{{ bookingDetails.journey.destination.address }}</p>
                      </div>
                      <div class="text-right text-sm text-[#6b7280]">
                        <p>{{ bookingDetails.journey.destination.time }}</p>
                        <p>{{ bookingDetails.journey.destination.date }}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Return journey (if present) -->
                <template v-if="bookingDetails.returnJourney">
                  <div class="flex gap-4 border-t border-[#e5e7eb] pt-4">
                    <div class="flex flex-col items-center">
                      <span class="h-3 w-3 rounded-full bg-[#22c55e]"></span>
                      <div class="mt-1 h-full w-px bg-[#e5e7eb]"></div>
                      <span class="h-3 w-3 rounded-full bg-[#ef4444]"></span>
                    </div>
                    <div class="flex-1 min-w-0">
                      <div class="flex justify-between gap-2">
                        <div>
                          <p class="font-medium text-[#333]">{{ bookingDetails.returnJourney.origin.city }}</p>
                          <p class="text-xs text-[#6b7280]">{{ bookingDetails.returnJourney.origin.address }}</p>
                        </div>
                        <div class="text-right text-sm text-[#6b7280]">
                          <p>{{ bookingDetails.returnJourney.origin.time }}</p>
                          <p>{{ bookingDetails.returnJourney.origin.date }}</p>
                        </div>
                      </div>
                      <div class="mt-2 flex justify-between gap-2 border-t border-[#e5e7eb] pt-2">
                        <div>
                          <p class="font-medium text-[#333]">{{ bookingDetails.returnJourney.destination.city }}</p>
                          <p class="text-xs text-[#6b7280]">{{ bookingDetails.returnJourney.destination.address }}</p>
                        </div>
                        <div class="text-right text-sm text-[#6b7280]">
                          <p>{{ bookingDetails.returnJourney.destination.time }}</p>
                          <p>{{ bookingDetails.returnJourney.destination.date }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </div>

            <!-- Seat details & Amenities -->
            <div class="grid gap-6 sm:grid-cols-2">
              <div>
                <div class="flex items-center gap-2 text-sm font-semibold text-[#374151]">
                  <svg class="h-4 w-4 text-[#6b7280]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 10v10"/><path d="M20 10v10"/><path d="M4 10h16"/><path d="M6 10V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4"/></svg>
                  Seat Details
                </div>
                <div class="mt-3">
                  <span class="inline-block rounded-lg bg-[#f3f4f6] px-3 py-1.5 text-sm font-medium text-[#374151]">Seat {{ bookingDetails.seatNumber }}</span>
                  <p class="mt-1.5 text-sm text-[#6b7280]">{{ bookingDetails.seatType }}</p>
                </div>
              </div>
              <div>
                <div class="text-sm font-semibold text-[#374151]">Amenities</div>
                <div class="mt-3 flex flex-wrap gap-2">
                  <span
                    v-for="a in bookingDetails.amenities"
                    :key="a"
                    class="rounded-full bg-[#f3f4f6] px-3 py-1 text-xs font-medium text-[#374151]"
                  >
                    {{ a }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Payment summary -->
            <div class="rounded-lg border border-[#e5e7eb] bg-[#f8fafc] px-4 py-4">
              <div class="flex items-center justify-between">
                <p class="text-sm font-semibold text-[#374151]">Payment Summary</p>
                <span
                  v-if="bookingDetails.paymentStatus === 'Paid'"
                  class="rounded-full bg-[#dcfce7] px-2.5 py-0.5 text-xs font-medium text-[#16a34a]"
                >
                  Paid
                </span>
              </div>
              <p class="mt-1 text-sm text-[#6b7280]">{{ bookingDetails.paymentSummaryText }}</p>
              <p class="mt-2 text-right text-xl font-bold text-[#333]">{{ bookingDetails.totalAmount }}</p>
            </div>

            <!-- Actions -->
            <div class="flex flex-wrap items-center justify-end gap-3 border-t border-[#e5e7eb] pt-4">
              <button
                type="button"
                class="rounded-lg border border-[#e5e7eb] bg-white px-4 py-2.5 text-sm font-medium text-[#374151] hover:bg-[#f8fafc]"
                @click="closeBookingDetailsModal"
              >
                Cancel
              </button>
              <template v-if="bookingDetails.status === 'Pending'">
                <button
                  type="button"
                  class="rounded-lg border border-[#e5e7eb] bg-[#f3f4f6] px-4 py-2.5 text-sm font-medium text-[#374151] hover:bg-[#e5e7eb]"
                  @click="openAssignSeatModal"
                >
                  Assign Seat
                </button>
                <button
                  type="button"
                  class="rounded-lg bg-[#333] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#111]"
                  @click="openConfirmBookingModal"
                >
                  Confirm Booking
                </button>
              </template>
              <template v-else-if="bookingDetails.status === 'Confirmed'">
                <button
                  type="button"
                  class="rounded-lg bg-[#333] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#111]"
                  @click="openSendReminderModal"
                >
                  Send Reminder
                </button>
              </template>
              <template v-else-if="bookingDetails.status === 'Cancelled'">
                <button
                  type="button"
                  class="rounded-lg bg-[#333] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#111]"
                  @click="openProcessRefundModal"
                >
                  Process Refund
                </button>
              </template>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Send Reminder Modal -->
    <Teleport to="body">
      <div
        v-if="showSendReminderModal && reminderContext"
        class="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
        @click.self="closeSendReminderModal"
      >
        <div
          class="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white shadow-xl"
          @click.stop
        >
          <!-- Header -->
          <div class="flex items-center justify-between border-b border-[#e5e7eb] px-6 py-4">
            <h2 class="text-lg font-bold text-[#333]">Send Reminder</h2>
            <button
              type="button"
              class="rounded-lg p-1.5 text-[#6b7280] hover:bg-[#f3f4f6] hover:text-[#111]"
              aria-label="Close"
              @click="closeSendReminderModal"
            >
              <IconX class="h-5 w-5" />
            </button>
          </div>

          <div class="space-y-5 px-6 py-5">
            <!-- Customer & booking info (read-only) -->
            <div class="rounded-lg border border-[#e5e7eb] bg-[#f8fafc] p-4">
              <div class="flex items-center gap-3">
                <span class="flex h-10 w-10 items-center justify-center rounded-full bg-[#e5e7eb] text-[#6b7280]">
                  <IconUser class="h-5 w-5" />
                </span>
                <div class="min-w-0 flex-1">
                  <p class="font-semibold text-[#333]">{{ reminderContext.passengerName }}</p>
                  <p class="mt-0.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[#6b7280]">
                    <span class="flex items-center gap-1.5">
                      <IconMail class="h-3.5 w-3.5" />
                      {{ reminderContext.passengerEmail }}
                    </span>
                    <span class="flex items-center gap-1.5">
                      <IconPhone class="h-3.5 w-3.5" />
                      {{ reminderContext.passengerPhone }}
                    </span>
                  </p>
                  <p class="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[#6b7280]">
                    <span class="flex items-center gap-1.5">
                      <IconMapPin class="h-3.5 w-3.5" />
                      {{ reminderContext.routeLabel }}
                    </span>
                    <span class="inline-flex items-center gap-1.5 rounded-full border border-[#e5e7eb] bg-white px-2.5 py-1 text-sm text-[#374151]">
                      <IconCalendar class="h-3.5 w-3.5" />
                      {{ reminderContext.departureLabel }}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <!-- Send via -->
            <div>
              <p class="mb-2 text-sm font-semibold text-[#374151]">Send via</p>
              <div class="flex flex-wrap gap-4">
                <label class="flex cursor-pointer items-center gap-2">
                  <input
                    v-model="sendReminderVia"
                    type="radio"
                    value="email"
                    class="h-4 w-4 border-[#d1d5db] text-[#333] focus:ring-[#333]"
                  />
                  <IconMail class="h-4 w-4 text-[#374151]" />
                  <span class="text-sm font-medium text-[#333]">Email</span>
                </label>
                <label class="flex cursor-pointer items-center gap-2">
                  <input
                    v-model="sendReminderVia"
                    type="radio"
                    value="sms"
                    class="h-4 w-4 border-[#d1d5db] text-[#333] focus:ring-[#333]"
                  />
                  <IconMessage2 class="h-4 w-4 text-[#374151]" />
                  <span class="text-sm font-medium text-[#333]">SMS</span>
                </label>
                <label class="flex cursor-pointer items-center gap-2">
                  <input
                    v-model="sendReminderVia"
                    type="radio"
                    value="push"
                    class="h-4 w-4 border-[#d1d5db] text-[#333] focus:ring-[#333]"
                  />
                  <IconBell class="h-4 w-4 text-[#374151]" />
                  <span class="text-sm font-medium text-[#333]">Push Notification</span>
                </label>
              </div>
            </div>

            <!-- Message template -->
            <div>
              <p class="mb-2 text-sm font-semibold text-[#374151]">Message Template</p>
              <div class="space-y-2">
                <label class="flex cursor-pointer gap-3 rounded-lg border border-[#e5e7eb] p-3 hover:bg-[#f8fafc]">
                  <input
                    v-model="sendReminderTemplate"
                    type="radio"
                    value="departure"
                    class="mt-0.5 h-4 w-4 border-[#d1d5db] text-[#333] focus:ring-[#333]"
                  />
                  <div>
                    <p class="text-sm font-medium text-[#333]">Departure Reminder</p>
                    <p class="text-xs text-[#6b7280]">Your bus departs soon! Please arrive at the terminal 30 minutes before departure.</p>
                  </div>
                </label>
                <label class="flex cursor-pointer gap-3 rounded-lg border border-[#e5e7eb] p-3 hover:bg-[#f8fafc]">
                  <input
                    v-model="sendReminderTemplate"
                    type="radio"
                    value="booking"
                    class="mt-0.5 h-4 w-4 border-[#d1d5db] text-[#333] focus:ring-[#333]"
                  />
                  <div>
                    <p class="text-sm font-medium text-[#333]">Booking Confirmation</p>
                    <p class="text-xs text-[#6b7280]">Your booking has been confirmed. Please keep this message for reference.</p>
                  </div>
                </label>
                <label class="flex cursor-pointer gap-3 rounded-lg border border-[#e5e7eb] p-3 hover:bg-[#f8fafc]">
                  <input
                    v-model="sendReminderTemplate"
                    type="radio"
                    value="checkin"
                    class="mt-0.5 h-4 w-4 border-[#d1d5db] text-[#333] focus:ring-[#333]"
                  />
                  <div>
                    <p class="text-sm font-medium text-[#333]">Check-in Reminder</p>
                    <p class="text-xs text-[#6b7280]">Don't forget to check in at the terminal counter before boarding.</p>
                  </div>
                </label>
                <label class="flex cursor-pointer gap-3 rounded-lg border border-[#e5e7eb] p-3 hover:bg-[#f8fafc]">
                  <input
                    v-model="sendReminderTemplate"
                    type="radio"
                    value="custom"
                    class="mt-0.5 h-4 w-4 border-[#d1d5db] text-[#333] focus:ring-[#333]"
                  />
                  <div class="min-w-0 flex-1">
                    <p class="text-sm font-medium text-[#333]">Custom Message</p>
                    <textarea
                      v-model="sendReminderCustomMessage"
                      rows="3"
                      placeholder="Custom Message"
                      class="mt-2 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-sm text-[#333] placeholder:text-[#9ca3af] outline-none focus:border-[#333]"
                      @click.stop
                    />
                  </div>
                </label>
              </div>
            </div>

            <!-- Message preview -->
            <div>
              <p class="mb-2 text-sm font-semibold text-[#374151]">Message Preview</p>
              <div class="rounded-lg border border-[#e5e7eb] bg-[#f8fafc] px-4 py-3 text-sm text-[#374151] whitespace-pre-wrap">{{ messagePreviewText }}</div>
            </div>

            <!-- Actions -->
            <div class="flex flex-wrap items-center justify-end gap-3 border-t border-[#e5e7eb] pt-4">
              <button
                type="button"
                class="rounded-lg border border-[#e5e7eb] bg-white px-4 py-2.5 text-sm font-medium text-[#374151] hover:bg-[#f8fafc]"
                @click="closeSendReminderModal"
              >
                Cancel
              </button>
              <button
                type="button"
                class="rounded-lg bg-[#333] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#111]"
                @click="submitSendReminder"
              >
                Send Reminder
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Assign Seat Modal -->
    <Teleport to="body">
      <div
        v-if="showAssignSeatModal && assignSeatContext"
        class="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
        @click.self="closeAssignSeatModal"
      >
        <div
          class="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-xl"
          @click.stop
        >
          <div class="flex items-center justify-between border-b border-[#e5e7eb] px-6 py-4">
            <h2 class="text-lg font-bold text-[#333]">Assign Seat - {{ assignSeatContext.bookingId }}</h2>
            <button
              type="button"
              class="rounded-lg p-1.5 text-[#6b7280] hover:bg-[#f3f4f6] hover:text-[#111]"
              aria-label="Close"
              @click="closeAssignSeatModal"
            >
              <IconX class="h-5 w-5" />
            </button>
          </div>

          <div class="space-y-5 px-6 py-5">
            <!-- Booking details -->
            <div class="grid grid-cols-2 gap-x-6 gap-y-1 text-sm sm:grid-cols-4">
              <div>
                <p class="text-[#6b7280]">Passenger</p>
                <p class="font-medium text-[#333]">{{ assignSeatContext.passengerName }}</p>
              </div>
              <div>
                <p class="text-[#6b7280]">Bus</p>
                <p class="font-medium text-[#333]">{{ assignSeatContext.bus }}</p>
              </div>
              <div>
                <p class="text-[#6b7280]">Class</p>
                <p class="font-medium text-[#333]">{{ assignSeatContext.class }}</p>
              </div>
              <div>
                <p class="text-[#6b7280]">Seats Required</p>
                <p class="font-medium text-[#333]">{{ assignSeatContext.seatsRequired }}</p>
              </div>
            </div>

            <!-- Legend -->
            <div class="flex flex-wrap items-center gap-6 border-y border-[#e5e7eb] py-3">
              <span class="flex items-center gap-2 text-sm text-[#6b7280]">
                <span class="inline-flex h-6 w-6 items-center justify-center rounded border border-[#d1d5db] bg-white text-xs font-medium text-[#374151]">A</span>
                Available
              </span>
              <span class="flex items-center gap-2 text-sm text-[#6b7280]">
                <span class="inline-flex h-6 w-6 items-center justify-center rounded bg-[#22c55e] text-white">
                  <IconSquareCheck class="h-3.5 w-3.5" />
                </span>
                Selected
              </span>
              <span class="flex items-center gap-2 text-sm text-[#6b7280]">
                <span class="inline-flex h-6 w-6 items-center justify-center rounded bg-[#333] text-white">
                  <IconX class="h-3.5 w-3.5" />
                </span>
                Taken
              </span>
            </div>

            <!-- Seat grid -->
            <div class="overflow-x-auto">
              <div class="inline-block min-w-0">
                <!-- Column headers -->
                <div class="mb-2 flex gap-1 pl-8">
                  <span v-for="col in assignSeatColumns" :key="col" class="flex h-8 w-8 items-center justify-center text-xs font-medium text-[#6b7280]">{{ col }}</span>
                </div>
                <!-- Rows -->
                <div
                  v-for="row in assignSeatRows"
                  :key="row"
                  class="flex items-center gap-1"
                >
                  <span class="w-6 shrink-0 text-right text-xs font-medium text-[#6b7280]">{{ row }}</span>
                  <button
                    v-for="col in assignSeatColumns"
                    :key="col"
                    type="button"
                    :disabled="getAssignSeatStatus(row, col) === 'taken'"
                    class="flex h-8 w-8 shrink-0 items-center justify-center rounded text-xs font-medium transition-colors disabled:cursor-not-allowed"
                    :class="getAssignSeatButtonClass(row, col)"
                    @click="toggleAssignSeat(row, col)"
                  >
                    <template v-if="getAssignSeatStatus(row, col) === 'taken'">
                      <IconX class="h-3.5 w-3.5 text-white" />
                    </template>
                    <template v-else-if="getAssignSeatStatus(row, col) === 'selected'">
                      <IconSquareCheck class="h-3.5 w-3.5 text-white" />
                    </template>
                    <template v-else>
                      {{ col }}
                    </template>
                  </button>
                </div>
              </div>
            </div>

            <!-- Selected seats -->
            <div>
              <p class="mb-2 text-sm font-semibold text-[#374151]">Selected Seats</p>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="seat in assignSeatSelectedList"
                  :key="seat"
                  class="inline-flex items-center rounded-full bg-[#e5e7eb] px-3 py-1 text-sm font-medium text-[#374151]"
                >
                  Seat {{ seat }}
                </span>
                <span v-if="assignSeatSelectedList.length === 0" class="text-sm text-[#9ca3af]">No seat selected</span>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex flex-wrap items-center justify-end gap-3 border-t border-[#e5e7eb] pt-4">
              <button
                type="button"
                class="rounded-lg border border-[#e5e7eb] bg-white px-4 py-2.5 text-sm font-medium text-[#374151] hover:bg-[#f8fafc]"
                @click="closeAssignSeatModal"
              >
                Cancel
              </button>
              <button
                type="button"
                class="rounded-lg bg-[#333] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#111] disabled:opacity-50 disabled:cursor-not-allowed"
                :disabled="assignSeatSelectedList.length !== assignSeatContext.seatsRequired"
                @click="submitAssignSeat"
              >
                Assign {{ assignSeatSelectedList.length }}/{{ assignSeatContext.seatsRequired }} Seats
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Confirm Booking Modal -->
    <Teleport to="body">
      <div
        v-if="showConfirmBookingModal && confirmBookingContext"
        class="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
        @click.self="closeConfirmBookingModal"
      >
        <div
          class="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white shadow-xl"
          @click.stop
        >
          <div class="flex items-center justify-between border-b border-[#e5e7eb] px-6 py-4">
            <div>
              <h2 class="text-lg font-bold text-[#333]">Confirm Booking</h2>
              <p class="mt-0.5 text-sm text-[#6b7280]">Review and confirm booking {{ confirmBookingContext.bookingId }}</p>
            </div>
            <button type="button" class="rounded-lg p-1.5 text-[#6b7280] hover:bg-[#f3f4f6] hover:text-[#111]" aria-label="Close" @click="closeConfirmBookingModal">
              <IconX class="h-5 w-5" />
            </button>
          </div>
          <div class="space-y-5 px-6 py-5">
            <!-- Booking details -->
            <div class="space-y-3 text-sm">
              <div class="flex items-center justify-between">
                <span class="flex items-center gap-2 text-[#6b7280]"><IconUser class="h-4 w-4" /> Passenger</span>
                <span class="font-medium text-[#333]">{{ confirmBookingContext.passengerName }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="flex items-center gap-2 text-[#6b7280]"><IconMapPin class="h-4 w-4" /> Route</span>
                <span class="font-medium text-[#333]">{{ confirmBookingContext.routeLabel }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="flex items-center gap-2 text-[#6b7280]">Bus / Seat</span>
                <span class="flex items-center gap-2">
                  <span class="font-medium text-[#333]">{{ confirmBookingContext.bus }}</span>
                  <span class="rounded bg-[#ffedd5] px-2 py-0.5 text-xs font-medium text-[#ea580c]">Pending</span>
                </span>
              </div>
              <div class="flex items-center justify-between">
                <span class="flex items-center gap-2 text-[#6b7280]"><IconCreditCard class="h-4 w-4" /> Payment</span>
                <span class="text-right">
                  <span class="font-bold text-[#333]">{{ confirmBookingContext.totalAmount }}</span>
                  <p class="text-xs text-[#6b7280]">{{ confirmBookingContext.paymentMethodLabel }} {{ confirmBookingContext.paymentCardMask }}</p>
                </span>
              </div>
            </div>
            <!-- Seat not assigned alert -->
            <div class="flex gap-3 rounded-lg border border-[#fed7aa] bg-[#fff7ed] p-4">
              <span class="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-[#ea580c] text-white">
                <svg class="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 9v4"/><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 17h.01"/></svg>
              </span>
              <div>
                <p class="font-semibold text-[#c2410c]">Seat Not Assigned</p>
                <p class="mt-0.5 text-sm text-[#9a3412]">Please assign a seat before confirming this booking.</p>
              </div>
            </div>
            <!-- Verification checklist -->
            <div>
              <p class="mb-2 text-sm font-semibold text-[#374151]">Verification Checklist</p>
              <div class="space-y-2">
                <label class="flex cursor-pointer items-center gap-2">
                  <input v-model="confirmBookingPaymentVerified" type="checkbox" class="h-4 w-4 rounded border-[#d1d5db] text-[#333] focus:ring-[#333]" />
                  <span class="text-sm text-[#333]">Payment has been verified and received</span>
                </label>
                <label class="flex cursor-pointer items-center gap-2 opacity-60">
                  <input type="checkbox" disabled class="h-4 w-4 rounded border-[#d1d5db]" />
                  <span class="text-sm text-[#6b7280]">Seat has been assigned (Assign seat first)</span>
                </label>
                <label class="flex cursor-pointer items-center gap-2">
                  <input v-model="confirmBookingDetailsCorrect" type="checkbox" class="h-4 w-4 rounded border-[#d1d5db] text-[#333] focus:ring-[#333]" />
                  <span class="text-sm text-[#333]">Passenger details are correct</span>
                </label>
              </div>
            </div>
            <!-- Send confirmation via -->
            <div>
              <p class="mb-2 text-sm font-semibold text-[#374151]">Send Confirmation Via</p>
              <div class="flex flex-wrap gap-4">
                <label class="flex cursor-pointer items-center gap-2">
                  <input v-model="confirmBookingSendVia" type="radio" value="email" class="h-4 w-4 border-[#d1d5db] text-[#333] focus:ring-[#333]" />
                  <IconMail class="h-4 w-4" />
                  <span class="text-sm text-[#333]">Email</span>
                </label>
                <label class="flex cursor-pointer items-center gap-2">
                  <input v-model="confirmBookingSendVia" type="radio" value="sms" class="h-4 w-4 border-[#d1d5db] text-[#333] focus:ring-[#333]" />
                  <IconMessage2 class="h-4 w-4" />
                  <span class="text-sm text-[#333]">SMS</span>
                </label>
                <label class="flex cursor-pointer items-center gap-2">
                  <input v-model="confirmBookingSendVia" type="radio" value="push" class="h-4 w-4 border-[#d1d5db] text-[#333] focus:ring-[#333]" />
                  <IconBell class="h-4 w-4" />
                  <span class="text-sm text-[#333]">Push Notification</span>
                </label>
              </div>
            </div>
            <!-- Admin notes -->
            <div>
              <p class="mb-2 text-sm font-semibold text-[#374151]">Admin Notes (Optional)</p>
              <textarea
                v-model="confirmBookingAdminNotes"
                rows="3"
                placeholder="Add any internal notes about this booking..."
                class="w-full rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-sm text-[#333] placeholder:text-[#9ca3af] outline-none focus:border-[#333]"
              />
            </div>
            <div class="flex justify-end gap-3 border-t border-[#e5e7eb] pt-4">
              <button type="button" class="rounded-lg border border-[#e5e7eb] bg-white px-4 py-2.5 text-sm font-medium text-[#374151] hover:bg-[#f8fafc]" @click="closeConfirmBookingModal">Cancel</button>
              <button type="button" class="rounded-lg bg-[#333] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#111]" @click="submitConfirmBooking">Confirm Booking</button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Process Refund Modal -->
    <Teleport to="body">
      <div
        v-if="showProcessRefundModal && processRefundContext"
        class="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
        @click.self="closeProcessRefundModal"
      >
        <div
          class="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white shadow-xl"
          @click.stop
        >
          <div class="flex items-center justify-between border-b border-[#e5e7eb] px-6 py-4">
            <div>
              <h2 class="text-lg font-bold text-[#333]">Process Refund - {{ processRefundContext.bookingId }}</h2>
              <p class="mt-0.5 text-sm text-[#6b7280]">Review and confirm booking {{ processRefundContext.bookingId }}</p>
            </div>
            <button type="button" class="rounded-lg p-1.5 text-[#6b7280] hover:bg-[#f3f4f6] hover:text-[#111]" aria-label="Close" @click="closeProcessRefundModal">
              <IconX class="h-5 w-5" />
            </button>
          </div>
          <div class="space-y-5 px-6 py-5">
            <!-- Booking details -->
            <div class="rounded-lg border border-[#e5e7eb] bg-[#f8fafc] p-4 space-y-2 text-sm">
              <div class="flex items-center justify-between">
                <span class="flex items-center gap-2 text-[#6b7280]"><IconUser class="h-4 w-4" /> {{ processRefundContext.passengerName }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="flex items-center gap-2 text-[#6b7280]"><IconMapPin class="h-4 w-4" /> {{ processRefundContext.routeLabel }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="flex items-center gap-2 text-[#6b7280]"><IconCalendar class="h-4 w-4" /> {{ processRefundContext.departureLabel }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="flex items-center gap-2 text-[#6b7280]">Original Amount Paid</span>
                <span class="font-semibold text-[#333]">{{ processRefundContext.totalAmount }}</span>
              </div>
            </div>
            <!-- Original payment method -->
            <div>
              <p class="mb-2 text-sm font-semibold text-[#374151]">Original Payment Method</p>
              <div class="flex items-center gap-3 rounded-lg border border-[#e5e7eb] bg-white px-4 py-3">
                <IconCreditCard class="h-5 w-5 text-[#6b7280]" />
                <div>
                  <p class="text-sm font-medium text-[#333]">card</p>
                  <p class="text-sm text-[#6b7280]">{{ processRefundContext.paymentMethodLabel }} {{ processRefundContext.paymentCardMask }}</p>
                </div>
              </div>
            </div>
            <!-- Refund type -->
            <div>
              <p class="mb-2 text-sm font-semibold text-[#374151]">Refund Type</p>
              <div class="space-y-2">
                <label class="flex cursor-pointer items-center gap-2">
                  <input v-model="refundType" type="radio" value="full" class="h-4 w-4 border-[#d1d5db] text-[#333] focus:ring-[#333]" />
                  <span class="text-sm text-[#333]">Full Refund ({{ processRefundContext.totalAmount }})</span>
                </label>
                <label class="flex cursor-pointer items-start gap-2">
                  <input v-model="refundType" type="radio" value="partial" class="mt-1 h-4 w-4 border-[#d1d5db] text-[#333] focus:ring-[#333]" />
                  <div class="flex-1">
                    <span class="text-sm text-[#333]">Partial Refund</span>
                    <input
                      v-model.number="refundPartialAmount"
                      type="text"
                      placeholder="0"
                      class="mt-1 block w-full rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-sm text-[#333] outline-none focus:border-[#333]"
                    />
                    <p class="mt-0.5 text-xs text-[#6b7280]">100% of original payment</p>
                  </div>
                </label>
              </div>
            </div>
            <!-- Refund to -->
            <div>
              <p class="mb-2 text-sm font-semibold text-[#374151]">Refund To</p>
              <div class="space-y-2">
                <label class="flex cursor-pointer items-center gap-2">
                  <input v-model="refundTo" type="radio" value="original" class="h-4 w-4 border-[#d1d5db] text-[#333] focus:ring-[#333]" />
                  <span class="text-sm text-[#333]">Original Payment Method</span>
                </label>
                <label class="flex cursor-pointer items-center gap-2">
                  <input v-model="refundTo" type="radio" value="wallet" class="h-4 w-4 border-[#d1d5db] text-[#333] focus:ring-[#333]" />
                  <span class="text-sm text-[#333]">Platform Wallet</span>
                </label>
                <label class="flex cursor-pointer items-center gap-2">
                  <input v-model="refundTo" type="radio" value="bank" class="h-4 w-4 border-[#d1d5db] text-[#333] focus:ring-[#333]" />
                  <span class="text-sm text-[#333]">Bank Transfer</span>
                </label>
              </div>
            </div>
            <!-- Refund reason -->
            <div>
              <p class="mb-2 text-sm font-semibold text-[#374151]">Refund Reason</p>
              <textarea
                v-model="refundReason"
                rows="3"
                placeholder="Enter reason for refund (e.g., Trip cancelled, Customer request)..."
                class="w-full rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-sm text-[#333] placeholder:text-[#9ca3af] outline-none focus:border-[#333]"
              />
            </div>
            <!-- Confirmation required -->
            <div>
              <p class="mb-2 text-sm font-semibold text-[#374151]">Confirmation Required</p>
              <div class="space-y-2">
                <label class="flex cursor-pointer items-center gap-2">
                  <input v-model="refundVerifiedEligibility" type="checkbox" class="h-4 w-4 rounded border-[#d1d5db] text-[#333] focus:ring-[#333]" />
                  <span class="text-sm text-[#333]">I have verified the cancellation and refund eligibility</span>
                </label>
                <label class="flex cursor-pointer items-center gap-2">
                  <input v-model="refundNotifyCustomer" type="checkbox" class="h-4 w-4 rounded border-[#d1d5db] text-[#333] focus:ring-[#333]" />
                  <span class="text-sm text-[#333]">Customer will be notified about the refund</span>
                </label>
              </div>
            </div>
            <!-- Refund amount display -->
            <div class="flex items-center justify-between rounded-lg border border-[#e5e7eb] bg-[#f8fafc] px-4 py-3">
              <div>
                <p class="font-semibold text-[#374151]">Refund Amount</p>
                <p class="text-xs text-[#6b7280]">Via {{ refundTo === 'original' ? 'card' : refundTo === 'wallet' ? 'wallet' : 'bank transfer' }}</p>
              </div>
              <p class="text-lg font-bold text-[#333]">{{ processRefundContext.totalAmount }}</p>
            </div>
            <div class="flex justify-end gap-3 border-t border-[#e5e7eb] pt-4">
              <button type="button" class="rounded-lg border border-[#e5e7eb] bg-white px-4 py-2.5 text-sm font-medium text-[#374151] hover:bg-[#f8fafc]" @click="closeProcessRefundModal">Cancel</button>
              <button type="button" class="rounded-lg bg-[#333] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#111]" @click="submitProcessRefund">Process Refund</button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import IconClipboardText from '@/components/icon/icon-clipboard-text.vue';
import IconSquareCheck from '@/components/icon/icon-square-check.vue';
import IconUsers from '@/components/icon/icon-users.vue';
import IconDollarSign from '@/components/icon/icon-dollar-sign.vue';
import IconSearch from '@/components/icon/icon-search.vue';
import IconCaretDown from '@/components/icon/icon-caret-down.vue';
import IconX from '@/components/icon/icon-x.vue';
import IconUser from '@/components/icon/icon-user.vue';
import IconPhone from '@/components/icon/icon-phone.vue';
import IconMail from '@/components/icon/icon-mail.vue';
import IconCreditCard from '@/components/icon/icon-credit-card.vue';
import IconMapPin from '@/components/icon/icon-map-pin.vue';
import IconCalendar from '@/components/icon/icon-calendar.vue';
import IconBell from '@/components/icon/icon-bell.vue';
import IconMessage2 from '@/components/icon/icon-message-2.vue';

const tabs = [
  { value: 'bookings', label: 'Bookings' },
  { value: 'subscriptions', label: 'Subscriptions' },
  { value: 'providers', label: 'Providers' },
];

const activeTab = ref('bookings');
const searchQuery = ref('');

const filterType = ref('all');
const filterTrip = ref('all');
const filterStatus = ref('all');
const showTypeDropdown = ref(false);
const showTripDropdown = ref(false);
const showStatusDropdown = ref(false);

const filterTypeLabel = computed(() => (filterType.value === 'all' ? 'All Types' : filterType.value));
const filterTripLabel = computed(() => (filterTrip.value === 'all' ? 'All Trips' : filterTrip.value));
const filterStatusLabel = computed(() => (filterStatus.value === 'all' ? 'All Status' : filterStatus.value));

type BookingRow = {
  id: string;
  bookingId: string;
  passenger: string;
  route: string;
  type: 'Inter-State' | 'Intra-State';
  provider: string;
  payment: string;
  fare: string;
  status: string;
  statusClass: string;
};

type JourneyPoint = { city: string; address: string; time: string; date: string };
type Journey = { origin: JourneyPoint; destination: JourneyPoint };

type BookingDetails = {
  bookingId: string;
  status: string;
  statusBadgeClass: string;
  type: 'Inter-State' | 'Intra-State';
  tripType: string;
  provider: string;
  providerType: string;
  tripRef: string;
  passengerName: string;
  passengerPhone: string;
  passengerEmail: string;
  emergencyContact: string;
  additionalPassengerCount?: number;
  additionalPassengers?: { name: string; phone: string; email: string; seat: string }[];
  paymentMethodLabel: string;
  paymentCardMask: string;
  paymentGateway: string;
  paymentStatus: string;
  journey: Journey;
  returnJourney?: Journey;
  seatNumber: string;
  seatType: string;
  amenities: string[];
  paymentSummaryText: string;
  totalAmount: string;
};

const defaultJourney: Journey = {
  origin: { city: 'Lagos', address: '123 Main St, Downtown', time: '08:00', date: '2024-01-15' },
  destination: { city: 'Abuja', address: '123 Main St, Downtown', time: '16:30', date: '2024-01-15' },
};

const returnJourneyExample: Journey = {
  origin: { city: 'Lagos', address: '123 Main St, Downtown', time: '08:00', date: '2024-01-16' },
  destination: { city: 'Abuja', address: '123 Main St, Downtown', time: '19:30', date: '2024-01-15' },
};

const bookingDetailsMap: Record<string, BookingDetails> = {
  '1': {
    bookingId: 'BB001',
    status: 'Confirmed',
    statusBadgeClass: 'bg-[#dbeafe] text-[#2563eb]',
    type: 'Inter-State',
    tripType: 'One-Way',
    provider: 'God is Good Motors',
    providerType: 'Third-Party Transport',
    tripRef: 'GIG-Express-101',
    passengerName: 'Mark Thompson',
    passengerPhone: '+1 234-567-8901',
    passengerEmail: 'mark.t@email.com',
    emergencyContact: '+1 234-567-9001',
    paymentMethodLabel: 'Visa Debit Card',
    paymentCardMask: '**** 4242',
    paymentGateway: 'Paystack',
    paymentStatus: 'Paid',
    journey: defaultJourney,
    seatNumber: '12A',
    seatType: 'Window seat',
    amenities: ['WIFI', 'Power Outlet', 'Reclining Seat', 'Refreshments'],
    paymentSummaryText: '1 passenger(s) x Business',
    totalAmount: '₦125,000',
  },
  '2': {
    bookingId: 'BB001',
    status: 'Completed',
    statusBadgeClass: 'bg-[#dcfce7] text-[#16a34a]',
    type: 'Intra-State',
    tripType: 'One-Way',
    provider: 'God is Good Motors',
    providerType: 'Third-Party Transport',
    tripRef: 'GIG-Express-101',
    passengerName: 'Mark Thompson',
    passengerPhone: '+1 234-667-8801',
    passengerEmail: 'mark.t@email.com',
    emergencyContact: '+1234-557-9001',
    paymentMethodLabel: 'Visa Debit Card',
    paymentCardMask: '**** 4242',
    paymentGateway: 'Paystack',
    paymentStatus: 'Paid',
    journey: defaultJourney,
    seatNumber: '12A',
    seatType: 'Window seat',
    amenities: ['WIFI', 'Power Outlet', 'Reclining Seat', 'Refreshments'],
    paymentSummaryText: '1 passenger(s) x Business',
    totalAmount: '₦30,500',
  },
  '3': {
    bookingId: 'BB001',
    status: 'Pending',
    statusBadgeClass: 'bg-[#ffedd5] text-[#ea580c]',
    type: 'Inter-State',
    tripType: 'One-Way',
    provider: 'God is Good Motors',
    providerType: 'Third-Party Transport',
    tripRef: 'GIG-Express-101',
    passengerName: 'Mark Thompson',
    passengerPhone: '+1 234-567-8901',
    passengerEmail: 'mark.t@email.com',
    emergencyContact: '+1 234-567-9001',
    paymentMethodLabel: 'Visa Debit Card',
    paymentCardMask: '**** 4242',
    paymentGateway: 'Paystack',
    paymentStatus: 'Pending',
    journey: { ...defaultJourney, destination: { ...defaultJourney.destination, time: '18:30' } },
    seatNumber: '12A',
    seatType: 'Window seat',
    amenities: ['WIFI', 'Power Outlet', 'Reclining Seat', 'Refreshments'],
    paymentSummaryText: '1 passenger(s) x Business',
    totalAmount: '₦125,000',
  },
  '4': {
    bookingId: 'BB001',
    status: 'Cancelled',
    statusBadgeClass: 'bg-[#fee2e2] text-[#dc2626]',
    type: 'Intra-State',
    tripType: 'Return Trip',
    provider: 'God is Good Motors',
    providerType: 'Inter-State & City Transport',
    tripRef: 'GIG-Express-101',
    passengerName: 'Quinn Roberts',
    passengerPhone: '+1 234-567-0005',
    passengerEmail: 'mark.s@email.com',
    emergencyContact: '+1 234-567-0005',
    additionalPassengerCount: 4,
    additionalPassengers: [
      { name: 'Anna Roberts', phone: '+1 234-567-0001', email: 'mark.s@email.com', seat: '7' },
      { name: 'Anna Roberts', phone: '+1 234-567-0002', email: 'mark.s@email.com', seat: '4' },
      { name: 'Anna Roberts', phone: '+1 234-567-0003', email: 'mark.s@email.com', seat: '6' },
    ],
    paymentMethodLabel: 'Mastercard Credit',
    paymentCardMask: '**** 5078',
    paymentGateway: 'Flutterwave',
    paymentStatus: 'Refunded',
    journey: defaultJourney,
    returnJourney: returnJourneyExample,
    seatNumber: '12A',
    seatType: 'Window seat',
    amenities: ['WiFi', 'Power Outlet', 'Reclining Seat', 'Refreshments'],
    paymentSummaryText: '1 passenger x ₦31,250 + business',
    totalAmount: '₦125,000',
  },
};

const bookingRows = ref<BookingRow[]>([
  { id: '1', bookingId: 'BB001', passenger: 'Mark Thompson', route: 'Lagos → Abuja...', type: 'Inter-State', provider: 'God is Good Motors', payment: 'card ****4242...', fare: '₦1,500', status: 'Confirmed', statusClass: 'bg-[#dbeafe] text-[#2563eb]' },
  { id: '2', bookingId: 'BB001', passenger: 'Mark Thompson', route: 'Lagos → Abuja...', type: 'Intra-State', provider: 'God is Good Motors', payment: 'Wallet ****4242...', fare: '₦1,500', status: 'Completed', statusClass: 'bg-[#dcfce7] text-[#16a34a]' },
  { id: '3', bookingId: 'BB001', passenger: 'Mark Thompson', route: 'Lagos → Abuja...', type: 'Inter-State', provider: 'God is Good Motors', payment: 'Bank Transfer ****4242...', fare: '₦1,500', status: 'Pending', statusClass: 'bg-[#ffedd5] text-[#ea580c]' },
  { id: '4', bookingId: 'BB001', passenger: 'Mark Thompson', route: 'Lagos → Abuja...', type: 'Intra-State', provider: 'God is Good Motors', payment: 'card ****4242...', fare: '₦1,500', status: 'Cancelled', statusClass: 'bg-[#fee2e2] text-[#dc2626]' },
]);

const showBookingDetailsModal = ref(false);
const selectedBookingId = ref<string | null>(null);
const bookingDetails = computed<BookingDetails | null>(() =>
  selectedBookingId.value ? bookingDetailsMap[selectedBookingId.value] ?? null : null
);

function viewBooking(row: BookingRow) {
  selectedBookingId.value = row.id;
  showBookingDetailsModal.value = true;
}

function closeBookingDetailsModal() {
  showBookingDetailsModal.value = false;
  selectedBookingId.value = null;
}

// Send Reminder modal
type ReminderContext = {
  passengerName: string;
  passengerEmail: string;
  passengerPhone: string;
  routeLabel: string;
  departureLabel: string;
  tripRef: string;
  seatNumber: string;
};

const showSendReminderModal = ref(false);
const reminderContext = ref<ReminderContext | null>(null);
const sendReminderVia = ref<'email' | 'sms' | 'push'>('email');
const sendReminderTemplate = ref<'departure' | 'booking' | 'checkin' | 'custom'>('departure');
const sendReminderCustomMessage = ref('');

const reminderTemplateBodies: Record<string, string> = {
  departure: 'Your bus departs soon! Please arrive at the terminal 30 minutes before departure.',
  booking: 'Your booking has been confirmed. Please keep this message for reference.',
  checkin: "Don't forget to check in at the terminal counter before boarding.",
};

const messagePreviewText = computed(() => {
  const ctx = reminderContext.value;
  if (!ctx) return '';
  const body = sendReminderTemplate.value === 'custom'
    ? sendReminderCustomMessage.value || 'Custom Message'
    : reminderTemplateBodies[sendReminderTemplate.value] ?? '';
  return `Hi ${ctx.passengerName},

${body}

📍 Route: ${ctx.routeLabel}
🚌 Bus: ${ctx.tripRef}
💺 Seat: ${ctx.seatNumber}
🗓️ Departure: ${ctx.departureLabel}

Safe travels!
- Transport Admin`;
});

function openSendReminderModal() {
  const details = bookingDetails.value;
  if (!details) return;
  reminderContext.value = {
    passengerName: details.passengerName,
    passengerEmail: details.passengerEmail,
    passengerPhone: details.passengerPhone,
    routeLabel: `${details.journey.origin.city} → ${details.journey.destination.city}`,
    departureLabel: `${details.journey.origin.date} ${details.journey.origin.time}`,
    tripRef: details.tripRef,
    seatNumber: details.seatNumber,
  };
  sendReminderVia.value = 'email';
  sendReminderTemplate.value = 'departure';
  sendReminderCustomMessage.value = '';
  showSendReminderModal.value = true;
}

function closeSendReminderModal() {
  showSendReminderModal.value = false;
  reminderContext.value = null;
}

function submitSendReminder() {
  // Placeholder: send via API
  closeSendReminderModal();
}

// Assign Seat modal
type AssignSeatContext = {
  bookingId: string;
  passengerName: string;
  bus: string;
  class: string;
  seatsRequired: number;
  takenSeats: string[];
};

const assignSeatRows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const assignSeatColumns = ['A', 'B', 'C', 'D'];

const showAssignSeatModal = ref(false);
const assignSeatContext = ref<AssignSeatContext | null>(null);
const assignSeatSelectedList = ref<string[]>([]);

// Default taken seats for demo (matches common pattern from image)
const defaultTakenSeats = ['1A', '1C', '1D', '2B', '4A', '4B', '5A', '5B', '5C', '6A', '6B', '7A', '8A', '8B', '9A', '9B', '9D', '10A', '11B', '12A', '12B'];

function getAssignSeatId(row: number, col: string): string {
  return `${row}${col}`;
}

function getAssignSeatStatus(row: number, col: string): 'available' | 'taken' | 'selected' {
  const ctx = assignSeatContext.value;
  if (!ctx) return 'available';
  const id = getAssignSeatId(row, col);
  if (ctx.takenSeats.includes(id)) return 'taken';
  if (assignSeatSelectedList.value.includes(id)) return 'selected';
  return 'available';
}

function getAssignSeatButtonClass(row: number, col: string): string {
  const status = getAssignSeatStatus(row, col);
  if (status === 'taken') return 'bg-[#333] text-white cursor-not-allowed';
  if (status === 'selected') return 'bg-[#22c55e] text-white border border-[#16a34a]';
  return 'border border-[#d1d5db] bg-white text-[#374151] hover:border-[#333] hover:bg-[#f8fafc]';
}

function toggleAssignSeat(row: number, col: string) {
  const status = getAssignSeatStatus(row, col);
  if (status === 'taken') return;
  const id = getAssignSeatId(row, col);
  const ctx = assignSeatContext.value;
  if (!ctx) return;
  const list = [...assignSeatSelectedList.value];
  const idx = list.indexOf(id);
  if (idx >= 0) {
    list.splice(idx, 1);
  } else if (list.length < ctx.seatsRequired) {
    list.push(id);
  }
  assignSeatSelectedList.value = list;
}

function openAssignSeatModal() {
  const details = bookingDetails.value;
  if (!details) return;
  assignSeatContext.value = {
    bookingId: details.bookingId,
    passengerName: details.passengerName,
    bus: details.tripRef || 'BRT-102',
    class: 'Standard',
    seatsRequired: 1,
    takenSeats: [...defaultTakenSeats],
  };
  assignSeatSelectedList.value = [];
  showAssignSeatModal.value = true;
}

function closeAssignSeatModal() {
  showAssignSeatModal.value = false;
  assignSeatContext.value = null;
  assignSeatSelectedList.value = [];
}

function submitAssignSeat() {
  if (assignSeatSelectedList.value.length !== assignSeatContext.value?.seatsRequired) return;
  // Placeholder: persist assignment
  closeAssignSeatModal();
}

// Confirm Booking modal
type ConfirmBookingContext = {
  bookingId: string;
  passengerName: string;
  routeLabel: string;
  bus: string;
  totalAmount: string;
  paymentMethodLabel: string;
  paymentCardMask: string;
};

const showConfirmBookingModal = ref(false);
const confirmBookingContext = ref<ConfirmBookingContext | null>(null);
const confirmBookingPaymentVerified = ref(false);
const confirmBookingDetailsCorrect = ref(false);
const confirmBookingSendVia = ref<'email' | 'sms' | 'push'>('email');
const confirmBookingAdminNotes = ref('');

function openConfirmBookingModal() {
  const details = bookingDetails.value;
  if (!details) return;
  confirmBookingContext.value = {
    bookingId: details.bookingId,
    passengerName: details.passengerName,
    routeLabel: `${details.journey.origin.city} → ${details.journey.destination.city}`,
    bus: details.tripRef || 'BRT-102',
    totalAmount: details.totalAmount,
    paymentMethodLabel: details.paymentMethodLabel,
    paymentCardMask: details.paymentCardMask,
  };
  confirmBookingPaymentVerified.value = false;
  confirmBookingDetailsCorrect.value = false;
  confirmBookingSendVia.value = 'email';
  confirmBookingAdminNotes.value = '';
  showConfirmBookingModal.value = true;
}

function closeConfirmBookingModal() {
  showConfirmBookingModal.value = false;
  confirmBookingContext.value = null;
}

function submitConfirmBooking() {
  closeConfirmBookingModal();
}

// Process Refund modal
type ProcessRefundContext = {
  bookingId: string;
  passengerName: string;
  routeLabel: string;
  departureLabel: string;
  totalAmount: string;
  paymentMethodLabel: string;
  paymentCardMask: string;
};

const showProcessRefundModal = ref(false);
const processRefundContext = ref<ProcessRefundContext | null>(null);
const refundType = ref<'full' | 'partial'>('full');
const refundPartialAmount = ref('');
const refundTo = ref<'original' | 'wallet' | 'bank'>('original');
const refundReason = ref('');
const refundVerifiedEligibility = ref(false);
const refundNotifyCustomer = ref(false);

function openProcessRefundModal() {
  const details = bookingDetails.value;
  if (!details) return;
  processRefundContext.value = {
    bookingId: details.bookingId,
    passengerName: details.passengerName,
    routeLabel: `${details.journey.origin.city} → ${details.journey.destination.city}`,
    departureLabel: `${details.journey.origin.date} ${details.journey.origin.time}`,
    totalAmount: details.totalAmount,
    paymentMethodLabel: details.paymentMethodLabel,
    paymentCardMask: details.paymentCardMask,
  };
  refundType.value = 'full';
  refundPartialAmount.value = '';
  refundTo.value = 'original';
  refundReason.value = '';
  refundVerifiedEligibility.value = false;
  refundNotifyCustomer.value = false;
  showProcessRefundModal.value = true;
}

function closeProcessRefundModal() {
  showProcessRefundModal.value = false;
  processRefundContext.value = null;
}

function submitProcessRefund() {
  closeProcessRefundModal();
}
</script>
