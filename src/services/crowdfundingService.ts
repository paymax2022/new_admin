import api from './api';

const BASE_PATH = '/api/v1/crowdfunding';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
}

// Campaign Types
export interface Campaign {
  id: string;
  title: string;
  description: string;
  goal_amount: number;
  current_amount: number;
  category: string;
  status: 'active' | 'completed' | 'cancelled' | 'pending' | 'approved' | 'rejected' | 'suspended';
  end_date: string;
  created_at: string;
  updated_at: string;
  images?: string[];
  video_url?: string;
  location?: {
    city: string;
    state: string;
    country: string;
  };
  beneficiary_info?: {
    name: string;
    contact: string;
  };
  owner?: {
    id: string;
    name: string;
    email: string;
  };
  verified?: boolean;
}

export interface CampaignActivity {
  id: string;
  type: string;
  description: string;
  amount?: number;
  created_at: string;
}

export interface Donation {
  id: string;
  campaign_id: string;
  donor_name: string;
  donor_email?: string;
  amount: number;
  payment_method: string;
  is_anonymous: boolean;
  message?: string;
  created_at: string;
  status: string;
}

export interface Review {
  id: string;
  campaign_id: string;
  user_name: string;
  rating: number;
  comment: string;
  would_recommend: boolean;
  created_at: string;
}

export interface BoostRate {
  duration_days: number;
  boost_type: string;
  price: number;
}

export interface Statistics {
  total_campaigns: number;
  active_campaigns: number;
  completed_campaigns: number;
  total_donations: number;
  total_amount_raised: number;
  pending_approvals: number;
  active_users: number;
  period?: string;
}

// Crowdfunding Service
class CrowdfundingService {
  // Admin - Campaign Management
  async listAllCampaigns(params: {
    page?: number;
    limit?: number;
    status?: 'all' | 'active' | 'pending' | 'approved' | 'rejected' | 'suspended';
    sort?: 'created_at' | 'goal_amount' | 'current_amount';
  } = {}): Promise<ApiResponse<PaginatedResponse<Campaign>>> {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.status) queryParams.append('status', params.status);
    if (params.sort) queryParams.append('sort', params.sort);

    const url = `${BASE_PATH}/admin/campaigns${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await api.get(url);
    return response.data;
  }

  async getCampaignDetails(id: string): Promise<ApiResponse<Campaign>> {
    const response = await api.get(`${BASE_PATH}/admin/campaigns/${id}`);
    return response.data;
  }

  async updateCampaignStatus(
    id: string,
    data: {
      status: 'approved' | 'rejected' | 'suspended';
      reason?: string;
      notes?: string;
    }
  ): Promise<ApiResponse<Campaign>> {
    const response = await api.patch(`${BASE_PATH}/admin/campaigns/${id}/status`, data);
    return response.data;
  }

  async deleteCampaign(id: string, reason?: string): Promise<ApiResponse<void>> {
    const queryParams = reason ? `?reason=${encodeURIComponent(reason)}` : '';
    const response = await api.delete(`${BASE_PATH}/admin/campaigns/${id}${queryParams}`);
    return response.data;
  }

  // Campaign Activity & Details
  async getCampaignActivity(id: string): Promise<ApiResponse<CampaignActivity[]>> {
    const response = await api.get(`${BASE_PATH}/campaign/${id}/activity`);
    return response.data;
  }

  async getCampaignDonations(
    id: string,
    params: { page?: number; limit?: number } = {}
  ): Promise<ApiResponse<PaginatedResponse<Donation>>> {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());

    const url = `${BASE_PATH}/campaign/${id}/donations${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await api.get(url);
    return response.data;
  }

  async getCampaignReviews(
    id: string,
    params: { page?: number; limit?: number; sort?: 'rating' | 'created_at' } = {}
  ): Promise<ApiResponse<PaginatedResponse<Review>>> {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.sort) queryParams.append('sort', params.sort);

    const url = `${BASE_PATH}/campaign/${id}/reviews${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await api.get(url);
    return response.data;
  }

  // Admin - Donations
  async listAllDonations(params: {
    page?: number;
    limit?: number;
    from_date?: string;
    to_date?: string;
  } = {}): Promise<ApiResponse<PaginatedResponse<Donation>>> {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.from_date) queryParams.append('from_date', params.from_date);
    if (params.to_date) queryParams.append('to_date', params.to_date);

    const url = `${BASE_PATH}/admin/donations${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await api.get(url);
    return response.data;
  }

  // Admin - Statistics
  async getStatistics(params: {
    period?: 'daily' | 'weekly' | 'monthly' | 'yearly';
    year?: string;
  } = {}): Promise<ApiResponse<Statistics>> {
    const queryParams = new URLSearchParams();
    if (params.period) queryParams.append('period', params.period);
    if (params.year) queryParams.append('year', params.year);

    const url = `${BASE_PATH}/admin/statistics${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await api.get(url);
    return response.data;
  }

  // Admin - Reviews
  async listAllReviews(params: {
    page?: number;
    limit?: number;
    rating?: 'all' | '1' | '2' | '3' | '4' | '5';
  } = {}): Promise<ApiResponse<PaginatedResponse<Review>>> {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.rating) queryParams.append('rating', params.rating);

    const url = `${BASE_PATH}/admin/reviews${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await api.get(url);
    return response.data;
  }

  // Campaign Boost
  async getBoostRates(): Promise<ApiResponse<BoostRate[]>> {
    const response = await api.get(`${BASE_PATH}/campaign/boost/rates`);
    return response.data;
  }

  async boostCampaign(
    id: string,
    data: {
      duration_days: number;
      boost_type: string;
      payment_method: string;
    }
  ): Promise<ApiResponse<any>> {
    const response = await api.post(`${BASE_PATH}/campaign/${id}/boost`, data);
    return response.data;
  }
}

export default new CrowdfundingService();





