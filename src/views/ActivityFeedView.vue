<template>
  <div class="p-6 space-y-6">
    <!-- Navigation Tabs -->
    <GroupNavigationTabs />

    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-semibold mb-1">Activity Feed</h1>
        <p class="text-gray-500 dark:text-gray-400 text-sm">Real-time updates and system activities</p>
      </div>
      <button @click="loadActivityFeed" class="bg-black text-white rounded px-4 py-2 font-medium hover:bg-gray-800">
        {{ loading ? 'Loading...' : 'Refresh' }}
      </button>
    </div>

    <!-- Tabs -->
    <div class="flex gap-4 border-b mb-2">
      <button v-for="tab in tabs" :key="tab" @click="activeTab = tab" :class="['pb-2 px-1 font-medium', activeTab === tab ? 'border-b-2 border-black text-black dark:border-white dark:text-white' : 'text-gray-400']">{{ tab }}</button>
    </div>

    <!-- Recent Activities -->
    <div class="flex items-center justify-between mb-2">
      <h2 class="font-semibold text-lg">Recent Activities</h2>
      <span v-if="!loading && filteredActivities.length > 0" class="bg-gray-100 text-gray-600 rounded-full px-3 py-1 text-xs">{{ filteredActivities.length }} New</span>
    </div>
    
    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
    </div>
    
    <!-- Empty State -->
    <div v-else-if="filteredActivities.length === 0" class="text-center py-8 text-gray-500">
      <div class="text-lg mb-2">No activities found</div>
      <div class="text-sm">Activities will appear here as they happen</div>
    </div>
    
    <!-- Activities List -->
    <div v-else class="space-y-2">
      <template v-for="(item, i) in filteredActivities" :key="i">
          <ActivityItem
            :icon="item.icon"
            :iconColor="item.iconColor"
            :title="item.title"
            :desc="item.desc"
            :badge="item.badge"
            :badgeType="item.badgeType"
            :time="item.time"
          />
      </template>
    </div>
    <OverduePaymentsModal v-if="showOverdueModal" @close="showOverdueModal = false" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import ActivityItem from '@/components/ActivityItem.vue';
import OverduePaymentsModal from '@/components/OverduePaymentsModal.vue';
import GroupNavigationTabs from '@/components/GroupNavigationTabs.vue';
import { groupService, type Post } from '@/services/groupService';

const showOverdueModal = ref(false);
const loading = ref(false);
const activities = ref<any[]>([]);
const groupId = ref('688fe39b490ffdecf26c8aed'); // Using first group ID from your API response

const tabs = ['All', 'Members', 'Payments', 'Meetings', 'Communications', 'Systems'];
const activeTab = ref('All');

// Helper function to get post icon based on post type
const getPostIcon = (postType: string) => {
  switch (postType) {
    case 'announcement': return 'MegaphoneIcon';
    case 'discussion': return 'ChatBubbleLeftRightIcon';
    case 'event': return 'CalendarDaysIcon';
    case 'resource': return 'DocumentPlusIcon';
    case 'poll': return 'ChartBarIcon';
    default: return 'ChatBubbleLeftRightIcon';
  }
};

// Helper function to get post icon color
const getPostIconColor = (postType: string) => {
  switch (postType) {
    case 'announcement': return 'text-purple-500';
    case 'discussion': return 'text-blue-500';
    case 'event': return 'text-green-500';
    case 'resource': return 'text-indigo-500';
    case 'poll': return 'text-orange-500';
    default: return 'text-gray-500';
  }
};

// Helper function to get post title
const getPostTitle = (post: Post) => {
  switch (post.post_type) {
    case 'announcement': return 'New Announcement';
    case 'discussion': return 'Discussion Started';
    case 'event': return 'Event Created';
    case 'resource': return 'Resource Added';
    case 'poll': return 'Poll Created';
    default: return 'New Post';
  }
};

// Helper function to get post category
const getPostCategory = (postType: string) => {
  switch (postType) {
    case 'announcement': return 'Communications';
    case 'discussion': return 'Members';
    case 'event': return 'Meetings';
    case 'resource': return 'Systems';
    case 'poll': return 'Members';
    default: return 'All';
  }
};

// Helper function to format time ago
const formatTimeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  return `${Math.floor(diffInSeconds / 86400)} days ago`;
};

// Load activity feed from API
const loadActivityFeed = async () => {
  try {
    loading.value = true;
    console.log('Loading activity feed...');
    
    const response = await groupService.getGroupFeed(groupId.value, { limit: 50 });
    
    if (response.ok && response.data && response.data.posts) {
      // Transform API posts into activity items
      activities.value = response.data.posts.map((post: Post) => ({
        icon: getPostIcon(post.post_type),
        iconColor: getPostIconColor(post.post_type),
        title: getPostTitle(post),
        desc: post.title,
        badge: 'New',
        badgeType: 'info',
        time: formatTimeAgo(post.created_at),
        tab: getPostCategory(post.post_type),
        post: post
      }));
      
      console.log('Activity feed loaded:', activities.value.length, 'activities');
    } else {
      console.warn('No activity feed data received');
      // Fallback to empty array if no data
      activities.value = [];
    }
  } catch (error) {
    console.error('Error loading activity feed:', error);
    // Fallback to empty array on error
    activities.value = [];
  } finally {
    loading.value = false;
  }
};

const filteredActivities = computed(() => {
  if (loading.value) return [];
  return activeTab.value === 'All' ? activities.value : activities.value.filter(a => a.tab === activeTab.value);
});

// Load data on component mount
onMounted(() => {
  loadActivityFeed();
});
</script> 