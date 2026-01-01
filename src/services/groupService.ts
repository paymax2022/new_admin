// GroupService - API service for group and member management
import api from './api'

// Type definitions
export interface Group {
  id: string;
  name: string;
  description: string;
  website?: string;
  email?: string;
  phone?: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    zip_code: string;
  };
  visibility: 'public' | 'private';
  join_method: 'direct' | 'invite_only';
  invite_link: string;
  membership_fee: number;
  currency: string;
  payment_interval: string;
  created_by: string;
  is_active: boolean;
  total_members: number;
  active_members: number;
  settings: {
    require_approval: boolean;
    require_identity: boolean;
    allow_member_invites: boolean;
    allow_member_posts: boolean;
    require_post_approval: boolean;
    grace_period: number;
    max_default_payments: number;
    auto_suspend_overdue: boolean;
    auto_remind_days_before: number;
    enable_badges: boolean;
    enable_leaderboard: boolean;
    enable_ai_chat: boolean;
    max_file_size: number;
    allowed_file_types: string[];
  };
  theme: {
    primary_color: string;
    secondary_color: string;
    accent_color: string;
    background_image: string;
    font_family: string;
  };
  categories: string[];
  tags: string[];
  custom_fields: Record<string, any>;
  social_links: {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
    youtube: string;
  };
  created_at: string;
  updated_at: string;
  is_member: boolean;
}

export interface Member {
  id: string;
  user_id: string;
  email: string;
  member_number: string;
  role: string;
  joined_at: string;
  status: string;
}

export interface MemberProfile {
  id: string;
  user_id: string;
  activity_score: number;
  is_online: boolean;
  last_seen_at?: string;
  visibility: string;
}

export interface GroupStats {
  total_members: number;
  active_members: number;
  new_members_this_month: number;
  engagement_rate: number;
  monthly_revenue: number;
  overdue_payments: number;
}

export interface Post {
  id: string;
  group_id: string;
  user_id: string;
  content: string;
  post_type: string;
  is_pinned: boolean;
  created_at: string;
  updated_at: string;
}

export interface Event {
  id: string;
  group_id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  location: string;
  is_online: boolean;
  max_attendees: number;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface Resource {
  id: string;
  group_id: string;
  uploaded_by: string;
  name: string;
  description: string;
  category: string;
  type: string;
  file_type: string;
  mime_type: string;
  file_size: number;
  file_path: string;
  file_url: string;
  is_public: boolean;
  is_approved: boolean;
  tags: string[];
  access_level: string;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T> {
  ok: boolean;
  data: T;
  message: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
}

// GroupService class
class GroupService {
  // Use the working API service but override base URL for GPMS calls with token from localStorage
  private gpmsApi = {
    get: async (url: string, config?: any) => {
      const fullUrl = `https://all-in-one-w69p.onrender.com/api/v1/gpms${url}`;
      console.log('GPMS API GET:', fullUrl);
      const response = await api.get(fullUrl, config);
      return response.data;
    },
    post: async (url: string, data?: any, config?: any) => {
      const fullUrl = `https://all-in-one-w69p.onrender.com/api/v1/gpms${url}`;
      console.log('GPMS API POST:', fullUrl);
      const response = await api.post(fullUrl, data, config);
      return response.data;
    },
    put: async (url: string, data?: any, config?: any) => {
      const fullUrl = `https://all-in-one-w69p.onrender.com/api/v1/gpms${url}`;
      console.log('GPMS API PUT:', fullUrl);
      const response = await api.put(fullUrl, data, config);
      return response.data;
    },
    delete: async (url: string, config?: any) => {
      const fullUrl = `https://all-in-one-w69p.onrender.com/api/v1/gpms${url}`;
      console.log('GPMS API DELETE:', fullUrl);
      const response = await api.delete(fullUrl, config);
      return response.data;
    }
  };

  // Group Management
  async discoverGroups(params: { page?: number; limit?: number } = {}): Promise<ApiResponse<PaginatedResponse<Group>>> {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    
    const url = `/groups/discover${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return this.gpmsApi.get(url);
  }

  async createGroup(groupData: Partial<Group>): Promise<ApiResponse<Group>> {
    return this.gpmsApi.post('/groups', groupData);
  }

  async getGroup(groupId: string): Promise<ApiResponse<Group>> {
    return this.gpmsApi.get(`/groups/${groupId}`);
  }

  async updateGroup(groupId: string, updateData: Partial<Group>): Promise<ApiResponse<Group>> {
    return this.gpmsApi.put(`/groups/${groupId}`, updateData);
  }

  async deleteGroup(groupId: string): Promise<ApiResponse<any>> {
    return this.gpmsApi.delete(`/groups/${groupId}`);
  }

  // Member Management
  async searchMembers(groupId: string, params: { limit?: number; page?: number } = {}): Promise<ApiResponse<{ members: Member[] }>> {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    
    const url = `/groups/${groupId}/members${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return this.gpmsApi.get(url);
  }

  async getMemberDirectory(groupId: string): Promise<ApiResponse<{ profiles: MemberProfile[] }>> {
    return this.gpmsApi.get(`/groups/${groupId}/members/directory`);
  }

  async inviteMember(groupId: string, memberData: { email: string; first_name: string; last_name: string; role: string; custom_message?: string }): Promise<ApiResponse<any>> {
    return this.gpmsApi.post(`/groups/${groupId}/members/invite`, memberData);
  }

  async exportMembers(groupId: string, format: 'csv' | 'excel'): Promise<Blob> {
    const fullUrl = `https://all-in-one-w69p.onrender.com/api/v1/gpms/groups/${groupId}/members/export?format=${format}`;
    const response = await api.get(fullUrl, { responseType: 'blob' });
    return response.data;
  }

  // Group Statistics
  async getGroupStats(groupId: string): Promise<ApiResponse<GroupStats>> {
    return this.gpmsApi.get(`/groups/${groupId}/stats`);
  }

  // Activity Feed
  async getGroupFeed(groupId: string, params: { limit?: number } = {}): Promise<ApiResponse<{ posts: Post[] }>> {
    const queryParams = new URLSearchParams();
    if (params.limit) queryParams.append('limit', params.limit.toString());
    
    const url = `/groups/${groupId}/feed${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return this.gpmsApi.get(url);
  }

  // Events
  async listEvents(groupId: string, params: { limit?: number; page?: number } = {}): Promise<ApiResponse<PaginatedResponse<Event>>> {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    
    const url = `/groups/${groupId}/events${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return this.gpmsApi.get(url);
  }

  async createEvent(groupId: string, eventData: Partial<Event>): Promise<ApiResponse<Event>> {
    return this.gpmsApi.post(`/groups/${groupId}/events`, eventData);
  }

  // Resources
  async listResources(params: { group_id?: string; limit?: number; page?: number } = {}): Promise<ApiResponse<PaginatedResponse<Resource>>> {
    const queryParams = new URLSearchParams();
    if (params.group_id) queryParams.append('group_id', params.group_id);
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    
    const url = `/resources${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return this.gpmsApi.get(url);
  }

  async uploadResource(resourceData: Partial<Resource>): Promise<ApiResponse<Resource>> {
    return this.gpmsApi.post('/resources', resourceData);
  }

  // Billing and Payments
  async getBillingInfo(): Promise<ApiResponse<any>> {
    return this.gpmsApi.get('/billing/info');
  }

  async getBillingHistory(params: { limit?: number } = {}): Promise<ApiResponse<{ payments: any[] }>> {
    const queryParams = new URLSearchParams();
    if (params.limit) queryParams.append('limit', params.limit.toString());
    
    const url = `/billing/history${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return this.gpmsApi.get(url);
  }

  async makeCustomPayment(paymentData: any): Promise<ApiResponse<any>> {
    return this.gpmsApi.post('/billing/custom-payment', paymentData);
  }

  async getSubscriptionSettings(): Promise<ApiResponse<any>> {
    return this.gpmsApi.get('/subscription/settings');
  }

  // Polls and Surveys
  async listPolls(groupId: string, params: { limit?: number } = {}): Promise<ApiResponse<{ polls: any[] }>> {
    const queryParams = new URLSearchParams();
    if (params.limit) queryParams.append('limit', params.limit.toString());
    
    const url = `/groups/${groupId}/polls${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return this.gpmsApi.get(url);
  }

  async createPoll(groupId: string, pollData: any): Promise<ApiResponse<any>> {
    return this.gpmsApi.post(`/groups/${groupId}/polls`, pollData);
  }

  // Communications
  async sendAnnouncement(groupId: string, announcementData: any): Promise<ApiResponse<any>> {
    return this.gpmsApi.post(`/groups/${groupId}/announcements`, announcementData);
  }

  async getAnnouncements(groupId: string, params: { limit?: number } = {}): Promise<ApiResponse<{ announcements: any[] }>> {
    const queryParams = new URLSearchParams();
    if (params.limit) queryParams.append('limit', params.limit.toString());
    
    const url = `/groups/${groupId}/announcements${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return this.gpmsApi.get(url);
  }
}

// Export singleton instance
export const groupService = new GroupService();
export default groupService;









