<template>
  <div class="p-6">
    <h1 class="text-2xl font-semibold mb-1">Settings</h1>
    <div class="text-sm text-gray-500 mb-6">Manage your organization settings and admin accounts</div>
    <div class="flex gap-6 mb-6 border-b">
      <button v-for="tab in tabs" :key="tab" @click="activeTab = tab" class="pb-2 px-4 font-medium" :class="activeTab === tab ? 'border-b-2 border-black' : 'text-gray-400'">{{ tab }}</button>
    </div>
    <div v-if="activeTab === 'Organization'">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div class="bg-white border rounded-xl p-6 flex flex-col gap-4">
          <div class="font-semibold mb-2">Organization Profile</div>
          <div class="flex flex-col gap-2">
            <label class="text-xs font-medium">Organization Name</label>
            <input v-model="orgProfile.name" class="border rounded px-3 py-2 text-sm" />
            <label class="text-xs font-medium">Description</label>
            <textarea v-model="orgProfile.description" class="border rounded px-3 py-2 text-sm" />
            <label class="text-xs font-medium">Website</label>
            <input v-model="orgProfile.website" class="border rounded px-3 py-2 text-sm" />
            <label class="text-xs font-medium">Contact Email</label>
            <input v-model="orgProfile.email" class="border rounded px-3 py-2 text-sm" />
          </div>
          <button class="bg-black text-white px-4 py-2 rounded w-full mt-2">Save Organization Profile</button>
        </div>
        <div class="bg-white border rounded-xl p-6 flex flex-col gap-4">
          <div class="font-semibold mb-2">Branding & Appearance</div>
          <label class="text-xs font-medium mb-1">Organization Logo</label>
          <div class="border border-dashed rounded flex flex-col items-center justify-center px-4 py-8 mb-2 bg-gray-50">
            <svg class="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 16l2-2 2 2 4-4"/></svg>
            <button class="border px-3 py-1 rounded text-xs font-medium">Upload Logo</button>
          </div>
          <button class="bg-black text-white px-4 py-2 rounded w-full">Save</button>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white border rounded-xl p-6 flex flex-col gap-4">
          <div class="font-semibold mb-2">Organization Profile</div>
          <div class="flex flex-col gap-3">
            <div class="flex items-center justify-between">
              <div>
                <div class="font-medium text-sm">System Settings</div>
                <div class="text-xs text-gray-500">Member Registration</div>
              </div>
              <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="toggles.systemSettings" class="sr-only peer" />
                <div class="w-10 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-black transition"></div>
              </label>
            </div>
            <div class="flex items-center justify-between">
              <div>
                <div class="font-medium text-sm">Email Verification</div>
                <div class="text-xs text-gray-500">Require email verification to see members</div>
              </div>
              <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="toggles.emailVerification" class="sr-only peer" />
                <div class="w-10 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-black transition"></div>
              </label>
            </div>
            <div class="flex items-center justify-between">
              <div>
                <div class="font-medium text-sm">Public Group Discovery</div>
                <div class="text-xs text-gray-500">Allow members to discover and join public groups</div>
              </div>
              <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="toggles.publicDiscovery" class="sr-only peer" />
                <div class="w-10 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-black transition"></div>
              </label>
            </div>
          </div>
        </div>
        <div class="bg-white border rounded-xl p-6 flex flex-col gap-4">
          <div class="font-semibold mb-2">Organization Profile</div>
          <div class="flex flex-col gap-3">
            <div class="flex items-center justify-between">
              <div>
                <div class="font-medium text-sm">Anonymous Polls</div>
                <div class="text-xs text-gray-500">Enable anonymous voting in polls</div>
              </div>
              <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="toggles.anonymousPolls" class="sr-only peer" />
                <div class="w-10 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-black transition"></div>
              </label>
            </div>
            <div class="flex items-center justify-between">
              <div>
                <div class="font-medium text-sm">Gamification</div>
                <div class="text-xs text-gray-500">Enable rewards and leaderboards</div>
              </div>
              <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="toggles.gamification" class="sr-only peer" />
                <div class="w-10 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-black transition"></div>
              </label>
            </div>
            <div class="flex items-center justify-between">
              <div>
                <div class="font-medium text-sm">Auto Payment Enforcement</div>
                <div class="text-xs text-gray-500">Automatically suspend overdue accounts</div>
              </div>
              <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="toggles.autoPayment" class="sr-only peer" />
                <div class="w-10 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-black transition"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="activeTab === 'Admin Users'">
      <div class="flex justify-between items-center mb-4">
        <div>
          <div class="font-semibold text-lg">Admin User Management</div>
          <div class="text-xs text-gray-500">Manage administrator accounts and permissions</div>
        </div>
        <button class="bg-black text-white rounded px-4 py-2 flex items-center gap-2 text-sm font-medium" @click="showAddAdminModal = true">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
          Add Admin User
        </button>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full text-sm">
          <thead>
            <tr class="text-left text-xs text-gray-500 border-b">
              <th class="py-2 pr-4">User</th>
              <th class="py-2 pr-4">Role</th>
              <th class="py-2 pr-4">Status</th>
              <th class="py-2 pr-4">Last Login</th>
              <th class="py-2 pr-4">Operations</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in adminUsers" :key="user.email" class="border-b hover:bg-gray-50">
              <td class="py-2 pr-4">
                <div class="font-semibold" :class="user.status === 'Inactive' ? 'text-gray-400' : ''">{{ user.name }}</div>
                <div class="text-xs text-gray-400">{{ user.email }}</div>
              </td>
              <td class="py-2 pr-4">{{ user.role }}</td>
              <td class="py-2 pr-4">
                <span :class="user.status === 'Active' ? 'text-emerald-500' : 'text-red-500'">{{ user.status }}</span>
              </td>
              <td class="py-2 pr-4">{{ user.lastLogin }}</td>
              <td class="py-2 pr-4 flex gap-2 items-center">
                <button class="text-gray-400 hover:text-black" title="Edit" @click="openEditAdminModal(user)"><svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M15.232 5.232l3.536 3.536M9 11l6-6a2.828 2.828 0 114 4l-6 6H9v-4z"/></svg></button>
                <button class="border px-3 py-1 rounded text-xs font-medium" @click="openPermissionsModal(user)">Permission</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-else-if="activeTab === 'Notifications'">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
        <!-- Email Notifications -->
        <div class="bg-white border rounded-xl p-6 flex flex-col gap-4">
          <div class="font-semibold mb-2">Notification Settings</div>
          <div class="font-medium text-sm mb-2">Email Notifications</div>
          <div class="flex flex-col gap-4">
            <div class="flex items-center justify-between">
              <div>
                <div class="font-medium text-sm">New Member Registration</div>
                <div class="text-xs text-gray-500">Notify when new members join</div>
              </div>
              <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="notificationToggles.newMember" class="sr-only peer" />
                <div class="w-10 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-black transition"></div>
              </label>
            </div>
            <div class="flex items-center justify-between">
              <div>
                <div class="font-medium text-sm">Payment Alerts</div>
                <div class="text-xs text-gray-500">Notify about payment issues</div>
              </div>
              <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="notificationToggles.paymentAlerts" class="sr-only peer" />
                <div class="w-10 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-black transition"></div>
              </label>
            </div>
            <div class="flex items-center justify-between">
              <div>
                <div class="font-medium text-sm">System Updates</div>
                <div class="text-xs text-gray-500">Important system notifications</div>
              </div>
              <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="notificationToggles.systemUpdates" class="sr-only peer" />
                <div class="w-10 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-black transition"></div>
              </label>
            </div>
          </div>
        </div>
        <!-- Push Notifications -->
        <div class="bg-white border rounded-xl p-6 flex flex-col gap-4">
          <div class="font-medium text-sm mb-2">Push Notifications</div>
          <div class="flex flex-col gap-4">
            <div class="flex items-center justify-between">
              <div>
                <div class="font-medium text-sm">Meeting Reminders</div>
                <div class="text-xs text-gray-500">Remind about upcoming meetings</div>
              </div>
              <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="notificationToggles.meetingReminders" class="sr-only peer" />
                <div class="w-10 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-black transition"></div>
              </label>
            </div>
            <div class="flex items-center justify-between">
              <div>
                <div class="font-medium text-sm">Event Notifications</div>
                <div class="text-xs text-gray-500">Notify about new events</div>
              </div>
              <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="notificationToggles.eventNotifications" class="sr-only peer" />
                <div class="w-10 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-black transition"></div>
              </label>
            </div>
            <div class="flex items-center justify-between">
              <div>
                <div class="font-medium text-sm">Action Point Updates</div>
                <div class="text-xs text-gray-500">Updates on assigned actions</div>
              </div>
              <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="notificationToggles.actionPointUpdates" class="sr-only peer" />
                <div class="w-10 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-black transition"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="activeTab === 'Audit logs'">
      <div class="mt-6">
        <div class="font-semibold text-lg mb-1">Audit Logs</div>
        <div class="text-xs text-gray-500 mb-4">Track all administrative actions and system changes</div>
        <div class="overflow-x-auto">
          <table class="min-w-full text-sm border-t">
            <thead>
              <tr class="text-left text-xs text-gray-500 border-b">
                <th class="py-2 pr-4">Action</th>
                <th class="py-2 pr-4">User</th>
                <th class="py-2 pr-4">Details</th>
                <th class="py-2 pr-4">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="log in auditLogs" :key="log.timestamp" class="border-b">
                <td class="py-2 pr-4">{{ log.action }}</td>
                <td class="py-2 pr-4">{{ log.user }}</td>
                <td class="py-2 pr-4">{{ log.details }}</td>
                <td class="py-2 pr-4">{{ log.timestamp }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- Other tabs can be implemented similarly -->
  </div>
  <!-- Add Admin User Modal -->
  <div v-if="showAddAdminModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div class="bg-white rounded-xl shadow-lg p-8 w-full max-w-xl relative">
      <button class="absolute top-3 right-3 text-gray-400 hover:text-gray-700" @click="closeAddAdminModal">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
      <h2 class="text-lg font-semibold mb-4">Add Admin User</h2>
      <div class="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium mb-1">Full Name</label>
          <input v-model="addAdminForm.name" class="w-full border rounded px-3 py-2 text-sm" placeholder="Enter Full Name" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Email Address</label>
          <input v-model="addAdminForm.email" class="w-full border rounded px-3 py-2 text-sm" placeholder="Enter Email Address" />
        </div>
      </div>
      <div class="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium mb-1">Role</label>
          <select v-model="addAdminForm.role" class="w-full border rounded px-3 py-2 text-sm">
            <option disabled value="">Select role</option>
            <option>Super Admin</option>
            <option>Member Manager</option>
            <option>Content Editor</option>
            <option>Event Manager</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Account Status</label>
          <select v-model="addAdminForm.status" class="w-full border rounded px-3 py-2 text-sm">
            <option disabled value="">Select status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
      </div>
      <div class="mb-4 text-xs text-gray-500 flex flex-col gap-1">
        <span>* Content management</span>
        <span>* Announcement creation</span>
        <span>* Resource library</span>
        <span>* Forum moderation</span>
      </div>
      <div class="mb-6 bg-gray-50 border rounded p-4">
        <div class="font-medium mb-2">Default Account Settings</div>
        <div class="flex flex-col gap-3">
          <div class="flex items-center justify-between">
            <div>
              <div class="font-medium text-sm">Two-Factor Authentication</div>
              <div class="text-xs text-gray-500">Require 2FA for this account</div>
            </div>
            <label class="inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="addAdminForm.twoFA" class="sr-only peer" />
              <div class="w-10 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-black transition"></div>
            </label>
          </div>
          <div class="flex items-center justify-between">
            <div>
              <div class="font-medium text-sm">Email Notification</div>
              <div class="text-xs text-gray-500">Send admin notifications via email</div>
            </div>
            <label class="inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="addAdminForm.emailNotif" class="sr-only peer" />
              <div class="w-10 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-black transition"></div>
            </label>
          </div>
          <div class="flex items-center justify-between">
            <div>
              <div class="font-medium text-sm">Send Welcome Email</div>
              <div class="text-xs text-gray-500">Send welcome email with login instructions</div>
            </div>
            <label class="inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="addAdminForm.welcomeEmail" class="sr-only peer" />
              <div class="w-10 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-black transition"></div>
            </label>
          </div>
        </div>
      </div>
      <div class="flex gap-2">
        <button class="bg-black text-white px-4 py-2 rounded w-full" @click="closeAddAdminModal">Add admin user</button>
        <button class="border px-4 py-2 rounded w-full" @click="closeAddAdminModal">Cancel</button>
      </div>
    </div>
  </div>
  <!-- Edit Admin User Modal -->
  <div v-if="showEditAdminModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div class="bg-white rounded-xl shadow-lg p-8 w-full max-w-xl relative">
      <button class="absolute top-3 right-3 text-gray-400 hover:text-gray-700" @click="closeEditAdminModal">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
      <h2 class="text-lg font-semibold mb-4">Edit Admin User</h2>
      <div class="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium mb-1">Full Name</label>
          <input v-model="editAdminForm.name" class="w-full border rounded px-3 py-2 text-sm" placeholder="Enter Full Name" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Email Address</label>
          <input v-model="editAdminForm.email" class="w-full border rounded px-3 py-2 text-sm" placeholder="Enter Email Address" />
        </div>
      </div>
      <div class="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium mb-1">Role</label>
          <select v-model="editAdminForm.role" class="w-full border rounded px-3 py-2 text-sm">
            <option disabled value="">Select role</option>
            <option>Super Admin</option>
            <option>Member Manager</option>
            <option>Content Editor</option>
            <option>Event Manager</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Account Status</label>
          <select v-model="editAdminForm.status" class="w-full border rounded px-3 py-2 text-sm">
            <option disabled value="">Select status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
      </div>
      <div class="mb-4 text-xs text-gray-500 flex flex-col gap-1">
        <span>* Content management</span>
        <span>* Announcement creation</span>
        <span>* Resource library</span>
        <span>* Forum moderation</span>
      </div>
      <div class="mb-6 bg-gray-50 border rounded p-4">
        <div class="font-medium mb-2">Default Account Settings</div>
        <div class="flex flex-col gap-3">
          <div class="flex items-center justify-between">
            <div>
              <div class="font-medium text-sm">Two-Factor Authentication</div>
              <div class="text-xs text-gray-500">Require 2FA for this account</div>
            </div>
            <label class="inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="editAdminForm.twoFA" class="sr-only peer" />
              <div class="w-10 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-black transition"></div>
            </label>
          </div>
          <div class="flex items-center justify-between">
            <div>
              <div class="font-medium text-sm">Email Notification</div>
              <div class="text-xs text-gray-500">Send admin notifications via email</div>
            </div>
            <label class="inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="editAdminForm.emailNotif" class="sr-only peer" />
              <div class="w-10 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-black transition"></div>
            </label>
          </div>
          <div class="flex items-center justify-between">
            <div>
              <div class="font-medium text-sm">Send Welcome Email</div>
              <div class="text-xs text-gray-500">Send welcome email with login instructions</div>
            </div>
            <label class="inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="editAdminForm.welcomeEmail" class="sr-only peer" />
              <div class="w-10 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-black transition"></div>
            </label>
          </div>
        </div>
      </div>
      <div class="flex gap-2">
        <button class="bg-black text-white px-4 py-2 rounded w-full" @click="closeEditAdminModal">Save Changes</button>
        <button class="border px-4 py-2 rounded w-full" @click="closeEditAdminModal">Cancel</button>
      </div>
    </div>
  </div>
  <!-- Manage Permissions Modal -->
  <div v-if="showPermissionsModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div class="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative flex flex-col">
      <button class="absolute top-3 right-3 text-gray-400 hover:text-gray-700" @click="closePermissionsModal">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
      <h2 class="text-lg font-semibold mb-2">Manage Permissions · {{ permissionsUserName }}</h2>
      <div class="text-xs text-gray-500 mb-4">Select the permissions for this admin user. Changes take effect immediately after saving.</div>
      <input v-model="permissionsSearch" class="border rounded px-3 py-2 text-sm mb-4 w-full" placeholder="Search permissions..." />
      <div class="flex-1 overflow-y-auto pr-2">
        <div v-for="group in filteredPermissionGroups" :key="group.name" class="mb-6">
          <div class="font-semibold text-sm mb-2">{{ group.name }}</div>
          <div class="flex flex-col gap-2 pl-2">
            <label v-for="perm in group.permissions" :key="perm.key" class="flex items-center gap-2 text-sm">
              <input type="checkbox" v-model="permissionsForm[perm.key]" class="accent-black" />
              <span>{{ perm.label }}</span>
            </label>
          </div>
        </div>
      </div>
      <div class="flex gap-2 mt-4">
        <button class="bg-black text-white px-4 py-2 rounded w-full" @click="closePermissionsModal">Save Changes</button>
        <button class="border px-4 py-2 rounded w-full" @click="closePermissionsModal">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
const tabs = ['Organization', 'Admin Users', 'Notifications', 'Audit logs'];
const activeTab = ref('Organization');
const orgProfile = ref({
  name: 'ConnectGroup Community',
  description: 'A vibrant community connecting members through shared interests and activities.',
  website: 'ConnectGroup Community',
  email: 'admin@connectgroup.com',
});
const toggles = ref({
  systemSettings: false,
  emailVerification: false,
  publicDiscovery: false,
  anonymousPolls: false,
  gamification: false,
  autoPayment: false,
});
const adminUsers = [
  {
    name: 'Sarah Johnson',
    email: 'sarah@connectgroup.com',
    role: 'Super Admin',
    status: 'Active',
    lastLogin: '2 hours ago',
  },
  {
    name: 'Mike Chen',
    email: 'mike@connectgroup.com',
    role: 'Member Manager',
    status: 'Active',
    lastLogin: '1 day ago',
  },
  {
    name: 'Lisa Rodriguez',
    email: 'lisa@connectgroup.com',
    role: 'Content Editor',
    status: 'Inactive',
    lastLogin: '3 hours ago',
  },
  {
    name: 'David Kim',
    email: 'david@connectgroup.com',
    role: 'Event Manager',
    status: 'Active',
    lastLogin: '1 week ago',
  },
];
const showAddAdminModal = ref(false);
const addAdminForm = ref({
  name: '',
  email: '',
  role: '',
  status: '',
  twoFA: false,
  emailNotif: false,
  welcomeEmail: false,
});
const showEditAdminModal = ref(false);
const editAdminForm = ref({
  name: '',
  email: '',
  role: '',
  status: '',
  twoFA: false,
  emailNotif: false,
  welcomeEmail: false,
});
const showPermissionsModal = ref(false);
const permissionsUserName = ref('');
const permissionsSearch = ref('');
const permissionsForm = ref({
  viewDashboard: true,
  manageUsers: false,
  manageContent: false,
  manageEvents: false,
  manageResources: false,
  manageForum: false,
  manageAnnouncements: false,
  manageSettings: false,
  viewReports: false,
  manageBilling: false,
  manageGroups: false,
  managePolls: false,
  manageMeetings: false,
  manageDocuments: false,
  manageArchive: false,
  manageActionPoints: false,
  manageTemplates: false,
  managePayouts: false,
  manageSubscriptions: false,
  manageAuditLogs: false,
});
const permissionGroups = [
  {
    name: 'User Management',
    permissions: [
      { key: 'manageUsers', label: 'Manage Users' },
      { key: 'manageGroups', label: 'Manage Groups' },
      { key: 'managePayouts', label: 'Manage Payouts' },
    ],
  },
  {
    name: 'Content & Communication',
    permissions: [
      { key: 'manageContent', label: 'Manage Content' },
      { key: 'manageAnnouncements', label: 'Manage Announcements' },
      { key: 'manageForum', label: 'Manage Forum' },
      { key: 'manageResources', label: 'Manage Resource Library' },
    ],
  },
  {
    name: 'Events & Meetings',
    permissions: [
      { key: 'manageEvents', label: 'Manage Events' },
      { key: 'manageMeetings', label: 'Manage Meetings' },
      { key: 'manageTemplates', label: 'Manage Meeting Templates' },
      { key: 'manageDocuments', label: 'Manage Documents' },
      { key: 'manageArchive', label: 'Manage Archive' },
      { key: 'manageActionPoints', label: 'Manage Action Points' },
    ],
  },
  {
    name: 'System & Settings',
    permissions: [
      { key: 'manageSettings', label: 'Manage System Settings' },
      { key: 'manageBilling', label: 'Manage Billing' },
      { key: 'manageSubscriptions', label: 'Manage Subscriptions' },
      { key: 'manageAuditLogs', label: 'View Audit Logs' },
    ],
  },
  {
    name: 'Analytics & Reports',
    permissions: [
      { key: 'viewDashboard', label: 'View Dashboard' },
      { key: 'viewReports', label: 'View Reports & Analytics' },
      { key: 'managePolls', label: 'Manage Polls & Surveys' },
    ],
  },
];
const filteredPermissionGroups = computed(() => {
  if (!permissionsSearch.value) return permissionGroups;
  const search = permissionsSearch.value.toLowerCase();
  return permissionGroups
    .map(group => ({
      ...group,
      permissions: group.permissions.filter(perm => perm.label.toLowerCase().includes(search)),
    }))
    .filter(group => group.permissions.length > 0);
});
function closeAddAdminModal() {
  showAddAdminModal.value = false;
  addAdminForm.value = { name: '', email: '', role: '', status: '', twoFA: false, emailNotif: false, welcomeEmail: false };
}
function openEditAdminModal(user) {
  editAdminForm.value = {
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
    twoFA: false,
    emailNotif: false,
    welcomeEmail: false,
  };
  showEditAdminModal.value = true;
}
function closeEditAdminModal() {
  showEditAdminModal.value = false;
  editAdminForm.value = { name: '', email: '', role: '', status: '', twoFA: false, emailNotif: false, welcomeEmail: false };
}
function openPermissionsModal(user) {
  permissionsUserName.value = user.name;
  // Optionally, load user's permissions here
  showPermissionsModal.value = true;
}
function closePermissionsModal() {
  showPermissionsModal.value = false;
  permissionsUserName.value = '';
  permissionsSearch.value = '';
}
const notificationToggles = ref({
  newMember: false,
  paymentAlerts: false,
  systemUpdates: false,
  meetingReminders: false,
  eventNotifications: false,
  actionPointUpdates: false,
});
const auditLogs = [
  {
    action: 'Member Added',
    user: 'Sarah Johnson',
    details: 'Added new member: John Doe',
    timestamp: '2024-01-15 14:30:22',
  },
  {
    action: 'Payment Updated',
    user: 'Mike Chen',
    details: 'Updated payment method for Jane Smith',
    timestamp: '2024-01-15 13:45:10',
  },
  {
    action: 'Event Created',
    user: 'David Kim',
    details: 'Created new event: Annual Gala',
    timestamp: '2024-01-15 12:15:45',
  },
  {
    action: 'Content Published',
    user: 'Lisa Rodriguez',
    details: 'Published article: Community Guidelines',
    timestamp: '2024-01-15 11:20:33',
  },
  {
    action: 'Meeting Scheduled',
    user: 'Sarah Johnson',
    details: 'Scheduled board meeting for Jan 20',
    timestamp: '2024-01-15 10:05:12',
  },
];
</script> 