<template>
  <div class="p-6 bg-white rounded-lg shadow-md">
    <h1 class="text-2xl font-bold mb-6">Add Working Hours</h1>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Restaurant Selection -->
      <div class="lg:w-1/2">
        <label for="restaurant" class="block text-sm font-medium text-gray-700 mb-1">
          Restaurant <span class="text-red-500">*</span>
        </label>
        <select
          id="restaurant"
          v-model="form.restaurantId"
          required
          :disabled="loadingRestaurants"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>Select a restaurant</option>
          <option
            v-for="restaurant in restaurants"
            :key="restaurant._id"
            :value="restaurant._id"
          >
            {{ restaurant.name }}
          </option>
        </select>
      </div>

      <!-- Days of the Week -->
      <div class="space-y-4">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">Working Hours by Day</h2>
        
        <div
          v-for="day in daysOfWeek"
          :key="day.value"
          class="border border-gray-200 rounded-lg p-4 space-y-3"
        >
          <div class="flex items-center justify-between">
            <label class="flex items-center space-x-2">
              <input
                type="checkbox"
                v-model="form.days[day.value].is_working"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 rounded"
              />
              <span class="text-sm font-medium text-gray-700 capitalize">{{ day.label }}</span>
            </label>
          </div>

          <div v-if="form.days[day.value].is_working" class="grid grid-cols-2 gap-4">
            <div>
              <label :for="`start-${day.value}`" class="block text-sm font-medium text-gray-600 mb-1">
                Start Time <span class="text-red-500">*</span>
              </label>
              <input
                :id="`start-${day.value}`"
                type="time"
                v-model="form.days[day.value].start_time"
                :required="form.days[day.value].is_working"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label :for="`end-${day.value}`" class="block text-sm font-medium text-gray-600 mb-1">
                End Time <span class="text-red-500">*</span>
              </label>
              <input
                :id="`end-${day.value}`"
                type="time"
                v-model="form.days[day.value].end_time"
                :required="form.days[day.value].is_working"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="flex space-x-4">
        <button
          type="submit"
          :disabled="loading"
          class="lg:w-1/2 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="loading" class="inline-flex items-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Saving...
          </span>
          <span v-else>Save Working Hours</span>
        </button>
        <button
          type="button"
          @click="resetForm"
          class="lg:w-1/2 py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Reset
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { restaurantService } from '@/services/restaurantService';
import { useToast } from 'vue-toastification';

interface Restaurant {
  _id: string;
  name: string;
}

interface DayHours {
  day: string;
  is_working: boolean;
  start_time: string;
  end_time: string;
}

interface WorkingHoursForm {
  restaurantId: string;
  days: {
    [key: string]: DayHours;
  };
}

const router = useRouter();
const toast = useToast();
const loading = ref(false);
const loadingRestaurants = ref(false);
const restaurants = ref<Restaurant[]>([]);

const daysOfWeek = [
  { value: 'monday', label: 'Monday' },
  { value: 'tuesday', label: 'Tuesday' },
  { value: 'wednesday', label: 'Wednesday' },
  { value: 'thursday', label: 'Thursday' },
  { value: 'friday', label: 'Friday' },
  { value: 'saturday', label: 'Saturday' },
  { value: 'sunday', label: 'Sunday' },
];

const form = ref<WorkingHoursForm>({
  restaurantId: '',
  days: {
    monday: { day: 'monday', is_working: true, start_time: '09:00', end_time: '22:00' },
    tuesday: { day: 'tuesday', is_working: true, start_time: '09:00', end_time: '22:00' },
    wednesday: { day: 'wednesday', is_working: true, start_time: '09:00', end_time: '22:00' },
    thursday: { day: 'thursday', is_working: true, start_time: '09:00', end_time: '22:00' },
    friday: { day: 'friday', is_working: true, start_time: '09:00', end_time: '23:00' },
    saturday: { day: 'saturday', is_working: true, start_time: '10:00', end_time: '23:00' },
    sunday: { day: 'sunday', is_working: false, start_time: '', end_time: '' },
  },
});

// Fetch restaurants list
onMounted(async () => {
  try {
    loadingRestaurants.value = true;
    const response = await restaurantService.getAllRestaurants(100, 1);
    // Handle different response structures
    const restaurantsData = response.data?.data || response.data || response;
    restaurants.value = Array.isArray(restaurantsData) ? restaurantsData : [];
  } catch (error: any) {
    console.error('Error fetching restaurants:', error);
    toast.error('Failed to load restaurants');
  } finally {
    loadingRestaurants.value = false;
  }
});

const handleSubmit = async () => {
  if (!form.value.restaurantId) {
    toast.error('Please select a restaurant');
    return;
  }

  // Validate that at least one day has working hours
  const hasWorkingDay = Object.values(form.value.days).some(day => day.is_working);
  if (!hasWorkingDay) {
    toast.error('Please set working hours for at least one day');
    return;
  }

  // Validate working days have start and end times
  for (const day of Object.values(form.value.days)) {
    if (day.is_working && (!day.start_time || !day.end_time)) {
      toast.error(`Please provide start and end times for ${day.day}`);
      return;
    }
  }

  loading.value = true;

  try {
    // Format the data according to API specification
    const daysArray = Object.values(form.value.days).map(day => ({
      day: day.day,
      is_working: day.is_working,
      start_time: day.is_working ? day.start_time : '',
      end_time: day.is_working ? day.end_time : '',
    }));

    const requestBody = [
      {
        restaurant_id: form.value.restaurantId,
        days: daysArray,
        updated_at: new Date().toISOString(),
      },
    ];

    await restaurantService.updateWorkingHours(form.value.restaurantId, requestBody);

    toast.success('Working hours saved successfully');

    // Navigate back to time slots list
    router.push({ name: 'restaurantTimeSlots' });
  } catch (error: any) {
    console.error('Error saving working hours:', error);
    const errorMessage = error.response?.data?.message || 'Failed to save working hours';
    toast.error(errorMessage);
  } finally {
    loading.value = false;
  }
};

const resetForm = () => {
  form.value = {
    restaurantId: form.value.restaurantId, // Keep restaurant selection
    days: {
      monday: { day: 'monday', is_working: true, start_time: '09:00', end_time: '22:00' },
      tuesday: { day: 'tuesday', is_working: true, start_time: '09:00', end_time: '22:00' },
      wednesday: { day: 'wednesday', is_working: true, start_time: '09:00', end_time: '22:00' },
      thursday: { day: 'thursday', is_working: true, start_time: '09:00', end_time: '22:00' },
      friday: { day: 'friday', is_working: true, start_time: '09:00', end_time: '23:00' },
      saturday: { day: 'saturday', is_working: true, start_time: '10:00', end_time: '23:00' },
      sunday: { day: 'sunday', is_working: false, start_time: '', end_time: '' },
    },
  };
};
</script>
