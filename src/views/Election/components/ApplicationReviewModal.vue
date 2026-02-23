<template>
  <Transition name="fade">
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-[#0f172a]/40 px-4 py-10 backdrop-blur-sm">
      <div class="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.3em] text-[#94a3b8]">Application Review</p>
            <h3 class="mt-2 text-2xl font-semibold text-[#111827]">
              {{ application.name }}
            </h3>
            <p class="text-sm text-[#6b7280]">Review candidate application and take action</p>
          </div>
          <button
            type="button"
            class="rounded-full bg-[#f1f5f9] p-2 text-[#111827] transition hover:bg-[#e2e8f0]"
            @click="$emit('close')"
          >
            <IconX class="h-4 w-4" />
          </button>
        </div>

        <div class="mt-6">
          <div class="flex gap-6 border-b border-[#f1f5f9] text-sm font-semibold text-[#94a3b8]">
            <button
              v-for="tab in tabs"
              :key="tab"
              type="button"
              class="relative pb-3 transition"
              :class="{ 'text-[#111827]': tab === activeTab }"
              @click="activeTab = tab"
            >
              {{ tab }}
              <span
                v-if="tab === activeTab"
                class="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-[#111827]"
              />
            </button>
          </div>

          <div v-if="activeTab === 'Details'" class="mt-6 space-y-6">
            <div class="grid gap-4 sm:grid-cols-2">
              <DetailCard
                v-for="item in detailItems"
                :key="item.label"
                :label="item.label"
                :value="item.value"
                :icon="item.icon"
              />
            </div>
            <div>
              <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Platform Statement</p>
              <p class="mt-2 text-sm text-[#475569]">
                {{ application.statement || '—' }}
              </p>
            </div>
          </div>

          <div v-else-if="activeTab === 'Document'" class="mt-6 space-y-4">
            <div
              v-for="doc in (application.documents || [])"
              :key="doc.name"
              class="flex items-center justify-between rounded-2xl border border-[#f1f5f9] px-4 py-3 text-sm"
            >
              <div class="flex items-center gap-3 text-[#111827]">
                <span class="h-2 w-2 rounded-full bg-[#111827]" />
                <p class="font-semibold">{{ doc.name }}</p>
              </div>
              <button
                type="button"
                class="inline-flex items-center gap-2 text-sm font-semibold text-[#111827] transition hover:text-[#0f172a]"
              >
                <IconDownload class="h-4 w-4" />
                Download
              </button>
            </div>
            <div
              v-if="!(application.documents && application.documents.length)"
              class="rounded-2xl border border-dashed border-[#e2e8f0] p-6 text-center"
            >
              <IconFolder class="mx-auto mb-3 h-6 w-6 text-[#94a3b8]" />
              <p class="text-sm font-semibold text-[#111827]">No documents uploaded</p>
              <p class="text-xs text-[#6b7280]">Awaiting supporting files from candidate</p>
            </div>
          </div>

          <div v-else class="mt-6 space-y-6">
            <div>
              <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Review Notes</p>
              <textarea
                v-model="reviewNotes"
                rows="4"
                class="mt-2 w-full rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-sm text-[#111827] placeholder:text-[#cbd5f5]"
                placeholder="Add notes about this application..."
              />
            </div>
            <div class="flex flex-wrap gap-3">
              <button
                type="button"
                class="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-[#e2e8f0] bg-white px-4 py-2 text-sm font-semibold text-[#111827] transition hover:border-[#cbd5f5]"
                @click="emit('review', { status: 'approved', admin_notes: reviewNotes })"
              >
                <IconCircleCheck class="h-4 w-4 text-[#16a34a]" />
                Approve
              </button>
              <button
                type="button"
                class="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-[#e2e8f0] bg-white px-4 py-2 text-sm font-semibold text-[#111827] transition hover:border-[#cbd5f5]"
                @click="emit('review', { status: 'in_review', admin_notes: reviewNotes })"
              >
                <IconEye class="h-4 w-4 text-[#7c3aed]" />
                Under Review
              </button>
              <button
                type="button"
                class="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#111827] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#0f172a]"
                @click="emit('review', { status: 'rejected', admin_notes: reviewNotes })"
              >
                <IconInfoTriangle class="h-4 w-4 text-white" />
                Reject
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { computed, defineComponent, defineProps, defineEmits, ref, h } from 'vue';
import IconX from '@/components/icon/icon-x.vue';
import IconMail from '@/components/icon/icon-mail.vue';
import IconPhone from '@/components/icon/icon-phone.vue';
import IconMapPin from '@/components/icon/icon-map-pin.vue';
import IconBook from '@/components/icon/icon-book.vue';
import IconClipboardText from '@/components/icon/icon-clipboard-text.vue';
import IconFolder from '@/components/icon/icon-folder.vue';
import IconCircleCheck from '@/components/icon/icon-circle-check.vue';
import IconEye from '@/components/icon/icon-eye.vue';
import IconInfoTriangle from '@/components/icon/icon-info-triangle.vue';
import IconDownload from '@/components/icon/icon-download.vue';

const props = defineProps<{
  application: {
    candidateId: string;
    name: string;
    email: string;
    phone: string;
    district: string;
    education: string;
    experience: string;
    statement: string;
    documents: Array<{ name: string }>;
  };
}>();

defineEmits<{ (e: 'close'): void }>();

const tabs = ['Details', 'Document', 'Reviews'];
const activeTab = ref(tabs[0]);

const detailItems = computed(() => [
  { label: 'ID', value: props.application.candidateId, icon: IconClipboardText },
  { label: 'Email', value: props.application.email, icon: IconMail },
  { label: 'ID', value: props.application.candidateId ?? '—', icon: IconClipboardText },
  { label: 'Email', value: props.application.email ?? '—', icon: IconMail },
  { label: 'Phone', value: props.application.phone ?? '—', icon: IconPhone },
  { label: 'Education', value: props.application.education ?? '—', icon: IconBook },
  { label: 'Experience', value: props.application.experience ?? '—', icon: IconClipboardText },
  { label: 'District', value: props.application.district ?? '—', icon: IconMapPin },
]);

const DetailCard = defineComponent({
  name: 'DetailCard',
  props: {
    label: { type: String, required: true },
    value: { type: String, required: true },
    icon: { type: Object, required: true },
  },
  setup(props) {
    return () =>
      h('div', { class: 'rounded-2xl border border-[#f1f5f9] p-3' }, [
        h(
          'p',
          { class: 'text-[11px] font-semibold uppercase tracking-wide text-[#94a3b8]' },
          props.label
        ),
        h(
          'div',
          { class: 'mt-1 flex items-center gap-2 text-sm text-[#111827]' },
          [
            h(props.icon as never, { class: 'h-3.5 w-3.5 text-[#94a3b8]' }),
            h('span', null, props.value),
          ]
        ),
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
</style>

