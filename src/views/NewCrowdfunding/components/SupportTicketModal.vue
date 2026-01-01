<template>
  <transition name="fade">
    <div class="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
      <div class="absolute inset-0 bg-[#0f172a]/40 backdrop-blur-sm" @click="$emit('close')" />
      <div class="relative z-10 flex w-full max-w-3xl max-h-[90vh] flex-col overflow-hidden rounded-3xl bg-white shadow-[0_40px_80px_rgba(15,23,42,0.18)]">
        <button
          type="button"
          class="absolute right-6 top-6 flex h-9 w-9 items-center justify-center rounded-full bg-[#f1f5f9] text-[#475569] transition hover:opacity-90"
          @click="$emit('close')"
        >
          <IconX class="h-5 w-5" />
        </button>

        <div class="flex-1 space-y-6 overflow-y-auto p-8">
          <div class="space-y-1">
            <h2 class="text-2xl font-semibold text-[#111827]">Ticket Details - {{ ticket.id }}</h2>
            <p class="text-sm text-[#64748b]">Manage ticket status, assignment, and responses.</p>
          </div>

          <div class="grid gap-4 sm:grid-cols-2">
            <div class="rounded-2xl border border-[#e2e8f0] bg-white px-5 py-4">
              <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Subject</p>
              <p class="mt-2 text-sm font-semibold text-[#111827]">{{ ticket.subject }}</p>
              <p class="mt-1 text-xs text-[#94a3b8]">User: {{ ticket.user }}</p>
            </div>
            <div class="rounded-2xl border border-[#e2e8f0] bg-white px-5 py-4 flex flex-col gap-2">
              <div class="flex items-center gap-3">
                <span class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Category</span>
                <span
                  class="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide"
                  :style="{ color: ticket.category.color, borderColor: ticket.category.color, backgroundColor: ticket.category.bg }"
                >
                  {{ ticket.category.label }}
                </span>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Priority</span>
                <span
                  class="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide"
                  :style="ticket.priority.label.toLowerCase() === 'high'
                    ? { color: '#FFFFFF', borderColor: ticket.priority.color, backgroundColor: ticket.priority.color }
                    : { color: ticket.priority.color, borderColor: ticket.priority.color, backgroundColor: ticket.priority.bg }"
                >
                  {{ ticket.priority.label }}
                </span>
              </div>
            </div>
          </div>

          <div class="rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] px-5 py-4">
            <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Description</p>
            <p class="mt-2 text-sm text-[#475569]">{{ ticket.detail.description }}</p>
          </div>

          <div class="grid gap-4 sm:grid-cols-2">
            <div class="space-y-2">
              <label class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]" for="ticket-status">Status</label>
              <select
                id="ticket-status"
                class="w-full rounded-full border border-[#e2e8f0] bg-white px-4 py-2 text-sm text-[#1f2937] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
              >
                <option>Select Status</option>
                <option>Open</option>
                <option>In Progress</option>
                <option>Resolved</option>
                <option>Escalated</option>
              </select>
            </div>
            <div class="space-y-2">
              <label class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]" for="ticket-agent">Assign Agent</label>
              <select
                id="ticket-agent"
                class="w-full rounded-full border border-[#e2e8f0] bg-white px-4 py-2 text-sm text-[#1f2937] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
              >
                <option>Select Agent</option>
                <option>Alice Johnson</option>
                <option>Daniel Craig</option>
                <option>Mary Nwoko</option>
              </select>
            </div>
          </div>

          <div class="space-y-2">
            <label class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]" for="ticket-response">Add Response</label>
            <textarea
              id="ticket-response"
              rows="4"
              placeholder="Enter reason (required)"
              class="w-full rounded-2xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm text-[#1f2937] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
            />
          </div>
        </div>

        <div class="border-t border-[#e2e8f0] bg-[#f8fafc] px-8 py-4">
          <div class="flex flex-wrap items-center justify-end gap-3">
            <button
              type="button"
              class="rounded-full border border-[#e2e8f0] px-5 py-2 text-sm font-semibold text-[#475569] transition hover:border-[#cbd5f5] hover:text-[#1e293b]"
              @click="$emit('close')"
            >
              Save Changes
            </button>
            <button
              type="button"
              class="rounded-full border border-[#2563eb] bg-[#2563eb] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#1d4ed8]"
              @click="$emit('assign')"
            >
              Assign Ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import IconX from '@/components/icon/icon-x.vue';

defineProps<{
  ticket: Record<string, any>;
}>();

defineEmits(['close', 'assign']);
</script>

