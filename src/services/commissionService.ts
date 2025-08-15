import api from './api'

export interface CommissionSetting {
  id: string
  service_type: string
  admin_percentage: number
  referrer_percentage: number
  partner_percentage: number
  developer_percentage: number
  agent_percentage: number
  commission_percentage: number
  created_at: string
  updated_at: string
}

export interface CommissionUpdatePayload {
  commissionID: string
  admin_percentage: number
  referrer_percentage: number
  partner_percentage: number
  developer_percentage: number
  agent_percentage: number
  commission_percentage: number
}

export interface CommissionPaymentPayload {
  commissionID: string
}

export interface BulkCommissionPaymentPayload {
  commission_ids: string[]
}

export interface UserCommission {
  id: string
  user_id: string
  commission_type: string
  source: string
  amount: number
  status: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface UserCommissionsResponse {
  data: UserCommission[]
  message: string
  ok: boolean
}

export interface CommissionSettingsResponse {
  data: CommissionSetting[]
  message: string
  ok: boolean
  page: number
  rows_per_page: number
  total_count: number
}

export interface CommissionSettingResponse {
  data: CommissionSetting
  message: string
  ok: boolean
}

const commissionService = {
  // Get all commission settings
  getCommissionSettings() {
    return api.get<CommissionSettingsResponse>('/api/v1/referrals/admin/commissions/settings')
  },

  // Get specific commission setting by ID
  getCommissionSetting(id: string) {
    return api.get<CommissionSettingResponse>(`/api/v1/referrals/admin/commissions/settings/${id}`)
  },

  // Get all commission earnings
  getCommissionEarnings() {
    return api.get('/api/v1/referrals/admin/commissions')
  },

  // Get commissions for a specific user
  getUserCommissions(userId: string) {
    return api.get<UserCommissionsResponse>(`/api/v1/referrals/admin/commissions/user/${userId}`)
  },

  // Update commission setting
  updateCommissionSetting(payload: CommissionUpdatePayload) {
    return api.post('/api/v1/referrals/admin/commissions/update', payload)
  },

  // Pay single commission
  payCommission(payload: CommissionPaymentPayload) {
    return api.post('/api/v1/referrals/admin/commissions/pay', payload)
  },

  // Pay multiple commissions in bulk
  payBulkCommissions(payload: BulkCommissionPaymentPayload) {
    return api.post('/api/v1/referrals/admin/commissions/pay/bulk', payload)
  }
}

export default commissionService 