<template>
  <div class="min-h-screen bg-[#f7f9fc] p-6 space-y-6">
    <div class="flex flex-col gap-2">
      <h1 class="text-2xl font-semibold text-[#111827]">Admin Users</h1>
      <p class="text-sm text-[#6b7280]">Manage admin users, roles, and permissions.</p>
    </div>

    <div class="grid gap-4 md:grid-cols-4">
      <AdminUserStatCard
        :key="`total-${adminStats.totalAdminUsers}`"
        title="Total Admin Users"
        :value="adminStats.totalAdminUsers"
        caption="All members"
        :icon="IconUsersGroup"
        accent-color="#2563EB"
        accent-bg="#E0EAFF"
      />
      <AdminUserStatCard
        :key="`active-${adminStats.activeSessions}`"
        title="Active Sessions"
        :value="adminStats.activeSessions"
        caption="Currently active"
        :icon="IconMessagesDot"
        accent-color="#8B5CF6"
        accent-bg="#EDE9FE"
      />
      <AdminUserStatCard
        :key="`super-${adminStats.superAdmins}`"
        title="Super Admins"
        :value="adminStats.superAdmins"
        caption="Full access"
        :icon="IconCrown"
        accent-color="#10B981"
        accent-bg="#D1FAE5"
      />
      <AdminUserStatCard
        :key="`pending-${adminStats.pendingInvites}`"
        title="Pending Invites"
        :value="adminStats.pendingInvites"
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
            v-model="searchQuery"
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
        <Vue3Datatable
          v-if="filteredAdminUsers.length > 0"
          :rows="filteredAdminUsers"
          :columns="tableColumns"
          :totalRows="filteredAdminUsers.length"
          :sortable="true"
          :searchable="false"
          :pageSize="rowsPerPage"
          :pageSizeOptions="[10, 25, 50, 100]"
          skin="bh-table-compact"
          :loading="loading"
          :classes="{
            table: 'min-w-full divide-y divide-gray-200 dark:divide-gray-700',
            thead: 'bg-gray-50 dark:bg-gray-800',
            tbody: 'bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700',
            tr: 'hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer',
            th: 'px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300',
            td: 'px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100',
          }"
          @row-clicked="onRowClick"
        >
          <template #user="data">
            <div v-if="data && data.value" class="flex items-center gap-3">
              <div class="flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold" :style="{ backgroundColor: data.value.role.bg, color: data.value.role.color }">
                {{ data.value.initials }}
              </div>
              <div class="flex flex-col">
                <span class="font-medium text-gray-900 dark:text-white">{{ data.value.name }}</span>
                <span class="text-xs text-gray-500 dark:text-gray-400">{{ data.value.email }}</span>
              </div>
            </div>
            <span v-else class="text-gray-400">-</span>
          </template>

          <template #role="data">
            <span v-if="data && data.value" :class="data.value.role.bg" class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold" :style="{ color: data.value.role.color }">
              {{ data.value.role.label }}
            </span>
            <span v-else class="text-gray-400">-</span>
          </template>

          <template #department="data">
            <span v-if="data && data.value" class="text-gray-900 dark:text-white">{{ data.value.department || '-' }}</span>
            <span v-else class="text-gray-400">-</span>
          </template>

          <template #status="data">
            <span v-if="data && data.value" :class="data.value.status.bg" class="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold" :style="{ color: data.value.status.color }">
              <span :class="data.value.status.color" class="h-2 w-2 rounded-full" :style="{ backgroundColor: data.value.status.color }"></span>
              {{ data.value.status.label }}
            </span>
            <span v-else class="text-gray-400">-</span>
          </template>

          <template #permissions="data">
            <span v-if="data && data.value" class="text-gray-900 dark:text-white">{{ data.value.permissions || '-' }}</span>
            <span v-else class="text-gray-400">-</span>
          </template>

          <template #lastLogin="data">
            <span v-if="data && data.value" class="text-gray-900 dark:text-white">{{ data.value.lastLogin || '-' }}</span>
            <span v-else class="text-gray-400">-</span>
          </template>

          <template #actions="data">
            <div v-if="data && data.value && data.value.actions" class="flex items-center justify-center gap-2">
              <button
                v-for="action in data.value.actions"
                :key="action.type"
                @click.stop="handleUserAction({ action, row: data.value })"
                :class="action.style === 'danger' ? 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50' : action.style === 'ghost' ? 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700' : 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50'"
                class="inline-flex items-center rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors"
                :title="action.label"
              >
                {{ action.label }}
              </button>
            </div>
            <span v-else class="text-gray-400">-</span>
          </template>
        </Vue3Datatable>
        <div v-else class="text-center py-12 text-gray-500">
          No admin users found
        </div>
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
import { ref, onMounted, computed, nextTick } from 'vue';
import { useToast } from 'vue-toastification';
import Vue3Datatable from '@bhplugin/vue3-datatable';
import IconCrown from '@/components/icon/icon-award.vue';
import IconMail from '@/components/icon/icon-mail.vue';
import IconMessagesDot from '@/components/icon/icon-messages-dot.vue';
import IconPlus from '@/components/icon/icon-plus.vue';
import IconSearch from '@/components/icon/icon-search.vue';
import IconUsersGroup from '@/components/icon/icon-users-group.vue';

import FilterSelect from './components/WalletFilterSelect.vue';
import AdminUserStatCard from './components/AdminUserStatCard.vue';
import AddAdminUserModal from './components/AddAdminUserModal.vue';
import AdminUserProfileModal from './components/AdminUserProfileModal.vue';
import AdminUserSuspendModal from './components/AdminUserSuspendModal.vue';
import AdminCreateRoleModal from './components/AdminCreateRoleModal.vue';
import AdminEditRoleModal from './components/AdminEditRoleModal.vue';
import crowdfundingService from '@/services/crowdfundingService';

const toast = useToast();
const loading = ref(false);
const searchQuery = ref('');
const roleFilter = ref('');
const statusFilter = ref('');
const rowsPerPage = ref(10);

const adminStats = ref({
  totalAdminUsers: '0',
  activeSessions: '0',
  superAdmins: '0',
  pendingInvites: '0',
});

// Table columns configuration
const tableColumns = ref([
  {
    key: 'user',
    title: 'User',
    field: 'user',
    sortable: true,
    filterable: true,
    visible: true,
    width: '250px',
    headerClass: 'font-semibold',
  },
  {
    key: 'role',
    title: 'Role',
    field: 'role',
    sortable: true,
    filterable: true,
    visible: true,
    width: '150px',
    headerClass: 'font-semibold',
  },
  {
    key: 'department',
    title: 'Department',
    field: 'department',
    sortable: true,
    filterable: true,
    visible: true,
    width: '150px',
    headerClass: 'font-semibold',
  },
  {
    key: 'status',
    title: 'Status',
    field: 'status',
    sortable: true,
    filterable: true,
    visible: true,
    width: '130px',
    headerClass: 'font-semibold',
  },
  {
    key: 'permissions',
    title: 'Permissions',
    field: 'permissions',
    sortable: true,
    filterable: true,
    visible: true,
    width: '150px',
    headerClass: 'font-semibold',
  },
  {
    key: 'lastLogin',
    title: 'Last Login',
    field: 'lastLogin',
    sortable: true,
    filterable: true,
    visible: true,
    width: '150px',
    headerClass: 'font-semibold',
  },
  {
    key: 'actions',
    title: 'Actions',
    field: 'actions',
    sortable: false,
    filterable: false,
    visible: true,
    width: '200px',
    headerClass: 'font-semibold text-center',
    cellClass: 'text-center',
  },
]);

const onRowClick = (row: any) => {
  if (row.actions && row.actions.length > 0) {
    handleUserAction({ action: row.actions[0], row });
  }
};

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

const adminUsers = ref<AdminUserRecord[]>([]);

const loadAdminUsers = async () => {
  try {
    loading.value = true;
    console.log('Loading admin users with role: ADMIN');
    const response = await crowdfundingService.listAdminUsers({
      page: 1,
      limit: 100,
      role: 'ADMIN', // Filter for admin role
      status: statusFilter.value || undefined,
    });

    console.log('Admin Users API Response:', response);

    // Handle response structure
    let usersData: any[] = [];
    if (response.success && response.data) {
      if (Array.isArray(response.data)) {
        usersData = response.data;
      } else if (response.data.data && Array.isArray(response.data.data)) {
        usersData = response.data.data;
      }
    } else if (response.ok && response.data) {
      if (Array.isArray(response.data)) {
        usersData = response.data;
      } else if (response.data.data && Array.isArray(response.data.data)) {
        usersData = response.data.data;
      }
    }

    console.log('Parsed usersData:', usersData.length, usersData);

    if (usersData.length > 0) {
      adminUsers.value = usersData.map((user: any, index: number) => {
        const firstName = user.first_name || user.firstname || '';
        const lastName = user.last_name || user.lastname || '';
        const fullName = `${firstName} ${lastName}`.trim() || user.email || 'Unknown User';
        const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || 'AN';
        
        // Determine role label and colors
        const roleLabel = user.role === 'SYSTEM_ADMIN' || user.role === 'SYS_ADMIN' ? 'Super Admin' :
                         user.role === 'ADMIN' ? 'Admin' :
                         user.userType === 'ADMIN' ? 'Admin' :
                         user.role || 'Admin';
        
        const roleColor = roleLabel === 'Super Admin' ? '#2563EB' :
                         roleLabel.includes('Campaign') ? '#F59E0B' :
                         roleLabel.includes('Compliance') ? '#8B5CF6' :
                         '#6366F1';
        
        const roleBg = roleLabel === 'Super Admin' ? '#DBEAFE' :
                      roleLabel.includes('Campaign') ? '#FEF3C7' :
                      roleLabel.includes('Compliance') ? '#EDE9FE' :
                      '#EEF0FF';

        const userStatus = user.status === 'ACTIVE' ? 'Active' :
                           user.status === 'BLOCKED' || user.status === 'SUSPENDED' ? 'Suspended' :
                           user.status === 'DEACTIVATED' ? 'Deactivated' : 'Pending';

        return {
          id: user.id || user.user_id || `U${String(index + 1).padStart(3, '0')}`,
          name: fullName,
          email: user.email || 'N/A',
          initials: initials,
          role: {
            label: roleLabel,
            color: roleColor,
            bg: roleBg,
          },
          department: user.department || user.userType || 'Operations',
          status: {
            label: userStatus,
            color: userStatus === 'Active' ? '#16A34A' : userStatus === 'Suspended' ? '#DC2626' : '#F59E0B',
            bg: userStatus === 'Active' ? '#E6FBF2' : userStatus === 'Suspended' ? '#FEE2E2' : '#FFF7E6',
          },
          permissions: user.permissions || 'All Access',
          lastLogin: user.last_login ? new Date(user.last_login).toLocaleDateString() : 
                     user.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : 'N/A',
          actions: userStatus === 'Active' 
            ? [
                { label: 'View Profile', type: 'view', style: 'primary' },
                { label: 'Edit User', type: 'edit', style: 'primary' },
                { label: 'Suspend User', type: 'suspend', style: 'danger' },
              ]
            : [
                { label: 'View Profile', type: 'view', style: 'primary' },
                { label: 'Edit User', type: 'edit', style: 'primary' },
                { label: 'Re-activate', type: 'reactivate', style: 'ghost' },
              ],
          detail: {
            email: user.email || 'N/A',
            department: user.department || user.userType || 'Operations',
            joinedDate: user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A',
            activity: {
              today: 0,
              thisWeek: '0',
              uptime: '0%',
            },
          },
        };
      });

      // Calculate statistics from loaded users
      const totalAdmins = adminUsers.value.length;
      const superAdmins = adminUsers.value.filter(u => u.role.label === 'Super Admin').length;
      const activeAdmins = adminUsers.value.filter(u => u.status.label === 'Active').length;
      
      console.log('=== ADMIN STATS CALCULATION ===');
      console.log('Total Admins:', totalAdmins);
      console.log('Super Admins:', superAdmins);
      console.log('Active Admins:', activeAdmins);
      console.log('Admin Users:', adminUsers.value.map(u => ({ name: u.name, role: u.role.label, status: u.status.label })));
      
      // Update stats reactively - update individual properties
      adminStats.value.totalAdminUsers = totalAdmins.toString();
      adminStats.value.activeSessions = activeAdmins.toString();
      adminStats.value.superAdmins = superAdmins.toString();
      adminStats.value.pendingInvites = '0'; // This might need a separate endpoint
      
      await nextTick();
      
      console.log('Updated adminStats:', adminStats.value);
      console.log('adminStats.value.totalAdminUsers:', adminStats.value.totalAdminUsers);
      console.log('adminStats.value.activeSessions:', adminStats.value.activeSessions);
      console.log('adminStats.value.superAdmins:', adminStats.value.superAdmins);
    } else {
      console.log('No admin users found, setting stats to 0');
      adminStats.value.totalAdminUsers = '0';
      adminStats.value.activeSessions = '0';
      adminStats.value.superAdmins = '0';
      adminStats.value.pendingInvites = '0';
    }
  } catch (error) {
    console.error('Error loading admin users:', error);
    toast.error('Failed to load admin users');
    // Fallback to dummy data
    if (adminUsers.value.length === 0) {
      adminUsers.value = dummyAdminUsers;
      
      // Calculate stats from dummy data
      const totalAdmins = adminUsers.value.length;
      const superAdmins = adminUsers.value.filter(u => u.role.label === 'Super Admin').length;
      const activeAdmins = adminUsers.value.filter(u => u.status.label === 'Active').length;
      
      adminStats.value.totalAdminUsers = totalAdmins.toString();
      adminStats.value.activeSessions = activeAdmins.toString();
      adminStats.value.superAdmins = superAdmins.toString();
      adminStats.value.pendingInvites = '0';
      
      console.log('Using dummy data stats:', adminStats.value);
    }
  } finally {
    loading.value = false;
  }
};

const dummyAdminUsers: AdminUserRecord[] = [
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

const filteredAdminUsers = computed(() => {
  let filtered = adminUsers.value;

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (u) =>
        u.name.toLowerCase().includes(query) ||
        u.email.toLowerCase().includes(query) ||
        u.department.toLowerCase().includes(query)
    );
  }

  if (roleFilter.value && roleFilter.value !== 'All Roles') {
    filtered = filtered.filter((u) => u.role.label === roleFilter.value);
  }

  if (statusFilter.value && statusFilter.value !== 'All Status') {
    filtered = filtered.filter((u) => u.status.label === statusFilter.value);
  }

  return filtered;
});

onMounted(() => {
  loadAdminUsers();
});
</script>

