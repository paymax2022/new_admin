<template>
  <div class="min-h-screen bg-white p-5 md:p-6">
    <div class="mx-auto max-w-[1220px] space-y-4">
      <div class="flex items-start justify-between">
        <div>
          <h1 class="text-[30px] font-semibold leading-tight text-[#0f172a]">Drivers & Riders Management</h1>
          <p class="mt-1 text-sm text-[#64748b]">Manage driver registrations, approvals, and accounts</p>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-3 lg:grid-cols-5">
        <div v-for="item in cards" :key="item.label" class="rounded-lg border border-[#e5e7eb] bg-white p-4">
          <div class="flex items-center justify-between">
            <p class="text-xs text-[#64748b]">{{ item.label }}</p>
            <span class="inline-flex h-6 w-6 items-center justify-center rounded-md" :style="{ backgroundColor: item.bg }">
              <component :is="item.icon" class="h-3.5 w-3.5" :class="item.iconClass" />
            </span>
          </div>
          <p class="mt-4 text-[28px] font-semibold text-[#0f172a]">{{ item.value }}</p>
        </div>
      </div>

      <div class="rounded-lg border border-[#e5e7eb] bg-white p-3">
        <div class="mb-3 flex items-center justify-between">
          <div class="inline-flex rounded-lg bg-[#f1f5f9] p-1 text-xs">
            <button
              v-for="tab in tabs"
              :key="tab"
              @click="activeTab = tab"
              class="rounded-md px-4 py-2 font-medium transition"
              :class="activeTab === tab ? 'bg-white text-[#0f172a]' : 'text-[#94a3b8]'"
            >
              {{ tab }}
            </button>
          </div>
          <button class="rounded-md border border-[#e5e7eb] px-4 py-2 text-xs text-[#475569] hover:bg-[#f8fafc]">Export List</button>
        </div>

        <div class="mb-3 flex items-center gap-3">
          <div class="relative max-w-[260px] flex-1">
            <IconSearch class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94a3b8]" />
            <input
              v-model="search"
              placeholder="Search by name or email..."
              class="h-10 w-full rounded-md border border-[#e5e7eb] pl-9 pr-3 text-sm text-[#0f172a] placeholder:text-[#94a3b8] outline-none focus:border-[#cbd5e1]"
            />
          </div>
          <select class="h-10 rounded-md border border-[#e5e7eb] px-3 text-sm text-[#475569] outline-none">
            <option>Vehicle type</option>
            <option>Motorbike</option>
            <option>Car</option>
          </select>
          <select class="h-10 rounded-md border border-[#e5e7eb] px-3 text-sm text-[#475569] outline-none">
            <option>Status</option>
            <option>Pending Approval</option>
            <option>Verified</option>
            <option>Suspended</option>
          </select>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full border-collapse table-auto">
            <thead>
              <tr class="border-y border-[#e5e7eb] bg-[#fcfcfd] text-left text-xs font-semibold text-[#64748b]">
                <th class="px-3 py-3">Driver</th>
                <th class="px-3 py-3">Vehicle</th>
                <th class="px-3 py-3">Rating</th>
                <th class="px-3 py-3">Trips</th>
                <th class="px-3 py-3">Wallet</th>
                <th class="px-3 py-3">Verification</th>
                <th class="px-3 py-3">Status</th>
                <th class="w-[78px] px-2 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in filteredRows" :key="row.id" class="border-b border-[#f1f5f9] text-sm text-[#0f172a]">
                <td class="px-3 py-3">
                  <div class="flex items-center gap-3">
                    <img src="https://i.pravatar.cc/40?img=15" alt="avatar" class="h-7 w-7 rounded-full object-cover" />
                    <div>
                      <p class="font-medium">{{ row.name }}</p>
                      <p class="text-xs text-[#94a3b8]">{{ row.email }}</p>
                    </div>
                  </div>
                </td>
                <td class="px-3 py-3 text-[#334155]">{{ row.vehicle }}</td>
                <td class="px-3 py-3 text-[#334155]">
                  <span v-if="row.rating === 'N/A'">{{ row.rating }}</span>
                  <span v-else class="inline-flex items-center gap-1">
                    <IconStar class="h-4 w-4 text-[#eab308]" />
                    {{ row.rating }}
                  </span>
                </td>
                <td class="px-3 py-3 text-[#334155]">{{ row.trips }}</td>
                <td class="px-3 py-3 text-[#334155]">{{ row.wallet }}</td>
                <td class="px-3 py-3" :class="row.verification === 'Verified' ? 'text-[#16a34a]' : 'text-[#f59e0b]'">{{ row.verification }}</td>
                <td class="px-3 py-3">
                  <span
                    class="rounded-full px-3 py-1 text-xs font-medium"
                    :class="getStatusClass(row.status)"
                  >
                    {{ row.status }}
                  </span>
                </td>
                <td v-if="activeTab === 'Suspended'" class="px-3 py-3 text-[#334155]">{{ row.suspensionReason || '—' }}</td>
                <td class="relative px-2 py-3 text-left">
                  <button class="rounded-md p-1 text-[#64748b] hover:bg-[#f8fafc]" @click.stop="openActionId = openActionId === row.id ? null : row.id">
                    <IconHorizontalDots class="h-4 w-4" />
                  </button>
                  <div v-if="openActionId === row.id" class="absolute left-0 z-10 mt-2 w-40 rounded-md border border-[#e5e7eb] bg-white p-1 shadow-lg">
                    <button
                      class="flex w-full items-center gap-2 rounded px-2 py-2 text-left text-xs text-[#334155] hover:bg-[#f8fafc]"
                      @click.stop="openDetails(row)"
                    >
                      <IconEye class="h-3.5 w-3.5" />
                      View Details
                    </button>
                    <button
                      v-if="activeTab === 'Verified Drivers'"
                      class="flex w-full items-center gap-2 rounded px-2 py-2 text-left text-xs text-[#334155] hover:bg-[#f8fafc]"
                      @click.stop="openWalletModal(row)"
                    >
                      <IconWallet class="h-3.5 w-3.5" />
                      Adjust wallet
                    </button>
                    <button
                      v-if="activeTab === 'Verified Drivers'"
                      class="flex w-full items-center gap-2 rounded px-2 py-2 text-left text-xs text-[#dc2626] hover:bg-[#fef2f2]"
                      @click.stop="openSuspendModal(row)"
                    >
                      <IconXCircle class="h-3.5 w-3.5" />
                      Suspend
                    </button>
                    <button
                      v-if="activeTab === 'Suspended'"
                      class="flex w-full items-center gap-2 rounded px-2 py-2 text-left text-xs text-[#334155] hover:bg-[#f8fafc]"
                      @click.stop="openActivateModal(row)"
                    >
                      <IconCircleCheck class="h-3.5 w-3.5" />
                      Activate
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Review driver application modal -->
    <div
      v-if="showDetailsModal && selectedRow"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4"
      @click="closeDetails"
    >
      <div class="w-full max-w-xl rounded-2xl bg-white p-5 shadow-2xl" @click.stop>
        <div class="mb-2 flex items-start justify-between">
          <div>
            <h3 class="text-xl font-semibold text-[#0f172a]">Review Driver Applications</h3>
            <p class="mt-1 text-xs text-[#64748b]">Review submitted driver applications and approve or reject registrations.</p>
          </div>
          <button class="rounded-md p-1 text-[#334155] hover:bg-[#f8fafc]" @click="closeDetails">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="mb-4 inline-flex rounded-lg bg-[#f1f5f9] p-1 text-xs">
          <button
            v-for="tab in detailsTabs"
            :key="tab"
            @click="activeDetailsTab = tab"
            class="rounded-md px-3 py-1.5 font-medium transition"
            :class="activeDetailsTab === tab ? 'bg-white text-[#0f172a]' : 'text-[#94a3b8]'"
          >
            {{ tab }}
          </button>
        </div>

        <div v-if="activeDetailsTab === 'Drivers Details'" class="grid grid-cols-[1fr_170px] gap-4">
          <div class="space-y-2.5">
            <div>
              <p class="text-xs text-[#64748b]">Driver Name</p>
              <p class="text-sm font-medium text-[#0f172a]">{{ selectedRow.name }}</p>
            </div>
            <div>
              <p class="text-xs text-[#64748b]">Phone</p>
              <p class="text-sm text-[#334155]">+1234 567 8901</p>
            </div>
            <div>
              <p class="text-xs text-[#64748b]">Rating</p>
              <p class="text-sm text-[#334155]">No ratings yet</p>
            </div>
            <div>
              <p class="text-xs text-[#64748b]">Vehicle Type</p>
              <p class="text-sm text-[#334155]">{{ selectedRow.vehicle }}</p>
            </div>
            <div>
              <p class="text-xs text-[#64748b]">Driver's License Number</p>
              <p class="text-sm text-[#334155]">B462G9Y73554488</p>
            </div>
            <div>
              <p class="text-xs text-[#64748b]">License Expiry Date</p>
              <p class="text-sm text-[#334155]">05/12/2028</p>
            </div>
            <div>
              <p class="text-xs text-[#64748b]">Registration Date</p>
              <p class="text-sm text-[#334155]">1/14/2024</p>
            </div>
          </div>
          <div class="space-y-2.5">
            <div>
              <p class="text-xs text-[#64748b]">Selfie Photo</p>
              <img src="https://i.pravatar.cc/180?img=12" alt="selfie" class="mt-1 h-36 w-full rounded-lg object-cover" />
            </div>
            <div>
              <p class="text-xs text-[#64748b]">Total Rides</p>
              <p class="text-sm text-[#334155]">0</p>
            </div>
            <div>
              <p class="text-xs text-[#64748b]">Wallet Balance</p>
              <p class="text-sm text-[#334155]">₦0.00</p>
            </div>
          </div>
        </div>

        <div v-else-if="activeDetailsTab === 'Vehicle details'" class="space-y-5">
          <div class="grid grid-cols-[1fr_1fr] gap-6">
            <div class="space-y-2.5">
              <div>
                <p class="text-xs text-[#64748b]">Vehicle type</p>
                <p class="text-sm text-[#0f172a]">SUV</p>
              </div>
              <div>
                <p class="text-xs text-[#64748b]">Vehicle maker</p>
                <p class="text-sm text-[#334155]">Toyota Camry</p>
              </div>
              <div>
                <p class="text-xs text-[#64748b]">Vehicle model</p>
                <p class="text-sm text-[#334155]">Toyota Camry</p>
              </div>
              <div>
                <p class="text-xs text-[#64748b]">Year of manufacture</p>
                <p class="text-sm text-[#334155]">2023</p>
              </div>
              <div>
                <p class="text-xs text-[#64748b]">Vehicle color</p>
                <p class="text-sm text-[#334155]">Blue</p>
              </div>
              <div>
                <p class="text-xs text-[#64748b]">Plate number</p>
                <p class="text-sm text-[#334155]">AB83746DH</p>
              </div>
            </div>
            <div class="space-y-3">
              <div>
                <p class="text-xs text-[#64748b] mb-1.5">Front Sample</p>
                <div class="h-28 w-full rounded-lg border border-[#e5e7eb] overflow-hidden">
                  <img src="https://placehold.co/280x112/0d5c2e/ffffff?text=License+Front" alt="License front" class="h-full w-full object-cover" />
                </div>
              </div>
              <div>
                <p class="text-xs text-[#64748b] mb-1.5">Back Sample</p>
                <div class="h-28 w-full rounded-lg border border-[#e5e7eb] overflow-hidden">
                  <img src="https://placehold.co/280x112/1e293b/94a3b8?text=License+Back" alt="License back" class="h-full w-full object-cover" />
                </div>
              </div>
            </div>
          </div>
          <div>
            <p class="text-xs text-[#64748b] mb-2">Vehicle Image</p>
            <div class="flex gap-2">
              <img v-for="i in 3" :key="i" src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=160&h=100&fit=crop" alt="Vehicle" class="h-24 w-28 rounded-lg border border-[#e5e7eb] object-cover" />
            </div>
          </div>
          <label class="flex items-center gap-2 text-sm text-[#334155]">
            <input type="checkbox" class="h-4 w-4 rounded border-[#e5e7eb] text-[#16a34a] focus:ring-[#16a34a]" />
            Mark as Verified
          </label>
        </div>

        <div v-else-if="activeDetailsTab === 'Auto-Checklist'" class="space-y-6">
          <div>
            <h4 class="text-sm font-medium text-[#0f172a] mb-3">KYC Status</h4>
            <div class="flex items-center justify-between rounded-lg border border-[#e5e7eb] bg-white px-3 py-2.5">
              <div class="flex items-center gap-2">
                <IconInfoCircle class="h-5 w-5 text-[#eab308]" />
                <span class="text-sm text-[#334155]">Identity verification</span>
              </div>
              <span class="rounded-md bg-[#fef9c3] px-2.5 py-1 text-xs font-medium text-[#a16207]">PendingVerification</span>
            </div>
          </div>
          <div>
            <h4 class="text-sm font-medium text-[#0f172a] mb-3">Vehicles Registration</h4>
            <div class="flex items-center justify-between rounded-lg border border-[#e5e7eb] bg-white px-3 py-2.5">
              <div class="flex items-center gap-2">
                <IconCar class="h-5 w-5 text-[#16a34a]" />
                <span class="text-sm text-[#334155]">1 vehicle registered</span>
              </div>
              <span class="rounded-md bg-[#dcfce7] px-2.5 py-1 text-xs font-medium text-[#16a34a]">Verified</span>
            </div>
          </div>
        </div>

        <div v-else class="min-h-[220px] rounded-lg border border-dashed border-[#e2e8f0] p-4 text-sm text-[#94a3b8]">
          No data available for this tab.
        </div>

        <div class="mt-5 flex items-center justify-end gap-3 border-t border-[#e5e7eb] pt-4">
          <button class="rounded-md bg-[#dc2626] px-4 py-2 text-xs font-medium text-white hover:bg-[#b91c1c]">Reject Application</button>
          <button class="rounded-md bg-[#16a34a] px-4 py-2 text-xs font-medium text-white hover:bg-[#15803d]">Approve Driver</button>
        </div>
      </div>
    </div>

    <!-- Suspend Driver modal -->
    <div
      v-if="showSuspendModal && suspendDriverRow"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4"
      @click="closeSuspendModal"
    >
      <div class="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl" @click.stop>
        <div class="flex items-start justify-between">
          <h3 class="text-lg font-semibold text-[#0f172a]">Suspend Driver?</h3>
          <button class="rounded-md p-1 text-[#64748b] hover:bg-[#f8fafc]" @click="closeSuspendModal">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p class="mt-3 text-sm text-[#64748b]">
          Are you sure you want to suspend {{ suspendDriverRow.name }}? They will not be able to accept any rides until reactivated.
        </p>
        <div class="mt-4">
          <label class="block text-sm font-medium text-[#334155]">Reason for Suspension</label>
          <textarea
            v-model="suspendReason"
            rows="3"
            placeholder="Please provide a reason for suspension...."
            class="mt-1.5 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm text-[#0f172a] placeholder:text-[#94a3b8] outline-none focus:border-[#cbd5e1]"
          ></textarea>
        </div>
        <div class="mt-4 flex items-start gap-3 rounded-lg bg-[#fef2f2] p-3">
          <svg class="h-5 w-5 shrink-0 text-[#dc2626]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p class="text-sm text-[#991b1b]">
            Suspending this driver will immediately block access and freeze all wallet transactions.
          </p>
        </div>
        <div class="mt-6 flex justify-end gap-3">
          <button class="rounded-md border border-[#e5e7eb] px-4 py-2 text-sm text-[#475569] hover:bg-[#f8fafc]" @click="closeSuspendModal">
            Cancel
          </button>
          <button class="rounded-md bg-[#dc2626] px-4 py-2 text-sm font-medium text-white hover:bg-[#b91c1c]" @click="confirmSuspend">
            Suspend Driver
          </button>
        </div>
      </div>
    </div>

    <!-- Adjust Wallet Balance modal -->
    <div
      v-if="showWalletModal && walletRow"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4"
      @click="closeWalletModal"
    >
      <div class="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl" @click.stop>
        <div class="flex items-start justify-between">
          <div>
            <h3 class="text-lg font-semibold text-[#0f172a]">Adjust Wallet Balance</h3>
            <p class="mt-1 text-sm text-[#64748b]">Modify the wallet balance for {{ walletRow.name }}</p>
          </div>
          <button class="rounded-md p-1 text-[#64748b] hover:bg-[#f8fafc]" @click="closeWalletModal">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="mt-4 rounded-lg border border-[#e5e7eb] bg-[#f8fafc] p-4">
          <div class="flex items-center gap-2">
            <p class="text-sm font-medium text-[#0f172a]">{{ walletRow.name }}</p>
            <span class="rounded-full bg-[#dcfce7] px-2 py-0.5 text-xs font-medium text-[#16a34a]">Active</span>
          </div>
          <p class="mt-1 text-sm text-[#64748b]">{{ walletRow.email }}</p>
          <p class="text-sm text-[#64748b]">Wallet ID: W{{ walletRow.id.padStart(3, '0') }}</p>
          <p class="mt-2 text-sm font-semibold text-[#0f172a]">Current Balance: {{ walletRow.wallet }}</p>
        </div>
        <div class="mt-4 space-y-4">
          <div>
            <label class="block text-sm font-medium text-[#334155]">Adjustment Type</label>
            <select
              v-model="walletAdjustmentType"
              class="mt-1.5 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm text-[#0f172a] outline-none focus:border-[#cbd5e1]"
            >
              <option value="">Select adjustment type</option>
              <option value="credit">Credit</option>
              <option value="debit">Debit</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-[#334155]">Amount (₦)</label>
            <input
              v-model="walletAdjustAmount"
              type="text"
              placeholder="Enter Amount"
              class="mt-1.5 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm text-[#0f172a] placeholder:text-[#94a3b8] outline-none focus:border-[#cbd5e1]"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-[#334155]">Reason for Adjustment</label>
            <p class="mt-0.5 text-xs text-[#64748b]">Enter reason for balance adjustment required for audit trail.</p>
            <textarea
              v-model="walletAdjustReason"
              rows="3"
              placeholder="Enter reason for balance adjustment required for audit trail"
              class="mt-1.5 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm text-[#0f172a] placeholder:text-[#94a3b8] outline-none focus:border-[#cbd5e1]"
            ></textarea>
          </div>
        </div>
        <div class="mt-6 flex justify-end gap-3">
          <button class="rounded-md border border-[#e5e7eb] px-4 py-2 text-sm text-[#475569] hover:bg-[#f8fafc]" @click="closeWalletModal">
            Cancel
          </button>
          <button class="rounded-md bg-[#0f172a] px-4 py-2 text-sm font-medium text-white hover:bg-[#1e293b]" @click="confirmWalletAdjust">
            Adjust Balance
          </button>
        </div>
      </div>
    </div>

    <!-- Activate Driver modal -->
    <div
      v-if="showActivateModal && activateDriverRow"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4"
      @click="closeActivateModal"
    >
      <div class="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl" @click.stop>
        <div class="flex items-start justify-between">
          <h3 class="text-lg font-semibold text-[#0f172a]">Activate Driver?</h3>
          <button class="rounded-md p-1 text-[#64748b] hover:bg-[#f8fafc]" @click="closeActivateModal">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p class="mt-3 text-sm text-[#64748b]">
          Are you sure you want to activate {{ activateDriverRow.name }}? They will be able to start accepting rides again.
        </p>
        <div class="mt-6 flex justify-end gap-3">
          <button class="rounded-md border border-[#e5e7eb] px-4 py-2 text-sm text-[#475569] hover:bg-[#f8fafc]" @click="closeActivateModal">
            Cancel
          </button>
          <button class="rounded-md bg-[#0f172a] px-4 py-2 text-sm font-medium text-white hover:bg-[#1e293b]" @click="confirmActivate">
            Activate Driver
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import IconSearch from '@/components/icon/icon-search.vue';
import IconHorizontalDots from '@/components/icon/icon-horizontal-dots.vue';
import IconEye from '@/components/icon/icon-eye.vue';
import IconUsersGroup from '@/components/icon/icon-users-group.vue';
import IconCircleCheck from '@/components/icon/icon-circle-check.vue';
import IconInfoHexagon from '@/components/icon/icon-info-hexagon.vue';
import IconXCircle from '@/components/icon/icon-x-circle.vue';
import IconMinusCircle from '@/components/icon/icon-minus-circle.vue';
import IconInfoCircle from '@/components/icon/icon-info-circle.vue';
import IconCar from '@/components/icon/icon-car.vue';
import IconStar from '@/components/icon/icon-star.vue';
import IconWallet from '@/components/icon/icon-wallet.vue';

type RiderRow = {
  id: string;
  name: string;
  email: string;
  vehicle: string;
  rating: string;
  trips: number;
  wallet: string;
  verification: string;
  status: string;
  suspensionReason?: string;
};

const cards = [
  { label: 'Total Drivers', value: '24,563', icon: IconUsersGroup, iconClass: 'text-[#3b82f6]', bg: '#dbeafe' },
  { label: 'Active', value: '24,563', icon: IconCircleCheck, iconClass: 'text-[#16a34a]', bg: '#dcfce7' },
  { label: 'Pending Approval', value: '24,563', icon: IconInfoHexagon, iconClass: 'text-[#eab308]', bg: '#fef9c3' },
  { label: 'Suspended', value: '24,563', icon: IconXCircle, iconClass: 'text-[#ef4444]', bg: '#fee2e2' },
  { label: 'Rejected', value: '24,563', icon: IconMinusCircle, iconClass: 'text-[#e11d48]', bg: '#ffe4e6' },
];

const tabs = ['Pending Registration', 'Verified Drivers', 'Suspended'];
const activeTab = ref('Pending Registration');
const search = ref('');
const openActionId = ref<string | null>(null);
const showDetailsModal = ref(false);
const selectedRow = ref<RiderRow | null>(null);
const showSuspendModal = ref(false);
const suspendDriverRow = ref<RiderRow | null>(null);
const suspendReason = ref('');
const showActivateModal = ref(false);
const activateDriverRow = ref<RiderRow | null>(null);
const showWalletModal = ref(false);
const walletRow = ref<RiderRow | null>(null);
const walletAdjustmentType = ref('');
const walletAdjustAmount = ref('');
const walletAdjustReason = ref('');
const detailsTabs = ['Drivers Details', 'Vehicle details', 'Auto-Checklist'];
const activeDetailsTab = ref('Drivers Details');

const rows = ref<RiderRow[]>([
  { id: '1', name: 'Sarah Johnson', email: 'sarah.j@email.com', vehicle: 'Motorbike', rating: 'N/A', trips: 0, wallet: '₦0.00', verification: 'Not Verified', status: 'Pending Approval' },
  { id: '2', name: 'Sarah Johnson', email: 'sarah.j@email.com', vehicle: 'Motorbike', rating: 'N/A', trips: 0, wallet: '₦0.00', verification: 'Not Verified', status: 'Pending Approval' },
  { id: '3', name: 'Sarah Johnson', email: 'sarah.j@email.com', vehicle: 'Motorbike', rating: 'N/A', trips: 0, wallet: '₦0.00', verification: 'Not Verified', status: 'Pending Approval' },
  { id: '4', name: 'Sarah Johnson', email: 'sarah.j@email.com', vehicle: 'Motorbike', rating: 'N/A', trips: 0, wallet: '₦0.00', verification: 'Not Verified', status: 'Pending Approval' },
  { id: '5', name: 'Sarah Johnson', email: 'sarah.jp@email.com', vehicle: 'Toyota', rating: '64', trips: 342, wallet: '₦125,000', verification: 'Verified', status: 'Active' },
  { id: '6', name: 'Sarah Johnson', email: 'sarah.jp@email.com', vehicle: 'Toyota', rating: '64', trips: 342, wallet: '₦125,000', verification: 'Verified', status: 'Active' },
  { id: '7', name: 'Sarah Johnson', email: 'sarah.jp@email.com', vehicle: 'Toyota', rating: '64', trips: 342, wallet: '₦125,000', verification: 'Verified', status: 'Active' },
  { id: '8', name: 'Sarah Johnson', email: 'suspended@email.com', vehicle: 'Toyota', rating: '58', trips: 120, wallet: '₦125,000', verification: 'Verified', status: 'Suspended', suspensionReason: 'Fraud Detection' },
  { id: '9', name: 'Sarah Johnson', email: 'sarah.jp@email.com', vehicle: 'Toyota', rating: '64', trips: 342, wallet: '₦125,000', verification: 'Verified', status: 'Suspended', suspensionReason: 'Policy Violation' },
  { id: '10', name: 'Sarah Johnson', email: 'sarah.jp@email.com', vehicle: 'Toyota', rating: '64', trips: 342, wallet: '₦125,000', verification: 'Verified', status: 'Suspended', suspensionReason: 'Policy Violation' },
]);

const tabRows = computed(() => {
  if (activeTab.value === 'Pending Registration') return rows.value.filter((r) => r.status === 'Pending Approval');
  if (activeTab.value === 'Verified Drivers') return rows.value.filter((r) => r.verification === 'Verified' && r.status === 'Active');
  if (activeTab.value === 'Suspended') return rows.value.filter((r) => r.status === 'Suspended');
  return rows.value;
});

const filteredRows = computed(() => {
  const q = search.value.trim().toLowerCase();
  const list = tabRows.value;
  if (!q) return list;
  return list.filter((row) => row.name.toLowerCase().includes(q) || row.email.toLowerCase().includes(q));
});

const router = useRouter();

const openDetails = (row: RiderRow) => {
  openActionId.value = null;
  if (activeTab.value === 'Verified Drivers' || activeTab.value === 'Suspended') {
    router.push({
      name: 'transportationDriverProfile',
      params: { id: row.id },
      query: activeTab.value === 'Suspended' ? { suspended: 'true' } : {},
    });
  } else {
    selectedRow.value = row;
    activeDetailsTab.value = 'Drivers Details';
    showDetailsModal.value = true;
  }
};

const closeDetails = () => {
  showDetailsModal.value = false;
};

function getStatusClass(status: string) {
  if (status === 'Active') return 'bg-[#dcfce7] text-[#16a34a]';
  if (status === 'Pending Approval') return 'bg-[#fef3c7] text-[#d97706]';
  return 'bg-[#fee2e2] text-[#dc2626]';
}

const openSuspendModal = (row: RiderRow) => {
  suspendDriverRow.value = row;
  suspendReason.value = '';
  openActionId.value = null;
  showSuspendModal.value = true;
};

const closeSuspendModal = () => {
  showSuspendModal.value = false;
  suspendDriverRow.value = null;
};

const confirmSuspend = () => {
  if (suspendDriverRow.value) {
    const idx = rows.value.findIndex((r) => r.id === suspendDriverRow.value!.id);
    if (idx >= 0) {
      rows.value[idx].status = 'Suspended';
      rows.value[idx].suspensionReason = suspendReason.value || 'Not specified';
    }
  }
  closeSuspendModal();
};

const openActivateModal = (row: RiderRow) => {
  activateDriverRow.value = row;
  openActionId.value = null;
  showActivateModal.value = true;
};

const closeActivateModal = () => {
  showActivateModal.value = false;
  activateDriverRow.value = null;
};

const openWalletModal = (row: RiderRow) => {
  walletRow.value = row;
  walletAdjustmentType.value = '';
  walletAdjustAmount.value = '';
  walletAdjustReason.value = '';
  openActionId.value = null;
  showWalletModal.value = true;
};

const closeWalletModal = () => {
  showWalletModal.value = false;
  walletRow.value = null;
};

const confirmWalletAdjust = () => {
  closeWalletModal();
};

const confirmActivate = () => {
  if (activateDriverRow.value) {
    const idx = rows.value.findIndex((r) => r.id === activateDriverRow.value!.id);
    if (idx >= 0) rows.value[idx].status = 'Active';
  }
  closeActivateModal();
};
</script>

