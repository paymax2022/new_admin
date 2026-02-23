<template>
  <Transition name="fade">
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-[#0f172a]/40 px-4 py-10 backdrop-blur-sm">
      <div class="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl">
        <div class="flex items-start justify-between gap-4">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.3em] text-[#94a3b8]">
              Complaint #{{ complaint.id }} &middot; Submitted by {{ complaint.reporter }}
            </p>
            <h3 class="mt-2 text-2xl font-semibold text-[#111827]">{{ complaint.title }}</h3>
          </div>
          <button
            type="button"
            class="rounded-full bg-[#f1f5f9] p-2 text-[#111827] transition hover:bg-[#e2e8f0]"
            @click="$emit('close')"
          >
            <IconX class="h-4 w-4" />
          </button>
        </div>

        <div class="mt-6 space-y-6 text-sm text-[#111827]">
          <div>
            <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Description</p>
            <p class="mt-2 text-sm text-[#6b7280]">{{ complaint.description }}</p>
          </div>

          <div class="grid gap-4 sm:grid-cols-2">
            <Detail label="Status">
              <div class="flex items-center gap-2">
                <span
                  class="rounded-full px-3 py-1 text-xs font-semibold"
                  :style="{ backgroundColor: complaint.status.badgeBg, color: complaint.status.badgeColor }"
                >
                  {{ complaint.status.label }}
                </span>
                <select
                  v-model="selectedStatus"
                  class="rounded-full border border-[#e2e8f0] bg-[#f8fafc] px-3 py-1.5 text-xs font-semibold text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#111827]"
                  @change="emit('update-status', selectedStatus)"
                >
                  <option value="pending">Pending</option>
                  <option value="in_review">In Review</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            </Detail>
            <Detail label="Priority">
              <span
                class="rounded-full px-3 py-1 text-xs font-semibold"
                :style="{ backgroundColor: complaint.priority.badgeBg, color: complaint.priority.badgeColor }"
              >
                {{ complaint.priority.label }}
              </span>
            </Detail>
            <Detail label="Category">
              {{ complaint.category }}
            </Detail>
            <Detail label="Submitted">
              {{ complaint.date }}
            </Detail>
          </div>

          <div>
            <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Resolution / closing notes</p>
            <textarea
              v-model="resolution"
              rows="4"
              class="mt-2 w-full rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-sm text-[#111827]"
              placeholder="Enter resolution or closing notes..."
            />
          </div>

          <div class="flex flex-wrap justify-end gap-3">
            <button
              type="button"
              class="rounded-full border border-[#e2e8f0] px-5 py-2 text-sm font-semibold text-[#111827] transition hover:bg-[#f1f5f9]"
              @click="$emit('close')"
            >
              Cancel
            </button>
            <button
              type="button"
              class="rounded-full border border-[#e2e8f0] px-5 py-2 text-sm font-semibold text-[#111827] transition hover:bg-[#f1f5f9]"
              @click="emit('close-complaint', { closing_notes: resolution || 'Closed by admin' })"
            >
              Close complaint
            </button>
            <button
              type="button"
              class="rounded-full bg-[#111827] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#0f172a]"
              :disabled="!resolution.trim()"
              @click="emit('resolve', { admin_response: resolution.trim(), resolution: resolution.trim() })"
            >
              Mark as Resolved
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { ref, defineComponent, h, watch } from 'vue';
import IconX from '@/components/icon/icon-x.vue';

const props = defineProps<{
  complaint: {
    id?: string | number;
    title: string;
    reporter: string;
    description: string;
    date: string;
    category: string;
    priority: { label: string; badgeBg: string; badgeColor: string };
    status: { label: string; badgeBg: string; badgeColor: string };
  };
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'update-status', status: 'pending' | 'in_review' | 'resolved' | 'closed'): void;
  (e: 'resolve', payload: { admin_response: string; resolution: string }): void;
  (e: 'close-complaint', payload: { closing_notes: string }): void;
}>();

const resolution = ref('');
const selectedStatus = ref<'pending' | 'in_review' | 'resolved' | 'closed'>('pending');

watch(
  () => props.complaint?.status?.label,
  (label) => {
    const s = (label || '').toLowerCase();
    if (s === 'pending') selectedStatus.value = 'pending';
    else if (s === 'in progress' || s === 'in_review') selectedStatus.value = 'in_review';
    else if (s === 'resolved') selectedStatus.value = 'resolved';
    else if (s === 'closed') selectedStatus.value = 'closed';
    else selectedStatus.value = 'pending';
  },
  { immediate: true }
);

const Detail = defineComponent({
  name: 'Detail',
  props: { label: { type: String, required: true } },
  setup(detailProps, { slots }) {
    return () =>
      h(
        'div',
        { class: 'space-y-1 rounded-2xl border border-[#f1f5f9] p-3' },
        [
          h(
            'p',
            { class: 'text-[11px] font-semibold uppercase tracking-wide text-[#94a3b8]' },
            detailProps.label
          ),
          h(
            'div',
            { class: 'text-sm text-[#111827]' },
            slots.default ? slots.default() : undefined
          ),
        ]
      );
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
</style>

