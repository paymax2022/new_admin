<template>
  <Transition name="fade">
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-[#0f172a]/40 px-4 py-10 backdrop-blur-sm">
      <div class="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl space-y-6">
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <div class="flex items-center gap-2">
              <IconSettings class="h-5 w-5 text-[#111827]" />
              <h3 class="text-2xl font-semibold text-[#111827]">Configure {{ provider.provider }}</h3>
            </div>
            <p class="mt-2 text-sm text-[#6b7280]">Manage API settings, commission rates, and service configuration for this provider.</p>
          </div>
          <button
            type="button"
            class="rounded-full bg-[#f1f5f9] p-2 text-[#111827] transition hover:bg-[#e2e8f0]"
            @click="$emit('close')"
          >
            <IconX class="h-4 w-4" />
          </button>
        </div>

        <div class="flex flex-wrap items-center gap-2">
          <button
            type="button"
            class="rounded-full border border-[#e2e8f0] bg-white px-4 py-2 text-sm font-semibold text-[#111827]"
          >
            {{ provider.service }}
          </button>
          <button
            type="button"
            class="rounded-full bg-[#dcfce7] px-4 py-2 text-sm font-semibold text-[#16a34a]"
          >
            Active
          </button>
        </div>

        <div class="flex gap-6 border-b border-[#f1f5f9] text-sm font-semibold">
          <button
            v-for="tab in tabs"
            :key="tab"
            type="button"
            class="relative pb-3 transition"
            :class="tab === activeTab ? 'text-[#111827]' : 'text-[#94a3b8]'"
            @click="activeTab = tab"
          >
            <div class="flex items-center gap-2">
              <component :is="tabIcons[tab]" class="h-4 w-4" />
              {{ tab }}
            </div>
            <span
              v-if="tab === activeTab"
              class="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-[#111827]"
            />
          </button>
        </div>

        <div v-if="activeTab === 'API'" class="space-y-4">
          <form class="space-y-4">
            <div class="grid gap-4 md:grid-cols-2">
              <Field label="API URL">
                <input class="form-input" placeholder="Enter URL" />
              </Field>
              <Field label="Timeout (seconds)">
                <input class="form-input" placeholder="0" value="0" />
              </Field>
              <Field label="API Key">
                <input class="form-input" placeholder="Enter API Key" />
              </Field>
              <Field label="Secret Key">
                <input class="form-input" placeholder="Enter Secret Key" />
              </Field>
              <Field label="Retry Attempts">
                <input class="form-input" placeholder="0" />
              </Field>
            </div>

            <div class="space-y-3">
              <div class="flex items-center gap-2 text-sm text-[#16a34a]">
                <span class="h-2 w-2 rounded-full bg-[#16a34a]" />
                <span class="font-semibold">Connection test</span>
                <span>Connection to provider API Successful</span>
              </div>
              <button type="button" class="inline-flex items-center gap-2 rounded-full border border-[#e2e8f0] bg-white px-4 py-2 text-sm font-semibold text-[#111827]">
                <IconServer class="h-4 w-4" />
                Test Connection
              </button>
            </div>
          </form>
        </div>

        <div v-else-if="activeTab === 'Rates'" class="space-y-6">
          <div class="space-y-4">
            <Field label="Commission Rate (%)">
              <input class="form-input" placeholder="Enter rate" />
              <p class="mt-2 text-xs text-[#6b7280]">Current rate 2.7%</p>
            </Field>

            <div class="space-y-3">
              <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Rate History</p>
              <div class="space-y-2">
                <div class="flex items-center justify-between rounded-2xl border border-[#f1f5f9] p-3">
                  <div class="flex items-center gap-3">
                    <span class="text-base font-semibold text-[#111827]">2.7%</span>
                    <span class="rounded-full bg-[#dcfce7] px-2 py-0.5 text-xs font-semibold text-[#16a34a]">Current</span>
                  </div>
                </div>
                <div class="flex items-center justify-between rounded-2xl border border-[#f1f5f9] p-3">
                  <span class="text-base font-semibold text-[#111827]">2.8%</span>
                  <span class="text-xs text-[#6b7280]">Jan 15, 2024</span>
                </div>
                <div class="flex items-center justify-between rounded-2xl border border-[#f1f5f9] p-3">
                  <span class="text-base font-semibold text-[#111827]">3.0%</span>
                  <span class="text-xs text-[#6b7280]">Dec 10, 2023</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else-if="activeTab === 'Services'" class="rounded-2xl border border-dashed border-[#e2e8f0] p-6 text-center">
          <p class="text-sm font-semibold text-[#111827]">Services configuration</p>
          <p class="text-xs text-[#6b7280] mt-2">Manage service settings and availability</p>
        </div>

        <div v-else-if="activeTab === 'Webhooks'" class="rounded-2xl border border-dashed border-[#e2e8f0] p-6 text-center">
          <p class="text-sm font-semibold text-[#111827]">Webhooks configuration</p>
          <p class="text-xs text-[#6b7280] mt-2">Configure webhook endpoints and callbacks</p>
        </div>

        <div class="flex justify-end gap-3">
          <button type="button" class="rounded-full border border-[#e2e8f0] px-4 py-2 text-sm font-semibold text-[#6b7280]" @click="$emit('close')">
            Cancel
          </button>
          <button type="button" class="rounded-full bg-[#7c3aed] px-4 py-2 text-sm font-semibold text-white">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { defineProps, defineComponent, defineEmits, ref, h } from 'vue';
import IconX from '@/components/icon/icon-x.vue';
import IconSettings from '@/components/icon/icon-settings.vue';
import IconServer from '@/components/icon/icon-server.vue';
import IconDollarSign from '@/components/icon/icon-dollar-sign.vue';
import IconBolt from '@/components/icon/icon-bolt.vue';
import IconLink from '@/components/icon/icon-link.vue';

defineProps<{
  provider: {
    provider: string;
    service: string;
  };
}>();

defineEmits<{ (e: 'close'): void }>();

const tabs = ['API', 'Rates', 'Services', 'Webhooks'];
const activeTab = ref(tabs[0]);

const tabIcons: Record<string, any> = {
  'API': IconServer,
  'Rates': IconDollarSign,
  'Services': IconBolt,
  'Webhooks': IconLink,
};

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
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.form-input {
  width: 100%;
  border-radius: 999px;
  border: 1px solid #e2e8f0;
  background-color: #f8fafc;
  padding: 0.65rem 1.25rem;
  font-size: 0.9rem;
  color: #111827;
}

.form-input:focus {
  outline: none;
  border-color: #94a3b8;
  background-color: #fff;
  box-shadow: 0 0 0 2px rgba(148, 163, 184, 0.2);
}
</style>

