<template>
  <div class="min-h-screen bg-[#f7f9fc] p-6 space-y-8">
    <header class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div class="space-y-1">
        <h1 class="text-2xl font-semibold text-[#111827]">Role Management</h1>
        <p class="text-sm text-[#6b7280]">Manage admin roles and permissions</p>
      </div>
    </header>

    <section class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
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
          <h2 class="text-lg font-semibold text-[#111827]">Admin Users</h2>
          <p class="text-sm text-[#6b7280]">Manage admin access levels</p>
        </div>
        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <div class="relative flex items-center">
            <IconSearch class="absolute left-4 h-4 w-4 text-[#94a3b8]" />
            <input
              type="text"
              placeholder="Search admin users..."
              class="w-full rounded-full border border-[#e2e8f0] bg-[#f8fafc] py-2 pl-11 pr-4 text-sm text-[#1f2937] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
            />
          </div>
          <div class="flex gap-3">
            <select
              class="rounded-full border border-[#e2e8f0] bg-white px-4 py-2 text-sm text-[#475569] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
            >
              <option>All Roles</option>
              <option>Super Admin</option>
              <option>Admin</option>
              <option>Compliance</option>
            </select>
            <select
              class="rounded-full border border-[#e2e8f0] bg-white px-4 py-2 text-sm text-[#475569] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Pending</option>
              <option>Suspended</option>
            </select>
          </div>
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-full border border-[#111827] bg-[#111827] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#0b1220]"
            @click="openAssignModal"
          >
            <IconUserPlus class="h-4 w-4" />
            Add Admin User
          </button>
        </div>
      </div>

      <div class="rounded-3xl border border-[#e2e8f0] bg-white">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-[#e2e8f0] text-sm text-[#475569]">
            <thead class="bg-[#f8fafc] text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">
              <tr>
                <th class="px-5 py-4 text-left font-semibold text-[#111827]">User</th>
                <th class="px-5 py-4 text-left">Role</th>
                <th class="px-5 py-4 text-left">Status</th>
                <th class="px-5 py-4 text-left">Assigned Date</th>
                <th class="px-5 py-4 text-left">Assigned By</th>
                <th class="px-5 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[#e2e8f0] bg-white">
              <tr v-for="(admin, index) in admins" :key="admin.email" class="relative hover:bg-[#f8fafc] transition">
                <td class="px-5 py-5">
                  <div class="space-y-1">
                    <p class="font-semibold text-[#111827]">{{ admin.name }}</p>
                    <p class="text-xs text-[#6b7280]">{{ admin.email }}</p>
                  </div>
                </td>
                <td class="px-5 py-5">
                  <span
                    class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold capitalize"
                    :class="roleClasses[admin.role]"
                  >
                    {{ admin.role }}
                  </span>
                </td>
                <td class="px-5 py-5">
                  <span
                    class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold capitalize"
                    :class="statusClasses[admin.status]"
                  >
                    {{ admin.status }}
                  </span>
                </td>
                <td class="px-5 py-5 text-[#475569]">
                  {{ admin.assignedDate }}
                </td>
                <td class="px-5 py-5 text-[#475569]">
                  {{ admin.assignedBy }}
                </td>
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
                        class="absolute right-0 top-12 z-20 w-40 rounded-2xl border border-[#e2e8f0] bg-white py-2 text-left shadow-[0_20px_40px_rgba(15,23,42,0.12)]"
                      >
                        <button
                          type="button"
                          class="flex w-full items-center justify-between px-4 py-2 text-sm font-semibold text-[#475569] transition hover:bg-[#f8fafc]"
                          @click="openEditModal(admin)"
                        >
                          Edit Role
                          <IconEdit class="h-4 w-4 text-[#2563eb]" />
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

    <EditRoleModal v-if="editModal.open && editModal.admin" :admin="editModal.admin" @close="closeEditModal" />
    <AssignAdminModal v-if="assignModal" @close="closeAssignModal" />
  </div>
</template>

<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

import IconBellBing from '@/components/icon/icon-bell-bing.vue';
import IconEdit from '@/components/icon/icon-edit.vue';
import IconHorizontalDots from '@/components/icon/icon-horizontal-dots.vue';
import IconMessageDots from '@/components/icon/icon-message-dots.vue';
import IconSearch from '@/components/icon/icon-search.vue';
import IconTrendingUp from '@/components/icon/icon-trending-up.vue';
import IconUserCircle from '@/components/icon/icon-user-circle.vue';
import IconUserPlus from '@/components/icon/icon-user-plus.vue';
import IconUsersGroup from '@/components/icon/icon-users-group.vue';
import IconWallet from '@/components/icon/icon-wallet.vue';

import EditRoleModal from './components/EditRoleModal.vue';
import AssignAdminModal from './components/AssignAdminModal.vue';

const statCards = [
  {
    label: 'Total Admin Users',
    value: '24',
    delta: '+5% from last month',
    deltaColor: 'text-[#22c55e]',
    icon: IconUsersGroup,
    iconBg: '#e0f2fe',
    iconColor: '#0ea5e9',
  },
  {
    label: 'Active Sessions',
    value: '18',
    delta: '-12% from last month',
    deltaColor: 'text-[#ef4444]',
    icon: IconTrendingUp,
    iconBg: '#fdf4ff',
    iconColor: '#a855f7',
  },
  {
    label: 'Super Admins',
    value: '3',
    delta: 'unchanged',
    deltaColor: 'text-[#94a3b8]',
    icon: IconWallet,
    iconBg: '#ecfdf5',
    iconColor: '#22c55e',
  },
  {
    label: 'Pending Invites',
    value: '5',
    delta: '+3 pending invites',
    deltaColor: 'text-[#f97316]',
    icon: IconMessageDots,
    iconBg: '#fff7ed',
    iconColor: '#f97316',
  },
];

const roleClasses: Record<'super-admin' | 'admin' | 'compliance', string> = {
  'super-admin': 'bg-[#fef3f2] text-[#f97316]',
  admin: 'bg-[#f1f5f9] text-[#475569]',
  compliance: 'bg-[#eef2ff] text-[#4f46e5]',
};

const statusClasses: Record<'active' | 'inactive' | 'pending', string> = {
  active: 'bg-[#ecfdf5] text-[#16a34a]',
  inactive: 'bg-[#f8fafc] text-[#64748b]',
  pending: 'bg-[#fff7ed] text-[#f97316]',
};

type AdminRecord = {
  name: string;
  email: string;
  role: 'super-admin' | 'admin' | 'compliance';
  status: 'active' | 'inactive' | 'pending';
  assignedDate: string;
  assignedBy: string;
};

const admins: AdminRecord[] = [
  {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    role: 'super-admin',
    status: 'active',
    assignedDate: '2024-01-15',
    assignedBy: 'John Admin',
  },
  {
    name: 'John Carter',
    email: 'john.carter@example.com',
    role: 'admin',
    status: 'active',
    assignedDate: '2024-01-15',
    assignedBy: 'John Admin',
  },
  {
    name: 'Mike Lawson',
    email: 'mike.lawson@example.com',
    role: 'admin',
    status: 'inactive',
    assignedDate: '2024-01-15',
    assignedBy: 'Sarah Johnson',
  },
  {
    name: 'Emily Rogers',
    email: 'emily.rogers@example.com',
    role: 'compliance',
    status: 'pending',
    assignedDate: '2024-01-15',
    assignedBy: 'Sarah Johnson',
  },
];

const openMenuIndex = ref<number | null>(null);
const editModal = ref<{ open: boolean; admin: { name: string; email: string; roleLabel: string } | null }>({
  open: false,
  admin: null,
});
const assignModal = ref(false);

const handleClickOutside = () => {
  openMenuIndex.value = null;
};

const toggleRowMenu = (index: number) => {
  openMenuIndex.value = openMenuIndex.value === index ? null : index;
};

const roleLabelMap: Record<AdminRecord['role'], string> = {
  'super-admin': 'Super Admin',
  admin: 'Admin',
  compliance: 'Compliance',
};

const openEditModal = (admin: AdminRecord) => {
  editModal.value = {
    open: true,
    admin: {
      name: admin.name,
      email: admin.email,
      roleLabel: roleLabelMap[admin.role],
    },
  };
  openMenuIndex.value = null;
};

const closeEditModal = () => {
  editModal.value = { open: false, admin: null };
};

const openAssignModal = () => {
  assignModal.value = true;
};

const closeAssignModal = () => {
  assignModal.value = false;
};

onMounted(() => window.addEventListener('click', handleClickOutside));
onBeforeUnmount(() => window.removeEventListener('click', handleClickOutside));
</script>

