<template>
  <transition name="fade">
    <div class="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
      <div class="absolute inset-0 bg-[#0f172a]/30 backdrop-blur-sm" @click="$emit('close')" />
      <div class="relative z-10 w-full max-w-lg rounded-3xl bg-white shadow-[0_40px_80px_rgba(15,23,42,0.18)]">
        <header class="flex items-center justify-between border-b border-[#f1f5f9] px-8 py-6">
          <div>
            <h2 class="text-xl font-semibold text-[#111827]">Assign Ticket {{ ticket.id }}</h2>
            <p class="text-sm text-[#6b7280]">Assign this ticket to a support agent</p>
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
          <div>
            <label class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Support Staff</label>
            <select
              class="mt-2 w-full rounded-2xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm text-[#111827] focus:border-[#111827] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
            >
              <option disabled selected>Select Staff</option>
              <option>Mike Support</option>
              <option>Lisa Compliance</option>
              <option>John Admin</option>
            </select>
          </div>

          <div>
            <label class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Description</label>
            <textarea
              rows="4"
              class="mt-2 w-full rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-sm text-[#111827] focus:border-[#111827] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
              readonly
            >{{ ticket.description }}</textarea>
          </div>
        </section>

        <footer class="flex justify-end gap-3 border-t border-[#f1f5f9] px-8 py-5">
          <button
            type="button"
            class="rounded-full border border-[#e2e8f0] px-5 py-2 text-sm font-semibold text-[#475569] transition hover:border-[#cbd5f5]"
            @click="$emit('close')"
          >
            Cancel
          </button>
          <button
            type="button"
            class="rounded-full border border-[#111827] bg-[#111827] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#0b1220]"
          >
            Assign Ticket
          </button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import IconX from '@/components/icon/icon-x.vue';

defineProps<{
  ticket: { id: string; description: string };
}>();

defineEmits(['close']);
</script>


