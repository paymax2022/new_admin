<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40" @click.self="emit('close')">
    <div class="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-xl p-6">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-semibold">Boost Poll Participation</h2>
        <button @click="emit('close')" class="text-gray-400 hover:text-gray-600 text-xl">&times;</button>
      </div>
      <form @submit.prevent="onLaunch">
        <div class="mb-4">
          <label class="block text-xs font-medium mb-1">Select Poll to Boost</label>
          <select v-model="selectedPoll" class="w-full border rounded px-3 py-2 text-sm">
            <option value="">Choose an active poll</option>
            <option>Preferred Event Time</option>
            <option>Member Satisfaction Survey</option>
          </select>
        </div>
        <div class="mb-4">
          <label class="block text-xs font-medium mb-1">Boost Strategy</label>
          <select v-model="boostStrategy" class="w-full border rounded px-3 py-2 text-sm">
            <option value="">Select boost strategy</option>
            <option>Leaderboard</option>
            <option>Peer Influence</option>
            <option>Incentives</option>
          </select>
        </div>
        <div class="mb-4">
          <label class="block text-xs font-medium mb-1">Participation Incentives</label>
          <select v-model="incentiveType" class="w-full border rounded px-3 py-2 text-sm">
            <option value="">Choose incentive type</option>
            <option>Gift Card</option>
            <option>Discount</option>
            <option>Recognition</option>
          </select>
        </div>
        <div class="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-medium mb-1">Target Participation Increase</label>
            <select v-model="targetIncrease" class="w-full border rounded px-3 py-2 text-sm">
              <option value="">Select target</option>
              <option>+10%</option>
              <option>+25%</option>
              <option>+50%</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-medium mb-1">Campaign Duration</label>
            <select v-model="campaignDuration" class="w-full border rounded px-3 py-2 text-sm">
              <option value="">Select duration</option>
              <option>1 day</option>
              <option>3 days</option>
              <option>1 week</option>
            </select>
          </div>
        </div>
        <div class="mb-4">
          <div class="text-xs font-medium mb-1">Additional Boost Features</div>
          <div class="flex items-center gap-2 mb-2">
            <input id="leaderboard" type="checkbox" v-model="enableLeaderboard" class="accent-black" />
            <label for="leaderboard" class="text-xs">Enable leaderboard and competition elements</label>
          </div>
          <div class="flex items-center gap-2">
            <input id="social" type="checkbox" v-model="enableSocial" class="accent-black" />
            <label for="social" class="text-xs">Enable social sharing and peer influence</label>
          </div>
        </div>
        <div class="mb-4">
          <div class="text-xs font-medium mb-1">Boost Campaign Preview</div>
          <div class="bg-blue-50 rounded p-3 text-xs text-gray-700">
            <div><span class="font-semibold">Strategy:</span> {{ boostStrategy || 'Select a strategy above' }}</div>
            <div><span class="font-semibold">Incentives:</span> {{ incentiveType || 'No incentive selected' }}</div>
            <div><span class="font-semibold">Target:</span> {{ targetIncrease || 'No target set' }}</div>
            <div><span class="font-semibold">Features:</span> {{ featuresPreview }}</div>
          </div>
        </div>
        <div class="flex justify-end gap-2 mt-6">
          <button type="button" @click="emit('close')" class="px-4 py-2 rounded border">Cancel</button>
          <button type="submit" class="px-4 py-2 rounded bg-black text-white flex items-center gap-2">Launch Boost Campaign</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
const emit = defineEmits(['close', 'launch']);
const selectedPoll = ref('');
const boostStrategy = ref('');
const incentiveType = ref('');
const targetIncrease = ref('');
const campaignDuration = ref('');
const enableLeaderboard = ref(false);
const enableSocial = ref(false);
const featuresPreview = computed(() => {
  let features = [];
  if (enableLeaderboard.value) features.push('Leaderboard/competition');
  if (enableSocial.value) features.push('Social sharing/peer influence');
  return features.length ? features.join(', ') : 'No additional features.';
});
function onLaunch() {
  emit('launch', { selectedPoll: selectedPoll.value, boostStrategy: boostStrategy.value, incentiveType: incentiveType.value, targetIncrease: targetIncrease.value, campaignDuration: campaignDuration.value, enableLeaderboard: enableLeaderboard.value, enableSocial: enableSocial.value });
}
</script> 