<template>
    <div>
        <div class="flex flex-col lg:flex-row gap-6">
            <!-- Restaurant Info Form -->
            <div class="w-full lg:w-1/2 p-6 bg-white rounded-lg shadow-md">
                <h1 class="text-2xl font-bold mb-6">Restaurant Information & Status</h1>

                <form @submit.prevent="submitForm" class="space-y-4">
                    <!-- Name -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700">NAME <span
                                class="text-red-500">*</span></label>
                        <input type="text" v-model="formData.name" required
                            class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm" />
                    </div>

                    <!-- Time -->
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700">OPENING TIME</label>
                            <input type="time" v-model="formData.openingTime"
                                class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">CLOSING TIME</label>
                            <input type="time" v-model="formData.closingTime"
                                class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm" />
                        </div>
                    </div>

                    <div class="border-t border-gray-200 my-4"></div>

                    <!-- Cuisines -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700">CUISINES</label>
                        <input type="text" v-model="formData.cuisines" placeholder="Separate cuisines with commas"
                            class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm" />
                    </div>

                    <!-- Address -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700">RESTAURANT ADDRESS <span
                                class="text-red-500">*</span></label>
                        <textarea v-model="formData.address" rows="3" required
                            class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"></textarea>
                    </div>

                    <!-- Description -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700">DESCRIPTION</label>
                        <textarea v-model="formData.description" rows="4"
                            class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"></textarea>
                    </div>

                    <!-- Restaurant Type -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700">RESTAURANT TYPE</label>
                        <select v-model="formData.restaurantType"
                            class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm">
                            <option value="">Select restaurant type</option>
                            <option value="fast_food">Fast Food</option>
                            <option value="fine_dining">Fine Dining</option>
                            <option value="casual_dining">Casual Dining</option>
                            <option value="cafe">Cafe</option>
                            <option value="bar">Bar</option>
                            <option value="food_truck">Food Truck</option>
                        </select>
                    </div>

                    <!-- Category -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700">CATEGORY</label>
                        <input type="text" v-model="formData.category"
                            class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm" />
                    </div>

                    <div class="border-t border-gray-200 my-4"></div>

                    <!-- Delivery Information -->
                    <div class="space-y-4">
                        <h3 class="text-lg font-semibold text-gray-800">Delivery Information</h3>

                        <!-- Delivery Type -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700">DELIVERY TYPE</label>
                            <select v-model="formData.deliveryType"
                                class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm">
                                <option value="">Select delivery type</option>
                                <option value="delivery">Delivery Only</option>
                                <option value="pickup">Pickup Only</option>
                                <option value="both">Both Delivery & Pickup</option>
                            </select>
                        </div>

                        <!-- Delivery Description -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700">DELIVERY DESCRIPTION</label>
                            <textarea v-model="formData.deliveryDescription" rows="2"
                                class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"></textarea>
                        </div>

                        <!-- Delivery Details Grid -->
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700">MINIMUM ORDER</label>
                                <input type="number" v-model="formData.deliveryMinimumOrder"
                                    class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm" />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700">DELIVERY FEE</label>
                                <input type="number" v-model="formData.deliveryFee"
                                    class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm" />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700">DELIVERY RADIUS (km)</label>
                                <input type="number" v-model="formData.deliveryRadius"
                                    class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm" />
                            </div>
                        </div>
                    </div>

                    <!-- Location Fields -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700">COUNTRY</label>
                            <input type="text" v-model="formData.country"
                                class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">STATE</label>
                            <input type="text" v-model="formData.state"
                                class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">CITY</label>
                            <input type="text" v-model="formData.city"
                                class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm" />
                        </div>
                    </div>

                    <!-- Coordinates -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700">LATITUDE</label>
                            <input type="number" step="any" v-model="formData.latitude"
                                class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">LONGITUDE</label>
                            <input type="number" step="any" v-model="formData.longitude"
                                class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm" />
                        </div>
                    </div>

                    <!-- Banking Information -->
                    <div class="space-y-4">
                        <h3 class="text-lg font-semibold text-gray-800">Banking Information</h3>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700">SETTLEMENT BANK</label>
                                <input type="text" v-model="formData.settlementBank"
                                    class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm" />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700">ACCOUNT NUMBER</label>
                                <input type="text" v-model="formData.accountNumber"
                                    class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm" />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700">SUB ACCOUNT</label>
                                <input type="text" v-model="formData.subAccount"
                                    class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm" />
                            </div>
                        </div>
                    </div>

                    <!-- Working Hours -->
                    <div class="space-y-4">
                        <h3 class="text-lg font-semibold text-gray-800">Working Hours</h3>
                        <div class="space-y-3">
                            <div v-for="day in workingDays" :key="day.key" class="grid grid-cols-4 gap-4 items-center">
                                <div class="flex items-center">
                                    <input type="checkbox" v-model="formData[day.isWorkingKey]" class="mr-2" />
                                    <label class="text-sm font-medium text-gray-700">{{ day.label }}</label>
                                </div>
                                <div>
                                    <label class="block text-xs text-gray-500">Start Time</label>
                                    <input type="time" v-model="formData[day.startTimeKey]"
                                        :disabled="!formData[day.isWorkingKey]"
                                        class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm" />
                                </div>
                                <div>
                                    <label class="block text-xs text-gray-500">End Time</label>
                                    <input type="time" v-model="formData[day.endTimeKey]"
                                        :disabled="!formData[day.isWorkingKey]"
                                        class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm" />
                                </div>
                                <div></div>
                            </div>
                        </div>
                    </div>

                    <!-- Discount Information -->
                    <div class="space-y-4">
                        <h3 class="text-lg font-semibold text-gray-800">Discount Information</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700">DISCOUNT TYPE</label>
                                <select v-model="formData.discountType"
                                    class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm">
                                    <option value="">Select discount type</option>
                                    <option value="percentage">Percentage</option>
                                    <option value="fixed">Fixed Amount</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700">DISCOUNT AMOUNT</label>
                                <input type="number" v-model="formData.discountAmount"
                                    class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm" />
                            </div>
                        </div>
                    </div>

                    <!-- Logo Upload -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700">LOGO</label>
                        <div class="mt-1 flex items-center">
                            <input type="file" ref="logoInput" @change="handleLogoUpload" accept="image/*"
                                class="hidden" />
                            <button type="button" @click="logoInput?.click()"
                                class="px-3 py-2 border rounded-md shadow-sm text-sm bg-white hover:bg-gray-50">Choose
                                file</button>
                            <span class="ml-2 text-sm text-gray-500">{{ formData.logo?.name || 'No file chosen'
                                }}</span>
                        </div>
                    </div>

                    <!-- Restaurant Image Upload -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700">RESTAURANT IMAGE</label>
                        <div class="mt-1 flex items-center">
                            <input type="file" ref="imageInput" @change="handleImageUpload" accept="image/*"
                                class="hidden" />
                            <button type="button" @click="imageInput?.click()"
                                class="px-3 py-2 border rounded-md shadow-sm text-sm bg-white hover:bg-gray-50">Choose
                                file</button>
                            <span class="ml-2 text-sm text-gray-500">{{ formData.restaurantImage?.name || 'No file
                                chosen' }}</span>
                        </div>
                    </div>

                    <!-- Select Options -->
                    <div v-for="(field, key) in selectFields" :key="key">
                        <label class="block text-sm font-medium text-gray-700">{{ field.label }} <span
                                v-if="field.required" class="text-red-500">*</span></label>
                        <select v-model="formData[key]" :required="field.required"
                            class="mt-1 block w-full border rounded-md shadow-sm">
                            <option disabled value="">Select an option</option>
                            <option v-for="option in field.options" :key="option.value" :value="option.value">{{
                                option.label }}</option>
                        </select>
                    </div>

                    <!-- Submit -->
                    <div class="pt-4">
                        <button type="submit" :disabled="loading"
                            class="w-full py-2 px-4 rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed">
                            <span v-if="loading" class="inline-flex items-center">
                                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                        stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                    </path>
                                </svg>
                                Creating Restaurant...
                            </span>
                            <span v-else>Create Restaurant</span>
                        </button>
                    </div>
                </form>
            </div>

            <!-- Owner Info Form -->
            <div class="w-full lg:w-1/2 p-6 bg-white rounded-lg shadow-md">
                <h2 class="text-2xl font-semibold mb-4">Restaurant Owner Information</h2>
                <form @submit.prevent="submitOwnerInfo" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div v-for="(field, key) in ownerFields" :key="key"
                        :class="{ 'md:col-span-2': field.colSpan === 2, 'mt-4': key === 'submit' }">
                        <label class="block text-sm font-medium text-gray-700">
                            {{ field.label }} <span v-if="field.required" class="text-red-500">*</span>
                        </label>
                        <component :is="field.type === 'select' ? 'select' : 'input'" v-model="owner[key]"
                            :type="field.inputType || 'text'" :required="field.required" :disabled="field.disabled"
                            class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm">
                            <option v-if="field.type === 'select'" disabled value="">---</option>
                            <option v-for="option in field.options || []" :key="option.value" :value="option.value">{{
                                option.label }}</option>
                        </component>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { restaurantService } from '@/services/restaurantService'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'

interface FormData {
    name: string
    openingTime: string
    closingTime: string
    cuisines: string
    address: string
    description: string
    logo: File | null
    restaurantImage: File | null
    delivery: string
    table: string
    pickup: string
    currentStatus: string
    waterStatus: string
    restaurantType: string
    category: string
    country: string
    state: string
    city: string
    settlementBank: string
    accountNumber: string
    subAccount: string
    latitude: string
    longitude: string
    deliveryType: string
    deliveryDescription: string
    deliveryMinimumOrder: string
    deliveryFee: string
    deliveryRadius: string
    // Working hours for each day
    mondayIsWorking: boolean
    mondayStartTime: string
    mondayEndTime: string
    tuesdayIsWorking: boolean
    tuesdayStartTime: string
    tuesdayEndTime: string
    wednesdayIsWorking: boolean
    wednesdayStartTime: string
    wednesdayEndTime: string
    thursdayIsWorking: boolean
    thursdayStartTime: string
    thursdayEndTime: string
    fridayIsWorking: boolean
    fridayStartTime: string
    fridayEndTime: string
    saturdayIsWorking: boolean
    saturdayStartTime: string
    saturdayEndTime: string
    sundayIsWorking: boolean
    sundayStartTime: string
    sundayEndTime: string
    // Discount fields
    discountType: string
    discountAmount: string
}

interface OwnerInfo {
    firstName: string
    lastName: string
    email: string
    username: string
    password: string
    phone: string
    address: string
    deposit: number | null
    status: string
    longitude: string
    latitude: string
}

const formData = ref<FormData>({
    name: '',
    openingTime: '',
    closingTime: '',
    cuisines: '',
    address: '',
    description: '',
    logo: null,
    restaurantImage: null,
    delivery: '',
    table: '',
    pickup: '',
    currentStatus: '',
    waterStatus: '',
    restaurantType: '',
    category: '',
    country: '',
    state: '',
    city: '',
    settlementBank: '',
    accountNumber: '',
    subAccount: '',
    latitude: '',
    longitude: '',
    deliveryType: '',
    deliveryDescription: '',
    deliveryMinimumOrder: '',
    deliveryFee: '',
    deliveryRadius: '',
    // Working hours
    mondayIsWorking: true,
    mondayStartTime: '',
    mondayEndTime: '',
    tuesdayIsWorking: true,
    tuesdayStartTime: '',
    tuesdayEndTime: '',
    wednesdayIsWorking: true,
    wednesdayStartTime: '',
    wednesdayEndTime: '',
    thursdayIsWorking: true,
    thursdayStartTime: '',
    thursdayEndTime: '',
    fridayIsWorking: true,
    fridayStartTime: '',
    fridayEndTime: '',
    saturdayIsWorking: true,
    saturdayStartTime: '',
    saturdayEndTime: '',
    sundayIsWorking: false,
    sundayStartTime: '',
    sundayEndTime: '',
    // Discount
    discountType: '',
    discountAmount: '',
})

const owner = ref<OwnerInfo>({
    firstName: '',
    lastName: '',
    email: '',
    username: 'auto-generated-username',
    password: '',
    phone: '',
    address: '',
    deposit: null,
    status: '',
    longitude: '',
    latitude: '',
})

const logoInput = ref<HTMLInputElement | null>(null)
const imageInput = ref<HTMLInputElement | null>(null)
const router = useRouter()
const toast = useToast()
const loading = ref(false)

function handleLogoUpload(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0]
    if (file) {
        formData.value.logo = file
    }
}

function handleImageUpload(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0]
    if (file) {
        formData.value.restaurantImage = file
    }
}

async function submitForm() {
    loading.value = true

    try {
        // Prepare the data for API submission
        const createData = {
            name: formData.value.name,
            restaurant_type: formData.value.restaurantType,
            about: formData.value.description,
            category_id: formData.value.category,
            address: formData.value.address,
            services: `${formData.value.delivery === 'yes' ? 'delivery' : ''},${formData.value.pickup === 'yes' ? 'pickup' : ''},${formData.value.table === 'available' ? 'dine-in' : ''}`.replace(/^,|,$/g, ''),
            country: formData.value.country,
            state: formData.value.state,
            city: formData.value.city,
            settlement_bank: formData.value.settlementBank,
            account_number: formData.value.accountNumber,
            sub_account: formData.value.subAccount,
            latitude: parseFloat(formData.value.latitude) || 0,
            longitude: parseFloat(formData.value.longitude) || 0,
            delivery_type: formData.value.deliveryType,
            delivery_description: formData.value.deliveryDescription,
            delivery_minimum_order: parseFloat(formData.value.deliveryMinimumOrder) || 0,
            delivery_fee: parseFloat(formData.value.deliveryFee) || 0,
            delivery_radius: parseInt(formData.value.deliveryRadius) || 0,
            // Working hours
            monday_is_working: formData.value.mondayIsWorking,
            monday_start_time: formData.value.mondayStartTime,
            monday_end_time: formData.value.mondayEndTime,
            tuesday_is_working: formData.value.tuesdayIsWorking,
            tuesday_start_time: formData.value.tuesdayStartTime,
            tuesday_end_time: formData.value.tuesdayEndTime,
            wednesday_is_working: formData.value.wednesdayIsWorking,
            wednesday_start_time: formData.value.wednesdayStartTime,
            wednesday_end_time: formData.value.wednesdayEndTime,
            thursday_is_working: formData.value.thursdayIsWorking,
            thursday_start_time: formData.value.thursdayStartTime,
            thursday_end_time: formData.value.thursdayEndTime,
            friday_is_working: formData.value.fridayIsWorking,
            friday_start_time: formData.value.fridayStartTime,
            friday_end_time: formData.value.fridayEndTime,
            saturday_is_working: formData.value.saturdayIsWorking,
            saturday_start_time: formData.value.saturdayStartTime,
            saturday_end_time: formData.value.saturdayEndTime,
            sunday_is_working: formData.value.sundayIsWorking,
            sunday_start_time: formData.value.sundayStartTime,
            sunday_end_time: formData.value.sundayEndTime,
            cuisines: formData.value.cuisines,
            discount_type: formData.value.discountType,
            discount_amount: parseFloat(formData.value.discountAmount) || 0,
        }

        const response = await restaurantService.createRestaurant(createData)
        toast.success('Restaurant created successfully')

        // Upload images if provided
        const restaurantId = (response as any).data?._id || (response as any)._id
        if (restaurantId) {
            try {
                // Upload logo if provided
                if (formData.value.logo) {
                    await restaurantService.uploadRestaurantLogo(restaurantId, formData.value.logo)
                    toast.success('Logo uploaded successfully')
                }

                // Upload restaurant image if provided
                if (formData.value.restaurantImage) {
                    await restaurantService.uploadRestaurantCoverBanner(restaurantId, formData.value.restaurantImage)
                    toast.success('Restaurant image uploaded successfully')
                }
            } catch (uploadError) {
                console.error('Error uploading images:', uploadError)
                toast.error('Restaurant created but failed to upload images')
            }
        }

        // Navigate to restaurant list or edit page
        router.push({ name: 'restaurantList' })
    } catch (err) {
        toast.error('Failed to create restaurant')
        console.error('Error creating restaurant:', err)
    } finally {
        loading.value = false
    }
}

function submitOwnerInfo() {
    console.log('Submitting owner info:', owner.value)
}

// Working days configuration
const workingDays = [
    { key: 'monday', label: 'Monday', isWorkingKey: 'mondayIsWorking', startTimeKey: 'mondayStartTime', endTimeKey: 'mondayEndTime' },
    { key: 'tuesday', label: 'Tuesday', isWorkingKey: 'tuesdayIsWorking', startTimeKey: 'tuesdayStartTime', endTimeKey: 'tuesdayEndTime' },
    { key: 'wednesday', label: 'Wednesday', isWorkingKey: 'wednesdayIsWorking', startTimeKey: 'wednesdayStartTime', endTimeKey: 'wednesdayEndTime' },
    { key: 'thursday', label: 'Thursday', isWorkingKey: 'thursdayIsWorking', startTimeKey: 'thursdayStartTime', endTimeKey: 'thursdayEndTime' },
    { key: 'friday', label: 'Friday', isWorkingKey: 'fridayIsWorking', startTimeKey: 'fridayStartTime', endTimeKey: 'fridayEndTime' },
    { key: 'saturday', label: 'Saturday', isWorkingKey: 'saturdayIsWorking', startTimeKey: 'saturdayStartTime', endTimeKey: 'saturdayEndTime' },
    { key: 'sunday', label: 'Sunday', isWorkingKey: 'sundayIsWorking', startTimeKey: 'sundayStartTime', endTimeKey: 'sundayEndTime' },
]

// Reusable select options
const selectFields = {
    delivery: {
        label: 'DELIVERY',
        required: true,
        options: [
            { label: 'Available', value: 'yes' },
            { label: 'Unavailable', value: 'no' },
        ],
    },
    table: {
        label: 'TABLE',
        required: true,
        options: [
            { label: 'Available', value: 'available' },
            { label: 'Limited Availability', value: 'limited' },
            { label: 'Unavailable', value: 'unavailable' },
        ],
    },
    pickup: {
        label: 'PICKUP',
        required: true,
        options: [
            { label: 'Available', value: 'yes' },
            { label: 'Unavailable', value: 'no' },
        ],
    },
    currentStatus: {
        label: 'CURRENT STATUS',
        required: true,
        options: [
            { label: 'Open', value: 'open' },
            { label: 'Closed', value: 'closed' },
            { label: 'Temporarily Closed', value: 'temporarily_closed' },
        ],
    },
    waterStatus: {
        label: 'WATER STATUS',
        required: true,
        options: [
            { label: 'Normal Operation', value: 'normal' },
            { label: 'Limited Service', value: 'limited' },
            { label: 'No Water Service', value: 'no_service' },
        ],
    },
}

// Reusable owner fields config
const ownerFields: Record<string, any> = {
    firstName: { label: 'First Name', required: true },
    lastName: { label: 'Last Name', required: true },
    email: { label: 'Email', required: true, inputType: 'email' },
    username: { label: 'Username', disabled: true },
    password: { label: 'Password', required: true, inputType: 'password' },
    phone: { label: 'Phone', required: true, inputType: 'tel' },
    address: { label: 'Address', required: true, colSpan: 2 },
    deposit: { label: 'Deposit Amount', inputType: 'number' },
    status: {
        label: 'Status',
        required: true,
        type: 'select',
        options: [
            { label: 'Active', value: 'active' },
            { label: 'Inactive', value: 'inactive' },
        ],
    },
    longitude: { label: 'Longitude' },
    latitude: { label: 'Latitude' },
    submit: { label: '', colSpan: 2 },
}
</script>
