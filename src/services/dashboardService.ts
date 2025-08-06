import api from './api';

export default {
  getDashboard() {
    return api.get('/api/v1/admin/dashboard');
  },
  getSchoolPerMonth(params?: {
    year?: string;
    month?: string;
  }) {
    return api.get('/api/v1/admin/school/per-month', { params });
  },
  getMonthlyRevenue(params?: {
    year?: string;
    month?: string;
  }) {
    return api.get('/api/v1/admin/school/monthly-revenue', { params });
  },
}; 