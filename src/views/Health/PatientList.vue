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

        <div class="panel">
            <div class="mb-5 text-lg font-bold">Patient List</div>
            <div class="table-responsive">
                <table>
                    <thead>
                        <tr>
                            <th class="ltr:rounded-l-md rtl:rounded-r-md">ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Display filtered transactions -->
                        <tr v-for="(transaction, index) in filteredTransactions" :key="index">
                            <td class="font-semibold">{{ transaction.id }}</td>
                            <td class="whitespace-nowrap">{{ transaction.name }}</td>
                            <td class="whitespace-nowrap">{{ transaction.email }}</td>
                            <td>{{ transaction.phone }}</td>
                            <td class="text-center">
                                <button @click="deleteTransaction(transaction.id)" class="p-2 text-red-600 hover:text-red-800" aria-label="Delete">🗑️</button>
                            </td>
                        </tr>
                        <!-- Show message if no results found -->
                        <tr v-if="filteredTransactions.length === 0">
                            <td colspan="5" class="text-center text-gray-500">No patients found.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { ref, computed } from 'vue';

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

    // Filter transactions based on search query
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

    function deleteTransaction(id: string) {
        transactions.value = transactions.value.filter((transaction) => transaction.id !== id);
    }
</script>

<style scoped>
    .table-responsive {
        overflow-x: auto;
    }
    table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 1rem;
    }
    th,
    td {
        padding: 8px 12px;
        border: 1px solid #ddd;
        text-align: left;
    }
    th {
        background-color: #f8f8f8;
    }
</style>
