<template>
  <div class="min-h-screen bg-[#f7f9fc] p-6 space-y-6">
    <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
      <div>
        <h1 class="text-2xl font-semibold text-[#1a202c]">Campaign Management</h1>
        <p class="mt-1 max-w-xl text-sm text-[#718096]">
          Review, approve, and manage all crowdfunding campaigns on your platform.
        </p>
      </div>
    </div>

    <div class="rounded-3xl bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.05)]">
      <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div class="flex flex-1 items-center gap-3">
          <div class="relative flex-1 lg:max-w-md">
            <IconSearch class="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#94a3b8]" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search campaigns or owners..."
              class="w-full rounded-full border border-[#e2e8f0] bg-white py-3 pl-12 pr-4 text-sm text-[#1e293b] placeholder:text-[#94a3b8] focus:border-[#6366f1] focus:outline-none focus:ring-2 focus:ring-[#c7d2fe]"
            />
          </div>
          <button
            class="inline-flex items-center gap-2 rounded-full border border-[#e2e8f0] px-4 py-2 text-sm font-semibold text-[#475569] transition hover:border-[#cbd5f5] hover:text-[#1e293b]"
          >
            <IconListCheck class="h-4 w-4" />
            Filters
          </button>
        </div>
        <div class="flex flex-wrap items-center gap-3">
          <div class="relative">
            <select
              v-model="statusFilter"
              @change="loadCampaigns"
              class="appearance-none rounded-full border border-[#e2e8f0] bg-white px-4 py-2 pr-10 text-sm font-semibold text-[#475569] transition hover:border-[#cbd5f5] focus:border-[#6366f1] focus:outline-none focus:ring-2 focus:ring-[#c7d2fe]"
            >
              <option value="">All Statuses</option>
              <option value="active">Ongoing</option>
              <option value="approved">Approved</option>
              <option value="suspended">Paused</option>
              <option value="rejected">Rejected</option>
            </select>
            <IconCaretsDown class="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94a3b8]" />
          </div>
          <div class="relative">
            <select
              v-model="categoryFilter"
              @change="loadCampaigns"
              class="appearance-none rounded-full border border-[#e2e8f0] bg-white px-4 py-2 pr-10 text-sm font-semibold text-[#475569] transition hover:border-[#cbd5f5] focus:border-[#6366f1] focus:outline-none focus:ring-2 focus:ring-[#c7d2fe]"
            >
              <option value="">All Categories</option>
              <option value="Medical">Medical</option>
              <option value="Education">Education</option>
              <option value="Tech">Tech</option>
              <option value="Animals">Animals</option>
            </select>
            <IconCaretsDown class="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94a3b8]" />
          </div>
        </div>
      </div>

      <div class="mt-6 overflow-x-auto">
        <table class="min-w-full">
          <thead>
            <tr class="text-left text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">
              <th class="border-b border-[#d9e3f0] bg-white px-5 py-3">Campaign</th>
              <th class="border-b border-[#d9e3f0] bg-white px-5 py-3">Owner</th>
              <th class="border-b border-[#d9e3f0] bg-white px-5 py-3">Progress</th>
              <th class="border-b border-[#d9e3f0] bg-white px-5 py-3">Status</th>
              <th class="border-b border-[#d9e3f0] bg-white px-5 py-3">Verified</th>
              <th class="border-b border-[#d9e3f0] bg-white px-5 py-3">Created</th>
              <th class="border-b border-[#d9e3f0] bg-white px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <CampaignRow
              v-for="row in filteredCampaigns"
              :key="row.id"
              v-bind="row"
              @action="handleCampaignAction"
            />
          </tbody>
        </table>
      </div>
    </div>

    <transition name="fade">
      <div
        v-if="isModalOpen && selectedCampaign"
        class="fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
        @keydown.esc="closeModal"
      >
        <div class="absolute inset-0 bg-[#0f172a]/40 backdrop-blur-sm" @click="closeModal" />
        <div class="relative z-10 flex w-full max-w-3xl max-h-[90vh] flex-col overflow-hidden rounded-3xl bg-white shadow-[0_40px_80px_rgba(15,23,42,0.18)]">
          <button
            type="button"
            class="absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#1f2937] shadow"
            @click="closeModal"
          >
            <IconX class="h-5 w-5" />
          </button>
          <div class="flex-1 overflow-y-auto">
            <div class="px-6 pb-8 pt-10">
              <div class="space-y-6">
                <div>
                  <h2 class="text-2xl font-semibold text-[#111827]">{{ selectedCampaign.modal.title }}</h2>
                  <div class="mt-2 flex flex-wrap items-center gap-2 text-sm text-[#64748b]">
                    <span>{{ selectedCampaign.modal.meta }}</span>
                    <span class="inline-flex items-center gap-1 font-semibold text-[#16a34a]">
                      <IconCircleCheck class="h-4 w-4" />
                      {{ selectedCampaign.modal.verifiedLabel }}
                    </span>
                  </div>
                </div>

                <div class="relative overflow-hidden rounded-2xl">
                  <img :src="selectedCampaign.modal.image" :alt="selectedCampaign.campaign" class="h-56 w-full object-cover" />
                  <button
                    type="button"
                    class="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#1f2937] shadow"
                  >
                    <IconChevronRight class="h-5 w-5" />
                  </button>
                </div>

                <div class="space-y-4">
                  <h3 class="text-sm font-semibold uppercase tracking-wide text-[#94a3b8]">Campaign Details</h3>
                  <div class="grid gap-y-4 gap-x-8 sm:grid-cols-2">
                    <div
                      v-for="detail in selectedCampaign.modal.details"
                      :key="detail.label"
                      class="space-y-1"
                    >
                      <p class="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">{{ detail.label }}</p>
                      <p class="text-sm font-semibold text-[#111827]">{{ detail.value }}</p>
                    </div>
                  </div>
                </div>

                <div class="space-y-3">
                  <h3 class="text-sm font-semibold uppercase tracking-wide text-[#94a3b8]">About This Campaign</h3>
                  <p class="text-sm leading-relaxed text-[#475569]">
                    {{ selectedCampaign.modal.description }}
                  </p>
                </div>

                <div class="space-y-4">
                  <h3 class="text-sm font-semibold uppercase tracking-wide text-[#94a3b8]">
                    {{ selectedCampaign.modal.verificationTitle }}
                  </h3>
                  <div
                    class="flex items-center justify-between rounded-2xl border border-[#e2e8f0] bg-white px-4 py-3"
                  >
                    <div class="flex items-center gap-3">
                      <div class="flex h-8 w-8 items-center justify-center rounded-full bg-[#fee2e2] text-[#dc2626]">
                        <IconFile class="h-4 w-4" />
                      </div>
                      <div>
                        <p class="text-sm font-semibold text-[#111827]">{{ selectedCampaign.modal.verificationFile }}</p>
                        <p class="text-xs text-[#94a3b8]">PDF · 1.2 MB</p>
                      </div>
                    </div>
                    <IconDownload class="h-5 w-5 text-[#94a3b8]" />
                  </div>
                </div>

                <div class="space-y-4">
                  <div class="flex items-center justify-between">
                    <h3 class="text-sm font-semibold uppercase tracking-wide text-[#94a3b8]">
                      {{ selectedCampaign.modal.donorsTitle }}
                    </h3>
                    <button class="text-xs font-semibold uppercase tracking-wide text-[#2563eb]">View all</button>
                  </div>
                  <div class="space-y-3">
                    <div
                      v-for="donor in selectedCampaign.modal.donors"
                      :key="donor.name + donor.date"
                      class="rounded-2xl border border-[#e2e8f0] bg-white px-4 py-4"
                    >
                      <div class="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p class="text-sm font-semibold text-[#111827]">{{ donor.name }}</p>
                          <p class="text-xs text-[#94a3b8]">{{ donor.date }}</p>
                        </div>
                        <span class="inline-flex items-center rounded-full border border-[#16a34a] px-3 py-1 text-xs font-semibold text-[#16a34a]">
                          {{ donor.amount }}
                        </span>
                      </div>
                      <p class="mt-3 text-sm text-[#475569]">“{{ donor.message }}”</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="border-t border-[#e2e8f0] bg-[#f8fafc] px-6 py-4">
            <div class="flex justify-end">
              <button
                type="button"
                class="rounded-full border border-[#e2e8f0] px-5 py-2 text-sm font-semibold text-[#475569] transition hover:border-[#cbd5f5] hover:text-[#1e293b]"
                @click="closeModal"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <transition name="fade">
      <div
        v-if="confirmModalState"
        class="fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
      >
        <div class="absolute inset-0 bg-[#0f172a]/40 backdrop-blur-sm" @click="closeModal" />
        <div class="relative z-10 w-full max-w-sm rounded-3xl bg-white p-6 text-center shadow-[0_30px_60px_rgba(15,23,42,0.16)]">
          <button
            type="button"
            class="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-[#f1f5f9] text-[#475569]"
            @click="closeModal"
          >
            <IconX class="h-4 w-4" />
          </button>
          <h3 class="text-lg font-semibold text-[#111827]">{{ confirmModalState.title }}</h3>
          <p class="mt-3 text-sm leading-relaxed text-[#475569]">
            {{ confirmModalState.message }}
          </p>
          <div class="mt-6 flex gap-3">
            <button
              type="button"
              class="w-1/2 rounded-full border border-[#e2e8f0] px-4 py-2 text-sm font-semibold text-[#475569] transition hover:border-[#cbd5f5] hover:text-[#1e293b]"
              @click="closeModal"
            >
              Cancel
            </button>
            <button
              type="button"
              class="w-1/2 rounded-full bg-[#2563eb] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1d4ed8]"
              @click="approveCampaign(confirmModalState.row)"
            >
              {{ confirmModalState.confirmLabel }}
            </button>
          </div>
        </div>
      </div>
    </transition>

    <transition name="fade">
      <div v-if="declineModalState" class="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
        <div class="absolute inset-0 bg-[#0f172a]/40 backdrop-blur-sm" @click="closeModal" />
        <div class="relative z-10 w-full max-w-sm rounded-3xl bg-white p-6 text-center shadow-[0_30px_60px_rgba(15,23,42,0.16)]">
          <button
            type="button"
            class="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-[#f1f5f9] text-[#475569]"
            @click="closeModal"
          >
            <IconX class="h-4 w-4" />
          </button>
          <h3 class="text-lg font-semibold text-[#111827]">{{ declineModalState.title }}</h3>
          <p class="mt-3 text-sm leading-relaxed text-[#475569]">
            {{ declineModalState.message }}
          </p>
          <div class="mt-6 space-y-3 text-left">
            <label class="block text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Rejection Reason</label>
            <select
              v-model="declineModalState.reason"
              class="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm text-[#1e293b] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
            >
              <option value="" disabled>{{ declineModalState.placeholder }}</option>
              <option value="incomplete-documents">Incomplete Documents</option>
              <option value="policy-violation">Policy Violation</option>
              <option value="duplicate-campaign">Duplicate Campaign</option>
              <option value="other">Other</option>
            </select>
            <textarea
              v-model="declineModalState.reason"
              class="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm text-[#1e293b] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
              rows="3"
              placeholder="Add additional notes..."
            />
          </div>
          <div class="mt-6 flex gap-3">
            <button
              type="button"
              class="w-1/2 rounded-full border border-[#e2e8f0] px-4 py-2 text-sm font-semibold text-[#475569] transition hover:border-[#cbd5f5] hover:text-[#1e293b]"
              @click="closeModal"
            >
              Cancel
            </button>
            <button
              type="button"
              class="w-1/2 rounded-full bg-[#dc2626] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#b91c1c]"
              @click="declineCampaign(declineModalState)"
            >
              {{ declineModalState.confirmLabel }}
            </button>
          </div>
        </div>
      </div>
    </transition>

    <transition name="fade">
      <div v-if="suspendModalState" class="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
        <div class="absolute inset-0 bg-[#0f172a]/40 backdrop-blur-sm" @click="closeModal" />
        <div class="relative z-10 w-full max-w-sm rounded-3xl bg-white p-6 text-center shadow-[0_30px_60px_rgba(15,23,42,0.16)]">
          <button
            type="button"
            class="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-[#f1f5f9] text-[#475569]"
            @click="closeModal"
          >
            <IconX class="h-4 w-4" />
          </button>
          <h3 class="text-lg font-semibold text-[#111827]">{{ suspendModalState.title }}</h3>
          <p class="mt-3 text-sm leading-relaxed text-[#475569]">
            {{ suspendModalState.message }}
          </p>
          <div class="mt-6 flex gap-3">
            <button
              type="button"
              class="w-1/2 rounded-full border border-[#e2e8f0] px-4 py-2 text-sm font-semibold text-[#475569] transition hover:border-[#cbd5f5] hover:text-[#1e293b]"
              @click="closeModal"
            >
              Cancel
            </button>
            <button
              type="button"
              class="w-1/2 rounded-full bg-[#dc2626] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#b91c1c]"
              @click="suspendCampaign(suspendModalState)"
            >
              {{ suspendModalState.confirmLabel }}
            </button>
          </div>
        </div>
      </div>
    </transition>

    <transition name="fade">
      <div v-if="activateModalState" class="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
        <div class="absolute inset-0 bg-[#0f172a]/40 backdrop-blur-sm" @click="closeModal" />
        <div class="relative z-10 w-full max-w-sm rounded-3xl bg-white p-6 text-center shadow-[0_30px_60px_rgba(15,23,42,0.16)]">
          <button
            type="button"
            class="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-[#f1f5f9] text-[#475569]"
            @click="closeModal"
          >
            <IconX class="h-4 w-4" />
          </button>
          <h3 class="text-lg font-semibold text-[#111827]">{{ activateModalState.title }}</h3>
          <p class="mt-3 text-sm leading-relaxed text-[#475569]">
            {{ activateModalState.message }}
          </p>
          <div class="mt-6 flex gap-3">
            <button
              type="button"
              class="w-1/2 rounded-full border border-[#e2e8f0] px-4 py-2 text-sm font-semibold text-[#475569] transition hover:border-[#cbd5f5] hover:text-[#1e293b]"
              @click="closeModal"
            >
              Cancel
            </button>
            <button
              type="button"
              class="w-1/2 rounded-full bg-[#16a34a] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#15803d]"
              @click="activateCampaign(activateModalState)"
            >
              {{ activateModalState.confirmLabel }}
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { useToast } from 'vue-toastification';

import IconCaretsDown from '@/components/icon/icon-carets-down.vue';
import IconChecks from '@/components/icon/icon-checks.vue';
import IconChevronRight from '@/components/icon/icon-arrow-forward.vue';
import IconEye from '@/components/icon/icon-eye.vue';
import IconFile from '@/components/icon/icon-file.vue';
import IconListCheck from '@/components/icon/icon-list-check.vue';
import IconMinusCircle from '@/components/icon/icon-minus-circle.vue';
import IconRefresh from '@/components/icon/icon-refresh.vue';
import IconSearch from '@/components/icon/icon-search.vue';
import IconDownload from '@/components/icon/icon-download.vue';
import IconCircleCheck from '@/components/icon/icon-circle-check.vue';
import IconX from '@/components/icon/icon-x.vue';
import IconXCircle from '@/components/icon/icon-x-circle.vue';

import campaignImage from '@/assets/image/campaignImage.png';

import CampaignRow from './components/CampaignRow.vue';
import crowdfundingService from '@/services/crowdfundingService';

const toast = useToast();
const loading = ref(false);
const searchQuery = ref('');
const statusFilter = ref('');
const categoryFilter = ref('');
const currentPage = ref(1);
const pageSize = ref(20);

type CampaignRowActionPayload = {
  action: {
    label: string;
    type?: string;
  };
  row: CampaignRowData;
};

type ModalDetail = {
  label: string;
  value: string;
};

type ModalDonor = {
  name: string;
  date: string;
  message: string;
  amount: string;
};

type ModalData = {
  title: string;
  meta: string;
  verifiedLabel: string;
  image: string;
  details: ModalDetail[];
  description: string;
  verificationTitle: string;
  verificationFile: string;
  donorsTitle: string;
  donors: ModalDonor[];
  confirmAction?: {
    title: string;
    message: string;
    confirmLabel: string;
  };
  declineAction?: {
    title: string;
    message: string;
    confirmLabel: string;
    placeholder: string;
  };
  suspendAction?: {
    title: string;
    message: string;
    confirmLabel: string;
  };
  activateAction?: {
    title: string;
    message: string;
    confirmLabel: string;
  };
};

type CampaignRowData = {
  id: number;
  campaign: string;
  campaignSubtitle: string;
  owner: string;
  ownerSubtitle: string;
  currentAmount: string;
  goalAmount: string;
  fundingText: string;
  progress: number;
  status: string;
  statusColor: string;
  statusBg: string;
  verified: string;
  verifiedColor: string;
  created: string;
  actions: {
    label: string;
    type?: string;
    icon: any;
    textColor: string;
    bgColor: string;
    borderColor?: string;
  }[];
  modal: ModalData;
  confirmAction?: {
    title: string;
    message: string;
    confirmLabel: string;
  };
  declineAction?: {
    title: string;
    message: string;
    confirmLabel: string;
    placeholder: string;
  };
  suspendAction?: {
    title: string;
    message: string;
    confirmLabel: string;
  };
  activateAction?: {
    title: string;
    message: string;
    confirmLabel: string;
  };
};

const campaignRows = ref<CampaignRowData[]>([]);
const donations = ref<any[]>([]);
const reviews = ref<any[]>([]);
const campaignActivity = ref<any[]>([]);

const loadCampaigns = async () => {
  try {
    loading.value = true;
    const response = await crowdfundingService.listAllCampaigns({
      page: currentPage.value,
      limit: pageSize.value,
      status: statusFilter.value || 'all',
      sort: 'created_at',
    });

    if (response.success && response.data?.data) {
      campaignRows.value = response.data.data.map((campaign: any) => ({
        id: parseInt(campaign.id) || Math.random(),
        campaign: campaign.title,
        campaignSubtitle: campaign.category,
        owner: campaign.owner?.name || 'Unknown',
        ownerSubtitle: `${campaign.donations_count || 0} donations`,
        currentAmount: `₦${(campaign.current_amount || 0).toLocaleString()}`,
        goalAmount: `₦${(campaign.goal_amount || 0).toLocaleString()}`,
        fundingText: `${Math.round(((campaign.current_amount || 0) / (campaign.goal_amount || 1)) * 100)}% funded`,
        progress: campaign.goal_amount > 0 ? (campaign.current_amount || 0) / campaign.goal_amount : 0,
        status: campaign.status === 'pending' ? 'Pending' : campaign.status === 'approved' ? 'Approved' : campaign.status === 'suspended' ? 'Paused' : campaign.status === 'rejected' ? 'Declined' : 'Active',
        statusColor: campaign.status === 'pending' ? '#F59E0B' : campaign.status === 'approved' || campaign.status === 'active' ? '#16A34A' : campaign.status === 'suspended' ? '#F97316' : '#DC2626',
        statusBg: campaign.status === 'pending' ? '#FFF7E6' : campaign.status === 'approved' || campaign.status === 'active' ? '#E6FBF2' : campaign.status === 'suspended' ? '#FFE7D6' : '#FEE2E2',
        verified: campaign.verified ? 'Verified' : 'Not Verified',
        verifiedColor: campaign.verified ? '#16A34A' : '#DC2626',
        created: new Date(campaign.created_at).toLocaleDateString(),
        actions: getActionsForStatus(campaign.status),
        modal: {
          title: campaign.title,
          meta: `Campaign ID: ${campaign.id} | Owner: ${campaign.owner?.name || 'Unknown'}`,
          verifiedLabel: campaign.verified ? 'Verified' : 'Not Verified',
          image: campaign.images?.[0] || campaignImage,
          details: [
            { label: 'Category', value: campaign.category },
            { label: 'Status', value: campaign.status },
            { label: 'Target', value: `₦${(campaign.goal_amount || 0).toLocaleString()}` },
            { label: 'Raised', value: `₦${(campaign.current_amount || 0).toLocaleString()}` },
          ],
          description: campaign.description,
          verificationTitle: 'Verification Document',
          verificationFile: 'Verification Document',
          donorsTitle: 'Donors',
          donors: [],
        },
        confirmAction: {
          title: 'Approve Campaign?',
          message: `Are you sure you want to approve "${campaign.title}"? This campaign will be made live and visible to all users.`,
          confirmLabel: 'Approve Campaign',
        },
        declineAction: {
          title: 'Decline Campaign',
          message: `Please provide a reason for declining "${campaign.title}". The campaign owner will be notified.`,
          confirmLabel: 'Decline Campaign',
          placeholder: 'Select Reason',
        },
        suspendAction: {
          title: 'Pause Campaign',
          message: 'Are you sure you want to pause this campaign? This will pause all activity and visibility until you choose to reactivate.',
          confirmLabel: 'Pause Campaign',
        },
        activateAction: {
          title: 'Reactivate Campaign?',
          message: 'Do you want to reactivate this campaign? Once reactivated, it will resume running and become visible to your audience.',
          confirmLabel: 'Reactivate Campaign',
        },
      }));
    }
  } catch (error) {
    console.error('Error loading campaigns:', error);
    toast.error('Failed to load campaigns');
    // Fallback to dummy data if API fails
    if (campaignRows.value.length === 0) {
      initializeDummyData();
    }
  } finally {
    loading.value = false;
  }
};

const getActionsForStatus = (status: string) => {
  if (status === 'pending') {
    return [
      { label: 'View', type: 'view', icon: IconEye, textColor: '#1E293B', bgColor: '#F8FAFC', borderColor: '#E2E8F0' },
      { label: 'Approve', type: 'approve', icon: IconChecks, textColor: '#16A34A', bgColor: '#ECFDF5' },
      { label: 'Decline', type: 'decline', icon: IconXCircle, textColor: '#DC2626', bgColor: '#FEE2E2' },
    ];
  } else if (status === 'suspended' || status === 'paused') {
    return [
      { label: 'View', type: 'view', icon: IconEye, textColor: '#1E293B', bgColor: '#F8FAFC', borderColor: '#E2E8F0' },
      { label: 'Activate', type: 'activate', icon: IconRefresh, textColor: '#2563EB', bgColor: '#DBEAFE' },
    ];
  } else if (status === 'active' || status === 'approved') {
    return [
      { label: 'View', type: 'view', icon: IconEye, textColor: '#1E293B', bgColor: '#F8FAFC', borderColor: '#E2E8F0' },
      { label: 'Suspend', type: 'suspend', icon: IconMinusCircle, textColor: '#DC2626', bgColor: '#FEE2E2' },
    ];
  }
  return [
    { label: 'View', type: 'view', icon: IconEye, textColor: '#1E293B', bgColor: '#F8FAFC', borderColor: '#E2E8F0' },
  ];
};

const loadCampaignDetails = async (campaignId: string) => {
  try {
    const [detailsResponse, donationsResponse, reviewsResponse, activityResponse] = await Promise.all([
      crowdfundingService.getCampaignDetails(campaignId),
      crowdfundingService.getCampaignDonations(campaignId, { page: 1, limit: 5 }),
      crowdfundingService.getCampaignReviews(campaignId, { page: 1, limit: 5 }),
      crowdfundingService.getCampaignActivity(campaignId),
    ]);

    if (donationsResponse.success && donationsResponse.data?.data) {
      donations.value = donationsResponse.data.data.map((donation: any) => ({
        name: donation.is_anonymous ? 'Anonymous' : donation.donor_name,
        date: new Date(donation.created_at).toLocaleDateString(),
        message: donation.message || '',
        amount: `₦${donation.amount.toLocaleString()}`,
      }));
    }

    if (reviewsResponse.success && reviewsResponse.data?.data) {
      reviews.value = reviewsResponse.data.data;
    }

    if (activityResponse.success && activityResponse.data) {
      campaignActivity.value = activityResponse.data;
    }

    if (detailsResponse.success && detailsResponse.data) {
      const campaign = detailsResponse.data;
      const selected = campaignRows.value.find((c) => c.id.toString() === campaignId);
      if (selected) {
        selected.modal.donors = donations.value;
      }
    }
  } catch (error) {
    console.error('Error loading campaign details:', error);
  }
};

const filteredCampaigns = computed(() => {
  let filtered = campaignRows.value;

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (c) =>
        c.campaign.toLowerCase().includes(query) ||
        c.owner.toLowerCase().includes(query) ||
        c.campaignSubtitle.toLowerCase().includes(query)
    );
  }

  if (statusFilter.value && statusFilter.value !== 'All Statuses') {
    filtered = filtered.filter((c) => c.status === statusFilter.value);
  }

  if (categoryFilter.value && categoryFilter.value !== 'All Categories') {
    filtered = filtered.filter((c) => c.campaignSubtitle === categoryFilter.value);
  }

  return filtered;
});

onMounted(() => {
  loadCampaigns();
});

// Force recompile - syntax fixes applied

// Dummy data fallback - will be used if API fails
const initializeDummyData = () => {
  campaignRows.value = [
    {
      id: 1,
      campaign: 'Emergency Surgery Fund',
      campaignSubtitle: 'Medical',
      owner: 'John Doe',
      ownerSubtitle: '342 donations',
      currentAmount: '₦45,200',
      goalAmount: '₦50,000',
      fundingText: '90% funded',
      progress: 0.9,
      status: 'Pending',
      statusColor: '#F59E0B',
      statusBg: '#FFF7E6',
      verified: 'Verified',
      verifiedColor: '#16A34A',
      created: '1/14/2024',
      actions: [
        { label: 'View', type: 'view', icon: IconEye, textColor: '#1E293B', bgColor: '#F8FAFC', borderColor: '#E2E8F0' },
        { label: 'Approve', type: 'approve', icon: IconChecks, textColor: '#16A34A', bgColor: '#ECFDF5' },
        { label: 'Decline', type: 'decline', icon: IconXCircle, textColor: '#DC2626', bgColor: '#FEE2E2' },
      ],
      modal: {
        title: 'Emergency Surgery Fund for Sarah',
        meta: 'Campaign ID: C001 | Owner: John Doe',
        verifiedLabel: 'Verified',
        image: campaignImage,
        details: [
          { label: 'Category', value: 'Medical' },
          { label: 'Status', value: 'Pending' },
          { label: 'Target', value: '₦50,000' },
          { label: 'Raised', value: '₦45,200' },
        ],
        description:
          'Sarah is a 9-year-old girl in need of emergency surgery. The procedure costs ₦50,000 and we have raised ₦45,200 so far. With your support, we can help her get the lifesaving treatment she deserves.',
        verificationTitle: 'Verification Document',
        verificationFile: 'Medical Report',
        donorsTitle: 'Donors (5)',
        donors: [
          { name: 'Mike Johnson', date: '2024-01-17', message: 'Stay strong Sarah!', amount: '₦50,000' },
          { name: 'Anita Cole', date: '2024-01-16', message: 'Sending prayers', amount: '₦25,000' },
        ],
      },
      confirmAction: {
        title: 'Approve Campaign?',
        message:
          'Are you sure you want to approve "Emergency Surgery Fund for Sarah"? This campaign will be made live and visible to all users.',
        confirmLabel: 'Approve Campaign',
      },
      declineAction: {
        title: 'Decline Campaign',
        message:
          'Please provide a reason for declining "Emergency Surgery Fund for Sarah". The campaign owner will be notified.',
        confirmLabel: 'Decline Campaign',
        placeholder: 'Select Reason',
      },
    },
    {
      id: 2,
      campaign: 'School Technology Drive',
      campaignSubtitle: 'Education',
      owner: 'Mary Smith',
      ownerSubtitle: '189 donations',
      currentAmount: '₦45,200',
      goalAmount: '₦50,000',
      fundingText: '90% funded',
      progress: 0.9,
      status: 'Active',
      statusColor: '#16A34A',
      statusBg: '#E6FBF2',
      verified: 'Verified',
      verifiedColor: '#16A34A',
      created: '1/14/2024',
      actions: [
        { label: 'View', type: 'view', icon: IconEye, textColor: '#1E293B', bgColor: '#F8FAFC', borderColor: '#E2E8F0' },
        { label: 'Suspend', type: 'suspend', icon: IconMinusCircle, textColor: '#DC2626', bgColor: '#FEE2E2' },
      ],
      modal: {
        title: 'School Technology Drive',
        meta: 'Campaign ID: EDU-014 | Owner: Mary Smith',
        verifiedLabel: 'Verified',
        image: campaignImage,
        details: [
          { label: 'Category', value: 'Education' },
          { label: 'Status', value: 'Active' },
          { label: 'Target', value: '₦50,000' },
          { label: 'Raised', value: '₦45,200' },
        ],
        description:
          'We are equipping rural classrooms with modern learning devices. Funds will provide tablets, projectors, and internet access for over 300 students this term.',
        verificationTitle: 'Verification Document',
        verificationFile: 'Accreditation Letter',
        donorsTitle: 'Donors (3)',
        donors: [
          { name: 'Bright Future Org', date: '2024-01-15', message: 'Excited to see the impact.', amount: '₦40,000' },
          { name: 'Janet Paul', date: '2024-01-13', message: 'Keep inspiring students!', amount: '₦10,000' },
        ],
      },
      suspendAction: {
        title: 'Pause Campaign',
        message:
          'Are you sure you want to pause this campaign? This will pause all activity and visibility until you choose to reactivate.',
        confirmLabel: 'Pause Campaign',
      },
      activateAction: {
        title: 'Reactivate Campaign?',
        message:
          'Do you want to reactivate this campaign? Once reactivated, it will resume running and become visible to your audience.',
        confirmLabel: 'Reactivate Campaign',
      },
    },
    {
      id: 3,
      campaign: 'Animal Shelter Support',
      campaignSubtitle: 'Animals',
      owner: 'Pet Rescue Inc.',
      ownerSubtitle: '156 donations',
      currentAmount: '₦45,200',
      goalAmount: '₦50,000',
      fundingText: '90% funded',
      progress: 0.9,
      status: 'Paused',
      statusColor: '#F97316',
      statusBg: '#FFE7D6',
      verified: 'Verified',
      verifiedColor: '#16A34A',
      created: '1/14/2024',
      actions: [
        { label: 'View', type: 'view', icon: IconEye, textColor: '#1E293B', bgColor: '#F8FAFC', borderColor: '#E2E8F0' },
        { label: 'Activate', type: 'activate', icon: IconRefresh, textColor: '#2563EB', bgColor: '#DBEAFE' },
      ],
      modal: {
        title: 'Animal Shelter Support',
        meta: 'Campaign ID: PET-204 | Owner: Pet Rescue Inc.',
        verifiedLabel: 'Partially Verified',
        image: campaignImage,
        details: [
          { label: 'Category', value: 'Animals' },
          { label: 'Status', value: 'Paused' },
          { label: 'Target', value: '₦50,000' },
          { label: 'Raised', value: '₦45,200' },
        ],
        description:
          'We are expanding our shelter facilities to accommodate 50 more rescued animals. Funds will cover feeding, medical care, and shelter renovations.',
        verificationTitle: 'Verification Document',
        verificationFile: 'Shelter Renovation Plan',
        donorsTitle: 'Donors (4)',
        donors: [
          { name: 'Animal Lovers Hub', date: '2024-01-18', message: 'Happy to support!', amount: '₦20,000' },
          { name: 'Grace Omari', date: '2024-01-16', message: 'Hope this helps.', amount: '₦5,000' },
        ],
      },
    },
    {
      id: 4,
      campaign: 'Animal Shelter Support',
      campaignSubtitle: 'Animals',
      owner: 'Pet Rescue Inc.',
      ownerSubtitle: '156 donations',
      currentAmount: '₦45,200',
      goalAmount: '₦50,000',
      fundingText: '90% funded',
      progress: 0.9,
      status: 'Declined',
      statusColor: '#DC2626',
      statusBg: '#FEE2E2',
      verified: 'Not Verified',
      verifiedColor: '#DC2626',
      created: '1/14/2024',
      actions: [
        { label: 'View', type: 'view', icon: IconEye, textColor: '#1E293B', bgColor: '#F8FAFC', borderColor: '#E2E8F0' },
      ],
      modal: {
        title: 'Animal Shelter Support',
        meta: 'Campaign ID: PET-198 | Owner: Pet Rescue Inc.',
        verifiedLabel: 'Verification Needed',
        image: campaignImage,
        details: [
          { label: 'Category', value: 'Animals' },
          { label: 'Status', value: 'Declined' },
          { label: 'Target', value: '₦50,000' },
          { label: 'Raised', value: '₦45,200' },
        ],
        description:
          'This campaign was declined due to insufficient verification for the proposed expansion project. Please review the feedback and re-submit the necessary documents.',
        verificationTitle: 'Verification Document',
        verificationFile: 'Financial Statement',
        donorsTitle: 'Donors (1)',
        donors: [
          { name: 'Wellness Foundation', date: '2024-01-12', message: 'We believe in this cause.', amount: '₦15,000' },
        ],
      },
    },
  ];
};

const isModalOpen = ref(false);
const selectedCampaign = ref<CampaignRowData | null>(null);
const confirmModalState = ref<{
  title: string;
  message: string;
  confirmLabel: string;
  row: CampaignRowData;
} | null>(null);
const declineModalState = ref<{
  title: string;
  message: string;
  confirmLabel: string;
  placeholder: string;
  row: CampaignRowData;
  reason: string;
} | null>(null);
const suspendModalState = ref<{
  title: string;
  message: string;
  confirmLabel: string;
  row: CampaignRowData;
} | null>(null);
const activateModalState = ref<{
  title: string;
  message: string;
  confirmLabel: string;
  row: CampaignRowData;
} | null>(null);

const normalizeLabel = (label: string) => label.trim().toLowerCase();

const handleCampaignAction = ({ action, row }: CampaignRowActionPayload) => {
  const actionType = action.type || normalizeLabel(action.label);

  if (actionType === 'view') {
    selectedCampaign.value = row;
    isModalOpen.value = true;
    confirmModalState.value = null;
    declineModalState.value = null;
    suspendModalState.value = null;
    activateModalState.value = null;
    loadCampaignDetails(row.id.toString());
    return;
  }
  if ((actionType === 'approve' || actionType === 'approve campaign') && row.confirmAction) {
    confirmModalState.value = { ...row.confirmAction, row };
    isModalOpen.value = false;
    declineModalState.value = null;
    suspendModalState.value = null;
    activateModalState.value = null;
    return;
  }
  if ((actionType === 'decline' || actionType === 'decline campaign') && row.declineAction) {
    declineModalState.value = { ...row.declineAction, row, reason: '' };
    isModalOpen.value = false;
    confirmModalState.value = null;
    suspendModalState.value = null;
    activateModalState.value = null;
    return;
  }
  if ((actionType === 'suspend' || actionType === 'pause') && row.suspendAction) {
    suspendModalState.value = { ...row.suspendAction, row };
    isModalOpen.value = false;
    confirmModalState.value = null;
    declineModalState.value = null;
    activateModalState.value = null;
    return;
  }
  if ((actionType === 'activate' || actionType === 'reactivate') && row.activateAction) {
    activateModalState.value = { ...row.activateAction, row };
    isModalOpen.value = false;
    confirmModalState.value = null;
    declineModalState.value = null;
    suspendModalState.value = null;
    return;
  }
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedCampaign.value = null;
  confirmModalState.value = null;
  declineModalState.value = null;
  suspendModalState.value = null;
  activateModalState.value = null;
};

const approveCampaign = async (row: CampaignRowData) => {
  try {
    const campaignId = row.id.toString();
    const response = await crowdfundingService.updateCampaignStatus(campaignId, {
      status: 'approved',
      reason: 'Campaign approved by admin',
    });

    if (response.success) {
      toast.success(`Campaign "${row.campaign}" approved successfully`);
      await loadCampaigns();
    } else {
      toast.error('Failed to approve campaign');
    }
  } catch (error) {
    console.error('Error approving campaign:', error);
    toast.error('Failed to approve campaign');
  } finally {
    confirmModalState.value = null;
  }
};

const declineCampaign = async (state: NonNullable<typeof declineModalState.value>) => {
  try {
    const campaignId = state.row.id.toString();
    const response = await crowdfundingService.updateCampaignStatus(campaignId, {
      status: 'rejected',
      reason: state.reason || 'Campaign rejected by admin',
    });

    if (response.success) {
      toast.success(`Campaign "${state.row.campaign}" declined successfully`);
      await loadCampaigns();
    } else {
      toast.error('Failed to decline campaign');
    }
  } catch (error) {
    console.error('Error declining campaign:', error);
    toast.error('Failed to decline campaign');
  } finally {
    declineModalState.value = null;
  }
};

const suspendCampaign = async (state: NonNullable<typeof suspendModalState.value>) => {
  try {
    const campaignId = state.row.id.toString();
    const response = await crowdfundingService.updateCampaignStatus(campaignId, {
      status: 'suspended',
      reason: 'Campaign suspended by admin',
    });

    if (response.success) {
      toast.success(`Campaign "${state.row.campaign}" suspended successfully`);
      await loadCampaigns();
    } else {
      toast.error('Failed to suspend campaign');
    }
  } catch (error) {
    console.error('Error suspending campaign:', error);
    toast.error('Failed to suspend campaign');
  } finally {
    suspendModalState.value = null;
  }
};

const activateCampaign = async (state: NonNullable<typeof activateModalState.value>) => {
  try {
    const campaignId = state.row.id.toString();
    const response = await crowdfundingService.updateCampaignStatus(campaignId, {
      status: 'approved',
      reason: 'Campaign reactivated by admin',
    });

    if (response.success) {
      toast.success(`Campaign "${state.row.campaign}" reactivated successfully`);
      await loadCampaigns();
    } else {
      toast.error('Failed to reactivate campaign');
    }
  } catch (error) {
    console.error('Error reactivating campaign:', error);
    toast.error('Failed to reactivate campaign');
  } finally {
    activateModalState.value = null;
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

