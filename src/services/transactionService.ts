import api from './api';

export default {
  getTransactions() {
    return api.get('/api/v1/admin/transactions');
  },
  getTransactionById(id: string) {
    return api.get(`/api/v1/admin/transactions/${id}`);
  },
  getTransactionTotal() {
    return api.get('/api/v1/admin/transactions/total');
  },
}; 