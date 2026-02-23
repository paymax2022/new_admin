<template>
  <div class="min-h-screen bg-white p-5 md:p-6">
    <div class="mx-auto max-w-[1220px] space-y-6">
      <!-- Header -->
      <div class="flex items-start justify-between">
        <div>
          <h1 class="text-[30px] font-semibold leading-tight text-[#0f172a]">Driver Management</h1>
          <p class="mt-1 text-sm text-[#64748b]">Onboard, approve, and manage drivers.</p>
        </div>
        <div class="flex items-center gap-3">
          <button
            class="rounded-lg bg-[#2563eb] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#1d4ed8]"
            @click="saveSettings"
          >
            Save Settings
          </button>
        </div>
      </div>

      <div class="grid gap-6 lg:grid-cols-3">
        <!-- Left Column: Auto-Assignment Settings -->
        <div class="lg:col-span-2 space-y-6">
          <div>
            <h2 class="text-lg font-semibold text-[#0f172a]">Auto-Assignment Settings</h2>
            <p class="mt-1 text-sm text-[#64748b]">Configure driver assignment algorithm and behavior</p>
          </div>

          <!-- Assignment Mode -->
          <div class="rounded-xl border border-[#e5e7eb] bg-white p-5">
            <h3 class="text-sm font-semibold text-[#0f172a]">Assignment Mode</h3>
            <p class="mt-0.5 text-xs text-[#64748b]">Choose how trips are assigned to drivers</p>
            <div class="mt-4 space-y-3">
              <label
                v-for="opt in assignmentModes"
                :key="opt.id"
                class="flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors"
                :class="assignmentMode === opt.id ? 'border-[#2563eb] bg-[#eff6ff]' : 'border-[#e5e7eb] hover:border-[#cbd5e1]'"
              >
                <input
                  v-model="assignmentMode"
                  type="radio"
                  :value="opt.id"
                  class="mt-1 h-4 w-4 border-[#94a3b8] text-[#2563eb] focus:ring-[#2563eb]"
                />
                <div>
                  <p class="font-medium text-[#0f172a]">{{ opt.label }}</p>
                  <p class="mt-0.5 text-xs text-[#64748b]">{{ opt.description }}</p>
                </div>
              </label>
            </div>
          </div>

          <!-- Algorithm Weights -->
          <div class="rounded-xl border border-[#e5e7eb] bg-white p-5">
            <h3 class="text-sm font-semibold text-[#0f172a]">Algorithm Weights</h3>
            <p class="mt-0.5 text-xs text-[#64748b]">Adjust scoring factors (Total: 100%)</p>
            <div class="mt-4 space-y-4">
              <div v-for="weight in algorithmWeights" :key="weight.id" class="flex items-center gap-4">
                <span class="w-36 shrink-0 text-sm text-[#334155]">{{ weight.label }}</span>
                <input
                  v-model.number="weight.value"
                  type="range"
                  min="0"
                  max="100"
                  class="range-slider h-2 flex-1 cursor-pointer rounded-full"
                  :style="{ '--fill': weight.value + '%' }"
                />
                <span class="w-12 shrink-0 text-right text-sm font-medium text-[#0f172a]">{{ weight.value }}%</span>
              </div>
            </div>
            <div class="mt-4 flex items-center gap-2">
              <span class="text-sm text-[#64748b]">Total Weight</span>
              <span class="text-sm font-medium text-[#ea580c]">{{ totalWeight }}%</span>
              <button class="text-sm font-medium text-[#2563eb] hover:underline" @click="openWeightsModal">View</button>
            </div>
          </div>

          <!-- Search Parameters -->
          <div class="rounded-xl border border-[#e5e7eb] bg-white p-5">
            <h3 class="text-sm font-semibold text-[#0f172a]">Search Parameters</h3>
            <p class="mt-0.5 text-xs text-[#64748b]">Configure search radius and timeout behavior</p>
            <div class="mt-4 grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-medium text-[#475569]">Search Radius (km)</label>
                <input
                  v-model.number="searchRadius"
                  type="number"
                  min="1"
                  class="mt-1.5 h-10 w-full rounded-lg border border-[#e5e7eb] px-3 text-sm text-[#0f172a] outline-none focus:border-[#2563eb]"
                />
              </div>
              <div>
                <label class="block text-xs font-medium text-[#475569]">Offer Timeout (seconds)</label>
                <input
                  v-model.number="offerTimeout"
                  type="number"
                  min="1"
                  class="mt-1.5 h-10 w-full rounded-lg border border-[#e5e7eb] px-3 text-sm text-[#0f172a] outline-none focus:border-[#2563eb]"
                />
              </div>
            </div>
          </div>

          <!-- Dynamic Incentives -->
          <div class="rounded-xl border border-[#e5e7eb] bg-white p-5">
            <h3 class="text-sm font-semibold text-[#0f172a]">Dynamic Incentives</h3>
            <p class="mt-0.5 text-xs text-[#64748b]">Auto-trigger bonuses after driver declines</p>
            <div class="mt-4 grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-medium text-[#475569]">Trigger After (minutes)</label>
                <input
                  v-model.number="triggerAfter"
                  type="number"
                  min="1"
                  class="mt-1.5 h-10 w-full rounded-lg border border-[#e5e7eb] px-3 text-sm text-[#0f172a] outline-none focus:border-[#2563eb]"
                />
              </div>
              <div>
                <label class="block text-xs font-medium text-[#475569]">Bonus Amount ($)</label>
                <input
                  v-model.number="bonusAmount"
                  type="number"
                  min="0"
                  class="mt-1.5 h-10 w-full rounded-lg border border-[#e5e7eb] px-3 text-sm text-[#0f172a] outline-none focus:border-[#2563eb]"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Assignment Simulator -->
        <div class="lg:col-span-1">
          <div class="rounded-xl border border-[#e5e7eb] bg-white p-5">
            <h2 class="text-lg font-semibold text-[#0f172a]">Assignment Simulator</h2>
            <p class="mt-1 text-sm text-[#64748b]">Test algorithm with pickup location</p>

            <div class="mt-5">
              <label class="block text-xs font-medium text-[#475569]">Pickup Location</label>
              <input
                v-model="pickupLocation"
                type="text"
                placeholder="Enter address or coordinates"
                class="mt-1.5 h-10 w-full rounded-lg border border-[#e5e7eb] px-3 text-sm text-[#0f172a] placeholder:text-[#94a3b8] outline-none focus:border-[#2563eb]"
              />
            </div>

            <button
              class="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#1e3a5f] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#152d47]"
              @click="simulateAssignment"
            >
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Simulate Assignment
            </button>

            <!-- Result Area -->
            <div class="mt-5 flex min-h-[280px] flex-col items-center justify-center rounded-lg border border-[#e5e7eb] bg-[#fafafa] p-6">
              <svg class="h-16 w-16 text-[#cbd5e1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <p class="mt-4 text-center text-sm text-[#94a3b8]">Enter a pickup location and simulate to see results.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Algorithm Weights Breakdown Modal -->
    <Teleport to="body">
      <div
        v-if="showWeightsModal"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4"
        @click.self="closeWeightsModal"
      >
        <div class="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-xl" @click.stop>
          <!-- Modal Header -->
          <div class="sticky top-0 z-10 flex items-start justify-between border-b border-[#e5e7eb] bg-white px-6 py-4">
            <div>
              <h2 class="text-lg font-semibold text-[#0f172a]">Algorithm Weights Breakdown</h2>
              <p class="mt-1 text-sm text-[#64748b]">Created to optimize driver-level scoring results</p>
            </div>
            <button class="rounded-lg p-1.5 text-[#64748b] hover:bg-[#f1f5f9]" @click="closeWeightsModal">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div class="px-6 py-5">
            <p class="text-sm text-[#64748b]">
              The inter-assignment algorithm scores each available driver based on multiple factors. Drivers with the highest total score get assigned rides first. You can adjust the importance of each factor using the weight sliders.
            </p>

            <!-- Current Configuration -->
            <div class="mt-6">
              <h3 class="text-sm font-semibold text-[#0f172a]">Current Configuration</h3>
              <div
                v-if="totalWeight !== 100"
                class="mt-3 rounded-lg border border-[#eab308] bg-[#fefce8] px-4 py-3 text-sm text-[#854d0e]"
              >
                Weights should total 100% for optimal algorithm performance. Current total: {{ totalWeight }}%
              </div>

              <div class="mt-4 space-y-5">
                <div
                  v-for="item in weightsBreakdown"
                  :key="item.id"
                  class="rounded-lg border border-[#e5e7eb] p-4"
                >
                  <div class="flex items-start justify-between gap-4">
                    <div class="flex items-start gap-3">
                      <span
                        class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                        :class="item.iconBg"
                      >
                        <svg v-if="item.iconType === 'pin'" class="h-4 w-4 text-[#2563eb]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                        <svg v-else-if="item.iconType === 'star'" class="h-4 w-4 text-[#eab308]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                        <svg v-else-if="item.iconType === 'check'" class="h-4 w-4 text-[#16a34a]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                        <svg v-else-if="item.iconType === 'dollar'" class="h-4 w-4 text-[#8b5cf6]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                      </span>
                      <div>
                        <p class="font-medium text-[#0f172a]">{{ item.label }}</p>
                        <p class="mt-0.5 text-xs text-[#64748b]">{{ item.description }}</p>
                      </div>
                    </div>
                    <div class="flex min-w-0 flex-1 shrink-0 items-center gap-3 sm:flex-initial">
                      <input
                        v-model.number="getWeightById(item.id).value"
                        type="range"
                        min="0"
                        max="100"
                        class="range-slider h-2 min-w-[80px] flex-1 cursor-pointer sm:w-28"
                        :style="{ '--fill': getWeightById(item.id).value + '%' }"
                      />
                      <span class="w-10 shrink-0 text-right text-sm font-medium text-[#0f172a]">{{ getWeightById(item.id).value }}%</span>
                    </div>
                  </div>
                  <div class="mt-3 rounded bg-[#f8fafc] px-3 py-2">
                    <p class="text-xs font-medium text-[#475569]">Impact on Assignment: {{ item.impact }}</p>
                    <p class="mt-1 text-xs text-[#64748b]">{{ item.impactDescription }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- How Final Score is Calculated -->
            <div class="mt-6 rounded-lg border border-[#e5e7eb] bg-[#f8fafc] p-4">
              <h3 class="text-sm font-semibold text-[#0f172a]">How Final Score is Calculated</h3>
              <p class="mt-2 font-mono text-xs text-[#475569]">
                Final Score = (Proximity Score × W1) + (Rating Score × W2) + (Acceptance Score × W3) + (Earnings Score × W4)
              </p>
              <div class="mt-3 grid gap-2 text-xs text-[#64748b]">
                <p><span class="font-medium text-[#334155]">Proximity Score:</span> Based on distance from pickup — 0-100 (closer = higher)</p>
                <p><span class="font-medium text-[#334155]">Rating Score:</span> Normalized rating value — 0-100 (higher rating = higher)</p>
                <p><span class="font-medium text-[#334155]">Acceptance Score:</span> Percentage of accepted trips — 0-100 (higher = higher)</p>
                <p><span class="font-medium text-[#334155]">Earnings Score:</span> Inverse of daily earnings — 0-100 (lower earnings = higher)</p>
              </div>
            </div>

            <!-- Recommended Configurations -->
            <div class="mt-6">
              <h3 class="text-sm font-semibold text-[#0f172a]">Recommended Configurations</h3>
              <div class="mt-3 grid gap-3 sm:grid-cols-3">
                <button
                  v-for="preset in recommendedPresets"
                  :key="preset.id"
                  class="flex flex-col items-start rounded-lg border border-[#e5e7eb] p-4 text-left transition-colors hover:border-[#2563eb] hover:bg-[#eff6ff]"
                  @click="applyPreset(preset)"
                >
                  <span class="flex h-9 w-9 items-center justify-center rounded-full" :class="preset.iconBg">
                    <svg v-if="preset.iconType === 'lightning'" class="h-4 w-4 text-[#2563eb]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                    <svg v-else-if="preset.iconType === 'check'" class="h-4 w-4 text-[#16a34a]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    <svg v-else-if="preset.iconType === 'balance'" class="h-4 w-4 text-[#8b5cf6]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/></svg>
                  </span>
                  <p class="mt-2 font-medium text-[#0f172a]">{{ preset.label }}</p>
                  <p class="mt-1 text-xs text-[#64748b]">Proximity {{ preset.proximity }}%, Rating {{ preset.rating }}%, Acceptance {{ preset.acceptance }}%, Earnings {{ preset.earnings }}%</p>
                </button>
              </div>
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="sticky bottom-0 flex justify-end gap-3 border-t border-[#e5e7eb] bg-white px-6 py-4">
            <button
              class="rounded-lg border border-[#e5e7eb] bg-white px-4 py-2.5 text-sm font-medium text-[#475569] hover:bg-[#f8fafc]"
              @click="closeWeightsModal"
            >
              Cancel
            </button>
            <button
              class="rounded-lg bg-[#2563eb] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#1d4ed8]"
              @click="saveModalWeights"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.range-slider {
  -webkit-appearance: none;
  appearance: none;
  background: linear-gradient(
    to right,
    #334155 0%,
    #334155 var(--fill, 40%),
    #e5e7eb var(--fill, 40%),
    #e5e7eb 100%
  );
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

<script setup lang="ts">
import { computed, ref } from 'vue';

const assignmentMode = ref<'auto' | 'broadcast' | 'manual'>('manual');
const assignmentModes = [
  { id: 'auto' as const, label: 'Auto Assignment', description: 'System automatically assigns to best-matched driver.' },
  { id: 'broadcast' as const, label: 'Broadcast Mode', description: 'Send to multiple drivers simultaneously. First to accept gets trip.' },
  { id: 'manual' as const, label: 'Manual Only', description: 'Admin must manually assign all trips.' },
];

const algorithmWeights = ref([
  { id: 'proximity', label: 'Proximity', value: 40 },
  { id: 'rating', label: 'Rating', value: 80 },
  { id: 'acceptance', label: 'Acceptance Rate', value: 20 },
  { id: 'earnings', label: 'Earnings Balance', value: 90 },
]);

const totalWeight = computed(() =>
  algorithmWeights.value.reduce((sum, w) => sum + w.value, 0)
);

const searchRadius = ref(5);
const offerTimeout = ref(30);
const triggerAfter = ref(3);
const bonusAmount = ref(5);
const pickupLocation = ref('');
const showWeightsModal = ref(false);

const weightsBreakdown = [
  { id: 'proximity', label: 'Proximity', description: 'Distance from arrival location', iconType: 'pin', iconBg: 'bg-[#dbeafe]', impact: 'Medium', impactDescription: 'Higher weight rewards drivers who are closest to the pickup location, ensuring passenger and time. Example: Driver with 1.5mi proximity scores higher than one with 5.4mi.' },
  { id: 'rating', label: 'Rating', description: "Driver's average rating", iconType: 'star', iconBg: 'bg-[#fef9c3]', impact: 'Very High', impactDescription: "Higher weight ensures top-rated drivers get more trips, improving passenger satisfaction and vehicle quality. Example: Driver with a 4.8-star rating higher than one with 3.4-star." },
  { id: 'acceptance', label: 'Acceptance Rate', description: "Driver's driver accepts trips", iconType: 'check', iconBg: 'bg-[#dcfce7]', impact: 'Low', impactDescription: 'Higher weight prioritizes reliable drivers who consistently accept trip requests, reducing failed assignment attempts. Example: Driver with 95% acceptance rate higher than 70%.' },
  { id: 'earnings', label: 'Earnings Balance', description: 'Fair distribution of income', iconType: 'dollar', iconBg: 'bg-[#ede9fe]', impact: 'Very High', impactDescription: 'Higher weight helps distribute trips more evenly among drivers, giving those with lower daily earnings a better chance at getting assignments. Example: Driver who earned $100 today assigned first over one who earned $400.' },
];

const recommendedPresets = [
  { id: 'speed', label: 'Speed First', iconType: 'lightning', iconBg: 'bg-[#dbeafe]', proximity: 50, rating: 20, acceptance: 20, earnings: 10 },
  { id: 'quality', label: 'Quality First', iconType: 'check', iconBg: 'bg-[#dcfce7]', proximity: 20, rating: 50, acceptance: 10, earnings: 20 },
  { id: 'balance', label: 'Balance', iconType: 'balance', iconBg: 'bg-[#ede9fe]', proximity: 25, rating: 25, acceptance: 25, earnings: 25 },
];

function getWeightById(id: string) {
  const w = algorithmWeights.value.find((x) => x.id === id);
  if (!w) throw new Error(`Weight not found: ${id}`);
  return w;
}

function openWeightsModal() {
  showWeightsModal.value = true;
}

function closeWeightsModal() {
  showWeightsModal.value = false;
}

function applyPreset(preset: (typeof recommendedPresets)[number]) {
  const set = (id: string, val: number) => {
    const w = algorithmWeights.value.find((x) => x.id === id);
    if (w) w.value = val;
  };
  set('proximity', preset.proximity);
  set('rating', preset.rating);
  set('acceptance', preset.acceptance);
  set('earnings', preset.earnings);
}

function saveModalWeights() {
  closeWeightsModal();
}

function saveSettings() {
  // TODO: persist settings
}

function simulateAssignment() {
  // TODO: run simulation
}
</script>
