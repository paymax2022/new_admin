<template>
  <div class="min-h-screen bg-[#f7f9fc] p-6 space-y-6">
    <div class="flex flex-col gap-2">
      <h1 class="text-2xl font-semibold text-[#111827]">Promotion Management</h1>
      <p class="text-sm text-[#6b7280]">Manage featured campaign requests and promotional placements.</p>
    </div>

    <div class="grid gap-4 md:grid-cols-4">
      <PromotionStatCard
        title="Active Promotions"
        value="12"
        caption="Currently featured"
        :icon="IconSparkles"
        accent-color="#2563EB"
        accent-bg="#E0EAFF"
      />
      <PromotionStatCard
        title="Pending Requests"
        value="23"
        caption="Awaiting approval"
        :icon="IconClock"
        accent-color="#F59E0B"
        accent-bg="#FEF3C7"
      />
      <PromotionStatCard
        title="Total Revenue"
        value="₦1.2M"
        caption="+18% from promoted campaigns"
        :icon="IconRevenue"
        accent-color="#10B981"
        accent-bg="#D1FAE5"
      />
      <PromotionStatCard
        title="Success Rate"
        value="87%"
        caption="Promotion effectiveness"
        :icon="IconSuccess"
        accent-color="#8B5CF6"
        accent-bg="#EDE9FE"
      />
    </div>

    <div class="rounded-3xl bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.05)]">
      <div class="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div class="relative flex-1">
          <IconSearch class="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#94a3b8]" />
          <input
            type="text"
            placeholder="Search promotions..."
            class="w-full rounded-full border border-[#e2e8f0] bg-white py-3 pl-12 pr-4 text-sm text-[#1f2937] placeholder:text-[#94a3b8] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
          />
        </div>
        <div class="flex flex-wrap items-center gap-3">
          <FilterSelect label="All Status" />
          <FilterSelect label="All Types" />
        </div>
      </div>

      <div class="mt-6 overflow-x-auto">
        <table class="min-w-full">
          <thead>
            <tr class="text-left text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">
              <th class="border-b border-[#d9e3f0] bg-white px-5 py-3">Request ID</th>
              <th class="border-b border-[#d9e3f0] bg-white px-5 py-3">Campaign</th>
              <th class="border-b border-[#d9e3f0] bg-white px-5 py-3">Type</th>
              <th class="border-b border-[#d9e3f0] bg-white px-5 py-3">Duration</th>
              <th class="border-b border-[#d9e3f0] bg-white px-5 py-3">Budget</th>
              <th class="border-b border-[#d9e3f0] bg-white px-5 py-3">Progress</th>
              <th class="border-b border-[#d9e3f0] bg-white px-5 py-3">Urgency</th>
              <th class="border-b border-[#d9e3f0] bg-white px-5 py-3">Status</th>
              <th class="border-b border-[#d9e3f0] bg-white px-5 py-3">Requested</th>
              <th class="border-b border-[#d9e3f0] bg-white px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <PromotionRow
              v-for="promotion in promotions"
              :key="promotion.id"
              v-bind="promotion"
              @action="handlePromotionAction"
            />
          </tbody>
        </table>
      </div>
    </div>

    <PromotionModal
      v-if="promotionModal.open && promotionModal.data"
      :promotion="promotionModal.data"
      @close="closePromotionModal"
    />
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue';
import { useToast } from 'vue-toastification';

import IconClock from '@/components/icon/icon-clock.vue';
import IconRevenue from '@/components/icon/icon-dollar-sign.vue';
import IconSearch from '@/components/icon/icon-search.vue';
import IconSparkles from '@/components/icon/icon-star.vue';
import IconSuccess from '@/components/icon/icon-circle-check.vue';

import FilterSelect from './components/WalletFilterSelect.vue';
import PromotionModal from './components/PromotionModal.vue';
import PromotionRow from './components/PromotionRow.vue';
import PromotionStatCard from './components/PromotionStatCard.vue';
import crowdfundingService from '@/services/crowdfundingService';

const toast = useToast();
const loading = ref(false);
const searchQuery = ref('');
const boostRates = ref<any[]>([]);

const promotions = ref<PromotionRecord[]>([]);

const loadBoostRates = async () => {
  try {
    const response = await crowdfundingService.getBoostRates();
    if (response.success && response.data) {
      boostRates.value = response.data;
    }
  } catch (error) {
    console.error('Error loading boost rates:', error);
  }
};

const loadPromotions = async () => {
  try {
    loading.value = true;
    // Load campaigns that have been boosted
    const campaignsResponse = await crowdfundingService.listAllCampaigns({
      page: 1,
      limit: 50,
      status: 'all',
    });

    if (campaignsResponse.success && campaignsResponse.data?.data) {
      // Filter campaigns that might have boost/promotion data
      // Note: This is a placeholder - actual promotion data structure may differ
      promotions.value = campaignsResponse.data.data
        .filter((campaign: any) => campaign.boosted || campaign.promoted)
        .map((campaign: any, index: number) => ({
          id: campaign.id || `PR${String(index + 1).padStart(3, '0')}`,
          campaign: campaign.title,
          type: { label: campaign.boosted ? 'Featured' : 'Not Featured', color: campaign.boosted ? '#2563EB' : '#94A3B8', bg: campaign.boosted ? '#DBEAFE' : '#E2E8F0' },
          duration: campaign.boost_duration || '7 days',
          budget: `₦${(campaign.boost_budget || 0).toLocaleString()}`,
          progress: {
            label: `${Math.round(((campaign.current_amount || 0) / (campaign.goal_amount || 1)) * 100)}%`,
            color: '#2563EB',
            bg: '#DBEAFE',
            value: `${Math.round(((campaign.current_amount || 0) / (campaign.goal_amount || 1)) * 100)}%`,
          },
          urgency: { label: campaign.urgent ? 'High' : 'Low', color: campaign.urgent ? '#DC2626' : '#16A34A', bg: campaign.urgent ? '#DC2626' : '#E6FBF2' },
          status: {
            label: campaign.status === 'active' ? 'Active' : campaign.status === 'completed' ? 'Completed' : campaign.status === 'rejected' ? 'Rejected' : 'Archived',
            color: campaign.status === 'active' ? '#16A34A' : campaign.status === 'completed' ? '#16A34A' : campaign.status === 'rejected' ? '#DC2626' : '#94A3B8',
            bg: campaign.status === 'active' ? '#E6FBF2' : campaign.status === 'completed' ? '#E6FBF2' : campaign.status === 'rejected' ? '#FEE2E2' : '#E2E8F0',
          },
          requested: new Date(campaign.created_at).toLocaleDateString(),
          actions: [{ label: 'View', type: 'view' }],
          detail: {
            campaign: campaign.title,
            owner: campaign.owner?.name || 'Unknown',
            email: campaign.owner?.email || 'N/A',
            category: campaign.category,
            budget: `₦${(campaign.boost_budget || 0).toLocaleString()}`,
            paymentMethod: campaign.payment_method || 'Wallet',
            duration: campaign.boost_duration || '7 days',
            currentRaised: `₦${(campaign.current_amount || 0).toLocaleString()}`,
            goal: `₦${(campaign.goal_amount || 0).toLocaleString()}`,
            progress: `${Math.round(((campaign.current_amount || 0) / (campaign.goal_amount || 1)) * 100)}%`,
            requestedDate: new Date(campaign.created_at).toLocaleDateString(),
            startDate: campaign.boost_start_date || new Date(campaign.created_at).toLocaleDateString(),
            endDate: campaign.boost_end_date || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
            urgency: { label: campaign.urgent ? 'High' : 'Low', color: campaign.urgent ? '#FFFFFF' : '#2563EB', bg: campaign.urgent ? '#DC2626' : '#DBEAFE' },
            description: campaign.description || 'No description available.',
          },
        }));
    }

    // If no promotions found, use dummy data
    if (promotions.value.length === 0) {
      promotions.value = dummyPromotions;
    }
  } catch (error) {
    console.error('Error loading promotions:', error);
    toast.error('Failed to load promotions');
    promotions.value = dummyPromotions;
  } finally {
    loading.value = false;
  }
};

type PromotionRecord = {
  id: string;
  campaign: string;
  type: { label: string; color: string; bg: string };
  duration: string;
  budget: string;
  progress: { label: string; color: string; bg: string; value: string };
  urgency: { label: string; color: string; bg: string };
  status: { label: string; color: string; bg: string };
  requested: string;
  actions: { label: string; type: string }[];
  detail: {
    campaign: string;
    owner: string;
    email: string;
    category: string;
    budget: string;
    paymentMethod: string;
    duration: string;
    currentRaised: string;
    goal: string;
    progress: string;
    requestedDate: string;
    startDate: string;
    endDate: string;
    urgency: { label: string; color: string; bg: string };
    description: string;
  };
};

const dummyPromotions: PromotionRecord[] = [
  {
    id: 'PR001',
    campaign: 'Emergency Medical Fund for Children',
    type: { label: 'Featured', color: '#2563EB', bg: '#DBEAFE' },
    duration: '7 days',
    budget: '₦100,000',
    progress: { label: '25%', color: '#2563EB', bg: '#DBEAFE', value: '25%' },
    urgency: { label: 'High', color: '#DC2626', bg: '#DC2626' },
    status: { label: 'Active', color: '#16A34A', bg: '#E6FBF2' },
    requested: '2023-08-16',
    actions: [{ label: 'View', type: 'view' }],
    detail: {
      campaign: 'Emergency Medical Fund for Children',
      owner: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@email.com',
      category: 'Medical',
      budget: '₦250,000',
      paymentMethod: 'Credit Card',
      duration: '7 days',
      currentRaised: '₦72,450',
      goal: '₦90,000',
      progress: '25%',
      requestedDate: '2023-10-01',
      startDate: '2023-10-10',
      endDate: '2023-10-17',
      urgency: { label: 'High', color: '#FFFFFF', bg: '#DC2626' },
      description: 'Critical medical fund for children’s surgery.',
    },
  },
  {
    id: 'PR002',
    campaign: 'Community Development Projects',
    type: { label: 'Not Featured', color: '#94A3B8', bg: '#E2E8F0' },
    duration: '7 days',
    budget: '₦120,000',
    progress: { label: '20%', color: '#2563EB', bg: '#DBEAFE', value: '20%' },
    urgency: { label: 'Low', color: '#16A34A', bg: '#E6FBF2' },
    status: { label: 'Archived', color: '#94A3B8', bg: '#E2E8F0' },
    requested: '2023-08-14',
    actions: [{ label: 'View', type: 'view' }],
    detail: {
      campaign: 'Community Development Projects',
      owner: 'Mary Sola',
      email: 'mary.sola@email.com',
      category: 'Community',
      budget: '₦280,000',
      paymentMethod: 'Bank Transfer',
      duration: '7 days',
      currentRaised: '₦56,200',
      goal: '₦120,000',
      progress: '20%',
      requestedDate: '2023-09-24',
      startDate: '2023-09-30',
      endDate: '2023-10-07',
      urgency: { label: 'Low', color: '#2563EB', bg: '#DBEAFE' },
      description: 'Seasonal promotion for community development donors.',
    },
  },
  {
    id: 'PR003',
    campaign: 'Emergency Medical Fund for Children',
    type: { label: 'Featured', color: '#2563EB', bg: '#DBEAFE' },
    duration: '7 days',
    budget: '₦95,000',
    progress: { label: '30%', color: '#2563EB', bg: '#DBEAFE', value: '30%' },
    urgency: { label: 'High', color: '#DC2626', bg: '#DC2626' },
    status: { label: 'Completed', color: '#16A34A', bg: '#E6FBF2' },
    requested: '2023-08-15',
    actions: [{ label: 'View', type: 'view' }],
    detail: {
      campaign: 'Emergency Medical Fund for Children',
      owner: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@email.com',
      category: 'Medical',
      budget: '₦300,000',
      paymentMethod: 'Credit Card',
      duration: '7 days',
      currentRaised: '₦98,600',
      goal: '₦120,000',
      progress: '30%',
      requestedDate: '2023-08-01',
      startDate: '2023-08-05',
      endDate: '2023-08-12',
      urgency: { label: 'High', color: '#FFFFFF', bg: '#2563EB' },
      description: 'Completed promotion with strong donor engagement.',
    },
  },
  {
    id: 'PR004',
    campaign: 'Emergency Medical Fund for Children',
    type: { label: 'Featured', color: '#2563EB', bg: '#DBEAFE' },
    duration: '7 days',
    budget: '₦105,000',
    progress: { label: '18%', color: '#2563EB', bg: '#DBEAFE', value: '18%' },
    urgency: { label: 'High', color: '#DC2626', bg: '#DC2626' },
    status: { label: 'Rejected', color: '#DC2626', bg: '#FEE2E2' },
    requested: '2023-08-14',
    actions: [{ label: 'View', type: 'view' }],
    detail: {
      campaign: 'Emergency Medical Fund for Children',
      owner: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@email.com',
      category: 'Medical',
      budget: '₦210,000',
      paymentMethod: 'Wallet Balance',
      duration: '7 days',
      currentRaised: '₦32,400',
      goal: '₦120,000',
      progress: '18%',
      requestedDate: '2023-07-27',
      startDate: '2023-08-03',
      endDate: '2023-08-10',
      urgency: { label: 'High', color: '#FFFFFF', bg: '#DC2626' },
      description: 'Rejected promotion due to insufficient budget approval.',
    },
  },
];

const promotionModal = reactive<{ open: boolean; data: PromotionRecord | null }>({ open: false, data: null });

const handlePromotionAction = ({ row }: { action: { type: string }; row: PromotionRecord }) => {
  promotionModal.open = true;
  promotionModal.data = row;
};

const closePromotionModal = () => {
  promotionModal.open = false;
  promotionModal.data = null;
};
</script>

