import api from './api';

export default {
  getTransactions(params?: {
    page?: number;
    limit?: number;
  }) {
    // Only include 'page' and 'limit' in the query params
    const cleanParams: any = {};
    if (params?.page !== undefined) cleanParams.page = params.page;
    if (params?.limit !== undefined) cleanParams.limit = params.limit;
    return api.get('/api/v1/admin/transactions', { params: cleanParams });
  },
  getTransactionById(id: string) {
    return api.get(`/api/v1/admin/transactions/${id}`);
  },
  getTransactionTotal() {
    return api.get('/api/v1/admin/transactions/total');
  },
};