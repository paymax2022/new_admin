<template>
  <div class="min-h-screen bg-white p-6 space-y-6">
    <!-- Header -->
    <div class="flex flex-col gap-2">
      <h1 class="text-2xl font-semibold text-[#111827]">Riders Management</h1>
      <p class="text-sm text-[#6b7280]">Manage courier profiles and approvals</p>
    </div>

    <!-- Navigation Tabs -->
    <div class="inline-flex gap-1 bg-white p-1 rounded-lg border border-[#e5e7eb]">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        :class="[
          'px-4 py-2 text-sm font-medium transition-all rounded-lg',
          activeTab === tab.id
            ? 'bg-[#f3f4f6] text-[#111827] shadow-sm'
            : 'bg-transparent text-[#6b7280] hover:bg-[#f9fafb]'
        ]"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Active Riders Section -->
    <div class="rounded-xl bg-white border border-[#e5e7eb] shadow-sm overflow-hidden">
      <!-- Section Header with Filters -->
      <div class="px-6 py-4 border-b border-[#e5e7eb] bg-[#f9fafb] flex items-center justify-between">
        <h2 class="text-lg font-semibold text-[#111827]">
          <span v-if="activeTab === 'active'">Active Riders</span>
          <span v-else-if="activeTab === 'pending'">Pending Approvals</span>
          <span v-else-if="activeTab === 'suspended'">Suspended Rider</span>
        </h2>
        <div class="flex items-center gap-3">
          <!-- All Status Filter -->
          <div class="relative">
            <select
              v-model="statusFilter"
              class="appearance-none rounded-lg border border-[#e5e7eb] bg-white px-4 py-2 pr-10 text-sm font-medium text-[#374151] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20"
            >
              <option value="">All Status</option>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
            </select>
            <IconCaretsDown class="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9ca3af]" />
          </div>

          <!-- All Zone Filter -->
          <div class="relative">
            <select
              v-model="zoneFilter"
              class="appearance-none rounded-lg border border-[#e5e7eb] bg-white px-4 py-2 pr-10 text-sm font-medium text-[#374151] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20"
            >
              <option value="">All Zone</option>
              <option value="zone-a">Zone A</option>
              <option value="zone-b">Zone B</option>
              <option value="zone-c">Zone C</option>
            </select>
            <IconCaretsDown class="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9ca3af]" />
          </div>

          <!-- All Vehicles Filter -->
          <div class="relative">
            <select
              v-model="vehicleFilter"
              class="appearance-none rounded-lg border border-[#e5e7eb] bg-white px-4 py-2 pr-10 text-sm font-medium text-[#374151] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20"
            >
              <option value="">All Vehicles</option>
              <option value="Bike">Bike</option>
              <option value="Car">Car</option>
            </select>
            <IconCaretsDown class="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9ca3af]" />
          </div>
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <!-- Active Riders Table -->
        <table v-if="activeTab === 'active'" class="min-w-full divide-y divide-[#e5e7eb]">
          <thead class="bg-[#f9fafb]">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-semibold text-[#374151] uppercase tracking-wider">Rider ID</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-[#374151] uppercase tracking-wider">Name</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-[#374151] uppercase tracking-wider">Vehicle</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-[#374151] uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-[#374151] uppercase tracking-wider">Deliveries</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-[#374151] uppercase tracking-wider">Rating</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-[#374151] uppercase tracking-wider">Earnings</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-[#374151] uppercase tracking-wider">Score</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-[#374151] uppercase tracking-wider">Last Active</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-[#e5e7eb]">
            <tr
              v-for="(rider, index) in paginatedRiders"
              :key="rider.id"
              :class="[
                'hover:bg-[#f9fafb] transition-colors cursor-pointer',
                index === 0 ? 'bg-[#f3f4f6]' : ''
              ]"
              @click="openRiderModal(rider)"
            >
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#111827]">{{ rider.riderId }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-[#374151]">{{ rider.name }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-[#374151]">{{ rider.vehicle }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getStatusClass(rider.status)">
                  {{ rider.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-[#374151]">{{ rider.deliveries }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center gap-1">
                  <IconStar class="h-4 w-4 text-[#fbbf24]" />
                  <span class="text-sm text-[#374151]">{{ rider.rating }}</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#111827]">{{ rider.earnings }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getScoreClass(rider.score)">
                  {{ rider.score.toFixed(1) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-[#374151]">{{ rider.lastActive }}</td>
            </tr>
          </tbody>
        </table>

        <!-- Pending Approvals Table -->
        <table v-if="activeTab === 'pending'" class="min-w-full divide-y divide-[#e5e7eb]">
          <thead class="bg-[#f9fafb]">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-semibold text-[#374151] uppercase tracking-wider">Name</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-[#374151] uppercase tracking-wider">Phone</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-[#374151] uppercase tracking-wider">Vehicle</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-[#374151] uppercase tracking-wider">Docs Submitted</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-[#374151] uppercase tracking-wider">Applied Date</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-[#374151] uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-[#374151] uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-[#e5e7eb]">
            <tr
              v-for="(rider, index) in paginatedRiders"
              :key="rider.id"
              :class="[
                'hover:bg-[#f9fafb] transition-colors',
                index === 0 ? 'bg-[#f3f4f6]' : ''
              ]"
            >
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#111827]">{{ rider.name }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-[#374151]">{{ rider.phone || '1234567898765' }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-[#374151]">{{ rider.vehicle }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="text-sm font-medium text-[#2563eb]">{{ rider.docsSubmitted || '4/4' }}</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-[#374151]">{{ rider.appliedDate || rider.deliveries }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white bg-[#f59e0b]">
                  Pending
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center gap-2">
                  <button
                    @click.stop="handleApprove(rider)"
                    class="px-3 py-1 rounded-lg bg-[#2563eb] text-xs font-medium text-white hover:bg-[#1d4ed8] transition-colors"
                  >
                    Approve
                  </button>
                  <button
                    @click.stop="openSuspensionModalForRider(rider)"
                    class="px-3 py-1 rounded-lg bg-[#ef4444] text-xs font-medium text-white hover:bg-[#dc2626] transition-colors"
                  >
                    Suspend
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Suspended Riders Table -->
        <table v-if="activeTab === 'suspended'" class="min-w-full divide-y divide-[#e5e7eb]">
          <thead class="bg-[#f9fafb]">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-semibold text-[#374151] uppercase tracking-wider">Name</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-[#374151] uppercase tracking-wider">Phone</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-[#374151] uppercase tracking-wider">Vehicle</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-[#374151] uppercase tracking-wider">Docs Submitted</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-[#374151] uppercase tracking-wider">Applied Date</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-[#374151] uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-[#374151] uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-[#e5e7eb]">
            <tr
              v-for="(rider, index) in paginatedRiders"
              :key="rider.id"
              :class="[
                'hover:bg-[#f9fafb] transition-colors',
                index === 0 ? 'bg-[#f3f4f6]' : ''
              ]"
            >
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#111827]">{{ rider.name }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-[#374151]">{{ rider.phone || '1234567898765' }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-[#374151]">{{ rider.vehicle }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="text-sm font-medium text-[#2563eb]">{{ rider.docsSubmitted || '4/4' }}</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-[#374151]">{{ rider.appliedDate || rider.deliveries }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white bg-[#ef4444]">
                  Suspended
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center gap-2">
                  <button
                    @click.stop="handleReactivate(rider)"
                    class="px-3 py-1 rounded-lg bg-[#10b981] text-xs font-medium text-white hover:bg-[#059669] transition-colors"
                  >
                    Reactivate
                  </button>
                  <button
                    @click.stop="openRiderModal(rider)"
                    class="px-3 py-1 rounded-lg border border-[#e5e7eb] bg-white text-xs font-medium text-[#374151] hover:bg-[#f9fafb] transition-colors"
                  >
                    View
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="px-6 py-4 border-t border-[#e5e7eb] bg-[#f9fafb] flex items-center justify-center">
        <div class="flex items-center gap-2">
          <!-- Previous Button -->
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="w-8 h-8 flex items-center justify-center rounded-lg border border-[#e5e7eb] text-[#374151] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white transition-colors"
          >
            <IconArrowLeft class="h-4 w-4" />
          </button>

          <!-- Page Numbers -->
          <button
            v-for="page in visiblePages"
            :key="page"
            @click="goToPage(page)"
            :class="[
              'w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors',
              page === currentPage
                ? 'bg-[#2563eb] text-white border border-[#2563eb]'
                : 'border border-[#e5e7eb] text-[#374151] hover:bg-white'
            ]"
          >
            {{ page }}
          </button>

          <!-- Ellipsis after pages -->
          <span v-if="showEndEllipsis" class="px-2 text-[#374151]">—</span>

          <!-- Last Page (if not already shown) -->
          <button
            v-if="totalPages > 7 && currentPage < totalPages - 3"
            @click="goToPage(totalPages)"
            :class="[
              'w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium border border-[#e5e7eb] text-[#374151] hover:bg-white transition-colors',
              currentPage === totalPages ? 'bg-[#2563eb] text-white border-[#2563eb]' : ''
            ]"
          >
            {{ totalPages }}
          </button>

          <!-- Next Button -->
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="w-8 h-8 flex items-center justify-center rounded-lg border border-[#e5e7eb] text-[#374151] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white transition-colors"
          >
            <IconArrowRight class="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>

    <!-- Rider Details Modal (Slide-in from right) -->
    <TransitionRoot appear :show="showRiderModal" as="template">
      <Dialog as="div" @close="closeRiderModal" class="relative z-50">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/40"></div>
        </TransitionChild>

        <div class="fixed inset-y-0 right-0 overflow-y-auto">
          <div class="flex min-h-full justify-end">
            <TransitionChild
              as="template"
              enter="transform transition ease-in-out duration-300"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transform transition ease-in-out duration-300"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
            >
              <DialogPanel class="w-full max-w-2xl transform overflow-hidden bg-white shadow-xl transition-all rounded-tl-xl rounded-bl-xl">
                <div class="flex flex-col h-screen">
                  <!-- Header -->
                  <div class="flex items-center justify-between px-6 py-5 border-b border-[#e5e7eb]">
                    <div>
                      <DialogTitle class="text-xl font-semibold text-[#111827]">
                        {{ selectedRider?.name }}
                      </DialogTitle>
                      <p class="text-sm text-[#6b7280] mt-1">
                        <span v-if="activeTab === 'pending'">
                          Application ID: {{ selectedRider?.applicationId || selectedRider?.riderId }} • {{ selectedRider?.vehicle }}
                        </span>
                        <span v-else>
                          Rider ID: {{ selectedRider?.riderId }} • {{ selectedRider?.vehicle }}
                        </span>
                      </p>
                    </div>
                    <button
                      @click="closeRiderModal"
                      class="text-[#6b7280] hover:text-[#111827] transition-colors p-1 rounded-lg hover:bg-[#f3f4f6]"
                    >
                      <IconX class="h-5 w-5" />
                    </button>
                  </div>

                  <!-- Content -->
                  <div class="flex-1 overflow-y-auto px-6 py-6 space-y-6">
                    <!-- Pending Approval Profile -->
                    <div v-if="activeTab === 'pending'" class="space-y-4">
                      <!-- Profile Picture and Name -->
                      <div class="flex gap-4">
                        <div class="flex-shrink-0">
                          <img
                            src="https://i.pravatar.cc/150?img=12"
                            :alt="selectedRider?.profileName || selectedRider?.name || 'Rider'"
                            class="h-20 w-20 rounded-full object-cover border-2 border-[#e5e7eb]"
                          />
                        </div>
                        <div class="flex-1">
                          <p class="text-lg font-semibold text-[#111827] mb-2">{{ selectedRider?.profileName || selectedRider?.name }}</p>
                          <p class="text-sm text-[#374151] mb-1">{{ selectedRider?.vehicleModel || selectedRider?.vehicle }} • {{ selectedRider?.vehiclePlate || 'LA12345' }}</p>
                          <div class="flex items-center gap-2 text-sm text-[#374151] mb-1">
                            <IconMail class="h-4 w-4 text-[#6b7280]" />
                            <span>{{ selectedRider?.email || 'tunde@gmail.com' }}</span>
                          </div>
                          <div class="flex items-center gap-2 text-sm text-[#374151]">
                            <IconPhone class="h-4 w-4 text-[#6b7280]" />
                            <span>{{ selectedRider?.phone || '+23405869449' }}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Active/Suspended Rider Profile Summary -->
                    <div v-else class="flex gap-4">
                      <!-- Profile Picture -->
                      <div class="flex-shrink-0">
                        <img
                          src="https://i.pravatar.cc/150?img=12"
                          :alt="selectedRider?.name || 'Rider'"
                          class="h-20 w-20 rounded-full object-cover border-2 border-[#e5e7eb]"
                        />
                      </div>
                      <!-- Metrics -->
                      <div class="flex-1 grid grid-cols-2 gap-4">
                        <div>
                          <p class="text-xs font-medium text-[#6b7280] mb-1">Total Deliveries</p>
                          <p class="text-lg font-semibold text-[#111827]">{{ selectedRider?.totalDeliveries || selectedRider?.deliveries || 0 }}</p>
                        </div>
                        <div>
                          <p class="text-xs font-medium text-[#6b7280] mb-1">On-time %</p>
                          <p class="text-lg font-semibold text-[#111827]">{{ selectedRider?.onTimePercentage || '93%' }}</p>
                        </div>
                        <div>
                          <p class="text-xs font-medium text-[#6b7280] mb-1">Acceptance</p>
                          <p class="text-lg font-semibold text-[#111827]">{{ selectedRider?.acceptance || '88%' }}</p>
                        </div>
                        <div>
                          <p class="text-xs font-medium text-[#6b7280] mb-1">Rating</p>
                          <p class="text-lg font-semibold text-[#111827]">{{ selectedRider?.rating || '0' }}</p>
                        </div>
                        <div>
                          <p class="text-xs font-medium text-[#6b7280] mb-1">Earnings</p>
                          <p class="text-lg font-semibold text-[#111827]">{{ selectedRider?.earnings || '₦0' }}</p>
                        </div>
                        <div>
                          <p class="text-xs font-medium text-[#6b7280] mb-1">Complaints</p>
                          <p class="text-lg font-semibold text-[#111827]">{{ selectedRider?.complaints || 0 }}</p>
                        </div>
                      </div>
                    </div>

                    <!-- Action Buttons -->
                    <div class="flex gap-3">
                      <!-- Pending Approval Buttons -->
                      <template v-if="activeTab === 'pending'">
                        <button
                          @click="openSuspensionModal"
                          class="flex-1 px-4 py-2 rounded-lg bg-[#ef4444] text-sm font-medium text-white hover:bg-[#dc2626] transition-colors"
                        >
                          Suspend
                        </button>
                        <button
                          @click="handleApprove"
                          class="flex-1 px-4 py-2 rounded-lg bg-[#10b981] text-sm font-medium text-white hover:bg-[#059669] transition-colors"
                        >
                          Approve
                        </button>
                      </template>
                      <!-- Suspended Rider Buttons -->
                      <template v-else-if="activeTab === 'suspended'">
                        <button class="flex-1 px-4 py-2 rounded-lg border border-[#e5e7eb] bg-white text-sm font-medium text-[#374151] hover:bg-[#f9fafb] transition-colors">
                          Message
                        </button>
                        <button class="flex-1 px-4 py-2 rounded-lg border border-[#e5e7eb] bg-white text-sm font-medium text-[#374151] hover:bg-[#f9fafb] transition-colors">
                          Pay Rider
                        </button>
                        <button
                          @click="handleActivate"
                          class="flex-1 px-4 py-2 rounded-lg bg-[#10b981] text-sm font-medium text-white hover:bg-[#059669] transition-colors"
                        >
                          Activate
                        </button>
                      </template>
                      <!-- Active Rider Buttons -->
                      <template v-else>
                        <button class="flex-1 px-4 py-2 rounded-lg border border-[#e5e7eb] bg-white text-sm font-medium text-[#374151] hover:bg-[#f9fafb] transition-colors">
                          Message
                        </button>
                        <button class="flex-1 px-4 py-2 rounded-lg border border-[#e5e7eb] bg-white text-sm font-medium text-[#374151] hover:bg-[#f9fafb] transition-colors">
                          Pay Rider
                        </button>
                        <button
                          @click="openSuspensionModal"
                          class="flex-1 px-4 py-2 rounded-lg bg-[#ef4444] text-sm font-medium text-white hover:bg-[#dc2626] transition-colors"
                        >
                          Suspend
                        </button>
                      </template>
                    </div>

                    <!-- Vehicle Information (Only for Active/Suspended, not Pending) -->
                    <div v-if="activeTab === 'active' || activeTab === 'suspended'" class="flex gap-4 p-4 bg-[#f9fafb] rounded-lg border border-[#e5e7eb]">
                      <div class="flex-shrink-0">
                        <img
                          src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=96&h=64&fit=crop"
                          alt="Vehicle"
                          class="h-16 w-24 rounded-lg object-cover"
                        />
                      </div>
                      <div class="flex-1">
                        <p class="text-sm font-semibold text-[#111827] mb-1">Plate: {{ selectedRider?.vehiclePlate || 'ABC-123YZ' }}</p>
                        <p class="text-sm text-[#6b7280] mb-1">{{ selectedRider?.vehicleModel || 'Yamaha X-100' }}</p>
                        <p class="text-xs text-[#6b7280]">Last Active: {{ selectedRider?.lastActive || '2 mins ago' }}</p>
                      </div>
                    </div>

                    <!-- Documents Section (For Pending Approvals, show directly) -->
                    <div v-if="activeTab === 'pending'" class="space-y-4">
                      <div class="flex items-center gap-2 mb-4">
                        <IconPaperclip class="h-5 w-5 text-[#6b7280]" />
                        <h3 class="text-sm font-semibold text-[#111827]">Documents</h3>
                      </div>
                      <div class="grid grid-cols-2 gap-4">
                        <div
                          v-for="(doc, index) in selectedRider?.documents || []"
                          :key="index"
                          class="p-4 border border-[#e5e7eb] rounded-lg hover:bg-[#f9fafb] transition-colors"
                        >
                          <div class="flex items-start gap-3">
                            <div class="flex-shrink-0">
                              <div class="h-10 w-10 rounded-lg bg-[#f3f4f6] flex items-center justify-center">
                                <IconFile class="h-5 w-5 text-[#6b7280]" />
                              </div>
                            </div>
                            <div class="flex-1 min-w-0">
                              <p class="text-sm font-medium text-[#111827] truncate">{{ doc.name }}</p>
                              <p class="text-xs text-[#6b7280] mt-1">{{ doc.size }}</p>
                              <button class="text-xs text-[#2563eb] hover:underline mt-2">Preview</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Tabs (Only for Active/Suspended, not Pending) -->
                    <div v-if="activeTab === 'active' || activeTab === 'suspended'" class="border-b border-[#e5e7eb]">
                      <div class="flex gap-6">
                        <button
                          v-for="tab in detailTabs"
                          :key="tab.id"
                          @click="activeDetailTab = tab.id"
                          :class="[
                            'pb-3 px-1 text-sm font-medium transition-colors border-b-2',
                            activeDetailTab === tab.id
                              ? 'border-[#2563eb] text-[#2563eb]'
                              : 'border-transparent text-[#6b7280] hover:text-[#111827]'
                          ]"
                        >
                          {{ tab.label }}
                        </button>
                      </div>
                    </div>

                    <!-- Tab Content (Only for Active/Suspended, not Pending) -->
                    <div v-if="activeTab === 'active' || activeTab === 'suspended'" class="min-h-[200px]">
                      <!-- Documents Tab -->
                      <div v-if="activeDetailTab === 'documents'" class="space-y-4">
                        <div class="flex items-center gap-2 mb-4">
                          <IconPaperclip class="h-5 w-5 text-[#6b7280]" />
                          <h3 class="text-sm font-semibold text-[#111827]">Documents</h3>
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                          <div
                            v-for="(doc, index) in selectedRider?.documents || []"
                            :key="index"
                            class="p-4 border border-[#e5e7eb] rounded-lg hover:bg-[#f9fafb] transition-colors"
                          >
                            <div class="flex items-start gap-3">
                              <div class="flex-shrink-0">
                                <div class="h-10 w-10 rounded-lg bg-[#f3f4f6] flex items-center justify-center">
                                  <IconFile class="h-5 w-5 text-[#6b7280]" />
                                </div>
                              </div>
                              <div class="flex-1 min-w-0">
                                <p class="text-sm font-medium text-[#111827] truncate">{{ doc.name }}</p>
                                <p class="text-xs text-[#6b7280] mt-1">{{ doc.size }}</p>
                                <button class="text-xs text-[#2563eb] hover:underline mt-2">Preview</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <!-- Earning History Tab -->
                      <div v-if="activeDetailTab === 'earnings'" class="space-y-4">
                        <div class="overflow-x-auto">
                          <table class="min-w-full divide-y divide-[#e5e7eb]">
                            <thead class="bg-[#f9fafb]">
                              <tr>
                                <th class="px-4 py-3 text-left text-xs font-semibold text-[#374151] uppercase tracking-wider">Date</th>
                                <th class="px-4 py-3 text-left text-xs font-semibold text-[#374151] uppercase tracking-wider">Trips</th>
                                <th class="px-4 py-3 text-left text-xs font-semibold text-[#374151] uppercase tracking-wider">Earnings</th>
                              </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-[#e5e7eb]">
                              <tr
                                v-for="(earning, index) in selectedRider?.earningHistory || []"
                                :key="index"
                                class="hover:bg-[#f9fafb] transition-colors"
                              >
                                <td class="px-4 py-3 whitespace-nowrap text-sm text-[#111827]">{{ earning.date }}</td>
                                <td class="px-4 py-3 whitespace-nowrap text-sm text-[#374151]">{{ earning.trips }}</td>
                                <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-[#111827]">{{ earning.earnings }}</td>
                              </tr>
                              <tr v-if="!selectedRider?.earningHistory || selectedRider.earningHistory.length === 0">
                                <td colspan="3" class="px-4 py-8 text-center text-sm text-[#6b7280]">No earning history available</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <!-- Reviews Tab -->
                      <div v-if="activeDetailTab === 'reviews'" class="space-y-4">
                        <div
                          v-for="(review, index) in selectedRider?.reviews || []"
                          :key="index"
                          class="p-4 border border-[#e5e7eb] rounded-lg bg-white hover:bg-[#f9fafb] transition-colors"
                        >
                          <div class="flex items-start justify-between gap-4">
                            <div class="flex-1">
                              <div class="flex items-center gap-3 mb-2">
                                <p class="text-sm font-semibold text-[#111827]">{{ review.reviewerName }}</p>
                                <p class="text-xs text-[#6b7280]">{{ review.date }}</p>
                              </div>
                              <p class="text-sm text-[#374151]">{{ review.comment }}</p>
                            </div>
                            <div class="flex-shrink-0 flex items-center gap-1">
                              <IconStar class="h-4 w-4 text-[#fbbf24]" />
                              <span class="text-sm font-medium text-[#111827]">{{ review.rating }}</span>
                            </div>
                          </div>
                        </div>
                        <div v-if="!selectedRider?.reviews || selectedRider.reviews.length === 0" class="text-center py-12 text-[#6b7280]">
                          <p class="text-sm">No reviews available</p>
                        </div>
                      </div>

                      <!-- Logs Tab -->
                      <div v-if="activeDetailTab === 'logs'" class="space-y-4">
                        <div
                          v-for="(log, index) in selectedRider?.logs || []"
                          :key="index"
                          class="space-y-1"
                        >
                          <p class="text-sm text-[#6b7280]">{{ log.timestamp }}</p>
                          <p class="text-sm text-[#111827]">{{ log.description }}</p>
                        </div>
                        <div v-if="!selectedRider?.logs || selectedRider.logs.length === 0" class="text-center py-12 text-[#6b7280]">
                          <p class="text-sm">No logs available</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Suspension Reason Modal -->
    <TransitionRoot appear :show="showSuspensionModal" as="template">
      <Dialog as="div" @close="closeSuspensionModal" class="relative z-50">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/40 backdrop-blur-sm"></div>
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel class="w-full max-w-lg transform overflow-hidden rounded-xl bg-white shadow-xl transition-all">
                <!-- Header -->
                <div class="flex items-center justify-between px-6 py-5 border-b border-[#e5e7eb]">
                  <DialogTitle class="text-lg font-semibold text-[#111827] uppercase">
                    Reason for Suspension
                  </DialogTitle>
                  <button
                    @click="closeSuspensionModal"
                    class="text-[#6b7280] hover:text-[#111827] transition-colors p-1 rounded-lg hover:bg-[#f3f4f6]"
                  >
                    <IconX class="h-5 w-5" />
                  </button>
                </div>

                <!-- Content -->
                <div class="px-6 py-6 space-y-4">
                  <p class="text-sm text-[#6b7280]">
                    This message will be sent to the Rider. Make it specific and helpful so they can fix the issues.
                  </p>

                  <!-- Textarea -->
                  <div class="space-y-2">
                    <label class="flex items-center gap-2 text-sm font-medium text-[#374151]">
                      <IconPaperclip class="h-4 w-4 text-[#6b7280]" />
                      Write rejection message (required)
                    </label>
                    <textarea
                      v-model="suspensionReason"
                      rows="6"
                      placeholder="Reason for rejecting the application."
                      class="w-full rounded-lg border border-[#e5e7eb] bg-white px-4 py-3 text-sm text-[#111827] placeholder:text-[#9ca3af] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20 resize-none"
                    ></textarea>
                  </div>
                </div>

                <!-- Footer -->
                <div class="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#e5e7eb] bg-[#f9fafb]">
                  <button
                    @click="closeSuspensionModal"
                    class="px-4 py-2 rounded-lg border border-[#e5e7eb] bg-white text-sm font-medium text-[#374151] hover:bg-[#f9fafb] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    @click="handleSuspend"
                    class="px-4 py-2 rounded-lg bg-[#2563eb] text-sm font-medium text-white hover:bg-[#1d4ed8] transition-colors"
                  >
                    Send
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Suspension Confirmation Modal -->
    <TransitionRoot appear :show="showSuspensionConfirmModal" as="template">
      <Dialog as="div" @close="closeSuspensionConfirmModal" class="relative z-50">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/40 backdrop-blur-sm"></div>
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-xl bg-white shadow-xl transition-all">
                <!-- Header -->
                <div class="flex items-center justify-between px-6 py-5 border-b border-[#e5e7eb]">
                  <DialogTitle class="text-lg font-semibold text-[#111827] uppercase">
                    Are you sure you want to suspend this rider?
                  </DialogTitle>
                  <button
                    @click="closeSuspensionConfirmModal"
                    class="text-[#6b7280] hover:text-[#111827] transition-colors p-1 rounded-lg hover:bg-[#f3f4f6]"
                  >
                    <IconX class="h-5 w-5" />
                  </button>
                </div>

                <!-- Footer -->
                <div class="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#e5e7eb] bg-[#f9fafb]">
                  <button
                    @click="closeSuspensionConfirmModal"
                    class="px-4 py-2 rounded-lg border border-[#e5e7eb] bg-white text-sm font-medium text-[#374151] hover:bg-[#f9fafb] transition-colors"
                  >
                    No
                  </button>
                  <button
                    @click="handleConfirmSuspend"
                    class="px-4 py-2 rounded-lg bg-[#2563eb] text-sm font-medium text-white hover:bg-[#1d4ed8] transition-colors"
                  >
                    Yes
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';
import IconSearch from '@/components/icon/icon-search.vue';
import IconCaretsDown from '@/components/icon/icon-carets-down.vue';
import IconArrowLeft from '@/components/icon/icon-arrow-left.vue';
import IconArrowRight from '@/components/icon/icon-arrow-forward.vue';
import IconStar from '@/components/icon/icon-star.vue';
import IconX from '@/components/icon/icon-x.vue';
import IconCar from '@/components/icon/icon-car.vue';
import IconPaperclip from '@/components/icon/icon-paperclip.vue';
import IconFile from '@/components/icon/icon-file.vue';
import IconMail from '@/components/icon/icon-mail.vue';
import IconPhone from '@/components/icon/icon-phone.vue';

interface Document {
  name: string;
  size: string;
}

interface EarningHistory {
  date: string;
  trips: number;
  earnings: string;
}

interface Review {
  reviewerName: string;
  date: string;
  comment: string;
  rating: number;
}

interface Log {
  timestamp: string;
  description: string;
}

interface Rider {
  id: string;
  riderId: string;
  name: string;
  vehicle: string;
  status: string;
  deliveries: number;
  rating: number;
  earnings: string;
  score: number;
  lastActive: string;
  totalDeliveries?: number;
  onTimePercentage?: string;
  acceptance?: string;
  complaints?: number;
  vehiclePlate?: string;
  vehicleModel?: string;
  documents?: Document[];
  earningHistory?: EarningHistory[];
  reviews?: Review[];
  logs?: Log[];
  // Pending approvals fields
  phone?: string;
  docsSubmitted?: string;
  appliedDate?: string;
  email?: string;
  applicationId?: string;
  profileName?: string; // For display name in profile section
}

const searchQuery = ref('');
const statusFilter = ref('');
const zoneFilter = ref('');
const vehicleFilter = ref('');
const currentPage = ref(1);
const perPage = ref(3); // Show 3 items per page to demonstrate pagination
const activeTab = ref('active');
const showRiderModal = ref(false);
const selectedRider = ref<Rider | null>(null);
const activeDetailTab = ref('documents');
const showSuspensionModal = ref(false);
const showSuspensionConfirmModal = ref(false);
const suspensionReason = ref('');

// Suspended riders data
const suspendedRiders = ref<Rider[]>([
  {
    id: 's1',
    riderId: 'R304',
    name: 'Musa Ado',
    vehicle: 'Bike',
    status: 'Suspended',
    deliveries: 232,
    rating: 4.7,
    earnings: '₦89,000',
    score: 9.0,
    lastActive: '2 mins ago',
    phone: '1234567898765',
    docsSubmitted: '4/4',
    appliedDate: '232',
    email: 'musa@gmail.com',
    applicationId: 'R304',
    profileName: 'Musa Ado',
    vehiclePlate: 'ABC-123YZ',
    vehicleModel: 'Yamaha X-100',
  },
  {
    id: 's2',
    riderId: 'R305',
    name: 'Amina Bello',
    vehicle: 'Car',
    status: 'Suspended',
    deliveries: 12,
    rating: 4.7,
    earnings: '₦8,000',
    score: 5.0,
    lastActive: '7 mins ago',
    phone: '1234567898765',
    docsSubmitted: '3/4',
    appliedDate: '12',
    email: 'amina@gmail.com',
    applicationId: 'R305',
    profileName: 'Amina Bello',
    vehiclePlate: 'XYZ-789AB',
    vehicleModel: 'Honda Civic',
  },
  {
    id: 's3',
    riderId: 'R306',
    name: 'John Okoro',
    vehicle: 'Bike',
    status: 'Suspended',
    deliveries: 156,
    rating: 4.9,
    earnings: '₦67,500',
    score: 8.5,
    lastActive: '5 mins ago',
    phone: '1234567898766',
    docsSubmitted: '4/4',
    appliedDate: '45',
    email: 'john@gmail.com',
    applicationId: 'R306',
    profileName: 'John Okoro',
    vehiclePlate: 'DEF-456GH',
    vehicleModel: 'Suzuki',
  },
]);

// Pending approval riders data
const pendingApprovalRiders = ref<Rider[]>([
  {
    id: 'p1',
    riderId: 'R304',
    name: 'Musa Ado',
    vehicle: 'Car',
    status: 'Pending',
    deliveries: 0,
    rating: 4.7,
    earnings: '₦0',
    score: 0,
    lastActive: 'N/A',
    phone: '+23405869449',
    docsSubmitted: '4/4',
    appliedDate: '232',
    email: 'tunde@gmail.com',
    applicationId: 'R304',
    profileName: 'Tunde A.',
    vehiclePlate: 'LA12345',
    vehicleModel: 'Toyota',
    documents: [
      { name: 'Document1', size: '3.5MB' },
      { name: 'Document1', size: '3.5MB' },
      { name: 'Document1', size: '3.5MB' },
      { name: 'Document1', size: '3.5MB' },
    ],
  },
  {
    id: 'p2',
    riderId: 'P002',
    name: 'Grace Eze',
    vehicle: 'Car',
    status: 'Pending',
    deliveries: 0,
    rating: 4.7,
    earnings: '₦0',
    score: 0,
    lastActive: 'N/A',
    phone: '1234567898765',
    docsSubmitted: '3/4',
    appliedDate: '12',
    email: 'grace@gmail.com',
    applicationId: 'P002',
    profileName: 'Grace Eze',
    vehiclePlate: 'AB123CD',
    vehicleModel: 'Honda',
    documents: [
      { name: 'Document1', size: '2.1MB' },
      { name: 'Document2', size: '1.8MB' },
      { name: 'Document3', size: '1.5MB' },
    ],
  },
  {
    id: 'p3',
    riderId: 'P003',
    name: 'Michael Okafor',
    vehicle: 'Bike',
    status: 'Pending',
    deliveries: 0,
    rating: 4.5,
    earnings: '₦0',
    score: 0,
    lastActive: 'N/A',
    phone: '1234567898766',
    docsSubmitted: '4/4',
    appliedDate: '45',
  },
  {
    id: 'p4',
    riderId: 'P004',
    name: 'Amina Hassan',
    vehicle: 'Bike',
    status: 'Pending',
    deliveries: 0,
    rating: 4.8,
    earnings: '₦0',
    score: 0,
    lastActive: 'N/A',
    phone: '1234567898767',
    docsSubmitted: '2/4',
    appliedDate: '8',
  },
  {
    id: 'p5',
    riderId: 'P005',
    name: 'David Okoro',
    vehicle: 'Car',
    status: 'Pending',
    deliveries: 0,
    rating: 4.6,
    earnings: '₦0',
    score: 0,
    lastActive: 'N/A',
    phone: '1234567898768',
    docsSubmitted: '4/4',
    appliedDate: '67',
  },
]);

const tabs = [
  { id: 'active', label: 'Active Riders' },
  { id: 'pending', label: 'Pending Approvals' },
  { id: 'suspended', label: 'Suspended Rider' },
];

const detailTabs = [
  { id: 'documents', label: 'Documents' },
  { id: 'earnings', label: 'Earning History' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'logs', label: 'Logs' },
];

// Sample rider data
const riders = ref<Rider[]>([
  {
    id: '1',
    riderId: 'R304',
    name: 'Musa Ado',
    vehicle: 'Car',
    status: 'Online',
    deliveries: 330,
    rating: 3.7,
    earnings: '₦89,000',
    score: 9.0,
    lastActive: '2 mins ago',
    totalDeliveries: 124,
    onTimePercentage: '93%',
    acceptance: '88%',
    complaints: 1,
    vehiclePlate: 'ABC-123YZ',
    vehicleModel: 'Yamaha X-100',
    documents: [
      { name: 'Document1', size: '3.5MB' },
      { name: 'Document1', size: '3.5MB' },
      { name: 'Document1', size: '3.5MB' },
      { name: 'Document1', size: '3.5MB' },
    ],
    earningHistory: [
      { date: '2025-10-10', trips: 12, earnings: '₦4,500' },
      { date: '2025-10-9', trips: 12, earnings: '₦4,500' },
      { date: '2025-10-8', trips: 15, earnings: '₦5,200' },
      { date: '2025-10-7', trips: 10, earnings: '₦3,800' },
      { date: '2025-10-6', trips: 18, earnings: '₦6,100' },
    ],
    reviews: [
      { reviewerName: 'Jane Doe', date: '2025-10-08', comment: 'Great rider, on time!', rating: 5 },
      { reviewerName: 'John Smith', date: '2025-10-05', comment: 'Very professional and courteous.', rating: 5 },
      { reviewerName: 'Sarah Johnson', date: '2025-10-03', comment: 'Excellent service, highly recommended!', rating: 4 },
    ],
    logs: [
      { timestamp: 'Today, 10:15', description: 'Completed trip D101' },
      { timestamp: 'Yesterday, 17:02', description: 'Completed trip D101' },
      { timestamp: 'Yesterday, 14:30', description: 'Completed trip D098' },
      { timestamp: 'Yesterday, 11:45', description: 'Completed trip D095' },
      { timestamp: '2 days ago, 16:20', description: 'Completed trip D092' },
    ],
  },
  {
    id: '2',
    riderId: 'R305',
    name: 'Anima Sado',
    vehicle: 'Car',
    status: 'Offline',
    deliveries: 12,
    rating: 4.7,
    earnings: '₦8,000',
    score: 5.0,
    lastActive: '7 mins ago',
    totalDeliveries: 12,
    onTimePercentage: '85%',
    acceptance: '75%',
    complaints: 0,
    vehiclePlate: 'XYZ-789AB',
    vehicleModel: 'Honda Civic',
    documents: [
      { name: 'Document1', size: '2.1MB' },
      { name: 'Document2', size: '1.8MB' },
    ],
  },
  {
    id: '3',
    riderId: 'R306',
    name: 'John Okoro',
    vehicle: 'Bike',
    status: 'Online',
    deliveries: 156,
    rating: 4.9,
    earnings: '₦67,500',
    score: 8.5,
    lastActive: '5 mins ago',
  },
  {
    id: '4',
    riderId: 'R307',
    name: 'Fatima Usman',
    vehicle: 'Bike',
    status: 'Online',
    deliveries: 89,
    rating: 4.6,
    earnings: '₦45,200',
    score: 7.8,
    lastActive: '1 min ago',
  },
  {
    id: '5',
    riderId: 'R308',
    name: 'David Okafor',
    vehicle: 'Car',
    status: 'Offline',
    deliveries: 45,
    rating: 4.5,
    earnings: '₦32,100',
    score: 6.5,
    lastActive: '15 mins ago',
  },
  {
    id: '6',
    riderId: 'R309',
    name: 'Grace Adeyemi',
    vehicle: 'Bike',
    status: 'Online',
    deliveries: 201,
    rating: 4.8,
    earnings: '₦78,900',
    score: 9.2,
    lastActive: '3 mins ago',
  },
  {
    id: '7',
    riderId: 'R310',
    name: 'Emeka Nwankwo',
    vehicle: 'Bike',
    status: 'Online',
    deliveries: 134,
    rating: 4.7,
    earnings: '₦58,300',
    score: 8.0,
    lastActive: '4 mins ago',
  },
  {
    id: '8',
    riderId: 'R311',
    name: 'Aisha Ibrahim',
    vehicle: 'Car',
    status: 'Offline',
    deliveries: 67,
    rating: 4.4,
    earnings: '₦28,500',
    score: 6.0,
    lastActive: '20 mins ago',
  },
  {
    id: '9',
    riderId: 'R312',
    name: 'Chukwu Eze',
    vehicle: 'Bike',
    status: 'Online',
    deliveries: 178,
    rating: 4.9,
    earnings: '₦72,400',
    score: 8.8,
    lastActive: '1 min ago',
  },
  {
    id: '10',
    riderId: 'R313',
    name: 'Zainab Mohammed',
    vehicle: 'Bike',
    status: 'Online',
    deliveries: 95,
    rating: 4.6,
    earnings: '₦41,800',
    score: 7.5,
    lastActive: '6 mins ago',
  },
  {
    id: '11',
    riderId: 'R314',
    name: 'Oluwaseun Adebayo',
    vehicle: 'Car',
    status: 'Offline',
    deliveries: 23,
    rating: 4.3,
    earnings: '₦15,200',
    score: 5.5,
    lastActive: '30 mins ago',
  },
  {
    id: '12',
    riderId: 'R315',
    name: 'Ibrahim Sani',
    vehicle: 'Bike',
    status: 'Online',
    deliveries: 167,
    rating: 4.8,
    earnings: '₦69,100',
    score: 8.3,
    lastActive: '2 mins ago',
  },
  {
    id: '13',
    riderId: 'R316',
    name: 'Ngozi Okafor',
    vehicle: 'Bike',
    status: 'Online',
    deliveries: 112,
    rating: 4.7,
    earnings: '₦52,600',
    score: 7.9,
    lastActive: '8 mins ago',
  },
  {
    id: '14',
    riderId: 'R317',
    name: 'Tunde Lawal',
    vehicle: 'Car',
    status: 'Offline',
    deliveries: 34,
    rating: 4.2,
    earnings: '₦18,900',
    score: 5.8,
    lastActive: '25 mins ago',
  },
  {
    id: '15',
    riderId: 'R318',
    name: 'Maryam Abdullahi',
    vehicle: 'Bike',
    status: 'Online',
    deliveries: 145,
    rating: 4.9,
    earnings: '₦63,700',
    score: 8.6,
    lastActive: '3 mins ago',
  },
]);

// Filter riders based on search and filters
const filteredRiders = computed(() => {
  let result = riders.value;

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(
      (rider) =>
        rider.riderId.toLowerCase().includes(query) ||
        rider.name.toLowerCase().includes(query)
    );
  }

  // Status filter
  if (statusFilter.value) {
    result = result.filter((rider) => rider.status.toLowerCase() === statusFilter.value);
  }

  // Vehicle filter
  if (vehicleFilter.value) {
    result = result.filter((rider) => rider.vehicle === vehicleFilter.value);
  }

  // Tab filter
  if (activeTab.value === 'pending') {
    // Return pending approval riders
    return pendingApprovalRiders.value.filter((rider) => {
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        return (
          rider.name.toLowerCase().includes(query) ||
          rider.phone?.toLowerCase().includes(query)
        );
      }
      return true;
    });
  } else if (activeTab.value === 'suspended') {
    // Return suspended riders
    return suspendedRiders.value.filter((rider) => {
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        return (
          rider.name.toLowerCase().includes(query) ||
          rider.phone?.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }

  return result;
});

// Pagination calculations
const totalPages = computed(() => Math.ceil(filteredRiders.value.length / perPage.value));

const pagination = computed(() => {
  const startIndex = (currentPage.value - 1) * perPage.value;
  const endIndex = Math.min(startIndex + perPage.value, filteredRiders.value.length);
  return { startIndex, endIndex };
});

const paginatedRiders = computed(() => {
  return filteredRiders.value.slice(pagination.value.startIndex, pagination.value.endIndex);
});

// Visible pages for pagination
const visiblePages = computed(() => {
  const pages: number[] = [];
  const maxVisible = 5;
  
  if (totalPages.value <= 7) {
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);
    
    if (currentPage.value <= 3) {
      for (let i = 2; i <= 5; i++) {
        pages.push(i);
      }
    } else if (currentPage.value >= totalPages.value - 2) {
      for (let i = totalPages.value - 4; i <= totalPages.value; i++) {
        if (i > 1) pages.push(i);
      }
    } else {
      pages.push(currentPage.value - 1);
      pages.push(currentPage.value);
      pages.push(currentPage.value + 1);
    }
  }
  
  return pages;
});

const showEndEllipsis = computed(() => {
  return totalPages.value > 7 && currentPage.value < totalPages.value - 3;
});

// Get status badge class
const getStatusClass = (status: string) => {
  const baseClasses = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium';
  const statusClasses: Record<string, string> = {
    'Online': 'bg-[#d1fae5] text-[#065f46]',
    'Offline': 'bg-[#f3f4f6] text-[#111827]',
  };
  return `${baseClasses} ${statusClasses[status] || 'bg-[#f3f4f6] text-[#111827]'}`;
};

// Get score badge class
const getScoreClass = (score: number) => {
  const baseClasses = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white';
  if (score >= 8) {
    return `${baseClasses} bg-[#2563eb]`;
  } else if (score >= 6) {
    return `${baseClasses} bg-[#6366f1]`;
  } else {
    return `${baseClasses} bg-[#6b7280]`;
  }
};

// Pagination methods
const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

// Modal functions
const openRiderModal = (rider: Rider) => {
  selectedRider.value = rider;
  showRiderModal.value = true;
  activeDetailTab.value = 'documents';
};

const closeRiderModal = () => {
  showRiderModal.value = false;
  selectedRider.value = null;
};

// Suspension modal functions
const openSuspensionModal = () => {
  showSuspensionModal.value = true;
  suspensionReason.value = '';
};

const closeSuspensionModal = () => {
  showSuspensionModal.value = false;
  suspensionReason.value = '';
};

const handleSuspend = () => {
  if (!suspensionReason.value.trim()) {
    // You could add validation/error message here
    return;
  }
  // Show confirmation modal
  showSuspensionModal.value = false;
  showSuspensionConfirmModal.value = true;
};

const handleConfirmSuspend = () => {
  // Handle suspension logic here
  console.log('Suspending rider:', selectedRider.value?.name, 'Reason:', suspensionReason.value);
  closeSuspensionConfirmModal();
  closeRiderModal();
  // You might want to show a success message or update the rider status
};

const handleApprove = (rider?: Rider) => {
  const riderToApprove = rider || selectedRider.value;
  // Handle approval logic here
  console.log('Approving rider:', riderToApprove?.name);
  if (!rider) {
    closeRiderModal();
  }
  // You might want to show a success message or update the rider status
};

const handleReactivate = (rider: Rider) => {
  // Handle reactivation logic here
  console.log('Reactivating rider:', rider.name);
  // You might want to show a success message or update the rider status
};

const handleActivate = () => {
  // Handle activation logic here
  console.log('Activating rider:', selectedRider.value?.name);
  closeRiderModal();
  // You might want to show a success message or update the rider status
};

const openSuspensionModalForRider = (rider: Rider) => {
  selectedRider.value = rider;
  openSuspensionModal();
};

const closeSuspensionConfirmModal = () => {
  showSuspensionConfirmModal.value = false;
  suspensionReason.value = '';
};

// Reset to page 1 when filters change
watch([searchQuery, statusFilter, zoneFilter, vehicleFilter, activeTab], () => {
  currentPage.value = 1;
});
</script>

<style scoped>
/* Additional styles if needed */
</style>

