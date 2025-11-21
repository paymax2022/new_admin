<template>
  <div class="min-h-screen bg-[#f7f9fc] p-6 space-y-6">
    <div class="flex flex-col gap-2">
      <h1 class="text-2xl font-semibold text-[#111827]">Admin Users</h1>
      <p class="text-sm text-[#6b7280]">Manage admin users, roles, and permissions.</p>
    </div>

    <div class="grid gap-4 md:grid-cols-4">
      <AdminUserStatCard
        title="Total Admin Users"
        value="24"
        caption="All members"
        :icon="IconUsersGroup"
        accent-color="#2563EB"
        accent-bg="#E0EAFF"
      />
      <AdminUserStatCard
        title="Active Sessions"
        value="18"
        caption="72% online"
        :icon="IconMessagesDot"
        accent-color="#8B5CF6"
        accent-bg="#EDE9FE"
      />
      <AdminUserStatCard
        title="Super Admins"
        value="3"
        caption="Full access"
        :icon="IconCrown"
        accent-color="#10B981"
        accent-bg="#D1FAE5"
      />
      <AdminUserStatCard
        title="Pending Invites"
        value="5"
        caption="Awaiting response"
        :icon="IconMail"
        accent-color="#F97316"
        accent-bg="#FFE7D6"
      />
    </div>

    <div class="rounded-3xl bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.05)] space-y-6">
      <div class="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div class="relative flex-1">
          <IconSearch class="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#94a3b8]" />
          <input
            type="text"
            placeholder="Search admin users..."
            class="w-full rounded-full border border-[#e2e8f0] bg-white py-3 pl-12 pr-4 text-sm text-[#1f2937] placeholder:text-[#94a3b8] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
          />
        </div>
        <div class="flex flex-wrap items-center gap-3">
          <div class="w-32"><FilterSelect label="All Roles" /></div>
          <div class="w-32"><FilterSelect label="All Status" /></div>
          <button
            class="inline-flex items-center gap-2 rounded-full border border-[#2563eb] bg-[#2563eb] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#1d4ed8]"
            type="button"
            @click="openAddAdminModal"
          >
            <IconPlus class="h-4 w-4" />
            Add Admin User
          </button>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full">
          <thead>
            <tr class="text-left text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">
              <th class="border-b border-[#d9e3f0] bg-white px-5 py-3">User</th>
              <th class="border-b border-[#d9e3f0] bg-white px-5 py-3">Role</th>
              <th class="border-b border-[#d9e3f0] bg-white px-5 py-3">Department</th>
              <th class="border-b border-[#d9e3f0] bg-white px-5 py-3">Status</th>
              <th class="border-b border-[#d9e3f0] bg-white px-5 py-3">Permissions</th>
              <th class="border-b border-[#d9e3f0] bg-white px-5 py-3">Last Login</th>
              <th class="border-b border-[#d9e3f0] bg-white px-5 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            <AdminUserRow
              v-for="user in adminUsers"
              :key="user.id"
              :initials="user.initials"
              :name="user.name"
              :email="user.email"
              :role="user.role"
              :department="user.department"
              :status="user.status"
              :permissions="user.permissions"
              :lastLogin="user.lastLogin"
              :actions="user.actions"
              :detail="user.detail || {}"
              @action="handleUserAction"
            />
          </tbody>
        </table>
      </div>
    </div>

    <div class="grid gap-6 xl:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
      <div class="rounded-3xl bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.05)] space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold text-[#111827]">Role & Permissions Matrix</h2>
          <button
            class="rounded-full border border-[#2563eb] bg-[#2563eb] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1d4ed8]"
            type="button"
            @click="openCreateRoleModal"
          >
            Create Role
          </button>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full text-xs text-[#1e293b]">
            <thead>
              <tr class="text-[11px] uppercase tracking-wide text-[#94a3b8]">
                <th class="px-3 py-2 text-left">Roles</th>
                <th class="px-3 py-2 text-center">Users</th>
                <th class="px-3 py-2 text-center">Campaigns</th>
                <th class="px-3 py-2 text-center">Wallet</th>
                <th class="px-3 py-2 text-center">Reports</th>
                <th class="px-3 py-2 text-center">Announcements</th>
                <th class="px-3 py-2 text-center">Compliance</th>
                <th class="px-3 py-2 text-center">Support</th>
                <th class="px-3 py-2 text-center">Analytics</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="role in roleMatrix"
                :key="role.name"
                class="border-t border-[#e2e8f0]"
              >
                <td class="px-3 py-2 font-semibold text-[#111827]">{{ role.name }}</td>
                <td
                  v-for="permission in role.permissions"
                  :key="permission.label"
                  class="px-3 py-2 text-center"
                >
                  <span
                    class="inline-flex h-5 w-9 items-center rounded-full border border-transparent px-0.5 transition-colors duration-200"
                    :class="permission.enabled ? 'bg-[#2563eb]' : 'bg-[#e2e8f0]'"
                  >
                    <span
                      class="h-4 w-4 rounded-full bg-white shadow transform transition-transform duration-200"
                      :class="permission.enabled ? 'translate-x-4' : 'translate-x-0'"
                    />
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="space-y-6">
        <div class="rounded-3xl bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.05)] space-y-4">
          <h2 class="text-lg font-semibold text-[#111827]">Role Summary</h2>
          <div class="space-y-3">
            <div v-for="summary in roleSummary" :key="summary.title" class="flex items-start gap-3">
              <span
                class="mt-1 inline-flex h-2.5 w-2.5 rounded-full"
                :style="{ backgroundColor: summary.color }"
              />
              <div>
                <p class="text-sm font-semibold text-[#111827]">{{ summary.title }}</p>
                <p class="text-xs text-[#64748b]">{{ summary.description }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="rounded-3xl bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.05)] space-y-4">
          <h2 class="text-lg font-semibold text-[#111827]">Activity & Alerts</h2>
          <div class="space-y-3">
            <div v-for="alert in activityAlerts" :key="alert.title" class="border-b border-[#e2e8f0] pb-3 last:border-none last:pb-0">
              <p class="text-sm font-semibold text-[#111827]">{{ alert.title }}</p>
              <p class="text-xs text-[#64748b]">{{ alert.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <AddAdminUserModal v-if="isAddAdminModalOpen" @close="closeAddAdminModal" />
    <AdminUserProfileModal
      v-if="profileModal.open && profileModal.user"
      :user="profileModal.user"
      @close="closeProfileModal"
    />
    <AdminUserSuspendModal
      v-if="suspendModal.open && suspendModal.user"
      :user="suspendModal.user"
      @close="closeSuspendModal"
    />
    <AdminCreateRoleModal v-if="createRoleModal" @close="closeCreateRoleModal" />
    <AdminEditRoleModal
      v-if="editRoleModal.open && editRoleModal.role"
      :role="editRoleModal.role"
      @close="closeEditRoleModal"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import IconCrown from '@/components/icon/icon-award.vue';
import IconMail from '@/components/icon/icon-mail.vue';
import IconMessagesDot from '@/components/icon/icon-messages-dot.vue';
import IconPlus from '@/components/icon/icon-plus.vue';
import IconSearch from '@/components/icon/icon-search.vue';
import IconUsersGroup from '@/components/icon/icon-users-group.vue';

import FilterSelect from './components/WalletFilterSelect.vue';
import AdminUserStatCard from './components/AdminUserStatCard.vue';
import AdminUserRow from './components/AdminUserRow.vue';
import AddAdminUserModal from './components/AddAdminUserModal.vue';
import AdminUserProfileModal from './components/AdminUserProfileModal.vue';
import AdminUserSuspendModal from './components/AdminUserSuspendModal.vue';
import AdminCreateRoleModal from './components/AdminCreateRoleModal.vue';
import AdminEditRoleModal from './components/AdminEditRoleModal.vue';

type AdminUserRecord = {
  id: string;
  name: string;
  email: string;
  initials: string;
  role: { label: string; color: string; bg: string };
  department: string;
  status: { label: string; color: string; bg: string };
  permissions: string;
  lastLogin: string;
  actions: { label: string; type: string; style: 'primary' | 'danger' | 'ghost' }[];
  detail?: {
    email: string;
    department: string;
    joinedDate: string;
    activity: { today: number; thisWeek: string; uptime: string };
  };
};

const adminUsers: AdminUserRecord[] = [
  {
    id: 'U001',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    initials: 'SJ',
    role: { label: 'Super Admin', color: '#2563EB', bg: '#DBEAFE' },
    department: 'Operations',
    status: { label: 'Active', color: '#16A34A', bg: '#E6FBF2' },
    permissions: 'All Access',
    lastLogin: '07/15/2024',
    actions: [
      { label: 'View Profile', type: 'view', style: 'primary' },
      { label: 'Edit User', type: 'edit', style: 'primary' },
      { label: 'Suspend User', type: 'suspend', style: 'danger' },
    ],
    detail: {
      email: 'sarah.johnson@email.com',
      department: 'Operations',
      joinedDate: '03/14/2023',
      activity: { today: 127, thisWeek: '1,284', uptime: '98.5%' },
    },
  },
  {
    id: 'U002',
    name: 'Patrick Abiola',
    email: 'patrick.abiola@email.com',
    initials: 'PA',
    role: { label: 'Campaign Analyst', color: '#F59E0B', bg: '#FEF3C7' },
    department: 'Analytics',
    status: { label: 'Active', color: '#16A34A', bg: '#E6FBF2' },
    permissions: 'Campaigns, Support',
    lastLogin: '07/12/2024',
    actions: [
      { label: 'View Profile', type: 'view', style: 'primary' },
      { label: 'Edit User', type: 'edit', style: 'primary' },
      { label: 'Suspend User', type: 'suspend', style: 'danger' },
    ],
    detail: {
      email: 'patrick.abiola@email.com',
      department: 'Analytics',
      joinedDate: '05/22/2023',
      activity: { today: 84, thisWeek: '962', uptime: '97.2%' },
    },
  },
  {
    id: 'U003',
    name: 'Rebecca Stone',
    email: 'rebecca.stone@email.com',
    initials: 'RS',
    role: { label: 'Compliance Admin', color: '#8B5CF6', bg: '#EDE9FE' },
    department: 'Compliance',
    status: { label: 'Active', color: '#16A34A', bg: '#E6FBF2' },
    permissions: 'Compliance, Support',
    lastLogin: '07/10/2024',
    actions: [
      { label: 'View Profile', type: 'view', style: 'primary' },
      { label: 'Edit User', type: 'edit', style: 'primary' },
      { label: 'Suspend User', type: 'suspend', style: 'danger' },
    ],
    detail: {
      email: 'rebecca.stone@email.com',
      department: 'Compliance',
      joinedDate: '01/09/2022',
      activity: { today: 92, thisWeek: '1,102', uptime: '99.1%' },
    },
  },
  {
    id: 'U004',
    name: 'James Carter',
    email: 'james.carter@email.com',
    initials: 'JC',
    role: { label: 'Compliance Admin', color: '#8B5CF6', bg: '#EDE9FE' },
    department: 'Compliance',
    status: { label: 'Suspended', color: '#DC2626', bg: '#FEE2E2' },
    permissions: 'Support',
    lastLogin: '06/28/2024',
    actions: [
      { label: 'View Profile', type: 'view', style: 'primary' },
      { label: 'Edit User', type: 'edit', style: 'primary' },
      { label: 'Re-activate', type: 'reactivate', style: 'ghost' },
    ],
    detail: {
      email: 'james.carter@email.com',
      department: 'Compliance',
      joinedDate: '11/20/2021',
      activity: { today: 15, thisWeek: '342', uptime: '89.5%' },
    },
  },
];

const roleMatrix = [
  {
    name: 'Super Admin',
    permissions: [
      { label: 'Users', enabled: true },
      { label: 'Campaigns', enabled: true },
      { label: 'Wallet', enabled: true },
      { label: 'Reports', enabled: true },
      { label: 'Announcements', enabled: true },
      { label: 'Compliance', enabled: true },
      { label: 'Support', enabled: true },
      { label: 'Analytics', enabled: true },
    ],
  },
  {
    name: 'Operations Admin',
    permissions: [
      { label: 'Users', enabled: true },
      { label: 'Campaigns', enabled: true },
      { label: 'Wallet', enabled: false },
      { label: 'Reports', enabled: false },
      { label: 'Announcements', enabled: true },
      { label: 'Compliance', enabled: false },
      { label: 'Support', enabled: true },
      { label: 'Analytics', enabled: false },
    ],
  },
  {
    name: 'Compliance Admin',
    permissions: [
      { label: 'Users', enabled: true },
      { label: 'Campaigns', enabled: false },
      { label: 'Wallet', enabled: true },
      { label: 'Reports', enabled: true },
      { label: 'Announcements', enabled: false },
      { label: 'Compliance', enabled: true },
      { label: 'Support', enabled: true },
      { label: 'Analytics', enabled: true },
    ],
  },
  {
    name: 'Support Admin',
    permissions: [
      { label: 'Users', enabled: false },
      { label: 'Campaigns', enabled: false },
      { label: 'Wallet', enabled: false },
      { label: 'Reports', enabled: false },
      { label: 'Announcements', enabled: true },
      { label: 'Compliance', enabled: false },
      { label: 'Support', enabled: true },
      { label: 'Analytics', enabled: false },
    ],
  },
];

const roleSummary = [
  { title: 'Super Admin', description: 'Full system access with all permissions enabled.', color: '#2563EB' },
  { title: 'Operations Admin', description: 'Campaign operations and announcement access.', color: '#10B981' },
  { title: 'Compliance Admin', description: 'Wallet oversight and compliance reporting.', color: '#8B5CF6' },
  { title: 'Support Admin', description: 'Limited support access with notification rights.', color: '#F59E0B' },
];

const activityAlerts = [
  { title: '2FA pending for 4 users', description: 'Notify admins to enable two-factor authentication.' },
  { title: 'Campaign approval metrics updated', description: 'New oversight metrics available in analytics.' },
  { title: 'User role review scheduled', description: 'Quarterly role review meeting scheduled on 08/20.' },
  { title: 'Overdue incident resolution', description: 'One incident requires escalation and reconciliation.' },
];

const isAddAdminModalOpen = ref(false);
const openAddAdminModal = () => {
  isAddAdminModalOpen.value = true;
};
const closeAddAdminModal = () => {
  isAddAdminModalOpen.value = false;
};

const profileModal = ref<{ open: boolean; user: AdminUserRecord | null }>({ open: false, user: null });
const suspendModal = ref<{ open: boolean; user: AdminUserRecord | null }>({ open: false, user: null });
const createRoleModal = ref(false);
const editRoleModal = ref<{ open: boolean; role: any | null }>({ open: false, role: null });

const handleUserAction = ({ action, row }: { action: { label: string; type: string; style: string }; row: Record<string, unknown> }) => {
  const userRecord = row as AdminUserRecord;
  if (action.type === 'view') {
    profileModal.value = { open: true, user: userRecord };
  }
  if (action.type === 'suspend') {
    suspendModal.value = { open: true, user: userRecord };
  }
  if (action.type === 'edit') {
    editRoleModal.value = {
      open: true,
      role: {
        name: userRecord.role.label,
        description: `${userRecord.role.label} permissions overview`,
        permissions: roleMatrix[0]?.permissions ?? [],
      },
    };
  }
};
const closeProfileModal = () => {
  profileModal.value = { open: false, user: null };
};
const closeSuspendModal = () => {
  suspendModal.value = { open: false, user: null };
};
const openCreateRoleModal = () => {
  createRoleModal.value = true;
};
const closeCreateRoleModal = () => {
  createRoleModal.value = false;
};
const closeEditRoleModal = () => {
  editRoleModal.value = { open: false, role: null };
};

const isMenuOpen = ref(false);
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

