import api from './api';

const BASE_PATH = '/api/v1/election';

export interface ApiResponse<T> {
  ok?: boolean;
  success?: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  page?: number;
  rows_per_page?: number;
  limit?: number;
  total?: number;
  total_count?: number;
  total_pages?: number;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
}

// ========== ELECTION SERVICE ==========
class ElectionService {
  // ========== PUBLIC ELECTIONS ==========
  async getPublicElections(params: {
    page?: number;
    limit?: number;
    status?: 'upcoming' | 'active' | 'completed';
    type?: 'school' | 'estate' | 'group';
    institution_id?: string;
    search?: string;
  } = {}): Promise<ApiResponse<any[]>> {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.status) queryParams.append('status', params.status);
    if (params.type) queryParams.append('type', params.type);
    if (params.institution_id) queryParams.append('institution_id', params.institution_id);
    if (params.search) queryParams.append('search', params.search);

    const url = `${BASE_PATH}/elections/${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await api.get(url);
    return response.data;
  }

  async getElectionDetails(electionId: string): Promise<ApiResponse<any>> {
    const response = await api.get(`${BASE_PATH}/elections/${electionId}`);
    return response.data;
  }

  async getElectionCandidates(electionId: string): Promise<ApiResponse<any[]>> {
    const response = await api.get(`${BASE_PATH}/elections/${electionId}/candidates`);
    return response.data;
  }

  async getElectionResults(electionId: string): Promise<ApiResponse<any>> {
    const response = await api.get(`${BASE_PATH}/elections/${electionId}/results`);
    return response.data;
  }

  async getCandidateResults(electionId: string, candidateId: string): Promise<ApiResponse<any>> {
    const response = await api.get(`${BASE_PATH}/elections/${electionId}/results/candidate/${candidateId}`);
    return response.data;
  }

  async getElectionComplaints(electionId: string): Promise<ApiResponse<any[]>> {
    const response = await api.get(`${BASE_PATH}/elections/${electionId}/complaints`);
    return response.data;
  }

  // ========== INSTITUTIONS ==========
  async getSchools(): Promise<ApiResponse<any[]>> {
    const response = await api.get(`${BASE_PATH}/institutions/schools`);
    return response.data;
  }

  async getEstates(): Promise<ApiResponse<any[]>> {
    const response = await api.get(`${BASE_PATH}/institutions/estates`);
    return response.data;
  }

  async getGroups(): Promise<ApiResponse<any[]>> {
    const response = await api.get(`${BASE_PATH}/institutions/groups`);
    return response.data;
  }

  // ========== PARTICIPANT REGISTRATION ==========
  async verifyParticipant(electionId: string, verificationData: {
    student_id?: string;
    email?: string;
  }): Promise<ApiResponse<any>> {
    const response = await api.post(`${BASE_PATH}/elections/${electionId}/verify-participant`, {
      verification_data: verificationData,
    });
    return response.data;
  }

  async getAvailableRoles(electionId: string, participantId: string): Promise<ApiResponse<any>> {
    const response = await api.post(`${BASE_PATH}/elections/${electionId}/available-roles`, {
      participant_id: participantId,
    });
    return response.data;
  }

  async registerParticipant(electionId: string, data: {
    identifier: string;
    role: string;
  }): Promise<ApiResponse<any>> {
    const response = await api.post(`${BASE_PATH}/elections/${electionId}/register-participant`, data);
    return response.data;
  }

  // ========== CANDIDATE APPLICATION ==========
  async submitCandidateApplication(electionId: string, data: {
    identifier: string;
    position_id: string;
    bio: string;
    manifesto: string;
    experience?: string;
    achievements?: string[];
  }): Promise<ApiResponse<any>> {
    const response = await api.post(`${BASE_PATH}/elections/${electionId}/apply-candidate`, data);
    return response.data;
  }

  // ========== VOTING ==========
  async castVote(electionId: string, data: {
    position_id: string;
    candidate_id: string;
  }): Promise<ApiResponse<any>> {
    const response = await api.post(`${BASE_PATH}/elections/${electionId}/vote`, {
      election_id: electionId,
      ...data,
    });
    return response.data;
  }

  async getVoteHistory(electionId: string): Promise<ApiResponse<any[]>> {
    const response = await api.get(`${BASE_PATH}/elections/${electionId}/vote-history`);
    return response.data;
  }

  async verifyVote(electionId: string, voteId: string): Promise<ApiResponse<any>> {
    const response = await api.get(`${BASE_PATH}/elections/${electionId}/verify-vote?vote_id=${voteId}`);
    return response.data;
  }

  // ========== COMPLAINTS ==========
  async submitComplaint(electionId: string, data: FormData): Promise<ApiResponse<any>> {
    const response = await api.post(`${BASE_PATH}/elections/${electionId}/complaints`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  }

  async getMyComplaints(): Promise<ApiResponse<any[]>> {
    const response = await api.get(`${BASE_PATH}/elections/complaints/my`);
    return response.data;
  }

  async getComplaintDetails(complaintId: string): Promise<ApiResponse<any>> {
    const response = await api.get(`${BASE_PATH}/elections/complaints/${complaintId}`);
    return response.data;
  }

  // ========== NOTIFICATIONS ==========
  async listNotifications(): Promise<ApiResponse<any[]>> {
    const response = await api.get(`${BASE_PATH}/notifications/`);
    return response.data;
  }

  async getUnreadCount(): Promise<ApiResponse<number>> {
    const response = await api.get(`${BASE_PATH}/notifications/unread-count`);
    return response.data;
  }

  async markNotificationAsRead(notificationId: string): Promise<ApiResponse<any>> {
    const response = await api.put(`${BASE_PATH}/notifications/${notificationId}/read`);
    return response.data;
  }

  async markAllNotificationsAsRead(): Promise<ApiResponse<any>> {
    const response = await api.put(`${BASE_PATH}/notifications/read-all`);
    return response.data;
  }

  async deleteNotification(notificationId: string): Promise<ApiResponse<any>> {
    const response = await api.delete(`${BASE_PATH}/notifications/${notificationId}`);
    return response.data;
  }

  // ========== ADMIN - REGISTRATION ==========
  async registerElectionAdmin(data: {
    context_type: string;
    institution_id: string;
    name: string;
    email: string;
    phone: string;
    election_name: string;
  }): Promise<ApiResponse<any>> {
    const response = await api.post(`${BASE_PATH}/admin/register`, data);
    return response.data;
  }

  async getAllAdmins(): Promise<ApiResponse<any[]>> {
    const response = await api.get(`${BASE_PATH}/admin/admins`);
    return response.data;
  }

  async getAdminsByInstitution(institutionId: string): Promise<ApiResponse<any[]>> {
    const response = await api.get(`${BASE_PATH}/admin/admins/institution/${institutionId}`);
    return response.data;
  }

  async updateAdmin(adminId: string, data: {
    permissions?: string[];
  }): Promise<ApiResponse<any>> {
    const response = await api.put(`${BASE_PATH}/admin/admins/${adminId}`, data);
    return response.data;
  }

  async deactivateAdmin(adminId: string): Promise<ApiResponse<any>> {
    const response = await api.delete(`${BASE_PATH}/admin/admins/${adminId}`);
    return response.data;
  }

  // ========== ADMIN - ELECTION MANAGEMENT ==========
  async createElection(data: {
    title: string;
    description: string;
    type: 'school' | 'estate' | 'group';
    institution_id: string;
    institution_name: string;
    start_date: string;
    end_date: string;
    settings?: {
      is_public?: boolean;
      allow_vote_changes?: boolean;
    };
    positions: Array<{
      name: string;
      description: string;
      max_candidates?: number;
      order: number;
    }>;
    eligibility_rules?: any;
  }): Promise<ApiResponse<any>> {
    const response = await api.post(`${BASE_PATH}/admin/elections/`, data);
    return response.data;
  }

  async getAllElectionsAdmin(params: {
    page?: number;
    limit?: number;
    status?: string;
    type?: string;
    institution_id?: string;
  } = {}): Promise<ApiResponse<any[]>> {
    // Use axios params instead of manual query string construction
    // This ensures proper encoding and header attachment
    const requestParams: Record<string, string> = {};
    if (params.page) requestParams.page = params.page.toString();
    if (params.limit) requestParams.limit = params.limit.toString();
    if (params.status) requestParams.status = params.status;
    if (params.type) requestParams.type = params.type;
    if (params.institution_id) requestParams.institution_id = params.institution_id;

    // Debug: Verify token exists before request
    const token = localStorage.getItem('token');
    if (process.env.NODE_ENV === 'development') {
      console.log('[ElectionService] getAllElectionsAdmin - Token check:', {
        hasToken: !!token,
        tokenLength: token?.length || 0,
        tokenStart: token?.substring(0, 20) || 'none',
        params: requestParams,
      });
    }

    try {
      const response = await api.get(`${BASE_PATH}/admin/elections`, {
        params: requestParams,
      });
      return response.data;
    } catch (error: any) {
      // Handle 301 redirect - might need to follow redirect or use different URL
      if (error?.response?.status === 301 || error?.code === 'ERR_FAILED') {
        console.error('[ElectionService] getAllElectionsAdmin - Redirect or CORS error', {
          url: `${BASE_PATH}/admin/elections`,
          params: requestParams,
          tokenInStorage: !!token,
          errorMessage: error?.message,
          responseStatus: error?.response?.status,
        });
        
        // If it's a network error (CORS), provide helpful message
        if (error?.message === 'Network Error' || error?.code === 'ERR_NETWORK') {
          const errorMsg = new Error('CORS error: Backend server must allow requests from http://localhost:5173. This is a server configuration issue.');
          (errorMsg as any).isCorsError = true;
          throw errorMsg;
        }
      }
      
      if (error?.response?.status === 401) {
        console.error('[ElectionService] getAllElectionsAdmin - 401 Unauthorized', {
          url: `${BASE_PATH}/admin/elections`,
          params: requestParams,
          tokenInStorage: !!token,
          responseData: error?.response?.data,
        });
      }
      throw error;
    }
  }

  async getElectionDetailsAdmin(electionId: string): Promise<ApiResponse<any>> {
    const response = await api.get(`${BASE_PATH}/admin/elections/${electionId}`);
    return response.data;
  }

  async updateElection(electionId: string, data: {
    title?: string;
    description?: string;
    start_date?: string;
    end_date?: string;
    settings?: any;
  }): Promise<ApiResponse<any>> {
    const response = await api.put(`${BASE_PATH}/admin/elections/${electionId}`, data);
    return response.data;
  }

  async deleteElection(electionId: string): Promise<ApiResponse<any>> {
    const response = await api.delete(`${BASE_PATH}/admin/elections/${electionId}`);
    return response.data;
  }

  async updateElectionStatus(electionId: string, status: 'draft' | 'upcoming' | 'active' | 'completed' | 'paused'): Promise<ApiResponse<any>> {
    const response = await api.put(`${BASE_PATH}/admin/elections/${electionId}/status`, { status });
    return response.data;
  }

  async uploadElectionLogo(electionId: string, logo: File): Promise<ApiResponse<any>> {
    const formData = new FormData();
    formData.append('logo', logo);
    const response = await api.post(`${BASE_PATH}/admin/elections/${electionId}/upload-logo`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  }

  // ========== ADMIN - CANDIDATE APPLICATIONS ==========
  async getApplicationsByElection(electionId: string, params?: {
    status?: string;
    page?: number;
    limit?: number;
  }): Promise<ApiResponse<any[]>> {
    const queryParams = new URLSearchParams();
    if (params?.status) queryParams.append('status', params.status);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    
    const query = queryParams.toString();
    const response = await api.get(`${BASE_PATH}/admin/elections/${electionId}/applications${query ? `?${query}` : ''}`);
    return response.data;
  }

  async getApplicationDetails(electionId: string, applicationId: string): Promise<ApiResponse<any>> {
    const response = await api.get(`${BASE_PATH}/admin/elections/${electionId}/applications/${applicationId}`);
    return response.data;
  }

  async reviewApplication(electionId: string, applicationId: string, data: {
    status: 'approved' | 'rejected' | 'in_review';
    admin_notes?: string;
  }): Promise<ApiResponse<any>> {
    const response = await api.put(`${BASE_PATH}/admin/elections/${electionId}/applications/${applicationId}/review`, data);
    return response.data;
  }

  // ========== ADMIN - ANALYTICS ==========
  async getElectionAnalytics(electionId: string): Promise<ApiResponse<any>> {
    const response = await api.get(`${BASE_PATH}/admin/elections/${electionId}/analytics`);
    return response.data;
  }

  async getElectionActivities(electionId: string): Promise<ApiResponse<any[]>> {
    const response = await api.get(`${BASE_PATH}/admin/elections/${electionId}/activities`);
    return response.data;
  }

  async getElectionParticipants(electionId: string): Promise<ApiResponse<any[]>> {
    const response = await api.get(`${BASE_PATH}/admin/elections/${electionId}/participants`);
    return response.data;
  }

  // ========== ADMIN - MANUAL REGISTRATION ==========
  async manualVoterRegistration(electionId: string, data: {
    identifier: string;
    email: string;
    full_name: string;
    phone: string;
    reason: string;
  }): Promise<ApiResponse<any>> {
    const response = await api.post(`${BASE_PATH}/admin/elections/${electionId}/register-voter`, data);
    return response.data;
  }

  async manualCandidateRegistration(electionId: string, data: {
    identifier: string;
    email: string;
    full_name: string;
    phone: string;
    reason: string;
  }): Promise<ApiResponse<any>> {
    const response = await api.post(`${BASE_PATH}/admin/elections/${electionId}/register-candidate`, data);
    return response.data;
  }

  // ========== ADMIN - COMPLAINT MANAGEMENT ==========
  async getAllComplaintsAdmin(electionId: string, params?: {
    status?: string;
    page?: number;
    limit?: number;
  }): Promise<ApiResponse<any[]>> {
    const queryParams = new URLSearchParams();
    if (params?.status) queryParams.append('status', params.status);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    
    const query = queryParams.toString();
    const response = await api.get(`${BASE_PATH}/admin/elections/${electionId}/complaints${query ? `?${query}` : ''}`);
    return response.data;
  }

  async getComplaintDetailsAdmin(complaintId: string): Promise<ApiResponse<any>> {
    const response = await api.get(`${BASE_PATH}/election/elections/complaints/${complaintId}`);
    return response.data;
  }

  async updateComplaintStatus(complaintId: string, status: 'pending' | 'in_review' | 'resolved' | 'closed'): Promise<ApiResponse<any>> {
    const response = await api.put(`${BASE_PATH}/admin/complaints/${complaintId}/status`, { status });
    return response.data;
  }

  async resolveComplaint(complaintId: string, data: {
    admin_response: string;
    resolution: string;
  }): Promise<ApiResponse<any>> {
    const response = await api.put(`${BASE_PATH}/admin/complaints/${complaintId}/resolve`, data);
    return response.data;
  }

  async closeComplaint(complaintId: string, data: {
    closing_notes: string;
  }): Promise<ApiResponse<any>> {
    const response = await api.put(`${BASE_PATH}/admin/complaints/${complaintId}/close`, data);
    return response.data;
  }

  // ========== ADMIN - MONITORING ==========
  async getElectionMetrics(electionId: string): Promise<ApiResponse<any>> {
    const response = await api.get(`${BASE_PATH}/admin/elections/${electionId}/monitoring/metrics`);
    return response.data;
  }

  async getVotingTimeAnalysis(electionId: string): Promise<ApiResponse<any>> {
    const response = await api.get(`${BASE_PATH}/admin/elections/${electionId}/monitoring/voting-analysis`);
    return response.data;
  }

  async getPositionBreakdown(electionId: string): Promise<ApiResponse<any>> {
    const response = await api.get(`${BASE_PATH}/admin/elections/${electionId}/monitoring/position-breakdown`);
    return response.data;
  }

  async getVotingTrends(electionId: string): Promise<ApiResponse<any>> {
    const response = await api.get(`${BASE_PATH}/admin/elections/${electionId}/monitoring/voting-trends`);
    return response.data;
  }

  async getElectionInsights(electionId: string): Promise<ApiResponse<any>> {
    const response = await api.get(`${BASE_PATH}/admin/elections/${electionId}/monitoring/insights`);
    return response.data;
  }

  async getCompleteMonitoring(electionId: string): Promise<ApiResponse<any>> {
    const response = await api.get(`${BASE_PATH}/admin/elections/${electionId}/monitoring/complete`);
    return response.data;
  }

  // ========== ADMIN - ACTIVITY FEED ==========
  async getActivityStream(electionId: string, params?: {
    limit?: number;
    offset?: number;
    include_names?: boolean;
    anonymize?: boolean;
  }): Promise<ApiResponse<any[]>> {
    const queryParams = new URLSearchParams();
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.offset) queryParams.append('offset', params.offset.toString());
    if (params?.include_names !== undefined) queryParams.append('include_names', params.include_names.toString());
    if (params?.anonymize !== undefined) queryParams.append('anonymize', params.anonymize.toString());
    
    const query = queryParams.toString();
    const response = await api.get(`${BASE_PATH}/admin/elections/${electionId}/feed/events${query ? `?${query}` : ''}`);
    return response.data;
  }

  async getLiveActivities(electionId: string, params?: {
    limit?: number;
    include_names?: boolean;
  }): Promise<ApiResponse<any[]>> {
    const queryParams = new URLSearchParams();
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.include_names !== undefined) queryParams.append('include_names', params.include_names.toString());
    
    const query = queryParams.toString();
    const response = await api.get(`${BASE_PATH}/admin/elections/${electionId}/feed/live${query ? `?${query}` : ''}`);
    return response.data;
  }

  async getVotingVelocity(electionId: string): Promise<ApiResponse<any>> {
    const response = await api.get(`${BASE_PATH}/admin/elections/${electionId}/feed/velocity`);
    return response.data;
  }

  async getTurnoutGrowth(electionId: string, hours: number = 24): Promise<ApiResponse<any>> {
    const response = await api.get(`${BASE_PATH}/admin/elections/${electionId}/feed/turnout-growth?hours=${hours}`);
    return response.data;
  }

  async getHourlyPattern(electionId: string): Promise<ApiResponse<any>> {
    const response = await api.get(`${BASE_PATH}/admin/elections/${electionId}/feed/hourly-pattern`);
    return response.data;
  }

  async getRealTimeStats(electionId: string): Promise<ApiResponse<any>> {
    const response = await api.get(`${BASE_PATH}/admin/elections/${electionId}/feed/stats`);
    return response.data;
  }

  // ========== ADMIN - DIRECTORY ==========
  async getSchoolDirectory(electionId: string, params?: {
    department?: string;
    level?: string;
    fee_status?: string;
    eligibility_status?: string;
    limit?: number;
    offset?: number;
  }): Promise<ApiResponse<any[]>> {
    const queryParams = new URLSearchParams();
    if (params?.department) queryParams.append('department', params.department);
    if (params?.level) queryParams.append('level', params.level);
    if (params?.fee_status) queryParams.append('fee_status', params.fee_status);
    if (params?.eligibility_status) queryParams.append('eligibility_status', params.eligibility_status);
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.offset) queryParams.append('offset', params.offset.toString());
    
    const query = queryParams.toString();
    const response = await api.get(`${BASE_PATH}/admin/elections/${electionId}/directory/school${query ? `?${query}` : ''}`);
    return response.data;
  }

  async getEstateDirectory(electionId: string, params?: {
    block?: string;
    house_type?: string;
    dues_status?: string;
    eligibility_status?: string;
    limit?: number;
    offset?: number;
  }): Promise<ApiResponse<any[]>> {
    const queryParams = new URLSearchParams();
    if (params?.block) queryParams.append('block', params.block);
    if (params?.house_type) queryParams.append('house_type', params.house_type);
    if (params?.dues_status) queryParams.append('dues_status', params.dues_status);
    if (params?.eligibility_status) queryParams.append('eligibility_status', params.eligibility_status);
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.offset) queryParams.append('offset', params.offset.toString());
    
    const query = queryParams.toString();
    const response = await api.get(`${BASE_PATH}/admin/elections/${electionId}/directory/estate${query ? `?${query}` : ''}`);
    return response.data;
  }

  async getGroupDirectory(electionId: string, params?: {
    membership_type?: string;
    zone?: string;
    dues_status?: string;
    eligibility_status?: string;
    limit?: number;
    offset?: number;
  }): Promise<ApiResponse<any[]>> {
    const queryParams = new URLSearchParams();
    if (params?.membership_type) queryParams.append('membership_type', params.membership_type);
    if (params?.zone) queryParams.append('zone', params.zone);
    if (params?.dues_status) queryParams.append('dues_status', params.dues_status);
    if (params?.eligibility_status) queryParams.append('eligibility_status', params.eligibility_status);
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.offset) queryParams.append('offset', params.offset.toString());
    
    const query = queryParams.toString();
    const response = await api.get(`${BASE_PATH}/admin/elections/${electionId}/directory/group${query ? `?${query}` : ''}`);
    return response.data;
  }

  async getParticipantProfile(electionId: string, participantId: string): Promise<ApiResponse<any>> {
    const response = await api.get(`${BASE_PATH}/admin/elections/${electionId}/directory/participant/${participantId}`);
    return response.data;
  }

  async updateParticipantEligibility(electionId: string, participantId: string, data: {
    is_eligible: boolean;
    reason: string;
  }): Promise<ApiResponse<any>> {
    const response = await api.put(`${BASE_PATH}/admin/elections/${electionId}/directory/participant/${participantId}/eligibility`, data);
    return response.data;
  }

  async flagParticipant(electionId: string, participantId: string, data: {
    flag: string;
    reason: string;
  }): Promise<ApiResponse<any>> {
    const response = await api.post(`${BASE_PATH}/admin/elections/${electionId}/directory/participant/${participantId}/flag`, data);
    return response.data;
  }

  // ========== ADMIN - RESULTS ==========
  async getElectionResultsAdmin(electionId: string): Promise<ApiResponse<any>> {
    const response = await api.get(`${BASE_PATH}/admin/elections/${electionId}/results`);
    return response.data;
  }

  async getDemographicAnalysis(electionId: string): Promise<ApiResponse<any>> {
    const response = await api.get(`${BASE_PATH}/admin/elections/${electionId}/results/demographics`);
    return response.data;
  }

  async getTrendAnalysis(electionId: string): Promise<ApiResponse<any>> {
    const response = await api.get(`${BASE_PATH}/admin/elections/${electionId}/results/trends`);
    return response.data;
  }

  async getHistoricalComparison(electionId: string): Promise<ApiResponse<any>> {
    const response = await api.get(`${BASE_PATH}/admin/elections/${electionId}/results/comparison`);
    return response.data;
  }

  async exportResults(electionId: string, format: 'pdf' | 'excel' | 'csv' = 'pdf'): Promise<Blob> {
    const response = await api.get(`${BASE_PATH}/admin/elections/${electionId}/results/export?format=${format}`, {
      responseType: 'blob',
    });
    return response.data;
  }

  // ========== ADMIN - DASHBOARD ==========
  async getDashboardStats(): Promise<ApiResponse<any>> {
    const response = await api.get(`${BASE_PATH}/admin/dashboard/stats`);
    return response.data;
  }

  async getActiveElections(limit: number = 10): Promise<ApiResponse<any[]>> {
    const response = await api.get(`${BASE_PATH}/admin/dashboard/elections/active?limit=${limit}`);
    return response.data;
  }

  async getRecentActivities(): Promise<ApiResponse<any[]>> {
    const response = await api.get(`${BASE_PATH}/admin/dashboard/activities/recent`);
    return response.data;
  }

  async getElectionOverview(electionId: string): Promise<ApiResponse<any>> {
    const response = await api.get(`${BASE_PATH}/admin/dashboard/elections/${electionId}/overview`);
    return response.data;
  }

  // ========== ADMIN - VOTER ELIGIBILITY ==========
  async getVotersWithEligibility(electionId: string, params?: {
    eligibility_status?: string;
    search?: string;
    limit?: number;
    offset?: number;
  }): Promise<ApiResponse<any[]>> {
    const queryParams = new URLSearchParams();
    if (params?.eligibility_status) queryParams.append('eligibility_status', params.eligibility_status);
    if (params?.search) queryParams.append('search', params.search);
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.offset) queryParams.append('offset', params.offset.toString());
    
    const query = queryParams.toString();
    const response = await api.get(`${BASE_PATH}/admin/elections/${electionId}/voters${query ? `?${query}` : ''}`);
    return response.data;
  }

  async bulkUpdateEligibility(electionId: string, data: {
    participant_ids: string[];
    is_eligible: boolean;
    reason: string;
  }): Promise<ApiResponse<any>> {
    const response = await api.put(`${BASE_PATH}/admin/elections/${electionId}/eligibility/bulk`, data);
    return response.data;
  }

  async runEligibilityChecks(electionId: string): Promise<ApiResponse<any>> {
    const response = await api.post(`${BASE_PATH}/admin/elections/${electionId}/eligibility/run-checks`, {});
    return response.data;
  }
}

export default new ElectionService();

