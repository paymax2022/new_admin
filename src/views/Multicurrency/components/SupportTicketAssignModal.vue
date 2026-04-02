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
              v-model="selectedAdminId"
              class="mt-2 w-full rounded-2xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm text-[#111827] focus:border-[#111827] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
              :disabled="loading || loadingAdmins"
            >
              <option value="" disabled selected>Select Staff</option>
              <option v-for="admin in admins" :key="admin.id" :value="admin.id">
                {{ admin.email }}
              </option>
            </select>
            <p v-if="loadingAdmins" class="mt-1 text-xs text-[#6b7280]">Loading admins...</p>
            <p v-if="error" class="mt-1 text-xs text-red-500">{{ error }}</p>
          </div>

          <div>
            <label class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Priority</label>
            <select
              v-model="selectedPriority"
              class="mt-2 w-full rounded-2xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm text-[#111827] focus:border-[#111827] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
              :disabled="loading"
            >
              <option value="">Keep current priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div>
            <label class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Status</label>
            <select
              v-model="selectedStatus"
              class="mt-2 w-full rounded-2xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm text-[#111827] focus:border-[#111827] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
              :disabled="loading"
            >
              <option value="">Keep current status</option>
              <option value="open">Open</option>
              <option value="in progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>

          <div>
            <label class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Notes</label>
            <textarea
              v-model="notes"
              rows="4"
              placeholder="Add any additional notes..."
              class="mt-2 w-full rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-sm text-[#111827] focus:border-[#111827] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
              :disabled="loading"
            ></textarea>
          </div>

          <div>
            <label class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Ticket Description</label>
            <textarea
              rows="4"
              class="mt-2 w-full rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-sm text-[#111827] focus:border-[#111827] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
              readonly
            >{{ ticket.description || 'No description available' }}</textarea>
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
            :disabled="loading || !selectedAdminId"
            class="rounded-full border border-[#111827] bg-[#111827] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#0b1220] disabled:opacity-50 disabled:cursor-not-allowed"
            @click="handleAssignTicket"
          >
            <span v-if="loading">Assigning...</span>
            <span v-else>Assign Ticket</span>
          </button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useToast } from 'vue-toastification';
import IconX from '@/components/icon/icon-x.vue';
import userService from '@/services/userService';
import supportTicketService from '@/services/supportTicketService';

const props = defineProps<{
  ticket: { 
    id: string; 
    description?: string;
    status?: string;
    priority?: string;
  };
}>();

const emit = defineEmits(['close', 'assigned']);

const toast = useToast();
const loading = ref(false);
const loadingAdmins = ref(false);
const error = ref('');

const admins = ref<Array<{ id: string; name: string; email: string }>>([]);
const selectedAdminId = ref('');
const selectedPriority = ref('');
const selectedStatus = ref('');
const notes = ref('');

// Fetch admin users (SYSTEM_ADMIN role)
const fetchAdmins = async () => {
  loadingAdmins.value = true;
  error.value = '';
  
  try {
    // Fetch users with SYSTEM_ADMIN role directly
    let allUsers: any[] = [];
    let page = 1;
    const limit = 100;
    let hasMore = true;

    while (hasMore) {
      const response = await userService.getUsers({ 
        page, 
        limit, 
        role: 'SYSTEM_ADMIN' 
      });
      
      let usersData: any[] = [];
      if (response?.data?.data && Array.isArray(response.data.data)) {
        usersData = response.data.data;
      } else if (Array.isArray(response?.data)) {
        usersData = response.data;
      }
      
      if (usersData.length === 0) {
        hasMore = false;
      } else {
        allUsers.push(...usersData);
        if (usersData.length < limit) {
          hasMore = false;
        } else {
          page++;
        }
      }
    }
    
    // Map users to admin format
    admins.value = allUsers.map(user => ({
      id: user.id || user._id || '',
      name: `${user.first_name || ''} ${user.lastname || ''}`.trim() || user.email || 'Unknown',
      email: user.email || '',
    }));
  } catch (err: any) {
    console.error('Error fetching admins:', err);
    error.value = err?.response?.data?.message || 'Failed to load admin users';
    toast.error('Failed to load admin users');
  } finally {
    loadingAdmins.value = false;
  }
};

// Handle assign ticket
const handleAssignTicket = async () => {
  if (!selectedAdminId.value) {
    toast.error('Please select a support staff member');
    return;
  }

  loading.value = true;
  error.value = '';
  
  try {
    const updateData: any = {
      id: props.ticket.id,
      assigned_to: selectedAdminId.value,
    };
    
    // Only include optional fields if they have values
    if (selectedPriority.value) {
      updateData.priority = selectedPriority.value;
    }
    
    if (selectedStatus.value) {
      updateData.status = selectedStatus.value;
    }
    
    if (notes.value.trim()) {
      updateData.notes = notes.value.trim();
    }
    
    await supportTicketService.updateTicket(updateData);
    
    toast.success('Ticket assigned successfully');
    emit('assigned');
    emit('close');
    
    // Reset form
    selectedAdminId.value = '';
    selectedPriority.value = '';
    selectedStatus.value = '';
    notes.value = '';
  } catch (err: any) {
    console.error('Error assigning ticket:', err);
    error.value = err?.response?.data?.message || 'Failed to assign ticket';
    toast.error('Failed to assign ticket');
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchAdmins();
});
</script>


