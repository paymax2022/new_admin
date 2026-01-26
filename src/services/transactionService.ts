import api from './api';

export default {
  getTransactions(params?: {
    page?: number;
    limit?: number;
    rows_per_page?: number;
    start_date?: string;
    end_date?: string;
    q?: string;
    status?: string;
  }) {
    // Clean and map parameters to match API expectations
    // Use 'limit' as that's what other services use
    const cleanParams: any = {};
    if (params?.page !== undefined) cleanParams.page = params.page;
    // Prefer 'limit' over 'rows_per_page' to match other services
    if (params?.limit !== undefined) {
      cleanParams.limit = params.limit;
    } else if (params?.rows_per_page !== undefined) {
      cleanParams.limit = params.rows_per_page;
    }
    if (params?.start_date !== undefined) cleanParams.start_date = params.start_date;
    if (params?.end_date !== undefined) cleanParams.end_date = params.end_date;
    if (params?.q !== undefined) cleanParams.q = params.q;
    if (params?.status !== undefined) cleanParams.status = params.status;
    
    console.log('Transaction service params:', cleanParams);
    return api.get('/api/v1/admin/transactions', { params: cleanParams });
  },
  getTransactionById(id: string) {
    return api.get(`/api/v1/admin/transactions/${id}`);
  },
  getTransactionTotal() {
    return api.get('/api/v1/admin/transactions/total');
  },
  getTransactionEntries(params?: {
    year?: string;
    currency?: string;
    status?: string;
  }) {
    return api.get('/api/v1/admin/transactions/entries', { params });
  },
  
  // Get account transactions
  getAccountTransactions(params?: {
    page?: number;
    limit?: number;
    rows_per_page?: number;
    start_date?: string;
    end_date?: string;
    status?: string;
    currency?: string;
  }) {
    const cleanParams: any = {};
    if (params?.page !== undefined) cleanParams.page = params.page;
    if (params?.limit !== undefined) {
      cleanParams.limit = params.limit;
    } else if (params?.rows_per_page !== undefined) {
      cleanParams.limit = params.rows_per_page;
    }
    if (params?.start_date !== undefined) cleanParams.start_date = params.start_date;
    if (params?.end_date !== undefined) cleanParams.end_date = params.end_date;
    if (params?.status !== undefined) cleanParams.status = params.status;
    if (params?.currency !== undefined) cleanParams.currency = params.currency;
    
    return api.get('/api/v1/account/transactions', { params: cleanParams });
  },
  
  // Method to get sample transactions for testing
  getSampleTransactions() {
    return Promise.resolve({
      data: {
        data: [
          {
            id: 'TXN001',
            created_at: new Date().toISOString(),
            user: { first_name: 'John', lastname: 'Doe', email: 'john@example.com' },
            category: 'Bills Payment',
            amount: 5000,
            status: 'SUCCESSFUL',
            receiver: 'Electricity Company',
            service_type: 'Utility',
            payment_method: 'Card',
            network: 'Visa',
            provider: 'Flutterwave',
            providerPackage: 'Standard',
            phoneNumber: '+2348012345678',
            paymentReference: 'REF001',
            entry: 'CREDIT',
            updated_at: new Date().toISOString()
          },
          {
            id: 'TXN002',
            created_at: new Date(Date.now() - 86400000).toISOString(),
            user: { first_name: 'Jane', lastname: 'Smith', email: 'jane@example.com' },
            category: 'Transfer',
            amount: 10000,
            status: 'PENDING',
            receiver: 'Bank Account',
            service_type: 'Bank Transfer',
            payment_method: 'Bank',
            network: 'NIBSS',
            provider: 'Paystack',
            providerPackage: 'Premium',
            phoneNumber: '+2348098765432',
            paymentReference: 'REF002',
            entry: 'DEBIT',
            updated_at: new Date(Date.now() - 86400000).toISOString()
          },
          {
            id: 'TXN003',
            created_at: new Date(Date.now() - 172800000).toISOString(),
            user: { first_name: 'Mike', lastname: 'Johnson', email: 'mike@example.com' },
            category: 'Airtime',
            amount: 1000,
            status: 'SUCCESSFUL',
            receiver: 'MTN',
            service_type: 'Airtime',
            payment_method: 'Wallet',
            network: 'MTN',
            provider: 'Interswitch',
            providerPackage: 'Basic',
            phoneNumber: '+2348034567890',
            paymentReference: 'REF003',
            entry: 'DEBIT',
            updated_at: new Date(Date.now() - 172800000).toISOString()
          }
        ],
        page: 1,
        rows_per_page: 10,
        total_count: 3
      }
    });
  }
};