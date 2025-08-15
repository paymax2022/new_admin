import api from './api';
import { safeDecodeUser, transformAllBooleanFields } from '@/utils/dataTransformers';

export default {
  createUser(data: {
    email: string;
    firstname: string;
    lastname: string;
    phonenumber: string;
    role: 'CUSTOMER' | 'AGENT' | 'PARTNER' | 'DEVELOPER' | 'MERCHANT';
  }) {
    return api.post('/api/v1/admin/users/add', data);
  },
  
  deleteUser(userId: string) {
    return api.delete(`/api/v1/admin/users/${userId}`);
  },
  
  getUserRegistrations(params?: {
    year?: string;
    status?: 'ACTIVE' | 'INACTIVE' | 'BLOCKED' | 'UNVERIFIED' | 'PENDING' | 'DEACTIVATED';
  }) {
    return api.get('/api/v1/admin/users/registrations', { params });
  },
  
  getUserById(userId: string) {
    return api.get(`/api/v1/admin/users/${userId}`).then(response => {
      // Safely decode user data to handle boolean field issues
      if (response.data && response.data.data) {
        response.data.data = safeDecodeUser(response.data.data);
      }
      return response;
    });
  },
  
  countUsersByYearAndStatus(params: {
    year: string;
    status: 'BLOCKED' | 'UNVERIFIED' | 'ACTIVE' | 'PENDING' | 'DEACTIVATED';
  }) {
    return api.get('/api/v1/admin/users/count', { params });
  },
  
  updateUser(data: {
    firstname?: string;
    lastname?: string;
    use2fa?: boolean;
    userId?: string;
    status?: string;
    role?: string;
  }) {
    return api.put('/api/v1/admin/users/customer/update', data);
  },
  
  getUsers(params?: {
    page?: number;
    limit?: number;
    search?: string;
    sort?: 'asc' | 'desc';
    status?: 'BLOCKED' | 'UNVERIFIED' | 'ACTIVE' | 'DEACTIVATED' | 'PENDING';
    startDate?: string;
    endDate?: string;
    role?: 'SYSTEM_ADMIN' | 'USER' | 'ADMIN';
    userType?: 'CUSTOMER' | 'MERCHANT' | 'DEVELOPER' | 'AGENT' | 'PARTNER' | 'HEALTHCARE' | 'AGRICULTURE' | 'EDUCATION' | 'REAL ESTATE' | 'RESTAURANTS' | 'LOGISTICS' | 'TRANSPORTATION' | 'EVENTS' | 'ADMIN' | 'SYS_ADMIN' | 'CONTEST';
  }) {
    // Ensure page and limit are always provided with defaults
    const finalParams = {
      page: 1,
      limit: 10,
      ...params,
      // Force numeric types for pagination parameters
      page: params?.page ? Number(params.page) : 1,
      limit: params?.limit ? Number(params.limit) : 10
    };
    
    console.log('Fetching users with params:', finalParams);
    return api.get('/api/v1/admin/users', { params: finalParams }).then(response => {
      // Safely decode user data to handle boolean field issues
      if (response.data && response.data.data && Array.isArray(response.data.data)) {
        response.data.data = response.data.data.map(user => safeDecodeUser(user));
      }
      return response;
    });
  },
  
  // Referral-related methods
  getUserReferrals(userId: string) {
    return api.get(`/api/v1/referrals/admin/users/${userId}`).then(response => {
      // Safely decode referral data
      if (response.data && response.data.data) {
        response.data.data = transformAllBooleanFields(response.data.data);
      }
      return response;
    });
  },

  getUserReferralSummary(userId: string) {
    return api.get(`/api/v1/referrals/admin/summary/${userId}`).then(response => {
      // Safely decode summary data
      if (response.data && response.data.data) {
        response.data.data = transformAllBooleanFields(response.data.data);
      }
      return response;
    });
  },
  
  getUserCount(params?: {
    year?: string;
    status?: 'BLOCKED' | 'UNVERIFIED' | 'ACTIVE' | 'PENDING' | 'DEACTIVATED';
  }) {
    // Default to current year and ACTIVE status if not provided
    const defaultParams = {
      year: new Date().getFullYear().toString(),
      status: 'ACTIVE'
    };
    return api.get('/api/v1/admin/users/count', { params: { ...defaultParams, ...params } });
  },
};