<template>
  <transition name="fade">
    <div class="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
      <div class="absolute inset-0 bg-[#0f172a]/30 backdrop-blur-sm" @click="$emit('close')" />
      <div class="relative z-10 w-full max-w-xl rounded-3xl bg-white shadow-[0_40px_80px_rgba(15,23,42,0.18)]">
        <header class="flex items-center justify-between border-b border-[#f1f5f9] px-8 py-6">
          <div>
            <h2 class="text-xl font-semibold text-[#111827]">Ticket Details - {{ ticket.id }}</h2>
            <p class="text-sm text-[#6b7280]">Complete information about this support</p>
          </div>
          <button
            type="button"
            class="flex h-9 w-9 items-center justify-center rounded-full bg-[#f1f5f9] text-[#475569] transition hover:opacity-80"
            @click="$emit('close')"
          >
            <IconX class="h-5 w-5" />
          </button>
        </header>

        <section class="space-y-6 px-8 py-6 text-sm text-[#475569]">
          <div class="grid gap-6 sm:grid-cols-2">
            <div>
              <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">User</p>
              <p class="mt-1 text-[#111827]">{{ ticket.user }}</p>
            </div>
            <div>
              <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Category</p>
              <span class="mt-1 inline-flex items-center rounded-full bg-[#f8fafc] px-3 py-1 text-xs font-semibold text-[#475569]">
                {{ ticket.category }}
              </span>
            </div>
            <div class="sm:col-span-2">
              <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Subject</p>
              <p class="mt-1 font-semibold text-[#111827]">{{ ticket.subject }}</p>
            </div>
            <div>
              <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Priority</p>
              <span
                class="mt-1 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold capitalize"
                :class="priorityClasses[ticket.priority]"
              >
                {{ ticket.priority }}
              </span>
            </div>
            <div>
              <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Status</p>
              <span
                class="mt-1 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold capitalize"
                :class="statusClasses[ticket.status]"
              >
                {{ ticket.status }}
              </span>
            </div>
            <div>
              <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Created</p>
              <p class="mt-1 text-[#111827]">{{ ticket.created }}</p>
            </div>
            <div>
              <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Last Updated</p>
              <p class="mt-1 text-[#111827]">{{ ticket.updated }}</p>
            </div>
            <div class="sm:col-span-2">
              <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Assigned To</p>
              <p class="mt-1 text-[#111827]">{{ ticket.assignedTo }}</p>
            </div>
          </div>

          <div class="space-y-3">
            <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">
              Attachments ({{ ticket.attachmentsList.length }})
            </p>
            <div class="space-y-2 text-xs text-[#475569]">
              <div
                v-for="attachment in ticket.attachmentsList"
                :key="attachment.name"
                class="flex items-center justify-between rounded-2xl border border-[#e2e8f0] px-4 py-3"
              >
                <div class="flex items-center gap-3">
                  <img :src="attachment.thumbnail" :alt="attachment.name" class="h-12 w-12 rounded-xl object-cover" />
                  <div>
                    <p class="text-sm font-semibold text-[#111827]">{{ attachment.name }}</p>
                    <p class="text-[#94a3b8]">{{ attachment.size }}</p>
                  </div>
                </div>
                <button
                  type="button"
                  class="inline-flex items-center gap-2 text-sm font-semibold text-[#2563eb] transition hover:text-[#1d4ed8]"
                >
                  Download
                  <IconDownload class="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import IconDownload from '@/components/icon/icon-download.vue';
import IconX from '@/components/icon/icon-x.vue';

const priorityClasses: Record<'low' | 'medium' | 'high', string> = {
  low: 'bg-[#ecfdf5] text-[#16a34a]',
  medium: 'bg-[#fef3c7] text-[#ca8a04]',
  high: 'bg-[#fee2e2] text-[#ef4444]',
};

const statusClasses: Record<'open' | 'resolved' | 'pending', string> = {
  open: 'bg-[#eef2ff] text-[#4f46e5]',
  resolved: 'bg-[#ecfdf5] text-[#16a34a]',
  pending: 'bg-[#fff7ed] text-[#f97316]',
};

defineProps<{
  ticket: {
    id: string;
    user: string;
    subject: string;
    category: string;
    priority: 'low' | 'medium' | 'high';
    status: 'open' | 'resolved' | 'pending';
    assignedTo: string;
    created: string;
    updated: string;
    attachmentsList: { name: string; size: string; thumbnail: string }[];
  };
}>();

defineEmits(['close']);
</script>

