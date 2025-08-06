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
}; 