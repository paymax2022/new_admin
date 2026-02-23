import api from './api';

const BASE_PATH = '/api/v1/admin/school';

export interface ApiResponse<T> {
  ok?: boolean;
  success?: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  page?: number;
  limit?: number;
  total?: number;
  total_pages?: number;
}

// School interfaces
export interface School {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  type?: string;
  status?: string;
  director_name?: string;
  registration_date?: string;
  location?: string;
  students?: number;
  [key: string]: any;
}

export interface SchoolUser {
  id?: string;
  user_id?: string;
  name?: string;
  email?: string;
  phone?: string;
  role?: string;
  status?: string;
  created_at?: string;
  [key: string]: any;
}

export interface SchoolDashboard {
  total_schools?: number;
  total_users?: number;
  total_transactions?: number;
  total_revenue?: number;
  active_schools?: number;
  new_schools_this_week?: number;
  [key: string]: any;
}

export interface MonthlyCount {
  month?: string;
  count?: number;
  [key: string]: any;
}

export interface MonthlyRevenue {
  month?: string;
  revenue?: number;
  [key: string]: any;
}

// School Service class
class SchoolService {
  // Get school dashboard data
  async getDashboard(): Promise<ApiResponse<SchoolDashboard>> {
    const response = await api.get(`${BASE_PATH}/dashboard`);
    return response.data;
  }

  // Get monthly school count
  async getMonthlyCount(params: { year?: string } = {}): Promise<ApiResponse<MonthlyCount[]>> {
    const queryParams = new URLSearchParams();
    if (params.year) queryParams.append('year', params.year);
    
    const url = `${BASE_PATH}/monthly-count${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await api.get(url);
    return response.data;
  }

  // Get monthly revenue
  async getMonthlyRevenue(params: { year?: string } = {}): Promise<ApiResponse<MonthlyRevenue[]>> {
    const queryParams = new URLSearchParams();
    if (params.year) queryParams.append('year', params.year);
    
    const url = `${BASE_PATH}/revenue${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await api.get(url);
    return response.data;
  }

  // Get school users (staff)
  async getSchoolUsers(params: {
    start_date?: string;
    end_date?: string;
    user_id?: string;
    search?: string;
    sort?: string;
    limit?: number;
    page?: number;
    status?: string;
  } = {}): Promise<ApiResponse<PaginatedResponse<SchoolUser>>> {
    const queryParams = new URLSearchParams();
    if (params.start_date) queryParams.append('start_date', params.start_date);
    if (params.end_date) queryParams.append('end_date', params.end_date);
    if (params.user_id) queryParams.append('user_id', params.user_id);
    if (params.search) queryParams.append('search', params.search);
    if (params.sort) queryParams.append('sort', params.sort);
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.status) queryParams.append('status', params.status);
    
    const url = `/api/v1/admin/school-users${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await api.get(url);
    return response.data;
  }

  // Get all schools
  async getSchools(params: {
    start_date?: string;
    end_date?: string;
    user_id?: string;
    search?: string;
    sort?: string;
    limit?: number;
    page?: number;
    status?: string;
  } = {}): Promise<ApiResponse<PaginatedResponse<School>>> {
    const queryParams = new URLSearchParams();
    if (params.start_date) queryParams.append('start_date', params.start_date);
    if (params.end_date) queryParams.append('end_date', params.end_date);
    if (params.user_id) queryParams.append('user_id', params.user_id);
    if (params.search) queryParams.append('search', params.search);
    if (params.sort) queryParams.append('sort', params.sort);
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.status) queryParams.append('status', params.status);
    
    const url = `/api/v1/admin/schools${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await api.get(url);
    return response.data;
  }

  // Get school by ID
  async getSchoolById(id: string): Promise<ApiResponse<School>> {
    const response = await api.get(`/api/v1/admin/schools/${id}`);
    return response.data;
  }

  // Get school stats (fee volume, platform fees, payment success, active parents)
  async getSchoolStats(schoolId: string): Promise<ApiResponse<{
    active_parents: number;
    active_parents_change_percentage: number;
    active_parents_trend: string;
    fee_volume_change_percentage: number;
    fee_volume_trend: string;
    payment_success_rate: number;
    platform_fees: number;
    platform_fees_change_percentage: number;
    platform_fees_trend: string;
    success_rate_change: number;
    success_rate_trend: string;
    total_fee_volume: number;
  }>> {
    const response = await api.get(`/api/v1/admin/schools/${schoolId}/stats`);
    return response.data;
  }

  // Update school
  async updateSchool(data: {
    id: string;
    name?: string;
    address?: string;
    type?: string;
    status?: string;
    director_name?: string;
    email?: string;
    phone?: string;
    file?: File;
  }): Promise<ApiResponse<School>> {
    const formData = new FormData();
    
    if (data.id) formData.append('id', data.id);
    if (data.name) formData.append('name', data.name);
    if (data.address) formData.append('address', data.address);
    if (data.type) formData.append('type', data.type);
    if (data.status) formData.append('status', data.status);
    if (data.director_name) formData.append('director_name', data.director_name);
    if (data.email) formData.append('email', data.email);
    if (data.phone) formData.append('phone', data.phone);
    if (data.file) formData.append('file', data.file);
    
    const response = await api.put('/api/v1/admin/schools/update', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
}

export default new SchoolService();
