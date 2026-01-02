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

  // ========== NEW ENDPOINTS FROM POSTMAN COLLECTION ==========

  // ========== CAMPAIGN MANAGEMENT (PUBLIC ENDPOINTS) ==========
  async createCampaign(campaignData: {
    title: string;
    description: string;
    goal_amount: number;
    category: string;
    end_date: string;
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
  }): Promise<ApiResponse<Campaign>> {
    const response = await api.post(`${BASE_PATH}/campaign`, campaignData);
    return response.data;
  }

  async getCampaignById(id: string): Promise<ApiResponse<Campaign>> {
    const response = await api.get(`${BASE_PATH}/campaign/${id}`);
    return response.data;
  }

  async listAllCampaignsPublic(params: {
    page?: number;
    limit?: number;
    status?: 'active' | 'completed' | 'cancelled' | 'pending';
    category?: string;
    sort?: 'created_at' | 'goal_amount' | 'current_amount';
  } = {}): Promise<ApiResponse<PaginatedResponse<Campaign>>> {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.status) queryParams.append('status', params.status);
    if (params.category) queryParams.append('category', params.category);
    if (params.sort) queryParams.append('sort', params.sort);

    const url = `${BASE_PATH}/campaign${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await api.get(url);
    return response.data;
  }

  async updateCampaign(id: string, campaignData: Partial<Campaign>): Promise<ApiResponse<Campaign>> {
    const response = await api.patch(`${BASE_PATH}/campaign/${id}`, campaignData);
    return response.data;
  }

  // ========== DONATIONS (PUBLIC ENDPOINTS) ==========
  async makeDonation(
    campaignId: string,
    donationData: {
      amount: number;
      payment_method: string;
      is_anonymous: boolean;
      message?: string;
      cover_fees?: boolean;
    }
  ): Promise<ApiResponse<Donation>> {
    const response = await api.post(`${BASE_PATH}/campaign/${campaignId}/donate`, donationData);
    return response.data;
  }

  // ========== REVIEWS (PUBLIC ENDPOINTS) ==========
  async createCampaignReview(
    campaignId: string,
    reviewData: {
      rating: number;
      comment: string;
      would_recommend: boolean;
    }
  ): Promise<ApiResponse<Review>> {
    const response = await api.post(`${BASE_PATH}/campaign/${campaignId}/review`, reviewData);
    return response.data;
  }

  // ========== FILE UPLOAD ==========
  async uploadCampaignFiles(files: File[], type: 'image' | 'document' | 'video'): Promise<ApiResponse<any>> {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });
    formData.append('type', type);

    const response = await api.post(`${BASE_PATH}/upload/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  // ========== ADMIN - NEW ENDPOINTS ==========
  async listCampaignCreators(params: {
    page?: number;
    limit?: number;
    search?: string;
    status?: 'ACTIVE' | 'BLOCKED' | 'PENDING';
  } = {}): Promise<ApiResponse<PaginatedResponse<any>>> {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.search) queryParams.append('search', params.search);
    if (params.status) queryParams.append('status', params.status);

    const url = `${BASE_PATH}/admin/campaign-creators${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await api.get(url);
    return response.data;
  }

  async getUserCampaignHistory(userId: string): Promise<ApiResponse<any>> {
    const response = await api.get(`${BASE_PATH}/admin/users/${userId}/campaign-history`);
    return response.data;
  }

  async getUserStatistics(): Promise<ApiResponse<any>> {
    const response = await api.get(`${BASE_PATH}/admin/user-statistics`);
    return response.data;
  }

  async getDonationStatistics(): Promise<ApiResponse<any>> {
    const response = await api.get(`${BASE_PATH}/admin/donation-statistics`);
    return response.data;
  }

  // Admin Users
  async listAdminUsers(params: {
    page?: number;
    limit?: number;
    search?: string;
    role?: string;
    status?: string;
  } = {}): Promise<ApiResponse<any>> {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.search) queryParams.append('search', params.search);
    if (params.role) queryParams.append('role', params.role);
    if (params.status) queryParams.append('status', params.status);

    // Use general admin users endpoint with role filter for admin
    const url = `/api/v1/admin/users${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await api.get(url);
    return response.data;
  }

  async getCrowdfundingTransactions(params: {
    user_id?: string;
    status?: 'SUCCESS' | 'PENDING' | 'FAILED' | 'SUCCESSFUL';
    currency?: string;
    from_date?: string;
    to_date?: string;
    page?: number;
    limit?: number;
  } = {}): Promise<ApiResponse<any>> {
    const queryParams = new URLSearchParams();
    if (params.user_id) queryParams.append('user_id', params.user_id);
    if (params.status) queryParams.append('status', params.status);
    if (params.currency) queryParams.append('currency', params.currency);
    if (params.from_date) queryParams.append('from_date', params.from_date);
    if (params.to_date) queryParams.append('to_date', params.to_date);
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());

    const url = `${BASE_PATH}/admin/transactions${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await api.get(url);
    // API returns { ok: true, data: [...], page, rows_per_page, total_count }
    // Map it to our expected format
    if (response.data && response.data.ok && Array.isArray(response.data.data)) {
      return {
        success: true,
        ok: true,
        data: response.data.data, // Return array directly
        page: response.data.page,
        rows_per_page: response.data.rows_per_page,
        total_count: response.data.total_count,
        pagination: {
          page: response.data.page || 1,
          limit: response.data.rows_per_page || 20,
          total: response.data.total_count || 0,
          total_pages: Math.ceil((response.data.total_count || 0) / (response.data.rows_per_page || 20)),
        },
      };
    }
    // If response already has success field, return as is
    if (response.data && response.data.success !== undefined) {
      return response.data;
    }
    // Fallback: wrap in success structure
    return {
      success: true,
      data: response.data?.data || response.data || [],
      ...response.data,
    };
  }
}

export default new CrowdfundingService();





