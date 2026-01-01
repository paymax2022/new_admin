<template>
  <div class="min-h-screen bg-[#f7f9fc] p-6 space-y-6">
    <div class="flex flex-col gap-2">
      <h1 class="text-2xl font-semibold text-[#111827]">Support Management</h1>
      <p class="text-sm text-[#6b7280]">Manage customer support tickets and resolve user issues.</p>
    </div>

    <div class="grid gap-4 md:grid-cols-4">
      <SupportStatCard
        title="Open Tickets"
        value="47"
        caption="Awaiting response"
        :icon="IconTicket"
        accent-color="#2563EB"
        accent-bg="#E0EAFF"
      />
      <SupportStatCard
        title="In Progress"
        value="23"
        caption="Agents being routed"
        :icon="IconProgress"
        accent-color="#F59E0B"
        accent-bg="#FEF3C7"
      />
      <SupportStatCard
        title="Resolved Today"
        value="31"
        caption="Successfully resolved"
        :icon="IconResolved"
        accent-color="#10B981"
        accent-bg="#D1FAE5"
      />
      <SupportStatCard
        title="Escalated"
        value="5"
        caption="Require immediate attention"
        :icon="IconEscalated"
        accent-color="#EF4444"
        accent-bg="#FEE2E2"
      />
    </div>

    <div class="rounded-3xl bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.05)]">
      <div class="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div class="relative flex-1">
          <IconSearch class="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#94a3b8]" />
          <input
            type="text"
            placeholder="Search tickets..."
            class="w-full rounded-full border border-[#e2e8f0] bg-white py-3 pl-12 pr-4 text-sm text-[#1f2937] placeholder:text-[#94a3b8] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
          />
        </div>
        <div class="flex flex-wrap items-center gap-3">
          <FilterSelect label="All Status" />
          <FilterSelect label="All Priority" />
          <FilterSelect label="All Categories" />
        </div>
      </div>

      <div class="mt-6 overflow-x-auto">
        <table class="min-w-full">
          <thead>
            <tr class="text-left text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">
              <th class="border-b border-[#d9e3f0] bg-white px-5 py-3">Ticket ID</th>
              <th class="border-b border-[#d9e3f0] bg-white px-5 py-3">Subject</th>
              <th class="border-b border-[#d9e3f0] bg-white px-5 py-3">User</th>
              <th class="border-b border-[#d9e3f0] bg-white px-5 py-3">Category</th>
              <th class="border-b border-[#d9e3f0] bg-white px-5 py-3">Priority</th>
              <th class="border-b border-[#d9e3f0] bg-white px-5 py-3">Status</th>
              <th class="border-b border-[#d9e3f0] bg-white px-5 py-3">Agent</th>
              <th class="border-b border-[#d9e3f0] bg-white px-5 py-3">Created</th>
              <th class="border-b border-[#d9e3f0] bg-white px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <TicketRow
              v-for="ticket in tickets"
              :key="ticket.id"
              v-bind="ticket"
              @action="handleTicketAction"
            />
          </tbody>
        </table>
      </div>
    </div>

    <TicketModal
      v-if="ticketModal.open && ticketModal.data"
      :ticket="ticketModal.data"
      @close="closeTicketModal"
      @assign="assignTicket"
    />
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

import IconEscalated from '@/components/icon/icon-info-circle.vue';
import IconProgress from '@/components/icon/icon-clock.vue';
import IconResolved from '@/components/icon/icon-circle-check.vue';
import IconSearch from '@/components/icon/icon-search.vue';
import IconTicket from '@/components/icon/icon-inbox.vue';

import FilterSelect from './components/WalletFilterSelect.vue';
import SupportStatCard from './components/SupportStatCard.vue';
import TicketModal from './components/SupportTicketModal.vue';
import TicketRow from './components/SupportTicketRow.vue';

type TicketRecord = {
  id: string;
  subject: string;
  user: string;
  category: { label: string; color: string; bg: string };
  priority: { label: string; color: string; bg: string };
  status: { label: string; color: string; bg: string };
  agent: string;
  created: string;
  actions: { label: string; type: string }[];
  detail: {
    description: string;
    updates: Array<{ title: string; timestamp: string; note: string }>;
  };
};

const tickets: TicketRecord[] = [
  {
    id: 'TKT001',
    subject: 'Payment not processed for donation',
    user: 'john.doe@gmail.com',
    category: { label: 'Payment', color: '#2563EB', bg: '#DBEAFE' },
    priority: { label: 'High', color: '#DC2626', bg: '#FEE2E2' },
    status: { label: 'Open', color: '#2563EB', bg: '#DBEAFE' },
    agent: 'Unassigned',
    created: '2023-08-16',
    actions: [
      { label: 'View', type: 'view' },
      { label: 'Assign', type: 'assign' },
    ],
    detail: {
      description: 'Donor reports that the payment has not been deducted but campaign shows pending.',
      updates: [
        { title: 'Ticket created', timestamp: '2023-08-16 09:20', note: 'Awaiting agent assignment.' },
      ],
    },
  },
  {
    id: 'TKT089',
    subject: 'Campaign approval feedback',
    user: 'jane.smith@email.com',
    category: { label: 'Campaign', color: '#F59E0B', bg: '#FEF3C7' },
    priority: { label: 'Medium', color: '#F59E0B', bg: '#FEF3C7' },
    status: { label: 'In Progress', color: '#F59E0B', bg: '#FEF3C7' },
    agent: 'Alice Johnson',
    created: '2023-08-15',
    actions: [
      { label: 'View', type: 'view' },
      { label: 'Assign', type: 'assign' },
    ],
    detail: {
      description: 'Campaign owner needs clarity on approval feedback and revisions.',
      updates: [
        { title: 'Agent assigned', timestamp: '2023-08-15 11:45', note: 'Reviewing submission details.' },
      ],
    },
  },
  {
    id: 'TKT093',
    subject: 'Unable to access account dashboard',
    user: 'joshua@email.com',
    category: { label: 'Account', color: '#8B5CF6', bg: '#EDE9FE' },
    priority: { label: 'Low', color: '#2563EB', bg: '#DBEAFE' },
    status: { label: 'Open', color: '#2563EB', bg: '#DBEAFE' },
    agent: 'Alice Johnson',
    created: '2023-08-15',
    actions: [
      { label: 'View', type: 'view' },
      { label: 'Assign', type: 'assign' },
    ],
    detail: {
      description: 'User reports login success but dashboard keeps redirecting to support view.',
      updates: [
        { title: 'Ticket created', timestamp: '2023-08-15 08:15', note: 'Awaiting agent response.' },
      ],
    },
  },
  {
    id: 'TKT094',
    subject: 'Withdrawal request pending for 3 days',
    user: 'jane.smith@email.com',
    category: { label: 'Withdraw', color: '#DC2626', bg: '#FEE2E2' },
    priority: { label: 'High', color: '#DC2626', bg: '#FEE2E2' },
    status: { label: 'Escalated', color: '#DC2626', bg: '#FEE2E2' },
    agent: 'Alice Johnson',
    created: '2023-08-15',
    actions: [
      { label: 'View', type: 'view' },
      { label: 'Assign', type: 'assign' },
    ],
    detail: {
      description: 'Withdrawal request still pending and requires urgent processing.',
      updates: [
        { title: 'Escalated', timestamp: '2023-08-15 13:05', note: 'Finance team notified.' },
      ],
    },
  },
  {
    id: 'TKT095',
    subject: 'Unable to create account description',
    user: 'john.sola@email.com',
    category: { label: 'Account', color: '#8B5CF6', bg: '#EDE9FE' },
    priority: { label: 'Low', color: '#2563EB', bg: '#DBEAFE' },
    status: { label: 'Resolved', color: '#10B981', bg: '#D1FAE5' },
    agent: 'Alice Johnson',
    created: '2023-08-14',
    actions: [
      { label: 'View', type: 'view' },
      { label: 'Assign', type: 'assign' },
    ],
    detail: {
      description: 'User was unable to update account description due to validation errors.',
      updates: [
        { title: 'Resolved', timestamp: '2023-08-14 15:20', note: 'Provided correct formatting guidelines.' },
      ],
    },
  },
];

const ticketModal = reactive<{ open: boolean; data: TicketRecord | null }>({ open: false, data: null });

const handleTicketAction = ({ action, row }: { action: { type: string }; row: TicketRecord }) => {
  if (action.type === 'view') {
    ticketModal.open = true;
    ticketModal.data = row;
  } else if (action.type === 'assign') {
    ticketModal.open = true;
    ticketModal.data = row;
  }
};

const closeTicketModal = () => {
  ticketModal.open = false;
  ticketModal.data = null;
};

const assignTicket = () => {
  ticketModal.open = false;
  ticketModal.data = null;
};
</script>

