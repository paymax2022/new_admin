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
              class="appearance-none rounded-full border border-[#e2e8f0] bg-white px-4 py-2 pr-10 text-sm font-semibold text-[#475569] transition hover:border-[#cbd5f5] focus:border-[#6366f1] focus:outline-none focus:ring-2 focus:ring-[#c7d2fe]"
            >
              <option selected>All Statuses</option>
              <option>Ongoing</option>
              <option>Approved</option>
              <option>Paused</option>
              <option>Rejected</option>
            </select>
            <IconCaretsDown class="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94a3b8]" />
          </div>
          <div class="relative">
            <select
              class="appearance-none rounded-full border border-[#e2e8f0] bg-white px-4 py-2 pr-10 text-sm font-semibold text-[#475569] transition hover:border-[#cbd5f5] focus:border-[#6366f1] focus:outline-none focus:ring-2 focus:ring-[#c7d2fe]"
            >
              <option selected>All Categories</option>
              <option>Medical</option>
              <option>Education</option>
              <option>Tech</option>
              <option>Animals</option>
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
              v-for="row in campaignRows"
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
import { ref } from 'vue';

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
    icon: any;
    textColor: string;
    bgColor: string;
    borderColor?: string;
  }[];
  modal: ModalData;
};

const campaignRows: CampaignRowData[] = [
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
        'Are you sure you want to approve “Emergency Surgery Fund for Sarah”? This campaign will be made live and visible to all users.',
      confirmLabel: 'Approve Campaign',
    },
    declineAction: {
      title: 'Decline Campaign',
      message:
        'Please provide a reason for declining “Emergency Surgery Fund for Sarah”. The campaign owner will be notified.',
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

const approveCampaign = (row: CampaignRowData) => {
  // Placeholder for future integration.
  console.info('Approved campaign:', row.campaign);
  confirmModalState.value = null;
};

const declineCampaign = (state: NonNullable<typeof declineModalState.value>) => {
  // Placeholder for future integration.
  console.info('Declined campaign:', state.row.campaign, 'Reason:', state.reason);
  declineModalState.value = null;
};

const suspendCampaign = (state: NonNullable<typeof suspendModalState.value>) => {
  // Placeholder for future integration.
  console.info('Suspended campaign:', state.row.campaign);
  suspendModalState.value = null;
};

const activateCampaign = (state: NonNullable<typeof activateModalState.value>) => {
  // Placeholder for future integration.
  console.info('Reactivated campaign:', state.row.campaign);
  activateModalState.value = null;
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

