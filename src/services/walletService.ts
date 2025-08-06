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
   * Update wallet status
   */
  updateWalletStatus(data: {
    id: string;
    status: 'active' | 'frozen' | 'inactive';
  }) {
    return api.put('/api/v1/admin/wallets/update', data);
  },
  
  /**
   * Get wallets for a specific user
   */
  getUserWallets(userId: string) {
    return api.get(`/api/v1/admin/wallets/user/${userId}`);
  },
  
  /**
   * Get all wallets with pagination and filtering
   * Returns data in format:
   * {
   *   data: Array<Wallet>,
   *   message: string,
   *   ok: boolean,
   *   page: number,
   *   rows_per_page: number,
   *   total_count: number
   * }
   */
  getAllWallets(params?: {
    page?: number;
    limit?: number;
    userId?: string;
    tierid?: string;
    sort?: 'asc' | 'desc';
    startDate?: string;
    endDate?: string;
    search?: string;
    status?: 'active' | 'inactive' | 'frozen';
  }) {
    return api.get('/api/v1/admin/wallets', { params });
  },
  
  /**
   * Get wallet by ID
   */
  getWalletById(walletId: string) {
    return api.get(`/api/v1/admin/wallets/${walletId}`);
  },
  
  /**
   * Get recent wallets
   */
  getRecentWallets() {
    return api.get('/api/v1/admin/wallets/recent');
  },
};