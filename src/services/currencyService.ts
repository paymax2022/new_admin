import api from './api';

export default {
  updateCurrency(data: {
    id: string;
    name?: string;
    status?: boolean;
    rateToNGN?: number;
  }) {
    return api.patch('/api/v1/currencies', data);
  },
  getCurrencies() {
    return api.get('/api/v1/currencies/list');
  },
  createCurrency(data: {
    symbol: string;
    name: string;
  }) {
    return api.post('/api/v1/currencies', data);
  },
  getCurrencyById(currencyId: string) {
    return api.get(`/api/v1/currencies/admin/${currencyId}`);
  },
  // Get virtual cards
  getVirtualCards(params?: {
    page?: number;
    limit?: number;
    rows_per_page?: number;
  }) {
    const cleanParams: any = {};
    if (params?.page !== undefined) cleanParams.page = params.page;
    if (params?.limit !== undefined) {
      cleanParams.limit = params.limit;
    } else if (params?.rows_per_page !== undefined) {
      cleanParams.limit = params.rows_per_page;
    }
    return api.get('/api/v1/admin/multicurrency/virtual-cards', { params: cleanParams });
  },
}; 