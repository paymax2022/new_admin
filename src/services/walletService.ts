import api from './api';

export default {
  getActiveWallets() {
    return api.get('/api/v1/admin/wallets/active');
  },
  getWalletCountByCurrency() {
    return api.get('/api/v1/admin/wallets/currency-count');
  },
  // New method to get actual wallet list
  getWallets() {
    return api.get('/api/v1/admin/wallets');
  },
  // Alternative endpoints to try if the above doesn't work
  getAllWallets() {
    return api.get('/api/v1/admin/wallets/all');
  },
  getWalletList() {
    return api.get('/api/v1/admin/wallets/list');
  },
}; 