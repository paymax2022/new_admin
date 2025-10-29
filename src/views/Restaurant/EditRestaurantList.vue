<template>
    <div>
        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center items-center py-8">
            <div class="inline-flex items-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
                </svg>
                Loading restaurant data...
            </div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
            <div class="flex">
                <div class="flex-shrink-0">
                    <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                        fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clip-rule="evenodd" />
                    </svg>
                </div>
                <div class="ml-3">
                    <h3 class="text-sm font-medium text-red-800">Error loading restaurant data</h3>
                    <div class="mt-2 text-sm text-red-700">
                        <p>{{ error }}</p>
                    </div>
                    <div class="mt-4 flex gap-2">
                        <button @click="fetchRestaurantData"
                            class="bg-red-100 px-3 py-2 rounded-md text-sm font-medium text-red-800 hover:bg-red-200">
                            Try Again
                        </button>
                        <button @click="goBackToList"
                            class="bg-gray-100 px-3 py-2 rounded-md text-sm font-medium text-gray-800 hover:bg-gray-200">
                            Back to Restaurant List
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Main Content -->
        <div v-else class="flex flex-col lg:flex-row gap-6">
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
                        <input type="text" v-model="formData.restaurantType"
                            class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm" />
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

                    <!-- Settlement Bank Information -->
                    <div class="border-t border-gray-200 my-4"></div>
                    <div class="space-y-4">
                        <h3 class="text-lg font-semibold text-gray-800">Banking Information</h3>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                            <span class="ml-2 text-sm text-gray-500">
                                {{ formData.restaurantImage?.name || 'No file chosen' }}</span>
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
                        <button type="submit"
                            class="w-full py-2 px-4 rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">Submit</button>
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
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { restaurantService } from '@/services/restaurantService'
import { useToast } from 'vue-toastification'

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
    country: string
    state: string
    city: string
    category: string
    deliveryType: string
    deliveryDescription: string
    deliveryMinimumOrder: string
    deliveryFee: string
    deliveryRadius: string
    settlementBank: string
    accountNumber: string
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
    country: '',
    state: '',
    city: '',
    category: '',
    deliveryType: '',
    deliveryDescription: '',
    deliveryMinimumOrder: '',
    deliveryFee: '',
    deliveryRadius: '',
    settlementBank: '',
    accountNumber: '',
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
const route = useRoute()
const router = useRouter()
const toast = useToast()
const loading = ref(false)
const error = ref('')

async function handleLogoUpload(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0]
    if (!file) return
    formData.value.logo = file

    // Upload immediately
    const restaurantId = route.params.id as string
    if (!restaurantId) return
    try {
        loading.value = true
        await restaurantService.uploadRestaurantLogo(restaurantId, file)
        toast.success('Logo uploaded successfully')
        // Optionally refresh restaurant data
        await fetchRestaurantData()
    } catch (e) {
        toast.error('Failed to upload logo')
        console.error(e)
    } finally {
        loading.value = false
    }
}

async function handleImageUpload(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0]
    if (!file) return
    formData.value.restaurantImage = file

    // Upload immediately
    const restaurantId = route.params.id as string
    if (!restaurantId) return
    try {
        loading.value = true
        await restaurantService.uploadRestaurantCoverBanner(restaurantId, file)
        toast.success('Restaurant image uploaded successfully')
        // Optionally refresh restaurant data
        await fetchRestaurantData()
    } catch (e) {
        toast.error('Failed to upload restaurant image')
        console.error(e)
    } finally {
        loading.value = false
    }
}

// Fetch restaurant data and populate form
const fetchRestaurantData = async () => {
    const restaurantId = route.params.id as string
    console.log('Route params:', route.params)
    console.log('Restaurant ID from route:', restaurantId)

    if (!restaurantId) {
        error.value = 'Restaurant ID not found in route parameters. Please navigate from the restaurant list.'
        console.error('No restaurant ID found in route params:', route.params)
        return
    }

    loading.value = true
    error.value = ''

    try {
        const response = await restaurantService.getRestaurantById(restaurantId)
        console.log('Restaurant data received:', response)

        if (response && response.data) {
            const restaurant = response.data

            // Populate restaurant form data
            formData.value.name = restaurant.name || ''
            formData.value.address = restaurant.address || ''
            formData.value.description = restaurant.about || ''
            formData.value.cuisines = restaurant.cuisines?.map((c: any) => c.name).join(', ') || ''

            // Handle working hours - find the first working day
            if (restaurant.working_hours?.days) {
                const workingDay = restaurant.working_hours.days.find((d: any) => d.is_working)
                if (workingDay) {
                    formData.value.openingTime = workingDay.start_time || ''
                    formData.value.closingTime = workingDay.end_time || ''
                }
            }

            // Handle delivery settings
            if (restaurant.delivery) {
                console.log('Delivery data:', restaurant.delivery)

                // Populate delivery fields
                formData.value.deliveryType = restaurant.delivery.delivery_type || ''
                formData.value.deliveryDescription = restaurant.delivery.delivery_description || ''
                formData.value.deliveryMinimumOrder = restaurant.delivery.delivery_minimum_order || ''
                formData.value.deliveryFee = restaurant.delivery.delivery_fee || ''
                formData.value.deliveryRadius = restaurant.delivery.delivery_radius?.toString() || ''

                // Keep the old delivery field for backward compatibility
                formData.value.delivery = restaurant.delivery.delivery_type === 'delivery' ? 'yes' : 'no'

                console.log('Populated delivery fields:', {
                    type: formData.value.deliveryType,
                    description: formData.value.deliveryDescription,
                    minimumOrder: formData.value.deliveryMinimumOrder,
                    fee: formData.value.deliveryFee,
                    radius: formData.value.deliveryRadius
                })
            }

            // Handle services
            if (restaurant.services) {
                const services = restaurant.services.toLowerCase()
                formData.value.pickup = services.includes('pickup') ? 'yes' : 'no'
                formData.value.table = services.includes('table') ? 'available' : 'unavailable'
            }

            // Handle status
            formData.value.currentStatus = restaurant.accepting_orders ? 'open' : 'closed'

            // Handle location array
            if (restaurant.location && Array.isArray(restaurant.location) && restaurant.location.length > 0) {
                const firstLocation = restaurant.location[0]
                console.log('Location data:', firstLocation)

                if (firstLocation.lat !== undefined) {
                    owner.value.latitude = firstLocation.lat.toString()
                }
                if (firstLocation.lon !== undefined) {
                    owner.value.longitude = firstLocation.lon.toString()
                }

                console.log('Populated coordinates - Lat:', owner.value.latitude, 'Lon:', owner.value.longitude)
            } else {
                console.log('No location data found or invalid format:', restaurant.location)
            }

            // Handle additional restaurant fields
            formData.value.restaurantType = restaurant.restaurant_type || ''
            formData.value.category = restaurant.category_id || ''
            formData.value.country = restaurant.country || ''
            formData.value.state = restaurant.state || ''
            formData.value.city = restaurant.city || ''
            formData.value.settlementBank = restaurant.settlement_bank || ''
            formData.value.accountNumber = restaurant.account_number || ''

            // Populate owner data (using user_id for now, you might need to fetch user details separately)
            owner.value.firstName = 'Restaurant' // Default values since user data isn't in restaurant response
            owner.value.lastName = 'Owner'
            owner.value.email = 'owner@restaurant.com'
            owner.value.phone = 'N/A'
            owner.value.address = restaurant.address || ''
            owner.value.status = restaurant.accepting_orders ? 'active' : 'inactive'

            toast.success('Restaurant data loaded successfully')
        }
    } catch (err) {
        error.value = 'Failed to load restaurant data'
        toast.error('Failed to load restaurant data')
        console.error('Error fetching restaurant:', err)
    } finally {
        loading.value = false
    }
}

async function submitForm() {
    const restaurantId = route.params.id as string
    if (!restaurantId) {
        toast.error('Restaurant ID not found')
        return
    }

    loading.value = true

    try {
        // Build services string from checkboxes
        const services: string[] = []
        if (formData.value.delivery === 'yes') services.push('delivery')
        if (formData.value.pickup === 'yes') services.push('pickup')
        if (formData.value.table === 'available') services.push('dine-in')
        const servicesString = services.join(',')

        // Prepare working hours
        const workingHours = {
            days: [
                {
                    day: 'monday',
                    is_working: true,
                    start_time: formData.value.openingTime || '09:00',
                    end_time: formData.value.closingTime || '22:00'
                },
                {
                    day: 'tuesday',
                    is_working: true,
                    start_time: formData.value.openingTime || '09:00',
                    end_time: formData.value.closingTime || '22:00'
                },
                {
                    day: 'wednesday',
                    is_working: true,
                    start_time: formData.value.openingTime || '09:00',
                    end_time: formData.value.closingTime || '22:00'
                },
                {
                    day: 'thursday',
                    is_working: true,
                    start_time: formData.value.openingTime || '09:00',
                    end_time: formData.value.closingTime || '22:00'
                },
                {
                    day: 'friday',
                    is_working: true,
                    start_time: formData.value.openingTime || '09:00',
                    end_time: formData.value.closingTime || '22:00'
                },
                {
                    day: 'saturday',
                    is_working: true,
                    start_time: formData.value.openingTime || '09:00',
                    end_time: formData.value.closingTime || '22:00'
                },
                {
                    day: 'sunday',
                    is_working: false,
                    start_time: '',
                    end_time: ''
                }
            ]
        }

        // Prepare the data for API submission
        const updateData = {
            name: formData.value.name,
            about: formData.value.description,
            restaurant_type: formData.value.restaurantType,
            category_id: formData.value.category,
            address: formData.value.address,
            services: servicesString,
            country: formData.value.country,
            state: formData.value.state,
            city: formData.value.city,
            settlement_bank: formData.value.settlementBank,
            account_number: formData.value.accountNumber,
            sub_account: '',
            // Include location data if coordinates are provided
            ...(owner.value.latitude && owner.value.longitude && {
                location: [{
                    lat: parseFloat(owner.value.latitude),
                    lon: parseFloat(owner.value.longitude)
                }]
            }),
            // Include delivery data if provided
            ...(formData.value.deliveryType && {
                delivery: {
                    delivery_type: formData.value.deliveryType,
                    delivery_description: formData.value.deliveryDescription,
                    delivery_minimum_order: parseFloat(formData.value.deliveryMinimumOrder) || 0,
                    delivery_fee: parseFloat(formData.value.deliveryFee) || 0,
                    delivery_radius: parseFloat(formData.value.deliveryRadius) || 0
                }
            }),
            // Include working hours
            working_hours: workingHours
        }

        await restaurantService.updateRestaurant(restaurantId, updateData)
        toast.success('Restaurant updated successfully')
        router.push({ name: 'restaurantList' })
    } catch (err) {
        toast.error('Failed to update restaurant')
        console.error('Error updating restaurant:', err)
    } finally {
        loading.value = false
    }
}

function submitOwnerInfo() {
    console.log('Submitting owner info:', owner.value)
}

// Navigate back to restaurant list
const goBackToList = () => {
    router.push({ name: 'restaurantList' })
}

// Load restaurant data on component mount
onMounted(() => {
    fetchRestaurantData()
})

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
