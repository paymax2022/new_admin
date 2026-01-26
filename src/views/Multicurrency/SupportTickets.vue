<template>
  <div class="min-h-screen bg-[#f7f9fc] p-6 space-y-8">
    <header class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div class="space-y-1">
        <h1 class="text-2xl font-semibold text-[#111827]">Support Tickets</h1>
        <p class="text-sm text-[#6b7280]">Manage customer support requests</p>
      </div>
    </header>

    <section class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <article
        v-for="card in statCards"
        :key="card.label"
        class="flex flex-col justify-between rounded-3xl border border-transparent bg-white p-5 shadow-[0_20px_40px_rgba(15,23,42,0.05)]"
      >
        <div class="flex items-center justify-between">
          <div class="space-y-2">
            <p class="text-sm font-semibold uppercase tracking-wide text-[#6b7280]">{{ card.label }}</p>
            <p class="text-2xl font-semibold text-[#111827]">{{ card.value }}</p>
          </div>
          <div
            class="flex h-12 w-12 items-center justify-center rounded-2xl"
            :style="{ backgroundColor: card.iconBg, color: card.iconColor }"
          >
            <component :is="card.icon" class="h-6 w-6" />
          </div>
        </div>
        <p class="mt-4 text-sm font-medium" :class="card.deltaColor">{{ card.delta }}</p>
      </article>
    </section>

    <section class="rounded-3xl bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.05)] space-y-6">
      <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 class="text-lg font-semibold text-[#111827]">All Support Tickets</h2>
          <p class="text-sm text-[#6b7280]">View and respond to customer issues</p>
        </div>
        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <div class="relative flex items-center">
            <IconSearch class="absolute left-4 h-4 w-4 text-[#94a3b8]" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search tickets..."
              class="w-full rounded-full border border-[#e2e8f0] bg-[#f8fafc] py-2 pl-11 pr-4 text-sm text-[#1f2937] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
              @input="handleSearch"
            />
          </div>
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-full border border-[#e2e8f0] bg-white px-4 py-2 text-sm font-semibold text-[#475569] transition hover:border-[#cbd5f5] hover:text-[#1e293b]"
          >
            <IconSettings class="h-4 w-4" />
            Filters
          </button>
        </div>
      </div>

      <div class="rounded-3xl border border-[#e2e8f0] bg-white">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-[#e2e8f0] text-sm text-[#475569]">
            <thead class="bg-[#f8fafc] text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">
              <tr>
                <th class="px-5 py-4 text-left font-semibold text-[#111827]">Ticket ID</th>
                <th class="px-5 py-4 text-left">User</th>
                <th class="px-5 py-4 text-left">Subject</th>
                <th class="px-5 py-4 text-left">Category</th>
                <th class="px-5 py-4 text-left">Priority</th>
                <th class="px-5 py-4 text-left">Status</th>
                <th class="px-5 py-4 text-left">Assigned To</th>
                <th class="px-5 py-4 text-left">Attachments</th>
                <th class="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[#e2e8f0] bg-white">
              <tr v-if="loading">
                <td colspan="9" class="px-5 py-8 text-center text-sm text-[#6b7280]">Loading support tickets...</td>
              </tr>
              <tr v-else-if="error">
                <td colspan="9" class="px-5 py-8 text-center text-sm text-red-500">{{ error }}</td>
              </tr>
              <tr v-else-if="filteredTickets.length === 0">
                <td colspan="9" class="px-5 py-8 text-center text-sm text-[#6b7280]">No support tickets found</td>
              </tr>
              <tr v-else v-for="(ticket, index) in paginatedTickets" :key="ticket.id" class="relative hover:bg-[#f8fafc] transition">
                <td class="px-5 py-5 font-semibold text-[#111827]">{{ ticket.id || ticket.reference || 'N/A' }}</td>
                <td class="px-5 py-5">{{ ticket.user }}</td>
                <td class="px-5 py-5 text-[#475569]">{{ ticket.subject }}</td>
                <td class="px-5 py-5">
                  <span class="inline-flex items-center rounded-full bg-[#f8fafc] px-3 py-1 text-xs font-semibold capitalize text-[#475569]">
                    {{ ticket.category }}
                  </span>
                </td>
                <td class="px-5 py-5">
                  <span
                    class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold capitalize"
                    :class="priorityClasses[ticket.priority]"
                  >
                    {{ ticket.priority }}
                  </span>
                </td>
                <td class="px-5 py-5">
                  <span
                    class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold capitalize"
                    :class="statusClasses[ticket.status]"
                  >
                    {{ ticket.status }}
                  </span>
                </td>
                <td class="px-5 py-5 text-[#475569]">{{ ticket.assignedTo }}</td>
                <td class="px-5 py-5 text-[#475569]">{{ ticket.attachments }}</td>
                <td class="px-5 py-5 text-right">
                  <div class="relative inline-flex">
                    <button
                      type="button"
                      :ref="el => setButtonRef(el, index)"
                      class="action-menu-button flex h-9 w-9 items-center justify-center rounded-full border border-[#e2e8f0] text-[#475569] transition hover:border-[#cbd5f5]"
                      @click.stop="toggleRowMenu(index)"
                    >
                      <IconHorizontalDots class="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- Pagination -->
        <div v-if="!loading && filteredTickets.length > 0" class="flex items-center justify-between border-t border-[#e2e8f0] px-5 py-4">
          <div class="text-sm text-[#6b7280]">
            Showing <span class="font-medium text-[#111827]">{{ pagination.startIndex + 1 }}</span> to 
            <span class="font-medium text-[#111827]">{{ pagination.endIndex }}</span> of 
            <span class="font-medium text-[#111827]">{{ totalCount }}</span> entries
          </div>
          <div class="flex items-center gap-2">
            <button
              @click="prevPage"
              :disabled="currentPage === 1"
              class="rounded-full border border-[#e2e8f0] px-4 py-2 text-sm text-[#475569] transition hover:bg-[#f8fafc] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span class="text-sm text-[#475569]">
              Page {{ currentPage }} of {{ totalPages }}
            </span>
            <button
              @click="nextPage"
              :disabled="currentPage === totalPages"
              class="rounded-full border border-[#e2e8f0] px-4 py-2 text-sm text-[#475569] transition hover:bg-[#f8fafc] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>

    <SupportTicketDetailsModal
      v-if="detailsModal.open && detailsModal.ticket"
      :ticket="{
        ...detailsModal.ticket,
        priority: detailsModal.ticket.priority as 'high' | 'medium' | 'low',
        status: detailsModal.ticket.status as 'open' | 'pending' | 'resolved'
      }"
      @close="closeTicketDetails"
    />
    <SupportTicketAssignModal
      v-if="assignModal.open && assignModal.ticket"
      :ticket="assignModal.ticket"
      @close="closeAssignModal"
      @assigned="handleTicketAssigned"
    />
    <SupportTicketResolveModal
      v-if="resolveModal.open && resolveModal.ticket"
      :ticket="resolveModal.ticket"
      @close="closeResolveModal"
      @resolved="handleTicketResolved"
    />

    <!-- Teleported dropdown menu -->
    <Teleport to="body">
      <transition name="fade">
        <div
          v-if="openMenuIndex !== null && menuPosition"
          class="action-menu-dropdown w-44 rounded-2xl border border-[#e2e8f0] bg-white py-2 text-left shadow-[0_20px_40px_rgba(15,23,42,0.12)]"
          :style="{
            position: 'fixed',
            top: `${menuPosition.top}px`,
            right: `${menuPosition.right}px`,
            zIndex: 9999
          }"
        >
          <button
            type="button"
            class="flex w-full items-center justify-between px-4 py-2 text-sm font-semibold text-[#475569] transition hover:bg-[#f8fafc]"
            @click="openTicketDetails(paginatedTickets[openMenuIndex])"
          >
            View Details
            <IconEye class="h-4 w-4 text-[#2563eb]" />
          </button>
          <button
            type="button"
            :disabled="isAssignDisabled"
            class="flex w-full items-center justify-between px-4 py-2 text-sm font-semibold transition"
            :class="isAssignDisabled 
              ? 'text-[#94a3b8] cursor-not-allowed opacity-50' 
              : 'text-[#4f46e5] hover:bg-[#f5f3ff]'"
            @click="!isAssignDisabled && openAssignModal(paginatedTickets[openMenuIndex])"
          >
            Assign Ticket
            <IconUserPlus class="h-4 w-4" />
          </button>
          <button
            type="button"
            :disabled="isResolveDisabled"
            class="flex w-full items-center justify-between px-4 py-2 text-sm font-semibold transition"
            :class="isResolveDisabled 
              ? 'text-[#94a3b8] cursor-not-allowed opacity-50' 
              : 'text-[#22c55e] hover:bg-[#ecfdf5]'"
            @click="!isResolveDisabled && openResolveModal(paginatedTickets[openMenuIndex])"
          >
            Mark as Resolved
            <IconCheck class="h-4 w-4" />
          </button>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, ref, watch, nextTick } from 'vue';
import { useToast } from 'vue-toastification';
import supportTicketService from '@/services/supportTicketService';
import userService from '@/services/userService';

import IconBellBing from '@/components/icon/icon-bell-bing.vue';
import IconCheck from '@/components/icon/icon-checks.vue';
import IconEye from '@/components/icon/icon-eye.vue';
import IconHorizontalDots from '@/components/icon/icon-horizontal-dots.vue';
import IconMessageDots from '@/components/icon/icon-message-dots.vue';
import IconSearch from '@/components/icon/icon-search.vue';
import IconSettings from '@/components/icon/icon-settings.vue';
import IconTrendingUp from '@/components/icon/icon-trending-up.vue';
import IconUserCircle from '@/components/icon/icon-user-circle.vue';
import IconUserPlus from '@/components/icon/icon-user-plus.vue';
import IconWallet from '@/components/icon/icon-wallet.vue';

import SupportTicketDetailsModal from './components/SupportTicketDetailsModal.vue';
import AttachmentPlaceholder from '@/assets/image/campaignImage.png';
import SupportTicketAssignModal from './components/SupportTicketAssignModal.vue';
import SupportTicketResolveModal from './components/SupportTicketResolveModal.vue';

const toast = useToast();
const loading = ref(false);
const error = ref('');
const searchQuery = ref('');
const currentPage = ref(1);
const limit = ref(10);
const totalCount = ref(0);

type Ticket = {
  id: string;
  reference?: string;
  user: string;
  subject: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'resolved' | 'pending';
  status_raw?: string; // Raw status from API
  assignedTo: string;
  created: string;
  updated?: string;
  attachments: string;
  attachmentsList?: Array<{ name: string; size: string; thumbnail: string }>;
  description?: string;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
};

const tickets = ref<Ticket[]>([]);
const userMap = ref<Record<string, string>>({});

// Fetch user name by ID
const fetchUserName = async (userId: string): Promise<string> => {
  if (userMap.value[userId]) {
    return userMap.value[userId];
  }
  
  try {
    const response = await userService.getUserById(userId);
    const userData = response?.data?.data || response?.data;
    if (userData) {
      const userName = `${userData.first_name || ''} ${userData.lastname || ''}`.trim() || userData.email || 'Unknown User';
      userMap.value[userId] = userName;
      return userName;
    }
  } catch (err) {
    console.error(`Error fetching user ${userId}:`, err);
  }
  
  return 'Unknown User';
};

// Fetch support tickets from API
const fetchTickets = async () => {
  loading.value = true;
  error.value = '';
  
  try {
    const response = await supportTicketService.getTickets({
      page: currentPage.value,
      limit: limit.value,
    });
    
    // Handle response structure: { data: { data: [...], totalItems, currentPage, countPerPage } }
    let ticketsData: any[] = [];
    if (response?.data?.data?.data && Array.isArray(response.data.data.data)) {
      ticketsData = response.data.data.data;
      totalCount.value = response.data.data.totalItems || response.data.data.data.length;
    } else if (response?.data?.data && Array.isArray(response.data.data)) {
      ticketsData = response.data.data;
      totalCount.value = response.data.totalItems || response.data.data.length;
    } else if (Array.isArray(response?.data)) {
      ticketsData = response.data;
      totalCount.value = ticketsData.length;
    }
    
    // Fetch user names for all unique user IDs
    const userIds = [...new Set(ticketsData.map((ticket: any) => ticket.created_by).filter(Boolean))];
    await Promise.all(userIds.map(userId => fetchUserName(userId)));
    
    // Transform API data to component structure
    tickets.value = await Promise.all(ticketsData.map(async (ticket: any) => {
      const userName = ticket.created_by ? await fetchUserName(ticket.created_by) : 'Unknown User';
      
      // Map priority
      let priority: 'low' | 'medium' | 'high' = 'medium';
      const priorityRaw = (ticket.priority || '').toLowerCase();
      if (priorityRaw === 'low') {
        priority = 'low';
      } else if (priorityRaw === 'high') {
        priority = 'high';
      } else {
        priority = 'medium';
      }
      
      // Map status
      let status: 'open' | 'resolved' | 'pending' = 'open';
      const statusRaw = (ticket.status || '').toLowerCase();
      if (statusRaw === 'resolved' || statusRaw === 'closed') {
        status = 'resolved';
      } else if (statusRaw === 'pending' || statusRaw === 'in progress') {
        status = 'pending';
      } else {
        status = 'open';
      }
      
      // Format dates
      const created = ticket.created_at 
        ? new Date(ticket.created_at).toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })
        : 'N/A';
      
      const updated = ticket.updated_at 
        ? new Date(ticket.updated_at).toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })
        : created;
      
      return {
        id: ticket.id || ticket.reference || '',
        reference: ticket.reference || '',
        user: userName,
        subject: ticket.subject || 'No Subject',
        category: ticket.category || 'general',
        priority,
        status,
        status_raw: ticket.status || '', // Store raw status from API
        assignedTo: ticket.assigned_to || ticket.assignedTo || 'Unassigned',
        created,
        updated,
        attachments: 'None', // Not in API response
        attachmentsList: [],
        description: ticket.description || '',
        created_by: ticket.created_by,
        created_at: ticket.created_at,
        updated_at: ticket.updated_at,
      };
    }));
  } catch (err: any) {
    console.error('Error fetching support tickets:', err);
    error.value = err?.response?.data?.message || 'Failed to load support tickets';
    toast.error('Failed to load support tickets');
    tickets.value = [];
  } finally {
    loading.value = false;
  }
};

// Filtered tickets based on search
const filteredTickets = computed(() => {
  if (!searchQuery.value) return tickets.value;
  
  const query = searchQuery.value.toLowerCase();
  return tickets.value.filter(
    (ticket) =>
      ticket.id.toLowerCase().includes(query) ||
      ticket.user.toLowerCase().includes(query) ||
      ticket.subject.toLowerCase().includes(query) ||
      ticket.category.toLowerCase().includes(query) ||
      (ticket.reference && ticket.reference.toLowerCase().includes(query))
  );
});

// Pagination
const totalPages = computed(() => Math.ceil(totalCount.value / limit.value));

const pagination = computed(() => {
  const startIndex = (currentPage.value - 1) * limit.value;
  const endIndex = Math.min(startIndex + filteredTickets.value.length, totalCount.value);
  return { startIndex, endIndex };
});

const paginatedTickets = computed(() => {
  return filteredTickets.value;
});

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    fetchTickets();
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    fetchTickets();
  }
};

const handleSearch = () => {
  // Search is client-side, no need to refetch
};

// Stat cards with real data
const statCards = computed(() => [
  {
    label: 'Total Tickets',
    value: totalCount.value.toLocaleString(),
    delta: '+12% from last month',
    deltaColor: 'text-[#22c55e]',
    icon: IconMessageDots,
    iconBg: '#fdf4ff',
    iconColor: '#a855f7',
  },
  {
    label: 'Open Tickets',
    value: tickets.value.filter(t => t.status === 'open').length.toLocaleString(),
    delta: '+10.5% from last month',
    deltaColor: 'text-[#22c55e]',
    icon: IconTrendingUp,
    iconBg: '#eef2ff',
    iconColor: '#4f46e5',
  },
  {
    label: 'Resolved',
    value: tickets.value.filter(t => t.status === 'resolved').length.toLocaleString(),
    delta: '+8% from last month',
    deltaColor: 'text-[#22c55e]',
    icon: IconCheck,
    iconBg: '#ecfdf5',
    iconColor: '#22c55e',
  },
]);

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

const openMenuIndex = ref<number | null>(null);
const buttonRefs = ref<Record<number, HTMLElement>>({});
const menuPosition = ref<{ top: number; right: number } | null>(null);
const detailsModal = ref<{ open: boolean; ticket: Ticket | null }>({ open: false, ticket: null });
const assignModal = ref<{ open: boolean; ticket: Ticket | null }>({ open: false, ticket: null });
const resolveModal = ref<{ open: boolean; ticket: Ticket | null }>({ open: false, ticket: null });

const setButtonRef = (el: HTMLElement | null, index: number) => {
  if (el) {
    buttonRefs.value[index] = el;
  }
};

const calculateMenuPosition = (index: number) => {
  const button = buttonRefs.value[index];
  if (!button) return;
  
  const rect = button.getBoundingClientRect();
  menuPosition.value = {
    top: rect.bottom + 8, // 8px gap
    right: window.innerWidth - rect.right,
  };
};

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (!target.closest('.action-menu-button') && !target.closest('.action-menu-dropdown')) {
    openMenuIndex.value = null;
    menuPosition.value = null;
  }
};

const toggleRowMenu = async (index: number) => {
  if (openMenuIndex.value === index) {
    openMenuIndex.value = null;
    menuPosition.value = null;
  } else {
    openMenuIndex.value = index;
    await nextTick();
    calculateMenuPosition(index);
  }
};

const openTicketDetails = (ticket: Ticket) => {
  detailsModal.value = { open: true, ticket };
  openMenuIndex.value = null;
  menuPosition.value = null;
};

const closeTicketDetails = () => {
  detailsModal.value = { open: false, ticket: null };
};

const openAssignModal = (ticket: Ticket) => {
  assignModal.value = { open: true, ticket };
  openMenuIndex.value = null;
  menuPosition.value = null;
};

const closeAssignModal = () => {
  assignModal.value = { open: false, ticket: null };
};

const openResolveModal = (ticket: Ticket) => {
  resolveModal.value = { open: true, ticket };
  openMenuIndex.value = null;
  menuPosition.value = null;
};

const closeResolveModal = () => {
  resolveModal.value = { open: false, ticket: null };
};

const handleTicketAssigned = () => {
  // Refresh tickets list after assignment
  fetchTickets();
};

const handleTicketResolved = () => {
  // Refresh tickets list after resolution
  fetchTickets();
};

const updateMenuPosition = () => {
  if (openMenuIndex.value !== null) {
    calculateMenuPosition(openMenuIndex.value);
  }
};

// Check if assign button should be disabled
const isAssignDisabled = computed(() => {
  if (openMenuIndex.value === null) return false;
  const ticket = paginatedTickets.value[openMenuIndex.value];
  if (!ticket) return false;
  
  // Check raw status from API
  const statusRaw = (ticket.status_raw || '').toLowerCase();
  
  // Disable if:
  // 1. Status is 'in progress' or 'pending' (mapped to pending)
  // 2. Status is 'assigned'
  // 3. Ticket is already assigned (assignedTo is not 'Unassigned')
  return ticket.status === 'pending' || 
         statusRaw === 'assigned' || 
         statusRaw === 'in progress' ||
         (ticket.assignedTo && ticket.assignedTo !== 'Unassigned');
});

// Check if resolve button should be disabled
const isResolveDisabled = computed(() => {
  if (openMenuIndex.value === null) return false;
  const ticket = paginatedTickets.value[openMenuIndex.value];
  if (!ticket) return false;
  
  // Disable if status is already 'resolved' or 'closed'
  return ticket.status === 'resolved' || 
         (ticket.status_raw && ticket.status_raw.toLowerCase() === 'resolved') ||
         (ticket.status_raw && ticket.status_raw.toLowerCase() === 'closed');
});

onMounted(() => {
  window.addEventListener('click', handleClickOutside);
  window.addEventListener('scroll', updateMenuPosition, true);
  window.addEventListener('resize', updateMenuPosition);
  fetchTickets();
});

onBeforeUnmount(() => {
  window.removeEventListener('click', handleClickOutside);
  window.removeEventListener('scroll', updateMenuPosition, true);
  window.removeEventListener('resize', updateMenuPosition);
});

watch([currentPage], () => {
  fetchTickets();
});
</script>

