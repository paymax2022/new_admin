<template>
  <div class="min-h-screen bg-white p-6 space-y-6">
    <!-- Header -->
    <div class="flex flex-col gap-2">
      <h1 class="text-2xl font-semibold text-[#111827]">Pricing & Configuration</h1>
      <p class="text-sm text-[#6b7280]">Configure delivery rates and fees</p>
    </div>

    <!-- Tabs -->
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

    <!-- Base Pricing Configuration Section -->
    <div v-if="activeTab === 'base'" class="rounded-xl bg-white border border-[#e5e7eb] shadow-sm overflow-hidden">
      <div class="px-6 py-6 space-y-6">
        <h2 class="text-lg font-semibold text-[#111827]">Base Pricing Configuration</h2>

        <!-- Input Fields Grid -->
        <div class="grid grid-cols-2 gap-6">
          <!-- Base Fare -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-[#374151]">Base Fare (N)</label>
            <input
              v-model="pricing.baseFare"
              type="text"
              placeholder="--"
              class="w-full rounded-lg border border-[#e5e7eb] bg-white px-4 py-3 text-sm text-[#111827] placeholder:text-[#9ca3af] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20"
            />
          </div>

          <!-- Distance Rate -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-[#374151]">Distance Rate (N/km)</label>
            <div class="relative">
              <input
                v-model="pricing.distanceRate"
                type="text"
                placeholder="--"
                class="w-full rounded-lg border border-[#e5e7eb] bg-white px-4 py-3 pr-10 text-sm text-[#111827] placeholder:text-[#9ca3af] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20"
              />
              <IconCaretsDown class="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9ca3af]" />
            </div>
          </div>

          <!-- Weight Rate -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-[#374151]">Weight Rate (N/kg)</label>
            <div class="relative">
              <input
                v-model="pricing.weightRate"
                type="text"
                placeholder="--"
                class="w-full rounded-lg border border-[#e5e7eb] bg-white px-4 py-3 pr-10 text-sm text-[#111827] placeholder:text-[#9ca3af] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20"
              />
              <IconCaretsDown class="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9ca3af]" />
            </div>
          </div>

          <!-- Minimum Charge -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-[#374151]">Minimum Charge (N)</label>
            <input
              v-model="pricing.minimumCharge"
              type="text"
              placeholder="dd/mm/yyyy"
              class="w-full rounded-lg border border-[#e5e7eb] bg-white px-4 py-3 text-sm text-[#111827] placeholder:text-[#9ca3af] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20"
            />
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center justify-end gap-3 pt-4 border-t border-[#e5e7eb]">
          <button
            @click="handleClose"
            class="px-4 py-2 rounded-lg border border-[#e5e7eb] bg-white text-sm font-medium text-[#374151] hover:bg-[#f9fafb] transition-colors"
          >
            Close
          </button>
          <button
            @click="handleSave"
            class="px-4 py-2 rounded-lg bg-[#2563eb] text-sm font-medium text-white hover:bg-[#1d4ed8] transition-colors"
          >
            Save Configuration
          </button>
        </div>
      </div>
    </div>

    <!-- Vehicle Pricing Configuration Section -->
    <div v-if="activeTab === 'vehicle'" class="rounded-xl bg-white border border-[#e5e7eb] shadow-sm overflow-hidden">
      <div class="px-6 py-6 space-y-6">
        <h2 class="text-lg font-semibold text-[#111827]">Vehicle Pricing Configuration</h2>

        <!-- Vehicle Configuration Grid -->
        <div class="grid grid-cols-3 gap-6">
          <!-- Bike Configuration -->
          <div class="space-y-4 p-4 border border-[#e5e7eb] rounded-lg">
            <h3 class="text-base font-semibold text-[#111827]">Bike</h3>
            <div class="space-y-4">
              <div class="space-y-2">
                <label class="block text-sm font-medium text-[#374151]">Modifier</label>
                <input
                  v-model="vehiclePricing.bike.modifier"
                  type="text"
                  class="w-full rounded-lg border border-[#e5e7eb] bg-white px-4 py-3 text-sm text-[#111827] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20"
                />
              </div>
              <div class="space-y-2">
                <label class="block text-sm font-medium text-[#374151]">Min Charge (N)</label>
                <input
                  v-model="vehiclePricing.bike.minCharge"
                  type="text"
                  class="w-full rounded-lg border border-[#e5e7eb] bg-white px-4 py-3 text-sm text-[#111827] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20"
                />
              </div>
              <div class="space-y-2">
                <label class="block text-sm font-medium text-[#374151]">Max Weight (kg)</label>
                <input
                  v-model="vehiclePricing.bike.maxWeight"
                  type="text"
                  class="w-full rounded-lg border border-[#e5e7eb] bg-white px-4 py-3 text-sm text-[#111827] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20"
                />
              </div>
              <div class="space-y-2">
                <label class="block text-sm font-medium text-[#374151]">Price per km (N)</label>
                <input
                  v-model="vehiclePricing.bike.pricePerKm"
                  type="text"
                  class="w-full rounded-lg border border-[#e5e7eb] bg-white px-4 py-3 text-sm text-[#111827] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20"
                />
              </div>
              <button
                @click="handleUpdate('bike')"
                class="w-full px-4 py-2 rounded-lg bg-[#2563eb] text-sm font-medium text-white hover:bg-[#1d4ed8] transition-colors"
              >
                Update
              </button>
            </div>
          </div>

          <!-- Car Configuration -->
          <div class="space-y-4 p-4 border border-[#e5e7eb] rounded-lg">
            <h3 class="text-base font-semibold text-[#111827]">Car</h3>
            <div class="space-y-4">
              <div class="space-y-2">
                <label class="block text-sm font-medium text-[#374151]">Modifier</label>
                <input
                  v-model="vehiclePricing.car.modifier"
                  type="text"
                  class="w-full rounded-lg border border-[#e5e7eb] bg-white px-4 py-3 text-sm text-[#111827] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20"
                />
              </div>
              <div class="space-y-2">
                <label class="block text-sm font-medium text-[#374151]">Min Charge (N)</label>
                <input
                  v-model="vehiclePricing.car.minCharge"
                  type="text"
                  class="w-full rounded-lg border border-[#e5e7eb] bg-white px-4 py-3 text-sm text-[#111827] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20"
                />
              </div>
              <div class="space-y-2">
                <label class="block text-sm font-medium text-[#374151]">Max Weight (kg)</label>
                <input
                  v-model="vehiclePricing.car.maxWeight"
                  type="text"
                  class="w-full rounded-lg border border-[#e5e7eb] bg-white px-4 py-3 text-sm text-[#111827] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20"
                />
              </div>
              <div class="space-y-2">
                <label class="block text-sm font-medium text-[#374151]">Price per km (N)</label>
                <input
                  v-model="vehiclePricing.car.pricePerKm"
                  type="text"
                  class="w-full rounded-lg border border-[#e5e7eb] bg-white px-4 py-3 text-sm text-[#111827] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20"
                />
              </div>
              <button
                @click="handleUpdate('car')"
                class="w-full px-4 py-2 rounded-lg bg-[#2563eb] text-sm font-medium text-white hover:bg-[#1d4ed8] transition-colors"
              >
                Update
              </button>
            </div>
          </div>

          <!-- Van Configuration -->
          <div class="space-y-4 p-4 border border-[#e5e7eb] rounded-lg">
            <h3 class="text-base font-semibold text-[#111827]">Van</h3>
            <div class="space-y-4">
              <div class="space-y-2">
                <label class="block text-sm font-medium text-[#374151]">Modifier</label>
                <input
                  v-model="vehiclePricing.van.modifier"
                  type="text"
                  class="w-full rounded-lg border border-[#e5e7eb] bg-white px-4 py-3 text-sm text-[#111827] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20"
                />
              </div>
              <div class="space-y-2">
                <label class="block text-sm font-medium text-[#374151]">Min Charge (N)</label>
                <input
                  v-model="vehiclePricing.van.minCharge"
                  type="text"
                  class="w-full rounded-lg border border-[#e5e7eb] bg-white px-4 py-3 text-sm text-[#111827] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20"
                />
              </div>
              <div class="space-y-2">
                <label class="block text-sm font-medium text-[#374151]">Max Weight (kg)</label>
                <input
                  v-model="vehiclePricing.van.maxWeight"
                  type="text"
                  class="w-full rounded-lg border border-[#e5e7eb] bg-white px-4 py-3 text-sm text-[#111827] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20"
                />
              </div>
              <div class="space-y-2">
                <label class="block text-sm font-medium text-[#374151]">Price per km (N)</label>
                <input
                  v-model="vehiclePricing.van.pricePerKm"
                  type="text"
                  class="w-full rounded-lg border border-[#e5e7eb] bg-white px-4 py-3 text-sm text-[#111827] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20"
                />
              </div>
              <button
                @click="handleUpdate('van')"
                class="w-full px-4 py-2 rounded-lg bg-[#2563eb] text-sm font-medium text-white hover:bg-[#1d4ed8] transition-colors"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Package Handling Configuration Section -->
    <div v-if="activeTab === 'package'" class="rounded-xl bg-white border border-[#e5e7eb] shadow-sm overflow-hidden">
      <div class="px-6 py-6 space-y-6">
        <h2 class="text-lg font-semibold text-[#111827]">Package Handling Configuration</h2>

        <!-- Package Handling Items -->
        <div class="space-y-4">
          <!-- Regular Package -->
          <div class="flex items-center justify-between p-4 border border-[#e5e7eb] rounded-lg">
            <div class="flex-1">
              <h3 class="text-base font-semibold text-[#111827] mb-1">Regular</h3>
              <p class="text-sm text-[#6b7280]">Standard package handling</p>
            </div>
            <div class="flex items-center gap-4">
              <div class="flex flex-col gap-1">
                <label class="text-sm font-medium text-[#374151]">Fee%</label>
                <input
                  v-model="packageHandling.regular.fee"
                  type="text"
                  class="w-24 rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-sm text-[#111827] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20"
                />
              </div>
              <button
                @click="handleUpdatePackage('regular')"
                class="px-4 py-2 rounded-lg bg-[#2563eb] text-sm font-medium text-white hover:bg-[#1d4ed8] transition-colors"
              >
                Update
              </button>
            </div>
          </div>

          <!-- Fragile Package -->
          <div class="flex items-center justify-between p-4 border border-[#e5e7eb] rounded-lg">
            <div class="flex-1">
              <h3 class="text-base font-semibold text-[#111827] mb-1">Fragile</h3>
              <p class="text-sm text-[#6b7280]">Requires careful handling</p>
            </div>
            <div class="flex items-center gap-4">
              <div class="flex flex-col gap-1">
                <label class="text-sm font-medium text-[#374151]">Fee%</label>
                <input
                  v-model="packageHandling.fragile.fee"
                  type="text"
                  class="w-24 rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-sm text-[#111827] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20"
                />
              </div>
              <button
                @click="handleUpdatePackage('fragile')"
                class="px-4 py-2 rounded-lg bg-[#2563eb] text-sm font-medium text-white hover:bg-[#1d4ed8] transition-colors"
              >
                Update
              </button>
            </div>
          </div>

          <!-- Volatile Package -->
          <div class="flex items-center justify-between p-4 border border-[#e5e7eb] rounded-lg">
            <div class="flex-1">
              <h3 class="text-base font-semibold text-[#111827] mb-1">Volatile</h3>
              <p class="text-sm text-[#6b7280]">Chemical or hazardous materials</p>
            </div>
            <div class="flex items-center gap-4">
              <div class="flex flex-col gap-1">
                <label class="text-sm font-medium text-[#374151]">Fee%</label>
                <input
                  v-model="packageHandling.volatile.fee"
                  type="text"
                  class="w-24 rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-sm text-[#111827] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20"
                />
              </div>
              <button
                @click="handleUpdatePackage('volatile')"
                class="px-4 py-2 rounded-lg bg-[#2563eb] text-sm font-medium text-white hover:bg-[#1d4ed8] transition-colors"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Service Fee Configuration Section -->
    <div v-if="activeTab === 'service'" class="rounded-xl bg-white border border-[#e5e7eb] shadow-sm overflow-hidden">
      <div class="px-6 py-6 space-y-6">
        <h2 class="text-lg font-semibold text-[#111827]">Service Fee Configuration</h2>

        <!-- Input Fields Grid -->
        <div class="grid grid-cols-2 gap-6">
          <!-- Admin Fee -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-[#374151]">Admin Fee (%)</label>
            <input
              v-model="serviceFee.adminFee"
              type="text"
              class="w-full rounded-lg border border-[#e5e7eb] bg-white px-4 py-3 text-sm text-[#111827] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20"
            />
          </div>

          <!-- VAT -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-[#374151]">VAT (%)</label>
            <input
              v-model="serviceFee.vat"
              type="text"
              class="w-full rounded-lg border border-[#e5e7eb] bg-white px-4 py-3 text-sm text-[#111827] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20"
            />
          </div>

          <!-- Withholding Tax -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-[#374151]">Withholding Tax (%)</label>
            <input
              v-model="serviceFee.withholdingTax"
              type="text"
              class="w-full rounded-lg border border-[#e5e7eb] bg-white px-4 py-3 text-sm text-[#111827] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20"
            />
          </div>

          <!-- Transaction Fee -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-[#374151]">Transaction Fee (N)</label>
            <input
              v-model="serviceFee.transactionFee"
              type="text"
              class="w-full rounded-lg border border-[#e5e7eb] bg-white px-4 py-3 text-sm text-[#111827] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20"
            />
          </div>
        </div>

        <!-- Action Button -->
        <div class="flex items-center justify-end pt-4 border-t border-[#e5e7eb]">
          <button
            @click="handleSaveServiceFee"
            class="px-4 py-2 rounded-lg bg-[#2563eb] text-sm font-medium text-white hover:bg-[#1d4ed8] transition-colors"
          >
            Save Service Fee
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import IconCaretsDown from '@/components/icon/icon-carets-down.vue';

interface PricingConfig {
  baseFare: string;
  distanceRate: string;
  weightRate: string;
  minimumCharge: string;
}

interface VehiclePricingConfig {
  modifier: string;
  minCharge: string;
  maxWeight: string;
  pricePerKm: string;
}

interface PackageHandlingConfig {
  fee: string;
}

const activeTab = ref('base');

const tabs = [
  { id: 'base', label: 'Base Pricing' },
  { id: 'vehicle', label: 'Vehicle Pricing' },
  { id: 'package', label: 'Package Handling' },
  { id: 'service', label: 'Service Fee' },
];

const pricing = ref<PricingConfig>({
  baseFare: '',
  distanceRate: '',
  weightRate: '18',
  minimumCharge: '',
});

const vehiclePricing = ref<{
  bike: VehiclePricingConfig;
  car: VehiclePricingConfig;
  van: VehiclePricingConfig;
}>({
  bike: {
    modifier: '1.0',
    minCharge: '1000',
    maxWeight: '20',
    pricePerKm: '200',
  },
  car: {
    modifier: '1.0',
    minCharge: '1000',
    maxWeight: '20',
    pricePerKm: '200',
  },
  van: {
    modifier: '1.0',
    minCharge: '1000',
    maxWeight: '20',
    pricePerKm: '200',
  },
});

const handleClose = () => {
  // Handle close action
  console.log('Close clicked');
};

const handleSave = () => {
  // Handle save action
  console.log('Save Configuration clicked', pricing.value);
};

const handleUpdate = (vehicleType: 'bike' | 'car' | 'van') => {
  // Handle update action for specific vehicle
  console.log(`Update ${vehicleType} clicked`, vehiclePricing.value[vehicleType]);
};

const packageHandling = ref<{
  regular: PackageHandlingConfig;
  fragile: PackageHandlingConfig;
  volatile: PackageHandlingConfig;
}>({
  regular: {
    fee: '1.0',
  },
  fragile: {
    fee: '1.0',
  },
  volatile: {
    fee: '1.0',
  },
});

const handleUpdatePackage = (packageType: 'regular' | 'fragile' | 'volatile') => {
  // Handle update action for specific package type
  console.log(`Update ${packageType} clicked`, packageHandling.value[packageType]);
};

const serviceFee = ref<{
  adminFee: string;
  withholdingTax: string;
  vat: string;
  transactionFee: string;
}>({
  adminFee: '12',
  withholdingTax: '18',
  vat: '1.8',
  transactionFee: '50',
});

const handleSaveServiceFee = () => {
  // Handle save service fee action
  console.log('Save Service Fee clicked', serviceFee.value);
};
</script>

<style scoped>
/* Additional styles if needed */
</style>

