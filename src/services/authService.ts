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
}; 