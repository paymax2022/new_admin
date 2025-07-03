<template>
  <div class="p-6 space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center mb-4">
      <div>
        <h1 class="text-2xl font-semibold">Communication Management</h1>
        <div class="text-gray-500 text-sm">Manage announcements, messaging, and forum moderation</div>
      </div>
      <button
        v-if="activeTab === 'Announcement'"
        class="bg-black text-white rounded px-4 py-2 flex items-center gap-2 text-sm font-medium"
        @click="openCreateAnnouncementModal"
      >
        + Create Announcement
      </button>
      <button
        v-if="activeTab === 'Bulk Messaging'"
        class="bg-black text-white rounded px-4 py-2 flex items-center gap-2 text-sm font-medium"
        @click="openCreateBulkMessageModal"
      >
        + Create Campaign
      </button>
    </div>

    <!-- Tabs -->
    <div class="flex gap-6 border-b mb-4">
      <button :class="['pb-2 px-2 font-medium', activeTab === 'Announcement' ? 'border-b-2 border-black' : 'text-gray-400']" @click="activeTab = 'Announcement'">Announcement</button>
      <button :class="['pb-2 px-2 font-medium', activeTab === 'Bulk Messaging' ? 'border-b-2 border-black' : 'text-gray-400']" @click="activeTab = 'Bulk Messaging'">Bulk Messaging</button>
      <button :class="['pb-2 px-2 font-medium', activeTab === 'Forum Moderation' ? 'border-b-2 border-black' : 'text-gray-400']" @click="activeTab = 'Forum Moderation'">Forum Moderation</button>
    </div>

    <!-- Announcement Tab -->
    <template v-if="activeTab === 'Announcement'">
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div class="bg-white rounded-lg shadow p-4 flex flex-col items-center">
          <div class="text-2xl font-bold text-blue-600">2</div>
          <div class="text-gray-500 text-xs">Published</div>
        </div>
        <div class="bg-white rounded-lg shadow p-4 flex flex-col items-center">
          <div class="text-2xl font-bold text-orange-500">0</div>
          <div class="text-gray-500 text-xs">Drafts</div>
        </div>
        <div class="bg-white rounded-lg shadow p-4 flex flex-col items-center">
          <div class="text-2xl font-bold text-green-600">1</div>
          <div class="text-gray-500 text-xs">Scheduled</div>
        </div>
        <div class="bg-white rounded-lg shadow p-4 flex flex-col items-center">
          <div class="text-2xl font-bold text-purple-600">245</div>
          <div class="text-gray-500 text-xs">Total Views</div>
        </div>
      </div>
      <!-- Table -->
      <div class="bg-white rounded-lg shadow p-0 overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="text-left text-gray-500 border-b">
              <th class="py-2 px-4">Title</th>
              <th class="py-2 px-4">Type</th>
              <th class="py-2 px-4">Status</th>
              <th class="py-2 px-4">Target audience</th>
              <th class="py-2 px-4">Author</th>
              <th class="py-2 px-4">View</th>
              <th class="py-2 px-4">Created</th>
              <th class="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in announcements" :key="item.title" class="border-b last:border-0">
              <td class="py-2 px-4 font-medium">{{ item.title }}</td>
              <td class="py-2 px-4">
                <span :class="item.type === 'general' ? 'text-blue-500 underline cursor-pointer' : item.type === 'system' ? 'text-green-500 underline cursor-pointer' : 'text-orange-500 underline cursor-pointer'">
                  {{ item.type }}
                </span>
              </td>
              <td class="py-2 px-4 capitalize">{{ item.status }}</td>
              <td class="py-2 px-4">{{ item.audience }}</td>
              <td class="py-2 px-4">{{ item.author }}</td>
              <td class="py-2 px-4">{{ item.views }}</td>
              <td class="py-2 px-4">{{ item.created }}</td>
              <td class="py-2 px-4 flex gap-2">
                <button class="hover:text-blue-600" @click="openEditAnnouncementModal(item)"><span class="sr-only">Edit</span><IconEdit class="w-4 h-4" /></button>
                <button class="hover:text-red-600"><span class="sr-only">Delete</span><IconTrash class="w-4 h-4" /></button>
                <button class="hover:text-gray-600" @click="openViewAnnouncementModal(item)"><span class="sr-only">View</span><IconEye class="w-4 h-4" /></button>
                <button class="hover:text-gray-600"><span class="sr-only">Copy</span><IconCopy class="w-4 h-4" /></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>

    <!-- Bulk Messaging Tab -->
    <template v-else-if="activeTab === 'Bulk Messaging'">
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div class="bg-white rounded-lg shadow p-4 flex flex-col items-center">
          <div class="text-2xl font-bold text-blue-600 flex items-center gap-2"><span>2</span> <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 8h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2"></path><path stroke-linecap="round" stroke-linejoin="round" d="M15 2H9a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"></path></svg></div>
          <div class="text-gray-500 text-xs">Sent Campaigns</div>
        </div>
        <div class="bg-white rounded-lg shadow p-4 flex flex-col items-center">
          <div class="text-2xl font-bold text-orange-500 flex items-center gap-2"><span>1</span> <svg class="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6l4 2"></path></svg></div>
          <div class="text-gray-500 text-xs">Scheduled</div>
        </div>
        <div class="bg-white rounded-lg shadow p-4 flex flex-col items-center">
          <div class="text-2xl font-bold text-green-600 flex items-center gap-2"><span>1351</span> <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a4 4 0 0 0-3-3.87"></path><path stroke-linecap="round" stroke-linejoin="round" d="M9 20H4v-2a4 4 0 0 1 3-3.87"></path><circle cx="12" cy="7" r="4"></circle></svg></div>
          <div class="text-gray-500 text-xs">Total Recipients</div>
        </div>
        <div class="bg-white rounded-lg shadow p-4 flex flex-col items-center">
          <div class="text-2xl font-bold text-purple-600 flex items-center gap-2"><span>95.2%</span> <svg class="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6l4 2"></path></svg></div>
          <div class="text-gray-500 text-xs">Avg Open Rate</div>
        </div>
      </div>
      <!-- Table -->
      <div class="bg-white rounded-lg shadow p-0 overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="text-left text-gray-500 border-b">
              <th class="py-2 px-4">Subject</th>
              <th class="py-2 px-4">Type</th>
              <th class="py-2 px-4">Status</th>
              <th class="py-2 px-4">Target Group</th>
              <th class="py-2 px-4">Recipients</th>
              <th class="py-2 px-4">Delivery Rate</th>
              <th class="py-2 px-4">Open Rate</th>
              <th class="py-2 px-4">Created</th>
              <th class="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in bulkMessages" :key="item.subject" class="border-b last:border-0">
              <td class="py-2 px-4 font-medium">{{ item.subject }}</td>
              <td class="py-2 px-4">
                <span :class="item.type === 'EMAIL' ? 'text-blue-500 underline cursor-pointer' : 'text-green-500 underline cursor-pointer'">
                  {{ item.type }}
                </span>
              </td>
              <td class="py-2 px-4 capitalize">{{ item.status }}</td>
              <td class="py-2 px-4">{{ item.group }}</td>
              <td class="py-2 px-4">{{ item.recipients }}</td>
              <td class="py-2 px-4">{{ item.deliveryRate || '-' }}</td>
              <td class="py-2 px-4">{{ item.openRate || '-' }}</td>
              <td class="py-2 px-4">{{ item.created }}</td>
              <td class="py-2 px-4 flex gap-2">
                <button class="hover:text-gray-600" @click="openViewBulkMessageModal(item)"><span class="sr-only">View</span><IconEye class="w-4 h-4" /></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>

    <!-- Forum Moderation Tab -->
    <template v-else-if="activeTab === 'Forum Moderation'">
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div class="bg-white rounded-lg shadow p-4 flex flex-col items-center">
          <div class="text-2xl font-bold text-orange-500 flex items-center gap-2"><span>1</span> <svg class="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6l4 2"></path></svg></div>
          <div class="text-gray-500 text-xs">Pending Review</div>
        </div>
        <div class="bg-white rounded-lg shadow p-4 flex flex-col items-center">
          <div class="text-2xl font-bold text-red-600 flex items-center gap-2"><span>1</span> <svg class="w-5 h-5 text-red-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M18.364 5.636l-12.728 12.728"></path><path stroke-linecap="round" stroke-linejoin="round" d="M5.636 5.636l12.728 12.728"></path></svg></div>
          <div class="text-gray-500 text-xs">Flagged Posts</div>
        </div>
        <div class="bg-white rounded-lg shadow p-4 flex flex-col items-center">
          <div class="text-2xl font-bold text-yellow-600 flex items-center gap-2"><span>1</span> <svg class="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6l4 2"></path></svg></div>
          <div class="text-gray-500 text-xs">Total Reports</div>
        </div>
        <div class="bg-white rounded-lg shadow p-4 flex flex-col items-center">
          <div class="text-2xl font-bold text-green-600 flex items-center gap-2"><span>1</span> <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg></div>
          <div class="text-gray-500 text-xs">Approved</div>
        </div>
      </div>
      <!-- Table -->
      <div class="bg-white rounded-lg shadow p-0 overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="text-left text-gray-500 border-b">
              <th class="py-2 px-4">Title</th>
              <th class="py-2 px-4">Author</th>
              <th class="py-2 px-4">Category</th>
              <th class="py-2 px-4">Status</th>
              <th class="py-2 px-4">Reports</th>
              <th class="py-2 px-4">Replies</th>
              <th class="py-2 px-4">Views</th>
              <th class="py-2 px-4">Created</th>
              <th class="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in forumPosts" :key="item.title" class="border-b last:border-0">
              <td class="py-2 px-4 font-medium">{{ item.title }}</td>
              <td class="py-2 px-4">{{ item.author }}</td>
              <td class="py-2 px-4">{{ item.category }}</td>
              <td class="py-2 px-4">
                <span :class="item.status === 'approved' ? 'text-green-600' : item.status === 'pending' ? 'text-orange-500' : item.status === 'flagged' ? 'text-yellow-600' : 'text-red-600'">
                  {{ item.status }}
                </span>
              </td>
              <td class="py-2 px-4">{{ item.reports }}</td>
              <td class="py-2 px-4">{{ item.replies }}</td>
              <td class="py-2 px-4">{{ item.views }}</td>
              <td class="py-2 px-4">{{ item.created }}</td>
              <td class="py-2 px-4 flex gap-2">
                <button class="hover:text-gray-600" @click="openViewForumPostModal(item)"><span class="sr-only">View</span><IconEye class="w-4 h-4" /></button>
                <button v-if="item.status === 'pending'" class="hover:text-green-600" @click="openModerateForumPostModal(item)"><span class="sr-only">Approve</span><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg></button>
                <button v-if="item.status === 'pending' || item.status === 'flagged'" class="hover:text-red-600"><span class="sr-only">Reject</span><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M18.364 5.636l-12.728 12.728"></path><path stroke-linecap="round" stroke-linejoin="round" d="M5.636 5.636l12.728 12.728"></path></svg></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>

    <ViewAnnouncementModal
      v-if="showViewAnnouncementModal && selectedAnnouncement"
      :announcement="selectedAnnouncement"
      @close="closeViewAnnouncementModal"
    />
    <CreateAnnouncementModal
      v-if="showCreateAnnouncementModal"
      @close="closeCreateAnnouncementModal"
      @create="handleCreateAnnouncement"
    />
    <EditAnnouncementModal
      v-if="showEditAnnouncementModal && selectedEditAnnouncement"
      :announcement="selectedEditAnnouncement"
      @close="closeEditAnnouncementModal"
      @update="handleUpdateAnnouncement"
    />
    <ViewBulkMessageModal
      v-if="showViewBulkMessageModal && selectedBulkMessage"
      :message="selectedBulkMessage"
      @close="closeViewBulkMessageModal"
    />
    <CreateBulkMessageModal
      v-if="showCreateBulkMessageModal"
      @close="closeCreateBulkMessageModal"
      @create="handleCreateBulkMessage"
    />
    <ViewForumPostModal
      v-if="showViewForumPostModal && selectedForumPost"
      :post="selectedForumPost"
      @close="closeViewForumPostModal"
    />
    <ModerateForumPostModal
      v-if="showModerateForumPostModal && selectedModerateForumPost"
      :post="selectedModerateForumPost"
      @close="closeModerateForumPostModal"
      @moderate="handleModerateForumPost"
    />
  </div>
</template>

<script setup lang="ts">
import IconMessage from '@/components/icon/icon-message.vue';
import IconEdit from '@/components/icon/icon-edit.vue';
import IconTrash from '@/components/icon/icon-trash.vue';
import IconEye from '@/components/icon/icon-eye.vue';
import IconCopy from '@/components/icon/icon-copy.vue';
import ViewAnnouncementModal from '@/components/ViewAnnouncementModal.vue';
import CreateAnnouncementModal from '@/components/CreateAnnouncementModal.vue';
import EditAnnouncementModal from '@/components/EditAnnouncementModal.vue';
import ViewBulkMessageModal from '@/components/ViewBulkMessageModal.vue';
import CreateBulkMessageModal from '@/components/CreateBulkMessageModal.vue';
import ViewForumPostModal from '@/components/ViewForumPostModal.vue';
import ModerateForumPostModal from '@/components/ModerateForumPostModal.vue';
import { ref } from 'vue';

const activeTab = ref('Announcement');

const announcements = [
  { title: 'Monthly Board Meeting', type: 'general', status: 'published', audience: 'All Members', author: 'Admin User', views: 156, created: '2024-01-15' },
  { title: 'System Maintenance Notice', type: 'system', status: 'scheduled', audience: 'All Members', author: 'System Admin', views: 0, created: '2024-01-15' },
  { title: 'Annual Conference Registration', type: 'event', status: 'published', audience: 'Premium Members', author: 'Event Manager', views: 9, created: '2024-01-15' },
  { title: 'Monthly Board Meeting', type: 'general', status: 'scheduled', audience: 'All Members', author: 'Admin User', views: 23, created: '2024-01-15' },
];

const bulkMessages = [
  { subject: 'Weekly Newsletter', type: 'EMAIL', status: 'sent', group: 'All Members', recipients: 1250, deliveryRate: '98.5%', openRate: '65.2%', created: '2024-01-15' },
  { subject: 'Event Reminder', type: 'SMS', status: 'sent', group: 'All Members', recipients: 34, deliveryRate: '-', openRate: '-', created: '2024-01-14' },
  { subject: 'Urgent: Meeting Cancellation', type: 'SMS', status: 'sent', group: 'Premium Members', recipients: 5, deliveryRate: '100%', openRate: '95%', created: '2024-01-14' },
  { subject: 'Monthly Board Meeting', type: 'EMAIL', status: 'scheduled', group: 'All Members', recipients: 2, deliveryRate: '-', openRate: '-', created: '2024-01-14' },
];

const forumPosts = [
  { title: 'Welcome to our new members!', author: 'John Smith', category: 'General', status: 'approved', reports: '-', replies: 6, views: 34, created: '2024-01-15' },
  { title: 'Concerns about recent policy changes', author: 'Jane Doe', category: 'Policy Discussion', status: 'flagged', reports: 4, replies: 12, views: 12, created: '2024-01-14' },
  { title: 'Event planning committee updates', author: 'Mike Johnson', category: 'Events', status: 'pending', reports: 5, replies: 32, views: 32, created: '2024-01-14' },
  { title: 'Inappropriate content example', author: 'Problem User', category: 'General', status: 'rejected', reports: 7, replies: 3, views: 11, created: '2024-01-14' },
];

const showViewAnnouncementModal = ref(false);
const selectedAnnouncement = ref(null);
const showCreateAnnouncementModal = ref(false);
const showEditAnnouncementModal = ref(false);
const selectedEditAnnouncement = ref(null);
const showViewBulkMessageModal = ref(false);
const selectedBulkMessage = ref(null);
const showCreateBulkMessageModal = ref(false);
const showViewForumPostModal = ref(false);
const selectedForumPost = ref(null);
const showModerateForumPostModal = ref(false);
const selectedModerateForumPost = ref(null);

function openViewAnnouncementModal(announcement) {
  selectedAnnouncement.value = announcement;
  showViewAnnouncementModal.value = true;
}

function closeViewAnnouncementModal() {
  showViewAnnouncementModal.value = false;
  selectedAnnouncement.value = null;
}

function openCreateAnnouncementModal() {
  showCreateAnnouncementModal.value = true;
}

function closeCreateAnnouncementModal() {
  showCreateAnnouncementModal.value = false;
}

function openEditAnnouncementModal(announcement) {
  selectedEditAnnouncement.value = announcement;
  showEditAnnouncementModal.value = true;
}

function closeEditAnnouncementModal() {
  showEditAnnouncementModal.value = false;
  selectedEditAnnouncement.value = null;
}

function handleCreateAnnouncement(newAnnouncement) {
  // Handle creation logic here (e.g., API call)
  closeCreateAnnouncementModal();
}

function handleUpdateAnnouncement(updated) {
  // Handle update logic here (e.g., API call)
  closeEditAnnouncementModal();
}

function openViewBulkMessageModal(message) {
  selectedBulkMessage.value = message;
  showViewBulkMessageModal.value = true;
}

function closeViewBulkMessageModal() {
  showViewBulkMessageModal.value = false;
  selectedBulkMessage.value = null;
}

function openCreateBulkMessageModal() {
  showCreateBulkMessageModal.value = true;
}

function closeCreateBulkMessageModal() {
  showCreateBulkMessageModal.value = false;
}

function handleCreateBulkMessage(newMessage) {
  // Handle creation logic here (e.g., API call)
  closeCreateBulkMessageModal();
}

function openViewForumPostModal(post) {
  selectedForumPost.value = post;
  showViewForumPostModal.value = true;
}

function closeViewForumPostModal() {
  showViewForumPostModal.value = false;
  selectedForumPost.value = null;
}

function openModerateForumPostModal(post) {
  selectedModerateForumPost.value = post;
  showModerateForumPostModal.value = true;
}

function closeModerateForumPostModal() {
  showModerateForumPostModal.value = false;
  selectedModerateForumPost.value = null;
}

function handleModerateForumPost(payload) {
  // Handle moderation logic here (e.g., API call)
  closeModerateForumPostModal();
}
</script> 