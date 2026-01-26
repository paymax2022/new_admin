<template>
  <transition name="fade">
    <div class="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
      <div class="absolute inset-0 bg-[#0f172a]/30 backdrop-blur-sm" @click="$emit('close')" />
      <div class="relative z-10 w-full max-w-lg rounded-3xl bg-white shadow-[0_40px_80px_rgba(15,23,42,0.18)]">
        <header class="flex items-center justify-between border-b border-[#f1f5f9] px-8 py-6">
          <div>
            <h2 class="text-xl font-semibold text-[#111827]">Resolve Ticket {{ ticket.id }}</h2>
            <p class="text-sm text-[#6b7280]">Add resolution notes and mark as resolved</p>
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
            <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Issue Description</p>
            <p class="mt-2 rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-[#111827]">
              {{ ticket.description }}
            </p>
          </div>

          <div>
            <label class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Resolution Notes</label>
            <textarea
              v-model="notes"
              rows="5"
              placeholder="Describe how this issue was resolved..."
              class="mt-2 w-full rounded-2xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm text-[#111827] focus:border-[#111827] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
              :disabled="loading"
            />
            <p v-if="error" class="mt-1 text-xs text-red-500">{{ error }}</p>
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
            :disabled="loading"
            class="rounded-full border border-[#111827] bg-[#111827] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#0b1220] disabled:opacity-50 disabled:cursor-not-allowed"
            @click="handleResolveTicket"
          >
            <span v-if="loading">Resolving...</span>
            <span v-else>Mark as Resolved</span>
          </button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import IconX from '@/components/icon/icon-x.vue';
import supportTicketService from '@/services/supportTicketService';

const props = defineProps<{
  ticket: { 
    id: string; 
    description?: string;
  };
}>();

const emit = defineEmits(['close', 'resolved']);

const toast = useToast();
const loading = ref(false);
const error = ref('');
const notes = ref('');

// Handle resolve ticket
const handleResolveTicket = async () => {
  loading.value = true;
  error.value = '';
  
  try {
    const updateData: any = {
      id: props.ticket.id,
      status: 'resolved',
    };
    
    // Add notes if provided
    if (notes.value.trim()) {
      updateData.notes = notes.value.trim();
    }
    
    await supportTicketService.updateTicket(updateData);
    
    toast.success('Ticket marked as resolved successfully');
    emit('resolved');
    emit('close');
    
    // Reset form
    notes.value = '';
  } catch (err: any) {
    console.error('Error resolving ticket:', err);
    error.value = err?.response?.data?.message || 'Failed to resolve ticket';
    toast.error('Failed to resolve ticket');
  } finally {
    loading.value = false;
  }
};
</script>


