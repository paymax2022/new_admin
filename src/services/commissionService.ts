import api from './api';

export default {
  getCommissionSetting(merchantId: string) {
    return api.get(`/api/v1/referrals/admin/commissions/settings/${merchantId}`);
  },
  getCommissionSettings(params?: {
    page?: number;
    limit?: number;
    sort?: 'asc' | 'desc';
    start_date?: string;
    end_date?: string;
  }) {
    return api.get('/api/v1/referrals/admin/commissions/settings', { params });
  },
  getCommissions(params?: {
    page?: number;
    limit?: number;
    start_date?: string;
    end_date?: string;
    sort?: 'asc' | 'desc';
    user_id?: string;
    transaction_id?: string;
    status?: string;
    settlement_status?: string;
  }) {
    return api.get('/api/v1/referrals/admin/commissions', { params });
  },
  updateCommissionSettings(data: {
    commissionID: string;
    admin_percentage?: number;
    referrer_percentage?: number;
    partner_percentage?: number;
    developer_percentage?: number;
    agent_percentage?: number;
    commission_percentage?: number;
  }) {
    return api.put('/api/v1/referrals/admin/commissions/update', data);
  },
  singleCommissionPayout(data: {
    commissionID: string;
  }) {
    return api.post('/api/v1/referrals/admin/commissions/pay', data);
  },
  bulkCommissionPayout(data: {
    commission_ids: string[];
  }) {
    return api.post('/api/v1/referrals/admin/commissions/pay/bulk', data);
  },
}; 