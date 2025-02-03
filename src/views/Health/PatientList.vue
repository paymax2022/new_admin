<template>
    <div>
        <!-- Search Bar -->
        <div class="flex justify-between items-center mb-4">
            <input
                v-model="searchQuery"
                type="text"
                placeholder="Search Patients..."
                class="px-4 py-2 border rounded-md w-full max-w-md focus:ring focus:ring-blue-300 outline-none"
            />
        </div>

        <div class="bg-white shadow-md rounded-lg p-4">
            <div class="mb-5 text-lg font-bold">Patient List</div>
            <div class="overflow-x-auto">
                <table class="w-full border-collapse">
                    <thead>
                        <tr class="bg-gray-100">
                            <th class="p-3 text-left">ID</th>
                            <th class="p-3 text-left">Name</th>
                            <th class="p-3 text-left">Email</th>
                            <th class="p-3 text-left">Phone</th>
                            <th class="p-3 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(transaction, index) in filteredTransactions" :key="index" class="border-t">
                            <td class="p-3 font-semibold">{{ transaction.id }}</td>
                            <td class="p-3 whitespace-nowrap">{{ transaction.name }}</td>
                            <td class="p-3 whitespace-nowrap">{{ transaction.email }}</td>
                            <td class="p-3">{{ transaction.phone }}</td>
                            <td class="p-3 text-center">
                                <button @click="confirmDelete(transaction.id)" class="text-red-600 hover:text-red-800">
                                    <DeleteIcon class="h-5 w-5"/>
                                </button>
                            </td>
                        </tr>
                        <tr v-if="filteredTransactions.length === 0">
                            <td colspan="5" class="p-3 text-center text-gray-500">No patients found.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import Swal from 'sweetalert2';
import DeleteIcon from '@/components/icon/icon-delete.vue';

interface Transaction {
    id: string;
    name: string;
    email: string;
    phone: string;
}

const transactions = ref<Transaction[]>([
    { id: '#01', name: 'Veekthor Parloff', email: 'vparloff999@gmail.com', phone: '+2348114538964' },
    { id: '#02', name: 'Sophia Anders', email: 'sophia.anders@example.com', phone: '+1 202-555-0168' },
    { id: '#03', name: 'Michael Johnson', email: 'mjohnson24@example.com', phone: '+44 7700 900345' },
    { id: '#04', name: 'Aisha Bello', email: 'aisha.bello1990@gmail.com', phone: '+2349023345678' },
    { id: '#05', name: 'Liam O’Connor', email: 'liam.oconnor@mail.ie', phone: '+353 89 123 4567' },
]);

const searchQuery = ref<string>('');

const filteredTransactions = computed(() => {
    const query = searchQuery.value.toLowerCase();
    return transactions.value.filter(
        (transaction) =>
            transaction.name.toLowerCase().includes(query) ||
            transaction.email.toLowerCase().includes(query) ||
            transaction.phone.includes(query) ||
            transaction.id.includes(query),
    );
});

function confirmDelete(id: string) {
    Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to delete this patient?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            deleteTransaction(id);
            Swal.fire('Deleted!', 'The patient has been deleted.', 'success');
        }
    });
}

function deleteTransaction(id: string) {
    transactions.value = transactions.value.filter((transaction) => transaction.id !== id);
}
</script>
