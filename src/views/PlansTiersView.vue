<template>
  <div class="p-6 space-y-6">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-semibold">Plans & Tiers</h1>
      <button class="bg-black text-white rounded px-4 py-2 flex items-center gap-2 text-sm font-medium" @click="showCreatePlanModal = true">
        <PlusIcon class="w-5 h-5" /> + Create New Plan
      </button>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div v-for="plan in plans" :key="plan.name" class="border rounded-xl p-6 bg-white flex flex-col items-start shadow">
        <div class="flex items-center justify-between w-full mb-2">
          <span class="text-blue-700 font-semibold text-lg">{{ plan.name }}</span>
          <span class="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">{{ plan.memberCount ? plan.memberCount : (plan.name === 'Basic' ? 234 : plan.name === 'Premium' ? 158 : 45) }} members</span>
        </div>
        <div class="text-xl font-bold text-blue-700 mb-1">${{ plan.price }}<span class="text-base font-normal">/month</span></div>
        <ul class="mb-6 mt-2 space-y-2">
          <li v-for="(feature, i) in plan.features" :key="i" class="flex items-center gap-2 text-sm"><CheckCircleIcon class="w-4 h-4 text-cyan-500" /> {{ feature }}</li>
        </ul>
        <div class="flex gap-2 w-full mt-auto">
          <button class="flex-1 border rounded px-3 py-2 text-sm font-medium" @click="openEditPlanModal(plan)">Edit Plan</button>
        </div>
      </div>
    </div>
  </div>
  <div v-if="showCreatePlanModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
    <div class="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-md p-0 relative">
      <button class="absolute top-4 right-4 text-gray-400 hover:text-black dark:hover:text-white text-2xl" @click="showCreatePlanModal = false">&times;</button>
      <div class="px-8 pt-8 pb-4">
        <h2 class="font-semibold text-lg mb-4">Create New Plan</h2>
        <form @submit.prevent="handleCreatePlan">
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Plan Name</label>
            <input v-model="newPlan.name" type="text" class="w-full border rounded px-3 py-2" placeholder="e.g. Premium plan" required />
          </div>
          <div class="flex gap-2 mb-4">
            <div class="flex-1">
              <label class="block text-sm font-medium mb-1">Price</label>
              <input v-model="newPlan.price" type="number" class="w-full border rounded px-3 py-2" placeholder="$99" required />
            </div>
            <div class="flex-1">
              <label class="block text-sm font-medium mb-1">Billing Circle</label>
              <select v-model="newPlan.billing" class="w-full border rounded px-3 py-2" required>
                <option value="" disabled>Select Billing Circle</option>
                <option>Monthly</option>
                <option>Quarterly</option>
                <option>Annual</option>
              </select>
            </div>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Description</label>
            <textarea v-model="newPlan.description" class="w-full border rounded px-3 py-2" placeholder="Plan description" rows="2"></textarea>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Features</label>
            <div class="flex gap-2 mb-2">
              <input v-model="featureInput" type="text" class="flex-1 border rounded px-3 py-2" placeholder="Add a feature" />
              <button type="button" class="bg-black text-white px-4 py-2 rounded" @click="addFeature"><PlusIcon class="w-4 h-4" /></button>
            </div>
            <ul class="mb-2 flex flex-wrap gap-2">
              <li v-for="(f, i) in newPlan.features" :key="i" class="bg-gray-100 rounded-full px-3 py-1 text-sm flex items-center gap-1">
                {{ f }}
                <button type="button" class="text-gray-400 hover:text-red-500 ml-1" @click="removeFeature(i)">&times;</button>
              </li>
            </ul>
          </div>
          <div class="mb-4">
            <div class="bg-orange-50 rounded p-3 flex items-center gap-2">
              <input id="planActive" type="checkbox" v-model="newPlan.active" class="accent-orange-500" />
              <label for="planActive" class="text-orange-700 text-sm cursor-pointer">Plan is active</label>
            </div>
          </div>
          <div class="flex gap-2 mt-6">
            <button type="button" class="flex-1 border rounded px-4 py-2 font-medium" @click="showCreatePlanModal = false">Cancel</button>
            <button type="submit" class="flex-1 rounded px-4 py-2 font-medium bg-black text-white hover:bg-gray-800">Create Plan</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <div v-if="showEditPlanModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
    <div class="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-md p-0 relative">
      <button class="absolute top-4 right-4 text-gray-400 hover:text-black dark:hover:text-white text-2xl" @click="showEditPlanModal = false">&times;</button>
      <div class="px-8 pt-8 pb-4">
        <h2 class="font-semibold text-lg mb-4">Edit Plan: {{ editPlanData.name }}</h2>
        <form @submit.prevent="handleUpdatePlan">
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Plan Name</label>
            <input v-model="editPlanData.name" type="text" class="w-full border rounded px-3 py-2" required />
          </div>
          <div class="flex gap-2 mb-4">
            <div class="flex-1">
              <label class="block text-sm font-medium mb-1">Price</label>
              <input v-model="editPlanData.price" type="number" class="w-full border rounded px-3 py-2" required />
            </div>
            <div class="flex-1">
              <label class="block text-sm font-medium mb-1">Billing Circle</label>
              <select v-model="editPlanData.billing" class="w-full border rounded px-3 py-2" required>
                <option value="" disabled>Select Billing Circle</option>
                <option>Monthly</option>
                <option>Quarterly</option>
                <option>Annual</option>
              </select>
            </div>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Description</label>
            <textarea v-model="editPlanData.description" class="w-full border rounded px-3 py-2" rows="2"></textarea>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Features</label>
            <div class="flex gap-2 mb-2">
              <input v-model="editFeatureInput" type="text" class="flex-1 border rounded px-3 py-2" placeholder="Add a Feature" />
              <button type="button" class="bg-black text-white px-4 py-2 rounded" @click="addEditFeature"><PlusIcon class="w-4 h-4" /></button>
            </div>
            <ul class="mb-2 flex flex-wrap gap-2">
              <li v-for="(f, i) in editPlanData.features" :key="i" class="bg-gray-100 rounded-full px-3 py-1 text-sm flex items-center gap-1">
                {{ f }}
                <button type="button" class="text-gray-400 hover:text-red-500 ml-1" @click="removeEditFeature(i)">&times;</button>
              </li>
            </ul>
          </div>
          <div class="mb-4">
            <div class="bg-orange-50 rounded p-3 flex items-center gap-2">
              <input id="editPlanActive" type="checkbox" v-model="editPlanData.active" class="accent-orange-500" />
              <label for="editPlanActive" class="text-orange-700 text-sm cursor-pointer">Plan is active</label>
            </div>
          </div>
          <div class="flex gap-2 mt-6">
            <button type="button" class="flex-1 border rounded px-4 py-2 font-medium" @click="showEditPlanModal = false">Cancel</button>
            <button type="submit" class="flex-1 rounded px-4 py-2 font-medium bg-black text-white hover:bg-gray-800">Update Plan</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CheckCircleIcon, PlusIcon } from '@heroicons/vue/24/outline';
import { ref } from 'vue';
const showCreatePlanModal = ref(false);
const newPlan = ref({ name: '', price: '', billing: '', description: '', features: [] as string[], active: false });
const featureInput = ref('');
function addFeature() {
  if (featureInput.value.trim()) {
    newPlan.value.features.push(featureInput.value.trim());
    featureInput.value = '';
  }
}
function removeFeature(idx: number) {
  newPlan.value.features.splice(idx, 1);
}
function handleCreatePlan() {
  // Logic to save the new plan
  showCreatePlanModal.value = false;
  newPlan.value = { name: '', price: '', billing: '', description: '', features: [], active: false };
}
const plans = [
  { name: 'Basic', price: 29, billing: 'Monthly', description: 'Basic membership features', features: ['Access to basic features', 'Email support', '10GB storage'], active: true, memberCount: 234 },
  { name: 'Premium', price: 89, billing: 'Monthly', description: 'Premium membership features', features: ['All basic features', 'Priority support', '10GB storage', 'Advanced analytics'], active: true, memberCount: 158 },
  { name: 'Enterprise', price: 199, billing: 'Monthly', description: 'Enterprise membership features', features: ['All premium features', '24/7 support', 'Unlimited storage', 'Custom integrations'], active: true, memberCount: 45 },
];
const showEditPlanModal = ref(false);
const editPlanData = ref({ name: '', price: '', billing: '', description: '', features: [] as string[], active: false });
const editFeatureInput = ref('');
function openEditPlanModal(plan) {
  editPlanData.value = { ...plan, features: [...plan.features] };
  showEditPlanModal.value = true;
  editFeatureInput.value = '';
}
function addEditFeature() {
  if (editFeatureInput.value.trim()) {
    editPlanData.value.features.push(editFeatureInput.value.trim());
    editFeatureInput.value = '';
  }
}
function removeEditFeature(idx: number) {
  editPlanData.value.features.splice(idx, 1);
}
function handleUpdatePlan() {
  // Logic to update the plan
  showEditPlanModal.value = false;
}
</script> 