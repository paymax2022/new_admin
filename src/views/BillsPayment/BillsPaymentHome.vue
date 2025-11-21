<template>
  <div class="min-h-screen bg-[#f7f9fc] p-6 space-y-6" @click="activeDropdown = null">
    <header class="space-y-1">
      <p class="text-sm font-semibold uppercase tracking-[0.2em] text-[#9ca3af]">Bill Payment Services</p>
      <h1 class="text-3xl font-semibold text-[#111827]">Bill Payment Services</h1>
      <p class="text-sm text-[#6b7280]">Manage airtime, data, electricity, and TV subscriptions services</p>
    </header>

    <section class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <article
        v-for="card in serviceSummary"
        :key="card.title"
        class="rounded-3xl bg-white p-5 shadow-[0_20px_40px_rgba(15,23,42,0.05)] space-y-4"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">{{ card.title }}</p>
            <p class="mt-3 text-2xl font-semibold text-[#111827]">{{ card.amount }}</p>
          </div>
          <span
            class="rounded-full border px-3 py-1 text-xs font-semibold uppercase"
            :class="card.status === 'Active' ? 'border-[#16a34a] text-[#16a34a]' : 'border-[#f59e0b] text-[#f59e0b]'"
          >
            {{ card.status }}
          </span>
        </div>
        <div class="grid grid-cols-2 gap-3 text-xs text-[#6b7280]">
          <div>
            <p class="font-semibold text-[#111827]">{{ card.metrics.revenue }}</p>
            <p>Total Revenue</p>
          </div>
          <div>
            <p class="font-semibold text-[#111827]">{{ card.metrics.transactions }}</p>
            <p>Transactions</p>
          </div>
          <div>
            <p class="font-semibold text-[#111827]">{{ card.metrics.uptime }}</p>
            <p>Uptime</p>
          </div>
          <div>
            <p class="font-semibold text-[#111827]">{{ card.metrics.providers }}</p>
            <p>Providers</p>
          </div>
        </div>
      </article>
    </section>

    <section class="rounded-3xl bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.05)] space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-semibold text-[#111827]">Service Providers</h2>
        <button class="rounded-full border border-[#e2e8f0] px-4 py-2 text-sm font-semibold text-[#6b7280]">
          Add Provider
        </button>
      </div>

      <div class="overflow-x-auto overflow-y-visible">
        <table class="w-full text-left text-sm">
          <thead>
            <tr class="text-[#94a3b8] uppercase text-xs tracking-wide">
              <th class="py-3">Provider</th>
              <th>Service</th>
              <th>Status</th>
              <th>Success Rate</th>
              <th>Commission</th>
              <th>Uptime</th>
              <th>Last Sync</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody class="text-[#111827]">
            <tr
              v-for="provider in providers"
              :key="provider.provider"
              class="border-t border-[#f1f5f9]"
            >
              <td class="py-4 font-semibold">{{ provider.provider }}</td>
              <td>{{ provider.service }}</td>
              <td>
                <span
                  class="rounded-full px-3 py-1 text-xs font-semibold uppercase"
                  :class="provider.statusClass"
                >
                  {{ provider.status }}
                </span>
              </td>
              <td>
                <span :class="provider.successRateColor">{{ provider.successRate }}</span>
              </td>
              <td>{{ provider.commission }}</td>
              <td>
                <span :class="provider.uptimeColor">{{ provider.uptime }}</span>
              </td>
              <td class="text-[#94a3b8] text-xs">{{ provider.lastSync }}</td>
              <td>
                <div class="relative" @click.stop>
                  <button
                    :ref="(el) => setButtonRef(provider.provider, el)"
                    type="button"
                    class="rounded-full p-2 text-[#6b7280] transition hover:bg-[#f1f5f9]"
                    @click="toggleDropdown(provider.provider)"
                  >
                    <IconHorizontalDots class="h-5 w-5" />
                  </button>
                  <Teleport to="body">
                    <div
                      v-if="activeDropdown === provider.provider"
                      class="fixed z-[9999] w-48 rounded-2xl border border-[#e2e8f0] bg-white p-2 shadow-lg"
                      :style="getDropdownPosition(provider.provider)"
                      data-dropdown="true"
                    >
                    <button
                      type="button"
                      class="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-semibold text-[#111827] transition hover:bg-[#f8fafc]"
                      @click="openConfig(provider)"
                    >
                      <IconSettings class="h-4 w-4" />
                      Configure
                    </button>
                    <button
                      type="button"
                      class="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-semibold text-[#111827] transition hover:bg-[#f8fafc]"
                      @click="openTestConnection(provider)"
                    >
                      <IconLink class="h-4 w-4" />
                      Test connection
                    </button>
                    <button
                      type="button"
                      class="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-semibold text-[#111827] transition hover:bg-[#f8fafc]"
                      @click="openLogs(provider)"
                    >
                      <IconEye class="h-4 w-4" />
                      View logs
                    </button>
                    <button
                      type="button"
                      class="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-semibold text-[#dc2626] transition hover:bg-[#f8fafc]"
                      @click="openSuspendModal(provider)"
                    >
                      <IconBan class="h-4 w-4" />
                      Suspend
                    </button>
                    </div>
                  </Teleport>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="grid gap-6 lg:grid-cols-2">
      <article class="rounded-3xl bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.05)] space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold text-[#111827]">Service Configuration</h2>
          <div class="flex gap-2">
            <button
              v-for="service in configTabs"
              :key="service"
              class="rounded-full px-3 py-1 text-xs font-semibold"
              :class="service === activeConfig ? 'bg-[#111827] text-white' : 'bg-[#f1f5f9] text-[#6b7280]'"
              @click="activeConfig = service"
            >
              {{ service }}
            </button>
          </div>
        </div>
        <form class="space-y-4">
          <div class="grid gap-4 md:grid-cols-2">
            <Field label="Service Provider">
              <select class="input-select">
                <option>MTN Nigeria</option>
              </select>
            </Field>
            <Field label="Maximum Amount (₦)">
              <input type="number" class="input-select" placeholder="Enter amount" />
            </Field>
            <Field label="Service Fee (%)">
              <input type="number" class="input-select" placeholder="2.5" />
            </Field>
            <Field label="Markup (%)">
              <input type="number" class="input-select" placeholder="1.2" />
            </Field>
          </div>
          <Field label="API Key / Route">
            <input type="text" class="input-select" placeholder="Enter API route" />
          </Field>
          <div class="flex items-center justify-between rounded-2xl border border-[#f1f5f9] p-4">
            <div>
              <p class="text-sm font-semibold text-[#111827]">Service Enabled</p>
              <p class="text-xs text-[#6b7280]">Toggle to enable/disable service</p>
            </div>
            <button
              type="button"
              class="relative h-6 w-11 rounded-full transition"
              :class="serviceEnabled ? 'bg-[#111827]' : 'bg-[#e2e8f0]'"
              @click="serviceEnabled = !serviceEnabled"
            >
              <span
                class="absolute top-1 left-1 h-4 w-4 rounded-full bg-white transition"
                :class="serviceEnabled ? 'translate-x-[20px]' : ''"
              />
            </button>
          </div>
          <div class="flex justify-end gap-3">
            <button type="button" class="rounded-full border border-[#e2e8f0] px-4 py-2 text-sm font-semibold text-[#6b7280]">
              Cancel
            </button>
            <button type="button" class="rounded-full bg-[#7c3aed] px-4 py-2 text-sm font-semibold text-white">
              Save Changes
            </button>
          </div>
        </form>
      </article>

      <article class="rounded-3xl bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.05)] space-y-4">
        <h2 class="text-lg font-semibold text-[#111827]">System Health</h2>
        <div class="space-y-4">
          <div
            v-for="health in systemHealth"
            :key="health.label"
            class="flex items-center justify-between rounded-2xl border border-[#f1f5f9] p-4"
          >
            <div>
              <p class="text-sm font-semibold text-[#111827]">{{ health.label }}</p>
              <p class="text-xs text-[#6b7280]">{{ health.description }}</p>
            </div>
            <span
              class="rounded-full px-3 py-1 text-xs font-semibold uppercase"
              :class="health.statusClass"
            >
              {{ health.status }}
            </span>
          </div>
          <div class="rounded-2xl border border-[#f1f5f9] p-4 text-sm text-[#111827]">
            <p>Next Sync</p>
            <p class="text-2xl font-semibold mt-2">02:00 PM</p>
            <p class="text-xs text-[#6b7280]">Estimated</p>
          </div>
        </div>
      </article>
    </section>
  </div>

  <ConfigureProviderModal
    v-if="configModal.open && configModal.provider"
    :provider="configModal.provider"
    @close="closeConfig"
  />

  <ProviderLogsModal
    v-if="logsModal.open && logsModal.provider"
    :provider="logsModal.provider"
    @close="closeLogs"
  />

  <SuspendProviderModal
    v-if="suspendModal.open && suspendModal.provider"
    :provider="suspendModal.provider"
    @close="closeSuspendModal"
    @suspend="handleSuspend"
  />

  <TestConnectionModal
    v-if="testConnectionModal.open && testConnectionModal.provider"
    :provider="testConnectionModal.provider"
    @close="closeTestConnection"
    @runTest="handleRunTest"
  />
</template>

<script setup lang="ts">
import { defineComponent, h, ref, onMounted, onUnmounted } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import ConfigureProviderModal from './components/ConfigureProviderModal.vue';
import ProviderLogsModal from './components/ProviderLogsModal.vue';
import SuspendProviderModal from './components/SuspendProviderModal.vue';
import TestConnectionModal from './components/TestConnectionModal.vue';
import IconHorizontalDots from '@/components/icon/icon-horizontal-dots.vue';
import IconSettings from '@/components/icon/icon-settings.vue';
import IconLink from '@/components/icon/icon-link.vue';
import IconEye from '@/components/icon/icon-eye.vue';
import IconBan from '@/components/icon/icon-ban.vue';

const serviceSummary = [
  {
    title: 'Airtime',
    amount: '₦2,450,000',
    status: 'Active',
    metrics: {
      revenue: '₦2,450,000',
      transactions: '12,453',
      uptime: '99.5%',
      providers: '4 providers',
    },
  },
  {
    title: 'Data',
    amount: '₦6,670,000',
    status: 'Active',
    metrics: {
      revenue: '₦6,670,000',
      transactions: '15,121',
      uptime: '98.5%',
      providers: '5 providers',
    },
  },
  {
    title: 'Electricity',
    amount: '₦8,340,000',
    status: 'Active',
    metrics: {
      revenue: '₦8,340,000',
      transactions: '12,453',
      uptime: '99.6%',
      providers: '4 providers',
    },
  },
  {
    title: 'TV Subscriptions',
    amount: '₦1,890,000',
    status: 'Active',
    metrics: {
      revenue: '₦1,890,000',
      transactions: '8,563',
      uptime: '98.5%',
      providers: '3 providers',
    },
  },
];

const providers = [
  {
    provider: 'MTN Nigeria',
    service: 'Airtime/Data',
    status: 'Active',
    statusClass: 'bg-[#dcfce7] text-[#15803d]',
    successRate: '98.5%',
    commission: '2.5%',
    uptime: '98.5%',
    lastSync: '2 mins ago',
    successRateColor: 'text-[#16a34a] font-semibold',
    uptimeColor: 'text-[#16a34a] font-semibold',
  },
  {
    provider: 'Airtel Nigeria',
    service: 'Airtime/Data',
    status: 'Inactive',
    statusClass: 'bg-[#f1f5f9] text-[#64748b]',
    successRate: '96.1%',
    commission: '1.5%',
    uptime: '96.1%',
    lastSync: '2 mins ago',
    successRateColor: 'text-[#16a34a] font-semibold',
    uptimeColor: 'text-[#16a34a] font-semibold',
  },
  {
    provider: 'IKEDC',
    service: 'Electricity',
    status: 'Active',
    statusClass: 'bg-[#dcfce7] text-[#15803d]',
    successRate: '94.3%',
    commission: '3.0%',
    uptime: '97.2%',
    lastSync: '2 mins ago',
    successRateColor: 'text-[#f97316] font-semibold',
    uptimeColor: 'text-[#f97316] font-semibold',
  },
  {
    provider: 'GOtv',
    service: 'TV Subscription',
    status: 'Suspended',
    statusClass: 'bg-[#fee2e2] text-[#b91c1c]',
    successRate: '78.9%',
    commission: '1.8%',
    uptime: '96.1%',
    lastSync: '2 mins ago',
    successRateColor: 'text-[#dc2626] font-semibold',
    uptimeColor: 'text-[#16a34a] font-semibold',
  },
];

const configTabs = ['Airtime', 'Data', 'Electricity', 'TV'];
const activeConfig = ref('Airtime');
const serviceEnabled = ref(true);

const systemHealth = [
  {
    label: 'API Response Time',
    description: 'Average response time in the last 24 hours',
    status: 'Healthy',
    statusClass: 'bg-[#dcfce7] text-[#15803d]',
  },
  {
    label: 'Database Sync',
    description: 'Last sync: 5 mins ago',
    status: 'Healthy',
    statusClass: 'bg-[#dcfce7] text-[#15803d]',
  },
  {
    label: 'Transaction Error Rate',
    description: '0.2% error rate in the last 24 hours',
    status: 'Healthy',
    statusClass: 'bg-[#dbeafe] text-[#1d4ed8]',
  },
  {
    label: 'Queue Backlog',
    description: '120 pending operations',
    status: 'Monitor',
    statusClass: 'bg-[#fef3c7] text-[#b45309]',
  },
];

const Field = defineComponent({
  name: 'Field',
  props: { label: { type: String, required: true } },
  setup(props, { slots }) {
    return () =>
      h('div', { class: 'space-y-2' }, [
        h('p', { class: 'text-xs font-semibold uppercase tracking-wide text-[#94a3b8]' }, props.label),
        slots.default ? slots.default() : null,
      ]);
  },
});

const configModal = ref<{ open: boolean; provider: (typeof providers)[0] | null }>({
  open: false,
  provider: null,
});

const logsModal = ref<{ open: boolean; provider: (typeof providers)[0] | null }>({
  open: false,
  provider: null,
});

const suspendModal = ref<{ open: boolean; provider: (typeof providers)[0] | null }>({
  open: false,
  provider: null,
});

const testConnectionModal = ref<{ open: boolean; provider: (typeof providers)[0] | null }>({
  open: false,
  provider: null,
});

const activeDropdown = ref<string | null>(null);
const buttonRefs = ref<Record<string, HTMLElement | null>>({});

const setButtonRef = (providerName: string, el: HTMLElement | Element | ComponentPublicInstance | null) => {
  if (el && el instanceof HTMLElement) {
    buttonRefs.value[providerName] = el;
  } else if (el && '$el' in el && el.$el instanceof HTMLElement) {
    buttonRefs.value[providerName] = el.$el;
  }
};

const getDropdownPosition = (providerName: string) => {
  const button = buttonRefs.value[providerName];
  if (!button) {
    return { display: 'none' };
  }
  
  const rect = button.getBoundingClientRect();
  return {
    top: `${rect.bottom + 8}px`,
    right: `${window.innerWidth - rect.right}px`,
  };
};

const toggleDropdown = (providerName: string) => {
  activeDropdown.value = activeDropdown.value === providerName ? null : providerName;
};

const handleClickOutside = (event: MouseEvent) => {
  if (activeDropdown.value) {
    const target = event.target as HTMLElement;
    const isButton = Object.values(buttonRefs.value).some((ref) => ref?.contains(target));
    const isDropdown = target.closest('[data-dropdown="true"]');
    if (!isButton && !isDropdown) {
      activeDropdown.value = null;
    }
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

const openConfig = (provider: (typeof providers)[0]) => {
  configModal.value = { open: true, provider };
  activeDropdown.value = null;
};

const closeConfig = () => {
  configModal.value = { open: false, provider: null };
};

const openLogs = (provider: (typeof providers)[0]) => {
  logsModal.value = { open: true, provider };
  activeDropdown.value = null;
};

const closeLogs = () => {
  logsModal.value = { open: false, provider: null };
};

const openSuspendModal = (provider: (typeof providers)[0]) => {
  suspendModal.value = { open: true, provider };
  activeDropdown.value = null;
};

const closeSuspendModal = () => {
  suspendModal.value = { open: false, provider: null };
};

const handleSuspend = () => {
  // Handle suspend action here
  console.log('Suspending provider:', suspendModal.value.provider);
  closeSuspendModal();
  // You can add additional logic here, like updating the provider status
};

const openTestConnection = (provider: (typeof providers)[0]) => {
  testConnectionModal.value = { open: true, provider };
  activeDropdown.value = null;
};

const closeTestConnection = () => {
  testConnectionModal.value = { open: false, provider: null };
};

const handleRunTest = () => {
  // Handle run test action here
  console.log('Running connection test for provider:', testConnectionModal.value.provider);
  // You can add additional logic here, like actually running the connection test
};
</script>

<style scoped>
.input-select {
  width: 100%;
  border-radius: 999px;
  border: 1px solid #e2e8f0;
  background-color: #f8fafc;
  padding: 0.65rem 1.25rem;
  font-size: 0.9rem;
  color: #111827;
}

.input-select:focus {
  outline: none;
  border-color: #94a3b8;
  background-color: #fff;
  box-shadow: 0 0 0 2px rgba(148, 163, 184, 0.2);
}
</style>
