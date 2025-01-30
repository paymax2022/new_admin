<template>
    <div>
        <p class="text-lg font-bold">Save Payment</p>
        <div class="flex justify-center mt-5">
            <div class="w-full sm:w-full lg:px-5 lg:w-1/2 bg-white p-3 rounded-lg shadow-xl">
                <div class="space-y-4 font-semibold">
                    <p>Amount:</p>
                </div>
                <form class="mt-4">
                    <input type="text" placeholder="Amount" class="form-input w-full border border-gray-300 rounded-lg px-4 py-2" required />
                    <button type="submit" class="bg-blue-500 text-white px-6 py-2 mt-3 rounded-lg hover:bg-blue-600">Submit</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script lang="js" setup></script>
