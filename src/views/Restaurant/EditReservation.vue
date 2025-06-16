<template>
  <div class=" mx-auto p-6 bg-white rounded-lg shadow-md">
    <h1 class="text-2xl font-bold mb-6 text-gray-800">Edit Reservation</h1>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Restaurant Selection -->
      <div class="">
        <h2 class="text-lg font-semibold mb-3 text-gray-700">
          RESTAURANT <span class="text-red-500">*</span>
        </h2>
        <select
          v-model="form.restaurantId"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled selected>Select Restaurant</option>
          <option v-for="restaurant in restaurants" :key="restaurant.id" :value="restaurant.id">
            {{ restaurant.name }}
          </option>
        </select>
        <span v-if="errors.restaurantId" class="text-red-500 text-xs">{{ errors.restaurantId }}</span>
      </div>

      <!-- Customer Selection -->
      <div class="">
        <h2 class="text-lg font-semibold mb-3 text-gray-700">
          CUSTOMER <span class="text-red-500">*</span>
        </h2>
        <select
          v-model="form.customerId"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled selected>Select Customer</option>
          <option v-for="customer in customers" :key="customer.id" :value="customer.id">
            {{ customer.name }}
          </option>
        </select>
        <span v-if="errors.customerId" class="text-red-500 text-xs">{{ errors.customerId }}</span>
      </div>

      <!-- Name and Phone Row -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            FIRST NAME <span class="text-red-500">*</span>
          </label>
          <input
            type="text"
            v-model="form.firstName"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span v-if="errors.firstName" class="text-red-500 text-xs">{{ errors.firstName }}</span>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            PHONE <span class="text-red-500">*</span>
          </label>
          <input
            type="tel"
            v-model="form.phone"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span v-if="errors.phone" class="text-red-500 text-xs">{{ errors.phone }}</span>
        </div>
      </div>

      <!-- Last Name and Date Row -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            LAST NAME <span class="text-red-500">*</span>
          </label>
          <input
            type="text"
            v-model="form.lastName"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span v-if="errors.lastName" class="text-red-500 text-xs">{{ errors.lastName }}</span>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            DATE <span class="text-red-500">*</span>
          </label>
          <input
            type="date"
            v-model="form.date"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span v-if="errors.date" class="text-red-500 text-xs">{{ errors.date }}</span>
        </div>
      </div>

      <!-- Email and Guest Count Row -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            EMAIL <span class="text-red-500">*</span>
          </label>
          <input
            type="email"
            v-model="form.email"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span v-if="errors.email" class="text-red-500 text-xs">{{ errors.email }}</span>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            GUEST <span class="text-red-500">*</span>
          </label>
          <input
            type="number"
            v-model="form.guestCount"
            min="1"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span v-if="errors.guestCount" class="text-red-500 text-xs">{{ errors.guestCount }}</span>
        </div>
      </div>

      <button
        type="submit"
        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200 mt-6"
        :disabled="isSubmitting"
      >
        <span v-if="!isSubmitting">Create Reservation</span>
        <span v-else>Processing...</span>
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';

interface Restaurant {
  id: string;
  name: string;
}

interface Customer {
  id: string;
  name: string;
}

interface ReservationForm {
  restaurantId: string;
  customerId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  date: string;
  guestCount: number;
}

interface FormErrors {
  restaurantId?: string;
  customerId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  date?: string;
  guestCount?: string;
}

// Form state
const form = reactive<ReservationForm>({
  restaurantId: '',
  customerId: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  date: new Date().toISOString().split('T')[0], // Default to today
  guestCount: 1
});

const errors = reactive<FormErrors>({});
const isSubmitting = ref(false);

// Mock data - in a real app, you'd fetch these from an API
const restaurants = ref<Restaurant[]>([
  { id: '1', name: 'The Gourmet Kitchen' },
  { id: '2', name: 'Seafood Paradise' },
  { id: '3', name: 'Vegetarian Delight' }
]);

const customers = ref<Customer[]>([
  { id: '1', name: 'John Smith' },
  { id: '2', name: 'Sarah Johnson' },
  { id: '3', name: 'Michael Brown' }
]);

const validateForm = (): boolean => {
  let isValid = true;
  const newErrors: FormErrors = {};

  if (!form.restaurantId) newErrors.restaurantId = 'Restaurant is required';
  if (!form.customerId) newErrors.customerId = 'Customer is required';
  if (!form.firstName) newErrors.firstName = 'First name is required';
  if (!form.lastName) newErrors.lastName = 'Last name is required';
  if (!form.email) newErrors.email = 'Email is required';
  if (!form.phone) newErrors.phone = 'Phone is required';
  if (!form.date) newErrors.date = 'Date is required';
  if (!form.guestCount || form.guestCount < 1) newErrors.guestCount = 'Guest count must be at least 1';

  Object.assign(errors, newErrors);
  isValid = Object.keys(newErrors).length === 0;

  return isValid;
};

const handleSubmit = async () => {
  if (!validateForm()) return;

  isSubmitting.value = true;

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log('Reservation created:', form);

    // In a real app, you might redirect or show a success message
    alert('Reservation created successfully!');
  } catch (error) {
    console.error('Error creating reservation:', error);
    alert('Failed to create reservation. Please try again.');
  } finally {
    isSubmitting.value = false;
  }
};
</script>
