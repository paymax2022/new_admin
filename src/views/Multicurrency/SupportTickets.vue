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
              type="text"
              placeholder="Search tickets..."
              class="w-full rounded-full border border-[#e2e8f0] bg-[#f8fafc] py-2 pl-11 pr-4 text-sm text-[#1f2937] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
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
              <tr v-for="(ticket, index) in tickets" :key="ticket.id" class="relative hover:bg-[#f8fafc] transition">
                <td class="px-5 py-5 font-semibold text-[#111827]">{{ ticket.id }}</td>
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
                      class="flex h-9 w-9 items-center justify-center rounded-full border border-[#e2e8f0] text-[#475569] transition hover:border-[#cbd5f5]"
                      @click.stop="toggleRowMenu(index)"
                    >
                      <IconHorizontalDots class="h-5 w-5" />
                    </button>
                    <transition name="fade">
                      <div
                        v-if="openMenuIndex === index"
                        class="absolute right-0 top-12 z-20 w-44 rounded-2xl border border-[#e2e8f0] bg-white py-2 text-left shadow-[0_20px_40px_rgba(15,23,42,0.12)]"
                      >
                        <button
                          type="button"
                          class="flex w-full items-center justify-between px-4 py-2 text-sm font-semibold text-[#475569] transition hover:bg-[#f8fafc]"
                          @click="openTicketDetails(ticket)"
                        >
                          View Details
                          <IconEye class="h-4 w-4 text-[#2563eb]" />
                        </button>
                        <button
                          type="button"
                          class="flex w-full items-center justify-between px-4 py-2 text-sm font-semibold text-[#4f46e5] transition hover:bg-[#f5f3ff]"
                          @click="openAssignModal(ticket)"
                        >
                          Assign Ticket
                          <IconUserPlus class="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          class="flex w-full items-center justify-between px-4 py-2 text-sm font-semibold text-[#22c55e] transition hover:bg-[#ecfdf5]"
                          @click="openResolveModal(ticket)"
                        >
                          Mark as Resolved
                          <IconCheck class="h-4 w-4" />
                        </button>
                      </div>
                    </transition>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
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
    />
    <SupportTicketResolveModal
      v-if="resolveModal.open && resolveModal.ticket"
      :ticket="resolveModal.ticket"
      @close="closeResolveModal"
    />
  </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

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

const statCards = [
  {
    label: 'Total Cards',
    value: '8,642',
    delta: '+12% from last month',
    deltaColor: 'text-[#22c55e]',
    icon: IconWallet,
    iconBg: '#ecfdf5',
    iconColor: '#22c55e',
  },
  {
    label: 'Active Cards',
    value: '$2.4M',
    delta: '+10.5% from last month',
    deltaColor: 'text-[#22c55e]',
    icon: IconTrendingUp,
    iconBg: '#eef2ff',
    iconColor: '#4f46e5',
  },
  {
    label: 'Total Fees Collected',
    value: '$14',
    delta: '+$2 from last month',
    deltaColor: 'text-[#22c55e]',
    icon: IconMessageDots,
    iconBg: '#fdf4ff',
    iconColor: '#a855f7',
  },
];

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

const tickets = [
  {
    id: 'TKT001',
    user: 'John Doe',
    subject: 'Card creation failed',
    category: 'support',
    priority: 'low',
    status: 'open',
    assignedTo: 'Unassigned',
    created: '2024-03-20 14:30',
    updated: '2024-03-20 15:00',
    attachments: '2',
    attachmentsList: [
      { name: 'screenshot.png', size: '245 KB', thumbnail: AttachmentPlaceholder },
      { name: 'screenshot.png', size: '245 KB', thumbnail: AttachmentPlaceholder },
    ],
    description: 'I tried to create a virtual card but the process failed at payment.',
  },
  {
    id: 'TKT002',
    user: 'Sarah Brown',
    subject: 'Transaction not reflecting',
    category: 'dispute',
    priority: 'medium',
    status: 'open',
    assignedTo: 'Mike Support',
    created: '2024-03-18 11:20',
    updated: '2024-03-19 09:45',
    attachments: '2',
    attachmentsList: [
      { name: 'statement.pdf', size: '512 KB', thumbnail: AttachmentPlaceholder },
      { name: 'screenshot.png', size: '245 KB', thumbnail: AttachmentPlaceholder },
    ],
    description: 'Customer reported a transaction that has not appeared in account history yet.',
  },
  {
    id: 'TKT003',
    user: 'Mike Davis',
    subject: 'KYC document issues',
    category: 'support',
    priority: 'low',
    status: 'resolved',
    assignedTo: 'Lisa Compliance',
    created: '2024-03-10 10:05',
    updated: '2024-03-12 17:20',
    attachments: 'None',
    attachmentsList: [],
    description: 'User unable to upload KYC documents due to file size limitations.',
  },
  {
    id: 'TKT004',
    user: 'Alice Johnson',
    subject: 'Card without funds',
    category: 'dispute',
    priority: 'high',
    status: 'open',
    assignedTo: 'Lisa Compliance',
    created: '2024-03-08 09:15',
    updated: '2024-03-08 12:30',
    attachments: 'None',
    attachmentsList: [],
    description: 'Card shows zero balance after funding attempt; customer requests investigation.',
  },
];

const openMenuIndex = ref<number | null>(null);
const detailsModal = ref<{ open: boolean; ticket: (typeof tickets)[number] | null }>({ open: false, ticket: null });
const assignModal = ref<{ open: boolean; ticket: (typeof tickets)[number] | null }>({ open: false, ticket: null });
const resolveModal = ref<{ open: boolean; ticket: (typeof tickets)[number] | null }>({ open: false, ticket: null });

const handleClickOutside = () => {
  openMenuIndex.value = null;
};

const toggleRowMenu = (index: number) => {
  openMenuIndex.value = openMenuIndex.value === index ? null : index;
};

const openTicketDetails = (ticket: (typeof tickets)[number]) => {
  detailsModal.value = { open: true, ticket };
  openMenuIndex.value = null;
};

const closeTicketDetails = () => {
  detailsModal.value = { open: false, ticket: null };
};

const openAssignModal = (ticket: (typeof tickets)[number]) => {
  assignModal.value = { open: true, ticket };
  openMenuIndex.value = null;
};

const closeAssignModal = () => {
  assignModal.value = { open: false, ticket: null };
};

const openResolveModal = (ticket: (typeof tickets)[number]) => {
  resolveModal.value = { open: true, ticket };
  openMenuIndex.value = null;
};

const closeResolveModal = () => {
  resolveModal.value = { open: false, ticket: null };
};

onMounted(() => window.addEventListener('click', handleClickOutside));
onBeforeUnmount(() => window.removeEventListener('click', handleClickOutside));
</script>

