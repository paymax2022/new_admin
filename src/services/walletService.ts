import api from './api';

export default {
  /**
   * Get active wallets count and statistics
   * Returns data in format:
   * {
   *   count: number,
   *   is_increasing: boolean,
   *   percent_change: number,
   *   previous_month: number
   * }
   */
  getActiveWallets() {
    return api.get('/api/v1/admin/wallets/active');
  },
  
  /**
   * Get wallet count by currency
   */
  getWalletCountByCurrency() {
    return api.get('/api/v1/admin/wallets/currency-count');
  },
  
  /**
   * Get wallet list
   */
  getWalletList() {
    return api.get('/api/v1/wallets/list');
  },
  
  /**
   * Adjust wallet balance (add or subtract funds)
   */
  adjustWalletBalance(data: {
    id: string;
    amount: number;
    type: 'add' | 'subtract';
    reason?: string;
  }) {
    return api.put('/api/v1/admin/wallets/adjust', data);
  },
  
  /**
   * Get all wallets
   */
  getAllWallets(params?: {
    page?: number;
    limit?: number;
    sort?: 'asc' | 'desc';
    search?: string;
  }) {
    return api.get('/api/v1/admin/wallets', { params });
  },

  /**
   * Get wallet details by ID
   */
  getWalletById(walletId: string) {
    return api.get(`/api/v1/admin/wallets/${walletId}`);
  },

  /**
   * Update wallet status (freeze/unfreeze)
   */
  updateWalletStatus(walletId: string, status: 'active' | 'frozen' | 'inactive') {
    return api.put('/api/v1/admin/wallets/update', {
      walletid: walletId,
      status: status
    });
  },
  
  /**
   * Get wallets for a specific user
   */
  getUserWallets(userId: string) {
    return api.get(`/api/v1/admin/wallets/user/${userId}`);
  },
  
  /**
   * Get recent wallets
   */
  getRecentWallets() {
    return api.get('/api/v1/admin/wallets/recent');
  },

  /**
   * Get wallet tiers
   */
  getWalletTiers() {
    return api.get('/api/v1/admin/wallets/tiers');
  },

  /**
   * Get tier by ID
   */
  getTierById(tierId: string) {
    return api.get(`/api/v1/admin/wallets/tiers/${tierId}`);
  },
};