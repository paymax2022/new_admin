<template>
    <div class="p-6 bg-white shadow-lg rounded-lg max-w-4xl mx-auto">
      <!-- Invoice Header -->
      <div class="flex justify-between mb-6">
        <div>
          <p class="font-bold text-lg">Issue Date: <span>23/04/2025</span></p>
        </div>
        <div>
          <p class="font-bold text-lg">Due Date: <span>23/04/2025</span></p>
        </div>
        <div>
          <p class="font-bold text-lg">Invoice No: <span>123456</span></p>
        </div>
      </div>

      <!-- Invoice Details -->
      <div class="flex justify-between mt-5">
        <div>
          <p class="font-bold text-lg">Invoice To</p>
          <p>Mr. John Doe</p>
          <p>123 Main Street</p>
          <p>Springfield, IL 62701</p>
        </div>
        <div>
          <p class="font-bold text-lg">Pay To</p>
          <p>Mr. John Doe</p>
          <p>123 Main Street</p>
          <p>Springfield, IL 62701</p>
        </div>
        <div>
          <p class="font-bold text-lg">Payment Details</p>
          <p>Paypal: <span>Paypal@example.com</span></p>
          <p>Account: <span>examplepaypal.co</span></p>
          <p>Paid Term: <span>15 days</span></p>
          <p class="text-red-500 font-bold">Due in 8 days</p>
          <button class="bg-red-600 text-white px-4 py-2 rounded mt-2">Pay Now</button>
        </div>
      </div>

      <!-- Invoice Items Table -->
      <div class="mt-5">
        <p class="font-bold">Items:</p>
        <table class="w-full border-collapse border border-gray-300 mt-4">
          <thead>
            <tr class="bg-gray-100">
              <th class="p-2 border">Product / Service</th>
              <th class="p-2 border">Quantity</th>
              <th class="p-2 border">Unit</th>
              <th class="p-2 border">Rate</th>
              <th class="p-2 border">Discount</th>
              <th class="p-2 border">Tax</th>
              <th class="p-2 border">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in invoiceItems" :key="index" class="border">
              <td class="p-2 border">{{ item.name }}</td>
              <td class="p-2 border">{{ item.quantity }}</td>
              <td class="p-2 border">{{ item.unit }}</td>
              <td class="p-2 border">${{ item.rate.toFixed(2) }}</td>
              <td class="p-2 border">{{ item.discount }}</td>
              <td class="p-2 border">{{ item.tax }}</td>
              <td class="p-2 border">${{ item.amount.toFixed(2) }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Terms & Conditions + Total Amount Section -->
      <div class="mt-5 flex justify-between">
        <!-- Terms & Conditions -->
        <div class="">
          <div class="p-4 border rounded-lg bg-gray-100">
            <h3 class="text-lg font-semibold flex items-center">
              📄 Terms & Conditions
            </h3>
            <p class="text-gray-600">Authoritatively envision business action items through parallel sources.</p>
          </div>

          <div class="mt-4 p-4 border rounded-lg bg-gray-100">
            <h3 class="text-lg font-semibold flex items-center">
              📝 Note
            </h3>
            <p class="text-gray-600">This is a computer-generated receipt and does not require a physical signature.</p>
          </div>
        </div>

        <!-- Total Amount -->
         <div>
            <div class="flex mr-8  gap-4 justify-between" >
                <p>Taxable :</p>
                <p>$360.00</p>
            </div>
            <div class="flex mr-8  gap-4 justify-between" >
                <p>Discount :</p>
                <p>$13.20</p>
            </div>
            <div class="flex mr-8  gap-4 justify-between" >
                <p>Vat :</p>
                <p>$0.00</p>
            </div>
            <div class="flex mr-8  gap-4 justify-between" >
                <p class="text-green-600" > Total Amount :</p>
                <p>${{ totalAmount.toFixed(2) }}</p>
            </div>
            <div class="mt-6 text-right">
      <p class="text-lg font-semibold">Authorized Sign</p>
      <p class="italic">James Pual</p>
    </div>
         </div>
        <!-- <div class="">
          <p><strong>Taxable:</strong> $360.00</p>
          <p><strong>Discount:</strong> $13.20</p>
          <p><strong>Vat:</strong> $0.00</p>
          <p class="text-xl font-semibold mt-2">Total Amount: <span class="text-green-600">${{ totalAmount.toFixed(2) }}</span></p>
        </div> -->
      </div>
    </div>
  </template>

  <script lang="ts" setup>
  import { ref, computed } from "vue";

  const invoiceItems = ref([
    { name: "Nike Jordan", quantity: 1, unit: "Pcs", rate: 1360, discount: 0, tax: 0, amount: 1360 },
    { name: "Lobar Handy", quantity: 1, unit: "Inch", rate: 155, discount: 0, tax: 0, amount: 155 },
    { name: "Bold V3.2", quantity: 1, unit: "Pcs", rate: 1055, discount: 0, tax: 0, amount: 1055 }
  ]);

  const totalAmount = computed(() =>
    invoiceItems.value.reduce((sum, item) => sum + item.amount, 0)
  );
  </script>
