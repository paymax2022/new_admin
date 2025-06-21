<template>
    <div class="p-5 sm:p-6 bg-white rounded-lg shadow-md">
        <div class="receipt-header">
            <h2 class="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Order ID: {{ orderId }}</h2>
            <div class="order-meta space-y-1 text-sm text-gray-600">
                <p>{{ orderDate }}</p>
                <p>Restaurant: {{ restaurant }}</p>
                <p>Order Type: {{ orderType }}</p>
                <p>Payment Method: {{ paymentMethod }}</p>
                <div class="flex items-center gap-2">
                    <p class="text-gray-600">Payment Status:</p>
                    <span
                        class="font-medium px-2 py- rounded-lg text-xs"
                        :class="{
                            'bg-green-100 text-green-800': paymentStatus === 'Paid',
                            //   'bg-red-100 text-red-800': paymentStatus === 'Unpaid',
                        }"
                    >
                        {{ paymentStatus }}
                    </span>
                </div>
                <div class="flex gap-2">
                    <p>Delivery Status:</p>
                    <p
                        class="font-bold"
                        :class="{
                            'text-green-600 bg-green-100 px-2 rounded': deliveryStatus === 'Delivered',
                            // 'text-red-600 bg-red-100 px-2 rounded': deliveryStatus === 'Failed',
                            // 'text-yellow-600 bg-yellow-100 px-2 rounded': deliveryStatus === 'Pending',
                        }"
                    >
                        {{ deliveryStatus }}
                    </p>
                </div>
            </div>
        </div>

        <div class="order-details mt-6 pt-6 border-t border-gray-200">
            <h3 class="text-base sm:text-lg font-medium text-gray-800 mb-4">Order Details</h3>
            <div class="items-list space-y-4">
                <div v-for="(item, index) in items" :key="index" class="order-item flex justify-between pb-3 border-b border-dashed border-gray-100">
                    <div class="item-name font-medium">
                        {{ item.name }}
                        <span v-if="item.variation" class="variation text-xs text-gray-500">({{ item.variation }})</span>
                    </div>
                    <div class="item-price font-semibold">${{ item.price.toFixed(2) }}</div>
                </div>
            </div>

            <div class="price-breakdown mt-6 space-y-2">
                <div class="price-row flex justify-between">
                    <span>Discount</span>
                    <span>-${{ discount.toFixed(2) }}</span>
                </div>
                <div class="price-row flex justify-between">
                    <span>Subtotal</span>
                    <span>${{ subtotal.toFixed(2) }}</span>
                </div>
                <div class="price-row flex justify-between">
                    <span>Delivery Charge</span>
                    <span>${{ deliveryCharge.toFixed(2) }}</span>
                </div>
                <div class="price-row total flex justify-between font-bold text-base mt-3 pt-3 border-t border-gray-300">
                    <span>Total</span>
                    <span>${{ total.toFixed(2) }}</span>
                </div>
            </div>
        </div>

        <div class="delivery-info mt-6 pt-6 border-t border-gray-200">
            <h3 class="text-base sm:text-lg font-medium text-gray-800 mb-4">Delivery Information</h3>
            <p class="customer-name font-semibold">{{ customer.name }}</p>
            <p class="customer-email text-sm text-gray-600">{{ customer.email }}</p>
            <p class="customer-phone text-sm text-gray-600">{{ customer.phone }}</p>
            <p class="customer-address mt-2 text-sm">
                <span v-if="customer.apartment" class="text-gray-600">{{ customer.apartment }},</span>
                <span class="text-gray-600">{{ customer.address }}</span>
            </p>
        </div>
    </div>
</template>

<script lang="ts" setup>
    const orderId = '#ORD-00000097';
    const orderDate = '18 May 2025, 01:16 PM';
    const restaurant = "Sultan's Dine";
    const orderType = 'Delivery';
    const paymentMethod = 'Cash On Delivery';
    const paymentStatus = 'Paid';
    const deliveryStatus = 'Delivered';

    const items = [
        {
            name: 'Gourmet Garlic Infusion Burger',
            variation: 'Medium',
            price: 40.0,
        },
        {
            name: 'Sweet Heat Fiesta Burger',
            variation: null,
            price: 10.0,
        },
    ];

    const discount = 10.0;
    const subtotal = 60.0;
    const deliveryCharge = 12.0;
    const total = 72.0;

    const customer = {
        name: 'Jack J. Smith',
        email: 'customer@example.com',
        phone: '8801881895288',
        apartment: 'apartment',
        address: '5/6,R944+4X3, Dhaka 1216',
    };
</script>
