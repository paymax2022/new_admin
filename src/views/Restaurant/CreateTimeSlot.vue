<template>
  <div class="p-6  bg-white rounded-lg shadow-md">
    <h1 class="text-2xl font-bold mb-6">Add Time Slot</h1>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <!-- Restaurant Selection -->
      <div  class="lg:w-1/2"  >
        <label for="restaurant" class="block text-sm font-medium text-gray-700 mb-1">
          Restaurant <span class="text-red-500">*</span>
        </label>
        <select
          id="restaurant"
          v-model="form.restaurantId"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>Select a restaurant</option>
          <option
            v-for="restaurant in restaurants"
            :key="restaurant.id"
            :value="restaurant.id"
          >
            {{ restaurant.name }}
          </option>
        </select>
      </div>

      <!-- Time Range -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label for="startTime" class="block text-sm font-medium text-gray-700 mb-1">
            Start Time <span class="text-red-500">*</span>
          </label>
          <input
            type="time"
            id="startTime"
            v-model="form.startTime"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label for="endTime" class="block text-sm font-medium text-gray-700 mb-1">
            End Time <span class="text-red-500">*</span>
          </label>
          <input
            type="time"
            id="endTime"
            v-model="form.endTime"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <!-- Status Toggle -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Status <span class="text-red-500">*</span>
        </label>
        <div class="flex items-center space-x-4">
          <label class="inline-flex items-center">
            <input
              type="radio"
              v-model="form.status"
              value="active"
              required
              class="h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <span class="ml-2 text-gray-700">Active</span>
          </label>
          <label class="inline-flex items-center">
            <input
              type="radio"
              v-model="form.status"
              value="inactive"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <span class="ml-2 text-gray-700">Inactive</span>
          </label>
        </div>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        class="w-full lg:w-1/2 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Save Time Slot
      </button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

interface Restaurant {
  id: string;
  name: string;
}

interface TimeSlotForm {
  restaurantId: string;
  startTime: string;
  endTime: string;
  status: 'active' | 'inactive';
}

// Sample restaurant data - replace with API call
const restaurants = ref<Restaurant[]>([
  { id: '1', name: 'Main Restaurant' },
  { id: '2', name: 'Downtown Cafe' },
  { id: '3', name: 'Seaside Bistro' }
]);

const form = ref<TimeSlotForm>({
  restaurantId: '',
  startTime: '',
  endTime: '',
  status: 'active'
});

const handleSubmit = () => {
  console.log('Submitting time slot:', form.value);

  // Here you would typically make an API call
  // axios.post('/api/time-slots', form.value)
  //   .then(response => {
  //     console.log('Success:', response);
  //     resetForm();
  //   })
  //   .catch(error => {
  //     console.error('Error:', error);
  //   });
};

const resetForm = () => {
  form.value = {
    restaurantId: '',
    startTime: '',
    endTime: '',
    status: 'active'
  };
};
</script>
