import api from './api';

export default {
  login(data: { email: string; password: string }) {
    return api.post('/api/v1/admin/auth/login', data);
  },
  forgotPassword(data: { email: string }) {
    return api.post('/api/v1/admin/auth/forgot-password', data);
  },
  checkOtp(data: { email: string; otp: string; purpose?: string }) {
    return api.post('/api/v1/admin/auth/otp/check', data);
  },
  sendOtp(data: { email: string; purpose?: string }) {
    return api.post('/api/v1/admin/auth/otp/email', data);
  },
  resetPassword(data: { email: string; otp: string; newPassword: string }) {
    return api.post('/api/v1/admin/auth/reset-password', data);
  },
  // New APIs from the JSON specification
  updateAdmin(data: any) {
    return api.put('/api/v1/admin/auth/update', data);
  },
  getAdminProfile() {
    return api.get('/api/v1/admin/auth/profile');
  },
  verify2faLogin(data: { email: string; otp: string }) {
    return api.post('/api/v1/admin/auth/2fa/verify', data);
  },
  getCurrentAdmin() {
    return api.get('/api/v1/admin/me');
  },
  updateProfile(data: {
    first_name?: string;
    last_name?: string;
    email?: string;
  }) {
    return api.put('/api/v1/admin/users/update', data);
  },
}; 