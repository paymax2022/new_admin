<template>
  <div class="min-h-screen bg-white p-5 md:p-6">
    <div class="mx-auto max-w-[1220px] space-y-4">
      <!-- Header -->
      <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 class="text-[30px] font-semibold leading-tight text-[#111827]">Riders Management</h1>
          <p class="mt-1 text-sm text-[#64748b]">Manage courier profiles and approvals</p>
        </div>
      </div>

      <!-- Tabs and Action Buttons -->
      <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div class="inline-flex rounded-lg border border-[#e5e7eb] bg-white p-1">
          <button
            v-for="tab in tabs"
            :key="tab.value"
            class="rounded-md px-4 py-2 text-sm font-medium transition-colors"
            :class="activeTab === tab.value ? 'bg-[#e2e8f0] text-[#111827]' : 'bg-transparent text-[#64748b] hover:bg-[#f8fafc]'"
            @click="activeTab = tab.value"
          >
            {{ tab.label }}
          </button>
        </div>
        <div class="flex items-center gap-2">
          <button class="rounded-lg border border-[#e5e7eb] bg-white px-4 py-2.5 text-sm font-medium text-[#475569] hover:bg-[#f8fafc]">
            Export List
          </button>
          <select class="h-10 rounded-lg border border-[#e5e7eb] bg-white px-4 text-sm text-[#475569] outline-none focus:border-[#cbd5e1]">
            <option>Status</option>
            <option value="pending">Pending Approval</option>
            <option value="verified">Verified</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>

      <!-- Search Bar -->
      <div class="relative max-w-[400px]">
        <IconSearch class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94a3b8]" />
        <input
          v-model="search"
          placeholder="Search riders..."
          class="h-10 w-full rounded-lg border border-[#e5e7eb] bg-white pl-9 pr-3 text-sm text-[#0f172a] placeholder:text-[#94a3b8] outline-none focus:border-[#cbd5e1]"
        />
      </div>

      <!-- Data Table -->
      <div class="rounded-xl border border-[#e5e7eb] bg-white overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full min-w-[1100px] border-collapse">
            <thead>
              <tr class="border-b border-[#e5e7eb] bg-[#fcfcfd] text-left text-xs font-semibold text-[#64748b]">
                <th class="px-4 py-3">Rider ID</th>
                <th class="px-4 py-3">Name</th>
                <th class="px-4 py-3">Vehicle</th>
                <th class="px-4 py-3">Status</th>
                <th class="px-4 py-3">Deliveries</th>
                <th class="px-4 py-3">Rating</th>
                <th class="px-4 py-3">Earnings</th>
                <th class="px-4 py-3">Reason for Suspension</th>
                <th class="px-4 py-3">Last Active</th>
                <th class="w-12 px-2 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="row in filteredRows"
                :key="row.id"
                class="border-b border-[#f1f5f9] text-sm text-[#0f172a]"
              >
                <td class="px-4 py-3 font-medium text-[#334155]">{{ row.riderId }}</td>
                <td class="px-4 py-3 text-[#334155]">{{ row.name }}</td>
                <td class="px-4 py-3 text-[#334155]">{{ row.vehicle }}</td>
                <td class="px-4 py-3">
                  <span
                    class="inline-block rounded-full px-3 py-1 text-xs font-medium"
                    :class="getStatusClass(row.status)"
                  >
                    {{ row.status }}
                  </span>
                </td>
                <td class="px-4 py-3 text-[#334155]">{{ row.deliveries }}</td>
                <td class="px-4 py-3">
                  <span class="flex items-center gap-0.5 text-[#334155]">
                    <svg class="h-4 w-4 text-[#eab308]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    {{ row.rating }}
                  </span>
                </td>
                <td class="px-4 py-3 text-[#334155]">{{ row.earnings }}</td>
                <td class="px-4 py-3 text-[#64748b]">{{ row.reasonForSuspension || '—' }}</td>
                <td class="px-4 py-3 text-[#64748b]">{{ row.lastActive || '—' }}</td>
                <td class="relative px-2 py-3" @click.stop>
                  <button
                    class="rounded-md p-1.5 text-[#64748b] hover:bg-[#f8fafc]"
                    @click="openActionId = openActionId === row.id ? null : row.id"
                  >
                    <IconHorizontalDots class="h-4 w-4" />
                  </button>
                  <div
                    v-if="openActionId === row.id"
                    class="absolute right-0 top-full z-10 mt-1 w-44 rounded-lg border border-[#e5e7eb] bg-white py-1 shadow-lg"
                    @click.stop
                  >
                    <button
                      type="button"
                      class="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-[#334155] hover:bg-[#f8fafc]"
                      @click.stop="viewDetails(row, $event)"
                    >
                      <IconEye class="h-3.5 w-3.5 text-[#64748b]" />
                      View Details
                    </button>
                    <button
                      type="button"
                      v-if="row.status === 'Active' || row.status === 'Verified'"
                      class="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-[#334155] hover:bg-[#f8fafc]"
                      @click.stop="adjustWallet(row)"
                    >
                      <IconWallet class="h-3.5 w-3.5 text-[#64748b]" />
                      Adjust wallet
                    </button>
                    <button
                      type="button"
                      v-if="row.status === 'Suspended'"
                      class="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-[#334155] hover:bg-[#f8fafc]"
                      @click.stop="activateRider(row)"
                    >
                      <IconRestore class="h-3.5 w-3.5 text-[#64748b]" />
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

    <!-- Review Riders Applications Modal -->
    <Teleport to="body">
      <div
        v-if="showReviewModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        @click.self="showReviewModal = false"
      >
        <div class="relative max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-xl bg-white shadow-xl">
          <!-- Modal Header -->
          <div class="border-b border-[#e5e7eb] px-6 pt-5 pb-2">
            <div class="flex items-start justify-between gap-4">
              <div>
                <h2 class="text-lg font-semibold text-[#111827]">Review Riders Applications</h2>
                <p class="mt-1 text-sm text-[#64748b]">Review submitted Riders applications and approve or reject registrations.</p>
              </div>
              <div class="flex items-center gap-3">
                <span class="inline-block rounded-full bg-[#ffedd5] px-3 py-1 text-xs font-medium text-[#f97316]">
                  Pending approval
                </span>
                <button
                  class="rounded-md p-1.5 text-[#64748b] hover:bg-[#f1f5f9]"
                  @click="showReviewModal = false"
                >
                  <IconX class="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          <!-- Modal Tabs -->
          <div class="border-b border-[#e5e7eb] px-6 pt-6">
            <div class="flex gap-6">
              <button
                v-for="modalTab in modalTabs"
                :key="modalTab.value"
                class="border-b-2 pb-3 text-sm font-medium transition-colors"
                :class="modalTab.value === modalActiveTab ? 'border-[#0f172a] text-[#111827]' : 'border-transparent text-[#64748b] hover:text-[#334155]'"
                @click="modalActiveTab = modalTab.value"
              >
                {{ modalTab.label }}
              </button>
            </div>
          </div>

          <!-- Modal Content -->
          <div class="max-h-[calc(90vh-220px)] overflow-y-auto px-6 py-5">
            <template v-if="modalActiveTab === 'drivers'">
              <div class="grid gap-6 sm:grid-cols-2">
                <div class="space-y-4">
                  <div>
                    <p class="text-xs font-medium text-[#64748b]">Driver Name</p>
                    <p class="mt-0.5 text-sm text-[#111827]">{{ selectedRider?.driverName ?? 'Jacob Jones' }}</p>
                  </div>
                  <div>
                    <p class="text-xs font-medium text-[#64748b]">Phone</p>
                    <p class="mt-0.5 text-sm text-[#111827]">{{ selectedRider?.phone ?? '+12345678901' }}</p>
                  </div>
                  <div>
                    <p class="text-xs font-medium text-[#64748b]">Rating</p>
                    <p class="mt-0.5 text-sm text-[#111827]">{{ selectedRider?.rating ?? 'No ratings yet' }}</p>
                  </div>
                  <div>
                    <p class="text-xs font-medium text-[#64748b]">Motorcycle maker</p>
                    <p class="mt-0.5 text-sm text-[#111827]">{{ selectedRider?.vehicle ?? 'Motorbike' }}</p>
                  </div>
                  <div>
                    <p class="text-xs font-medium text-[#64748b]">Motorcycle model</p>
                    <p class="mt-0.5 text-sm text-[#111827]">{{ selectedRider?.vehicleModel ?? '8462G5Y73554488' }}</p>
                  </div>
                  <div>
                    <p class="text-xs font-medium text-[#64748b]">License Expiry Date</p>
                    <p class="mt-0.5 text-sm text-[#111827]">{{ selectedRider?.licenseExpiry ?? '06/12/2028' }}</p>
                  </div>
                  <div>
                    <p class="text-xs font-medium text-[#64748b]">Registration Date</p>
                    <p class="mt-0.5 text-sm text-[#111827]">{{ selectedRider?.registrationDate ?? '1/14/2024' }}</p>
                  </div>
                </div>
                <div class="space-y-4">
                  <div>
                    <p class="text-xs font-medium text-[#64748b]">Selfie Photo</p>
                    <div class="mt-1.5 flex h-28 w-28 overflow-hidden rounded-lg border border-[#e5e7eb] bg-[#f8fafc]">
                      <img
                        :src="selectedRider?.selfieUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face'"
                        alt="Driver selfie"
                        class="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <p class="text-xs font-medium text-[#64748b]">Total Rides</p>
                    <p class="mt-0.5 text-sm text-[#111827]">{{ selectedRider?.deliveries ?? '0' }}</p>
                  </div>
                  <div>
                    <p class="text-xs font-medium text-[#64748b]">Wallet Balance</p>
                    <p class="mt-0.5 text-sm text-[#111827]">₩{{ selectedRider?.walletBalance ?? '0.00' }}</p>
                  </div>
                </div>
              </div>
            </template>
            <template v-else-if="modalActiveTab === 'vehicle'">
              <div class="grid gap-6 sm:grid-cols-2">
                <div class="space-y-4">
                  <div>
                    <p class="text-xs font-medium text-[#64748b]">Motorcycle type</p>
                    <p class="mt-0.5 text-sm text-[#111827]">{{ vehicleDetails.motorcycleType }}</p>
                  </div>
                  <div>
                    <p class="text-xs font-medium text-[#64748b]">Motorcycle maker</p>
                    <p class="mt-0.5 text-sm text-[#111827]">{{ vehicleDetails.motorcycleMaker }}</p>
                  </div>
                  <div>
                    <p class="text-xs font-medium text-[#64748b]">Motorcycle model</p>
                    <p class="mt-0.5 text-sm text-[#111827]">{{ vehicleDetails.motorcycleModel }}</p>
                  </div>
                  <div>
                    <p class="text-xs font-medium text-[#64748b]">Year of manufacture</p>
                    <p class="mt-0.5 text-sm text-[#111827]">{{ vehicleDetails.yearOfManufacture }}</p>
                  </div>
                  <div>
                    <p class="text-xs font-medium text-[#64748b]">Motorcycle color</p>
                    <p class="mt-0.5 text-sm text-[#111827]">{{ vehicleDetails.motorcycleColor }}</p>
                  </div>
                  <div>
                    <p class="text-xs font-medium text-[#64748b]">Motorcycle Plate number</p>
                    <p class="mt-0.5 text-sm text-[#111827]">{{ vehicleDetails.plateNumber }}</p>
                  </div>
                </div>
                <div class="space-y-4">
                  <div>
                    <p class="text-xs font-medium text-[#64748b]">Riders License</p>
                    <div class="mt-1.5 flex gap-2">
                      <div class="h-20 w-24 overflow-hidden rounded-lg border border-[#e5e7eb] bg-[#f1f5f9]">
                        <div class="flex h-full w-full items-center justify-center text-[10px] text-[#94a3b8]">Front</div>
                      </div>
                      <div class="h-20 w-24 overflow-hidden rounded-lg border border-[#e5e7eb] bg-[#f1f5f9]">
                        <div class="flex h-full w-full items-center justify-center text-[10px] text-[#94a3b8]">Back</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p class="text-xs font-medium text-[#64748b]">Motorcycle Image</p>
                    <div class="mt-1.5 flex gap-2">
                      <div v-for="i in 3" :key="i" class="h-16 w-20 overflow-hidden rounded-lg border border-[#e5e7eb] bg-[#1e293b]">
                        <div class="flex h-full w-full items-center justify-center text-[10px] text-[#94a3b8]">Bike</div>
                      </div>
                    </div>
                  </div>
                  <label class="mt-4 flex cursor-pointer items-center gap-2">
                    <input v-model="markAsVerified" type="checkbox" class="h-4 w-4 rounded border-[#cbd5e1] text-[#0f172a] focus:ring-[#0f172a]" />
                    <span class="text-sm text-[#334155]">Mark as Verified</span>
                  </label>
                </div>
              </div>
            </template>
            <template v-else>
              <div class="space-y-4">
                <div class="flex items-center justify-between rounded-lg border border-[#e5e7eb] bg-white p-4">
                  <div class="flex items-center gap-3">
                    <div class="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#facc15] bg-[#fef9c3]">
                      <IconHelpCircle class="h-5 w-5 text-[#eab308]" />
                    </div>
                    <div>
                      <p class="text-sm font-medium text-[#111827]">KYC Status</p>
                      <p class="text-xs text-[#64748b]">Identity verification</p>
                    </div>
                  </div>
                  <span class="rounded-full bg-[#ffedd5] px-3 py-1 text-xs font-medium text-[#f97316]">PendingVerification</span>
                </div>
                <div class="flex items-center justify-between rounded-lg border border-[#e5e7eb] bg-white p-4">
                  <div class="flex items-center gap-3">
                    <div class="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#22c55e] bg-[#dcfce7]">
                      <IconCar class="h-5 w-5 text-[#16a34a]" />
                    </div>
                    <div>
                      <p class="text-sm font-medium text-[#111827]">Vehicles Registration</p>
                      <p class="text-xs text-[#64748b]">1 vehicle registered</p>
                    </div>
                  </div>
                  <span class="rounded-full bg-[#dcfce7] px-3 py-1 text-xs font-medium text-[#16a34a]">Verified</span>
                </div>
              </div>
            </template>
          </div>

          <!-- Modal Footer -->
          <div class="flex justify-between gap-3 border-t border-[#e5e7eb] px-6 py-4">
            <button
              class="rounded-lg bg-[#dc2626] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#b91c1c]"
              @click="rejectApplication"
            >
              Reject Application
            </button>
            <button
              class="rounded-lg bg-[#16a34a] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#15803d]"
              @click="approveDriver"
            >
              Approve Driver
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Adjust Wallet Balance Modal -->
    <Teleport to="body">
      <div
        v-if="showAdjustWalletModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        @click.self="closeAdjustWalletModal"
      >
        <div class="relative w-full max-w-md rounded-xl bg-white shadow-xl">
          <div class="border-b border-[#e5e7eb] px-6 pt-5 pb-4">
            <div class="flex items-start justify-between gap-4">
              <div>
                <h2 class="text-lg font-semibold text-[#111827]">Adjust Wallet Balance</h2>
                <p class="mt-1 text-sm text-[#64748b]">Modify the wallet balance for {{ walletRider?.name || 'this rider' }}</p>
              </div>
              <button
                type="button"
                class="rounded-md p-1.5 text-[#64748b] hover:bg-[#f1f5f9]"
                @click="closeAdjustWalletModal"
              >
                <IconX class="h-5 w-5" />
              </button>
            </div>
          </div>

          <div class="px-6 py-4 space-y-4">
            <div class="flex flex-wrap items-center gap-2">
              <span class="text-sm font-medium text-[#111827]">{{ walletRider?.name }}</span>
              <span v-if="walletRider?.status === 'Active' || walletRider?.status === 'Verified'" class="rounded-full bg-[#dcfce7] px-2.5 py-0.5 text-xs font-medium text-[#15803d]">Active</span>
            </div>
            <p class="text-sm text-[#64748b]">Email: {{ walletRiderEmail }}</p>
            <p class="text-sm text-[#64748b]">Wallet ID: {{ walletId }}</p>
            <p class="text-sm text-[#64748b]">
              <span class="text-[#64748b]">Current Balance</span>
              <span class="ml-2 font-semibold text-[#111827]">{{ currentBalance }}</span>
            </p>

            <div>
              <label class="block text-sm font-medium text-[#334155]">Adjustment Type</label>
              <select
                v-model="adjustForm.adjustmentType"
                class="mt-1.5 h-10 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 text-sm text-[#0f172a] outline-none focus:border-[#cbd5e1]"
              >
                <option value="" disabled>Select adjustment type</option>
                <option value="credit">Credit</option>
                <option value="debit">Debit</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-[#334155]">Amount (N)</label>
              <input
                v-model="adjustForm.amount"
                type="text"
                inputmode="decimal"
                placeholder="Enter Amount"
                class="mt-1.5 h-10 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 text-sm text-[#0f172a] placeholder:text-[#94a3b8] outline-none focus:border-[#cbd5e1]"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-[#334155]">Reason for Adjustment</label>
              <textarea
                v-model="adjustForm.reason"
                rows="3"
                placeholder="Enter reason for balance adjustment required for audit trail"
                class="mt-1.5 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-sm text-[#0f172a] placeholder:text-[#94a3b8] outline-none focus:border-[#cbd5e1]"
              />
            </div>
          </div>

          <div class="flex justify-end gap-3 border-t border-[#e5e7eb] px-6 py-4">
            <button
              type="button"
              class="rounded-lg border border-[#e5e7eb] bg-white px-4 py-2.5 text-sm font-medium text-[#475569] hover:bg-[#f8fafc]"
              @click="closeAdjustWalletModal"
            >
              Cancel
            </button>
            <button
              type="button"
              class="rounded-lg bg-[#0f172a] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#1e293b]"
              @click="submitAdjustBalance"
            >
              Adjust Balance
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import IconSearch from '@/components/icon/icon-search.vue';
import IconHorizontalDots from '@/components/icon/icon-horizontal-dots.vue';
import IconEye from '@/components/icon/icon-eye.vue';
import IconX from '@/components/icon/icon-x.vue';
import IconHelpCircle from '@/components/icon/icon-help-circle.vue';
import IconCar from '@/components/icon/icon-car.vue';
import IconWallet from '@/components/icon/icon-wallet.vue';
import IconRestore from '@/components/icon/icon-restore.vue';

type RiderRow = {
  id: string;
  riderId: string;
  name: string;
  vehicle: string;
  status: string;
  deliveries: string;
  rating: string;
  earnings: string;
  reasonForSuspension?: string;
  lastActive?: string;
  driverName?: string;
  phone?: string;
  vehicleModel?: string;
  licenseExpiry?: string;
  registrationDate?: string;
  walletBalance?: string;
  selfieUrl?: string;
  email?: string;
};

const router = useRouter();
const search = ref('');
const activeTab = ref('pending');
const openActionId = ref<string | null>(null);
const showReviewModal = ref(false);
const selectedRider = ref<RiderRow | null>(null);
const modalActiveTab = ref('drivers');
const markAsVerified = ref(false);

const showAdjustWalletModal = ref(false);
const walletRider = ref<RiderRow | null>(null);
const adjustForm = ref({
  adjustmentType: '',
  amount: '',
  reason: '',
});

const vehicleDetails = {
  motorcycleType: 'SUV',
  motorcycleMaker: 'Toyota Camry',
  motorcycleModel: 'Toyota Camry',
  yearOfManufacture: '2023',
  motorcycleColor: 'Blue',
  plateNumber: 'AB837460H',
};

const modalTabs = [
  { value: 'drivers', label: 'Drivers Details' },
  { value: 'vehicle', label: 'Vehicle details' },
  { value: 'checklist', label: 'Auto-Checklist' },
];

const tabs = [
  { value: 'pending', label: 'Pending Registration' },
  { value: 'verified', label: 'Verified Drivers' },
  { value: 'suspended', label: 'Suspended' },
];

const rows = ref<RiderRow[]>([
  { id: '1', riderId: 'D', name: 'Jacob Jones', vehicle: 'Motorbike', status: 'Pending Approval', deliveries: '0', rating: 'No ratings yet', earnings: '₦0.000', driverName: 'Jacob Jones', phone: '+1234 567 8901', vehicleModel: '8462G5Y73554488', licenseExpiry: '06/12/2028', registrationDate: '1/14/2024', walletBalance: '0.00' },
  { id: '2', riderId: 'D', name: 'Amina Bello...', vehicle: 'Motorbike', status: 'Pending Approval', deliveries: '0', rating: '0', earnings: '₦0.000' },
  { id: '3', riderId: 'D', name: 'Amina Bello...', vehicle: 'Motorbike', status: 'Pending Approval', deliveries: '0', rating: '0', earnings: '₦0.000' },
  { id: '4', riderId: 'R304', name: 'Musa Ade', vehicle: 'Motorbike', status: 'Active', deliveries: '232', rating: '64', earnings: '₦89,000', lastActive: '2 mins ago' },
  { id: '5', riderId: 'R304', name: 'Musa Ade', vehicle: 'Motorbike', status: 'Active', deliveries: '232', rating: '64', earnings: '₦89,000', lastActive: '2 mins ago' },
  { id: '6', riderId: 'R304', name: 'Musa Ade', vehicle: 'Motorbike', status: 'Active', deliveries: '232', rating: '64', earnings: '₦89,000', lastActive: '2 mins ago' },
  { id: '7', riderId: 'R304', name: 'Musa Ade', vehicle: 'Motorbike', status: 'Active', deliveries: '232', rating: '64', earnings: '₦89,000', lastActive: '2 mins ago' },
  { id: '8', riderId: 'R305', name: 'Amina Bello...', vehicle: 'Motorbike', status: 'Suspended', deliveries: '12', rating: '64', earnings: 'N8,000', reasonForSuspension: 'Policy Violation', lastActive: '2 mins ago' },
  { id: '9', riderId: 'R305', name: 'Amina Bello...', vehicle: 'Motorbike', status: 'Suspended', deliveries: '12', rating: '64', earnings: 'N8,000', reasonForSuspension: 'Policy Violation', lastActive: '2 mins ago' },
  { id: '10', riderId: 'R305', name: 'Amina Bello...', vehicle: 'Motorbike', status: 'Suspended', deliveries: '12', rating: '64', earnings: 'N8,000', reasonForSuspension: 'Policy Violation', lastActive: '2 mins ago' },
  { id: '11', riderId: 'R305', name: 'Amina Bello...', vehicle: 'Motorbike', status: 'Suspended', deliveries: '12', rating: '64', earnings: 'N8,000', reasonForSuspension: 'Policy Violation', lastActive: '2 mins ago' },
]);

const filteredRows = computed(() => {
  const q = search.value.trim().toLowerCase();
  let list = rows.value;
  if (activeTab.value === 'pending') {
    list = list.filter((r) => r.status === 'Pending Approval');
  } else if (activeTab.value === 'verified') {
    list = list.filter((r) => r.status === 'Active' || r.status === 'Verified');
  } else if (activeTab.value === 'suspended') {
    list = list.filter((r) => r.status === 'Suspended');
  }
  if (!q) return list;
  return list.filter(
    (r) =>
      r.riderId.toLowerCase().includes(q) ||
      r.name.toLowerCase().includes(q) ||
      r.vehicle.toLowerCase().includes(q)
  );
});

function getStatusClass(status: string) {
  switch (status) {
    case 'Pending Approval':
      return 'bg-[#ffedd5] text-[#f97316]';
    case 'Active':
    case 'Verified':
      return 'bg-[#dcfce7] text-[#15803d]';
    case 'Suspended':
      return 'bg-[#fee2e2] text-[#dc2626]';
    default:
      return 'bg-[#f1f5f9] text-[#64748b]';
  }
}

function viewDetails(row: RiderRow, event?: MouseEvent) {
  event?.preventDefault();
  event?.stopPropagation();
  openActionId.value = null;
  if (row.status === 'Active' || row.status === 'Verified' || row.status === 'Suspended') {
    const id = row.riderId || row.id;
    const riderState = {
      name: row.name,
      riderId: row.riderId,
      status: row.status,
      earnings: row.earnings,
      lastActive: row.lastActive,
      deliveries: row.deliveries,
      rating: row.rating,
    };
    router.push({
      name: 'transportationRiderProfile',
      params: { id },
      state: { rider: riderState },
    });
  } else {
    selectedRider.value = row;
    modalActiveTab.value = 'drivers';
    markAsVerified.value = false;
    showReviewModal.value = true;
  }
}

const walletRiderEmail = computed(() => walletRider.value?.email || `${(walletRider.value?.name || '').toLowerCase().replace(/\s+/g, '.')}@email.com`);
const walletId = computed(() => {
  const r = walletRider.value;
  if (!r) return 'W001';
  const id = r.riderId?.replace(/^R/, '') || r.id;
  return `W${id}`;
});
const currentBalance = computed(() => {
  const r = walletRider.value;
  if (r?.walletBalance != null) return `N${Number(r.walletBalance).toLocaleString('en-NG', { minimumFractionDigits: 2 })}`;
  if (r?.earnings) return r.earnings.replace(/^₦/, 'N');
  return 'N15,450.00';
});

function adjustWallet(row: RiderRow) {
  openActionId.value = null;
  walletRider.value = row;
  adjustForm.value = { adjustmentType: '', amount: '', reason: '' };
  showAdjustWalletModal.value = true;
}

function activateRider(row: RiderRow) {
  openActionId.value = null;
  router.push({
    name: 'transportationRiderProfile',
    params: { id: row.riderId || row.id },
    state: { rider: { name: row.name, riderId: row.riderId, status: row.status, earnings: row.earnings, lastActive: row.lastActive, deliveries: row.deliveries, rating: row.rating } },
  });
}

function closeAdjustWalletModal() {
  showAdjustWalletModal.value = false;
  walletRider.value = null;
}

function submitAdjustBalance() {
  closeAdjustWalletModal();
}

function rejectApplication() {
  showReviewModal.value = false;
}

function approveDriver() {
  showReviewModal.value = false;
}

function handleClickOutside() {
  openActionId.value = null;
}

onMounted(() => document.addEventListener('click', handleClickOutside));
onUnmounted(() => document.removeEventListener('click', handleClickOutside));
</script>
