<template>
    <div>
        <!-- Search Bar -->
        <div class="flex justify-between items-center mb-4">
            <input
                v-model="searchQuery"
                type="text"
                placeholder="Search Contacts..."
                class="px-4 py-2 border rounded-md w-full max-w-md focus:ring focus:ring-blue-300 outline-none"
            />
        </div>

        <div class="panel">
            <div class="mb-5 text-lg font-bold">Contact List</div>
            <div class="table-responsive">
                <table>
                    <thead>
                        <tr>
                            <th class="ltr:rounded-l-md rtl:rounded-r-md">ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Subject</th>
                            <th>Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Display filtered contacts -->
                        <tr v-for="(contact, index) in filteredContacts" :key="index">
                            <td class="font-semibold">{{ contact.id }}</td>
                            <td class="whitespace-nowrap">{{ contact.name }}</td>
                            <td class="whitespace-nowrap">{{ contact.email }}</td>
                            <td>{{ contact.phone }}</td>
                            <td>{{ contact.subject }}</td>
                            <td>{{ contact.message }}</td>
                        </tr>
                        <!-- Show message if no results found -->
                        <tr v-if="filteredContacts.length === 0">
                            <td colspan="6" class="text-center text-gray-500">No contacts found.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { ref, computed } from 'vue';

    interface Contact {
        id: string;
        name: string;
        email: string;
        phone: string;
        subject: string;
        message: string;
    }

    const contacts = ref<Contact[]>([
        {
            id: '#001',
            name: 'John Doe',
            email: 'johndoe@example.com',
            phone: '+1 234 567 890',
            subject: 'General Inquiry',
            message: 'I would like to know more about your services.',
        },
        {
            id: '#002',
            name: 'Jane Smith',
            email: 'janesmith@example.com',
            phone: '+1 234 567 891',
            subject: 'Support Request',
            message: 'I am facing an issue with my order.',
        },
        {
            id: '#003',
            name: 'Carlos Alberto',
            email: 'carlos@example.com',
            phone: '+1 234 567 892',
            subject: 'Billing Question',
            message: 'I have a question regarding my recent bill.',
        },
        {
            id: '#004',
            name: 'Lucy Brown',
            email: 'lucybrown@example.com',
            phone: '+1 234 567 893',
            subject: 'Complaint',
            message: 'My package arrived damaged.',
        },
        {
            id: '#005',
            name: 'Michael Lee',
            email: 'michaellee@example.com',
            phone: '+1 234 567 894',
            subject: 'Product Feedback',
            message: 'I would like to share some feedback on your product.',
        },
    ]);

    const searchQuery = ref<string>('');

    // Filter contacts based on search query
    const filteredContacts = computed(() => {
        const query = searchQuery.value.toLowerCase();
        return contacts.value.filter(
            (contact) =>
                contact.name.toLowerCase().includes(query) ||
                contact.email.toLowerCase().includes(query) ||
                contact.phone.includes(query) ||
                contact.subject.toLowerCase().includes(query) ||
                contact.message.toLowerCase().includes(query),
        );
    });
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
