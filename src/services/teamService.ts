import api from './api';

export default {
  invite(data: { email: string; roleId: string }) {
    return api.post('/api/v1/admin/team/invite', data);
  },
  resendInvite(data: { email: string }) {
    return api.post('/api/v1/admin/team/invite-resend', data);
  },
  setupTeamMember(data: { firstName: string; lastName: string; password: string }) {
    return api.put('/api/v1/admin/team/setup', data);
  },
  verifyInvite(token: string) {
    return api.get('/api/v1/admin/team/verify', { params: { token } });
  },
}; 